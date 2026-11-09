"""Kreator pierwszego uruchomienia: proponuje konfiguracje HUD Scene na podstawie obszarow, urzadzen i encji z Home Assistant."""
import asyncio, json, re, unicodedata
import deploy as dp

OUTDOOR_RX = re.compile(r'zewn|outdoor|outside|ogr[oó]d|garden|taras|balkon|patio|garaz|garage', re.I)
MOTION = {'motion', 'occupancy', 'presence', 'moving'}
DOOR = {'door', 'window', 'opening', 'garage_door'}
MAX_ROOMS_BY_GRID = {'2x2': 4, '3x2': 6, '4x2': 8}

def slug(s):
    s = unicodedata.normalize('NFKD', s.lower().replace('ł', 'l')).encode('ascii', 'ignore').decode()
    return re.sub(r'[^a-z0-9]+', '-', s).strip('-') or 'sekcja'

async def _fetch():
    ws = await dp._ws()
    c = dp.Conn(ws)
    areas = (await c.call({'type': 'config/area_registry/list'}))['result']
    ents = (await c.call({'type': 'config/entity_registry/list'}))['result']
    devs = (await c.call({'type': 'config/device_registry/list'}))['result']
    await ws.close()
    return areas, ents, devs

def inventory():
    """Zwraca {'areas': [{id,name,entities:[...]}], 'unassigned': [...]}; encja: id, name, domain, dc (device_class), unit, area, device."""
    areas, ents, devs = asyncio.run(_fetch())
    st = {s['entity_id']: s for s in dp.api('states')}
    dev_area = {d['id']: d.get('area_id') for d in devs}
    out = {a['area_id']: {'id': a['area_id'], 'name': a['name'], 'entities': []} for a in areas}
    free = []
    for e in ents:
        eid = e['entity_id']
        if e.get('disabled_by') or e.get('hidden_by'):
            continue
        s = st.get(eid)
        if e.get('entity_category') and not (eid.startswith('sensor.') and ((s or {}).get('attributes', {}).get('device_class') or e.get('original_device_class')) == 'battery'):
            continue      # encje diagnostyczne/konfiguracyjne pomijamy, poza bateriami (zwykle diagnostyczne)
        if not s or s['state'] == 'unavailable' and False:
            continue
        a = s['attributes'] if s else {}
        item = {'id': eid, 'name': a.get('friendly_name') or e.get('name') or e.get('original_name') or eid, 'domain': eid.split('.')[0],
                'dc': a.get('device_class') or e.get('original_device_class'), 'unit': a.get('unit_of_measurement'), 'device': e.get('device_id')}
        area = e.get('area_id') or dev_area.get(e.get('device_id'))
        (out[area]['entities'] if area in out else free).append(item)
    for sid, s in st.items():          # encje bez wpisu w rejestrze (np. z YAML) tez moga sie przydac (pogoda)
        if sid.startswith('weather.') and not any(x['id'] == sid for x in free) and not any(sid == y['id'] for a in out.values() for y in a['entities']):
            free.append({'id': sid, 'name': s['attributes'].get('friendly_name', sid), 'domain': 'weather', 'dc': None, 'unit': None, 'device': None})
    return {'areas': list(out.values()), 'unassigned': free}

def area_summary(inv):
    rows = []
    for a in inv['areas']:
        E = a['entities']
        rows.append({'id': a['id'], 'name': a['name'], 'lights': sum(1 for e in E if e['domain'] == 'light'), 'switches': sum(1 for e in E if e['domain'] == 'switch'),
                     'temperature': sum(1 for e in E if e['domain'] == 'sensor' and e['dc'] == 'temperature'), 'humidity': sum(1 for e in E if e['domain'] == 'sensor' and e['dc'] == 'humidity'),
                     'motion': sum(1 for e in E if e['domain'] == 'binary_sensor' and e['dc'] in MOTION), 'total': len(E),
                     'outdoor': bool(OUTDOOR_RX.search(a['name']))})
    g = inv['unassigned'] + [e for a in inv['areas'] for e in a['entities']]
    extra = {'weather': sum(1 for e in g if e['domain'] == 'weather'), 'pm25': sum(1 for e in g if e['dc'] == 'pm25'), 'media': sum(1 for e in g if e['domain'] == 'media_player'),
             'satellites': sum(1 for e in g if e['domain'] == 'assist_satellite'), 'batteries': sum(1 for e in g if e['domain'] == 'sensor' and e['dc'] == 'battery'),
             'doors': sum(1 for e in g if e['domain'] == 'binary_sensor' and e['dc'] in DOOR), 'gas': sum(1 for e in g if e['domain'] == 'binary_sensor' and e['dc'] in ('gas', 'smoke')),
             'flood': sum(1 for e in g if e['domain'] == 'binary_sensor' and e['dc'] == 'moisture')}
    return {'areas': rows, 'extra': extra}

GENERIC = re.compile(r'^(gniazdko|przełącznik|przelacznik|switch|plug|light|lampa|światło|swiatlo|panel)\s+', re.I)

def fit_label(label, fit):
    """Skraca etykiete tak, by zmiescila sie pod ikona (fit znakow): najpierw bez ogolnych slow na poczatku, potem na granicy slowa."""
    if len(label) <= fit:
        return label
    g = GENERIC.sub('', label).strip()
    if g and len(g) <= fit:
        return g[:1].upper() + g[1:]
    words, out = (g or label).split(), ''
    for w in words:
        if len((out + ' ' + w).strip()) <= fit: out = (out + ' ' + w).strip()
        else: break
    return (out or (g or label)[:fit]).strip()

def short(name, area):
    n = re.sub(r'^\s*' + re.escape(area) + r'[\s:\-_]*', '', name, flags=re.I).strip() or name
    n = re.sub(r'\s+(light|lampa|światło|swiatlo)$', '', n, flags=re.I).strip() or n
    return (n[:1].upper() + n[1:])[:16]

def propose(inv, area_ids, include, language='pl', grid='4x2'):
    """include: {outdoor, air, home_status, battery_view, climate_view, media, assistant, events_log, quick_commands}."""
    L = {'pl': {'outdoor': 'Na zewnątrz', 'air': 'Powietrze'}, 'en': {'outdoor': 'Outdoors', 'air': 'Air'}}[language]
    byid = {a['id']: a for a in inv['areas']}
    allents = inv['unassigned'] + [e for a in inv['areas'] for e in a['entities']]
    sections, used_ids, notes = [], set(), []
    cap = MAX_ROOMS_BY_GRID[grid]
    extra_cnt = int(bool(include.get('outdoor'))) + int(bool(include.get('air')))
    room_cap = max(1, cap - extra_cnt)
    def uid(base):
        i, b = base, 2
        while i in used_ids:
            i = '%s-%d' % (base, b); b += 1
        used_ids.add(i); return i
    room_sections = []
    outdoor_area = None
    for aid in area_ids:
        a = byid.get(aid)
        if not a:
            continue
        E = a['entities']
        if OUTDOOR_RX.search(a['name']) and include.get('outdoor'):
            outdoor_area = a
            continue
        if len(room_sections) >= room_cap:
            notes.append('pominieto obszar (limit siatki): ' + a['name']); continue
        sec = {'id': uid(slug(a['name'])), 'type': 'room', 'name': a['name'][:18]}
        mot = [e for e in E if e['domain'] == 'binary_sensor' and e['dc'] in MOTION]
        if mot: sec['motion'] = mot[0]['id']
        devs = [e for e in E if e['domain'] == 'light'] + [e for e in E if e['domain'] == 'switch' and e['dc'] != 'outlet'] + [e for e in E if e['domain'] == 'switch' and e['dc'] == 'outlet']
        seen, dd = set(), []
        for e in devs:
            lb = short(e['name'], a['name'])
            if lb.lower() in seen: continue      # ta sama nazwa (np. swiatlo i przelacznik tego samego urzadzenia)
            seen.add(lb.lower()); dd.append({'entity': e['id'], 'label': lb, 'icon': 'mdi:lightbulb', 'kind': 'toggle'})
        if dd:
            dd = dd[:3]
            fit = int({'2x2': 744, '3x2': 482, '4x2': 352}[grid] / len(dd) / 10.5)
            for x in dd: x['label'] = fit_label(x['label'], fit)
            sec['devices'] = dd
        t = [e for e in E if e['domain'] == 'sensor' and e['dc'] == 'temperature']; hm = [e for e in E if e['domain'] == 'sensor' and e['dc'] == 'humidity']
        met = []
        if t: met.append({'entity': t[0]['id'], 'kind': 'temperature'})
        if hm: met.append({'entity': hm[0]['id'], 'kind': 'humidity'})
        if not met:
            lux = [e for e in E if e['domain'] == 'sensor' and e['dc'] == 'illuminance']
            if lux: met.append({'entity': lux[0]['id'], 'kind': 'illuminance'})
        if met: sec['metrics'] = met
        al = []
        for e in E:
            if e['domain'] == 'binary_sensor' and e['dc'] in ('gas', 'smoke') and len(al) < 3: al.append({'entity': e['id'], 'icon': 'mdi:gas-cylinder', 'kind': 'gas'})
            if e['domain'] == 'binary_sensor' and e['dc'] == 'moisture' and len(al) < 3: al.append({'entity': e['id'], 'icon': 'mdi:pipe-leak', 'kind': 'flood'})
        if al: sec['alerts'] = al
        door = [e for e in E if e['domain'] == 'binary_sensor' and e['dc'] in DOOR]
        if door and len(sec.get('devices', [])) < 3:
            sec.setdefault('devices', []).append({'entity': door[0]['id'], 'label': short(door[0]['name'], a['name']), 'icon': 'mdi:door', 'kind': 'alert'})
        room_sections.append((sec, a))
    sections = [s for s, _ in room_sections]
    weather = [e for e in allents if e['domain'] == 'weather']
    if include.get('outdoor') and weather:
        sec = {'id': uid('zewnatrz' if language == 'pl' else 'outdoors'), 'type': 'outdoor', 'name': L['outdoor'], 'weather': weather[0]['id']}
        if outdoor_area:
            E = outdoor_area['entities']
            t = [e for e in E if e['domain'] == 'sensor' and e['dc'] == 'temperature']; hm = [e for e in E if e['domain'] == 'sensor' and e['dc'] == 'humidity']
            met = ([{'entity': t[0]['id'], 'kind': 'temperature'}] if t else []) + ([{'entity': hm[0]['id'], 'kind': 'humidity'}] if hm else [])
            if met: sec['metrics'] = met
        sections.insert(0, sec)
    pm = [e for e in allents if e['dc'] == 'pm25' and e['domain'] == 'sensor']
    if include.get('air') and pm:
        fans = [e for e in allents if e['domain'] == 'fan' and re.search(r'purif|oczysz|air', e['id'] + e['name'], re.I)]
        air = {'pm25': pm[0]['id']}
        if fans: air['purifier'] = fans[0]['id']
        sections.append({'id': uid('powietrze' if language == 'pl' else 'air'), 'type': 'air', 'name': L['air'], 'air': air})
    sections = sections[:cap]
    if not sections:
        sections = [{'id': 'salon', 'type': 'room', 'name': 'Salon' if language == 'pl' else 'Living room'}]
        notes.append('brak wybranych obszarow - dodano pusta sekcje')
    mods = {}
    sec_by_area = {s['id']: a for s, a in room_sections}
    if include.get('home_status', True):
        gas = [e['id'] for e in allents if e['domain'] == 'binary_sensor' and e['dc'] in ('gas', 'smoke')][:4]
        flood = []
        for a in inv['areas']:
            for e in a['entities']:
                if e['domain'] == 'binary_sensor' and e['dc'] == 'moisture' and len(flood) < 4: flood.append({'entity': e['id'], 'label': a['name'][:16]})
        doors = [{'entity': e['id'], 'label': e['name'][:16], 'warn_after_min': 10} for e in allents if e['domain'] == 'binary_sensor' and e['dc'] in DOOR][:5]
        bats = [e['id'] for e in allents if e['domain'] == 'sensor' and e['dc'] == 'battery'][:40]
        hs = {'enabled': True, 'ticker': True, 'temperature': {'sensors': 'from_sections', 'min': 18, 'max': 26}}
        if gas: hs['gas'] = gas
        if flood: hs['flood'] = flood
        if doors: hs['doors'] = doors
        if bats: hs['batteries'] = bats
        if pm: hs['air_quality'] = pm[0]['id']
        mods['home_status'] = hs
    if include.get('battery_view', True):
        groups = []
        for a in inv['areas']:
            b = [e['id'] for e in a['entities'] if e['domain'] == 'sensor' and e['dc'] == 'battery']
            if b and len(groups) < 8: groups.append({'name': a['name'][:16], 'entities': b[:6]})
        if groups: mods['battery_view'] = {'enabled': True, 'groups': groups}
    if include.get('climate_view', True):
        rooms = [{'name': s['name'], 'temperature': next(m['entity'] for m in s['metrics'] if m['kind'] == 'temperature'), 'humidity': next(m['entity'] for m in s['metrics'] if m['kind'] == 'humidity'),
                  **({'outdoor': True} if s['type'] == 'outdoor' else {})} for s in sections if s.get('metrics') and {'temperature', 'humidity'} <= {m['kind'] for m in s['metrics']}]
        if rooms:
            mods['climate_view'] = {'enabled': True, 'temperature': [r['temperature'] for r in rooms], 'humidity': [r['humidity'] for r in rooms], 'rooms': rooms}
    if include.get('media', True):
        mp = sorted([e for e in allents if e['domain'] == 'media_player'], key=lambda e: 0 if e.get('dc') in ('tv', 'receiver') else 1)[:6]   # odtwarzacze TV (dekoder, stick, telewizor) przed resztą; do edycji w panelu
        if mp:
            mods['media'] = {'enabled': True, 'players': [{'entity': e['id'], 'label': e['name'][:16], 'icon': 'mdi:radio' if 'radio' in (e['id'] + e['name']).lower() else 'mdi:television',
                                                           'kind': 'radio' if 'radio' in (e['id'] + e['name']).lower() else 'tv'} for e in mp]}
    if include.get('assistant', True):
        sat = [e for e in allents if e['domain'] == 'assist_satellite']
        if sat:
            a = {'enabled': True, 'satellite': sat[0]['id']}
            dev = sat[0]['device']
            pipe = [e for e in allents if e['domain'] == 'select' and e['device'] == dev and 'pipeline' in e['id']]
            mute = [e for e in allents if e['domain'] == 'switch' and e['device'] == dev and 'mute' in e['id']]
            if pipe: a['pipeline'] = pipe[0]['id']
            if mute: a['mute'] = mute[0]['id']
            mods['assistant'] = a
    if include.get('outdoor') and weather:
        mods['forecast'] = {'enabled': True, 'entity': weather[0]['id'], 'days': 3}
    if include.get('events_log', True):
        src = [{'entity': s['motion'], 'type': 'motion', 'name': s['name'].upper()} for s in sections if s.get('motion')]
        if mods.get('home_status', {}).get('doors'): src += [{'entity': d['entity'], 'type': 'door', 'name': d['label'].upper()} for d in mods['home_status']['doors'][:3]]
        if src: mods['events_log'] = {'enabled': True, 'hours': 12, 'sources': src[:12]}
    if include.get('quick_commands', True):
        lights = [d['entity'] for s in sections for d in s.get('devices', []) if d['entity'].startswith('light.')][:12]
        if lights: mods['quick_commands'] = {'enabled': True, 'lights_off': lights}
    cols = {'2x2': 2, '3x2': 3, '4x2': 4}[grid]
    cfg = {'version': 1, 'language': language, 'title': 'HUD Scene', 'layout': {'grid': grid, 'order': [s['id'] for s in sections]}, 'sections': sections, 'modules': mods,
           'profiles': [{'id': 'tablet', 'kind': 'tablet', 'name': 'Tablet', 'width': 1280, 'height': 800, 'performance': 'normal'}, {'id': 'phone', 'kind': 'phone', 'name': 'Telefon' if language == 'pl' else 'Phone'}],
           'dashboards': {'base_path': 'hud-scene', 'light_variants': True}}
    summary = {'sections': [{'name': s['name'], 'type': s['type'], 'devices': len(s.get('devices', [])), 'metrics': len(s.get('metrics', [])), 'motion': bool(s.get('motion'))} for s in sections],
               'modules': sorted(mods), 'notes': notes}
    return cfg, summary
