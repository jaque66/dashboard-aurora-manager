"""Budowanie i wdrazanie dashboardow HUD Scene do Home Assistant (z poziomu dodatku)."""
import asyncio, copy, json, os, re, shutil, sys, time, urllib.request
import websockets

DATA = os.environ.get('HUD_DATA', '/data')
CONF = os.environ.get('HUD_CONFIG_DIR', '/config')
OPT = '/opt/hud_scene'
def load_options():
    try:
        return json.load(open(os.path.join(DATA, 'options.json'), encoding='utf-8'))
    except Exception:
        return {}
OPTIONS = load_options()
OUT_DIR = re.sub(r'[^A-Za-z0-9_-]', '', str(OPTIONS.get('output_dir') or '')) or 'hud_scene'
WWW = os.path.join(CONF, 'www', OUT_DIR)
LOCAL = '/local/' + OUT_DIR
sys.path[:0] = [os.path.join(OPT, 'engine'), OPT]
STATE_FILE = os.path.join(DATA, 'state.json')
TOKEN = os.environ.get('SUPERVISOR_TOKEN', '')
REQUIRED_CARDS = {'mini-graph-card': ('mini-graph-card', False), 'button-card': ('button-card', True), 'card-mod': ('card-mod', True), 'mushroom': ('mushroom', False)}
ASSET_FILES = ['pastel-home-card.js', 'jarvis-f1-card.js', 'hud-scene-fonts.css', 'jarvis-events.js', 'jarvis-forecast.js', 'jarvis-chat-card.js', 'jarvis-calendar-card.js', 'hud-scene-theme.js', 'hud-scene-weather.js', 'hud-scene-widgets.js']

def load_state():
    try:
        return json.load(open(STATE_FILE, encoding='utf-8'))
    except Exception:
        return {'dashboards': []}

def save_state(st):
    os.makedirs(DATA, exist_ok=True)
    json.dump(st, open(STATE_FILE, 'w', encoding='utf-8'), indent=1)

def api(path, method='GET', body=None):
    req = urllib.request.Request('http://supervisor/core/api/' + path, method=method,
                                 headers={'Authorization': 'Bearer ' + TOKEN, 'Content-Type': 'application/json'},
                                 data=json.dumps(body).encode() if body is not None else None)
    return json.load(urllib.request.urlopen(req, timeout=30))

def retarget(obj, names, vdir):
    s = json.dumps(obj, ensure_ascii=False)
    for n in names:
        s = s.replace('/local/backgrounds/' + n, LOCAL + '/%s/%s' % (vdir, n))
    s = re.sub('(' + re.escape(LOCAL) + r'/[^"?]+)\?v=(\d+)', lambda m: '%s?v=%s-%d' % (m.group(1), m.group(2), int(time.time())), s)
    return json.loads(s)

def core_svgs(out_dir):
    """Rdzen asystenta (4 stany) - generator zapisuje je do OUT; przekierowane do katalogu roboczego."""
    src = open(os.path.join(os.environ.get('HUD_GEN', OPT + '/core'), 'core_svgs.py'), encoding='utf-8').read()
    src = src.replace("OUT = '/homeassistant/www/backgrounds'", "OUT = %r" % out_dir)
    os.makedirs(out_dir, exist_ok=True)
    exec(compile(src, 'core_svgs', 'exec'), {'__name__': '__core__'})

ANIM_TAG = re.compile(r'<(animate|animateTransform|animateMotion|set)\b[^>]*?/>|<(animate|animateTransform|animateMotion|set)\b[^>]*?>.*?</\2>', re.S)
KEEP_FILES = re.compile(r'^(zone_|jarvis_core_)')     # nakladki stanu (poswiaty stref, alarmy, rdzen asystenta): animacje zostaja zawsze

def strip_background(text):
    """Usuwa wszystkie animacje tla (kazda animacja SMIL wymusza przerysowanie calego obrazu w kazdej klatce; na slabym tablecie obniza plynnosc)."""
    return ANIM_TAG.sub('', text)

def make_static_copies(vdir, log, prefix=''):
    """Dla kazdego SVG z animowanym tlem powstaje NAZWA_s.svg (tlo bez ruchu); zwraca liste nazw z wersja statyczna."""
    names = []
    for n in sorted(os.listdir(vdir)):
        if not n.endswith('.svg') or n.endswith('_s.svg') or KEEP_FILES.match(n) or not n.startswith(prefix):
            continue
        t = open(os.path.join(vdir, n), encoding='utf-8').read()
        st = strip_background(t)
        if st != t:
            open(os.path.join(vdir, n[:-4] + '_s.svg'), 'w', encoding='utf-8').write(st)
            names.append(n)
    return names

def anim_entity(pid):
    return 'input_boolean.hud_scene_animations_' + re.sub(r'\W', '_', pid)

def build_profiles(cfg, log):
    """Zwraca {profil: {'views': [...], 'path': url_path, 'title': ...}} i zapisuje grafiki do /config/www/hud_scene/<profil>/."""
    from build_main import build
    from build_sub import build_sub
    from profiles import get_profile
    work = os.path.join(DATA, 'work')
    shutil.rmtree(work, ignore_errors=True)
    core = os.path.join(work, 'core')
    core_svgs(core)
    for n_ in (os.listdir(WWW) if os.path.isdir(WWW) else []):      # czyszczenie zbudowanych profili; grafiki edytora wizualnego (canvas) zostaja
        if n_ != 'canvas':
            shutil.rmtree(os.path.join(WWW, n_), ignore_errors=True) if os.path.isdir(os.path.join(WWW, n_)) else os.remove(os.path.join(WWW, n_))
    result = {}
    for prof in cfg['profiles']:
        pid = prof['id']
        spec, _, path = get_profile(cfg, pid)
        log('profil %s (%s): budowanie widoku glownego i podstron...' % (pid, prof['kind']))
        main, bg = build(cfg, os.path.join(work, pid, 'main'), captions='i18n', profile_id=pid)
        sub, bgs = build_sub(cfg, os.path.join(work, pid, 'sub'), profile_id=pid)
        vdir = os.path.join(WWW, pid)
        os.makedirs(vdir, exist_ok=True)
        names = set()
        for d in (bg, bgs, core):
            for n in os.listdir(d):
                if n.endswith('.svg'):
                    shutil.copy(os.path.join(d, n), os.path.join(vdir, n))
                    names.add(n)
        views = [main['views'][0]] + sub
        if prof.get('animation_switch'):
            # niewidoczny znacznik: dashboard musi odwolywac sie do pomocnika, inaczej przegladarka nie dostaje jego zmian na biezaco (skrypt przelacznika odczytuje stan z hass.states)
            for v in views:
                for card in v.get('cards', []):
                    if card.get('type') == 'picture-elements':
                        card['elements'].append({'type': 'state-label', 'entity': anim_entity(pid),
                                                 'style': {'left': '0.5%', 'top': '0.5%', 'opacity': '0', 'pointer-events': 'none', 'font-size': '1px'}})
        views = [retarget(v, sorted(names), pid) for v in views]
        left = set(re.findall(r'/local/backgrounds/[A-Za-z0-9_.-]+', json.dumps(views)))
        if left:
            log('UWAGA: odwolania do plikow spoza dodatku: %s' % ', '.join(sorted(left)[:5]))
        if cfg.get('title'):
            for v in views[:1]:
                v['title'] = cfg['title']
        light = None
        if (cfg.get('dashboards') or {}).get('light_variants'):
            from light import auto_generic
            pre = LOCAL + '/%s/' % pid
            rd = lambda n: open(os.path.join(vdir, n), encoding='utf-8').read() if os.path.exists(os.path.join(vdir, n)) else None
            wr = lambda n, t: open(os.path.join(vdir, n), 'w', encoding='utf-8').write(t)
            av, sh_ = auto_generic({'views': views}, pre, rd, wr)       # tryb Auto: jeden dashboard, jasny/ciemny ze zmiennych motywu
            views = av['views']
            add_shadows(sh_)
            log('  %s: tryb Auto (%d widokow)' % (pid, len(views)))
        static_names = []
        if prof.get('animation_switch'):
            static_names = make_static_copies(vdir, log)
            log('  %s: statyczne kopie teł dla przełącznika animacji: %d' % (pid, len(static_names)))
        result[pid] = {'static': static_names, 'light': light, 'views': views, 'path': path, 'title': '%s - %s' % (cfg.get('title') or 'HUD Scene', prof.get('name') or pid),
                       'icon': 'mdi:cellphone' if prof['kind'] == 'phone' else 'mdi:hexagon-multiple-outline', 'files': len(names)}
        log('  %s: %d widokow, %d plikow grafik' % (pid, len(views), len(names)))
    return result

def write_assets(cfg, log, built=None):
    """Zasoby przegladarki (czcionki, karty, skrypty) do /config/www/hud_scene/assets/ z poprawionymi sciezkami."""
    base = cfg.get('dashboards', {}).get('base_path', 'hud-scene')
    dst = os.path.join(WWW, 'assets')
    os.makedirs(os.path.join(dst, 'fonts'), exist_ok=True)
    src = os.path.join(OPT, 'assets')
    for n in os.listdir(src):
        p = os.path.join(src, n)
        if os.path.isdir(p) and n != 'theme':
            for f in os.listdir(p):
                shutil.copy(os.path.join(p, f), os.path.join(dst, 'fonts', f))
        elif n.endswith(('.js', '.css')):
            t = open(p, encoding='utf-8').read()
            t = t.replace('/local/jarvis/', LOCAL + '/assets/').replace('/local/fonts/', LOCAL + '/assets/fonts/')
            if n != 'hud-scene-theme.js':
                t = t.replace("location.pathname.startsWith('/jarvis-')", "location.pathname.startsWith('/%s')" % base)
            if n == 'hud-scene-theme.js':
                ents = sorted(((p.get('path') or (base if p['kind'] == 'tablet' else '%s-%s' % (base, p['id'])), anim_entity(p['id'])) for p in cfg.get('profiles', []) if p.get('animation_switch')), key=lambda x: -len(x[0]))
                t = re.sub(r"  const ENTS = .*?// __ENTS__", lambda m_: "  const ENTS = [%s];   // __ENTS__" % ', '.join("[new RegExp('^\\\\/%s(-l)?(\\\\/|$)'), '%s']" % (re.escape(a_), e_) for a_, e_ in ents), t)
                t = t.replace("const RE = /^(.*\\/local\\/backgrounds\\/)([^/?#]+?)(_s)?\\.svg(\\?.*)?$/;", "const RE = /^(.*\\/local\\/hud_scene\\/[^/?#]+\\/)([^/?#]+?)(_s)?\\.svg(\\?.*)?$/;")
                for a_, b_ in (('__jarvisThemeLoaded', '__hudThemeLoaded'), ('__jarvisThemeDecide', '__hudThemeDecide'), ('__jarvisTickerLoaded', '__hudTickerLoaded'), ('__jarvisAnimSwitchLoaded', '__hudAnimSwitchLoaded'), ('__jarvisBgVarLoaded', '__hudBgVarLoaded')):
                    t = t.replace(a_, b_)      # wlasne flagi: dodatek moze dzialac obok starszej instalacji Jarvisa
                paths = sorted({p.get('path') or (base if p['kind'] == 'tablet' else '%s-%s' % (base, p['id'])) for p in cfg.get('profiles', [])}, key=len, reverse=True)
                alt = '|'.join(re.escape(x) for x in paths)
                t = t.replace("const RE = /^\\/(jarvis-(?:test-mobile|test|portable))(-l)?(\\/.*)?$/;",
                              "const RE = new RegExp('^\\\\/(%s)(-l)?(\\\\/.*)?$');\n  const LIGHT = %s;" % (alt, 'false'))        # tryb Auto: jasny/ciemny w jednym dashboardzie, bez przekierowan na -l
                t = t.replace("    const m = RE.exec(pathname);\n    if (!m) return null;", "    const m = RE.exec(pathname);\n    if (!m || !LIGHT) return null;")
                onre = "new RegExp('^\\\\/(%s)(-l)?(\\\\/|$)').test(location.pathname)" % alt
                t = re.sub(r"const ON = \(\) => .*?// __BARS_ON__", lambda m_: "const ON = () => %s;   // __BARS_ON__" % onre, t)
                t = t.replace("/^\\/jarvis-(test|portable)(-mobile)?(-l)?(\\/|$)/.test(location.pathname)", onre)      # warianty tla
                t = t.replace("!location.pathname.startsWith('/jarvis-')", "!" + onre)                                      # rotacja pasku Stanu domu / Paliw
                t = t.replace("(.*\\/local\\/backgrounds\\/)(jarvis_(?:test_scene|p_scene|sub)[a-z0-9_-]*?)(_v[1-3])?", "(.*\\/local\\/hud_scene\\/[^/?#]+\\/)((?:jarvis_(?:test_scene|p_scene|sub)|canvas_)[a-z0-9_-]*?)(_v[1-3])?")
                t = t.replace('__jarvisBarsLoaded', '__hudBarsLoaded')
            if n in ('hud-scene-weather.js', 'hud-scene-widgets.js'):      # kolory widgetow z motywu (tryb Auto); fallback = wartosc ciemna
                import light as _lt
                t = re.sub(r'#[0-9a-fA-F]{6}\b', lambda m_: 'var(--jv-%s,%s)' % (m_.group(0)[1:].lower(), m_.group(0)) if m_.group(0).lower() in _lt.HEX else m_.group(0), t)
            open(os.path.join(dst, n), 'w', encoding='utf-8').write(t)
    if built is not None:
        static = sorted({n for b in built.values() for n in b.get('static', [])})
        json.dump(static, open(os.path.join(dst, 'static-bg.json'), 'w', encoding='utf-8'))
    try:
        from home_status import write_events_json, EVENT_SPECS
        import wire
        wire.patch_modules(cfg)
        import home_status
        write_events_json(os.path.join(dst, 'events.json'))
    except Exception as e:
        log('events.json: %s' % e)

# ---------------------------------------------------------------- WebSocket
async def _ws():
    ws = await websockets.connect('ws://supervisor/core/websocket', max_size=None)
    await ws.recv()
    await ws.send(json.dumps({'type': 'auth', 'access_token': TOKEN}))
    await ws.recv()
    return ws

class Conn:
    def __init__(self, ws):
        self.ws, self.n = ws, 0
    async def call(self, msg):
        self.n += 1
        await self.ws.send(json.dumps({'id': self.n, **msg}))
        while True:
            r = json.loads(await self.ws.recv())
            if r.get('id') == self.n:
                return r

def project_urls(project):
    """Adresy dashboardow projektu (urzadzenia, wersje jasne)."""
    import canvas_build
    out = []
    for dv in canvas_build.devices(project):
        base = project['base_path'] if dv['id'] == 'main' else '%s-%s' % (project['base_path'], dv['id'])
        out += [base, base + '-l']
    return out


def remove_dashboards(urls, log):
    """Usuwa dashboardy utworzone przez dodatek (tylko te z state.json) i zapisuje stan."""
    async def run():
        ws = await _ws()
        c = Conn(ws)
        st = load_state()
        have = {d['url_path']: d for d in (await c.call({'type': 'lovelace/dashboards/list'}))['result']}
        for u in urls:
            if u not in st['dashboards']:
                continue
            if u in have:
                r = await c.call({'type': 'lovelace/dashboards/delete', 'dashboard_id': have[u]['id']})
                log('usuniety dashboard /%s: %s' % (u, 'tak' if r['success'] else r.get('error')))
            st['dashboards'] = [x for x in st['dashboards'] if x != u]
        save_state(st)
        await ws.close()
    asyncio.run(run())


async def deploy_async(cfg, built, log, force=False):
    ws = await _ws()
    c = Conn(ws)
    st = load_state()
    existing = {d['url_path']: d for d in (await c.call({'type': 'lovelace/dashboards/list'}))['result']}
    ok = True
    items = []
    for pid, b in built.items():
        items.append((pid, b['path'], b['title'], b['icon'], b['views']))
        if b.get('light'):
            items.append((pid + '-l', b['light']['path'], b['title'] + ' (jasny)', b['icon'], b['light']['views']))
    for pid, url, title, icon, views in items:
        if url in existing and url not in st['dashboards'] and not force:
            log('POMINIETO %s: dashboard o adresie "%s" istnieje i nie zostal utworzony przez ten dodatek (zmien adres profilu albo uzyj wymuszenia).' % (pid, url))
            ok = False
            continue
        if url in existing:
            cur = await c.call({'type': 'lovelace/config', 'url_path': url, 'force': True})
            if cur.get('success') and cur.get('result'):
                os.makedirs(os.path.join(DATA, 'backups'), exist_ok=True)
                bp = os.path.join(DATA, 'backups', '%s-%d.json' % (url, int(time.time())))
                json.dump(cur['result'], open(bp, 'w', encoding='utf-8'))
                log('kopia poprzedniej konfiguracji %s: %s' % (url, bp))
        else:
            r = await c.call({'type': 'lovelace/dashboards/create', 'url_path': url, 'title': title, 'icon': icon,
                              'show_in_sidebar': True, 'require_admin': False, 'mode': 'storage'})
            if not r['success']:
                log('BLAD tworzenia dashboardu %s: %s' % (url, r.get('error')))
                ok = False
                continue
            st['dashboards'].append(url)
            save_state(st)
        r = await c.call({'type': 'lovelace/config/save', 'url_path': url, 'config': {'title': title, 'views': views}})
        log('dashboard /%s: %s' % (url, 'zapisany' if r['success'] else 'BLAD ' + str(r.get('error'))))
        ok = ok and r['success']
    # pomocnicy modulow
    try:
        import hdmi
        if (cfg.get('modules', {}).get('light_options') or {}).get('enabled'):
            have = {s['entity_id'] for s in api('states')}
            for ent in (hdmi.BOOL_TABLET, hdmi.BOOL_MOBILE):
                if ent not in have:
                    r = await c.call({'type': 'input_boolean/create', 'name': ent.split('.', 1)[1].replace('_', ' ').title(), 'icon': 'mdi:tune'})
                    log('pomocnik %s: %s' % (ent, 'utworzony' if r['success'] else r.get('error')))
                    if r['success']:
                        st.setdefault('helpers', []).append('input_boolean.' + r['result']['id'])
                        save_state(st)
    except Exception as e:
        log('pomocnicy: %s' % e)
    if ((cfg.get('modules') or {}).get('media') or {}).get('active_selector') == AUTO_TV:
        opts_ = _tv_players(cfg)
        st_ = {x['entity_id']: x for x in api('states')}
        if AUTO_TV not in st_:
            r = await c.call({'type': 'input_select/create', 'name': 'Hud Scene Active Tv', 'icon': 'mdi:television', 'options': opts_})
            log('pomocnik %s: %s' % (AUTO_TV, 'utworzony' if r['success'] else r.get('error')))
            if r['success']:
                st.setdefault('helpers', []).append('input_select.' + r['result']['id'])
                save_state(st)
        elif list(st_[AUTO_TV]['attributes'].get('options', [])) != opts_:
            r = await c.call({'type': 'input_select/update', 'input_select_id': AUTO_TV.split('.', 1)[1], 'name': st_[AUTO_TV]['attributes'].get('friendly_name', 'Hud Scene Active Tv'),
                              'icon': 'mdi:television', 'options': opts_})
            log('pomocnik %s: opcje zaktualizowane (%s)' % (AUTO_TV, 'ok' if r['success'] else r.get('error')))
    for prof_ in cfg.get('profiles', []):
        if not prof_.get('animation_switch'):
            continue
        ent_ = anim_entity(prof_['id'])
        have = {x['entity_id'] for x in api('states')}
        if ent_ not in have:
            r = await c.call({'type': 'input_boolean/create', 'name': 'Hud Scene Animations %s' % re.sub(r'\W', ' ', prof_['id']).strip().title(), 'icon': 'mdi:animation-play'})
            log('pomocnik %s: %s' % (ent_, 'utworzony' if r['success'] else r.get('error')))
            if r['success']:
                eid = 'input_boolean.' + r['result']['id']
                st.setdefault('helpers', []).append(eid)
                save_state(st)
                try:
                    api('services/input_boolean/turn_on', 'POST', {'entity_id': eid})      # domyslnie animacje wlaczone
                except Exception:
                    pass
    # zasoby Lovelace
    res = (await c.call({'type': 'lovelace/resources'}))['result']
    for f in ASSET_FILES:
        own = [r for r in res if LOCAL + '/assets/' + f in r['url']]
        if own:       # nasz zasob: nowy parametr ?v=, zeby przegladarki pobraly zaktualizowany plik (inaczej zostaje stara kopia z pamieci podrecznej)
            await c.call({'type': 'lovelace/resources/update', 'resource_id': own[0]['id'], 'res_type': own[0]['type'], 'url': LOCAL + '/assets/%s?v=%d' % (f, int(time.time()))})
            continue
        if any(f in r['url'] for r in res):
            continue
        r = await c.call({'type': 'lovelace/resources/create', 'res_type': 'css' if f.endswith('.css') else 'module',
                          'url': LOCAL + '/assets/%s?v=%d' % (f, int(time.time()))})
        log('zasob %s: %s' % (f, 'zarejestrowany' if r['success'] else r.get('error')))
    await ws.close()
    return ok

SHADOW_FILE = os.path.join(DATA, 'shadows.json')


def add_shadows(sh):
    """Cienie tekstu uzywane przez dashboardy w trybie Auto (id -> tekst); zapamietane, bo motyw HA jest wspolny dla wszystkich projektow."""
    try:
        cur = json.load(open(SHADOW_FILE, encoding='utf-8'))
    except Exception:
        cur = {}
    if sh and any(cur.get(k) != v for k, v in sh.items()):
        cur.update(sh)
        os.makedirs(DATA, exist_ok=True)
        json.dump(cur, open(SHADOW_FILE, 'w', encoding='utf-8'))


def _theme_text(src_text):
    """Motyw zrodlowy + zmienne trybu Auto (--jv-*) w modes.dark / modes.light."""
    import light as lt
    try:
        sh = json.load(open(SHADOW_FILE, encoding='utf-8'))
    except Exception:
        sh = {}
    dk, ltt = lt.auto_vars(sh)
    import pastel as _pa
    pd_, pl_ = _pa.vars_()
    dk, ltt = dk + pd_, ltt + pl_
    t = re.sub(r'[ \t]*# >>> jv-vars.*?# <<< jv-vars\n?', '', src_text, flags=re.S)
    def put(t, mode, lines):
        block = '      # >>> jv-vars\n%s\n      # <<< jv-vars\n' % '\n'.join('      ' + l for l in lines)
        return re.sub(r'(\n    %s:\n)' % mode, lambda m: m.group(1) + block, t, count=1)
    return put(put(t, 'dark', dk), 'light', ltt)


def install_theme(log):
    """Motyw HA 'HUD Scene' (tryb jasny/ciemny + zmienne trybu Auto): zapis do katalogu motywow skonfigurowanego w configuration.yaml. Pliku konfiguracji NIE zmieniamy."""
    src = os.path.join(OPT, 'assets', 'theme', 'hud_scene.yaml')
    try:
        conf = open(os.path.join(CONF, 'configuration.yaml'), encoding='utf-8').read()
    except Exception:
        conf = ''
    m = re.search(r'^\s*themes:\s*!include_dir_merge_named\s+(\S+)', conf, re.M)
    if not m:
        log('MOTYW: w configuration.yaml nie znaleziono "themes: !include_dir_merge_named <katalog>" - motyw "HUD Scene" nie zostal zainstalowany. '
            'Dodaj w configuration.yaml: frontend:\\n  themes: !include_dir_merge_named themes  - i wdroz ponownie (bez motywu karty HA nie dostana kolorow HUD).')
        return False
    d = os.path.join(CONF, m.group(1).strip('"\''))
    os.makedirs(d, exist_ok=True)
    dst = os.path.join(d, 'hud_scene.yaml')
    ps = os.path.join(OPT, 'assets', 'theme', 'jarvis_pastel.yaml')
    if os.path.exists(ps):
        pdst = os.path.join(d, 'jarvis_pastel.yaml')
        pnew = open(ps, encoding='utf-8').read()
        if not os.path.exists(os.path.join(d, 'jarvis_pastel_theme.yaml')) and (not os.path.exists(pdst) or open(pdst, encoding='utf-8').read() != pnew):
            open(pdst, 'w', encoding='utf-8').write(pnew)       # motyw "Jarvis Pastel" dla projektow Pastel (gdy uzytkownik nie ma juz wlasnego pliku)
    new = _theme_text(open(src, encoding='utf-8').read())
    old = open(dst, encoding='utf-8').read() if os.path.exists(dst) else None
    if old != new:
        open(dst, 'w', encoding='utf-8').write(new)
        try:
            api('services/frontend/reload_themes', 'POST', {})
        except Exception as e:
            log('motyw: przeladowanie motywow nie powiodlo sie (%s) - zrob to recznie w Narzedziach deweloperskich' % e)
        log('motyw "HUD Scene" %s: %s' % ('zaktualizowany' if old else 'zainstalowany', dst))
    else:
        log('motyw "HUD Scene": aktualny')
    return True

def dependencies():
    """Sprawdza, czy w zasobach Lovelace sa wymagane karty."""
    async def run():
        ws = await _ws()
        c = Conn(ws)
        res = (await c.call({'type': 'lovelace/resources'}))['result']
        await ws.close()
        return res
    res = asyncio.run(run())
    urls = [r['url'] for r in res]
    return [{'name': n, 'required': req, 'installed': any(k in u for u in urls)} for n, (k, req) in REQUIRED_CARDS.items()]

def canvas_sources():
    """Lista dashboardow Lovelace (tryb storage) z widokami zawierajacymi picture-elements - zrodla importu do edytora."""
    async def run():
        ws = await _ws()
        c = Conn(ws)
        out = []
        dl = (await c.call({'type': 'lovelace/dashboards/list'}))['result']
        for d in dl:
            r = await c.call({'type': 'lovelace/config', 'url_path': d['url_path'], 'force': False})
            cfg = r.get('result') if r.get('success') else None
            if not cfg:
                continue
            views = [{'path': v.get('path') or str(i), 'title': v.get('title') or v.get('path') or str(i)} for i, v in enumerate(cfg.get('views', []))
                     if any(cc.get('type') == 'picture-elements' for cc in v.get('cards', []))]
            if views:
                out.append({'url_path': d['url_path'], 'title': d.get('title') or d['url_path'], 'views': views})
        await ws.close()
        return out
    return asyncio.run(run())


def canvas_import_views(body):
    """Pobiera wskazane widoki dashboardu i zamienia je na strony edytora (patrz canvas_import.py)."""
    import canvas_import
    url, want = body.get('url_path'), set(body.get('views') or [])
    async def run():
        ws = await _ws()
        c = Conn(ws)
        r = await c.call({'type': 'lovelace/config', 'url_path': url, 'force': False})
        await ws.close()
        return r.get('result') or {}
    cfg = asyncio.run(run())
    pages, size = [], None
    for i, v in enumerate(cfg.get('views', [])):
        if (v.get('path') or str(i)) not in want:
            continue
        pg = canvas_import.convert_view(v, CONF, url or '')
        if pg:
            size = size or (pg['w'], pg['h'])
            pages.append(pg)
    return {'pages': pages, 'w': (size or (1600, 1000))[0], 'h': (size or (1600, 1000))[1]}


def deploy_canvas(project, cfg_main, log, do_deploy=True, force=False, others=()):
    """Edytor wizualny: buduje dashboard z projektu i (opcjonalnie) wdraza go obok dashboardow z kreatora."""
    if project.get('kind') == 'pastel':
        return deploy_pastel(project, cfg_main, log, do_deploy, force)
    import canvas_build
    core_ = os.environ.get('HUD_GEN', OPT + '/core')
    if core_ not in sys.path:
        sys.path.insert(0, core_)      # moduly generatora (home_status, hdmi) potrzebne przy zapisie zasobow
    errs = canvas_build.validate(project)
    if errs:
        for e in errs:
            log('BLAD: ' + e)
        return False, {}
    cfg = copy.deepcopy(cfg_main)
    cfg.setdefault('dashboards', {})
    cfg['dashboards']['light_variants'] = False        # tryb Auto nie przekierowuje na dashboard -l
    r = canvas_build.build(project, os.path.join(WWW, 'canvas'), log)
    cfg['profiles'] = [p for p in cfg.get('profiles', []) if not str(p.get('id', '')).startswith('canvas')]
    for op in others:       # adresy pozostalych projektow (skrypt motywu musi je znac, zeby nie stracily rotacji pasków, wariantow tla itd.)
        for dv in canvas_build.devices(op):
            cfg['profiles'].append({'id': 'canvas-%s-%s' % (canvas_build.pid_of(op), dv['id']), 'kind': 'tablet', 'name': dv.get('name') or dv['id'],
                                    'path': op['base_path'] if dv['id'] == 'main' else '%s-%s' % (op['base_path'], dv['id'])})
    built, static_ = {}, {}
    ppid = canvas_build.pid_of(project)
    for did, b in r['devices'].items():
        pid = 'canvas-%s-%s' % (ppid, did)
        anim_ = bool(project.get('anim_switch'))        # przelacznik animacji tla (pomocnik input_boolean + statyczne kopie grafik tego urzadzenia)
        cfg['profiles'].append({'id': pid, 'kind': 'tablet', 'name': b['name'], 'path': b['path'], 'animation_switch': anim_})
        prefix_ = 'canvas_%s_%s_' % (ppid, did)
        cdir_ = os.path.join(WWW, 'canvas')
        if anim_:
            static_[pid] = make_static_copies(cdir_, log, prefix_)
            log('  %s: statyczne kopie teł dla przełącznika animacji: %d (pomocnik %s)' % (pid, len(static_[pid]), anim_entity(pid)))
            for vs_ in [b['views']] + ([b['light']['views']] if b.get('light') else []):
                for v_ in vs_:        # niewidoczny znacznik: dashboard musi odwolywac sie do pomocnika, inaczej przegladarka nie dostaje jego zmian na biezaco
                    for card_ in v_.get('cards', []):
                        if card_.get('type') == 'picture-elements':
                            card_['elements'].append({'type': 'state-label', 'entity': anim_entity(pid), 'style': {'left': '0.5%', 'top': '0.5%', 'opacity': '0', 'pointer-events': 'none', 'font-size': '1px'}})
        else:
            static_[pid] = []
            for n_ in os.listdir(cdir_):
                if n_.startswith(prefix_) and n_.endswith('_s.svg'):
                    os.remove(os.path.join(cdir_, n_))
        built[pid] = {'views': b['views'], 'path': b['path'], 'title': '%s - %s' % (project.get('name') or 'HUD Scene', b['name']) if len(r['devices']) > 1 else (project.get('name') or 'HUD Scene'),
                      'icon': 'mdi:view-grid-plus', 'files': len(b['views']), 'static': static_[pid], 'light': b['light']}
    add_shadows(r.get('shadows') or {})
    write_assets(cfg, log, None)
    try:        # lista grafik ze statyczna kopia: laczona z wpisami innych projektow (pliki _s, ktore nadal istnieja), bez nazw tego projektu, ktore juz jej nie maja
        sj_ = os.path.join(WWW, 'assets', 'static-bg.json')
        old_ = json.load(open(sj_, encoding='utf-8')) if os.path.exists(sj_) else []
        mine_ = 'canvas_%s_' % ppid
        keep_ = [n_ for n_ in old_ if not n_.startswith(mine_) and os.path.exists(os.path.join(WWW, 'canvas', n_[:-4] + '_s.svg'))]
        json.dump(sorted(set(keep_) | {n_ for v_ in static_.values() for n_ in v_}), open(sj_, 'w', encoding='utf-8'))
    except Exception as e_:
        log('static-bg.json: %s' % e_)
    if not do_deploy:
        log('Zbudowano bez wdrozenia.')
        return True, built
    install_theme(log)
    ok = asyncio.run(deploy_async(cfg, built, log, force))
    return ok, built


def deploy_pastel(project, cfg_main, log, do_deploy=True, force=False):
    """Projekt Pastel: jeden widok z karta custom:pastel-home-card (konfiguracja z formularza w kluczu cfg)."""
    import pastel_project as pp
    core_ = os.environ.get('HUD_GEN', OPT + '/core')
    if core_ not in sys.path:
        sys.path.insert(0, core_)
    cfg = copy.deepcopy(cfg_main)
    cfg.setdefault('dashboards', {})['light_variants'] = False
    cfg['profiles'] = [p for p in cfg.get('profiles', []) if not str(p.get('id', '')).startswith('canvas')]
    write_assets(cfg, log, None)
    v = pp.view(project)
    log('Pastel: %d pokoi, %d paliw, %d kalendarzy' % (len(v['cards'][0]['cfg']['rooms']), len(v['cards'][0]['cfg']['fuel']), len(v['cards'][0]['cfg']['cal'])))
    built = {'pastel-' + re.sub(r'[^a-z0-9]', '', project['base_path']): {'views': [v], 'path': project['base_path'], 'title': project.get('name') or 'Pastel', 'icon': 'mdi:flower-tulip',
                                                                       'files': 1, 'static': [], 'light': None}}
    if not do_deploy:
        log('Zbudowano bez wdrozenia.')
        return True, built
    install_theme(log)
    ok = asyncio.run(deploy_async(cfg, built, log, force))
    return ok, built


AUTO_TV = 'input_select.hud_scene_active_tv'

def _tv_players(cfg):
    md = (cfg.get('modules') or {}).get('media') or {}
    return [p['entity'] for p in md.get('players', []) if p.get('kind') in ('tv', 'stream')]

def auto_active_tv(cfg, log):
    """Wybor aktywnego TV (Multimedia / Salon): gdy skonfigurowano 2+ odtwarzacze TV i uzytkownik nie podal wlasnego pomocnika
    (modules.media.active_selector), dodatek sam tworzy input_select i podstawia go w konfiguracji (tylko na czas budowania)."""
    md = (cfg.get('modules') or {}).get('media')
    if not md or not md.get('enabled', True) or md.get('active_selector') or len(_tv_players(cfg)) < 2:
        return False
    md['active_selector'] = AUTO_TV
    log('wybor aktywnego TV: dodatek utworzy pomocnika %s (opcje: %d odtwarzaczy)' % (AUTO_TV, len(_tv_players(cfg))))
    return True

def deploy(cfg, log, do_deploy=True, force=False):
    cfg = copy.deepcopy(cfg)
    auto_active_tv(cfg, log)
    built = build_profiles(cfg, log)
    write_assets(cfg, log, built)
    if do_deploy:
        install_theme(log)
    if not do_deploy:
        log('Zbudowano bez wdrozenia (podglad plikow w /config/www/hud_scene).')
        return True, built
    ok = asyncio.run(deploy_async(cfg, built, log, force))
    return ok, built


# ---------------------------------------------------------------- usuwanie wdrozenia
def _theme_path():
    try:
        conf = open(os.path.join(CONF, 'configuration.yaml'), encoding='utf-8').read()
    except Exception:
        return None
    m = re.search(r'^\s*themes:\s*!include_dir_merge_named\s+(\S+)', conf, re.M)
    if not m:
        return None
    p = os.path.join(CONF, m.group(1).strip('"\''), 'hud_scene.yaml')
    if os.path.exists(p) and open(p, encoding='utf-8').read(40).startswith('HUD Scene:'):
        return p
    return None

def uninstall_plan():
    """Co dodatek utworzyl i moze usunac (tylko rzeczy, ktore sam zapisal lub rozpoznaje po nazwie)."""
    async def run():
        ws = await _ws()
        c = Conn(ws)
        dl = {d['url_path']: d for d in (await c.call({'type': 'lovelace/dashboards/list'}))['result']}
        res = (await c.call({'type': 'lovelace/resources'}))['result']
        await ws.close()
        return dl, res
    dl, res = asyncio.run(run())
    st = load_state()
    states = {s['entity_id'] for s in api('states')}
    return {
        'dashboards': [u for u in st.get('dashboards', []) if u in dl],
        'assets': os.path.isdir(WWW),
        'resources': [r['url'] for r in res if LOCAL + '/assets/' in r['url']],
        'theme': bool(_theme_path()),
        'helpers': [h for h in st.get('helpers', []) if h in states],
    }

async def _uninstall_async(opts, log):
    ws = await _ws()
    c = Conn(ws)
    st = load_state()
    dl = {d['url_path']: d for d in (await c.call({'type': 'lovelace/dashboards/list'}))['result']}
    def _pick(key, name):
        v = opts.get(key)
        return (lambda x: True) if v is True else (lambda x, v=v: x in v) if isinstance(v, list) and v else (lambda x: False)
    pd, pr_, ph = _pick('dashboards', 'd'), _pick('resources', 'r'), _pick('helpers', 'h')
    if opts.get('dashboards'):
        for u in list(st.get('dashboards', [])):
            if not pd(u):
                continue
            if u in dl:
                r = await c.call({'type': 'lovelace/dashboards/delete', 'dashboard_id': dl[u]['id']})
                log('dashboard /%s: %s' % (u, 'usuniety' if r['success'] else r.get('error')))
                if r['success']:
                    st['dashboards'].remove(u)
            else:
                st['dashboards'].remove(u)
    if opts.get('resources'):
        for r_ in (await c.call({'type': 'lovelace/resources'}))['result']:
            if LOCAL + '/assets/' in r_['url'] and pr_(r_['url']):
                r = await c.call({'type': 'lovelace/resources/delete', 'resource_id': r_['id']})
                log('zasob %s: %s' % (r_['url'].split('?')[0].rsplit('/', 1)[1], 'usuniety' if r['success'] else r.get('error')))
    if opts.get('helpers'):
        have = {x['entity_id'] for x in api('states')}
        st['helpers'] = list(dict.fromkeys(st.get('helpers', [])))       # bez powtorzen
        for ent in list(st.get('helpers', [])):
            if not ph(ent):
                continue
            if ent not in have:
                st['helpers'].remove(ent)      # pomocnika juz nie ma
                continue
            dom_ = ent.split('.', 1)[0]
            r = await c.call({'type': dom_ + '/delete', dom_ + '_id': ent.split('.', 1)[1]})
            log('pomocnik %s: %s' % (ent, 'usuniety' if r['success'] else r.get('error')))
            if r['success']:
                st['helpers'].remove(ent)
    await ws.close()
    save_state(st)

def uninstall(opts, log):
    if opts.get('theme'):
        p = _theme_path()
        if p:
            os.remove(p)
            try:
                api('services/frontend/reload_themes', 'POST', {})
            except Exception:
                pass
            log('motyw HUD Scene: usuniety (%s)' % p)
    asyncio.run(_uninstall_async(opts, log))
    if opts.get('assets') and os.path.isdir(WWW):
        shutil.rmtree(WWW, ignore_errors=True)
        log('katalog grafik %s: usuniety' % WWW)
    log('Konfiguracja dodatku (/data/hud_scene.json) zostala zachowana.')
    return True
