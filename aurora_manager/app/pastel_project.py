"""Projekt typu Pastel: dashboard z jednej karty custom:pastel-home-card, konfigurowany formularzem (pokoje, czujniki, paliwa, kalendarze...).
Konfiguracja projektu (project['pastel']) trafia do karty w kluczu cfg i nadpisuje domyslne wartosci karty."""
import re

DEFAULT_CFG = dict(rooms=[], out=dict(t='', h='', weather=''), pm='', purifier='', fuel=[], cal=[], calDays=2, lightsOff=[], mute='',
                   wash=dict(status='', end='', idle=[], phase={}), gas='', floodK='', floodL='', alarm='', door='', bats=[], temps=[], hums=[],
                   humMin=35, humMax=60, offline=[], events=[], media=dict(active='', radio='', tvs=[]), pipeline='', alarmSw='', server=dict(nodes=[], guests=[], storages=[]), f1=dict(on=False))
COLORS = ['lav', 'peach', 'butter', 'rose', 'sky', 'aqua']
ICONS = [(r'salon|living|pok[oó]j dzienny', 'mdi:sofa'), (r'kuchn', 'mdi:chef-hat'), (r'przedpok|hall|korytarz|wej', 'mdi:door-open'), (r'sypial|bedroom', 'mdi:bed'),
         (r'[lł]azien|bath', 'mdi:shower-head'), (r'biur|office|gabinet', 'mdi:desk'), (r'dzieci|kids|wiktor|micha', 'mdi:teddy-bear'), (r'gara', 'mdi:garage'), (r'ogr[oó]d|taras|balkon', 'mdi:flower')]


def merged(project):
    """Pelna konfiguracja karty: domyslne klucze + to, co ustawil uzytkownik."""
    import copy
    c = copy.deepcopy(DEFAULT_CFG)
    c.update(copy.deepcopy(project.get('pastel') or {}))
    return c


def jarvis_cfg():
    """Pelna konfiguracja widoku Jarvis Pastel uzytkownika (kopia 1:1; plik zapisuje generator make_pastel.py --addon)."""
    import json, os
    own = os.path.join(os.environ.get('HUD_CONFIG_DIR', '/config'), 'aurora_manager', 'baseline_cfg.json')
    with open(own if os.path.isfile(own) else os.path.join(os.path.dirname(os.path.abspath(__file__)), 'aurora_baseline_cfg.json'), encoding='utf-8') as f:
        return json.load(f)


def view(project):
    return {'title': project.get('name') or 'Pastel', 'path': 'home', 'icon': 'mdi:home-heart', 'theme': 'Jarvis Pastel', 'panel': True,
            'cards': [{'type': 'custom:pastel-home-card', 'cfg': merged(project)}]}


def seed(inv):
    """Propozycja konfiguracji z obszarow Home Assistanta (wizard.inventory): pokoje z oswietleniem, czujnikami temp./wilg. i obecnosci + wspolne czujniki."""
    cfg = merged({})
    allv = [e for a in inv['areas'] for e in a['entities']] + inv['unassigned']
    def first(L, pred):
        return next((e['id'] for e in L if pred(e)), '')
    n = 0
    for a in inv['areas']:
        E = a['entities']
        if re.search(r'zewn|outdoor|outside|ogr[oó]d', a['name'], re.I):
            cfg['out']['t'] = cfg['out']['t'] or first(E, lambda e: e['domain'] == 'sensor' and e['dc'] == 'temperature')
            cfg['out']['h'] = cfg['out']['h'] or first(E, lambda e: e['domain'] == 'sensor' and e['dc'] == 'humidity')
            continue
        if re.search(r'serwer|server|rack', a['name'], re.I):
            continue
        junk = re.compile(r'usb|permit|screen|always|motion|bridge|saver|panel|nadawa|tab10|tablet|power|auto|update|restart|identify', re.I)
        dev = [[e['id'], re.sub(r'^' + re.escape(a['name']) + r'\s*', '', e['name'], flags=re.I) or e['name'], 'mdi:lightbulb-outline' if e['domain'] == 'light' else 'mdi:power-socket-eu']
               for e in E if e['domain'] == 'light' or (e['domain'] == 'switch' and not junk.search(e['id'] + ' ' + e['name']))][:4]
        t = first(E, lambda e: e['domain'] == 'sensor' and e['dc'] == 'temperature')
        h = first(E, lambda e: e['domain'] == 'sensor' and e['dc'] == 'humidity')
        occ = first(E, lambda e: e['domain'] == 'binary_sensor' and e['dc'] in ('occupancy', 'motion', 'presence'))
        if not (dev or t or h or occ):
            continue
        icon = next((i for rx, i in ICONS if re.search(rx, a['name'], re.I)), 'mdi:home-outline')
        room = dict(id=re.sub(r'[^a-z0-9]+', '-', a['name'].lower()).strip('-') or 'pokoj%d' % n, name=a['name'], icon=icon, c=COLORS[n % len(COLORS)], occ=occ or None, dev=dev)
        if t: room['t'] = t
        if h: room['h'] = h
        cfg['rooms'].append(room)
        n += 1
    cfg['out']['weather'] = first(allv, lambda e: e['domain'] == 'weather')
    cfg['pm'] = first(allv, lambda e: e['dc'] == 'pm25')
    cfg['purifier'] = first(allv, lambda e: e['domain'] == 'fan' and re.search(r'purif|oczyszcz', e['id'] + e['name'], re.I))
    cfg['cal'] = [e['id'] for e in allv if e['domain'] == 'calendar'][:3]
    cfg['lightsOff'] = [d[0] for r in cfg['rooms'] for d in r['dev'] if d[0].startswith('light.')]
    cfg['bats'] = [e['id'] for e in allv if e['domain'] == 'sensor' and e['dc'] == 'battery' and not re.search(r'tablet|tab10|phone|telefon|panel|browser|rmx', e['id'] + e['name'], re.I)]
    cfg['temps'] = [[r['name'].upper(), r['t']] for r in cfg['rooms'] if r.get('t')]
    cfg['hums'] = [[r['name'].upper(), r['h']] for r in cfg['rooms'] if r.get('h')]
    cfg['gas'] = first(allv, lambda e: e['domain'] == 'binary_sensor' and e['dc'] in ('gas', 'smoke'))
    cfg['door'] = first(allv, lambda e: e['domain'] == 'binary_sensor' and e['dc'] in ('door', 'opening'))
    tvs = [[e['id'], e['name'], 'mdi:television'] for e in allv if e['domain'] == 'media_player'][:4]
    cfg['media']['tvs'] = tvs
    cfg['f1'] = dict(on=any(e['id'] == 'sensor.f1_next_race' for e in allv))      # widok Formuly 1, gdy zainstalowana integracja f1_sensor
    return cfg
