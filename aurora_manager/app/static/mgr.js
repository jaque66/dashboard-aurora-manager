/* Aurora Manager 3 - konfigurator dashboardow Aurora Pulse */
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]));
const api = async (p, o) => { const r = await fetch(p, o && o.body !== undefined ? {method: o.method || 'POST', body: JSON.stringify(o.body), headers: {'Content-Type': 'application/json'}} : (o || {})); const j = await r.json().catch(() => ({error: 'błąd odpowiedzi'})); if (!r.ok) throw new Error(j.error || r.statusText); return j; };
const toast = (m) => { const t = $('#toast'); t.textContent = m; t.classList.add('on'); clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove('on'), 3600); };

const THEMES = {
  auto: ['Auto (świąteczny w grudniu)', '#67e8f9,#a78bfa,#f472b6'], off: ['Standardowy', '#67e8f9,#a78bfa,#f472b6'], xmas: ['Świąteczny', '#0a3a26,#ff6b7a,#ffd166'], matrix: ['Matrix', '#000,#00ff6a,#003b14'], jarvis: ['Jarvis', '#02070f,#00e5ff,#ffb703'],
  vice: ['Vice City', '#3a0a5e,#ff3d9a,#ffb347'], spring: ['Wiosna', '#14473f,#f9a8d4,#bef264'], summer: ['Lato', '#0a4a82,#fde047,#f5b04a'], autumn: ['Jesień', '#4a2410,#fb923c,#a8481a'],
  winter: ['Zima', '#12305c,#bfe3ff,#3c6ea8'], space: ['Kosmos', '#02010c,#a78bfa,#38bdf8'], aurora: ['Zorza polarna', '#04162a,#4ade80,#c084fc'], deep: ['Głębia', '#03304d,#5eead4,#38bdf8'], holo: ['Hologram', '#14131c,#5ef2c9,#a78bfa']};
const SCHEMES = [['', 'Domyślna (Aurora)', '#67e8f9,#a78bfa,#f472b6'], ['ocean', 'Ocean', '#60a5fa,#22d3ee,#818cf8'], ['forest', 'Las', '#6ee7b7,#38bdf8,#a3e635'], ['sunset', 'Zachód', '#fdba74,#f472b6,#fb7185'], ['rose', 'Róż', '#f9a8d4,#c084fc,#fda4af'],
  ['gold', 'Złoto', '#fcd34d,#fb923c,#f87171'], ['mono', 'Grafit', '#e2e8f0,#94a3b8,#64748b'], ['midnight', 'Północ', '#818cf8,#6366f1,#38bdf8'], ['violet', 'Fiolet', '#c4b5fd,#a78bfa,#e879f9'], ['sakura', 'Sakura', '#fbcfe8,#f9a8d4,#fde68a'],
  ['crimson', 'Karmazyn', '#fb7185,#f43f5e,#fdba74'], ['lava', 'Lawa', '#fb923c,#ef4444,#fbbf24'], ['copper', 'Miedź', '#fdba74,#d97706,#f59e0b'], ['olive', 'Oliwka', '#bef264,#a3e635,#fde047'], ['mint', 'Mięta', '#5eead4,#34d399,#67e8f9'],
  ['arctic', 'Arktyka', '#bae6fd,#7dd3fc,#e0f2fe'], ['pulse', 'Pulse', '#67e8f9,#a78bfa,#f472b6'], ['neon', 'Neon', '#4ade80,#22d3ee,#e879f9']];
const ROOMC = ['lav', 'peach', 'butter', 'rose', 'sky', 'aqua', 'mint', 'sand'];
const ROOMCC = {lav: '#8f78e0', peach: '#f08a5d', butter: '#d9a521', rose: '#e5719a', sky: '#5a9be0', aqua: '#35aaa0', mint: '#3fb27f', sand: '#b58a5e'};
const STEPS = [['start', '1 · Start'], ['rooms', '2 · Pokoje'], ['home', '3 · Dom'], ['modules', '4 · Moduły'], ['main', '5 · Ekran główny'], ['nav', '6 · Dock i menu'], ['save', '7 · Zapis']];

let INFO = null, CAT = null, D = null, STEP = 'start', LIST = [], SAVED = null;
const grad = (c) => 'linear-gradient(135deg,' + c + ')';

async function boot() {
  INFO = await api('api/info'); $('#ver').textContent = 'v' + INFO.version;
  $$('[data-go="list"]').forEach((a) => a.onclick = (e) => { e.preventDefault(); showList(); });
  showList();
}

/* ---------------- lista dashboardow ---------------- */
async function showList() {
  D = null; SAVED = null; const app = $('#app'); app.innerHTML = '<div class="card">Wczytywanie…</div>';
  try { LIST = await api('api/dashboards'); } catch (e) { app.innerHTML = '<div class="card err">Błąd: ' + esc(e.message) + '</div>'; return; }
  app.innerHTML = `<h1>Dashboardy Aurora Pulse</h1><div class="sub">Tu tworzysz i poprawiasz dashboardy Aurora Pulse. Każdy ma własne pokoje, ekran główny, dock, menu „Więcej” i motyw.</div>
    <div class="row" style="margin:14px 0"><button id="new">+ Nowy dashboard</button></div>
    <div class="grid">${LIST.map((r) => `<div class="card"><h3>${esc(r.name)}</h3><div class="sub">/${esc(r.path)} · ${r.rooms} pomieszczeń · motyw: ${esc((THEMES[r.theme] || [r.theme])[0])}${r.legacy ? ' · <span class="warn">z kreatora 2.x</span>' : ''}</div>
      <div class="row" style="margin-top:10px"><button class="s" data-edit="${esc(r.id)}">Konfiguruj</button><a class="btn g s" href="/${esc(r.path)}/home" target="_top">Otwórz</a><button class="s d" data-del="${esc(r.id)}">Usuń</button></div></div>`).join('') || '<div class="card sub">Nie masz jeszcze dashboardów. Kliknij „Nowy dashboard”.</div>'}</div>
    <h2>Karty Aurory w Home Assistant</h2><div class="card" id="cardsbox"><span class="sub">Sprawdzanie…</span></div>`;
  $('#new').onclick = () => startNew();
  $$('[data-edit]').forEach((b) => b.onclick = () => startEdit(b.dataset.edit));
  $$('[data-del]').forEach((b) => b.onclick = async () => { const r = LIST.find((x) => x.id === b.dataset.del); if (!confirm('Usunąć dashboard „' + r.name + '” z Home Assistanta i z Managera?')) return; try { await api('api/dashboards/' + encodeURIComponent(r.id) + '?ha=1', {method: 'DELETE', body: {}}); toast('Usunięto.'); showList(); } catch (e) { toast('Błąd: ' + e.message); } });
  cardsBox();
}
async function cardsBox() {
  try {
    CAT = CAT || await api('api/catalog'); const c = CAT.cards, box = $('#cardsbox'); if (!box) return;
    const row = (n, t) => { const s = c[n]; return `<div class="row"><b>${t}</b><span class="sub">${s.foreign ? 'zainstalowana inną drogą – Manager jej nie zmienia' : s.managed ? (s.current ? '<span class="ok">aktualna</span>' : '<span class="warn">jest nowsza wersja w dodatku</span>') : '<span class="warn">nie zainstalowana</span>'}</span></div>`; };
    box.innerHTML = row('aurora-pulse-card.js', 'Aurora Pulse') + '<div class="row" style="margin-top:10px"><button class="s g" id="inst">Zainstaluj / zaktualizuj karty</button></div><div class="sub" style="margin-top:6px">Karty instalują się też automatycznie przy zapisie dashboardu.</div>';
    $('#inst').onclick = async () => { try { const r = await api('api/cards/install', {body: {}}); CAT.cards = r.cards; toast(r.messages.join(' ')); cardsBox(); } catch (e) { toast('Błąd: ' + e.message); } };
  } catch (e) { const b = $('#cardsbox'); if (b) b.innerHTML = '<span class="err">' + esc(e.message) + '</span>'; }
}

/* ---------------- kreator ---------------- */
const modViews = () => INFO.modules.flatMap((m) => m.views);
const modOf = (v) => (INFO.modules.find((m) => m.views.includes(v)) || {}).id;
const blank = () => ({id: '', name: '', path: '', theme: 'auto', scheme: '', w: 1280, h: 800, areas: [], cfg: null, blocks: {order: INFO.blocks.map((b) => b.id), hide: []}, modules: [], nav: {dock: ['lights', 'events'], tdock: ['rooms', 'klimat', 'multimedia', 'events', 'pogoda', 'powietrze'], menu: INFO.views.map((v) => v.id).filter((v) => !['ustawienia', 'asystent'].includes(v) && !modViews().includes(v))}});
async function loadCat() { if (!CAT || !CAT.areas) CAT = await api('api/catalog'); else { try { CAT = await api('api/catalog'); } catch (e) { /* zostaw stary */ } } }
async function startNew() { D = blank(); STEP = 'start'; $('#app').innerHTML = '<div class="card">Wczytywanie obszarów Home Assistanta…</div>'; try { await loadCat(); } catch (e) { toast('Błąd: ' + e.message); return showList(); } render(); }
async function startEdit(id) { try { D = await api('api/dashboards/' + encodeURIComponent(id)); } catch (e) { return toast('Błąd: ' + e.message); } D.areas = D.areas || []; D.blocks = D.blocks || blank().blocks; D.nav = Object.assign(blank().nav, D.nav || {}); D.scheme = D.scheme || ''; if (!Array.isArray(D.modules)) { const all = [].concat(D.nav.menu || [], D.nav.dock || [], D.nav.tdock || []); D.modules = INFO.modules.filter((m) => m.views.some((v) => all.includes(v)) || (m.id === 'f1' && D.cfg.f1 && D.cfg.f1.on) || (m.id === 'guard' && (D.cfg.guard || []).length)).map((m) => m.id); } STEP = 'start'; $('#app').innerHTML = '<div class="card">Wczytywanie…</div>'; try { await loadCat(); } catch (e) { toast('Błąd: ' + e.message); return showList(); } render(); }

function render() {
  const idx = STEPS.findIndex((s) => s[0] === STEP), app = $('#app');
  app.innerHTML = `<h1>${D.id ? 'Konfiguracja: ' + esc(D.name) : 'Nowy dashboard Aurora Pulse'}</h1><div class="steps">${STEPS.map((s, i) => `<button class="${s[0] === STEP ? 'on' : i < idx ? 'ok' : ''}" data-step="${s[0]}">${s[1]}</button>`).join('')}</div><div id="step"></div>
    <div class="foot"><button class="g" id="prev" ${idx === 0 ? 'disabled' : ''}>← Wstecz</button>${STEP === 'save' ? '<button id="save">' + (D.id ? 'Zapisz zmiany' : 'Utwórz dashboard') + '</button>' : '<button id="next">Dalej →</button>'}</div>`;
  $$('[data-step]').forEach((b) => b.onclick = () => go(b.dataset.step));
  $('#prev').onclick = () => idx > 0 && go(STEPS[idx - 1][0]);
  const nx = $('#next'); if (nx) nx.onclick = () => go(STEPS[idx + 1][0]);
  const sv = $('#save'); if (sv) sv.onclick = doSave;
  ({start: stepStart, rooms: stepRooms, home: stepHome, modules: stepModules, main: stepMain, nav: stepNav, save: stepSave})[STEP]($('#step'));
  window.scrollTo(0, 0);
}
async function go(s) {
  if (STEP === 'start' && s !== 'start' && !D.cfg) {
    if (!D.name.trim()) return toast('Podaj nazwę dashboardu.');
    if (!D.areas.length) return toast('Wybierz co najmniej jeden obszar (pokój).');
    $('#step').innerHTML = '<div class="card">Dobieram encje z wybranych obszarów…</div>';
    try { const p = await api('api/propose', {body: {areas: D.areas}}); D.cfg = p.cfg; D.nav = p.nav; D.blocks = p.blocks; D.modules = p.modules || []; CAT.views = p.views; } catch (e) { toast('Błąd: ' + e.message); return render(); }
  }
  if (STEP === 'start') { const n = $('#nm'); if (n) D.name = n.value; }
  STEP = s; render();
}

/* 1. Start */
function stepStart(el) {
  const sch = (D.theme === 'auto' || D.theme === 'off');
  el.innerHTML = `<div class="card"><label class="f">Nazwa dashboardu</label><input type="text" id="nm" value="${esc(D.name)}" placeholder="np. Dom" maxlength="40">${D.id ? '' : `<label class="f">Adres (opcjonalnie)</label><input type="text" id="pth" value="${esc(D.path)}" placeholder="aurora-dom">`}</div>
    ${D.cfg && D.id ? '' : `<h2>Obszary Home Assistanta</h2><div class="card"><div class="sub">Zaznacz pomieszczenia, które mają być w dashboardzie. Encje dobiorę automatycznie – w kolejnym kroku możesz je poprawić.</div>
      ${CAT.areas.map((a) => `<label class="c"><input type="checkbox" data-area="${esc(a.id)}" ${D.areas.includes(a.id) ? 'checked' : ''}>${esc(a.name)}<small>${a.entities.length} encji</small></label>`).join('') || '<div class="warn">Brak obszarów z encjami – przypisz urządzenia do obszarów w Home Assistant.</div>'}</div>`}
    <h2>Motyw</h2><div class="card"><div class="th">${INFO.themes.map((t) => `<button data-theme="${t}" class="${D.theme === t ? 'on' : ''}"><i style="background:${grad((THEMES[t] || ['', '#555,#999'])[1])}"></i><span>${esc((THEMES[t] || [t])[0])}</span></button>`).join('')}</div></div>
    ${sch ? `<h2>Kolorystyka</h2><div class="card"><div class="sub" style="margin-bottom:8px">Działa tylko z motywem Standardowym / Auto – pozostałe motywy mają własne kolory.</div><div class="sch">${SCHEMES.map((s) => `<button data-scheme="${s[0]}" class="${D.scheme === s[0] ? 'on' : ''}"><i style="background:${grad(s[2])}"></i><span>${esc(s[1])}</span></button>`).join('')}</div></div>` : ''}
    <div class="sub">Motyw i kolorystykę każdy użytkownik może później zmienić w Ustawieniach dashboardu na swoim urządzeniu; tu wybierasz domyślne.</div>`;
  $('#nm').oninput = (e) => { D.name = e.target.value; }; const pt = $('#pth'); if (pt) pt.oninput = (e) => { D.path = e.target.value.trim(); };
  $$('[data-area]', el).forEach((c) => c.onchange = () => { D.areas = $$('[data-area]', el).filter((x) => x.checked).map((x) => x.dataset.area); D.cfg = null; });
  $$('[data-theme]', el).forEach((b) => b.onclick = () => { D.theme = b.dataset.theme; if (!['auto', 'off'].includes(D.theme)) D.scheme = ''; stepStart(el); });
  $$('[data-scheme]', el).forEach((b) => b.onclick = () => { D.scheme = b.dataset.scheme; stepStart(el); });
}

/* 2. Pokoje */
const areaEnts = (r) => { const a = CAT.areas.find((x) => x.name.slice(0, 24) === r.name || x.id === r.area); return a ? a.entities : []; };
const optList = (list, cur, none) => `<option value="">${none || '— brak —'}</option>` + list.map((x) => `<option value="${esc(x.id)}" ${x.id === cur ? 'selected' : ''}>${esc(x.name)} (${esc(x.id)})</option>`).join('') + (cur && !list.some((x) => x.id === cur) ? `<option value="${esc(cur)}" selected>${esc(cur)}</option>` : '');
function stepRooms(el) {
  const R = D.cfg.rooms, ok = new Set(); void ok;
  const sel = (r, k, label, dom, dcs, glob) => { const own = areaEnts(r).filter((e) => e.domain === dom && dcs.includes(e.dc)), all = (CAT.g[glob] || []).filter((x) => !own.some((o) => o.id === x.id)); return `<div><label class="f">${label}</label><select data-rk="${k}">${optList(own.concat(all), r[k])}</select></div>`; };
  el.innerHTML = `<div class="sub" style="margin-bottom:10px">Każde pomieszczenie to kafelek na ekranie głównym i widok z czujnikami oraz urządzeniami. Kliknij pokój, aby wybrać jego encje.</div>` + R.map((r, i) => {
    const E = areaEnts(r).filter((e) => ['light', 'switch', 'media_player', 'fan', 'cover', 'climate'].includes(e.domain)), have = new Set(r.dev.map((d) => d[0]));
    return `<div class="room ${i === 0 ? 'open' : ''}" data-i="${i}"><div class="h"><span style="color:${ROOMCC[r.c] || '#8f78e0'}">●</span><b>${esc(r.name)}</b><span class="sub">${r.dev.length} urządz.</span><button class="s g" data-up="${i}">↑</button><button class="s g" data-dn="${i}">↓</button></div>
      <div class="b"><div class="two"><div><label class="f">Nazwa</label><input type="text" data-rk="name" value="${esc(r.name)}" maxlength="24"></div><div><label class="f">Ikona (mdi:…)</label><input type="text" data-rk="icon" value="${esc(r.icon)}"></div></div>
        <label class="f">Panel w pokoju – temat MQTT do wiadomości (opcjonalnie, np. panele/panel-salon/wiadomosc)</label><input type="text" data-rk="msg" value="${esc(r.msg || '')}" placeholder="puste = bez wiadomości na panel">
        <label class="f">Kolor kafelka</label><div class="chips">${ROOMC.map((c) => `<button data-rc="${c}" class="${r.c === c ? 'on' : ''}"><span style="color:${ROOMCC[c]}">●</span> ${c}</button>`).join('')}</div>
        <div class="two">${sel(r, 't', 'Temperatura', 'sensor', ['temperature'], 'temp')}${sel(r, 'h', 'Wilgotność', 'sensor', ['humidity'], 'hum')}${sel(r, 'occ', 'Obecność / ruch', 'binary_sensor', ['motion', 'occupancy', 'presence'], 'door')}${sel(r, 'lux', 'Natężenie światła', 'sensor', ['illuminance'], 'temp')}</div>
        <label class="f">Urządzenia w pokoju (światła, gniazdka, odtwarzacze…)</label>${E.map((e) => `<div class="dev"><input type="checkbox" data-dv="${esc(e.id)}" ${have.has(e.id) ? 'checked' : ''}><input type="text" data-dl="${esc(e.id)}" value="${esc((r.dev.find((d) => d[0] === e.id) || [0, e.name.slice(0, 18)])[1])}"><span class="id">${esc(e.id)}</span></div>`).join('') || '<div class="sub">Brak urządzeń przypisanych do tego obszaru.</div>'}
        <div class="row" style="margin-top:12px"><button class="s d" data-rm="${i}">Usuń pokój</button></div></div></div>`;
  }).join('') + `<div class="row"><select id="addarea" style="max-width:300px"><option value="">+ Dodaj pokój z obszaru…</option>${CAT.areas.filter((a) => !R.some((r) => r.name === a.name.slice(0, 24))).map((a) => `<option value="${esc(a.id)}">${esc(a.name)}</option>`).join('')}</select></div>`;
  $$('.room > .h', el).forEach((h) => h.onclick = (e) => { if (e.target.closest('button')) return; h.parentElement.classList.toggle('open'); });
  $$('.room', el).forEach((box) => { const r = R[+box.dataset.i];
    $$('[data-rk]', box).forEach((i) => i.onchange = i.oninput = () => { r[i.dataset.rk] = i.value; if (i.dataset.rk === 'name') $('.h b', box).textContent = i.value; });
    $$('[data-rc]', box).forEach((b) => b.onclick = () => { r.c = b.dataset.rc; stepRooms(el); });
    $$('[data-dv]', box).forEach((c) => c.onchange = () => { const id = c.dataset.dv, lab = $(`[data-dl="${id}"]`, box).value; r.dev = r.dev.filter((d) => d[0] !== id); if (c.checked) { const e = areaEnts(r).find((x) => x.id === id); r.dev.push([id, lab, ({light: 'mdi:lightbulb-outline', switch: 'mdi:power-socket-eu', media_player: 'mdi:television', fan: 'mdi:fan', cover: 'mdi:blinds', climate: 'mdi:thermostat'})[e.domain] || 'mdi:power']); } syncLights(); });
    $$('[data-dl]', box).forEach((t) => t.oninput = () => { const d = r.dev.find((x) => x[0] === t.dataset.dl); if (d) d[1] = t.value; });
  });
  const mv = (i, d) => { const j = i + d; if (j < 0 || j >= R.length) return; [R[i], R[j]] = [R[j], R[i]]; stepRooms(el); };
  $$('[data-up]', el).forEach((b) => b.onclick = () => mv(+b.dataset.up, -1)); $$('[data-dn]', el).forEach((b) => b.onclick = () => mv(+b.dataset.dn, 1));
  $$('[data-rm]', el).forEach((b) => b.onclick = () => { if (R.length < 2) return toast('Potrzebny jest co najmniej jeden pokój.'); if (confirm('Usunąć pokój?')) { R.splice(+b.dataset.rm, 1); syncLights(); stepRooms(el); } });
  $('#addarea', el).onchange = async (e) => { if (!e.target.value) return; try { const p = await api('api/propose', {body: {areas: [e.target.value]}}); const nr = p.cfg.rooms[0]; if (nr) { nr.id = (nr.id || 'pokoj') + '_' + R.length; R.push(nr); syncLights(); } } catch (x) { toast('Błąd: ' + x.message); } stepRooms(el); };
}
function syncLights() { const keep = new Set(D.cfg.lightsOff || []), all = new Set(D.cfg.rooms.flatMap((r) => r.dev.filter((d) => /^(light|switch)\./.test(d[0])).map((d) => d[0]))); D.cfg.lightsOff = [...new Set([...(D.cfg.lightsOff || []).filter((x) => all.has(x)), ...[...all].filter((x) => !keep.has(x) && !D._lightsTouched)])]; }

/* 3. Dom */
const CHK = [['bat', 'Baterie – niski poziom i brak łączności czujników baterii'], ['offline', 'Brak łączności urządzeń kluczowych (gaz, zalanie, drzwi, alarm, PM2.5, czujniki obecności)'], ['climate', 'Klimat w pokojach (progi temperatury i wilgotności)'],
  ['door', 'Drzwi wejściowe otwarte zbyt długo'], ['air', 'Jakość powietrza i filtr oczyszczacza'], ['wash', 'Pranie zakończone'], ['utility', 'Przerwy w dostawie ciepła i prądu'], ['weather', 'Ostrzeżenia pogodowe']];
function checksHtml() { const k = D.cfg.checks || {}; return `<h2>Co sprawdzać (alarmy i uwagi)</h2><div class="card"><div class="sub" style="margin-bottom:6px">Wyłącz kategorie, których nie chcesz widzieć w „Pulsie domu” i w kafelkach „Teraz”.</div>${CHK.map((x) => `<label class="c"><input type="checkbox" data-ck="${x[0]}" ${k[x[0]] === false ? '' : 'checked'}>${esc(x[1])}</label>`).join('')}</div>`; }
function batHtml() {
  const c = D.cfg, all = CAT.g.battery.concat(c.bats.filter((id) => !CAT.g.battery.some((x) => x.id === id)).map((id) => ({id, name: id, state: 'unavailable', junk: /browser_mod|tablet|panel/i.test(id)}))), q = (D._bq || '').toLowerCase(), bad = (b) => b.junk || ['unavailable', 'unknown'].includes(b.state), junkN = all.filter(bad).length;
  const selBad = all.filter((b) => c.bats.includes(b.id) && bad(b)).length;
  const vis = all.filter((b) => (D._bj || !bad(b) || c.bats.includes(b.id)) && (!q || (b.name + b.id).toLowerCase().includes(q)));
  return `<h2>Czujniki baterii do sprawdzania (${c.bats.length})</h2><div class="card"><div class="row"><input type="text" id="bq" placeholder="Szukaj…" value="${esc(D._bq || '')}" style="max-width:240px"><label class="c" style="padding:0"><input type="checkbox" id="bj" ${D._bj ? 'checked' : ''}>pokaż niedostępne i urządzenia przeglądarek (${junkN})</label></div>
    ${selBad ? `<div class="warn" style="margin:6px 0">Na liście wybranych jest ${selBad} niedostępnych lub należących do przeglądarek/tabletów – to one dają fałszywe alarmy. <button class="s" id="bat-clean">Usuń je z listy</button></div>` : ''}
    <div class="sub" style="margin:6px 0">Domyślnie pomijam baterie niedostępne oraz tabletów, telefonów i przeglądarek (Browser mod) – to one najczęściej dają fałszywe alarmy.</div>
    ${vis.map((x) => `<label class="c"><input type="checkbox" data-mk="bats" value="${esc(x.id)}" ${c.bats.includes(x.id) ? 'checked' : ''}>${esc(x.name)}<small>${x.junk ? 'przeglądarka/tablet · ' : ''}${['unavailable', 'unknown'].includes(x.state) ? 'niedostępny · ' : ''}${esc(x.id)}</small></label>`).join('') || '<div class="sub">Brak pasujących czujników.</div>'}
    <div class="row" style="margin-top:8px"><button class="s g" id="bat-all">Zaznacz widoczne</button><button class="s g" id="bat-none">Odznacz widoczne</button></div></div>`;
}
function stepHome(el) {
  const c = D.cfg, g = CAT.g, one = (k, label, list, get, set, none) => `<div><label class="f">${label}</label><select data-hk="${k}">${optList(list, get(), none)}</select></div>`;
  const multi = (title, list, cur, key, extra) => `<h2>${title}</h2><div class="card">${list.map((x) => `<label class="c"><input type="checkbox" data-mk="${key}" value="${esc(x.id)}" ${cur.includes(x.id) ? 'checked' : ''}>${esc(x.name)}<small>${esc(x.id)}</small></label>`).join('') || '<div class="sub">Brak encji tego typu.</div>'}${extra || ''}</div>`;
  el.innerHTML = `<h2>Pogoda i powietrze</h2><div class="card"><div class="two">${one('weather', 'Pogoda (prognoza)', g.weather, () => c.out.weather, 0)}${one('out.t', 'Temperatura na zewnątrz', g.temp, () => c.out.t, 0, '— z pogody —')}${one('out.h', 'Wilgotność na zewnątrz', g.hum, () => c.out.h, 0, '— z pogody —')}${one('pm', 'Czujnik PM2.5', g.pm, () => c.pm, 0)}${one('purifier', 'Oczyszczacz powietrza', g.purifier, () => c.purifier, 0)}</div></div>
    <h2>Bezpieczeństwo</h2><div class="card"><div class="two">${one('door', 'Drzwi wejściowe', g.door, () => c.door, 0)}${one('gas', 'Czujnik gazu / dymu', g.gas, () => c.gas, 0)}${one('floodK', 'Czujnik zalania 1', g.flood, () => c.floodK, 0)}${one('floodL', 'Czujnik zalania 2', g.flood, () => c.floodL, 0)}${one('alarm', 'Stan alarmu (opcjonalnie)', g.alarm, () => c.alarm, 0)}${one('alarmSw', 'Wyłącznik alarmu (opcjonalnie)', g.alarmsw, () => c.alarmSw, 0)}</div><div class="sub" style="margin-top:6px">Alarm: encja select/sensor, której stan inny niż „normal” oznacza alarm. Pomiń, jeśli nie masz takiej.</div></div>
    ${multi('Kalendarze (Wydarzenia)', g.calendar, c.cal, 'cal')}${multi('Światła na ekranie głównym i „Zgaś światła”', g.light, c.lightsOff || [], 'lightsOff')}
    ${checksHtml()}${batHtml()}`;
  const setp = (k, v) => { if (k.includes('.')) { const [a, b] = k.split('.'); c[a][b] = v; } else c[k] = v; };
  $$('[data-hk]', el).forEach((s) => s.onchange = () => setp(s.dataset.hk, s.value));
  const setMk = (k) => { const vis = $$(`[data-mk="${k}"]`, el), ids = vis.map((x) => x.value); c[k] = (c[k] || []).filter((x) => !ids.includes(x)).concat(vis.filter((x) => x.checked).map((x) => x.value)); if (k === 'lightsOff') D._lightsTouched = true; };
  $$('[data-mk]', el).forEach((cb) => cb.onchange = () => setMk(cb.dataset.mk));
  $$('[data-ck]', el).forEach((cb) => cb.onchange = () => { c.checks = c.checks || {}; c.checks[cb.dataset.ck] = cb.checked; });
  const bs = (on) => { $$('[data-mk="bats"]', el).forEach((x) => x.checked = on); setMk('bats'); stepHome(el); };
  const ba = $('#bat-all', el); if (ba) { ba.onclick = () => bs(true); $('#bat-none', el).onclick = () => bs(false); }
  const bc = $('#bat-clean', el); if (bc) bc.onclick = () => { const all = CAT.g.battery, bad = (id) => { const b = all.find((x) => x.id === id); return !b || b.junk || ['unavailable', 'unknown'].includes(b.state); }; c.bats = c.bats.filter((id) => !bad(id)); stepHome(el); };
  const bq = $('#bq', el); if (bq) bq.onchange = () => { D._bq = bq.value; stepHome(el); };
  const bj = $('#bj', el); if (bj) bj.onchange = () => { D._bj = bj.checked; stepHome(el); };
}

/* 4. Moduly opcjonalne */
function stepModules(el) {
  const c = D.cfg, g = CAT.g, mods = D.modules = D.modules || [], det = (id) => (CAT.modules || {})[id] || {ok: true};
  c.guard = c.guard || []; c.radioPlayers = c.radioPlayers || [];
  const extra = (m) => {
    if (!mods.includes(m.id)) return '';
    if (m.id === 'radio') return `<label class="f">Odtwarzacze, na których gra radio</label>${g.media.map((x) => `<label class="c"><input type="checkbox" data-rp="${esc(x.id)}" ${c.radioPlayers.includes(x.id) ? 'checked' : ''}>${esc(x.name)}<small>${esc(x.id)}</small></label>`).join('') || '<div class="sub">Brak odtwarzaczy w Home Assistant.</div>'}`;
    if (m.id === 'guard') return `<label class="f">Dzieci z telefonem Aurora Guard (identyfikator = końcówka encji, np. „ola” dla sensor.aurora_guard_ola_status)</label>${c.guard.map((k, i) => `<div class="row"><input type="text" data-gid="${i}" value="${esc(k.id)}" placeholder="id (małe litery)" style="max-width:160px"><input type="text" data-gnm="${i}" value="${esc(k.name)}" placeholder="imię" style="max-width:200px"><button class="s d" data-grm="${i}">Usuń</button></div>`).join('')}<div class="row" style="margin-top:6px"><button class="s g" id="gadd">+ Dodaj dziecko</button></div>`;
    return '';
  };
  el.innerHTML = `<div class="sub" style="margin-bottom:10px">Podstawowy dashboard (pokoje, światła, klimat, pogoda, kalendarz, baterie, multimedia) działa bez dodatkowych integracji. Poniższe moduły są opcjonalne – włącz tylko te, które masz skonfigurowane. Przy każdym opisano, czego wymaga.</div>` + INFO.modules.map((m) => { const d = det(m.id), on = mods.includes(m.id);
    return `<div class="card" style="margin-bottom:10px"><label class="c"><input type="checkbox" data-md="${m.id}" ${on ? 'checked' : ''}><b>${esc(m.name)}</b><small>${d.ok ? '<span class="ok">wykryto w Home Assistant</span>' : '<span class="warn">nie wykryto: ' + esc(d.why || '') + '</span>'}</small></label>
      <div class="sub" style="margin:2px 0 6px 28px">${esc(m.desc)}</div><div class="sub" style="margin-left:28px;border-left:3px solid var(--a);padding-left:8px">ℹ ${esc(m.need)}</div>${on && !d.ok ? '<div class="warn" style="margin:6px 0 0 28px">Moduł jest włączony, ale wymagane elementy nie zostały wykryte – widok może być pusty, dopóki ich nie skonfigurujesz.</div>' : ''}<div style="margin-left:28px">${extra(m)}</div></div>`; }).join('');
  $$('[data-md]', el).forEach((cb) => cb.onchange = () => { const id = cb.dataset.md; D.modules = mods.filter((x) => x !== id); if (cb.checked) { D.modules.push(id); if (id === 'guard' && !c.guard.length) c.guard.push({id: '', name: ''}); } stepModules(el); });
  $$('[data-rp]', el).forEach((cb) => cb.onchange = () => { c.radioPlayers = c.radioPlayers.filter((x) => x !== cb.dataset.rp); if (cb.checked) c.radioPlayers.push(cb.dataset.rp); });
  $$('[data-gid]', el).forEach((i) => i.oninput = () => { c.guard[+i.dataset.gid].id = i.value.toLowerCase().replace(/[^a-z0-9_]/g, ''); });
  $$('[data-gnm]', el).forEach((i) => i.oninput = () => { c.guard[+i.dataset.gnm].name = i.value; });
  $$('[data-grm]', el).forEach((b) => b.onclick = () => { c.guard.splice(+b.dataset.grm, 1); stepModules(el); });
  const ga = $('#gadd', el); if (ga) ga.onclick = () => { c.guard.push({id: '', name: ''}); stepModules(el); };
}

/* 5. Ekran glowny */
function stepMain(el) {
  const B = D.blocks, nm = Object.fromEntries(INFO.blocks.map((b) => [b.id, b])), vis = B.order.filter((id) => !B.hide.includes(id));
  el.innerHTML = `<div class="cols"><div><div class="sub" style="margin-bottom:8px">Co ma być na ekranie głównym. Na telefonie bloki układają się jeden pod drugim w tej kolejności; na tablecie siatka jest ułożona automatycznie (ukryte bloki znikają).</div><div class="list">${B.order.map((id, i) => `<div class="it ${B.hide.includes(id) ? 'off' : ''}"><input type="checkbox" data-bt="${id}" ${B.hide.includes(id) ? '' : 'checked'}><b>${esc(nm[id].name)}</b><button class="s g" data-bu="${i}">↑</button><button class="s g" data-bd="${i}">↓</button></div>`).join('')}</div></div>
    <div><div class="mock">${vis.map((id) => `<div class="bl">${esc(nm[id].name)}</div>`).join('')}${dockMock()}</div><div class="sub" style="text-align:center;margin-top:6px">Podgląd kolejności na telefonie</div></div></div>`;
  $$('[data-bt]', el).forEach((c) => c.onchange = () => { const id = c.dataset.bt; B.hide = B.hide.filter((x) => x !== id); if (!c.checked) B.hide.push(id); stepMain(el); });
  const mv = (i, d) => { const j = i + d; if (j < 0 || j >= B.order.length) return; [B.order[i], B.order[j]] = [B.order[j], B.order[i]]; stepMain(el); };
  $$('[data-bu]', el).forEach((b) => b.onclick = () => mv(+b.dataset.bu, -1)); $$('[data-bd]', el).forEach((b) => b.onclick = () => mv(+b.dataset.bd, 1));
}

/* 5. Dock i menu */
const viewMeta = () => Object.fromEntries(INFO.views.concat(INFO.dockExtra).map((v) => [v.id, v]));
function dockItems() { const N = D.nav, M = viewMeta(), seq = ['home'].concat(N.dock.slice(0, 3)), half = Math.ceil(seq.length / 2), cell = (id) => id === 'home' ? '⌂<br>Dom' : `${esc((M[id] || {name: id}).name)}`; return {seq, half, cell}; }
function dockMock() { const {seq, half, cell} = dockItems(); return `<div class="dk">${seq.slice(0, half).map((id) => `<div>${cell(id)}</div>`).join('')}<div class="o"></div>${seq.slice(half).map((id) => `<div>${cell(id)}</div>`).join('')}<div>Więcej</div></div>`; }
function stepNav(el) {
  const N = D.nav, M = viewMeta(), ok = (id) => (!modOf(id) || (D.modules || []).includes(modOf(id))) && (!CAT.views[id] || CAT.views[id].ok), why = (id) => (modOf(id) && !(D.modules || []).includes(modOf(id))) ? 'moduł wyłączony (krok Moduły)' : (CAT.views[id] || {}).why || '';
  const phoneOpts = INFO.dockExtra.concat(INFO.views.filter((v) => !['ustawienia', 'asystent', 'kalendarz'].includes(v.id)));
  const tabOpts = phoneOpts.filter((v) => v.id !== 'lights').concat([]);
  const chips = (opts, cur, key, max) => `<div class="chips">${opts.map((v) => `<button data-nk="${key}" data-id="${v.id}" class="${cur.includes(v.id) ? 'on' : ''}" ${(!ok(v.id) || (!cur.includes(v.id) && cur.length >= max)) ? 'disabled' : ''} title="${esc(ok(v.id) ? '' : why(v.id))}">${esc(v.name)}</button>`).join('')}</div>`;
  const inDock = new Set(N.dock.map((x) => x === 'events' ? 'kalendarz' : x)), inT = new Set(N.tdock.map((x) => x === 'events' ? 'kalendarz' : x));
  const menuAll = INFO.views.filter((v) => v.id !== 'ustawienia' && v.id !== 'asystent' && ok(v.id));
  const mo = N.menu.filter((id) => menuAll.some((v) => v.id === id));
  el.innerHTML = `<div class="cols"><div><h3>Dock telefonu</h3><div class="sub" style="margin-bottom:8px">Dom jest zawsze pierwszy, a „Więcej” zawsze ostatnie. Wybierz do 3 skrótów pomiędzy.</div>${chips(phoneOpts, N.dock, 'dock', 3)}
      <div class="mock" style="margin-top:12px"><div class="sub" style="text-align:center">Kolejność</div>${dockMock()}</div>
      <div class="list" style="margin-top:8px">${N.dock.map((id, i) => `<div class="it"><b>${esc((M[id] || {name: id}).name)}</b><button class="s g" data-du="${i}">↑</button><button class="s g" data-dd="${i}">↓</button></div>`).join('')}</div></div>
    <div><h3>Pasek boczny tabletu</h3><div class="sub" style="margin-bottom:8px">Skróty po lewej stronie na tablecie (Dom, „Więcej” i Ustawienia są zawsze).</div>${chips(tabOpts, N.tdock, 'tdock', 12)}
      <div class="list" style="margin-top:8px">${N.tdock.map((id, i) => `<div class="it"><b>${esc((M[id] || {name: id}).name)}</b><button class="s g" data-tu="${i}">↑</button><button class="s g" data-td="${i}">↓</button></div>`).join('')}</div></div>
    <div><h3>Menu „Więcej”</h3><div class="sub" style="margin-bottom:8px">Widoki w menu (poza tymi, które są w docku). „Ustawienia” i „Menu HA” są zawsze na końcu.</div><div class="list">${menuAll.map((v) => `<div class="it ${mo.includes(v.id) ? '' : 'off'}"><input type="checkbox" data-mn="${v.id}" ${mo.includes(v.id) ? 'checked' : ''}><b>${esc(v.name)}</b>${inDock.has(v.id) ? '<small>w docku</small>' : inT.has(v.id) ? '<small>na pasku tabletu</small>' : ''}${mo.includes(v.id) ? `<button class="s g" data-mu="${v.id}">↑</button><button class="s g" data-md="${v.id}">↓</button>` : ''}</div>`).join('')}${INFO.views.filter((v) => !ok(v.id)).map((v) => `<div class="it off"><b>${esc(v.name)}</b><small>${esc(why(v.id))}</small></div>`).join('')}</div></div></div>`;
  $$('[data-nk]', el).forEach((b) => b.onclick = () => { const L = N[b.dataset.nk], id = b.dataset.id, i = L.indexOf(id); if (i >= 0) L.splice(i, 1); else L.push(id); stepNav(el); });
  const mv = (L, i, d) => { const j = i + d; if (j < 0 || j >= L.length) return; [L[i], L[j]] = [L[j], L[i]]; stepNav(el); };
  $$('[data-du]', el).forEach((b) => b.onclick = () => mv(N.dock, +b.dataset.du, -1)); $$('[data-dd]', el).forEach((b) => b.onclick = () => mv(N.dock, +b.dataset.dd, 1));
  $$('[data-tu]', el).forEach((b) => b.onclick = () => mv(N.tdock, +b.dataset.tu, -1)); $$('[data-td]', el).forEach((b) => b.onclick = () => mv(N.tdock, +b.dataset.td, 1));
  $$('[data-mn]', el).forEach((c) => c.onchange = () => { const id = c.dataset.mn; N.menu = N.menu.filter((x) => x !== id); if (c.checked) N.menu.push(id); stepNav(el); });
  $$('[data-mu]', el).forEach((b) => b.onclick = () => mv(N.menu, N.menu.indexOf(b.dataset.mu), -1)); $$('[data-md]', el).forEach((b) => b.onclick = () => mv(N.menu, N.menu.indexOf(b.dataset.md), 1));
}

/* 6. Zapis */
function stepSave(el) {
  const c = D.cfg, miss = [];
  if (!c.out.weather) miss.push('brak encji pogody (ekran główny pokaże „—”)'); if (!c.rooms.some((r) => r.t)) miss.push('żaden pokój nie ma czujnika temperatury');
  el.innerHTML = `<div class="card"><h3>${esc(D.name || 'Dashboard')}</h3><div class="sub">Adres: /${esc(D.path || 'aurora-' + (D.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-'))} · motyw: ${esc((THEMES[D.theme] || [D.theme])[0])}${D.scheme ? ' · kolorystyka: ' + esc(D.scheme) : ''}</div>
    <ul><li>Pokoje: ${c.rooms.map((r) => esc(r.name)).join(', ')}</li><li>Ekran główny: ${D.blocks.order.filter((x) => !D.blocks.hide.includes(x)).map((x) => esc(INFO.blocks.find((b) => b.id === x).name)).join(' → ')}</li>
    <li>Moduły opcjonalne: ${(D.modules || []).map((x) => esc((INFO.modules.find((m) => m.id === x) || {name: x}).name)).join(', ') || 'brak (dashboard podstawowy)'}</li><li>Dock telefonu: Dom, ${D.nav.dock.map((x) => esc((viewMeta()[x] || {name: x}).name)).join(', ') || '—'}, Więcej</li><li>Menu „Więcej”: ${D.nav.menu.map((x) => esc((viewMeta()[x] || {name: x}).name)).join(', ') || '—'}</li></ul>
    ${miss.length ? '<div class="warn">Uwaga: ' + miss.map(esc).join('; ') + '.</div>' : ''}</div>
    <div class="sub">Zapis utworzy (lub zaktualizuje) dashboard w Home Assistant oraz zainstaluje potrzebne karty, jeśli ich jeszcze nie ma. Po zapisie odśwież dashboard na urządzeniu.</div><div id="res"></div>`;
}
async function doSave() {
  const b = $('#save'); b.disabled = true; b.textContent = 'Zapisywanie…';
  try { const r = await api('api/save', {body: D}); D.id = r.record.id; D.path = r.record.path; $('#res').innerHTML = `<div class="card ok"><b>Gotowe.</b> Dashboard: <a href="/${esc(r.record.path)}/home" target="_top" style="color:var(--a)">/${esc(r.record.path)}</a>${r.messages.length ? '<div class="sub">' + r.messages.map(esc).join('<br>') + '</div>' : ''}</div>`; toast('Zapisano dashboard.'); b.textContent = 'Zapisz zmiany'; }
  catch (e) { $('#res').innerHTML = '<div class="card err">Błąd: ' + esc(e.message) + '</div>'; b.textContent = D.id ? 'Zapisz zmiany' : 'Utwórz dashboard'; }
  b.disabled = false;
}

boot().catch((e) => { $('#app').innerHTML = '<div class="card err">Błąd: ' + esc(e.message) + '</div>'; });
