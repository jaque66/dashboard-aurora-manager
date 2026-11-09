"""Panel HUD Scene (ingress): API konfiguracji + statyczny interfejs. Tylko biblioteka standardowa Pythona."""
import manager
import json, os, sys, threading, time, traceback, urllib.request
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse, parse_qs

OPT = '/opt/hud_scene'
sys.path[:0] = [os.path.join(OPT, 'engine'), OPT, os.path.join(OPT, 'app')]
try:
    import validate   # walidacja starego edytora HUD (usunieta z tego dodatku)
except Exception:
    validate = None
import deploy as dp
import wizard
import pastel_layout as pl
import pastel_projects as pproj

DATA = os.environ.get('HUD_DATA', '/data')
CONF_DIR = os.environ.get('HUD_CONFIG_DIR', '/config')
CFG_FILE = os.path.join(DATA, 'hud_scene.json')
STATIC = os.path.join(OPT, 'app', 'static')
UI_VERSION = '0.1.308'      # zgodna z config.yaml; podstawiana w index.html jako ?v= (przegladarka pobiera nowe pliki panelu po aktualizacji)
OPTS = dp.OPTIONS
LEVELS = {'debug': 0, 'info': 1, 'warning': 2, 'error': 3}
LOGLVL = LEVELS.get(OPTS.get('log_level', 'info'), 1)
def dlog(*a):
    if LOGLVL == 0:
        print('[debug]', *a, flush=True)
BUILD = {'running': False, 'log': [], 'ok': None, 'finished': None}
LOCK = threading.Lock()

STARTER = {
    'version': 1, 'language': 'pl', 'title': 'HUD Scene',
    'layout': {'grid': '4x2', 'order': ['salon']},
    'sections': [{'id': 'salon', 'type': 'room', 'name': 'Salon'}],
    'modules': {},
    'profiles': [{'id': 'tablet', 'kind': 'tablet', 'name': 'Tablet', 'width': 1280, 'height': 800, 'performance': 'normal'}],
    'dashboards': {'base_path': 'hud-scene', 'light_variants': True},
}

def load_cfg():
    try:
        return json.load(open(CFG_FILE, encoding='utf-8'))
    except Exception:
        return json.loads(json.dumps(STARTER))

def save_cfg(cfg):
    os.makedirs(DATA, exist_ok=True)
    tmp = CFG_FILE + '.tmp'
    json.dump(cfg, open(tmp, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    os.replace(tmp, CFG_FILE)

def check(cfg, ha=True):
    errs, warn = [], []
    validate.check(cfg, validate.SCHEMA, '$', errs)
    if not errs:
        validate.cross(cfg, errs)
    if not errs:
        warn += validate.label_warnings(cfg)
        if ha:
            try:
                have = {s['entity_id'] for s in dp.api('states')}
                warn += ['encja nie istnieje w HA: ' + e for e in sorted(validate.entities_in(cfg)) if e not in have]
            except Exception as e:
                warn.append('nie udalo sie pobrac listy encji z HA: %s' % e)
    return errs, warn

def _pid(q):
    v = (q.get('p') or [''])[0]
    return v if v and pl.get_project(v) else None

TH_ENT = {'tMin': 'input_number.pastel_temperatura_min', 'tMax': 'input_number.pastel_temperatura_max', 'hMin': 'input_number.pastel_wilgotnosc_min', 'hMax': 'input_number.pastel_wilgotnosc_max'}

def th_get():
    """Progi ostrzezen temperatury i wilgotnosci (pomocnicy HA wspolni z ustawieniami karty)."""
    out = {}
    for k, e in TH_ENT.items():
        try:
            out[k] = float(dp.api('states/' + e)['state'])
        except Exception:
            out[k] = None
    return out

def th_set(vals):
    for k, v in (vals or {}).items():
        if k in TH_ENT and isinstance(v, (int, float)) and not isinstance(v, bool):
            dp.api('services/input_number/set_value', 'POST', {'entity_id': TH_ENT[k], 'value': v})

def entity_list():
    out = []
    for s in dp.api('states'):
        out.append([s['entity_id'], s['attributes'].get('friendly_name', '')])
    out.sort()
    return out

def run_uninstall(opts):
    def log(m):
        BUILD['log'].append('%s  %s' % (time.strftime('%H:%M:%S'), m))
    try:
        log('start (usuwanie wdrozenia)')
        dp.uninstall(opts, log)
        BUILD['ok'] = True
        log('KONIEC: sukces')
    except Exception:
        BUILD['ok'] = False
        log('BLAD:\n' + traceback.format_exc())
    finally:
        BUILD['running'] = False
        BUILD['finished'] = time.time()
        BUILD['dashboards'] = []

CANVAS_FILE = os.path.join(DATA, 'canvas.json')
TPL_FILE = os.path.join(DATA, 'canvas_templates.json')
CANVAS_DEFAULT = {'name': 'HUD Scene Canvas', 'base_path': 'hud-canvas', 'w': 1600, 'h': 1000, 'grid': 20, 'snap': True, 'accent': '#00e5ff', 'bg_grid': True,
                  'pages': [{'id': 'home', 'title': 'Home', 'items': []}]}

PROJ_DIR = os.path.join(DATA, 'projects')
ACTIVE_FILE = os.path.join(DATA, 'active_project.txt')
import re as _re

def _pid_from(proj):
    return _re.sub(r'[^a-z0-9]', '', str(proj.get('pid') or proj.get('base_path') or proj.get('name') or 'projekt').lower()) or 'projekt'

def _pfile(pid):
    return os.path.join(PROJ_DIR, pid + '.json')

def _write_json(path, obj):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    json.dump(obj, open(path + '.tmp', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    os.replace(path + '.tmp', path)

def project_ids():
    if not os.path.isdir(PROJ_DIR):
        return []
    return sorted(f[:-5] for f in os.listdir(PROJ_DIR) if f.endswith('.json'))

def _migrate():
    """Jeden projekt z poprzednich wersji (canvas.json) -> katalog projektow."""
    if project_ids() or not os.path.isfile(CANVAS_FILE):
        return
    try:
        pr = json.load(open(CANVAS_FILE, encoding='utf-8'))
    except Exception:
        return
    pr['pid'] = _pid_from(pr)
    _write_json(_pfile(pr['pid']), pr)
    open(ACTIVE_FILE, 'w').write(pr['pid'])
    os.replace(CANVAS_FILE, CANVAS_FILE + '.migrated')

def active_pid():
    _migrate()
    ids = project_ids()
    try:
        a = open(ACTIVE_FILE).read().strip()
    except Exception:
        a = ''
    if a in ids:
        return a
    if ids:
        return ids[0]
    pr = json.loads(json.dumps(CANVAS_DEFAULT)); pr['pid'] = _pid_from(pr)
    _write_json(_pfile(pr['pid']), pr)
    return pr['pid']

def load_project(pid):
    pr = json.load(open(_pfile(pid), encoding='utf-8'))
    pr['pid'] = pid
    return pr

def load_canvas():
    return load_project(active_pid())

def save_project(pid, pr):
    pr['pid'] = pid
    _write_json(_pfile(pid), pr)

def list_projects():
    act = active_pid()
    out = []
    for pid in project_ids():
        try:
            pr = load_project(pid)
        except Exception:
            continue
        out.append({'pid': pid, 'name': pr.get('name') or pid, 'base_path': pr.get('base_path'), 'pages': len(pr.get('pages') or []),
                    'devices': [d.get('name') or d.get('id') for d in (pr.get('devices') or [])] or ['Tablet'], 'light': bool(pr.get('light')), 'kind': pr.get('kind') or 'canvas',
                    'updated': int(os.path.getmtime(_pfile(pid)))})
    return {'active': act, 'projects': out}

def base_in_use(base, skip_pid=None):
    for pid in project_ids():
        if pid == skip_pid:
            continue
        try:
            if load_project(pid).get('base_path') == base:
                return pid
        except Exception:
            pass
    return None

def new_project(body):
    """body: {name, base_path?, size? 'WxH', project? (gotowy projekt do zaimportowania), from? pid (duplikat)}"""
    if body.get('kind') == 'pastel':
        import pastel_project as pp, wizard
        try:
            seeded = pp.jarvis_cfg() if body.get('template') == 'jarvis' else pp.seed(wizard.inventory())
        except Exception:
            seeded = pp.merged({})
        pr = {'kind': 'pastel', 'name': body.get('name') or 'Pastel', 'base_path': '', 'w': 1280, 'h': 800, 'grid': 20, 'snap': True, 'accent': '#b9a6ff', 'bg_grid': False,
              'light': True, 'style': 'pastel', 'devices': [{'id': 'main', 'name': 'Pastel', 'w': 1280, 'h': 800, 'bgv': 0}],
              'pages': [{'id': 'home', 'title': 'Dom', 'items': [], 'layouts': {}}], 'pastel': seeded}
        body = dict(body, base_path=body.get('base_path') or ('pastel-' + _re.sub(r'[^a-z0-9]+', '', str(body.get('name') or 'dom').lower())))
    elif isinstance(body.get('project'), dict):
        pr = json.loads(json.dumps(body['project']))
    elif body.get('from'):
        pr = load_project(body['from'])
    else:
        w, h = [int(x) for x in str(body.get('size') or '1600x1000').lower().replace('×', 'x').split('x')]
        pr = {'name': body.get('name') or 'Nowy projekt', 'base_path': '', 'w': w, 'h': h, 'grid': 20, 'snap': True, 'accent': '#00e5ff', 'bg_grid': True, 'light': True,
              'devices': [{'id': 'main', 'name': 'Tablet' if w >= h else 'Telefon', 'w': w, 'h': h, 'bgv': 0}],
              'pages': [{'id': 'start', 'title': 'Start', 'items': [], 'layouts': {}}]}
    if body.get('name'):
        pr['name'] = body['name']
    base = _re.sub(r'[^a-z0-9-]+', '-', str(body.get('base_path') or pr.get('base_path') or pr.get('name') or 'projekt').lower()).strip('-') or 'projekt'
    if '-' not in base:
        base += '-hud'
    b0, n = base, 2
    while base_in_use(base):
        base = '%s-%d' % (b0, n); n += 1
    pr['base_path'] = base
    pid0 = _pid_from({'base_path': base}); pid, n = pid0, 2
    while pid in project_ids():
        pid = '%s%d' % (pid0, n); n += 1
    save_project(pid, pr)
    open(ACTIVE_FILE, 'w').write(pid)
    return pid

def undeploy_project(pid):
    """Usuwa dashboardy projektu (tylko utworzone przez dodatek) i jego pliki tla; projekt zostaje."""
    pr = load_project(pid)
    removed = []
    dp.remove_dashboards(dp.project_urls(pr), lambda m: removed.append(m))
    import canvas_build
    d = os.path.join(dp.WWW, 'canvas')
    n = 0
    for f in (os.listdir(d) if os.path.isdir(d) else []):
        if f.startswith('canvas_%s_' % canvas_build.pid_of(pr)):
            os.remove(os.path.join(d, f)); n += 1
    removed.append('usunieto plikow tla: %d' % n)
    return removed

def delete_project(pid, with_dashboards):
    removed = undeploy_project(pid) if with_dashboards else []
    os.remove(_pfile(pid))
    return removed

def backup_projects(log):
    """Kopia wszystkich projektow przed wdrozeniem; trzyma ostatnie backup_keep."""
    if not OPTS.get('auto_backup', True):
        return
    import shutil
    bd = os.path.join(DATA, 'project_backups')
    os.makedirs(bd, exist_ok=True)
    dst = os.path.join(bd, time.strftime('%Y%m%d-%H%M%S'))
    if os.path.isdir(PROJ_DIR):
        shutil.copytree(PROJ_DIR, dst)
        log('kopia projektow: ' + dst)
    keep = int(OPTS.get('backup_keep', 10))
    for old in sorted(os.listdir(bd))[:-keep]:
        shutil.rmtree(os.path.join(bd, old), ignore_errors=True)

IMG_EXT = ('.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg')
def img_dir():
    d = os.path.join(dp.WWW, 'images'); os.makedirs(d, exist_ok=True); return d

BASES_FILE = os.path.join(DATA, 'deployed_bases.json')
def _bases():
    try:
        return json.load(open(BASES_FILE, encoding='utf-8'))
    except Exception:
        return {}

def _bases_save(project):
    import canvas_build
    b = _bases(); b[canvas_build.pid_of(project)] = project['base_path']
    json.dump(b, open(BASES_FILE, 'w', encoding='utf-8'))

def _drop_old_base(project, log):
    """Zmieniono adres dashboardu projektu: stare dashboardy (utworzone przez dodatek) sa usuwane przy wdrozeniu pod nowym adresem."""
    import canvas_build
    old = _bases().get(canvas_build.pid_of(project))
    if old and old != project['base_path']:
        log('zmiana adresu dashboardu: /%s -> /%s, usuwam stare dashboardy' % (old, project['base_path']))
        dp.remove_dashboards(dp.project_urls(dict(project, base_path=old)), log)

def run_canvas(project, do_deploy, force, others=()):
    def log(m):
        BUILD['log'].append('%s  %s' % (time.strftime('%H:%M:%S'), m))
    try:
        log('start edytora wizualnego (%s)' % ('budowanie i wdrozenie' if do_deploy else 'tylko budowanie'))
        if do_deploy:
            backup_projects(log)
            _drop_old_base(project, log)
        ok, built = dp.deploy_canvas(project, load_cfg(), log, do_deploy, force, others)
        BUILD['ok'] = ok
        if do_deploy and ok:
            _bases_save(project)
        BUILD['dashboards'] = [{'profile': k, 'path': v['path'], 'views': len(v['views'])} for k, v in built.items()]
        log('KONIEC: %s' % ('sukces' if ok else 'z bledami (patrz wyzej)'))
    except Exception:
        BUILD['ok'] = False
        log('BLAD:\n' + traceback.format_exc())
    finally:
        BUILD['running'] = False
        BUILD['finished'] = time.time()

def run_build(cfg, do_deploy, force):
    def log(m):
        BUILD['log'].append('%s  %s' % (time.strftime('%H:%M:%S'), m))
    try:
        log('start (%s)' % ('budowanie i wdrozenie' if do_deploy else 'tylko budowanie'))
        ok, built = dp.deploy(cfg, log, do_deploy, force)
        BUILD['ok'] = ok
        BUILD['dashboards'] = [{'profile': k, 'path': v['path'], 'views': len(v['views'])} for k, v in built.items()]
        log('KONIEC: %s' % ('sukces' if ok else 'z bledami (patrz wyzej)'))
    except Exception:
        BUILD['ok'] = False
        log('BLAD:\n' + traceback.format_exc())
    finally:
        BUILD['running'] = False
        BUILD['finished'] = time.time()

class H(BaseHTTPRequestHandler):
    def _send(self, code, body, ctype='application/json'):
        if not isinstance(body, (bytes, bytearray)):
            body = json.dumps(body, ensure_ascii=False).encode('utf-8')
        self.send_response(code)
        self.send_header('Content-Type', ctype + ('; charset=utf-8' if ctype.startswith(('text', 'application/json')) else ''))
        self.send_header('Content-Length', str(len(body)))
        self.send_header('Cache-Control', 'no-store')
        self.end_headers()
        self.wfile.write(body)

    def _body(self):
        n = int(self.headers.get('Content-Length') or 0)
        return json.loads(self.rfile.read(n) or b'{}')

    def log_message(self, fmt, *a):
        dlog(fmt % a)

    def do_GET(self):
        if self.path.startswith('/manager'):
            return manager.serve(self, 'GET')
        u = urlparse(self.path)
        q = parse_qs(u.query)
        p = u.path.rstrip('/') or '/'
        try:
            if p == '/api/pastel/layout':
                return self._send(200, dict(pl.state(_pid(q)), th=th_get()))
            if p == '/api/pastel/ha':   # podglad na zywo: tylko odczyt historii i kalendarzy z HA (wykresy, wydarzenia)
                path = (q.get('path') or [''])[0]
                import re as _re
                if not _re.match(r'^(history/period|calendars)/[A-Za-z0-9_.:/%+-]*(\?[A-Za-z0-9_.:,=&%+-]*)?$', path):
                    return self._send(403, {'error': 'niedozwolona ścieżka'})
                return self._send(200, dp.api(path))
            if p == '/api/pastel/states':
                return self._send(200, dp.api('states'))
            if p == '/api/pastel/projects':
                return self._send(200, pl.list_projects())
            if p == '/api/pastel/areas':
                return self._send(200, pproj.areas())
            if p.startswith('/api/pastel/backups/'):
                try:
                    return self._send(200, {'layout': pl.get_backup(p.rsplit('/', 1)[1], _pid(q))})
                except KeyError:
                    return self._send(404, {'error': 'nie ma takiej kopii'})
            if p == '/api/config':
                return self._send(200, load_cfg())
            if p == '/api/schema':
                return self._send(200, validate.SCHEMA)
            if p == '/api/entities':
                return self._send(200, entity_list())
            if p.startswith('/api/i18n/'):
                lang = p.rsplit('/', 1)[1]
                f = os.path.join(OPT, 'i18n', 'panel.%s.json' % lang)
                return self._send(200, json.load(open(f, encoding='utf-8')))
            if p == '/api/status':
                return self._send(200, {**BUILD, 'dashboards': BUILD.get('dashboards', [])})
            if p == '/api/deps':
                return self._send(200, dp.dependencies())
            if p == '/api/wizard/areas':
                return self._send(200, wizard.area_summary(wizard.inventory()))
            if p == '/api/uninstall/plan':
                return self._send(200, dp.uninstall_plan())
            if p == '/api/projects':
                return self._send(200, list_projects())
            if p == '/api/canvas':
                qp = q.get('pid', [''])[0]
                return self._send(200, load_project(qp) if qp in project_ids() else load_canvas())
            if p == '/api/canvas/sources':
                return self._send(200, dp.canvas_sources())
            if p == '/api/canvas/templates/builtin':        # przykladowe szablony dostarczane z dodatkiem (opt/templates.json)
                try:
                    return self._send(200, json.load(open(os.path.join(OPT, 'templates.json'), encoding='utf-8')))
                except Exception:
                    return self._send(200, [])
            if p == '/api/canvas/templates':
                try:
                    return self._send(200, json.load(open(TPL_FILE, encoding='utf-8')))
                except Exception:
                    return self._send(200, [])
            if p == '/api/states':
                out = []
                for s in dp.api('states'):
                    a = s['attributes']
                    o = {'id': s['entity_id'], 'name': a.get('friendly_name', ''), 'state': s['state'], 'unit': a.get('unit_of_measurement', ''), 'icon': a.get('icon', ''), 'dc': a.get('device_class', '')}
                    if s['entity_id'].startswith('weather.'):
                        o['attrs'] = {k: a[k] for k in ('temperature', 'humidity', 'wind_speed', 'temperature_unit') if k in a}
                    if s['entity_id'].startswith('media_player.'):
                        o['attrs'] = {k: a[k] for k in ('media_title', 'media_artist', 'media_channel', 'source') if k in a}
                    if s['entity_id'].startswith(('select.', 'input_select.')):
                        o['attrs'] = {'options': a.get('options') or []}
                    if s['entity_id'].startswith('calendar.'):
                        o['attrs'] = {k: a[k] for k in ('start_time', 'end_time', 'message', 'all_day') if k in a}
                    o['lc'] = s.get('last_changed')
                    out.append(o)
                return self._send(200, out)
            if p == '/api/import':
                f = os.path.join(CONF_DIR, 'hud_scene_import.json')
                if not os.path.isfile(f):
                    return self._send(404, {'error': 'brak pliku'})
                return self._send(200, json.load(open(f, encoding='utf-8')))
            if p == '/api/canvas/images':
                d = img_dir()
                return self._send(200, {'dir': dp.OUT_DIR, 'files': sorted([{'name': f, 'size': os.path.getsize(os.path.join(d, f))} for f in os.listdir(d) if f.lower().endswith(IMG_EXT)], key=lambda x: x['name'])})
            if p == '/api/info':
                return self._send(200, {'version': UI_VERSION, 'language': OPTS.get('language', 'pl'), 'out_dir': dp.OUT_DIR, 'dashboards_created': dp.load_state()['dashboards']})
            if p.startswith('/assets/') and p.endswith('.js'):       # karta Pastel dla podgladu w edytorze (iframe pastel_preview.html)
                ff = os.path.join(OPT, 'assets', os.path.basename(p))
                if os.path.isfile(ff):
                    return self._send(200, open(ff, 'rb').read(), 'application/javascript')
                return self._send(404, {'error': 'not found'})
            if p.startswith('/fonts/'):       # czcionki edytora (podglad napisow): te same pliki, ktore trafiaja do HA
                ff = os.path.join(OPT, 'assets', 'fonts', os.path.basename(p))
                if os.path.isfile(ff):
                    self.send_response(200)
                    self.send_header('Content-Type', 'font/woff2' if ff.endswith('woff2') else 'font/woff')
                    self.send_header('Cache-Control', 'max-age=86400')
                    data = open(ff, 'rb').read()
                    self.send_header('Content-Length', str(len(data)))
                    self.end_headers()
                    self.wfile.write(data)
                    return
                return self._send(404, {'error': 'not found'})
            name = 'pastel.html' if p in ('/', '/index.html') else p.lstrip('/')
            f = os.path.normpath(os.path.join(STATIC, name))
            if f.startswith(STATIC) and os.path.isfile(f):
                ct = {'.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.json': 'application/json'}.get(os.path.splitext(f)[1], 'application/octet-stream')
                data = open(f, 'rb').read()
                if name.endswith('.html'):
                    data = data.replace(b'__V__', UI_VERSION.encode())
                return self._send(200, data, ct)
            self._send(404, {'error': 'not found'})
        except Exception as e:
            self._send(500, {'error': str(e)})

    def do_PUT(self):
        p = urlparse(self.path).path.rstrip('/')
        try:
            if p == '/api/config':
                cfg = self._body()
                errs, _ = check(cfg, ha=False)
                if errs:
                    return self._send(400, {'errors': errs})
                save_cfg(cfg)
                return self._send(200, {'ok': True})
            if p == '/api/canvas/templates':
                tp = self._body()
                if not isinstance(tp, list):
                    return self._send(400, {'errors': ['szablony musza byc lista']})
                os.makedirs(DATA, exist_ok=True)
                json.dump(tp, open(TPL_FILE, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
                return self._send(200, {'ok': True})
            if p == '/api/canvas':
                import canvas_build
                proj = self._body()
                errs = canvas_build.validate(proj)
                if errs:
                    return self._send(400, {'errors': errs})
                pid = proj.get('pid')      # projekt wskazuje sam body (edytor w innej karcie/przegladarce moze miec inny projekt aktywny niz serwer)
                if pid and pid not in project_ids():
                    return self._send(409, {'errors': ['projekt "%s" zostal usuniety - odswiez panel' % pid]})
                if not pid:
                    pid = active_pid()
                other = base_in_use(proj.get('base_path'), pid)
                if other:
                    return self._send(400, {'errors': ['adres dashboardu "%s" uzywa juz projekt "%s"' % (proj.get('base_path'), other)]})
                save_project(pid, proj)
                return self._send(200, {'ok': True})
            if p == '/api/projects/active':
                pid = self._body().get('pid')
                if pid not in project_ids():
                    return self._send(404, {'error': 'nie ma takiego projektu'})
                open(ACTIVE_FILE, 'w').write(pid)
                return self._send(200, {'ok': True, 'active': pid})
            self._send(404, {'error': 'not found'})
        except Exception as e:
            self._send(500, {'error': str(e)})

    def do_DELETE(self):
        u = urlparse(self.path)
        p = u.path.rstrip('/')
        q = parse_qs(u.query)
        try:
            if p.startswith('/api/pastel/backups/'):
                try:
                    pl.delete_backup(p.rsplit('/', 1)[1], _pid(q))
                except OSError:
                    return self._send(404, {'error': 'nie ma takiej kopii'})
                return self._send(200, {'ok': True, 'backups': pl.list_backups(_pid(q))})
            if p.startswith('/api/pastel/projects/'):
                try:
                    pproj.delete(p.rsplit('/', 1)[1])
                except KeyError:
                    return self._send(404, {'error': 'nie ma takiego projektu'})
                return self._send(200, {'ok': True, 'projects': pl.list_projects()})
            if p == '/api/canvas/image':
                name = os.path.basename(q.get('name', [''])[0])
                f = os.path.join(img_dir(), name)
                if not name or not os.path.isfile(f):
                    return self._send(404, {'error': 'brak pliku'})
                os.remove(f)
                return self._send(200, {'ok': True})
            if p.startswith('/api/projects/'):
                pid = p.rsplit('/', 1)[1]
                if pid not in project_ids():
                    return self._send(404, {'error': 'nie ma takiego projektu'})
                if len(project_ids()) < 2:
                    return self._send(400, {'error': 'nie mozna usunac ostatniego projektu'})
                log = delete_project(pid, q.get('dashboards', ['0'])[0] == '1')
                return self._send(200, {'ok': True, 'log': log, **list_projects()})
            self._send(404, {'error': 'not found'})
        except Exception as e:
            self._send(500, {'error': str(e)})

    def do_POST(self):
        if self.path.startswith('/manager'):
            return manager.serve(self, 'POST')
        u = urlparse(self.path)
        p = u.path.rstrip('/')
        q = parse_qs(u.query)
        try:
            if p == '/api/canvas/image':       # wgranie wlasnej grafiki tla (surowe bajty w body, nazwa w ?name=)
                import re as _r
                n = int(self.headers.get('Content-Length') or 0)
                if n <= 0 or n > 15 * 1024 * 1024:
                    return self._send(400, {'error': 'plik pusty albo wiekszy niz 15 MB'})
                name = _r.sub(r'[^A-Za-z0-9._-]+', '_', os.path.basename(q.get('name', ['tlo.png'])[0])).strip('._') or 'tlo.png'
                if not name.lower().endswith(IMG_EXT):
                    return self._send(400, {'error': 'dozwolone: ' + ', '.join(IMG_EXT)})
                data = self.rfile.read(n)
                d, base, ext, k = img_dir(), os.path.splitext(name)[0], os.path.splitext(name)[1].lower(), 2
                name = base + ext
                while os.path.exists(os.path.join(d, name)):
                    name = '%s-%d%s' % (base, k, ext); k += 1
                open(os.path.join(d, name), 'wb').write(data)
                return self._send(200, {'ok': True, 'name': name})
            if p == '/api/pastel/publish':
                b = self._body()
                try:
                    new = pl.publish(b.get('layout'), OPTS.get('backup_keep', 10), _pid(q))
                    th_set(b.get('th'))
                except ValueError as e:
                    return self._send(400, {'error': str(e)})
                return self._send(200, {'ok': True, 'rev': new['rev'], 'saved': new['saved'], 'backups': pl.list_backups(_pid(q))})
            if p == '/api/pastel/backups':
                b = self._body()
                try:
                    pl.add_backup(str(b.get('name') or 'Kopia ręczna')[:60], b.get('layout'), pid=_pid(q))
                except ValueError as e:
                    return self._send(400, {'error': str(e)})
                return self._send(200, {'ok': True, 'backups': pl.list_backups(_pid(q))})
            if p == '/api/pastel/projects':
                b = self._body()
                try:
                    pr = pproj.create(b.get('name'), 'copy' if b.get('mode') == 'copy' else 'new', b.get('areas') or [])
                except (ValueError, RuntimeError) as e:
                    return self._send(400, {'error': str(e)})
                return self._send(200, {'ok': True, 'project': pr, 'projects': pl.list_projects()})
            if p == '/api/validate':
                cfg = self._body()
                errs, warn = check(cfg, ha=True)
                return self._send(200, {'errors': errs, 'warnings': warn})
            if p == '/api/canvas/bgvariant':       # podglad wariantu tla w edytorze (te same reguly co przy budowaniu)
                import bg_variants
                b = self._body()
                return self._send(200, {'svg': bg_variants.make(str(b.get('svg') or ''), int(b.get('v') or 0))})
            if p.startswith('/api/projects/') and p.endswith('/undeploy'):
                pid = p.split('/')[3]
                if pid not in project_ids():
                    return self._send(404, {'error': 'nie ma takiego projektu'})
                return self._send(200, {'ok': True, 'log': undeploy_project(pid)})
            if p == '/api/projects':
                pid = new_project(self._body())
                return self._send(200, {'ok': True, 'pid': pid, **list_projects()})
            if p == '/api/pastel/seed':        # propozycja konfiguracji projektu Pastel z obszarow Home Assistanta
                import pastel_project as pp, wizard
                return self._send(200, pp.seed(wizard.inventory()))
            if p == '/api/canvas/import':
                return self._send(200, dp.canvas_import_views(self._body()))
            if p == '/api/canvas/build':
                qp = q.get('pid', [''])[0]
                proj = load_project(qp) if qp in project_ids() else load_canvas()
                with LOCK:
                    if BUILD['running']:
                        return self._send(409, {'error': 'budowanie juz trwa'})
                    BUILD.update(running=True, log=[], ok=None, finished=None, dashboards=[])
                others = [load_project(x) for x in project_ids() if x != proj.get('pid')]
                threading.Thread(target=run_canvas, args=(proj, q.get('deploy', ['0'])[0] == '1', q.get('force', ['0'])[0] == '1', others), daemon=True).start()
                return self._send(200, {'started': True})
            if p == '/api/build':
                cfg = load_cfg()
                errs, _ = check(cfg, ha=False)
                if errs:
                    return self._send(400, {'errors': errs})
                with LOCK:
                    if BUILD['running']:
                        return self._send(409, {'error': 'budowanie juz trwa'})
                    BUILD.update(running=True, log=[], ok=None, finished=None, dashboards=[])
                threading.Thread(target=run_build, args=(cfg, q.get('deploy', ['1'])[0] == '1', q.get('force', ['0'])[0] == '1'), daemon=True).start()
                return self._send(200, {'started': True})
            if p == '/api/wizard/propose':
                b = self._body()
                cfg, summary = wizard.propose(wizard.inventory(), b.get('areas', []), b.get('include', {}), b.get('language', 'pl'), b.get('grid', '4x2'))
                errs, warn = check(cfg, ha=True)
                return self._send(200, {'config': cfg, 'summary': summary, 'errors': errs, 'warnings': warn})
            if p == '/api/uninstall':
                opts = self._body()
                with LOCK:
                    if BUILD['running']:
                        return self._send(409, {'error': 'operacja juz trwa'})
                    BUILD.update(running=True, log=[], ok=None, finished=None, dashboards=[])
                threading.Thread(target=run_uninstall, args=(opts,), daemon=True).start()
                return self._send(200, {'started': True})
            self._send(404, {'error': 'not found'})
        except Exception as e:
            self._send(500, {'error': str(e)})

if __name__ == '__main__':
    os.makedirs(DATA, exist_ok=True)
    print('HUD Scene %s: panel na porcie 8099, jezyk=%s, log=%s, grafiki=%s' % (UI_VERSION, OPTS.get('language', 'pl'), OPTS.get('log_level', 'info'), dp.WWW), flush=True)
    manager.start()
    ThreadingHTTPServer(('0.0.0.0', int(os.environ.get('HUD_PORT', '8099'))), H).serve_forever()
