/* Edytor Aurora (etap 1): uklad ekranu glownego (kolejnosc i widocznosc sekcji), publikowanie, kopie zapasowe, styl domyslny.
   Dane: /api/pastel/layout; karta czyta opublikowany plik www/jarvis/pastel-layout.json. */
const BASE = location.pathname.replace(/[^/]*$/, '');
const api = (p, o) => fetch(BASE + 'api/' + p, o).then(async r => { const j = await r.json().catch(() => ({})); if (!r.ok) throw Object.assign(new Error(j.error || r.status), {data: j}); return j; });
let PID = '', PROJ = [];
const pa = (path, o) => api(path + (path.includes('?') ? '&' : '?') + 'p=' + encodeURIComponent(PID), o);   // zapytania dotyczace wybranego projektu
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]));
const clone = o => JSON.parse(JSON.stringify(o));

// sekcje ekranu glownego (id jak w karcie Aurora)
const SEC = {
  hero: {n: 'Zegar i pogoda', d: 'Zegar, data, pogoda, wilgotność i PM2.5', c: '#e4dcff'},
  rooms: {n: 'Pokoje', d: 'Kafelki pokoi i urządzeń', c: '#ffe0d2'},
  as: {n: 'Asystent', d: 'Przycisk „Dotknij i mów”', c: '#d6ebff'},
  status: {n: 'Alarmy i ostrzeżenia', d: 'Lista alarmów (Tauron, klimat, baterie…)', c: '#ffd9e6'},
  air: {n: 'Powietrze', d: 'Jakość powietrza i oczyszczacz', c: '#cdf2ee'},
  fuel: {n: 'Paliwa', d: 'Ceny maksymalne', c: '#fff1c2'},
  cal: {n: 'Najbliższe wydarzenia', d: 'Kalendarz i przypomnienia', c: '#e4dcff'},
  links: {n: 'Skróty', d: 'Przyciski skrótów', c: '#ece7fa'}
};
const TODAY = {n: 'Dziś – podpowiedzi pod zegarem', d: 'Przypomnienia i wskazówki w nagłówku zegara'};
const COLS = 4, MAXW = 4, MAXH = 8, ROWH = 56, GAP = 8;

let D = null;            // odpowiedz API: live, default, rev, saved, backups
let S = null, PUB = null, hist = [], hi = 0;
let view = 'uklad', sel = null, dev = 'tablet', selEl = null;
const FONTS = ['Manrope', 'JetBrains Mono', 'Serif', 'Zaokrąglona'];
const elOf = k => { const o = (H().el = H().el || {}); return o[k]; };
const catOf = sec => ((D && D.catalog && (D.catalog[sec] || (D.catalog.views || {})[sec])) || []);
const VNAMES = {sv: 'Wygaszacz', rv: 'Pomieszczenia', stan: 'Stan domu', bat: 'Baterie', klimat: 'Klimat', powietrze: 'Powietrze', serwer: 'Serwer', f1: 'Formuła 1'};
const secName = s => (SEC[s] || {n: VNAMES[s] || s}).n;
let selView = 'rv';

const key = s => JSON.stringify([s.home, s.cfg, s.th, s.views, s.saver, s.theme]);
const dirty = () => key(S) !== key(PUB);
function norm(l, th) { return {home: clone(l.home), cfg: clone(l.cfg || {}), views: clone(l.views || {}), saver: clone(l.saver || {}), theme: l.theme || '', th: clone(th || (S && S.th) || D.th || TH0)}; }
const TH0 = {tMin: 18, tMax: 26, hMin: 35, hMax: 60};
const PALC = {lav: ['#e6dcff', '#8f78e0'], peach: ['#ffe0cf', '#f08a5d'], butter: ['#fff3c4', '#d9a521'], rose: ['#ffd9e6', '#e5719a'], sky: ['#d3e8ff', '#5a9be0'], aqua: ['#cdf2ee', '#35aaa0'], mint: ['#d4f5e2', '#3fb27f'], sand: ['#f3e7da', '#b58a5e']};
let ENT = [], ENTS = new Set(), selRoom = null;
function commit() { hist = hist.slice(0, hi + 1); hist.push(clone(S)); hi = hist.length - 1; refresh(); }
function fmt(iso) { if (!iso) return '—'; const d = new Date(iso); return isNaN(d) ? iso : d.toLocaleString('pl-PL', {day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'}); }
// ---- podglad na zywo: prawdziwa karta Aurora w ramce, polozona nad miejscem .lvph ----
const LIVE = {ready: false, states: null, at: 0, frame: null, wrap: null};
// ---- wybor ikony z wbudowanych w HA (Material Design Icons) z podgladem ----
let ICONS = null;
const icoUrl = n => 'https://cdn.jsdelivr.net/npm/@mdi/svg@7.4.47/svg/' + String(n || '').replace(/^mdi:/, '') + '.svg';
const icoImg = (n, sz) => n && /^mdi:[a-z0-9-]+$/.test(n) ? '<img class="ip" alt="" width="' + (sz || 22) + '" height="' + (sz || 22) + '" src="' + icoUrl(n) + '">' : '<span class="ip" style="width:' + (sz || 22) + 'px"></span>';
const icoField = (id, v, ph) => '<div class="ent">' + icoImg(v) + '<input class="mono" type="text" id="' + id + '" value="' + esc(v || '') + '" placeholder="' + esc(ph || 'mdi:…') + '"><button class="btn sm" data-ipick="' + id + '">Wybierz</button></div>';
async function pickIcon(cur, cb) {
  if (!ICONS) { try { ICONS = await (await fetch('mdi_icons.json')).json(); } catch (e) { toast('Nie udało się wczytać listy ikon'); return; } }
  modal('<h2>Wybierz ikonę</h2><input type="text" id="ipq" placeholder="Szukaj, np. lamp, sofa, tv, wifi…" autocomplete="off"><div class="icg" id="icg"></div><div class="note" id="icn" style="margin-top:6px"></div><div class="bar" style="justify-content:flex-end"><button class="btn" data-x>Zamknij</button></div>', () => {
    const q = $('#ipq'), g = $('#icg'), n = $('#icn'), draw = () => { const t = q.value.trim().toLowerCase().replace(/^mdi:/, ''); const f = t ? ICONS.filter(x => x[0].includes(t) || x[1].includes(t)) : ICONS.filter(x => ['home', 'lightbulb', 'sofa', 'bed', 'television', 'thermometer', 'water', 'power', 'fan', 'lamp', 'door', 'window-closed', 'washing-machine', 'speaker', 'lock', 'wifi', 'weather-sunny', 'battery', 'calendar', 'bell'].some(w => x[0] === w || x[0].startsWith(w + '-outline')));
      const show = f.slice(0, 96); g.innerHTML = show.map(x => '<button class="icb' + ('mdi:' + x[0] === cur ? ' on' : '') + '" data-ic="mdi:' + x[0] + '" title="' + x[0] + '"><img alt="" width="26" height="26" loading="lazy" src="' + icoUrl(x[0]) + '"><small>' + x[0] + '</small></button>').join('') || '<div class="empty">Brak wyników</div>';
      n.textContent = f.length > show.length ? 'Pokazano ' + show.length + ' z ' + f.length + ' – zawęź wyszukiwanie.' : f.length + ' ikon';
      g.querySelectorAll('[data-ic]').forEach(b => b.onclick = () => { closeModal(); cb(b.dataset.ic); }); };
    q.oninput = draw; draw(); q.focus();
  });
}
function bindIcons(root) { root.querySelectorAll('[data-ipick]').forEach(b => b.onclick = () => { const inp = root.querySelector('#' + b.dataset.ipick); pickIcon(inp.value.trim(), v => { inp.value = v; inp.dispatchEvent(new Event('change')); }); }); }
let EMODE = false, elRoom = null, elScope = 'one';
const elScoped = sec => sec === 'rooms' && !!elRoom && elScope === 'one';
function liveInit() {
  const w = document.createElement('div'); w.id = 'livewrap'; w.style.cssText = 'position:fixed;z-index:5;display:none;overflow:hidden;border-radius:14px;background:#1b1c1f';
  const f = document.createElement('iframe'); f.src = 'pastel_live.html'; f.style.cssText = 'border:0;display:block;position:absolute;left:0;top:0;transform-origin:0 0;background:#1b1c1f'; f.title = 'Podgląd na żywo';
  w.append(f); document.body.append(w); LIVE.wrap = w; LIVE.frame = f;
  addEventListener('message', ev => {
    const m = ev.data; if (!m || ev.source !== f.contentWindow) return;
    if (m.t === 'ready') { LIVE.ready = true; livePost(); }
    if (m.t === 'api') { api('pastel/ha?path=' + encodeURIComponent(m.path)).then(r => ({res: r})).catch(() => ({res: []})).then(x => { try { f.contentWindow.postMessage({t: 'apiRes', id: m.id, res: x.res}, '*'); } catch (e) { /* ramka zamknieta */ } }); }
    if (m.t === 'sel') { elRoom = m.room || null; liveSelect(m.sec, m.el); }
    if (m.t === 'elmove') { const i = m.key.indexOf('.'); if (i > 0) { elRoom = m.room || null; const sec = m.key.slice(0, i), k = m.key.slice(i + 1), ek = m.key + (elScoped(sec) ? ':' + elRoom : ''), el = (H().el = H().el || {}), o = (el[ek] = el[ek] || {}); if (m.dx) o.dx = m.dx; else delete o.dx; if (m.dy) o.dy = m.dy; else delete o.dy; if (!Object.keys(o).length) delete el[ek]; liveSelect(sec, m.key); commit(); } }
    if (m.t === 'move') { view = 'uklad'; sel = m.from; selEl = null; move(m.from, m.to); }
    if (m.t === 'resize') liveResize(m);
    if (m.t === 'blkmove') { rvRoom = m.room || rvRoom; view = 'pokoje'; selDev = null; moveBlk(m.from, m.to); }
    if (m.t === 'btmove') { rvRoom = m.room || rvRoom; view = 'pokoje'; selDev = null; moveBt(m.from, m.to); }
    if (m.t === 'devmove') { rvRoom = m.room || rvRoom; view = 'pokoje'; moveDev(m.from, m.to); }
    if (m.t === 'adddev') { rvRoom = m.room || rvRoom; view = 'pokoje'; addDevice(); }
    if (m.t === 'devsel') { rvRoom = m.room || rvRoom; view = 'pokoje'; selPart = 'dev'; selDev = m.i; refresh(); }
  });
  addEventListener('resize', placeLive); $('#main').addEventListener('scroll', placeLive);
  setInterval(() => { if (LIVE.wrap.style.display !== 'none') liveStates(true); }, 20000);
}
async function liveStates(force) {
  if (!force && LIVE.states && Date.now() - LIVE.at < 20000) return;
  try { LIVE.states = await api('pastel/states'); LIVE.at = Date.now(); livePost(); } catch (e) { /* podglad pokaze to, co ma */ }
}
const VIEW_NAV = {stan: 'stan-domu', bat: 'baterie', klimat: 'klimat', powietrze: 'powietrze', serwer: 'serwer', f1: 'f1'};
function liveNav() {
  if (view === 'pokoje') { const r = curRoom(); return r ? 'pokoj-' + r.id : ''; }
  if (view !== 'wid') return '';
  if (selView === 'rv') { const r = roomsNow().find(x => x.id === rvRoom) || roomsNow()[0]; return r ? 'pokoj-' + r.id : ''; }
  return VIEW_NAV[selView] || '';
}
function livePost() {
  if (!LIVE.ready || !LIVE.states || !LIVE.frame.contentWindow) return;
  const pr = PROJ.find(x => x.id === PID) || {};
  LIVE.frame.contentWindow.postMessage({t: 'apply', states: LIVE.states, nav: liveNav(), layout: {v: 2, home: S.home, cfg: S.cfg, views: S.views, saver: S.saver, theme: S.theme},
    proj: PID ? {layout: PID, empty: !!pr.empty} : {}, sel: liveSel(), emode: EMODE}, '*');
}
function liveSel() {
  const own = view === 'wid' ? selView : view === 'saver' ? 'sv' : sel;
  const pk = view === 'pokoje' && selPart === 'big' && selBt && selDev === null ? 'rv.big' + {t: 'T', h: 'H', l: 'L'}[selBt] : view === 'pokoje' && selPart && selDev === null ? {hdr: 'rv.hdr', occ: 'rv.occ', big: 'rv.big', extra: 'rv.extra', dev: 'rv.dev', chart: 'rv.chartT'}[selPart] || (selPart.startsWith('g:') ? 'rv.g.' + selPart.slice(2) : null) : null;
  return {dev: view === 'pokoje' && selDev !== null ? selDev : null, sec: (view === 'uklad' || view === 'pokoje' || view === 'progi' || view === 'inne') && sel && SEC[sel] ? sel : null, key: pk || (selEl && own ? own + '.' + selEl : null), room: elScoped(own) ? elRoom : null};
}
function placeLive() {
  const ph = $('#lvph'), w = LIVE.wrap; if (!w) return;
  if (!ph || view === 'kopie' || view === 'saver') { w.style.display = 'none'; return; }
  const r = ph.getBoundingClientRect(), m = $('#main').getBoundingClientRect();
  if (r.width < 50 || r.bottom < m.top || r.top > m.bottom) { w.style.display = 'none'; return; }
  const iw = dev === 'phone' ? 390 : 1280, ih = dev === 'phone' ? 844 : 800, sc = Math.min(r.width / iw, r.height / ih);
  w.style.display = 'block'; w.style.left = r.left + 'px'; w.style.top = Math.max(r.top, m.top) + 'px'; w.style.width = r.width + 'px'; w.style.height = (Math.min(r.bottom, m.bottom) - Math.max(r.top, m.top)) + 'px';
  const f = LIVE.frame; f.style.width = iw + 'px'; f.style.height = ih + 'px'; const ox = Math.max(0, (r.width - iw * sc) / 2), oy = r.top < m.top ? r.top - m.top : 0;
  f.style.transform = 'translate(' + ox + 'px,' + oy + 'px) scale(' + sc + ')';
}
function liveResize(m) {
  const z = H().sec[m.id]; if (!z || dev !== 'tablet') return;
  const k = m.axis === 'x' ? 'w' : 'h', n = Math.max(1, Math.min(k === 'w' ? MAXW : MAXH, m.n));
  if (z[k] === n && !m.final) return; z[k] = n; sel = m.id;
  if (m.final) { commit(); return; }
  const st = $('#state'); st.className = 'pill dirty'; st.textContent = '● Niepublikowane zmiany'; $('#publish').disabled = false; livePost();
}
function liveSelect(sec, el) {
  const k = el || '', [a, b] = k.split('.');
  if (view === 'pokoje') { const pm = {'rv.hdr': 'hdr', 'rv.occ': 'occ', 'rv.big': 'big', 'rv.extra': 'extra', 'rv.dev': 'dev', 'rv.chartT': 'chart', 'rv.chartH': 'chart'}[k] || (/^rv\.g\.s\d$/.test(k) ? 'g:' + k.slice(5) : null); selBt = {'rv.bigT': 't', 'rv.bigH': 'h', 'rv.bigL': 'l'}[k] || null; if (selBt) selPart = 'big'; selDev = null; selPart = pm || selPart; refresh(); return; }
  if (VNAMES[a] && a !== 'sv') { view = 'wid'; selView = a; selEl = b || null; }
  else if (a === 'sv') { view = 'saver'; selEl = b || null; }
  else if (sec && SEC[sec]) { view = 'uklad'; sel = sec; selEl = a === sec && b ? b : null; if (dev === 'phone' && false) dev = 'tablet'; }
  else return;
  refresh();
}
const liveCard = () => '<div class="card pvc' + (view === 'pokoje' ? ' tall' : '') + '"><div class="bar" style="margin-bottom:8px"><h3 style="margin:0">Podgląd na żywo</h3><span class="sp"></span><button class="btn sm' + (EMODE ? ' pri' : '') + '" id="emode" title="Przeciągaj pojedyncze elementy po siatce 8 px">' + (EMODE ? '✥ Układanie elementów: wł.' : '✥ Układaj elementy') + '</button><div class="seg" id="devseg2"><button data-d="tablet" class="' + (dev === 'tablet' ? 'on' : '') + '">Tablet</button><button data-d="phone" class="' + (dev === 'phone' ? 'on' : '') + '">Telefon</button></div></div><div class="stage lvs"><div class="lvph" id="lvph"></div></div><div class="note" style="margin-top:6px">Prawdziwa karta z Twoimi danymi i niepublikowanymi zmianami. Kliknij sekcję lub element, żeby go edytować.</div></div>';
function bindLiveCard(m) { const em = m.querySelector('#emode'); if (em) em.onclick = () => { EMODE = !EMODE; em.classList.toggle('pri', EMODE); em.textContent = EMODE ? '✥ Układanie elementów: wł.' : '✥ Układaj elementy'; toast(EMODE ? 'Przeciągnij dowolny element w podglądzie. Przyciąga do siatki 8 px.' : 'Tryb układania wyłączony'); livePost(); }; m.querySelectorAll('#devseg2 button').forEach(b => b.onclick = () => { dev = b.dataset.d; renderMain(); livePost(); }); }
function toast(t) { const e = $('#toast'); e.textContent = t; e.hidden = false; clearTimeout(toast.t); toast.t = setTimeout(() => e.hidden = true, 2600); }
function modal(html, bind) { $('#mbox').innerHTML = html; $('#modal').hidden = false; $('#mbox').querySelectorAll('[data-x]').forEach(b => b.onclick = closeModal); if (bind) bind(); }
function closeModal() { $('#modal').hidden = true; }

const NAV = [
  ['Aurora', [['uklad', 'Układ ekranu', '▤'], ['kopie', 'Kopie i styl domyślny', '↺'],
    ['pokoje', 'Pokoje i urządzenia', '⌂'], ['progi', 'Alarmy i progi', '◔'], ['inne', 'Kalendarze i baterie', '◷'], ['wid', 'Widoki szczegółowe', '▣'], ['saver', 'Wygaszacz', '☾']]]];

function renderNav() {
  $('#nav').innerHTML = NAV.map(([h, items]) => '<h6>' + h + '</h6>' + items.map(([k, l, ic]) => {
    if (k[0] === 'x') return '<button disabled title="Kolejne etapy"><span class="g">' + ic + '</span>' + l + '<b>wkrótce</b></button>';
    return '<button data-v="' + k + '" class="' + (view === k ? 'on' : '') + '"><span class="g">' + ic + '</span>' + l + (k === 'kopie' ? '<b>' + D.backups.length + '</b>' : k === 'pokoje' ? '<b>' + roomsNow().length + '</b>' : '') + '</button>';
  }).join('')).join('');
  document.querySelectorAll('#nav button[data-v]').forEach(b => b.onclick = () => { view = b.dataset.v; sel = null; refresh(); });
  $('#crumb').textContent = 'Aurora · ' + ({uklad: 'Układ ekranu', kopie: 'Kopie i styl domyślny', pokoje: 'Pokoje i urządzenia', progi: 'Alarmy i progi', inne: 'Kalendarze i baterie', wid: 'Widoki szczegółowe', saver: 'Wygaszacz'})[view];
}

const H = () => S.home;
const list = () => dev === 'tablet' ? H().order : H().porder;
function hidden(id) { return H().hide.includes(id); }
function toggle(id) { const h = H().hide; H().hide = h.includes(id) ? h.filter(x => x !== id) : h.concat(id); commit(); }
function move(from, to) {
  const o = list(), i = o.indexOf(from), j = o.indexOf(to);
  if (i < 0 || j < 0 || i === j) return;
  o.splice(j, 0, o.splice(i, 1)[0]); commit();
}
// symulacja automatycznego rozmieszczenia siatki CSS (grid-auto-flow: row): sekcje po kolei, pierwsze wolne miejsce od pozycji poprzedniej
// ---- pokoje i urzadzenia ----
const baseRooms = () => (D.base && D.base.rooms) || [];
const roomsNow = () => S.cfg.rooms || baseRooms();
function ensureRooms() { if (!S.cfg.rooms) S.cfg.rooms = clone(baseRooms()); return S.cfg.rooms; }
const slug = s => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ł/g, 'l').replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '').slice(0, 20) || 'pokoj';
const dl = (id, f) => '<datalist id="' + id + '">' + ENT.filter(x => f(x[0])).map(x => '<option value="' + esc(x[0]) + '">' + esc(x[1]) + '</option>').join('') + '</datalist>';
const dot = e => '<span class="ok" style="width:8px;height:8px;border-radius:50%;flex:none;background:' + (!e || ENTS.has(e) ? 'var(--good)' : 'var(--bad)') + '" title="' + (!e ? 'Brak encji' : ENTS.has(e) ? 'Encja istnieje' : 'Nie znaleziono encji w HA') + '"></span>';
// ---- alarmy i progi ----
function slider(lab, obj, k, min, max, step, unit, onset) {
  return '<div class="thr"><b>' + lab + '</b><output>' + String(obj[k]).replace('.', ',') + ' ' + unit + '</output><input type="range" data-sl="' + k + '" min="' + min + '" max="' + max + '" step="' + step + '" value="' + obj[k] + '"></div>';
}
function viewThr(m) {
  const T = S.th, c = S.cfg, B = D.base || {}, low = c.batLow || B.batLow || 30, crit = c.batCrit || B.batCrit || 10, pm = c.pmLv || B.pmLv || [12, 20, 35, 50];
  m.innerHTML = '<div class="card"><div class="bar"><div><div style="font-size:19px;font-weight:800">Alarmy i progi</div><div class="note">Poza zakresem pojawia się ostrzeżenie, a wartość na kafelku zmienia kolor.</div></div></div></div>' +
    '<div class="card"><h3>Komfort (temperatura i wilgotność)</h3><div data-g="th">' + slider('Temperatura od', T, 'tMin', 5, 35, .5, '°C') + slider('Temperatura do', T, 'tMax', 10, 40, .5, '°C') + slider('Wilgotność od', T, 'hMin', 10, 70, 1, '%') + slider('Wilgotność do', T, 'hMax', 30, 90, 1, '%') + '</div><div class="note">Krytyczne (czerwone): temperatura 3–4 °C, wilgotność 10 p.p. poza zakresem. Wartości są wspólne z Ustawieniami karty.</div></div>' +
    '<div class="card"><h3>Baterie</h3><div data-g="bat">' + slider('Niski poziom (ostrzeżenie) poniżej', {v: low}, 'v', 5, 60, 1, '%').replace('data-sl="v"', 'data-sl="batLow"') + slider('Krytyczny (czerwony alarm) poniżej', {v: crit}, 'v', 1, 30, 1, '%').replace('data-sl="v"', 'data-sl="batCrit"') + '</div></div>' +
    '<div class="card"><h3>Jakość powietrza (PM2.5, µg/m³)</h3><div class="note" style="margin-bottom:8px">Górne granice poziomów: Świetna, Dobra, Umiarkowana, Słaba. Powyżej ostatniej jest „Zła”.</div><div class="bar">' + ['Świetna', 'Dobra', 'Umiarkowana', 'Słaba'].map((n, i) => '<label style="display:flex;flex-direction:column;gap:3px;font-size:11px;color:var(--ink2)">' + n + ' do<input type="number" data-pm="' + i + '" value="' + pm[i] + '" min="1" max="499" style="width:84px;border:1px solid var(--line);background:var(--bg);border-radius:9px;padding:6px 8px"></label>').join('') + '</div></div>';
  m.querySelectorAll('[data-sl]').forEach(r => { r.oninput = () => { const k = r.dataset.sl, v = +r.value; if (k in S.th) S.th[k] = v; else S.cfg[k] = v; r.parentElement.querySelector('output').textContent = String(v).replace('.', ',') + ' ' + (r.parentElement.querySelector('output').textContent.split(' ').pop()); const st = $('#state'); st.className = 'pill dirty'; st.textContent = '● Niepublikowane zmiany'; $('#publish').disabled = false; }; r.onchange = () => { if (S.cfg.batCrit && S.cfg.batLow && S.cfg.batCrit >= S.cfg.batLow) S.cfg.batCrit = Math.max(1, S.cfg.batLow - 1); commit(); }; });
  m.querySelectorAll('[data-pm]').forEach(i => i.onchange = () => { const v = [...m.querySelectorAll('[data-pm]')].map(x => +x.value); if (v.every(x => x > 0) && v.join() === v.slice().sort((a, b) => a - b).join()) { S.cfg.pmLv = v; commit(); } else { toast('Granice muszą rosnąć'); refresh(); } });
}

// ---- przypomnienia, kalendarze, baterie ----
function viewMisc(m) {
  const B = D.base || {}, cal = S.cfg.cal || B.cal || [], bats = S.cfg.bats || B.bats || [], days = S.cfg.calDays || B.calDays || 2;
  const cals = ENT.filter(x => x[0].startsWith('calendar.')), nm = e => { const f = ENT.find(x => x[0] === e); return f && f[1] ? f[1] : e; };
  m.innerHTML = '<div class="card"><div class="bar"><div><div style="font-size:19px;font-weight:800">Kalendarze i baterie</div><div class="note">Źródła wydarzeń i lista baterii pilnowanych w alarmach.</div></div></div></div>' +
    '<div class="card"><h3>Kalendarze</h3>' + (cals.length ? cals : cal.map(e => [e, e])).map(([e, n]) => '<div class="row" style="margin-bottom:6px"><span class="n">' + esc(n || e) + '<small>' + esc(e) + '</small></span><button class="sw ' + (cal.includes(e) ? 'on' : '') + '" data-cal="' + esc(e) + '" aria-label="' + esc(n) + '"></button></div>').join('') + '<div class="thr"><b>Zakres kalendarza do przodu</b><output>' + days + ' dni</output><input type="range" data-cd min="1" max="30" step="1" value="' + days + '"></div></div>' +
    '<div class="card"><div class="bar"><h3 style="margin:0">Baterie (' + bats.length + ')</h3><span class="sp"></span><button class="btn sm" id="scanbat">Dodaj wykryte w HA</button></div>' + bats.map((e, i) => '<div class="row" style="margin-top:6px">' + dot(e) + '<span class="n">' + esc(nm(e)) + '<small>' + esc(e) + '</small></span><button class="btn sm" data-bx="' + i + '" aria-label="Usuń">✕</button></div>').join('') +
    '<div class="ent" style="margin-top:8px"><input class="mono" type="text" list="dl-bat" id="newbat" placeholder="sensor.…_battery"><button class="btn sm" id="addbat">+ Dodaj</button></div>' + dl('dl-bat', x => /^sensor\..*battery/.test(x)) + '</div>';
  const setC = (k, v) => { S.cfg[k] = v; commit(); };
  m.querySelectorAll('[data-cal]').forEach(b => b.onclick = () => { const e = b.dataset.cal; setC('cal', cal.includes(e) ? cal.filter(x => x !== e) : cal.concat(e)); });
  const cd = m.querySelector('[data-cd]'); cd.oninput = () => { cd.parentElement.querySelector('output').textContent = cd.value + ' dni'; }; cd.onchange = () => setC('calDays', +cd.value);
  m.querySelectorAll('[data-bx]').forEach(b => b.onclick = () => setC('bats', bats.filter((_, i) => i !== +b.dataset.bx)));
  $('#addbat').onclick = () => { const v = $('#newbat').value.trim(); if (!/^sensor\.[a-z0-9_]+$/.test(v)) { toast('Podaj encję sensor.…'); return; } if (!bats.includes(v)) setC('bats', bats.concat(v)); };
  $('#scanbat').onclick = () => { const f = ENT.map(x => x[0]).filter(e => /^sensor\..*_battery$/.test(e) && !bats.includes(e)); if (!f.length) { toast('Nie znaleziono nowych baterii'); return; } setC('bats', bats.concat(f)); toast('Dodano ' + f.length + ' baterii. Usuń niepotrzebne'); };
}

// ---- widoki pokoi: ustawienia kazdego pokoju osobno (kolejnosc i widocznosc blokow, wyglad, kolumny, uklad urzadzen) ----
const RVB = {occ: 'Obecność (Ktoś jest / Pusto)', big: 'Duże wartości', extra: 'Czujniki i status', dev: 'Urządzenia', chart: 'Wykresy'}, RVDEF = ['occ', 'big', 'extra', 'dev', 'chart'];
let selDev = null, rvRoom = null;
const curRoom = () => { const R = roomsNow(); return R.find(r => r.id === rvRoom) || R[0]; };
const mutRoom = () => { const r = curRoom(); return r ? ensureRooms().find(x => x.id === r.id) : null; };
function rvDef(r) { return ['occ', 'big', 'extra', 'dev'].concat((r.secs || []).map(g => g.id), ['chart']); }
function rvOrder(r) { const def = rvDef(r), o = ((r.view || {}).order || []).filter(k => def.includes(k)); def.forEach(k => { if (!o.includes(k)) o.push(k); }); return o; }
function setRV(prop, val) { const r = mutRoom(); r.view = r.view || {}; if (val === '' || val === null || val === undefined || (Array.isArray(val) && !val.length)) delete r.view[prop]; else r.view[prop] = val; if (!Object.keys(r.view).length) delete r.view; commit(); }
function moveBlk(from, to) { const r = mutRoom(); if (!r) return; const o = rvOrder(r), i = o.indexOf(from), j = o.indexOf(to); if (i < 0 || j < 0 || i === j) return; o.splice(j, 0, o.splice(i, 1)[0]); setRV('order', o); }
const DSH = [['', 'Prostokąt'], ['sq', 'Kwadrat'], ['ci', 'Okrąg'], ['pi', 'Pigułka']];
const BTN = {t: 'Temperatura', h: 'Wilgotność', l: 'Światło'};
let selBt = null;
function btOrder(r) { const o = ((r.view || {}).bo || []).filter(k => BTN[k]); Object.keys(BTN).forEach(k => { if (!o.includes(k)) o.push(k); }); return o; }
function moveBt(from, to) { const r = mutRoom(); if (!r) return; const o = btOrder(r), i = o.indexOf(from), j = o.indexOf(to); if (i < 0 || j < 0 || i === j) return; o.splice(j, 0, o.splice(i, 1)[0]); selBt = from; setRV('bo', o.join() === 't,h,l' ? '' : o); }
function moveDev(i, j) { const r = mutRoom(); if (!r) return; const a = r.dev || []; if (i === j || i < 0 || j < 0 || i >= a.length || j >= a.length) return; a.splice(j, 0, a.splice(i, 1)[0]); selDev = j; commit(); }
function setDevOpt(i, prop, val) { const r = mutRoom(), d = r.dev[i]; while (d.length < 3) d.push('mdi:power'); const o = Object.assign({}, d[3]); if (!val) delete o[prop]; else o[prop] = val; if (Object.keys(o).length) d[3] = o; else d.length = 3; commit(); }
let selPart = null;
const PARTN = {hdr: 'Dane pokoju', occ: 'Obecność', big: 'Duże wartości i czujniki', extra: 'Czujniki i status', dev: 'Urządzenia', chart: 'Wykresy'};
function viewRoom(m) {
  const R = roomsNow();
  if (!R.length) { m.innerHTML = '<div class="card"><b>Pokoje i urządzenia</b><div class="note">Brak pokoi. Dodaj pierwszy pokój.</div><div class="bar" style="margin-top:8px"><button class="btn sm" id="addroom">+ Dodaj pokój</button></div></div>'; $('#addroom').onclick = addRoom; return; }
  const r = curRoom(); rvRoom = r.id;
  m.innerHTML = '<div class="card"><div class="bar"><div><div style="font-size:19px;font-weight:800">Pokoje i urządzenia</div><div class="note">Wybierz pokój, a potem kliknij element w podglądzie (nagłówek, wartości, urządzenie, wykres…), żeby go edytować w panelu po prawej. Bloki i urządzenia przeciągasz w podglądzie.</div></div><span class="sp"></span><button class="btn sm" id="adddevm">+ Dodaj urządzenie</button><button class="btn sm" id="addsecm">+ Dodaj sekcję</button><button class="btn sm" id="addroom">+ Dodaj pokój</button></div><div class="chipsr" id="rsel">' + R.map(x => '<button draggable="true" data-r="' + esc(x.id) + '" class="rc' + (x.id === r.id ? ' on' : '') + '" style="--c:' + (PALC[x.c] || PALC.lav)[0] + '">' + esc(x.name || x.id) + '</button>').join('') + '</div></div>';
  $('#addroom').onclick = addRoom; $('#adddevm').onclick = addDevice; $('#addsecm').onclick = addSec;
  let drr = null;
  m.querySelectorAll('#rsel .rc').forEach(e => { const id = e.dataset.r;
    e.onclick = () => { rvRoom = id; selDev = null; selPart = null; refresh(); };
    e.ondragstart = ev => { drr = id; try { ev.dataTransfer.setData('text/plain', id); } catch (x) {} };
    e.ondragover = ev => { if (drr && drr !== id) { ev.preventDefault(); e.classList.add('over'); } };
    e.ondragleave = () => e.classList.remove('over');
    e.ondrop = ev => { ev.preventDefault(); const a = ensureRooms(), i = a.findIndex(x => x.id === drr), j = a.findIndex(x => x.id === id); if (i >= 0 && j >= 0 && i !== j) { a.splice(j, 0, a.splice(i, 1)[0]); commit(); } drr = null; }; });
}
function addDevice() { const rr = mutRoom(); if (!rr) return; rr.dev = (rr.dev || []).concat([['', 'Nowe urządzenie', 'mdi:power']]); selPart = 'dev'; selDev = rr.dev.length - 1; commit(); }
function addSec() { const rr = mutRoom(); if (!rr) return; rr.secs = rr.secs || []; const n = ['s1', 's2', 's3', 's4', 's5', 's6'].find(k => !rr.secs.some(g => g.id === k)); if (!n) { toast('Maksymalnie 6 własnych sekcji w pokoju'); return; } rr.secs.push({id: n, t: 'Nowa sekcja'}); selDev = null; selPart = 'g:' + n; commit(); }
function setDevG(i, g) { const r = mutRoom(), d = r.dev[i]; while (d.length < 3) d.push('mdi:power'); const o = Object.assign({}, d[3]); if (!g) delete o.g; else o.g = g; if (Object.keys(o).length) d[3] = o; else d.length = 3; commit(); }
function addRoom() { const a = ensureRooms(); let id = 'pokoj', k = 2; while (a.some(x => x.id === id)) id = 'pokoj' + k++; a.push({id, name: 'Nowy pokój', icon: 'mdi:home-outline', c: 'lav', dev: []}); rvRoom = id; selDev = null; selPart = 'hdr'; commit(); }
function inspRoomPart(e) {
  const r = curRoom(); if (!r) { e.innerHTML = ''; return; }
  if (selDev !== null && (r.dev || [])[selDev]) return inspDev(e);
  const part = selPart, V = r.view || {}, hide = V.hide || [], V0 = D.variants || {}, order = rvOrder(r);
  const fld = (lab, k, pre) => '<label class="f">' + lab + '</label><div class="ent">' + dot(r[k]) + '<input class="mono" type="text" list="' + pre + '" data-k="' + k + '" value="' + esc(r[k] || '') + '" placeholder="domena.encja"></div>';
  const vseg = (k, label) => '<label class="f">' + label + '</label><div class="seg" data-rv="' + k + '">' + ['Globalnie'].concat(V0[k] ? V0[k].values : []).map(o => '<button data-v="' + esc(o) + '" class="' + ((V[k] || 'Globalnie') === o ? 'on' : '') + '">' + esc(o) + '</button>').join('') + '</div>';
  const blk = k => { const i = order.indexOf(k); return '<div class="row" style="margin-top:10px"><span class="n">Blok widoczny w tym pokoju</span><button class="btn sm" data-bm="-1" ' + (i <= 0 ? 'disabled' : '') + ' aria-label="Wyżej">↑</button><button class="btn sm" data-bm="1" ' + (i >= order.length - 1 ? 'disabled' : '') + ' aria-label="Niżej">↓</button><button class="sw ' + (hide.includes(k) ? '' : 'on') + '" data-bv aria-label="Widoczny"></button></div><label class="f">Szerokość bloku (obok siebie)</label><div class="seg" data-bw="' + k + '">' + [[3, '¼'], [4, '⅓'], [6, '½'], [8, '⅔'], [9, '¾'], [12, 'Całość']].map(([n, l]) => '<button data-n="' + n + '" class="' + (((V.bw || {})[k] || 12) === n ? 'on' : '') + '">' + l + '</button>').join('') + '</div>'; };
  let h = '<h2>' + esc(r.name || r.id) + '</h2><div class="sub">' + (part ? (PARTN[part] || 'Sekcja: ' + esc(((r.secs || []).find(g => 'g:' + g.id === part) || {}).t || '')) : 'Widok pokoju') + '</div>', bk = null;
  if (!part) h += '<div class="note">Kliknij element w podglądzie, żeby go edytować: nagłówek (dane pokoju), wartości (czujniki), urządzenie, wykres lub blok. Przeciągnij blok albo urządzenie, żeby zmienić układ.</div><div class="bar" style="margin-top:10px"><button class="btn sm" data-go="hdr">Dane pokoju</button><button class="btn sm" data-go="dev">Urządzenia</button></div>';
  if (part === 'hdr') h += '<label class="f">Nazwa</label><input type="text" data-k="name" maxlength="24" value="' + esc(r.name || '') + '"><label class="f">Ikona</label><div class="ent">' + icoImg(r.icon) + '<input class="mono" type="text" data-k="icon" id="ricon" value="' + esc(r.icon || '') + '" placeholder="mdi:sofa"><button class="btn sm" data-ipick="ricon">Wybierz</button></div><label class="f">Kolor kafelka</label><div class="bar">' + Object.keys(PALC).map(c => '<button class="btn sm" data-pc="' + c + '" style="background:' + PALC[c][0] + ';width:30px;height:26px;padding:0;border-width:' + (r.c === c ? 3 : 1) + 'px;border-color:' + (r.c === c ? 'var(--acc)' : 'var(--line)') + '" aria-label="' + c + '"></button>').join('') + '</div><h3 style="margin-top:16px">Kafelek na ekranie głównym</h3><label class="f">Szerokość kafelka</label><div class="seg" data-sz="w">' + [[1, '1 kol.'], [2, '2 kol.'], [3, 'Cały rząd']].map(([v, l]) => '<button data-v="' + v + '" class="' + (((r.size || {}).w || 1) === v ? 'on' : '') + '">' + l + '</button>').join('') + '</div><label class="f">Wysokość kafelka</label><div class="seg" data-sz="h">' + [[1, 'Standard'], [2, 'Wysoki (2 wiersze)']].map(([v, l]) => '<button data-v="' + v + '" class="' + (((r.size || {}).h || 1) === v ? 'on' : '') + '">' + l + '</button>').join('') + '</div>' + '<label class="f">Wygląd urządzeń na kafelku</label><div class="seg" data-dsh>' + [['', 'Jak ogólne']].concat(DSH.slice(1).concat([['rect', 'Prostokąt']])).map(([v, l]) => '<button data-v="' + v + '" class="' + ((r.dsh || '') === v ? 'on' : '') + '">' + l + '</button>').join('') + '</div>' + fld('Czujnik obecności', 'occ', 'dl-bin') + fld('Temperatura', 't', 'dl-sensor') + fld('Wilgotność', 'h', 'dl-sensor') + fld('Natężenie światła', 'lux', 'dl-sensor') + fld('Automat gaszenia (przełącznik)', 'auto', 'dl-any2') + '<label class="f">Urządzenia widoczne na kafelku</label><div class="ord">' + (r.dev || []).map((d, i) => '<div class="row"><span class="n">' + esc(d[1]) + '</span><button class="sw ' + ((d[3] || {}).room ? '' : 'on') + '" data-tl="' + i + '" aria-label="Na kafelku"></button></div>').join('') + '</div><div class="bar" style="margin-top:14px"><span class="sp"></span><button class="btn sm bad" id="delroom">Usuń pokój</button></div>';
  if (part === 'occ') { h += fld('Czujnik obecności', 'occ', 'dl-bin'); bk = 'occ'; }
  if (part === 'big') { const bo = btOrder(r), E = (H().el || {}); h += '<label class="f">Wartości w sekcji (przeciągnij w podglądzie albo użyj strzałek)</label><div class="ord">' + bo.map((k, i) => '<div class="row" style="' + (selBt === k ? 'border-color:var(--acc)' : '') + '"><span class="n">' + BTN[k] + '</span><button class="btn sm" data-bts="' + k + '">Zaznacz</button><button class="btn sm" data-btm="' + k + '" data-d="-1" ' + (i === 0 ? 'disabled' : '') + '>↑</button><button class="btn sm" data-btm="' + k + '" data-d="1" ' + (i === bo.length - 1 ? 'disabled' : '') + '>↓</button><button class="sw ' + ((E['rv.big' + {t: 'T', h: 'H', l: 'L'}[k]] || {}).vis === false ? '' : 'on') + '" data-btv="' + k + '" aria-label="Pokaż"></button></div>').join('') + '</div>' + (selBt ? '<div class="note" style="margin:6px 0">Zaznaczono: ' + BTN[selBt] + '. Kolor, czcionkę i rozmiar tej wartości ustawisz w „Widoki szczegółowe → Pomieszczenia”. Encję zmienisz poniżej.</div>' : '') + fld('Temperatura', 't', 'dl-sensor') + fld('Wilgotność', 'h', 'dl-sensor') + fld('Natężenie światła', 'lux', 'dl-sensor') + vseg('big', 'Wygląd wartości'); bk = 'big'; }
  if (part === 'extra') { h += '<div class="note">Drzwi, pralka, gaz i zalanie pokazują się tylko w pokojach, które mają takie czujniki (kuchnia, przedpokój, łazienka).</div>'; bk = 'extra'; }
  if (part === 'chart') { h += vseg('chart', 'Wygląd wykresów') + '<div class="note" style="margin-top:8px">Wykresy powstają z czujników temperatury i wilgotności pokoju (kliknij „Duże wartości”, żeby je zmienić).</div>'; bk = 'chart'; }
  const gp = part && part.startsWith('g:') ? (r.secs || []).find(g => 'g:' + g.id === part) : null;
  if (gp) { h += '<label class="f">Tytuł sekcji</label><input type="text" data-gt maxlength="24" value="' + esc(gp.t) + '"><label class="f">Urządzenia w tej sekcji</label><div class="ord">' + (r.dev || []).map((d, i) => '<div class="row"><span class="n">' + esc(d[1]) + '</span><button class="sw ' + ((d[3] || {}).g === gp.id ? 'on' : '') + '" data-dg="' + i + '" aria-label="W sekcji"></button></div>').join('') + '</div><div class="note" style="margin-top:6px">Urządzenia, które tu zaznaczysz, znikają z bloku „Urządzenia” i pokazują się pod tytułem tej sekcji. Przeciągnij sekcję w podglądzie, żeby zmienić jej miejsce.</div><div class="bar" style="margin-top:10px"><button class="btn sm" id="adddevg">+ Urządzenie w sekcji</button><span class="sp"></span><button class="btn sm bad" id="delsec">Usuń sekcję</button></div>'; bk = gp.id; }
  if (part === 'dev') {
    h += '<div class="bar"><span class="note">Urządzenia (' + (r.dev || []).length + ')</span><span class="sp"></span><button class="btn sm" id="adddev">+ Urządzenie</button></div><div class="ord" id="rvdev" style="margin-top:6px">' + (r.dev || []).map((d, i) => { const o = d[3] || {}; return '<div class="row" draggable="true" data-i="' + i + '"><span class="h">⠿</span><span class="n">' + esc(d[1]) + '</span><button class="btn sm" data-w="' + i + '" title="Szerokość kafelka">' + (o.w === 2 ? '2 kol.' : '1 kol.') + '</button><button class="sw ' + (o.hide ? '' : 'on') + '" data-dv="' + i + '" aria-label="Pokaż"></button></div>'; }).join('') + '</div>' +
      vseg('dev', 'Wygląd urządzeń') + '<label class="f">Kolumny urządzeń (tablet)</label><div class="seg" data-rvc>' + [['', 'Auto'], [2, '2'], [3, '3'], [4, '4'], [5, '5']].map(([v, l]) => '<button data-c="' + v + '" class="' + ((V.cols || '') === v ? 'on' : '') + '">' + l + '</button>').join('') + '</div>'; bk = 'dev'; }
  if (bk) h += blk(bk);
  e.innerHTML = h + dl('dl-sensor', x => x.startsWith('sensor.')) + dl('dl-bin', x => x.startsWith('binary_sensor.')) + dl('dl-any2', x => /^(switch|input_boolean|automation)\./.test(x));
  bindIcons(e);
  e.querySelectorAll('[data-k]').forEach(i => i.onchange = () => { mutRoom()[i.dataset.k] = i.value.trim(); commit(); });
  e.querySelectorAll('[data-pc]').forEach(b => b.onclick = () => { mutRoom().c = b.dataset.pc; commit(); });
  e.querySelectorAll('[data-go]').forEach(b => b.onclick = () => { selPart = b.dataset.go; refresh(); });
  e.querySelectorAll('[data-rv]').forEach(g => g.querySelectorAll('button').forEach(b => b.onclick = () => setRV(g.dataset.rv, b.dataset.v === 'Globalnie' ? '' : b.dataset.v)));
  e.querySelectorAll('[data-rvc] button').forEach(b => b.onclick = () => setRV('cols', b.dataset.c === '' ? '' : +b.dataset.c));
  e.querySelectorAll('[data-bw] button').forEach(b => b.onclick = () => { const k = b.dataset.n, key = b.parentElement.dataset.bw, o = Object.assign({}, V.bw); if (+k === 12) delete o[key]; else o[key] = +k; setRV('bw', Object.keys(o).length ? o : ''); });
  e.querySelectorAll('[data-bts]').forEach(b => b.onclick = () => { selBt = b.dataset.bts; refresh(); });
  e.querySelectorAll('[data-btm]').forEach(b => b.onclick = () => { const o = btOrder(r), i = o.indexOf(b.dataset.btm), j = i + +b.dataset.d; if (j >= 0 && j < o.length) moveBt(b.dataset.btm, o[j]); });
  e.querySelectorAll('[data-btv]').forEach(b => b.onclick = () => { const key = 'rv.big' + {t: 'T', h: 'H', l: 'L'}[b.dataset.btv], o = ((H().el || {})[key] || {}); setEl('rv', 'big' + {t: 'T', h: 'H', l: 'L'}[b.dataset.btv], 'vis', o.vis === false); });
  const bv = e.querySelector('[data-bv]'); if (bv) bv.onclick = () => { const hh = hide.slice(), i = hh.indexOf(bk); if (i >= 0) hh.splice(i, 1); else hh.push(bk); setRV('hide', hh); };
  e.querySelectorAll('[data-bm]').forEach(b => b.onclick = () => { const i = order.indexOf(bk), j = i + +b.dataset.bm; if (j >= 0 && j < order.length) moveBlk(bk, order[j]); });
  const dr = $('#delroom'); if (dr) dr.onclick = () => modal('<h2>Usunąć pokój „' + esc(r.name || r.id) + '”?</h2><p class="note">Kafelek i widok pokoju znikną z karty po publikacji. Zmianę możesz cofnąć przed publikacją albo przywrócić z kopii.</p><div class="bar" style="justify-content:flex-end"><button class="btn" data-x>Anuluj</button><button class="btn pri" id="okrm">Usuń</button></div>', () => { $('#okrm').onclick = () => { S.cfg.rooms = ensureRooms().filter(x => x.id !== r.id); rvRoom = null; selDev = null; selPart = null; closeModal(); commit(); }; });
  const ad = $('#adddev'); if (ad) ad.onclick = addDevice;
  e.querySelectorAll('[data-sz]').forEach(g => g.querySelectorAll('button').forEach(b => b.onclick = () => { const rr = mutRoom(); rr.size = Object.assign({}, rr.size); const v = +b.dataset.v; if (v === 1) delete rr.size[g.dataset.sz]; else rr.size[g.dataset.sz] = v; if (!Object.keys(rr.size).length) delete rr.size; commit(); }));
  e.querySelectorAll('[data-dsh] button').forEach(b => b.onclick = () => { const rr = mutRoom(), v = b.dataset.v; if (v) rr.dsh = v === 'rect' ? '' : v; else delete rr.dsh; commit(); });
  e.querySelectorAll('[data-tl]').forEach(b => b.onclick = () => { const i = +b.dataset.tl; setDevOpt(i, 'room', !((r.dev[i][3] || {}).room)); });
  const gt = e.querySelector('[data-gt]'); if (gt) gt.onchange = () => { const g = mutRoom().secs.find(x => 'g:' + x.id === part); g.t = gt.value.trim() || 'Sekcja'; commit(); };
  e.querySelectorAll('[data-dg]').forEach(b => b.onclick = () => { const i = +b.dataset.dg; setDevG(i, (r.dev[i][3] || {}).g === gp.id ? '' : gp.id); });
  const ag = $('#adddevg'); if (ag) ag.onclick = () => { const rr = mutRoom(); rr.dev = (rr.dev || []).concat([['', 'Nowe urządzenie', 'mdi:power', {g: gp.id}]]); selDev = rr.dev.length - 1; commit(); };
  const ds = $('#delsec'); if (ds) ds.onclick = () => { const rr = mutRoom(); rr.secs = rr.secs.filter(x => x.id !== gp.id); if (!rr.secs.length) delete rr.secs; (rr.dev || []).forEach((d, i) => { if ((d[3] || {}).g === gp.id) { const o = Object.assign({}, d[3]); delete o.g; if (Object.keys(o).length) d[3] = o; else d.length = 3; } }); selPart = null; commit(); };
  e.querySelectorAll('[data-w]').forEach(b => b.onclick = ev => { ev.stopPropagation(); const i = +b.dataset.w; setDevOpt(i, 'w', ((r.dev[i][3] || {}).w === 2) ? 0 : 2); });
  e.querySelectorAll('[data-dv]').forEach(b => b.onclick = ev => { ev.stopPropagation(); const i = +b.dataset.dv; setDevOpt(i, 'hide', !((r.dev[i][3] || {}).hide)); });
  let drg = null; e.querySelectorAll('#rvdev .row').forEach(x => { const i = x.dataset.i;
    x.onclick = () => { selDev = +i; refresh(); };
    x.ondragstart = ev => { drg = i; try { ev.dataTransfer.setData('text/plain', i); } catch (z) {} };
    x.ondragover = ev => { if (drg !== null && drg !== i) { ev.preventDefault(); x.classList.add('over'); } };
    x.ondragleave = () => x.classList.remove('over');
    x.ondrop = ev => { ev.preventDefault(); if (drg !== null) moveDev(+drg, +i); drg = null; }; });
}

function inspDev(e) {
  const r = curRoom(); if (!r) { e.innerHTML = ''; return; }
  const d = selDev !== null ? (r.dev || [])[selDev] : null;
  if (!d) { e.innerHTML = '<h2>' + esc(r.name || r.id) + '</h2><div class="sub">Widok pokoju</div><div class="note">Kliknij urządzenie w podglądzie albo na liście, żeby edytować jego nazwę, ikonę, encję i rozmiar kafelka. Bloki i urządzenia przeciągasz w podglądzie.</div>'; return; }
  const o = d[3] || {};
  e.innerHTML = '<button class="btn sm" id="dback">← ' + esc(r.name || r.id) + '</button><h2 style="margin-top:10px">' + esc(d[1]) + '</h2><div class="sub">Urządzenie w widoku pokoju</div>' +
    '<div class="row"><span class="n">Widoczne</span><button class="sw ' + (o.hide ? '' : 'on') + '" id="dvis" aria-label="Widoczne"></button></div>' +
    '<label class="f">Nazwa</label><input type="text" id="dn" maxlength="24" value="' + esc(d[1]) + '">' +
    '<label class="f">Ikona</label>' + icoField('di', d[2] || '') +
    '<label class="f">Encja</label><div class="ent">' + dot(d[0]) + '<input class="mono" type="text" list="dl-any" id="de" value="' + esc(d[0]) + '"></div>' +
    '<div class="row" style="margin-top:6px"><span class="n">Na kafelku ekranu głównego</span><button class="sw ' + (o.room ? '' : 'on') + '" id="dtile" aria-label="Na kafelku"></button></div>' +
    ((r.secs || []).length ? '<label class="f">Sekcja</label><div class="seg" id="dsec">' + [{id: '', t: 'Urządzenia'}].concat(r.secs).map(g => '<button data-g="' + g.id + '" class="' + ((o.g || '') === g.id ? 'on' : '') + '">' + esc(g.t) + '</button>').join('') + '</div>' : '') +
    '<label class="f">Szerokość kafelka</label><div class="seg" id="dw"><button data-w="1" class="' + (o.w === 2 ? '' : 'on') + '">1 kolumna</button><button data-w="2" class="' + (o.w === 2 ? 'on' : '') + '">2 kolumny</button></div>' +
    '<div class="bar" style="margin-top:14px"><button class="btn sm" id="dup" ' + (selDev === 0 ? 'disabled' : '') + '>↑ Wyżej</button><button class="btn sm" id="ddn" ' + (selDev >= r.dev.length - 1 ? 'disabled' : '') + '>↓ Niżej</button><span class="sp"></span><button class="btn sm bad" id="drm">Usuń z pokoju</button></div>' + dl('dl-any', x => /^(light|switch|media_player|fan|cover|climate|lock|input_boolean|script|scene)\./.test(x));
  bindIcons(e);
  const set = (i, v) => { const rr = mutRoom(), dd = rr.dev[selDev]; while (dd.length < 3) dd.push('mdi:power'); dd[i] = v; commit(); };
  $('#dback').onclick = () => { selDev = null; selPart = 'dev'; refresh(); };
  $('#dvis').onclick = () => setDevOpt(selDev, 'hide', !o.hide); $('#dtile').onclick = () => setDevOpt(selDev, 'room', !o.room);
  e.querySelectorAll('#dsec button').forEach(b => b.onclick = () => setDevG(selDev, b.dataset.g));
  $('#dn').onchange = ev => set(1, ev.target.value.trim()); $('#di').onchange = ev => set(2, ev.target.value.trim()); $('#de').onchange = ev => set(0, ev.target.value.trim());
  e.querySelectorAll('#dw button').forEach(b => b.onclick = () => setDevOpt(selDev, 'w', b.dataset.w === '2' ? 2 : 0));
  $('#dup').onclick = () => moveDev(selDev, selDev - 1); $('#ddn').onclick = () => moveDev(selDev, selDev + 1);
  $('#drm').onclick = () => { mutRoom().dev.splice(selDev, 1); selDev = null; commit(); };
}

// ---- widoki szczegolowe ----
const MINI = {
  'Linia': '<svg viewBox="0 0 60 26" class="mini"><polyline fill="none" stroke="#a98bff" stroke-width="2" points="2,20 12,12 22,16 32,6 44,12 58,4"/></svg>',
  'Obszar': '<svg viewBox="0 0 60 26" class="mini"><polygon fill="#a98bff" fill-opacity=".3" points="2,24 2,20 12,12 22,16 32,6 44,12 58,4 58,24"/><polyline fill="none" stroke="#a98bff" stroke-width="2" points="2,20 12,12 22,16 32,6 44,12 58,4"/></svg>',
  'Słupki': '<svg viewBox="0 0 60 26" class="mini">' + [20, 12, 16, 6, 12, 4].map((y, i) => '<rect x="' + (4 + i * 10) + '" y="' + y + '" width="6" height="' + (24 - y) + '" rx="1" fill="#a98bff"/>').join('') + '</svg>',
  'Schodkowy': '<svg viewBox="0 0 60 26" class="mini"><path fill="none" stroke="#a98bff" stroke-width="2" d="M2 20 H12 V12 H22 V16 H32 V6 H44 V12 H58"/></svg>',
  'Kafelki': '<div class="mini mg"><i></i><i></i><i></i><i></i></div>', 'Lista': '<div class="mini ml"><i></i><i></i><i></i></div>',
  'Przełączniki': '<div class="mini ml"><i class="t"></i><i class="t on"></i><i class="t"></i></div>', 'Suwaki': '<div class="mini ml"><i class="s"></i><i class="s w"></i><i class="s h"></i></div>',
  'Duże kafle': '<div class="mini mg"><i></i><i></i></div>', 'Kompakt': '<div class="mini ml"><i></i><i></i></div>'
};
function viewWid(m) {
  const V = D.variants || {}, vv = S.views = S.views || {}, blocks = catOf(selView);
  m.innerHTML = '<div class="card"><div class="bar"><div><div style="font-size:19px;font-weight:800">Widoki szczegółowe</div><div class="note">Wygląd kart wspólny dla wszystkich widoków oraz bloki każdego widoku (ukrywanie, kolory, czcionki).</div></div></div></div>' +
    '<div class="card"><h3>Wygląd kart (wszystkie widoki)</h3>' + Object.keys(V).map(k => '<label class="f">' + esc(V[k].name) + '</label><div class="vgrid">' + V[k].values.map(o => '<button class="vopt' + ((vv[k] || V[k].default) === o ? ' on' : '') + '" data-var="' + k + '" data-v="' + esc(o) + '">' + (MINI[o] || '') + '<span>' + esc(o) + (o === V[k].default ? ' (obecny)' : '') + '</span></button>').join('') + '</div>').join('') + '</div>' +
    '<div class="card"><h3>Bloki widoku</h3><div class="seg" id="vsel" style="flex-wrap:wrap;border-radius:16px;margin-bottom:10px">' + Object.keys(VNAMES).map(k => '<button data-w="' + k + '" class="' + (selView === k ? 'on' : '') + '">' + esc(VNAMES[k]) + '</button>').join('') + '</div>' +
    blocks.map(([k, n]) => { const o = elOf(selView + '.' + k) || {}; return '<div class="row" style="margin-bottom:6px;' + (selEl === k ? 'border-color:var(--acc)' : '') + '"><span class="n">' + esc(n) + '</span><button class="btn sm" data-ee="' + k + '">Edytuj</button><button class="sw ' + (o.vis === false ? '' : 'on') + '" data-es="' + k + '" aria-label="Pokaż ' + esc(n) + '"></button></div>'; }).join('') + '</div>';
  if (selView === 'klimat') {
    const items = [{id: 'out', n: 'Na zewnątrz'}].concat(roomsNow().filter(r => r.t).map(r => ({id: r.id, n: r.name || r.id}))), kl = S.cfg.klim || [];
    items.sort((x, y) => { const a = kl.indexOf(x.id), b = kl.indexOf(y.id); return (a < 0 ? 999 : a) - (b < 0 ? 999 : b); });
    m.insertAdjacentHTML('beforeend', '<div class="card"><h3>Kolejność temperatury i wilgotności</h3><div class="note">Kolejność kart w widoku Klimat. Przeciągnij wiersz albo użyj strzałek.</div><div class="ord" id="klord">' + items.map((x, i) => '<div class="row" draggable="true" data-i="' + i + '"><span class="h">⠿</span><span class="n">' + esc(x.n) + '</span><button class="btn sm" data-km="-1" data-i="' + i + '" ' + (i === 0 ? 'disabled' : '') + '>↑</button><button class="btn sm" data-km="1" data-i="' + i + '" ' + (i === items.length - 1 ? 'disabled' : '') + '>↓</button></div>').join('') + '</div><div class="bar" style="margin-top:8px"><button class="btn sm" id="klreset">Kolejność domyślna</button></div></div>');
    const mv = (i, j) => { if (j < 0 || j >= items.length || i === j) return; const ids = items.map(x => x.id); ids.splice(j, 0, ids.splice(i, 1)[0]); S.cfg.klim = ids; commit(); };
    m.querySelectorAll('[data-km]').forEach(b => b.onclick = () => mv(+b.dataset.i, +b.dataset.i + +b.dataset.km));
    let dk = null; m.querySelectorAll('#klord .row').forEach(x => { const i = +x.dataset.i;
      x.ondragstart = ev => { dk = i; try { ev.dataTransfer.setData('text/plain', i); } catch (z) {} };
      x.ondragover = ev => { if (dk !== null && dk !== i) { ev.preventDefault(); x.classList.add('over'); } };
      x.ondragleave = () => x.classList.remove('over');
      x.ondrop = ev => { ev.preventDefault(); if (dk !== null) mv(dk, i); dk = null; }; });
    $('#klreset').onclick = () => { delete S.cfg.klim; commit(); };
  }
  m.querySelectorAll('[data-var]').forEach(b => b.onclick = () => { const k = b.dataset.var; if (b.dataset.v === V[k].default) delete vv[k]; else vv[k] = b.dataset.v; commit(); });
  m.querySelectorAll('#vsel button').forEach(b => b.onclick = () => { selView = b.dataset.w; selEl = null; refresh(); });
  m.querySelectorAll('[data-ee]').forEach(b => b.onclick = () => { selEl = b.dataset.ee; elRoom = null; refresh(); });
  m.querySelectorAll('[data-es]').forEach(b => b.onclick = () => { const o = elOf(selView + '.' + b.dataset.es) || {}; setEl(selView, b.dataset.es, 'vis', o.vis === false); });
}

// ---- wygaszacz ----
function viewSaver(m) {
  const sv = S.saver = S.saver || {}, opt = D.saver_opts || {alarms: ['Zawsze', 'Tylko krytyczne', 'Nigdy'], fx: ['Animowane', 'Statyczne', 'Bez']};
  const al = sv.alarms || opt.alarms[0], fx = sv.fx || opt.fx[0], dim = sv.dim || 0, el = k => (elOf('sv.' + k) || {}).vis !== false;
  const seg = (k, cur) => '<div class="seg" data-sk="' + k + '">' + opt[k].map(o => '<button data-v="' + esc(o) + '" class="' + (cur === o ? 'on' : '') + '">' + esc(o) + '</button>').join('') + '</div>';
  const pv = '<div class="svp" style="background:linear-gradient(160deg,#ece9f6,#cfd8ea);color:#3a3552"><div class="svdim" style="background:rgba(0,0,0,' + dim / 100 + ')"></div>' + (fx === 'Bez' ? '' : '<div class="svcl">☁ ☁</div>') +
    '<div class="svc">' + (el('tm') ? '<div class="svt" data-sv="tm">15:14</div>' : '') + (el('dt') ? '<div data-sv="dt">piątek, 30 października</div>' : '') + (el('tp') ? '<div data-sv="tp" style="margin-top:6px;font-weight:800">☁ 12,5° Pochmurno' + (el('hum') ? ' · 💧 48%' : '') + '</div>' : '') + '</div>' +
    (al !== 'Nigdy' && el('al') ? '<div class="sva" data-sv="al">⚠ ' + (al === 'Tylko krytyczne' ? 'Krytyczny: ' : '') + 'Przerwa w dostawie ciepła</div>' : '') + '</div>';
  m.innerHTML = '<div class="card"><div class="bar"><div><div style="font-size:19px;font-weight:800">Wygaszacz</div><div class="note">Ekran po bezczynności: zegar, pogoda, alarmy na tle dopasowanym do pogody.</div></div></div></div>' +
    '<div class="card"><h3>Tło pogodowe</h3><label class="f">Animacje</label>' + seg('fx', fx) + '<div class="thr"><b>Przyciemnienie tła (czytelność tekstu)</b><output>' + dim + ' %</output><input type="range" id="dim" min="0" max="70" step="5" value="' + dim + '"></div></div>' +
    '<div class="card"><h3>Alarmy na wygaszaczu</h3>' + seg('alarms', al) + '<div class="note" style="margin-top:6px">„Tylko krytyczne” pokazuje wyłącznie czerwone alarmy. Dotknięcie ekranu zawsze wychodzi z wygaszacza.</div></div>' +
    '<div class="card"><h3>Elementy</h3>' + catOf('sv').map(([k, n]) => { const o = elOf('sv.' + k) || {}; return '<div class="row" style="margin-bottom:6px;' + (selEl === k ? 'border-color:var(--acc)' : '') + '"><span class="n">' + esc(n) + '</span><button class="btn sm" data-ee="' + k + '">Edytuj</button><button class="sw ' + (o.vis === false ? '' : 'on') + '" data-es="' + k + '" aria-label="Pokaż ' + esc(n) + '"></button></div>'; }).join('') + '</div>';
  m.insertAdjacentHTML('beforeend', '<div class="card svfull"><h3>Podgląd (schemat)</h3><div class="stage">' + pv + '</div><div class="note" style="margin-top:8px">Uproszczony podgląd. Prawdziwe tło zależy od aktualnej pogody i pory dnia (słońce, chmury, deszcz, śnieg, mgła, burza, gwiazdy w nocy).</div></div>');
  m.querySelectorAll('[data-sk]').forEach(g => g.querySelectorAll('button').forEach(b => b.onclick = () => { const k = g.dataset.sk; if (b.dataset.v === opt[k][0]) delete sv[k]; else sv[k] = b.dataset.v; commit(); }));
  const dm = $('#dim'); dm.oninput = () => { dm.parentElement.querySelector('output').textContent = dm.value + ' %'; sv.dim = +dm.value; const d = m.querySelector('.svdim'); if (d) d.style.background = 'rgba(0,0,0,' + dm.value / 100 + ')'; const st = $('#state'); st.className = 'pill dirty'; st.textContent = '● Niepublikowane zmiany'; $('#publish').disabled = false; }; dm.onchange = () => { if (!sv.dim) delete sv.dim; commit(); };
  m.querySelectorAll('[data-ee]').forEach(b => b.onclick = () => { selEl = b.dataset.ee; elRoom = null; refresh(); });
  m.querySelectorAll('[data-es]').forEach(b => b.onclick = () => { const o = elOf('sv.' + b.dataset.es) || {}; setEl('sv', b.dataset.es, 'vis', o.vis === false); });
  m.querySelectorAll('[data-sv]').forEach(x => x.onclick = () => { selEl = x.dataset.sv; refresh(); });
}

function renderMain() {
  const m = $('#main');
  const addLive = () => { m.insertAdjacentHTML('beforeend', liveCard()); bindLiveCard(m); };
  if (view === 'pokoje') { viewRoom(m); addLive(); return; }
  if (view === 'progi') { viewThr(m); addLive(); return; }
  if (view === 'inne') { viewMisc(m); addLive(); return; }
  if (view === 'wid') { viewWid(m); addLive(); return; }
  if (view === 'saver') return viewSaver(m);
  if (view === 'uklad') {
    m.innerHTML = '<div class="card"><div class="bar"><div><div style="font-size:19px;font-weight:800">Układ ekranu głównego</div><div class="note">Przeciągaj sekcje (na liście albo w podglądzie), zmieniaj ich szerokość i wysokość uchwytami. Zmiany trafiają do karty dopiero po „Publikuj”.</div></div><span class="sp"></span><div class="seg" id="themeseg" title="Motyw dashboardu">' + [['', 'Motyw: auto'], ['light', 'Jasny'], ['dark', 'Ciemny']].map(([v, l]) => '<button data-th="' + v + '" class="' + ((S.theme || '') === v ? 'on' : '') + '">' + l + '</button>').join('') + '</div><div class="seg" id="devseg"><button data-d="tablet" class="' + (dev === 'tablet' ? 'on' : '') + '">Tablet</button><button data-d="phone" class="' + (dev === 'phone' ? 'on' : '') + '">Telefon</button></div></div></div>' +
      '<div class="card" style="display:grid;grid-template-columns:minmax(0,300px) minmax(0,1fr);gap:16px"><div><h3>Kolejność (' + (dev === 'tablet' ? 'tablet' : 'telefon') + ')</h3><div class="ord" id="ord"></div><div class="bar" style="margin-top:10px"><button class="btn sm" id="resetorder">Układ domyślny</button></div></div>' +
      '<div class="pv"><h3>Podgląd na żywo (' + (dev === 'tablet' ? 'tablet' : 'telefon') + ')</h3><div class="stage lvs"><div class="lvph" id="lvph"></div></div><div class="note" style="margin-top:8px">' + (dev === 'tablet' ? 'Sekcje układają się w siatce po kolei, od lewej do prawej i w dół; pierwsza kolumna na tablecie jest węższa (330 px). Wysokość to minimum: sekcja urośnie, jeśli zawartość jest większa.' : 'Na telefonie liczy się tylko kolejność (szerokość i wysokość nie mają znaczenia).') + '</div></div></div>';
    drawList();
    m.querySelectorAll('#devseg button').forEach(b => b.onclick = () => { dev = b.dataset.d; renderMain(); livePost(); });
    m.querySelectorAll('#themeseg button').forEach(b => b.onclick = () => { S.theme = b.dataset.th; commit(); });
    $('#resetorder').onclick = () => { S = norm(D.default, TH0); commit(); toast('Wczytano układ domyślny. Opublikuj, żeby zastosować'); };
  } else {
    const rows = D.backups.map(b => '<div class="bk"><span class="g">' + (b.auto ? '⟳' : '▣') + '</span><div class="n"><b>' + esc(b.name) + '</b><small>' + fmt(b.saved) + (b.note ? ' · ' + esc(b.note) : '') + '</small></div><button class="btn sm" data-rs="' + esc(b.id) + '">Przywróć</button><button class="btn sm bad" data-del="' + esc(b.id) + '" aria-label="Usuń">✕</button></div>').join('');
    m.innerHTML = '<div class="card"><div class="bar"><div><div style="font-size:19px;font-weight:800">Kopie i styl domyślny</div><div class="note">Każda publikacja robi automatyczną kopię poprzedniego stanu. Przywrócenie jest zmianą niepublikowaną, więc można je cofnąć.</div></div><span class="sp"></span><button class="btn sm" id="mkbk">+ Zapisz kopię teraz</button></div></div>' +
      '<div class="card"><h3>Kopie zapasowe</h3>' + (rows || '<div class="empty">Brak kopii. Pierwsza powstanie przy pierwszej publikacji.</div>') + '</div>' +
      '<div class="card"><h3>Styl domyślny</h3><div class="note" style="margin-bottom:10px">Układ, który Aurora ma z generatora (stan, do którego da się zawsze wrócić). Przywrócenie jest zmianą niepublikowaną.</div><button class="btn bad" id="rdef">Przywróć styl domyślny…</button></div>';
    $('#mkbk').onclick = saveBackup;
    m.querySelectorAll('[data-rs]').forEach(b => b.onclick = () => restore(b.dataset.rs));
    m.querySelectorAll('[data-del]').forEach(b => b.onclick = () => modal('<h2>Usunąć kopię?</h2><p class="note">Tej operacji nie da się cofnąć.</p><div class="bar" style="justify-content:flex-end"><button class="btn" data-x>Anuluj</button><button class="btn pri" id="okdel">Usuń</button></div>', () => {
      $('#okdel').onclick = async () => { try { const r = await pa('pastel/backups/' + b.dataset.del, {method: 'DELETE'}); D.backups = r.backups; closeModal(); refresh(); toast('Usunięto kopię'); } catch (e) { toast('Błąd: ' + e.message); } };
    }));
    $('#rdef').onclick = () => modal('<h2>Przywrócić styl domyślny?</h2><p class="note">Niepublikowane zmiany zostaną zastąpione układem z generatora. Opublikowana wersja nie zmieni się, dopóki nie klikniesz „Publikuj”.</p><div class="bar" style="justify-content:flex-end"><button class="btn" data-x>Anuluj</button><button class="btn pri" id="okdef">Przywróć</button></div>', () => {
      $('#okdef').onclick = () => { S = norm(D.default, TH0); commit(); closeModal(); view = 'uklad'; refresh(); toast('Wczytano styl domyślny. Opublikuj, żeby zastosować'); };
    });
  }
}

function drawList() {
  const o = $('#ord'); let drag = null;
  const ids = list().slice(); if (dev === 'tablet') ids.splice(1, 0, 'today');   // „Dziś” to podpowiedzi w nagłówku zegara: tylko przełącznik
  o.innerHTML = ids.map(id => {
    const s = id === 'today' ? TODAY : SEC[id], sub = id === 'today';
    return '<div class="row' + (sub ? ' fixed' : '') + '" draggable="' + !sub + '" data-id="' + id + '" style="' + (sel === id ? 'border-color:var(--acc)' : '') + '"><span class="h">' + (sub ? '↳' : '⠿') + '</span><span class="n">' + esc(s.n) + '<small>' + esc(s.d) + (!sub && dev === 'tablet' ? ' · ' + H().sec[id].w + '×' + H().sec[id].h : '') + '</small></span>' +
      '<button class="sw ' + (hidden(id) ? '' : 'on') + '" aria-label="Pokaż ' + esc(s.n) + '"></button></div>';
  }).join('');
  o.querySelectorAll('.row').forEach(r => {
    const id = r.dataset.id;
    r.onclick = e => { if (e.target.closest('.sw')) { toggle(id); return; } sel = id; selEl = null; refresh(); };
    if (id === 'today') return;
    r.ondragstart = e => { drag = id; r.classList.add('drag'); try { e.dataTransfer.setData('text/plain', id); } catch (x) {} };
    r.ondragend = () => { drag = null; r.classList.remove('drag'); };
    r.ondragover = e => { if (drag && drag !== id) { e.preventDefault(); r.classList.add('over'); } };
    r.ondragleave = () => r.classList.remove('over');
    r.ondrop = e => { e.preventDefault(); r.classList.remove('over'); if (drag) move(drag, id); };
  });
}
function elementsHtml(sec) {
  const cat = catOf(sec); let h = '';
  if (sec === 'cal') { const n = H().calN; h += '<label class="f">Liczba wydarzeń: ' + (n ? n : 'domyślnie (2 na tablecie)') + '</label><div class="bar"><input type="range" id="calN" min="1" max="6" step="1" value="' + (n || 2) + '" style="flex:1"><button class="btn sm" id="calN0">domyślnie</button></div>'; }
  if (!cat.length) return h;
  return h + '<label class="f">Elementy sekcji</label>' + cat.map(([k, n, kind]) => { const o = elOf(sec + '.' + k) || {}, on = o.vis !== false;
    return '<div class="row" style="margin-bottom:6px;' + (selEl === k ? 'border-color:var(--acc)' : '') + '"><span class="n">' + esc(o.n || n) + '</span><button class="btn sm" data-ee="' + k + '">Edytuj</button><button class="sw ' + (on ? 'on' : '') + '" data-es="' + k + '" aria-label="Pokaż ' + esc(n) + '"></button></div>'; }).join('');
}
function setEl(sec, k, prop, val) {
  const el = (H().el = H().el || {}), key = sec + '.' + k, o = (el[key] = el[key] || {});
  if (val === '' || val === null || (prop === 'vis' && val === true)) delete o[prop]; else o[prop] = val;
  if (!Object.keys(o).length) delete el[key];
  commit();
}
function bindElements(e, sec) {
  e.querySelectorAll('[data-ee]').forEach(b => b.onclick = () => { selEl = b.dataset.ee; elRoom = null; refresh(); });
  e.querySelectorAll('[data-es]').forEach(b => b.onclick = () => { const o = elOf(sec + '.' + b.dataset.es) || {}; setEl(sec, b.dataset.es, 'vis', o.vis === false); });
  const cn = $('#calN'); if (cn) { cn.oninput = () => { H().calN = +cn.value; cn.previousElementSibling; }; cn.onchange = () => commit(); $('#calN0').onclick = () => { delete H().calN; commit(); }; }
}
const ENTMAP = {'hero.temp': ['out', 't'], 'hero.hum': ['out', 'h'], 'hero.icon': ['out', 'weather'], 'hero.desc': ['out', 'weather'], 'hero.pm': ['pm'], 'air.ring': ['pm'], 'air.text': ['pm'], 'air.purifier': ['purifier'], 'air.btn': ['purifier']};
const cfgEnt = p => { const val = o => p.length === 2 ? (o.out || {})[p[1]] : o[p[0]], a = val(S.cfg); return a !== undefined && a !== null ? a : (val(D.base || {}) || ''); };
const setCfgEnt = (p, v) => { if (p.length === 2) S.cfg.out = Object.assign({t: '', h: '', weather: ''}, (D.base || {}).out, S.cfg.out, {[p[1]]: v}); else S.cfg[p[0]] = v; commit(); };
function renderEl(e, sec) {
  const row = catOf(sec).find(c => c[0] === selEl); if (!row) { selEl = null; return false; }
  const [k0, name, kind] = row, k = k0 + (elScoped(sec) ? ':' + elRoom : ''), o = elOf(sec + '.' + k) || {}, num = kind[0] === 'n', defDec = num ? +kind[1] : 0;
  e.innerHTML = '<button class="btn sm" id="eback">← ' + esc(secName(sec)) + '</button><h2 style="margin-top:10px">' + esc(name) + '</h2><div class="sub">' + (SEC[sec] ? 'Element sekcji „' : 'Blok widoku „') + esc(secName(sec)) + '”</div>' +
    (sec === 'rooms' && elRoom ? '<label class="f">Zmiana dotyczy</label><div class="seg" id="escope"><button data-sc="one" class="' + (elScope === 'one' ? 'on' : '') + '">Tylko: ' + esc(((roomsNow().find(x => x.id === elRoom) || {}).name) || elRoom) + '</button><button data-sc="all" class="' + (elScope === 'all' ? 'on' : '') + '">Wszystkie pokoje</button></div>' : '') +
    '<div class="row"><span class="n">Widoczny</span><button class="sw ' + (o.vis === false ? '' : 'on') + '" id="ev" aria-label="Widoczny"></button></div>' +
    (kind === 'l' ? '<label class="f">Nazwa skrótu</label><input type="text" id="en" maxlength="24" value="' + esc(o.n || '') + '" placeholder="' + esc(name) + '">' : '') +
    '<label class="f">Kolor</label><div class="bar"><input type="color" id="ecol" value="' + (o.col || '#ececf0') + '" style="width:44px;height:30px;padding:0;border:1px solid var(--line);border-radius:8px;background:none"><button class="btn sm" id="ecol0">domyślny</button></div>' +
    '<label class="f">Czcionka</label><div class="bar"><select id="eff" style="max-width:160px;background:var(--bg);border:1px solid var(--line);border-radius:11px;padding:7px 10px">' + ['Domyślna'].concat(FONTS).map(f => '<option' + ((o.ff || 'Domyślna') === f ? ' selected' : '') + '>' + f + '</option>').join('') + '</select><div class="seg" id="efw">' + [['', 'Zwykła'], ['700', 'Gruba'], ['800', 'Bardzo']].map(([v, l]) => '<button data-fw="' + v + '" class="' + ((o.fw || '') === v ? 'on' : '') + '">' + l + '</button>').join('') + '</div></div>' +
    '<label class="f">Rozmiar</label><div class="seg" id="esz">' + [['S', 'Mały'], ['', 'Normalny'], ['L', 'Duży']].map(([v, l]) => '<button data-sz="' + v + '" class="' + ((o.sz || '') === v ? 'on' : '') + '">' + l + '</button>').join('') + '</div>' +
    (/(^links\.|\.hdr$)/.test(sec + '.' + k0) ? '<label class="f">Ikona</label>' + icoField('eico', o.ico || '', 'domyślna') : '') +
    (ENTMAP[sec + '.' + k0] ? '<label class="f">Encja</label><div class="ent">' + dot(cfgEnt(ENTMAP[sec + '.' + k0])) + '<input class="mono" type="text" list="dl-ee" id="eent" value="' + esc(cfgEnt(ENTMAP[sec + '.' + k0])) + '" placeholder="domena.encja"></div>' + dl('dl-ee', x => /^(sensor|weather|fan|binary_sensor)\./.test(x)) : '') +
    '<label class="f">Pozycja (siatka 8 px) – przesunięcie X / Y</label><div class="bar"><button class="btn sm" data-nx="-8">←</button><button class="btn sm" data-nx="8">→</button><button class="btn sm" data-ny="-8">↑</button><button class="btn sm" data-ny="8">↓</button><span class="note">' + (o.dx || 0) + ' / ' + (o.dy || 0) + ' px</span><button class="btn sm" id="epos0">Wyzeruj</button></div><div class="note">Albo włącz „Układaj elementy” nad podglądem i przeciągaj element myszą.</div>' +
    (num ? '<label class="f">Miejsca po przecinku</label><div class="seg" id="edec">' + [0, 1, 2].map(n => '<button data-dec="' + n + '" class="' + ((o.dec !== undefined ? o.dec : defDec) === n ? 'on' : '') + '">' + n + '</button>').join('') + '</div>' : '') +
    '<div class="bar" style="margin-top:14px"><span class="sp"></span><button class="btn sm bad" id="erst">Przywróć domyślne</button></div>';
  $('#eback').onclick = () => { selEl = null; refresh(); };
  e.querySelectorAll('#escope button').forEach(b => b.onclick = () => { elScope = b.dataset.sc; refresh(); });
  bindIcons(e); const ei = $('#eico'); if (ei) ei.onchange = () => setEl(sec, k, 'ico', ei.value.trim());
  const ee = $('#eent'); if (ee) ee.onchange = () => setCfgEnt(ENTMAP[sec + '.' + k0], ee.value.trim());
  const nudge = (ax, d) => { const el = (H().el = H().el || {}), key = sec + '.' + k, oo = (el[key] = el[key] || {}), v = (oo[ax] || 0) + d; if (v) oo[ax] = v; else delete oo[ax]; if (!Object.keys(oo).length) delete el[key]; commit(); };
  e.querySelectorAll('[data-nx]').forEach(b => b.onclick = () => nudge('dx', +b.dataset.nx)); e.querySelectorAll('[data-ny]').forEach(b => b.onclick = () => nudge('dy', +b.dataset.ny));
  $('#epos0').onclick = () => { const el = (H().el = H().el || {}), oo = el[sec + '.' + k]; if (oo) { delete oo.dx; delete oo.dy; if (!Object.keys(oo).length) delete el[sec + '.' + k]; } commit(); };
  $('#ev').onclick = () => setEl(sec, k, 'vis', o.vis === false);
  const en = $('#en'); if (en) en.onchange = () => setEl(sec, k, 'n', en.value.trim());
  $('#ecol').onchange = ev => setEl(sec, k, 'col', ev.target.value); $('#ecol0').onclick = () => setEl(sec, k, 'col', '');
  $('#eff').onchange = ev => setEl(sec, k, 'ff', ev.target.value === 'Domyślna' ? '' : ev.target.value);
  e.querySelectorAll('[data-fw]').forEach(b => b.onclick = () => setEl(sec, k, 'fw', b.dataset.fw));
  e.querySelectorAll('[data-sz]').forEach(b => b.onclick = () => setEl(sec, k, 'sz', b.dataset.sz));
  e.querySelectorAll('[data-dec]').forEach(b => b.onclick = () => setEl(sec, k, 'dec', +b.dataset.dec));
  $('#erst').onclick = () => { const el = (H().el = H().el || {}); delete el[sec + '.' + k]; commit(); toast('Przywrócono domyślne ustawienia elementu'); };
  return true;
}
function renderInsp() {
  const e = $('#insp');
  if (view === 'saver') { if (selEl && renderEl(e, 'sv')) return; e.innerHTML = '<h2>Wygaszacz</h2><div class="sub">Jak to działa</div><div class="note">Wygaszacz pokazuje zegar, datę, pogodę i alarmy na tle dopasowanym do pogody i pory dnia (słońce, chmury, deszcz, śnieg, mgła, burza, noc). Tu wybierasz, czy tło ma się animować, jak mocno jest przyciemnione oraz czy i jakie alarmy pokazywać. Elementy możesz ukryć i ostylować.</div>'; return; }
  if (view === 'wid') { if (selEl && renderEl(e, selView)) return; e.innerHTML = '<h2>Widoki szczegółowe</h2><div class="sub">Jak to działa</div><div class="note">Wygląd kart (wykresy, urządzenia, duże wartości) wybierasz u góry i dotyczy wszystkich widoków. Poniżej każdy blok widoku możesz ukryć albo ostylować: kolor, czcionka, rozmiar. Kliknij „Edytuj” przy bloku.<br><br>Kolejność bloków w widokach szczegółowych jest na razie stała.</div>'; return; }
  if (view === 'pokoje') return inspRoomPart(e);
  if (view === 'progi') { e.innerHTML = '<h2>Progi</h2><div class="sub">Jak to działa</div><div class="note">Temperatura i wilgotność: poza zakresem pojawia się ostrzeżenie, a o 3–4 °C (10 p.p.) dalej alarm krytyczny. Wartości są wspólne z ustawieniami karty i zapisują się w Home Assistant po „Publikuj”.<br><br>Baterie: poniżej niskiego progu ostrzeżenie, poniżej krytycznego czerwony alarm.<br><br>PM2.5: granice nazw jakości powietrza.</div>'; return; }
  if (view === 'inne') { e.innerHTML = '<h2>Wskazówka</h2><div class="sub">Kalendarze i baterie</div><div class="note">Kalendarze wybrane tutaj zasilają „Najbliższe wydarzenia”. Baterie z listy pilnuje karta w alarmach. Przypomnienia o terminach nie są dziś używane w karcie Aurora, więc ich tu nie ma.</div>'; return; }
  if (view === 'kopie') { e.innerHTML = '<h2>Jak to działa</h2><div class="sub">Bezpieczne publikowanie</div><div class="note">1. Przed każdą publikacją dodatek zapisuje kopię poprzedniego układu.<br>2. „Przywróć” wczytuje kopię jako zmianę niepublikowaną.<br>3. „Styl domyślny” to układ z generatora karty, zawsze dostępny.<br>4. Zmianę da się cofnąć przyciskiem Cofnij, zanim klikniesz Publikuj.<br>5. Karta sprawdza plik układu co minutę, więc zmiana pojawia się na tabletach i telefonach sama.</div>'; return; }
  if (!sel) { e.innerHTML = '<div class="empty">Kliknij sekcję w podglądzie albo na liście, żeby zmienić jej ustawienia.</div>'; return; }
  if (sel === 'today') { e.innerHTML = '<h2>' + esc(TODAY.n) + '</h2><div class="sub">Część sekcji „Zegar i pogoda”</div><div class="row" style="margin-top:10px"><span class="n">Widoczne</span><button class="sw ' + (hidden('today') ? '' : 'on') + '" id="vs" aria-label="Widoczne"></button></div><div class="note" style="margin-top:10px">' + esc(TODAY.d) + '.</div>'; $('#vs').onclick = () => toggle('today'); return; }
  if (selEl && renderEl(e, sel)) return;
  const s = SEC[sel], z = H().sec[sel];
  e.innerHTML = '<h2>' + esc(s.n) + '</h2><div class="sub">Sekcja ekranu głównego</div><div class="note">' + esc(s.d) + '</div>' +
    '<div class="row" style="margin-top:10px"><span class="n">Widoczna</span><button class="sw ' + (hidden(sel) ? '' : 'on') + '" id="vs" aria-label="Widoczna"></button></div>' +
    '<label class="f">Szerokość na tablecie: ' + z.w + ' z 4 kolumn</label><div class="bar"><button class="btn sm" id="wm" ' + (z.w <= 1 ? 'disabled' : '') + '>−</button><div class="seg" id="wseg">' + [[1, '1'], [2, '2'], [3, '3'], [4, 'Cała']].map(([w, l]) => '<button data-w="' + w + '" class="' + (z.w === w ? 'on' : '') + '">' + l + '</button>').join('') + '</div><button class="btn sm" id="wp" ' + (z.w >= MAXW ? 'disabled' : '') + '>+</button></div>' +
    '<label class="f">Wysokość na tablecie: min. ' + z.h + ' wiersz(e)</label><div class="bar"><button class="btn sm" id="hm" ' + (z.h <= 1 ? 'disabled' : '') + '>−</button><div class="seg" id="hseg">' + [1, 2, 3, 4].map(n => '<button data-h="' + n + '" class="' + (z.h === n ? 'on' : '') + '">' + n + '</button>').join('') + '</div><button class="btn sm" id="hp" ' + (z.h >= MAXH ? 'disabled' : '') + '>+</button></div>' +
    '<div class="note" style="margin-top:10px">Rozmiar zmienisz też uchwytami na prawej i dolnej krawędzi zaznaczonej sekcji w podglądzie. Na telefonie sekcje są jedna pod drugą. Elementy wewnątrz sekcji dojdą w następnym kroku.</div>';
  e.insertAdjacentHTML('beforeend', elementsHtml(sel));
  bindElements(e, sel);
  if (sel === 'hero' || sel === 'air') {
    const o = Object.assign({}, (D.base || {}).out, S.cfg.out), pmE = S.cfg.pm !== undefined ? S.cfg.pm : (D.base || {}).pm, puE = S.cfg.purifier !== undefined ? S.cfg.purifier : (D.base || {}).purifier;
    const f = (lab, id, v, dlid) => '<label class="f">' + lab + '</label><div class="ent">' + dot(v) + '<input class="mono" type="text" list="' + dlid + '" data-ce="' + id + '" value="' + esc(v || '') + '" placeholder="domena.encja"></div>';
    e.insertAdjacentHTML('beforeend', '<h3 style="margin-top:16px">Encje sekcji</h3>' + (sel === 'hero' ? f('Pogoda', 'weather', o.weather, 'dl-wx') + f('Temperatura na zewnątrz', 't', o.t, 'dl-sensor') + f('Wilgotność na zewnątrz', 'h', o.h, 'dl-sensor') : '') + f('PM2.5 (czujnik)', 'pm', pmE, 'dl-sensor') + (sel === 'air' ? f('Oczyszczacz', 'purifier', puE, 'dl-fan') : '') + dl('dl-sensor', x => x.startsWith('sensor.')) + dl('dl-wx', x => x.startsWith('weather.')) + dl('dl-fan', x => x.startsWith('fan.')));
    e.querySelectorAll('[data-ce]').forEach(i => i.onchange = () => { const k = i.dataset.ce, v = i.value.trim(); if (k === 'pm') S.cfg.pm = v; else if (k === 'purifier') S.cfg.purifier = v; else S.cfg.out = Object.assign({t: '', h: '', weather: ''}, (D.base || {}).out, S.cfg.out, {[k]: v}); commit(); });
  }
  if (sel === 'rooms') {
    const R = roomsNow();
    const gd = S.cfg.dsh !== undefined ? S.cfg.dsh : '';
    e.insertAdjacentHTML('beforeend', '<h3 style="margin-top:16px">Wygląd urządzeń (wszystkie pokoje)</h3><div class="seg" id="gdsh">' + DSH.map(([v, l]) => '<button data-v="' + v + '" class="' + (gd === v ? 'on' : '') + '">' + l + '</button>').join('') + '</div><div class="note">Pojedynczy pokój może to zmienić w „Dane pokoju”.</div>');
    e.querySelectorAll('#gdsh button').forEach(b => b.onclick = () => { if (b.dataset.v) S.cfg.dsh = b.dataset.v; else delete S.cfg.dsh; commit(); });
    e.insertAdjacentHTML('beforeend', '<h3 style="margin-top:16px">Kafelki pokoi</h3><div class="note">Rozmiar każdego kafelka na ekranie głównym. Encje i urządzenia na kafelku zmienisz w zakładce „Pokoje i urządzenia”.</div>' + R.map(x => '<div class="row" style="flex-wrap:wrap;margin-top:6px"><span class="n" style="flex:1 0 100%">' + esc(x.name || x.id) + '</span><div class="seg" data-rs="' + esc(x.id) + '" data-ax="w">' + [[1, '1 kol.'], [2, '2 kol.'], [3, 'Rząd']].map(([v, l]) => '<button data-v="' + v + '" class="' + (((x.size || {}).w || 1) === v ? 'on' : '') + '">' + l + '</button>').join('') + '</div><div class="seg" data-rs="' + esc(x.id) + '" data-ax="h">' + [[1, 'Niski'], [2, 'Wysoki']].map(([v, l]) => '<button data-v="' + v + '" class="' + (((x.size || {}).h || 1) === v ? 'on' : '') + '">' + l + '</button>').join('') + '</div><button class="btn sm" data-er="' + esc(x.id) + '">Edytuj</button></div>').join(''));
    e.querySelectorAll('[data-rs]').forEach(g => g.querySelectorAll('button').forEach(b => b.onclick = () => { const rr = ensureRooms().find(x => x.id === g.dataset.rs); rr.size = Object.assign({}, rr.size); const v = +b.dataset.v; if (v === 1) delete rr.size[g.dataset.ax]; else rr.size[g.dataset.ax] = v; if (!Object.keys(rr.size).length) delete rr.size; commit(); }));
    e.querySelectorAll('[data-er]').forEach(b => b.onclick = () => { rvRoom = b.dataset.er; selDev = null; selPart = 'hdr'; view = 'pokoje'; refresh(); });
  }
  $('#vs').onclick = () => toggle(sel);
  const set = (k, v) => { z[k] = Math.max(1, Math.min(k === 'w' ? MAXW : MAXH, v)); commit(); };
  e.querySelectorAll('[data-w]').forEach(b => b.onclick = () => set('w', +b.dataset.w));
  e.querySelectorAll('[data-h]').forEach(b => b.onclick = () => set('h', +b.dataset.h));
  $('#wm').onclick = () => set('w', z.w - 1); $('#wp').onclick = () => set('w', z.w + 1);
  $('#hm').onclick = () => set('h', z.h - 1); $('#hp').onclick = () => set('h', z.h + 1);
}

function refresh() {
  const d = dirty(), st = $('#state');
  st.className = 'pill' + (d ? ' dirty' : '');
  st.innerHTML = d ? '● Niepublikowane zmiany' : D.live ? '✓ Opublikowano ' + fmt(D.saved) + ' (rev ' + D.rev + ')' : '✓ Styl domyślny (nic nie opublikowano)';
  $('#publish').disabled = !d; $('#undo').disabled = hi < 1; $('#redo').disabled = hi >= hist.length - 1;
  renderNav(); renderMain(); renderInsp();
  placeLive(); livePost(); liveStates(false);
}

function changes() {
  const out = [], P = PUB.home, N = S.home, nm = id => SEC[id] ? SEC[id].n : TODAY.n;
  if (P.order.join() !== N.order.join()) out.push(['c', 'Kolejność (tablet): ' + N.order.map(nm).join(' → ')]);
  if (P.porder.join() !== N.porder.join()) out.push(['c', 'Kolejność (telefon): ' + N.porder.map(nm).join(' → ')]);
  Object.keys(SEC).forEach(id => { const a = P.sec[id], b = N.sec[id]; if (a.w !== b.w || a.h !== b.h) out.push(['c', 'Rozmiar „' + SEC[id].n + '”: ' + a.w + '×' + a.h + ' → ' + b.w + '×' + b.h]); });
  if (JSON.stringify(PUB.cfg.rooms || null) !== JSON.stringify(S.cfg.rooms || null)) out.push(['c', 'Pokoje i urządzenia zmienione (' + roomsNow().length + ' pokoi)']);
  [['cal', 'Kalendarze'], ['bats', 'Lista baterii'], ['reminders', 'Przypomnienia'], ['calDays', 'Zakres kalendarza'], ['batLow', 'Próg baterii: niski'], ['batCrit', 'Próg baterii: krytyczny'], ['pmLv', 'Poziomy PM2.5']].forEach(([k, l]) => { if (JSON.stringify(PUB.cfg[k] || null) !== JSON.stringify(S.cfg[k] || null)) out.push(['c', l + ' zmienione']); });
  Object.keys(S.th).forEach(k => { if (PUB.th[k] !== S.th[k]) out.push(['c', 'Próg ' + ({tMin: 'temperatury od', tMax: 'temperatury do', hMin: 'wilgotności od', hMax: 'wilgotności do'})[k] + ': ' + PUB.th[k] + ' → ' + S.th[k]]); });
  Object.keys((D.variants) || {}).forEach(k => { const a = (PUB.views || {})[k] || D.variants[k].default, b = (S.views || {})[k] || D.variants[k].default; if (a !== b) out.push(['c', 'Wygląd: ' + D.variants[k].name + ': ' + a + ' → ' + b]); });
  ['alarms', 'fx', 'dim'].forEach(k => { const a = (PUB.saver || {})[k], b = (S.saver || {})[k]; if (a !== b) out.push(['c', 'Wygaszacz – ' + ({alarms: 'alarmy', fx: 'tło pogodowe', dim: 'przyciemnienie'})[k] + ': ' + (a === undefined ? 'domyślnie' : a) + ' → ' + (b === undefined ? 'domyślnie' : b)]); });
  if ((PUB.theme || '') !== (S.theme || '')) out.push(['c', 'Motyw dashboardu: ' + ({'': 'automatyczny', light: 'jasny', dark: 'ciemny'})[PUB.theme || ''] + ' → ' + ({'': 'automatyczny', light: 'jasny', dark: 'ciemny'})[S.theme || '']]);
  const PE = P.el || {}, NE = N.el || {};
  new Set(Object.keys(PE).concat(Object.keys(NE))).forEach(k => { if (JSON.stringify(PE[k]) !== JSON.stringify(NE[k])) { const [sec, ek] = k.split('.'), row = catOf(sec).find(c => c[0] === ek); out.push(['c', 'Element „' + (row ? row[1] : k) + '” (' + secName(sec) + ')' + (NE[k] ? ' zmieniony' : ' – przywrócono domyślny')]); } });
  if ((P.calN || 0) !== (N.calN || 0)) out.push(['c', 'Liczba wydarzeń: ' + (P.calN || 'domyślnie') + ' → ' + (N.calN || 'domyślnie')]);
  Object.keys(SEC).concat('today').forEach(id => { const was = P.hide.includes(id), is = N.hide.includes(id); if (was !== is) out.push([is ? 'd' : 'a', (is ? 'Ukryta: ' : 'Pokazana: ') + nm(id)]); });
  return out;
}
$('#publish').onclick = () => {
  const ch = changes();
  modal('<h2>Opublikować zmiany?</h2><p class="note">Zmiany trafią do prawdziwego dashboardu /jarvis-pastel. Przed publikacją dodatek zapisze kopię poprzedniego układu. Tablety i telefony odświeżą się w ciągu minuty.</p><div class="diff">' + (ch.length ? ch.map(c => '<div class="' + c[0] + '">' + (c[0] === 'a' ? '+ ' : c[0] === 'd' ? '− ' : '~ ') + esc(c[1]) + '</div>').join('') : '<div>Brak zmian</div>') + '</div><div class="bar" style="justify-content:flex-end"><button class="btn" data-x>Wróć do edycji</button><button class="btn pri" id="okpub">Publikuj</button></div>', () => {
    $('#okpub').onclick = async () => {
      $('#okpub').disabled = true;
      try {
        const r = await pa('pastel/publish', {method: 'POST', body: JSON.stringify({layout: {home: S.home, cfg: S.cfg, views: S.views, saver: S.saver, theme: S.theme}, th: S.th})});
        D = await pa('pastel/layout'); PUB = norm(S, S.th); closeModal(); refresh(); toast('Opublikowano (rev ' + r.rev + '). Kopia zapasowa zapisana');
      } catch (e) { toast('Błąd publikacji: ' + e.message); $('#okpub').disabled = false; }
    };
  });
};
async function saveBackup() {
  try { const r = await pa('pastel/backups', {method: 'POST', body: JSON.stringify({name: 'Kopia ręczna', layout: {home: (dirty() ? PUB : S).home, cfg: (dirty() ? PUB : S).cfg, views: (dirty() ? PUB : S).views, saver: (dirty() ? PUB : S).saver, theme: (dirty() ? PUB : S).theme}})}); D.backups = r.backups; refresh(); toast('Zapisano kopię opublikowanego układu'); } catch (e) { toast('Błąd: ' + e.message); }
}
async function restore(id) {
  try { const r = await pa('pastel/backups/' + id); S = norm(r.layout, S.th); commit(); view = 'uklad'; refresh(); toast('Wczytano kopię. Opublikuj, żeby zastosować'); } catch (e) { toast('Błąd: ' + e.message); }
}
$('#undo').onclick = () => { if (hi > 0) { hi--; S = clone(hist[hi]); refresh(); } };
$('#redo').onclick = () => { if (hi < hist.length - 1) { hi++; S = clone(hist[hi]); refresh(); } };
$('#modal').onclick = e => { if (e.target.id === 'modal') closeModal(); };
addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
addEventListener('beforeunload', e => { if (D && dirty()) { e.preventDefault(); e.returnValue = ''; } });

async function load(pid) {
  PID = pid || ''; if (!LIVE.wrap) liveInit();
  try {
    PROJ = await api('pastel/projects');
    D = await pa('pastel/layout');
    D.th = Object.assign({}, TH0, Object.fromEntries(Object.entries(D.th || {}).filter(([, v]) => v !== null)));
    if (!ENT.length) { try { ENT = await api('entities'); } catch (e) { ENT = []; } ENTS = new Set(ENT.map(x => x[0])); }
    PUB = norm(D.live || D.default, D.th); S = clone(PUB); hist = [clone(S)]; hi = 0; sel = null; selEl = null; selRoom = null;
    drawProj(); refresh();
  } catch (e) { $('#main').innerHTML = '<div class="card"><b>Nie udało się wczytać układu.</b><div class="note">' + esc(e.message) + '</div></div>'; }
}
function drawProj() {
  const cur = PROJ.find(p => p.id === PID) || PROJ[0];
  $('#proj').innerHTML = PROJ.map(p => '<option value="' + esc(p.id) + '"' + (p.id === PID ? ' selected' : '') + '>' + esc(p.name) + '</option>').join('');
  $('#opendash').href = location.origin + '/' + cur.path; $('#delproj').hidden = !!cur.main;
}
$('#proj').onchange = e => { const v = e.target.value; if (dirty() && !confirm('Masz niepublikowane zmiany w tym projekcie. Przełączyć mimo to?')) { drawProj(); return; } load(v); };
$('#newproj').onclick = async () => {
  let areas = [];
  try { areas = (await api('pastel/areas')).areas || []; } catch (e) { /* brak listy obszarow */ }
  modal('<h2>Nowy projekt</h2><p class="note">Każdy projekt to osobny dashboard w Home Assistant, edytowany niezależnie od obecnego Aurora.</p><label class="f">Nazwa</label><input type="text" id="npn" maxlength="40" placeholder="np. Dom na działce">' +
    '<label class="f">Skąd zacząć</label><div class="vgrid" style="grid-template-columns:1fr 1fr"><button class="vopt on" data-m="new"><b>Nowy od zera</b><span>Pokoje z obszarów HA, wszystko do poprawienia ręcznie</span></button><button class="vopt" data-m="copy"><b>Kopia obecnego dashboardu</b><span>Ten sam układ, pokoje i ustawienia, edytowane osobno</span></button></div>' +
    '<div id="npa"><label class="f">Obszary Home Assistant, z których powstaną pokoje</label><div style="max-height:220px;overflow:auto;display:grid;gap:4px">' + (areas.length ? areas.map(a => '<label class="row" style="cursor:pointer"><input type="checkbox" data-a="' + esc(a.id) + '" checked><span class="n">' + esc(a.name) + '<small>' + a.temperature + ' temp. · ' + a.humidity + ' wilg. · ' + a.motion + ' ruchu · ' + (a.lights + a.switches) + ' świateł/przełączników</small></span></label>').join('') : '<div class="note">Nie znaleziono obszarów. Pokoje dodasz ręcznie.</div>') + '</div></div>' +
    '<div class="bar" style="justify-content:flex-end;margin-top:14px"><button class="btn" data-x>Anuluj</button><button class="btn pri" id="npok">Utwórz</button></div>', () => {
    let mode = 'new';
    $('#mbox').querySelectorAll('[data-m]').forEach(b => b.onclick = () => { mode = b.dataset.m; $('#mbox').querySelectorAll('[data-m]').forEach(x => x.classList.toggle('on', x === b)); $('#npa').style.display = mode === 'new' ? '' : 'none'; });
    $('#npok').onclick = async () => {
      const name = $('#npn').value.trim(); if (!name) { toast('Podaj nazwę projektu'); return; }
      $('#npok').disabled = true; $('#npok').textContent = 'Tworzę dashboard…';
      try {
        const r = await api('pastel/projects', {method: 'POST', body: JSON.stringify({name, mode, areas: [...$('#mbox').querySelectorAll('[data-a]')].filter(x => x.checked).map(x => x.dataset.a)})});
        closeModal(); await load(r.project.id); toast('Utworzono projekt „' + r.project.name + '” (dashboard /' + r.project.path + ')');
      } catch (e) { toast('Błąd: ' + e.message); $('#npok').disabled = false; $('#npok').textContent = 'Utwórz'; }
    };
  });
};
$('#delproj').onclick = () => { const cur = PROJ.find(p => p.id === PID); if (!cur || cur.main) return;
  modal('<h2>Usunąć projekt „' + esc(cur.name) + '”?</h2><p class="note">Zostanie usunięty dashboard /' + esc(cur.path) + ', plik układu i kopie zapasowe tego projektu. Obecny Aurora nie jest ruszany. Tej operacji nie da się cofnąć.</p><div class="bar" style="justify-content:flex-end"><button class="btn" data-x>Anuluj</button><button class="btn pri" id="okdelp">Usuń projekt</button></div>', () => {
    $('#okdelp').onclick = async () => { try { await api('pastel/projects/' + PID, {method: 'DELETE'}); closeModal(); await load(''); toast('Projekt usunięty'); } catch (e) { toast('Błąd: ' + e.message); } }; }); };
load('');
