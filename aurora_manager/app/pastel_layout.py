"""Uklad prawdziwego dashboardu Jarvis Pastel: plik pastel-layout.json czytany przez karte, kopie zapasowe i styl domyslny.
Pliki: <config>/www/jarvis/pastel-layout.json (aktualny, serwowany jako /local/jarvis/...), pastel-layout.default.json (styl domyslny,
zapisuje go generator karty), <config>/hud_scene/pastel_backups/*.json (kopie). Tylko biblioteka standardowa."""
import json, os, re, time

CONF = os.environ.get('HUD_CONFIG_DIR', '/config')
WWW = os.path.join(CONF, 'www', 'jarvis')
LIVE = os.path.join(WWW, 'pastel-layout.json')
DEFAULT = os.path.join(WWW, 'pastel-layout.default.json')
BK_DIR = os.path.join(CONF, 'hud_scene', 'pastel_backups')
PROJ_FILE = os.path.join(CONF, 'hud_scene', 'pastel_projects.json')


def _live(pid=None):
    return LIVE if not pid else os.path.join(WWW, 'pastel-layout-%s.json' % pid)


def _defp(pid=None):
    return DEFAULT if not pid else os.path.join(WWW, 'pastel-layout.default-%s.json' % pid)


def _bkd(pid=None):
    return BK_DIR if not pid else os.path.join(BK_DIR, pid)
SCHEMA_V = 2
# ten sam uklad domyslny, co DEF_HOME w make_pastel.py (generator zapisuje go tez do pastel-layout.default.json)
DEF_HOME = {'order': ['hero', 'rooms', 'as', 'status', 'school', 'air', 'fuel', 'cal', 'links'], 'porder': ['hero', 'as', 'status', 'school', 'rooms', 'air', 'fuel', 'cal', 'links'], 'hide': [],
            'sec': {'hero': {'w': 1, 'h': 1}, 'rooms': {'w': 3, 'h': 3}, 'as': {'w': 1, 'h': 1}, 'status': {'w': 1, 'h': 1}, 'school': {'w': 1, 'h': 1}, 'air': {'w': 1, 'h': 1}, 'fuel': {'w': 1, 'h': 1}, 'cal': {'w': 1, 'h': 1}, 'links': {'w': 4, 'h': 1}}}
IDS = list(DEF_HOME['order'])
HIDEABLE = IDS + ['today']
MAXW, MAXH = 4, 8
# elementy wewnatrz sekcji: klucz (data-pe w karcie), nazwa, rodzaj: t = tekst/ikona, n0/n1/n2 = liczba (domyslna liczba miejsc po przecinku), l = skrot (mozna zmienic nazwe)
ELEMENTS = {
    'hero': [('greet', 'Powitanie', 't'), ('time', 'Zegar', 't'), ('date', 'Data', 't'), ('icon', 'Ikona pogody', 't'), ('temp', 'Temperatura', 'n1'), ('desc', 'Opis pogody', 't'), ('hum', 'Wilgotność', 'n0'), ('pm', 'PM2.5', 'n0')],
    'as': [('listen', 'Przycisk „Dotknij i mów”', 't'), ('mic', 'Mikrofon', 't'), ('view', 'Przycisk historii rozmów', 't')],
    'status': [('title', 'Nagłówek sekcji', 't'), ('list', 'Lista alarmów', 't')],
    'school': [('title', 'Nagłówek sekcji', 't'), ('list', 'Lista sprawdzianów, kartkówek i zadań', 't')],
    'rooms': [('title', 'Nagłówek sekcji', 't'), ('name', 'Nazwa pokoju', 't'), ('occ', 'Obecność (Ktoś jest / Pusto)', 't'), ('temp', 'Temperatura', 'n1'), ('hum', 'Wilgotność', 'n0'), ('lux', 'Natężenie światła', 't'),
              ('devs', 'Urządzenia', 't'), ('extra', 'Czujniki i status (drzwi, pralka…)', 't'), ('auto', 'Przycisk automatycznego gaszenia', 't'), ('wm', 'Znak wodny pokoju', 't')],
    'air': [('title', 'Nagłówek sekcji', 't'), ('ring', 'Wskaźnik PM2.5', 'n0'), ('text', 'Opis jakości', 't'), ('purifier', 'Stan oczyszczacza', 't'), ('btn', 'Przycisk oczyszczacza', 't')],
    'fuel': [('title', 'Nagłówek sekcji', 't'), ('price', 'Ceny (format liczby)', 'n2')],
    'cal': [('title', 'Nagłówek sekcji', 't'), ('list', 'Lista wydarzeń', 't')],
    'sv': [('tm', 'Zegar', 't'), ('dt', 'Data', 't'), ('tp', 'Pogoda i temperatura', 't'), ('hum', 'Wilgotność', 't'), ('al', 'Pasek alarmów', 't')],
    'links': [('a_off', 'Światła', 'l'), ('klimat', 'Klimat', 'l'), ('multimedia', 'Multimedia', 'l'), ('a_alarm', 'Alarm', 'l'), ('plan2d', 'Plan Mieszkania', 'l'), ('baterie', 'Baterie', 'l'), ('f1', 'Formuła 1', 'l'), ('transport', 'Transport', 'l'), ('serwer', 'Serwer', 'l'), ('dziennik', 'Historia', 'l'), ('ustawienia', 'Ustawienia', 'l')],
}
# widoki szczegolowe: bloki, ktore mozna ukryc i ostylowac (klucz data-pe = <widok>.<blok>)
VIEWS = {
    'rv': ('Pomieszczenia', [('hdr', 'Nagłówek pokoju'), ('occ', 'Obecność (Ktoś jest / Pusto)'), ('big', 'Duże wartości (temperatura, wilgotność, światło)'), ('extra', 'Czujniki i status (drzwi, pralka, gaz, zalanie)'), ('dev', 'Urządzenia'), ('bigT', '— Temperatura'), ('bigH', '— Wilgotność'), ('bigL', '— Światło'), ('chartT', 'Wykres temperatury'), ('chartH', 'Wykres wilgotności')]),
    'stan': ('Stan domu', [('hdr', 'Nagłówek'), ('list', 'Lista alarmów'), ('info', 'Informacje'), ('foot', 'Stopka z godziną sprawdzenia')]),
    'bat': ('Baterie', [('hdr', 'Nagłówek'), ('list', 'Lista baterii')]),
    'klimat': ('Klimat', [('hdr', 'Nagłówek'), ('cards', 'Kafelki pokoi'), ('foot', 'Stopka z zakresem komfortu')]),
    'powietrze': ('Powietrze', [('hdr', 'Nagłówek'), ('card', 'Wskaźnik jakości'), ('pur', 'Oczyszczacz'), ('chart', 'Wykres PM2.5')]),
    'serwer': ('Serwer', [('hdr', 'Nagłówek'), ('nodes', 'Węzły'), ('guests', 'Maszyny i kontenery'), ('stor', 'Magazyny')]),
    'tr': ('Transport', [('hdr', 'Nagłówek'), ('routes', 'Zapisane połączenia'), ('search', 'Wyszukiwarka połączeń')]),
    'szk': ('Szkoła', [('hdr', 'Nagłówek'), ('tiles', 'Podsumowanie (średnia, ostatnia ocena, frekwencja…)'), ('plan', 'Plan lekcji'), ('chgs', 'Zmiany w planie'), ('duty', 'Sprawdziany i zadania'), ('gr', 'Oceny'), ('att', 'Frekwencja'), ('foot', 'Stopka z synchronizacją')]),
    'f1': ('Formuła 1', [('hdr', 'Nagłówek'), ('next', 'Następny wyścig'), ('weather', 'Pogoda na torze'), ('last', 'Ostatni wyścig'), ('drivers', 'Klasyfikacja kierowców'), ('teams', 'Klasyfikacja zespołów'), ('radio', 'Team radio')]),
}
# globalne warianty wygladu kart: klucz -> (nazwa, dozwolone wartosci, domyslna = dzisiejszy wyglad)
SAVER = {'alarms': ('Zawsze', 'Tylko krytyczne', 'Nigdy'), 'fx': ('Animowane', 'Statyczne', 'Bez')}   # pierwsza wartosc = dzisiejsze zachowanie
VARIANTS = {'chart': ('Wykresy', ('Linia', 'Obszar', 'Słupki', 'Schodkowy'), 'Obszar'), 'dev': ('Urządzenia w widoku pokoju', ('Kafelki', 'Lista', 'Przełączniki', 'Suwaki'), 'Kafelki'), 'big': ('Duże wartości', ('Duże kafle', 'Kompakt'), 'Duże kafle')}
FONTS = ('Manrope', 'JetBrains Mono', 'Serif', 'Zaokrąglona')
_CFG_OWN = os.path.join(os.environ.get('HUD_CONFIG_DIR', '/config'), 'aurora_manager', 'baseline_cfg.json')   # wlasna baza uzytkownika (poza repozytorium)
CFG_FILE = _CFG_OWN if os.path.isfile(_CFG_OWN) else os.path.join(os.path.dirname(os.path.abspath(__file__)), 'aurora_baseline_cfg.json')


RV_BLOCKS = ('occ', 'big', 'extra', 'dev', 'chart')
RV_GROUPS = tuple('s%d' % i for i in range(1, 7))   # wlasne sekcje urzadzen w widoku pokoju   # bloki widoku pokoju (kolejnosc i ukrywanie per pokoj)
PALETTE = ('lav', 'peach', 'butter', 'rose', 'sky', 'aqua', 'mint', 'sand')
_ENT = re.compile(r'^[a-z_]+\.[a-z0-9_]{1,80}$')
_ICON = re.compile(r'^mdi:[a-z0-9-]{1,60}$')


def base_cfg(pid=None):
    """Ustawienia z generatora (to, co karta ma bez pliku ukladu) - punkt wyjscia dla edytora. Projekt od zera zaczyna od pustych."""
    pr = get_project(pid) if pid else None
    if pr and pr.get('empty'):
        return {'rooms': [], 'bats': [], 'cal': [], 'calDays': 2, 'reminders': [], 'fuel': [], 'batLow': 30, 'batCrit': 10, 'pmLv': [12, 20, 35, 50], 'out': {'t': '', 'h': '', 'weather': ''}, 'pm': '', 'purifier': ''}
    try:
        c = json.load(open(CFG_FILE, encoding='utf-8')) or {}
    except (OSError, ValueError):
        c = {}
    return {'rooms': c.get('rooms') or [], 'bats': c.get('bats') or [], 'cal': c.get('cal') or [], 'calDays': c.get('calDays') or 2,
            'reminders': c.get('reminders') or [], 'fuel': c.get('fuel') or [], 'batLow': 30, 'batCrit': 10, 'pmLv': [12, 20, 35, 50],
            'out': c.get('out') or {'t': '', 'h': '', 'weather': ''}, 'pm': c.get('pm') or '', 'purifier': c.get('purifier') or ''}


def _ent(x):
    return x if isinstance(x, str) and _ENT.match(x) else None


def _clean_cfg(c):
    """Pola cfg nadpisuja ustawienia z generatora w karcie (PC). Tylko znane pola i bezpieczne wartosci."""
    out = {}
    if not isinstance(c, dict):
        return out
    if isinstance(c.get('rooms'), list):
        rooms, seen = [], set()
        for r in c['rooms'][:12]:
            if not isinstance(r, dict) or not re.fullmatch(r'[a-z0-9_]{1,24}', str(r.get('id', ''))) or r['id'] in seen:
                continue
            seen.add(r['id'])
            o = {'id': r['id']}
            if isinstance(r.get('name'), str) and r['name'].strip():
                o['name'] = r['name'].strip()[:24]
            if isinstance(r.get('icon'), str) and _ICON.match(r['icon']):
                o['icon'] = r['icon']
            if r.get('c') in PALETTE:
                o['c'] = r['c']
            for k in ('t', 'h', 'lux', 'occ', 'auto'):
                if k in r:
                    o[k] = _ent(r[k]) or ''
            if r.get('dsh') in ('sq', 'ci', 'pi', 'rect'):
                o['dsh'] = r['dsh']
            sz = r.get('size') if isinstance(r.get('size'), dict) else {}
            szc = {}
            if sz.get('w') in (2, 3):
                szc['w'] = sz['w']
            if sz.get('h') == 2:
                szc['h'] = 2
            if szc:
                o['size'] = szc
            gids = []
            if isinstance(r.get('secs'), list):
                secs = []
                for g in r['secs'][:6]:
                    if isinstance(g, dict) and g.get('id') in RV_GROUPS and g['id'] not in gids:
                        gids.append(g['id'])
                        secs.append({'id': g['id'], 't': (str(g.get('t') or '').strip() or 'Sekcja')[:24]})
                if secs:
                    o['secs'] = secs
            if isinstance(r.get('dev'), list):
                devs = []
                for d in r['dev'][:16]:
                    if not (isinstance(d, list) and len(d) >= 2 and _ent(d[0])):
                        continue
                    row = [d[0], str(d[1])[:24], d[2] if len(d) > 2 and isinstance(d[2], str) and _ICON.match(d[2]) else 'mdi:power']
                    op = d[3] if len(d) > 3 and isinstance(d[3], dict) else {}
                    oc = {}
                    if op.get('w') == 2:
                        oc['w'] = 2
                    if op.get('hide') is True:
                        oc['hide'] = True
                    if op.get('g') in gids:
                        oc['g'] = op['g']
                    if op.get('room') is True:
                        oc['room'] = True
                    if oc:
                        row.append(oc)
                    devs.append(row)
                o['dev'] = devs
            if isinstance(r.get('view'), dict):
                v, ov = r['view'], {}
                order = [k for k in dict.fromkeys(v.get('order') or []) if k in RV_BLOCKS or k in gids]
                if order:
                    ov['order'] = order
                hide = [k for k in dict.fromkeys(v.get('hide') or []) if k in RV_BLOCKS or k in gids]
                if hide:
                    ov['hide'] = hide
                bw = {k: n for k, n in (v.get('bw') or {}).items() if (k in RV_BLOCKS or k in gids) and n in (3, 4, 6, 8, 9)} if isinstance(v.get('bw'), dict) else {}
                if bw:
                    ov['bw'] = bw
                bo = [k for k in dict.fromkeys(v.get('bo') or []) if k in ('t', 'h', 'l')]
                if bo and bo != ['t', 'h', 'l'][:len(bo)]:
                    ov['bo'] = bo
                try:
                    cols = int(v.get('cols') or 0)
                except (TypeError, ValueError):
                    cols = 0
                if 2 <= cols <= 5:
                    ov['cols'] = cols
                for k in ('dev', 'big', 'chart'):
                    if v.get(k) in VARIANTS[k][1] and v[k] != VARIANTS[k][2]:
                        ov[k] = v[k]
                if ov:
                    o['view'] = ov
            rooms.append(o)
        out['rooms'] = rooms
    for k, mx in (('bats', 80), ('cal', 12)):
        if isinstance(c.get(k), list):
            out[k] = [e for e in dict.fromkeys(c[k]) if _ent(e)][:mx]
    if isinstance(c.get('fuel'), list):
        out['fuel'] = [[str(f[0])[:12], f[1], f[2]] for f in c['fuel'][:8] if isinstance(f, list) and len(f) >= 3 and _ent(f[1]) and _ent(f[2])]
    if isinstance(c.get('reminders'), list):
        rem = []
        for r in c['reminders'][:20]:
            if isinstance(r, dict) and isinstance(r.get('name'), str) and re.fullmatch(r'\d{4}-\d\d-\d\d', str(r.get('date', ''))):
                try:
                    w = min(30, max(0, int(r.get('warn', 3))))
                except (TypeError, ValueError):
                    w = 3
                rem.append({'name': r['name'].strip()[:40], 'date': r['date'], 'warn': w, 'icon': r['icon'] if isinstance(r.get('icon'), str) and _ICON.match(r['icon']) else 'mdi:calendar-alert'})
        out['reminders'] = rem
    if c.get('dsh') in ('sq', 'ci', 'pi'):
        out['dsh'] = c['dsh']
    if isinstance(c.get('klim'), list):
        kl = [str(k) for k in dict.fromkeys(c['klim']) if re.fullmatch(r'[a-z0-9_]{1,24}', str(k))][:14]
        if kl:
            out['klim'] = kl
    if isinstance(c.get('out'), dict):
        out['out'] = {k: (_ent(c['out'].get(k)) or '') for k in ('t', 'h', 'weather')}
    for k in ('pm', 'purifier'):
        if k in c:
            out[k] = _ent(c[k]) or ''
    for k, lo, hi in (('calDays', 1, 30), ('batLow', 5, 60), ('batCrit', 1, 30)):
        try:
            if k in c:
                out[k] = min(hi, max(lo, int(c[k])))
        except (TypeError, ValueError):
            pass
    if 'batLow' in out and 'batCrit' in out and out['batCrit'] >= out['batLow']:
        out['batCrit'] = max(1, out['batLow'] - 1)
    pl = c.get('pmLv')
    if isinstance(pl, list) and len(pl) == 4:
        try:
            v = [float(x) for x in pl]
            if all(0 < x < 500 for x in v) and v == sorted(v):
                out['pmLv'] = [int(x) if x == int(x) else x for x in v]
        except (TypeError, ValueError):
            pass
    return out


def catalog():
    """Lista elementow do edytora; paliwa biora nazwy z konfiguracji Pastela."""
    cat = {s: [list(e) for e in els] for s, els in ELEMENTS.items()}
    try:
        fuel = (json.load(open(CFG_FILE, encoding='utf-8')) or {}).get('fuel') or []
    except (OSError, ValueError):
        fuel = []
    cat['views'] = {k: [[b[0], b[1], 't'] for b in v[1]] for k, v in VIEWS.items()}
    cat['fuel'] += [['%d' % i, f[0], 't'] for i, f in enumerate(fuel[:8])]
    return cat


def _valid_keys():
    keys = {s + '.' + e[0] for s, els in ELEMENTS.items() for e in els}
    keys |= {'fuel.%d' % i for i in range(8)}
    keys |= {v + '.' + b[0] for v, (n, bl) in VIEWS.items() for b in bl}
    return keys


def _clean_el(el):
    ok, out = _valid_keys(), {}
    for k, o in (el or {}).items():
        base, _, rid = k.partition(':')
        if base not in ok or not isinstance(o, dict) or (rid and not (base.startswith('rooms.') and re.fullmatch(r'[a-z0-9_]{1,24}', rid))):
            continue
        c = {}
        if o.get('vis') is False:
            c['vis'] = False
        if isinstance(o.get('col'), str) and re.fullmatch(r'#[0-9a-fA-F]{6}', o['col']):
            c['col'] = o['col'].lower()
        if o.get('ff') in FONTS:
            c['ff'] = o['ff']
        if str(o.get('fw')) in ('600', '700', '800'):
            c['fw'] = str(o['fw'])
        if o.get('sz') in ('S', 'L'):
            c['sz'] = o['sz']
        if isinstance(o.get('dec'), int) and not isinstance(o.get('dec'), bool) and 0 <= o['dec'] <= 3:
            c['dec'] = o['dec']
        if isinstance(o.get('n'), str) and o['n'].strip():
            c['n'] = o['n'].strip()[:24]
        if isinstance(o.get('ico'), str) and _ICON.match(o['ico']):
            c['ico'] = o['ico']
        for ax in ('dx', 'dy'):
            v = o.get(ax)
            if isinstance(v, (int, float)) and not isinstance(v, bool) and v and abs(v) <= 800:
                c[ax] = int(round(v / 8.0)) * 8
        if c:
            out[k] = c
    return out


def _read(path):
    try:
        with open(path, encoding='utf-8') as f:
            return json.load(f)
    except (OSError, ValueError):
        return None


def _write(path, obj):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    tmp = path + '.tmp'
    with open(tmp, 'w', encoding='utf-8') as f:
        json.dump(obj, f, ensure_ascii=False, indent=1)
    os.replace(tmp, path)


def _fix(lst, base):
    out = []
    for x in (lst or []):
        if x in base and x not in out:
            out.append(x)
    return out + [x for x in base if x not in out]


def clean(lay):
    """Przyjmuje tylko znane pola; zwraca uklad v2, ktory karta bezpiecznie wczyta. Stary uklad v1 (4 sekcje) jest przeliczany."""
    if not isinstance(lay, dict):
        raise ValueError('uklad musi byc obiektem')
    home = lay.get('home') if isinstance(lay.get('home'), dict) else {}
    order = home.get('order') or []
    if order and len(order) <= 4:       # v1: tylko as/air/fuel/cal; wstawiamy je w miejsca tych sekcji w ukladzie domyslnym
        mov = [x for x in order if x in ('as', 'air', 'fuel', 'cal')]
        mov += [x for x in ('as', 'air', 'fuel', 'cal') if x not in mov]
        it = iter(mov)
        order = [next(it) if x in ('as', 'air', 'fuel', 'cal') else x for x in DEF_HOME['order']]
    sec = {}
    for i in IDS:
        s = (home.get('sec') or {}).get(i) or {}
        d = DEF_HOME['sec'][i]
        try:
            w, h = int(s.get('w', d['w'])), int(s.get('h', d['h']))
        except (TypeError, ValueError):
            w, h = d['w'], d['h']
        sec[i] = {'w': min(MAXW, max(1, w)), 'h': min(MAXH, max(1, h))}
    hide = [x for x in (home.get('hide') or []) if x in HIDEABLE]
    out = {'v': SCHEMA_V, 'home': {'order': _fix(order, IDS), 'porder': _fix(home.get('porder'), DEF_HOME['porder']),
                                   'hide': sorted(set(hide), key=HIDEABLE.index), 'sec': sec, 'el': _clean_el(home.get('el'))}}
    try:
        n = int(home.get('calN') or 0)
    except (TypeError, ValueError):
        n = 0
    if 1 <= n <= 6:
        out['home']['calN'] = n
    views = {k: lay['views'][k] for k, (n, vals, d) in VARIANTS.items() if isinstance(lay.get('views'), dict) and lay['views'].get(k) in vals and lay['views'][k] != d}
    if views:
        out['views'] = views
    sv, so = {}, lay.get('saver') if isinstance(lay.get('saver'), dict) else {}
    for k, vals in SAVER.items():
        if so.get(k) in vals and so[k] != vals[0]:
            sv[k] = so[k]
    try:
        d = int(so.get('dim') or 0)
    except (TypeError, ValueError):
        d = 0
    if 1 <= d <= 70:
        sv['dim'] = d
    if sv:
        out['saver'] = sv
    if lay.get('theme') in ('light', 'dark'):
        out['theme'] = lay['theme']
    cfg = _clean_cfg(lay.get('cfg'))
    if cfg:
        out['cfg'] = cfg
    return out


def default_layout(pid=None):
    d = _read(_defp(pid))
    if d is None:
        d = {'v': SCHEMA_V, 'home': json.loads(json.dumps(DEF_HOME))}
    return clean(d)


def state(pid=None):
    live = _read(_live(pid))
    return {'live': clean(live) if live else None, 'rev': (live or {}).get('rev', 0), 'saved': (live or {}).get('saved'),
            'default': default_layout(pid), 'backups': list_backups(pid), 'catalog': catalog(), 'base': base_cfg(pid), 'saver_opts': {k: list(v) for k, v in SAVER.items()}, 'variants': {k: {'name': v[0], 'values': list(v[1]), 'default': v[2]} for k, v in VARIANTS.items()}}


def _bid(name):
    return re.sub(r'[^A-Za-z0-9._-]+', '_', name)[:80]


def list_backups(pid=None):
    out = []
    try:
        names = sorted(os.listdir(_bkd(pid)), reverse=True)
    except OSError:
        return out
    for n in names:
        if not n.endswith('.json'):
            continue
        b = _read(os.path.join(_bkd(pid), n)) or {}
        out.append({'id': n[:-5], 'name': b.get('name', n[:-5]), 'saved': b.get('saved'), 'auto': bool(b.get('auto')), 'note': b.get('note', '')})
    return out


def add_backup(name, lay, auto=False, note='', pid=None):
    ts = time.strftime('%Y%m%d-%H%M%S')
    bid, k = ts + '-' + _bid(name or 'kopia'), 2
    while os.path.exists(os.path.join(_bkd(pid), bid + '.json')):
        bid = '%s-%s-%d' % (ts, _bid(name or 'kopia'), k); k += 1
    _write(os.path.join(_bkd(pid), bid + '.json'), {'name': name, 'saved': time.strftime('%Y-%m-%dT%H:%M:%S'), 'auto': auto, 'note': note, 'layout': clean(lay)})
    return bid


def prune(keep, pid=None):
    """Zostawia `keep` najnowszych kopii automatycznych (recznych nie rusza)."""
    autos = [b for b in list_backups(pid) if b['auto']]
    for b in autos[keep:]:
        try:
            os.remove(os.path.join(_bkd(pid), b['id'] + '.json'))
        except OSError:
            pass


def get_backup(bid, pid=None):
    b = _read(os.path.join(_bkd(pid), _bid(bid) + '.json'))
    if not b:
        raise KeyError(bid)
    return clean(b.get('layout'))


def delete_backup(bid, pid=None):
    os.remove(os.path.join(_bkd(pid), _bid(bid) + '.json'))


def publish(lay, keep=10, pid=None):
    """Zapisuje uklad do pliku czytanego przez karte; wczesniej robi automatyczna kopie poprzedniego stanu."""
    new = clean(lay)
    old = _read(_live(pid))
    add_backup('Auto-kopia przed publikacją', old if old else default_layout(pid), auto=True, note='stan sprzed rev %s' % (old or {}).get('rev', 0), pid=pid)
    prune(max(1, int(keep)), pid)
    new['rev'] = (old or {}).get('rev', 0) + 1
    new['saved'] = time.strftime('%Y-%m-%dT%H:%M:%S')
    _write(_live(pid), new)
    return new


# ---------------------------------------------------------------- projekty (osobne dashboardy Pastela)
MAIN = {'id': '', 'name': 'Jarvis Pastel (obecny)', 'path': 'jarvis-pastel', 'main': True}


def _projects():
    d = _read(PROJ_FILE)
    return d if isinstance(d, list) else []


def list_projects():
    return [dict(MAIN)] + _projects()


def get_project(pid):
    return next((p for p in _projects() if p['id'] == pid), None)


def _slug(s):
    s = s.lower().translate(str.maketrans('ąćęłńóśźż', 'acelnoszz'))
    return re.sub(r'[^a-z0-9]+', '_', s).strip('_')[:18] or 'projekt'


def new_project_id(name):
    base, k, ids = _slug(name), 2, {p['id'] for p in _projects()} | {'glowny', 'default', 'main'}
    pid = base
    while pid in ids:
        pid = '%s_%d' % (base, k); k += 1
    return pid


def create_project(name, empty, lay, cfg_extra=None):
    """Zapisuje nowy projekt: rejestr, plik ukladu i styl domyslny (poczatkowy stan projektu)."""
    name = str(name or '').strip()[:40]
    if not name:
        raise ValueError('podaj nazwe projektu')
    pid = new_project_id(name)
    lay = clean(lay)
    lay['rev'] = 0
    lay['saved'] = time.strftime('%Y-%m-%dT%H:%M:%S')
    _write(_live(pid), lay)
    _write(_defp(pid), dict(lay))
    pr = {'id': pid, 'name': name, 'path': 'aurora-' + pid.replace('_', '-'), 'empty': bool(empty), 'created': lay['saved']}
    _write(PROJ_FILE, _projects() + [pr])
    return pr


def remove_project(pid):
    pr = get_project(pid)
    if not pr:
        raise KeyError(pid)
    _write(PROJ_FILE, [p for p in _projects() if p['id'] != pid])
    for f in (_live(pid), _defp(pid)):
        try:
            os.remove(f)
        except OSError:
            pass
    import shutil
    shutil.rmtree(_bkd(pid), ignore_errors=True)
    return pr
