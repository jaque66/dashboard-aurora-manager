#!/usr/bin/env python3
"""Aurora Manager - instalacja, kopia i przywracanie dashboardow Aurora (stdlib + websockets)."""
import asyncio, io, json, os, re, shutil, sys, tarfile, threading, time, traceback
from datetime import datetime
from urllib.parse import parse_qs, urlparse

CFG = os.environ.get("JM_CONFIG_DIR", "/config")
DATA = os.environ.get("JM_DATA", "/data")
HERE = os.path.dirname(os.path.abspath(__file__))
PAYLOAD = os.path.join(os.path.dirname(HERE), "payload", "aurora-payload.tar.gz")
PORT = int(os.environ.get("JM_PORT", "8100"))
VERSION = "2.1.0"


def options():
    try:
        return json.load(open(os.path.join(DATA, "options.json")))
    except Exception:
        return {}


OPT = options()
BDIR = os.path.join(CFG, OPT.get("manager_backup_dir", "aurora_backups"))
KEEP = int(OPT.get("manager_backup_keep", 14))
SKIP = ("__pycache__", ".pyc", "/backup/", "pastel_backups")

# grupy plikow (sciezki wzgledem /config); dashboardy i zasoby obslugiwane osobno
GROUPS = [
    {"id": "www", "name": "Karta i zasoby (www/jarvis)", "on": True, "paths": ["www/jarvis"]},
    {"id": "dash", "name": "Dashboardy Lovelace i zasoby karty", "on": True, "paths": []},
    {"id": "themes", "name": "Motywy HA (Aurora, Pastel)", "on": True, "paths": ["themes"], "glob": r"^themes/(jarvis|aurora)[^/]*$"},
    {"id": "gen", "name": "Generator karty (jarvis_generator)", "on": True, "paths": ["jarvis_generator"]},
    {"id": "editor", "name": "Edytor Aurora (ustawienia i projekty)", "on": True, "paths": ["hud_scene"]},
    {"id": "integ", "name": "Integracje własne (vulcan_dom, openmediavault)", "on": False,
     "paths": ["custom_components/vulcan_dom", "custom_components/openmediavault"]},
    {"id": "auto", "name": "Automatyzacje i skrypty", "on": False, "paths": ["automations.yaml", "scripts.yaml"]},
]
GID = {g["id"]: g for g in GROUPS}


def skip(rel):
    return any(s in rel + ("/" if os.path.isdir(os.path.join(CFG, rel)) else "") for s in SKIP)


def group_files(g):
    out = []
    for p in g["paths"]:
        full = os.path.join(CFG, p)
        if os.path.isfile(full):
            out.append(p)
        elif os.path.isdir(full):
            for root, dirs, files in os.walk(full):
                dirs[:] = [d for d in dirs if d != "__pycache__"]
                for f in files:
                    rel = os.path.relpath(os.path.join(root, f), CFG)
                    if skip(rel) or (g.get("glob") and not re.match(g["glob"], rel)):
                        continue
                    out.append(rel)
    return sorted(out)


def read_storage(name):
    try:
        return json.load(open(os.path.join(CFG, ".storage", name)))
    except Exception:
        return None


def dashboards():
    d = read_storage("lovelace_dashboards")
    items = (d or {}).get("data", {}).get("items", []) if d else []
    out = []
    for it in items:
        up = it.get("url_path")
        if not up:
            continue
        cfg = read_storage("lovelace." + it.get("id", up.replace("-", "_")))
        out.append({"url_path": up, "id": it.get("id"), "title": it.get("title"), "icon": it.get("icon"),
                    "require_admin": it.get("require_admin", False), "show_in_sidebar": it.get("show_in_sidebar", True),
                    "has_config": bool(cfg), "jarvis": any(x in up.lower() for x in ("jarvis", "pastel", "aurora"))})
    return out


def resources():
    d = read_storage("lovelace_resources")
    return [r for r in ((d or {}).get("data", {}).get("items", []) if d else []) if "/local/jarvis/" in r.get("url", "")]


def human(n):
    for u in ("B", "KB", "MB", "GB"):
        if n < 1024 or u == "GB":
            return f"{n:.0f} {u}" if u == "B" else f"{n:.1f} {u}"
        n /= 1024


def state():
    gs = []
    for g in GROUPS:
        if g["id"] == "dash":
            gs.append({"id": "dash", "name": g["name"], "on": True, "count": len(dashboards()), "size": ""})
            continue
        fl = group_files(g)
        sz = sum(os.path.getsize(os.path.join(CFG, f)) for f in fl)
        gs.append({"id": g["id"], "name": g["name"], "on": g["on"], "count": len(fl), "size": human(sz)})
    bl = []
    if os.path.isdir(BDIR):
        for f in sorted(os.listdir(BDIR), reverse=True):
            if f.endswith(".tar.gz"):
                p = os.path.join(BDIR, f)
                bl.append({"name": f, "size": human(os.path.getsize(p)), "time": datetime.fromtimestamp(os.path.getmtime(p)).strftime("%Y-%m-%d %H:%M"), "manifest": manifest_of(p)})
    pl = None
    if os.path.isfile(PAYLOAD):
        pl = {"size": human(os.path.getsize(PAYLOAD)), "manifest": manifest_of(PAYLOAD)}
    return {"version": VERSION, "groups": gs, "dashboards": dashboards(), "backups": bl, "payload": pl, "dir": os.path.relpath(BDIR, CFG)}


def manifest_of(path):
    try:
        with tarfile.open(path, "r:gz") as t:
            return json.load(t.extractfile("manifest.json"))
    except Exception:
        return None


def card_version():
    for r in resources():
        m = re.search(r"pastel-home-card\.js\?v=(\d+)", r.get("url", ""))
        if m:
            return m.group(1)
    return ""


def add_bytes(t, name, data):
    ti = tarfile.TarInfo(name)
    ti.size = len(data)
    ti.mtime = int(time.time())
    t.addfile(ti, io.BytesIO(data))


def make_archive(groups, dash_sel, note="", prefix="aurora", dest=None):
    os.makedirs(dest or BDIR, exist_ok=True)
    name = f"{prefix}-{datetime.now().strftime('%Y%m%d-%H%M%S')}.tar.gz"
    path = os.path.join(dest or BDIR, name)
    nfiles = 0
    with tarfile.open(path, "w:gz") as t:
        for gid in groups:
            g = GID.get(gid)
            if not g or gid == "dash":
                continue
            for rel in group_files(g):
                t.add(os.path.join(CFG, rel), arcname="files/" + rel, recursive=False)
                nfiles += 1
        dl = []
        if "dash" in groups:
            for d in dashboards():
                if d["url_path"] in dash_sel and d["has_config"]:
                    cfg = read_storage("lovelace." + (d["id"] or d["url_path"].replace("-", "_")))
                    dl.append({"meta": {k: d[k] for k in ("url_path", "title", "icon", "require_admin", "show_in_sidebar")}, "config": cfg["data"]["config"]})
            add_bytes(t, "dashboards.json", json.dumps(dl, ensure_ascii=False).encode())
            add_bytes(t, "resources.json", json.dumps(resources(), ensure_ascii=False).encode())
        man = {"app": "aurora_manager", "created": datetime.now().isoformat(timespec="seconds"), "groups": groups, "files": nfiles,
               "dashboards": [x["meta"]["url_path"] for x in dl], "card_version": card_version(), "note": note}
        add_bytes(t, "manifest.json", json.dumps(man, ensure_ascii=False).encode())
    if dest is None:
        prune()
    return name


def prune():
    fl = sorted((f for f in os.listdir(BDIR) if f.startswith("aurora-auto-")), reverse=True)
    for f in fl[KEEP:]:
        try:
            os.remove(os.path.join(BDIR, f))
        except OSError:
            pass


def safe_name(n):
    if not n or "/" in n or "\\" in n or ".." in n or not n.endswith(".tar.gz"):
        raise ValueError("zła nazwa pliku")
    return n


async def ws_session(fn):
    import websockets
    tok = os.environ.get("SUPERVISOR_TOKEN", "")
    async with websockets.connect("ws://supervisor/core/websocket", max_size=None) as w:
        await w.recv()
        await w.send(json.dumps({"type": "auth", "access_token": tok}))
        r = json.loads(await w.recv())
        if r.get("type") != "auth_ok":
            raise RuntimeError("autoryzacja do HA nieudana: " + str(r.get("message", r)))
        n = [0]

        async def call(**m):
            n[0] += 1
            await w.send(json.dumps({"id": n[0], **m}))
            while True:
                x = json.loads(await w.recv())
                if x.get("id") == n[0]:
                    return x
        return await fn(call)


def restore(path, groups, dash_sel):
    log = []
    safety = None
    if os.path.isdir(CFG) and any(g in groups for g in GID):
        safety = make_archive([g for g in groups if g in GID] if "dash" not in groups else list(groups), [d["url_path"] for d in dashboards()], "automatyczna kopia przed przywróceniem", "aurora-przed-przywroceniem")
        log.append("Kopia bezpieczeństwa: " + safety)
    allowed = []
    for gid in groups:
        g = GID.get(gid)
        if g and gid != "dash":
            allowed += [p.rstrip("/") for p in g["paths"]]
    nf = 0
    with tarfile.open(path, "r:gz") as t:
        man = json.load(t.extractfile("manifest.json"))
        for m in t.getmembers():
            if not m.isfile() or not m.name.startswith("files/"):
                continue
            rel = os.path.normpath(m.name[6:])
            if rel.startswith("..") or os.path.isabs(rel):
                continue
            if not any(rel == a or rel.startswith(a + "/") for a in allowed):
                continue
            g = next((GID[i] for i in groups if i in GID and any(rel == p or rel.startswith(p + "/") for p in GID[i]["paths"])), None)
            if g and g.get("glob") and not re.match(g["glob"], rel):
                continue
            dst = os.path.join(CFG, rel)
            os.makedirs(os.path.dirname(dst), exist_ok=True)
            with open(dst, "wb") as f:
                shutil.copyfileobj(t.extractfile(m), f)
            nf += 1
        log.append(f"Przywrócono plików: {nf}")
        if "dash" in groups:
            dl = json.load(t.extractfile("dashboards.json")) if "dashboards.json" in t.getnames() else []
            rs = json.load(t.extractfile("resources.json")) if "resources.json" in t.getnames() else []
            dl = [d for d in dl if not dash_sel or d["meta"]["url_path"] in dash_sel]
            log += asyncio.run(ws_session(lambda call: restore_dash(call, dl, rs)))
    if "themes" in groups:
        try:
            import urllib.request
            rq = urllib.request.Request("http://supervisor/core/api/services/frontend/reload_themes", data=b"{}", method="POST",
                                        headers={"Authorization": "Bearer " + os.environ.get("SUPERVISOR_TOKEN", ""), "Content-Type": "application/json"})
            urllib.request.urlopen(rq, timeout=20)
            log.append("Motywy przeładowane")
        except Exception as e:
            log.append("Motywy: przeładuj ręcznie (" + str(e) + ")")
    log.append("Gotowe. Odśwież przeglądarkę (Ctrl+F5).")
    return log


async def restore_dash(call, dl, rs):
    log = []
    cur = (await call(type="lovelace/dashboards/list")).get("result", [])
    have = {d["url_path"]: d for d in cur}
    for d in dl:
        m = d["meta"]
        if m["url_path"] not in have:
            r = await call(type="lovelace/dashboards/create", url_path=m["url_path"], title=m.get("title") or m["url_path"], icon=m.get("icon") or "mdi:view-dashboard",
                           require_admin=bool(m.get("require_admin")), show_in_sidebar=m.get("show_in_sidebar", True), mode="storage")
            if not r.get("success"):
                log.append(f"Dashboard {m['url_path']}: nie utworzono ({r.get('error', {}).get('message')})")
                continue
        r = await call(type="lovelace/config/save", url_path=m["url_path"], config=d["config"])
        log.append(f"Dashboard {m['url_path']}: " + ("zapisany" if r.get("success") else "błąd " + str(r.get("error", {}).get("message"))))
    cur = (await call(type="lovelace/resources")).get("result", [])
    for r0 in rs:
        base = r0["url"].split("?")[0]
        ex = next((c for c in cur if c["url"].split("?")[0] == base), None)
        if ex:
            r = await call(type="lovelace/resources/update", resource_id=ex["id"], res_type=r0.get("type", "module"), url=r0["url"])
        else:
            r = await call(type="lovelace/resources/create", res_type=r0.get("type", "module"), url=r0["url"])
        log.append("Zasób " + base.rsplit("/", 1)[-1] + ": " + ("OK" if r.get("success") else "błąd"))
    return log


DEF_HOME = {"order": ["hero", "rooms", "as", "status", "air", "fuel", "cal", "links"], "porder": ["hero", "as", "status", "rooms", "air", "fuel", "cal", "links"], "hide": [],
            "sec": {"hero": {"w": 1, "h": 1}, "rooms": {"w": 3, "h": 3}, "as": {"w": 1, "h": 1}, "status": {"w": 1, "h": 2}, "air": {"w": 1, "h": 1}, "fuel": {"w": 1, "h": 1}, "cal": {"w": 1, "h": 1}, "links": {"w": 4, "h": 1}}}
PAL = ["lav", "peach", "butter", "rose", "sky", "aqua", "mint", "sand"]
ICONS = [(r"salon|dzienny|living", "mdi:sofa"), (r"kuchn", "mdi:chef-hat"), (r"sypial", "mdi:bed"), (r"łazien|lazien|toalet|wc", "mdi:shower-head"), (r"przedpok|korytarz|hol|wiatrołap", "mdi:door-open"),
         (r"biur|gabinet|praco", "mdi:desk"), (r"gara", "mdi:garage"), (r"ogr|taras|balkon", "mdi:flower"), (r"dziec|pokój|pokoj", "mdi:teddy-bear")]
DEVICON = {"light": "mdi:lightbulb-outline", "switch": "mdi:power-socket-eu", "media_player": "mdi:television", "fan": "mdi:fan", "cover": "mdi:blinds"}


def slug(n):
    t = n.lower()
    for a, b in zip("ąćęłńóśźż", "acelnoszz"):
        t = t.replace(a, b)
    return re.sub(r"[^a-z0-9]+", "_", t).strip("_")


async def ha_inventory(call):
    ar = (await call(type="config/area_registry/list"))["result"]
    dr = (await call(type="config/device_registry/list"))["result"]
    er = (await call(type="config/entity_registry/list"))["result"]
    sts = {x["entity_id"]: x for x in (await call(type="get_states"))["result"]}
    dev_area = {d["id"]: d.get("area_id") for d in dr}
    areas = {a["area_id"]: {"id": a["area_id"], "name": a["name"], "entities": []} for a in ar}
    for e in er:
        if e.get("disabled_by") or e.get("hidden_by"):
            continue
        aid = e.get("area_id") or dev_area.get(e.get("device_id"))
        if aid in areas and e["entity_id"] in sts:
            st = sts[e["entity_id"]]
            areas[aid]["entities"].append({"id": e["entity_id"], "domain": e["entity_id"].split(".")[0], "dc": st["attributes"].get("device_class"),
                                           "name": st["attributes"].get("friendly_name") or e["entity_id"]})
    return list(areas.values()), sts


def propose_cfg(sel, sts):
    rooms, used = [], set()
    for i, a in enumerate(sel):
        E = a["entities"]
        pick = lambda f: next((e["id"] for e in E if f(e)), "")
        rid = slug(a["name"])[:18] or "pokoj"
        k = 2
        while rid in used:
            rid = "%s_%d" % (slug(a["name"])[:15], k)
            k += 1
        used.add(rid)
        order = ("light", "switch", "media_player", "fan", "cover")
        devs = sorted((e for e in E if e["domain"] in order), key=lambda e: order.index(e["domain"]))[:8]
        icon = next((ic for rx, ic in ICONS if re.search(rx, a["name"].lower())), "mdi:home-outline")
        rooms.append({"id": rid, "name": a["name"][:24], "icon": icon, "c": PAL[i % len(PAL)],
                      "t": pick(lambda e: e["domain"] == "sensor" and e["dc"] == "temperature"), "h": pick(lambda e: e["domain"] == "sensor" and e["dc"] == "humidity"),
                      "lux": pick(lambda e: e["domain"] == "sensor" and e["dc"] == "illuminance"),
                      "occ": pick(lambda e: e["domain"] == "binary_sensor" and e["dc"] in ("motion", "occupancy", "presence")),
                      "dev": [[e["id"], e["name"].replace(a["name"], "").strip() or e["name"], DEVICON.get(e["domain"], "mdi:power")] for e in devs]})
    allents = [e for a in sel for e in a["entities"]]
    first = lambda f: next((e["id"] for e in allents if f(e)), "")
    return {"rooms": rooms, "out": {"t": "", "h": "", "weather": next((k for k in sts if k.startswith("weather.")), "")},
            "pm": first(lambda e: e["domain"] == "sensor" and e["dc"] == "pm25"), "purifier": first(lambda e: e["domain"] == "fan" and re.search(r"purif|oczysz|air", e["id"] + e["name"], re.I)),
            "bats": [k for k, v in sts.items() if k.startswith("sensor.") and v["attributes"].get("device_class") == "battery"][:40],
            "cal": [k for k in sts if k.startswith("calendar.")][:6]}


def list_areas():
    async def f(call):
        ar, _ = await ha_inventory(call)
        return [{"id": a["id"], "name": a["name"], "count": len(a["entities"])} for a in ar]
    return asyncio.run(ws_session(f))


def new_dashboard(name, mode, area_ids, saver):
    name = (name or "").strip()[:40]
    sl = slug(name)[:14]
    if not name or not sl:
        raise ValueError("podaj nazwę dashboardu")
    lid = ("au_" + sl)[:20]
    path = "aurora-" + sl.replace("_", "-")

    async def f(call):
        ds = (await call(type="lovelace/dashboards/list"))["result"]
        if any(d["url_path"] == path for d in ds):
            raise ValueError("dashboard /" + path + " już istnieje")
        cfg = {}
        if mode == "areas":
            ar, sts = await ha_inventory(call)
            sel = [a for a in ar if a["id"] in set(area_ids or [])]
            if not sel:
                raise ValueError("zaznacz co najmniej jeden obszar")
            cfg = propose_cfg(sel, sts)
        lay = {"v": 2, "home": json.loads(json.dumps(DEF_HOME)), "cfg": cfg}
        os.makedirs(os.path.join(CFG, "www/jarvis"), exist_ok=True)
        json.dump(lay, open(os.path.join(CFG, "www/jarvis", "pastel-layout-%s.json" % lid), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
        card = lambda t: {"type": t, "layout": lid, "empty": True}
        views = [{"title": "Dom", "path": "home", "icon": "mdi:home-heart", "panel": True, "cards": [card("custom:pastel-home-card")]}]
        if saver:
            views.append({"title": "Wygaszacz", "path": "wygaszacz", "icon": "mdi:weather-partly-cloudy", "panel": True, "cards": [card("custom:pastel-saver-card")]})
        r = await call(type="lovelace/dashboards/create", url_path=path, title=name, icon="mdi:flower-tulip", show_in_sidebar=True, require_admin=False, mode="storage")
        if not r.get("success"):
            raise RuntimeError("nie utworzono dashboardu: " + str(r.get("error", {}).get("message")))
        r = await call(type="lovelace/config/save", url_path=path, config={"title": name, "views": views})
        if not r.get("success"):
            raise RuntimeError("nie zapisano dashboardu: " + str(r.get("error", {}).get("message")))
        return {"path": path, "rooms": len(cfg.get("rooms", []))}
    return asyncio.run(ws_session(f))


def _send(h, code, body, ctype="application/json", extra=None):
    b = body if isinstance(body, bytes) else json.dumps(body, ensure_ascii=False).encode()
    h.send_response(code)
    h.send_header("Content-Type", ctype + ("; charset=utf-8" if "text" in ctype or "json" in ctype else ""))
    h.send_header("Content-Length", str(len(b)))
    h.send_header("Cache-Control", "no-store")
    for k, v in (extra or {}).items():
        h.send_header(k, v)
    h.end_headers()
    h.wfile.write(b)


def serve(h, method):
    """Obsluga sciezek /manager/* z serwera edytora (h = BaseHTTPRequestHandler)."""
    u = urlparse(h.path)
    path = "/" + u.path[len("/manager"):].lstrip("/") if u.path.startswith("/manager") else u.path
    n_body = int(h.headers.get("Content-Length") or 0)
    try:
        if method == "GET":
            if u.path == "/manager":
                return _send(h, 301, b"", "text/plain", {"Location": "manager/"})
            if path in ("/", "/index.html"):
                return _send(h, 200, open(os.path.join(HERE, "static", "manager.html"), "rb").read(), "text/html")
            if path == "/api/state":
                return _send(h, 200, state())
            if path == "/api/areas":
                return _send(h, 200, list_areas())
            if path == "/api/download":
                n = safe_name(parse_qs(u.query).get("name", [""])[0])
                p = PAYLOAD if n == "payload.tar.gz" else os.path.join(BDIR, n)
                return _send(h, 200, open(p, "rb").read(), "application/gzip", {"Content-Disposition": f'attachment; filename="{n}"'})
        else:
            raw = h.rfile.read(n_body) if n_body else b""
            if path == "/api/upload":
                n = safe_name(parse_qs(u.query).get("name", [""])[0])
                os.makedirs(BDIR, exist_ok=True)
                tmp = os.path.join(BDIR, ".upload.tmp")
                open(tmp, "wb").write(raw)
                if not manifest_of(tmp):
                    os.remove(tmp)
                    return _send(h, 400, {"error": "to nie jest kopia Aurora Managera"})
                os.replace(tmp, os.path.join(BDIR, n))
                return _send(h, 200, {"ok": True, "name": n})
            j = json.loads(raw or b"{}")
            if path == "/api/backup":
                return _send(h, 200, {"ok": True, "name": make_archive(j.get("groups") or [], j.get("dashboards") or [], j.get("note", ""))})
            if path == "/api/newdash":
                return _send(h, 200, {"ok": True, **new_dashboard(j.get("name"), j.get("mode"), j.get("areas"), j.get("saver", True))})
            if path == "/api/delete":
                os.remove(os.path.join(BDIR, safe_name(j.get("name"))))
                return _send(h, 200, {"ok": True})
            if path == "/api/restore":
                n = j.get("name")
                p = PAYLOAD if n == "payload.tar.gz" else os.path.join(BDIR, safe_name(n))
                return _send(h, 200, {"ok": True, "log": restore(p, j.get("groups") or [], j.get("dashboards") or [])})
    except Exception as e:
        traceback.print_exc()
        return _send(h, 500, {"error": f"{type(e).__name__}: {e}"})
    _send(h, 404, {"error": "nie znaleziono"})


def auto_loop():
    last = None
    while True:
        try:
            now = datetime.now()
            if OPT.get("manager_auto_backup", True) and now.hour == 3 and now.minute >= 30 and last != now.date():
                last = now.date()
                make_archive([g["id"] for g in GROUPS if g["on"]], [d["url_path"] for d in dashboards() if d["jarvis"]], "automatyczna", "aurora-auto")
        except Exception:
            traceback.print_exc()
        time.sleep(60)


def start():
    os.makedirs(BDIR, exist_ok=True)
    threading.Thread(target=auto_loop, daemon=True).start()
