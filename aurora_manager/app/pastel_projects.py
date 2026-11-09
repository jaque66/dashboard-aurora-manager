"""Projekty edytora Pastel: kopia obecnego dashboardu albo nowy od zera (pokoje z obszarow HA). Kazdy projekt to osobny dashboard w HA
z kartami pastel-home-card i pastel-saver-card (konfiguracja layout: <id>) oraz wlasny plik ukladu i kopie zapasowe."""
import asyncio, json, re
import pastel_layout as pl
import wizard
import deploy as dp

PAL = ['lav', 'peach', 'butter', 'rose', 'sky', 'aqua', 'mint', 'sand']
ICONS = [(r'salon|dzienny|living', 'mdi:sofa'), (r'kuchn', 'mdi:chef-hat'), (r'sypial', 'mdi:bed'), (r'łazien|lazien|toalet|wc', 'mdi:shower-head'), (r'przedpok|korytarz|hol|wiatrołap', 'mdi:door-open'),
         (r'biur|gabinet|praco', 'mdi:desk'), (r'gara', 'mdi:garage'), (r'ogr|taras|balkon', 'mdi:flower'), (r'dziec|pokój|pokoj', 'mdi:teddy-bear')]
DEVICON = {'light': 'mdi:lightbulb-outline', 'switch': 'mdi:power-socket-eu', 'media_player': 'mdi:television', 'fan': 'mdi:fan', 'cover': 'mdi:blinds'}


def areas():
    return wizard.area_summary(wizard.inventory())


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
        rid = pl._slug(a['name']); k = 2
        while rid in used:
            rid = '%s_%d' % (pl._slug(a['name'])[:18], k); k += 1
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


def _card(pid, empty, typ):
    c = {'type': typ, 'layout': pid}
    if empty:
        c['empty'] = True
    return c


def dashboard_config(pr):
    return {'title': pr['name'], 'views': [
        {'title': 'Dom', 'path': 'home', 'icon': 'mdi:home-heart', 'theme': 'Jarvis Pastel', 'panel': True, 'cards': [_card(pr['id'], pr['empty'], 'custom:pastel-home-card')]},
        {'title': 'Wygaszacz', 'path': 'wygaszacz', 'icon': 'mdi:weather-partly-cloudy', 'theme': 'Jarvis Pastel', 'panel': True, 'cards': [_card(pr['id'], pr['empty'], 'custom:pastel-saver-card')]}]}


async def _create_dash(pr):
    ws = await dp._ws(); c = dp.Conn(ws)
    try:
        ds = (await c.call({'type': 'lovelace/dashboards/list'}))['result']
        if any(d['url_path'] == pr['path'] for d in ds):
            raise RuntimeError('dashboard %s już istnieje' % pr['path'])
        r = await c.call({'type': 'lovelace/dashboards/create', 'url_path': pr['path'], 'title': pr['name'], 'icon': 'mdi:flower-tulip', 'show_in_sidebar': True, 'require_admin': False, 'mode': 'storage'})
        if not r.get('success'):
            raise RuntimeError('nie udało się utworzyć dashboardu: %s' % r.get('error'))
        r = await c.call({'type': 'lovelace/config/save', 'url_path': pr['path'], 'config': dashboard_config(pr)})
        if not r.get('success'):
            raise RuntimeError('nie udało się zapisać dashboardu: %s' % r.get('error'))
    finally:
        await ws.close()


async def _delete_dash(path):
    ws = await dp._ws(); c = dp.Conn(ws)
    try:
        ds = (await c.call({'type': 'lovelace/dashboards/list'}))['result']
        for d in ds:
            if d['url_path'] == path:
                await c.call({'type': 'lovelace/dashboards/delete', 'dashboard_id': d['id']})
    finally:
        await ws.close()


def create(name, mode, area_ids):
    if mode == 'copy':
        st = pl.state()
        lay = st['live'] or st['default']
        empty = False
    else:
        lay = {'home': json.loads(json.dumps(pl.DEF_HOME)), 'cfg': propose_cfg(area_ids)}
        empty = True
    pr = pl.create_project(name, empty, lay)
    try:
        asyncio.run(_create_dash(pr))
    except Exception:
        pl.remove_project(pr['id'])
        raise
    return pr


def delete(pid):
    pr = pl.remove_project(pid)
    asyncio.run(_delete_dash(pr['path']))
    return pr
