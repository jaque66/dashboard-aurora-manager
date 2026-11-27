"""Inwentarz obszarow, urzadzen i encji z Home Assistanta."""
import asyncio, json, re, unicodedata
import ha as dp

OUTDOOR_RX = re.compile(r'zewn|outdoor|outside|ogr[oó]d|garden|taras|balkon|patio|garaz|garage', re.I)
MOTION = {'motion', 'occupancy', 'presence', 'moving'}
DOOR = {'door', 'window', 'opening', 'garage_door'}
MAX_ROOMS_BY_GRID = {'2x2': 4, '3x2': 6, '4x2': 8}

def slug(s):
    s = unicodedata.normalize('NFKD', s.lower().replace('ł', 'l')).encode('ascii', 'ignore').decode()
    return re.sub(r'[^a-z0-9]+', '-', s).strip('-') or 'sekcja'

async def _fetch():
    ws = await dp.ws_connect()
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

def short(name, area):
    n = re.sub(r'^\s*' + re.escape(area) + r'[\s:\-_]*', '', name, flags=re.I).strip() or name
    n = re.sub(r'\s+(light|lampa|światło|swiatlo)$', '', n, flags=re.I).strip() or n
    return (n[:1].upper() + n[1:])[:16]

