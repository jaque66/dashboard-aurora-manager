"""Aurora Manager 3.x: tworzenie dashboardow Aurora Pulse. Konfigurator wybiera encje (pokoje, dom), blok ekranu glownego, dock i menu "Wiecej",
motyw i kolorystyke; manager buduje z tego karte `custom:aurora-pulse-card` (cfg + layout + nav + theme + scheme) i zapisuje dashboard w HA."""
import asyncio, hashlib, json, os, re, shutil, time
import wizard
import ha as dp

DATA = os.environ.get('JM_DATA', '/data')
DIR = os.path.join(DATA, 'dashboards')
OLD_DIR = os.path.join(DATA, 'newdash')          # rekordy kreatora z wersji 2.x (odczyt)
HERE = os.path.dirname(os.path.abspath(__file__))
ASSETS = os.path.join(HERE, 'assets')
CONF = os.environ.get('HUD_CONFIG_DIR', '/config')
CARDS = ('aurora-pulse-card.js',)

CHECKS = ['bat', 'offline', 'climate', 'door', 'air', 'wash', 'utility', 'weather']
THEMES = ['auto', 'off', 'xmas', 'matrix', 'jarvis', 'vice', 'spring', 'summer', 'autumn', 'winter', 'space', 'aurora', 'deep', 'holo']
BLOCKS = [('clock', 'Zegar i data', 'mdi:clock-outline'), ('weather', 'Pogoda', 'mdi:weather-partly-cloudy'), ('pulse', 'Puls domu', 'mdi:heart-pulse'),
          ('now', 'Teraz (alarmy i ostrzeżenia)', 'mdi:play-circle-outline'), ('school', 'Szkoła', 'mdi:school-outline'), ('rooms', 'Pokoje', 'mdi:sofa-outline'), ('lights', 'Światła', 'mdi:lightbulb-group-outline')]
# widoki: id -> (nazwa, ikona); dostepnosc liczona z encji w HA
VIEWS = [('kalendarz', 'Kalendarz', 'mdi:calendar-month-outline'), ('pogoda', 'Pogoda', 'mdi:weather-partly-cloudy'), ('klimat', 'Klimat', 'mdi:thermometer'), ('powietrze', 'Powietrze', 'mdi:leaf'),
         ('baterie', 'Baterie', 'mdi:battery-heart-variant'), ('multimedia', 'Multimedia', 'mdi:play-box-outline'), ('szkola', 'Szkoła', 'mdi:school-outline'), ('radio', 'Radio', 'mdi:radio'),
         ('tv', 'Program TV', 'mdi:television-guide'), ('zadania', 'Zadania', 'mdi:format-list-checks'), ('f1', 'Formuła 1', 'mdi:flag-checkered'), ('asystent', 'Asystent', 'mdi:creation'),
         ('ustawienia', 'Ustawienia', 'mdi:cog-outline')]
# moduly opcjonalne: wybierane przy tworzeniu dashboardu; wymagaja dodatkowych integracji lub aplikacji (notatka "need" pokazywana w kreatorze)
MODULES = [
    {'id': 'radio', 'name': 'Radio', 'icon': 'mdi:radio', 'views': ['radio'],
     'desc': 'Widok radia internetowego (RMF ON, Eurozet i inne): stacje, ostatnio grane, wybór odtwarzacza.',
     'need': 'Wymaga integracji „Radio RMF ON i ZET” (HACS: github.com/jaque66/ha-radio-pl) – karta radio-pl-card jest w niej wbudowana i ładuje się sama. Odtwarzacze wybierasz poniżej.'},
    {'id': 'tv', 'name': 'Program TV', 'icon': 'mdi:television-guide', 'views': ['tv'],
     'desc': 'Program telewizyjny z przełączaniem kanałów na dekoderze lub telewizorze.',
     'need': 'Wymaga integracji „TV guide” (HACS: github.com/dariuszpaluch/ha-tv-guide) – karta tv-guide jest w niej wbudowana. Dodatkowo plik www/jarvis/tv-guide-config.json z listą kanałów (i encją dekodera, jeśli kanały mają się przełączać).'},
    {'id': 'zadania', 'name': 'Zadania', 'icon': 'mdi:format-list-checks', 'views': ['zadania'],
     'desc': 'Listy zadań dzieci z zatwierdzaniem przez rodzica.',
     'need': 'Wymaga list zadań (integracja Local To-do) o nazwach todo.zadania_<dziecko>. Bez nich widok będzie pusty.'},
    {'id': 'f1', 'name': 'Formuła 1', 'icon': 'mdi:flag-checkered', 'views': ['f1'],
     'desc': 'Następny wyścig, klasyfikacje, wyniki i transmisja na żywo.',
     'need': 'Wymaga integracji „F1 Sensor” (HACS) – encje sensor.f1_*.'},
    {'id': 'guard', 'name': 'Aurora Guard', 'icon': 'mdi:shield-lock-outline', 'views': ['guard'],
     'desc': 'Blokowanie aplikacji i całego telefonu dziecka z poziomu dashboardu, limity czasu, lokalizacja, tryb nocny.',
     'need': 'Wymaga aplikacji Android „Aurora Guard” na telefonie dziecka (github.com/jaque66/aurora-guard, plik APK z wydania). Konfigurację w Home Assistant (pomocniki, listy, szablony webhooka, automatyzacje) tworzy kreator w zakładce „Urządzenia Guard” – tam też dodasz kolejne urządzenia.'},
]
MOD_VIEWS = {v: m['id'] for m in MODULES for v in m['views']}
DOCK_EXTRA = [('lights', 'Światła', 'mdi:lightbulb-group-outline'), ('rooms', 'Pokoje', 'mdi:sofa-outline'), ('events', 'Wydarzenia', 'mdi:calendar-clock-outline')]
DEF_NAV = {'dock': ['lights', 'events'], 'tdock': ['rooms', 'klimat', 'multimedia', 'events', 'pogoda', 'powietrze'], 'menu': []}


BAT_JUNK = re.compile(r'browser_mod|browser|tablet|tab10|panel|telefon|phone|kiosk|companion|ipad|laptop|pc_', re.I)   # baterie urzadzen z przegladarka/tabletow: zwykle niedostepne, generuja falszywe alarmy


def slug(s):
    return wizard.slug(s)


PAL = ['lav', 'peach', 'butter', 'rose', 'sky', 'aqua', 'mint', 'sand']
ICONS = [(r'salon|dzienny|living', 'mdi:sofa'), (r'kuchn', 'mdi:chef-hat'), (r'sypial', 'mdi:bed'), (r'łazien|lazien|toalet|wc', 'mdi:shower-head'), (r'przedpok|korytarz|hol|wiatrołap', 'mdi:door-open'),
         (r'biur|gabinet|praco', 'mdi:desk'), (r'gara', 'mdi:garage'), (r'ogr|taras|balkon', 'mdi:flower'), (r'dziec|pokój|pokoj', 'mdi:teddy-bear')]
DEVICON = {'light': 'mdi:lightbulb-outline', 'switch': 'mdi:power-socket-eu', 'media_player': 'mdi:television', 'fan': 'mdi:fan', 'cover': 'mdi:blinds'}


def _icon(name):
    n = name.lower()
    return next((ic for rx, ic in ICONS if re.search(rx, n)), 'mdi:home-outline')


def propose_cfg(area_ids):
    """Pokoje z wybranych obszarow HA: czujniki temperatury/wilgotnosci/swiatla/obecnosci i urzadzenia + wspolne encje (pogoda, PM2.5, kalendarze, baterie)."""
    inv = wizard.inventory()
    sel = [a for a in inv['areas'] if a['id'] in set(area_ids or [])]
    rooms, used = [], set()
    for i, a in enumerate(sel):
        E = a['entities']
        pick = lambda f: next((e['id'] for e in E if f(e)), '')
        rid = wizard.slug(a['name']).replace('-', '_')[:20]; k = 2
        while rid in used:
            rid = '%s_%d' % (wizard.slug(a['name']).replace('-', '_')[:18], k); k += 1
        used.add(rid)
        devs = [e for e in E if e['domain'] in ('light', 'switch', 'media_player', 'fan', 'cover')]
        devs.sort(key=lambda e: ('light', 'switch', 'media_player', 'fan', 'cover').index(e['domain']))
        rooms.append({'id': rid, 'name': a['name'][:24], 'icon': _icon(a['name']), 'c': PAL[i % len(PAL)],
                      't': pick(lambda e: e['domain'] == 'sensor' and e['dc'] == 'temperature'), 'h': pick(lambda e: e['domain'] == 'sensor' and e['dc'] == 'humidity'),
                      'lux': pick(lambda e: e['domain'] == 'sensor' and e['dc'] == 'illuminance'),
                      'occ': pick(lambda e: e['domain'] == 'binary_sensor' and e['dc'] in ('motion', 'occupancy', 'presence')),
                      'dev': [[e['id'], wizard.short(e['name'], a['name']), DEVICON.get(e['domain'], 'mdi:power')] for e in devs[:8]]})
    allents = [e for a in inv['areas'] for e in a['entities']] + inv.get('unassigned', [])
    first = lambda f: next((e['id'] for e in allents if f(e)), '')
    cfg = {'rooms': rooms, 'out': {'t': '', 'h': '', 'weather': first(lambda e: e['domain'] == 'weather')},
           'pm': first(lambda e: e['domain'] == 'sensor' and e['dc'] == 'pm25'),
           'purifier': first(lambda e: e['domain'] == 'fan' and re.search(r'purif|oczysz|air', e['id'] + e['name'], re.I)),
           'bats': [e['id'] for e in allents if e['domain'] == 'sensor' and e['dc'] == 'battery'][:40],
           'cal': [s['entity_id'] for s in dp.api('states') if s['entity_id'].startswith('calendar.')][:6]}
    return cfg




def _domains():
    """Domeny integracji, ktore maja wpis konfiguracji w HA (wykrywanie integracji bez wlasnych encji, np. TV Guide)."""
    async def run():
        ws = await dp.ws_connect(); c = dp.Conn(ws)
        try:
            return (await c.call({'type': 'config_entries/get'}))['result']
        finally:
            await ws.close()
    try:
        return {e['domain'] for e in asyncio.run(run())}
    except Exception:
        return set()


def _states():
    return {s['entity_id']: s for s in dp.api('states')}


def catalog():
    """Obszary HA z encjami i listy kandydatow do wyboru (pogoda, czujniki, kalendarze...) oraz dostepnosc widokow."""
    inv = wizard.inventory(); st = _states()
    areas = []
    for a in inv['areas']:
        E = [{'id': e['id'], 'name': e['name'], 'domain': e['domain'], 'dc': e['dc']} for e in a['entities'] if e['domain'] in ('light', 'switch', 'media_player', 'fan', 'cover', 'climate', 'sensor', 'binary_sensor', 'automation')
             and (e['domain'] not in ('sensor', 'binary_sensor') or e['dc'] in ('temperature', 'humidity', 'illuminance', 'motion', 'occupancy', 'presence'))]
        if E:
            areas.append({'id': a['id'], 'name': a['name'], 'entities': E})
    allv = inv['unassigned'] + [e for a in inv['areas'] for e in a['entities']]
    JUNK2 = re.compile(r'permit|screen|saver|tablet|tab10|bridge|muffl|doorbell|hdmi|sync|satellite|voice|update|restart|identify|reboot|usb|mute|pipeline|do_not_disturb|child_lock|led$|browser_mod|panel', re.I)
    pick = lambda f, av=True: sorted(({'id': e['id'], 'name': e['name']} for e in allv if f(e) and (not av or (st.get(e['id']) or {}).get('state') != 'unavailable') and not (e['domain'] in ('switch', 'media_player', 'fan') and JUNK2.search(e['id'] + ' ' + e['name']))), key=lambda x: x['name'].lower())
    fn = lambda s: ({'id': s['entity_id'], 'name': s['attributes'].get('friendly_name', s['entity_id'])})
    G = {'weather': pick(lambda e: e['domain'] == 'weather'), 'temp': pick(lambda e: e['domain'] == 'sensor' and e['dc'] == 'temperature'), 'hum': pick(lambda e: e['domain'] == 'sensor' and e['dc'] == 'humidity'),
         'pm': pick(lambda e: e['domain'] == 'sensor' and e['dc'] in ('pm25', 'pm2_5')), 'purifier': pick(lambda e: e['domain'] == 'fan'),
         'door': pick(lambda e: e['domain'] == 'binary_sensor' and e['dc'] in ('door', 'window', 'opening', 'garage_door')), 'gas': pick(lambda e: e['domain'] == 'binary_sensor' and e['dc'] in ('gas', 'smoke', 'carbon_monoxide')),
         'flood': pick(lambda e: e['domain'] == 'binary_sensor' and e['dc'] == 'moisture'), 'battery': pick(lambda e: e['domain'] == 'sensor' and e['dc'] == 'battery', False),
         'calendar': pick(lambda e: e['domain'] == 'calendar'), 'media': pick(lambda e: e['domain'] == 'media_player'), 'light': pick(lambda e: e['domain'] in ('light', 'switch')),
         'alarm': pick(lambda e: e['domain'] in ('select', 'input_select', 'sensor') and re.search(r'alarm', e['id'] + e['name'], re.I)), 'alarmsw': pick(lambda e: e['domain'] in ('switch', 'input_boolean') and re.search(r'alarm', e['id'] + e['name'], re.I)),
         'todo': pick(lambda e: e['domain'] == 'todo')}
    for b in G['battery']:
        b['state'] = (st.get(b['id']) or {}).get('state', '')
        b['junk'] = bool(BAT_JUNK.search(b['id'] + ' ' + b['name']))
    has = lambda pre: any(i.startswith(pre) for i in st)
    dom = _domains()
    tvcfg = os.path.isfile(os.path.join(CONF, 'www', 'jarvis', 'tv-guide-config.json'))
    ok = lambda c, why='': {'ok': bool(c), 'why': '' if c else why}
    V = {'kalendarz': ok(G['calendar'], 'brak kalendarzy'), 'pogoda': ok(G['weather'], 'brak encji pogody'), 'klimat': ok(True), 'powietrze': ok(G['pm'] or G['purifier'], 'brak czujnika PM2.5 / oczyszczacza'),
         'baterie': ok(G['battery'], 'brak czujników baterii'), 'multimedia': ok(G['media'], 'brak odtwarzaczy'), 'szkola': ok(has('calendar.szkola_') or has('sensor.szkola_'), 'brak integracji Vulcan (kalendarze szkola_*)'),
         'radio': ok('sensor.radio_pl_now_playing' in st or 'radio_pl' in dom, 'brak integracji Radio PL'), 'tv': ok('tv_guide' in dom and tvcfg, 'brak integracji TV Guide' if 'tv_guide' not in dom else 'brak pliku www/jarvis/tv-guide-config.json (lista kanałów)'),
         'zadania': ok(G['todo'], 'brak list zadań (todo)'), 'f1': ok('sensor.f1_next_race' in st or 'f1_sensor' in dom, 'brak integracji F1'), 'asystent': ok(True), 'ustawienia': ok(True)}
    M = {'radio': V['radio'], 'tv': V['tv'], 'zadania': V['zadania'], 'f1': V['f1'],
         'guard': ok('sensor.aurora_guard_' in ' '.join(st) or any(i.startswith('input_boolean.blokada_telefon_') for i in st), 'nie wykryto helperów ani czujników Aurora Guard')}
    return {'areas': areas, 'g': G, 'views': V, 'modules': M, 'cards': cards_state()}


def _slugn(s):
    return wizard.slug(s)[:20].replace('-', '_')


def propose(area_ids):
    """Poczatkowa konfiguracja z wybranych obszarow: pokoje + wspolne encje; wszystko mozna potem poprawic w konfiguratorze."""
    cfg = propose_cfg(area_ids)
    JUNK = re.compile(r'permit|screen|saver|tablet|tab10|bridge|alarm|muffl|doorbell|hdmi|sync|satellite|voice|update|restart|identify|reboot|power$|pralka|usb|browser_mod|panel', re.I)
    for r in cfg['rooms']:
        r['dev'] = [d for d in r['dev'] if not JUNK.search(d[0] + ' ' + d[1])][:8]
    cat = catalog()
    g = cat['g']
    # czujniki zewnetrzne: z obszaru "na zewnatrz" jesli jest
    inv = wizard.inventory()
    for a in inv['areas']:
        if wizard.OUTDOOR_RX.search(a['name']):
            cfg['out']['t'] = cfg['out']['t'] or next((e['id'] for e in a['entities'] if e['domain'] == 'sensor' and e['dc'] == 'temperature'), '')
            cfg['out']['h'] = cfg['out']['h'] or next((e['id'] for e in a['entities'] if e['domain'] == 'sensor' and e['dc'] == 'humidity'), '')
    cfg['bats'] = [b['id'] for b in g['battery'] if b['state'] not in ('unavailable', 'unknown', '') and not b['junk']]
    cfg['checks'] = {k: True for k in CHECKS}; cfg['ignore'] = []
    cfg.update({'door': (g['door'] or [{'id': ''}])[0]['id'], 'gas': (g['gas'] or [{'id': ''}])[0]['id'], 'floodK': (g['flood'] or [{'id': ''}])[0]['id'], 'floodL': (g['flood'][1:2] or [{'id': ''}])[0]['id'],
                'alarm': '', 'alarmSw': '', 'radioPlayers': [], 'media': {'active': '', 'radio': '', 'tvs': []}, 'todo': {'editors': [], 'viewers': []},
                'f1': {'on': False}, 'cal': [x['id'] for x in g['calendar'] if not x['id'].startswith('calendar.szkola_')][:6]})
    cfg['lightsOff'] = [d[0] for r in cfg['rooms'] for d in r['dev'] if d[0].split('.')[0] in ('light', 'switch')]
    seen, tvs = set(), []
    for e in g['media']:
        if re.search(r'tv|telewiz|dekoder|stick|chromecast|android', e['id'] + e['name'], re.I) and e['name'] not in seen:
            seen.add(e['name']); tvs.append([e['id'], e['name'][:22], 'mdi:television'])
    cfg['media']['tvs'] = tvs[:4]
    nav = json.loads(json.dumps(DEF_NAV))
    ok = cat['views']
    nav['tdock'] = [v for v in nav['tdock'] if v in ('rooms', 'events') or ok.get(v, {}).get('ok')]
    nav['menu'] = [v[0] for v in VIEWS if ok[v[0]]['ok'] and v[0] not in ('ustawienia', 'asystent') and v[0] not in MOD_VIEWS]
    cfg['f1'] = {'on': False}; cfg['guard'] = []
    return {'cfg': cfg, 'nav': nav, 'modules': [], 'modcfg': {'radioPlayers': [], 'guard': []}, 'blocks': {'order': [b[0] for b in BLOCKS], 'hide': [] if ok['szkola']['ok'] else ['school']}, 'views': ok}


def _derive(cfg):
    """Pola, ktore karta liczy z pokoi (listy temperatur/wilgotnosci, urzadzenia kontrolowane, baterie)."""
    c = json.loads(json.dumps(cfg))
    R = c.get('rooms') or []
    for r in R:
        r.setdefault('c', 'lav'); r.setdefault('icon', 'mdi:home-outline'); r['id'] = r.get('id') or _slugn(r.get('name', 'pokoj'))
        for k in ('t', 'h', 'lux', 'occ'):
            r.setdefault(k, '')
        r['dev'] = r.get('dev') or []
    c['temps'] = [[r['name'].upper()[:12], r['t']] for r in R if r.get('t')]
    c['hums'] = [[r['name'].upper()[:12], r['h']] for r in R if r.get('h')]
    c.setdefault('humMin', 35); c.setdefault('humMax', 60)
    key = [[x, True] for x in (c.get('gas'), c.get('floodK'), c.get('floodL'), c.get('door'), c.get('alarm')) if x]
    key += [[x, False] for x in [c.get('pm'), c.get('purifier')] + [r.get('occ') for r in R] if x]   # urzadzenia pokoi nie generuja uwag o braku lacznosci
    c['offline'] = key
    c.setdefault('bats', []); c.setdefault('cal', []); c.setdefault('calDays', 2); c.setdefault('pipeline', ''); c.setdefault('warn', '')
    c.setdefault('wash', {'status': '', 'end': '', 'idle': [], 'phase': {}}); c.setdefault('server', {'nodes': [], 'guests': [], 'storages': []})
    c.setdefault('tab', {'bat': '', 'chg': ''}); c.setdefault('reminders', []); c.setdefault('remSlots', []); c.setdefault('remWarn', 3); c.setdefault('events', []); c.setdefault('fuel', [])
    c.setdefault('radioPlayers', []); c.setdefault('todo', {'editors': [], 'viewers': []}); c.setdefault('f1', {'on': False}); c.setdefault('media', {'active': '', 'radio': '', 'tvs': []})
    return c


def layout(blocks, w=1280, h=800):
    """Uklad karty: tablet (siatka 12 kolumn, 3 kolumny tresci) i telefon (kolejnosc + ukryte)."""
    hide = [b for b in (blocks.get('hide') or [])]
    order = [b for b in (blocks.get('order') or []) if b in dict((x[0], 1) for x in BLOCKS)] or [b[0] for b in BLOCKS]
    order += [b[0] for b in BLOCKS if b[0] not in order]
    w = max(240, int(w or 1280)); h = max(240, int(h or 800))
    cols = 12; R = max(6, min(10, round(h / (w / cols))))
    ph = max(3, R - 4); lh = max(1, R - 1 - ph); wh = 2 if R >= 7 else 1
    sh = max(1, (R - wh) * 3 // 5); nh = max(1, R - wh - sh)
    tb = {'weather': dict(x=0, y=0, w=3, h=wh), 'school': dict(x=0, y=wh, w=3, h=sh), 'now': dict(x=0, y=wh + sh, w=3, h=nh), 'clock': dict(x=3, y=0, w=6, h=1),
          'pulse': dict(x=3, y=1, w=6, h=ph), 'lights': dict(x=3, y=1 + ph, w=6, h=lh), 'rooms': dict(x=9, y=0, w=3, h=R)}
    return {'v': 1, 'res': [w, h], 'tablet': {'cols': cols, 'rows': R, 'blocks': tb, 'hide': hide}, 'phone': {'order': order, 'hide': hide}}


def apply_modules(d):
    """Zwraca (cfg, nav) po uwzglednieniu modulow: wylaczone moduly znikaja z menu/docku i z konfiguracji."""
    mods = d.get('modules')
    cfg = json.loads(json.dumps(d['cfg'])); nav = json.loads(json.dumps(d.get('nav') or {}))
    if mods is None:   # rekord sprzed modulow: zachowaj dotychczasowe zachowanie
        return cfg, nav
    on = set(mods)
    for k in ('dock', 'tdock', 'menu'):
        nav[k] = [v for v in nav.get(k, []) if MOD_VIEWS.get(v, 'x') in on or v not in MOD_VIEWS]
    if 'f1' not in on: cfg['f1'] = {'on': False}
    else: cfg['f1'] = {'on': True}
    if 'guard' not in on: cfg['guard'] = []
    else: cfg['guard'] = [g for g in (cfg.get('guard') or []) if g.get('id') and g.get('name')]
    if 'radio' not in on: cfg['radioPlayers'] = []
    for m in on:
        for v in next((x['views'] for x in MODULES if x['id'] == m), []):
            if v != 'guard' and v not in nav.get('menu', []) and v not in nav.get('dock', []) and v not in nav.get('tdock', []): nav.setdefault('menu', []).append(v)
    return cfg, nav


def dashboard_config(d):
    cfg0, nav0 = apply_modules(d); d = dict(d, nav=nav0)
    cfg = _derive(cfg0)
    lay = layout(d.get('blocks') or {}, d.get('w'), d.get('h'))
    nav = d.get('nav') or {}
    th, sc = d.get('theme') or 'auto', d.get('scheme') or ''
    card = {'type': 'custom:aurora-pulse-card', 'empty': True, 'cfg': cfg, 'layout': lay, 'nav': nav}
    if th != 'auto': card['theme'] = th
    if sc: card['scheme'] = sc
    saver = {'type': 'custom:aurora-pulse-saver-card', 'empty': True, 'cfg': {'out': cfg.get('out'), 'alarm': cfg.get('alarm', ''), 'alarmSw': cfg.get('alarmSw', '')}}
    if th != 'auto': saver['theme'] = th
    if sc: saver['scheme'] = sc
    return {'title': d['name'], 'views': [{'title': 'Dom', 'path': 'home', 'icon': 'mdi:home-heart', 'panel': True, 'cards': [card]},
                                          {'title': 'Wygaszacz', 'path': 'wygaszacz', 'icon': 'mdi:weather-partly-cloudy', 'panel': True, 'cards': [saver]}]}


# ---------------- karty jako zasoby Lovelace ----------------
def _hash(name):
    f = os.path.join(ASSETS, name)
    return hashlib.md5(open(f, 'rb').read()).hexdigest()[:10] if os.path.isfile(f) else ''


def cards_state():
    async def run():
        ws = await dp.ws_connect(); c = dp.Conn(ws)
        try:
            return (await c.call({'type': 'lovelace/resources'}))['result']
        finally:
            await ws.close()
    try:
        res = asyncio.run(run())
    except Exception:
        res = []
    out = {}
    for n in CARDS:
        r = [x for x in res if n in x['url']]
        mine = [x for x in r if '/aurora_manager/' in x['url']]
        out[n] = {'installed': bool(r), 'managed': bool(mine), 'current': bool(mine) and ('v=' + _hash(n)) in mine[0]['url'], 'foreign': bool(r) and not mine}
    return out


def ensure_cards():
    """Instaluje/aktualizuje obie karty z dodatku (jesli nie ma wlasnych kopii w innych miejscach). Zwraca liste komunikatow."""
    msgs = []
    dst = os.path.join(CONF, 'www', 'aurora_manager')

    async def run():
        ws = await dp.ws_connect(); c = dp.Conn(ws)
        try:
            res = (await c.call({'type': 'lovelace/resources'}))['result']
            for n in CARDS:
                src = os.path.join(ASSETS, n)
                if not os.path.isfile(src):
                    msgs.append('Brak pliku %s w dodatku.' % n); continue
                url = '/local/aurora_manager/%s?v=%s' % (n, _hash(n))
                mine = [x for x in res if '/aurora_manager/' in x['url'] and n in x['url']]
                other = [x for x in res if n in x['url'] and '/aurora_manager/' not in x['url']]
                if other and not mine:
                    msgs.append('Karta %s jest już zainstalowana inną drogą (%s) – używam jej bez zmian.' % (n, other[0]['url'].split('?')[0])); continue
                os.makedirs(dst, exist_ok=True); shutil.copyfile(src, os.path.join(dst, n))
                if mine:
                    if mine[0]['url'] != url:
                        await c.call({'type': 'lovelace/resources/update', 'resource_id': mine[0]['id'], 'res_type': 'module', 'url': url})
                        msgs.append('Zaktualizowano kartę %s.' % n)
                else:
                    await c.call({'type': 'lovelace/resources/create', 'res_type': 'module', 'url': url})
                    msgs.append('Zainstalowano kartę %s.' % n)
        finally:
            await ws.close()
    asyncio.run(run())
    return msgs


# ---------------- rekordy dashboardow ----------------
def _file(rid):
    return os.path.join(DIR, re.sub(r'[^A-Za-z0-9_.-]', '', rid) + '.json')


def _migrate(r):
    """Rekord kreatora 2.x -> format 3.x."""
    blocks = {'order': [b[0] for b in BLOCKS], 'hide': []}
    lay = r.get('layout') or {}
    if lay.get('phone'): blocks = {'order': lay['phone'].get('order') or blocks['order'], 'hide': lay['phone'].get('hide') or []}
    return {'id': r['id'], 'name': r['name'], 'path': r['path'], 'theme': 'auto', 'scheme': '', 'w': (r.get('res') or [1280, 800])[0] or 1280, 'h': (r.get('res') or [1280, 800])[1] or 800,
            'cfg': r.get('cfg') or {}, 'blocks': blocks, 'nav': json.loads(json.dumps(DEF_NAV)), 'created': r.get('created'), 'legacy': True}


def list_records():
    out, seen = [], set()
    for d, old in ((DIR, False), (OLD_DIR, True)):
        if not os.path.isdir(d):
            continue
        for f in sorted(os.listdir(d)):
            if not f.endswith('.json'):
                continue
            try:
                r = json.load(open(os.path.join(d, f), encoding='utf-8'))
            except Exception:
                continue
            if old and (r.get('style') != 'pulse' or r['id'] in seen):
                continue
            seen.add(r['id'])
            out.append({'id': r['id'], 'name': r.get('name'), 'path': r.get('path'), 'theme': r.get('theme', 'auto'), 'created': r.get('created'), 'rooms': len((r.get('cfg') or {}).get('rooms') or []), 'legacy': old})
    return out


def get(rid):
    for d, old in ((DIR, False), (OLD_DIR, True)):
        f = os.path.join(d, re.sub(r'[^A-Za-z0-9_.-]', '', rid) + '.json')
        if os.path.isfile(f):
            r = json.load(open(f, encoding='utf-8'))
            return _migrate(r) if old else r
    raise KeyError('nie ma takiego dashboardu')


async def _ha_save(path, name, conf, create):
    ws = await dp.ws_connect(); c = dp.Conn(ws)
    try:
        ds = (await c.call({'type': 'lovelace/dashboards/list'}))['result']
        exists = any(x['url_path'] == path for x in ds)
        if create and exists:
            raise RuntimeError('dashboard /%s już istnieje' % path)
        if not exists:
            r = await c.call({'type': 'lovelace/dashboards/create', 'url_path': path, 'title': name, 'icon': 'mdi:weather-night', 'show_in_sidebar': True, 'require_admin': False, 'mode': 'storage'})
            if not r.get('success'):
                raise RuntimeError('nie udało się utworzyć dashboardu: %s' % r.get('error'))
        r = await c.call({'type': 'lovelace/config/save', 'url_path': path, 'config': conf})
        if not r.get('success'):
            raise RuntimeError('nie udało się zapisać dashboardu: %s' % r.get('error'))
    finally:
        await ws.close()


async def _ha_delete(path):
    ws = await dp.ws_connect(); c = dp.Conn(ws)
    try:
        ds = (await c.call({'type': 'lovelace/dashboards/list'}))['result']
        for x in ds:
            if x['url_path'] == path:
                await c.call({'type': 'lovelace/dashboards/delete', 'dashboard_id': x['id']})
    finally:
        await ws.close()


def save(body):
    name = (body.get('name') or '').strip()[:40]
    if not name:
        raise ValueError('podaj nazwę dashboardu')
    cfg = body.get('cfg') or {}
    if not cfg.get('rooms'):
        raise ValueError('dodaj co najmniej jedno pomieszczenie')
    th = body.get('theme') or 'auto'
    if th not in THEMES:
        raise ValueError('nieznany motyw')
    rid = body.get('id') or ('%s-%d' % (slug(name), int(time.time())))
    old = None
    try:
        old = get(rid) if body.get('id') else None
    except KeyError:
        old = None
    path = old['path'] if old else (body.get('path') or 'aurora-' + slug(name))
    if '-' not in path:
        path = 'aurora-' + path
    msgs = ensure_cards()
    rec = {'id': rid, 'name': name, 'path': path, 'theme': th, 'scheme': body.get('scheme') or '', 'w': body.get('w') or 1280, 'h': body.get('h') or 800, 'cfg': cfg,
           'blocks': body.get('blocks') or {}, 'nav': body.get('nav') or {}, 'modules': body.get('modules') if isinstance(body.get('modules'), list) else [], 'created': (old or {}).get('created') or time.strftime('%Y-%m-%d %H:%M')}
    asyncio.run(_ha_save(path, name, dashboard_config(rec), create=old is None))
    os.makedirs(DIR, exist_ok=True)
    json.dump(rec, open(_file(rid), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    return {'record': {k: rec[k] for k in ('id', 'name', 'path')}, 'messages': msgs}


def delete(rid, remove_ha):
    r = get(rid)
    if remove_ha:
        asyncio.run(_ha_delete(r['path']))
    for d in (DIR, OLD_DIR):
        f = os.path.join(d, re.sub(r'[^A-Za-z0-9_.-]', '', rid) + '.json')
        if os.path.isfile(f):
            os.remove(f)
    return {'ok': True}
