"""Kreator urzadzen Aurora Guard: tworzy w Home Assistancie wszystko, czego wymaga nowy telefon/tablet dziecka
(pomocniki, listy Local To-do, harmonogramy, szablony webhooka, automatyzacje), dopisuje urzadzenie do dashboardow Aurora Pulse
i pokazuje dane do wpisania w aplikacji. Wzorzec: komplet encji i automatyzacji, ktore dzialaja dla dzieci w Aurora Guard."""
import asyncio, copy, json, os, re, secrets, time, unicodedata
import ha as dp

HERE = os.path.dirname(os.path.abspath(__file__))
GDIR = os.path.join(HERE, 'guard')
DATA = os.environ.get('JM_DATA', '/data')
REC = os.path.join(DATA, 'guard_devices.json')
CONF = os.environ.get('HUD_CONFIG_DIR', '/config')
APK = 'https://github.com/jaque66/aurora-guard/releases/latest'

DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']


# ---------------------------------------------------------------- pomocnicze
def slug(s, n=20):
    s = unicodedata.normalize('NFKD', str(s)).encode('ascii', 'ignore').decode().lower()
    s = re.sub(r'[^a-z0-9_]+', '_', s).strip('_')
    return s[:n] if n else s


def valid_id(i):
    return bool(re.fullmatch(r'[a-z][a-z0-9_]{1,19}', i or ''))


def _records():
    try:
        return json.load(open(REC, encoding='utf-8'))
    except Exception:
        return {}


def _save_records(r):
    os.makedirs(DATA, exist_ok=True)
    json.dump(r, open(REC, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)


def _states():
    return {s['entity_id']: s for s in dp.api('states')}


def _run(coro_fn):
    async def go():
        ws = await dp.ws_connect(); c = dp.Conn(ws)
        try:
            return await coro_fn(c)
        finally:
            await ws.close()
    return asyncio.run(go())


def _service(domain, service, data=None):
    dp.api('services/%s/%s' % (domain, service), 'POST', data or {})


# ---------------------------------------------------------------- lista i opcje
def device_ids(st=None):
    st = st or _states()
    return sorted({m.group(1) for e in st for m in [re.fullmatch(r'input_text\.guard_prosba_(.+)', e)] if m})


def device_name(i, st=None, rec=None):
    rec = rec if rec is not None else _records()
    if i in rec and rec[i].get('name'):
        return rec[i]['name']
    st = st or _states()
    fn = (st.get('input_boolean.blokada_telefon_' + i) or {}).get('attributes', {}).get('friendly_name', '')
    n = re.sub(r'^blokada telefon\s*', '', fn, flags=re.I).strip()
    return n if n and n.lower() != i else i.replace('_', ' ').title()


def devices():
    st = _states(); rec = _records(); out = []
    for i in device_ids(st):
        s = (st.get('sensor.aurora_guard_%s_status' % i) or {}).get('attributes', {})
        lk = lambda e: (st.get(e) or {}).get('state')
        out.append({'id': i, 'name': device_name(i, st, rec), 'wizard': i in rec, 'created': (rec.get(i) or {}).get('created'),
                    'last_seen': s.get('last_seen'), 'version': s.get('version'), 'battery': s.get('battery'),
                    'full': lk('input_boolean.blokada_telefon_%s_caly' % i) == 'on', 'apps': lk('input_boolean.blokada_telefon_%s' % i) == 'on'})
    return out


def _pulse_dashboards():
    async def fn(c):
        ds = (await c.call({'type': 'lovelace/dashboards/list'})).get('result') or []
        res = []
        for d in ds:
            r = await c.call({'type': 'lovelace/config', 'url_path': d['url_path']})
            cfg = r.get('result')
            if not r.get('success') or not cfg:
                continue
            cards = list(_pulse_cards(cfg))
            if cards:
                res.append({'url_path': d['url_path'], 'title': d['title'], 'guard': sorted({g.get('id') for k in cards for g in ((k.get('cfg') or {}).get('guard') or [])})})
        return res
    try:
        return _run(fn)
    except Exception:
        return []


def _pulse_cards(cfg):
    def walk(o):
        if isinstance(o, dict):
            if o.get('type') == 'custom:aurora-pulse-card' and isinstance(o.get('cfg'), dict):
                yield o
            for v in o.values():
                yield from walk(v)
        elif isinstance(o, list):
            for v in o:
                yield from walk(v)
    return walk(cfg)


def options():
    notify = sorted('notify.' + n for d in dp.api('services') if d.get('domain') == 'notify' for n in (d.get('services') or {}) if n.startswith('mobile_app_'))
    cfg = {}
    try:
        cfg = dp.api('config')
    except Exception:
        pass
    default_notify = []
    try:
        r = dp.api('config/automation/config/aurora_guard_raport_tygodniowy')
        default_notify = [a['action'] for a in (r.get('actions') or []) if str(a.get('action', '')).startswith('notify.mobile_app_')]
    except Exception:
        pass
    return {'notify': notify, 'default_notify': default_notify, 'dashboards': _pulse_dashboards(), 'urls': {'internal': cfg.get('internal_url') or '', 'external': cfg.get('external_url') or ''},
            'devices': devices(), 'apk': APK}


# ---------------------------------------------------------------- specyfikacja encji
def _specs(i):
    """(typ WS, nazwa -> entity_id, konfiguracja) dla wszystkich pomocnikow urzadzenia."""
    S = []
    for name, icon, extra in (('Blokada telefon %s' % i, 'mdi:cellphone-lock', {}), ('Blokada telefon %s caly' % i, 'mdi:cellphone-off', {}),
                              ('Auto blokada telefonu %s' % i, 'mdi:robot', {}), ('Guard lokalizacja %s' % i, 'mdi:crosshairs-gps', {}),
                              ('Guard harmonogram %s' % i, 'mdi:calendar-clock', {}), ('Guard strefa %s' % i, 'mdi:school-outline', {}),
                              ('Guard sen %s' % i, 'mdi:sleep', {'initial': True}), ('Guard limit blok %s' % i, 'mdi:timer-lock', {})):
        S.append(('input_boolean', name, dict(name=name, icon=icon, **extra)))
    for name, icon, mn, mx, stp, ini in (('Guard lok poza %s' % i, 'mdi:timer-outline', 5, 120, 5, 15), ('Guard lok dom %s' % i, 'mdi:timer-outline', 15, 240, 15, 60),
                                         ('Guard bonus %s' % i, 'mdi:timer-plus-outline', 0, 600, 5, 0), ('Guard nagroda %s' % i, 'mdi:trophy-outline', 0, 60, 5, 10),
                                         ('Guard limit telefonu %s' % i, 'mdi:timer-lock-outline', 0, 720, 15, 0)):
        S.append(('input_number', name, dict(name=name, icon=icon, min=mn, max=mx, step=stp, mode='box', unit_of_measurement='min', initial=ini)))
    for name, icon, ini in (('Guard sen od %s' % i, 'mdi:weather-night', '22:00:00'), ('Guard sen do %s' % i, 'mdi:weather-sunny', '06:00:00')):
        S.append(('input_datetime', name, dict(name=name, icon=icon, has_time=True, has_date=False, initial=ini)))
    for name, icon, mx in (('Guard komunikat %s' % i, 'mdi:message-alert-outline', 200), ('Guard komunikat caly %s' % i, 'mdi:message-lock-outline', 200),
                           ('Guard prosba %s' % i, 'mdi:hand-wave-outline', 255), ('Guard wiadomosc %s' % i, 'mdi:message-text-outline', 255),
                           ('Guard odblokuj %s' % i, 'mdi:lock-open-time-outline', 255)):
        S.append(('input_text', name, dict(name=name, icon=icon, min=0, max=mx, mode='text')))
    for name, icon in (('Lokalizacja telefon %s' % i, 'mdi:crosshairs-gps'), ('Guard dzwon %s' % i, 'mdi:bell-ring-outline')):
        S.append(('input_button', name, dict(name=name, icon=icon)))
    for name, icon in (('Guard zadania %s' % i, 'mdi:check-all'), ('Guard prosby %s' % i, 'mdi:hand-wave-outline'), ('Guard sabotaz %s' % i, 'mdi:alert-outline')):
        S.append(('counter', name, dict(name=name, icon=icon, initial=0, step=1, minimum=0, restore=True)))
    noc = [{'from': '00:00:00', 'to': '06:30:00'}, {'from': '21:30:00', 'to': '24:00:00'}]
    S.append(('schedule', 'Guard noc %s' % i, dict(name='Guard noc %s' % i, icon='mdi:weather-night', **{d: noc for d in DAYS})))
    lek = [{'from': '08:00:00', 'to': '15:00:00'}]
    S.append(('schedule', 'Guard lekcje %s' % i, dict(name='Guard lekcje %s' % i, icon='mdi:school', **{d: (lek if n < 5 else []) for n, d in enumerate(DAYS)})))
    return S


def _entity_of(dom, name):
    return '%s.%s' % (dom, slug(name, 0))


def _expand_notify(o, svcs):
    if isinstance(o, list):
        out, placed = [], False
        for it in o:
            if isinstance(it, dict) and str(it.get('action', '')).startswith('notify.mobile_app_'):
                if not placed:
                    placed = True
                    for sv in svcs:
                        c = copy.deepcopy(it); c['action'] = sv; out.append(c)
                continue
            out.append(_expand_notify(it, svcs))
        return out
    if isinstance(o, dict):
        return {k: _expand_notify(v, svcs) for k, v in o.items()}
    return o


def _automations(i, name, hook, svcs, auto_mode):
    raw = json.load(open(os.path.join(GDIR, 'automations.json'), encoding='utf-8'))
    out = {}
    for k, v in raw.items():
        if k.startswith('blokada_telefonu_') and not auto_mode:
            continue
        t = json.dumps(v, ensure_ascii=False).replace('__HOOK__', hook).replace('__ID__', i).replace('__NAME__', name.replace('"', '').replace('\\', ''))
        out[k.replace('__ID__', i)] = _expand_notify(json.loads(t), svcs)
    return out


def _template_text(i, hook):
    return open(os.path.join(GDIR, 'templates.yaml.tpl'), encoding='utf-8').read().replace('__HOOK__', hook).replace('__ID__', i)


def _tpl_path(i):
    return os.path.join(CONF, 'templates', 'aurora_guard_%s.yaml' % i)


# ---------------------------------------------------------------- operacje na HA
def _flow(handler, steps):
    """Przeprowadza przeplyw konfiguracji (config flow); steps = kolejne dane formularzy. Zwraca wynik koncowy."""
    r = dp.api('config/config_entries/flow', 'POST', {'handler': handler, 'show_advanced_options': False})
    for data in steps:
        if r.get('type') in ('create_entry', 'abort'):
            break
        r = dp.api('config/config_entries/flow/%s' % r['flow_id'], 'POST', data)
    if r.get('type') != 'create_entry':
        raise RuntimeError('przeplyw %s nie zakonczyl sie utworzeniem wpisu: %s' % (handler, str(r)[:160]))
    return r


def _update_dashboards(i, name, urls, add):
    changed = []

    async def fn(c):
        for u in urls:
            r = await c.call({'type': 'lovelace/config', 'url_path': u})
            cfg = r.get('result')
            if not r.get('success') or not cfg:
                continue
            ch = False
            for card in _pulse_cards(cfg):
                g = card['cfg'].setdefault('guard', [])
                has = any(x.get('id') == i for x in g)
                if add and not has:
                    g.append({'id': i, 'name': name}); ch = True
                if not add and has:
                    card['cfg']['guard'] = [x for x in g if x.get('id') != i]; ch = True
            if ch:
                s = await c.call({'type': 'lovelace/config/save', 'url_path': u, 'config': cfg})
                if s.get('success'):
                    changed.append(u)
    _run(fn)
    # rekordy Managera (zeby ponowny zapis dashboardu nie cofnal zmiany)
    mdir = os.path.join(DATA, 'dashboards')
    if os.path.isdir(mdir):
        for f in os.listdir(mdir):
            if not f.endswith('.json'):
                continue
            p = os.path.join(mdir, f)
            try:
                rec = json.load(open(p, encoding='utf-8'))
            except Exception:
                continue
            if rec.get('path') in urls:
                g = (rec.setdefault('cfg', {})).setdefault('guard', [])
                if add and not any(x.get('id') == i for x in g):
                    g.append({'id': i, 'name': name})
                    ms = rec.setdefault('modules', [])
                    if 'guard' not in ms:
                        ms.append('guard')
                if not add:
                    rec['cfg']['guard'] = [x for x in g if x.get('id') != i]
                json.dump(rec, open(p, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    return changed


def _kids_report(ids, svcs):
    """Odtwarza automatyzacje zbiorcze (zerowanie bonusu o polnocy, raport tygodniowy) dla aktualnej listy urzadzen."""
    st = _states(); rec = _records()
    try:
        b = dp.api('config/automation/config/aurora_guard_bonus_reset')
    except Exception:
        b = {'id': 'aurora_guard_bonus_reset', 'alias': 'Aurora Guard: zerowanie bonusowych minut o północy', 'triggers': [{'trigger': 'time', 'at': '00:00:00'}], 'mode': 'single', 'actions': []}
    b['actions'] = [{'action': 'input_number.set_value', 'target': {'entity_id': ['input_number.guard_bonus_%s' % k for k in ids]}, 'data': {'value': 0}}] if ids else []
    dp.api('config/automation/config/aurora_guard_bonus_reset', 'POST', b)
    try:
        r = dp.api('config/automation/config/aurora_guard_raport_tygodniowy')
    except Exception:
        r = {'id': 'aurora_guard_raport_tygodniowy', 'alias': 'Aurora Guard: raport tygodniowy', 'triggers': [{'trigger': 'time', 'at': '18:00:00'}], 'conditions': [{'condition': 'time', 'weekday': ['sun']}], 'mode': 'single', 'actions': []}
    old = [a['action'] for a in (r.get('actions') or []) if str(a.get('action', '')).startswith('notify.mobile_app_')]
    sv = list(old) + [x for x in svcs if x not in old]   # odbiorcy raportu: dotychczasowi + wybrani w kreatorze
    lines = []
    for k in ids:
        lines.append("%s: {{ ((state_attr('sensor.aurora_guard_%s_usage','week') or []) | sum) // 60 }} godz. {{ ((state_attr('sensor.aurora_guard_%s_usage','week') or []) | sum) %% 60 }} min w aplikacjach, zadania zaakceptowane: {{ states('counter.guard_zadania_%s') }}, prośby o czas: {{ states('counter.guard_prosby_%s') }}, ingerencje: {{ states('counter.guard_sabotaz_%s') }}" % (k, k, k, k, k, k))
    acts = [{'action': s, 'data': {'title': 'Raport tygodniowy – telefony dzieci', 'message': '\n'.join(lines), 'data': {'tag': 'guard_raport'}}} for s in sv] if ids else []
    if ids:
        acts.append({'action': 'counter.reset', 'target': {'entity_id': [e for k in ids for e in ('counter.guard_zadania_%s' % k, 'counter.guard_prosby_%s' % k, 'counter.guard_sabotaz_%s' % k)]}})
    r['actions'] = acts
    dp.api('config/automation/config/aurora_guard_raport_tygodniowy', 'POST', r)


def create(body):
    """Tworzy urzadzenie. body: {name, id, notify[], dashboards[], auto_mode}. Zwraca {steps, app, ...}."""
    name = (body.get('name') or '').strip()[:30]
    i = (body.get('id') or slug(name)).strip().lower()
    if not name:
        raise ValueError('podaj nazwę urządzenia')
    if not valid_id(i):
        raise ValueError('identyfikator: małe litery, cyfry i _; zaczyna się literą, 2–20 znaków')
    st = _states()
    if i in device_ids(st):
        raise ValueError('urządzenie o identyfikatorze „%s” już istnieje' % i)
    svcs = [s for s in (body.get('notify') or []) if re.fullmatch(r'notify\.mobile_app_[a-z0-9_]+', s)]
    urls = [u for u in (body.get('dashboards') or []) if isinstance(u, str)]
    auto_mode = bool(body.get('auto_mode'))
    hook = 'ag_%s_%s' % (i, secrets.token_hex(8))
    steps, made = [], {'helpers': [], 'entries': [], 'automations': [], 'template': None, 'dashboards': []}

    def step(txt, fn):
        try:
            r = fn()
            steps.append({'t': txt, 'ok': True, 'm': r if isinstance(r, str) else ''})
        except Exception as e:
            steps.append({'t': txt, 'ok': False, 'm': str(e)[:200]})
            raise

    try:
        # 1. pomocnicy
        def helpers():
            n = [0]; skipped = [0]

            async def fn(c):
                for typ, name_, cfg in _specs(i):
                    ent = _entity_of(typ, name_)
                    if ent in st:
                        skipped[0] += 1; continue
                    r = await c.call(dict(type=typ + '/create', **cfg))
                    if not r.get('success'):
                        raise RuntimeError('%s: %s' % (name_, (r.get('error') or {}).get('message', r)))
                    made['helpers'].append((typ, (r.get('result') or {}).get('id') or slug(name_))); n[0] += 1
            _run(fn)
            return 'utworzono %d (pominięto istniejące: %d)' % (n[0], skipped[0])
        step('Pomocniki (przełączniki, liczniki, harmonogramy)', helpers)

        # 2. listy Local To-do
        def todos():
            lists = ['Guard %s' % i, 'Guard %s dozwolone' % i] + (['Zadania %s' % i] if auto_mode else [])
            for t in lists:
                if 'todo.' + slug(t, 0) in st:
                    continue
                r = _flow('local_todo', [{'todo_list_name': t}])
                res = r.get('result'); made['entries'].append(res.get('entry_id') if isinstance(res, dict) else res)
            return '%d listy' % len(lists)
        step('Listy Local To-do (aplikacje do blokowania, dozwolone)', todos)

        # 3. czujnik "zadania wykonane" (tryb auto)
        if auto_mode:
            def donesensor():
                _flow('template', [{'next_step_id': 'binary_sensor'}, {'name': 'Zadania %s wykonane' % i, 'state': "{{ states('todo.zadania_%s') | int(1) == 0 }}" % i}])
                return ''
            try:
                step('Czujnik „zadania wykonane” (tryb auto)', donesensor)
            except Exception:
                auto_mode = False   # tryb auto jest opcjonalny - reszta kreatora dziala bez niego

        # 4. szablony webhooka
        def templ():
            os.makedirs(os.path.join(CONF, 'templates'), exist_ok=True)
            p = _tpl_path(i)
            open(p, 'w', encoding='utf-8').write(_template_text(i, hook)); made['template'] = p
            chk = dp.api('config/core/check_config', 'POST', {})
            if chk.get('result') != 'valid':
                os.remove(p); made['template'] = None
                raise RuntimeError('konfiguracja nieprawidłowa po dodaniu szablonów: %s' % str(chk.get('errors'))[:150])
            _service('template', 'reload')
            return 'plik templates/aurora_guard_%s.yaml' % i
        step('Czujniki z webhooka (status, aplikacje, użycie, reguły, lokalizacja)', templ)

        # 5. automatyzacje
        def autos():
            A = _automations(i, name, hook, svcs, auto_mode)
            for aid, cfg in A.items():
                dp.api('config/automation/config/%s' % aid, 'POST', cfg); made['automations'].append(aid)
            _service('automation', 'reload')
            return '%d automatyzacji' % len(A)
        step('Automatyzacje (prośby o czas, ingerencja, brak kontaktu, harmonogram, limit)', autos)

        # 6. zbiorcze
        def glob():
            ids = sorted(set(device_ids(_states()) + [i]))
            _kids_report(ids, svcs)
            _service('automation', 'reload')
            return ''
        step('Raport tygodniowy i zerowanie bonusu', glob)

        # 7. dashboardy
        if urls:
            def dash():
                made['dashboards'] = _update_dashboards(i, name, urls, True)
                return ', '.join(made['dashboards']) or 'brak zmian'
            step('Dodanie do dashboardów Aurora Pulse', dash)
    except Exception:
        # wycofanie zmian wykonanych przed bledem: zapisz rekord z tym, co zdazylo powstac, i uzyj zwyklego usuwania
        try:
            rec = _records()
            rec[i] = {'name': name, 'hook': hook, 'notify': svcs, 'dashboards': made['dashboards'], 'helpers': made['helpers'], 'entries': made['entries'], 'automations': made['automations']}
            _save_records(rec)
            remove(i)
            steps.append({'t': 'Wycofano zmiany wykonane przed błędem', 'ok': True, 'm': ''})
        except Exception as e2:
            steps.append({'t': 'Wycofanie zmian', 'ok': False, 'm': 'usuń ręcznie pozostałości (%s)' % str(e2)[:120]})
        return {'ok': False, 'steps': steps, 'id': i}

    rec = _records()
    rec[i] = {'name': name, 'hook': hook, 'created': time.strftime('%Y-%m-%d %H:%M'), 'notify': svcs, 'dashboards': made['dashboards'], 'auto_mode': auto_mode, 'helpers': made['helpers'], 'entries': made['entries'], 'automations': made['automations']}
    _save_records(rec)
    cfg = {}
    try:
        cfg = dp.api('config')
    except Exception:
        pass
    return {'ok': True, 'steps': steps, 'id': i, 'name': name,
            'app': {'url_external': cfg.get('external_url') or '', 'url_internal': cfg.get('internal_url') or '', 'device': i, 'webhook': hook, 'apk': APK}}


def remove(i):
    """Usuwa urzadzenie utworzone kreatorem (wszystko, co kreator dodal)."""
    rec = _records()
    if i not in rec:
        raise ValueError('to urządzenie nie zostało dodane kreatorem – usuń je ręcznie w Home Assistancie')
    r = rec[i]; steps = []

    def safe(txt, fn):
        try:
            fn(); steps.append({'t': txt, 'ok': True})
        except Exception as e:
            steps.append({'t': txt, 'ok': False, 'm': str(e)[:160]})

    safe('Usunięcie z dashboardów', lambda: _update_dashboards(i, r['name'], [u for u in r.get('dashboards') or []] + [d['url_path'] for d in _pulse_dashboards() if i in d.get('guard', [])], False))
    for aid in r.get('automations') or []:
        safe('Automatyzacja %s' % aid, lambda aid=aid: dp.api('config/automation/config/%s' % aid, 'DELETE'))
    safe('Szablony webhooka', lambda: (os.path.isfile(_tpl_path(i)) and os.remove(_tpl_path(i)), _service('template', 'reload')))

    def registry():
        async def fn(c):
            for e in ('sensor.aurora_guard_%s_status' % i, 'sensor.aurora_guard_%s_apps' % i, 'sensor.aurora_guard_%s_usage' % i, 'sensor.aurora_guard_%s_rules' % i, 'device_tracker.guard_%s' % i):
                await c.call({'type': 'config/entity_registry/remove', 'entity_id': e})
        _run(fn)
    safe('Czujniki z szablonów (rejestr encji)', registry)

    def helpers():
        async def fn(c):
            for typ, hid in r.get('helpers') or []:
                key = {'schedule': 'schedule_id', 'counter': 'counter_id'}.get(typ, typ + '_id')
                await c.call({'type': typ + '/delete', key: hid})
        _run(fn)
    safe('Pomocniki', helpers)

    def entries():
        for eid in r.get('entries') or []:
            if eid:
                dp.api('config/config_entries/entry/%s' % eid, 'DELETE')
    safe('Listy Local To-do', entries)

    def residual():
        ents = _run(lambda c: c.call({'type': 'config_entries/get'}))
        for e in (ents.get('result') or []):
            t = (e.get('title') or '').lower()
            if e.get('domain') in ('local_todo', 'template') and t in ('guard %s' % i, 'guard %s dozwolone' % i, 'zadania %s' % i, 'zadania %s wykonane' % i):
                dp.api('config/config_entries/entry/%s' % e['entry_id'], 'DELETE')
    safe('Pozostałe wpisy konfiguracji', residual)
    del rec[i]; _save_records(rec)
    safe('Raport tygodniowy i zerowanie bonusu', lambda: (_kids_report([k for k in device_ids(_states()) if k != i], []), _service('automation', 'reload')))
    return {'ok': True, 'steps': steps}
