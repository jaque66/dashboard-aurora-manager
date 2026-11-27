/* Jarvis Pastel - pastelowy dashboard mobilny (jeden element). Generowany przez jarvis_generator/make_pastel.py - nie edytuj recznie. */
// uklad ekranu glownego Aurory (home.au w pliku ukladu): t = sekcje siatki tabletu (kolejnosc + rozmiar w kolumnach/wierszach), p = sekcje telefonu / tabletu w pionie
const DEF_AU = {t: ['status', 'school', 'cal', 'rooms', 'light', 'fuel'], p: ['hero', 'status', 'now', 'school', 'rmini', 'light', 'air', 'fuel', 'cal'], phide: ['air', 'fuel', 'cal'],
  sec: {status: {w: 1, h: 1}, school: {w: 1, h: 1}, cal: {w: 2, h: 1}, rooms: {w: 4, h: 1}, light: {w: 3, h: 1}, fuel: {w: 1, h: 1}}};
const DEF_HOME = {"order": ["hero", "rooms", "as", "status", "school", "air", "fuel", "cal", "links"], "porder": ["hero", "as", "status", "school", "rooms", "air", "fuel", "cal", "links"], "hide": [], "sec": {"hero": {"w": 1, "h": 1}, "rooms": {"w": 3, "h": 3}, "as": {"w": 1, "h": 1}, "status": {"w": 1, "h": 1}, "school": {"w": 1, "h": 1}, "air": {"w": 1, "h": 1}, "fuel": {"w": 1, "h": 1}, "cal": {"w": 1, "h": 1}, "links": {"w": 4, "h": 1}}};   // uklad ekranu glownego z generatora (ten sam co w pastel-layout.default.json)
let PC = {"rooms": [], "out": {"t": "", "h": "", "weather": ""}, "pm": "", "purifier": "", "fuel": [], "cal": [], "calDays": 2, "lightsOff": [], "mute": "", "wash": {"status": "", "end": "", "idle": [], "phase": {}}, "gas": "", "floodK": "", "floodL": "", "alarm": "", "alarmSw": "", "door": "", "bats": [], "temps": [], "hums": [], "humMin": 35, "humMax": 60, "offline": [], "events": [], "f1": {"on": false}, "tab": {"bat": "", "chg": ""}, "reminders": [], "remSlots": [], "remWarn": 3, "order": [], "hide": [], "pipeline": "", "warn": "", "media": {"active": "", "radio": "", "tvs": []}, "server": {"nodes": [], "guests": [], "storages": []}};
const PC_EMPTY = {"rooms": [], "out": {"t": "", "h": "", "weather": ""}, "pm": "", "purifier": "", "fuel": [], "cal": [], "calDays": 2, "lightsOff": [], "mute": "", "wash": {"status": "", "end": "", "idle": [], "phase": {}}, "gas": "", "floodK": "", "floodL": "", "alarm": "", "alarmSw": "", "door": "", "bats": [], "temps": [], "hums": [], "humMin": 35, "humMax": 60, "offline": [], "events": [], "f1": {"on": false}, "tab": {"bat": "", "chg": ""}, "reminders": [], "remSlots": [], "remWarn": 3, "order": [], "hide": [], "pipeline": "", "warn": "", "media": {"active": "", "radio": "", "tvs": []}, "server": {"nodes": [], "guests": [], "storages": []}};   // pusta konfiguracja (nowy dashboard od zera w edytorze)
let PCOWN = null;   // karta, ktorej ustawienia sa teraz w PC (kilka dashboardow Pastela w jednej sesji przegladarki)
let PCB = null;   // kopia ustawien z generatora (do przywracania po usunieciu cfg z pliku ukladu)      // domyslna konfiguracja; karta moze ja nadpisac kluczem cfg w konfiguracji karty (edytor HUD Scene, projekt Pastel)
const PC0 = PC;

const PAL = {   // jasny motyw: [tlo kafla, akcent]; ciemny wylicza sie w CSS
  lav: ['#e6dcff', '#8f78e0'], peach: ['#ffe0cf', '#f08a5d'], butter: ['#fff3c4', '#d9a521'], rose: ['#ffd9e6', '#e5719a'],
  sky: ['#d3e8ff', '#5a9be0'], aqua: ['#cdf2ee', '#35aaa0'], mint: ['#d4f5e2', '#3fb27f'], sand: ['#f3e7da', '#b58a5e'],
};
const SCHEMES = [   // zestawy kolorystyczne: obrot barwy wzgledem domyslnej lawendy (kolory statusow - zielony/zolty/czerwony - zostaja bez zmian)
  {id: 'sky', n: 'Niebo', d: -47}, {id: 'lav', n: 'Lawenda', d: 0}, {id: 'mint', n: 'Mięta', d: -92},
  {id: 'sun', n: 'Cytryna', d: 153}, {id: 'peach', n: 'Brzoskwinia', d: 126}, {id: 'rose', n: 'Róż', d: 83}, {id: 'autumn', n: 'Jesień', d: 140, sw: 'linear-gradient(135deg,#f2a04a,#c9482a)'}, {id: 'winter', n: 'Zima', d: -28, sw: 'linear-gradient(135deg,#e8f4ff,#6fb3e8)'}];
const ACC = new Set(['#8f78e0', '#cdbfff', '#e6dcff', '#b9a6ff', '#ff9fc6', '#ffc6dc', '#6b55c9', '#e4dcff', '#ffe3ef', '#d3ebff', '#4a2e57', '#35306a', '#26466b',
  '#fdf1f6', '#eaf3ff', '#f1ecff', '#1c1a2e', '#172231', '#241d36', '#26223a', '#f6f2ff', '#d8ccff', '#3a3552', '#f1eefc', '#7b7597', '#aaa4c8', '#7a67d6', '#dcd3ff']);
const rotHex = (hex, d) => {
  if (!d) return hex;
  let r = parseInt(hex.slice(1, 3), 16) / 255, g = parseInt(hex.slice(3, 5), 16) / 255, b = parseInt(hex.slice(5, 7), 16) / 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2; let h = 0, s = 0;
  if (mx !== mn) { const dd = mx - mn; s = l > .5 ? dd / (2 - mx - mn) : dd / (mx + mn);
    h = mx === r ? (g - b) / dd + (g < b ? 6 : 0) : mx === g ? (b - r) / dd + 2 : (r - g) / dd + 4; h *= 60; }
  h = (h + d + 360) % 360;
  const q = l < .5 ? l * (1 + s) : l + s - l * s, p = 2 * l - q;
  const f = (t) => { t = (t + 360) % 360; return t < 60 ? p + (q - p) * t / 60 : t < 180 ? q : t < 240 ? p + (q - p) * (240 - t) / 60 : p; };
  const o = (x) => Math.round(x * 255).toString(16).padStart(2, '0');
  return s === 0 ? hex : '#' + o(f(h + 120)) + o(f(h)) + o(f(h - 120));
};
const HATHEME = {"light": {"primary-color": "#8f78e0", "accent-color": "#e5719a", "dark-primary-color": "#6b55c9", "light-primary-color": "#e6dcff", "primary-background-color": "#fdf1f6", "secondary-background-color": "#f1ecff", "lovelace-background": "linear-gradient(135deg, #fdf1f6 0%, #eaf3ff 55%, #f1ecff 100%)", "card-background-color": "#f8f4ff", "ha-card-background": "rgba(255,255,255,0.78)", "ha-card-box-shadow": "0 6px 24px rgba(124,106,190,0.13)", "primary-text-color": "#3a3552", "secondary-text-color": "#7b7597", "text-primary-color": "#ffffff", "disabled-text-color": "#b9b5cf", "disabled-color": "#cfcbe4", "divider-color": "rgba(120,105,170,0.14)", "outline-color": "rgba(120,105,170,0.22)", "app-header-background-color": "rgba(253,241,246,0.85)", "app-header-text-color": "#3a3552", "app-header-edit-background-color": "#e6dcff", "app-header-edit-text-color": "#3a3552", "app-theme-color": "#fdf1f6", "sidebar-background-color": "#fbeaf3", "sidebar-text-color": "#7b7597", "sidebar-icon-color": "#8d86ad", "sidebar-selected-background-color": "rgba(143,120,224,0.16)", "sidebar-selected-icon-color": "#6b55c9", "sidebar-selected-text-color": "#3a3552", "paper-listbox-background-color": "#ffffff", "ha-dialog-surface-background": "#f8f4ff", "mdc-theme-surface": "#f8f4ff", "md-menu-container-color": "#f8f4ff", "mdc-menu-surface-fill-color": "#f8f4ff", "md-sys-color-surface": "#f8f4ff", "md-sys-color-surface-container": "#f8f4ff", "md-sys-color-surface-container-high": "#ffffff", "md-sys-color-on-surface": "#3a3552", "md-sys-color-on-surface-variant": "#7b7597", "mdc-theme-on-surface": "#3a3552", "mdc-select-fill-color": "#f1ecff", "mdc-select-container-fill-color": "#f1ecff", "mdc-select-ink-color": "#3a3552", "mdc-select-label-ink-color": "#7b7597", "ha-color-form-background": "#f1ecff", "ha-color-form-border": "#dcd3ff", "ha-color-form-text": "#3a3552", "wa-color-surface-default": "#f8f4ff", "wa-color-surface-raised": "#ffffff", "wa-color-surface-lowered": "#f6efff", "wa-color-surface-border": "#dcd3ff", "wa-color-text-normal": "#3a3552", "wa-color-text-quiet": "#7b7597", "wa-color-neutral-fill-quiet": "#f8f4ff", "wa-color-neutral-fill-normal": "#e6dcff", "wa-color-neutral-fill-loud": "#e6dcff", "wa-color-neutral-on-normal": "#3a3552", "ha-color-fill-neutral-quiet-resting": "#f8f4ff", "ha-color-fill-neutral-quiet-hover": "#e6dcff", "ha-color-fill-neutral-quiet-active": "#f1ecff", "ha-color-fill-neutral-normal-resting": "#f1ecff", "ha-color-fill-neutral-normal-hover": "#e6dcff", "mdc-dialog-scrim-color": "rgba(58,53,82,0.45)", "switch-checked-color": "#8f78e0", "switch-checked-button-color": "#ffffff", "switch-checked-track-color": "#cdbfff", "switch-unchecked-color": "#b9b5cf", "switch-unchecked-track-color": "#e3def2", "slider-color": "#8f78e0", "slider-track-color": "#e3def2", "slider-bar-color": "#8f78e0", "input-fill-color": "rgba(143,120,224,0.07)", "input-ink-color": "#3a3552", "input-label-ink-color": "#7b7597", "input-idle-line-color": "rgba(120,105,170,0.3)", "input-dropdown-icon-color": "#7b7597", "table-row-background-color": "rgba(255,255,255,0.5)", "table-row-alternative-background-color": "rgba(241,236,255,0.6)", "rgb-primary-color": "143, 120, 224", "rgb-accent-color": "229, 113, 154", "rgb-primary-text-color": "58, 53, 82", "rgb-secondary-text-color": "123, 117, 151", "rgb-card-background-color": "255, 255, 255", "rgb-primary-background-color": "253, 241, 246"}, "dark": {"primary-color": "#b9a6ff", "accent-color": "#ff9fc6", "dark-primary-color": "#8f78e0", "light-primary-color": "#3a3166", "primary-background-color": "#1c1a2e", "secondary-background-color": "#241d36", "lovelace-background": "linear-gradient(135deg, #1c1a2e 0%, #172231 55%, #241d36 100%)", "card-background-color": "#26223a", "ha-card-background": "rgba(255,255,255,0.07)", "ha-card-box-shadow": "0 8px 28px rgba(0,0,0,0.35)", "primary-text-color": "#f1eefc", "secondary-text-color": "#aaa4c8", "text-primary-color": "#1c1a2e", "disabled-text-color": "#6c6788", "disabled-color": "#4a4666", "divider-color": "rgba(255,255,255,0.1)", "outline-color": "rgba(255,255,255,0.18)", "app-header-background-color": "rgba(28,26,46,0.88)", "app-header-text-color": "#f1eefc", "app-header-edit-background-color": "#3a3166", "app-header-edit-text-color": "#f1eefc", "app-theme-color": "#1c1a2e", "sidebar-background-color": "#201c35", "sidebar-text-color": "#aaa4c8", "sidebar-icon-color": "#8f8aae", "sidebar-selected-background-color": "rgba(185,166,255,0.18)", "sidebar-selected-icon-color": "#cdbfff", "sidebar-selected-text-color": "#f1eefc", "paper-listbox-background-color": "#2a2542", "ha-dialog-surface-background": "#26223a", "mdc-theme-surface": "#26223a", "md-menu-container-color": "#26223a", "mdc-menu-surface-fill-color": "#26223a", "md-sys-color-surface": "#26223a", "md-sys-color-surface-container": "#26223a", "md-sys-color-surface-container-high": "#2f2a47", "md-sys-color-on-surface": "#f1eefc", "md-sys-color-on-surface-variant": "#aaa4c8", "mdc-theme-on-surface": "#f1eefc", "mdc-select-fill-color": "#2a2540", "mdc-select-container-fill-color": "#2a2540", "mdc-select-ink-color": "#f1eefc", "mdc-select-label-ink-color": "#aaa4c8", "ha-color-form-background": "#2a2540", "ha-color-form-border": "#403a63", "ha-color-form-text": "#f1eefc", "wa-color-surface-default": "#26223a", "wa-color-surface-raised": "#2f2a47", "wa-color-surface-lowered": "#1c1a2e", "wa-color-surface-border": "#403a63", "wa-color-text-normal": "#f1eefc", "wa-color-text-quiet": "#aaa4c8", "wa-color-neutral-fill-quiet": "#26223a", "wa-color-neutral-fill-normal": "#3a3166", "wa-color-neutral-fill-loud": "#3a3166", "wa-color-neutral-on-normal": "#f1eefc", "ha-color-fill-neutral-quiet-resting": "#26223a", "ha-color-fill-neutral-quiet-hover": "#3a3166", "ha-color-fill-neutral-quiet-active": "#2a2540", "ha-color-fill-neutral-normal-resting": "#2a2540", "ha-color-fill-neutral-normal-hover": "#3a3166", "mdc-dialog-scrim-color": "rgba(10,8,22,0.65)", "switch-checked-color": "#b9a6ff", "switch-checked-button-color": "#ffffff", "switch-checked-track-color": "#6b55c9", "switch-unchecked-color": "#8f8aae", "switch-unchecked-track-color": "#3a3556", "slider-color": "#b9a6ff", "slider-track-color": "#3a3556", "slider-bar-color": "#b9a6ff", "input-fill-color": "rgba(255,255,255,0.07)", "input-ink-color": "#f1eefc", "input-label-ink-color": "#aaa4c8", "input-idle-line-color": "rgba(255,255,255,0.28)", "input-dropdown-icon-color": "#aaa4c8", "table-row-background-color": "rgba(255,255,255,0.04)", "table-row-alternative-background-color": "rgba(255,255,255,0.08)", "rgb-primary-color": "185, 166, 255", "rgb-accent-color": "255, 159, 198", "rgb-primary-text-color": "241, 238, 252", "rgb-secondary-text-color": "170, 164, 200", "rgb-card-background-color": "255, 255, 255", "rgb-primary-background-color": "28, 26, 46"}};
const rotAny = (v, d) => v.replace(/#[0-9a-fA-F]{6}\b/g, (m) => rotHex(m, d))
  .replace(/rgba?\((\d+),\s*(\d+),\s*(\d+)/g, (m, r, g, b) => { const h = rotHex('#' + [r, g, b].map((x) => (+x).toString(16).padStart(2, '0')).join(''), d); return m.slice(0, m.indexOf('(') + 1) + [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)).join(',');})
  .replace(/^(\d+), (\d+), (\d+)$/, (m, r, g, b) => { const h = rotHex('#' + [r, g, b].map((x) => (+x).toString(16).padStart(2, '0')).join(''), d); return [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)).join(', '); });
const rotCss = (css, d) => d ? css.replace(/#[0-9a-fA-F]{6}\b/g, (m) => ACC.has(m.toLowerCase()) ? rotHex(m, d) : m)
  .replace(/rgba\((143,120,224|124,106,190|120,105,170),/g, (m, t) => { const c = t.split(',').map(Number); const h = rotHex('#' + c.map((x) => x.toString(16).padStart(2, '0')).join(''), d);
    return 'rgba(' + [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)).join(',') + ','; }) : css;

// ===== tryb HUD: przemapowanie kolorow pasteli na neonowa cyjanowa paletke (CSS, style inline, atrybuty SVG)
const hexHsl = (hex) => { const r = parseInt(hex.slice(1, 3), 16) / 255, g = parseInt(hex.slice(3, 5), 16) / 255, b = parseInt(hex.slice(5, 7), 16) / 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2; let h = 0, sat = 0;
  if (mx !== mn) { const dd = mx - mn; sat = l > .5 ? dd / (2 - mx - mn) : dd / (mx + mn); h = mx === r ? (g - b) / dd + (g < b ? 6 : 0) : mx === g ? (b - r) / dd + 2 : (r - g) / dd + 4; h *= 60; }
  return [h, sat, l]; };
const HUDK = new Set(['#00e5ff', '#c8f7ff', '#050b12', '#07141d', '#3dffb0', '#ffb020', '#ff4d6d', '#5fb8cc', '#0a3a4a', '#0e5a70', '#ffffff']);
const hudHex = (hex, kind) => {   // kind: 't' tekst/ikona/linia, 'b' tlo/ramka
  const lc = hex.toLowerCase(); if (HUDK.has(lc) || HUDTEAM.has(lc)) return lc;
  const [h, s, l] = hexHsl(lc); const status = s > .35 && l > .3 && l < .8 && (h < 70 || (h >= 95 && h < 165));   // czerwien / pomarancz / zolc / zielen zostaja jako statusy
  if (status) { if (h < 18 || h >= 340) return '#ff4d6d'; if (h < 70) return '#ffb020'; return '#3dffb0'; }
  if (kind === 't') return l < .55 ? '#c8f7ff' : l > .9 ? '#ffffff' : '#00e5ff';
  if (l > .85 || (l > .62 && s < .3)) return 'rgba(0,229,255,.12)'; if (l < .32) return '#07141d'; return '#00e5ff'; };
const hudLt = (hex, kind) => {   // tryb HUD jasny: pastelowe fiolety/roze/niebieskie -> teal HUD, reszta bez zmian
  const lc = hex.toLowerCase(); const [h, s, l] = hexHsl(lc); if (kind === 't' && l > .88 && s < .25) return '#06303c'; if (!(h >= 190 && h < 345 && s > .12)) return lc;
  if (kind === 't') return l < .35 ? '#06303c' : l < .62 ? '#3f7888' : '#008ba3';
  return l > .8 ? 'rgba(0,170,200,.14)' : l < .35 ? '#06303c' : '#00a8c6'; };
const hudCssL = (css) => css.replace(/([a-z-]+)\s*:\s*([^;{}]*#[0-9a-fA-F]{6}\b[^;{}]*)/g, (m, prop, val) => {
  const k = /^(color|fill|stroke|stop-color|caret-color|--ink2?)$/.test(prop) ? 't' : 'b';
  return prop + ':' + val.replace(/#[0-9a-fA-F]{6}\b/g, (x) => hudLt(x, k)); });
const hudCss = (css) => css.replace(/([a-z-]+)\s*:\s*([^;{}]*#[0-9a-fA-F]{6}\b[^;{}]*)/g, (m, prop, val) => {
  const k = /^(color|fill|stroke|stop-color|caret-color|--ink2?)$/.test(prop) ? 't' : 'b';
  return prop + ':' + val.replace(/#[0-9a-fA-F]{6}\b/g, (x) => hudHex(x, k)); });
const hudStyle = (st, M) => {  M = M || hudHex; return hudStyleX(st, M); };
const hudStyleX = (st, M) => st.split(';').map((d) => { const i = d.indexOf(':'); if (i < 0 || !/#[0-9a-fA-F]{6}\b/.test(d)) return d; const prop = d.slice(0, i).trim();
  const k = /^(color|fill|stroke|stop-color|--ink2?)$/.test(prop) ? 't' : 'b'; return d.slice(0, i + 1) + d.slice(i + 1).replace(/#[0-9a-fA-F]{6}\b/g, (x) => M(x, k)); }).join(';');
const hudFix = (root) => { if (!root) return; const host = root.host; if (!host || host._hudD === undefined) return; const M = host._hudD ? hudHex : hudLt;
  root.querySelectorAll('[style*="#"], [fill^="#"], [stroke^="#"], [stop-color^="#"]').forEach((e) => { if (e.closest('#hudbg.sky, #leaves, #piles, #cleaner, .pf, .p3d svg, .dots, .cfdots, .cdot, .ev .cb, .sch, .scw .av, #bnav, #bsh .bair, .air .ring, .airc')) return;   // kolory kalendarzy zostaja (rozrozniaja kalendarze)
    const st = e.getAttribute('style'); if (st && /#[0-9a-fA-F]{6}\b/.test(st)) e.setAttribute('style', hudStyle(st, M));
    ['fill', 'stroke', 'stop-color'].forEach((a) => { const v = e.getAttribute(a); if (v && /^#[0-9a-fA-F]{6}$/.test(v)) e.setAttribute(a, M(v, 't')); }); }); };

const HUD_REACTOR = (() => { let t = ''; for (let i = 0; i < 60; i++) { const a = i * 6 * Math.PI / 180, big = i % 5 === 0, r1 = 262, r2 = big ? 246 : 254; t += `<line x1="${(300 + r1 * Math.sin(a)).toFixed(1)}" y1="${(300 - r1 * Math.cos(a)).toFixed(1)}" x2="${(300 + r2 * Math.sin(a)).toFixed(1)}" y2="${(300 - r2 * Math.cos(a)).toFixed(1)}" stroke-width="${big ? 2.2 : 1}"/>`; }
  let c = ''; for (let i = 0; i < 10; i++) { c += `<path d="M300 ${300 - 150} L${300 - 18} ${300 - 100} L${300 + 18} ${300 - 100} Z" transform="rotate(${i * 36} 300 300)" fill="rgba(0,229,255,.18)" stroke-width="1.5"/>`; }
  return `<svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="rg"><stop offset="0" stop-color="#00e5ff" stop-opacity=".55"/><stop offset=".45" stop-color="#00e5ff" stop-opacity=".12"/><stop offset="1" stop-color="#00e5ff" stop-opacity="0"/></radialGradient></defs>
  <circle cx="300" cy="300" r="300" fill="url(#rg)" stroke="none"/><g fill="none" stroke="#00e5ff">${t}<circle cx="300" cy="300" r="228" stroke-width="3"/><circle cx="300" cy="300" r="214" stroke-width="1" stroke-dasharray="3 7"/>
  <circle cx="300" cy="300" r="190" stroke-width="10" stroke-dasharray="70 18"/><circle cx="300" cy="300" r="160" stroke-width="2"/>${c}<circle cx="300" cy="300" r="100" stroke-width="3"/><circle cx="300" cy="300" r="86" stroke-width="1" stroke-dasharray="2 5"/>
  <polygon points="300,230 360,334 240,334" stroke-width="3" fill="rgba(0,229,255,.2)"/><circle cx="300" cy="300" r="26" fill="rgba(0,229,255,.55)" stroke-width="2"/></g></svg>`; })();
// tlo ekranu glownego Aurory: pole delikatnych linii-fal na calym ekranie + dwie miekkie poswiaty (statyczny SVG, bez blur i animacji - lekkie dla tabletu); kolory ze schematu
const HUD_AURORA = (S, d) => { const a = d ? S.a : S.la, b = d ? S.b : S.lb, c = d ? S.c : S.lb, lo = d ? .13 : .16, gl = d ? .13 : .12; let ln = '';
  for (let i = 0; i < 26; i++) { const y0 = 20 + i * 31, A = 26 + 10 * Math.sin(i * .4), ph = i * .33; let t = '';
    for (let x = 0; x <= 1280; x += 40) { const y = y0 + A * Math.sin(x / 190 + ph) + 14 * Math.sin(x / 95 + ph * 1.7) + 0.02 * (x - 640) * Math.sin(ph); t += (x ? 'L' : 'M') + x + ',' + y.toFixed(1); }
    ln += `<path d="${t}" stroke="url(#alg)" stroke-opacity="${(lo * (0.55 + 0.45 * Math.sin(i * .5 + 1))).toFixed(3)}"/>`; }
  return `<svg viewBox="0 0 1280 800" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="alg" x1="0" y1="0" x2="1280" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="${a}"/><stop offset=".5" stop-color="${b}"/><stop offset="1" stop-color="${c}"/></linearGradient>
  <radialGradient id="alr1" cx="0" cy="0" r="1" gradientUnits="objectBoundingBox"><stop offset="0" stop-color="${a}" stop-opacity="${gl}"/><stop offset="1" stop-color="${a}" stop-opacity="0"/></radialGradient>
  <radialGradient id="alr2" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="${b}" stop-opacity="${gl}"/><stop offset="1" stop-color="${b}" stop-opacity="0"/></radialGradient></defs>
  <ellipse cx="260" cy="120" rx="560" ry="360" fill="url(#alr2)"/><ellipse cx="1060" cy="700" rx="600" ry="380" fill="url(#alr2)"/>
  <g fill="none" stroke-width="1.1">${ln}</g></svg>`; };

/* tlo "Zywy horyzont" (alternatywne tlo Aurory): niebo wg rzeczywistej pozycji slonca (sun.sun), pogody i pory dnia; slonce / ksiezyc przesuwaja sie po lukowej trasie, wzgorza na horyzoncie, gwiazdy i zorze tylko w nocy */
const hudBgOn = () => { try { return localStorage.getItem('hud_bg') === 'sky'; } catch (e) { return false; } };
const hudSkyBg = (el, SC) => {
  const st = (el._hass && el._hass.states) || {}, sn = st['sun.sun'], hr = new Date().getHours() + new Date().getMinutes() / 60;
  const e = sn && sn.attributes && sn.attributes.elevation != null ? +sn.attributes.elevation : 52 * Math.sin((hr - 6) / 12 * Math.PI) - 8, az = sn && sn.attributes && sn.attributes.azimuth != null ? +sn.attributes.azimuth : 90 + (hr - 6) * 15;
  const w = (st[PC.out.weather] || {}).state || '', cl = /cloud|fog|rain|pour|lightning|hail|snow/.test(w), wet = /rain|pour|lightning|hail/.test(w), fog = /fog/.test(w);
  const hx = (c) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16)), mix = (a, b, t) => { const A = hx(a), B = hx(b); return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, '0')).join(''); };
  const ST = [[-18, ['#03060f', '#08122b', '#0c1a3d']], [-8, ['#070d2a', '#16224f', '#2a3768']], [-1, ['#101a46', '#5b3a73', '#b8506a']], [5, ['#1a2a5e', '#8f4f6f', '#d08a48']], [16, ['#173f78', '#3a78b0', '#2d5a86']], [36, ['#12507f', '#2b78a8', '#0b2a45']]];
  let k = 0; while (k < ST.length - 2 && e > ST[k + 1][0]) k++; const t = Math.max(0, Math.min(1, (e - ST[k][0]) / (ST[k + 1][0] - ST[k][0]))), pal = ST[k][1].map((c, i) => mix(c, ST[k + 1][1][i], t));
  const gray = wet ? .55 : fog ? .4 : cl ? .42 : 0, P = pal.map((c) => mix(c, e > -6 ? '#1b2432' : '#0a0f1a', gray));
  const night = e < -3, x = night ? Math.max(8, Math.min(92, (((az + 180) % 360) - 80) / 200 * 100)) : Math.max(8, Math.min(92, (az - 80) / 200 * 100)), y = night ? 66 - Math.min(-e, 40) * 1.0 : 76 - Math.max(e, 0) * 0.85;
  const ao = Math.max(0, Math.min(1, (-e - 6) / 12)) * (cl ? .25 : 1), so = Math.max(0, Math.min(1, (-e - 8) / 10)) * (cl ? .2 : 1), cd = cl ? .5 + (wet ? .3 : 0) : .14, glow = cl ? .35 : 1;
  const key = 'sk:' + [Math.round(e), w, Math.round(x), el._hudD ? 'd' : 'l', SC.id].join(':');
  const front = mix(P[2], '#000000', .93), back = mix(P[2], '#000000', .84);
  const html = `<div class="sk" style="background:linear-gradient(180deg,${P[0]} 0%,${P[1]} 55%,${P[2]} 100%)"></div><div class="stz" style="opacity:${so.toFixed(2)}"></div><div class="arz" style="opacity:${ao.toFixed(2)}"><i style="background:radial-gradient(closest-side,${SC.a}66,transparent)"></i><i class="b" style="background:radial-gradient(closest-side,${SC.b}55,transparent)"></i></div><div class="cdz" style="opacity:${cd.toFixed(2)}"></div><div class="bdz${night ? ' mn' : ''}" style="left:${x.toFixed(1)}%;top:${y.toFixed(1)}%;opacity:${glow}"></div><div class="hl h1" style="background:${back}"></div><div class="hl h2" style="background:${front}"></div>`;
  return {key, html}; };
const hudBg = (el) => { const root = el.shadowRoot, bg = root && root.getElementById('hudbg'); if (!bg) return; const sub = root.getElementById('sub');
  const on = sub && sub.style.display !== 'none' && sub.firstElementChild, ico = on && sub.querySelector('.hdr .bub ha-icon'); const SC = hudSch(), icn = ico ? ico.getAttribute('icon') : '', key = (on ? 'i:' + icn : 'home') + ':' + SC.id + (el._hudD ? 'd' : 'l');
  if (hudBgOn() && el._hudD) { const q = hudSkyBg(el, SC); if (bg.dataset.k === q.key) return; bg.dataset.k = q.key; bg.classList.add('sky'); bg.innerHTML = q.html; return; }
  bg.classList.remove('sky');
  if (bg.dataset.k === key) return; bg.dataset.k = key;
  bg.innerHTML = `<div class="au">${HUD_AURORA(SC, !!el._hudD)}</div>` + (on ? (icn ? `<ha-icon class="vi" icon="${icn}"></ha-icon>` : '') : `<div class="rx">${HUD_REACTOR}</div>`); };
const hudWatch = (el) => { if (el._hudMo) return; let t = 0; const run = () => { t = 0; try { hudFix(el.shadowRoot); hudBg(el); } catch (e) { /* ignore */ } };
  el._hudMo = new MutationObserver(() => { if (!t) t = setTimeout(run, 60); }); el._hudMo.observe(el.shadowRoot, {childList: true, subtree: true, attributes: true, attributeFilter: ['style']}); run(); };

// wygaszacz w stylu Aurora: niebo zalezne od pogody i pory dnia, cienki zegar, szklane plakietki; naturalne slonce / chmury / deszcz
const hudSvCss = () => { const P = hudPal(true), M = {sunny: 'sunny', partlycloudy: 'partlycloudy', windy: 'windy', cloudy: 'cloudy', rainy: 'rain', lightning: 'storm', snowy: 'snow', fog: 'fog'}; let c = '';
  Object.keys(M).forEach((k) => { const s = HUD_SKY[k]; c += `.sv.c-${M[k]} { background: linear-gradient(165deg, ${s[0]}, ${s[1]}) !important; } .sv.n.c-${M[k]} { background: linear-gradient(165deg, ${s[2]}, ${s[3]}) !important; }\n`; });
  return c + `.sv, .sv.n { color: #fff !important; font-family: 'Inter','SF Pro Display','Segoe UI',Roboto,system-ui,sans-serif !important; }
.tm { font-weight: 200 !important; letter-spacing: -.03em !important; text-shadow: 0 .5vh 4vh rgba(0,0,0,.25) !important; } .dt { font-weight: 500 !important; letter-spacing: .02em; opacity: .85 !important; }
.tp { border-radius: 4vh !important; background: rgba(255,255,255,.14) !important; border: 1px solid rgba(255,255,255,.22) !important; box-shadow: 0 1vh 4vh rgba(0,0,0,.18) !important; color: #fff !important; } .tp ha-icon, .tp b { color: #fff !important; } .tp span { color: #fff !important; opacity: .85 !important; font-weight: 500 !important; } .tp em { color: #fff !important; border-left-color: rgba(255,255,255,.3) !important; }
.sun { background: radial-gradient(circle, #fffbe0 0 16%, rgba(255,226,120,.85) 17% 34%, rgba(255,200,80,.30) 35% 55%, rgba(255,200,80,0) 72%) !important; }
.moon { color: #f6f2dc !important; filter: drop-shadow(0 0 2vh rgba(246,242,220,.5)) !important; } .st { background: #fff !important; box-shadow: 0 0 1vh rgba(255,255,255,.9) !important; }
.cl { background: radial-gradient(ellipse at 50% 58%, rgba(255,255,255,.85) 0 42%, rgba(255,255,255,0) 72%) !important; filter: blur(.4vh); } .dk .cl { background: radial-gradient(ellipse at 50% 58%, rgba(95,106,122,.85) 0 42%, rgba(95,106,122,0) 72%) !important; }
.n .cl { background: radial-gradient(ellipse at 50% 58%, rgba(70,82,110,.7) 0 42%, rgba(70,82,110,0) 72%) !important; } .n.dk .cl { background: radial-gradient(ellipse at 50% 58%, rgba(28,34,48,.85) 0 42%, rgba(28,34,48,0) 72%) !important; }
.dr, .n .dr { background: linear-gradient(transparent, rgba(205,225,255,.8)) !important; } .sn { background: #fff !important; box-shadow: 0 0 .8vh rgba(255,255,255,.8) !important; } .fg, .n .fg { background: linear-gradient(90deg, transparent, rgba(255,255,255,.4), transparent) !important; }
.ai { border-radius: 99px !important; background: rgba(255,255,255,.88) !important; border: 1px solid rgba(255,255,255,.9) !important; color: #1d3557 !important; font-weight: 700 !important; text-shadow: none !important; box-shadow: 0 .6vh 2.4vh rgba(0,0,0,.14) !important; } .ai.s1 { background: rgba(255,236,170,.95) !important; border-color: #f0c24a !important; color: #5c4300 !important; } .ai.s2 { background: rgba(255,205,215,.95) !important; border-color: #ff7a93 !important; color: #7a0f28 !important; }
.sv.n .ai { background: rgba(8,20,50,.6) !important; border-color: rgba(255,255,255,.28) !important; color: #fff !important; box-shadow: none !important; } .sv.n .ai.s1 { background: rgba(150,115,0,.92) !important; border-color: #ffd23f !important; color: #fff3c0 !important; } .sv.n .ai.s2 { background: rgba(80,8,28,.84) !important; border-color: #ff5a78 !important; color: #ffc2cd !important; }
.ai b, .ai span, .ai small, .ai ha-icon { color: inherit !important; opacity: 1 !important; } .tp { background: rgba(255,255,255,.2) !important; }
`; };

const PT = {W: 100, H: 100, pp: (x, z) => [x, z], render: () => ''};   /* rzut mieszkania (3D) nie jest czescia wersji publicznej */

const PVER = (() => { try { return new URL(import.meta.url).searchParams.get('v') || '—'; } catch (e) { return '—'; } })();
const WX = {'clear-night': ['mdi:weather-night', 'Pogodna noc'], cloudy: ['mdi:weather-cloudy', 'Pochmurno'], exceptional: ['mdi:alert-circle-outline', 'Wyjątkowo'],
  fog: ['mdi:weather-fog', 'Mgła'], hail: ['mdi:weather-hail', 'Grad'], lightning: ['mdi:weather-lightning', 'Burza'], 'lightning-rainy': ['mdi:weather-lightning-rainy', 'Burza z deszczem'],
  partlycloudy: ['mdi:weather-partly-cloudy', 'Częściowe zachmurzenie'], pouring: ['mdi:weather-pouring', 'Ulewa'], rainy: ['mdi:weather-rainy', 'Deszcz'],
  snowy: ['mdi:weather-snowy', 'Śnieg'], 'snowy-rainy': ['mdi:weather-snowy-rainy', 'Śnieg z deszczem'], sunny: ['mdi:weather-sunny', 'Słonecznie'],
  windy: ['mdi:weather-windy', 'Wietrznie'], 'windy-variant': ['mdi:weather-windy-variant', 'Wietrznie']};
const DAYS = ['niedziela', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota'];
// faza ksiezyca liczona z cyklu synodycznego (nów 2000-01-06 18:14 UTC); polkula polnocna: przybywa od prawej strony
function moonSvg(d) {
  const p = ((((d || new Date()).getTime() - 947182440000) / 86400000) % 29.530588853 + 29.530588853) % 29.530588853 / 29.530588853, q = p < .5 ? p : 1 - p, c = Math.cos(2 * Math.PI * q), rx = Math.abs(c) * 50;
  return `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="currentColor" opacity=".13"/><path fill="currentColor"${p > .5 ? ' transform="translate(100 0) scale(-1 1)"' : ''} d="M50 0A50 50 0 0 1 50 100A${rx.toFixed(2)} 50 0 0 ${c > 0 ? 0 : 1} 50 0Z"/></svg>`;
}
// swieta ustawowo wolne od pracy w Polsce (stale + ruchome liczone od Wielkanocy, algorytm Gaussa/Meeusa)
const PLH = {};
function plHolidays(y) {
  if (PLH[y]) return PLH[y];
  const a = y % 19, b = Math.floor(y / 100), c = y % 100, d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30, i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451);
  const mo = Math.floor((h + l - 7 * m + 114) / 31), da = ((h + l - 7 * m + 114) % 31) + 1, ea = new Date(y, mo - 1, da);
  const H = {'01-01': 'Nowy Rok', '01-06': 'Trzech Króli', '05-01': 'Święto Pracy', '05-03': 'Święto Konstytucji 3 Maja', '08-15': 'Wniebowzięcie NMP', '11-01': 'Wszystkich Świętych', '11-11': 'Święto Niepodległości', '12-24': 'Wigilia', '12-25': 'Boże Narodzenie', '12-26': 'Drugi dzień Bożego Narodzenia'};
  const add = (n, t) => { const x = new Date(ea.getFullYear(), ea.getMonth(), ea.getDate() + n); H[String(x.getMonth() + 1).padStart(2, '0') + '-' + String(x.getDate()).padStart(2, '0')] = t; };
  add(0, 'Wielkanoc'); add(1, 'Poniedziałek Wielkanocny'); add(49, 'Zielone Świątki'); add(60, 'Boże Ciało');
  return (PLH[y] = H);
}
function isoWeek(d) { const t = new Date(d.getFullYear(), d.getMonth(), d.getDate()); t.setDate(t.getDate() + 3 - ((t.getDay() + 6) % 7)); const w1 = new Date(t.getFullYear(), 0, 4); return 1 + Math.round(((t - w1) / 86400000 - 3 + ((w1.getDay() + 6) % 7)) / 7); }
const F1_ENTS = ['sensor.f1_next_race', 'sensor.f1_weather', 'sensor.f1_last_race_results', 'sensor.f1_driver_standings', 'sensor.f1_constructor_standings', 'binary_sensor.f1_race_week'];
const TH = {tMin: 'input_number.pastel_temperatura_min', tMax: 'input_number.pastel_temperatura_max', hMin: 'input_number.pastel_wilgotnosc_min', hMax: 'input_number.pastel_wilgotnosc_max'};
const F1_LIVE = ['sensor.f1_replay_status', 'sensor.f1_session_status', 'sensor.f1_track_status', 'sensor.f1_race_lap_count', 'sensor.f1_driver_positions', 'sensor.f1_current_tyres', 'sensor.f1_race_control', 'sensor.f1_session_time_remaining', 'sensor.f1_current_session', 'sensor.f1_team_radio'];
const F1_TEAM = {mercedes: '#27f4d2', ferrari: '#e8002d', mclaren: '#ff8000', red_bull: '#3671c6', rb: '#6692ff', alpine: '#0093cc', haas: '#9a9ea3', audi: '#f50537', williams: '#64c4ff', aston_martin: '#229971', cadillac: '#8e8e8e', sauber: '#52e252'};
const HUDTEAM = new Set(Object.values(F1_TEAM).map((x) => x.toLowerCase()));
const MONTHS = ['stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca', 'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia'];
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));


const HUD_LIGHT = `
:host { --bg1: #eaf6f9; --bg2: #dff0f5; --bg3: #eaf6f9; --ink: #06303c; --ink2: #3f7888; --card: rgba(255,255,255,.82); --line: rgba(0,139,163,.42); --chip: rgba(0,170,200,.10);
  --shadow: 0 0 10px rgba(0,170,200,.18), inset 0 0 14px rgba(0,170,200,.06); --glass: none; --good: #1aa772; --warn: #d98a00; --bad: #d92e52; --info: #008ba3; }
.app { font-family: 'Rajdhani','Orbitron','Share Tech Mono','Consolas',ui-monospace,monospace; letter-spacing: .02em; color: #06303c;
  background: radial-gradient(900px 500px at 0% -10%, rgba(0,200,230,.16), transparent 60%), radial-gradient(800px 500px at 110% 10%, rgba(0,150,190,.12), transparent 60%),
              repeating-linear-gradient(0deg, rgba(0,139,163,.05) 0 1px, transparent 1px 4px), #eaf6f9 !important; }
h2 { color: #008ba3; letter-spacing: .22em; border-bottom: 1px solid rgba(0,139,163,.3); padding-bottom: 5px; }
.card, .big, .room, .hero, .nav, .air, .fu, .cal, .as { border-radius: 4px !important; background: var(--card) !important; border: 1px solid var(--line) !important; box-shadow: var(--shadow) !important; }
.hero { background: linear-gradient(135deg, rgba(0,200,230,.30), rgba(255,255,255,.85) 60%) !important; color: #06303c !important; }
.time { color: #008ba3; font-weight: 700; text-shadow: 0 0 10px rgba(0,200,230,.45); }
.wx .ic, .tg, .mini span { border-radius: 3px !important; background: rgba(0,170,200,.12) !important; color: #008ba3 !important; border: 1px solid rgba(0,139,163,.32); }
.dev, .chips button, .chipb, .pill, .seg, .seg button, .tv, .ctl button { border-radius: 3px !important; border: 1px solid rgba(0,139,163,.38) !important; background: rgba(0,170,200,.08) !important; color: #06303c !important; }
.dev.on, .dev.act, .seg button.act, .chips button.act, .tv.act { background: rgba(0,190,220,.28) !important; border-color: #008ba3 !important; color: #022a35 !important; box-shadow: 0 0 10px rgba(0,170,200,.4); outline: 0 !important; }
.tv ha-icon, .ctl button ha-icon { color: #008ba3; } .tv em { color: #3f7888; }
.ctl button:active, .tv:active { background: rgba(0,190,220,.32) !important; }
.bub { border-radius: 3px !important; } .app { isolation: isolate; } #sub.pv { border-radius: 4px !important; border: 1px solid rgba(0,139,163,.55) !important; box-shadow: 0 0 22px rgba(0,170,200,.35) !important; } #popbd { background: rgba(6,48,60,.35); }
.wm, .room > .wm, .status > .wm, .air > .wm, .fu > .wm, .cal > .wm { display: none !important; }
.lk, .room .met div, .met div, .listen, .big, .hero .hr, .hero .hr .hb, .tp, .fuc, .ai, .alr, .dev, .tv, .ctl button { border-radius: 3px !important; }
.lk { background: rgba(255,255,255,.82) !important; border: 1px solid rgba(0,139,163,.42) !important; box-shadow: var(--shadow) !important; }
.lk .i, .room .ic, .room .rico, .room header span:first-child { border-radius: 3px !important; background: rgba(0,170,200,.14) !important; color: #008ba3 !important; border: 1px solid rgba(0,139,163,.35); }
.lk .i ha-icon, .room header ha-icon { color: #008ba3 !important; }
.room .met div { background: rgba(0,170,200,.08) !important; border: 1px solid rgba(0,139,163,.25); }
@keyframes lpulse { 50% { box-shadow: 0 0 0 8px rgba(0,170,200,.28); } } .listen:focus, .listen:active, .mic:focus, .mic:active { outline: 0; } button { -webkit-tap-highlight-color: transparent; }
.listen { background: rgba(0,170,200,.16) !important; color: #06303c !important; border: 1px solid rgba(0,139,163,.45) !important; }
.lk.alarm { background: rgba(217,46,82,.14) !important; border-color: #d92e52 !important; color: #8a1230 !important; }
.hero .hr.s1 { border-radius: 3px; }
.wash { border-radius: 3px !important; background: rgba(0,170,200,.08) !important; border: 1px solid rgba(0,139,163,.35) !important; color: #06303c !important; }
.wash ha-icon { color: #008ba3; }
.wash.run, .wash[style*="fff0c2"], .wash[style*="255, 240, 194"] { background: rgba(217,138,0,.14) !important; border-color: #d98a00 !important; color: #7a4d00 !important; box-shadow: 0 0 8px rgba(217,138,0,.3); } .wash.run ha-icon, .wash[style*="fff0c2"] ha-icon { color: #d98a00; }
.wash.end { background: rgba(26,167,114,.14) !important; border-color: #1aa772 !important; color: #0d6b48 !important; } .wash.end ha-icon { color: #1aa772; }
.fu .tr { border-radius: 3px !important; background: rgba(0,170,200,.10) !important; border: 1px solid rgba(0,139,163,.3); color: #3f7888; }
.fu .tr.up { color: #d92e52; border-color: rgba(217,46,82,.5); } .fu .tr.dn { color: #1aa772; border-color: rgba(26,167,114,.5); }
.fu .fuc, .fuc { border-radius: 3px !important; }
.hi, .date, .hero .hi, .hero .date { color: #2d6a7a !important; opacity: 1 !important; }

#hudbg { position: fixed; inset: 0; z-index: -1; pointer-events: none; overflow: hidden; display: block; }
#hudbg .rx { position: absolute; left: 50%; top: 50%; width: min(92vh, 92vw); height: min(92vh, 92vw); transform: translate(-50%, -50%); opacity: .12; } #hudbg .rx svg { width: 100%; height: 100%; }
#hudbg .vi { position: absolute; right: 4vw; bottom: 6vh; --mdc-icon-size: min(62vh, 56vw); width: min(62vh, 56vw); height: min(62vh, 56vw); color: #008ba3; opacity: .07; }
`;
const HUD_CSS = `
:host, :host(.dark) { --bg1: #050b12; --bg2: #07161f; --bg3: #050b12; --ink: #c8f7ff; --ink2: #5fb8cc; --card: rgba(8,26,38,.78); --line: rgba(0,229,255,.34); --chip: rgba(0,229,255,.08);
  --shadow: 0 0 14px rgba(0,229,255,.16), inset 0 0 18px rgba(0,229,255,.05); --glass: none; --good: #3dffb0; --warn: #ffb020; --bad: #ff4d6d; --info: #00e5ff; }
.app { font-family: 'Rajdhani','Orbitron','Share Tech Mono','Consolas',ui-monospace,monospace; letter-spacing: .02em;
  background: radial-gradient(900px 500px at 0% -10%, rgba(0,229,255,.10), transparent 60%), radial-gradient(800px 500px at 110% 10%, rgba(0,120,160,.12), transparent 60%),
              repeating-linear-gradient(0deg, rgba(0,229,255,.025) 0 1px, transparent 1px 4px), #050b12 !important; }
h2 { color: #00e5ff; text-shadow: 0 0 8px rgba(0,229,255,.55); letter-spacing: .22em; border-bottom: 1px solid rgba(0,229,255,.22); padding-bottom: 5px; }
.card, .big, .room, .hero, .nav, .air, .fu, .cal, .as { border-radius: 4px !important; background: var(--card) !important; border: 1px solid var(--line) !important; box-shadow: var(--shadow) !important; color: var(--ink); }
.hero { background: linear-gradient(135deg, rgba(0,229,255,.16), rgba(5,11,18,.85) 60%) !important; color: #c8f7ff !important; }
.hero:after { background: radial-gradient(circle, rgba(0,229,255,.22), transparent 70%) !important; }
.time { color: #00e5ff; text-shadow: 0 0 14px rgba(0,229,255,.7); font-weight: 700; }
.wx .ic, .tg, .mini span { border-radius: 3px !important; background: rgba(0,229,255,.10) !important; color: #00e5ff !important; border: 1px solid rgba(0,229,255,.3); }
.dev, .chips button, .chipb, .pill, .seg, .seg button { border-radius: 3px !important; border: 1px solid rgba(0,229,255,.28) !important; background: rgba(0,229,255,.06) !important; color: #c8f7ff !important; }
.dev.on, .dev.act, .seg button.act, .chips button.act { background: rgba(0,229,255,.22) !important; border-color: #00e5ff !important; color: #eaffff !important; box-shadow: 0 0 10px rgba(0,229,255,.45); }
.dev ha-icon, .room ha-icon, .big ha-icon { color: #00e5ff; }
.room[style], .dcard[style] { background: var(--card) !important; }
.nav { border-radius: 4px !important; }
.nav button.act { background: rgba(0,229,255,.2) !important; color: #00e5ff !important; box-shadow: 0 0 10px rgba(0,229,255,.4); }
.wm { color: #00e5ff !important; opacity: .09 !important; }
.hdr .bub, .bub { border-radius: 3px !important; background: rgba(0,229,255,.12) !important; color: #00e5ff !important; border: 1px solid rgba(0,229,255,.4) !important; box-shadow: 0 0 10px rgba(0,229,255,.25); }
.hdr .bub ha-icon, .bub ha-icon, .back ha-icon { color: #00e5ff !important; } .back { border-radius: 3px !important; background: rgba(0,229,255,.08) !important; border: 1px solid rgba(0,229,255,.35) !important; color: #00e5ff !important; }
.ht { color: #c8f7ff; letter-spacing: .12em; text-transform: uppercase; text-shadow: 0 0 8px rgba(0,229,255,.4); }
.mon { border-radius: 4px !important; }
.isn { color: #c8f7ff !important; text-shadow: 0 0 6px rgba(0,229,255,.5); } .isn b { color: #00e5ff !important; letter-spacing: .12em; text-transform: uppercase; } .isn span { color: #c8f7ff !important; }
.isb { border-radius: 3px !important; background: rgba(0,229,255,.1) !important; color: #00e5ff !important; border: 1px solid rgba(0,229,255,.45) !important; box-shadow: none; }
.isb.on { background: rgba(0,229,255,.35) !important; color: #fff !important; box-shadow: 0 0 14px #00e5ff !important; } .isb.warn { border-color: #ffb020 !important; color: #ffb020 !important; background: rgba(255,176,32,.15) !important; } .isb.run { border-color: #3dffb0 !important; color: #3dffb0 !important; }
.isr.on .fl { fill: #00e5ff; } .hint { color: #5fb8cc !important; }
.p2tg { border-radius: 3px !important; border: 1px solid rgba(0,229,255,.4) !important; } .p2tg button { color: #c8f7ff !important; } .p2tg button.on { background: rgba(0,229,255,.28) !important; color: #00e5ff !important; box-shadow: 0 0 10px rgba(0,229,255,.4) inset; }
.p3h { border-radius: 4px !important; border: 1px solid rgba(0,229,255,.4); }
#hudbg { position: fixed; inset: 0; z-index: -1; pointer-events: none; overflow: hidden; display: block; }
.app { isolation: isolate; }
#hudbg .rx { position: absolute; left: 50%; top: 50%; width: min(92vh, 92vw); height: min(92vh, 92vw); transform: translate(-50%, -50%); opacity: .16; } #hudbg .rx svg { width: 100%; height: 100%; display: block; }
#hudbg .vi { position: absolute; right: 4vw; bottom: 6vh; --mdc-icon-size: min(62vh, 56vw); width: min(62vh, 56vw); height: min(62vh, 56vw); color: #00e5ff; opacity: .07; filter: drop-shadow(0 0 3vh rgba(0,229,255,.6)); }
.wm, .room > .wm, .status > .wm, .air > .wm, .fu > .wm, .cal > .wm { display: none !important; }
.atg { border-radius: 3px !important; background: rgba(0,229,255,.08) !important; color: #5fb8cc !important; border: 1px solid rgba(0,229,255,.3) !important; box-shadow: none !important; }
.atg.on { background: rgba(0,229,255,.25) !important; color: #00e5ff !important; border-color: #00e5ff !important; box-shadow: 0 0 10px rgba(0,229,255,.45) !important; } .atg ha-icon { color: inherit !important; }
.wx .d { opacity: 1 !important; color: #c8f7ff !important; font-weight: 700; text-shadow: 0 0 6px rgba(0,229,255,.35); } .wx .t { color: #fff; text-shadow: 0 0 8px rgba(0,229,255,.5); } .hi, .date { opacity: 1 !important; color: #8fdff0; } .mini span, .mini small { color: #c8f7ff !important; opacity: 1 !important; }
.bar { background: rgba(0,229,255,.14) !important; }
.m { border-radius: 3px !important; border: 1px solid rgba(0,229,255,.3); letter-spacing: .03em; }
.m.u { background: rgba(0,229,255,.2) !important; color: #eaffff !important; border-color: #00e5ff; box-shadow: 0 0 10px rgba(0,229,255,.3); }
.m.a { background: rgba(0,229,255,.06) !important; color: #c8f7ff !important; }
.inp input { border-radius: 3px !important; background: rgba(0,229,255,.06) !important; border: 1px solid rgba(0,229,255,.4) !important; color: #c8f7ff !important; } .inp input:focus { border-color: #00e5ff !important; box-shadow: 0 0 10px rgba(0,229,255,.4); }
.mic2, .send { border-radius: 3px !important; background: rgba(0,229,255,.14) !important; color: #00e5ff !important; border: 1px solid rgba(0,229,255,.5) !important; }
.mic2.on { background: rgba(0,229,255,.4) !important; box-shadow: 0 0 12px #00e5ff; }
.chclr, .chst, .pipesel select { border-radius: 3px !important; background: rgba(0,229,255,.08) !important; color: #c8f7ff !important; border: 1px solid rgba(0,229,255,.3) !important; }
.cm { color: #5fb8cc !important; }
.ok { border-radius: 3px; } .ok, .ok .b { color: #3dffb0 !important; } .ok .b { background: rgba(61,255,176,.12) !important; border: 1px solid rgba(61,255,176,.5) !important; border-radius: 3px !important; }
.status, .status.card { background: rgba(61,255,176,.06) !important; }
.iss { border-radius: 3px !important; }
.wh, .whs > div, .whs > * { border-radius: 3px !important; background: rgba(0,229,255,.07) !important; border: 1px solid rgba(0,229,255,.25); color: #c8f7ff !important; }
.fx .sun { background: radial-gradient(circle, rgba(0,229,255,.9) 0 10%, rgba(0,229,255,.45) 11% 30%, rgba(0,229,255,.12) 31% 52%, rgba(0,229,255,0) 72%) !important; box-shadow: 0 0 40px rgba(0,229,255,.35); }
.fx .moon { color: #7df3ff !important; filter: drop-shadow(0 0 12px rgba(0,229,255,.9)) !important; }
.fx .st { background: #bffaff !important; box-shadow: 0 0 8px #00e5ff !important; }
.fx .cl, :host(.dark) .fx .cl, .fx.dk .cl, :host(.dark) .fx.dk .cl { background: radial-gradient(ellipse at 50% 55%, rgba(0,229,255,.55) 0 40%, rgba(0,229,255,0) 74%) !important; border: 0; filter: drop-shadow(0 0 8px rgba(0,229,255,.5)); }
.fx .dr, :host(.dark) .fx .dr { width: 2.5px !important; background: linear-gradient(transparent, #00e5ff) !important; box-shadow: 0 0 6px rgba(0,229,255,.8); }
.fx .sn { background: #fff !important; box-shadow: 0 0 8px #00e5ff !important; } .fx .hl { background: #bffaff !important; box-shadow: 0 0 6px #00e5ff !important; }
.fx .fg, :host(.dark) .fx .fg { background: linear-gradient(90deg, transparent, rgba(0,229,255,.4), transparent) !important; }
.fx .fl, :host(.dark) .fx .fl { background: rgba(0,229,255,.5) !important; }
.tv, .ctl button { border-radius: 3px !important; border: 1px solid rgba(0,229,255,.28) !important; background: rgba(0,229,255,.06) !important; color: #c8f7ff !important; box-shadow: none !important; }
.tv ha-icon, .ctl button ha-icon { color: #00e5ff; }
.tv em { color: #5fb8cc; }
.tv.act { background: rgba(0,229,255,.22) !important; outline: 0 !important; border-color: #00e5ff !important; color: #eaffff !important; box-shadow: 0 0 10px rgba(0,229,255,.45) !important; }
.ctl button:active, .tv:active { background: rgba(0,229,255,.22) !important; border-color: #00e5ff !important; }
.wwarn { border-radius: 3px !important; border: 1px solid rgba(61,255,176,.5) !important; background: rgba(61,255,176,.08) !important; color: #3dffb0 !important; box-shadow: 0 0 10px rgba(61,255,176,.2); }
.wwarn.lv1 { border-color: #ffd23f !important; background: rgba(255,210,63,.12) !important; color: #ffe27a !important; box-shadow: 0 0 10px rgba(255,210,63,.3); }
.wwarn.lv2 { border-color: #ff8a1f !important; background: rgba(255,138,31,.14) !important; color: #ffb066 !important; box-shadow: 0 0 10px rgba(255,138,31,.35); }
.wwarn.lv3, .wwarn.lv4 { border-color: #ff4d6d !important; background: rgba(255,77,109,.16) !important; color: #ff9fb0 !important; box-shadow: 0 0 12px rgba(255,77,109,.45); }
.wwarn b, .wwarn ha-icon, .wwarn span { color: inherit !important; }
.wash { border-radius: 3px !important; background: rgba(0,229,255,.07) !important; border: 1px solid rgba(0,229,255,.28) !important; color: #c8f7ff !important; }
.wash ha-icon { color: #00e5ff; }
.wash.run { background: rgba(255,176,32,.14) !important; border-color: #ffb020 !important; color: #ffd666 !important; box-shadow: 0 0 10px rgba(255,176,32,.35); } .wash.run ha-icon { color: #ffb020; }
.wash.end { background: rgba(61,255,176,.12) !important; border-color: #3dffb0 !important; color: #3dffb0 !important; }
.wash[style*="fff0c2"], .wash[style*="255, 240, 194"] { background: rgba(255,176,32,.14) !important; border-color: #ffb020 !important; color: #ffd666 !important; }
.mh { color: #00e5ff !important; letter-spacing: .2em !important; opacity: 1 !important; text-shadow: 0 0 6px rgba(0,229,255,.5); border-bottom: 1px solid rgba(0,229,255,.3); } .mh.we { color: #ff4d6d !important; text-shadow: 0 0 6px rgba(255,77,109,.5); }
.wk { color: #5fb8cc !important; font-family: inherit; }
.mc { border-radius: 2px !important; background: rgba(0,229,255,.05) !important; border: 1px solid rgba(0,229,255,.18) !important; color: #c8f7ff !important; }
.mc.today { background: rgba(0,229,255,.25) !important; border-color: #00e5ff !important; box-shadow: 0 0 10px rgba(0,229,255,.5); } .mc.today b { color: #fff !important; text-shadow: 0 0 6px #00e5ff; }
.mc.sel { outline: 2px solid #00e5ff !important; box-shadow: 0 0 10px rgba(0,229,255,.5); } .mc.we b, .mc.hol b { color: #ff4d6d !important; }
.mnav select { background: rgba(0,229,255,.08) !important; color: #c8f7ff !important; border: 1px solid rgba(0,229,255,.35) !important; border-radius: 3px !important; } .ib { border-radius: 3px !important; background: rgba(0,229,255,.08) !important; color: #00e5ff !important; border: 1px solid rgba(0,229,255,.3) !important; }
.ev { border-radius: 3px !important; }
.lk { border-radius: 3px !important; background: rgba(0,229,255,.06) !important; border: 1px solid rgba(0,229,255,.3) !important; color: #c8f7ff !important; box-shadow: none !important; }
.lk.glow { border-color: #ffb020 !important; box-shadow: 0 0 12px rgba(255,176,32,.5) !important; } .lk.alarm { background: rgba(255,77,109,.18) !important; border-color: #ff4d6d !important; color: #ffd0d8 !important; box-shadow: 0 0 12px rgba(255,77,109,.55) !important; }
.lk .i, .room .ic, .room .rico, .room [style*="border-radius:1"], .room header span:first-child { border-radius: 3px !important; background: rgba(0,229,255,.12) !important; color: #00e5ff !important; border: 1px solid rgba(0,229,255,.35); }
.lk .i ha-icon { color: #00e5ff !important; }
@keyframes lpulse { 50% { box-shadow: 0 0 0 8px rgba(0,229,255,.28); } } #sub.pv { border-radius: 4px !important; border: 1px solid #00e5ff !important; box-shadow: 0 0 24px rgba(0,229,255,.4) !important; } #popbd { background: rgba(0,6,12,.6); } .listen:focus, .listen:active, .mic:focus, .mic:active { outline: 0; } button { -webkit-tap-highlight-color: transparent; }
.listen { border-radius: 3px !important; background: rgba(0,229,255,.14) !important; color: #00e5ff !important; border: 1px solid #00e5ff !important; box-shadow: 0 0 12px rgba(0,229,255,.4); }
.room .bub, .room .top button, .met > *, .ok .b, .iss, .send { border-radius: 3px !important; background: rgba(0,229,255,.1) !important; color: #00e5ff !important; border: 1px solid rgba(0,229,255,.3); }
.iss.s1 { background: rgba(255,176,32,.14) !important; color: #ffd666 !important; border-color: rgba(255,176,32,.4); } .iss.s2 { background: rgba(255,77,109,.16) !important; color: #ff9fb0 !important; border-color: rgba(255,77,109,.45); }
.room .bub ha-icon { color: #00e5ff !important; }
.room .xx { border-radius: 3px !important; background: rgba(0,229,255,.07) !important; border: 1px solid rgba(0,229,255,.22); }
.status { border-radius: 4px !important; }
`;

// HUD "Aurora Glass": nowoczesny styl (miekkie szklo, gradientowy akcent, zaokraglone rogi, bez neonow); bez backdrop-filter (slaby tablet)
const HUD_SCH = [{id: 'aurora', n: 'Aurora', a: '#67e8f9', b: '#a78bfa', c: '#f472b6', la: '#0891b2', lb: '#7c3aed'}, {id: 'ocean', n: 'Ocean', a: '#60a5fa', b: '#22d3ee', c: '#818cf8', la: '#2563eb', lb: '#0891b2'},
  {id: 'forest', n: 'Las', a: '#6ee7b7', b: '#38bdf8', c: '#a3e635', la: '#059669', lb: '#0284c7'}, {id: 'sunset', n: 'Zachód', a: '#fdba74', b: '#f472b6', c: '#fb7185', la: '#ea580c', lb: '#db2777'},
  {id: 'rose', n: 'Róż', a: '#f9a8d4', b: '#c084fc', c: '#fda4af', la: '#db2777', lb: '#9333ea'}, {id: 'gold', n: 'Złoto', a: '#fcd34d', b: '#fb923c', c: '#f87171', la: '#d97706', lb: '#ea580c'},
  {id: 'mono', n: 'Grafit', a: '#e2e8f0', b: '#94a3b8', c: '#64748b', la: '#334155', lb: '#64748b'},
  // kolejne motywy; bg / lbg = opcjonalne tlo ciemne / jasne (domyslnie granatowe)
  {id: 'midnight', n: 'Północ', a: '#818cf8', b: '#6366f1', c: '#38bdf8', la: '#4f46e5', lb: '#2563eb', bg: '#080a1c', lbg: '#eceefb'},
  {id: 'violet', n: 'Fiolet', a: '#c4b5fd', b: '#a78bfa', c: '#e879f9', la: '#7c3aed', lb: '#a21caf', bg: '#0d0a1c', lbg: '#f1ecfb'},
  {id: 'sakura', n: 'Sakura', a: '#fbcfe8', b: '#f9a8d4', c: '#fde68a', la: '#be185d', lb: '#db2777', bg: '#160a12', lbg: '#fcecf3'},
  {id: 'crimson', n: 'Karmazyn', a: '#fb7185', b: '#f43f5e', c: '#fdba74', la: '#be123c', lb: '#e11d48', bg: '#14080c', lbg: '#fbecee'},
  {id: 'lava', n: 'Lawa', a: '#fb923c', b: '#ef4444', c: '#fbbf24', la: '#dc2626', lb: '#ea580c', bg: '#150a0a', lbg: '#fbefe9'},
  {id: 'copper', n: 'Miedź', a: '#fdba74', b: '#d97706', c: '#f59e0b', la: '#b45309', lb: '#92400e', bg: '#140e08', lbg: '#f8f0e6'},
  {id: 'olive', n: 'Oliwka', a: '#bef264', b: '#a3e635', c: '#fde047', la: '#4d7c0f', lb: '#65a30d', bg: '#0c1008', lbg: '#f1f5e6'},
  {id: 'mint', n: 'Mięta', a: '#5eead4', b: '#34d399', c: '#67e8f9', la: '#0d9488', lb: '#059669', bg: '#06130f', lbg: '#e9f7f2'},
  {id: 'arctic', n: 'Arktyka', a: '#bae6fd', b: '#7dd3fc', c: '#e0f2fe', la: '#0369a1', lb: '#0284c7', bg: '#07121c', lbg: '#eaf4fb'},
  {id: 'pulse', n: 'Pulse', a: '#67e8f9', b: '#a78bfa', c: '#f472b6', la: '#0e7490', lb: '#6d28d9', bg: '#050912', lbg: '#eceff8'},   // kolorystyka z Aurora Pulse (granat #050912 + turkus / fiolet / roz)
  {id: 'neon', n: 'Neon', a: '#4ade80', b: '#22d3ee', c: '#e879f9', la: '#16a34a', lb: '#0891b2', bg: '#050a10', lbg: '#e8f6ee'}];
const hudOn = (cfg) => { if (cfg && cfg.aurora) return true; try { const s = localStorage.getItem('pastel_style'); if (s === 'aurora') return true; if (s === 'pastel') return false; } catch (e) { /* ignore */ } return !!(cfg && cfg.hud); };   // styl wybierany na urzadzeniu (Ustawienia > Styl); bez wyboru: wg konfiguracji karty
const hudSch = () => { let k = ''; try { k = localStorage.getItem('hud_scheme') || ''; } catch (e) { /* ignore */ } return HUD_SCH.find((x) => x.id === k) || HUD_SCH[0]; };
const hudPal = (d) => { const S = hudSch(); return d ? {ink: '#eef2ff', ink2: '#94a3c4', t: 'rgba(255,255,255,.075)', b: 'rgba(255,255,255,.028)', bd: 'rgba(255,255,255,.10)', sh: '0 10px 30px rgba(0,0,0,.38), inset 0 1px 0 rgba(255,255,255,.07)', ch: 'rgba(255,255,255,.06)', ch2: 'rgba(255,255,255,.11)', a: S.a, a2: S.b, on: '#07131f', bg: S.bg || '#090c18', g1: S.a + '2b', g2: S.b + '33', g3: S.c + '1a', gd: '#34d399', wn: '#fbbf24', bad: '#fb7185'}
  : {ink: '#14203a', ink2: '#5b6a8a', t: 'rgba(255,255,255,.88)', b: 'rgba(255,255,255,.62)', bd: 'rgba(20,32,58,.08)', sh: '0 8px 26px rgba(40,60,120,.12), inset 0 1px 0 #fff', ch: 'rgba(20,32,58,.05)', ch2: 'rgba(20,32,58,.09)', a: S.la, a2: S.lb, on: '#ffffff', bg: S.lbg || '#eef1fa', g1: S.a + '60', g2: S.b + '4d', g3: S.c + '2e', gd: '#059669', wn: '#d97706', bad: '#e11d48'}; };
const hudMod = (d) => { const P = hudPal(d);
  const G = `linear-gradient(135deg, ${P.a}, ${P.a2})`;
  return `
:host, :host(.dark) { --bg1: ${P.bg}; --ink: ${P.ink}; --ink2: ${P.ink2}; --card: ${P.t}; --line: ${P.bd}; --chip: ${P.ch}; --shadow: ${P.sh}; --good: ${P.gd}; --warn: ${P.wn}; --bad: ${P.bad}; --info: ${P.a}; }
.app { font-family: 'Inter','SF Pro Display','Segoe UI',Roboto,system-ui,sans-serif !important; letter-spacing: 0 !important; color: ${P.ink};
  background: radial-gradient(700px 420px at 8% -8%, ${P.g1}, transparent 65%), radial-gradient(640px 460px at 100% 8%, ${P.g2}, transparent 65%), radial-gradient(700px 500px at 45% 112%, ${P.g3}, transparent 65%), ${P.bg} !important; }
#hudbg.sky .sk { position: absolute; inset: 0; transition: background 2s ease; }
#hudbg.sky .stz { position: absolute; inset: 0 0 30% 0; transition: opacity 3s; background-image: radial-gradient(1.6px 1.6px at 8% 14%, #fff, transparent), radial-gradient(1.2px 1.2px at 17% 38%, #cfe, transparent), radial-gradient(1.6px 1.6px at 26% 9%, #fff, transparent), radial-gradient(1.2px 1.2px at 34% 27%, #fff, transparent), radial-gradient(1.8px 1.8px at 45% 16%, #fff, transparent), radial-gradient(1.2px 1.2px at 53% 42%, #cfe, transparent), radial-gradient(1.6px 1.6px at 62% 11%, #fff, transparent), radial-gradient(1.2px 1.2px at 71% 30%, #fff, transparent), radial-gradient(1.8px 1.8px at 80% 8%, #fff, transparent), radial-gradient(1.2px 1.2px at 88% 35%, #cfe, transparent), radial-gradient(1.6px 1.6px at 94% 19%, #fff, transparent), radial-gradient(1.2px 1.2px at 40% 5%, #fff, transparent), radial-gradient(1.2px 1.2px at 12% 52%, #fff, transparent), radial-gradient(1.2px 1.2px at 76% 50%, #fff, transparent); }
#hudbg.sky .arz { position: absolute; inset: 0 0 35% 0; transition: opacity 3s; } #hudbg.sky .arz i { position: absolute; left: -25%; top: 2%; width: 150%; height: 42%; border-radius: 50%; animation: hsk1 26s ease-in-out infinite alternate; } #hudbg.sky .arz i.b { top: 22%; animation: hsk2 33s ease-in-out infinite alternate; }
@keyframes hsk1 { to { transform: translate3d(12%, 6%, 0) rotate(8deg) scale(1.1); } } @keyframes hsk2 { to { transform: translate3d(-14%, 4%, 0) rotate(-6deg) scale(1.12); } }
#hudbg.sky .cdz { position: absolute; inset: 0 0 30% 0; transition: opacity 3s; background: radial-gradient(34% 12% at 22% 24%, rgba(255,255,255,.5), transparent), radial-gradient(40% 13% at 70% 16%, rgba(255,255,255,.45), transparent), radial-gradient(30% 10% at 55% 40%, rgba(255,255,255,.35), transparent); }
#hudbg.sky .bdz { position: absolute; width: 190px; height: 190px; margin: -95px 0 0 -95px; border-radius: 50%; background: radial-gradient(closest-side, #fff3c4 0 16%, rgba(255,210,122,.55) 22%, rgba(255,190,90,.18) 55%, transparent 72%); transition: left 4s, top 4s, opacity 3s; } #hudbg.sky .bdz.mn { width: 150px; height: 150px; margin: -75px 0 0 -75px; background: radial-gradient(closest-side, #f4f8ff 0 22%, rgba(190,210,255,.5) 30%, rgba(150,180,255,.14) 62%, transparent 76%); }
#hudbg.sky .hl { position: absolute; left: 0; right: 0; bottom: 0; -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat; -webkit-mask-size: 100% 100%; mask-size: 100% 100%; transition: background 2s; }
#hudbg.sky .hl.h1 { height: 24%; -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http:%2F%2Fwww.w3.org%2F2000%2Fsvg' viewBox='0 0 100 100' preserveAspectRatio='none'%3E%3Cpath d='M0 55 C12 28 26 62 42 40 S70 12 82 38 S95 44 100 30 L100 100 L0 100Z'/%3E%3C/svg%3E"); mask-image: url("data:image/svg+xml,%3Csvg xmlns='http:%2F%2Fwww.w3.org%2F2000%2Fsvg' viewBox='0 0 100 100' preserveAspectRatio='none'%3E%3Cpath d='M0 55 C12 28 26 62 42 40 S70 12 82 38 S95 44 100 30 L100 100 L0 100Z'/%3E%3C/svg%3E"); }
#hudbg.sky .hl.h2 { height: 14%; -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http:%2F%2Fwww.w3.org%2F2000%2Fsvg' viewBox='0 0 100 100' preserveAspectRatio='none'%3E%3Cpath d='M0 40 C18 62 34 18 55 38 S88 60 100 24 L100 100 L0 100Z'/%3E%3C/svg%3E"); mask-image: url("data:image/svg+xml,%3Csvg xmlns='http:%2F%2Fwww.w3.org%2F2000%2Fsvg' viewBox='0 0 100 100' preserveAspectRatio='none'%3E%3Cpath d='M0 40 C18 62 34 18 55 38 S88 60 100 24 L100 100 L0 100Z'/%3E%3C/svg%3E"); }
h2 { color: ${P.ink2} !important; text-shadow: none !important; letter-spacing: .14em !important; font-size: 12px !important; font-weight: 700 !important; text-transform: uppercase; border: 0 !important; padding: 0 0 2px 4px !important; }
.card, .big, .room, .hero, .nav, .air, .fu, .cal, .as, .status { border-radius: 22px !important; background: linear-gradient(160deg, ${P.t}, ${P.b}) !important; border: 1px solid ${P.bd} !important; box-shadow: ${P.sh} !important; color: ${P.ink} !important; }
.hero { background: linear-gradient(135deg, ${P.g1}, ${P.g2} 60%, ${P.g3}), linear-gradient(160deg, ${P.t}, ${P.b}) !important; }
.hero:after { background: radial-gradient(circle, ${P.g2}, transparent 70%) !important; }
.time { color: ${P.ink} !important; text-shadow: none !important; font-weight: 300 !important; letter-spacing: -.02em !important; }
.status { background: linear-gradient(160deg, ${P.gd}22, ${P.b}) !important; }
.status.sv1 { background: linear-gradient(160deg, ${P.wn}2a, ${P.b}) !important; } .status.sv2 { background: linear-gradient(160deg, ${P.bad}2a, ${P.b}) !important; }
.wx .ic, .tg, .mini span, .lk .i, .room .ic, .room .rico, .room [style*="border-radius:1"], .room header span:first-child, .room .bub, .room .top button, .met > *, .ok .b, .send, .hdr .bub, .bub, .back, .ib { border-radius: 14px !important; background: ${P.ch2} !important; color: ${P.a} !important; border: 0 !important; box-shadow: none !important; }
.dev, .chips button, .chipb, .pill, .seg, .seg button, .tv, .ctl button, .lk, .wash, .atg, .wh, .whs > div, .whs > *, .chclr, .chst, .pipesel select, .mnav select, .room .xx, .iss, .m { border-radius: 14px !important; background: ${P.ch} !important; border: 1px solid ${P.bd} !important; color: ${P.ink} !important; box-shadow: none !important; text-shadow: none !important; }
.seg { border-radius: 16px !important; padding: 3px; } .seg button { border: 0 !important; background: transparent !important; }
.dev.on, .dev.act, .seg button.act, .chips button.act, .tv.act, .m.u, .isb.on, .mic2.on, .p2tg button.on, .nav button.act { background: ${G} !important; border-color: transparent !important; color: ${P.on} !important; box-shadow: 0 6px 18px ${P.g2} !important; outline: 0 !important; font-weight: 700; }
.atg.on { background: ${P.g1} !important; border: 1px solid ${P.a} !important; color: ${P.a} !important; box-shadow: 0 0 10px ${P.g2} !important; } .atg.on ha-icon { color: ${P.a} !important; }   /* aktywna automatyka pokoju: ikona w kolorze akcentu motywu */
.nav { border-radius: 26px !important; } .nav button { border-radius: 20px !important; } .nav button.act ha-icon, .dev.on ha-icon, .tv.act ha-icon, .tv.act em { color: ${P.on} !important; }
.dev ha-icon, .room ha-icon, .big ha-icon, .tv ha-icon, .ctl button ha-icon, .wash ha-icon, .lk .i ha-icon, .room .bub ha-icon, .hdr .bub ha-icon, .bub ha-icon, .back ha-icon { color: ${P.a} !important; }
.ht { color: ${P.ink} !important; text-transform: none !important; letter-spacing: -.01em !important; text-shadow: none !important; font-weight: 700; font-size: 1.25em; }
.isn, .isn span, .isn b { color: ${P.ink} !important; text-shadow: none !important; text-transform: none !important; letter-spacing: 0 !important; }
.isb { border-radius: 12px !important; background: ${P.ch2} !important; color: ${P.a} !important; border: 0 !important; } .isb.warn { background: ${P.wn}26 !important; color: ${P.wn} !important; } .isb.run { background: ${P.gd}26 !important; color: ${P.gd} !important; }
.wx .d, .wx .t { color: ${P.ink} !important; text-shadow: none !important; } .hi, .date, .hero .hi, .hero .date { color: ${P.ink2} !important; } .mini span, .mini small, .hint, .cm, .wk, .tv em { color: ${P.ink2} !important; }
.bar { background: ${P.ch2} !important; border-radius: 99px !important; }
.m { border: 0 !important; } .m.a { background: ${P.ch} !important; }
.inp input, .mnav select { border-radius: 14px !important; background: ${P.ch} !important; border: 1px solid ${P.bd} !important; color: ${P.ink} !important; } .inp input:focus { border-color: ${P.a} !important; box-shadow: 0 0 0 3px ${P.g1} !important; }
.mic2, .send, .listen { border-radius: 99px !important; background: ${G} !important; color: ${P.on} !important; border: 0 !important; box-shadow: 0 6px 18px ${P.g2} !important; } .listen ha-icon, .send ha-icon, .mic2 ha-icon { color: ${P.on} !important; }
.ok, .ok .b { color: ${P.gd} !important; } .ok .b { background: ${P.gd}22 !important; }
.iss.s1 { background: ${P.wn}22 !important; color: ${P.wn} !important; border-color: transparent !important; } .iss.s2 { background: ${P.bad}22 !important; color: ${P.bad} !important; border-color: transparent !important; }
.lk.glow { box-shadow: 0 0 0 1.5px ${P.wn} inset !important; } .lk.alarm { background: ${P.bad}22 !important; box-shadow: 0 0 0 1.5px ${P.bad} inset !important; color: ${P.ink} !important; }
.hero .hr { background: ${d ? 'rgba(10,16,40,.55)' : 'rgba(255,255,255,.82)'} !important; color: ${P.ink} !important; } .hero .hr small { opacity: .9 !important; color: inherit !important; } .hero .hr { border-radius: 14px !important; } .hero .hr ha-icon, .hero .hr.s1 ha-icon, .hero .hr.s0 ha-icon { color: ${d ? '#fff3c0' : '#7a5a00'} !important; } .hero .hr.s0 ha-icon { color: ${d ? P.a : P.ink2} !important; }
.hero .hr.s1 { background: ${d ? 'rgba(150,115,0,.9)' : '#ffe9a8'} !important; color: ${d ? '#fff3c0' : '#5c4300'} !important; box-shadow: inset 0 0 0 1px ${d ? 'rgba(255,210,63,.7)' : '#e0b43a'} !important; }
.iss.s1 { color: ${d ? '#fff3c0' : '#6b4a00'} !important; background: ${d ? 'rgba(150,115,0,.85)' : '#ffe9a8'} !important; } .iss.s2 { color: ${d ? P.bad : '#8a1230'} !important; background: ${d ? P.bad + '22' : '#ffc3cf'} !important; }
.wwarn { border-radius: 16px !important; box-shadow: none !important; border: 1px solid ${d ? 'rgba(255,255,255,.14)' : 'rgba(0,0,0,.08)'} !important; background: ${d ? 'rgba(63,178,127,.20)' : '#d9f3e6'} !important; color: ${d ? '#9ff0c8' : '#0f5f3c'} !important; }
.wwarn.lv1 { background: ${d ? 'rgba(150,115,0,.9)' : '#ffe9a8'} !important; color: ${d ? '#fff3c0' : '#5c4300'} !important; border-color: ${d ? 'rgba(255,210,63,.7)' : '#e0b43a'} !important; }
.wwarn.lv2 { background: ${d ? 'rgba(255,140,50,.24)' : '#ffd2b0'} !important; color: ${d ? '#ffc08a' : '#7a3000'} !important; border-color: ${d ? 'rgba(255,140,50,.55)' : '#e8803a'} !important; }
.wwarn.lv3, .wwarn.lv4 { background: ${d ? 'rgba(255,80,110,.26)' : '#ffc3cf'} !important; color: ${d ? '#ffb3c1' : '#7a0f28'} !important; border-color: ${d ? 'rgba(255,80,110,.6)' : '#e0506b'} !important; }
.wwarn b, .wwarn ha-icon, .wwarn span, .wwarn p { color: inherit !important; opacity: 1 !important; } .wwarn b { font-weight: 800 !important; } .wwarn span, .wwarn p { font-weight: 700 !important; } .wash.run { background: ${P.wn}22 !important; color: ${P.wn} !important; border-color: transparent !important; } .wash.end { background: ${P.gd}22 !important; color: ${P.gd} !important; border-color: transparent !important; }
.mh { color: ${P.ink2} !important; letter-spacing: .1em !important; text-shadow: none !important; border-bottom: 0 !important; } .mh.we { color: ${P.bad} !important; text-shadow: none !important; }
.mc { border-radius: 12px !important; background: ${P.ch} !important; border: 0 !important; color: ${P.ink} !important; } .mc.today { background: ${G} !important; box-shadow: none !important; color: ${P.on} !important; } .mc.today b { color: ${P.on} !important; text-shadow: none !important; } .mc.sel { outline: 2px solid ${P.a} !important; box-shadow: none !important; } .mc.we b, .mc.hol b { color: ${P.bad} !important; }
.ev, .mon, .p3h, .p2tg, .fu .tr, .fu .fuc, .fuc, .room .bub { border-radius: 14px !important; } .p2tg { border: 1px solid ${P.bd} !important; }
#sub.pv { border-radius: 24px !important; border: 1px solid ${P.bd} !important; box-shadow: 0 24px 60px rgba(0,0,0,.45) !important; }
.air circle[stroke='#00e5ff'], .air circle[stroke='#008ba3'] { filter: none !important; } #hudbg .rx { display: none !important; } #hudbg .au { position: absolute; inset: 0; } #hudbg .au svg { width: 100%; height: 100%; display: block; } #hudbg .vi { color: ${P.a} !important; opacity: ${d ? .05 : .07} !important; filter: none !important; }
.fx .sun, .fx .moon, .fx .st, .fx .sn, .fx .hl { filter: none !important; }
#alloff, .lk.lkm { border-radius: 99px !important; background: ${P.wn}24 !important; color: ${P.wn} !important; border: 1px solid ${P.wn}55 !important; box-shadow: none !important; } #alloff ha-icon, .lk.lkm ha-icon, .lk.lkm .i ha-icon { color: ${P.wn} !important; } .lk.lkm .i { background: ${P.wn}2e !important; }
.devs.sh-sq .dev { border-radius: 18px !important; } .devs.sh-ci .dev { border-radius: 50% !important; } .devs.sh-pi .dev { border-radius: 99px !important; }
/* wiecej gradientow (statyczne, bez blur/animacji - lekkie dla tab10) */
.room { background: linear-gradient(150deg, ${P.g1} 0%, transparent 55%), linear-gradient(160deg, ${P.t}, ${P.b}) !important; }
.air { background: linear-gradient(150deg, ${P.g3} 0%, transparent 60%), linear-gradient(210deg, ${P.g2} 0%, transparent 50%), linear-gradient(160deg, ${P.t}, ${P.b}) !important; }
.fu { background: linear-gradient(150deg, ${P.g2} 0%, transparent 58%), linear-gradient(160deg, ${P.t}, ${P.b}) !important; }
.cal { background: linear-gradient(200deg, ${P.g1} 0%, transparent 55%), linear-gradient(20deg, ${P.g3} 0%, transparent 45%), linear-gradient(160deg, ${P.t}, ${P.b}) !important; }
.big, .card, .as { background: linear-gradient(145deg, ${P.g3} 0%, transparent 60%), linear-gradient(160deg, ${P.t}, ${P.b}) !important; }
.nav { background: linear-gradient(90deg, ${P.g1}, ${P.g2} 50%, ${P.g3}), linear-gradient(160deg, ${P.t}, ${P.b}) !important; }
.dev:not(.on):not(.act), .lk:not(.alarm):not(.glow), .wash:not(.run):not(.end) { background: linear-gradient(145deg, ${P.ch2}, ${P.ch}) !important; }
.ok .b, .wx .ic, .mini span, .tg { background: linear-gradient(135deg, ${P.g1}, ${P.g2}) !important; }
.hero .hr:not(.s1) { background: linear-gradient(120deg, ${P.g1}, ${d ? 'rgba(10,16,40,.55)' : 'rgba(255,255,255,.82)'} 70%) !important; }
${hudSky()}
${LEAF_CSS}
`; };


// realistyczna pogoda w stylu Aurora: niebo (gradient) zalezne od warunkow i pory dnia, naturalne slonce/ksiezyc/chmury/deszcz/snieg
const HUD_SKY = {sunny: ['#2f80d1', '#7cc0f0', '#0b1330', '#1b2a5c'], 'clear-night': ['#0b1330', '#1b2a5c', '#0b1330', '#1b2a5c'], partlycloudy: ['#4a8fd0', '#9cc4e4', '#141c3d', '#2a3560'], windy: ['#4a8fd0', '#9cc4e4', '#141c3d', '#2a3560'], 'windy-variant': ['#5b8fbf', '#a9c6dd', '#141c3d', '#2a3560'],
  cloudy: ['#6b7b8c', '#9aa7b4', '#1a202c', '#2d3544'], rainy: ['#4a5a6c', '#7487a0', '#121826', '#232c3d'], pouring: ['#36424f', '#566679', '#0d121b', '#1b2230'], lightning: ['#2c3340', '#4a5366', '#0a0d16', '#171c2a'], 'lightning-rainy': ['#2c3340', '#4a5366', '#0a0d16', '#171c2a'],
  snowy: ['#8fa6bd', '#c8d6e4', '#1f2a3b', '#3a4a60'], 'snowy-rainy': ['#6f8296', '#a3b3c3', '#1b2433', '#313f52'], hail: ['#4a5868', '#7b8b9c', '#121826', '#252f40'], fog: ['#9aa5ad', '#c3cacf', '#262b33', '#3d434b']};
const hudSky = () => { let c = '';
  Object.keys(HUD_SKY).forEach((k) => { const s = HUD_SKY[k]; c += `.hero:has(.fx.w-${k}) { background: linear-gradient(165deg, ${s[0]}, ${s[1]}) !important; } .hero:has(.fx.w-${k}.nt) { background: linear-gradient(165deg, ${s[2]}, ${s[3]}) !important; }\n`; });
  return c + `.hero:has(.fx) { color: #fff !important; } .hero:has(.fx):after { display: none !important; } .hero:has(.fx) :is(.hi, .date, .time, .t, .d, .mini span, .mini small, .wx .t, .wx .d, b) { color: #fff !important; text-shadow: 0 1px 6px rgba(0,0,0,.25) !important; } .hero:has(.fx) :is(.wx .ic, .tg, .mini span, .pill) { background: rgba(255,255,255,.2) !important; color: #fff !important; } .hero:has(.fx) ha-icon { color: #fff !important; }
.fx .sun { background: radial-gradient(circle, #fffbe0 0 16%, rgba(255,226,120,.85) 17% 34%, rgba(255,200,80,.30) 35% 55%, rgba(255,200,80,0) 72%) !important; box-shadow: 0 0 70px rgba(255,210,100,.55) !important; }
.fx .moon { color: #f6f2dc !important; filter: drop-shadow(0 0 14px rgba(246,242,220,.55)) !important; }
.fx .st { background: #fff !important; box-shadow: 0 0 5px rgba(255,255,255,.9) !important; }
.fx .cl, :host(.dark) .fx .cl { background: radial-gradient(ellipse at 50% 58%, rgba(255,255,255,.88) 0 42%, rgba(255,255,255,0) 72%) !important; filter: blur(1.5px) !important; border: 0; }
.fx.dk .cl, :host(.dark) .fx.dk .cl { background: radial-gradient(ellipse at 50% 58%, rgba(95,106,122,.85) 0 42%, rgba(95,106,122,0) 72%) !important; }
.fx.nt .cl, :host(.dark) .fx.nt .cl { background: radial-gradient(ellipse at 50% 58%, rgba(70,82,110,.7) 0 42%, rgba(70,82,110,0) 72%) !important; } .fx.dk.nt .cl, :host(.dark) .fx.dk.nt .cl { background: radial-gradient(ellipse at 50% 58%, rgba(28,34,48,.85) 0 42%, rgba(28,34,48,0) 72%) !important; }
.fx .dr, :host(.dark) .fx .dr { width: 1.6px !important; background: linear-gradient(transparent, rgba(205,225,255,.8)) !important; box-shadow: none !important; }
.fx .sn { background: #fff !important; box-shadow: 0 0 5px rgba(255,255,255,.8) !important; } .fx .hl { background: #eef6ff !important; box-shadow: none !important; }
.fx .fg, :host(.dark) .fx .fg { background: linear-gradient(90deg, transparent, rgba(255,255,255,.42), transparent) !important; }
.fx .fl, :host(.dark) .fx .fl { background: rgba(255,255,255,.75) !important; }
`; };
// zmienne motywu HA dla stylu Aurora (okna dialogowe, naglowek, listy) - nakladane na <html> zamiast motywu Pastela
const hudHa = (d) => { const P = hudPal(d), o = {};
  const S0 = hudSch(), bg = d ? (S0.bg ? S0.bg : '#0b0f1e') : (S0.lbg ? S0.lbg : '#f4f6fc'), sf = d ? (S0.bg ? `color-mix(in srgb, ${bg} 90%, #fff)` : '#141a30') : '#ffffff', sf2 = d ? (S0.bg ? `color-mix(in srgb, ${bg} 84%, #fff)` : '#1b2340') : (S0.lbg ? bg : '#eef1fa'), ln = d ? (S0.bg ? `color-mix(in srgb, ${bg} 78%, #fff)` : '#262f50') : (S0.lbg ? `color-mix(in srgb, ${bg} 90%, #000)` : '#dbe1f0');
  Object.assign(o, {'primary-color': P.a, 'accent-color': P.a, 'primary-background-color': bg, 'secondary-background-color': sf, 'card-background-color': sf, 'app-header-background-color': bg, 'app-header-text-color': P.ink, 'primary-text-color': P.ink, 'secondary-text-color': P.ink2,
    'dialog-background-color': sf, 'mdc-theme-surface': sf, 'mdc-theme-on-surface': P.ink, 'divider-color': ln, 'state-icon-color': P.a, 'state-active-color': P.a, 'state-icon-active-color': P.a, 'sidebar-background-color': bg, 'sidebar-text-color': P.ink, 'sidebar-icon-color': P.ink2, 'sidebar-selected-icon-color': P.a, 'sidebar-selected-text-color': P.a,
    'input-fill-color': sf2, 'input-ink-color': P.ink, 'mdc-select-fill-color': sf2, 'mdc-text-field-fill-color': sf2, 'mdc-text-field-ink-color': P.ink, 'paper-listbox-background-color': sf, 'mdc-menu-surface-fill-color': sf, 'md-sys-color-surface': sf, 'md-sys-color-surface-container': sf2, 'md-sys-color-surface-container-high': sf2, 'md-sys-color-on-surface': P.ink, 'md-sys-color-on-surface-variant': P.ink2, 'md-sys-color-outline': ln,
    'wa-color-surface-default': sf, 'wa-color-surface-raised': sf2, 'wa-color-surface-lowered': bg, 'wa-color-surface-border': ln, 'wa-color-text-normal': P.ink, 'wa-color-text-quiet': P.ink2, 'wa-color-focus': P.a, 'ha-dialog-border-radius': '24px', 'ha-card-border-radius': '22px', 'paper-font-common-base_-_font-family': "'Inter',system-ui,sans-serif", 'ha-font-family-body': "'Inter',system-ui,sans-serif",
    'success-color': P.gd, 'warning-color': P.wn, 'error-color': P.bad, 'info-color': P.a});
  return o; };
// jasny HUD: reguly ciemnego HUD przeliczone na jasna palete (kolory neonowe -> ciemny teal / statusy)
const HUD_LIGHTX = (() => { const M = [[/rgba\(0,229,255,/g, 'rgba(0,170,200,'], [/#00e5ff/gi, '#008ba3'], [/#c8f7ff/gi, '#06303c'], [/#eaffff/gi, '#022a35'], [/#5fb8cc/gi, '#3f7888'], [/#(?:fff|ffffff)\b/gi, '#06303c'], [/#(?:bffaff|7df3ff)/gi, '#008ba3'],
  [/#3dffb0/gi, '#1aa772'], [/rgba\(61,255,176,/g, 'rgba(26,167,114,'], [/#ffb020/gi, '#d98a00'], [/rgba\(255,176,32,/g, 'rgba(217,138,0,'], [/#ffd666/gi, '#7a4d00'], [/#ffd23f/gi, '#c9a000'], [/#ffe27a/gi, '#7a5f00'], [/rgba\(255,210,63,/g, 'rgba(201,160,0,'],
  [/#ff8a1f/gi, '#e07000'], [/#ffb066/gi, '#8a4600'], [/rgba\(255,138,31,/g, 'rgba(224,112,0,'], [/#ff4d6d/gi, '#d92e52'], [/rgba\(255,77,109,/g, 'rgba(217,46,82,'], [/#(?:ff9fb0|ffd0d8)/gi, '#8a1230']];
  let c = HUD_CSS.slice(HUD_CSS.indexOf('.atg {')); M.forEach((m) => { c = c.replace(m[0], m[1]); }); return c; })();

// schemat Jesien: cieple tla i akcenty (rdza, bursztyn, braz) dokladane po obrocie barw
const AUT_CSS = `
:host(.aut:not(.dark)) { --bg1: #fff3e3; --bg2: #ffe6cc; --bg3: #fff0dc; --ink: #4a2a14; --ink2: #8a6040; --line: rgba(160,90,40,.2); --shadow: 0 6px 24px rgba(170,90,30,.15); }
:host(.aut.dark) { --bg1: #1d120b; --bg2: #2a1a0f; --bg3: #1b110a; --ink: #ffeedd; --ink2: #c9a27e; --line: rgba(255,170,100,.16); }
:host(.aut:not(.dark)) .hero { background: linear-gradient(135deg, #ffe2b5 0%, #ffc48a 55%, #f0976b 100%); color: #4a2410; }
:host(.aut.dark) .hero { background: linear-gradient(135deg, #5b2a12 0%, #7d3a16 55%, #8f5a1c 100%); color: #fff1de; }
:host(.aut) .listen, :host(.aut) .send { background: linear-gradient(135deg, #ffb25e, #e5683f); color: #fff; }
:host(.aut) .nav button.act { background: linear-gradient(135deg, #ffcf94, #f5a779); color: #4a2410; }
:host(.aut.dark) .nav button.act { color: #3a1c08; }
:host(.aut) .seg button.act, :host(.aut) .chips button.act, :host(.aut) .sch button.act, :host(.aut) .p2tg button.on { background: linear-gradient(135deg, #ffd9a0, #ffb07a); color: #4a2410; }
`;
// schemat Zima: lodowe biele i granat (jasny), polarna noc ze sniezna poswiata (ciemny); pasuje do efektu padajacego sniegu
const WNT_CSS = `
:host(.wnt:not(.dark)) { --bg1: #eef6fd; --bg2: #dcebf8; --bg3: #e9f3fb; --ink: #12304a; --ink2: #5a7d98; --line: rgba(60,120,180,.2); --shadow: 0 6px 24px rgba(50,110,170,.16); }
:host(.wnt.dark) { --bg1: #0b1622; --bg2: #11233a; --bg3: #0a1420; --ink: #e8f4ff; --ink2: #8db2cf; --line: rgba(150,200,255,.17); }
:host(.wnt:not(.dark)) .hero { background: linear-gradient(135deg, #f4fbff 0%, #cfe6f8 55%, #9cc7ec 100%); color: #12304a; }
:host(.wnt.dark) .hero { background: linear-gradient(135deg, #12304f 0%, #1c4a76 55%, #2f6ea3 100%); color: #eaf6ff; box-shadow: inset 0 0 40px rgba(180,220,255,.12); }
:host(.wnt) .listen, :host(.wnt) .send { background: linear-gradient(135deg, #8fd0ff, #4f8fe0); color: #fff; }
:host(.wnt) .nav button.act { background: linear-gradient(135deg, #d6ecff, #9fcdf2); color: #12304a; }
:host(.wnt.dark) .nav button.act { color: #0b2338; }
:host(.wnt) .seg button.act, :host(.wnt) .chips button.act, :host(.wnt) .sch button.act, :host(.wnt) .p2tg button.on { background: linear-gradient(135deg, #e0f1ff, #a8d3f5); color: #12304a; }
:host(.wnt.dark) .card { box-shadow: 0 6px 24px rgba(0,0,0,.35), inset 0 1px 0 rgba(200,230,255,.08); }
`;
// spadajace liscie (Ustawienia > Spadajace liscie): tylko transform, bez blokowania dotyku
const LEAF_CSS = `
#leaves { position: fixed; inset: 0; z-index: 3; pointer-events: none; overflow: hidden; }
#leaves i { position: absolute; top: -50px; display: block; will-change: transform; animation: lfall linear infinite; }
#leaves b { display: block; width: 100%; height: 100%; will-change: transform; animation: lsway ease-in-out infinite; }
#leaves svg { width: 100%; height: 100%; display: block; opacity: .88; filter: drop-shadow(0 1px 1px rgba(60,25,5,.25)); }
#leaves.snow b { border-radius: 50%; background: #fff; border: 1px solid rgba(140,185,230,.75); box-shadow: 0 0 4px rgba(255,255,255,.9), 0 0 2px rgba(80,130,190,.5); animation-name: lsway2; }
@keyframes lfall { from { transform: translate3d(0, -60px, 0); } to { transform: translate3d(var(--dx, 40px), calc(100vh + 70px), 0); } }
@keyframes lsway { 0%, 100% { transform: translateX(-16px) rotate(-30deg); } 50% { transform: translateX(16px) rotate(40deg); } }
@keyframes lsway2 { 0%, 100% { transform: translateX(-10px); } 50% { transform: translateX(10px); } }
#piles { position: fixed; left: 0; right: 0; bottom: 0; height: 60px; z-index: 3; pointer-events: none; overflow: hidden; }
#piles .mnd { position: absolute; bottom: -3px; transform-origin: 50% 100%; transform: scaleY(.04); transition: transform 9s linear; border-radius: 50% 50% 0 0 / 100% 100% 0 0; will-change: transform; }
#piles .mnd.leaves, #cleaner .ahd.leaves { background: radial-gradient(circle at 22% 38%, #f2b134 0 9%, transparent 10%), radial-gradient(circle at 58% 28%, #e8793a 0 10%, transparent 11%), radial-gradient(circle at 80% 52%, #c98b2b 0 9%, transparent 10%), radial-gradient(circle at 42% 62%, #d4572a 0 9%, transparent 10%), linear-gradient(#c8541e, #7d2c10); box-shadow: 0 -2px 4px rgba(60,25,5,.25); }
#piles .mnd.snow, #cleaner .ahd.snow { background: linear-gradient(#ffffff, #d6e6f4); box-shadow: 0 -2px 6px rgba(255,255,255,.7), 0 0 3px rgba(80,130,190,.45); }
#cleaner { position: fixed; bottom: 0; left: 0; width: 90px; height: 64px; z-index: 4; pointer-events: none; animation: cwalk linear forwards; will-change: transform; }
#cleaner svg { width: 100%; height: 100%; display: block; overflow: visible; }
#cleaner .ln { transform-origin: 43px 60px; animation: lean 1.3s ease-in-out infinite; } #cleaner.leaves .ln { animation: lean2 .9s ease-in-out infinite alternate; }
#cleaner .bd { animation: bob .45s ease-in-out infinite; }
#cleaner .lg { transform-box: fill-box; transform-origin: 50% 0; animation: lgsw .45s ease-in-out infinite alternate; } #cleaner .l2 { animation-direction: alternate-reverse; }
#cleaner .gust { animation: gust .45s ease-out infinite; } #cleaner .blw { transform-origin: 44px 27px; animation: blw .7s ease-in-out infinite alternate; } #cleaner .shv { transform-origin: 44px 27px; animation: shv 1.3s ease-in-out infinite; }
#cleaner .ahd { position: absolute; left: 66px; bottom: -3px; width: 36px; height: 26px; border-radius: 50% 50% 0 0 / 100% 100% 0 0; transform-origin: 0 100%; transform: scale(.05); transition: transform .5s ease-out; }
#cleaner .bl { position: absolute; left: 76px; bottom: 14px; width: 8px; height: 8px; border-radius: 60% 0 60% 0; animation: lpuff .8s ease-out forwards; } #cleaner .bl.snow { border-radius: 50%; background: #fff !important; box-shadow: 0 0 3px rgba(90,140,200,.7); }
@keyframes cwalk { from { transform: translateX(-140px); } to { transform: translateX(calc(100vw + 140px)); } }
@keyframes lgsw { from { transform: rotate(-26deg); } to { transform: rotate(26deg); } }
@keyframes bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-1.6px); } }
@keyframes lean { 0%, 100% { transform: rotate(0); } 40%, 55% { transform: rotate(7deg); } 80% { transform: rotate(-3deg); } }
@keyframes lean2 { from { transform: rotate(1deg); } to { transform: rotate(5deg); } }
@keyframes blw { from { transform: rotate(-5deg); } to { transform: rotate(6deg); } }
@keyframes shv { 0%, 100% { transform: rotate(-3deg) translate(0, 0); } 40%, 55% { transform: rotate(5deg) translate(6px, 0); } 80% { transform: rotate(-28deg) translate(3px, -7px); } }
@keyframes gust { 0% { opacity: 0; transform: translateX(-4px); } 40% { opacity: 1; } 100% { opacity: 0; transform: translateX(10px); } }
.pf { position: fixed; bottom: 14px; z-index: 4; pointer-events: none; width: 9px; height: 9px; animation: lpuff 1.1s ease-out forwards; }
.pf.leaves { border-radius: 60% 0 60% 0; } .pf.snow { border-radius: 50%; background: #fff !important; box-shadow: 0 0 3px rgba(90,140,200,.7); }
@keyframes lpuff { from { transform: translate(0, 0) rotate(0); opacity: 1; } to { transform: translate(var(--px, 60px), var(--py, -50px)) rotate(var(--rt, 200deg)); opacity: 0; } }
.fxcd { display: flex; align-items: center; gap: 8px; margin-top: 10px; padding-top: 10px; border-top: 1px dashed rgba(128,128,128,.35); font-size: 13px; opacity: .85; } .fxcd ha-icon { --mdc-icon-size: 18px; flex: none; } .fxcd .fxgo { border: 0; background: rgba(128,128,128,.18); color: inherit; border-radius: 50%; width: 30px; height: 30px; display: grid; place-items: center; cursor: pointer; padding: 0; }
/* ===== Aurora: waski ekran (.app.an) - dolny pasek nawigacji; tablet w pionie 600-899 px: uklad dwukolumnowy ===== */
.app.an { padding-bottom: 96px; }
#bnav { position: fixed; left: 50%; bottom: 10px; transform: translateX(-50%); z-index: 30; display: flex; gap: 2px; width: min(520px, calc(100% - 20px)); box-sizing: border-box; padding: 6px; border-radius: 22px; background: color-mix(in srgb, var(--card) 88%, #000); border: 1px solid var(--line); box-shadow: 0 8px 28px rgba(0,0,0,.35); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); }
#bnav button { position: relative; flex: 1; min-width: 0; display: flex; flex-direction: column; align-items: center; gap: 2px; border: 0; border-radius: 16px; padding: 7px 2px 6px; background: transparent; color: var(--ink2); font: inherit; font-size: 11px; font-weight: 700; cursor: pointer; }
#bnav button ha-icon { --mdc-icon-size: 23px; } #bnav button.on { background: color-mix(in srgb, var(--info) 22%, transparent); color: var(--ink); } #bnav button.on ha-icon { color: var(--info); }
#bnav button i { display: none; position: absolute; top: 5px; right: calc(50% - 20px); width: 9px; height: 9px; border-radius: 50%; background: #e0a420; box-shadow: 0 0 8px 1px rgba(224,164,32,.8); } #bnav button.nw i { display: block; }
.app.an .hdr .hclk { display: none !important; }
@media (max-width: 599px) { .app.an #s-hero .hi { display: none; } .app.an #s-hero .time { font-size: 46px; } }
#bsh { position: fixed; inset: 0; z-index: 40; display: flex; flex-direction: column; justify-content: flex-end; } #bsh .bsd { position: absolute; inset: 0; background: rgba(0,0,0,.5); animation: bsf .2s ease-out; } #bsh .bsp { position: relative; padding: 8px 16px 22px; border-radius: 26px 26px 0 0; background: linear-gradient(color-mix(in srgb, var(--info) 8%, transparent), color-mix(in srgb, var(--info) 8%, transparent)), color-mix(in srgb, var(--bg1, #0b1220) 76%, transparent); backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px); border: 1px solid var(--line); border-bottom: 0; box-shadow: 0 -10px 36px rgba(0,0,0,.45); animation: bsu .25s cubic-bezier(.2,.8,.2,1); max-width: 560px; width: 100%; box-sizing: border-box; margin: 0 auto; }
#bsh[data-k="events"] .bsp { max-height: 52vh; overflow-y: auto; } #bsh .bsg { width: 44px; height: 5px; border-radius: 3px; background: var(--ink2); opacity: .5; margin: 4px auto 10px; } #bsh .bst { font-size: 13px; letter-spacing: .12em; text-transform: uppercase; font-weight: 800; color: var(--ink2); padding: 0 4px 10px; }
#bsh .bsl { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; } #bsh .bsl button { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 7px; min-height: 84px; border: 1px solid var(--line); border-radius: 18px; background: color-mix(in srgb, var(--info) 8%, transparent); color: var(--ink); font: inherit; font-size: 13px; font-weight: 700; cursor: pointer; padding: 8px 4px; } #bsh .bsl button ha-icon { --mdc-icon-size: 28px; color: var(--info); } #bsh .bsl button.al { background: color-mix(in srgb, var(--warn) 16%, transparent); } #bsh .bsl button.al ha-icon { color: var(--warn); }
#bsh .bsl.rm { grid-template-columns: repeat(2, minmax(0, 1fr)); } #bsh .bsl button.rmt { align-items: stretch; justify-content: flex-start; gap: 4px; padding: 12px 12px 10px; text-align: left; min-height: 112px; } #bsh .rmt .rh { display: flex; align-items: center; gap: 8px; } #bsh .rmt .rh ha-icon { --mdc-icon-size: 24px; } #bsh .rmt .rh b { font-size: 15px; font-weight: 800; } #bsh .rmt .rs { display: flex; align-items: center; gap: 6px; font-size: 11.5px; font-weight: 600; opacity: .8; } #bsh .rmt .rs i { width: 8px; height: 8px; border-radius: 50%; background: var(--line); } #bsh .rmt .rs i.pd { background: var(--good); box-shadow: 0 0 6px var(--good); } #bsh .rmt .rv { display: flex; gap: 14px; margin-top: auto; align-items: baseline; } #bsh .rmt .rv em { font-style: normal; font-size: 24px; font-weight: 800; line-height: 1; } #bsh .rmt .rv em small { font-size: 12px; font-weight: 700; opacity: .7; margin-left: 2px; }
#bsh .bev { display: flex; flex-direction: column; gap: 6px; max-height: 52vh; overflow-y: auto; scrollbar-width: none; } #bsh .bev .ev { display: flex; gap: 12px; align-items: center; padding: 8px 10px; border-radius: 14px; border: 1px solid var(--line); background: color-mix(in srgb, var(--info) 6%, transparent); } #bsh .bev .dt { width: 42px; height: 42px; border-radius: 12px; flex: none; display: flex; flex-direction: column; align-items: center; justify-content: center; background: color-mix(in srgb, var(--info) 18%, transparent); } #bsh .bev .dt b { font-size: 17px; line-height: 1; } #bsh .bev .dt small { font-size: 9.5px; text-transform: uppercase; opacity: .7; } #bsh .bev .tt { font-weight: 800; font-size: 14px; } #bsh .bev .wn { font-size: 12px; opacity: .7; margin-top: 2px; }
#bsh .bcal { margin-top: 12px; width: 100%; height: 48px; border: 0; border-radius: 16px; display: flex; align-items: center; justify-content: center; gap: 8px; background: color-mix(in srgb, var(--info) 26%, transparent); color: var(--ink); font: inherit; font-weight: 800; font-size: 15px; cursor: pointer; } #bsh .bcal ha-icon { --mdc-icon-size: 22px; color: var(--info); }
#bsh .bfl { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; } #bsh .bfu { display: flex; flex-direction: column; align-items: center; gap: 2px; padding: 10px 4px; border-radius: 16px; border: 1px solid var(--line); background: color-mix(in srgb, var(--info) 6%, transparent); } #bsh .bfu small { font-size: 11px; font-weight: 800; letter-spacing: .08em; opacity: .7; } #bsh .bfu b { font-size: 20px; } #bsh .bfu b em { font-size: 11px; font-style: normal; opacity: .6; } #bsh .bfu span { font-size: 10.5px; font-weight: 800; padding: 2px 8px; border-radius: 99px; background: rgba(255,255,255,.1); } #bsh .bfu span.up { color: var(--bad); } #bsh .bfu span.dn { color: var(--good); }
#bsh .bfl.sm { gap: 6px; } #bsh .bfl.sm .bfu { padding: 6px 3px; gap: 1px; border-radius: 12px; } #bsh .bfl.sm .bfu small { font-size: 9.5px; } #bsh .bfl.sm .bfu b { font-size: 16px; } #bsh .bfl.sm .bfu b em { font-size: 9.5px; } #bsh .bfl.sm .bfu span { font-size: 9px; padding: 1px 6px; }
#bsh .bsl.lst { grid-template-columns: 1fr; gap: 6px; } #bsh .bsl.lst button { flex-direction: row; justify-content: flex-start; min-height: 0; padding: 9px 14px; gap: 12px; border-radius: 14px; font-size: 14px; text-align: left; } #bsh .bsl.lst button ha-icon { --mdc-icon-size: 22px; flex: none; } #bsh .bsl.lst button span { flex: 1; } #bsh .bsl.lst button .pn { position: static; margin-left: auto; flex: none; } #bsh .bsl.lst button .eqm { position: static; margin-left: auto; flex: none; } #bsh .bsl.lst button .rpn { margin-left: 8px; font-size: 11px; max-width: 45%; } #bsh[data-k="links"] .bsp { max-height: 84vh; overflow-y: auto; }
#bsh .bsl button { position: relative; } #bsh .bsl button .pn { position: absolute; top: 9px; right: 11px; width: 8px; height: 8px; border-radius: 50%; background: #e0a420; box-shadow: 0 0 8px 1px rgba(224,164,32,.8); }
#bnav { z-index: 45; } #bsh .bsp { padding-bottom: 96px; }
#bnav .fabw .fab { position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0; padding: 0; background: conic-gradient(var(--c, #6fe7ff) var(--p, 0%), rgba(255,255,255,.18) 0); color: #fff; box-shadow: 0 0 14px color-mix(in srgb, var(--c, #6fe7ff) 55%, transparent), 0 6px 18px rgba(0,0,0,.4); } #bnav .fabw .fab::before { content: ""; position: absolute; inset: 5px; border-radius: 50%; background: #0e1624; } #bnav .fabw .fab > * { position: relative; } #bnav .fabw .fab b { font-size: 22px; font-weight: 800; line-height: 1; } #bnav .fabw .fab small { font-size: 8.5px; font-weight: 700; opacity: .8; margin-top: 2px; letter-spacing: .03em; }
#bnav .fabw .fab .fxt { display: none; font-size: 12px; font-weight: 900; } #bnav .fabw .fab.red { background: linear-gradient(135deg, #ff6b81, #d11a3a); animation: fabp 1.2s ease-in-out infinite; } #bnav .fabw .fab.red::before { display: none; } #bnav .fabw .fab.red b, #bnav .fabw .fab.red small { display: none; } #bnav .fabw .fab.red .fxt { display: block; } #bnav .fabw .fab.on { box-shadow: 0 0 0 3px color-mix(in srgb, var(--info) 55%, transparent), 0 6px 18px rgba(0,0,0,.4); }
#bsh .bair { display: flex; align-items: center; gap: 16px; padding: 4px 4px 12px; } #bsh .bring { position: relative; width: 104px; height: 104px; flex: none; } #bsh .bring svg { width: 100%; height: 100%; } #bsh .bring .c { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; } #bsh .bring .c b { font-size: 32px; font-weight: 800; line-height: 1; } #bsh .bring .c small { font-size: 11px; opacity: .7; } #bsh .btx b { display: block; font-size: 19px; } #bsh .btx small { font-size: 12.5px; opacity: .75; }
#bsh .bpw { width: 100%; height: 52px; border: 0; border-radius: 16px; display: flex; align-items: center; justify-content: center; gap: 10px; background: color-mix(in srgb, var(--info) 18%, transparent); color: var(--ink); font: inherit; font-weight: 800; font-size: 15.5px; cursor: pointer; } #bsh .bpw ha-icon { --mdc-icon-size: 24px; color: var(--info); } #bsh .bpw.on { background: color-mix(in srgb, #5eead4 28%, transparent); } #bsh .bpw.on ha-icon { color: #5eead4; }
#bsh .bmd { display: flex; gap: 8px; margin-top: 10px; } #bsh .bmd button { flex: 1; height: 42px; border-radius: 14px; border: 1px solid var(--line); background: transparent; color: var(--ink); font: inherit; font-weight: 700; font-size: 13.5px; cursor: pointer; } #bsh .bmd button.on { background: color-mix(in srgb, var(--info) 28%, transparent); border-color: var(--info); }
.pn.lv { background: #ff4d5e !important; box-shadow: 0 0 9px 2px rgba(255,77,94,.85) !important; animation: fabp 1.1s ease-in-out infinite; }
#side .spd[data-lv="1"] .d[data-pg="1"], #side .spd[data-lv="1"]:not(.p2) .nx::before { background: #ff4d5e !important; box-shadow: 0 0 8px 2px rgba(255,77,94,.85) !important; }
#bnav button[data-n="links"].lv i { background: #ff4d5e; box-shadow: 0 0 8px 2px rgba(255,77,94,.85); }
.lgnw { display: flex; align-items: center; gap: 12px; padding: 12px 14px; margin-bottom: 4px; } .lgnw ha-icon { --mdc-icon-size: 26px; color: var(--good); flex: none; } .lgnw b { display: block; font-size: 14.5px; } .lgnw small { font-size: 12px; opacity: .75; } .lgnw.has { border-color: rgba(224,164,32,.65); background: color-mix(in srgb, #e0a420 12%, transparent); } .lgnw.has ha-icon { color: #e0a420; }
.lr.nw { background: color-mix(in srgb, #e0a420 10%, transparent); box-shadow: inset 3px 0 0 #e0a420; padding-left: 10px; margin: 0 -8px; padding-right: 8px; border-radius: 10px; } .nwc { display: inline-block; margin-left: 8px; padding: 1px 7px; border-radius: 99px; font-size: 9.5px; font-weight: 800; letter-spacing: .06em; vertical-align: 1px; background: #e0a420; color: #1c1400; } .nwc.al { background: #ff4d5e; color: #fff; }
#radiohost { --primary-color: var(--info); --primary-text-color: var(--ink); --secondary-text-color: var(--ink2); --divider-color: var(--line); --card-background-color: transparent; --secondary-background-color: color-mix(in srgb, var(--info) 8%, transparent); --ha-card-background: transparent; --ha-card-border-width: 0; --ha-card-box-shadow: none; --text-primary-color: #0b1220; max-width: 1100px; } #radiohost radio-pl-card { display: block; }
#side .s2np { display: flex; align-items: center; gap: 10px; width: 100%; min-height: 46px; padding: 6px 10px; border: 1px solid var(--line); border-radius: 12px; background: transparent; color: var(--ink); font: inherit; text-align: left; cursor: pointer; box-sizing: border-box; } #side .s2np.on { background: color-mix(in srgb, #3fd69a 14%, transparent); border-color: color-mix(in srgb, #3fd69a 45%, transparent); } #side .s2np > ha-icon { --mdc-icon-size: 20px; opacity: .55; flex: none; } #side .s2np .eqm { height: 18px; margin: 0 2px 0 0; } #side .s2np .eqm b { width: 4px; } #side .s2np .tx { flex: 1; min-width: 0; display: flex; flex-direction: column; } #side .s2np .tx b { font-size: 13px; line-height: 1.2; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; } #side .s2np .tx small { font-size: 11px; opacity: .75; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
#aovl { position: fixed; inset: 0; z-index: 90; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 18px; background: radial-gradient(circle at 50% 40%, #d11a3a, #6a0a1b 70%); color: #fff; text-align: center; animation: aovp 1.3s ease-in-out infinite; } #aovl ha-icon { --mdc-icon-size: 96px; } #aovl b { font-size: 64px; letter-spacing: .14em; } #aovl small { font-size: 20px; opacity: .9; } #aovl button { margin-top: 18px; min-width: 70%; max-width: 760px; height: 160px; border: 0; border-radius: 28px; background: #fff; color: #8c1024; font: inherit; font-size: 46px; font-weight: 900; letter-spacing: .06em; cursor: pointer; box-shadow: 0 14px 50px rgba(0,0,0,.45); }
@keyframes aovp { 50% { filter: brightness(1.22); } } @media (prefers-reduced-motion: reduce) { #aovl { animation: none; } } :host(.lite) #aovl { animation: none; }
.app.an .nwl { display: flex; flex-direction: column; gap: 6px; } .app.an .nw1 { display: flex; align-items: center; gap: 12px; width: 100%; padding: 9px 12px; border-radius: 16px; border: 1px solid var(--line); background: var(--card); color: var(--ink); font: inherit; text-align: left; cursor: pointer; box-sizing: border-box; } .app.an .nw1 > ha-icon:first-child { --mdc-icon-size: 24px; color: var(--info); flex: none; } .app.an .nw1 .eqm { height: 20px; margin: 0 4px 0 2px; } .app.an .nw1 .tx { flex: 1; min-width: 0; display: flex; flex-direction: column; } .app.an .nw1 .tx b { font-size: 14px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; } .app.an .nw1 .tx small { font-size: 12px; opacity: .75; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; } .app.an .nw1 .ch { --mdc-icon-size: 20px; opacity: .45; flex: none; } .app.an .nw1.w { border-color: rgba(224,164,32,.6); background: color-mix(in srgb, #e0a420 10%, transparent); } .app.an .nw1.w > ha-icon:first-child { color: #e0a420; }
.app.an .hero .wx .grow { flex: 0 1 auto; margin-right: 6px; } .app.an .hero .wx .mini { flex-direction: column; align-items: flex-start; gap: 6px; margin-left: 4px; } .app.an .hero .wx .mini .airc { margin-top: 0; }
.app.an .airc { display: inline-flex; align-items: center; gap: 5px; margin-top: 8px; padding: 4px 11px 4px 8px; border-radius: 999px; border: 1px solid rgba(255,255,255,.2); background: rgba(255,255,255,.08); color: inherit; font: inherit; cursor: pointer; -webkit-tap-highlight-color: transparent; } .app.an .airc ha-icon { --mdc-icon-size: 17px; color: var(--lc, #6bbf8f) !important; } .app.an .airc b { font-size: 15px; font-weight: 800; line-height: 1; } .app.an .airc small { font-size: 10.5px; opacity: .7; }
.app.an .airt { box-sizing: border-box; width: 100%; min-width: 0; display: flex; align-items: center; gap: 10px; margin-top: 10px; padding: 9px 10px 9px 12px; border-radius: 14px; background: rgba(255,255,255,.09); border: 1px solid rgba(255,255,255,.14); cursor: pointer; } .app.an .airt > ha-icon { --mdc-icon-size: 24px; flex: none; } .app.an .airt .at { flex: 1; min-width: 0; display: flex; flex-direction: column; } .app.an .airt .at b { font-size: 14px; } .app.an .airt .at small { font-size: 12px; opacity: .8; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; } .app.an .airt button { flex: none; display: flex; align-items: center; gap: 5px; border: 0; border-radius: 999px; padding: 8px 12px; font: inherit; font-size: 12.5px; font-weight: 700; color: inherit; background: rgba(255,255,255,.14); cursor: pointer; } .app.an .airt button.on { background: rgba(94,234,212,.25); color: #5eead4; } .app.an .airt button.wt { opacity: .6; } .app.an .airt button ha-icon { --mdc-icon-size: 17px; }
#bnav .fabw .fab ha-icon { --mdc-icon-size: 26px; color: var(--ink); } #bnav .fabw .fab.pl ha-icon { color: #3fd69a; } #bnav .fabw .fab.red ha-icon { display: none; } #bnav .fabw .fab small { margin-top: 0; display: none; }
#mpl { position: fixed; inset: 0; z-index: 75; } #mpl .mpb { position: absolute; inset: 0; background: rgba(0,0,0,.28); } #mpl .mpw { position: absolute; width: min(360px, calc(100% - 24px)); box-sizing: border-box; padding: 14px; border-radius: 22px; background: linear-gradient(color-mix(in srgb, var(--info) 8%, transparent), color-mix(in srgb, var(--info) 8%, transparent)), color-mix(in srgb, var(--bg1, #0b1220) 76%, transparent); backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px); border: 1px solid var(--line); box-shadow: 0 16px 50px rgba(0,0,0,.55); color: var(--ink); display: flex; flex-direction: column; gap: 12px; animation: bsu .22s cubic-bezier(.2,.8,.2,1); }
.app.sd #mpl .mpw { left: 276px; bottom: 16px; } .app.an #mpl .mpw { left: 50%; transform: translateX(-50%); bottom: 98px; }
#mpl .mph { display: flex; align-items: center; gap: 12px; } #mpl .mpc { width: 52px; height: 52px; border-radius: 14px; flex: none; display: grid; place-items: center; background: color-mix(in srgb, #3fd69a 22%, transparent); } #mpl .mpc ha-icon { --mdc-icon-size: 28px; color: #3fd69a; }
#mpl .mpt { flex: 1; min-width: 0; display: flex; flex-direction: column; } #mpl .mpt b { font-size: 16px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; } #mpl .mpt span { font-size: 13px; opacity: .85; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; } #mpl .mpt small { font-size: 11px; opacity: .65; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
#mpl button { font: inherit; color: inherit; cursor: pointer; } #mpl .mpx { width: 34px; height: 34px; border: 0; border-radius: 50%; background: transparent; display: grid; place-items: center; flex: none; } #mpl .mpx ha-icon { --mdc-icon-size: 20px; opacity: .7; }
#mpl .mpk { display: flex; gap: 10px; justify-content: center; } #mpl .mpk button { width: 54px; height: 54px; border-radius: 50%; border: 1px solid var(--line); background: transparent; display: grid; place-items: center; } #mpl .mpk button.pp { background: var(--info); border-color: var(--info); color: #07131f; width: 62px; height: 62px; } #mpl .mpk button ha-icon { --mdc-icon-size: 26px; }
#mpl .mpv { display: flex; align-items: center; gap: 10px; } #mpl .mpv ha-icon { --mdc-icon-size: 20px; opacity: .65; } #mpl .mpv input { flex: 1; accent-color: var(--info); } #mpl .mpv span { width: 38px; text-align: right; font-size: 12px; opacity: .75; }
#mpl .mpo { height: 42px; border: 1px solid var(--line); border-radius: 14px; background: color-mix(in srgb, var(--info) 14%, transparent); display: flex; align-items: center; justify-content: center; gap: 8px; font-weight: 700; font-size: 14px; } #mpl .mpo ha-icon { --mdc-icon-size: 18px; }
:host(.lite) #mpl .mpw { animation: none; }
#mpl .mgr { margin-top: 10px; padding: 10px 12px; border-radius: 16px; background: color-mix(in srgb, var(--info) 10%, transparent); border: 1px solid var(--line); } #mpl .mpk1 { flex: none; width: 40px; height: 40px; border-radius: 50%; border: 1px solid var(--line); background: transparent; color: inherit; display: grid; place-items: center; cursor: pointer; margin-left: 6px; }
#mpl .mpt .mq, #side .s2np .tx .mq, .app.an .nw1 .tx .mq { flex: none; }
#clp { position: fixed; inset: 0; z-index: 72; display: flex; align-items: center; justify-content: center; } #clp .clb { position: absolute; inset: 0; background: rgba(0,0,0,.45); } #clp .clw { position: relative; width: min(620px, calc(100% - 24px)); max-height: calc(100% - 24px); overflow-y: auto; box-sizing: border-box; padding: 14px; border-radius: 22px; background: linear-gradient(color-mix(in srgb, var(--info) 8%, transparent), color-mix(in srgb, var(--info) 8%, transparent)), color-mix(in srgb, var(--bg1, #0b1220) 76%, transparent); backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px); border: 1px solid var(--line); box-shadow: 0 16px 50px rgba(0,0,0,.55); color: var(--ink); scrollbar-width: none; }
#clp .clh { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; } #clp .clh b { font-size: 17px; flex: 1; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; } #clp .clr { display: inline-flex; gap: 4px; } #clp .clr button { border: 1px solid var(--line); background: transparent; color: inherit; font: inherit; font-size: 12.5px; font-weight: 700; padding: 6px 10px; border-radius: 99px; cursor: pointer; } #clp .clr button.on { background: var(--info); border-color: var(--info); color: #07131f; } #clp .clx { width: 34px; height: 34px; border: 0; border-radius: 50%; background: transparent; color: inherit; display: grid; place-items: center; cursor: pointer; }
#clp .clc { display: flex; flex-direction: column; gap: 6px; } #clp h3 { margin: 6px 4px 2px; font-size: 12px; letter-spacing: .12em; text-transform: uppercase; color: var(--ink2); } #clp .chartc { margin: 0; }
#asp { position: fixed; inset: 0; z-index: 42; display: flex; align-items: flex-end; justify-content: center; } #asp .apb { position: absolute; inset: 0; background: rgba(0,0,0,.45); } #asp .apw { position: relative; width: min(560px, 100%); max-height: calc(100% - 20px); box-sizing: border-box; padding: 12px 14px 92px; border-radius: 24px 24px 0 0; background: linear-gradient(color-mix(in srgb, var(--info) 8%, transparent), color-mix(in srgb, var(--info) 8%, transparent)), color-mix(in srgb, var(--bg1, #0b1220) 76%, transparent); backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px); border: 1px solid var(--line); border-bottom: 0; box-shadow: 0 -10px 40px rgba(0,0,0,.5); color: var(--ink); display: flex; flex-direction: column; gap: 8px; animation: bsu .25s cubic-bezier(.2,.8,.2,1); }
#asp .aph { display: flex; align-items: center; gap: 10px; } #asp .apx { width: 34px; height: 34px; border: 0; border-radius: 50%; background: transparent; color: inherit; display: grid; place-items: center; cursor: pointer; } #asp .pipesel { margin: 0; } #asp .chlog { height: min(46vh, 380px); min-height: 160px; }
:host(.lite) #asp .apw { animation: none; }
.app.sd #asp { align-items: center; } .app.sd #asp .apw { width: min(640px, calc(100% - 40px)); padding-bottom: 16px; border-radius: 24px; max-height: calc(100% - 60px); }
@keyframes bsu { from { transform: translateY(100%); } } @keyframes bsf { from { opacity: 0; } }
/* waski ekran Aurory: przyciski swiatel w osobnej sekcji Oswietlenie (nie na kaflach pomieszczen) */
.app.an #s-rooms, .app.an #s-links { display: none !important; } .app.an #sub:not([data-v="szkola-wiadomosci"]):not([data-v="szkola-wiadomosc"]) .hdr .back { display: none; }
#bsh .bsl button small { font-size: 11px; font-weight: 600; opacity: .75; display: inline-flex; align-items: center; gap: 4px; } #bsh .bsl button small .pd { width: 7px; height: 7px; border-radius: 50%; background: var(--good); box-shadow: 0 0 6px var(--good); }
.app.an #s-light .lall { grid-column: 1 / -1; } .app.an #s-light .lall .lq2 { width: 100%; box-sizing: border-box; justify-content: space-between; }
.app.an #s-light > .lt2 { grid-auto-flow: row; grid-auto-columns: auto; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px 12px; padding: 12px 12px 14px; }
@media (min-width: 600px) { .app.an #s-light > .lt2 { grid-template-columns: repeat(3, minmax(0, 1fr)); } }

/* ===== Aurora, telefon / tablet w pionie: ekran Dom - pogoda+alarmy, W domu, Swiatla, Szkola; dolny pasek z asystentem; pasek alarmu ===== */
.app.an #s-as, .app.an #s-rooms, .app.an #s-links { display: none !important; }
.app.an #home { display: flex; flex-direction: column; gap: 12px; } .app.an #home > section { margin-top: 0; }
.app.an #s-hero { order: 1; } .app.an #s-status { order: 2; } .app.an #s-now { order: 3; } .app.an #s-school { order: 4; } .app.an #s-rmini { order: 5; } .app.an #s-light { order: 6; } .app.an #s-now:empty { display: none; } .app.an #s-air { order: 6; } .app.an #s-fuel { order: 7; } .app.an #s-cal { order: 8; }
.app.an #s-rmini .rmg { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 9px; } @media (min-width: 600px) { .app.an #s-rmini .rmg { grid-template-columns: repeat(3, minmax(0, 1fr)); } }
.app.an .rm { min-height: 82px; justify-content: center; position: relative; display: flex; flex-direction: column; align-items: flex-start; gap: 3px; padding: 12px 14px 11px; border-radius: 18px; border: 1px solid var(--line); background: var(--card); color: var(--ink); font: inherit; text-align: left; cursor: pointer; }
.app.an .rm b { font-size: 14px; font-weight: 800; } .app.an .rm .rv { display: flex; flex-wrap: wrap; align-items: center; gap: 2px 10px; } .app.an .rm .v { display: inline-flex; align-items: center; gap: 2px; font-weight: 800; line-height: 1.1; white-space: nowrap; } .app.an .rm .v.t { font-size: 24px; } .app.an .rm .v.h { font-size: 22px; } .app.an .rm .v ha-icon { --mdc-icon-size: 21px; color: var(--info); flex: none; } .app.an .rm .v.h ha-icon { --mdc-icon-size: 23px; margin-right: -2px; }
.app.an .rm i { position: absolute; top: 12px; right: 12px; width: 10px; height: 10px; border-radius: 50%; background: var(--line); } .app.an .rm i.on { background: var(--good); box-shadow: 0 0 7px var(--good); }
.app.an .rm.wn { border-color: rgba(251,191,36,.75); box-shadow: 0 0 0 1px rgba(251,191,36,.3), 0 0 16px rgba(251,191,36,.22); } .app.an .rm.wn .v { color: #f0c55a; }
.app.an #s-light .lt2m { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 7px; }
.app.an .lq2.lqm { height: auto; flex-direction: column; justify-content: center; gap: 4px; padding: 10px 3px 8px; text-align: center; border-radius: 16px; } .app.an .lq2.lqm ha-icon { --mdc-icon-size: 24px; opacity: .6; } .app.an .lq2.lqm.on ha-icon { opacity: 1; color: #ffd666; filter: drop-shadow(0 0 6px rgba(255,214,102,.8)); }
.app.an .lq2.lqm .nm { flex: none; font-size: 11px; line-height: 1.15; max-width: 100%; overflow: hidden; text-overflow: ellipsis; } .app.an .lq2.lqm .nm small { font-size: 10px; opacity: .75; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.app.an #s-light .lt2m > .aoff, .app.an #s-light .lt2m > .aon { grid-column: 1 / -1; flex-direction: row; height: 44px; justify-content: center; gap: 8px; } .app.an .lq2.aon { background: color-mix(in srgb, var(--info) 24%, transparent); border-color: color-mix(in srgb, var(--info) 60%, transparent); color: var(--info); font-weight: 800; } .app.an .lq2.aon ha-icon { --mdc-icon-size: 20px; }
#bnav { display: grid; grid-template-columns: 1fr 1fr 78px 1fr 1fr; align-items: end; gap: 0; width: min(520px, calc(100% - 20px)); padding: 6px 4px; overflow: visible; }
#bnav .fabw { display: flex; justify-content: center; align-items: flex-end; } #bnav .fab { flex: none; width: 60px; height: 60px; min-width: 0; padding: 0; margin-top: -26px; border-radius: 50%; display: grid; place-items: center; background: linear-gradient(135deg, #6fe7ff, #a58bff); color: #0b1220; box-shadow: 0 6px 20px rgba(111,231,255,.35); } #bnav .fab ha-icon { --mdc-icon-size: 28px; } #bnav .fab span { font-size: 11px; font-weight: 900; } #bnav .fab.red { background: linear-gradient(135deg, #ff6b81, #d11a3a); color: #fff; box-shadow: 0 6px 22px rgba(255,60,90,.55); animation: fabp 1.2s ease-in-out infinite; } #bnav .fab.red span { font-size: 12px; } #bnav .fab.on { background: linear-gradient(135deg, #6fe7ff, #a58bff); }
@keyframes fabp { 50% { transform: scale(1.07); } } @keyframes fabg { 0%, 100% { box-shadow: 0 0 10px color-mix(in srgb, var(--ga, #6fe7ff) 42%, transparent), 0 6px 18px rgba(0,0,0,.4); } 50% { box-shadow: 0 0 22px 3px color-mix(in srgb, var(--ga, #6fe7ff) 66%, transparent), 0 6px 18px rgba(0,0,0,.4); } } @keyframes fabr { to { transform: rotate(360deg); } }
#bnav .fabw .fab .rp { position: absolute; inset: 0; border-radius: 50%; border: 2px solid var(--ga, #6fe7ff); opacity: 0; pointer-events: none; } #bnav .fabw .fab .eqv { display: none; position: absolute; inset: 0; align-items: center; justify-content: center; gap: 3px; pointer-events: none; } #bnav .fabw .fab .eqv b { width: 4px; height: 22%; border-radius: 2px; background: var(--ga, #6fe7ff); }
@keyframes fabrp { 0% { transform: scale(1); opacity: .75; } 100% { transform: scale(1.85); opacity: 0; } } @keyframes fabeq { 0%, 100% { height: 16%; } 50% { height: 56%; } } @keyframes fabth { 0%, 100% { opacity: .55; transform: scale(.94); } 50% { opacity: 1; transform: scale(1.06); } }
#bnav .fabw .fab.st-l .rp { animation: fabrp 1.7s ease-out infinite; } #bnav .fabw .fab.st-l .rp.r2 { animation-delay: .85s; }
#bnav .fabw .fab.st-p::after { animation-duration: 1.1s !important; opacity: .95 !important; background: conic-gradient(from 0deg, transparent 0 30%, var(--ga, #6fe7ff) 62%, var(--gb, #a78bfa) 92%, transparent 100%) !important; } #bnav .fabw .fab.st-p ha-icon { animation: fabth 1.2s ease-in-out infinite; }
#bnav .fabw .fab.st-r .rp { border-color: var(--gb, #a78bfa); animation: fabrp 2.4s ease-out infinite; } #bnav .fabw .fab.st-r .rp.r2 { animation-delay: 1.2s; } #bnav .fabw .fab.st-r ha-icon { display: none; } #bnav .fabw .fab.st-r .eqv { display: flex; } #bnav .fabw .fab.st-r .eqv b { animation: fabeq .9s ease-in-out infinite; } #bnav .fabw .fab.st-r .eqv b:nth-child(2) { animation-delay: .15s; } #bnav .fabw .fab.st-r .eqv b:nth-child(3) { animation-delay: .3s; } #bnav .fabw .fab.st-r .eqv b:nth-child(4) { animation-delay: .45s; } #bnav .fabw .fab.st-r .eqv b:nth-child(5) { animation-delay: .6s; }
@media (prefers-reduced-motion: reduce) { #bnav .fabw .fab .rp, #bnav .fabw .fab.st-r .eqv b, #bnav .fabw .fab.st-p ha-icon { animation: none !important; } } :host(.lite) #bnav .fabw .fab .rp { animation: none !important; }
#bnav .fabw .fab:not(.red) { animation: fabg 4.5s ease-in-out infinite; } #bnav .fabw .fab:not(.red)::after { content: ''; position: absolute; inset: -3px; border-radius: 50%; background: conic-gradient(from 0deg, transparent 0 62%, var(--ga, #6fe7ff) 82%, var(--gb, #a78bfa) 96%, transparent 100%); -webkit-mask: radial-gradient(circle, transparent 0 calc(50% - 3px), #000 calc(50% - 2px) 100%); mask: radial-gradient(circle, transparent 0 calc(50% - 3px), #000 calc(50% - 2px) 100%); opacity: .55; animation: fabr 9s linear infinite; pointer-events: none; }
@media (prefers-reduced-motion: reduce) { #bnav .fabw .fab:not(.red), #bnav .fabw .fab:not(.red)::after { animation: none; } } :host(.lite) #bnav .fabw .fab:not(.red), :host(.lite) #bnav .fabw .fab:not(.red)::after { animation: none; } @media (prefers-reduced-motion: reduce) { #bnav .fab.red { animation: none; } }
#abar { position: fixed; left: 0; right: 0; top: 0; z-index: 60; padding: 10px 12px 12px; display: flex; flex-direction: column; gap: 9px; background: linear-gradient(180deg, #b4162d, #8c1024); color: #fff; box-shadow: 0 8px 30px rgba(255,40,70,.5); } #abar[hidden] { display: none; }
#abar .tt { display: flex; align-items: center; gap: 10px; } #abar .tt ha-icon { --mdc-icon-size: 28px; } #abar .tt b { display: block; font-size: 15px; letter-spacing: .08em; } #abar .tt small { font-size: 12px; opacity: .9; } #abar button { height: 50px; border: 0; border-radius: 15px; background: #fff; color: #8c1024; font: inherit; font-weight: 900; font-size: 17px; letter-spacing: .05em; cursor: pointer; }
.app.an.al { padding-top: 132px; }
@media (max-width: 599px) {
  .app.an #s-rooms .rooms { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; overflow: visible; margin: 0; padding: 0; } .app.an #s-rooms .rooms > .room { min-width: 0; grid-column: auto !important; }
}
@media (min-width: 600px) and (max-width: 899px) {
  .app.an { max-width: none; padding: 16px 22px 100px; }
  .app.an #home { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; align-items: stretch; grid-template-areas: "hero hero" "status status" "now now" "school school" "rmini rmini" "light light"; }
  .app.an #home > section { margin-top: 0; min-width: 0; }
  .app.an #s-now { grid-area: now; } .app.an #s-rmini { grid-area: rmini; } .app.an #s-hero { grid-area: hero; } .app.an #s-status { grid-area: status; } .app.an #s-school { grid-area: school; } .app.an #s-rooms { grid-area: rooms; } .app.an #s-light { grid-area: light; } .app.an #s-air { grid-area: air; } .app.an #s-fuel { grid-area: fuel; } .app.an #s-cal { grid-area: cal; } .app.an #s-links { grid-area: links; }
  .app.an #s-hero .hi { display: none; } .app.an #s-hero > .hero { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); column-gap: 18px; align-items: center; } .app.an #s-hero > .hero > * { grid-column: 1 / -1; } .app.an #s-hero > .hero > .time, .app.an #s-hero > .hero > .date { grid-column: 1; } .app.an #s-hero > .hero > .wx { grid-column: 2; grid-row: 1 / span 2; justify-self: end; width: 100%; } .app.an #s-hero .time { font-size: 56px; }
  .app.an #s-rooms .rooms { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (prefers-reduced-motion: reduce) { #leaves, #piles, #cleaner { display: none; } }
`;

const CSS = `
:host { display: block; --bg1: #fdf1f6; --bg2: #eaf3ff; --bg3: #f1ecff; --ink: #3a3552; --ink2: #7b7597; --card: rgba(255,255,255,.72); --line: rgba(120,105,170,.14);
  --shadow: 0 6px 24px rgba(124,106,190,.13); --good: #3fb27f; --warn: #d9a521; --bad: #e5576f; --info: #5a9be0; --chip: rgba(255,255,255,.8); --glass: blur(14px) saturate(1.3); }
:host(.dark) { --bg1: #1c1a2e; --bg2: #172231; --bg3: #241d36; --ink: #f1eefc; --ink2: #aaa4c8; --card: rgba(255,255,255,.07); --line: rgba(255,255,255,.1);
  --shadow: 0 8px 28px rgba(0,0,0,.35); --chip: rgba(255,255,255,.1); }
* { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
.app { min-height: 100vh; padding: 14px 14px 92px; color: var(--ink); font-family: 'Nunito','Quicksand','Segoe UI',system-ui,-apple-system,Roboto,sans-serif;
  background: radial-gradient(900px 500px at 0% -10%, var(--bg1), transparent 60%), radial-gradient(800px 500px at 110% 10%, var(--bg2), transparent 60%),
              radial-gradient(900px 600px at 50% 110%, var(--bg3), transparent 60%), var(--bg1); max-width: 560px; margin: 0 auto; position: relative; }
section { margin-top: 18px; scroll-margin-top: 12px; }
h2 { margin: 0 4px 10px; font-size: 13px; letter-spacing: .14em; text-transform: uppercase; color: var(--ink2); font-weight: 800; display: flex; align-items: center; gap: 8px; }
h2 ha-icon { --mdc-icon-size: 18px; }
#sub:has(.roomv) h2 { margin-top: 32px; margin-bottom: 12px; } #sub:has(.roomv) .pillrow { margin-bottom: 18px; } #sub:has(.roomv) .bigs, #sub:has(.roomv) .dgrid { gap: 14px; }   /* widoki pomieszczen: wieksze odstepy miedzy sekcjami */
.card { background: var(--card); backdrop-filter: var(--glass); -webkit-backdrop-filter: var(--glass); border: 1px solid var(--line); border-radius: 26px; box-shadow: var(--shadow); }

/* efekty pogody w tle kafla */
.hero { isolation: isolate; } .fx { position: absolute; inset: 0; z-index: -1; overflow: hidden; pointer-events: none; border-radius: inherit; }
.fx i { position: absolute; display: block; }
.fx .sun { right: -30px; top: -34px; width: 150px; height: 150px; border-radius: 50%; background: radial-gradient(circle, #fff6c2 0 28%, rgba(255,214,102,.75) 29% 44%, rgba(255,214,102,0) 70%); animation: fxpulse 6s ease-in-out infinite; }
.fx .moon { right: 22px; top: 18px; width: 46px; height: 46px; color: #fff4cf; filter: drop-shadow(0 0 10px rgba(255,244,207,.7)); } .moon svg { display: block; width: 100%; height: 100%; }
:host(:not(.dark)) .fx .moon { color: #f2d98b; }
.fx .st { width: 3px; height: 3px; border-radius: 50%; background: #fff; box-shadow: 0 0 5px #fff; animation: fxtw 3s ease-in-out infinite; } :host(:not(.dark)) .fx .st { background: #8a7bd6; box-shadow: 0 0 4px #b9a6ff; }
.fx .cl { width: 150px; height: 52px; border-radius: 50px; background: radial-gradient(ellipse at 50% 55%, rgba(255,255,255,.85) 0 45%, rgba(255,255,255,0) 72%); animation: fxdrift linear infinite; }
:host(.dark) .fx .cl { background: radial-gradient(ellipse at 50% 55%, rgba(200,210,255,.3) 0 45%, rgba(200,210,255,0) 72%); }
.fx.dk .cl { background: radial-gradient(ellipse at 50% 55%, rgba(120,125,155,.6) 0 45%, rgba(120,125,155,0) 72%); } :host(.dark) .fx.dk .cl { background: radial-gradient(ellipse at 50% 55%, rgba(20,22,45,.7) 0 45%, rgba(20,22,45,0) 72%); }
.fx .dr { top: -24px; width: 2px; height: 20px; border-radius: 2px; background: linear-gradient(transparent, rgba(90,140,230,.7)); transform: rotate(12deg); animation: fxrain linear infinite; } :host(.dark) .fx .dr { background: linear-gradient(transparent, rgba(160,200,255,.65)); }
.fx .sn { top: -10px; width: 6px; height: 6px; border-radius: 50%; background: #fff; box-shadow: 0 0 4px rgba(120,140,200,.55); animation: fxsnow linear infinite; }
.fx .hl { top: -10px; width: 5px; height: 5px; border-radius: 50%; background: #e8f3ff; box-shadow: 0 0 3px rgba(80,120,200,.7); animation: fxrain linear infinite; }
.fx .fg { left: -30%; width: 160%; height: 34px; border-radius: 30px; background: linear-gradient(90deg, transparent, rgba(255,255,255,.7), transparent); animation: fxfog ease-in-out infinite alternate; } :host(.dark) .fx .fg { background: linear-gradient(90deg, transparent, rgba(210,215,240,.22), transparent); }
.fx .fl { inset: 0; background: rgba(255,255,255,.8); opacity: 0; animation: fxflash 7s infinite; } :host(.dark) .fx .fl { background: rgba(220,230,255,.45); }
@keyframes fxpulse { 50% { transform: scale(1.08); opacity: .85; } } @keyframes fxtw { 50% { opacity: .2; } }
@keyframes fxdrift { from { transform: translateX(-190px); } to { transform: translateX(520px); } }
@keyframes fxrain { to { transform: translateY(330px) rotate(12deg); } } @keyframes fxsnow { 0% { transform: translate(0,0); } 50% { transform: translate(14px,150px); } 100% { transform: translate(-6px,320px); } }
@keyframes fxfog { from { transform: translateX(-8%); } to { transform: translateX(8%); } }
@keyframes fxflash { 0%, 90%, 94%, 100% { opacity: 0; } 91% { opacity: 1; } 92% { opacity: .15; } 93% { opacity: .85; } }
@media (prefers-reduced-motion: reduce) { .fx i { animation: none !important; } }
.kb { position: fixed; left: 10px; bottom: 8px; z-index: 50; display: flex; gap: 8px; } .kb button { width: 38px; height: 38px; border: 1px solid var(--line); border-radius: 50%; display: grid; place-items: center; cursor: pointer; background: var(--bg1); color: var(--ink); opacity: .9; --mdc-icon-size: 20px; box-shadow: 0 2px 10px rgba(0,0,0,.35); } .kb button.act { background: rgba(143,120,224,.75); color: #fff; border-color: transparent; }
:host(.pt) .app { max-width: none; }
/* hero */
.hero { padding: 20px 20px 18px; position: relative; overflow: hidden; background: linear-gradient(135deg, #ffe3ef 0%, #e4dcff 55%, #d3ebff 100%); border: 0; color: #3a3552; }
:host(.dark) .hero { background: linear-gradient(135deg, #4a2e57 0%, #35306a 55%, #26466b 100%); color: #f6f2ff; }
.hero:after { content: ''; position: absolute; right: -40px; top: -50px; width: 190px; height: 190px; border-radius: 50%; background: radial-gradient(circle, rgba(255,255,255,.65), transparent 70%); }
:host(.dark) .hero:after { background: radial-gradient(circle, rgba(255,255,255,.14), transparent 70%); }
.wbadge ha-icon { --mdc-icon-size: 17px; }
.tg { position: absolute; right: 14px; top: 14px; z-index: 2; border: 0; width: 38px; height: 38px; border-radius: 50%; background: rgba(255,255,255,.55); color: inherit; cursor: pointer; display: grid; place-items: center; }
:host(.dark) .tg { background: rgba(255,255,255,.14); }
.hi { font-size: 15px; font-weight: 700; opacity: .75; }
.time { font-size: 54px; font-weight: 800; letter-spacing: -.02em; line-height: 1; margin: 4px 0 2px; }
.date { font-size: 14px; opacity: .72; font-weight: 600; text-transform: capitalize; }
.wx { display: flex; align-items: center; gap: 12px; margin-top: 16px; position: relative; z-index: 1; }
.wx .ic { width: 54px; height: 54px; border-radius: 18px; background: rgba(255,255,255,.6); display: grid; place-items: center; color: #7a67d6; }
:host(.dark) .wx .ic { background: rgba(255,255,255,.14); color: #d8ccff; }
.wx .ic ha-icon { --mdc-icon-size: 32px; }
.wx .t { font-size: 28px; font-weight: 800; line-height: 1; }
.wx .d { font-size: 13px; opacity: .75; font-weight: 600; margin-top: 3px; }
.wx .grow { flex: 1; }
.mini { display: flex; gap: 8px; flex-wrap: wrap; } .mini small { font-size: .8em; font-weight: 600; opacity: .8; }
.mini span { white-space: nowrap; background: rgba(255,255,255,.55); border-radius: 999px; padding: 5px 11px; font-size: 12.5px; font-weight: 700; }
:host(.dark) .mini span { background: rgba(255,255,255,.12); }

/* status */
@media (min-width: 900px) { .lk.lkm { display: none !important; } }
.status { padding: 14px 14px 10px; position: relative; overflow: hidden; } .status.sv2 { border: 2px solid #e5576f; } .status.sv1 { border: 2px solid #d9a521; }
:host(.lite) .card, :host(.lite) .sheet, :host(.lite) #popbd, :host(.lite) .fm, :host(.lite) .hdr { backdrop-filter: none !important; -webkit-backdrop-filter: none !important; }
:host(.lite) .card, :host(.lite) .room, :host(.lite) .dev { box-shadow: none !important; } :host(.lite) .wm { display: none !important; } :host(.lite) * { transition: none !important; } :host(.lite) #mpl .mpw, :host(.lite) #clp .clw, :host(.lite) #asp .apw, :host(.lite) #bnav, :host(.lite) #bsh .bsd, :host(.lite) #bsh .bsp { backdrop-filter: none !important; -webkit-backdrop-filter: none !important; } /* tryb oszczedny: wylaczone ciezkie rzeczy - cienie, rozmycia, filtry i animowane tlo (linie Aurory, sezonowe liscie / snieg); zostaja: tlo pogodowe, equalizer radia i przewijanie tytulow */
:host(.lite) :not(.fx):not(.cl):not(.dr):not(.sn):not(.hl):not(.st):not(.fg):not(.sun):not(.moon):not(.fl) { box-shadow: none !important; text-shadow: none !important; filter: none !important; backdrop-filter: none !important; -webkit-backdrop-filter: none !important; }
:host(.lite) #hudbg, :host(.lite) #hudbg *, :host(.lite) #hudbg *::before, :host(.lite) #hudbg *::after { animation: none !important; }
:host(.lite) #leaves, :host(.lite) #piles, :host(.lite) #cleaner { display: none !important; }
:host(.lite) .pn.lv, :host(.lite) #bnav .fab.red, :host(.lite) #abar, :host(.lite) #bsh .bsp, :host(.lite) #bsh .bsd { animation: none !important; }
.status > * { position: relative; z-index: 1; } .status > .wm { position: absolute; z-index: 0; right: -22px; bottom: -26px; width: 190px; height: 190px; --mdc-icon-size: 190px; opacity: .13; pointer-events: none; transform: rotate(-12deg); }
.ok { display: flex; align-items: center; gap: 12px; padding: 4px 6px 6px; font-weight: 800; }
.ok .b { width: 42px; height: 42px; border-radius: 15px; background: #d4f5e2; color: #2f9d6c; display: grid; place-items: center; }
:host(.dark) .ok .b { background: rgba(63,178,127,.22); color: #7fe6b6; }
.ok small { display: block; color: var(--ink2); font-weight: 600; font-size: 12.5px; margin-top: 1px; }
.iss { display: flex; align-items: center; gap: 11px; padding: 9px 10px; border-radius: 18px; margin-bottom: 7px; font-size: 13.5px; font-weight: 700; line-height: 1.25; }
.iss ha-icon { --mdc-icon-size: 22px; flex: none; }
.iss.s2 { background: #ffdde3; color: #b8324f; } .iss.s1 { background: #fff0c2; color: #8f6a00; } .iss.s0 { background: #dbeafe; color: #2f6db5; }
:host(.dark) .iss.s2 { background: rgba(229,87,111,.2); color: #ff9fb0; } :host(.dark) .iss.s1 { background: rgba(217,165,33,.2); color: #ffd666; } :host(.dark) .iss.s0 { background: rgba(90,155,224,.2); color: #9cc8ff; }
.iss small { display: block; font-weight: 600; opacity: .8; font-size: 11.5px; }
.more { background: none; border: 0; color: var(--ink2); font: inherit; font-weight: 800; font-size: 12.5px; padding: 6px 10px; cursor: pointer; }
.iss.tp { cursor: pointer; } .iss .it { flex: 1; min-width: 0; } .iss .chev { margin-left: auto; opacity: .7; --mdc-icon-size: 20px; }
.mo { margin-top: 8px; padding-top: 8px; border-top: 1px solid rgba(120,100,60,.25); display: flex; flex-direction: column; gap: 5px; }
.mo div { display: flex; gap: 10px; font-size: 12.5px; } .mo span { flex: 0 0 62px; opacity: .7; font-weight: 700; } .mo b { font-weight: 800; flex: 1; }

/* szybkie akcje */
.mic { border: 0; background: var(--card); color: var(--ink2); border: 1px solid var(--line); width: 38px; height: 38px; border-radius: 50%; cursor: pointer; display: grid; place-items: center; flex: none; padding: 0; } .mic.on { color: #e5576f; background: #ffd9e6; }
.hb { border: 1px solid var(--line); background: var(--card); color: var(--ink2); width: 32px; height: 32px; border-radius: 50%; cursor: pointer; display: grid; place-items: center; padding: 0; margin-left: 6px; } .hb ha-icon { --mdc-icon-size: 18px; } .hb.on { background: #ffd9e6; color: #e5576f; }

.q { border: 0; font: inherit; cursor: pointer; padding: 14px 4px 11px; border-radius: 22px; display: flex; flex-direction: column; align-items: center; gap: 6px; color: var(--ink);
  font-size: 11.5px; font-weight: 800; background: var(--card); border: 1px solid var(--line); box-shadow: var(--shadow); transition: transform .12s; }
.q:active { transform: scale(.94); }
.q .i { width: 44px; height: 44px; border-radius: 16px; display: grid; place-items: center; }
.q.on { outline: 2px solid currentColor; }

/* pokoje */
.rooms { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.room { padding: 14px; position: relative; overflow: hidden; }
.room.alm { background: #ffd0d8; border: 2px solid #e5576f; box-shadow: 0 0 16px rgba(229,87,111,.55), var(--shadow); }
:host(.dark) .room.alm { background: rgba(229,87,111,.28); border-color: #ff6b85; }
.room.wide { grid-column: span 1; }
.room > * { position: relative; z-index: 1; } .room > .wm { position: absolute; z-index: 0; right: -18px; bottom: -22px; width: 150px; height: 150px; --mdc-icon-size: 150px; opacity: .1; pointer-events: none; transform: rotate(-12deg); }
.room .top { display: flex; align-items: center; gap: 10px; }
.room .bub { width: 40px; height: 40px; border-radius: 15px; display: grid; place-items: center; flex: none; }
.room .nm { font-weight: 800; font-size: 15.5px; line-height: 1.1; }
.dev[data-br] { touch-action: pan-y; user-select: none; -webkit-user-select: none; } .dev .bp { margin-left: auto; flex: none; font-size: 11px; font-weight: 800; opacity: .7; }
.room .pr { font-size: 11px; color: var(--ink2); font-weight: 700; display: flex; align-items: center; gap: 5px; margin-top: 2px; }
.room .pr i { width: 7px; height: 7px; border-radius: 50%; background: #b9b5cf; display: inline-block; }
.room .pr.on i { background: var(--good); box-shadow: 0 0 0 4px rgba(63,178,127,.2); }
.met { display: flex; gap: 8px; margin: 12px 0 2px; }
.met div { flex: 1; border-radius: 16px; padding: 8px 10px; background: var(--chip); }
.met b { font-size: 21px; font-weight: 800; letter-spacing: -.01em; } .met b small { font-size: 12px; font-weight: 700; opacity: .65; margin-left: 1px; }
.met span { display: block; font-size: 10.5px; color: var(--ink2); font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }
.met .warn b { color: var(--warn); } .met .bad b { color: var(--bad); }
.devs { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }
.devs.sh-sq, .devs.sh-ci { display: grid; grid-template-columns: repeat(auto-fill, minmax(62px, 1fr)); }
.devs.sh-sq .dev, .devs.sh-ci .dev { flex-direction: column; justify-content: center; gap: 3px; padding: 6px 4px; aspect-ratio: 1; text-align: center; min-width: 0; }
.devs.sh-sq .dev { border-radius: 18px; } .devs.sh-ci .dev { border-radius: 50%; }
.devs.sh-sq .dev span { font-size: 10px; max-width: 100%; } .devs.sh-ci .dev span, .devs.sh-sq .dev .bp, .devs.sh-ci .dev .bp { display: none; }
.devs.sh-pi .dev { flex: 0 1 auto; border-radius: 99px; padding: 8px 14px; }
.dev { flex: 1 1 100%; min-width: 0; border: 0; font: inherit; cursor: pointer; display: flex; align-items: center; gap: 8px; padding: 9px 10px; border-radius: 16px;
  background: var(--chip); color: var(--ink2); font-size: 12.5px; font-weight: 800; transition: all .15s; text-align: left; }
.dev ha-icon { --mdc-icon-size: 20px; flex: none; }
.dev span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
/* tekst nie mieszczacy sie w pasku (np. tytul utworu) przewija sie w poziomie; mieszczacy sie stoi w miejscu (cqw: Chrome 105+, starsze przegladarki: wielokropek) */
.school { padding: 4px 10px; max-height: 170px; overflow-y: auto; scrollbar-width: none; background: linear-gradient(145deg, rgba(255,200,80,.20), rgba(255,255,255,.04)) !important; } .school::-webkit-scrollbar { display: none; }
.scw { display: flex; align-items: center; gap: 8px; padding: 3px 0; font-size: 12.5px; line-height: 1.2; } .sch + .scw { border-top: 1px solid var(--line); } .scw ha-icon { --mdc-icon-size: 18px; color: #d9a521; flex: none; }
.scw .st { flex: 1; min-width: 0; } .scw .st { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; } .scw .st b { display: inline; font-weight: 800; } .scw .st small { opacity: .7; font-weight: 600; font-size: 11px; margin-left: 6px; }
.scw .sd { flex: none; font-weight: 800; font-size: 11.5px; padding: 2px 8px; border-radius: 99px; background: rgba(217,165,33,.22); color: inherit; } .scw.soon .sd { background: rgba(229,87,111,.28); } .scw.more2 { opacity: .7; font-size: 11px; justify-content: center; }
.trg { display: grid; grid-template-columns: minmax(0, .8fr) minmax(0, 1.4fr); gap: 8px; }
.trc { padding: 8px 2px; } .trc + .trc { border-top: 1px solid var(--line); } .trt { display: flex; align-items: baseline; gap: 10px; } .trt b { font-size: 18px; font-weight: 800; } .trt small { opacity: .7; font-weight: 700; font-size: 12px; }
.trl { display: flex; align-items: center; gap: 8px; font-size: 13px; padding: 2px 0 0 4px; } .trl ha-icon { --mdc-icon-size: 17px; color: #3a8fd9; flex: none; } .trl b { min-width: 34px; font-weight: 800; } .trl span { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; opacity: .9; }
.trl em { font-style: normal; font-weight: 800; font-size: 11.5px; padding: 1px 8px; border-radius: 99px; flex: none; } .trl em.late { background: rgba(229,87,111,.25); } .trl em.early { background: rgba(63,178,127,.25); }
#s-school h2.hl { color: #e0a420; text-shadow: 0 0 10px rgba(224,164,32,.55); } #s-school h2.hl ha-icon { color: #e0a420; } .nb { display: inline-grid; place-items: center; min-width: 20px; height: 20px; padding: 0 6px; margin-left: 8px; box-sizing: border-box; border-radius: 99px; background: #e5576f; color: #fff; font-size: 12px; font-weight: 800; letter-spacing: 0; text-shadow: none; box-shadow: 0 0 10px rgba(229,87,111,.55); }
.room .rnb { min-width: 0; flex: 1; } .room .nm { display: flex; align-items: center; gap: 12px; min-width: 0; } .room .nm .nmt { flex: none; } .room .nm .mpi { --mdc-icon-size: 17px; flex: none; } .room .nm .mpt { font-size: 12px; font-weight: 700; opacity: .85; }
@media (max-width: 899px) { .room .nm .mpt { display: none; } }
.mmv { max-width: 760px; margin: 0 auto; } .mmv h2 { justify-content: center; text-align: center; } .mmv .np, .mmv .npt, .mmv .wh { text-align: center; } .mmv .chips { justify-content: center; } .mmv .ctl { max-width: none; } .mmv .tvs { max-width: none; display: flex; flex-wrap: wrap; justify-content: center; } .mmv .tvs .tv { flex: 0 0 calc((100% - 20px) / 3); } .mmv h2 { margin-top: 20px; }   /* multimedia: calosc wysrodkowana */
.nw { display: inline-block; vertical-align: middle; margin-left: 8px; padding: 2px 8px; border-radius: 99px; font-size: 10px; font-weight: 800; letter-spacing: .06em; background: #e5576f; color: #fff; text-transform: none; } .nw.tnw { position: absolute; top: -2px; right: 2px; margin: 0; } .nwd { display: inline-block; width: 8px; height: 8px; margin-left: 7px; border-radius: 50%; background: #e5576f; box-shadow: 0 0 6px rgba(229,87,111,.8); } .nwc { box-shadow: inset 0 0 0 2px #e5576f !important; }
.nwb { display: flex; align-items: center; gap: 12px; padding: 12px 14px; margin: 0 0 12px; border: 1px solid rgba(229,87,111,.55) !important; background: linear-gradient(135deg, rgba(229,87,111,.20), rgba(224,164,32,.10)) !important; } .nwb ha-icon { --mdc-icon-size: 26px; color: #e5576f; flex: none; } .nwb b { display: block; font-size: 14px; font-weight: 800; } .nwb span { display: block; font-size: 13px; font-weight: 700; opacity: .9; margin-top: 2px; }
@media (max-width: 899px) { .room .top .msgb, .hdr .msgb { display: none; } }   /* telefon: przycisk wiadomosci tylko jako kafelek w widoku pokoju */
.msgb { margin-left: 8px; } .atg + .msgb { margin-left: 8px; } .fm textarea { font: inherit; font-size: 15px; font-weight: 600; color: var(--ink); background: var(--chip); border: 1px solid var(--line); border-radius: 14px; padding: 11px 12px; outline: 0; resize: none; } :host(.dark) .fm textarea { color-scheme: dark; } .mcnt { align-self: flex-end; font-size: 11px; font-weight: 700; color: var(--ink2); margin-top: -6px; }
.mq2, .mh2 { display: flex; flex-wrap: wrap; gap: 6px; } .mh2 small { flex: 0 0 100%; font-size: 11px; font-weight: 800; letter-spacing: .06em; text-transform: uppercase; color: var(--ink2); } .fm .chipb { flex: none; padding: 8px 12px; font-size: 13px; border-radius: 99px; } .fm .chipb.hq { opacity: .75; }
/* ===== dashboard Aurora (config aurora:true), szeroki ekran: menu boczne + nowy ekran glowny ===== */
@media (min-width: 900px) {
  .app.sd { display: grid; grid-template-columns: 252px minmax(0, 1fr); gap: 16px; padding: 16px; max-width: none; align-items: start; min-height: var(--av, 100vh); }
  .app.sd .hdr, .app.sd .hdr.stk, .app.sd #sub.pv > .hdr, .app.an .hdr, .app.an .hdr.stk, .app.an #sub.pv > .hdr { position: static !important; background: none !important; backdrop-filter: none !important; -webkit-backdrop-filter: none !important; border-radius: 0; box-shadow: none !important; margin: 4px 0 16px !important; padding: 8px 0 10px !important; }
  .airt { box-sizing: border-box; width: 100%; min-width: 0; display: flex; align-items: center; gap: 10px; margin-top: 10px; padding: 9px 10px 9px 12px; border-radius: 14px; background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.1); cursor: pointer; } .airt > ha-icon { --mdc-icon-size: 22px; flex: none; } .airt .at { flex: 1; min-width: 0; display: flex; flex-direction: column; } .airt .at b { font-size: 13px; } .airt .at small { font-size: 11px; opacity: .75; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; } .airt button { flex: none; display: flex; align-items: center; gap: 5px; border: 0; border-radius: 999px; padding: 7px 11px; font: inherit; font-size: 12px; font-weight: 700; color: inherit; background: rgba(255,255,255,.12); cursor: pointer; } .airt button.on { background: rgba(94,234,212,.25); color: #5eead4; } .airt button.wt { opacity: .6; } .airt button ha-icon { --mdc-icon-size: 16px; }
  #side { grid-column: 1; grid-row: 1; position: sticky; top: 16px; height: calc(var(--av, 100vh) - 32px); box-sizing: border-box; padding: 14px 12px 12px; border-radius: 22px; background: var(--card); border: 1px solid var(--line); box-shadow: var(--shadow); display: flex; flex-direction: column; overflow: hidden auto; scrollbar-width: none; z-index: 2; }
  #side::-webkit-scrollbar { display: none; }
  .app.sd #home, .app.sd #sub { grid-column: 2; grid-row: 1; min-width: 0; margin: 0; max-width: none; }
  .app.sd #home { display: grid; height: calc(var(--av, 100vh) - 32px); grid-template-columns: 1.55fr 1.3fr .75fr .95fr; grid-template-rows: 222px minmax(0, 1.55fr) minmax(0, .95fr); grid-template-areas: "status school cal cal" "rooms rooms rooms rooms" "light light light fuel"; gap: 14px 12px; align-items: stretch; }
  .app.sd #s-links, .app.sd #s-hero, .app.sd #s-air { display: none !important; }
  .app.sd #s-hero { grid-area: hero; } .app.sd #s-status { grid-area: status; } .app.sd #s-school { grid-area: school; } .app.sd #s-cal { grid-area: cal; } .app.sd #s-rooms { grid-area: rooms; } .app.sd #s-light { grid-area: light; }
  .app.sd #sub:not([data-v="szkola-wiadomosci"]):not([data-v="szkola-wiadomosc"]) .hdr .back { display: none; } .app.sd #hhome { display: none; }   /* menu boczne zastepuje strzalke wstecz (zostaje tylko w wiadomosciach Szkoly: wraca do Szkoly) */ .app.sd #s-fuel { grid-area: fuel; }
  .app.sd #s-air, .app.sd #s-status, .app.sd #s-school, .app.sd #s-cal, .app.sd #s-rooms, .app.sd #s-light, .app.sd #s-fuel { align-self: stretch; display: flex; flex-direction: column; min-height: 0; contain: size; }
  .app.sd #s-hero > .hero { flex: 1; min-height: 0; margin: 0; box-sizing: border-box; padding: 12px 16px; overflow: hidden; }
  .app.sd .hero .hi, .app.sd .hero .time, .app.sd .hero .date { display: none; }
  .app.sd .hero .wx { flex-wrap: wrap; gap: 8px 12px; } .app.sd .hero .wx .t { font-size: 44px; line-height: 1; } .app.sd .hero .wx .ic { width: 52px; height: 52px; } .app.sd .hero .mini { flex-wrap: wrap; }
  .app.sd #s-status > .status, .app.sd #s-school > .school, .app.sd #s-cal > .card.cal { flex: 1; min-height: 0; overflow-y: auto; scrollbar-width: none; }
  .app.sd #s-rooms > .rooms { flex: 1; min-height: 0; grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(2, minmax(0, 1fr)); gap: 12px; align-content: stretch; }
  .app.sd #s-rooms #alloff { display: none !important; }
  .app.sd .rooms .room { height: auto; min-height: 0; }
  .app.sd .rooms .room .devs { display: none; }
  .app.sd .rooms .room .met { margin-top: auto; } .app.sd .rooms .room .met div { padding: 6px 10px; } .app.sd .rooms .room .met b { font-size: 24px; } .app.sd .rooms .room { overflow: hidden; padding: 12px 14px; display: grid; grid-template-columns: minmax(0, 1fr) auto; grid-template-rows: auto minmax(0, 1fr); gap: 8px; align-items: center; } .app.sd .rooms .room .top { grid-column: 1; grid-row: 1; margin: 0; } .app.sd .rooms .room .wash { grid-column: 2; grid-row: 1; margin: 0; padding: 5px 10px; font-size: 11.5px; white-space: nowrap; } .app.sd .rooms .room .met { grid-column: 1 / -1; grid-row: 2; align-self: end; margin: 0; } .app.sd .rooms .room .wm { display: none; } .app.sd #s-cal .ev { padding: 3px 0; } .app.sd #s-cal .ev .dt { width: 36px; height: 36px; } .app.sd #s-cal h2, .app.sd #s-school h2, .app.sd #s-status h2 { white-space: nowrap; }
  .app.sd #s-light > .lt2 { flex: 1; min-height: 0; }
  .app.sd .lq2 { height: 56px; } .app.sd .lt2 { padding: 12px 16px 14px; gap: 12px; } .app.sd .lt2 .lcol { gap: 6px; } .app.sd .lq2 { overflow: hidden; padding: 0 10px; gap: 6px; } .app.sd .lq2 .nm { font-size: 14px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; } .app.sd .lq2 .nm small { overflow: hidden; text-overflow: ellipsis; } .app.sd .lq2 .sw2 { width: 38px; height: 22px; } .app.sd .lq2 .sw2::after { width: 16px; height: 16px; top: 3px; } .app.sd .lq2.on .sw2::after { left: 19px; } .app.sd .lq2.aoff .nm { font-size: 13px; } .app.sd .lt2 .lcol { gap: 7px; }
  .app.sd #s-fuel #fpg { flex: 1; min-height: 0; display: flex; overflow-x: auto; overflow-y: hidden; scroll-snap-type: x mandatory; scrollbar-width: none; } .app.sd #s-fuel #fpg::-webkit-scrollbar { display: none; } .app.sd #s-fuel #fpg > .pg { flex: 0 0 100%; min-width: 0; scroll-snap-align: start; display: flex; flex-direction: column; box-sizing: border-box; } .app.sd #s-fuel #fpg > .pg > .card.air { flex: 1; min-height: 0; padding: 8px 10px; gap: 8px; } .app.sd #s-fuel #fpg > .pg > .fuel { flex: 1; }
  .app.sd #s-fuel .air .ring { width: 62px; height: 62px; flex: none; } .app.sd #s-fuel .air .tt { font-size: 14px; } .app.sd #s-fuel .air .ss { font-size: 11px; margin: 1px 0 5px; } .app.sd #s-fuel .air .dev { padding: 5px 10px; font-size: 12px; min-height: 0; }
  .app.sd #s-fuel h2 { cursor: pointer; white-space: nowrap; letter-spacing: .08em; } .app.sd #s-fuel h2 #fht { overflow: hidden; text-overflow: ellipsis; min-width: 0; }
  .app.sd #s-fuel .fu { gap: 6px; padding: 3px 8px; overflow: hidden; } .app.sd #s-fuel .fu .n { font-size: 10px; letter-spacing: .04em; flex: none; } .app.sd #s-fuel .fu .p { font-size: 17px; white-space: nowrap; flex: none; } .app.sd #s-fuel .fu .p small { font-size: 9.5px; } .app.sd #s-fuel .fu .tr { font-size: 10px; padding: 2px 6px; white-space: nowrap; flex: none; } .app.sd #s-fuel .fdt { display: inline-flex; gap: 5px; padding: 4px 2px; } .app.sd #s-fuel .fdt i { width: 7px; height: 7px; border-radius: 50%; background: var(--ink2); opacity: .4; } .app.sd #s-fuel .fdt i.nw { background: #e0a420; opacity: 1; box-shadow: 0 0 7px 1px rgba(224,164,32,.8); } .app.sd #s-fuel .fdt i.on { opacity: 1; background: var(--info); width: 18px; border-radius: 5px; }
  .app.sd #s-fuel .fuel { flex: 1; min-height: 0; grid-template-columns: 1fr; grid-template-rows: repeat(3, minmax(0, 1fr)); gap: 6px; } .app.sd #s-fuel .fu { display: flex; align-items: center; gap: 8px; padding: 4px 12px; min-height: 0; } .app.sd #s-fuel .fu > * { margin: 0; } .app.sd #s-fuel .fu .tr { margin-left: auto; }
}
#side .s2c { font-size: 36px; font-weight: 300; letter-spacing: -.02em; line-height: 1; padding: 0 6px; } #side .s2d { font-size: 12px; color: var(--ink2); padding: 6px 6px 0; font-weight: 600; }
#side .s2g { font-size: 10.5px; letter-spacing: .14em; font-weight: 700; color: var(--ink2); padding: 9px 8px 4px; }
#side .s2m { display: flex; align-items: center; gap: 10px; width: 100%; height: 29px; padding: 0 10px; border: 0; border-radius: 12px; background: transparent; color: var(--ink); font: inherit; font-size: 14px; font-weight: 700; cursor: pointer; text-align: left; }
#side .s2m ha-icon { --mdc-icon-size: 19px; color: var(--info); flex: none; } #side .s2m .nm { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
#side .s2m .pd, #side .s2m .pe { width: 7px; height: 7px; border-radius: 50%; flex: none; } #side .s2m .pd { background: var(--good); box-shadow: 0 0 6px var(--good); } #side .s2m .pe { background: var(--line); }
#side .s2m.on, #side .s2k.on { background: color-mix(in srgb, var(--info) 22%, transparent); box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--info) 55%, transparent); }
#side .s2s { display: flex; flex-direction: column; gap: 4px; } #side .s2y { display: flex; flex-direction: column; gap: 6px; }
#side .s2k { display: flex; align-items: center; gap: 8px; height: 30px; padding: 0 9px; border: 1px solid var(--line); border-radius: 11px; background: var(--chip); color: var(--ink); font: inherit; font-size: 12px; font-weight: 700; cursor: pointer; text-align: left; min-width: 0; } #side .s2k.f { height: 32px; font-size: 13px; }
#side .s2k ha-icon { --mdc-icon-size: 16px; color: var(--info); flex: none; } #side .s2k.al { background: color-mix(in srgb, var(--warn) 24%, transparent); } #side .s2k.al ha-icon { color: var(--warn); }
#side .s2p { display: none; } #side .s2m .pn { width: 8px; height: 8px; border-radius: 50%; flex: none; background: #e0a420; box-shadow: 0 0 8px 1px rgba(224,164,32,.8); } .app.sd .hdr .hclk { display: none !important; }
#side #sroom, #side #ssc, #side #ssys { display: flex; flex-direction: column; gap: 4px; min-height: 0; } #side #sroom { flex: 6 1 auto; } #side #ssys { flex: 2.2 1 auto; } #side .s2s { flex: 4 1 auto; grid-auto-rows: 1fr; min-height: 0; gap: 6px; }
#side #sroom .s2m, #side #ssc .s2m, #side #ssys .s2k { flex: 1 1 34px; height: auto; min-height: 34px; max-height: 56px; } #side #shome { min-height: 40px; margin-top: 8px; } #side .s2m { font-size: 15px; } #side .s2m ha-icon { --mdc-icon-size: 22px; } #side .s2k { height: auto; min-height: 36px; font-size: 13px; } #side .s2k ha-icon { --mdc-icon-size: 18px; }
#side .swx { flex: none; position: relative; isolation: isolate; overflow: hidden; padding: 12px 14px 10px; border-radius: 18px; background: color-mix(in srgb, var(--info) 10%, transparent); border: 1px solid var(--line); cursor: pointer; box-sizing: border-box; color: #fff; margin-bottom: 8px; } #side .swx .s2c { padding: 0; } #side .swx .s2d { padding: 2px 0 8px; } #side #swr { display: flex; align-items: center; gap: 10px; } #side #swr > ha-icon { --mdc-icon-size: 34px; flex: none; } #side #swr .wt { flex: 1; min-width: 0; display: flex; flex-direction: column; } #side #swr .wt b { font-size: 26px; line-height: 1.05; font-weight: 700; } #side #swr .wt small { font-size: 12px; opacity: .85; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; } #side #swr .wh { flex: none; display: inline-flex; align-items: center; gap: 1px; font-size: 13px; font-weight: 700; padding: 4px 8px 4px 4px; border-radius: 999px; background: rgba(255,255,255,.14); } #side #swr .wh ha-icon { --mdc-icon-size: 17px; }
#side #spg { flex: 1 1 auto; min-height: 0; display: flex; overflow-x: auto; overflow-y: hidden; scroll-snap-type: x mandatory; scrollbar-width: none; margin-top: 2px; } #side #spg::-webkit-scrollbar { display: none; } #side #spg .pg { flex: 0 0 100%; box-sizing: border-box; padding: 0 2px; min-width: 0; scroll-snap-align: start; display: flex; flex-direction: column; min-height: 0; } #side #spg .pg #sroom, #side #spg .pg .s2s { flex: 1 1 auto; }
#side .spd { flex: none; display: flex; align-items: center; justify-content: center; gap: 8px; padding: 6px 0 6px; } #side .spd .d { width: 9px; height: 9px; padding: 0; border: 0; border-radius: 50%; background: var(--ink2); opacity: .4; } #side .spd .d.on { opacity: 1; background: var(--info); width: 22px; border-radius: 6px; } /* radio gra: zielony korektor przy skrocie Radio, kropka przy stronie skrotow / przycisku Wiecej */
.eqm { display: inline-flex; align-items: flex-end; gap: 2px; height: 13px; flex: none; margin-left: 4px; } .eqm b { width: 3px; background: #3fd69a; border-radius: 1px; animation: eqm 1s ease-in-out infinite; } .eqm b:nth-child(2) { animation-delay: .25s; } .eqm b:nth-child(3) { animation-delay: .5s; } @keyframes eqm { 0%, 100% { height: 3px; } 50% { height: 13px; } }
#side .s2m .eqm { margin-right: 2px; } #bsh .bsl button .eqm { position: absolute; top: 9px; right: 10px; } #bsh .bsl button .rpn { font-size: 10px; font-weight: 700; color: #3fd69a; max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
#side .spd[data-rp="1"] .d[data-pg="1"] { background: #3fd69a; opacity: 1; box-shadow: 0 0 7px 1px rgba(63,214,154,.8); } #side .spd[data-rp="1"]:not(.p2) .nx::before { content: ""; width: 7px; height: 7px; border-radius: 50%; background: #3fd69a; box-shadow: 0 0 7px 1px rgba(63,214,154,.8); margin-right: 5px; }
#bnav button[data-n="links"].rp:not(.nw):not(.lv) i { display: block; background: #3fd69a; box-shadow: 0 0 8px 2px rgba(63,214,154,.85); }

#side .spd[data-nw="1"] .d[data-pg="1"] { background: #e0a420; opacity: 1; box-shadow: 0 0 7px 1px rgba(224,164,32,.8); } #side .spd[data-nw="1"]:not(.p2) .nx::before { content: ""; width: 7px; height: 7px; border-radius: 50%; background: #e0a420; box-shadow: 0 0 7px 1px rgba(224,164,32,.8); margin-right: 5px; }
#side .spd .nx { display: inline-flex; align-items: center; gap: 2px; margin-left: 8px; border: 0; background: transparent; color: var(--ink2); font: inherit; font-size: 12px; font-weight: 700; padding: 6px 4px; } #side .spd .nx ha-icon { --mdc-icon-size: 16px; }
#side #ssys { flex: none; } #side #ssys .s2k { flex: none; min-height: 38px; }
#side #s-as { margin: 8px 0 0; flex: none !important; height: 52px !important; display: block !important; align-self: auto !important; } #side #s-as > h2 { display: none; } #side #s-as > .card.as { display: block; position: relative; padding: 0; background: transparent !important; border: 0 !important; box-shadow: none !important; height: 52px; flex: none; min-height: 52px; }
#side #s-as .lst { position: absolute; inset: 0; display: flex; align-items: center; gap: 0; } #side #s-as .listen { position: relative; flex: 1; height: 52px; aspect-ratio: auto; border-radius: 18px !important; flex-direction: row; gap: 12px; padding: 0 12px; justify-content: flex-start; font-size: 13px; text-align: left; box-shadow: none !important; }
#side #s-as .listen .orbi ha-icon { --mdc-icon-size: 30px; } #side #s-as .listen .orbt { text-align: left; max-width: none; font-size: 13px; } #side #s-as .listen::before, #side #s-as .listen::after { display: none; } #side #s-as .mic { display: none !important; }
.lt2 { display: grid; grid-auto-flow: column; grid-auto-columns: minmax(0, 1fr); gap: 12px; padding: 14px 16px 16px; position: relative; align-items: stretch; }
.lt2 .lcol { display: flex; flex-direction: column; gap: 7px; min-width: 0; } .lt2 .lcol h3 { margin: 0 0 2px; font-size: 12px; letter-spacing: .1em; font-weight: 800; color: var(--ink2); text-transform: uppercase; display: flex; align-items: center; gap: 7px; padding: 0 4px; }
.lt2 .lcol h3 i { width: 7px; height: 7px; border-radius: 50%; background: var(--line); flex: none; } .lt2 .lcol h3 i.on { background: var(--warn); box-shadow: 0 0 6px var(--warn); }
.lq2 { flex: none; height: 56px; min-height: 0; border: 1px solid var(--line); border-radius: 18px; padding: 0 12px; display: flex; align-items: center; gap: 8px; background: var(--chip); color: var(--ink); font: inherit; cursor: pointer; text-align: left; box-sizing: border-box; }
.lq2.on { background: linear-gradient(135deg, color-mix(in srgb, var(--info) 38%, transparent), color-mix(in srgb, var(--info) 16%, transparent)); border-color: var(--info); }
.lq2 .nm { flex: 1; min-width: 0; font-size: 14px; font-weight: 800; line-height: 1.15; } .lq2 .nm small { display: block; font-size: 11px; font-weight: 600; opacity: .7; margin-top: 3px; }
.lq2 .sw2 { width: 46px; height: 26px; border-radius: 99px; background: var(--line); position: relative; flex: none; } .lq2 .sw2::after { content: ""; position: absolute; left: 3px; top: 3px; width: 20px; height: 20px; border-radius: 50%; background: var(--ink2); transition: left .15s; } .lq2.on .sw2 { background: var(--info); } .lq2.on .sw2::after { left: 23px; background: #07131f; }
.off2 { position: absolute; right: 14px; top: -38px; display: flex; align-items: center; gap: 8px; height: 32px; padding: 0 14px; border: 0; border-radius: 99px; background: color-mix(in srgb, var(--warn) 30%, transparent); color: var(--warn); font: inherit; font-size: 13px; font-weight: 800; cursor: pointer; box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--warn) 60%, transparent); } .off2 ha-icon { --mdc-icon-size: 16px; }
.lq2.aoff { background: color-mix(in srgb, var(--warn) 24%, transparent); border-color: color-mix(in srgb, var(--warn) 60%, transparent); color: var(--warn); } .lq2.aoff small { color: var(--warn); opacity: .85; } .lq2.aoff ha-icon { --mdc-icon-size: 26px; color: var(--warn); flex: none; }
.lcn { font-size: 12px; font-weight: 700; color: var(--info); }
/* ===== Aurora: usprawnienia (reszta w porzadku, szkola 2-liniowa, prognoza godzinowa, wyrozniony kafelek, suwak jasnosci) ===== */
.okh { font-size: 10.5px; letter-spacing: .12em; font-weight: 700; color: var(--ink2); margin: 8px 0 2px; } .ok1 { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 700; min-height: 26px; } .ok1 ha-icon { --mdc-icon-size: 16px; color: var(--good); flex: none; } .ok1 small { margin-left: auto; font-size: 11px; font-weight: 600; color: var(--ink2); }
.scw.s2l { min-height: 40px; gap: 10px; } .scw.s2l .av { width: 28px; height: 28px; border-radius: 50%; display: grid; place-items: center; font-size: 12.5px; font-weight: 800; color: #07131f; flex: none; } .scw.s2l .st small { display: block; }
.hrs { display: flex; gap: 4px; margin-top: 6px; position: relative; z-index: 1; } .hrs .hr { flex: 1; min-width: 0; display: flex; flex-direction: column; align-items: center; gap: 1px; padding: 3px 0; border-radius: 12px; background: rgba(7,12,30,.35); font-size: 11px; font-weight: 700; color: #eef2ff; } .hrs .t { opacity: .75; font-weight: 600; } .hrs .b { width: 10px; height: 20px; border-radius: 6px; background: rgba(255,255,255,.12); display: flex; align-items: flex-end; overflow: hidden; } .hrs .b i { display: block; width: 100%; border-radius: 6px; background: linear-gradient(#9fd0ff, #38bdf8); } .hrs .p { color: #9fd0ff; font-size: 10px; } .hrs .c { font-size: 12.5px; font-weight: 800; }
.app.sd .hero .hh > .mini { display: none; } .app.sd #s-hero > .hero { display: grid; grid-template-columns: auto minmax(0, 1fr); align-content: start; align-items: center; gap: 6px 10px; } .app.sd #s-hero > .hero > .hrs, .app.sd #s-hero > .hero > .hh { grid-column: 1 / -1; margin-top: 0; } .app.sd #s-hero > .hero > .mini { display: flex; flex-direction: column; gap: 5px; margin: 0; align-items: flex-start; } .app.sd #s-hero > .hero > .wx { margin: 0; } .app.sd .hero .hh .hhl { max-height: 30px; }
.app.sd .room .nm { flex-wrap: wrap; row-gap: 3px; } .app.sd .room.wn { border-color: rgba(251,191,36,.75) !important; box-shadow: 0 0 0 1px rgba(251,191,36,.35), 0 0 22px rgba(251,191,36,.28), inset 0 0 26px rgba(251,191,36,.08) !important; } .wb { font-size: 11px; font-weight: 800; padding: 3px 9px; border-radius: 99px; background: rgba(251,191,36,.25); color: #fde68a; flex: none; white-space: nowrap; }
.lpbd { position: fixed; inset: 0; z-index: 40; background: rgba(3,6,16,.35); } .lpop { position: fixed; box-sizing: border-box; padding: 12px 14px; border-radius: 18px; background: var(--bg1); border: 1px solid var(--info); box-shadow: 0 16px 34px rgba(0,0,0,.55); display: flex; flex-direction: column; gap: 10px; color: var(--ink); } .lpop .pt { font-size: 12px; font-weight: 800; } .lpop .pr { display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: var(--ink2); font-weight: 600; } .lpop .pr b { font-size: 15px; color: var(--ink); font-weight: 800; }
.lpop input[type=range] { -webkit-appearance: none; appearance: none; width: 100%; height: 30px; border-radius: 99px; background: var(--chip); outline: 0; margin: 0; } .lpop input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 32px; height: 32px; border-radius: 50%; background: var(--ink); box-shadow: 0 2px 10px rgba(0,0,0,.5); border: 0; } .lpop input[type=range]::-moz-range-thumb { width: 32px; height: 32px; border-radius: 50%; background: var(--ink); border: 0; }
.mq { display: block; flex: 1 1 0; min-width: 0; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; container-type: inline-size; } .mq > i { display: inline-block; font-style: normal; animation: mqs 12s ease-in-out infinite alternate; will-change: transform; }
@keyframes mqs { 0%, 18% { transform: translateX(0); } 82%, 100% { transform: translateX(min(0px, calc(100cqw - 100%))); } }
@media (prefers-reduced-motion: reduce) { .mq > i { animation: none; } }

.dev.on { color: #3a3552; box-shadow: 0 4px 14px rgba(0,0,0,.08); }
.dev:active { transform: scale(.95); }
:host(:not(.dark)) .room .dev, :host(:not(.dark)) .room .met div { background: rgba(124,106,190,.1); } :host(:not(.dark)) .room > .wm { opacity: .22; }   /* jasny motyw: przyciski i metryki odcinaja sie od bialego kafla, ikona pokoju widoczna */
.wash { margin-top: 10px; display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 16px; background: var(--chip); font-size: 12.5px; font-weight: 800; color: var(--ink2); }
.wash.run { background: #d3e8ff; color: #2f6db5; } .wash.end { background: #d4f5e2; color: #2f9d6c; }
:host(.dark) .wash.run { background: rgba(90,155,224,.22); color: #9cc8ff; } :host(.dark) .wash.end { background: rgba(63,178,127,.22); color: #7fe6b6; }
.rvg { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); column-gap: 12px; align-items: start; } .rvb { min-width: 0; } @media (max-width: 700px) { .rvg > .rvb { grid-column: 1 / -1 !important; } }
.room .wash { margin-top: 8px; gap: 8px; padding: 9px 10px; line-height: 1.25; } .room .wash ha-icon { --mdc-icon-size: 20px; flex: none; }
.wash.run ha-icon { animation: sway 2.6s ease-in-out infinite; }
@keyframes sway { 0%,100% { transform: rotate(-6deg); } 50% { transform: rotate(6deg); } }

/* powietrze */
.air { padding: 16px; display: flex; align-items: center; gap: 16px; }
.ring { width: 96px; height: 96px; flex: none; position: relative; }
.ring svg { width: 100%; height: 100%; transform: rotate(-90deg); } .ring .c { position: absolute; inset: 0; display: grid; place-content: center; text-align: center; }
.ring b { font-size: 24px; font-weight: 800; line-height: 1; } .ring small { font-size: 10.5px; font-weight: 800; color: var(--ink2); letter-spacing: .1em; }
.air .tx { flex: 1; min-width: 0; } .air .tt { font-weight: 800; font-size: 17px; } .air .ss { font-size: 12.5px; color: var(--ink2); font-weight: 600; margin: 3px 0 10px; }

/* paliwa */
.fuel { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.fu { padding: 14px 8px; text-align: center; }
.air, .fu, .cal { position: relative; overflow: hidden; } .air > *, .fu > *, .cal > * { position: relative; z-index: 1; } .air > .wm, .fu > .wm, .cal > .wm { position: absolute; z-index: 0; right: -14px; bottom: -18px; width: 120px; height: 120px; --mdc-icon-size: 120px; opacity: .1; pointer-events: none; transform: rotate(-12deg); } .fu > .wm { width: 80px; height: 80px; --mdc-icon-size: 80px; right: -10px; bottom: -12px; } .cal > .wm { width: 150px; height: 150px; --mdc-icon-size: 150px; }
:host(:not(.dark)) .air > .wm, :host(:not(.dark)) .fu > .wm, :host(:not(.dark)) .cal > .wm { opacity: .22; }
.fu .n { font-size: 11.5px; font-weight: 800; letter-spacing: .1em; color: var(--ink2); }
.fu .p { font-size: 22px; font-weight: 800; margin: 4px 0 2px; letter-spacing: -.01em; } .fu .p small { font-size: 11px; opacity: .6; font-weight: 700; }
.fu .tr { font-size: 11.5px; font-weight: 800; border-radius: 999px; display: inline-block; padding: 2px 9px; background: var(--chip); }
.fu .tr.up { color: var(--bad); } .fu .tr.dn { color: var(--good); }

/* kalendarz */
.cal { padding: 8px 14px; }
.ev { display: flex; align-items: center; gap: 12px; padding: 11px 0; border-bottom: 1px solid var(--line); }
.ev:last-child { border: 0; }
.ev .dt { width: 48px; height: 52px; border-radius: 16px; background: #e6dcff; color: #6b55c9; display: flex; flex-direction: column; align-items: center; justify-content: center; flex: none; line-height: 1.05; }
:host(.dark) .ev .dt { background: rgba(143,120,224,.25); color: #cdbfff; }
.ev .dt b { font-size: 19px; font-weight: 800; } .ev .dt small { font-size: 10px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }
.ev .tt { font-weight: 800; font-size: 14.5px; } .ev .wh { font-size: 12px; color: var(--ink2); font-weight: 600; margin-top: 2px; }
.empty { color: var(--ink2); font-weight: 700; font-size: 13px; padding: 14px 4px; text-align: center; }

/* asystent */
.as { padding: 14px; }

.m { padding: 10px 13px; border-radius: 18px; font-size: 13.5px; font-weight: 600; line-height: 1.35; max-width: 88%; white-space: pre-wrap; }
.m.u { align-self: flex-end; background: #dcd3ff; color: #3a3552; border-bottom-right-radius: 6px; }
.m.a { align-self: flex-start; background: var(--chip); border-bottom-left-radius: 6px; }
:host(.dark) .m.u { background: rgba(143,120,224,.35); color: #f1eefc; }
.inp { display: flex; gap: 8px; }
.inp input { flex: 1; min-width: 0; border: 1px solid var(--line); background: var(--chip); color: var(--ink); border-radius: 999px; padding: 12px 16px; font: inherit; font-size: 14px; font-weight: 600; outline: 0; }
.inp input:focus { border-color: #8f78e0; }
.send { border: 0; width: 46px; height: 46px; border-radius: 50%; background: linear-gradient(135deg, #b9a6ff, #ff9fc6); color: #fff; cursor: pointer; display: grid; place-items: center; flex: none; }

.lst { display: flex; gap: 10px; align-items: center; } .listen { flex: 1; border: 0; border-radius: 999px; padding: 16px 20px; font: inherit; font-weight: 800; font-size: 15px; color: #fff; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 10px; background: linear-gradient(135deg, #b9a6ff, #ff9fc6); box-shadow: var(--shadow); } .listen ha-icon { --mdc-icon-size: 26px; } .listen.on { animation: lpulse 1.4s ease-in-out infinite; } @keyframes lpulse { 50% { box-shadow: 0 0 0 8px rgba(185,166,255,.35); } }

.card.chatx { padding: 12px 14px 14px; display: flex; flex-direction: column; } .chtop { display: flex; align-items: center; gap: 10px; margin-bottom: 6px; }
.chst { display: inline-flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 800; color: var(--ink2); letter-spacing: .04em; } .chst i { width: 9px; height: 9px; border-radius: 50%; background: #b9b5cf; } .chst.on { color: #8f78e0; } .chst.on i { background: #8f78e0; box-shadow: 0 0 0 4px rgba(143,120,224,.25); }
.chst { font-size: 15px; gap: 10px; letter-spacing: 0; } .chst i { width: 14px; height: 14px; } .chst.on.listening { color: #3f8fe0; } .chst.on.listening i { background: #3f8fe0; box-shadow: 0 0 0 5px rgba(63,143,224,.28); animation: lpulse2 1.1s ease-in-out infinite; }
.chst.on.processing { color: #d9a521; } .chst.on.processing i { background: #d9a521; box-shadow: 0 0 0 5px rgba(217,165,33,.28); animation: lpulse2 .7s ease-in-out infinite; } .chst.on.responding { color: #3fb27f; } .chst.on.responding i { background: #3fb27f; box-shadow: 0 0 0 5px rgba(63,178,127,.28); animation: lpulse2 .9s ease-in-out infinite; }
@keyframes lpulse2 { 50% { transform: scale(1.35); } }
.live { align-self: flex-start; display: inline-flex; align-items: center; gap: 10px; padding: 10px 16px 10px 10px; border-radius: 22px; margin: 4px 0 8px; font-size: 14px; font-weight: 800; background: rgba(63,143,224,.16); color: #3f8fe0; } .live .lic { width: 34px; height: 34px; border-radius: 50%; display: grid; place-items: center; background: #3f8fe0; color: #fff; animation: lpulse2 1.1s ease-in-out infinite; --mdc-icon-size: 20px; }
.live.processing { background: rgba(217,165,33,.16); color: #d9a521; } .live.processing .lic { background: #d9a521; animation-duration: .7s; } .live.responding { background: rgba(63,178,127,.16); color: #3fb27f; } .live.responding .lic { background: #3fb27f; animation-duration: .9s; }
.live .eq { display: inline-flex; align-items: center; gap: 3px; height: 22px; } .live .eq i { width: 4px; border-radius: 2px; background: currentColor; height: 6px; animation: eqb .9s ease-in-out infinite; } .live .eq i:nth-child(2) { animation-delay: .12s; } .live .eq i:nth-child(3) { animation-delay: .24s; } .live .eq i:nth-child(4) { animation-delay: .36s; } .live .eq i:nth-child(5) { animation-delay: .48s; } @keyframes eqb { 50% { height: 22px; } }
.pipesel { margin-left: auto; display: flex; align-items: center; gap: 10px; font-size: 12px; font-weight: 800; color: var(--ink2); text-transform: uppercase; letter-spacing: .08em; } .pipesel select { font: inherit; font-size: 13.5px; letter-spacing: 0; text-transform: none; font-weight: 800; color: var(--ink); background: var(--card); border: 1px solid var(--line); border-radius: 999px; padding: 9px 16px; max-width: 280px; cursor: pointer; } .pipesel option { background: var(--bg1); color: var(--ink); }
.chclr { border: 0; font: inherit; font-size: 12px; font-weight: 800; color: var(--ink2); background: var(--chip); border-radius: 999px; padding: 6px 12px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; } .chclr ha-icon { --mdc-icon-size: 16px; }
.chlog { overflow-y: auto; height: min(52vh, 460px); min-height: 220px; padding: 2px 2px 8px; scrollbar-width: none; } .chlog::-webkit-scrollbar { display: none; }
.chform { margin-top: 8px; align-items: center; } .mic2 { border: 0; width: 46px; height: 46px; border-radius: 50%; background: var(--chip); color: var(--ink2); cursor: pointer; display: grid; place-items: center; flex: none; } .mic2.on { background: #8f78e0; color: #fff; }
.m.typing { display: inline-flex; gap: 5px; padding: 14px 16px; } .m.typing i { width: 7px; height: 7px; border-radius: 50%; background: var(--ink2); opacity: .5; animation: tp 1s infinite ease-in-out; } .m.typing i:nth-child(2) { animation-delay: .15s; } .m.typing i:nth-child(3) { animation-delay: .3s; } @keyframes tp { 0%, 80%, 100% { opacity: .25; } 40% { opacity: 1; } }
.cv { margin-bottom: 14px; display: flex; flex-direction: column; } .cm { font-size: 10.5px; font-weight: 800; color: var(--ink2); margin: 0 4px 4px; } .cv .m { margin-bottom: 5px; } .tc { display: flex; flex-wrap: wrap; gap: 5px; margin: 2px 4px; } .tc span { font-size: 10.5px; font-weight: 800; padding: 2px 9px; border-radius: 99px; background: var(--chip); color: var(--ink2); }

/* linki */
.lk.alarm { background: #ffd0d8; color: #b3243f; border: 2px solid #e5576f; box-shadow: 0 0 14px rgba(229,87,111,.55), var(--shadow); }
:host(.dark) .lk.alarm { background: rgba(229,87,111,.35); color: #ffc2cd; border-color: #ff6b85; }
.lk.glow { border-color: #e8794a; box-shadow: 0 0 14px rgba(232,121,74,.5), var(--shadow); }
.lk { position: relative; } .lk .lkb { position: absolute; top: 6px; right: 8px; min-width: 20px; height: 20px; padding: 0 6px; box-sizing: border-box; border-radius: 99px; background: #e5576f; color: #fff; font-weight: 800; font-size: 12px; line-height: 20px; font-style: normal; text-align: center; box-shadow: 0 2px 6px rgba(229,87,111,.45); }
.links { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.lk { border: 0; font: inherit; cursor: pointer; padding: 14px 6px; border-radius: 20px; display: flex; flex-direction: column; align-items: center; gap: 6px; font-size: 11.5px; font-weight: 800;
  color: var(--ink); background: var(--card); border: 1px solid var(--line); box-shadow: var(--shadow); }
.lk .i { width: 38px; height: 38px; border-radius: 14px; display: grid; place-items: center; }

/* dolny pasek */
.nav { position: fixed; left: 50%; transform: translateX(-50%); bottom: 14px; z-index: 5; display: flex; gap: 4px; padding: 6px; border-radius: 999px; background: var(--card);
  backdrop-filter: blur(20px) saturate(1.4); -webkit-backdrop-filter: blur(20px) saturate(1.4); border: 1px solid var(--line); box-shadow: 0 10px 32px rgba(90,70,160,.22); }
.nav button { border: 0; background: none; font: inherit; cursor: pointer; color: var(--ink2); width: 54px; height: 46px; border-radius: 999px; display: grid; place-items: center; transition: all .15s; }
.nav button.act { background: linear-gradient(135deg, #cdbfff, #ffc6dc); color: #3a3552; }
.sk { padding: 40px; text-align: center; color: var(--ink2); font-weight: 700; }.hdr { display: flex; align-items: center; gap: 12px; margin: 4px 0 16px; position: sticky; top: 0; z-index: 4; padding: 8px 0 10px; } .hdr.stk { background: linear-gradient(var(--bg1) 90%, transparent); } .hsen { display: block; height: 1px; margin-bottom: -1px; pointer-events: none; } .hdr .atg { margin-left: 12px; }
.hdr .back { border: 0; width: 42px; height: 42px; border-radius: 50%; background: var(--card); color: var(--ink); cursor: pointer; display: grid; place-items: center; box-shadow: var(--shadow); flex: none; }
.hdr .bub { width: 42px; height: 42px; border-radius: 16px; display: grid; place-items: center; flex: none; } .hdr .ht { font-size: 22px; font-weight: 800; } .hdr .hclk { margin-left: auto; padding-left: 12px; font-size: 22px; font-weight: 300; font-variant-numeric: tabular-nums; letter-spacing: -.01em; color: var(--ink2); flex: none; }
.pillrow { margin: -4px 0 12px; } .pill { display: inline-flex; align-items: center; gap: 7px; background: var(--chip); border-radius: 999px; padding: 6px 13px; font-size: 12.5px; font-weight: 800; color: var(--ink2); }
.pill i { width: 8px; height: 8px; border-radius: 50%; background: #b9b5cf; } .pill.on i { background: var(--good); box-shadow: 0 0 0 4px rgba(63,178,127,.2); }
.bigs.wbigs { grid-template-columns: repeat(4, 1fr); } .whs { display: flex; gap: 8px; overflow-x: auto; scrollbar-width: none; padding: 4px 0; } .whs::-webkit-scrollbar { display: none; }
.wh { flex: none; width: 62px; display: flex; flex-direction: column; align-items: center; gap: 3px; padding: 8px 4px; border-radius: 16px; background: var(--chip); font-size: 12px; font-weight: 700; color: var(--ink2); } .wh b { font-size: 16px; color: var(--ink); } .wh ha-icon { --mdc-icon-size: 26px; color: #5a9be0; } .wh em { font-style: normal; font-size: 10.5px; color: #5a9be0; min-height: 13px; }
.wwarns { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 10px; margin-bottom: 14px; } .wwarn { display: flex; gap: 12px; align-items: flex-start; padding: 14px 16px; border-radius: 22px; box-shadow: var(--shadow); } .wwarn > ha-icon { --mdc-icon-size: 34px; flex: none; } .wwarn b { display: block; font-size: 16px; } .wwarn span { display: block; font-size: 12px; font-weight: 800; opacity: .85; margin-top: 2px; } .wwarn p { margin: 8px 0 0; font-size: 13px; font-weight: 600; line-height: 1.4; }
:host(.dark) .wwarn { filter: brightness(.9); }
.twoc > div { min-width: 0; } .wd { display: flex; align-items: center; gap: 12px; padding: 10px 2px; border-bottom: 1px solid var(--line); } .wd:last-child { border-bottom: 0; } .wd .n { width: 82px; font-weight: 800; } .wd ha-icon { color: #5a9be0; --mdc-icon-size: 26px; } .wd .c { flex: 1; font-size: 13px; color: var(--ink2); font-weight: 700; } .wd small { font-size: 11.5px; color: #5a9be0; } .wd b { font-size: 15px; }
.wsun { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; text-align: center; padding: 6px 0; } .wsun > div { display: flex; flex-direction: column; align-items: center; gap: 3px; } .wsun span { font-size: 11px; font-weight: 800; letter-spacing: .06em; text-transform: uppercase; color: var(--ink2); } .wsun b { font-size: 17px; } .wsun ha-icon { --mdc-icon-size: 28px; }
@media (max-width: 899px) { .bigs.wbigs { grid-template-columns: repeat(2, 1fr); } }
.bigs { display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 10px; margin-bottom: 12px; }
.big { background: var(--card); border: 1px solid var(--line); border-radius: 22px; padding: 14px 16px; box-shadow: var(--shadow); } .big span { font-size: 11px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: var(--ink2); }
.big b { display: block; font-size: 34px; font-weight: 800; margin-top: 4px; letter-spacing: -.02em; } .big small { font-size: 15px; opacity: .6; } .big.warn b { color: var(--warn); } .big.bad b { color: var(--bad); }
.thr { display: flex; align-items: center; gap: 10px; padding: 8px 0; } .thr + .thr { border-top: 1px solid var(--line); } .thr .ln { flex: 1; font-weight: 700; } .thr button { width: 38px; height: 38px; border-radius: 12px; border: 1px solid var(--line); background: var(--chip); color: var(--ink); font: inherit; font-size: 20px; font-weight: 800; cursor: pointer; } .thr button:active { transform: scale(.92); } .thr b { min-width: 64px; text-align: center; font-size: 17px; }
.dgrid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; } .dcard { display: flex; flex-direction: column; gap: 8px; }
.dcard .dev { flex-wrap: wrap; padding: 13px; } .dev em { display: block; width: 100%; font-style: normal; font-size: 11px; opacity: .7; font-weight: 700; margin-left: 28px; margin-top: -6px; }
.sch { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; } .sch button { border: 2px solid transparent; background: var(--chip); border-radius: 18px; padding: 10px 6px; font: inherit; font-weight: 800; font-size: 12.5px; color: var(--ink); cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 6px; } .sch button.act { border-color: var(--ink2); } .sch i { width: 34px; height: 34px; border-radius: 50%; display: block; box-shadow: var(--shadow); }
.hue { display: flex; align-items: center; gap: 10px; margin-top: 12px; font-size: 12.5px; font-weight: 800; } .hue span { flex: none; } .hue .hr { flex: 1; margin: 0; } .hd { width: 26px; height: 26px; border-radius: 50%; flex: none; box-shadow: var(--shadow); }
.tls { display: flex; flex-direction: column; gap: 4px; } .tl { display: grid; grid-template-columns: 62px repeat(24, 1fr); gap: 2px; align-items: center; font-size: 10px; font-weight: 800; color: var(--ink2); } .tl i { height: 14px; border-radius: 4px; background: var(--info); display: block; } .tl em { font-style: normal; font-size: 8.5px; text-align: left; color: var(--ink2); white-space: nowrap; overflow: visible; }
.chips { display: flex; flex-wrap: wrap; gap: 6px; margin: 4px 0 10px; } .chips button { border: 0; font: inherit; font-weight: 800; font-size: 12px; padding: 7px 13px; border-radius: 99px; background: var(--chip); color: var(--ink2); cursor: pointer; } .chips button.act { background: linear-gradient(135deg, #cdbfff, #ffc6dc); color: #3a3552; }
.ds { font-size: 11px; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: var(--ink2); padding: 10px 4px 2px; }
.iso { position: relative; width: 100%; margin-top: 6px; } .iso svg { width: 100%; height: 100%; display: block; overflow: visible; } .isr .fl { transition: fill .3s, fill-opacity .3s; } .isr.on .fl { animation: isp 2s ease-in-out infinite; } @keyframes isp { 50% { fill-opacity: .35; } }
.p2tg { display: inline-flex; margin: 4px 0 2px; border-radius: 12px; overflow: hidden; border: 1px solid rgba(150,140,190,.35); } .p2tg button { border: 0; background: transparent; color: inherit; font: inherit; font-weight: 600; padding: 7px 20px; cursor: pointer; } .p2tg button.on { background: #35aaa0; color: #fff; } .p3h { height: calc(100vh - 150px); min-height: 300px; border-radius: 16px; overflow: hidden; margin-top: 6px; position: relative; }
.iso.bp { width: min(100%, calc((100vh - 150px) * .725)); margin: 6px auto 0; } .iso.p2 { width: min(100%, calc((100vh - 130px) * 1.41)); margin: 6px auto 0; } .iso.p2 .isn { font-size: 13px; } .iso.p2 .isn span { font-size: 11.5px; } .iso.p2 .isb { width: 40px; height: 40px; } .iso.p2 .isb ha-icon { --mdc-icon-size: 24px; }
.iso.p3 .isn { font-size: 13px; } .iso.p3 .isn span { font-size: 11.5px; } .iso.p3 .isb { width: 40px; height: 40px; } .iso.p3 .isb ha-icon { --mdc-icon-size: 24px; } @media (min-width: 1100px) { .iso.p3 { width: min(1240px, calc(100% + 170px)); margin-left: -85px; } }
.iso.bp img { width: 100%; height: 100%; display: block; border-radius: 16px; } @keyframes isp2 { 50% { opacity: .07; } }
.iso.bp .isn { text-shadow: 0 0 4px #04101e, 0 0 8px #04101e; } .iso.bp .isn b { color: #e8f4ff; } .iso.bp .isn span { color: #8fd3ff; }
.iso.bp .isb { background: rgba(14, 40, 78, .88); color: #7fd6ff; box-shadow: 0 0 0 1px rgba(80, 200, 255, .55); } .iso.bp .isb.st.warn { background: #fff0c2; color: #8f6a00; } .iso.bp .isb.st.run { background: #d3e8ff; color: #2f6db5; }
.isn { position: absolute; transform: translate(-50%, -50%); text-align: center; font-size: 11px; line-height: 1.2; cursor: pointer; white-space: nowrap; text-shadow: 0 0 4px var(--bg1), 0 0 8px var(--bg1); } .isn b { color: var(--ink); display: block; font-weight: 900; letter-spacing: .04em; text-transform: uppercase; } .isn span { font-weight: 800; color: var(--ink2); font-size: 10px; }
.isb { position: absolute; transform: translate(-50%, -50%); width: 34px; height: 34px; border-radius: 50%; border: 0; padding: 0; display: grid; place-items: center; background: var(--chip); color: var(--ink2); cursor: pointer; flex: none; min-width: 0; box-shadow: var(--shadow); } .isb ha-icon { --mdc-icon-size: 20px; } .isb.st { cursor: default; } .isb.st.warn { background: #fff0c2; color: #8f6a00; } .isb.st.run { background: #dbeafe; color: #2f6db5; }
.hint { font-size: 11.5px; color: var(--ink2); text-align: center; margin: 12px 0 0; }
.rng { width: 100%; accent-color: #8f78e0; } .chartc { padding: 14px; margin-bottom: 4px; } .chart { width: 100%; height: auto; display: block; } .chart .ax { font-size: 8px; fill: var(--ink2); font-weight: 700; } .app.an .chart .ax { font-size: 10px; } .chart .gl { stroke: var(--ink2); stroke-opacity: .2; stroke-width: .6; stroke-dasharray: 2 3; }
.mm { display: flex; justify-content: space-between; font-size: 11.5px; color: var(--ink2); font-weight: 700; margin-top: 4px; } .mm b { color: var(--ink); }
.list { padding: 6px 14px; } .lr { display: flex; align-items: center; gap: 12px; padding: 11px 0; border-bottom: 1px solid var(--line); } .lr:last-child { border: 0; }
.lr .ln { flex: 0 0 40%; font-size: 13.5px; font-weight: 800; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; } .lr b { min-width: 44px; margin-left: auto; text-align: right; font-size: 13.5px; }
.lr.lg .ln { flex: 1; white-space: normal; } .sk .lr .ln { flex: 1; white-space: normal; overflow: visible; text-align: left; } .sk .lr > b { flex: none; white-space: nowrap; } .lr.lg ha-icon { --mdc-icon-size: 20px; color: var(--ink2); } .lr.lg.s2 ha-icon, .lr.lg.s2 b { color: var(--bad); } .lr.lg.s1 ha-icon { color: var(--warn); }
.bar { flex: 1; height: 9px; border-radius: 99px; background: rgba(150,140,190,.2); overflow: hidden; } .bar i { display: block; height: 100%; border-radius: 99px; }
.iss em { margin-left: auto; font-style: normal; font-size: 10.5px; letter-spacing: .08em; text-transform: uppercase; opacity: .7; font-weight: 800; }
.foot { text-align: center; font-size: 12px; color: var(--ink2); font-weight: 700; margin: 14px 0; }
.kc { padding: 14px 16px; margin-bottom: 10px; } .kn { display: flex; align-items: center; gap: 8px; font-weight: 800; font-size: 15px; margin-bottom: 8px; } .kn em { margin-left: auto; font-style: normal; font-size: 11px; font-weight: 800; padding: 3px 10px; border-radius: 99px; }
.kn em.g { background: #d4f5e2; color: #2f9d6c; } .kn em.r { background: #ffdde3; color: #b8324f; }
.kr { display: flex; align-items: center; gap: 10px; margin: 6px 0; } .kr span { width: 44px; font-size: 11px; font-weight: 800; color: var(--ink2); text-transform: uppercase; letter-spacing: .06em; } .kr b { width: 52px; text-align: right; font-size: 13px; }
.gb { border: 0; border-radius: 10px; padding: 5px 10px; font: inherit; font-weight: 700; cursor: pointer; }
.gb.g0 { background: hsla(250,12%,60%,.22); color: hsl(250,12%,38%); } .gb.g1 { background: hsla(345,80%,60%,.2); color: hsl(345,65%,38%); } .gb.g2 { background: hsla(22,90%,55%,.2); color: hsl(22,75%,35%); }
.gb.g3 { background: hsla(45,95%,50%,.24); color: hsl(40,90%,30%); } .gb.g4 { background: hsla(85,65%,48%,.24); color: hsl(85,70%,26%); } .gb.g5 { background: hsla(160,60%,45%,.22); color: hsl(160,65%,26%); } .gb.g6 { background: hsla(145,65%,45%,.28); color: hsl(145,70%,24%); }
:host(.dark) .gb.g0 { color: hsl(250,25%,80%); } :host(.dark) .gb.g1 { color: hsl(345,90%,78%); } :host(.dark) .gb.g2 { color: hsl(22,95%,72%); } :host(.dark) .gb.g3 { color: hsl(45,95%,68%); }
:host(.dark) .gb.g4 { color: hsl(85,70%,68%); } :host(.dark) .gb.g5 { color: hsl(160,65%,70%); } :host(.dark) .gb.g6 { color: hsl(145,70%,70%); }
.gg { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; } .gc { padding: 11px 12px; } .gn { display: flex; align-items: center; gap: 7px; font-weight: 800; font-size: 12.5px; margin-bottom: 4px; } .gn small { margin-left: auto; opacity: .55; font-size: 10px; }
.f1c { padding: 14px 16px; margin-bottom: 12px; } .f1sc { max-height: 420px; overflow-y: auto; overscroll-behavior: contain; } .f1t { font-weight: 800; font-size: 16px; display: flex; align-items: center; gap: 10px; } .f1t img { height: 30px; border-radius: 6px; box-shadow: 0 2px 8px rgba(0,0,0,.18); }
.f1s { font-size: 12px; font-weight: 700; color: var(--ink2); margin-top: 2px; } .f1cd { font-size: 25px; font-weight: 900; margin: 10px 0 2px; color: var(--info); } .f1cd.rw { color: var(--warn); }
.f1r { display: flex; align-items: center; gap: 10px; padding: 7px 0; border-bottom: 1px solid var(--line); font-size: 13px; font-weight: 700; } .f1r:last-child { border: 0; } .f1r span.p { width: 22px; color: var(--ink2); font-weight: 900; }
.f1r b { margin-left: auto; font-weight: 800; } .f1r.cur { color: var(--warn); font-weight: 900; } .f1r.past { opacity: .55; }
.f1d { flex: 1; min-width: 0; position: relative; padding: 5px 9px; border-radius: 9px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; } .f1d i { position: absolute; left: 0; top: 0; bottom: 0; opacity: .25; border-left: 4px solid; }
.f1d span { position: relative; } .livebtn { display: inline-flex; align-items: center; gap: 7px; border: 1.5px solid #e8794a; background: rgba(232,121,74,.12); color: #e8794a; font: inherit; font-weight: 800; font-size: 13px; letter-spacing: .06em; padding: 7px 10px 7px 14px; border-radius: 16px; cursor: pointer; } .livebtn i { width: 8px; height: 8px; border-radius: 50%; background: var(--good); } .livebtn ha-icon { --mdc-icon-size: 18px; }
.fc { width: 66px; text-align: right; font-size: 11.5px; flex: none; } .f1h { font-size: 9.5px; font-weight: 800; color: var(--ink2); letter-spacing: .04em; padding-bottom: 2px; } .f1h .f1d span { font-size: 9.5px; letter-spacing: .06em; } .f1d small { color: var(--ink2); margin-left: 7px; font-size: 10.5px; } .f1w { display: flex; justify-content: space-between; font-size: 13px; font-weight: 700; padding: 4px 0; } .f1w span { color: var(--ink2); }
.trr { display: flex; align-items: flex-start; gap: 10px; padding: 8px 0; border-bottom: 1px solid var(--line); } .trr:last-child { border: 0; }
.trp { flex: none; width: 36px; height: 36px; border-radius: 50%; border: 0; display: grid; place-items: center; cursor: pointer; color: #fff; background: var(--tc, #8f78e0); --mdc-icon-size: 22px; padding: 0; } .trp.on { box-shadow: 0 0 0 3px var(--card), 0 0 0 5px var(--tc, #8f78e0); }
.trb { flex: 1; min-width: 0; } .trh { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 800; } .trh small { color: var(--ink2); font-weight: 700; font-size: 11px; } .trh em { margin-left: auto; font-style: normal; font-size: 11px; font-weight: 700; color: var(--ink2); }
.trx { font-size: 12.5px; font-weight: 600; color: var(--ink); margin-top: 3px; line-height: 1.35; opacity: .9; } .trx.no { color: var(--ink2); font-style: italic; }
.gn i { width: 8px; height: 8px; border-radius: 50%; } .gn i.g { background: var(--good); } .gn i.r { background: var(--bad); } .gc .kr span { width: 34px; font-size: 9.5px; } .gc .kr b { width: 42px; font-size: 11.5px; }
.tvs { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; } .tv { border: 1px solid var(--line); background: var(--card); color: var(--ink); font: inherit; border-radius: 22px; padding: 14px 6px; cursor: pointer; display: flex; flex-direction: column; align-items: center; gap: 4px; font-weight: 800; font-size: 12px; box-shadow: var(--shadow); }
.tv.act { background: #e6dcff; color: #3a3552; outline: 2px solid #8f78e0; } .tv em { font-style: normal; font-size: 10.5px; opacity: .65; } .tv ha-icon { --mdc-icon-size: 28px; }
.np { padding: 18px; } .npt { font-size: 18px; font-weight: 800; } .wh { font-size: 12px; color: var(--ink2); font-weight: 600; margin-top: 2px; }
.ctl { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 12px; } .ctl button { border: 0; background: var(--card); color: var(--ink); height: 62px; border-radius: 22px; cursor: pointer; box-shadow: var(--shadow); border: 1px solid var(--line); } .ctl button:active { transform: scale(.94); } .ctl ha-icon { --mdc-icon-size: 28px; }
.seg { display: flex; gap: 6px; background: var(--chip); padding: 5px; border-radius: 99px; margin-top: 8px; } .seg button { flex: 1; border: 0; background: none; font: inherit; font-weight: 800; font-size: 13px; color: var(--ink2); padding: 10px 6px; border-radius: 99px; cursor: pointer; } .seg button.act { background: linear-gradient(135deg, #cdbfff, #ffc6dc); color: #3a3552; }
.ev .cb { width: 5px; align-self: stretch; border-radius: 3px; flex: none; }
.ib { border: 0; width: 34px; height: 34px; border-radius: 12px; background: var(--chip); color: var(--ink2); cursor: pointer; display: grid; place-items: center; flex: none; } .ib.rd { color: var(--bad); } .ib ha-icon { --mdc-icon-size: 18px; }
.ev .wn { font-size: 12px; color: var(--ink2); font-weight: 600; margin-top: 2px; } .mon { padding: 12px; } .mnav { display: flex; align-items: center; gap: 6px; margin-bottom: 10px; }
.mnav select { font: inherit; font-weight: 800; font-size: 14px; color: var(--ink); background: var(--chip); border: 1px solid var(--line); border-radius: 12px; padding: 7px 8px; outline: 0; color-scheme: light; } :host(.dark) .mnav select { color-scheme: dark; }
.cfd { margin-bottom: 10px; } .cfb { width: 100%; display: flex; align-items: center; gap: 8px; padding: 5px 10px !important; font-size: 12.5px !important; font-weight: 700 !important; background: transparent !important; box-shadow: none !important; opacity: .85; } .cfb ha-icon { --mdc-icon-size: 20px; flex: none; } .cfb > span:first-of-type { flex: 1; text-align: left; } .cfdots { display: flex; gap: 4px; flex: none; } .cfdots i, .cdot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; flex: none; }
.cfp { margin-top: 8px; padding: 6px; border-radius: 16px; background: var(--chip); border: 1px solid var(--line); max-height: 46vh; overflow-y: auto; } .cfr { display: flex; align-items: center; gap: 10px; width: 100%; border: 0; background: transparent; color: inherit; font: inherit; font-size: 14px; font-weight: 700; padding: 11px 10px; border-radius: 12px; cursor: pointer; text-align: left; } .cfr + .cfr { border-top: 1px solid var(--line); }
.cfr .ck { width: 22px; height: 22px; border-radius: 7px; border: 2px solid var(--ink2); display: grid; place-items: center; flex: none; opacity: .6; } .cfr .ck ha-icon { --mdc-icon-size: 16px; opacity: 0; } .cfr.on .ck { background: #8f78e0; border-color: #8f78e0; opacity: 1; } .cfr.on .ck ha-icon { opacity: 1; color: #fff; } .cfr span { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; } .cfr:not(.on) span, .cfr:not(.on) .cdot { opacity: .5; }
.cfa { display: flex; gap: 8px; padding: 8px 4px 4px; } .cfa .chipb { flex: 1; }
.cfl { display: flex; flex-wrap: nowrap; gap: 6px; margin-bottom: 10px; } .chipb.fl { flex: 0 1 auto; min-width: 0; padding: 7px 11px; display: inline-flex; align-items: center; gap: 6px; opacity: .5; max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; } .chipb.fl.on { opacity: 1; box-shadow: inset 0 0 0 1.5px #8f78e0; } .chipb.fl i { width: 8px; height: 8px; border-radius: 50%; flex: none; }
.atg { margin-left: auto; border: 0; width: 34px; height: 34px; border-radius: 12px; background: var(--chip); color: var(--ink2); display: grid; place-items: center; cursor: pointer; flex: none; } .atg ha-icon { --mdc-icon-size: 20px; } .atg.on { box-shadow: 0 3px 10px rgba(0,0,0,.1); }
.chipb.add { display: inline-flex; align-items: center; gap: 4px; margin-left: 6px; color: #3a3552; background: linear-gradient(135deg, #cdbfff, #ffc6dc); } .chipb.add ha-icon { --mdc-icon-size: 16px; }
.chipb { border: 0; font: inherit; font-weight: 800; font-size: 12px; padding: 7px 13px; border-radius: 99px; background: var(--chip); color: var(--ink); cursor: pointer; }
.mgrid { display: grid; grid-template-columns: 22px repeat(7, 1fr); gap: 4px; } .wk { align-self: center; text-align: center; font-size: 10.5px; font-weight: 800; color: var(--ink2); opacity: .75; } .mh.wkh { font-size: 9.5px; letter-spacing: 0; } .mh { text-align: center; font-size: 11px; font-weight: 800; color: var(--ink2); padding: 2px 0 4px; letter-spacing: .06em; } .mh.we { color: var(--bad); opacity: .7; }
.mc { border: 0; font: inherit; background: var(--chip); color: var(--ink); border-radius: 14px; min-height: 56px; padding: 5px 2px 4px; cursor: pointer; display: flex; flex-direction: column; align-items: center; justify-content: space-between; }
.mc b { font-size: 16px; font-weight: 800; } .mc.out { opacity: .38; } .mc.we b { color: var(--bad); } .mc.today { background: linear-gradient(135deg, #cdbfff, #ffc6dc); color: #3a3552; } .mc.today b { color: #3a3552; } .mc.sel { outline: 2.5px solid #8f78e0; outline-offset: -2px; }
.mc.hol b { color: var(--bad); } .mc .hn { display: none; font-size: 9px; font-weight: 800; color: var(--bad); line-height: 1.1; max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; padding: 0 3px; box-sizing: border-box; } .ev.hol .cb { background: var(--bad) !important; } .ev.hol .dt b { color: var(--bad); }
@media (min-width: 700px) { .mc .hn { display: block; } }
.dots { display: flex; gap: 3px; height: 10px; align-items: center; } .dots i { width: 8px; height: 8px; border-radius: 50%; } .dots em { font-style: normal; font-size: 9px; font-weight: 800; line-height: 1; }
@media (min-width: 900px) { .mc { min-height: 56px; } }

#popbd { position: fixed; inset: 0; z-index: 18; touch-action: none; overscroll-behavior: contain; background: rgba(40,30,70,.45); backdrop-filter: blur(4px); }
#sub.pv { position: fixed; z-index: 19; left: 50%; top: 50%; transform: translate(-50%, -50%); width: min(1100px, 94vw); max-height: 90vh; overflow-y: auto; overflow-x: hidden; background: var(--bg1); border-radius: 26px; padding: 18px 20px 24px; box-shadow: 0 20px 60px rgba(30,20,60,.45); border: 1px solid var(--line); box-sizing: border-box; overscroll-behavior: contain; }
:host(.dark) #sub.pv { background: #26223a; }
#sub.pv { padding-top: 0; } #sub.pv > .hdr { position: sticky; top: 0; z-index: 5; margin: 0 -20px 10px; padding: 18px 20px 10px; background: var(--bg1); }
:host(.dark) #sub.pv > .hdr { background: #26223a; }
.sheet { position: fixed; inset: 0; z-index: 20; background: rgba(40,30,70,.4); backdrop-filter: blur(4px); display: flex; align-items: flex-end; justify-content: center; }
.fm { width: 100%; max-width: 560px; max-height: 92vh; overflow-y: auto; background: var(--bg1); color: var(--ink); border-radius: 28px 28px 0 0; padding: 18px 18px 26px; display: flex; flex-direction: column; gap: 10px; }
:host(.dark) .fm { background: #26223a; } .ft { font-size: 18px; font-weight: 800; } .fm label { display: flex; flex-direction: column; gap: 4px; font-size: 11px; font-weight: 800; letter-spacing: .06em; color: var(--ink2); text-transform: uppercase; flex: 1; }
.fm input[type=text], .fm input[type=date], .fm input[type=time], .fm select { font: inherit; font-size: 15px; font-weight: 600; color: var(--ink); background: var(--chip); border: 1px solid var(--line); border-radius: 14px; padding: 11px 12px; outline: 0; color-scheme: light; }
:host(.dark) .fm input, :host(.dark) .fm select { color-scheme: dark; } .fm .chk { flex-direction: row; align-items: center; gap: 8px; } .two { display: flex; gap: 10px; } .fm .tm { flex: 0 0 38%; }
.fm button { flex: 1; border: 0; font: inherit; font-weight: 800; padding: 13px; border-radius: 16px; cursor: pointer; } .fm .pri { background: linear-gradient(135deg, #b9a6ff, #ff9fc6); color: #fff; } .fm .ghost { background: var(--chip); color: var(--ink); } .fm .msg { color: var(--bad); font-weight: 700; font-size: 13px; min-height: 16px; }
.hero .hh { margin-top: 12px; position: relative; z-index: 1; display: flex; flex-direction: column; gap: 5px; }
.hero .hr { display: flex; align-items: center; gap: 9px; background: rgba(255,255,255,.5); border-radius: 14px; padding: 6px 10px; font-size: 12.5px; font-weight: 800; line-height: 1.2; }
:host(.dark) .hero .hr { background: rgba(255,255,255,.12); } .hero .hr ha-icon { --mdc-icon-size: 19px; flex: none; } .hero .hr small { display: block; font-weight: 600; opacity: .75; font-size: 11px; }
.hero .hr.s1 { background: rgba(255,224,130,.6); color: #7a5a00; } :host(.dark) .hero .hr.s1 { background: rgba(217,165,33,.28); color: #ffe08a; }
.hero .hr .hb { margin-left: auto; border: 0; border-radius: 999px; padding: 4px 10px; font: inherit; font-size: 11.5px; font-weight: 800; background: rgba(255,255,255,.75); color: inherit; cursor: pointer; flex: none; }
:host(.dark) .hero .hr .hb { background: rgba(255,255,255,.18); }
:host(.dark) .iss .hb { background: rgba(255,255,255,.14); }
#home.ord { display: flex; flex-direction: column; }
#home.free { display: flex; flex-direction: column; } #home.free > section { order: var(--op); }
.bigs.v-k .big { padding: 8px 12px; border-radius: 16px; } .bigs.v-k .big b { font-size: 22px; margin-top: 2px; }
.dgrid[style*="--dc"] { grid-template-columns: repeat(var(--dc), 1fr); } @media (max-width: 899px) { .dgrid[style*="--dc"] { grid-template-columns: repeat(2, 1fr); } }
.dgrid.v-l, .dgrid.v-s, .dgrid.v-r { grid-template-columns: 1fr !important; gap: 6px !important; }
.dgrid.v-l .dev, .dgrid.v-s .dev, .dgrid.v-r .dev { flex-wrap: nowrap; padding: 9px 14px; align-items: center; } .dgrid.v-l .dev em, .dgrid.v-s .dev em, .dgrid.v-r .dev em { width: auto; margin: 0 0 0 auto; }
.dgrid.v-s .dev::after { content: ''; flex: none; width: 38px; height: 22px; border-radius: 99px; background: radial-gradient(circle at 11px 11px, #fff 8px, transparent 9px) rgba(120,116,150,.4); }
.dgrid.v-s .dev.on::after { background: radial-gradient(circle at 27px 11px, #fff 8px, transparent 9px) #3fb27f; }
.dgrid.v-r .dev { min-height: 44px; }
.rem { display: flex; gap: 8px; margin-top: 10px; flex-wrap: wrap; } .rem input { font: inherit; font-size: 14px; font-weight: 600; color: var(--ink); background: var(--chip); border: 1px solid var(--line); border-radius: 14px; padding: 10px 12px; outline: 0; min-width: 0; color-scheme: light; flex: 1 1 140px; }
:host(.dark) .rem input { color-scheme: dark; } .lr .x { border: 0; background: transparent; color: var(--bad); cursor: pointer; padding: 0 0 0 8px; font-size: 18px; line-height: 1; }
/* ===== tablet / szeroki ekran (Tab10, Portable): jeden ekran bez przewijania (dopasowanie zoomem w _fit), bez rozmycia tla ===== */
@media (min-width: 900px) {
  :host { --glass: none; --card: rgba(255,255,255,.84); overflow: hidden; overflow: clip; }
  :host(.dark) { --card: rgba(255,255,255,.08); }
  .app { max-width: none; min-height: 0; padding: 16px 22px 16px; }
  .nav { display: none; }
  section { margin-top: 0; }
  #home { display: grid; grid-template-columns: 330px repeat(3, 1fr); gap: 12px 16px; align-items: start;
    grid-template-rows: auto auto minmax(72px, auto) minmax(41px, auto) auto auto; grid-template-areas: "hero rooms rooms rooms" "status rooms rooms rooms" "status cal as air" "school cal as air" "school cal as fuel" "links links links links"; }
  #s-status .iss { padding: 5px 9px; gap: 8px; margin-bottom: 5px; font-size: 12.5px; } #s-status .iss .it { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; } #s-status .iss small { display: inline; margin-left: 6px; font-size: 11px; } #s-status .iss ha-icon { --mdc-icon-size: 18px; } #s-status .iss .mo { white-space: normal; }   /* alarmy w jednej linii: wiecej pozycji w waskiej karcie */
  .hero .hh .hhl { display: flex; flex-direction: column; gap: 5px; max-height: 58px; overflow-y: auto; scrollbar-width: none; touch-action: pan-y; } .hero .hh .hhl::-webkit-scrollbar { display: none; } .hero .hh .hr { padding: 4px 9px; flex: none; }   /* pogoda: widoczne 2 ostrzezenia, reszta przewijana */ .hero .hh .hr > div { min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-size: 12px; } .hero .hh .hr small { display: inline; margin-left: 6px; font-size: 11px; }   /* podpowiedzi pod zegarem: po jednej linii, zeby nie wypychac karty Alarmy */
  #s-school { align-self: stretch; display: flex; flex-direction: column; contain: size; min-height: 0; } #s-school > .school { flex: 1; min-height: 0; max-height: none; }   /* Szkola: min. 4 pozycje widoczne, reszta przewijana */
  #s-status { align-self: stretch; display: flex; flex-direction: column; contain: size; min-height: 198px; }   /* Alarmy: min. 4 pozycje widoczne, reszta przewijana */ #s-status > .status { flex: 1; min-height: 0; overflow-y: auto; scrollbar-width: none; } #s-status > .status::-webkit-scrollbar { display: none; }
  #home.ord { display: grid; }
  #home.free { display: grid; grid-template-areas: none; grid-template-rows: none; grid-auto-rows: auto; grid-auto-flow: row; }
  #home.free .cal.all .ev:nth-child(n+3) { display: flex; }
  #home.free > section { order: var(--ot); grid-area: auto; grid-column: span var(--w); grid-row: span var(--h); }
  #s-hero { grid-area: hero; } #s-status { grid-area: status; } #s-rooms { grid-area: rooms; }
  #s-school { grid-area: school; } #s-air { grid-area: air; } #s-fuel { grid-area: fuel; } #s-cal { grid-area: cal; } #s-links { grid-area: links; } #s-as { grid-area: as; }
  .q[data-a=cal], .q[data-a=media] { display: none; } .as { padding: 10px; } .inp input { padding: 9px 14px; } .send { width: 38px; height: 38px; }
  h2 { margin-bottom: 6px; font-size: 12px; }
  .hero { padding: 18px 20px 18px; } .time { font-size: 64px; } .date { font-size: 15px; } .wx { margin-top: 18px; gap: 14px; } .wx .ic { width: 68px; height: 68px; } .wx .ic ha-icon { --mdc-icon-size: 40px; } .wx .t { font-size: 40px; } .wx .d { font-size: 15px; } .mini span { font-size: 13.5px; padding: 6px 12px; }
  .status { padding: 10px 10px 6px; } .iss { padding: 6px 9px; margin-bottom: 5px; }
  .rooms { grid-template-columns: repeat(3, 1fr); gap: 10px; } .room.wide { grid-column: span 1; }
  #s-rooms { align-self: stretch; display: flex; flex-direction: column; min-height: 0; } #s-rooms > .rooms { flex: 1; min-height: 0; align-content: start; }
  .dev { flex-basis: 100%; }
.q { padding: 8px 6px; gap: 4px; }
  .air { padding: 10px 12px; gap: 12px; } .ring { width: 78px; height: 78px; } .air .ss { margin-bottom: 6px; }
  .fu { padding: 9px 6px; } .fuel { gap: 6px; }
  .cal { padding: 2px 12px; } .ev { padding: 6px 0; } .ev:nth-child(n+3) { display: none; } .ev .dt { width: 42px; height: 42px; }
  .links { grid-template-columns: repeat(5, 1fr); gap: 10px; } .links.c6 { grid-template-columns: repeat(6, 1fr); } .links.c6 .lk { padding: 11px 6px; gap: 8px; font-size: 13px; } .links.c6 .lk .i { width: 32px; height: 32px; } .lk { flex-direction: row; justify-content: center; padding: 14px 8px; gap: 11px; border-radius: 18px; font-size: 14px; } .lk .i { width: 38px; height: 38px; border-radius: 13px; } .lk .i ha-icon { --mdc-icon-size: 22px; }
  #s-links h2 { display: none; }
  #sub { max-width: 1060px; margin: 0 auto; } #sub:has(.roomv) h2 { margin-top: 38px; margin-bottom: 14px; } #sub:has(.roomv) .pillrow { margin-bottom: 20px; } #sub:has(.roomv) .bigs, #sub:has(.roomv) .dgrid { gap: 16px; } #sub:has(.roomv) .twoc { gap: 30px; }
  #sub:has(.f1wrap) { max-width: 1240px; } .f1row { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 18px; align-items: stretch; margin-top: 12px; } #f1c { position: relative; min-height: 440px; } #f1c > .card { position: absolute; inset: 0; margin: 0; overflow-y: auto; scrollbar-width: none; } #f1r > .card { height: 100%; margin: 0; padding: 8px; display: flex; flex-direction: column; justify-content: center; } #f1b { margin-top: 4px; }
  .twoc { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; } .twoc > div > h2:first-child { margin-top: 20px; }
  .kgrid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0 14px; }
  .f1g { display: grid; grid-template-columns: 1fr 1fr; gap: 0 18px; align-items: start; }
  .gg { grid-template-columns: repeat(3, 1fr); } .dgrid { grid-template-columns: repeat(3, 1fr); } .bigs { grid-template-columns: repeat(3, 1fr); }
  .list.cc { column-count: 2; column-gap: 34px; } .sk { column-count: 1; } .sk .lr .ln { flex: 1; white-space: normal; overflow: visible; text-align: left; } .list.cc .lr { break-inside: avoid; }
  #s-as { align-self: stretch; display: flex; flex-direction: column; min-height: 0; } #s-as > .card.as { flex: 1; min-height: 0; }
  /* Asystent: duze logo (kula) zamiast przycisku; po dotknieciu / podczas rozmowy animowane fale */
  #s-as > .card.as { display: block; position: relative; padding: 8px; } #s-as .lst { position: absolute; inset: 8px; display: flex; align-items: center; justify-content: center; gap: 0; }
  #s-as .listen { position: relative; flex: none; height: min(100%, 190px); aspect-ratio: 1; padding: 0; border-radius: 50% !important; flex-direction: column; gap: 6px; font-size: 12.5px; font-weight: 800; overflow: visible; box-shadow: 0 0 28px rgba(103,232,249,.35), inset 0 0 22px rgba(255,255,255,.25) !important; }
  #s-as .listen .orbi { display: grid; place-items: center; } #s-as .listen .orbi ha-icon { --mdc-icon-size: 64px; } #s-as .listen .orbt { max-width: 80%; line-height: 1.15; text-align: center; }
  #s-as .listen::before, #s-as .listen::after { content: ''; position: absolute; inset: 0; border-radius: 50%; border: 2px solid rgba(103,232,249,.7); opacity: 0; pointer-events: none; }
  #s-as .listen.on::before, #s-as .listen.tap::before { animation: orbring 1.8s ease-out infinite; } #s-as .listen.on::after, #s-as .listen.tap::after { animation: orbring 1.8s ease-out .9s infinite; }
  #s-as .listen.on .orbi ha-icon, #s-as .listen.tap .orbi ha-icon { animation: orbpulse 1s ease-in-out infinite alternate; }
  #s-as .mic { position: absolute; width: 38px; height: 38px; border-radius: 50% !important; align-self: auto; right: 6px; } #s-as #mic { top: 6px; } #s-as #aview { bottom: 6px; }
  @keyframes orbring { 0% { transform: scale(1); opacity: .7; } 100% { transform: scale(1.45); opacity: 0; } } @keyframes orbpulse { from { transform: scale(.92); } to { transform: scale(1.12); } }

  #s-fuel, #s-cal, #s-air { align-self: stretch; display: flex; flex-direction: column; min-height: 0; } #s-cal { contain: size; } #s-fuel > .fuel, #s-cal > .card.cal, #s-air > .card { flex: 1; min-height: 0; } #s-cal > .card.cal { display: flex; flex-direction: column; justify-content: flex-start; overflow-y: auto; scrollbar-width: none; } #s-cal > .card.cal::-webkit-scrollbar { display: none; } #s-cal .ev { padding: 5px 0; } #s-cal .card.cal.all .ev:nth-child(n+3) { display: flex; }   /* karty Paliwa / Kalendarz / Powietrze rowne wysokoscia w swoich rzedach */   /* Asystent: naglowek jak inne sekcje, karta rowna wysokoscia z Powietrzem */
  .tvs, .ctl { max-width: 760px; } .fm { border-radius: 28px; margin-bottom: 8vh; align-self: center; max-height: 84vh; } .sheet { align-items: center; }
}
`;

class PastelHomeCard extends HTMLElement {
  _aur() { return hudOn(this._config); }
  _dk() { const m = this._tm(); return (this._aur() ? m !== 'light' : m === 'dark') || (m === 'auto' && !!(this._hass && this._hass.themes && this._hass.themes.darkMode)); }
  constructor() { super(); this.attachShadow({mode: 'open'}); this._sig = ''; this._events = []; this._evAt = 0; this._showAll = false; }
  setConfig(cfg) { this._config = cfg || {}; if (this._config.cfg && typeof this._config.cfg === 'object') PC = Object.assign({}, PC0, this._config.cfg); if (this._config.empty || this._config.layout) this._applyCfg(); this._build(); }
  getCardSize() { return 20; }
  connectedCallback() { if (this._built && !this._onHash) { this._onHash = () => { this._route(); }; window.addEventListener('hashchange', this._onHash); this._route(); } }   // po powrocie z wygaszacza HA dolacza karte ponownie: bez tego znikal nasluch hash i widok (np. kalendarz) zostawal 'zawieszony'
  disconnectedCallback() { if (this._visF) { document.removeEventListener('visibilitychange', this._visF); this._visF = null; } this._scrollLock(false); this._fxStop(); if (this._edit) this._edStop(); this._restoreHaTheme(); if (this._unsubChat) { try { this._unsubChat(); } catch (e) { /* ignore */ } this._unsubChat = null; } this._chatSub = false; if (this._onRs) { window.removeEventListener('resize', this._onRs); this._onRs = null; } if (this._onHash) window.removeEventListener('hashchange', this._onHash); this._onHash = null; }

  set hass(h) {
    if (document.hidden && this._built) { this._hass = h; this._held = (this._held || 0) + 1; this._visOn(); return; }   // karta niewidoczna (ekran wygaszony / inna karta): tylko zapamietujemy stan, render po powrocie
    const t0 = performance.now(); this._hassU(h); this._pfAdd(0, performance.now() - t0); if (this._view === 'radio' && this._radioEl && this._radioEl.isConnected) this._radioEl.hass = h;
  }
  _visOn() { if (this._visF) return; this._visF = () => { if (document.hidden || !this._hass || !this.isConnected) return; this._held = 0; this._sig = ''; this.hass = this._hass; }; document.addEventListener('visibilitychange', this._visF); }
  _pfAdd(k, ms) { const a = this._pf || (this._pf = {h: [], r: [], n: []}); const l = k ? a.r : a.h; l.push(ms); if (l.length > 60) l.shift(); if (!k) { a.n.push(Date.now()); if (a.n.length > 200) a.n.shift(); } }
  _hassU(h) {
    this._hass = h;
    if (!this._built) return;
    if (PCOWN && PCOWN !== this) { this._applyCfg(); this._sig = ''; }   // inny dashboard Pastela zmienil PC: przywracamy ustawienia tej karty
    const dark = this._dk();
    this.classList.toggle('dark', dark); this.classList.toggle('pt', this._portable()); this.classList.toggle('lite', this._liteU());
    { const aur = this._aur(); if (this._wasAur !== aur || (aur && this._hudD !== undefined && (this._hudD !== dark || this._hudS !== hudSch().id))) {   // zmiana stylu / motywu / schematu: przebudowa karty bez przeladowania strony
        if (!this._hudRl) { this._hudRl = 1; setTimeout(() => { this._hudRl = 0; try { window.removeEventListener('hashchange', this._onHash); this._rp = null; this._build(); this._sig = ''; this._subK = null; if (this._hass) this.hass = this._hass; } catch (e) { location.reload(); } }, 60); } return; } }
    this.classList.toggle('aut', !this._aur() && this._scheme().id === 'autumn'); this.classList.toggle('wnt', !this._aur() && this._scheme().id === 'winter');
    this._applyScheme(); this._applyHaTheme(); this._applyLeaves(); if (this._aur() && hudBgOn()) { try { hudBg(this); } catch (e) { /* ignore */ } }
    if (this._f1map && this._f1map.isConnected) this._f1map.hass = h;
    if (this._rp && this._rp.isConnected) { this._rpStyle(); this._rp.hass = h; }
    this._kiosk(); this._svTab();
    const sig = this._signature();
    if (sig !== this._sig) { this._sig = sig; const r0 = performance.now(); this._render(); this._pfAdd(1, performance.now() - r0); }
    if (this._view === 'asystent' || this.shadowRoot.getElementById('asp')) this._askLiveUpdate();
    this._clock(); this._subChat();
    if (Date.now() - this._evAt > 300000) { this._evAt = Date.now(); this._loadEvents(); }
    if (Date.now() - (this._fcAt || 0) > 1800000) { this._fcAt = Date.now(); this._loadForecast(); }
    if (Date.now() - (this._lyAt || 0) > 60000) { this._lyAt = Date.now(); this._loadLayout(); }
  }

  // tryb: domyslnie 'auto' = zgodny z motywem Home Assistant (Jarvis Pastel jasny/ciemny wg profilu/urzadzenia); jednorazowo resetuje stary zapisany wybor
  _tm() { const lt = this._L && this._L.theme; if (lt === 'light' || lt === 'dark') return lt; if (this._aur()) { try { return localStorage.getItem('hud_theme') || 'dark'; } catch (e) { return 'dark'; } } try { if (localStorage.getItem('pastel_theme_v') !== '2') { localStorage.setItem('pastel_theme', 'auto'); localStorage.setItem('pastel_theme_v', '2'); } return localStorage.getItem('pastel_theme') || 'auto'; } catch (e) { return 'auto'; } }
  _scrollLock(on) {   // popup: blokada przewijania strony w tle
    const de = document.documentElement, bd = document.body; if (!!this._locked === on) return; this._locked = on;
    if (on) { this._scl = [de.style.overflow, bd ? bd.style.overflow : '']; de.style.overflow = 'hidden'; if (bd) bd.style.overflow = 'hidden'; }
    else if (this._scl) { de.style.overflow = this._scl[0]; if (bd) bd.style.overflow = this._scl[1]; this._scl = null; } }
  // kopia ustawien ekranu (uklad, schemat, efekty) w HA: frontend/set_system_data (admin) lub dane uzytkownika; przenosi ustawienia miedzy urzadzeniami
  _bkMsg(t, bad) { this._bkM = [t, !!bad]; const e = this.shadowRoot && this.shadowRoot.getElementById('bkst'); if (e) { e.textContent = t; e.style.color = bad ? '#e5576f' : ''; } }
  async _bk(act) {
    const K = ['pastel_scheme', 'pastel_theme', 'pastel_hue', 'pastel_lay', 'pastel_rooms', 'pastel_lkhide', 'pastel_popup', 'pastel_dsh', 'pastel_fx', 'pastel_cleaner', 'pastel_lite', 'pastel_style', 'hud_scheme', 'hud_theme', 'pastel_cal_hide', 'pastel_cal_fold', 'pastel_logf', 'pastel_school'];
    const ws = (t, x) => this._hass.callWS(Object.assign({type: t, key: 'pastel_settings'}, x || {}));
    const adm = !!(this._hass.user && this._hass.user.is_admin);
    try {
      if (act === 'save') {
        const v = {}; K.forEach((k) => { try { const x = localStorage.getItem(k); if (x !== null) v[k] = x; } catch (e) { /* ignore */ } });
        const val = {at: new Date().toISOString(), by: (this._hass.user && this._hass.user.name) || '', v};
        await ws(adm ? 'frontend/set_system_data' : 'frontend/set_user_data', {value: val});
        this._bkMsg('Zapisano kopię (' + Object.keys(v).length + ' ustawień) · ' + new Date().toLocaleString('pl-PL') + (adm ? '' : ' · tylko dla tego użytkownika'));
      } else {
        let r = await ws(adm ? 'frontend/get_system_data' : 'frontend/get_user_data'); let val = r && r.value;
        if ((!val || !val.v) && adm) { r = await ws('frontend/get_user_data'); val = r && r.value; }
        if (!val || !val.v) { this._bkMsg('Brak zapisanej kopii w HA', true); return; }
        K.forEach((k) => { try { if (val.v[k] !== undefined) localStorage.setItem(k, val.v[k]); else localStorage.removeItem(k); } catch (e) { /* ignore */ } });
        this._bkMsg('Wczytano kopię z ' + new Date(val.at).toLocaleString('pl-PL') + ' — odświeżam…');
        setTimeout(() => location.reload(), 900);
      }
    } catch (e) { this._bkMsg('Nie udało się: ' + ((e && (e.message || e.code)) || 'błąd'), true); }
  }
  // tryb edycji ukladu na tablecie: strzalki zmieniaja kolejnosc sekcji, oko ukrywa; zapis tylko na tym urzadzeniu (localStorage)
  _edStart() {
    this._edit = true; this._sig = ''; if (this._hass) this._render(); this._edDraw();
    if (!this._edTk) this._edTk = setInterval(() => this._edPos(), 500);
    if (!this._edSc) { this._edSc = () => this._edPos(); window.addEventListener('scroll', this._edSc, {passive: true, capture: true}); window.addEventListener('resize', this._edSc); }
  }
  _edStop() {
    this._edit = false; if (this._edTk) { clearInterval(this._edTk); this._edTk = null; } if (this._edSc) { window.removeEventListener('scroll', this._edSc, true); window.removeEventListener('resize', this._edSc); this._edSc = null; }
    const e = this.shadowRoot && this.shadowRoot.getElementById('edov'); if (e) e.remove(); this._sig = ''; if (this._hass && this._built) this._render();
  }
  _edCur() { const o = this._lo(), l = this._lay(); return {order: (o ? o.order : l.free ? l.order : DEF_HOME.order).slice(), hide: (o ? o.hide || [] : l.hide || []).filter((x) => DEF_HOME.order.includes(x))}; }
  _edSave(c) { this._loSet({order: c.order, hide: c.hide}); this._lyc = null; this._applyLayout(); this._edDraw(); this._edPos(); }
  _edDraw() {
    const r = this.shadowRoot, app = r && r.getElementById('app'); if (!app) return; let ov = r.getElementById('edov');
    if (!ov) { ov = document.createElement('div'); ov.id = 'edov'; ov.style.cssText = 'position:fixed;inset:0;z-index:7;pointer-events:none;font:600 13px system-ui,sans-serif'; app.appendChild(ov); }
    const c = this._edCur(), NM = {hero: 'Powitanie i pogoda', rooms: 'Pokoje', as: 'Asystent', status: 'Alarmy', air: 'Powietrze', fuel: 'Paliwa', cal: 'Wydarzenia', links: 'Skróty'};
    const bs = 'pointer-events:auto;border:0;border-radius:10px;padding:8px 13px;font:inherit;cursor:pointer;color:#fff;background:#6c5ce7;box-shadow:0 2px 8px rgba(0,0,0,.4)';
    let h = `<div style="position:fixed;top:8px;left:50%;transform:translateX(-50%);pointer-events:auto;background:rgba(20,18,36,.94);color:#fff;border-radius:14px;padding:8px 10px;display:flex;gap:8px;align-items:center;flex-wrap:wrap;justify-content:center;max-width:94vw;box-shadow:0 4px 18px rgba(0,0,0,.5)"><span style="opacity:.85">Edycja układu · strzałki: kolejność, oko: ukryj (sekcje i pokoje), skróty: dotyk</span><button data-ed="done" style="${bs};background:#2e9e6f">Gotowe</button><button data-ed="reset" style="${bs};background:#8a5560">Domyślny</button>`;
    c.hide.forEach((id) => { h += `<button data-ed="show:${id}" style="${bs};background:#444">+ ${NM[id] || id}</button>`; });
    h += '</div>';
    c.order.filter((id) => !c.hide.includes(id)).forEach((id) => { h += `<div data-edb="${id}" style="position:fixed;display:none;border:2px dashed rgba(140,120,255,.85);border-radius:16px;pointer-events:none"><div style="position:absolute;top:44px;left:50%;transform:translateX(-50%);display:flex;gap:6px;pointer-events:auto"><button data-ed="up:${id}" style="${bs}">↑</button><span style="${bs};background:rgba(20,18,36,.9);pointer-events:none">${NM[id] || id}</span><button data-ed="dn:${id}" style="${bs}">↓</button><button data-ed="hide:${id}" style="${bs};background:#8a5560">👁</button></div></div>`; });
    const rm = this._edRm(), rbs = bs + ';padding:5px 11px';
    rm.order.forEach((id) => { h += `<div data-edr="${id}" style="position:fixed;display:none;pointer-events:none"><div style="position:absolute;bottom:6px;left:50%;transform:translateX(-50%);display:flex;gap:5px;pointer-events:auto"><button data-ed="rl:${id}" style="${rbs}">◀</button><button data-ed="rh:${id}" style="${rbs};background:#8a5560">👁</button><button data-ed="rr:${id}" style="${rbs}">▶</button></div></div>`; });
    ov.innerHTML = h;
    ov.querySelectorAll('[data-ed]').forEach((b) => { b.onclick = (ev) => { ev.stopPropagation(); const [a, id] = b.dataset.ed.split(':'), cur = this._edCur();
      if (a === 'done') { this._edStop(); return; }
      if (a === 'rl' || a === 'rr' || a === 'rh') { const rc = this._edRm(), j = rc.order.indexOf(id);
        if (a === 'rl' && j > 0) { rc.order.splice(j, 1); rc.order.splice(j - 1, 0, id); } if (a === 'rr' && j >= 0 && j < rc.order.length - 1) { rc.order.splice(j, 1); rc.order.splice(j + 1, 0, id); }
        if (a === 'rh') { const k = rc.hide.indexOf(id); if (k < 0) rc.hide.push(id); else rc.hide.splice(k, 1); }
        try { localStorage.setItem('pastel_rooms', JSON.stringify({order: rc.order, hide: rc.hide})); } catch (e) { /* ignore */ } this._sig = ''; this._render(); this._edDraw(); this._edPos(); return; }
      if (a === 'reset') { try { localStorage.removeItem('pastel_rooms'); } catch (e) { /* ignore */ } this._loSet(null); try { localStorage.removeItem('pastel_lkhide'); } catch (e) { /* ignore */ } this._applyLayout(); this._sig = ''; this._render(); this._edDraw(); this._edPos(); return; }
      const i = cur.order.indexOf(id);
      if (a === 'up' && i > 0) { cur.order.splice(i, 1); cur.order.splice(i - 1, 0, id); }
      if (a === 'dn' && i < cur.order.length - 1) { cur.order.splice(i, 1); cur.order.splice(i + 1, 0, id); }
      if (a === 'hide' && !cur.hide.includes(id)) cur.hide.push(id);
      if (a === 'show') cur.hide = cur.hide.filter((x) => x !== id);
      this._edSave(cur); }; });
  }
  _edPos() {
    const r = this.shadowRoot, ov = r && r.getElementById('edov'); if (!ov) return;
    const hid = (this._rmo() || {}).hide || [];
    ov.querySelectorAll('[data-edr]').forEach((b) => { const el = r.querySelector('.room[data-id="' + b.dataset.edr + '"]'); if (!el) { b.style.display = 'none'; return; } el.style.opacity = hid.includes(b.dataset.edr) ? '.35' : '';
      const q = el.getBoundingClientRect(); if (q.bottom < 0 || q.top > innerHeight) { b.style.display = 'none'; return; }
      b.style.display = 'block'; b.style.left = q.left + 'px'; b.style.top = q.top + 'px'; b.style.width = q.width + 'px'; b.style.height = q.height + 'px'; });
    ov.querySelectorAll('[data-edb]').forEach((b) => { const el = r.getElementById('s-' + b.dataset.edb); if (!el || el.style.display === 'none') { b.style.display = 'none'; return; }
      const q = el.getBoundingClientRect(); if (q.bottom < 0 || q.top > innerHeight) { b.style.display = 'none'; return; }
      b.style.display = 'block'; b.style.left = q.left + 'px'; b.style.top = q.top + 'px'; b.style.width = q.width + 'px'; b.style.height = q.height + 'px'; });
  }
  _liteU() { try { return localStorage.getItem('pastel_lite') === '1'; } catch (e) { return false; } }   // tryb oszczedny: bez rozmycia tla, cieni, wodnych znakow i przejsc (slabe tablety)
  _fxU() { try { const v = localStorage.getItem('pastel_fx'); if (v === 'leaves' || v === 'snow') return v; if (v === null && localStorage.getItem('pastel_leaves') === '1') return 'leaves'; } catch (e) { /* ignore */ } return ''; }
  _clnU() { try { return localStorage.getItem('pastel_cleaner') === '1'; } catch (e) { return false; } }
  _fxStop() { if (this._fxTk) { clearInterval(this._fxTk); this._fxTk = null; } if (this._fxCd) { clearInterval(this._fxCd); this._fxCd = null; } (this._fxIv || []).forEach((t) => clearInterval(t)); this._fxIv = []; this._fxCl = false; (this._fxTo || []).forEach((t) => clearTimeout(t)); this._fxTo = []; this._fxBusy = false; this._fxKey = '';
    const r = this.shadowRoot; if (r) ['leaves', 'piles', 'cleaner'].forEach((i) => { const e = r.getElementById(i); if (e) e.remove(); }); if (r) r.querySelectorAll('.pf').forEach((e) => e.remove()); }
  _applyLeaves() {   // efekty sezonowe (liscie / snieg) + sprzatajacy ludzik; tylko Pastel (glowny dashboard), wlaczane w Ustawieniach
    const r = this.shadowRoot, app = r && r.getElementById('app'); if (!app) return;
    const m = typeof this._room1 === 'function' ? '' : this._fxU(), cl = !!m && this._clnU(), key = m + '|' + (cl ? 1 : 0);
    if (!m) { if (this._fxKey) this._fxStop(); return; }
    if (this._fxKey === key && r.getElementById('leaves')) return;
    this._fxStop(); this._fxKey = key; this._fxTo = [];
    const C = ['#e8793a', '#d4572a', '#f2b134', '#b8431f', '#c98b2b', '#e0a030', '#9c2b1c', '#d9a21b', '#8c9a2a', '#6b3a1a', '#c0392b', '#a86a1e'];
    const P = [['M12 1C7 5 3.5 9.5 3.5 14.5a8.5 8.5 0 0 0 17 0C20.5 9.5 17 5 12 1z', 'M12 4v18'],   // brzoza / okragly
      ['M12 1.5l2.4 4.6 3.6-1.4-.9 4.6 4.6-.6-2.6 3.6 2.6 1.8-5.2 2.2.6 2.4-3.9-.8L12 22l-1.2-4.3-3.9.8.6-2.4-5.2-2.2 2.6-1.8-2.6-3.6 4.6.6-.9-4.6 3.6 1.4z', 'M12 22V8M12 12l-4-3M12 12l4-3'],   // klon
      ['M12 22v-4.5c-2.3.6-5-.4-5-2.7-2.3-.2-3.4-2.2-2.2-4C3.2 9.4 3.8 7 6 6.6 6.6 4.5 8.8 3.6 10.6 4.8 11.2 2.6 13.4 1.8 14.8 3.4c1.9-.5 3.6.8 3.6 2.8 2 .1 3.4 2.2 2.4 4 1.6 1.4 1.1 4-1.1 4.7.1 2.2-2 3.3-4 2.6V22z', 'M12 22V6M12 13l-3-2M12 10l3-2'],   // dab
      ['M12 22.5C4.5 17.5 2 12.5 3.8 8.4 5.5 4.8 10 4.6 12 8c2-3.4 6.5-3.2 8.2.4 1.8 4.1-.7 9.1-8.2 14.1z', 'M12 22V9'],   // lipa (serce)
      ['M12 22v-7.5C6.5 14.2 2.8 10 2.5 4.6 5.2 3 8.8 2.8 12 4.4c3.2-1.6 6.8-1.4 9.5.2C21.2 10 17.5 14.2 12 14.5z', 'M12 22v-8M12 14l-5-8M12 14l5-8'],   // miłorzab (wachlarz)
      ['M12 .8C15.4 6 16.6 12.4 12 23.2 7.4 12.4 8.6 6 12 .8z', 'M12 3v19']];   // wierzba (waski)
    const sn = m === 'snow', n = sn ? 34 : 20; let h = '';
    for (let i = 0; i < n; i++) { const sz = sn ? 3 + Math.random() * 5 : 16 + Math.random() * 22, d = (sn ? 9 : 11) + Math.random() * 9, sw = 2.8 + Math.random() * 2.4, lf = P[(Math.random() * P.length) | 0], col = C[(Math.random() * C.length) | 0];
      h += `<i style="left:${(Math.random() * 100).toFixed(1)}%;width:${sz.toFixed(0)}px;height:${sz.toFixed(0)}px;animation-duration:${d.toFixed(1)}s;animation-delay:-${(Math.random() * d).toFixed(1)}s;--dx:${(Math.random() * 120 - 60).toFixed(0)}px"><b style="animation-duration:${sw.toFixed(1)}s;animation-delay:-${(Math.random() * sw).toFixed(1)}s">${sn ? '' : `<svg viewBox="0 0 24 24"><path d="${lf[0]}" fill="${col}"/><path d="${lf[1]}" fill="none" stroke="rgba(60,25,5,.35)" stroke-width="1" stroke-linecap="round"/></svg>`}</b></i>`; }
    const l = document.createElement('div'); l.id = 'leaves'; l.className = m; l.innerHTML = h; app.appendChild(l);
    if (cl) this._fxPiles(app, m);
  }
  // kopczyki rosna ~10 min wzdluz dolnej krawedzi, potem przechodzi ludzik (dmuchawa / lopata), rozgarnia je i cykl zaczyna sie od nowa
  _fxPiles(app, m) {
    const W = window.innerWidth, N = Math.max(6, Math.round(W / 120)), box = document.createElement('div'); box.id = 'piles'; this._fxM = []; let h = '';
    for (let i = 0; i < N; i++) { const w = W / N * 1.6, mh = m === 'snow' ? 12 + Math.random() * 16 : 20 + Math.random() * 26; h += `<div class="mnd ${m}" style="left:${((i + .5) / N * W - w / 2).toFixed(0)}px;width:${w.toFixed(0)}px;height:${mh.toFixed(0)}px"></div>`; }
    box.innerHTML = h; app.appendChild(box); box.querySelectorAll('.mnd').forEach((el, i) => this._fxM.push({el, f: (i + .5) / N}));
    this._fxT0 = Date.now(); this._fxCl = true; this._fxMode = m;
    const tick = () => { if (this._fxBusy) return; const t = (Date.now() - this._fxT0) / 600000; if (t >= 1) { this._fxClean(m); return; } const lv = Math.max(.05, Math.pow(t, .85)); this._fxM.forEach((x) => { x.el.style.transform = `scaleY(${lv.toFixed(3)})`; }); };
    this._fxTk = setInterval(tick, 10000); tick();
    this._fxCd = setInterval(() => this._fxCdUp(), 1000); this._fxCdUp();
  }
  _fxCdTxt() { if (!this._fxCl) return ''; if (this._fxBusy) return 'Ludzik sprząta właśnie teraz'; const t = Math.max(0, Math.round(600 - (Date.now() - this._fxT0) / 1000)); return 'Ludzik wyjdzie sprzątać za ' + Math.floor(t / 60) + ':' + String(t % 60).padStart(2, '0'); }
  _fxForce() { if (this._fxCl && !this._fxBusy) { this._fxClean(this._fxMode); this._fxCdUp(); } }
  _fxCdHtml() { const t = this._fxCdTxt(); return t ? `<div id="fxcd" class="fxcd"><ha-icon icon="${this._fxMode === 'snow' ? 'mdi:snowflake' : 'mdi:leaf'}"></ha-icon><span style="flex:1">${t}</span><button class="fxgo" title="Wyślij ludzika teraz"><ha-icon icon="mdi:run-fast"></ha-icon></button></div>` : ''; }
  _fxBindGo() { const b = this.shadowRoot && this.shadowRoot.querySelector('#fxcd .fxgo'); if (b) b.onclick = (ev) => { ev.stopPropagation(); this._fxForce(); }; }
  _fxCdUp() { const r = this.shadowRoot, st = r && r.getElementById('s-status'); if (!st) return; let e = r.getElementById('fxcd'); const t = this._fxCdTxt();
    if (!t) { if (e) e.remove(); return; }
    if (!e) { const c = st.querySelector('.card.status'); if (!c) return; c.insertAdjacentHTML('beforeend', this._fxCdHtml()); this._fxBindGo(); return; }
    const sp = e.querySelector('span'); if (sp && sp.textContent !== t) sp.textContent = t; }

  _fxClean(m) {
    this._fxBusy = true; const r = this.shadowRoot, app = r && r.getElementById('app'); if (!app) return; const W = window.innerWidth, D = Math.max(14000, W * 11), sn = m === 'snow';
    const f = document.createElement('div'); f.id = 'cleaner'; f.className = m; f.style.animationDuration = D + 'ms';
    const leg = (c, c2, k) => `<g class="lg ${k}"><rect x="${k === 'l1' ? 37 : 41}" y="41" width="6.5" height="19.5" rx="3" fill="${c}"/><path d="M${k === 'l1' ? 36 : 40} 59.5h10.5a2 2 0 0 1 0 3.2H${k === 'l1' ? 36 : 40}z" fill="${c2}"/></g>`;
    const head = `<circle cx="43" cy="13" r="7" fill="#f6c9a0"/><circle cx="50" cy="14.2" r="1.5" fill="#eeb68a"/><circle cx="46.8" cy="11.6" r="1" fill="#222"/><path d="M45 17.4q2 1 3.6 0" stroke="#a5603a" stroke-width=".9" fill="none" stroke-linecap="round"/>`;
    const body = sn
      ? `<rect x="35" y="21" width="16" height="22" rx="6" fill="#3f7fd0"/><rect x="36" y="19.5" width="14" height="4.5" rx="2.2" fill="#d9344f"/>${head}<path d="M35.6 11.2a7.4 7.4 0 0 1 14.8 0z" fill="#d9344f"/><rect x="35" y="10.6" width="16" height="2.6" rx="1.3" fill="#f2f2f2"/><circle cx="43" cy="3.2" r="2.4" fill="#f2f2f2"/>`
        + `<g class="shv"><line x1="44" y1="27" x2="58" y2="41" stroke="#3f7fd0" stroke-width="5" stroke-linecap="round"/><line x1="48" y1="26" x2="75" y2="57" stroke="#8a5a2b" stroke-width="3" stroke-linecap="round"/><path d="M72 55.5l12 2.6-2.6 5.4-12-2.6z" fill="#9db3c9" stroke="#6a8097" stroke-width=".8"/><circle cx="58" cy="41" r="2.6" fill="#f6c9a0"/><line x1="44" y1="26" x2="54" y2="36" stroke="#356db5" stroke-width="5" stroke-linecap="round"/><circle cx="54" cy="36" r="2.6" fill="#f6c9a0"/></g>`
      : `<rect x="28.5" y="22" width="8" height="16" rx="3" fill="#2f7d4f"/><rect x="35" y="21" width="16" height="22" rx="6" fill="#e8793a"/>${head}<path d="M35.6 11.4a7.4 7.4 0 0 1 14.8 0z" fill="#b8431f"/><path d="M44 11.4h9.5" stroke="#b8431f" stroke-width="2.2" stroke-linecap="round"/><path d="M32 24C37 17 49 19 56 31" stroke="#444" stroke-width="2.2" fill="none" stroke-linecap="round"/>`
        + `<g class="blw"><line x1="44" y1="26" x2="57" y2="33" stroke="#d1692e" stroke-width="5" stroke-linecap="round"/><rect x="54" y="29.5" width="15" height="8.5" rx="3.2" fill="#2f7d4f"/><rect x="56" y="31.6" width="9" height="2" rx="1" fill="#7fd0a0"/><path d="M68.5 34L76.5 44.5" stroke="#444" stroke-width="4.6" stroke-linecap="round"/><circle cx="57" cy="33" r="2.6" fill="#f6c9a0"/><g class="gust" stroke="#9ec9ff" stroke-width="1.6" fill="none" stroke-linecap="round"><path d="M78 46q5 0 9 3.5"/><path d="M77 50q6 1 10 5"/></g></g>`;
    f.innerHTML = `<svg viewBox="0 0 90 64">${leg('#3a4a6b', '#2a2a2a', 'l1')}${leg('#2f3d5a', '#2a2a2a', 'l2')}<g class="ln"><g class="bd">${body}</g></g></svg><div class="ahd ${m}"></div>`;
    app.appendChild(f);
    const ahd = f.querySelector('.ahd'); let got = 0; const C = ['#e8793a', '#d4572a', '#f2b134', '#b8431f', '#c98b2b', '#9c2b1c', '#8c9a2a'];
    const spawn = (n, sx) => { let h = ''; for (let i = 0; i < n; i++) h += `<i class="bl ${m}" style="background:${C[(Math.random() * C.length) | 0]};--px:${(sx ? 18 + Math.random() * 40 : 30 + Math.random() * 70).toFixed(0)}px;--py:${(sx ? -34 - Math.random() * 34 : -4 - Math.random() * 44).toFixed(0)}px;--rt:${(Math.random() * 500 - 250).toFixed(0)}deg"></i>`;
      const w = document.createElement('div'); w.innerHTML = h; Array.from(w.children).forEach((e) => { f.appendChild(e); this._fxTo.push(setTimeout(() => e.remove(), 900)); }); };
    if (sn) { const go = () => { spawn(7, true); this._fxIv.push(setInterval(() => spawn(7, true), 1300)); }; this._fxTo.push(setTimeout(go, 1040)); }
    else this._fxIv.push(setInterval(() => spawn(3, false), 140));
    const FW = 140, tot = W + 2 * FW;   // czolo narzedzia ~ +76 px od lewej krawedzi ludzika
    this._fxM.forEach((x) => { const t = Math.max(0, (x.f * W - 76 + FW) / tot * D - 150);
      this._fxTo.push(setTimeout(() => { x.el.style.transition = 'transform .45s ease-in'; x.el.style.transform = 'scaleY(.03)'; this._fxPuff(app, x.f * W, m); got++; if (ahd) ahd.style.transform = 'scale(' + Math.min(1, .25 + got / this._fxM.length * .9).toFixed(2) + ')'; }, t)); });
    this._fxTo.push(setTimeout(() => { f.remove(); (this._fxIv || []).forEach((t) => clearInterval(t)); this._fxIv = []; this._fxM.forEach((x) => { x.el.style.transition = ''; x.el.style.transform = 'scaleY(.05)'; }); this._fxT0 = Date.now(); this._fxBusy = false; }, D + 1200));
  }
  _fxPuff(app, cx, m) {
    const C = ['#e8793a', '#d4572a', '#f2b134', '#b8431f', '#c98b2b']; let h = '';
    for (let i = 0; i < 8; i++) h += `<i class="pf ${m}" style="left:${(cx + Math.random() * 30 - 15).toFixed(0)}px;background:${C[i % C.length]};--px:${(40 + Math.random() * 110).toFixed(0)}px;--py:${(-20 - Math.random() * 70).toFixed(0)}px;--rt:${(Math.random() * 500 - 250).toFixed(0)}deg"></i>`;
    const w = document.createElement('div'); w.innerHTML = h; const els = Array.from(w.children); els.forEach((e) => app.appendChild(e)); this._fxTo.push(setTimeout(() => els.forEach((e) => e.remove()), 1300));
  }
  _popU() { try { return localStorage.getItem('pastel_popup') === '1'; } catch (e) { return false; } }   // widoki jako okienko popup (Ustawienia, tylko Pastel)
  _dshU() { try { return localStorage.getItem('pastel_dsh') || ''; } catch (e) { return ''; } }   // ksztalt przyciskow wybrany w Ustawieniach (przegladarka); '' = jak w edytorze
  _themeKey() { try { return (localStorage.getItem('pastel_theme') || '') + (localStorage.getItem('pastel_scheme') || '') + (localStorage.getItem('pastel_style') || '') + (localStorage.getItem('hud_theme') || '') + (localStorage.getItem('hud_scheme') || ''); } catch (e) { return ''; } }
  _hue() { let h = 252; try { h = parseInt(localStorage.getItem('pastel_hue'), 10); } catch (e) { /* ignore */ } return isNaN(h) ? 252 : Math.min(360, Math.max(0, h)); }
  _scheme() { let k = ''; try { k = localStorage.getItem('pastel_scheme') || ''; } catch (e) { /* ignore */ }
    if (k === 'custom') return {id: 'custom', n: 'Własny', d: this._hue() - 252};
    return SCHEMES.find((x) => x.id === k) || SCHEMES[0]; }   // domyslnie Niebo
  // motyw Home Assistant (zmienne CSS na <html>) przekolorowany razem ze schematem; oryginaly zapamietane i przywracane przy schemacie domyslnym / wyjsciu z dashboardu
  _applyHaTheme() {
    const aur = this._aur(), root = document.documentElement, d = aur ? 0 : this._scheme().d, dark = this.classList.contains('dark');
    const mode = aur ? hudHa(dark) : (HATHEME[dark ? 'dark' : 'light'] || {}), first = Object.keys(mode)[0]; if (!first) return;
    const sig = d + '|' + dark + '|' + (aur ? 'a' + hudSch().id : 'p'), want = rotAny(mode[first], d), cur = root.style.getPropertyValue('--' + first);
    if (this._haOrig && this._haSig === sig && cur === want) return;
    const keys = Object.keys(Object.assign({}, HATHEME.light, HATHEME.dark, hudHa(true)));
    if (!this._haOrig || cur !== this._haLast) { this._haOrig = {}; keys.forEach((k) => { this._haOrig[k] = root.style.getPropertyValue('--' + k); }); }   // oryginaly (takze po ponownym nalozeniu motywu przez HA)
    keys.forEach((k) => { if (!(k in mode)) { const o = this._haOrig[k]; if (o) root.style.setProperty('--' + k, o); else root.style.removeProperty('--' + k); } });
    Object.keys(mode).forEach((k) => root.style.setProperty('--' + k, rotAny(mode[k], d)));
    this._haSig = sig; this._haLast = want;
  }
  _restoreHaTheme() {
    if (!this._haOrig) return; const root = document.documentElement;
    Object.keys(this._haOrig).forEach((k) => { const v = this._haOrig[k]; if (v) root.style.setProperty('--' + k, v); else root.style.removeProperty('--' + k); });
    this._haOrig = null; this._haSig = ''; this._haLast = '';
  }
  _applyScheme() {
    if (this._aur()) return; const sc = this._scheme(); const key = sc.id + ':' + sc.d; if (this._schId === key) return; this._schId = key;
    const st = this.shadowRoot && this.shadowRoot.getElementById('cst'); if (st) st.textContent = rotCss(CSS, sc.d) + LEAF_CSS + (sc.id === 'autumn' ? AUT_CSS : '') + (sc.id === 'winter' ? WNT_CSS : '');
  }
  _pal(c) { return PAL[c] || PAL.lav; }
  _rc(h) { return rotHex(h, this._scheme().d); }
  // progi komfortu (widelki ostrzezen) z pomocnikow input_number; brak pomocnika = wartosci domyslne
  _th() {
    const g = (e, d) => { const v = parseFloat((this._hass.states[e] || {}).state); return isNaN(v) ? d : v; };
    let a = g(TH.tMin, 18), b = g(TH.tMax, 26), c = g(TH.hMin, PC.humMin), d = g(TH.hMax, PC.humMax); if (a > b) [a, b] = [b, a]; if (c > d) [c, d] = [d, c];
    return {tMin: a, tMax: b, hMin: c, hMax: d};   // poziom krytyczny: temp. -3 / +4 °C, wilg. -10 / +10 p.p. od widelek
  }
  _ids() {
    if (this._idList) return this._idList;
    const fl0 = String(PC.purifier || '').replace(/^fan\./, '').replace(/_air_purifier$/, '');
    const s = new Set([PC.out.t, PC.out.h, PC.out.weather, PC.pm, PC.purifier, ...(fl0 ? ['sensor.' + fl0 + '_filter_life_level', 'sensor.' + fl0 + '_filter_used_time'] : []), PC.mute, PC.wash.status, PC.wash.end, PC.gas, PC.floodK, PC.floodL, PC.alarm, PC.alarmSw, PC.door, PC.pipeline, ...['pipeline_1', 'mute'].map((k) => (k === 'mute' ? 'switch.' : 'select.') + this._sat().replace('assist_satellite.', '') + '_' + k), (PC.tab || {}).bat, (PC.tab || {}).chg, PC.warn, this._sat(), ...['wake_word_1', 'wake_word_2', 'wake_word_detection'].map((k) => 'select.' + this._sat().replace('assist_satellite.', '') + '_' + k)]);
    PC.rooms.forEach((r) => { [r.occ, r.t, r.h, r.lux, r.door, r.leak, r.auto].forEach((e) => e && s.add(e)); r.dev.forEach((d) => s.add(d[0])); });
    PC.fuel.forEach((f) => { s.add(f[1]); s.add(f[2]); });
    PC.bats.forEach((e) => s.add(e)); PC.temps.concat(PC.hums).forEach((x) => s.add(x[1])); PC.offline.forEach((o) => s.add(o[0])); (PC.remSlots || []).forEach((x) => { s.add(x[0]); s.add(x[1]); }); PC.cal.forEach((e) => s.add(e)); PC.lightsOff.forEach((e) => s.add(e));
    Object.values(TH).forEach((e) => s.add(e));
    if (PC.f1 && PC.f1.on) F1_ENTS.forEach((e) => s.add(e));
    if (PC.f1 && PC.f1.on) { s.add('sensor.f1_session_status'); s.add('sensor.f1_replay_status'); }
    s.add(PC.media.active); PC.media.tvs.forEach((t) => s.add(t[0])); PC.events.forEach((e) => s.add(e.entity));
    PC.server.nodes.forEach((n) => ['status', 'cpu', 'mem'].forEach((k) => n[k] && s.add(n[k]))); PC.server.guests.forEach((g) => ['status', 'cpu', 'mem'].forEach((k) => g[k] && s.add(g[k])));
    PC.server.storages.forEach((x) => x.usage && s.add(x.usage));
    this._idList = [...s]; return this._idList;
  }
  _signature() {
    const st = this._hass.states; let k = '';
    for (const e of this._ids()) { const o = st[e]; k += o ? o.state + (e.startsWith('calendar.') ? (o.attributes.start_time || '') : (e.startsWith('light.') ? o.attributes.brightness : e.startsWith('fan.') ? o.attributes.percentage + '' + o.attributes.preset_mode : e.startsWith('media_player.') ? o.attributes.media_title : '')) : '~'; k += '|'; }
    for (const e of Object.keys(st)) if (e.startsWith('binary_sensor.tauron_') && st[e].state === 'on') k += e;
    { const rp = st['sensor.radio_pl_now_playing']; if (rp) k += Object.keys((rp.attributes && rp.attributes.players) || {}).join(','); }   // znaczniki radia na kafelkach pokoi
    if (PC.f1 && PC.f1.on && (this._view === 'f1' || this._view === 'f1live')) F1_ENTS.concat(F1_LIVE).forEach((e) => { const o = st[e]; if (o) k += o.last_updated; });
    const ma = st[this._s(PC.media.active)]; if (ma) k += ma.state + (ma.attributes.media_title || '');
    if (this._view === 'transport' && this._hass.services && this._hass.services.ztm_gzm) this._trRoutes().forEach((o) => { k += o.last_updated; });
    if (this._view === 'szkola') this._skS().forEach((q) => ['oceny', 'ostatnia_ocena', 'zmiany_w_planie_7_dni', 'uwagi', 'do_usprawiedliwienia', 'nieprzeczytane_wiadomosci', 'ostatnia_synchronizacja', 'sprawdziany_w_7_dni'].forEach((x) => { const o = st['sensor.szkola_' + q.k + '_' + x]; if (o) k += o.last_updated; }));
    if (this._skS().length) k += 'sk' + this._skNew();
    try { k += 'rp' + this._radioPlayers().map((x) => x.eid).join(','); } catch (e) { /* ignore */ }
    try { const np = this._nowPlaying(); k += 'np' + (np ? np.title + np.sub + np.where : ''); } catch (e) { /* ignore */ }
    if (this._aun) { try { k += 'ni' + this._nowItems().map((x) => x.t + x.sub).join('|'); } catch (e) { /* ignore */ } }
    try { k += 'as' + this._alarmSrc(); } catch (e) { /* ignore */ }
    k += 'al' + (['normal', 'unavailable', 'unknown', undefined].indexOf(this._s(PC.alarm)) < 0 || (PC.alarmSw && this._s(PC.alarmSw) === 'on') ? 1 : 0);
    return k + this._view + this._themeKey() + this._showAll + Math.floor(Date.now() / 60000) + this._events.length;
  }

  // przyciski chowania paska gornego i bocznego HA - tylko dla uzytkownika active5 (urzadzenie Portable)
  _kiosk() {
    this._vsHide(!!this._aun); this._vsSkin();
    const ok = this._portable();
    if (ok !== this._kOk) { this._kOk = ok; this._$('kb').style.display = ok ? '' : 'none'; }
    if (!this._kS) { this._kS = {h: this._kGet('h')}; this._kHid = this._hass.dockedSidebar === 'always_hidden'; this._kApply(); return; }
    const r = this._kRoot(); const want = this._kS.h && r && r.shadowRoot && !r.shadowRoot.getElementById('pastel-kiosk'); const hid = this._hass.dockedSidebar === 'always_hidden'; if (want || hid !== this._kHid) { this._kHid = hid; this._kApply(); }
  }
  _kGet(k) { try { return localStorage.getItem('pastel_hide_' + k) === '1'; } catch (e) { return false; } }
  _svTab() {   // telefon: zakladka 'Wygaszacz' w gornym pasku dashboardu jest zbedna - chowamy ja stylem wstrzyknietym do hui-root
    if (Math.min(window.innerWidth, window.innerHeight) >= 500) return;
    const r = this._kRoot(); if (!r || !r.shadowRoot || r.shadowRoot.getElementById('pastel-svtab')) return;
    const st = document.createElement('style'); st.id = 'pastel-svtab'; st.textContent = 'ha-tab-group-tab[data-path="wygaszacz"] { display: none !important; }'; r.shadowRoot.appendChild(st);
  }
  _kRoot() {
    if (this._kR && this._kR.isConnected) return this._kR;
    const f = (r) => { for (const e of r.querySelectorAll('*')) { if (e.tagName === 'HUI-ROOT') return e; if (e.shadowRoot) { const x = f(e.shadowRoot); if (x) return x; } } return null; };
    this._kR = f(document); return this._kR;
  }
  _kToggle(k) {
    if (!this._kS) this._kS = {h: this._kGet('h')};
    if (k === 'h') { this._kS.h = !this._kS.h; try { localStorage.setItem('pastel_hide_h', this._kS.h ? '1' : '0'); } catch (e) { /* ignore */ } this._kApply(); return; }
    // pasek boczny: HA sam zapamietuje tryb (docked / auto / always_hidden), wiec bierzemy stan rzeczywisty, a nie wlasna flage
    const ha = document.querySelector('home-assistant'); if (!ha) return; const cur = (this._hass && this._hass.dockedSidebar) || 'docked'; let to;
    if (cur === 'always_hidden') { let o = null; try { o = localStorage.getItem('pastel_dock_orig'); } catch (e) { /* ignore */ } to = (o && o !== 'always_hidden') ? o : 'docked'; }
    else { try { localStorage.setItem('pastel_dock_orig', cur); } catch (e) { /* ignore */ } to = 'always_hidden'; }
    ha.dispatchEvent(new CustomEvent('hass-dock-sidebar', {detail: {dock: to}, bubbles: true, composed: true}));
    setTimeout(() => { this._kApply(); window.dispatchEvent(new Event('resize')); }, 300);
  }
  _kApply() {
    const S = this._kS || {}; const root = this._kRoot();
    if (root && root.shadowRoot) { let st = root.shadowRoot.getElementById('pastel-kiosk');
      if (S.h) { if (!st) { st = document.createElement('style'); st.id = 'pastel-kiosk'; root.shadowRoot.appendChild(st); }
        st.textContent = '.header { display: none !important; } :host { --header-height: 0px !important; } #view { min-height: 100vh !important; padding-top: 0 !important; margin-top: 0 !important; }'; }
      else if (st) st.remove(); }
    const hid = !!(this._hass && this._hass.dockedSidebar === 'always_hidden'); const $ = this._$;
    $('kbh').classList.toggle('act', !!S.h); $('kbs').classList.toggle('act', hid);
    const ih = `<ha-icon icon="${S.h ? 'mdi:arrow-expand-down' : 'mdi:arrow-collapse-up'}"></ha-icon>`, is = `<ha-icon icon="${hid ? 'mdi:arrow-expand-right' : 'mdi:arrow-collapse-left'}"></ha-icon>`;
    if ($('kbh').innerHTML !== ih) $('kbh').innerHTML = ih; if ($('kbs').innerHTML !== is) $('kbs').innerHTML = is;
    setTimeout(() => { try { this._fit(); } catch (e) { /* ignore */ } window.dispatchEvent(new Event('resize')); }, 400);
  }
  _build() {
    this._wasAur = this._aur(); this._schId = ''; this._hudS = this._wasAur ? hudSch().id : undefined; if (!this._wasAur) this._hudD = undefined;
    this._au2b = this._au2(); this._aun = !!(this._config && this._config.aurora) && !this._au2b; const ASEC = `<section id="s-as"><h2 style="cursor:pointer"><ha-icon icon="mdi:creation"></ha-icon>Asystent<span style="flex:1"></span><ha-icon icon="mdi:chevron-right"></ha-icon></h2><div class="card as"><div class="lst"><button class="listen" id="listen" data-pe="as.listen" type="button"><ha-icon icon="mdi:microphone-message"></ha-icon><span>Dotknij i mów</span></button><button class="mic" id="mic" data-pe="as.mic" type="button"></button><button class="mic" id="aview" data-pe="as.view" type="button" title="Asystent i historia rozmów"><ha-icon icon="mdi:chevron-right"></ha-icon></button></div></div></section>`;
    this.shadowRoot.innerHTML = `${this._aur() ? ((this._hudD = this._dk()) ? `<style id="cst">${hudCss(CSS)}</style><style id="hudst">${HUD_CSS}${hudMod(1)}</style>` : `<style id="cst">${hudCssL(CSS)}</style><style id="hudlt">${HUD_LIGHTX}${HUD_LIGHT}${hudMod(0)}</style>`) : `<style id="cst">${CSS}</style>`}<div class="app${this._au2b ? ' sd' : this._aun ? ' an' : ''}" id="app">${this._aur() ? '<div id="hudbg"></div>' : ''}${this._aun ? '<div id="abar" hidden><div class="tt"><ha-icon icon="mdi:alarm-light"></ha-icon><div><b>ALARM</b><small id="abs"></small></div></div><button type="button" data-n="aoff">WYŁĄCZ ALARM</button></div><nav id="bnav"><button type="button" data-n="home"><ha-icon icon="mdi:home-variant-outline"></ha-icon><span>Dom</span></button><button type="button" data-n="events"><ha-icon icon="mdi:calendar-clock-outline"></ha-icon><span>Wydarzenia</span></button><div class="fabw"><button type="button" class="fab" data-n="fab"><span class="rp"></span><span class="rp r2"></span><ha-icon icon="mdi:creation"></ha-icon><span class="eqv"><b></b><b></b><b></b><b></b><b></b></span><small>Asystent</small><span class="fxt"></span></button></div><button type="button" data-n="szkola"><ha-icon icon="mdi:school-outline"></ha-icon><span>Szkoła</span><i></i></button><button type="button" data-n="links"><ha-icon icon="mdi:dots-grid"></ha-icon><span>Więcej</span><i></i></button></nav>' : ''}${this._au2b ? `<aside id="side"><div class="swx" id="swx" data-go="pogoda"><div id="swfx"></div><div class="s2c" id="sclk">--:--</div><div class="s2d" id="sdt"></div><div id="swr"></div></div><button type="button" class="s2m" id="shome" data-go="home"><ha-icon icon="mdi:home-outline"></ha-icon><span class="nm">Ekran główny</span></button><div id="spg"><div class="pg"><div class="s2g">POMIESZCZENIA</div><div id="sroom"></div></div><div class="pg"><div class="s2g">SKRÓTY</div><div class="s2s" id="ssc"></div></div></div><div class="spd"><button type="button" class="d on" data-pg="0" aria-label="Strona 1"></button><button type="button" class="d" data-pg="1" aria-label="Strona 2"></button><button type="button" class="nx" data-pgn="1"><span>Więcej skrótów</span><ha-icon icon="mdi:chevron-right"></ha-icon></button></div><div class="s2y" id="ssys"></div>${ASEC}</aside>` : ''}
      <div id="popbd" style="display:none"></div><div id="sub" style="display:none"></div><div id="home"><section id="s-hero"></section>
      ${this._au2b ? '' : ASEC}<section id="s-status"></section>
      <section id="s-school"></section><section id="s-rooms"></section><section id="s-now"></section><section id="s-rmini"></section><section id="s-light"></section><section id="s-air"></section><section id="s-fuel"></section><section id="s-cal"></section>
      <section id="s-links"></section></div></div>
      <div class="kb" id="kb" style="display:none"><button id="kbh" title="Pasek górny"><ha-icon icon="mdi:arrow-collapse-up"></ha-icon></button><button id="kbs" title="Pasek boczny"><ha-icon icon="mdi:arrow-collapse-left"></ha-icon></button></div>`;
    const card = this, GI = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML'), GUARD = {'s-hero': 1, 's-status': 1, 's-school': 1, 's-light': 1, 's-rooms': 1, 's-rmini': 1, 's-now': 1, 's-air': 1, 's-fuel': 1, 's-cal': 1, 's-links': 1, mic: 1};
    // sekcje ekranu glownego: identyczny HTML nie jest ponownie wstawiany (oszczedza parsowanie i przeliczanie ukladu na slabym tablecie; animacje nie startuja od nowa)
    const $ = (id) => { const e = this.shadowRoot.getElementById(id); if (e && GUARD[id] && !e.__g) { e.__g = 1; Object.defineProperty(e, 'innerHTML', {configurable: true, get() { return GI.get.call(this); }, set(v) { if (this.__h === v && this.firstChild) { this.__sk = (this.__sk || 0) + 1; return; } this.__h = v; card._gch = (card._gch || 0) + 1; GI.set.call(this, v); }}); } return e; }; this._$ = $;
    if (this._aur()) hudWatch(this);
    $('mic').onclick = () => this._call('switch', 'toggle', {entity_id: this._mute()});
    $('popbd').onclick = () => this._back(); { const lbn = $('listen'); lbn.onpointerdown = (ev) => this._lpDown(ev, '#listen', () => { if (navigator.vibrate) { try { navigator.vibrate(15); } catch (e) { /* ignore */ } } this._asOpen(); }); lbn.onpointerup = lbn.onpointerleave = lbn.onpointercancel = () => this._lpUp(); lbn.oncontextmenu = (ev) => ev.preventDefault(); } $('listen').onclick = () => { if (this._lpFired) { this._lpFired = false; return; } this._listen(); const lb = $('listen'); lb.classList.add('tap'); clearTimeout(this._tapT); this._tapT = setTimeout(() => lb.classList.remove('tap'), 2600); }; $('s-as').querySelector('h2').onclick = () => this._open('asystent'); $('aview').onclick = () => this._open('asystent');
    // przegladarka blokuje dzwiek/mikrofon satelity do pierwszego dotkniecia strony: pierwsze dotkniecie karty samo klika przycisk startu satelity
    this.shadowRoot.addEventListener('pointerdown', () => { const b = document.querySelector('#voice-satellite-ui .vs-start-btn.visible'); if (b) b.click(); }, true);
    $('kbh').onclick = () => this._kToggle('h'); $('kbs').onclick = () => this._kToggle('s');
    if (this._aun) { const alOn = () => ['normal', 'unavailable', 'unknown', undefined].indexOf(this._s(PC.alarm)) < 0 || (PC.alarmSw && this._s(PC.alarmSw) === 'on');
      const goHome = (then) => { if ((this._view || 'home') !== 'home') { this._open('home'); setTimeout(then, 450); } else then(); };
      const bn = (ev) => { if (this._lpFired) { this._lpFired = false; return; } const b = ev.target.closest('[data-n]'); if (!b) return; const n = b.dataset.n;
        if (n === 'aoff') this._call('script', 'jarvis_reset_alarmow', {});
        else if (n === 'home') goHome(() => { const a = this.shadowRoot.getElementById('app'); if (a) a.scrollIntoView({behavior: 'smooth', block: 'start'}); });
        else if (n === 'events') this._bsheet('events');
        else if (n === 'fab') { if (alOn()) this._call('script', 'jarvis_reset_alarmow', {}); else { const sst = this._s(this._sat()), bz = ['listening', 'processing', 'responding'].includes(sst); if (!sst || sst === 'unavailable' || sst === 'unknown') this._asOpen(); else if (bz) this._voiceStop(); else this._listen(); } }   // dotkniecie = rozmowa glosowa, przytrzymanie = czat tekstowy
        else if (n === 'links') this._bsheet('links');
        else this._open(n); };
      { this._vsStopWatch(); const nb = this.shadowRoot.getElementById('bnav'); nb.onpointerdown = (ev) => { if (!alOn()) this._lpDown(ev, '.fab', () => { if (navigator.vibrate) { try { navigator.vibrate(15); } catch (e) { /* ignore */ } } this._asOpen(); }); }; nb.onpointerup = nb.onpointerleave = nb.onpointercancel = () => this._lpUp(); nb.oncontextmenu = (ev) => { if (ev.target.closest('.fab')) ev.preventDefault(); }; }
      this.shadowRoot.getElementById('bnav').onclick = bn; this.shadowRoot.getElementById('abar').onclick = bn; }
    if (this._au2b) { const spg = this.shadowRoot.getElementById('spg'), pgGo = (n) => { spg.scrollTo({left: n * spg.clientWidth, behavior: 'smooth'}); };
      if (spg) { let rq = 0; spg.onscroll = () => { if (rq) return; rq = requestAnimationFrame(() => { rq = 0; const n = spg.scrollLeft > spg.clientWidth / 2 ? 1 : 0, sd = this.shadowRoot.getElementById('side'); sd.querySelectorAll('.spd .d').forEach((d) => d.classList.toggle('on', +d.dataset.pg === n)); sd.querySelector('.spd').classList.toggle('p2', n === 1); const nx = sd.querySelector('.spd .nx'); nx.dataset.pgn = n ? 0 : 1; nx.querySelector('span').textContent = n ? 'Pomieszczenia' : 'Więcej skrótów'; nx.querySelector('ha-icon').setAttribute('icon', n ? 'mdi:chevron-left' : 'mdi:chevron-right'); }); }; }
      const sideEl = this.shadowRoot.getElementById('side'); sideEl.onpointerdown = (ev) => this._lpDown(ev, '.s2np', () => this._mplOpen()); sideEl.onpointerup = sideEl.onpointerleave = sideEl.onpointercancel = () => this._lpUp(); sideEl.oncontextmenu = (ev) => { if (ev.target.closest('.s2np')) ev.preventDefault(); };
      sideEl.onclick = (ev) => { if (this._lpFired) { this._lpFired = false; return; } const pg = ev.target.closest('[data-pg],[data-pgn]'); if (pg) { pgGo(+(pg.dataset.pg !== undefined ? pg.dataset.pg : pg.dataset.pgn)); return; } const b = ev.target.closest('[data-go]'); if (!b) return; const go = b.dataset.go; if (go === 'a:alarm') this._call('script', 'jarvis_reset_alarmow', {}); else this._open(go); }; }
    if (!this._rzf) { this._rzf = () => { if (this._built && this._au2() !== this._au2b) { try { window.removeEventListener('hashchange', this._onHash); } catch (e) { /* ignore */ } this._rp = null; this._build(); this._sig = ''; this._subK = null; if (this._hass) this.hass = this._hass; } }; window.addEventListener('resize', this._rzf); }
    this._built = true; this._applyLayout();
    this._onHash = () => { this._route(); }; window.addEventListener('hashchange', this._onHash); this._route();
    if (this._hass) { this.hass = this._hass; }
  }

  // kolejnosc i widocznosc sekcji ekranu glownego (cfg: order = [as, air, fuel, cal], hide = [today, air, ...])
  // uklad z pliku www/jarvis/pastel-layout.json (zapisuje go edytor w dodatku HUD Scene); gdy pliku brak, obowiazuje PC.order / PC.hide z generatora
  _lo() { if (this._loc === undefined) { let o = null; try { o = JSON.parse(localStorage.getItem('pastel_lay') || 'null'); } catch (e) { /* ignore */ } this._loc = o && Array.isArray(o.order) ? o : null; } return this._loc; }
  _loSet(o) { this._loc = o; try { if (o) localStorage.setItem('pastel_lay', JSON.stringify(o)); else localStorage.removeItem('pastel_lay'); } catch (e) { /* ignore */ } this._lyc = null; }
  _rmo() { try { const o = JSON.parse(localStorage.getItem('pastel_rooms') || 'null'); return o && Array.isArray(o.order) ? o : null; } catch (e) { return null; } }
  _roomsL() {   // kolejnosc / ukrycie kafelkow pokoi z trybu edycji (localStorage pastel_rooms); tylko lista na ekranie glownym
    const o = this._rmo(); if (!o) return PC.rooms;
    const ix = (r) => { const i = o.order.indexOf(r.id); return i < 0 ? 999 : i; };
    let l = PC.rooms.slice().sort((a, b) => ix(a) - ix(b)); if (!this._edit) l = l.filter((r) => !(o.hide || []).includes(r.id)); return l;
  }
  _edRm() { const o = this._rmo(); return {order: this._roomsL().map((r) => r.id), hide: o ? (o.hide || []).slice() : []}; }
  _lkHide() { try { const a = JSON.parse(localStorage.getItem('pastel_lkhide') || '[]'); return Array.isArray(a) ? a : []; } catch (e) { return []; } }
  _lay() {   // uklad pliku/generatora + lokalne zmiany z trybu edycji na tym urzadzeniu (localStorage pastel_lay: order, hide)
    const l = this._lay0(), o = this._lo(); if (!o || (this._config && this._config.preview)) return l;
    const D = DEF_HOME, fix = (a, d) => { const r = (a || []).filter((x) => d.includes(x)); d.forEach((x, i) => { if (!r.includes(x)) { const pr = d[i - 1]; r.splice(pr && r.includes(pr) ? r.indexOf(pr) + 1 : r.length, 0, x); } }); return r; };
    const base = l.free ? l : {free: true, order: D.order.slice(), porder: D.porder.slice(), hide: [], sec: JSON.parse(JSON.stringify(D.sec)), el: {}, calN: 0};
    const v = Object.assign({}, base, {order: fix(o.order, D.order), porder: fix(o.order, D.order), hide: (l.hide || []).filter((x) => !D.order.includes(x)).concat((o.hide || []).filter((x) => D.order.includes(x)))});
    return v;
  }
  _lay0() {
    const L = (this._L && this._L.home) || {}, D = DEF_HOME;
    if (Array.isArray(L.order) && L.order.length >= D.order.length - 1 && L.order.length <= D.order.length) {   // uklad swobodny (v2): kolejnosc na tablecie i telefonie, szerokosc/wysokosc sekcji, ukryte
      const fix = (a, d) => { const o = (a || []).filter((x) => d.includes(x)); d.forEach((x, i) => { if (!o.includes(x)) { const pr = d[i - 1]; o.splice(pr && o.includes(pr) ? o.indexOf(pr) + 1 : o.length, 0, x); } }); return o; };
      const sec = {}; D.order.forEach((id) => { const s = (L.sec || {})[id] || {}; sec[id] = {w: Math.min(4, Math.max(1, +s.w || D.sec[id].w)), h: Math.min(8, Math.max(1, +s.h || D.sec[id].h))}; });
      return {free: true, order: fix(L.order, D.order), porder: fix(L.porder, D.porder), hide: L.hide || [], sec, el: L.el || {}, calN: +L.calN ? Math.min(12, Math.max(1, +L.calN)) : 0};   // 0 = domyslnie (4 wydarzenia)
    }
    return {order: L.order || PC.order || [], hide: L.hide || PC.hide || [], file: !!L.order, el: {}};
  }
  // podglad w edytorze: uklad dostarcza strona-gospodarz (previewApply), karta niczego nie pobiera z pliku
  previewApply(j) {
    this._L = j; this._Ls = null; this._applyCfg();
    if (this._built && this._$ && this._$('home')) this._applyLayout(); else if (this._built) this._applyPe(this._lay().free ? this._peCss() : '');
    this._sig = ''; this._sg = ''; if (this._hass) this.hass = this._hass;
  }
  async _loadLayout() {
    if (this._config && this._config.preview) return;
    try {
      const lid = this._config && /^[a-z0-9_]{1,20}$/.test(this._config.layout || '') ? '-' + this._config.layout : '';   // osobny plik ukladu dla projektu z edytora
      const r = await fetch('/local/jarvis/pastel-layout' + lid + '.json?t=' + Date.now(), {cache: 'no-store'}); if (!r.ok) { if (r.status === 404 && this._L) { this._L = null; this._Ls = null; this._applyCfg(); if (this._built && this._$ && this._$('home')) { this._applyLayout(); this._sig = ''; if (this._hass) this.hass = this._hass; } else if (this._built) { this._applyPe(''); this._sg = ''; if (this._hass) this.hass = this._hass; } } return; }
      const j = await r.json(); if (!j || ![1, 2].includes(j.v)) return; const s = JSON.stringify([j.home || {}, j.cfg || {}, j.views || {}]);
      if (s !== this._Ls) { this._Ls = s; this._L = j; this._applyCfg(); if (this._built && this._$ && this._$('home')) { this._applyLayout(); this._sig = ''; if (this._hass) this.hass = this._hass; } else if (this._built) { this._applyPe(this._lay().free ? this._peCss() : ''); this._sg = ''; if (this._hass) this.hass = this._hass; } }
    } catch (e) { /* brak pliku albo blad sieci: zostaje uklad z generatora */ }
  }
  // te same zasady co automatyczne rozmieszczenie siatki CSS (grid-auto-flow: row, 4 kolumny): wiersz konczacy najwyzsza sekcje jest elastyczny (1fr) i przejmuje jej nadmiar wysokosci, reszta wierszy ma wysokosc tresci
  _rowsTpl(lay) {
    const occ = []; let r0 = 0, c0 = 0, rows = 0, best = null;
    const free = (r, c, w, h) => { for (let y = r; y < r + h; y++) for (let x = c; x < c + w; x++) if (occ[y] && occ[y][x]) return false; return true; };
    lay.order.filter((id) => !lay.hide.includes(id)).forEach((id) => {
      const s = lay.sec[id], w = Math.min(4, s.w), h = s.h; let r = r0, c = c0;
      for (;;) { if (c + w > 4) { r++; c = 0; continue; } if (free(r, c, w, h)) break; c++; }
      for (let y = r; y < r + h; y++) { occ[y] = occ[y] || []; for (let x = c; x < c + w; x++) occ[y][x] = 1; }
      r0 = r; c0 = c; rows = Math.max(rows, r + h); if (h > 1 && (!best || h > best.h)) best = {h, last: r + h - 1};
    });
    return Array.from({length: rows}, (_, i) => (best && best.last === i ? '1fr' : 'auto')).join(' ');
  }
  // konfiguracja z edytora (cfg w pliku ukladu) nadpisuje PC: pokoje i urzadzenia, baterie, kalendarze, przypomnienia, progi baterii i PM2.5; brak pliku = ustawienia z generatora
  _applyCfg() {
    if (!PCB) PCB = JSON.parse(JSON.stringify(PC));
    PCOWN = this; const o = (this._L && this._L.cfg) || {}, b = (this._config && this._config.empty) ? PC_EMPTY : PCB;
    if (Array.isArray(o.rooms)) {
      PC.rooms = o.rooms.map((r) => { const base = b.rooms.find((x) => x.id === r.id) || {icon: 'mdi:home-outline', c: 'lav', dev: []}; return Object.assign({}, base, r); });
      PC.temps = PC.rooms.filter((r) => r.t).map((r) => [String(r.name || r.id).toUpperCase(), r.t]); PC.hums = PC.rooms.filter((r) => r.h).map((r) => [String(r.name || r.id).toUpperCase(), r.h]);
    } else { PC.rooms = b.rooms; PC.temps = b.temps; PC.hums = b.hums; }
    PC.bats = Array.isArray(o.bats) ? o.bats : b.bats; PC.cal = Array.isArray(o.cal) ? o.cal : b.cal; PC.calDays = o.calDays || b.calDays;
    PC.reminders = Array.isArray(o.reminders) ? o.reminders : b.reminders; PC.fuel = Array.isArray(o.fuel) ? o.fuel : b.fuel;
    PC.dsh = ['sq', 'ci', 'pi'].includes(o.dsh) ? o.dsh : '';
    PC.klim = Array.isArray(o.klim) ? o.klim : [];
    PC.out = o.out ? Object.assign({}, b.out, o.out) : b.out; PC.pm = o.pm !== undefined ? o.pm : b.pm; PC.purifier = o.purifier !== undefined ? o.purifier : b.purifier;
    PC.batLow = o.batLow || 30; PC.batCrit = o.batCrit || 10; PC.pmLv = Array.isArray(o.pmLv) && o.pmLv.length === 4 ? o.pmLv : [10, 25, 35, 50];
  }
  // ustawienia pojedynczych elementow (home.el[klucz] = {vis, col, ff, fw, sz, dec, n}); elementy w karcie maja atrybut data-pe
  _dec(k, d) { const o = (this._lay().el || {})[k]; return o && o.dec !== undefined ? Math.min(3, Math.max(0, +o.dec)) : d; }
  _ic(k, d) { const o = (this._lay().el || {})[k]; return o && /^mdi:[a-z0-9-]{1,60}$/.test(o.ico || '') ? o.ico : d; }
  _f(k, v, d) { return v.toFixed(this._dec(k, d)).replace('.', ','); }
  _lk(p, d) { const o = (this._lay().el || {})['links.' + p.replace(':', '_')]; return o && o.n ? String(o.n).slice(0, 24) : d; }
  _peCss() {
    const E = this._lay().el || {}, FF = {'Manrope': 'Manrope,system-ui,sans-serif', 'JetBrains Mono': "'JetBrains Mono',monospace", 'Serif': 'Georgia,serif', 'Zaokrąglona': "'Trebuchet MS',system-ui,sans-serif"}; let css = '';
    Object.keys(E).forEach((k) => { if (!/^[\w.:-]{1,48}$/.test(k)) return; const o = E[k] || {}, kp = k.split(':'), s = (kp[1] && /^rooms\./.test(kp[0]) && /^[a-z0-9_]{1,24}$/.test(kp[1]) ? '.room[data-id="' + kp[1] + '"] ' : '') + '[data-pe="' + kp[0] + '"]';
      if (o.vis === false) css += s + '{display:none!important}';
      if (/^#[0-9a-f]{6}$/i.test(o.col || '')) css += s + ',' + s + ' *{color:' + o.col + '!important}';
      if (FF[o.ff]) css += s + ',' + s + ' *{font-family:' + FF[o.ff] + '!important}';
      if (['600', '700', '800'].includes(String(o.fw))) css += s + ',' + s + ' *{font-weight:' + o.fw + '!important}';
      if (o.sz === 'S' || o.sz === 'L') css += s + '{zoom:' + (o.sz === 'S' ? '.85' : '1.25') + '}';
      if (+o.dx || +o.dy) css += s + '{translate:' + (+o.dx || 0) + 'px ' + (+o.dy || 0) + 'px}'; });
    return css;
  }
  _applyPe(css) { const sr = this.shadowRoot; let st = sr.getElementById('pel'); if (!st) { st = document.createElement('style'); st.id = 'pel'; sr.appendChild(st); } if (st.textContent !== css) st.textContent = css; }
  // uklad Aurory z pliku (home.au): kolejnosc, rozmiar i ukrywanie sekcji na tablecie oraz kolejnosc i ukrywanie na telefonie
  _auLay() {
    const D = DEF_AU, L = ((this._L && this._L.home) || {}).au || {};
    const fix = (a, d) => { const o = (Array.isArray(a) ? a : []).filter((x, i, r) => d.includes(x) && r.indexOf(x) === i); d.forEach((x, i) => { if (!o.includes(x)) { const pr = d[i - 1]; o.splice(pr && o.includes(pr) ? o.indexOf(pr) + 1 : o.length, 0, x); } }); return o; };
    const sec = {}; D.t.forEach((id) => { const q = (L.sec || {})[id] || {}; sec[id] = {w: Math.min(4, Math.max(1, +q.w || D.sec[id].w)), h: Math.min(3, Math.max(1, +q.h || D.sec[id].h))}; });
    return {order: fix(L.order, D.t), porder: fix(L.porder, D.p), hide: (Array.isArray(L.hide) ? L.hide : []).filter((x) => D.t.includes(x)), phide: (Array.isArray(L.phide) ? L.phide : D.phide).filter((x) => D.p.includes(x)), sec};
  }
  _applyAurora() {
    const $ = this._$, lay = this._auLay(), hm = $('home'); if (!hm) return;
    hm.classList.remove('free', 'ord');
    if (this._au2b) {
      hm.style.gridTemplateAreas = 'none'; hm.style.gridAutoFlow = 'row dense';
      ['now', 'rmini', 'air'].forEach((id) => { const el = $('s-' + id); if (el) el.style.display = 'none'; });
      DEF_AU.t.forEach((id) => { const el = $('s-' + id); if (!el) return; const z = lay.sec[id]; el.style.gridArea = 'auto'; el.style.gridColumn = 'span ' + z.w; el.style.gridRow = 'span ' + z.h; el.style.order = lay.order.indexOf(id); el.style.display = lay.hide.includes(id) ? 'none' : ''; });
    } else {
      DEF_AU.p.forEach((id) => { const el = $('s-' + id); if (!el) return; el.style.order = lay.porder.indexOf(id) + 1; el.style.display = lay.phide.includes(id) ? 'none' : ''; });
    }
  }
  _applyLayout() {
    const $ = this._$, lay = this._lay();
    if (this._au2b || this._aun) { this._applyAurora(); return; }   // dashboard Aurora: uklad z home.au (domyslnie taki, jak do tej pory)
    this._applyPe(lay.free ? this._peCss() : '');
    if (lay.free) {
      const home = $('home'); home.classList.add('free'); home.classList.remove('ord');
      const dflt = JSON.stringify([lay.order, lay.porder, lay.sec]) === JSON.stringify([DEF_HOME.order, DEF_HOME.porder, DEF_HOME.sec]);
      home.style.gridTemplateRows = this._rowsTpl(lay);
      DEF_HOME.order.forEach((id) => { const el = $('s-' + id), s = lay.sec[id]; el.style.order = ''; el.style.gridArea = '';
        el.style.setProperty('--ot', lay.order.indexOf(id)); el.style.setProperty('--w', s.w); el.style.setProperty('--h', s.h);
        if (dflt) el.style.removeProperty('--op'); else el.style.setProperty('--op', lay.porder.indexOf(id));   // uklad rowny domyslnemu zostawia kolejnosc telefonu z HTML
        el.style.display = lay.hide.includes(id) ? 'none' : ''; });
      return;
    }
    $('home').classList.remove('free'); $('home').style.gridTemplateRows = ''; DEF_HOME.order.forEach((id) => { const el = $('s-' + id); ['--ot', '--op', '--w', '--h'].forEach((v) => el.style.removeProperty(v)); });
    const ord = (lay.order || []).filter((x) => ['air', 'fuel', 'cal', 'as'].includes(x));
    ['air', 'fuel', 'cal', 'as'].forEach((x) => { if (!ord.includes(x)) ord.push(x); });
    const home = $('home'); const on = lay.file ? ord.join() !== 'as,air,fuel,cal' : !!(PC.order && PC.order.length);   // uklad z pliku rowny domyslnemu nic nie zmienia
    home.classList.toggle('ord', on);
    const base = ['hero', 'status', 'school', 'rooms'];
    base.forEach((x, i) => { $('s-' + x).style.order = on ? i : ''; });
    ord.forEach((x, i) => { const el = $('s-' + x); el.style.order = on ? base.length + i : ''; el.style.gridArea = on ? ['as', 'air', 'fuel', 'cal'][i] : ''; });
    $('s-links').style.order = on ? 99 : '';
    ['school', 'air', 'fuel', 'cal', 'as', 'links'].forEach((x) => { $('s-' + x).style.display = lay.hide.includes(x) ? 'none' : ''; });
  }
  async _loadForecast() {
    const w = PC.out.weather; if (!this._hass || !w) return;
    const get = async (type) => { try { const r = await this._hass.callWS({type: 'call_service', domain: 'weather', service: 'get_forecasts', service_data: {type}, target: {entity_id: w}, return_response: true});
      const x = r && r.response && r.response[w]; return (x && x.forecast) || []; } catch (e) { return []; } };
    const [h, d] = await Promise.all([get('hourly'), get('daily')]);
    this._fc = {h, d}; this._sig = ''; if (this._hass && !this._formOpen) this.hass = this._hass;
  }
  _wxFx(st) {
    const night = st === 'clear-night' || this._s('sun.sun') === 'below_horizon';
    const rn = (i, k) => Math.abs(Math.sin(i * 12.9898 + k * 78.233) * 43758.5453) % 1;
    const P = (n, f) => Array.from({length: n}, (_, i) => f(i)).join('');
    const clouds = (n, sp) => P(n, (i) => `<i class="cl" style="top:${(rn(i, 1) * 70 - 8).toFixed(0)}px;left:${(rn(i, 2) * 40 - 20).toFixed(0)}%;transform:scale(${(0.8 + rn(i, 3) * 0.9).toFixed(2)});animation-duration:${(sp + rn(i, 4) * sp).toFixed(0)}s;animation-delay:-${(rn(i, 5) * sp).toFixed(0)}s"></i>`);
    const rain = (n, sp) => P(n, (i) => `<i class="dr" style="left:${(rn(i, 6) * 100).toFixed(1)}%;animation-duration:${(sp + rn(i, 7) * 0.4).toFixed(2)}s;animation-delay:-${(rn(i, 8) * 2).toFixed(2)}s"></i>`);
    const snow = (n) => P(n, (i) => `<i class="sn" style="left:${(rn(i, 9) * 100).toFixed(1)}%;animation-duration:${(5 + rn(i, 10) * 4).toFixed(1)}s;animation-delay:-${(rn(i, 11) * 8).toFixed(1)}s;opacity:${(0.6 + rn(i, 12) * 0.4).toFixed(2)}"></i>`);
    const hail = (n) => P(n, (i) => `<i class="hl" style="left:${(rn(i, 13) * 100).toFixed(1)}%;animation-duration:${(0.9 + rn(i, 14) * 0.5).toFixed(2)}s;animation-delay:-${(rn(i, 15) * 2).toFixed(2)}s"></i>`);
    const stars = P(14, (i) => `<i class="st" style="left:${(rn(i, 16) * 100).toFixed(1)}%;top:${(rn(i, 17) * 85).toFixed(0)}%;animation-delay:-${(rn(i, 18) * 3).toFixed(1)}s"></i>`);
    const fog = P(3, (i) => `<i class="fg" style="top:${10 + i * 38}%;animation-duration:${6 + i * 2}s"></i>`);
    const body = night ? '<i class="moon">' + moonSvg() + '</i>' + stars : '<i class="sun"></i>';
    let h = '', dk = false;
    switch (st) {
      case 'sunny': h = body; break; case 'clear-night': h = '<i class="moon">' + moonSvg() + '</i>' + stars; break;
      case 'partlycloudy': h = body + clouds(2, 40); break;
      case 'cloudy': h = clouds(4, 50); dk = true; break;
      case 'windy': case 'windy-variant': h = clouds(3, 18); break;
      case 'fog': h = fog; break;
      case 'rainy': h = clouds(3, 45) + rain(22, 0.9); dk = true; break;
      case 'pouring': h = clouds(4, 40) + rain(44, 0.6); dk = true; break;
      case 'lightning': h = clouds(4, 45) + '<i class="fl"></i>'; dk = true; break;
      case 'lightning-rainy': h = clouds(4, 40) + rain(30, 0.7) + '<i class="fl"></i>'; dk = true; break;
      case 'hail': h = clouds(3, 40) + hail(20); dk = true; break;
      case 'snowy': h = clouds(2, 50) + snow(24); break;
      case 'snowy-rainy': h = clouds(3, 45) + snow(14) + rain(14, 0.9); dk = true; break;
      default: return '';
    }
    return `<div class="fx${dk ? ' dk' : ''} w-${st}${night ? ' nt' : ''}">${h}</div>`;
  }
  _wIcon(e) { e = (e || '').toLowerCase(); return /wiatr/.test(e) ? 'mdi:weather-windy' : /burz|grad/.test(e) ? 'mdi:weather-lightning' : /deszcz|opad|ulew/.test(e) ? 'mdi:weather-pouring' : /śnie|zawiej|zamiec|oblod|gołoled/.test(e) ? 'mdi:weather-snowy-heavy' : /mróz|mroz|przymroz/.test(e) ? 'mdi:snowflake-alert' : /upa/.test(e) ? 'mdi:thermometer-high' : /mgł|mgl/.test(e) ? 'mdi:weather-fog' : 'mdi:alert-outline'; }   // ikona ostrzezenia wg nazwy zjawiska (Stan domu, wygaszacz i widok pogody)
  _warns() {   // niewygasle ostrzezenia meteo IMGW (obowiazujace i zapowiedziane)
    const o = PC.warn && this._hass.states[PC.warn], w = o && Array.isArray(o.attributes.warnings) ? o.attributes.warnings : [], now = Date.now();
    return w.filter((x) => { const t = new Date(String(x.valid_to || '').replace(' ', 'T')); return isNaN(t) || t.getTime() > now; });
  }
  _today() {
    const st = this._hass.states, w = st[PC.out.weather], A = (w && w.attributes) || {}, fc = this._fc || {h: [], d: []}, now = Date.now();
    const p2 = (n) => String(n).padStart(2, '0'), hm = (t) => p2(t.getHours()) + ':' + p2(t.getMinutes()), f1 = (v) => v.toFixed(1).replace('.', ',');
    const wet = ['rainy', 'pouring', 'snowy', 'snowy-rainy', 'lightning-rainy', 'hail', 'lightning'];
    const hrs = fc.h.map((x) => ({t: new Date(x.datetime), c: x.condition, p: +x.precipitation || 0, T: +x.temperature, g: +(x.wind_gust_speed || x.wind_speed) || 0}))
      .filter((x) => !isNaN(x.t) && x.t.getTime() > now - 3600000 && x.t.getTime() < now + 12 * 3600000);
    const isWet = (x) => wet.includes(x.c) || x.p >= 0.3, nowWet = !!w && wet.includes(w.state), rainAt = hrs.find(isWet);
    const hints = [];
    const snow = (rainAt && /snow/.test(rainAt.c)) || (w && /snow/.test(w.state));
    if (nowWet) hints.push({sev: 1, icon: snow ? 'mdi:weather-snowy' : 'mdi:umbrella', text: snow ? 'Teraz sypie śniegiem' : 'Teraz pada', sub: 'Weź parasol'});
    else if (rainAt) { const mm = hrs.filter(isWet).reduce((a, x) => a + x.p, 0);
      hints.push({sev: 1, icon: snow ? 'mdi:weather-snowy' : 'mdi:umbrella-outline', text: (snow ? 'Śnieg' : 'Opady') + ' ok. ' + hm(rainAt.t), sub: 'Weź parasol' + (mm >= 0.1 ? ' · ~' + f1(mm) + ' mm' : '')}); }
    if (hrs.length) { const tn = Math.min(...hrs.map((x) => x.T)), tx = Math.max(...hrs.map((x) => x.T)), gm = Math.max(...hrs.map((x) => x.g));
      if (tn <= 0) hints.push({sev: 1, icon: 'mdi:snowflake-alert', text: 'Możliwy przymrozek', sub: 'Minimum ' + f1(tn) + '°C'});
      if (tx >= 28) hints.push({sev: 1, icon: 'mdi:weather-sunny-alert', text: 'Upał', sub: 'Do ' + f1(tx) + '°C'});
      if (gm >= 55) hints.push({sev: 1, icon: 'mdi:weather-windy', text: 'Silny wiatr', sub: 'Porywy do ' + Math.round(gm) + ' km/h'}); }
    const pm = this._n(PC.pm), pon = this._s(PC.purifier) === 'on';
    if (pm !== null && pm > (PC.pmLv || [10, 25, 35, 50])[1]) hints.push(pon ? {sev: 0, icon: 'mdi:air-purifier', text: 'Oczyszczacz pracuje', sub: 'PM2.5 ' + Math.round(pm)} : {sev: pm > 35 ? 1 : 0, icon: 'mdi:air-filter', text: 'PM2.5 rośnie (' + Math.round(pm) + ')', sub: 'Warto włączyć oczyszczacz', btn: ['Włącz', 'pur']});
    const ev = (this._events || []).filter((e) => PC.cal.includes(e.cal) && !e.ad && e.s.getTime() > now && e.s.getTime() < now + 8 * 3600000)[0];
    if (ev) { const mn = Math.round((ev.s.getTime() - now) / 60000), rain = nowWet || (rainAt && rainAt.t.getTime() < ev.e.getTime());
      hints.push({sev: 0, icon: 'mdi:calendar-clock', text: hm(ev.s) + ' · ' + ev.t, sub: rain ? 'Wyjdź wcześniej, będzie padać' : mn < 60 ? 'Za ' + mn + ' min' : 'Za ' + Math.floor(mn / 60) + ' godz. ' + (mn % 60) + ' min'}); }
    const chips = [];
    const d0 = new Date(); d0.setHours(0, 0, 0, 0); const dayOf = (x) => { const t = new Date(x.datetime); t.setHours(0, 0, 0, 0); return Math.round((t - d0) / 86400000); };
    const rng = (x) => x && x.templow != null ? Math.round(x.templow) + '–' + Math.round(x.temperature) + '°' : x ? Math.round(x.temperature) + '°' : '';
    const dT = fc.d.find((x) => dayOf(x) === 0), dM = fc.d.find((x) => dayOf(x) === 1);
    if (dT) chips.push('Dziś ' + rng(dT)); if (dM) chips.push('Jutro ' + rng(dM) + ' ' + ((WX[dM.condition] || ['', ''])[1] || '').toLowerCase() + (+dM.precipitation >= 0.3 ? ' · ' + f1(+dM.precipitation) + ' mm' : ''));
    return {chips, hints};
  }
  _todayHtml() {
    if (this._lay().hide.includes('today')) return '';
    const t = this._today();
    return `<div class="hh">` + (t.chips.length ? `<div class="mini">${t.chips.map((c) => `<span>${esc(c)}</span>`).join('')}</div>` : '') +
      (t.hints.length ? `<div class="hhl">` : '') + t.hints.slice(0, 8).map((i) => `<div class="hr s${i.sev}"><ha-icon icon="${i.icon}"></ha-icon><div>${esc(i.text)}${i.sub ? `<small>${esc(i.sub)}</small>` : ''}</div>${i.btn ? `<button class="hb" data-h="${i.btn[1]}">${esc(i.btn[0])}</button>` : ''}</div>`).join('') + (t.hints.length ? `</div>` : '') + `</div>`;
  }
  // przypomnienia: z konfiguracji (cfg.reminders) + wlasne zapisane w tej przegladarce
  _s(e) { const o = this._hass.states[e]; return o ? o.state : undefined; }
  _n(e) { const v = parseFloat(this._s(e)); return isNaN(v) ? null : v; }
  // znacznik nieaktualnych danych czujnika: 'brak' (niedostepny), albo wiek ostatniej zmiany (po 8 h bez zmiany stanu)
  _stale(e) { const o = e && this._hass && this._hass.states[e]; if (!o) return ''; if (o.state === 'unavailable' || o.state === 'unknown') return 'brak'; const t = Date.parse(o.last_updated); if (!t) return ''; const h = (Date.now() - t) / 3600000; return h < 8 ? '' : h < 48 ? Math.floor(h) + ' h' : Math.floor(h / 24) + ' d'; }
  _stl(x) { return x ? `<em class="stl" title="${x === 'brak' ? 'Czujnik niedostępny' : 'Bez zmiany od ' + x}" style="font-style:normal;font-size:11px;margin-left:4px;color:#d9a521">${x === 'brak' ? '⚠' : '⏱ ' + x}</em>` : ''; }
  _name(e) { const o = this._hass.states[e]; return ((o && o.attributes.friendly_name) || e).replace(/\s*(Bateria|battery)\s*$/i, ''); }
  _call(d, s, data) { this._hass.callService(d, s, data); }
  _more(e) { this.dispatchEvent(new CustomEvent('hass-more-info', {detail: {entityId: e}, bubbles: true, composed: true})); }
  _go(path) { history.pushState(null, '', path); window.dispatchEvent(new CustomEvent('location-changed', {detail: {replace: false}})); }

  _au2() { return !!(this._config && this._config.aurora) && window.innerWidth >= 900; }   // dashboard Aurora: menu boczne zamiast skrotow (tylko szeroki ekran)
  // znaczniki nowosci przy skrotach (Aurora): sygnatura "co nowego" dla kazdego skrotu porownywana z ostatnio obejrzana (localStorage); wejscie w widok zeruje znacznik
  _scNews(v) {
    if (v !== 'dziennik') this._logPrev = null;   // po wyjsciu z Historii kolejne wejscie znow porownuje z ostatnia wizyta
    const st = (e) => this._hass.states[e] || {}, sig = {};
    try { const lr = st('sensor.f1_last_race_results'); sig.f1 = ((lr.attributes || {}).round || '') + ':' + (lr.state || '') + (this._f1Active && this._f1Active() ? ':live' : ''); } catch (e) { sig.f1 = ''; }
    try { const low = PC.batLow || 30; sig.baterie = PC.bats.filter((e) => { const x = this._n(e); return x !== null && x < low; }).join(','); } catch (e) { sig.baterie = ''; }
    try { sig.serwer = PC.offline.map((o) => o[0]).filter((e) => this._s(e) === 'unavailable').join(','); } catch (e) { sig.serwer = ''; }
    // tylko wazne alarmy (bez ruchu i zwyklych zdarzen)
    try { const ev = window.__jarvisEvents, it = ev ? (ev.all || ev.items || []).find((i) => i.sev >= 2 && i.ty !== 'motion') : null; sig.dziennik = it ? String(+new Date(it.t)) : ''; } catch (e) { sig.dziennik = ''; }
    let seen = null; try { seen = JSON.parse(localStorage.getItem('aurora_sc_seen') || 'null'); } catch (e) { seen = null; }
    let ch = false; if (!seen) { seen = Object.assign({}, sig); ch = true; }
    Object.keys(sig).forEach((k) => { if (seen[k] === undefined) { seen[k] = sig[k]; ch = true; } });
    if (sig[v] !== undefined && seen[v] !== sig[v]) { seen[v] = sig[v]; ch = true; }
    if (ch) { try { localStorage.setItem('aurora_sc_seen', JSON.stringify(seen)); } catch (e) { /* ignore */ } }
    const out = {}; Object.keys(sig).forEach((k) => { out[k] = seen[k] !== sig[k]; });
    let lv = false; try { lv = !!(PC.f1 && PC.f1.on && this._f1Active()); } catch (e) { lv = false; }
    { let rp = []; try { rp = this._radioPlayers(); } catch (e) { rp = []; } out.radioPlay = rp.length > 0; out.radioName = rp.length ? rp[0].name : ''; }
    out.f1live = lv; if (lv) out.f1 = true;   // transmisja trwa: znacznik swieci caly czas (nie gasnie po wejsciu w widok)
    return out;
  }
  // integracja radio_pl (Radio RMF ON i ZET): widok Radio osadza jej karte, ktora zachowuje stan miedzy odswiezeniami
  _radioAvail() { return !!(this._hass && this._hass.services && this._hass.services.radio_pl && customElements.get('radio-pl-card')); }
  // tytul granego utworu z integracji (RMF ON: lista odtworzen, Eurozet: znaczniki ICY); odpytywany co ~20 s tylko dla grajacej stacji
  _track(sid) {
    this._trk = this._trk || {}; const c = this._trk[sid];
    if ((!c || Date.now() - c.at > 20000) && !(c && c.busy) && this._hass) { this._trk[sid] = Object.assign({}, c || {}, {busy: true, at: c ? c.at : 0});
      this._hass.callWS({type: 'radio_pl/now_playing', station: sid}).then((r) => { const t = [r.artist, r.title].filter(Boolean).join(' – '); const ch = !this._trk[sid] || this._trk[sid].t !== t; this._trk[sid] = {t, at: Date.now(), busy: false}; if (ch) { this._sig = ''; this._mplHtml = ''; if (this._hass) this.hass = this._hass; } }).catch(() => { this._trk[sid] = {t: (c && c.t) || '', at: Date.now(), busy: false}; }); }
    return (c && c.t) || '';
  }
  // asystent w oknie (srodkowy przycisk dolnego paska na mobile): rozmowa pisemna i glosowa + wybor potoku; uzywa tych samych elementow co widok Asystent
  _asOpen() {
    const sr = this.shadowRoot; if (this._view === 'asystent') return; if (sr.getElementById('asp')) { this._asClose(); return; }
    const pe = this._pipe(), po = pe && this._hass.states[pe], n = this._chatLoad().length;
    const psel = po ? `<label class="pipesel"><span>Potok</span><select id="pipesel">${(po.attributes.options || []).map((x) => `<option value="${esc(x)}"${x === po.state ? ' selected' : ''}>${esc(x.charAt(0).toUpperCase() + x.slice(1))}</option>`).join('')}</select></label>` : '';
    const el = document.createElement('div'); el.id = 'asp';
    el.innerHTML = `<div class="apb"></div><div class="apw"><div class="aph"><span class="chst" id="chst"><i></i>Gotowy</span><span style="flex:1"></span>${n ? '<button class="chclr" id="chclr" type="button" title="Wyczyść rozmowę"><ha-icon icon="mdi:broom"></ha-icon>Wyczyść</button>' : ''}<button class="apx" type="button" aria-label="Zamknij"><ha-icon icon="mdi:close"></ha-icon></button></div>${psel}
      <div class="chlog" id="chlog">${this._askLogHtml()}</div>
      <form class="inp chform" id="askf"><button class="mic2" id="listen2" type="button" title="Dotknij i mów"><ha-icon icon="mdi:microphone-message"></ha-icon></button><input id="asktx" type="text" placeholder="Napisz do asystenta…" autocomplete="off" enterkeyhint="send"><button class="send" type="submit" title="Wyślij"><ha-icon icon="mdi:send"></ha-icon></button></form></div>`;
    el.querySelector('.apb').onclick = () => this._asClose(); el.querySelector('.apx').onclick = () => this._asClose();
    el.querySelector('#listen2').onclick = () => this._listen();
    const ps = el.querySelector('#pipesel'); if (ps) ps.onchange = () => this._call('select', 'select_option', {entity_id: this._pipe(), option: ps.value});
    const f = el.querySelector('#askf'), inp = el.querySelector('#asktx');
    f.onsubmit = (e) => { e.preventDefault(); const tx = inp.value.trim(); if (!tx) return; inp.value = ''; this._askSend(tx); };
    const c = el.querySelector('#chclr'); if (c) c.onclick = () => { try { localStorage.removeItem('pastel_chat'); } catch (e) { /* ignore */ } this._convId = null; this._askRefresh(true); c.remove(); };
    sr.getElementById('app').appendChild(el); const lg = el.querySelector('#chlog'); lg.scrollTop = lg.scrollHeight; this._askLiveUpdate(); this._bnav();
  }
  _asClose() { const e = this.shadowRoot.getElementById('asp'); if (e) e.remove(); }
  // maly odtwarzacz (przytrzymanie kafelka "co gra" na tablecie albo przycisku Radio na mobile): sterowanie tym, co aktualnie gra
  // odtwarzacze, ktorych stan "gra" uznajemy za wazny dla kafelka "co gra" i malego odtwarzacza: przypisane do pokoi + wybrane w karcie Radio / domyslne z integracji (np. Kostka)
  _mpCandidates() {
    const ids = new Set([].concat(...PC.rooms.map((r) => r.mp || []))); (this._rdef || []).forEach((e) => ids.add(e));
    try { (JSON.parse(localStorage.getItem('radio_pl_sel') || '[]') || []).forEach((e) => ids.add(e)); } catch (e) { /* ignore */ }
    return [...ids];
  }
  _mplTargets() {
    const st = this._hass.states, nm = (e) => (st[e] && st[e].attributes.friendly_name) || e; let eids = [], kind = 'radio', title = '', sub = '', sid = ''; const sn = {}, sd = {};
    if (this._rkeys) for (const e in st) { if (!e.startsWith('media_player.') || !['playing', 'paused'].includes(st[e].state)) continue; const id = st[e].attributes.media_content_id; if (!id) continue; let k = ''; try { const p = new URL(id).pathname.split('/').filter(Boolean); k = (p[p.length - 1] || '').toLowerCase(); } catch (x) { k = ''; } if (k && this._rkeys.has(k)) { eids.push(e); sn[e] = this._rkeys.get(k); sd[e] = (this._rkid && this._rkid.get(k)) || ''; if (!title) { title = this._rkeys.get(k); sid = (this._rkid && this._rkid.get(k)) || ''; } } }
    { const sp = (st['sensor.radio_pl_now_playing'] || {attributes: {}}).attributes.players || {}; Object.keys(sp).forEach((e) => { if (st[e] && (['playing', 'paused'].includes(st[e].state) || (sp[e].confirmed === false && !['off', 'unavailable', 'unknown', 'standby'].includes(st[e].state))) && !eids.includes(e)) { eids.push(e); sn[e] = sp[e].name; sd[e] = sp[e].station; if (!title) { title = sp[e].name; sid = sp[e].station; } } }); }
    if (!eids.length) { kind = 'media'; for (const e of this._mpCandidates()) { const s2 = st[e]; if (s2 && ['playing', 'paused'].includes(s2.state)) { eids.push(e); if (!title) title = s2.attributes.media_title || s2.attributes.media_channel || nm(e); } } }
    if (!eids.length) kind = this._radioAvail() ? 'radio' : 'media';
    if (eids.length) { const a = st[eids[0]].attributes; sub = [a.media_artist, a.media_title].filter(Boolean).join(' – '); if (kind === 'media' && a.media_artist) sub = a.media_artist; if (kind === 'radio' && !sub && sid) sub = this._track(sid); }
    const gm = new Map(); if (kind === 'radio') eids.forEach((e) => { const k2 = sn[e] || ''; if (!gm.has(k2)) gm.set(k2, {title: k2, sid: sd[e] || '', eids: []}); gm.get(k2).eids.push(e); });
    const groups = [...gm.values()].filter((g) => g.title).map((g) => Object.assign(g, {sub: g.sid ? this._track(g.sid) : '', where: g.eids.map(nm).join(', '), playing: g.eids.some((e) => st[e].state === 'playing')}));
    return {kind, eids, groups: groups.length > 1 ? groups : [], title, sub, where: new Set(eids.map((e) => sn[e] || '')).size > 1 ? eids.map((e) => nm(e) + (sn[e] ? ': ' + sn[e] : '')).join(' · ') : eids.map(nm).join(', '), playing: eids.length > 0 && !eids.every((e) => st[e].state === 'paused'), vol: (() => { const v = eids.map((e) => st[e].attributes.volume_level).filter((x) => typeof x === 'number'); return v.length ? Math.round(v.reduce((a, b) => a + b, 0) / v.length * 100) : 0; })(), muted: !!(eids[0] && st[eids[0]].attributes.is_volume_muted)};
  }
  _mplOpen() {
    const sr = this.shadowRoot; if (sr.getElementById('mpl')) return;
    const el = document.createElement('div'); el.id = 'mpl'; el.innerHTML = '<div class="mpb"></div><div class="mpw"></div>';
    el.querySelector('.mpb').onclick = () => this._mplClose();
    el.onclick = (ev) => { const b = ev.target.closest('[data-mp]'); if (!b) return; const T = this._mplTargets(), act = b.dataset.mp;
      if (act === 'x') this._mplClose(); else if (act === 'open') { this._mplClose(); this._open(T.kind === 'radio' ? 'radio' : 'multimedia'); }
      else if (/^(pp|stop):\d+$/.test(act)) { const g = T.groups[+act.split(':')[1]]; if (g) { if (act[0] === 'p') this._call('media_player', 'media_play_pause', {entity_id: g.eids}); else this._call('radio_pl', 'stop', {entity_id: g.eids}); } }
      else if (act === 'pp') this._call('media_player', 'media_play_pause', {entity_id: T.eids});
      else if (act === 'stop') { if (T.kind === 'radio') this._call('radio_pl', 'stop', {entity_id: T.eids}); else this._call('media_player', 'media_stop', {entity_id: T.eids}); }
      else if (act === 'mute') this._call('media_player', 'volume_mute', {entity_id: T.eids, is_volume_muted: !T.muted}); };
    el.addEventListener('input', (ev) => { const r = ev.target.closest('#mplv'); if (!r) return; this._mplVol = Date.now(); const v = +r.value; el.querySelector('#mplvv').textContent = v + '%'; clearTimeout(this._mplT); this._mplT = setTimeout(() => { const T = this._mplTargets(); if (T.eids.length) this._call('media_player', 'volume_set', {entity_id: T.eids, volume_level: v / 100}); }, 150); });
    sr.getElementById('app').appendChild(el); this._mplHtml = ''; this._mplRender();
  }
  _mplClose() { const e = this.shadowRoot.getElementById('mpl'); if (e) e.remove(); }
  _mplRender() {
    const el = this.shadowRoot.getElementById('mpl'); if (!el || !this._hass) return; const T = this._mplTargets(), w = el.querySelector('.mpw');
    const h = JSON.stringify([T.title, T.sub, T.where, T.playing, T.muted, T.kind, T.groups.map((g) => [g.title, g.sub, g.where, g.playing])]);
    if (h !== this._mplHtml) { this._mplHtml = h;
      if (T.groups.length) {
        w.innerHTML = `<div class="mph"><div class="mpc"><ha-icon icon="mdi:radio"></ha-icon></div><div class="mpt"><b>Radio na kilku urządzeniach</b><small>${T.groups.length} stacje</small></div><button type="button" class="mpx" data-mp="x" aria-label="Zamknij"><ha-icon icon="mdi:close"></ha-icon></button></div>
        ${T.groups.map((g, i) => `<div class="mph mgr"><div class="mpt"><b>${esc(g.title)}</b><span class="mq"><i>${esc(g.sub || (g.playing ? 'Na żywo' : 'Pauza'))}</i></span><small>${esc(g.where)}</small></div><button type="button" class="mpk1" data-mp="pp:${i}" aria-label="Pauza / wznów"><ha-icon icon="${g.playing ? 'mdi:pause' : 'mdi:play'}"></ha-icon></button><button type="button" class="mpk1" data-mp="stop:${i}" aria-label="Zatrzymaj"><ha-icon icon="mdi:stop"></ha-icon></button></div>`).join('')}
        <button type="button" class="mpo" data-mp="open"><ha-icon icon="mdi:open-in-new"></ha-icon>Otwórz Radio</button>`; }
      else
      w.innerHTML = `<div class="mph"><div class="mpc"><ha-icon icon="${T.kind === 'radio' ? 'mdi:radio' : 'mdi:music'}"></ha-icon></div><div class="mpt"><b>${esc(T.eids.length ? T.title : 'Nic nie gra')}</b><span class="mq"><i>${esc(T.sub || (T.eids.length ? (T.playing ? 'Na żywo' : 'Pauza') : 'Dotknij „Otwórz”, aby wybrać stację'))}</i></span><small>${esc(T.where)}</small></div><button type="button" class="mpx" data-mp="x" aria-label="Zamknij"><ha-icon icon="mdi:close"></ha-icon></button></div>
        ${T.eids.length ? `<div class="mpk"><button type="button" class="pp" data-mp="pp" aria-label="Pauza / wznów"><ha-icon icon="${T.playing ? 'mdi:pause' : 'mdi:play'}"></ha-icon></button><button type="button" data-mp="stop" aria-label="Zatrzymaj"><ha-icon icon="mdi:stop"></ha-icon></button><button type="button" data-mp="mute" aria-label="Wycisz"><ha-icon icon="${T.muted ? 'mdi:volume-off' : 'mdi:volume-high'}"></ha-icon></button></div>
        <div class="mpv"><ha-icon icon="mdi:volume-low"></ha-icon><input id="mplv" type="range" min="0" max="100" step="1" value="${T.vol}"><span id="mplvv">${T.vol}%</span></div>` : ''}
        <button type="button" class="mpo" data-mp="open"><ha-icon icon="mdi:open-in-new"></ha-icon>${T.kind === 'radio' ? 'Otwórz Radio' : 'Otwórz Multimedia'}</button>`; }
    const r = el.querySelector('#mplv'); if (r && Date.now() - (this._mplVol || 0) > 2500) { r.value = T.vol; const vv = el.querySelector('#mplvv'); if (vv) vv.textContent = T.vol + '%'; }
  }
  // przytrzymanie (500 ms): wywoluje fn; zwraca true w klik, ktory nalezy pominac
  _lpDown(ev, sel, fn) { const t = ev.target.closest(sel); if (!t) return; clearTimeout(this._lpT); this._lpT = setTimeout(() => { this._lpFired = true; fn(); }, 500); }
  _lpUp() { clearTimeout(this._lpT); }
  // telefon / tablet w pionie: pasek "Teraz" - pralka, drzwi, co gra, wlaczone TV, oczyszczacz (tylko to, co sie dzieje)
  _nowItems() {
    if (!this._hass) return []; const st = this._hass.states, L = [], nm = (e) => (st[e] && st[e].attributes.friendly_name) || e;
    const ws = this._s(PC.wash.status);
    if (ws === 'end') { const o = st[PC.wash.status], m = o ? Math.max(0, Math.round((Date.now() - new Date(o.last_changed).getTime()) / 60000)) : 0; L.push({ic: 'mdi:washing-machine', t: 'Pranie zakończone', sub: m >= 5 ? 'czeka od ' + (m >= 90 ? Math.floor(m / 60) + ' godz.' : m + ' min') : 'do wyjęcia', go: 'pokoj-lazienka', w: 1}); }
    else if (ws && !PC.wash.idle.includes(ws)) L.push({ic: 'mdi:washing-machine', t: 'Pralka pracuje', sub: ((PC.wash.phase[ws] || '') + this._washLeft()).replace(/^ · /, ''), go: 'pokoj-lazienka'});
    if (PC.door && this._s(PC.door) === 'on') { const m = Math.max(0, Math.round((Date.now() - new Date(st[PC.door].last_changed).getTime()) / 60000)); L.push({ic: 'mdi:door-open', t: 'Drzwi wejściowe otwarte', sub: m + ' min', go: 'pokoj-przedpokoj', w: 1}); }
    const np = this._nowPlaying(); if (np) L.push({ic: np.kind === 'radio' ? 'mdi:radio' : 'mdi:music', t: np.title, sub: [np.sub, np.where].filter(Boolean).join(' · '), go: np.go, eq: 1});
    const tv = []; PC.rooms.forEach((r) => (r.mp || []).forEach((e) => { const s2 = st[e]; if (!s2 || ['off', 'unavailable', 'unknown', 'standby'].includes(s2.state)) return; if (/radio/i.test(e + ' ' + nm(e))) return; if (np && np.kind === 'media' && np.where === nm(e)) return; tv.push(r.name); }));
    if (tv.length) L.push({ic: 'mdi:television-play', t: 'Włączone TV', sub: [...new Set(tv)].join(', '), go: 'multimedia'});
    if (PC.purifier && this._s(PC.purifier) === 'on') { const pm = this._n(PC.pm); L.push({ic: 'mdi:air-purifier', t: 'Oczyszczacz pracuje', sub: pm === null ? '' : 'PM2.5 ' + Math.round(pm) + ' µg/m³', act: 'air'}); }
    return L;
  }
  _now() {
    const el = this._$('s-now'); if (!el || !this._aun) return; const L = this._nowItems();
    el.innerHTML = L.length ? `<h2><ha-icon icon="mdi:pulse"></ha-icon>Teraz</h2><div class="nwl">${L.map((x) => `<button type="button" class="nw1${x.w ? ' w' : ''}" ${x.act ? `data-act="${x.act}"` : `data-go="${x.go}"`}>${x.eq ? '<span class="eqm"><b></b><b></b><b></b></span>' : `<ha-icon icon="${x.ic}"></ha-icon>`}<span class="tx"><b>${esc(x.t)}</b>${x.sub ? `<small class="mq"><i>${esc(x.sub)}</i></small>` : ''}</span><ha-icon class="ch" icon="mdi:chevron-right"></ha-icon></button>`).join('')}</div>` : '';
    el.onpointerdown = (ev) => this._lpDown(ev, '.nw1[data-go="radio"], .nw1[data-go="multimedia"]', () => this._mplOpen());
    el.onpointerup = el.onpointerleave = el.onpointercancel = () => this._lpUp();
    el.onclick = (ev) => { if (this._lpFired) { this._lpFired = false; return; } const b = ev.target.closest('[data-go],[data-act]'); if (!b) return; if (b.dataset.act === 'air') this._bsheet('air'); else this._open(b.dataset.go); };
  }
  // co aktualnie gra: stacja radio_pl albo odtwarzacz przypisany do pomieszczenia (r.mp); {kind, title, sub, go} lub null
  _nowPlaying() {
    if (!this._hass) return null; const st = this._hass.states, nm = (e) => (st[e] && st[e].attributes.friendly_name) || e;
    let rp = []; try { rp = this._radioPlayers(); } catch (e) { rp = []; }
    if (rp.length) { const a = (st[rp[0].eid] || {}).attributes || {}, tr = [a.media_artist, a.media_title].filter(Boolean).join(' – ') || (rp[0].sid ? this._track(rp[0].sid) : '');
      return {kind: 'radio', eids: rp.map((x) => x.eid), title: rp[0].name, sub: tr || rp.map((x) => nm(x.eid)).join(', '), where: tr ? rp.map((x) => nm(x.eid)).join(', ') : '', go: 'radio'}; }
    const ids = this._mpCandidates();
    for (const e of ids) { const s = st[e]; if (s && s.state === 'playing') { const a = s.attributes, tr = [a.media_artist, a.media_title].filter(Boolean).join(' – ');
      return {kind: 'media', eids: [e], title: a.media_title || a.media_channel || a.app_name || nm(e), sub: a.media_artist || '', where: nm(e), go: 'multimedia'}; } }
    return null;
  }
  // odtwarzacze, na ktorych gra stacja z integracji radio_pl (rozpoznawana po koncowce adresu strumienia); klucze stacji pobierane raz przez websocket
  _radioPlayers() {
    if (!this._radioAvail()) return [];
    if (!this._rkeys) {
      const sp0 = (this._hass.states['sensor.radio_pl_now_playing'] || {attributes: {}}).attributes.players || {}, o0 = []; Object.keys(sp0).forEach((e) => { const s0 = this._hass.states[e]; if (s0 && (s0.state === 'playing' || (sp0[e].confirmed === false && !['off', 'unavailable', 'unknown', 'standby'].includes(s0.state)))) o0.push({eid: e, name: sp0[e].name, sid: sp0[e].station}); });
      if (!this._rkLoading) { this._rkLoading = true; this._hass.callWS({type: 'radio_pl/stations'}).then((r) => { const m = new Map(), mi = new Map(); r.stations.forEach((x) => [x.mp3, x.aac].forEach((u) => { if (!u) return; try { const p = new URL(u).pathname.split('/').filter(Boolean), k = (p[p.length - 1] || '').toLowerCase(); if (k) { m.set(k, x.name); mi.set(k, x.id); } } catch (e) { /* ignore */ } })); this._rkeys = m; this._rkid = mi; this._rdef = r.targets || []; this._sig = ''; if (this._hass) this.hass = this._hass; }).catch(() => { this._rkLoading = false; }); }
      return o0;
    }
    const st = this._hass.states, out = [];
    for (const e in st) { if (!e.startsWith('media_player.') || st[e].state !== 'playing') continue; const id = st[e].attributes.media_content_id; if (!id) continue; let k = ''; try { const p = new URL(id).pathname.split('/').filter(Boolean); k = (p[p.length - 1] || '').toLowerCase(); } catch (x) { k = ''; } if (k && this._rkeys.has(k)) out.push({eid: e, name: this._rkeys.get(k), sid: this._rkid && this._rkid.get(k)}); }
    const sp = (st['sensor.radio_pl_now_playing'] || {attributes: {}}).attributes.players || {};   // urzadzenia, na ktorych integracja uruchomila stacje (takze te z przekierowanym adresem, np. ESPHome)
    Object.keys(sp).forEach((e) => { if (st[e] && (st[e].state === 'playing' || (sp[e].confirmed === false && !['off', 'unavailable', 'unknown', 'standby'].includes(st[e].state))) && !out.some((x) => x.eid === e)) out.push({eid: e, name: sp[e].name, sid: sp[e].station}); });
    return out;
  }
  _radioMount(host) {
    if (!this._radioEl) { const el = document.createElement('radio-pl-card'); el.setConfig(Object.assign({title: ''}, (PC.radioPlayers || []).length ? {players: PC.radioPlayers} : {})); this._radioEl = el; }
    if (this._radioEl.parentNode !== host) host.appendChild(this._radioEl);
    this._radioEl.hass = this._hass;
  }
  _scList() {
    const SC = [['mdi:thermometer', 'Klimat', 'klimat'], ['mdi:play-box-outline', 'Multimedia', 'multimedia'], ['mdi:floor-plan', 'Plan', 'plan2d'], ['mdi:battery-heart-variant', 'Baterie', 'baterie'], ['mdi:flag-checkered', 'Formuła 1', 'f1'], ['mdi:server', 'Serwer', 'serwer'], ['mdi:text-box-search-outline', 'Historia', 'dziennik']]; if (this._radioAvail()) SC.push(['mdi:radio', 'Radio', 'radio']);
    if (this._aun) SC.push(['mdi:home-assistant', 'Menu HA', 'hamenu']);   // pasek boczny Home Assistanta (przydatne, gdy gorna belka jest ukryta)
    return SC.sort((x, y) => x[1].localeCompare(y[1], 'pl'));
  }
  // panel Skroty (telefon / tablet w pionie): wysuwany od dolu, kafelki skrotow + alarm
  _bshAirHtml() {
    const pm = this._n(PC.pm), PL = PC.pmLv || [10, 25, 35, 50], lv = pm === null ? ['Brak danych', '#b9b5cf'] : pm <= PL[0] ? ['Świetna', '#3fb27f'] : pm <= PL[1] ? ['Dobra', '#6bbf8f'] : pm <= PL[2] ? ['Umiarkowana', '#d9a521'] : pm <= PL[3] ? ['Słaba', '#f08a5d'] : ['Zła', '#e5576f'];
    const st = this._s(PC.purifier), on = st === 'on', un = !PC.purifier || st === 'unavailable' || st === undefined; const a = (this._hass.states[PC.purifier] || {}).attributes || {}, modes = a.preset_modes || [], pmode = a.preset_mode;
    const C = 2 * Math.PI * 42, li = pm === null ? -1 : pm <= PL[0] ? 0 : pm <= PL[1] ? 1 : pm <= PL[2] ? 2 : pm <= PL[3] ? 3 : 4, frac = (li + 1) / 5;
    return `<div class="bair"><div class="bring"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="42" fill="none" stroke="rgba(150,140,190,.22)" stroke-width="10"/><circle cx="50" cy="50" r="42" fill="none" stroke="${lv[1]}" stroke-width="10" stroke-linecap="round" stroke-dasharray="${(C * frac).toFixed(1)} ${C.toFixed(1)}" transform="rotate(-90 50 50)"/></svg><div class="c"><b style="color:${lv[1]}">${pm === null ? '—' : Math.round(pm)}</b><small>µg/m³</small></div></div>
      <div class="btx"><b>Jakość: ${lv[0]}</b><small>PM2.5 · oczyszczacz ${un ? 'niedostępny' : on ? 'pracuje' : 'wyłączony'}</small></div></div>
      ${un ? '' : `<button type="button" class="bpw${on ? ' on' : ''}" data-pw="1"><ha-icon icon="mdi:air-purifier"></ha-icon><span>${on ? 'Wyłącz oczyszczacz' : 'Włącz oczyszczacz'}</span></button>`}
      ${!un && modes.length ? `<div class="bmd">${modes.map((m) => `<button type="button" data-pm="${esc(m)}" class="${on && m === pmode ? 'on' : ''}">${esc(m)}</button>`).join('')}</div>` : ''}
      <button type="button" class="bcal" data-go="powietrze"><ha-icon icon="mdi:chart-line"></ha-icon>Szczegóły i historia</button>`;
  }
  _bsheet(kind) {
    const sr = this.shadowRoot, old = sr.getElementById('bsh'); if (old) { const same = old.dataset.k === kind; old.remove(); this._bnav(); if (same) return; }
    const el = document.createElement('div'); el.id = 'bsh'; el.dataset.k = kind; let title = '', body = '';
    if (kind === 'air') { title = 'Jakość powietrza'; body = this._bshAirHtml(); }
    else if (kind === 'events') {
      title = 'Najbliższe wydarzenia'; const now = new Date(), d0 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const list = this._events.filter((e) => PC.cal.includes(e.cal) && e.s >= d0).slice(0, 8);
      body = '<div class="bev">' + (list.length ? list.map((e) => { const hm = e.ad ? 'Cały dzień' : String(e.s.getHours()).padStart(2, '0') + ':' + String(e.s.getMinutes()).padStart(2, '0'); const dd = Math.round((new Date(e.s.getFullYear(), e.s.getMonth(), e.s.getDate()) - d0) / 86400000);
        return `<div class="ev"><div class="dt"><b>${e.s.getDate()}</b><small>${MONTHS[e.s.getMonth()].slice(0, 3)}</small></div><div><div class="tt">${esc(e.t)}</div><div class="wn">${dd === 0 ? 'Dziś' : dd === 1 ? 'Jutro' : DAYS[e.s.getDay()]} · ${hm}</div></div></div>`; }).join('') : '<div class="empty">Brak nadchodzących wydarzeń ✨</div>') + '</div><button type="button" class="bcal" data-go="kalendarz"><ha-icon icon="mdi:calendar-month-outline"></ha-icon>Otwórz kalendarz</button>';
    } else {
      title = 'Więcej'; let NW = {}; try { NW = this._scNews(this._view || 'home'); } catch (e) { NW = {}; }
      const tiles = this._scList().map((x) => `<button type="button" data-go="${x[2]}"><ha-icon icon="${x[0]}"></ha-icon><span>${x[1]}</span>${x[2] === 'radio' && NW.radioPlay ? `<i class="eqm"><b></b><b></b><b></b></i><small class="rpn">gra: ${esc(NW.radioName)}</small>` : NW[x[2]] ? `<i class="pn${x[2] === 'f1' && NW.f1live ? ' lv' : ''}"></i>` : ''}</button>`).join('') + `<button type="button" data-go="ustawienia"><ha-icon icon="mdi:cog-outline"></ha-icon><span>Ustawienia</span></button>`;
      const f2 = (x) => x.toFixed(2).replace('.', ',');
      const fu = PC.fuel.map(([nm, d, j]) => { const pd = this._n(d), pj = this._n(j); if (pd === null) return ''; const diff = pj === null ? 0 : pj - pd; return `<div class="bfu"><small>${esc(nm)}</small><b>${f2(pd)}<em> zł</em></b><span class="${diff > 0.004 ? 'up' : diff < -0.004 ? 'dn' : ''}">${Math.abs(diff) > 0.004 ? (diff > 0 ? '▲ jutro ' : '▼ jutro ') + f2(pj) : 'bez zmian'}</span></div>`; }).join('');
      body = (fu ? `<div class="bst" style="padding-bottom:6px">Paliwa (maks.)</div><div class="bfl sm">${fu}</div><div class="bst" style="padding-top:14px;padding-bottom:6px">Skróty</div>` : '') + `<div class="bsl lst">${tiles}</div>`;   // u gory male kafelki paliw (3 obok siebie), pod nimi menu: elementy jeden pod drugim
      try { localStorage.setItem('aurora_fuel_seen', PC.fuel.map(([nm, d, j]) => nm + ':' + this._s(d) + ':' + this._s(j)).join('|')); } catch (e) { /* ignore */ }
      setTimeout(() => this._bnav(), 0);
    }
    el.innerHTML = `<div class="bsd"></div><div class="bsp"><div class="bsg"></div><div class="bst">${title}</div>${body}</div>`;
    el.onpointerdown = (ev) => this._lpDown(ev, '[data-go="radio"]', () => { this._mplOpen(); el.remove(); this._bnav(); });
    el.onpointerup = el.onpointerleave = el.onpointercancel = () => this._lpUp();
    el.onclick = (ev) => { if (this._lpFired) { this._lpFired = false; return; } const pw = ev.target.closest('[data-pw]'); if (pw) { const on = this._s(PC.purifier) === 'on'; this._call('fan', on ? 'turn_off' : 'turn_on', {entity_id: PC.purifier}); const sp = pw.querySelector('span'); if (sp) sp.textContent = on ? 'Wyłączam…' : 'Włączam…'; pw.style.opacity = '.6'; return; }
      const pmb = ev.target.closest('[data-pm]'); if (pmb) { this._call('fan', 'set_preset_mode', {entity_id: PC.purifier, preset_mode: pmb.dataset.pm}); pmb.style.opacity = '.6'; return; }
      const b = ev.target.closest('[data-go]'); if (b && b.dataset.go === 'hamenu') this.dispatchEvent(new CustomEvent('hass-toggle-menu', {bubbles: true, composed: true})); else if (b) this._open(b.dataset.go); if (b || ev.target.closest('.bsd') || ev.target.closest('.bsg')) { el.remove(); this._bnav(); } };
    sr.getElementById('app').appendChild(el); this._bnav();
  }
  // dashboard Aurora, waski ekran (telefon / tablet w pionie): dolny pasek nawigacji
  _bnav() {
    if (!this._aun) return; const sr = this.shadowRoot, nb = sr.getElementById('bnav'); if (!nb) return; const v = this._view || 'home';
    let nw = false; try { nw = this._skNew() > 0; } catch (e) { nw = false; }
    nb.querySelectorAll('button').forEach((b) => { const n = b.dataset.n; b.classList.toggle('on', n === 'home' ? v === 'home' : n === 'szkola' ? /^szkola/.test(v) : false); if (n === 'szkola') b.classList.toggle('nw', nw); });
    { let mn = false, NW = {}; try { NW = this._scNews(v); mn = Object.keys(NW).some((k) => NW[k] && !['radioPlay', 'radioName', 'f1live'].includes(k)); const fsig = PC.fuel.map(([nm, d, j]) => nm + ':' + this._s(d) + ':' + this._s(j)).join('|'); let fs = null; try { fs = localStorage.getItem('aurora_fuel_seen'); } catch (e) { fs = null; } if (fs === null) { try { localStorage.setItem('aurora_fuel_seen', fsig); } catch (e) { /* ignore */ } } else if (fs !== fsig) mn = true; } catch (e) { /* ignore */ }
      const lb = nb.querySelector('[data-n="links"]'); if (lb) { lb.classList.toggle('nw', mn); lb.classList.toggle('lv', !!NW.f1live); lb.classList.toggle('rp', !!NW.radioPlay); } }
    { const sh = sr.getElementById('bsh'); if (sh) { nb.querySelectorAll('button').forEach((b) => b.classList.toggle('on', b.dataset.n === (sh.dataset.k === 'air' ? 'fab' : sh.dataset.k))); if (sh.dataset.k === 'air') { const h = this._bshAirHtml(); if (sh.__h !== h) { sh.__h = h; const bp = sh.querySelector('.bsp'); const bst = bp.querySelector('.bst'); [...bp.children].forEach((c) => { if (c !== bst && !c.classList.contains('bsg') && !c.classList.contains('bst')) c.remove(); }); bp.insertAdjacentHTML('beforeend', h); } } } }
    const alOn = ['normal', 'unavailable', 'unknown', undefined].indexOf(this._s(PC.alarm)) < 0 || !!(PC.alarmSw && this._s(PC.alarmSw) === 'on');
    const ab = sr.getElementById('abar'), app = sr.getElementById('app'), fab = nb.querySelector('.fab');
    this._topMax = Math.max(this._topMax || 0, Math.round(Math.max(0, this.getBoundingClientRect().top)));   // wysokosc paska HA (gdy widoczny): pasek alarmu ma leciec pod nim
    if (ab) { ab.style.top = this._topMax + 'px'; ab.hidden = !alOn; const a = (this._hass.states[PC.alarm] || {}).attributes || {}; const sb = sr.getElementById('abs'); const tx = this._alarmSrc(); if (sb && sb.textContent !== tx) sb.textContent = tx; }
    if (app) app.classList.toggle('al', alOn);
    if (fab) { fab.classList.toggle('red', alOn); const ast = this._s(this._sat()), busy = ast === 'listening' || ast === 'processing' || ast === 'responding';
      { const hs = hudSch(), dk = !!this._hudD; fab.style.setProperty('--ga', dk ? hs.a : hs.la); fab.style.setProperty('--gb', dk ? hs.b : hs.lb); }   // animacja ringa w kolorach wybranego schematu
      fab.classList.toggle('pl', busy); ['listening', 'processing', 'responding'].forEach((k) => fab.classList.toggle('st-' + k[0], ast === k)); fab.style.setProperty('--c', busy ? (this._hudD ? hudSch().a : hudSch().la) : 'rgba(255,255,255,.35)'); fab.style.setProperty('--p', busy ? '100%' : '0%');   // pierscien swieci, gdy asystent slucha / mysli / mowi
      const sm = fab.querySelector('small'), t = 'Asystent'; if (sm.textContent !== t) sm.textContent = t; fab.querySelector('.fxt').textContent = alOn ? 'WYŁĄCZ' : ''; if (this._view === 'asystent') this._asClose(); }
  }
  // pelnoekranowy przycisk wylaczenia alarmu (Tab10 / tablet w poziomie): widoczny tylko, gdy alarm jest aktywny
  // zrodlo alarmu: aktywne czujniki (gaz, zalanie kuchnia / lazienka); gdy zadnego nie ma - rodzaj syreny / przelacznika
  _alarmSrc() {
    const L = []; if (PC.gas && this._s(PC.gas) === 'on') L.push('Wyciek gazu'); if (PC.floodK && this._s(PC.floodK) === 'on') L.push('Zalanie w kuchni'); if (PC.floodL && this._s(PC.floodL) === 'on') L.push('Zalanie w łazience');
    if (L.length) return L.join(' · ');
    const m = {alarm_sound: 'Syrena dźwiękowa włączona', alarm_light: 'Sygnał świetlny włączony', alarm_sound_light: 'Syrena i sygnał świetlny włączone'}, sel = this._s(PC.alarm);
    if (m[sel]) return m[sel];
    return PC.alarmSw && this._s(PC.alarmSw) === 'on' ? 'Syrena bramy włączona' : 'Alarm jest aktywny';
  }
  _aovl(alOn) {
    const sr = this.shadowRoot; let el = sr.getElementById('aovl');
    if (!alOn) { if (el) el.remove(); return; }
    if (el) { const sm = el.querySelector('small'), t = this._alarmSrc(); if (sm.textContent !== t) sm.textContent = t; return; }
    el = document.createElement('div'); el.id = 'aovl';
    el.innerHTML = '<ha-icon icon="mdi:alarm-light"></ha-icon><b>ALARM</b><small></small><button type="button">WYŁĄCZ ALARM</button>'; el.querySelector('small').textContent = this._alarmSrc();
    el.querySelector('button').onclick = () => this._call('script', 'jarvis_reset_alarmow', {});
    sr.getElementById('app').appendChild(el);
  }
  _side() {
    if (!this._au2b) return; const sr = this.shadowRoot, g = (id) => sr.getElementById(id); if (!g('side')) return;
    const d = new Date(), v = this._view || 'home', t = String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0'), dt = DAYS[d.getDay()] + ', ' + d.getDate() + ' ' + MONTHS[d.getMonth()];
    if (g('sclk').textContent !== t) g('sclk').textContent = t; if (g('sdt').textContent !== dt) g('sdt').textContent = dt;
    g('shome').className = 's2m' + (v === 'home' ? ' on' : '');
    const set = (id, html) => { const e = g(id); if (e.__h !== html) { e.__h = html; e.innerHTML = html; } };
    set('sroom', this._roomsL().map((r) => { const on = r.occ && this._s(r.occ) === 'on'; return `<button type="button" class="s2m${v === 'pokoj-' + r.id ? ' on' : ''}" data-go="pokoj-${esc(r.id)}"><ha-icon icon="${esc(r.icon)}"></ha-icon><span class="nm">${esc(r.name)}</span><i class="${on ? 'pd' : 'pe'}"></i></button>`; }).join('') + `<button type="button" class="s2m${/^szkola/.test(v) ? ' on' : ''}" data-go="szkola"><ha-icon icon="mdi:school-outline"></ha-icon><span class="nm">Szkoła</span><i class="${(() => { try { return this._skNew() > 0; } catch (e) { return false; } })() ? 'pn' : 'pe'}"></i></button>`);
    const SC = this._scList();
    const NW = this._scNews(v), anyNw = SC.some((x) => NW[x[2]]);
    set('ssc', SC.map((x) => `<button type="button" class="s2m${v === x[2] ? ' on' : ''}" data-go="${x[2]}"><ha-icon icon="${x[0]}"></ha-icon><span class="nm">${x[1]}</span>${x[2] === 'radio' && NW.radioPlay ? '<i class="eqm" title="Gra radio"><b></b><b></b><b></b></i>' : NW[x[2]] ? `<i class="pn${x[2] === 'f1' && NW.f1live ? ' lv' : ''}"></i>` : ''}</button>`).join(''));
    { const spd = sr.querySelector('#side .spd'); if (spd) { spd.dataset.nw = anyNw ? '1' : '0'; spd.dataset.lv = NW.f1live ? '1' : '0'; spd.dataset.rp = NW.radioPlay ? '1' : '0'; } }
    const alOn = ['normal', 'unavailable', 'unknown', undefined].indexOf(this._s(PC.alarm)) < 0 || (PC.alarmSw && this._s(PC.alarmSw) === 'on');
    { const wxs = this._s(PC.out.weather) || '', wx = WX[wxs] || ['mdi:weather-cloudy', wxs], ot = this._n(PC.out.t), oh = this._n(PC.out.h);
      set('swfx', this._wxFx(wxs));
      set('swr', `<ha-icon icon="${wx[0]}"></ha-icon><div class="wt"><b>${ot === null ? '—' : this._f('hero.temp', ot, 1) + '°'}</b><small>${esc(wx[1])}</small></div>${oh === null ? '' : `<span class="wh"><ha-icon icon="mdi:water-percent"></ha-icon>${Math.round(oh)}%</span>`}`); }
    { const np = this._nowPlaying();
      set('ssys', `<button type="button" class="s2np${np ? ' on' : ''}" data-go="${np ? np.go : (this._radioAvail() ? 'radio' : 'multimedia')}">${np ? '<span class="eqm"><b></b><b></b><b></b></span>' : '<ha-icon icon="mdi:music-note-off-outline"></ha-icon>'}<span class="tx">${np ? `<b class="mq"><i>${esc(np.title)}</i></b>` : '<b>Nic nie gra</b>'}<small>${np ? `<span class="mq"><i>${esc([np.sub, np.where].filter(Boolean).join(' · '))}</i></span>` : 'Dotknij, aby włączyć'}</small></span></button><button type="button" class="s2k f${v === 'ustawienia' ? ' on' : ''}" data-go="ustawienia"><ha-icon icon="mdi:cog-outline"></ha-icon>Ustawienia</button>`); }
    this._aovl(alOn);
  }
  // dashboard Aurora: pod alarmami lista tego, co jest w normie (baterie, urzadzenia, drzwi/gaz/zalanie)
  _okLines() {
    if (!this._au2b) return ''; const n = (e) => this._n(e), low = PC.batLow || 30, L = [];
    const bats = PC.bats.filter((e) => this._s(e) !== undefined), offl = PC.offline.map((o) => o[0]).filter((e) => this._s(e) !== undefined);
    const lowN = bats.filter((e) => { const v = n(e); return v !== null && v < low; }).length, offN = offl.filter((e) => this._s(e) === 'unavailable').length;
    const row = (t, sub) => `<div class="ok1"><ha-icon icon="mdi:check-bold"></ha-icon>${t}<small>${sub}</small></div>`;
    if (bats.length && !lowN) L.push(row('Baterie', bats.length + ' z ' + bats.length + ' w normie'));
    if (offl.length && !offN) L.push(row('Urządzenia', offl.length + ' z ' + offl.length + ' online'));
    if (this._s(PC.gas) !== 'on' && this._s(PC.floodK) !== 'on' && this._s(PC.floodL) !== 'on' && this._s(PC.door) !== 'on') L.push(row('Drzwi, gaz, zalanie', 'bez zdarzeń'));
    return L.length ? '<div class="okh">Reszta w porządku</div>' + L.join('') : '';
  }
  // prognoza godzinowa w karcie pogody (dashboard Aurora): 6 najblizszych godzin, slupek = szansa opadow
  // kafelek jakosci powietrza (Aurora, szeroki ekran): dotyk -> widok Powietrze, przycisk -> oczyszczacz z potwierdzeniem (tekst + kolor)
  _airTile() {
    if (!(this._au2b || this._aun)) return ''; const pm = this._n(PC.pm); if (pm === null && !PC.purifier) return '';
    const PL = PC.pmLv || [10, 25, 35, 50], lvl = pm === null ? ['Brak danych', '#b9b5cf'] : pm <= PL[0] ? ['Świetna', '#3fb27f'] : pm <= PL[1] ? ['Dobra', '#6bbf8f'] : pm <= PL[2] ? ['Umiarkowana', '#d9a521'] : pm <= PL[3] ? ['Słaba', '#f08a5d'] : ['Zła', '#e5576f'];
    if (this._aun) return `<button type="button" class="airc" id="airt" style="--lc:${lvl[1]}; border-color:${lvl[1]}66" title="Jakość powietrza: ${lvl[0]}"><ha-icon icon="mdi:leaf"></ha-icon><b>${pm === null ? '—' : Math.round(pm)}</b><small>µg/m³</small></button>`;   // telefon: maly znacznik z wartoscia PM2.5 i kolorem listka wg norm; dotkniecie otwiera widok Powietrze
    const st = this._s(PC.purifier), on = st === 'on', un = !PC.purifier || st === 'unavailable';
    return `<div class="airt" id="airt"><ha-icon icon="mdi:leaf" style="color:${lvl[1]}"></ha-icon><div class="at"><b>Powietrze: ${lvl[0]}</b><small>PM2.5 ${pm === null ? '—' : Math.round(pm)} µg/m³${un ? ' · oczyszczacz niedostępny' : ''}</small></div>${PC.purifier && !un ? `<button type="button" id="airb" class="${on ? 'on' : ''}"><ha-icon icon="mdi:air-purifier"></ha-icon><span>${on ? 'Wyłącz' : 'Włącz'}</span></button>` : ''}</div>`;
  }
  _hrsHtml() {
    if (!this._au2b) return ''; const H = (this._fc && this._fc.h) || [], now = Date.now(), L = H.filter((x) => new Date(x.datetime).getTime() >= now - 1800000).slice(0, 6); if (!L.length) return '';
    return `<div class="hrs">${L.map((x) => { const d = new Date(x.datetime), pp = x.precipitation_probability != null ? Math.round(x.precipitation_probability) : (x.precipitation != null ? Math.min(100, Math.round(x.precipitation * 40)) : 0); return `<div class="hr"><span class="t">${String(d.getHours()).padStart(2, '0')}:00</span><span class="b"><i style="height:${Math.max(2, Math.round(pp * .2))}px"></i></span><span class="p">${pp}%</span><span class="c">${x.temperature != null ? Math.round(x.temperature) : '–'}°</span></div>`; }).join('')}</div>`;
  }
  // przytrzymanie kafelka swiatla: okienko z suwakiem jasnosci (trzymane w #app, wiec odswiezanie sekcji go nie zamyka)
  _lightPop(b, e) {
    const app = this._$('app'), st = this._hass.states[e], a = (st && st.attributes) || {}; if (!app) return; const old = app.querySelector('.lpbd'); if (old) old.remove();
    const pc0 = st && st.state === 'on' && a.brightness != null ? Math.max(1, Math.round(a.brightness / 2.55)) : 50, r = b.getBoundingClientRect(), bd = document.createElement('div'); bd.className = 'lpbd';
    const w = 230, left = Math.max(8, Math.min(window.innerWidth - w - 8, r.left + r.width / 2 - w / 2)), top = Math.max(8, r.top - 118);
    bd.innerHTML = `<div class="lpop" style="left:${left}px;top:${top}px;width:${w}px"><div class="pt">${esc(a.friendly_name || e)} · jasność</div><input type="range" min="1" max="100" value="${pc0}"><div class="pr"><span>1%</span><b>${pc0}%</b><span>100%</span></div></div>`;
    app.appendChild(bd); const inp = bd.querySelector('input'), lb = bd.querySelector('.pr b'); let tm = 0;
    inp.oninput = () => { lb.textContent = inp.value + '%'; clearTimeout(tm); tm = setTimeout(() => this._call('light', 'turn_on', {entity_id: e, brightness_pct: +inp.value}), 180); };
    bd.onpointerdown = (ev) => { if (ev.target === bd) bd.remove(); };
  }
  // sekcja Oswietlenie (dashboard Aurora): kolumny pokoi, w kazdej maks. 2 swiatla z kafelkiem-wlacznikiem
  // telefon / tablet w pionie (Aurora): male kafelki pomieszczen - temperatura, wilgotnosc, obecnosc; przekroczenie normy swieci na bursztynowo
  _rmini() {
    const el = this._$('s-rmini'); if (!el || !this._aun) return; const th = this._th(), fm = (v, d) => v.toFixed(d).replace('.', ',');
    const R = this._roomsL(); let sT = 0, nT = 0, sH = 0, nH = 0;
    const tiles = R.map((r) => { const on = r.occ && this._s(r.occ) === 'on', t = r.t ? this._n(r.t) : null, h = r.h ? this._n(r.h) : null, lx = r.lux ? this._n(r.lux) : null;
      if (t !== null) { sT += t; nT++; } if (h !== null) { sH += h; nH++; }
      const wn = (t !== null && (t > th.tMax || t < th.tMin)) || (h !== null && (h > th.hMax || h < th.hMin));
      return `<button type="button" class="rm${wn ? ' wn' : ''}" data-go="pokoj-${esc(r.id)}"><i class="${on ? 'on' : ''}"></i><b>${esc(r.name)}</b><div class="rv">${t !== null ? `<span class="v t"><ha-icon icon="mdi:thermometer"></ha-icon>${fm(t, 1)}°</span>` : ''}${h !== null ? `<span class="v h"><ha-icon icon="mdi:water-percent"></ha-icon>${Math.round(h)}%</span>` : ''}${t === null && h === null ? (lx !== null ? `<span class="v t"><ha-icon icon="mdi:brightness-5"></ha-icon>${Math.round(lx)} lx</span>` : '<span class="v t">—</span>') : ''}</div></button>`; }).join('');
    el.innerHTML = `<h2 data-pe="rmini.title"><ha-icon icon="mdi:home-variant-outline"></ha-icon>W domu<span style="flex:1"></span><span class="lcn">${nT ? 'śr. ' + fm(sT / nT, 1) + '°' + (nH ? ' · ' + Math.round(sH / nH) + '%' : '') : ''}</span></h2><div class="rmg">${tiles}</div>`;
    el.onclick = (ev) => { const b = ev.target.closest('[data-go]'); if (b) this._open(b.dataset.go); };
  }
  _lights() {
    const el = this._$('s-light'); if (!el || !(this._au2b || this._aun)) return;
    const cols = this._roomsL().map((r) => { const L = (r.dev || []).filter((d) => !(d[3] && d[3].room) && /^(light|switch)\./.test(d[0])).slice(0, 2); return L.length ? {r, L} : null; }).filter(Boolean);
    const all = cols.reduce((a, c) => a.concat(c.L), []), n1 = all.filter((d) => this._s(d[0]) === 'on').length, lOn = PC.lightsOff.filter((e) => this._s(e) === 'on');
    const tile = (d) => { const st = this._s(d[0]), o = st === 'on', a = (this._hass.states[d[0]] || {}).attributes || {}; const tx = o ? (d[0].startsWith('light.') && a.brightness != null && a.brightness < 250 ? Math.max(1, Math.round(a.brightness / 2.55)) + '%' : 'włączone') : st === 'unavailable' ? 'niedostępne' : 'wyłączone';
      return `<button type="button" class="lq2${o ? ' on' : ''}" data-e="${esc(d[0])}"${st === 'unavailable' ? ' style="opacity:.5"' : ''}><span class="nm">${esc(d[1])}<small>${tx}</small></span><span class="sw2"></span></button>`; };
    const offb = lOn.length ? `<button type="button" class="lq2 aoff" id="lalloff"><span class="nm">Zgaś światła<small>${lOn.length} włączone</small></span><ha-icon icon="mdi:lightbulb-off-outline"></ha-icon></button>` : '';
    if (this._aun) {   // telefon: siatka 4x2 przyciskow (pokoj + lampa); w trakcie alarmu zamiast "Zgas swiatla" - "Zapal wszystkie"
      const alOn = ['normal', 'unavailable', 'unknown', undefined].indexOf(this._s(PC.alarm)) < 0 || !!(PC.alarmSw && this._s(PC.alarmSw) === 'on');
      const t2 = (d, rn) => { const st = this._s(d[0]), o = st === 'on'; return `<button type="button" class="lq2 lqm${o ? ' on' : ''}" data-e="${esc(d[0])}"${st === 'unavailable' ? ' style="opacity:.5"' : ''}><ha-icon icon="${o ? 'mdi:lightbulb-on' : 'mdi:lightbulb-outline'}"></ha-icon><span class="nm">${esc(rn)}<small>${esc(d[1])}</small></span></button>`; };
      const act = alOn ? `<button type="button" class="lq2 aon" id="lallon"><ha-icon icon="mdi:lightbulb-on-outline"></ha-icon><span class="nm">Zapal wszystkie światła</span></button>` : offb;
      el.innerHTML = all.length ? `<h2><ha-icon icon="mdi:lightbulb-group-outline"></ha-icon>Światła<span style="flex:1"></span><span class="lcn">${n1} włączone</span></h2><div class="lt2m">${cols.map((c) => c.L.map((d) => t2(d, c.r.name)).join('')).join('')}${act}</div>` : '';
      const ao2 = el.querySelector('#lallon'); if (ao2) ao2.onclick = () => this._call('homeassistant', 'turn_on', {entity_id: all.map((d) => d[0])});
    } else
    el.innerHTML = all.length ? `<h2><ha-icon icon="mdi:lightbulb-group-outline"></ha-icon>Oświetlenie<span style="flex:1"></span><span class="lcn">${n1} włączone · ${all.length - n1} wyłączone</span></h2><div class="card lt2">${cols.map((c, ci) => `<div class="lcol"><h3><i class="${c.L.some((d) => this._s(d[0]) === 'on') ? 'on' : ''}"></i>${esc(c.r.name)}</h3>${c.L.map(tile).join('')}${!this._aun && ci === cols.length - 1 && c.L.length < 2 ? offb : ''}</div>`).join('')}${this._aun ? (offb ? `<div class="lcol lall">${offb}</div>` : '') : cols.length && cols[cols.length - 1].L.length >= 2 ? `<div class="lcol"><h3>&nbsp;</h3>${offb}</div>` : ''}</div>` : '';
    el.querySelectorAll('.lq2[data-e]').forEach((b) => { const e = b.dataset.e, st = this._hass.states[e], A = (st && st.attributes) || {}; let tm = 0, lp = false;
      const br = e.startsWith('light.') && (A.brightness != null || (A.supported_color_modes || []).some((m) => m !== 'onoff'));
      b.onpointerdown = () => { lp = false; if (!br) return; clearTimeout(tm); tm = setTimeout(() => { lp = true; this._lightPop(b, e); }, 450); };
      ['onpointerup', 'onpointerleave', 'onpointercancel'].forEach((k) => { b[k] = () => clearTimeout(tm); });
      b.oncontextmenu = (ev) => ev.preventDefault();
      b.onclick = () => { if (lp) { lp = false; return; } this._call('homeassistant', 'toggle', {entity_id: e}); }; });
    const ao = el.querySelector('#lalloff'); if (ao) ao.onclick = () => this._call('homeassistant', 'turn_off', {entity_id: lOn});
  }
  _clock() {
    const el = this._$('clk'); if (!el) return; const d = new Date();
    const t = String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
    if (el.textContent !== t) el.textContent = t;
  }

  _issues() {
    const o = []; const add = (cat, sev, text, sub, icon, more) => o.push({cat, sev, text, sub: sub || '', icon: icon || 'mdi:alert-circle-outline', more: more || null});
    const s = (e) => this._s(e), n = (e) => this._n(e), CK = PC.checks || {}, IG = new Set(PC.ignore || []), on = (k) => CK[k] !== false;   // filtry: PC.checks (kategorie) i PC.ignore (encje pomijane)
    if (s(PC.gas) === 'on') add('GAZ', 2, 'Wyciek gazu w kuchni', '', 'mdi:gas-cylinder');
    if (s(PC.floodK) === 'on') add('ZALANIE', 2, 'Zalanie w kuchni', '', 'mdi:water-alert');
    if (s(PC.floodL) === 'on') add('ZALANIE', 2, 'Zalanie w łazience', '', 'mdi:water-alert');
    const al = s(PC.alarm); if (al && !['normal', 'unavailable', 'unknown'].includes(al)) add('ALARM', 2, 'Alarm dźwiękowy aktywny', '', 'mdi:bell-ring');
    if (on('door') && s(PC.door) === 'on') { const m = Math.max(0, Math.round((Date.now() - new Date(this._hass.states[PC.door].last_changed).getTime()) / 60000)); add('DRZWI', m >= 10 ? 2 : 1, 'Drzwi wejściowe otwarte', m + ' min', 'mdi:door-open'); }
    if (on('bat')) for (const e of PC.bats) { if (IG.has(e)) continue; const v = n(e); if (v !== null && v < (PC.batLow || 30)) add('BATERIE', v < (PC.batCrit || 10) ? 2 : 1, this._name(e), 'Bateria ' + Math.round(v) + '%', 'mdi:battery-low'); }
    const th = this._th();
    if (on('climate')) for (const [rn, e] of PC.temps) { const t = n(e); if (t !== null && (t > th.tMax || t < th.tMin)) add('KLIMAT', (t > th.tMax + 4 || t < th.tMin - 3) ? 2 : 1, rn[0] + rn.slice(1).toLowerCase() + ': ' + t.toFixed(1) + '°C', t > th.tMax ? 'Za ciepło' : 'Za zimno', 'mdi:thermometer-alert'); }
    if (on('climate')) for (const [rn, e] of PC.hums) { const h = n(e); if (h !== null && (h > th.hMax || h < th.hMin)) add('KLIMAT', (h > th.hMax + 10 || h < th.hMin - 10) ? 2 : 1, rn[0] + rn.slice(1).toLowerCase() + ': ' + Math.round(h) + '%', h > th.hMax ? 'Za wilgotno' : 'Za sucho', 'mdi:water-percent-alert'); }
    const seen = new Set(); if (on('offline')) for (const [e, crit] of PC.offline.concat(on('bat') ? PC.bats.map((b) => [b, false]) : [])) { if (seen.has(e) || IG.has(e)) continue; seen.add(e); if (s(e) === 'unavailable') add('OFFLINE', crit ? 2 : 1, this._name(e), 'Brak łączności', 'mdi:lan-disconnect'); }
    const st = this._hass.states;
    for (const e of Object.keys(st)) {
      if (on('utility') && e.startsWith('binary_sensor.tauron_cieplo') && st[e].state === 'on') { const a = st[e].attributes || {}; const os = a.outages || [];
        const w = os.length ? this._win(os[0].start, os[0].end) : null;
        const ke = Object.keys(st).find((q) => q.startsWith('sensor.tauron_cieplo') && q.endsWith('_komunikat_ogolny')), ka = ke ? st[ke] : null;   // komunikat ogolny Tauron Cieplo (pelna tresc w atrybucie message)
        const kom = ka && !['unknown', 'unavailable', ''].includes(ka.state) ? String((ka.attributes || {}).message || ka.state).slice(0, 700) : '';
        add('CIEPŁO', 1, 'Przerwa w dostawie ciepła', w ? w.line : String(a.place || ''), 'mdi:radiator-off',
          os.map((o) => { const x = this._win(o.start, o.end); return [['Rodzaj', o.type || 'Przerwa w dostawie ciepła'], ['Okres', x ? x.full : (o.details || '')], ['Status', x ? x.status : ''], ['Adres', o.address || a.place || ''], ['Komunikat', kom]]; }).flat().filter((r) => r[1])); }
      if (on('utility') && e.startsWith('binary_sensor.tauron_dystrybucja') && st[e].state === 'on') { const a = st[e].attributes || {}; const now = e.endsWith('_wylaczenie_pradu_trwa'); const os = a.outages || [];
        const w = os.length ? this._win(os[0].start, os[0].end) : null;
        add('PRĄD', now ? 2 : 1, now ? 'Wyłączenie prądu trwa' : 'Planowane wyłączenie prądu', w ? w.line : '', 'mdi:transmission-tower-off',
          os.slice(0, 3).map((o) => { const x = this._win(o.start, o.end); return [['Rodzaj', o.type === 'failure' ? 'Awaria' : 'Planowane'], ['Okres', x ? x.full : ''], ['Status', x ? x.status : ''], ['Zakres', String(o.message || '').slice(0, 120)]]; }).flat().filter((r) => r[1])); }
    }
    if (on('weather')) for (const w of this._warns()) { const lv = +w.level || 1; const t1 = new Date(String(w.valid_to || '').replace(' ', 'T')), t0 = new Date(String(w.valid_from || '').replace(' ', 'T'));
      const fm = (t) => isNaN(t) ? '' : (new Date(t).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0) ? '' : t.getDate() + '.' + String(t.getMonth() + 1).padStart(2, '0') + ' ') + String(t.getHours()).padStart(2, '0') + ':' + String(t.getMinutes()).padStart(2, '0');
      const now = !isNaN(t0) && t0.getTime() <= Date.now();
      add('POGODA', lv >= 3 ? 2 : 1, String(w.event || 'Ostrzeżenie meteo'), (now ? 'do ' + fm(t1) : 'od ' + fm(t0)) + ' · stopień ' + lv, this._wIcon(w.event),
        [['Ostrzeżenie', String(w.event || '')], ['Stopień', String(lv)], ['Od', fm(t0)], ['Do', fm(t1)], ['Prawdopodobieństwo', w.probability != null ? w.probability + '%' : ''], ['Opis', String(w.content || w.comment || '').slice(0, 160)]].filter((r) => r[1])); }
    const pm = n(PC.pm), PLa = PC.pmLv || [10, 25, 35, 50]; if (on('air') && pm !== null && pm > PLa[1]) add('POWIETRZE', pm > PLa[3] ? 2 : 1, (pm > 50 ? 'Zła' : 'Umiarkowana') + ' jakość powietrza', 'PM2.5 ' + pm.toFixed(1), 'mdi:air-filter');
    const fz = on('air') ? this._flt() : null; if (fz && fz.sev > 0) add('FILTR', fz.sev, fz.sev === 2 ? 'Filtr oczyszczacza do wymiany' : 'Filtr oczyszczacza na wyczerpaniu', 'Pozostało ' + Math.round(fz.life) + '%' + (fz.left !== null ? ' · ok. ' + fz.left + ' godz. pracy' : ''), 'mdi:air-filter',
      [['Pozostało', Math.round(fz.life) + '%'], ['Przepracowane', fz.used !== null ? Math.round(fz.used) + ' godz.' : ''], ['Szacunek do wymiany', fz.left !== null ? 'ok. ' + fz.left + ' godz. pracy' : '']].filter((r) => r[1]));
    const ws = on('wash') ? s(PC.wash.status) : ''; if (ws === 'end') { const wo = this._hass.states[PC.wash.status]; const m = Math.max(0, Math.round((Date.now() - new Date(wo.last_changed).getTime()) / 60000));
      add('PRALKA', m >= 60 ? 2 : 1, 'Pranie zakończone', m >= 5 ? 'Czeka od ' + (m >= 90 ? Math.floor(m / 60) + ' godz.' : m + ' min') : 'Do wyjęcia', 'mdi:washing-machine'); }
    else if (ws && !PC.wash.idle.includes(ws)) add('PRALKA', 0, 'Pralka pracuje', (PC.wash.phase[ws] || '') + this._washLeft(), 'mdi:washing-machine');
    const pr = (x) => (x.cat === 'CIEPŁO' || x.cat === 'PRĄD') ? 1 : 0;   // komunikaty Tauron: na górze w swoim poziomie
    return o.sort((a, b) => b.sev - a.sev || pr(b) - pr(a));
  }
  _win(a, b) {   // okno czasowe przerwy: krotki opis, pelny zakres i status wzgledem teraz
    const s = new Date(a), e = new Date(b); if (isNaN(s) || isNaN(e)) return null; const p = (n) => String(n).padStart(2, '0');
    const f = (d) => p(d.getDate()) + '.' + p(d.getMonth() + 1) + ' ' + p(d.getHours()) + ':' + p(d.getMinutes());
    const dur = (ms) => { const m = Math.max(1, Math.round(ms / 60000)); const d = Math.floor(m / 1440), h = Math.floor((m % 1440) / 60), mm = m % 60; return (d ? d + ' dn. ' : '') + (h ? h + ' godz. ' : '') + (!d && !h ? mm + ' min' : (!d && mm ? mm + ' min' : '')); };
    const n = Date.now(); const status = n < s ? 'Zaczyna się za ' + dur(s - n).trim() : n < e ? 'Trwa, koniec za ' + dur(e - n).trim() : 'Zakończona';
    return {line: f(s) + ' – ' + f(e), full: f(s) + ' do ' + f(e) + ' (' + dur(e - s).trim() + ')', status};
  }
  _issRow(i, k) {
    const open = i.more && this._exp && this._exp.has(k);
    const det = open ? `<div class="mo">${i.more.map((r) => `<div><span>${esc(r[0])}</span><b>${esc(r[1])}</b></div>`).join('')}</div>` : '';
    return `<div class="iss s${i.sev}${i.more ? ' tp' : ''}" ${i.more ? `data-x="${esc(k)}"` : ''}><ha-icon icon="${i.icon}"></ha-icon><div class="it">${esc(i.text)}${i.sub ? `<small>${esc(i.sub)}</small>` : ''}${det}</div>${i.more ? `<ha-icon class="chev" icon="mdi:chevron-${open ? 'up' : 'down'}"></ha-icon>` : (i.cat && this._view !== 'home' ? `<em>${i.cat.toLowerCase()}</em>` : '')}</div>`;
  }
  _bindIss(root) {
    root.querySelectorAll('.iss[data-x]').forEach((el) => { el.onclick = () => { this._exp = this._exp || new Set(); const k = el.dataset.x; if (this._exp.has(k)) this._exp.delete(k); else this._exp.add(k); this._sig = ''; this.hass = this._hass; }; });
  }
  _washLeft() { const t = new Date(this._s(PC.wash.end)).getTime(); if (isNaN(t)) return ''; const m = Math.max(0, Math.round((t - Date.now()) / 60000)); return ' · zostało ' + Math.floor(m / 60) + ':' + String(m % 60).padStart(2, '0'); }

  _render() {
    const $ = this._$, h = this._hass; if (!h) return;
    this._side(); this._bnav(); this._mplRender();
    if (this._view && this._view !== 'home') { this._fitK = null; this._renderSub(); this._fit(); return; }   // po powrocie na ekran glowny _fit musi sie wykonac (widok podrzedny zdejmuje zoom)
    const g0 = this._gch || 0;
    const mode = this._tm();
    const d = new Date(); const hr = d.getHours();
    const hello = hr < 5 ? 'Dobrej nocy' : hr < 12 ? 'Dzień dobry' : hr < 18 ? 'Miłego popołudnia' : 'Dobry wieczór';
    const wxs = this._s(PC.out.weather) || ''; const wx = WX[wxs] || ['mdi:weather-cloudy', wxs];
    const ot = this._n(PC.out.t), oh = this._n(PC.out.h); const pm = this._n(PC.pm);
    $('s-hero').innerHTML = `<div class="card hero">${this._wxFx(wxs)}<div class="hi" data-pe="hero.greet">${hello} 👋</div><div class="time" id="clk" data-pe="hero.time">--:--</div>
      <div class="date" data-pe="hero.date">${DAYS[d.getDay()]}, ${d.getDate()} ${MONTHS[d.getMonth()]}</div>
      <div class="wx" id="wxb" style="cursor:pointer"><div class="ic" data-pe="hero.icon"><ha-icon icon="${wx[0]}"></ha-icon></div><div class="grow"><div class="t" data-pe="hero.temp">${ot === null ? '—' : this._f('hero.temp', ot, 1) + '°'}</div><div class="d" data-pe="hero.desc">${esc(wx[1])}</div></div>
      <div class="mini">${oh === null ? '' : `<span data-pe="hero.hum">💧 ${this._f('hero.hum', oh, 0)}%</span>`}${this._aun ? this._airTile() : (pm === null || this._au2b ? '' : `<span data-pe="hero.pm">🍃 ${this._f('hero.pm', pm, 0)} <small>µg/m³</small></span>`)}</div></div>${this._todayHtml()}</div>`;
    this._clock();
    const hc = $('s-hero').querySelector('.hero'); if (hc) { hc.style.cursor = 'pointer'; hc.onclick = (e) => { if (e.target.closest('button')) return; this._open('pogoda'); }; }
    const at = $('airt'); if (at) { at.onclick = (e) => { e.stopPropagation(); if (e.target.closest('#airb')) return; this._open('powietrze'); }; const ab = $('airb'); if (ab) { let t0 = 0; ab.onpointerdown = (e) => { e.stopPropagation(); if (Date.now() - t0 < 600) return; t0 = Date.now(); const on = this._s(PC.purifier) === 'on'; this._call('fan', on ? 'turn_off' : 'turn_on', {entity_id: PC.purifier}); ab.classList.add('wt'); ab.querySelector('span').textContent = on ? 'Wyłączam…' : 'Włączam…'; }; ab.onclick = (e) => e.stopPropagation(); } }
    $('s-hero').querySelectorAll('[data-h]').forEach((b) => { b.onclick = () => { if (b.dataset.h === 'pur') this._call('fan', 'turn_on', {entity_id: PC.purifier}); }; });

    const iss = this._issues(); const real = iss.filter((i) => i.sev >= 1); const lim = this._showAll ? 99 : 4;
    const shown = iss.filter((i) => i.sev >= 1 || this._showAll).slice(0, lim);
    const alOn = ['normal', 'unavailable', 'unknown', undefined].indexOf(this._s(PC.alarm)) < 0 || (PC.alarmSw && this._s(PC.alarmSw) === 'on');
    $('s-status').innerHTML = `<h2 style="cursor:pointer" data-pe="status.title"><ha-icon icon="mdi:shield-home-outline"></ha-icon>Alarmy i ostrzeżenia<span style="flex:1"></span><ha-icon icon="mdi:chevron-right"></ha-icon></h2><div class="card status${real.length ? ' sv' + Math.max(...real.map((i) => i.sev)) : ''}" data-pe="status.list"><ha-icon class="wm" icon="mdi:flower-tulip" style="color:${this._rc('#8f78e0')}"></ha-icon>` +
      (real.length ? shown.map((i) => this._issRow(i, i.cat + i.text)).join('') +
        (real.length > 4 ? `<button class="more" id="more">${this._showAll ? 'Pokaż mniej' : 'Pokaż wszystkie (' + iss.length + ')'}</button>` : '')
        : `<div class="ok"><div class="b"><ha-icon icon="mdi:check-bold"></ha-icon></div><div>Wszystko w porządku<small>Brak alarmów i ostrzeżeń</small></div></div>` +
          iss.filter((i) => i.sev === 0).map((i) => this._issRow(i, i.cat + i.text)).join('')) + this._okLines() + this._fxCdHtml() + `</div>`;
    this._bindIss($('s-status')); this._fxBindGo();
    $('s-status').querySelector('h2').onclick = () => this._open('stan-domu');
    const mb = $('more'); if (mb) mb.onclick = () => { this._showAll = !this._showAll; this._sig = ''; this._render(); };

    const muted = this._s(this._mute()) === 'on';
    this._renderListen();
    const mc = $('mic'); mc.style.display = this._mute() ? '' : 'none'; mc.className = 'mic' + (muted ? ' on' : ''); mc.title = muted ? 'Mikrofon wyciszony' : 'Wycisz mikrofon'; mc.innerHTML = `<ha-icon icon="${muted ? 'mdi:microphone-off' : 'mdi:microphone'}"></ha-icon>`;
    const lOn = PC.lightsOff.filter((e) => this._s(e) === 'on');   // chip „Zgaś światła” w naglowku widoczny tylko gdy cos swieci
    const rsl = this._aun ? (($('s-rooms').querySelector('.rooms') || {}).scrollLeft || 0) : 0;
    $('s-rooms').innerHTML = `<h2 data-pe="rooms.title"><ha-icon icon="mdi:home-variant-outline"></ha-icon>Pokoje${lOn.length ? `<span style="flex:1"></span><button type="button" id="alloff" style="border:0;border-radius:999px;padding:7px 14px;font:inherit;font-size:12.5px;font-weight:800;letter-spacing:0;text-transform:none;cursor:pointer;display:flex;align-items:center;gap:6px;background:#fff3c4;color:#8f6a00;box-shadow:0 2px 8px rgba(0,0,0,.15)"><ha-icon icon="mdi:lightbulb-off-outline" style="--mdc-icon-size:16px"></ha-icon>Zgaś światła (${lOn.length})</button>` : ''}</h2><div class="rooms">` + this._roomsL().map((r) => this._room(r)).join('') + `</div>`;
    const ao = $('alloff'); if (ao) ao.onclick = (ev) => { ev.stopPropagation(); this._call('homeassistant', 'turn_off', {entity_id: lOn}); };
    this._lights();
    $('s-rooms').querySelectorAll('.dev').forEach((b) => this._bindDev(b)); this._bindAtg($('s-rooms'));
    if (rsl) { const rr = $('s-rooms').querySelector('.rooms'); if (rr) rr.scrollLeft = rsl; }
    if (!this._au2b) $('s-rooms').querySelectorAll('.room').forEach((el) => { const m = el.querySelector('.met'); el.querySelector('.top').onclick = () => this._open('pokoj-' + el.dataset.id); if (m) m.onclick = () => this._open('pokoj-' + el.dataset.id); });

    this._air(); this._now(); this._rmini(); this._school(); this._fuel(); this._cal(); this._links();
    const fk = innerWidth + 'x' + innerHeight + '|' + Math.round(this.getBoundingClientRect().top) + '|' + (this._edit ? 1 : 0) + '|' + (this._view || '');   // _fit wymusza kosztowne przeliczenie ukladu - pomijamy, gdy nic sie nie zmienilo
    if ((this._gch || 0) !== g0 || fk !== this._fitK) { this._fitK = fk; this._fit(); }
    if (!this._onRs) { this._onRs = () => { clearTimeout(this._rst); this._rst = setTimeout(() => this._fit(), 150); }; window.addEventListener('resize', this._onRs); }
  }

  // tablet: caly ekran glowny ma sie miescic bez przewijania - w razie potrzeby zmniejsz skale (zoom)
  _fit() {
    const app = this.shadowRoot.querySelector('.app'); if (!app) return;
    app.style.zoom = ''; app.style.minHeight = '';
    if (this._au2b) {   // uklad projektowany na ~1180x790: na nizszych / wezszych ekranach (np. tablet z paskiem HA) skalujemy zoomem
      const av = Math.max(300, window.innerHeight - Math.max(0, this.getBoundingClientRect().top)), z = Math.max(0.6, Math.min(1, av / 790, window.innerWidth / 1180));
      if (z < 0.995) app.style.zoom = z.toFixed(3);
      app.style.setProperty('--av', (av / z).toFixed(0) + 'px'); return;
    }
    if (window.innerWidth < 900 || (this._view && this._view !== 'home')) { app.style.minHeight = Math.max(0, window.innerHeight - Math.max(0, this.getBoundingClientRect().top)) + 'px'; return; }   // widok szczegolowy / waski ekran: tlo na caly ekran
    const top = this.getBoundingClientRect().top; const avail = window.innerHeight - Math.max(0, top);
    const need = app.scrollHeight; if (need > avail + 1) app.style.zoom = Math.max(0.55, avail / need).toFixed(3);
    app.style.minHeight = (avail / (parseFloat(app.style.zoom) || 1)) + 'px';   // tlo na caly ekran
  }

  // co aktualnie gra w pokoju (r.mp = lista media_player): radio -> ikona + tytul (tylko szeroki ekran, przewijany), TV / dekoder -> sama ikona; nie gra = nic
  _rmMp(r, p) {
    const L = (r.mp || []).filter(Boolean); if (!L.length) return '';
    const st = this._hass.states, sp = ((st['sensor.radio_pl_now_playing'] || {attributes: {}}).attributes.players) || {}, off = ['off', 'unavailable', 'unknown', 'standby'];
    let radio = false, tv = null;
    L.forEach((e) => {
      const s2 = st[e]; if (!s2) return; const a = s2.attributes || {}, nm = e + ' ' + (a.friendly_name || '');
      if ((sp[e] && !off.includes(s2.state)) || (/radio/i.test(nm) && ['playing', 'buffering'].includes(s2.state))) { radio = true; return; }   // radio: wg czujnika radio_pl albo odtwarzacz o nazwie radio
      if (!off.includes(s2.state) && s2.state !== 'idle' && !tv) tv = /dekoder|decoder|box/i.test(nm) ? 'mdi:set-top-box' : 'mdi:television-play';   // TV / dekoder wlaczony (Android TV zglasza 'on', Cast 'playing')
    });
    return (tv ? `<ha-icon class="mpi" icon="${tv}" style="color:${p[1]}" title="Włączony TV"></ha-icon>` : '') + (radio ? `<ha-icon class="mpi" icon="mdi:radio" style="color:${p[1]}" title="Gra radio"></ha-icon>` : '');
  }
  // wiadomosci na panele ESP32 w pokojach (MQTT: r.msg = temat); przycisk w naglowku kafelka / widoku pokoju otwiera okno wysylania
  _msgBtn(r) { return r.msg ? `<button class="atg msgb" data-msg="${esc(r.id)}" type="button" title="Wyślij wiadomość na panel"><ha-icon icon="mdi:message-text-outline"></ha-icon></button>` : ''; }
  _msgTile(r) { return r.msg ? `<div class="dcard"><button class="dev" data-msg="${esc(r.id)}" type="button"><ha-icon icon="mdi:message-text-outline"></ha-icon><span>Wiadomość na panel</span><em>wyślij tekst na ekran w pokoju</em></button></div>` : ''; }
  _bindMsg(root) { root.querySelectorAll('[data-msg]').forEach((b) => { b.onclick = (ev) => { ev.stopPropagation(); const r = PC.rooms.find((x) => x.id === b.dataset.msg); if (r) this._msgDlg(r); }; }); }
  _msgDlg(r) {
    const $ = this._$, QK = ['Obiad gotowy', 'Czas do szkoły', 'Pora spać', 'Zejdź na dół', 'Posprzątaj pokój', 'Zadzwoń do domu'];
    let H = {}; try { H = JSON.parse(localStorage.getItem('pastel_msg_hist') || '{}'); } catch (e) { H = {}; } const hist = (H[r.id] || []).slice(0, 5); let ascii = false; try { ascii = localStorage.getItem('pastel_msg_ascii') === '1'; } catch (e) { /* ignore */ }
    this._formOpen = true; const sheet = document.createElement('div'); sheet.className = 'sheet';
    sheet.innerHTML = `<form class="fm"><div class="ft">Wiadomość na panel · ${esc(r.name)}</div>
      <label>Treść<textarea id="mt" maxlength="200" rows="3" placeholder="Wpisz wiadomość…"></textarea></label><div class="mcnt" id="mc">0 / 200</div>
      <div class="mq2">${QK.map((x) => `<button type="button" class="chipb" data-q="${esc(x)}">${esc(x)}</button>`).join('')}</div>
      ${hist.length ? `<div class="mh2"><small>Ostatnio wysłane</small>${hist.map((x) => `<button type="button" class="chipb hq" data-q="${esc(x)}">${esc(x)}</button>`).join('')}</div>` : ''}
      <label class="chk"><input id="ma" type="checkbox" ${ascii ? 'checked' : ''}> Zamień polskie znaki na bezogonkowe</label>
      <div class="msg" id="mm"></div><div class="two"><button type="button" class="ghost" id="mcn">Anuluj</button><button type="submit" class="pri" id="msd">Wyślij</button></div></form>`;
    $('app').appendChild(sheet); const q = (id) => sheet.querySelector('#' + id), close = () => { sheet.remove(); this._formOpen = false; };
    const ta = q('mt'); const upd = () => { q('mc').textContent = ta.value.length + ' / 200'; }; ta.oninput = upd; setTimeout(() => ta.focus(), 50);
    sheet.querySelectorAll('[data-q]').forEach((b) => { b.onclick = () => { ta.value = b.dataset.q; upd(); ta.focus(); }; });
    q('mcn').onclick = close; sheet.onclick = (x) => { if (x.target === sheet) close(); };
    sheet.querySelector('form').onsubmit = async (x) => { x.preventDefault(); let t = ta.value.trim(); const m = q('mm'); m.style.color = ''; if (!t) { m.textContent = 'Wpisz treść wiadomości'; return; }
      const orig = t; if (q('ma').checked) t = t.replace(/[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g, (c) => ({'ą': 'a', 'ć': 'c', 'ę': 'e', 'ł': 'l', 'ń': 'n', 'ó': 'o', 'ś': 's', 'ź': 'z', 'ż': 'z', 'Ą': 'A', 'Ć': 'C', 'Ę': 'E', 'Ł': 'L', 'Ń': 'N', 'Ó': 'O', 'Ś': 'S', 'Ź': 'Z', 'Ż': 'Z'}[c]));
      try { localStorage.setItem('pastel_msg_ascii', q('ma').checked ? '1' : '0'); } catch (e) { /* ignore */ }
      q('msd').disabled = true; m.textContent = 'Wysyłam…';
      try { await this._hass.callService('mqtt', 'publish', {topic: r.msg, payload: t, qos: 0, retain: false});
        try { const L = [orig].concat((H[r.id] || []).filter((y) => y !== orig)).slice(0, 8); H[r.id] = L; localStorage.setItem('pastel_msg_hist', JSON.stringify(H)); } catch (e) { /* ignore */ }
        m.style.color = 'var(--good)'; m.textContent = 'Wysłano na panel ✓'; setTimeout(close, 1100);
      } catch (e) { q('msd').disabled = false; m.textContent = 'Nie udało się wysłać: ' + ((e && e.message) || e); } }; }
  _atg(r, p) { if (!r.auto) return ''; const s = this._s(r.auto); const o = s === 'on';
    return `<button class="atg${o ? ' on' : ''}" data-pe="rooms.auto" data-e="${r.auto}" title="Automatyczne gaszenie: ${o ? 'włączone' : 'wyłączone'}" style="${o ? `background:${p[0]};color:${p[1]}` : ''}${s === 'unavailable' ? ';opacity:.45' : ''}"><ha-icon icon="${o ? 'mdi:timer-outline' : 'mdi:timer-off-outline'}"></ha-icon></button>`; }
  _bindAtg(root) { this._bindMsg(root); root.querySelectorAll('.atg:not(.msgb)').forEach((b) => { b.onclick = (ev) => { ev.stopPropagation(); this._call('homeassistant', 'toggle', {entity_id: b.dataset.e}); }; }); }
  _room(r) {
    const p = this._pal(r.c); const on = r.occ && this._s(r.occ) === 'on'; const t = r.t ? this._n(r.t) : null, h = r.h ? this._n(r.h) : null, lx = r.lux ? this._n(r.lux) : null;
    const met = [], th = this._th(), ts = r.t ? this._stale(r.t) : '', hs = r.h ? this._stale(r.h) : '';
    if (t !== null) met.push(`<div class="${t > th.tMax + 4 || t < th.tMin - 3 ? 'bad' : (t > th.tMax || t < th.tMin ? 'warn' : '')}" data-pe="rooms.temp"><b>${this._f('rooms.temp', t, 1)}<small>°C</small></b><span>Temp.${this._stl(ts)}</span></div>`);
    else if (ts === 'brak') met.push(`<div class="warn" data-pe="rooms.temp"><b>—<small>°C</small></b><span>Temp.${this._stl(ts)}</span></div>`);
    if (h !== null) met.push(`<div class="${h > th.hMax + 10 || h < th.hMin - 10 ? 'bad' : (h > th.hMax || h < th.hMin ? 'warn' : '')}" data-pe="rooms.hum"><b>${this._f('rooms.hum', h, 0)}<small>%</small></b><span>Wilg.${this._stl(hs)}</span></div>`);
    else if (hs === 'brak') met.push(`<div class="warn" data-pe="rooms.hum"><b>—<small>%</small></b><span>Wilg.${this._stl(hs)}</span></div>`);
    if (lx !== null && r.id !== 'salon') met.push(`<div data-pe="rooms.lux"><b>${Math.round(lx)}<small> lx</small></b><span>Światło</span></div>`);
    let wn = ''; if (t !== null && (t > th.tMax || t < th.tMin)) wn = t > th.tMax ? 'Za ciepło' : 'Za zimno'; else if (h !== null && (h > th.hMax || h < th.hMin)) wn = h > th.hMax ? 'Za wilgotno' : 'Za sucho';   // wyroznienie kafelka (dashboard Aurora)
    let extra = '';
    if (r.door) { const o = this._s(r.door) === 'on'; extra += `<div class="wash ${o ? 'run' : ''}" style="${o ? 'background:#fff0c2;color:#8f6a00' : ''}"><ha-icon icon="${o ? 'mdi:door-open' : 'mdi:door-closed'}"></ha-icon>Drzwi ${o ? 'otwarte' : 'zamknięte'}</div>`; }
    if (r.wash) { const ws = this._s(PC.wash.status); const run = ws && !PC.wash.idle.includes(ws); const end = ws === 'end';
      extra += `<div class="wash ${run ? 'run' : end ? 'end' : ''}"><ha-icon icon="mdi:washing-machine"></ha-icon>${end ? 'Pranie zakończone' : run ? 'Pranie · ' + esc((PC.wash.phase[ws] || 'pracuje').toLowerCase()) + this._washLeft() : 'Pralka nie pracuje'}</div>`; }
    if (r.leak && this._s(r.leak) === 'on') extra += `<div class="wash" style="background:#ffdde3;color:#b8324f"><ha-icon icon="mdi:water-alert"></ha-icon>Wykryto zalanie!</div>`;
    let alm = !!(r.leak && this._s(r.leak) === 'on');
    if (r.id === 'kuchnia') { if (this._s(PC.gas) === 'on') { alm = true; extra += `<div class="wash" style="background:#ffdde3;color:#b8324f"><ha-icon icon="mdi:gas-cylinder"></ha-icon>Wyciek gazu!</div>`; }
      if (this._s(PC.floodK) === 'on') { alm = true; extra += `<div class="wash" style="background:#ffdde3;color:#b8324f"><ha-icon icon="mdi:water-alert"></ha-icon>Wykryto zalanie!</div>`; } }
    // kafelek pokoju na ekranie glownym: maks. 2 przyciski (reszta w widoku pokoju)
    const devs = r.dev.filter((d) => !(d[3] && d[3].room)).slice(0, 2).map((d) => { const o = ['on', 'open', 'playing', 'buffering'].includes(this._s(d[0])); const un = this._s(d[0]) === 'unavailable';
      const ba = (this._hass.states[d[0]] || {}).attributes || {}; const pc = (d[0].startsWith('light.') && o && ba.brightness != null) ? Math.max(1, Math.round(ba.brightness / 2.55)) : null;
      const bg = pc !== null ? `background:linear-gradient(90deg,${p[0]} ${pc}%,color-mix(in srgb,${p[0]} 45%,#fff) ${pc}%);color:${p[1]}` : o ? `background:${p[0]};color:${p[1]}` : '';
      return `<button class="dev ${o ? 'on' : ''}" data-e="${d[0]}" title="${esc(d[1])}" ${pc !== null ? `data-br="${pc}" data-p0="${p[0]}"` : ''} style="${bg}${un ? ';opacity:.45' : ''}"><ha-icon icon="${d[2]}"></ha-icon>${(() => { const mt = d[0].startsWith('media_player.') && o ? ((this._hass.states[d[0]] || {}).attributes || {}).media_title : ''; return mt ? `<span class="mq"><i>${esc(d[1] + ' · ' + mt)}</i></span>` : `<span>${esc(d[1])}</span>`; })()}${pc !== null ? `<b class="bp">${pc}%</b>` : ''}</button>`; }).join('');
    const sz = r.size || {}, szs = (sz.w === 3 ? 'grid-column:1/-1;' : sz.w === 2 ? 'grid-column:span 2;' : '') + (sz.h === 2 ? 'grid-row:span 2;' : '');
    return `<div class="card room ${r.dev.length > 2 || r.wash ? 'wide' : ''}${alm ? ' alm' : ''}${wn ? ' wn' : ''}" data-id="${r.id}"${szs ? ` style="${szs}"` : ''}><ha-icon class="wm" data-pe="rooms.wm" icon="${r.icon}" style="color:${p[1]}"></ha-icon><div class="top"><div class="bub" style="background:${p[0]};color:${p[1]}"><ha-icon icon="${r.icon}"></ha-icon></div>
      <div class="rnb"><div class="nm" data-pe="rooms.name"><span class="nmt">${r.name}</span>${wn ? `<span class="wb">${wn}</span>` : ''}${this._rmMp(r, p)}</div>${r.occ ? `<div class="pr ${on ? 'on' : ''}" data-pe="rooms.occ"><i></i>${on ? 'Ktoś jest' : 'Pusto'}</div>` : ''}</div>${this._atg(r, p)}${this._msgBtn(r)}</div>
      ${met.length ? `<div class="met">${met.join('')}</div>` : ''}${devs ? `<div class="devs${{sq: ' sh-sq', ci: ' sh-ci', pi: ' sh-pi'}[this._dshU() || r.dsh || PC.dsh] || ''}" data-pe="rooms.devs">${devs}</div>` : ''}<div data-pe="rooms.extra" style="display:contents">${extra}</div></div>`;
  }

  _airCardHtml(lvl, pm, on, v, C, frac) { return `<div class="card air"><ha-icon class="wm" icon="mdi:leaf" style="color:${lvl[1]}"></ha-icon><div class="ring" data-pe="air.ring"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="42" fill="none" stroke="rgba(150,140,190,.2)" stroke-width="10"/>
      <circle cx="50" cy="50" r="42" fill="none" stroke="${lvl[1]}" stroke-width="10" stroke-linecap="round" stroke-dasharray="${(C * frac).toFixed(1)} ${C.toFixed(1)}"/></svg>
      <div class="c"><b style="color:${lvl[1]}">${pm === null ? '—' : this._f('air.ring', pm, 0)}</b><small>PM2.5</small></div></div>
      <div class="tx"><div class="tt" data-pe="air.text">Jakość: ${lvl[0]}</div><div class="ss" data-pe="air.purifier">Oczyszczacz ${on ? 'pracuje' : this._s(PC.purifier) === 'unavailable' ? 'niedostępny' : 'jest wyłączony'}</div>
      <button class="dev ${on ? 'on' : ''}" id="pur" data-pe="air.btn" style="${on ? 'background:#cdf2ee;color:#35aaa0' : ''};flex:none"><ha-icon icon="mdi:air-purifier"></ha-icon><span>${on ? 'Wyłącz' : 'Włącz'}</span></button></div></div>`; }
  _air() {
    const pm = this._n(PC.pm); const on = this._s(PC.purifier) === 'on'; const v = pm === null ? 0 : pm;
    const PL = PC.pmLv || [10, 25, 35, 50], lvl = pm === null ? ['Brak danych', '#b9b5cf'] : pm <= PL[0] ? ['Świetna', '#3fb27f'] : pm <= PL[1] ? ['Dobra', '#6bbf8f'] : pm <= PL[2] ? ['Umiarkowana', '#d9a521'] : pm <= PL[3] ? ['Słaba', '#f08a5d'] : ['Zła', '#e5576f'];
    const C = 2 * Math.PI * 42, frac = Math.min(1, v / 60);
    if (this._au2b) { this._airH = this._airCardHtml(lvl, pm, on, v, C, frac); return; }
    this._$('s-air').innerHTML = `<h2 style="cursor:pointer" id="air-h" data-pe="air.title"><ha-icon icon="mdi:leaf"></ha-icon>Powietrze<span style="flex:1"></span><ha-icon icon="mdi:chevron-right"></ha-icon></h2>${this._airCardHtml(lvl, pm, on, v, C, frac)}`;
    this._$('air-h').onclick = () => this._open('powietrze');
    this._$('pur').onclick = (e) => { e.stopPropagation(); const on = this._s(PC.purifier) === 'on'; this._call('fan', on ? 'turn_off' : 'turn_on', {entity_id: PC.purifier}); const sp = this._$('pur').querySelector('span'); if (sp) sp.textContent = on ? 'Wyłączam…' : 'Włączam…'; this._$('pur').style.opacity = '.6'; };
    const ac = this._$('s-air').querySelector('.card.air'); if (ac && this._au2b) { ac.style.cursor = 'pointer'; ac.onclick = () => this._open('powietrze'); }
  }

  // karta Szkola na ekranie glownym: sprawdziany, kartkowki i zadania domowe najblizszych 14 dni (z kalendarzy eduVULCAN); alarmy mieszkania sa osobno
  _school() {
    const el = this._$('s-school'); const S = this._skS(); if (!el) return; if (!S.length) { el.innerHTML = ''; return; }
    S.forEach((q) => this._skLoad(q.k)); const nv = this._skNew(); this._skNv = nv; const d0 = new Date(); d0.setHours(0, 0, 0, 0); const it = [];
    S.forEach((q) => { const c = (this._skCal || {})[q.k]; ((c && c.duty) || []).forEach((ev) => { const dd = Math.round((new Date(ev.s.getFullYear(), ev.s.getMonth(), ev.s.getDate()) - d0) / 86400000); if (dd < 0 || dd > 14) return;
      const m = /^([^:]+):\s*(.*)$/.exec(ev.t) || [], kind = (m[1] || 'Sprawdzian').trim(), subj = (m[2] || ev.t).trim(); it.push({nm: String(q.nm).split(' ')[0], kind, subj, dd, hw: /^zadanie/i.test(kind), si: S.indexOf(q)}); }); });
    it.sort((a, b) => a.dd - b.dd); const when = (d) => d <= 0 ? 'dziś' : d === 1 ? 'jutro' : 'za ' + d + ' dni', lim = 12;
    const AVC = ['#7aa2ff', '#f472b6', '#34d399', '#fbbf24'], rows = this._au2b ? it.slice(0, lim).map((x) => `<div class="scw s2l ${x.dd <= 1 ? 'soon' : ''}"><span class="av" style="background:${AVC[x.si % 4]}">${esc(x.nm.charAt(0))}</span><div class="st"><b>${esc(x.subj)}</b><small>${esc(x.kind)} · ${esc(x.nm)}</small></div><span class="sd">${when(x.dd)}</span></div>`).join('') : it.slice(0, lim).map((x) => `<div class="scw ${x.dd <= 1 ? 'soon' : ''}"><ha-icon icon="${x.hw ? 'mdi:notebook-edit-outline' : 'mdi:clipboard-text-clock-outline'}"></ha-icon><div class="st"><b>${esc(x.subj)}</b><small>${esc(x.nm)} · ${esc(x.kind)}</small></div><span class="sd">${when(x.dd)}</span></div>`).join('');
    const loaded = S.every((q) => (this._skCal || {})[q.k] && this._skCal[q.k].t);
    el.innerHTML = `<h2 style="cursor:pointer" id="scw-h" class="${nv > 0 ? 'hl' : ''}" data-pe="school.title"><ha-icon icon="mdi:school-outline"></ha-icon>Szkoła${nv > 0 ? `<span class="nb">${nv > 99 ? '99+' : nv}</span>` : ''}<span style="flex:1"></span><ha-icon icon="mdi:chevron-right"></ha-icon></h2><div class="card school" data-pe="school.list">`
      + (rows || `<div class="empty" style="padding:10px 4px">${loaded ? 'Brak sprawdzianów i zadań na 2 tygodnie ✨' : 'Wczytuję…'}</div>`) + (it.length > lim ? `<div class="scw more2">+ ${it.length - lim} kolejne</div>` : '') + `</div>`;
    el.onclick = () => this._open('szkola');   // cala karta (naglowek i lista) otwiera widok Szkola
  }
  _fuel() {
    const f2 = (x) => x.toFixed(2).replace('.', ',');
    const tiles = PC.fuel.map(([nm, d, j], fi) => { const pd = this._n(d), pj = this._n(j); if (pd === null) return '';
      const diff = pj === null ? 0 : pj - pd; const tr = Math.abs(diff) > 0.004 ? `<span class="tr ${diff > 0 ? 'up' : 'dn'}">${diff > 0 ? '▲' : '▼'} jutro ${f2(pj)}</span>` : `<span class="tr">bez zmian</span>`;
      return `<div class="card fu" data-pe="fuel.${fi}"><ha-icon class="wm" icon="mdi:gas-station" style="color:${this._rc('#d9a521')}"></ha-icon><div class="n">${nm}</div><div class="p">${pd.toFixed(this._dec('fuel.price', 2)).replace('.', ',')}<small> zł</small></div>${tr}</div>`; }).join('');
    if (this._au2b && this._airH) {   // Aurora (szeroki ekran): jeden kafelek przewijany w bok - Powietrze (glowne) + Paliwa
      const el = this._$('s-fuel'), old = el.querySelector('#fpg'), sl = old ? old.scrollLeft : 0;
      // znacznik nowosci: zmiana cen (dzis / jutro) wzgledem ostatnio obejrzanych na stronie Paliwa
      const fsig = PC.fuel.map(([nm, d, j]) => nm + ':' + this._s(d) + ':' + this._s(j)).join('|'); let fseen = null; try { fseen = localStorage.getItem('aurora_fuel_seen'); } catch (e) { fseen = null; }
      if (fseen === null) { fseen = fsig; try { localStorage.setItem('aurora_fuel_seen', fsig); } catch (e) { /* ignore */ } }
      const fnw = fseen !== fsig;
      el.innerHTML = `<h2 id="fh"><ha-icon icon="mdi:leaf"></ha-icon><span id="fht">Powietrze</span><span style="flex:1"></span><span class="fdt"><i class="on"></i><i${fnw ? ' class="nw"' : ''}></i></span></h2><div id="fpg"><div class="pg">${this._airH}</div><div class="pg"><div class="fuel">${tiles}</div></div></div>`;
      const pg = el.querySelector('#fpg'); if (sl) pg.scrollLeft = sl;
      const upd = () => { const n = pg.scrollLeft > pg.clientWidth / 2 ? 1 : 0; el.querySelector('#fht').textContent = n ? 'Paliwa' : 'Powietrze'; el.querySelector('#fh > ha-icon').setAttribute('icon', n ? 'mdi:gas-station-outline' : 'mdi:leaf'); el.querySelectorAll('.fdt i').forEach((d, k) => d.classList.toggle('on', k === n)); if (n === 1 && fnw) { try { localStorage.setItem('aurora_fuel_seen', fsig); } catch (e) { /* ignore */ } el.querySelectorAll('.fdt i.nw').forEach((d) => d.classList.remove('nw')); } };
      upd(); let rq = 0; pg.onscroll = () => { if (rq) return; rq = requestAnimationFrame(() => { rq = 0; upd(); }); };
      el.querySelector('.fdt').onclick = () => pg.scrollTo({left: pg.scrollLeft > pg.clientWidth / 2 ? 0 : pg.clientWidth, behavior: 'smooth'});
      const pur = el.querySelector('#pur'); if (pur) pur.onclick = (e) => { e.stopPropagation(); const on = this._s(PC.purifier) === 'on'; this._call('fan', on ? 'turn_off' : 'turn_on', {entity_id: PC.purifier}); const sp = pur.querySelector('span'); if (sp) sp.textContent = on ? 'Wyłączam…' : 'Włączam…'; pur.style.opacity = '.6'; };
      const ac = el.querySelector('.card.air'); if (ac) { ac.style.cursor = 'pointer'; ac.onclick = () => this._open('powietrze'); }
      return;
    }
    this._$('s-fuel').innerHTML = tiles ? `<h2 data-pe="fuel.title"><ha-icon icon="mdi:gas-station-outline"></ha-icon>Paliwa (maks.)</h2><div class="fuel">${tiles}</div>` : '';
  }

  async _fetchEv(a, b) {
    const out = []; const cals = Object.keys(this._hass.states).filter((e) => e.startsWith('calendar.'));
    await Promise.all(cals.map(async (cal) => { try {
      const res = await this._hass.callApi('GET', 'calendars/' + cal + '?start=' + encodeURIComponent(a.toISOString()) + '&end=' + encodeURIComponent(b.toISOString()));
      for (const ev of res || []) { const ad = !!(ev.start && ev.start.date); const s = ad ? new Date(ev.start.date + 'T00:00:00') : new Date(ev.start.dateTime);
        let e = ad ? new Date(ev.end.date + 'T00:00:00') : new Date(ev.end.dateTime); if (ad) e = new Date(e.getTime() - 1);
        out.push({cal, uid: ev.uid, rid: ev.recurrence_id, t: ev.summary || '(bez tytułu)', s, e, ad, loc: ev.location || '', desc: ev.description || ''}); }
    } catch (e) { /* kalendarz chwilowo niedostepny */ } }));
    out.sort((x, y) => x.s - y.s); return out;
  }
  async _loadEvents() {
    if (!this._hass) return; const a = new Date(); a.setHours(0, 0, 0, 0); const b = new Date(a.getTime() + 90 * 86400000);
    this._events = await this._fetchEv(a, b); this._sig = ''; if (this._hass && !this._formOpen) this.hass = this._hass;
  }
  async _loadMonth() {
    if (!this._hass) return; const c = this._cm || (this._cm = {y: new Date().getFullYear(), m: new Date().getMonth()}); const k = c.y + '-' + c.m;
    const a = new Date(c.y, c.m, 1 - 7), b = new Date(c.y, c.m + 1, 8);
    const l = await this._fetchEv(a, b); this._mev = this._mev || {}; this._mev[k] = l; if (this._view === 'kalendarz' && !this._formOpen) this._renderSub();
  }
  _cal() {
    const now = new Date(); const list = this._events.filter((e) => PC.cal.includes(e.cal) && e.s >= new Date(now.getFullYear(), now.getMonth(), now.getDate())).slice(0, this._lay().calN || 4);
    this._$('s-cal').innerHTML = `<h2 style="cursor:pointer" id="cal-h" data-pe="cal.title"><ha-icon icon="mdi:calendar-heart"></ha-icon>Najbliższe wydarzenia<span style="flex:1"></span><ha-icon icon="mdi:chevron-right"></ha-icon></h2><div class="card cal${(this._lay().calN || 4) > 2 ? ' all' : ''}" data-pe="cal.list"><ha-icon class="wm" icon="mdi:calendar-heart" style="color:${this._rc('#e0709a')}"></ha-icon>` + (list.length ? list.map((e) => {
      const hm = e.ad ? 'Cały dzień' : String(e.s.getHours()).padStart(2, '0') + ':' + String(e.s.getMinutes()).padStart(2, '0');
      const dd = Math.round((new Date(e.s.getFullYear(), e.s.getMonth(), e.s.getDate()) - new Date(now.getFullYear(), now.getMonth(), now.getDate())) / 86400000);
      return `<div class="ev"><div class="dt"><b>${e.s.getDate()}</b><small>${MONTHS[e.s.getMonth()].slice(0, 3)}</small></div><div><div class="tt">${esc(e.t)}</div><div class="wn">${dd === 0 ? 'Dziś' : dd === 1 ? 'Jutro' : DAYS[e.s.getDay()] + ' ' + e.s.getDate() + '.' + String(e.s.getMonth() + 1).padStart(2, '0')} · ${hm}</div></div></div>`; }).join('')
      : `<div class="empty">Brak nadchodzących wydarzeń ✨</div>`) + `</div>`;
    this._$('cal-h').onclick = () => this._open('kalendarz');
  }

  _links() {
    let L = [['mdi:floor-plan', 'Plan Mieszkania', 'plan2d', '#cdf2ee', '#35aaa0'], ['mdi:battery-heart-variant', 'Baterie', 'baterie', '#d4f5e2', '#3fb27f'],
      ['mdi:server', 'Serwer', 'serwer', '#d3e8ff', '#5a9be0'], ['mdi:text-box-search-outline', 'Historia', 'dziennik', '#fff3c4', '#d9a521'], ['mdi:cog-outline', 'Ustawienia', 'ustawienia', '#ffd9e6', '#e5719a']];
    if (this._trAvail()) L.splice(L.findIndex((x) => x[2] === 'dziennik') + 1, 0, ['mdi:bus-clock', 'Transport', 'transport', '#d6ecff', '#3a8fd9']);
    const f1live = PC.f1 && PC.f1.on && this._f1Active();   // trwa sesja F1 -> kafelek swieci
    if (PC.f1 && PC.f1.on) L.splice(2, 0, ['mdi:flag-checkered', f1live ? 'F1 na żywo' : 'Formuła 1', 'f1', '#ffe3d1', '#e8794a', f1live]);
    const alOn = ['normal', 'unavailable', 'unknown', undefined].indexOf(this._s(PC.alarm)) < 0 || (PC.alarmSw && this._s(PC.alarmSw) === 'on');
    L = [['mdi:thermometer', 'Klimat', 'klimat', '#ffe0cf', '#f08a5d'],
      ['mdi:play-box-outline', 'Multimedia', 'multimedia', this._rc('#e6dcff'), this._rc('#8f78e0')], [alOn ? 'mdi:bell-ring-outline' : 'mdi:bell-off-outline', alOn ? 'Wyłącz alarm' : 'Alarm', 'a:alarm', '#ffd9e6', '#e5576f', false, alOn]].concat(L);
    this._$('s-links').innerHTML = `<h2><ha-icon icon="mdi:apps"></ha-icon>Skróty</h2><div class="links${L.length > 10 ? ' c6' : ''}">` +
      (() => { const hl = this._lkHide(); if (!this._edit) L = L.filter((l) => !hl.includes(l[2])); return L; })().map((l) => `<button class="lk${l[7] ? ' lkm' : ''}${l[5] ? ' glow' : ''}${l[6] ? ' alarm' : ''}${this._edit && this._lkHide().includes(l[2]) ? ' lkoff' : ''}" data-p="${l[2]}" data-pe="links.${l[2].replace(':', '_')}"><span class="i" style="background:${l[3]};color:${l[4]}"><ha-icon icon="${this._ic('links.' + l[2].replace(':', '_'), l[0])}"></ha-icon></span>${esc(this._lk(l[2], l[1]))}${l[8] > 0 ? `<em class="lkb">${l[8] > 99 ? '99+' : l[8]}</em>` : ''}</button>`).join('') + `</div>`;
    this._$('s-links').querySelectorAll('.lk').forEach((b) => { b.onclick = () => { const p = b.dataset.p;
      if (this._edit) { const hl = this._lkHide(), i = hl.indexOf(p); if (i < 0) hl.push(p); else hl.splice(i, 1); try { localStorage.setItem('pastel_lkhide', JSON.stringify(hl)); } catch (e) { /* ignore */ } this._sig = ''; this._render(); return; }
      if (p === 'a:off') this._call('homeassistant', 'turn_off', {entity_id: PC.lightsOff.filter((e) => this._s(e) === 'on')}); else if (p === 'a:alarm') this._call('script', 'jarvis_reset_alarmow', {}); else this._open(p); }; });
  }

  // wywolanie nasluchu jak w Jarvisie: voice_satellite.wake na satelicie Assist (pomija wake word, od razu STT); satelita zalezy od urzadzenia i uzytkownika
  _portable() { const u = this._hass && this._hass.user; return !!(u && String(u.name || '').toLowerCase() === 'active5'); }   // urzadzenie Portable ma wlasnego satelite, wyciszenie i potok
  // wyciszenie i potok nalezą do satelity biezacego urzadzenia (Tab10, Portable, telefon uzytkownika); gdy encji brak - wartosci z konfiguracji
  _own(dom, suf, dflt) { const e = `${dom}.${this._sat().replace('assist_satellite.', '')}_${suf}`; return this._hass && this._hass.states[e] ? e : dflt; }
  _mute() { return this._own('switch', 'mute', PC.mute); }
  _pipe() { return this._own('select', 'pipeline_1', PC.pipeline); }
  _sat() {
    if (this._portable()) return 'assist_satellite.tablet_mobilny';
    const u = ((this._hass && this._hass.user && this._hass.user.name) || '').toLowerCase();
    if (window.innerWidth >= 900) return 'assist_satellite.tab10';
    return 'assist_satellite.telefon';
  }
  // historia rozmow: zdarzenia voice_satellite_chat (to, co uslyszal asystent + odpowiedz) zapisywane lokalnie (do 60 ostatnich)
  _chatLoad() { try { const a = JSON.parse(localStorage.getItem('pastel_chat') || '[]'); return Array.isArray(a) ? a : []; } catch (e) { return []; } }
  async _subChat() {
    if (this._chatSub || !this._hass || !this._hass.connection) return; this._chatSub = true;
    try { this._unsubChat = await this._hass.connection.subscribeEvents((ev) => { const d = ev.data || {}; if (!d.stt_text && !d.tts_text) return;
      const a = this._chatLoad(); const e = d.entity_id && this._hass.states[d.entity_id];
      a.push({u: d.stt_text || '', a: d.tts_text || '', t: Date.now(), src: e ? (e.attributes.friendly_name || '') : '', tools: (d.tool_calls || []).map((x) => x.display_name || x.name).filter(Boolean)});
      try { localStorage.setItem('pastel_chat', JSON.stringify(a.slice(-60))); } catch (x) { /* ignore */ }
      if (this._view === 'asystent' || this.shadowRoot.getElementById('asp')) { if (this.shadowRoot.getElementById('chlog')) this._askRefresh(); else { this._sig = ''; this.hass = this._hass; } } }, 'voice_satellite_chat'); }
    catch (e) { this._chatSub = false; }
  }
  _listen() { this._call('voice_satellite', 'wake', {entity_id: this._sat()}); }
  // zatrzymanie rozmowy glosowej: integracja voice_satellite anuluje ja po podwojnym dotknieciu (dwa zdarzenia 'touchstart' w 400 ms) - generujemy je, gdy uzytkownik dotknie przycisku asystenta
  _voiceStop() {
    // zatrzymanie rozmowy: bezposrednio przez silnik integracji voice_satellite (ukryty element voice-satellite-card). Zwykle anulowanie z integracji (podwojne dotkniecie) zostawialo potok na „odpowiada”, bo restart potoku czekal na zakonczenie odpowiedzi
    const v = document.querySelector('voice-satellite-card'), ok = (f) => { try { f(); } catch (e) { /* ignore */ } };
    if (!v || !v.pipeline || !v.tts) { const fire = () => document.dispatchEvent(new Event('touchstart', {cancelable: true})); fire(); setTimeout(fire, 80); return; }
    const reset = () => { ok(() => v.tts.stop()); ok(() => v.askQuestion && v.askQuestion.cancel()); ok(() => v.pipeline.clearContinueState()); ok(() => v.chat && v.chat.clear()); ok(() => v.pipeline.resetForResume()); ok(() => v.setState('IDLE')); ok(() => v.pipeline.restart(0)); const sat = this._sat(); if (sat && this._hass) ok(() => this._hass.callWS({type: 'voice_satellite/update_state', entity_id: sat, state: 'IDLE'}).catch(() => {})); };   /* ostatnie zabezpieczenie: wymuszenie stanu IDLE encji satelity (potok bywal „zawieszony” na odpowiada) */
    reset();
    // zabezpieczenie: gdy po 2,5 s encja satelity nadal jest „zajeta”, powtarzamy reset (restart potoku moze czekac na zakonczenie poprzedniego przebiegu)
    clearTimeout(this._vsWd); const wd = (n) => { this._vsWd = setTimeout(() => { const st = this._s(this._sat()); if (['listening', 'processing', 'responding'].includes(st)) { reset(); if (n < 3) wd(n + 1); } }, n === 0 ? 2500 : 4000); }; wd(0);
  }
  // telefon: chowa nakladke integracji voice_satellite (rozmycie, pasek, czat, kulki) - o stanie rozmowy informuje pierscien asystenta w dolnym menu; przycisk startu sesji zostaje
  _vsHide(on) {
    let st = document.getElementById('pastel-vs-hide');
    if (on) { if (!st) { st = document.createElement('style'); st.id = 'pastel-vs-hide'; st.textContent = '#voice-satellite-ui > *:not(.vs-start-btn):not([class*="toast"]), #voice-satellite-ui canvas { display: none !important; pointer-events: none !important; }'; document.head.appendChild(st); } }
    else if (st) st.remove();
  }
  // wlasna skorka nakladki voice_satellite (szeroki ekran): kolory wybranego schematu Aurory, szklane tlo z poswiata, pasek aktywnosci w kolorach schematu
  _vsSkin() {
    let st = document.getElementById('pastel-vs-skin');
    if (!this._au2b || !this._aur()) { if (st) st.remove(); return; }
    const hs = hudSch(), dk = !!this._hudD, A = dk ? hs.a : hs.la, B = dk ? hs.b : hs.lb, C = hs.c;
    const css = `#voice-satellite-ui.vs-dark, #voice-satellite-ui.vs-light { --primary-color: ${A}; --primary-text-color: ${dk ? '#eaf2ff' : '#142033'}; --secondary-text-color: ${A}; --card-background-color: ${dk ? '#0a1220' : '#f4f8fc'}; }
#voice-satellite-ui .vs-blur-overlay { background: radial-gradient(1100px 700px at 12% 8%, ${A}${dk ? '30' : '28'}, transparent 62%), radial-gradient(1000px 700px at 92% 100%, ${B}${dk ? '38' : '2e'}, transparent 62%), ${dk ? 'rgba(6, 11, 22, .86)' : 'rgba(244, 248, 252, .88)'} !important; backdrop-filter: blur(18px) saturate(1.25) !important; -webkit-backdrop-filter: blur(18px) saturate(1.25) !important; }
#voice-satellite-ui .vs-rainbow-bar.vs-rainbow-bar { --ha-c1: ${A}; --ha-c2: ${B}; --ha-c3: ${C}; --ha-c4: ${A}; height: 5px; border-radius: 3px; box-shadow: 0 0 20px ${A}88; }
#voice-satellite-ui .vs-chat-msg { text-shadow: ${dk ? '0 2px 18px rgba(0, 0, 0, .45)' : 'none'}; }
#voice-satellite-ui .vs-chat-msg.assistant, #voice-satellite-ui .vs-chat-msg.announcement { font-weight: 300; letter-spacing: .01em; }
#voice-satellite-ui .vs-chat-msg.user { font-size: calc(24px * var(--vs-text-scale, 1)); letter-spacing: .02em; }
#voice-satellite-ui .vs-start-btn { background: linear-gradient(135deg, ${A}, ${B}) !important; box-shadow: 0 0 18px ${A}88; }`;
    if (!st) { st = document.createElement('style'); st.id = 'pastel-vs-skin'; document.head.appendChild(st); }
    if (st.textContent !== css) st.textContent = css;
  }
  _vsStopWatch() {
    if (this._vsStopH) return;
    this._vsStopH = (e) => {
      if (!this.isConnected || !this._hass) return; const sr = this.shadowRoot, fab = sr && sr.querySelector('#bnav .fab'); if (!fab) return;
      const st = this._s(this._sat()); if (!['listening', 'processing', 'responding'].includes(st)) return;
      if (e.composedPath && e.composedPath().includes(fab)) return;   // dotkniecie samego przycisku obsluguje jego wlasny handler
      const r = fab.getBoundingClientRect(); if (!r.width || e.clientX < r.left - 6 || e.clientX > r.right + 6 || e.clientY < r.top - 6 || e.clientY > r.bottom + 6) return;
      this._voiceStop();
    };
    document.addEventListener('click', this._vsStopH, true); this._vsTouchH = () => { this._lastTouch = Date.now(); }; document.addEventListener('touchstart', this._vsTouchH, {capture: true, passive: true});
  }
  _renderListen() {
    const b = this._$('listen'); if (!b) return; const st = this._s(this._sat());
    const L = {listening: ['Słucham…', 'mdi:microphone'], processing: ['Myślę…', 'mdi:dots-horizontal'], responding: ['Odpowiadam…', 'mdi:volume-high']}[st];
    const lab = L ? L[0] : (!st || st === 'unavailable' ? 'Satelita niedostępny' : 'Dotknij i mów'); const ic = L ? L[1] : 'mdi:microphone-message';
    if (b.dataset.k !== lab) { b.dataset.k = lab; b.classList.toggle('on', !!L); b.innerHTML = `<span class="orbi"><ha-icon icon="${L ? ic : 'mdi:creation'}"></ha-icon></span><span class="orbt">${lab}</span>`; }
  }
  // ===================== widoki podrzedne =====================
  _route() {
    const v = (location.hash || '').replace(/^#/, '') || 'home';
    if (!v.startsWith('szkola')) this._skHold = null;   // znaczniki "nowe" ze Szkoly znikaja po wyjsciu z widoku
    if (v !== this._view) { this._view = v; this._subK = null; this._skF = null; this._fitK = null; this._sig = ''; this._formOpen = false; if (this._built) { this._applyView(); if (this._hass) this.hass = this._hass; } }
    else this._applyView();
  }
  _applyView() {
    const sub = this._view !== 'home'; const $ = this._$; if (!$) return;
    const pv = sub && this._popU(); const sb = $('sub'); sb.classList.toggle('pv', !!pv); this._scrollLock(!!pv); if ($('popbd')) $('popbd').style.display = pv ? '' : 'none';
    sb.style.display = sub ? '' : 'none'; $('home').style.display = sub && !pv ? 'none' : '';
    if (sub && !pv) window.scrollTo && this.scrollIntoView && $('app').scrollIntoView();
  }
  _open(v) { location.hash = v; }
  _back() { if (location.hash) location.hash = ''; else this._route(); }

  _vv(k, d) { const o = this._rvO; if (o && o[k]) return o[k]; const v = ((this._L && this._L.views) || {})[k]; return v || d; }   // globalne warianty wygladu kart (z edytora)
  _hdr(title, icon, c, pe) {
    const p = this._pal(c || 'lav');
    return `<div class="hdr"${pe ? ` data-pe="${pe}"` : ''}><button class="back" id="back"><ha-icon icon="mdi:arrow-left"></ha-icon></button><div class="bub" style="background:${p[0]};color:${p[1]}"><ha-icon icon="${pe ? this._ic(pe, icon) : icon}"></ha-icon></div><div class="ht">${esc(title)}</div><div class="hclk">${this._hclk()}</div></div>`;
  }
  _hdrHome(hd) { return hd.replace('</button><div class="bub"', '</button><button class="back" id="hhome" type="button" title="Ekran główny"><ha-icon icon="mdi:home-outline"></ha-icon></button><div class="bub"'); }   // dodatkowy przycisk: wyjscie na ekran glowny (widoki zagniezdzone)
  _hdrAdd(hd, x) { return hd.replace('<div class="hclk">', x + '<div class="hclk">'); }   // dodatkowe przyciski w naglowku wstawiane PRZED zegarem: zegar zawsze w tym samym miejscu
  _hdrObs() {   // naglowek ma tlo dopiero gdy przykleil sie do gory (przewiniety widok); nieprzewiniety jest przezroczysty
    const hm = this.shadowRoot.querySelector('#sub #hhome'); if (hm) hm.onclick = () => this._back();
    if (this._hoO) this._hoO.disconnect(); const h = this.shadowRoot.querySelector('#sub .hdr'); if (!h || typeof IntersectionObserver === 'undefined') return;
    let sn = h.previousElementSibling; if (!sn || !sn.classList.contains('hsen')) { sn = document.createElement('i'); sn.className = 'hsen'; h.parentNode.insertBefore(sn, h); }
    this._hoO = new IntersectionObserver((en) => { h.classList.toggle('stk', !en[0].isIntersecting); }); this._hoO.observe(sn);
  }
  _hclk() { const d = new Date(); return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0'); }   // zegar w naglowku widokow; jeden licznik odswieza wszystkie
  _hclkTick() { if (this._hcT) return; this._hcT = setInterval(() => { if (!this.isConnected) { clearInterval(this._hcT); this._hcT = 0; return; } const t = this._hclk(); this.shadowRoot.querySelectorAll('.hclk').forEach((e) => { if (e.textContent !== t) e.textContent = t; }); }, 5000); }

  _renderSub() {
    const $ = this._$; const v = this._view; if (this._formOpen) return;
    this._hclkTick(); { const sb = $('sub'); if (sb) sb.dataset.v = v; }
    let html = '', after = null;
    if (v.startsWith('pokoj-')) { const r = PC.rooms.find((x) => x.id === v.slice(6)); if (r) [html, after] = this._vRoom(r); }
    else if (v === 'stan-domu') [html, after] = this._vIssues();
    else if (v === 'zdrowie') [html, after] = this._vHealth();
    else if (v === 'transport') [html, after] = this._vTransport();
    else if (v === 'szkola') { if (!this._skHold) this._skHold = this._skNewD(); this._skSeen(); [html, after] = this._vSchool(); }
    else if (v === 'szkola-wiadomosc') [html, after] = this._vSchoolMsg();
    else if (v === 'szkola-wiadomosci') [html, after] = this._vSchoolInbox();
    else if (v === 'baterie') html = this._vBat();
    else if (v === 'klimat') [html, after] = this._vClimate();
    else if (v === 'powietrze') [html, after] = this._vAir();
    else if (v === 'pogoda') [html, after] = this._vWeather();
    else if (v === 'kalendarz') [html, after] = this._vCal();
    else if (v === 'multimedia') [html, after] = this._vMedia();
    else if (v === 'serwer') [html, after] = this._vServer();
    else if (v === 'dziennik') [html, after] = this._vLog();
    else if (v === 'plan2d') [html, after] = this._vPlan2();
    else if (v === 'f1' || v === 'f1live') [html, after] = this._vF1();
    else if (v === 'asystent') [html, after] = this._vAsk();
    else if (v === 'radio') {
      const sub = $('sub'); let host = sub.querySelector('#radiohost');
      if (!host) { sub.innerHTML = this._hdr('Radio', 'mdi:radio', 'mint') + (this._radioAvail() ? '<div id="radiohost"></div>' : '<div class="empty">Integracja „Radio RMF ON i ZET” nie jest dostępna.</div>'); const b = sub.querySelector('#back'); if (b) b.onclick = () => this._back(); host = sub.querySelector('#radiohost'); this._hdrObs(); }
      if (host) this._radioMount(host); return;
    }
    else if (v === 'ustawienia') [html, after] = this._vSettings();
    else html = this._hdr('Nie znaleziono', 'mdi:help-circle-outline') + '<div class="empty">Brak takiego widoku</div>';
    if (v === 'f1' || v === 'f1live') {   // gorna czesc, lista i dol odswiezane; mapa toru (#f1r) zostaje nietknieta
      const sub = $('sub'), keepF = sub.scrollTop; const p1 = html.split('<!--R-->'), p2 = (p1[1] || '').split('<!--M-->');
      if (!sub.querySelector('.f1wrap')) sub.innerHTML = '<div class="f1wrap"><div id="f1t"></div><div class="f1row" id="f1row"><div id="f1c"></div><div id="f1r"></div></div><div id="f1rp"></div><div id="f1b"></div></div>';
      sub.querySelector('#f1t').innerHTML = p1[0]; sub.querySelector('#f1b').innerHTML = p2[1] || '';
      const fc = sub.querySelector('#f1c'); if (!fc._sc) { fc._sc = 1; fc.addEventListener('scroll', () => { this._f1sa = Date.now(); }, true); }
      if (Date.now() - (this._f1sa || 0) > 2500 || !fc.firstChild) { const cd = fc.firstElementChild, top = cd ? cd.scrollTop : 0; fc.innerHTML = p2[0]; if (fc.firstElementChild) fc.firstElementChild.scrollTop = top; }   // lista nie odswieza sie w trakcie przewijania i zachowuje pozycje
      const bf = sub.querySelector('#back'); if (bf) bf.onclick = () => this._back();
      const live = !!p2[0]; sub.querySelector('#f1row').style.display = live ? '' : 'none'; const r = sub.querySelector('#f1r');
      if (live) this._f1MapSync(r); else r.innerHTML = '';
      this._rpMount(sub.querySelector('#f1rp'));
      if (after) after(sub); sub.scrollTop = keepF; this._hdrObs(); return;
    }
    // widoki tylko do odczytu: identyczny HTML nie jest wstawiany ponownie (slaby tablet); ramka wydajnosci (#pfbox) odswieza sie osobno
    const sk = html.replace(/(id="pfbox">)[\s\S]*$/, '$1');
    if (/^(plan2d|serwer|baterie|klimat|stan-domu|powietrze|dziennik|pogoda|pokoj-|zdrowie|szkola-wiadomosci$)/.test(v) && this._subK === sk && $('sub').firstChild) { this._subSk = (this._subSk || 0) + 1; return; }
    this._subK = sk;
    const keep = $('sub').scrollTop; $('sub').innerHTML = html;
    const b = $('sub').querySelector('#back'); if (b) b.onclick = () => this._back();
    $('sub').querySelectorAll('.dev[data-e]').forEach((el) => this._bindDev(el)); this._bindAtg($('sub'));
    $('sub').querySelectorAll('.dev[data-mi]').forEach((b) => { b.onclick = () => { if (b.dataset.mi) this._more(b.dataset.mi); }; });
    if (after) after($('sub')); $('sub').scrollTop = keep; this._hdrObs();
  }
  _bindDev(b) {   // dotkniecie = przelacz; przytrzymanie = szczegoly; przeciagniecie w bok po wlaczonej lampie z jasnoscia (data-br) = jasnosc
    let tm = null, long = false, drag = false, x0 = 0, pct = 0;
    b.onpointerdown = (ev) => { long = false; drag = false; x0 = ev.clientX; tm = setTimeout(() => { long = true; this._more(b.dataset.e); }, 550); };
    b.onpointermove = (ev) => { if (!b.dataset.br) return;
      if (!drag && Math.abs(ev.clientX - x0) > 10) { drag = true; clearTimeout(tm); try { b.setPointerCapture(ev.pointerId); } catch (e) { /* ignore */ } }
      if (drag) { const r = b.getBoundingClientRect(); pct = Math.max(1, Math.min(100, Math.round((ev.clientX - r.left) / r.width * 100)));
        b.style.background = `linear-gradient(90deg,${b.dataset.p0} ${pct}%,color-mix(in srgb,${b.dataset.p0} 45%,#fff) ${pct}%)`; const bp = b.querySelector('.bp'); if (bp) bp.textContent = pct + '%'; } };
    b.onpointerup = () => { clearTimeout(tm); if (drag) this._call('light', 'turn_on', {entity_id: b.dataset.e, brightness_pct: pct}); };
    b.onpointerleave = b.onpointercancel = () => clearTimeout(tm);
    b.onclick = () => { if (!long && !drag) this._call('homeassistant', 'toggle', {entity_id: b.dataset.e}); };
    b.oncontextmenu = (e) => e.preventDefault();
  }

  // ---- historia i wykres ----
  _hist(ids, hours) {
    const key = ids.join(',') + '|' + hours; const c = (this._hc = this._hc || {}); const e = c[key];
    if (e && (e.d || e.p) && Date.now() - e.t < 300000) return e.d;
    if (e && e.p) return e.d || null;
    c[key] = {t: Date.now(), p: true, d: e ? e.d : null};
    const a = new Date(Date.now() - hours * 3600000), z = new Date();
    this._hass.callApi('GET', 'history/period/' + a.toISOString() + '?filter_entity_id=' + ids.join(',') + '&end_time=' + encodeURIComponent(z.toISOString()) + '&minimal_response&no_attributes')
      .then((res) => { c[key] = {t: Date.now(), p: false, d: res || []}; })
      .catch(() => { c[key] = {t: Date.now(), p: false, d: []}; })
      .then(() => { if (this._view !== 'home' && !this._formOpen) this._renderSub(); });
    return c[key].d;
  }
  _series(arr) { return (arr || []).map((x) => [new Date(x.last_changed || x.last_updated).getTime(), parseFloat(x.state)]).filter((x) => !isNaN(x[1]) && !isNaN(x[0])); }
  _chart(pts, color, unit, hours, fixed) {
    if (pts && pts.length > 110) { const n = 96, t0 = Date.now() - hours * 3600000, w = (Date.now() - t0) / n, b = Array.from({length: n}, () => []); pts.forEach((p) => { const i = Math.min(n - 1, Math.max(0, Math.floor((p[0] - t0) / w))); b[i].push(p[1]); });
      pts = b.map((v, i) => v.length ? [t0 + (i + .5) * w, v.reduce((x, y) => x + y, 0) / v.length] : null).filter(Boolean); }
    if (!pts || pts.length < 2) return `<div class="empty">${pts ? 'Za mało danych do wykresu' : 'Wczytuję wykres…'}</div>`;
    const t0 = Date.now() - hours * 3600000, t1 = Date.now(); const W = 320, H = 120, pl = this._aun ? 38 : 34, pr = 6, pt = 10, pb = 18;   // pl: miejsce na skale pionowa
    let mn = Math.min(...pts.map((p) => p[1])), mx = Math.max(...pts.map((p) => p[1])); if (mx - mn < 1) { mn -= .5; mx += .5; }
    const X = (t) => pl + (Math.max(t, t0) - t0) / (t1 - t0) * (W - pl - pr), Y = (v) => pt + (1 - (v - mn) / (mx - mn)) * (H - pt - pb);
    let d = ''; pts.forEach((p, i) => { d += (i ? ' L' : 'M') + X(p[0]).toFixed(1) + ' ' + Y(p[1]).toFixed(1); });
    d += ' L' + X(t1).toFixed(1) + ' ' + Y(pts[pts.length - 1][1]).toFixed(1);
    const area = d + ` L${X(t1).toFixed(1)} ${H - pb} L${X(pts[0][0]).toFixed(1)} ${H - pb} Z`; const id = 'g' + Math.random().toString(36).slice(2, 7);
    const cv = this._vv('chart', 'Obszar'), ln = `<path d="${d}" fill="none" stroke="${color}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`;
    let body = `<path d="${area}" fill="url(#${id})"/>` + ln;
    if (cv === 'Linia') body = ln;
    else if (cv === 'Słupki') { const bw = Math.max(1.4, (W - pl - pr) / pts.length * .72); body = pts.map((p) => `<rect x="${(X(p[0]) - bw / 2).toFixed(1)}" y="${Y(p[1]).toFixed(1)}" width="${bw.toFixed(1)}" height="${Math.max(1, H - pb - Y(p[1])).toFixed(1)}" rx="1.2" fill="${color}" opacity=".78"/>`).join(''); }
    else if (cv === 'Schodkowy') { let sd = ''; pts.forEach((p, i) => { sd += (i ? ' H' + X(p[0]).toFixed(1) + ' V' : 'M' + X(p[0]).toFixed(1) + ' ') + Y(p[1]).toFixed(1); }); sd += ' H' + X(t1).toFixed(1); body = `<path d="${sd}" fill="none" stroke="${color}" stroke-width="2.4" stroke-linejoin="round"/>`; }
    const lbl = (h) => { const t = new Date(t1 - h * 3600000); return hours > 36 ? t.getDate() + '.' + String(t.getMonth() + 1).padStart(2, '0') : String(t.getHours()).padStart(2, '0') + ':00'; };
    const f = (v) => v.toFixed(fixed == null ? 1 : fixed).replace('.', ',');
    const fd = Math.max(fixed == null ? 1 : fixed, mx - mn < 3 ? 1 : 0), ft = (v) => v.toFixed(fd).replace('.', ',');   // skala pionowa: 3 podzialki (min, srodek, max)
    const ticks = [mn, (mn + mx) / 2, mx].map((v) => `<line x1="${pl}" x2="${W - pr}" y1="${Y(v).toFixed(1)}" y2="${Y(v).toFixed(1)}" class="gl"/><text x="${pl - 4}" y="${(Y(v) + 2.8).toFixed(1)}" class="ax" text-anchor="end">${ft(v)}</text>`).join('');
    return `<svg viewBox="0 0 ${W} ${H}" class="chart"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${color}" stop-opacity=".38"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></linearGradient></defs>
      ${ticks}${body}
      <text x="${pl}" y="${H - 4}" class="ax">${lbl(hours)}</text><text x="${W / 2}" y="${H - 4}" class="ax" text-anchor="middle">${lbl(hours / 2)}</text><text x="${W - pr}" y="${H - 4}" class="ax" text-anchor="end">teraz</text></svg>
      <div class="mm"><span>min <b>${f(mn)}${unit}</b></span><span>max <b>${f(mx)}${unit}</b></span><span>teraz <b>${f(pts[pts.length - 1][1])}${unit}</b></span></div>`;
  }

  // ---- pokoj ----
  _vRoom(r) {
    const V = r.view || {}; this._rvO = V;   // ustawienia widoku tego pokoju (kolejnosc blokow, ukryte, kolumny, warianty) nadpisuja globalne
    const p = this._pal(r.c); const on = r.occ && this._s(r.occ) === 'on'; const t = r.t ? this._n(r.t) : null, h = r.h ? this._n(r.h) : null, lx = r.lux ? this._n(r.lux) : null;
    const ids = [r.t, r.h].filter(Boolean); const H = ids.length ? this._hist(ids, 24) : [];
    const sT = H && r.t ? this._series(H[0]) : null, sH = H && r.h ? this._series(H[ids.indexOf(r.h)]) : null;
    const big = [], th = this._th();
    if (t !== null) big.push(['t', `<div class="big ${t > th.tMax + 4 || t < th.tMin - 3 ? 'bad' : t > th.tMax || t < th.tMin ? 'warn' : ''}" data-bt="t" data-pe="rv.bigT"><span>Temperatura</span><b>${t.toFixed(1).replace('.', ',')}<small>°C</small></b></div>`]);
    if (h !== null) big.push(['h', `<div class="big ${h > th.hMax + 10 || h < th.hMin - 10 ? 'bad' : h > th.hMax || h < th.hMin ? 'warn' : ''}" data-bt="h" data-pe="rv.bigH"><span>Wilgotność</span><b>${Math.round(h)}<small>%</small></b></div>`]);
    if (lx !== null) big.push(['l', `<div class="big" data-bt="l" data-pe="rv.bigL"><span>Natężenie światła</span><b>${Math.round(lx)}<small> lx</small></b></div>`]);
    const bo = V.bo || []; big.sort((a, b) => { const x = bo.indexOf(a[0]), y = bo.indexOf(b[0]); return (x < 0 ? 9 : x) - (y < 0 ? 9 : y); });
    let extra = '';
    const sts = [], bad = 'background:#ffdde3;color:#b8324f';   // pralka i czujniki jako przyciski w ksztalcie wlacznikow swiatel
    if (r.door) { const o = this._s(r.door) === 'on'; sts.push([r.door, o ? 'mdi:door-open' : 'mdi:door-closed', 'Drzwi wejściowe', o ? 'otwarte' : 'zamknięte', o ? 'background:#fff0c2;color:#8f6a00' : '', o]); }
    if (r.wash) { const ws = this._s(PC.wash.status); const run = ws && !PC.wash.idle.includes(ws); const end = ws === 'end';
      sts.push([PC.wash.status, 'mdi:washing-machine', 'Pralka', end ? 'Pranie zakończone' : run ? (PC.wash.phase[ws] || 'pracuje').toLowerCase() + this._washLeft() : 'nie pracuje', run ? `background:${p[0]};color:${p[1]}` : end ? 'background:#d4f5e2;color:#2f9d6c' : '', run || end]); }
    if (r.id === 'kuchnia') { for (const [e, nm, ic] of [[PC.gas, 'Czujnik gazu', 'mdi:gas-cylinder'], [PC.floodK, 'Czujnik zalania', 'mdi:water-alert']]) { const o = this._s(e) === 'on';
      sts.push([e, ic, nm, o ? 'ALARM!' : this._s(e) === 'unavailable' ? 'brak łączności' : 'w normie', o ? bad : '', o]); } }
    if (r.leak) { const o = this._s(r.leak) === 'on'; sts.push([r.leak, 'mdi:water-alert', 'Czujnik zalania', o ? 'ALARM!' : 'w normie', o ? bad : '', o]); }
    if (sts.length) extra += `<div class="dgrid${{'Lista': ' v-l', 'Przełączniki': ' v-s', 'Suwaki': ' v-r'}[this._vv('dev', 'Kafelki')] || ''}" style="margin-top:10px">` + sts.map((q) => `<div class="dcard"><button class="dev st${q[5] ? ' on' : ''}" data-mi="${q[0]}" style="${q[4]}"><ha-icon icon="${q[1]}"></ha-icon><span>${q[2]}</span><em>${esc(q[3])}</em></button></div>`).join('') + `</div>`;
    const gids = (r.secs || []).map((g) => g.id), mkd = (grp) => r.dev.map((d, di) => { if (d[3] && d[3].hide) return ''; if (((d[3] && d[3].g && gids.includes(d[3].g)) ? d[3].g : '') !== grp) return ''; const st = this._s(d[0]); const o = ['on', 'open', 'playing', 'buffering'].includes(st); const a = (this._hass.states[d[0]] || {}).attributes || {};
      const pc = (d[0].startsWith('light.') && o && a.brightness != null) ? Math.max(1, Math.round(a.brightness / 2.55)) : null;
      const bg = pc !== null ? `background:linear-gradient(90deg,${p[0]} ${pc}%,color-mix(in srgb,${p[0]} 45%,#fff) ${pc}%);color:${p[1]}` : o ? `background:${p[0]};color:${p[1]}` : '';
      return `<div class="dcard" data-di="${di}"${d[3] && d[3].w === 2 ? ' style="grid-column:span 2"' : ''}><button class="dev ${o ? 'on' : ''}" data-e="${d[0]}" ${pc !== null ? `data-br="${pc}" data-p0="${p[0]}"` : ''} style="${bg}${st === 'unavailable' ? ';opacity:.45' : ''}"><ha-icon icon="${d[2]}"></ha-icon><span>${esc(d[1])}</span>${pc !== null ? `<b class="bp">${pc}%</b>` : ''}<em>${st === 'unavailable' ? 'niedostępne' : d[0].startsWith('media_player.') && o && a.media_title ? `<span class="mq"><i>${esc(a.media_title)}</i></span>` : o ? 'włączone' : 'wyłączone'}</em></button></div>`; }).join('');
    const devs = mkd('');
    const hd = this._hdr(r.name, r.icon, r.c, 'rv.hdr');
    const pv = !!(this._config && this._config.preview);   // tylko w podgladzie edytora: kafelek „Dodaj urzadzenie”
    const dvv = this._vv('dev', 'Kafelki'), DV = {'Lista': ' v-l', 'Przełączniki': ' v-s', 'Suwaki': ' v-r'}[dvv] || '';
    const blocks = {
      occ: r.occ ? `<div class="pillrow" data-blk="occ" data-pe="rv.occ"><span class="pill ${on ? 'on' : ''}"><i></i>${on ? 'Ktoś jest w pokoju' : 'Pusto'}</span></div>` : '',
      big: big.length ? `<div class="bigs${this._vv('big', 'Duże kafle') === 'Kompakt' ? ' v-k' : ''}" data-blk="big" data-pe="rv.big">${big.map((x) => x[1]).join('')}</div>` : '',
      extra: `<div data-blk="extra" data-pe="rv.extra">${extra}</div>`,
      dev: (!devs && !pv && !r.msg) ? '' : `<div data-blk="dev" data-pe="rv.dev"><h2>Urządzenia</h2><div class="dgrid${DV}"${V.cols ? ` style="--dc:${+V.cols}"` : ''}>${devs}${this._msgTile(r)}${pv ? '<div class="dcard add"><button class="dev" data-add="1" style="border:2px dashed currentColor;background:transparent;justify-content:center;opacity:.8"><ha-icon icon="mdi:plus"></ha-icon><span>Dodaj urządzenie</span></button></div>' : ''}</div></div>`,
      ...Object.fromEntries((r.secs || []).map((g) => { const gd = mkd(g.id); return [g.id, (!gd && !pv) ? '' : `<div data-blk="${g.id}" data-pe="rv.g.${g.id}"><h2>${esc(g.t || 'Sekcja')}</h2><div class="dgrid${DV}"${V.cols ? ` style="--dc:${+V.cols}"` : ''}>${gd}</div></div>`]; })),
      chart: `<div class="twoc" data-blk="chart">` + (sT && sT.length > 1 ? `<div data-pe="rv.chartT"><h2>Temperatura · 24 h</h2><div class="card chartc">${this._chart(sT, '#f2845c', '°', 24)}</div></div>` : '') +
        (sH && sH.length > 1 ? `<div data-pe="rv.chartH"><h2>Wilgotność · 24 h</h2><div class="card chartc">${this._chart(sH, '#5a9be0', '%', 24, 0)}</div></div>` : (ids.length && !H ? '<div class="empty">Wczytuję wykresy…</div>' : '')) + `</div>`
    };
    const ORD = ['occ', 'big', 'extra', 'dev'].concat(gids, ['chart']), order = (V.order || []).filter((k) => ORD.includes(k)); ORD.forEach((k) => { if (!order.includes(k)) order.push(k); });
    const html = this._hdrAdd(hd, this._atg(r, p)) + `<div class="roomv" data-room="${esc(r.id)}"></div>` + (() => { const vis = order.filter((k) => !(V.hide || []).includes(k)), bw = V.bw || {};
      return Object.keys(bw).length ? `<div class="rvg">` + vis.map((k) => blocks[k] ? `<div class="rvb" style="grid-column:span ${[3, 4, 6, 8, 9].includes(bw[k]) ? bw[k] : 12}">${blocks[k]}</div>` : '').join('') + `</div>` : vis.map((k) => blocks[k]).join(''); })();
    this._rvO = null;
    return [html, null];
  }

  // ---- stan domu ----
  _vIssues() {
    const iss = this._issues(); const real = iss.filter((i) => i.sev >= 1); const info = iss.filter((i) => i.sev === 0);
    const row = (i) => this._issRow(i, i.cat + i.text);
    return [this._hdr('Alarmy i ostrzeżenia', 'mdi:shield-home-outline', 'mint', 'stan.hdr') + `<div class="card status" data-pe="stan.list">` +
      (real.length ? real.map(row).join('') : `<div class="ok"><div class="b"><ha-icon icon="mdi:check-bold"></ha-icon></div><div>Wszystko w porządku<small>Brak alarmów i ostrzeżeń</small></div></div>`) + `</div>` +
      (info.length ? `<div data-pe="stan.info" style="display:contents"><h2>Informacje</h2><div class="card status">${info.map(row).join('')}</div></div>` : '') +
      `<div class="foot" data-pe="stan.foot">Sprawdzono ${String(new Date().getHours()).padStart(2, '0')}:${String(new Date().getMinutes()).padStart(2, '0')} · ${PC.bats.length} baterii, ${PC.offline.length} urządzeń pod kontrolą</div>`, (root) => this._bindIss(root)];
  }

  // ---- baterie ----
  // ---- szkola (integracja vulcan_dom / eduVULCAN): uczniowie wykrywani po encjach sensor.szkola_<uczen>_oceny; kafelek w Skrotach tylko gdy sa ----
  _skS() {
    const t = Date.now(); if (this._skC && t - this._skC.t < 30000) return this._skC.v;
    const st = this._hass ? this._hass.states : {}, v = [];
    for (const e of Object.keys(st)) { const m = /^sensor\.szkola_(.+)_oceny$/.exec(e); if (m) v.push({k: m[1], nm: String(st[e].attributes.friendly_name || m[1]).replace(/\s*Oceny\s*$/i, '')}); }
    this._skC = {t, v}; return v;
  }
  _skE(k, x) { return 'sensor.szkola_' + k + '_' + x; }
  // nowosci ze szkoly: nieprzeczytane wiadomosci + nieobecnosci do usprawiedliwienia (wartosci bezwzgledne) oraz przyrost uwag / zmian w planie / sprawdzianow / nowa ocena od ostatniego otwarcia widoku Szkola (zapamietane w tej przegladarce)
  _skSnap() { const st = this._hass ? this._hass.states : {}, o = {}; this._skS().forEach((q) => { const g = (x) => { const e = st[this._skE(q.k, x)]; return e ? e.state : ''; }, n = (x) => { const v = parseInt(g(x), 10); return isNaN(v) ? 0 : v; }; o[q.k] = {u: n('nieprzeczytane_wiadomosci'), j: n('do_usprawiedliwienia'), n: n('uwagi'), z: n('zmiany_w_planie_7_dni'), e: n('sprawdziany_w_7_dni'), g: g('ostatnia_ocena')}; }); return o; }
  _skNew() {
    if (!this._hass) return 0; let seen = null; try { seen = JSON.parse(localStorage.getItem('pastel_sk_seen') || 'null'); } catch (e) { seen = null; }
    const cur = this._skSnap(); let cnt = 0, ch = false; seen = seen || {};
    Object.keys(cur).forEach((k) => { const c = cur[k], b = seen[k]; cnt += c.u + c.j;
      if (!b) { seen[k] = Object.assign({}, c); ch = true; return; }
      ['n', 'z', 'e'].forEach((f) => { if (c[f] > b[f]) cnt += c[f] - b[f]; else if (c[f] < b[f]) { b[f] = c[f]; ch = true; } });
      if (c.g && c.g !== b.g && b.g) cnt += 1; else if (!b.g && c.g) { b.g = c.g; ch = true; } });
    if (ch) { try { localStorage.setItem('pastel_sk_seen', JSON.stringify(seen)); } catch (e) { /* ignore */ } }
    return cnt;
  }
  // co nowego ucznia od ostatniego otwarcia widoku Szkola: {u: nieprzeczytane wiadomosci, j: do usprawiedliwienia, n/z/e: przyrost uwag / zmian w planie / sprawdzianow, g: nowa ocena}
  _skNewD() {
    let seen = null; try { seen = JSON.parse(localStorage.getItem('pastel_sk_seen') || 'null'); } catch (e) { seen = null; } seen = seen || {}; const cur = this._skSnap(), out = {};
    Object.keys(cur).forEach((k) => { const c = cur[k], b = seen[k] || c; out[k] = {u: c.u, j: c.j, n: Math.max(0, c.n - b.n), z: Math.max(0, c.z - b.z), e: Math.max(0, c.e - b.e), g: !!(c.g && b.g && c.g !== b.g)}; });
    return out;
  }
  _skSeen() { try { localStorage.setItem('pastel_sk_seen', JSON.stringify(this._skSnap())); } catch (e) { /* ignore */ } this._skNv = 0; }
  // ---- transport (integracja ztm_gzm: polaczenia tramwajow i autobusow GZM; zapisane trasy = czujniki z atrybutem connections) ----
  _trAvail() { return !!(this._hass && this._hass.services && this._hass.services.ztm_gzm); }
  _trRoutes() { const st = this._hass.states; return Object.keys(st).filter((e) => e.startsWith('sensor.') && Array.isArray(st[e].attributes.connections) && st[e].attributes.from).map((e) => st[e]); }
  _trIc(t) { return t === 'tramwaj' ? 'mdi:tram' : t === 'trolejbus' ? 'mdi:bus-electric' : t === 'pociąg' ? 'mdi:train' : 'mdi:bus'; }
  _trConn(c) {
    const n = new Date(), today = n.getFullYear() + '-' + String(n.getMonth() + 1).padStart(2, '0') + '-' + String(n.getDate()).padStart(2, '0'), day = c.depart.slice(0, 10);
    const legs = c.legs.map((l) => `<div class="trl"><ha-icon icon="${this._trIc(l.type)}"></ha-icon><b>${esc(l.line)}</b><span>${esc(l.depart)} ${esc(l.from)} → ${esc(l.to)} ${esc(l.arrive)}</span>${l.delay_dep_min ? `<em class="${l.delay_dep_min > 0 ? 'late' : 'early'}">${l.delay_dep_min > 0 ? '+' : ''}${l.delay_dep_min} min</em>` : ''}</div>`).join('');
    return `<div class="trc"><div class="trt"><b>${c.depart.slice(11, 16)} → ${c.arrive.slice(11, 16)}</b><small>${c.duration_min} min · ${c.transfers ? c.transfers + ' przesiadka' : 'bezpośrednio'}${day !== today ? ' · ' + day.slice(8) + '.' + day.slice(5, 7) : ''}</small></div>${legs}</div>`;
  }
  _vTransport() {
    const hd = this._hdr('Transport', 'mdi:bus-clock', 'sky', 'tr.hdr');
    if (!this._trAvail()) return [hd + '<div class="card" data-pe="tr.routes"><div class="foot" style="text-align:left;font-size:14px">Integracja ZTM GZM nie jest jeszcze dodana (albo nie ma w niej żadnego połączenia). Dodaj ją w Ustawienia → Urządzenia i usługi → Dodaj integrację → „ZTM GZM”: wybierz przystanek początkowy i docelowy, a tu pojawią się odjazdy na żywo i wyszukiwarka połączeń.</div></div>', null];
    const T = this._trS = this._trS || {fromC: '', from: '', toC: '', to: '', tr: '1', when: '', res: null, busy: false, err: ''}, routes = this._trRoutes();
    const rh = routes.length ? routes.map((r) => { const a = r.attributes; return `<h2 data-pe="tr.routes">${esc(a.from)} → ${esc(a.to)}</h2><div class="card list" data-pe="tr.routes">` + (a.connections.length ? a.connections.map((c) => this._trConn(c)).join('') : '<div class="empty">Brak połączeń w najbliższych godzinach</div>') + '</div>'; }).join('')
      : '<div class="card" data-pe="tr.routes" style="padding:14px 16px"><div class="foot" style="text-align:left">Brak zapisanych połączeń. Dodaj je w Ustawienia → Urządzenia i usługi → ZTM GZM.</div></div>';
    const res = T.busy ? '<div class="empty">Szukam…</div>' : T.err ? `<div class="foot" style="color:#e5576f;text-align:left">${esc(T.err)}</div>` : T.res ? (T.res.connections.length ? `<div class="foot" style="text-align:left;margin:10px 0 2px">${esc(T.res.from)} → ${esc(T.res.to)}</div>` + T.res.connections.map((c) => this._trConn(c)).join('') : '<div class="empty">Brak połączeń w najbliższych godzinach</div>') : '';
    const form = `<h2 data-pe="tr.search" style="margin-top:22px">Wyszukaj połączenie</h2><div class="card" data-pe="tr.search" style="padding:14px 16px"><div class="foot" style="text-align:left;margin:0 0 4px">Skąd</div><div class="trg"><div class="inp"><input id="trfc" list="trc" placeholder="Miasto" value="${esc(T.fromC)}" autocomplete="off"></div><div class="inp"><input id="trf" list="trlf" placeholder="Przystanek (np. Muzeum Sztygarka)" value="${esc(T.from)}" autocomplete="off"></div></div>
      <div class="foot" style="text-align:left;margin:10px 0 4px">Dokąd</div><div class="trg"><div class="inp"><input id="trtc" list="trc" placeholder="Miasto" value="${esc(T.toC)}" autocomplete="off"></div><div class="inp"><input id="trt" list="trlt" placeholder="Przystanek (np. Dworzec PKP)" value="${esc(T.to)}" autocomplete="off"></div></div>
      <datalist id="trc">${(this._trCities || []).map((x) => `<option value="${esc(x)}">`).join('')}</datalist><datalist id="trlf"></datalist><datalist id="trlt"></datalist>
      <div class="seg" style="margin-top:10px"><button data-trx="0" class="${T.tr === '0' ? 'act' : ''}">Bezpośrednio</button><button data-trx="1" class="${T.tr === '1' ? 'act' : ''}">Do 1 przesiadki</button></div>
      <div class="inp" style="margin-top:8px;align-items:center"><span style="font-size:12.5px;font-weight:700;opacity:.7;white-space:nowrap">Od godziny</span><input id="trw" type="time" value="${esc(T.when)}" style="max-width:130px"><span style="flex:1"></span><button class="dev" id="trsw" style="flex:none;width:auto" title="Zamień przystanki"><ha-icon icon="mdi:swap-vertical"></ha-icon></button><button class="dev on" id="trgo" style="flex:none;width:auto"><ha-icon icon="mdi:magnify"></ha-icon><span>Szukaj</span></button></div>${res}</div>`;
    return [hd + rh + form, (root) => {
      const q = (id) => root.querySelector('#' + id); let tm = 0;
      const sg = async (inp, cin, dl) => { const v = inp.value.trim(), c = cin.value.trim(); if (v.length < 2 && !c) return; try { const r = await this._hass.callWS({type: 'call_service', domain: 'ztm_gzm', service: 'search_stops', service_data: Object.assign({query: v}, c ? {city: c} : {}), return_response: true}); const l = q(dl); if (l) l.innerHTML = ((r && r.response && r.response.stops) || []).map((x) => `<option value="${esc(x)}">`).join(''); } catch (e) { /* usluga niedostepna */ } };
      [['trf', 'trfc', 'trlf', 'from', 'fromC'], ['trt', 'trtc', 'trlt', 'to', 'toC']].forEach(([id, cid, dl, k, ck]) => { const i = q(id), ci = q(cid); if (!i || !ci) return;
        [i, ci].forEach((e) => { e.onfocus = () => { this._formOpen = true; if (e === i && !i.value) sg(i, ci, dl); }; e.onblur = () => { this._formOpen = false; }; });
        i.oninput = () => { T[k] = i.value; clearTimeout(tm); tm = setTimeout(() => sg(i, ci, dl), 250); };
        ci.oninput = () => { T[ck] = ci.value; i.value = ''; T[k] = ''; clearTimeout(tm); tm = setTimeout(() => sg(i, ci, dl), 250); }; });
      if (!this._trCities) { this._trCities = []; this._hass.callWS({type: 'call_service', domain: 'ztm_gzm', service: 'list_cities', return_response: true}).then((r) => { this._trCities = (r && r.response && r.response.cities) || []; const l = q('trc'); if (l) l.innerHTML = this._trCities.map((x) => `<option value="${esc(x)}">`).join(''); }).catch(() => { this._trCities = null; }); }
      const w = q('trw'); if (w) { w.oninput = () => { T.when = w.value; }; w.onfocus = () => { this._formOpen = true; }; w.onblur = () => { this._formOpen = false; }; }
      root.querySelectorAll('[data-trx]').forEach((b) => { b.onclick = () => { T.tr = b.dataset.trx; this._formOpen = false; this._renderSub(); }; });
      const sw = q('trsw'); if (sw) sw.onclick = () => { let x = T.from; T.from = T.to; T.to = x; x = T.fromC; T.fromC = T.toC; T.toC = x; this._formOpen = false; this._renderSub(); };
      const go = q('trgo'); if (go) go.onclick = async () => {
        if (!T.from.trim() || !T.to.trim()) { T.err = 'Podaj przystanek początkowy i docelowy'; T.res = null; this._formOpen = false; this._renderSub(); return; }
        T.busy = true; T.err = ''; this._formOpen = false; this._renderSub();
        const d = Object.assign({from_stop: T.from.trim(), to_stop: T.to.trim(), max_transfers: +T.tr, count: 8}, T.fromC.trim() ? {from_city: T.fromC.trim()} : {}, T.toC.trim() ? {to_city: T.toC.trim()} : {}); if (T.when) { const n = new Date(); d.when = n.getFullYear() + '-' + String(n.getMonth() + 1).padStart(2, '0') + '-' + String(n.getDate()).padStart(2, '0') + ' ' + T.when + ':00'; }
        try { const r = await this._hass.callWS({type: 'call_service', domain: 'ztm_gzm', service: 'search_connections', service_data: d, return_response: true}); T.res = r && r.response; T.err = T.res ? '' : 'Brak odpowiedzi'; } catch (e) { T.res = null; T.err = (e && e.message) || 'Nie udało się wyszukać połączeń'; }
        T.busy = false; this._renderSub(); }; }];
  }
  async _skLoad(k, force) {
    this._skCal = this._skCal || {}; const c = this._skCal[k]; if (c && c.busy) return; if (!force && c && Date.now() - c.t < 300000) return;
    this._skCal[k] = Object.assign({plan: [], duty: [], t: 0}, c, {busy: true});
    const d0 = new Date(); d0.setHours(0, 0, 0, 0); const d1 = new Date(d0.getTime() + 14 * 86400000), d2 = new Date(d0.getTime() + 60 * 86400000);
    const get = async (cal, a, b) => { try { const res = await this._hass.callApi('GET', 'calendars/' + cal + '?start=' + encodeURIComponent(a.toISOString()) + '&end=' + encodeURIComponent(b.toISOString()));
      return (res || []).map((ev) => { const ad = !!(ev.start && ev.start.date); const s = ad ? new Date(ev.start.date + 'T00:00:00') : new Date(ev.start.dateTime); let e = ad ? new Date(ev.end.date + 'T00:00:00') : new Date(ev.end.dateTime); if (ad) e = new Date(e.getTime() - 1); return {t: ev.summary || '', s, e, ad, loc: ev.location || '', desc: ev.description || ''}; }).sort((x, y) => x.s - y.s); } catch (e) { return null; } };
    const [plan, duty] = await Promise.all([get('calendar.szkola_' + k + '_plan_lekcji', d0, d1), get('calendar.szkola_' + k + '_sprawdziany_i_zadania', d0, d2)]);
    const o = this._skCal[k]; this._skCal[k] = {t: Date.now(), busy: false, plan: plan || o.plan, duty: duty || o.duty};
    if (this._view === 'szkola' && !this._formOpen) this._renderSub(); else if (this._built && this._$ && this._$('s-school')) this._school();
  }
  // tresc wiadomosci z dziennika jest w HTML (<p>, <strong>, <br>, listy) - zamieniamy na zwykly tekst z zachowaniem akapitow
  _skTxt(h) {
    let x = String(h || '').replace(/<(script|style)[\s\S]*?<\/\1>/gi, '').replace(/<\s*br\s*\/?>/gi, '\n').replace(/<\/(p|div|h[1-6]|tr|ul|ol)\s*>/gi, '\n').replace(/<li[^>]*>/gi, '• ').replace(/<\/li\s*>/gi, '\n');
    try { x = new DOMParser().parseFromString(x, 'text/html').documentElement.textContent || ''; } catch (e) { x = x.replace(/<[^>]*>/g, ''); }
    return x.replace(/\u00a0/g, ' ').replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
  }
  async _skMsgs(s) {
    this._skM = this._skM || {}; const o = this._skM[s.k] || {}; if (o.busy) return; this._skM[s.k] = Object.assign({}, o, {busy: true});
    try { const r = await this._hass.callWS({type: 'call_service', domain: 'vulcan_dom', service: 'read_messages', service_data: {pupil: s.nm, limit: 20}, return_response: true}); this._skM[s.k] = {list: (r && r.response && r.response.messages) || [], n: r && r.response ? r.response.count : 0, t: Date.now()}; if (!this._skM[s.k].list.length) await this._skRcpt(s); }   // pusto: sprawdz, czy skrzynka w ogole jest dostepna (Premium)
    catch (e) { this._skM[s.k] = {err: (e && (e.message || e.code)) || 'błąd', t: Date.now()}; }
    if (this._view === 'szkola') this._renderSub();
  }
  // ---- szkola: pisanie wiadomosci (lista odbiorcow z dziennika) i usprawiedliwianie nieobecnosci; kazde wyslanie wymaga potwierdzenia ----
  _skIn() { return 'width:100%;box-sizing:border-box;border-radius:12px;border:1px solid rgba(127,127,127,.35);background:rgba(127,127,127,.12);color:inherit;font:inherit;padding:10px 12px;margin:6px 0'; }
  _skNote(sec) { const n = this._skN; return n && n.sec === sec ? `<div class="foot" style="margin:8px 0 2px;text-align:left;color:${n.bad ? '#e5576f' : '#3fb27f'}">${esc(n.t)}</div>` : ''; }
  _skRe() { this._formOpen = false; this._renderSub(); this._formOpen = !!this._skF; }
  async _skRcpt(s) {
    this._skR = this._skR || {}; if (this._skR[s.k] && (this._skR[s.k].list || this._skR[s.k].busy || this._skR[s.k].err)) return; this._skR[s.k] = {busy: true}; this._skRe();
    try { const r = await this._hass.callWS({type: 'call_service', domain: 'vulcan_dom', service: 'recipients', service_data: {pupil: s.nm}, return_response: true}); this._skR[s.k] = {list: (r && r.response && r.response.recipients) || []}; }
    catch (e) { this._skR[s.k] = {err: (e && (e.message || e.code)) || 'błąd'}; }
    this._skRe();
  }
  _skMHtml(s) { return `<div class="seg" style="margin:8px 0 2px"><button data-skf="msgv"><ha-icon icon="mdi:email-edit-outline"></ha-icon> Napisz wiadomość</button></div>`; }
  // osobny widok pisania wiadomosci: pola na gorze ekranu, wolna przestrzen pod spodem (klawiatura ekranowa nie zaslania pola)
  _vSchoolMsg() {
    const S = this._skS(), s = S.find((x) => x.k === this._skP) || S[0]; const hd = this._hdrHome(this._hdr('Nowa wiadomość', 'mdi:email-edit-outline', 'butter'));
    if (!s) return [hd + '<div class="empty">Brak uczniów</div>', null];
    if (!this._skF || this._skF.t !== 'msg') this._skF = {t: 'msg', k: s.k};
    this._formOpen = true; const f = this._skF;
    const R0 = (this._skR || {})[s.k]; if (!R0) setTimeout(() => this._skRcpt(s), 0);   // ladowanie listy po wyrenderowaniu widoku
    const R = R0 || {}, inp = this._skIn(), sc = 'scroll-margin-top:70px;';
    let body = '';
    if (R.err) body = `<div class="card list sk"><div class="foot" style="color:#d9a521;text-align:left">${/PREMIUM/i.test(R.err) ? 'Lista odbiorców wymaga konta eduVULCAN Premium — dziennik odmówił dostępu do książki adresowej, więc wysyłanie wiadomości z HA nie jest dla tego konta możliwe.' : 'Nie udało się pobrać listy odbiorców.'} <span style="opacity:.7">(${esc(R.err)})</span></div><div class="seg" style="margin-top:6px"><button id="skcan">Wróć</button><button id="skrty">Spróbuj ponownie</button></div></div>`;
    else if (R.busy || !R.list) body = '<div class="card list sk"><div class="empty">Wczytuję listę odbiorców…</div></div>';
    else if (!f.rcpt) {
      const fl = (f.flt || '').toLowerCase(), L = R.list.filter((n) => !fl || n.toLowerCase().includes(fl)).slice(0, 300);
      body = `<div class="card list sk"><div style="font-weight:700">Wybierz odbiorcę (${R.list.length})</div><input id="skflt" placeholder="Szukaj…" value="${esc(f.flt || '')}" style="${inp}${sc}"><select id="skrc" size="8" style="${inp}">${L.map((n) => `<option value="${esc(n)}">${esc(n)}</option>`).join('')}</select><div class="seg" style="margin-top:6px"><button id="skcan">Anuluj</button></div></div>`;
    } else {
      body = `<div class="card list sk"><div class="lr" style="padding-top:0"><div class="ln"><span style="opacity:.65">Do:</span> <b>${esc(f.rcpt)}</b></div><button type="button" id="skchg" style="border:0;border-radius:10px;padding:6px 12px;font:inherit;font-weight:700;background:rgba(127,127,127,.2);color:inherit">Zmień</button></div>`
        + `<input id="sksj" maxlength="200" placeholder="Temat" value="${esc(f.subj || '')}" style="${inp}${sc}"><textarea id="skbd" rows="5" maxlength="10000" placeholder="Treść wiadomości" style="${inp}${sc}">${esc(f.body || '')}</textarea>`
        + (f.cf ? `<div class="foot" style="color:#d9a521;text-align:left">Wiadomość zostanie wysłana do: ${esc(f.rcpt)}. Wysyłka jest nieodwracalna i wlicza się w dzienny limit zapisów. Potwierdzić?</div>` : '')
        + (f.err ? `<div class="foot" style="color:#e5576f;text-align:left">${esc(f.err)}</div>` : '')
        + `<div class="seg" style="margin-top:6px"><button id="sksend" class="act">${f.busy ? 'Wysyłam…' : f.cf ? 'Tak, wyślij' : 'Wyślij'}</button><button id="skcan">Anuluj</button></div></div>`;
    }
    return [hd + `<div class="foot" style="margin:-4px 0 12px;text-align:left">Od: ${esc(s.nm)}</div>` + body + '<div style="height:60vh"></div>', (root) => {
      this._skBind(root, s, {});
      const bk = root.querySelector('#back'); if (bk) bk.onclick = () => { this._skF = null; this._open('szkola-wiadomosci'); };
      root.querySelectorAll('input,textarea').forEach((el) => { el.addEventListener('focus', () => setTimeout(() => el.scrollIntoView({block: 'start', behavior: 'smooth'}), 350)); });
      const ch = root.querySelector('#skchg'); if (ch) ch.onclick = () => { this._skF.rcpt = ''; this._skF.cf = false; this._skRe(); };
    }];
  }
  _skJHtml(s, at) {
    const items = at.do_usprawiedliwienia || []; if (!items.length) return '';
    const f = this._skF, on = f && f.t === 'jus' && f.k === s.k;
    if (!on) return `<div class="seg" style="margin:8px 0 2px"><button data-skf="jus"><ha-icon icon="mdi:file-document-edit-outline"></ha-icon> Usprawiedliw nieobecność</button></div>`;
    const dates = [...new Set(items.map((x) => x.data))].sort(), d = dates.includes(f.date) ? f.date : dates[0], ls = items.filter((x) => x.data === d && x.lekcja != null).map((x) => x.lekcja), sel = f.les || ls, inp = this._skIn();
    const dd = (x) => new Date(x + 'T00:00:00').toLocaleDateString('pl-PL', {weekday: 'short', day: 'numeric', month: 'numeric'});
    return `<div style="padding:8px 0 2px"><div style="font-weight:700">Usprawiedliwienie (${esc(s.nm)})</div><select id="skjd" style="${inp}">${dates.map((x) => `<option value="${x}"${x === d ? ' selected' : ''}>${dd(x)}</option>`).join('')}</select>`
      + (ls.length ? `<div style="display:flex;flex-wrap:wrap;gap:8px;margin:4px 0">${ls.map((n) => `<label style="display:flex;align-items:center;gap:6px;padding:6px 10px;border-radius:10px;background:rgba(127,127,127,.12)"><input type="checkbox" data-skl="${n}"${sel.includes(n) ? ' checked' : ''}> lekcja ${n}</label>`).join('')}</div>` : '<div class="foot" style="text-align:left">Zostaną usprawiedliwione wszystkie nieobecności z tego dnia.</div>')
      + `<div class="seg" style="margin:4px 0;overflow-x:auto">${['Choroba', 'Wizyta u lekarza', 'Sprawy rodzinne'].map((x) => `<button data-skrs="${x}">${x}</button>`).join('')}</div><textarea id="skjr" rows="3" maxlength="500" placeholder="Powód (min. 3 znaki)" style="${inp}">${esc(f.reason || '')}</textarea>`
      + (f.cf ? `<div class="foot" style="color:#d9a521;text-align:left">Usprawiedliwić ${ls.length ? 'lekcje ' + sel.slice().sort((a, b) => a - b).join(', ') + ' z dnia ' : 'dzień '}${dd(d)}? Tego zapisu nie da się cofnąć.</div>` : '')
      + (f.err ? `<div class="foot" style="color:#e5576f;text-align:left">${esc(f.err)}</div>` : '')
      + `<div class="seg" style="margin-top:6px"><button id="skjsend" class="act">${f.busy ? 'Wysyłam…' : f.cf ? 'Tak, usprawiedliw' : 'Usprawiedliw'}</button><button id="skcan">Anuluj</button></div></div>`;
  }
  async _skCall(s, svc, data, sec, okText) {
    const f = this._skF; f.busy = true; f.err = ''; this._skRe();
    try { const r = await this._hass.callWS({type: 'call_service', domain: 'vulcan_dom', service: svc, service_data: Object.assign({pupil: s.nm}, data), return_response: true}); this._skN = {sec, t: okText(r && r.response), bad: false}; this._skF = null; if (sec === 'msg') { this._formOpen = false; this._open('szkola-wiadomosci'); return; } }
    catch (e) { f.busy = false; f.cf = false; f.err = (e && (e.message || e.code)) || 'Nie udało się'; }
    this._skRe();
  }
  _skBind(root, s, at) {
    const f = () => this._skF;
    root.querySelectorAll('[data-skf]').forEach((b) => { b.onclick = () => { this._skN = null; if (b.dataset.skf === 'msgv') { this._skF = null; this._open('szkola-wiadomosc'); return; } this._skF = {t: 'jus', k: s.k}; this._formOpen = true; this._skRe(); }; });
    const rt = root.querySelector('#skrty'); if (rt) rt.onclick = () => { if (this._skR) delete this._skR[s.k]; this._skRcpt(s); };
    const cn = root.querySelector('#skcan'); if (cn) cn.onclick = () => { this._skF = null; if (this._view === 'szkola-wiadomosc') { this._open('szkola-wiadomosci'); return; } this._skRe(); };
    const txt = (id, key) => { const e = root.querySelector('#' + id); if (e) e.oninput = () => { f()[key] = e.value; if (f().cf) { f().cf = false; this._skRe(); } }; };
    txt('sksj', 'subj'); txt('skbd', 'body'); txt('skjr', 'reason');
    const fl = root.querySelector('#skflt'); if (fl) fl.oninput = () => { f().flt = fl.value; const R = (this._skR || {})[s.k] || {}, q = fl.value.toLowerCase(), sl = root.querySelector('#skrc');
      sl.innerHTML = (R.list || []).filter((n) => !q || n.toLowerCase().includes(q)).slice(0, 300).map((n) => `<option value="${esc(n)}"${n === f().rcpt ? ' selected' : ''}>${esc(n)}</option>`).join(''); };
    const rc = root.querySelector('#skrc'); if (rc) rc.onchange = () => { f().rcpt = rc.value; f().cf = false; this._skRe(); };
    const sd = root.querySelector('#sksend'); if (sd) sd.onclick = () => { const x = f(); if (x.busy) return;
      if (!x.rcpt || !(x.subj || '').trim() || !(x.body || '').trim()) { x.err = 'Wybierz odbiorcę oraz wpisz temat i treść.'; x.cf = false; this._skRe(); return; }
      if (!x.cf) { x.cf = true; x.err = ''; this._skRe(); return; }
      this._skCall(s, 'send_message', {recipient: x.rcpt, subject: x.subj.trim(), message: x.body.trim()}, 'msg', (r) => 'Wysłano wiadomość do: ' + ((r && r.sent_to) || x.rcpt)); };
    const jd = root.querySelector('#skjd'); if (jd) jd.onchange = () => { f().date = jd.value; f().les = null; f().cf = false; this._skRe(); };
    root.querySelectorAll('[data-skl]').forEach((c) => { c.onchange = () => { const x = f(); x.les = [...root.querySelectorAll('[data-skl]')].filter((q) => q.checked).map((q) => +q.dataset.skl); x.cf = false; }; });
    root.querySelectorAll('[data-skrs]').forEach((b) => { b.onclick = () => { f().reason = b.dataset.skrs; f().cf = false; this._skRe(); }; });
    const js = root.querySelector('#skjsend'); if (js) js.onclick = () => { const x = f(); if (x.busy) return;
      const items = at.do_usprawiedliwienia || [], dates = [...new Set(items.map((q) => q.data))].sort(), d = dates.includes(x.date) ? x.date : dates[0], ls = items.filter((q) => q.data === d && q.lekcja != null).map((q) => q.lekcja), sel = x.les || ls;
      if ((x.reason || '').trim().length < 3) { x.err = 'Wpisz powód (min. 3 znaki).'; x.cf = false; this._skRe(); return; }
      if (ls.length && !sel.length) { x.err = 'Zaznacz co najmniej jedną lekcję.'; x.cf = false; this._skRe(); return; }
      if (!x.cf) { x.cf = true; x.err = ''; x.date = d; x.les = sel; this._skRe(); return; }
      const data = {date: d, reason: x.reason.trim()}; if (ls.length) data.lessons = sel;
      this._skCall(s, 'justify_absence', data, 'jus', (r) => 'Usprawiedliwiono' + (r && r.lessons && r.lessons.length ? ' lekcje ' + r.lessons.join(', ') : '') + ' z dnia ' + d); };
  }

  // nazwy zajec dodatkowych z dziennika sa dlugie (numery orzeczen, tytuly nauczycieli, rok szkolny) - skracamy do samej nazwy
  _exT(t) {
    let x = String(t || '').replace(/\s+/g, ' ').trim();
    x = x.replace(/^\d{2}\.\d{2}\.\d{4}\s*r?\.?\s*-?\s*/, '').replace(/^Dziennik zajęć\s+/i, 'Zajęcia ').replace(/\s*z uwagi na niepełnosprawność ucznia-?\s*/i, ' – ');
    x = x.replace(/\s+(PPP\b.*|mgr\b.*|dr\b.*|rok szk.*|r\.\s*szk.*|klasa\s+[IVX]+.*|gr\.?\s*\d+.*)$/i, '').trim();
    x = x.charAt(0).toUpperCase() + x.slice(1); return x.length > 70 ? x.slice(0, 68) + '…' : x || String(t);
  }
  // ---- szkola: osobny widok skrzynki (odebrane + pisanie nowej); tresc czytana na zadanie, nie jest trzymana w encjach ----
  _vSchoolInbox() {
    const S = this._skS(), s = S.find((x) => x.k === this._skP) || S[0]; const hd = this._hdrHome(this._hdr('Wiadomości', 'mdi:email-outline', 'butter'));
    if (!s) return [hd + '<div class="empty">Brak uczniów</div>', null];
    const st = this._hass.states, A = (x) => (st[this._skE(s.k, x)] || {attributes: {}}).attributes;
    const chips = S.length > 1 ? `<div class="seg" style="margin:0 0 14px">${S.map((x) => `<button data-skp="${esc(x.k)}"${x.k === s.k ? ' class="act"' : ''}>${esc(x.nm)}</button>`).join('')}</div>` : '';
    const mm = (this._skM || {})[s.k], un = A('nieprzeczytane_wiadomosci').ostatnie || [];
    if (!mm || (!mm.busy && Date.now() - (mm.t || 0) > 120000)) setTimeout(() => this._skMsgs(s), 0);   // wiadomosci laduja sie same (co najwyzej raz na 2 min); tresc nie jest trzymana w encjach
    const msg = `<div class="card list sk">` + un.map((x) => `<div class="lr"><div class="ln"><ha-icon icon="mdi:email-alert-outline" style="--mdc-icon-size:16px;margin-right:6px;color:#5a9be0"></ha-icon>${esc(x)}</div></div>`).join('')
      + (!mm || (mm.busy && !mm.list && !mm.err) ? '<div class="empty">Wczytuję…</div>' : mm && mm.err ? `<div class="lr"><div class="ln" style="color:#e5576f">Nie udało się: ${esc(mm.err)}</div></div>` : mm && mm.list ? (mm.list.length ? mm.list.map((x, i) => `<div class="lr" data-skm="${i}" data-skk="${esc(x.key || i)}" style="cursor:pointer;flex-wrap:wrap"><div class="ln">${x.read ? '' : '<b style="color:#5a9be0">● </b>'}${esc(x.subject || '(bez tematu)')}<small style="display:block;opacity:.65">${esc(x.sender || '')} · ${x.sent ? new Date(x.sent).toLocaleString('pl-PL', {day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'}) : ''}</small></div><div class="skmc" style="display:${this._skO && this._skO[x.key || i] ? 'block' : 'none'};width:100%;text-align:left;white-space:pre-wrap;font-size:13px;line-height:1.4;padding:10px 12px;margin:6px 0 4px;border-radius:12px;background:rgba(140,130,190,.13);box-sizing:border-box">${esc(this._skTxt(x.content).slice(0, 3000))}</div></div>`).join('') : (((this._skR || {})[s.k] || {}).err && /PREMIUM/i.test(this._skR[s.k].err) ? '<div class="lr"><div class="ln" style="color:#d9a521">Skrzynka wiadomości jest niedostępna: dziennik wymaga konta eduVULCAN Premium (błąd 111), więc HA nie może jej odczytać. Dlatego nie widać wiadomości ani nie liczą się nowe.</div></div>' : '<div class="lr"><div class="ln">Brak wiadomości</div></div>'))
        : '') + this._skNote('msg') + `</div>`;
    const top = `<div class="seg" style="margin:0 0 14px"><button data-skf="msgv" class="act"><ha-icon icon="mdi:email-edit-outline"></ha-icon> Napisz wiadomość</button><button id="skmload"><ha-icon icon="mdi:email-sync-outline"></ha-icon> ${mm && mm.busy ? 'Odświeżam…' : 'Odśwież'}</button></div>`;
    return [hd + chips + top + msg, (root) => {
      this._skBind(root, s, {});
      const bk = root.querySelector('#back'); if (bk) bk.onclick = () => this._open('szkola');
      root.querySelectorAll('[data-skp]').forEach((b) => { b.onclick = () => { this._skP = b.dataset.skp; try { localStorage.setItem('pastel_school', this._skP); } catch (e) { /* ignore */ } this._renderSub(); }; });
      const ml = root.querySelector('#skmload'); if (ml) ml.onclick = () => { if (this._skM && this._skM[s.k]) this._skM[s.k].t = 0; this._skMsgs(s); };
      root.querySelectorAll('[data-skm]').forEach((r) => { r.onclick = () => { const c = r.querySelector('.skmc'); if (!c) return; const on = c.style.display === 'none'; c.style.display = on ? 'block' : 'none'; this._skO = this._skO || {}; if (on) this._skO[r.dataset.skk] = 1; else delete this._skO[r.dataset.skk]; }; });   // rozwiniete wiadomosci zapamietane (odswiezanie widoku ich nie zamyka)
    }];
  }
  _vSchool() {
    const S = this._skS(); const hd = this._hdr('Szkoła', 'mdi:school-outline', 'butter', 'szk.hdr');
    if (!S.length) return [hd + '<div class="empty">Nie znaleziono encji szkoły (integracja eduVULCAN)</div>', null];
    let sel = this._skP || ''; try { sel = sel || localStorage.getItem('pastel_school') || ''; } catch (e) { /* ignore */ } const s = S.find((x) => x.k === sel) || S[0]; this._skP = s.k;
    this._skLoad(s.k);
    const st = this._hass.states, A = (x) => (st[this._skE(s.k, x)] || {attributes: {}}).attributes, V = (x) => { const o = st[this._skE(s.k, x)]; return o ? o.state : undefined; }, ok = (x) => { const v = V(x); return v !== undefined && v !== 'unknown' && v !== 'unavailable'; };
    const gcol = (g) => { const d = parseInt((String(g).match(/[0-9]/) || [''])[0], 10); return !d ? 'g0' : d >= 6 ? 'g6' : 'g' + d; };   // klasy CSS (hsl) - czytelne w kazdym motywie
    const fm = (n) => String(n).replace('.', ',');
    const HD = this._skHold || {}, H = HD[s.k] || {}, NW = ' <span class="nw">NOWE</span>', anyNew = (x) => !!(x && (x.u || x.j || x.n || x.z || x.e || x.g));
    const tile = (val, lb, ic, col, nw) => `<div style="text-align:center;padding:4px 2px;position:relative">${nw ? '<span class="nw tnw">NOWE</span>' : ''}<div style="font-size:26px;font-weight:700;color:${col || 'inherit'}">${val}</div><div style="font-size:12px;opacity:.7"><ha-icon icon="${ic}" style="--mdc-icon-size:14px"></ha-icon> ${lb}</div></div>`;
    const chips = S.length > 1 ? `<div class="seg" style="margin:0 0 14px">${S.map((x) => `<button data-skp="${esc(x.k)}"${x.k === s.k ? ' class="act"' : ''}>${esc(x.nm)}${anyNew(HD[x.k]) ? '<i class="nwd"></i>' : ''}</button>`).join('')}</div>` : '';
    // podsumowanie
    const avg = ok('oceny') ? parseFloat(V('oceny')) : null, lg = ok('ostatnia_ocena') ? V('ostatnia_ocena') : null, la = A('ostatnia_ocena'), nt = A('uwagi'), at = A('do_usprawiedliwienia');
    const tiles = `<div class="card list sk" data-pe="szk.tiles"><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:8px 6px;padding:6px 0">`
      + tile(avg === null || isNaN(avg) ? '—' : fm(avg.toFixed(2)), 'średnia', 'mdi:chart-line', avg >= 5 ? '#3fb27f' : avg >= 4 ? '#6bbf8f' : avg >= 3 ? '#d9a521' : avg ? '#e5576f' : '')
      + tile(lg === null ? '—' : esc(lg), 'ostatnia ocena', 'mdi:star-outline', '', H.g)
      + tile(ok('sprawdziany_w_7_dni') ? V('sprawdziany_w_7_dni') : '—', 'sprawdziany (7 dni)', 'mdi:clipboard-text-clock-outline', Number(V('sprawdziany_w_7_dni')) > 0 ? '#d9a521' : '', H.e > 0)
      + tile(ok('nieprzeczytane_wiadomosci') ? V('nieprzeczytane_wiadomosci') : '—', 'nowe wiadomości', 'mdi:email-outline', Number(V('nieprzeczytane_wiadomosci')) > 0 ? '#5a9be0' : '', H.u > 0)
      + tile(at.frekwencja_procent != null ? Math.round(at.frekwencja_procent) + '%' : '—', 'frekwencja', 'mdi:account-check-outline', at.frekwencja_procent != null && at.frekwencja_procent < 90 ? '#e5576f' : '', H.j > 0)
      + tile(ok('uwagi') ? V('uwagi') : '—', 'uwagi' + (nt.negatywne || nt.pozytywne ? ` (+${nt.pozytywne || 0} / −${nt.negatywne || 0})` : ''), 'mdi:alert-circle-outline', Number(nt.negatywne) > 0 ? '#e5576f' : '', H.n > 0)
      + tile(ok('szczesliwy_numerek') ? V('szczesliwy_numerek') : '—', 'szczęśliwy numerek', 'mdi:clover', '') + `</div>`
      + (la && la.przedmiot ? `<div class="foot" style="margin:2px 0 4px">Ostatnia ocena: ${esc(la.przedmiot)}${la.kolumna ? ' · ' + esc(la.kolumna) : ''}${la.waga ? ' · waga ' + la.waga : ''}${la.data ? ' · ' + new Date(la.data).toLocaleDateString('pl-PL') : ''}</div>` : '') + `</div>`;
    // plan lekcji
    const cal = (this._skCal || {})[s.k] || {plan: [], duty: [], t: 0}; const dk = (d) => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    const by = {}; cal.plan.forEach((ev) => { (by[dk(ev.s)] = by[dk(ev.s)] || []).push(ev); });
    const days = Object.keys(by).sort(), now = new Date(), today = dk(now);
    let day = this._skD && by[this._skD] ? this._skD : (by[today] && by[today].some((ev) => ev.e > now) ? today : days.find((d) => d > today) || days[0]);
    const dl = (d) => { const x = new Date(d + 'T00:00:00'); return d === today ? 'Dziś' : DAYS[x.getDay()].slice(0, 3) + ' ' + x.getDate() + '.' + String(x.getMonth() + 1).padStart(2, '0'); };
    const tm = (d) => String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
    const plan = `<h2 style="margin-top:26px" data-pe="szk.plan">Plan lekcji</h2><div class="card list sk" data-pe="szk.plan">` + (cal.t === 0 ? '<div class="empty">Wczytuję…</div>' : !days.length ? '<div class="empty">Brak lekcji w najbliższych 14 dniach</div>'
      : `<div class="seg" style="margin:4px 0 10px;overflow-x:auto">${days.slice(0, 7).map((d) => `<button data-skd="${d}"${d === day ? ' class="act"' : ''}>${dl(d)}</button>`).join('')}</div>` + (by[day] || []).map((ev) => { const m = /^(ODWOŁANA: |Zmiana: )?(\d+)?\s*(.*)$/.exec(ev.t) || [], can = m[1] && /ODW/.test(m[1]), chg = !!m[1], ex = /^Dodatkowe: /.test(m[3] || ''); if (ex) m[3] = this._exT(m[3].slice(11));
        const det = [ev.loc ? 'sala ' + esc(ev.loc) : '', esc(ev.desc.replace(/^Nauczyciel: /m, '').replace(/\n/g, ' · '))].filter(Boolean).join(' · ');
        const nm0 = String(m[3] || ev.t).toLowerCase(); let hh = 0; for (let i = 0; i < nm0.length; i++) hh = (hh * 31 + nm0.charCodeAt(i)) % 360;   // stały kolor przedmiotu (z nazwy)
        const cur = day === today && !ev.ad && ev.s <= now && now < ev.e;
        return `<div class="lr" style="border-left:4px solid ${ex ? '#5a9be0' : 'hsl(' + hh + ',55%,60%)'};padding-left:10px;margin-left:-4px${cur ? ';background:rgba(140,130,190,.16);border-radius:10px' : ''}"><div class="ln"${can ? ' style="text-decoration:line-through;opacity:.6"' : ''}>${cur ? '<span style="font-size:11px;font-weight:800;color:#3fb27f;border:1px solid currentColor;border-radius:8px;padding:0 6px;margin-right:6px">TERAZ</span>' : ''}<b style="display:inline-block;min-width:18px;opacity:.7${ex ? ';color:#5a9be0;opacity:1' : ''}">${ex ? '+' : m[2] || ''}</b> ${esc(m[3] || ev.t)}${ex ? ' <span style="font-size:11px;font-weight:700;color:#5a9be0;border:1px solid currentColor;border-radius:8px;padding:0 6px">dodatkowe</span>' : ''}<small style="display:block;opacity:.65;margin-left:24px">${det}</small></div><b style="${chg ? 'color:' + (can ? '#e5576f' : '#d9a521') : ''};font-weight:600;font-size:13px">${chg ? (can ? 'odwołana' : 'zmiana') + '<br>' : ''}${ev.ad ? '' : tm(ev.s) + '–' + tm(ev.e)}</b></div>`; }).join('')) + `</div>`;
    const zm = A('zmiany_w_planie_7_dni').zmiany || [];
    const chgs = zm.length ? `<h2 style="margin-top:26px" data-pe="szk.chgs">Zmiany w planie (7 dni)${H.z > 0 ? NW : ''}</h2><div class="card list sk" data-pe="szk.chgs">${zm.map((z) => `<div class="lr"><div class="ln"><ha-icon icon="mdi:swap-horizontal" style="--mdc-icon-size:16px;margin-right:6px;color:#d9a521"></ha-icon>${esc(z)}</div></div>`).join('')}</div>` : '';
    // sprawdziany i zadania
    const duty = `<h2 style="margin-top:26px" data-pe="szk.duty">Sprawdziany i zadania${H.e > 0 ? NW : ''}</h2><div class="card list sk" data-pe="szk.duty">` + (cal.t === 0 ? '<div class="empty">Wczytuję…</div>' : !cal.duty.length ? '<div class="lr"><div class="ln">Brak sprawdzianów i zadań w najbliższych 60 dniach</div></div>'
      : cal.duty.slice(0, 20).map((ev) => `<div class="lr"><div class="ln"><ha-icon icon="${/^Zadanie/.test(ev.t) ? 'mdi:notebook-edit-outline' : 'mdi:clipboard-text-clock-outline'}" style="--mdc-icon-size:16px;margin-right:6px;color:${/^Zadanie/.test(ev.t) ? '#5a9be0' : '#d9a521'}"></ha-icon>${esc(ev.t)}${ev.desc ? `<small style="display:block;opacity:.65;margin-left:24px">${esc(ev.desc.slice(0, 160))}</small>` : ''}</div><b style="font-weight:600;font-size:13px">${DAYS[ev.s.getDay()].slice(0, 3)} ${ev.s.getDate()}.${String(ev.s.getMonth() + 1).padStart(2, '0')}</b></div>`).join('')) + `</div>`;
    // oceny
    const sub = (A('oceny').przedmioty || []).slice().sort((a, b) => String(b.oceny && b.oceny.length ? b.oceny[b.oceny.length - 1].data : '').localeCompare(String(a.oceny && a.oceny.length ? a.oceny[a.oceny.length - 1].data : '')));
    const gr = `<h2 style="margin-top:26px" data-pe="szk.gr">Oceny · ${A('oceny').liczba_ocen || 0}${H.g ? NW : ''}</h2>` + (sub.length ? `<div class="gg" data-pe="szk.gr">${sub.map((p, i) => `<div class="card gc${H.g && la && la.przedmiot === p.przedmiot ? ' nwc' : ''}"><div class="gn" style="display:flex;justify-content:space-between;gap:8px"><span>${esc(p.przedmiot)}</span><b>${p.srednia != null ? fm(Number(p.srednia).toFixed(2)) : ''}</b></div><div style="display:flex;flex-wrap:wrap;gap:6px;margin:8px 0 2px">${(p.oceny || []).map((g, j) => { return `<button type="button" class="gb ${gcol(g.ocena)}" data-skg="${i}:${j}">${esc(g.ocena)}</button>`; }).join('')}</div><div class="foot skgd" data-skgi="${i}" style="min-height:16px;margin:4px 0 0;text-align:left"></div></div>`).join('')}</div>` : '<div class="card list sk"><div class="empty">Brak ocen</div></div>');
    // frekwencja
    const ar = (x) => `<div class="lr"><div class="ln">${esc(x.data)}${x.lekcja ? ' · lekcja ' + x.lekcja : ''} · ${esc(x.przedmiot || '')}</div><b style="font-weight:600;font-size:13px">${esc(x.rodzaj || '')}</b></div>`;
    const att = `<h2 style="margin-top:26px" data-pe="szk.att">Frekwencja${H.j > 0 ? NW : ''}</h2><div class="card list sk" data-pe="szk.att"><div class="lr"><div class="ln">Frekwencja (ostatnie ${at.lekcji_w_oknie || 0} lekcji)</div><b>${at.frekwencja_procent != null ? fm(at.frekwencja_procent) + '%' : '—'}</b></div><div class="lr"><div class="ln">Nieobecności / spóźnienia do usprawiedliwienia</div><b>${at.nieobecnosci || 0} / ${at.spoznienia || 0}</b></div>`
      + (at.wnioski_w_toku ? `<div class="lr"><div class="ln">Wnioski o usprawiedliwienie w toku</div><b>${at.wnioski_w_toku}</b></div>` : '') + (at.do_usprawiedliwienia || []).map(ar).join('') + (at.wnioski || []).map(ar).join('') + this._skJHtml(s, at) + this._skNote('jus') + `</div>`;
    const sy = ok('ostatnia_synchronizacja') ? new Date(V('ostatnia_synchronizacja')) : null, sa = A('ostatnia_synchronizacja');
    const foot = `<div class="foot" style="margin-top:18px" data-pe="szk.foot">Ostatnia synchronizacja z dziennikiem: ${sy ? sy.toLocaleString('pl-PL') : '—'}${sa.ok === false ? ' · błąd: ' + esc(sa.blad || '') : ''}</div><div class="seg" style="margin-top:8px"><button id="skrf"><ha-icon icon="mdi:refresh"></ha-icon> Odśwież teraz</button></div>`;
    const nun = Number(V('nieprzeczytane_wiadomosci')) || 0;
    const mv = `<button type="button" id="skmv" style="margin-left:12px;border:0;border-radius:999px;padding:9px 16px;font:inherit;font-size:13.5px;font-weight:800;cursor:pointer;display:flex;align-items:center;gap:8px;background:rgba(127,127,127,.2);color:inherit"><ha-icon icon="mdi:email-outline" style="--mdc-icon-size:18px"></ha-icon>Wiadomości${nun ? `<span style="background:#5a9be0;color:#fff;border-radius:999px;padding:1px 8px;font-size:12px">${nun}</span>` : ''}</button>`;
    const nws = [H.u > 0 ? (H.u === 1 ? '1 nowa wiadomość' : H.u + ' nowe wiadomości') : '', H.g ? 'nowa ocena' + (lg ? ': ' + lg + (la && la.przedmiot ? ' (' + la.przedmiot + ')' : '') : '') : '', H.n > 0 ? (H.n === 1 ? '1 nowa uwaga' : H.n + ' nowe uwagi') : '', H.e > 0 ? (H.e === 1 ? 'nowy sprawdzian' : H.e + ' nowe sprawdziany') : '', H.z > 0 ? 'zmiana w planie' : '', H.j > 0 ? 'do usprawiedliwienia: ' + H.j : ''].filter(Boolean);
    const banner = nws.length ? `<div class="card nwb"><ha-icon icon="mdi:bell-ring-outline"></ha-icon><div><b>Nowe od ostatniej wizyty</b><span>${esc(nws.join(' · '))}</span></div></div>` : '';
    const html = this._hdrAdd(hd, mv) + chips + banner + tiles + plan + chgs + duty + gr + att + foot;
    return [html, (root) => {
      root.querySelectorAll('[data-skp]').forEach((b) => { b.onclick = () => { this._skP = b.dataset.skp; this._skD = null; try { localStorage.setItem('pastel_school', this._skP); } catch (e) { /* ignore */ } this._renderSub(); }; });
      root.querySelectorAll('[data-skd]').forEach((b) => { b.onclick = () => { this._skD = b.dataset.skd; this._renderSub(); }; });
      root.querySelectorAll('[data-skg]').forEach((b) => { b.onclick = () => { const [i, j] = b.dataset.skg.split(':'), g = (sub[i] && sub[i].oceny || [])[j]; const t = root.querySelector(`[data-skgi="${i}"]`); if (t && g) t.textContent = [g.kolumna, g.waga ? 'waga ' + g.waga : '', g.data ? new Date(g.data + 'T00:00:00').toLocaleDateString('pl-PL') : ''].filter(Boolean).join(' · '); }; });
      this._skBind(root, s, at);
      const mv2 = root.querySelector('#skmv'); if (mv2) mv2.onclick = () => this._open('szkola-wiadomosci');
      const rf = root.querySelector('#skrf'); if (rf) rf.onclick = () => { this._call('vulcan_dom', 'refresh', {}); this._skLoad(s.k, true); rf.textContent = 'Zlecono odświeżenie…'; };
    }];
  }

  _vBat() {
    const rows = PC.bats.map((e) => ({e, v: this._n(e)})).sort((a, b) => (a.v === null) - (b.v === null) || (a.v || 0) - (b.v || 0)).concat(PC.tab && PC.tab.bat ? [{e: PC.tab.bat, v: this._n(PC.tab.bat), nm: 'Tab10 (tablet)', chg: this._s(PC.tab.chg) === 'on'}] : []);
    const col = (v) => v === null ? '#b9b5cf' : v < (PC.batCrit || 10) ? '#e5576f' : v < (PC.batLow || 30) ? '#d9a521' : '#3fb27f';
    return this._hdr('Baterie', 'mdi:battery-heart-variant', 'mint', 'bat.hdr') + `<div class="card list cc" data-pe="bat.list">` + rows.map((r) => `<div class="lr" data-m="${r.e}"><div class="ln">${esc(r.nm || this._name(r.e))}${r.chg ? ' <ha-icon icon="mdi:lightning-bolt" style="--mdc-icon-size:15px;color:#3fb27f"></ha-icon>' : ''}</div>
      <div class="bar"><i style="width:${r.v === null ? 0 : Math.max(3, r.v)}%;background:${col(r.v)}"></i></div><b style="color:${col(r.v)}">${r.v === null ? '—' : Math.round(r.v) + '%'}</b></div>`).join('') + `</div>`;
  }

  // ---- klimat ----
  _vClimate() {
    const T = Object.fromEntries(PC.temps.map((x) => [x[0], x[1]])), Hm = Object.fromEntries(PC.hums.map((x) => [x[0], x[1]]));
    const th = this._th(), cT = (t) => t > th.tMax + 4 || t < th.tMin - 3 ? '#e5576f' : t > th.tMax || t < th.tMin ? '#d9a521' : '#3fb27f', cH = (h) => h > th.hMax + 10 || h < th.hMin - 10 ? '#e5576f' : h > th.hMax || h < th.hMin ? '#d9a521' : '#3fb27f';
    const ot = this._n(PC.out.t), oh = this._n(PC.out.h);
    const card = (nm, t, h, ic, out, te, he) => `<div class="card kc" ${te || he ? `data-te="${esc(te || '')}" data-he="${esc(he || '')}" data-nm="${esc(nm)}" style="cursor:pointer"` : ''}><div class="kn"><ha-icon icon="${ic}"></ha-icon>${esc(nm)}</div>
      <div class="kr"><span>Temp.</span><div class="bar"><i style="width:${t === null ? 0 : Math.min(100, Math.max(4, (t - 5) / 30 * 100))}%;background:${t === null ? '#b9b5cf' : out ? '#5a9be0' : cT(t)}"></i></div><b>${t === null ? '—' : t.toFixed(1).replace('.', ',') + '°'}</b></div>
      <div class="kr"><span>Wilg.</span><div class="bar"><i style="width:${h === null ? 0 : Math.min(100, Math.max(4, h))}%;background:${h === null ? '#b9b5cf' : out ? '#8fb7e8' : cH(h)}"></i></div><b>${h === null ? '—' : Math.round(h) + '%'}</b></div></div>`;
    const kl = PC.klim || [], kc = [['out', card('Na zewnątrz', ot, oh, 'mdi:tree-outline', true, PC.out.t, PC.out.h)]].concat(PC.temps.map(([n]) => [(PC.rooms.find((r) => String(r.name || r.id).toUpperCase() === n) || {}).id || n, card(n[0] + n.slice(1).toLowerCase(), this._n(T[n]), Hm[n] ? this._n(Hm[n]) : null, 'mdi:home-thermometer-outline', false, T[n], Hm[n])]));
    kc.sort((a, b) => { const x = kl.indexOf(a[0]), y = kl.indexOf(b[0]); return (x < 0 ? 999 : x) - (y < 0 ? 999 : y); });
    return [this._hdr('Klimat', 'mdi:thermometer', 'peach', 'klimat.hdr') + `<div class="kgrid" data-pe="klimat.cards">` + kc.map((x) => x[1]).join('') + `</div>` +
      `<div class="foot" data-pe="klimat.foot">Komfort: ${th.tMin}–${th.tMax}°C, wilgotność ${th.hMin}–${th.hMax}%. Dotknij kafelka, aby zobaczyć wykresy.</div>`,
      (root) => { root.querySelectorAll('.kc[data-nm]').forEach((el) => { el.onclick = () => this._climPop(el.dataset.nm, el.dataset.te, el.dataset.he); }); }];
  }
  // okienko z historia temperatury i wilgotnosci wybranego obszaru (24 h / 3 dni / 7 dni)
  _climPop(nm, te, he) {
    const sr = this.shadowRoot; const old = sr.getElementById('clp'); if (old) old.remove();
    const ids = [te, he].filter(Boolean); if (!ids.length) return; this._clp = {nm, te, he, ids, hours: 24, tries: 0};
    const el = document.createElement('div'); el.id = 'clp'; el.innerHTML = '<div class="clb"></div><div class="clw"></div>';
    el.querySelector('.clb').onclick = () => this._climClose();
    el.onclick = (ev) => { if (ev.target.closest('[data-cx]')) this._climClose(); const h = ev.target.closest('[data-ch]'); if (h) { this._clp.hours = +h.dataset.ch; this._clp.tries = 0; this._climRender(); } };
    sr.getElementById('app').appendChild(el); this._climRender();
  }
  _climClose() { const e = this.shadowRoot.getElementById('clp'); if (e) e.remove(); this._clp = null; clearTimeout(this._clT); }
  _climRender() {
    const c = this._clp, el = this.shadowRoot.getElementById('clp'); if (!c || !el) return;
    const H = this._hist(c.ids, c.hours), pick = (eid) => { if (!H || !eid) return null; const a = H.find((x) => x && x[0] && x[0].entity_id === eid); return a ? this._series(a) : []; };
    const sT = pick(c.te), sH = pick(c.he), load = H === null || H === undefined;
    const block = (title, pts, col, unit, fx) => `<h3>${title}</h3><div class="card chartc">${load ? '<div class="empty">Wczytuję wykres…</div>' : this._chart(pts, col, unit, c.hours, fx)}</div>`;
    el.querySelector('.clw').innerHTML = `<div class="clh"><b>${esc(c.nm)}</b><span class="clr">${[[24, '24 h'], [72, '3 dni'], [168, '7 dni']].map(([h, t]) => `<button type="button" data-ch="${h}" class="${c.hours === h ? 'on' : ''}">${t}</button>`).join('')}</span><button type="button" class="clx" data-cx="1" aria-label="Zamknij"><ha-icon icon="mdi:close"></ha-icon></button></div>
      <div class="clc">${c.te ? block('Temperatura', sT, '#f2845c', '°', 1) : ''}${c.he ? block('Wilgotność', sH, '#5a9be0', '%', 0) : ''}</div>`;
    clearTimeout(this._clT); if (load && c.tries++ < 14) this._clT = setTimeout(() => this._climRender(), 700);
  }

  // ---- powietrze ----
  // filtr oczyszczacza (Xiaomi/zhimi): encje filter_life_level (%) i filter_used_time (h); id wyprowadzane z encji oczyszczacza, chyba ze PC.filter je podaje
  _flt() {
    const pf = PC.filter || {}, base = String(PC.purifier || '').replace(/^fan\./, '').replace(/_air_purifier$/, '');
    const life = pf.life || (base ? 'sensor.' + base + '_filter_life_level' : ''), used = pf.used || (base ? 'sensor.' + base + '_filter_used_time' : '');
    const l = this._n(life); if (l === null) return null;
    const u = this._n(used), warn = pf.warn || 20, crit = pf.crit || 10;
    const left = u !== null && l > 0 && l < 100 ? Math.round(u * l / (100 - l)) : null;   // szacunek godzin pracy do wymiany (liniowo)
    return {life: l, used: u, warn, crit, left, ids: [life, used], sev: l <= crit ? 2 : l <= warn ? 1 : 0};
  }
  _vAir() {
    const pm = this._n(PC.pm); const f = (this._hass.states[PC.purifier] || {}); const on = f.state === 'on'; const a = f.attributes || {};
    const H = this._hist([PC.pm], 24); const pts = H ? this._series(H[0]) : null;
    const PL = PC.pmLv || [10, 25, 35, 50], lvl = pm === null ? ['Brak danych', '#b9b5cf'] : pm <= PL[0] ? ['Świetna', '#3fb27f'] : pm <= PL[1] ? ['Dobra', '#6bbf8f'] : pm <= PL[2] ? ['Umiarkowana', '#d9a521'] : pm <= PL[3] ? ['Słaba', '#f08a5d'] : ['Zła', '#e5576f'];
    const C = 2 * Math.PI * 42, frac = Math.min(1, (pm || 0) / 60);
    const html = this._hdr('Powietrze', 'mdi:leaf', 'aqua', 'powietrze.hdr') + `<div class="twoc"><div><div class="card air" data-pe="powietrze.card"><div class="ring" style="width:130px;height:130px"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="42" fill="none" stroke="rgba(150,140,190,.2)" stroke-width="10"/>
      <circle cx="50" cy="50" r="42" fill="none" stroke="${lvl[1]}" stroke-width="10" stroke-linecap="round" stroke-dasharray="${(C * frac).toFixed(1)} ${C.toFixed(1)}"/></svg>
      <div class="c"><b style="color:${lvl[1]};font-size:32px">${pm === null ? '—' : pm.toFixed(0)}</b><small>µg/m³</small></div></div>
      <div class="tx"><div class="tt">Jakość: ${lvl[0]}</div><div class="ss">PM2.5 · norma WHO 15 µg/m³ (dobowa)</div></div></div>
      <h2 data-pe="powietrze.pur">Oczyszczacz</h2><div class="card chartc" data-pe="powietrze.pur"><div class="dcard"><button class="dev ${on ? 'on' : ''}" data-e="${PC.purifier}" style="${on ? 'background:#cdf2ee;color:#35aaa0' : ''}"><ha-icon icon="mdi:air-purifier"></ha-icon><span>Oczyszczacz</span><em>${on ? 'pracuje' : f.state === 'unavailable' ? 'niedostępny' : 'wyłączony'}</em></button>
      ${on && a.percentage != null ? `<input type="range" class="rng" id="fanp" min="0" max="100" step="${a.percentage_step || 1}" value="${a.percentage}">` : ''}</div>
      ${on && (a.preset_modes || []).length ? `<div class="seg">${a.preset_modes.map((m) => `<button data-pm="${esc(m)}" class="${a.preset_mode === m ? 'act' : ''}">${esc(m)}</button>`).join('')}</div>` : ''}</div>
      ${(() => { const z = this._flt(); if (!z) return ''; const c = z.sev === 2 ? '#e5576f' : z.sev === 1 ? '#d9a521' : '#3fb27f'; return `<h2 data-pe="powietrze.flt">Filtr</h2><div class="card chartc" data-pe="powietrze.flt"><div class="lr" style="padding-top:0"><div class="ln" style="flex:0 0 auto"><ha-icon icon="mdi:air-filter" style="--mdc-icon-size:18px;margin-right:6px;color:${c}"></ha-icon>Pozostało</div><div class="bar" style="margin:0 12px"><i style="width:${Math.max(3, Math.min(100, z.life))}%;background:${c}"></i></div><b style="color:${c}">${Math.round(z.life)}%</b></div><div class="foot" style="text-align:left;margin:4px 0 0">${z.sev === 2 ? 'Wymień filtr jak najszybciej. ' : z.sev === 1 ? 'Filtr na wyczerpaniu — zamów nowy. ' : ''}${z.used !== null ? 'Przepracowane: ' + Math.round(z.used) + ' godz.' : ''}${z.left !== null ? ' · szacunek: ok. ' + z.left + ' godz. pracy do wymiany' : ''} · ostrzeżenie przy ${z.warn}%, alarm przy ${z.crit}%</div></div>`; })()}
      </div><div data-pe="powietrze.chart"><h2 style="margin-top:0">PM2.5 · 24 h</h2><div class="card chartc">${this._chart(pts, lvl[1], '', 24, 0)}</div></div></div>`;
    return [html, (root) => { const fp = root.querySelector('#fanp'); if (fp) fp.onchange = () => this._call('fan', 'set_percentage', {entity_id: PC.purifier, percentage: parseInt(fp.value, 10)});
      root.querySelectorAll('[data-pm]').forEach((b) => { b.onclick = () => this._call('fan', 'set_preset_mode', {entity_id: PC.purifier, preset_mode: b.dataset.pm}); }); }];
  }

  // ---- pogoda ----
  _vWeather() {
    const w = this._hass.states[PC.out.weather] || {}, A = w.attributes || {}, fc = this._fc || {h: [], d: []}, now = Date.now();
    const p2 = (n) => String(n).padStart(2, '0'), num = (v) => { const x = parseFloat(v); return isNaN(x) ? null : x; };
    const f1 = (v) => v === null ? '—' : v.toFixed(1).replace('.', ','), r0 = (v) => v === null ? '—' : String(Math.round(v));
    const hm = (iso) => { const d = new Date(iso); return isNaN(d) ? '—' : p2(d.getHours()) + ':' + p2(d.getMinutes()); };
    const DIR = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'], br = num(A.wind_bearing), dir = br === null ? '' : DIR[Math.round(br / 22.5) % 16];
    const wx = WX[w.state] || ['mdi:weather-cloudy', w.state || '—'];
    const ot = this._n(PC.out.t), oh = this._n(PC.out.h), tmp = ot !== null ? ot : num(A.temperature), hum = oh !== null ? oh : num(A.humidity), pm = this._n(PC.pm);
    const app = num(A.apparent_temperature), pr = num(A.pressure), ws = num(A.wind_speed), wg = num(A.wind_gust_speed), cl = num(A.cloud_coverage), vis = num(A.visibility), uv = num(A.uv_index), dp = num(A.dew_point);
    const sr = A.sunrise ? new Date(A.sunrise) : null, ss = A.sunset ? new Date(A.sunset) : null;
    let dl = ''; if (sr && ss && !isNaN(sr) && !isNaN(ss)) { const m = Math.round((ss - sr) / 60000); dl = Math.floor(m / 60) + ' h ' + (m % 60) + ' min'; }
    const big = (k, v, u) => `<div class="big"><span>${k}</span><b>${v}<small>${u}</small></b></div>`;
    const bigs = big(ot !== null ? 'Temp. (czujnik)' : 'Temperatura', f1(tmp), ' °C') + big('Odczuwalna (IMGW)', f1(app), ' °C') + big('Wilgotność', r0(hum), ' %') + big('Ciśnienie', r0(pr), ' hPa') +
      big('Wiatr', r0(ws), ' km/h ' + dir) + big('Porywy', r0(wg), ' km/h') + big('Zachmurzenie', r0(cl), ' %') + (uv !== null ? big('Indeks UV', f1(uv), '') : vis !== null ? big('Widoczność', f1(vis), ' km') : big('Opady', f1(num(A.precipitation)), ' mm'));
    const hrs = fc.h.filter((x) => { const t = new Date(x.datetime).getTime(); return !isNaN(t) && t > now - 3600000; }).slice(0, 24);
    const hrow = hrs.map((x) => { const c = WX[x.condition] || ['mdi:weather-cloudy', '']; const pp = num(x.precipitation); return `<div class="wh"><span>${hm(x.datetime)}</span><ha-icon icon="${c[0]}"></ha-icon><b>${r0(num(x.temperature))}°</b><em>${pp !== null && pp >= 0.1 ? f1(pp) + ' mm' : ''}</em></div>`; }).join('');
    const d0 = new Date(); d0.setHours(0, 0, 0, 0);
    const drow = fc.d.slice(0, 7).map((x) => { const t = new Date(x.datetime); t.setHours(0, 0, 0, 0); const k = Math.round((t - d0) / 86400000); const c = WX[x.condition] || ['mdi:weather-cloudy', ''], pp = num(x.precipitation);
      const nm = k === 0 ? 'Dziś' : k === 1 ? 'Jutro' : DAYS[t.getDay()].replace(/^./, (s) => s.toUpperCase());
      return `<div class="wd"><span class="n">${nm}</span><ha-icon icon="${c[0]}"></ha-icon><span class="c">${esc(c[1])}${pp !== null && pp >= 0.1 ? `<small> · ${f1(pp)} mm</small>` : ''}</span><b>${x.templow != null ? r0(num(x.templow)) + '° / ' : ''}${r0(num(x.temperature))}°</b></div>`; }).join('');
    const H = PC.out.t ? this._hist([PC.out.t], 24) : null; const pts = H ? this._series(H[0]) : null;
    const sun = `<div class="card chartc"><div class="wsun"><div><ha-icon icon="mdi:weather-sunset-up" style="color:#e8a33d"></ha-icon><span>Wschód</span><b>${sr ? hm(A.sunrise) : '—'}</b></div><div><ha-icon icon="mdi:weather-sunset-down" style="color:#e8794a"></ha-icon><span>Zachód</span><b>${ss ? hm(A.sunset) : '—'}</b></div><div><ha-icon icon="mdi:timer-sand" style="color:#5a9be0"></ha-icon><span>Długość dnia</span><b>${dl || '—'}</b></div></div></div>`;
    const LV = {1: ['#fff0c2', '#8f6a00', 'Żółty · stopień 1'], 2: ['#ffe0cf', '#b4531f', 'Pomarańczowy · stopień 2'], 3: ['#ffd0d8', '#b3243f', 'Czerwony · stopień 3'], 4: ['#f3c4d6', '#7a1030', 'Stopień 4']};
    const wi = (e) => this._wIcon(e);
    const fd = (v) => { const d = new Date(String(v || '').replace(' ', 'T')); return isNaN(d) ? '—' : DAYS[d.getDay()].slice(0, 3) + '. ' + d.getDate() + '.' + p2(d.getMonth() + 1) + ' ' + p2(d.getHours()) + ':' + p2(d.getMinutes()); };
    const wo = PC.warn && this._hass.states[PC.warn], wl = wo && Array.isArray(wo.attributes.warnings) ? wo.attributes.warnings.filter((x) => { const t = new Date(String(x.valid_to || '').replace(' ', 'T')); return isNaN(t) || t.getTime() > now; }).sort((a, b) => (b.level || 0) - (a.level || 0)) : [];
    const warn = !PC.warn ? '' : wl.length ? wl.map((x) => { const c = LV[x.level] || LV[1]; const act = new Date(String(x.valid_from || '').replace(' ', 'T')).getTime() <= now;
      return `<div class="wwarn lv${LV[x.level] ? x.level : 1}" style="background:${c[0]};color:${c[1]}"><ha-icon icon="${wi(x.event)}"></ha-icon><div><b>${esc(x.event || 'Ostrzeżenie')}</b><span>${c[2]}${x.probability != null ? ' · prawdop. ' + esc(x.probability) + '%' : ''} · ${act ? 'obowiązuje' : 'zapowiedź'}</span><span>${fd(x.valid_from)} → ${fd(x.valid_to)}</span>${x.content ? `<p>${esc(x.content)}</p>` : ''}${x.comment && !/^brak\.?$/i.test(x.comment) ? `<p>${esc(x.comment)}</p>` : ''}</div></div>`; }).join('')
      : `<div class="wwarn" style="background:rgba(63,178,127,.16);color:#2e8f64"><ha-icon icon="mdi:shield-check-outline"></ha-icon><div><b>Brak ostrzeżeń meteo</b><span>IMGW · województwo śląskie</span></div></div>`;
    const html = this._hdr('Pogoda', wx[0], 'sky') + (warn ? `<h2 style="margin-top:0">Ostrzeżenia meteo</h2><div class="wwarns">${warn}</div>` : '') + `<div class="pillrow"><span class="pill">${esc(wx[1])}</span> <span class="pill">${esc(A.location || '')}</span>${pm !== null ? ` <span class="pill">PM2.5 ${Math.round(pm)} µg/m³</span>` : ''}${dp !== null ? ` <span class="pill">Punkt rosy ${f1(dp)}°</span>` : ''}</div>
      <div class="bigs wbigs">${bigs}</div>
      <div class="twoc"><div><h2 style="margin-top:0">Najbliższe godziny</h2><div class="card chartc"><div class="whs">${hrow || '<div class="empty">Brak prognozy godzinowej</div>'}</div></div>
      <h2>Temperatura · 24 h</h2><div class="card chartc">${this._chart(pts, '#f2845c', '°', 24, 0)}</div></div>
      <div><h2 style="margin-top:0">Prognoza na kolejne dni</h2><div class="card chartc">${drow || '<div class="empty">Brak prognozy dziennej</div>'}</div><h2>Słońce</h2>${sun}</div></div>`;
    return [html, (root) => { const b = root.querySelector('.card.chartc .whs'); if (b) { const n = b.querySelector('.wh'); if (n) b.scrollLeft = 0; } }];
  }

  // ---- multimedia ----
  _radio() {
    const e = PC.media.radio, r = e && this._hass.states[e]; if (!r) return '';
    const a = r.attributes || {}, off = ['off', 'unavailable', 'unknown'].includes(r.state);
    const t = off ? (r.state === 'unavailable' ? 'niedostępne' : 'wyłączone') : (a.media_title || a.source || 'włączone');
    const ctl = [['mdi:skip-previous', 'media_previous_track'], ['mdi:play-pause', 'media_play_pause'], ['mdi:skip-next', 'media_next_track'], ['mdi:volume-minus', 'volume_down'], ['mdi:power', 'toggle'], ['mdi:volume-plus', 'volume_up']];
    const src = (a.source_list || []).map((x) => `<button class="tv ${a.source === x && !off ? 'act' : ''}" data-src="${esc(x)}"><span>${esc(x)}</span></button>`).join('');
    return `<h2 style="margin-top:30px"><ha-icon icon="mdi:radio"></ha-icon>${esc(a.friendly_name || 'Radio')}</h2><div class="card np"><div class="npt">${esc(t)}</div>${a.media_artist ? `<div class="wh">${esc(a.media_artist)}</div>` : ''}</div>` +
      (src ? `<div class="tvs" style="margin-top:10px">${src}</div>` : '') + `<div class="ctl">${ctl.map((c) => `<button data-rs="${c[1]}"><ha-icon icon="${c[0]}"></ha-icon></button>`).join('')}</div>`;
  }
  _vMedia() {
    const act = this._s(PC.media.active); const o = (this._hass.states[PC.media.active] || {}).attributes || {}; const cur = this._hass.states[act]; const a = (cur && cur.attributes) || {};
    const tvs = PC.media.tvs.map((t) => { const st = this._s(t[0]); const on = act === t[0]; const live = st && !['off', 'unavailable', 'unknown', 'standby'].includes(st);
      return `<button class="tv ${on ? 'act' : ''}" data-tv="${t[0]}"><ha-icon icon="${t[2]}"></ha-icon><span>${esc(t[1])}</span><em>${live ? (st === 'playing' ? 'gra' : 'włączony') : 'wyłączony'}</em></button>`; }).join('');
    const title = !cur ? 'Brak urządzenia' : ['off', 'unavailable', 'unknown'].includes(cur.state) ? (a.friendly_name || act) + ' · wyłączony' : (a.media_title || a.app_name || a.friendly_name || act);
    const ctl = [['mdi:skip-previous', 'media_previous_track'], ['mdi:play-pause', 'media_play_pause'], ['mdi:skip-next', 'media_next_track'], ['mdi:volume-minus', 'volume_down'], ['mdi:power', 'toggle'], ['mdi:volume-plus', 'volume_up']];
    const html = this._hdr('Multimedia', 'mdi:play-box-outline', 'lav') + `<div class="mmv"><div class="tvs">${tvs}</div><h2>Teraz</h2><div class="card np"><div class="npt">${esc(title)}</div>${a.media_artist ? `<div class="wh">${esc(a.media_artist)}</div>` : ''}</div>
      <div class="ctl">${ctl.map((c) => `<button data-s="${c[1]}"><ha-icon icon="${c[0]}"></ha-icon></button>`).join('')}</div>` + this._radio() + `</div>`;
    return [html, (root) => { root.querySelectorAll('[data-tv]').forEach((b) => { b.onclick = () => this._call('input_select', 'select_option', {entity_id: PC.media.active, option: b.dataset.tv}); });
      root.querySelectorAll('[data-s]').forEach((b) => { b.onclick = () => { if (act) this._call('media_player', b.dataset.s, {entity_id: act}); }; });
      root.querySelectorAll('[data-rs]').forEach((b) => { b.onclick = () => this._call('media_player', b.dataset.rs, {entity_id: PC.media.radio}); });
      root.querySelectorAll('[data-src]').forEach((b) => { b.onclick = () => this._call('media_player', 'select_source', {entity_id: PC.media.radio, source: b.dataset.src}); }); }];
  }

  // ---- serwer ----
  _f1Live() {
    const st = this._s('sensor.f1_session_status'); if (!this._f1Active()) return {head: '', list: ''};
    const A = (e) => (this._hass.states[e] && this._hass.states[e].attributes) || {}; const ok = (v) => v && v !== 'None' && v !== 'null';
    const cs = Object.assign({}, A('sensor.f1_current_session')), dp = A('sensor.f1_driver_positions');
    const rsel = A('sensor.f1_replay_status').selected_session; if (ok(rsel) && this._replayOn()) { const i = String(rsel).lastIndexOf(' - '); cs.type = i > 0 ? rsel.slice(i + 3) : rsel; cs.meeting_name = i > 0 ? rsel.slice(0, i) : rsel; }   // podczas powtorki sensor sesji bywa pusty lub nieaktualny
     const D = (dp.drivers || []).slice().sort((x, y) => (parseInt(x.current_position) || 99) - (parseInt(y.current_position) || 99)); if (!D.length) return {head: '', list: ''};
    const NM = {Race: 'Wyścig', Qualifying: 'Kwalifikacje', Sprint: 'Sprint', 'Sprint Qualifying': 'Kwalifikacje sprintu', 'Practice 1': 'Trening 1', 'Practice 2': 'Trening 2', 'Practice 3': 'Trening 3'};
    const SS = {live: ['Na żywo', 'var(--good)'], suspended: ['Przerwana', 'var(--bad)'], break: ['Przerwa', 'var(--warn)']}[st] || ['Powtórka', 'var(--warn)'];
    const TS = {CLEAR: ['Tor wolny', 'var(--good)'], YELLOW: ['Żółta flaga', 'var(--warn)'], DOUBLEYELLOW: ['Podwójna żółta', 'var(--warn)'], SCDEPLOYED: ['Safety car', 'var(--warn)'], VSCDEPLOYED: ['Virtual safety car', 'var(--warn)'], VSCENDING: ['Koniec VSC', 'var(--warn)'], RED: ['Czerwona flaga', 'var(--bad)']};
    const ts = String(this._s('sensor.f1_track_status') || '').toUpperCase().replace(/[ _]/g, ''); const t2 = TS[ts] || [ts, 'var(--ink2)'];
    const race = /Race|Sprint/.test(cs.type || '') && !/Qualifying/.test(cs.type || ''); const lap = this._s('sensor.f1_race_lap_count'), tl = A('sensor.f1_race_lap_count').total_laps, rem = A('sensor.f1_session_time_remaining').formatted_hms;
    const prog = race && lap && !isNaN(parseInt(lap)) ? `okr. <b>${esc(lap)}</b>${ok(tl) ? '/' + esc(tl) : ''}` : (ok(rem) ? `zostało <b>${esc(rem)}</b>` : '');
    const rc = A('sensor.f1_race_control'); const TY = {}; (A('sensor.f1_current_tyres').drivers || []).forEach((t) => { TY[t.racing_number] = t; });
    const pill = (t, c) => `<span style="display:inline-flex;align-items:center;gap:6px;color:${c};font-weight:800;font-size:12.5px"><i style="width:8px;height:8px;border-radius:50%;background:${c}"></i>${t}</span>`;
    const rows = D.slice(0, 20).map((x) => { const ty = TY[x.racing_number] || {}, k = x.team_color || '#8f78e0'; const out = x.retired || x.status === 'retired' || x.status === 'stopped';
      const c1 = race ? x.gap_to_leader : (x.best_lap_time || x.gap_to_leader), c2 = race ? x.interval_to_position_ahead : x.gap_to_leader, ll = x.last_lap_status || {};
      const cell = (v, col) => `<b class="fc"${col ? ` style="color:${col}"` : ''}>${esc(v == null || v === '' ? '—' : v)}</b>`;
      return `<div class="f1r"><span class="p" style="${x.current_position === '1' ? 'color:var(--warn)' : ''}">${esc(x.current_position)}</span><div class="f1d" style="flex:0 1 270px"><i style="width:100%;border-color:${k};background:${k}"></i><span>${esc(x.tla)}<small>${esc(String(x.name || '').split(' ').slice(1).join(' '))}</small>${x.in_pit ? '<small style="color:var(--warn)">PIT</small>' : ''}${out ? '<small style="color:var(--bad)">OUT</small>' : ''}</span></div><span style="flex:1"></span>${cell(c1)}${cell(c2)}${cell(ll.time, ll.overall_fastest ? '#a24dd6' : ll.personal_fastest ? 'var(--good)' : '')}<b style="width:34px;text-align:center;color:${ty.compound_color || 'inherit'}">${esc(ty.compound_short || '—')}<small style="color:var(--ink2);font-size:9.5px"> ${esc(ty.stint_laps == null ? '' : ty.stint_laps)}</small></b></div>`; }).join('');
    const hc = (t) => `<span class="fc">${t}</span>`;
    const hdr = `<div class="f1r f1h"><span class="p"></span><div class="f1d" style="flex:0 1 270px;background:none"><span>KIEROWCA</span></div><span style="flex:1"></span>${hc(race ? 'PRZEWAGA' : 'NAJLEPSZY')}${hc(race ? 'INTERWAŁ' : 'PRZEWAGA')}${hc('OSTATNI')}<span style="width:34px;text-align:center" class="fc">OPONY</span></div>`;
    return {head: `<div class="card f1c"><div class="f1t">${esc(NM[cs.type] || cs.type || '')} · ${esc(cs.meeting_name)}</div><div style="display:flex;flex-wrap:wrap;gap:6px 16px;margin:8px 0 4px;align-items:center">${pill(SS[0], SS[1])}${pill(t2[0], t2[1])}${prog ? `<span class="f1s" style="margin:0">${prog}</span>` : ''}</div>` +
      `${ok(rc.message) ? `<div class="f1s" style="color:var(--warn)">▸ ${esc(rc.message)}</div>` : ''}</div>`, list: `<div class="card f1c">${hdr}${rows}</div>`};
  }
  // mapa toru: gotowa karta f1-sensor-card (integracja f1_sensor) tworzona raz i przenoszona do kolejnych renderow widoku F1
  // sterowanie powtorkami F1 (element jarvis-f1-replay z zasobu jarvis-f1-card.js): tworzony raz, odswiezany z set hass
  _rpMount(host) {
    if (!host) return;
    if (!customElements.get('jarvis-f1-replay')) { host.innerHTML = ''; return; }
    if (!this._rp) { const el = document.createElement('jarvis-f1-replay'); el.setConfig({palette: this._aur() && this._hudD ? 'hud' : 'pastel', font: '13px'}); this._rp = el; }
    if (!host.querySelector('#f1rpc')) host.innerHTML = '<h2><ha-icon icon="mdi:history"></ha-icon>Powtórki sesji</h2><div class="card f1c" id="f1rpc"></div>';
    const c = host.querySelector('#f1rpc'); if (this._rp.parentNode !== c) { c.innerHTML = ''; c.appendChild(this._rp); }
    this._rpStyle(); this._rp.hass = this._hass;
  }
  _rpStyle() { if (this._aur() && this._hudD) return; const d = this.classList.contains('dark'); this._rp.style.cssText = `--jp-3a3552:var(--ink);--jp-7b7597:var(--ink2);--rp-bg:${d ? '#2a2540' : '#ffffff'};--rp-cs:${d ? 'dark' : 'light'}`; }
  _replayOn() { const r = this._s('sensor.f1_replay_status'); return r === 'playing' || r === 'paused'; }
  _f1Active() { return ['live', 'suspended', 'break'].includes(this._s('sensor.f1_session_status')) || this._replayOn(); }   // sesja na zywo albo trwajaca powtorka
  _f1MapSync(r) {   // stala prawa kolumna #f1r widoku F1: karta toru nie jest przebudowywana przy odswiezaniu listy (bez migania)
    if (!r) return;
    if (!r.querySelector('#f1map')) r.innerHTML = '<div class="card f1c" id="f1map"></div>';
    const host = r.querySelector('#f1map');
    if (!customElements.get('f1-sensor-card')) { if (!host.firstChild) host.innerHTML = '<div class="empty">Karta toru F1 niedostępna</div>'; return; }
    if (!this._f1map) { const el = document.createElement('f1-sensor-card');
      try { el.setConfig({type: 'custom:f1-sensor-card', appearance: {style: 'minimal', mode: 'auto', show_header: false, accent: '#e8794a'}, context: {viewing_controls: false, show_focus_control: false, show_freeze_control: false}, modules: [{id: 'tor', type: 'map', show_header: false, fields: ['track_map'], options: {show_session_info: false, show_footer: false, show_context: false, show_status: false}}]}); } catch (e) { host.innerHTML = '<div class="empty">Karta toru F1 niedostępna</div>'; return; }
      this._f1map = el; }
    this._f1map.hass = this._hass; if (this._f1map.parentNode !== host) { host.innerHTML = ''; host.appendChild(this._f1map); }
    const hide = (root, d) => { if (!root || d > 5) return; if (root.querySelector && root.querySelector('.map-list') && !root.querySelector('style[data-pst]')) { const st = document.createElement('style'); st.setAttribute('data-pst', ''); st.textContent = '.map-list{display:none!important}'; root.appendChild(st); }
      if (root.querySelectorAll) root.querySelectorAll('*').forEach((e) => { if (e.shadowRoot) hide(e.shadowRoot, d + 1); }); };
    hide(this._f1map.shadowRoot, 0);   // karta nie pozwala wylaczyc listy kierowcow pod mapa - chowamy ja stylem w jej shadow DOM
  }
  // team radio: jeden Audio na karcie (poza DOM), wiec odswiezanie widoku nie przerywa odtwarzania
  _radBind(root) {
    if (!root) return; const sync = () => root.querySelectorAll('.trp').forEach((b) => { const on = b.dataset.src === this._radId; b.classList.toggle('on', on); const i = b.querySelector('ha-icon'); if (i) i.setAttribute('icon', on ? 'mdi:stop' : 'mdi:play'); });
    if (!this._rad) { this._rad = new Audio(); this._rad.preload = 'none'; const end = () => { this._radId = null; const r = this.shadowRoot; if (r) r.querySelectorAll('.trp').forEach((b) => { b.classList.remove('on'); const i = b.querySelector('ha-icon'); if (i) i.setAttribute('icon', 'mdi:play'); }); }; this._rad.addEventListener('ended', end); this._rad.addEventListener('error', end); }
    root.querySelectorAll('.trp').forEach((b) => { b.onclick = () => { const src = b.dataset.src; if (this._radId === src) { this._rad.pause(); this._radId = null; sync(); return; }
      this._radId = src; this._rad.src = src; const pr = this._rad.play(); if (pr && pr.catch) pr.catch(() => { this._radId = null; sync(); }); sync(); }; });
  }
  _vF1() {
    const A = (e) => (this._hass.states[e] && this._hass.states[e].attributes) || {}; const ok = (v) => v && v !== 'None' && v !== 'null' && v !== 'unknown';
    const fmt = (iso, o) => { const d = new Date(iso); return isNaN(d) ? '—' : d.toLocaleString('pl-PL', Object.assign({timeZone: 'Europe/Warsaw'}, o)); };
    const tc = (id) => F1_TEAM[id] || '#8f78e0'; const nu = (v) => { const x = parseFloat(v); return isNaN(x) ? null : x; }; const r = (v, d) => v === null ? '—' : v.toFixed(d || 0).replace('.', ',');
    const a = A('sensor.f1_next_race'); let nxt = '<div class="card f1c"><div class="empty">Brak danych z integracji F1</div></div>';
    if (ok(a.race_name)) {
      const ms = new Date(a.race_start_utc) - Date.now(); let cd = 'Wyścig trwa lub już po';
      if (ms > 0) { const d = Math.floor(ms / 864e5), h = Math.floor(ms % 864e5 / 36e5), m = Math.floor(ms % 36e5 / 6e4); cd = (d ? d + ' dni ' : '') + h + ' godz ' + m + ' min'; }
      const SES = [['Trening 1', a.first_practice_start_utc], ['Trening 2', a.second_practice_start_utc], ['Trening 3', a.third_practice_start_utc], ['Kwalifikacje sprintu', a.sprint_qualifying_start_utc],
        ['Sprint', a.sprint_start_utc], ['Kwalifikacje', a.qualifying_start_utc], ['Wyścig', a.race_start_utc]].filter((x) => ok(x[1])).sort((x, y) => new Date(x[1]) - new Date(y[1]));
      const nx = SES.findIndex((x) => new Date(x[1]) > Date.now()); const lv = this._f1Active() && !this._replayOn() ? (nx < 0 ? SES.length : nx) - 1 : -1; const wk = this._s('binary_sensor.f1_race_week') === 'on';
      nxt = `<div class="card f1c" data-pe="f1.next"><div class="f1t">${ok(a.country_flag_url) ? `<img src="${esc(a.country_flag_url)}">` : ''}<div>${esc(a.race_name)}<div class="f1s">Runda ${esc(a.round)} · ${esc(a.circuit_name)}, ${esc(a.circuit_locality)}</div></div></div>
        <div class="f1cd ${wk ? 'rw' : ''}">${cd}</div><div class="f1s" style="margin-bottom:6px">Start ${fmt(a.race_start_utc, {weekday: 'long', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'})} (czas polski)</div>` +
        SES.map((x, i) => `<div class="f1r ${i === lv ? 'cur' : i === nx && lv < 0 ? 'cur' : new Date(x[1]) <= Date.now() ? 'past' : ''}"><span class="p">${i === lv ? '●' : new Date(x[1]) <= Date.now() ? '✓' : i === nx ? '▶' : '·'}</span>${x[0]}<b>${fmt(x[1], {weekday: 'short', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'})}</b></div>`).join('') + `</div>`;
    }
    const w = A('sensor.f1_weather'); let wx = '';
    if (ok(w.race_name)) {
      const line = (k, v) => `<div class="f1w"><span>${k}</span><b>${v}</b></div>`; const ic = ok(w.race_weather_icon) ? w.race_weather_icon : 'mdi:weather-partly-cloudy';
      wx = `<div class="card f1c" data-pe="f1.weather"><div class="f1t"><ha-icon icon="${ic}" style="--mdc-icon-size:34px;color:var(--info)"></ha-icon>${r(nu(w.race_temperature))}°C<div class="f1s" style="margin:0 0 0 auto">${esc(w.circuit_locality)} · dzień wyścigu</div></div>
        ${line('Opady', r(nu(w.race_precipitation_probability)) + '%')}${line('Wiatr', (nu(w.race_wind_speed) === null ? '—' : r(nu(w.race_wind_speed) * 3.6)) + ' km/h ' + esc(w.race_wind_direction))}${line('Zachmurzenie', r(nu(w.race_cloud_cover)) + '%')}${line('Wilgotność', r(nu(w.race_humidity)) + '%')}
        ${line('Teraz na torze', r(nu(w.current_temperature), 1) + '°C')}</div>`;
    }
    const l = A('sensor.f1_last_race_results'); let last = '';
    if (ok(l.race_name) && (l.results || []).length) {
      last = `<h2 data-pe="f1.last"><ha-icon icon="mdi:trophy-outline"></ha-icon>Ostatni wyścig</h2><div class="card f1c f1sc" data-pe="f1.last"><div class="f1t">${esc(l.race_name)}<div class="f1s" style="margin:0 0 0 auto">Runda ${esc(l.round)}</div></div>` +
        l.results.map((x, i) => { const d = x.driver || {}; return `<div class="f1r"><span class="p" style="${i === 0 ? 'color:var(--warn)' : ''}">${esc(x.position)}</span><div class="f1d"><i style="width:100%;border-color:${tc((x.constructor || {}).constructorId)};background:${tc((x.constructor || {}).constructorId)}"></i><span>${esc((d.givenName || '').charAt(0))}. ${esc(d.familyName)}<small>${esc((x.constructor || {}).name)}</small></span></div><b style="font-size:11.5px">${esc(x.time || x.status)}</b></div>`; }).join('') + `</div>`;
    }
    const stand = (title, ic, L, dr, n) => { if (!L || !L.length) return ''; const mx = Math.max(1, parseFloat(L[0].points) || 1);
      return `<h2 data-pe="${dr ? 'f1.drivers' : 'f1.teams'}"><ha-icon icon="${ic}"></ha-icon>${title}</h2><div class="card f1c f1sc" data-pe="${dr ? 'f1.drivers' : 'f1.teams'}">` + L.slice(0, n).map((x) => { const id = dr ? ((x.Constructors || [{}])[0] || {}).constructorId : (x.Constructor || {}).constructorId; const k = tc(id);
        const nm = dr ? esc(((x.Driver || {}).givenName || '').charAt(0) + '. ' + ((x.Driver || {}).familyName || '')) : esc((x.Constructor || {}).name); const sub = dr ? esc(((x.Constructors || [{}])[0] || {}).name) : '';
        return `<div class="f1r"><span class="p" style="${x.position === '1' ? 'color:var(--warn)' : ''}">${esc(x.position)}</span><div class="f1d"><i style="width:${Math.max(2, Math.round(100 * (parseFloat(x.points) || 0) / mx))}%;border-color:${k};background:${k}"></i><span>${nm}${sub ? `<small>${sub}</small>` : ''}</span></div><small style="color:var(--ink2);font-size:11px">${esc(x.wins)} zw.</small><b style="width:34px;text-align:right">${esc(x.points)}</b></div>`; }).join('') + `</div>`; };
    const F1L = this._f1Live(); const LV = this._view === 'f1live';
    const tr = A('sensor.f1_team_radio'), TRH = Array.isArray(tr.history) ? tr.history.filter((x) => x && x.clip_url) : [];
    const trTime = (u) => { const d = new Date(u); return isNaN(d) ? '' : d.toLocaleTimeString('pl-PL', {timeZone: 'Europe/Warsaw', hour: '2-digit', minute: '2-digit', second: '2-digit'}); };
    const radio = TRH.length ? `<h2 data-pe="f1.radio"><ha-icon icon="mdi:headset"></ha-icon>Team radio</h2><div class="card f1c f1sc" data-pe="f1.radio">` + TRH.map((x) => { const k = x.team_color || '#8f78e0', pl = this._radId === x.clip_url;
      return `<div class="trr"><button type="button" class="trp${pl ? ' on' : ''}" data-src="${esc(x.clip_url)}" style="--tc:${esc(k)}"><ha-icon icon="${pl ? 'mdi:stop' : 'mdi:play'}"></ha-icon></button><div class="trb"><div class="trh">${esc(x.driver_tla || x.racing_number || '')}<small>${esc(x.team_name || '')}</small><em>${esc(trTime(x.utc))}</em></div>${ok(x.transcription_text) ? `<div class="trx">${esc(x.transcription_text)}</div>` : ''}</div></div>`; }).join('') + `</div>` : (LV ? `<h2><ha-icon icon="mdi:headset"></ha-icon>Team radio</h2><div class="card f1c"><div class="f1s">Brak komunikatów w tej sesji</div></div>` : '');
    const nolive = `<div class="card f1c"><div class="f1t">Brak sesji na żywo</div><div class="f1s" style="margin-top:6px">${ok(a.race_name) ? 'Następna: ' + esc(a.race_name) : 'Brak danych z integracji F1'}</div></div>`;
    const banner = !LV && F1L.head ? '<div style="display:flex;justify-content:flex-end;margin:-6px 0 12px"><button id="tolive" type="button" class="livebtn"><i></i>NA ŻYWO<ha-icon icon="mdi:chevron-right"></ha-icon></button></div>' : '';
    const html = this._hdr(LV ? 'F1 na żywo' : 'Formuła 1', 'mdi:flag-checkered', 'peach', 'f1.hdr') + (LV ? (F1L.head ? F1L.head + '<!--R-->' + F1L.list + '<!--M-->' + radio : nolive + '<!--R--><!--M-->' + radio) : banner + '<!--R--><!--M-->' + radio + (LV ? '' : `<div class="f1g"><div>${nxt}${wx}${last}</div><div>${stand('Kierowcy', 'mdi:account-star-outline', A('sensor.f1_driver_standings').driver_standings, true, 99)}${stand('Konstruktorzy', 'mdi:car-sports', A('sensor.f1_constructor_standings').constructor_standings, false, 99)}</div></div>`));
    return [html, (root) => { const tl = root && root.querySelector('#tolive'); if (tl) tl.onclick = () => this._open('f1live'); this._radBind(root); clearInterval(this._f1i); this._f1i = setInterval(() => { if ((this._view === 'f1' || this._view === 'f1live') && !this._formOpen) this._renderSub(); else clearInterval(this._f1i); }, 60000); }];
  }
  _vServer() {
    const S = PC.server; const col = (v, a, b) => v === null ? '#b9b5cf' : v < a ? '#3fb27f' : v < b ? '#d9a521' : '#e5576f'; const pc = (v) => v === null ? '—' : (v >= 100 ? Math.round(v) : v.toFixed(1).replace('.', ',')) + '%';
    const bar = (v, a, b) => `<div class="bar"><i style="width:${v === null ? 0 : Math.min(100, Math.max(3, v))}%;background:${col(v, a, b)}"></i></div>`;
    const nodes = S.nodes.map((n) => { const up = this._s(n.status) === 'on'; const c = this._n(n.cpu), m = this._n(n.mem);
      return `<div class="card kc"><div class="kn"><ha-icon icon="mdi:server"></ha-icon>${esc(n.name)}<em class="${up ? 'g' : 'r'}">${up ? 'online' : 'offline'}</em></div>
      <div class="kr"><span>CPU</span>${bar(c, 60, 90)}<b>${pc(c)}</b></div><div class="kr"><span>RAM</span>${bar(m, 75, 90)}<b>${pc(m)}</b></div></div>`; }).join('');
    const guests = S.guests.map((g) => { const up = ['running', 'on'].includes(this._s(g.status)); const c = this._n(g.cpu), m = this._n(g.mem);
      return `<div class="card gc"><div class="gn"><i class="${up ? 'g' : 'r'}"></i>${esc(g.name)}<small>${g.kind}</small></div><div class="kr"><span>CPU</span>${bar(c, 60, 90)}<b>${pc(c)}</b></div><div class="kr"><span>RAM</span>${bar(m, 75, 90)}<b>${pc(m)}</b></div></div>`; }).join('');
    const st = S.storages.map((s) => { const u = this._n(s.usage);
      return `<div class="lr"><div class="ln">${esc(s.name)}</div>${bar(u, 70, 90)}<b>${pc(u)}</b></div>`; }).join('');
    const html = this._hdr('Serwer', 'mdi:server', 'sky', 'serwer.hdr') + `<div class="kgrid" data-pe="serwer.nodes">${nodes}</div><div data-pe="serwer.guests" style="display:contents"><h2 style="margin-top:30px">Maszyny i kontenery</h2><div class="gg">${guests}</div></div><div data-pe="serwer.stor" style="display:contents"><h2 style="margin-top:30px">Magazyny</h2><div class="card list cc">${st}</div></div>` ;
    return [html, null];
  }

  // ---- wydajnosc dashboardu (widok Serwer): czasy set hass / renderu, pamiec, wezly DOM, FPS ----
  _pfHtml() {
    const a = this._pf || {h: [], r: [], n: []}, avg = (l) => l.length ? l.reduce((x, y) => x + y, 0) / l.length : 0, mx = (l) => l.length ? Math.max(...l) : 0, f1 = (v) => v.toFixed(1).replace('.', ',');
    const root = this.shadowRoot, nodes = root ? root.querySelectorAll('*').length : 0, mem = performance.memory ? Math.round(performance.memory.usedJSHeapSize / 1048576) + ' MB' : 'brak danych';
    const now = Date.now(), per = a.n.filter((t) => now - t < 60000).length, fps = this._pfFps ? this._pfFps + ' kl./s' : 'pomiar…';
    const row = (n, v, bad) => `<div class="lr"><div class="ln">${n}</div><b style="${bad ? 'color:#e5576f' : ''}">${v}</b></div>`;
    return row('Aktualizacja danych (śr. / maks.)', f1(avg(a.h)) + ' / ' + f1(mx(a.h)) + ' ms', avg(a.h) > 25) + row('Rysowanie widoku (śr. / maks.)', a.r.length ? f1(avg(a.r)) + ' / ' + f1(mx(a.r)) + ' ms' : 'jeszcze nie było', avg(a.r) > 80)
      + row('Pominięte przebudowy sekcji', (() => { let k = 0; ['s-hero', 's-status', 's-rooms', 's-air', 's-fuel', 's-cal', 's-links'].forEach((i) => { const e = this.shadowRoot.getElementById(i); if (e && e.__sk) k += e.__sk; }); return (k + (this._subSk || 0)) + ' (wstrzymań: ' + (this._held || 0) + ')'; })(), false) + row('Aktualizacje z HA na minutę', per, per > 240) + row('Płynność animacji', fps, this._pfFps && this._pfFps < 20) + row('Elementy DOM karty', nodes, nodes > 6000) + row('Pamięć JS', mem, false)
      + row('Efekt sezonowy', this._fxKey ? (this._fxKey.split('|')[0] === 'snow' ? 'śnieg' : 'liście') + (this._fxCl ? ' + ludzik' : '') : 'wyłączony', false) + row('Wersja karty', (() => { try { const e = performance.getEntriesByType('resource').find((x) => /pastel-home-card\.js\?v=/.test(x.name)); return e ? 'v' + e.name.split('?v=')[1] : '—'; } catch (x) { return '—'; } })(), false);
  }
  // ---- zdrowie systemu (widok Serwer): martwe czujniki, slabe baterie, urzadzenia bez lacznosci - liczone tylko po wejsciu w widok ----
  _hlHtml() {
    const O = PC.out || {}, ids = new Set([O.t, O.h, PC.pm]); PC.rooms.forEach((r) => { if (r.t) ids.add(r.t); if (r.h) ids.add(r.h); }); PC.temps.concat(PC.hums).forEach((x) => ids.add(x[1]));
    const stale = [...ids].filter(Boolean).map((e) => [e, this._stale(e)]).filter((x) => x[1]);
    const bat = PC.bats.map((e) => [e, this._n(e)]).filter((x) => x[1] !== null && x[1] < (PC.batLow || 30)).sort((a, b) => a[1] - b[1]);
    const off = []; const seen = new Set(); PC.offline.concat(PC.bats.map((b) => [b])).forEach((o) => { if (!seen.has(o[0])) { seen.add(o[0]); if (this._s(o[0]) === 'unavailable') off.push(o[0]); } });
    const row = (e, ic, tx, bad) => `<div class="lr" data-hl="${esc(e)}" style="cursor:pointer"><div class="ln"><ha-icon icon="${ic}" style="--mdc-icon-size:16px;margin-right:6px;color:${bad ? '#e5576f' : '#d9a521'}"></ha-icon>${esc(this._name(e))}</div><b style="${bad ? 'color:#e5576f' : ''}">${tx}</b></div>`;
    const lst = (ar, fn, max) => ar.slice(0, max).map(fn).join('') + (ar.length > max ? `<div class="lr"><div class="ln" style="opacity:.6">… i ${ar.length - max} więcej</div></div>` : '');
    const tile = (n, lb, ic) => `<div style="flex:1;min-width:92px;text-align:center"><div style="font-size:26px;font-weight:700;color:${n ? '#d9a521' : '#3fb27f'}">${n}</div><div style="font-size:12px;opacity:.7"><ha-icon icon="${ic}" style="--mdc-icon-size:14px"></ha-icon> ${lb}</div></div>`;
    const bad = stale.length + bat.length + off.length;
    return `<h2 style="margin-top:30px">Zdrowie systemu</h2><div class="card list cc sk"><div style="display:flex;gap:8px;padding:6px 0 10px">${tile(stale.length, 'nieaktualne', 'mdi:timer-sand')}${tile(bat.length, 'słabe baterie', 'mdi:battery-low')}${tile(off.length, 'bez łączności', 'mdi:lan-disconnect')}</div>`
      + (bad ? lst(off, (e) => row(e, 'mdi:lan-disconnect', 'brak łączności', true), 8) + lst(bat, (x) => row(x[0], 'mdi:battery-low', Math.round(x[1]) + '%', x[1] < (PC.batCrit || 10)), 8) + lst(stale.filter((x) => x[1] !== 'brak'), (x) => row(x[0], 'mdi:timer-sand', 'bez zmian ' + x[1], false), 8)
        : `<div class="lr"><div class="ln">Wszystko działa: czujniki odświeżają się, baterie i urządzenia w normie</div></div>`) + `</div>`;
  }
  _vHealth() {   // osobny widok: stan czujnikow, baterii i urzadzen (wczesniej na dole widoku Serwer)
    return [this._hdr('Zdrowie systemu', 'mdi:heart-pulse', 'mint') + this._hlHtml().replace('<h2 style="margin-top:30px">Zdrowie systemu</h2>', '') + `<h2 style="margin-top:30px">Ten dashboard na tym urządzeniu</h2><div class="card list cc sk" id="pfbox">${this._pfHtml()}</div>`, (root) => {
      this._pfRun();
      const bk = root.querySelector('#back'); if (bk) bk.onclick = () => this._open('ustawienia');
      root.querySelectorAll('[data-hl]').forEach((b) => { b.onclick = () => this._more(b.dataset.hl); });
    }];
  }
  _pfRun() {
    if (this._pfTk) return; const root = this.shadowRoot;
    const fpsTick = () => { if (this._view !== 'zdrowie') return; let n = 0; const t0 = performance.now(); const f = (t) => { n++; if (t - t0 < 1000) requestAnimationFrame(f); else { this._pfFps = Math.round(n * 1000 / (t - t0)); if (this._view === 'zdrowie') this._pfPaint(); } }; requestAnimationFrame(f); };
    fpsTick(); this._pfTk = setInterval(() => { if (this._view !== 'zdrowie' || !this.isConnected) { clearInterval(this._pfTk); this._pfTk = null; return; } fpsTick(); }, 4000);
  }
  _pfPaint() { const b = this.shadowRoot && this.shadowRoot.getElementById('pfbox'); if (b) b.innerHTML = this._pfHtml(); }

  // ---- dziennik / historia dnia ----
  _vLog() {
    const title = this._hdr('Historia dnia', 'mdi:text-box-search-outline', 'butter');
    const ev = window.__jarvisEvents;   // te same dane co dziennik w Jarvisie (jarvis-events.js)
    if (window.__jarvisEventsRefresh && (!this._logT || Date.now() - this._logT > 60000)) { this._logT = Date.now(); window.__jarvisEventsRefresh().then(() => { if (this._view === 'dziennik') this._renderSub(); }); }
    if (!ev) return title + '<div class="empty">Wczytuję…</div>';
    const IC = {motion: 'mdi:motion-sensor', door: 'mdi:door-closed', leak: 'mdi:water-alert', gas: 'mdi:gas-cylinder', alarm: 'mdi:bell-ring', washer: 'mdi:washing-machine', air: 'mdi:air-filter', offline: 'mdi:lan-disconnect'};
    const nice = (t) => t.split(' · ').map((x) => /^PM/.test(x) ? x : x.charAt(0) + x.slice(1).toLowerCase()).join(' · ');
    const mk = (i) => ({t: new Date(i.t), tx: nice(i.text), sev: i.sev, room: i.room || '', ty: i.ty, ic: i.ty === 'door' && i.st === 'on' ? 'mdi:door-open' : (IC[i.ty] || 'mdi:information-outline')});
    const out = ev.items.map(mk), allM = (ev.all || ev.items).filter((i) => i.ty === 'motion').map(mk);
    let f = ''; try { f = localStorage.getItem('pastel_logf') || ''; } catch (e) { /* ignore */ }
    const rooms = Array.from(new Set(PC.events.map((e) => e.room).filter((r) => r && r !== 'DOM')));
    const chips = [['', 'Wszystko']].concat(rooms.map((r) => [r, r[0] + r.slice(1).toLowerCase()]), [['!', 'Alerty']]);
    const flt = out.filter((i) => !f || (f === '!' ? i.sev >= 1 : i.room === f));
    // nowosci: zdarzenia nowsze niz przy poprzedniej wizycie w widoku (znacznik w menu zapala sie od alertow, wiec te oznaczamy mocniej); wizyta zapisuje sie od razu, a podswietlenie trwa do wyjscia z widoku
    const newest = out.reduce((m, i) => Math.max(m, +i.t), 0); let prev = this._logPrev;
    if (prev == null) { let sv = null; try { sv = localStorage.getItem('aurora_log_seen'); } catch (e) { sv = null; } prev = sv === null ? newest : +sv; this._logPrev = prev; try { localStorage.setItem('aurora_log_seen', String(Math.max(newest, prev))); } catch (e) { /* ignore */ } }
    const imp = (i) => i.sev >= 2 && i.ty !== 'motion', nNew = out.filter((i) => +i.t > prev && imp(i)), nAl = nNew.length;   // liczymy tylko wazne alarmy (zalanie, gaz, alarm dzwiekowy, zla jakosc powietrza, blad pralki)
    // pasek 24 h: ruch w pokojach (kazda kratka = godzina, jasnosc = liczba wejsc)
    const now = Date.now(), rows = rooms.map((r) => { const c = Array(24).fill(0); allM.forEach((i) => { if (i.room === r) { const k = 23 - Math.floor((now - i.t) / 3600000); if (k >= 0 && k < 24) c[k]++; } });
      return `<div class="tl"><span>${esc(r[0] + r.slice(1).toLowerCase())}</span>` + c.map((n) => `<i style="opacity:${n ? Math.min(1, .3 + n * .2) : .1}"></i>`).join('') + `</div>`; }).join('');
    const hr = `<div class="tl th"><span></span>` + Array.from({length: 24}, (_, k) => `<em>${k % 6 === 0 ? String((new Date(now - (23 - k) * 3600000)).getHours()).padStart(2, '0') : ''}</em>`).join('') + `</div>`;
    const today = new Date().toDateString(), yest = new Date(now - 864e5).toDateString(); let last = '';
    const rowsH = flt.slice(0, 80).map((i) => { const d = i.t.toDateString(); let sep = ''; if (d !== last) { last = d; sep = `<div class="ds">${d === today ? 'Dziś' : d === yest ? 'Wczoraj' : i.t.getDate() + '.' + String(i.t.getMonth() + 1).padStart(2, '0')}</div>`; }
      const isNew = +i.t > prev && imp(i); return sep + `<div class="lr lg s${i.sev}${isNew ? ' nw' : ''}"><ha-icon icon="${i.ic}"></ha-icon><div class="ln">${esc(i.tx)}${isNew ? '<span class="nwc al">NOWY ALARM</span>' : ''}</div><b>${String(i.t.getHours()).padStart(2, '0')}:${String(i.t.getMinutes()).padStart(2, '0')}</b></div>`; }).join('');
    const banner = `<div class="card lgnw${nNew.length ? ' has' : ''}"><ha-icon icon="${nNew.length ? 'mdi:bell-badge-outline' : 'mdi:check-circle-outline'}"></ha-icon><div>${nNew.length ? `<b>Nowe ważne alarmy od ostatniej wizyty: ${nNew.length}</b><small>Takie wpisy zapalają znacznik przy Historii w menu. Ruch i zwykłe zdarzenia nie są liczone</small>` : '<b>Brak nowych ważnych alarmów</b><small>Znacznik przy Historii świeci tylko przy zalaniu, gazie, alarmie dźwiękowym, złym powietrzu i błędzie pralki</small>'}</div></div>`;
    const html = title + banner + `<h2>Ostatnie 24 godziny</h2><div class="card chartc"><div class="tls">${hr}${rows}</div></div>` +
      `<div class="chips">` + chips.map((c) => `<button data-lf="${esc(c[0])}" class="${f === c[0] ? 'act' : ''}">${esc(c[1])}</button>`).join('') + `</div>` +
      `<div class="card list">` + (flt.length ? rowsH : '<div class="empty">Brak zdarzeń w ciągu 24 h</div>') + `</div>`;
    return [html, (root) => { root.querySelectorAll('[data-lf]').forEach((b) => { b.onclick = () => { try { localStorage.setItem('pastel_logf', b.dataset.lf); } catch (e) { /* ignore */ } this._renderSub(); }; }); }];
  }

  // ---- plan 2D: ten sam rzut obrocony tak, ze wybrane pokoje sa u gory ----
  _vPlan3d() {   // wlasny rzut 3D z gory (SVG z paralaksa): sciany, okna, drzwi i meble wg planu; lampy swieca, obecnosc podswietla podloge
    const R = (id) => PC.rooms.find((q) => q.id === id), on = (e) => ['on', 'playing', 'buffering'].includes(this._s(e)), dk = !!this._dk();
    const occ = {}; PC.rooms.forEach((r) => { if (r.occ && this._s(r.occ) === 'on') occ[r.id] = true; });
    const DV = [];
    const LAB = {};
    const lit = [], tvOn = on('media_player.none'); DV.forEach((d) => { if (!this._hass.states[d[0]] || !on(d[0])) return; if (d[6] === 'tv') lit.push({x: .9, z: 7.33, room: 'salon', r: 1.1, blue: true}); else if (d[5]) lit.push({x: d[1], z: d[2], room: d[4], r: d[5]}); });
    const rp = (id) => { const r = R(id); return r ? this._pal(r.c) : this._pal('sand'); }, pc = (x, z, h) => { const q = PT.pp(x, z, h); return `left:${q[0].toFixed(2)}%;top:${q[1].toFixed(2)}%`; };
    const accs = {}; PC.rooms.forEach((r) => { accs[r.id] = this._pal(r.c)[1]; });
    const svg = PT.render({dk, occ, lit, tvOn, accs, acc: this._pal((R('salon') || {}).c || 'lav')[1]});
    let ov = '';
    Object.keys(LAB).forEach((id) => { const r = R(id); if (!r) return; const t = r.t ? this._n(r.t) : null, h = r.h ? this._n(r.h) : null, lx = r.lux ? this._n(r.lux) : null;
      const rd = [t !== null ? t.toFixed(1).replace('.', ',') + '°' : '', h !== null ? Math.round(h) + '%' : '', lx !== null ? Math.round(lx) + ' lx' : ''].filter(Boolean).join(' · ');
      ov += `<div class="isn" style="${pc(LAB[id][0], LAB[id][1], 0)}" data-go="${id}"><b>${esc(r.name)}</b>${rd ? `<span>${rd}</span>` : ''}</div>`; });
    DV.forEach((d) => { if (!this._hass.states[d[0]]) return; const r = R(d[4]), p = rp(d[4]), o = on(d[0]); let ic = ''; PC.rooms.forEach((q) => q.dev.forEach((v) => { if (v[0] === d[0] && !ic) ic = v[2]; }));
      ic = ic || (/^light\./.test(d[0]) ? 'mdi:ceiling-light' : /^media_player\./.test(d[0]) ? 'mdi:speaker' : 'mdi:power-socket-eu');
      ov += `<button class="isb dev ${o ? 'on' : ''}" data-e="${d[0]}" title="${esc(d[0])}" style="${pc(d[1], d[2], d[3])};${o ? `background:${p[0]};color:${p[1]};box-shadow:0 0 14px ${p[1]}` : ''}"><ha-icon icon="${ic}"></ha-icon></button>`; });
    const wr = R('lazienka'); if (wr && wr.wash) { const ws = this._s(PC.wash.status), run = ws && !PC.wash.idle.includes(ws); ov += `<span class="isb st ${run ? 'run' : ''}" style="${pc(1.16, .34, .95)}"><ha-icon icon="mdi:washing-machine"></ha-icon></span>`; }
    const hr = R('przedpokoj'); if (hr && hr.door) { const o = this._s(hr.door) === 'on'; ov += `<span class="isb st ${o ? 'warn' : ''}" style="${pc(2.93, .55, 1.0)}"><ha-icon icon="${o ? 'mdi:door-open' : 'mdi:door-closed'}"></ha-icon></span>`; }
    return [this._hdr('Plan Mieszkania', 'mdi:floor-plan', 'aqua') + `<div class="iso p2 p3d" style="aspect-ratio:${PT.W}/${PT.H};width:min(100%,calc((100vh - 140px) * ${(PT.W / PT.H).toFixed(3)}))"><svg viewBox="0 0 ${PT.W} ${PT.H}" style="overflow:visible">${svg}</svg>${ov}</div>` +
      `<div class="hint">Rzut 3D z góry. Dotknij lampy lub przełącznika, aby go włączyć; świecąca lampa rozjaśnia pokój, podświetlony pokój = ktoś w nim jest. Dotknij nazwy pokoju, aby go otworzyć.</div>`,
      (root) => { root.querySelectorAll('.isb[data-e]').forEach((el) => this._bindDev(el)); root.querySelectorAll('.isn[data-go]').forEach((el) => { el.onclick = () => this._open('pokoj-' + el.dataset.go); }); }];
  }
  _vPlan2() { return this._vPlan3d(); }

  // ---- asystent ----
  _vAsk() {
    const st = this._s(this._sat()); const L = {listening: 'Słucham…', processing: 'Myślę…', responding: 'Odpowiadam…'}[st] || (!st || st === 'unavailable' ? 'Satelita niedostępny' : 'Gotowy');
    const busy = st === 'listening' || st === 'processing' || st === 'responding'; const n = this._chatLoad().length;
    const pe = this._pipe(), po = pe && this._hass.states[pe], wide = window.innerWidth >= 900;
    const psel = (po && wide) ? `<label class="pipesel"><span>Potok</span><select id="pipesel">${(po.attributes.options || []).map((x) => `<option value="${esc(x)}"${x === po.state ? ' selected' : ''}>${esc(x.charAt(0).toUpperCase() + x.slice(1))}</option>`).join('')}</select></label>` : '';
    const hd = this._hdr('Asystent', 'mdi:creation', 'lav'); const html = this._hdrAdd(hd, psel) + `<div class="card chatx"><div class="chtop"><span class="chst ${busy ? 'on ' + st : ''}" id="chst"><i></i>${L}</span><span style="flex:1"></span>${n ? `<button class="chclr" id="chclr" type="button" title="Wyczyść rozmowę"><ha-icon icon="mdi:broom"></ha-icon>Wyczyść</button>` : ''}</div>
      <div class="chlog" id="chlog">${this._askLogHtml()}</div>
      <form class="inp chform" id="askf"><button class="mic2 ${busy ? 'on' : ''}" id="listen2" type="button" title="Dotknij i mów"><ha-icon icon="mdi:microphone-message"></ha-icon></button><input id="asktx" type="text" placeholder="Napisz do asystenta…" autocomplete="off" enterkeyhint="send"><button class="send" type="submit" title="Wyślij"><ha-icon icon="mdi:send"></ha-icon></button></form></div>` + (wide ? '' : this._pipeSec());
    return [html, (root) => { root.querySelector('#listen2').onclick = () => this._listen();
      const ps = root.querySelector('#pipesel'); if (ps) ps.onchange = () => this._call('select', 'select_option', {entity_id: this._pipe(), option: ps.value});
      root.querySelectorAll('[data-pp]').forEach((b) => { b.onclick = () => this._call('select', 'select_option', {entity_id: this._pipe(), option: b.dataset.pp}); });

      const f = root.querySelector('#askf'), inp = root.querySelector('#asktx'), lg = root.querySelector('#chlog'); lg.scrollTop = lg.scrollHeight;
      f.addEventListener('focusin', () => { this._formOpen = true; });
      f.addEventListener('focusout', (e) => { if (!f.contains(e.relatedTarget)) setTimeout(() => { if (!f.contains(this.shadowRoot.activeElement)) this._formOpen = false; }, 150); });
      f.onsubmit = (e) => { e.preventDefault(); const tx = inp.value.trim(); if (!tx) return; inp.value = ''; this._askSend(tx); };
      const c = root.querySelector('#chclr'); if (c) c.onclick = () => { try { localStorage.removeItem('pastel_chat'); } catch (e) { /* ignore */ } this._convId = null; this._askRefresh(true); c.remove(); }; }];
  }
  _askLiveUpdate() {   // stan satelity na zywo, bez przebudowy widoku (przebudowe blokuje fokus w formularzu, a mikrofon lezy w formularzu)
    const R = this.shadowRoot, cs = R.getElementById('chst'); if (!cs) return;
    const st = this._s(this._sat()); const busy = st === 'listening' || st === 'processing' || st === 'responding';
    const tx = {listening: 'Słucham…', processing: 'Myślę…', responding: 'Odpowiadam…'}[st] || (!st || st === 'unavailable' ? 'Satelita niedostępny' : 'Gotowy');
    const cls = 'chst' + (busy ? ' on ' + st : ''); if (cs.className !== cls) cs.className = cls; if (cs.dataset.t !== tx) { cs.dataset.t = tx; cs.innerHTML = `<i></i>${tx}`; }
    const mb = R.getElementById('listen2'); if (mb) mb.classList.toggle('on', busy);
    const lg = R.getElementById('chlog'); if (!lg) return; const lv = lg.querySelector('.live'), html = this._askLive();
    if (!html) { if (lv) lv.remove(); } else if (!lv || lv.dataset.k !== st) { if (lv) lv.remove(); lg.insertAdjacentHTML('beforeend', html); lg.scrollTop = lg.scrollHeight; }
  }
  _askLive() {   // zywy wskaznik: satelita slucha / mysli / odpowiada
    const st = this._s(this._sat()); const L = {listening: ['Słucham…', 'mdi:microphone'], processing: ['Myślę…', 'mdi:brain'], responding: ['Odpowiadam…', 'mdi:volume-high']}[st]; if (!L) return '';
    return `<div class="live ${st}" data-k="${st}"><span class="lic"><ha-icon icon="${L[1]}"></ha-icon></span><span class="eq"><i></i><i></i><i></i><i></i><i></i></span><b>${L[0]}</b></div>`;
  }
  _askLogHtml() { return this._askLogBase() + this._askLive(); }
  _askLogBase() {
    const h = this._chatLoad(); if (!h.length) return '<div class="empty">Napisz wiadomość albo dotknij mikrofonu. Rozmowy głosowe też pojawią się tutaj, gdy ta karta jest otwarta.</div>';
    const today = new Date().toDateString(); let last = '';
    return h.map((m) => { const d = new Date(m.t), ds = d.toDateString(); let sep = ''; if (ds !== last) { last = ds; sep = `<div class="ds">${ds === today ? 'Dziś' : d.getDate() + '.' + String(d.getMonth() + 1).padStart(2, '0')}</div>`; }
      const hm = String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
      return sep + `<div class="cv"><div class="cm">${esc(hm)}${m.src ? ' · ' + esc(m.src) : ''}</div>` + (m.u ? `<div class="m u">${esc(m.u)}</div>` : '') +
        (m.pend ? `<div class="m a typing"><i></i><i></i><i></i></div>` : m.a ? `<div class="m a">${esc(m.a)}</div>` : '') +
        ((m.tools || []).length ? `<div class="tc">${m.tools.map((x) => `<span>${esc(x)}</span>`).join('')}</div>` : '') + `</div>`; }).join('');
  }
  _askRefresh(force) {   // odswieza tylko okno rozmowy (bez ruszania pola tekstowego)
    const l = this.shadowRoot.getElementById('chlog'); if (!l) return;
    const near = force || l.scrollHeight - l.scrollTop - l.clientHeight < 80; l.innerHTML = this._askLogHtml(); if (near) l.scrollTop = l.scrollHeight;
  }
  // rozmowa tekstem: ten sam potok Assist co satelita (najpierw lokalne intencje, potem model) - jak na HUD
  async _askPipeline() {
    const r = await this._hass.callWS({type: 'assist_pipeline/pipeline/list'}), want = this._s(this._pipe()), l = r.pipelines || [];
    const p = l.find((x) => x.name === want) || l.find((x) => x.id === r.preferred_pipeline) || l[0]; return p ? p.id : r.preferred_pipeline;
  }
  _chatPut(t, patch) { const a = this._chatLoad(); const m = a.find((x) => x.t === t); if (m) Object.assign(m, patch); try { localStorage.setItem('pastel_chat', JSON.stringify(a.slice(-60))); } catch (e) { /* ignore */ } }
  async _askSend(text) {
    const t = Date.now(), a = this._chatLoad(); a.push({u: text, a: '', t, src: 'Tekst', pend: true});
    try { localStorage.setItem('pastel_chat', JSON.stringify(a.slice(-60))); } catch (e) { /* ignore */ }
    this._askRefresh(true);
    let ans = '';
    try {
      const msg = {type: 'assist_pipeline/run', start_stage: 'intent', end_stage: 'intent', input: {text}, pipeline: await this._askPipeline()};
      const ent = this._hass.entities && this._hass.entities[this._sat()]; if (ent && ent.device_id) msg.device_id = ent.device_id;
      if (this._convId) msg.conversation_id = this._convId;
      ans = await new Promise((res, rej) => { let out = '', done = false; const tm = setTimeout(() => fin(new Error('przekroczono czas oczekiwania')), 90000); let un = null;
        const fin = (e) => { if (done) return; done = true; clearTimeout(tm); if (un) { try { un(); } catch (x) { /* ignore */ } } e ? rej(e) : res(out); };
        this._hass.connection.subscribeMessage((ev) => {
          if (ev.type === 'intent-end') { const o = (ev.data && ev.data.intent_output) || {}; const sp = o.response && o.response.speech && o.response.speech.plain && o.response.speech.plain.speech; out = sp || out; if (o.conversation_id) this._convId = o.conversation_id; }
          else if (ev.type === 'error') fin(new Error((ev.data && ev.data.message) || 'błąd potoku')); else if (ev.type === 'run-end') fin(); }, msg).then((u) => { un = u; if (done) { try { u(); } catch (x) { /* ignore */ } } }).catch(fin); });
      ans = ans || '(brak odpowiedzi)';
    } catch (e) { ans = 'Błąd: ' + ((e && (e.message || e.code)) || 'nie udało się wysłać polecenia'); }
    this._chatPut(t, {a: ans, pend: false}); this._askRefresh(true);
  }
  _wakeSec() {
    if (!this._portable() && window.innerWidth < 900) return '';   // slowo wybudzajace tylko na Tab10 i Portable (active5), nie na telefonach
    const b = this._sat().replace('assist_satellite.', ''), E = (k) => `select.${b}_${k}`, o1 = this._hass.states[E('wake_word_1')]; if (!o1) return '';
    const nm = (x) => x === 'Disabled' ? 'Wyłączone' : x.replace(/_/g, ' ').replace(/^./, (c) => c.toUpperCase());
    const row = (e, t) => { const o = this._hass.states[e]; if (!o) return ''; const un = o.state === 'unavailable';
      return `<h2 style="margin-top:14px;font-size:12px">${t}</h2><div class="chips">` + (o.attributes.options || []).map((x) => `<button data-ww="${e}" data-o="${esc(x)}" class="${x === o.state ? 'act' : ''}" ${un ? 'disabled style="opacity:.5"' : ''}>${esc(nm(x))}</button>`).join('') + `</div>`; };
    return `<h2 style="margin-top:26px">Słowo wybudzające</h2><div class="card chartc">${row(E('wake_word_1'), 'Słowo 1')}${row(E('wake_word_2'), 'Słowo 2')}${row(E('wake_word_detection'), 'Wykrywanie')}</div>`;
  }

  // ---- ustawienia ----
  _pipeSec() {
    const e = this._pipe(), o = e && this._hass.states[e]; if (!o) return '';
    const cur = o.state, opts = (o.attributes.options || []).map((x) => `<button class="tv ${x === cur ? 'act' : ''}" data-pp="${esc(x)}"><span>${esc(x.charAt(0).toUpperCase() + x.slice(1))}</span></button>`).join('');
    return `<h2 style="margin-top:18px">Potok asystenta</h2><div class="tvs">${opts}</div>`;
  }
  _thSec() {
    const th = this._th(), fx = (v) => String(v).replace('.', ',');
    const row = (k, nm, v, u) => `<div class="thr"><div class="ln">${nm}</div><button data-th2="${k}" data-d="-1">−</button><b>${fx(v)} ${u}</b><button data-th2="${k}" data-d="1">+</button></div>`;
    return `<h2 style="margin-top:22px">Progi ostrzeżeń</h2><div class="card chartc">` + row('tMin', 'Temperatura – od', th.tMin, '°C') + row('tMax', 'Temperatura – do', th.tMax, '°C') + row('hMin', 'Wilgotność – od', th.hMin, '%') + row('hMax', 'Wilgotność – do', th.hMax, '%') +
      `<div class="foot" style="margin-top:6px">Poza widełkami pokazuje się ostrzeżenie w „Alarmy i ostrzeżenia” i żółta wartość na kafelku; ostrzeżenie krytyczne (czerwone) jest 3–4 °C / 10 p.p. dalej. Progi są wspólne dla wszystkich urządzeń.</div></div>`;
  }
  _vSettings() {
    const m = this._tm();
    const c = this._hass.config || {};
    const hlSec = `<h2 style="margin-top:22px">Zdrowie systemu</h2><div class="card chartc"><div class="seg"><button data-hlv="1"><ha-icon icon="mdi:heart-pulse"></ha-icon> Otwórz widok</button></div><div class="foot" style="margin-top:8px">Nieaktualne czujniki, słabe baterie i urządzenia bez łączności.</div></div>`;
    const liteSec = `<h2 style="margin-top:22px">Tryb oszczędny</h2><div class="card chartc"><div class="seg">` + [['1', 'Włączony', 'mdi:speedometer'], ['0', 'Wyłączony', 'mdi:speedometer-slow']].map((x) => `<button data-lite="${x[0]}" class="${(this._liteU() ? '1' : '0') === x[0] ? 'act' : ''}"><ha-icon icon="${x[2]}"></ha-icon> ${x[1]}</button>`).join('') + `</div><div class="foot" style="margin-top:8px">Dla słabszych tabletów: wyłącza rozmycie tła, cienie, duże znaki wodne na kartach i animacje przejść. Wygląd jest nieco płaski, ale ekran działa płynniej.</div></div>`;
    const leafSec = `<h2 style="margin-top:22px">Efekt sezonowy</h2><div class="card chartc"><div class="seg">` + [['', 'Brak', 'mdi:close-circle-outline'], ['leaves', 'Liście', 'mdi:leaf-maple'], ['snow', 'Śnieg', 'mdi:snowflake']].map((x) => `<button data-fx="${x[0]}" class="${this._fxU() === x[0] ? 'act' : ''}"><ha-icon icon="${x[2]}"></ha-icon> ${x[1]}</button>`).join('') +
      `</div><div class="foot" style="margin-top:8px">Spadające liście (najlepiej z kolorystyką „Jesień”) albo płatki śniegu (najlepiej z kolorystyką „Zima”). Na słabszych tabletach mogą obciążać procesor.</div></div><h2 style="margin-top:22px">Ludzik sprzątający</h2><div class="card chartc"><div class="seg">` +
      [['1', 'Włączony', 'mdi:account-hard-hat'], ['0', 'Wyłączony', 'mdi:account-off-outline']].map((x) => `<button data-cln="${x[0]}" class="${(this._clnU() ? '1' : '0') === x[0] ? 'act' : ''}"><ha-icon icon="${x[2]}"></ha-icon> ${x[1]}</button>`).join('') +
      `</div><div class="foot" style="margin-top:8px">Przy włączonym efekcie liście / śnieg zbierają się na dole ekranu (~10 min), potem przechodzi ludzik z dmuchawą (liście) albo łopatą (śnieg) i je rozgarnia. Działa tylko razem z efektem sezonowym.</div>` + (this._fxCl ? `<div class="seg" style="margin-top:10px"><button data-fxgo="1" class="act"><ha-icon icon="mdi:run-fast"></ha-icon> Wyślij ludzika teraz</button></div>` : '') + `</div>`;
    const edSec = (typeof this._room1 === 'function' || (this._config && this._config.aurora && this._au2b)) ? '' : `<h2 style="margin-top:22px">Układ ekranu głównego</h2><div class="card chartc"><div class="seg"><button data-ed0="1" class="act"><ha-icon icon="mdi:view-grid-edit-outline"></ha-icon> Edytuj układ na tym urządzeniu</button></div><div class="seg" style="margin-top:8px"><button data-bk="save"><ha-icon icon="mdi:cloud-upload-outline"></ha-icon> Zapisz kopię w HA</button><button data-bk="load"><ha-icon icon="mdi:cloud-download-outline"></ha-icon> Wczytaj kopię z HA</button></div><div class="foot" id="bkst" style="margin-top:6px${this._bkM && this._bkM[1] ? ';color:#e5576f' : ''}">${this._bkM ? esc(this._bkM[0]) : 'Kopia obejmuje układ, schemat kolorów, efekty i inne ustawienia tego ekranu; wczytanie jej na innym urządzeniu przenosi je tam.'}</div><div class="foot" style="margin-top:8px">Zmiana kolejności i ukrywanie sekcji oraz skrótów zapisuje się tylko w tej przeglądarce (tablet, telefon) i ma pierwszeństwo przed układem z Edytora Pastel.${this._lo() ? ' Masz zapisany własny układ: „Domyślny” w trybie edycji przywraca układ z edytora.' : ''}</div></div>`;
    const hdrSec = `<h2 style="margin-top:22px">Górna belka Home Assistanta</h2><div class="card chartc"><div class="seg">` + [['0', 'Widoczna', 'mdi:arrow-expand-down'], ['1', 'Ukryta', 'mdi:arrow-collapse-up']].map((x) => `<button data-kh="${x[0]}" class="${((this._kS && this._kS.h) ? '1' : '0') === x[0] ? 'act' : ''}"><ha-icon icon="${x[2]}"></ha-icon> ${x[1]}</button>`).join('') + `</div><div class="foot" style="margin-top:8px">Chowa pasek z nazwą dashboardu i przyciskiem menu. Zmiana dotyczy tego urządzenia. Pasek boczny HA otworzysz w „Więcej” → „Menu HA”.</div></div>`;
    const hudBgSec = this._aur() ? `<h2 style="margin-top:22px">Tło</h2><div class="card chartc"><div class="seg">` + [['', 'Domyślne', 'mdi:restore'], ['sky', 'Żywy horyzont', 'mdi:weather-sunset']].map((x) => `<button data-hbg="${x[0]}" class="${(hudBgOn() ? 'sky' : '') === x[0] ? 'act' : ''}"><ha-icon icon="${x[2]}"></ha-icon> ${x[1]}</button>`).join('') + `</div><div class="foot" style="margin-top:8px">„Żywy horyzont”: niebo zależne od prawdziwej pozycji słońca, pogody i pory dnia. Słońce i księżyc wędrują po łuku, na horyzoncie leżą wzgórza, a nocą pojawiają się gwiazdy i zorze. Działa w ciemnym motywie; w trybie oszczędnym zorze stoją w miejscu.</div></div>` : '';
    const popSec = `<h2 style="margin-top:22px">Otwieranie widoków</h2><div class="card chartc"><div class="seg">` + [['0', 'Pełny ekran', 'mdi:fullscreen'], ['1', 'Okienko (popup)', 'mdi:window-restore']].map((x) => `<button data-pop="${x[0]}" class="${(this._popU() ? '1' : '0') === x[0] ? 'act' : ''}"><ha-icon icon="${x[2]}"></ha-icon> ${x[1]}</button>`).join('') + `</div></div>`;
    const dshHud = `<h2 style="margin-top:22px">Kształt przycisków</h2><div class="card chartc"><div class="seg">` + [['', 'Domyślny', 'mdi:restore'], ['sq', 'Kwadrat', 'mdi:square-rounded-outline'], ['ci', 'Koło', 'mdi:circle-outline'], ['pi', 'Pigułka', 'mdi:pill']].map((x) => `<button data-dsh="${x[0]}" class="${this._dshU() === x[0] ? 'act' : ''}"><ha-icon icon="${x[2]}"></ha-icon> ${x[1]}</button>`).join('') + `</div></div>`;
    const hudSchSec = this._aur() ? `<h2 style="margin-top:22px">Kolorystyka</h2><div class="card chartc"><div class="sch">${HUD_SCH.map((x) => `<button data-hsch="${x.id}" class="${hudSch().id === x.id ? 'act' : ''}"><i style="background:linear-gradient(135deg,${x.a},${x.b})"></i><span>${x.n}</span></button>`).join('')}</div></div>` : '';
    const pasSchSec = `<h2 style="margin-top:22px">Kolorystyka</h2><div class="card chartc"><div class="sch">${SCHEMES.map((x) => { const a = this._rc('#8f78e0'), b = rotHex('#ffc6dc', x.d); const ac = rotHex('#8f78e0', x.d), bc = rotHex('#e4dcff', x.d); return `<button data-sch="${x.id}" class="${this._scheme().id === x.id ? 'act' : ''}"><i style="background:${x.sw || `linear-gradient(135deg,${ac},${rotHex('#ffc6dc', x.d)})`}"></i><span>${x.n}</span></button>`; }).join('')}</div><div class="hue"><span>Własny odcień</span><input type="range" min="0" max="360" step="1" class="rng hr" value="${this._hue()}" aria-label="Odcień"><b class="hd" style="background:${rotHex('#8f78e0', this._hue() - 252)}"></b></div></div>`;
    const pasShape = `<h2 style="margin-top:22px">Kształt przycisków</h2><div class="card chartc"><div class="seg">` +
      [['', 'Domyślny', 'mdi:restore'], ['rect', 'Prostokąt', 'mdi:rectangle-outline'], ['sq', 'Kwadrat', 'mdi:square-rounded-outline'], ['ci', 'Koło', 'mdi:circle-outline'], ['pi', 'Pigułka', 'mdi:pill']].map((x) => `<button data-dsh="${x[0]}" class="${this._dshU() === x[0] ? 'act' : ''}"><ha-icon icon="${x[2]}"></ha-icon> ${x[1]}</button>`).join('') +
      `</div></div>`;
    let html = this._hdr('Ustawienia', 'mdi:cog-outline', 'rose') + `<h2>Styl dashboardu</h2><div class="card chartc"><div class="seg">` + [['pastel', 'Pastel', 'mdi:flower-tulip-outline'], ['aurora', 'Aurora', 'mdi:weather-night']].map((x) => `<button data-sty="${x[0]}" class="${(this._aur() ? 'aurora' : 'pastel') === x[0] ? 'act' : ''}"><ha-icon icon="${x[2]}"></ha-icon> ${x[1]}</button>`).join('') + `</div></div><h2 style="margin-top:22px">Motyw</h2><div class="card chartc"><div class="seg">` +
      [['light', 'Jasny', 'mdi:white-balance-sunny'], ['dark', 'Ciemny', 'mdi:weather-night'], ['auto', 'Auto', 'mdi:theme-light-dark']].map((x) => `<button data-th="${x[0]}" class="${m === x[0] ? 'act' : ''}"><ha-icon icon="${x[2]}"></ha-icon> ${x[1]}</button>`).join('') +
      '</div></div>' + (this._aur() ? hudSchSec + hudBgSec : pasSchSec) + popSec + hdrSec + edSec + hlSec + liteSec + leafSec + (this._aur() ? '' : pasShape) + `${this._wakeSec()}${this._thSec()}<h2 style="margin-top:26px">Informacje</h2><div class="card list"><div class="lr"><div class="ln">Użytkownik</div><b>${esc((this._hass.user && this._hass.user.name) || '—')}</b></div>
      <div class="lr"><div class="ln">Pastel</div><b>v${esc(PVER)}</b></div><div class="lr"><div class="ln">Home Assistant</div><b>${esc(c.version || '—')}</b></div><div class="lr"><div class="ln">Lokalizacja</div><b>${esc(c.location_name || '—')}</b></div>
      <div class="lr"><div class="ln">Encje</div><b>${Object.keys(this._hass.states).length}</b></div></div>
      <div class="card chartc"><button class="dev" id="rl" style="width:100%;justify-content:center"><ha-icon icon="mdi:refresh"></ha-icon><span>Odśwież dashboard</span></button></div>`;
    if (this._config && this._config.aurora) html = html.replace(/<h2>Styl dashboardu<\/h2><div class="card chartc"><div class="seg">.*?<\/div><\/div>/, '');   // dashboard Aurora: bez przelacznika Aurora/Pastel
    return [html, (root) => { const hr = root.querySelector('.hr'); if (hr) { const hd = root.querySelector('.hd');
        hr.oninput = () => { try { localStorage.setItem('pastel_scheme', 'custom'); localStorage.setItem('pastel_hue', hr.value); } catch (e) { /* ignore */ } hd.style.background = rotHex('#8f78e0', +hr.value - 252); this._applyScheme(); };
        hr.onchange = () => { this._sig = ''; this.hass = this._hass; }; }
      root.querySelectorAll('[data-sty]').forEach((b) => { b.onclick = () => { try { localStorage.setItem('pastel_style', b.dataset.sty); } catch (e) { /* ignore */ } this._sig = ''; this.hass = this._hass; }; });
      root.querySelectorAll('[data-hbg]').forEach((b) => { b.onclick = () => { try { if (b.dataset.hbg) localStorage.setItem('hud_bg', b.dataset.hbg); else localStorage.removeItem('hud_bg'); } catch (e) { /* ignore */ } const bg = this.shadowRoot.getElementById('hudbg'); if (bg) bg.dataset.k = ''; this._sig = ''; this.hass = this._hass; try { hudBg(this); } catch (e) { /* ignore */ } root.querySelectorAll('[data-hbg]').forEach((x) => x.classList.toggle('act', x === b)); }; });
      root.querySelectorAll('[data-hsch]').forEach((b) => { b.onclick = () => { try { localStorage.setItem('hud_scheme', b.dataset.hsch); } catch (e) { /* ignore */ } this._sig = ''; this.hass = this._hass; }; });
      root.querySelectorAll('[data-sch]').forEach((b) => { b.onclick = () => { try { localStorage.setItem('pastel_scheme', b.dataset.sch); } catch (e) { /* ignore */ } this._sig = ''; this.hass = this._hass; }; });
      root.querySelectorAll('[data-hlv]').forEach((b) => { b.onclick = () => this._open('zdrowie'); });
      root.querySelectorAll('[data-lite]').forEach((b) => { b.onclick = () => { try { localStorage.setItem('pastel_lite', b.dataset.lite); } catch (e) { /* ignore */ } this.classList.toggle('lite', b.dataset.lite === '1'); this._renderSub(); }; });
      root.querySelectorAll('[data-fx]').forEach((b) => { b.onclick = () => { try { localStorage.setItem('pastel_fx', b.dataset.fx); } catch (e) { /* ignore */ } this._applyLeaves(); this._renderSub(); }; });
      root.querySelectorAll('[data-bk]').forEach((b) => { b.onclick = () => this._bk(b.dataset.bk); });
      root.querySelectorAll('[data-ed0]').forEach((b) => { b.onclick = () => { this._back(); setTimeout(() => this._edStart(), 350); }; });
      root.querySelectorAll('[data-kh]').forEach((b) => { b.onclick = () => { if (!this._kS) this._kS = {h: this._kGet('h')}; if ((b.dataset.kh === '1') !== !!this._kS.h) this._kToggle('h'); this._renderSub(); }; });
      root.querySelectorAll('[data-fxgo]').forEach((b) => { b.onclick = () => this._fxForce(); });
      root.querySelectorAll('[data-cln]').forEach((b) => { b.onclick = () => { try { localStorage.setItem('pastel_cleaner', b.dataset.cln); } catch (e) { /* ignore */ } this._applyLeaves(); this._renderSub(); }; });
      root.querySelectorAll('[data-pop]').forEach((b) => { b.onclick = () => { try { localStorage.setItem('pastel_popup', b.dataset.pop); } catch (e) { /* ignore */ } this._sig = ''; this.hass = this._hass; this._applyView(); this._renderSub(); }; });
      root.querySelectorAll('[data-dsh]').forEach((b) => { b.onclick = () => { try { localStorage.setItem('pastel_dsh', b.dataset.dsh); } catch (e) { /* ignore */ } this._sig = ''; this.hass = this._hass; this._renderSub(); }; });
      root.querySelectorAll('[data-th]').forEach((b) => { b.onclick = () => { try { localStorage.setItem(this._aur() ? 'hud_theme' : 'pastel_theme', b.dataset.th); } catch (e) { /* ignore */ } this._sig = ''; this.hass = this._hass; }; });
      root.querySelectorAll('[data-ww]').forEach((b) => { b.onclick = () => this._call('select', 'select_option', {entity_id: b.dataset.ww, option: b.dataset.o}); });
      root.querySelectorAll('[data-th2]').forEach((b) => { b.onclick = () => { const k = b.dataset.th2, e = TH[k], st = this._hass.states[e]; if (!st) return; const stp = k[0] === 't' ? 0.5 : 1, v = Math.min(+st.attributes.max, Math.max(+st.attributes.min, this._th()[k] + stp * +b.dataset.d)); this._call('input_number', 'set_value', {entity_id: e, value: v}); }; });
      root.querySelector('#rl').onclick = () => location.reload(); }];
  }

  // ---- kalendarz ----
  _calMeta(cal) { const s = this._hass.states[cal]; const f = (s && s.attributes.supported_features) || 0; return {create: !!(f & 1), del: !!(f & 2), upd: !!(f & 4), name: (s && s.attributes.friendly_name) || cal}; }
  _vCal() {
    const COL = ['#8f78e0', '#f08a5d', '#3fb27f', '#e5719a', '#5a9be0', '#e0b020', '#2fb5b0', '#d0507a', '#8dbb3a', '#e8604c', '#7a8ee6', '#b98a5e', '#b46be0', '#4db8e8']; const cals = Object.keys(this._hass.states).filter((e) => e.startsWith('calendar.')).sort();
    const MN = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
    const p2 = (n) => String(n).padStart(2, '0'); const key = (d) => d.getFullYear() + '-' + p2(d.getMonth() + 1) + '-' + p2(d.getDate());
    const f2 = (d) => p2(d.getHours()) + ':' + p2(d.getMinutes());
    const now = new Date(); const d0 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const c = this._cm || (this._cm = {y: now.getFullYear(), m: now.getMonth()}); const mk = c.y + '-' + c.m;
    if (!this._mev || !this._mev[mk]) this._loadMonth();
    if (!this._ch) { try { this._ch = JSON.parse(localStorage.getItem('pastel_cal_hide') || '[]'); } catch (e) { this._ch = []; } }
    const mev = ((this._mev && this._mev[mk]) || []).filter((e) => !this._ch.includes(e.cal));
    const byDay = {}; mev.forEach((e) => { for (let d = new Date(e.s.getFullYear(), e.s.getMonth(), e.s.getDate()); d <= e.e && d - e.s < 40 * 86400000; d.setDate(d.getDate() + 1)) (byDay[key(d)] = byDay[key(d)] || []).push(e); });
    const SW = {};
    const cc = (cl) => COL[(cl in SW ? SW[cl] : Math.max(0, cals.indexOf(cl))) % COL.length]; const col = (e) => cc(e.cal);
    const first = new Date(c.y, c.m, 1); const off = (first.getDay() + 6) % 7; const dim = new Date(c.y, c.m + 1, 0).getDate(); const rows = Math.ceil((off + dim) / 7);
    let cells = '<div class="mh wkh">tyg.</div>' + ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So', 'Nd'].map((x, i) => `<div class="mh${i > 4 ? ' we' : ''}">${x}</div>`).join('');
    for (let i = 0; i < rows * 7; i++) { const d = new Date(c.y, c.m, 1 - off + i); const k = key(d); const ev = byDay[k] || []; const out = d.getMonth() !== c.m; const hn = plHolidays(d.getFullYear())[p2(d.getMonth() + 1) + '-' + p2(d.getDate())];
      if (i % 7 === 0) cells += `<div class="wk">${isoWeek(d)}</div>`;
      cells += `<button class="mc${out ? ' out' : ''}${hn ? ' hol' : ''}${k === key(d0) ? ' today' : ''}${k === this._cd ? ' sel' : ''}${(i % 7) > 4 ? ' we' : ''}" data-day="${k}"><b>${d.getDate()}</b>${hn ? `<span class="hn">${esc(hn)}</span>` : ''}<span class="dots">${ev.slice(0, 3).map((e) => `<i style="background:${col(e)}"></i>`).join('')}${ev.length > 3 ? '<em>+</em>' : ''}</span></button>`; }
    const years = []; for (let y = now.getFullYear() - 2; y <= now.getFullYear() + 3; y++) years.push(y);
    const nav = `<div class="card mon"><div class="mnav"><button class="ib" id="cm-p"><ha-icon icon="mdi:chevron-left"></ha-icon></button>
      <select id="cm-m">${MN.map((n, i) => `<option value="${i}"${i === c.m ? ' selected' : ''}>${n}</option>`).join('')}</select><select id="cm-y">${years.map((y) => `<option${y === c.y ? ' selected' : ''}>${y}</option>`).join('')}</select>
      <button class="ib" id="cm-n"><ha-icon icon="mdi:chevron-right"></ha-icon></button><span style="flex:1"></span><button class="chipb" id="cm-t">Dziś</button><button class="chipb add" id="addev"><ha-icon icon="mdi:plus"></ha-icon>Dodaj</button></div>
      <div class="cfd"><button class="chipb cfb" id="cfb" type="button"><ha-icon icon="mdi:filter-variant"></ha-icon><span>Kalendarze · ${cals.filter((x) => !this._ch.includes(x)).length}/${cals.length}</span><span class="cfdots">${cals.filter((x) => !this._ch.includes(x)).map((x) => `<i style="background:${cc(x)}"></i>`).join('')}</span><ha-icon icon="${this._cfo ? 'mdi:chevron-up' : 'mdi:chevron-down'}"></ha-icon></button>${this._cfo ? `<div class="cfp">${cals.map((cl) => `<button class="cfr${this._ch.includes(cl) ? '' : ' on'}" data-fl="${cl}" type="button"><i class="ck"><ha-icon icon="mdi:check"></ha-icon></i><i class="cdot" style="background:${cc(cl)}"></i><span>${esc(/^F1/i.test(this._calMeta(cl).name) ? 'F1' : this._calMeta(cl).name.replace(/^Kalendarz\s+/i, '').replace(/^./, (m) => m.toUpperCase()))}</span></button>`).join('')}<div class="cfa"><button class="chipb" id="cfall" type="button">Wszystkie</button><button class="chipb" id="cfnone" type="button">Żaden</button></div></div>` : ''}</div></div><div class="mgrid" style="grid-template-rows:auto repeat(${rows},1fr)">${cells}</div></div>`;
    let list, ttl;
    if (this._cd) { list = byDay[this._cd] || []; const sd = new Date(this._cd + 'T00:00:00'); ttl = `${sd.getDate()} ${MONTHS[sd.getMonth()]} ${sd.getFullYear()}`; }
    else { list = this._events.filter((e) => !this._ch.includes(e.cal) && (e.e >= now || e.s >= d0)).slice(0, this._calMore ? 60 : 12); ttl = 'Najbliższe wydarzenia'; }
    const row = (e) => { const m = this._calMeta(e.cal); const dd = Math.round((new Date(e.s.getFullYear(), e.s.getMonth(), e.s.getDate()) - d0) / 86400000);
      const when = (this._cd ? '' : (dd === 0 ? 'Dziś' : dd === 1 ? 'Jutro' : DAYS[e.s.getDay()]) + ' · ') + (e.ad ? 'Cały dzień' : f2(e.s) + '–' + f2(e.e));
      return `<div class="ev"><div class="cb" style="background:${col(e)}"></div><div class="dt"><b>${e.s.getDate()}</b><small>${MONTHS[e.s.getMonth()].slice(0, 3)}</small></div><div style="flex:1;min-width:0"><div class="tt">${esc(e.t)}</div><div class="wn">${when}${e.loc ? ' · ' + esc(e.loc) : ''} · ${esc(m.name)}</div></div>
        ${m.upd && e.uid ? `<button class="ib" data-ed="${esc(e.cal)}|${esc(e.uid)}|${esc(e.rid || '')}"><ha-icon icon="mdi:pencil"></ha-icon></button>` : ''}${m.del && e.uid ? `<button class="ib rd" data-dl="${esc(e.cal)}|${esc(e.uid)}|${esc(e.rid || '')}"><ha-icon icon="mdi:close"></ha-icon></button>` : ''}</div>`; };
    const hsd = this._cd ? new Date(this._cd + 'T00:00:00') : null, hdn = hsd ? plHolidays(hsd.getFullYear())[p2(hsd.getMonth() + 1) + '-' + p2(hsd.getDate())] : '';
    const holRow = hdn ? `<div class="ev hol"><div class="cb"></div><div class="dt"><b>${hsd.getDate()}</b><small>${MONTHS[hsd.getMonth()].slice(0, 3)}</small></div><div style="flex:1;min-width:0"><div class="tt">${esc(hdn)}</div><div class="wn">Święto – dzień wolny od pracy · tydz. ${isoWeek(hsd)}</div></div></div>` : '';
    const more = !this._cd && !this._calMore && this._events.filter((e) => !this._ch.includes(e.cal) && (e.e >= now || e.s >= d0)).length > 12 ? '<button class="chipb" id="cm-more" style="margin:8px auto 4px;display:block">Pokaż więcej</button>' : '';
    if (this._cf === undefined) { try { this._cf = localStorage.getItem('pastel_cal_fold') === '1'; } catch (e) { this._cf = false; } }
    const html = this._hdr('Kalendarz', 'mdi:calendar-heart', 'lav') + nav + `<h2 id="cm-fold" style="margin-top:14px;cursor:pointer"><ha-icon icon="mdi:calendar-clock"></ha-icon>${ttl} · ${list.length}<span style="flex:1"></span>${this._cd ? '<button class="chipb" id="cm-all">Najbliższe</button>' : ''}<ha-icon icon="mdi:chevron-${this._cf ? 'down' : 'up'}"></ha-icon></h2>
      ${this._cf ? '' : `<div class="card cal">${holRow}${list.length ? list.map(row).join('') : (holRow ? '' : '<div class="empty">Brak wydarzeń ✨</div>')}${more}</div>`}`;
    return [html, (root) => {
      const go = () => { this._sig = ''; this._cd = null; this._loadMonth(); this._renderSub(); };
      const mv = (n) => { c.m += n; if (c.m < 0) { c.m = 11; c.y--; } if (c.m > 11) { c.m = 0; c.y++; } go(); };
      root.querySelector('#cm-p').onclick = () => mv(-1); root.querySelector('#cm-n').onclick = () => mv(1);
      root.querySelector('#cm-m').onchange = (x) => { c.m = +x.target.value; go(); }; root.querySelector('#cm-y').onchange = (x) => { c.y = +x.target.value; go(); };
      root.querySelector('#cm-t').onclick = () => { c.y = now.getFullYear(); c.m = now.getMonth(); go(); };
      root.querySelectorAll('[data-day]').forEach((b) => { b.onclick = () => { const d = new Date(b.dataset.day + 'T00:00:00'); this._cd = this._cd === b.dataset.day ? null : b.dataset.day; if (d.getMonth() !== c.m) { c.m = d.getMonth(); c.y = d.getFullYear(); this._loadMonth(); } this._renderSub(); }; });
      const sv = () => { try { localStorage.setItem('pastel_cal_hide', JSON.stringify(this._ch)); } catch (e) { /* ignore */ } this._renderSub(); };
      const fb = root.querySelector('#cfb'); if (fb) fb.onclick = () => { this._cfo = !this._cfo; this._renderSub(); };
      const fa = root.querySelector('#cfall'); if (fa) fa.onclick = () => { this._ch = []; sv(); };
      const fn = root.querySelector('#cfnone'); if (fn) fn.onclick = () => { this._ch = cals.slice(); sv(); };
      root.querySelectorAll('[data-fl]').forEach((b) => { b.onclick = () => { const k = b.dataset.fl; this._ch = this._ch.includes(k) ? this._ch.filter((x) => x !== k) : this._ch.concat(k); try { localStorage.setItem('pastel_cal_hide', JSON.stringify(this._ch)); } catch (e) { /* ignore */ } this._renderSub(); }; });
      const al = root.querySelector('#cm-all'); if (al) al.onclick = (x) => { x.stopPropagation(); this._cd = null; this._renderSub(); };
      root.querySelector('#cm-fold').onclick = () => { this._cf = !this._cf; try { localStorage.setItem('pastel_cal_fold', this._cf ? '1' : '0'); } catch (e) { /* ignore */ } this._renderSub(); };
      const mo = root.querySelector('#cm-more'); if (mo) mo.onclick = () => { this._calMore = true; this._renderSub(); };
      root.querySelector('#addev').onclick = () => this._evForm(null, this._cd);
      const find = (s) => { const [cc, u, r] = s.split('|'); return [cc, u, r, mev.concat(this._events).find((x) => x.cal === cc && x.uid === u && (x.rid || '') === r)]; };
      root.querySelectorAll('[data-ed]').forEach((b) => { b.onclick = () => this._evForm(find(b.dataset.ed)[3]); });
      root.querySelectorAll('[data-dl]').forEach((b) => { b.onclick = async () => { if (!confirm('Usunąć to wydarzenie?')) return; const [cc, u, r] = find(b.dataset.dl); const msg = {type: 'calendar/event/delete', entity_id: cc, uid: u};
        if (r) { msg.recurrence_id = r; msg.recurrence_range = 'THISANDFUTURE'; } try { await this._hass.callWS(msg); } catch (e) { alert('Błąd: ' + ((e && e.message) || e)); } this._mev = {}; this._loadEvents(); this._loadMonth(); }; });
    }];
  }
  _evForm(ev, day) {
    this._formOpen = true; const $ = this._$; const p2 = (n) => String(n).padStart(2, '0'); const key = (d) => d.getFullYear() + '-' + p2(d.getMonth() + 1) + '-' + p2(d.getDate());
    const cals = Object.keys(this._hass.states).filter((e) => e.startsWith('calendar.') && (ev ? e === ev.cal : this._calMeta(e).create));
    const n = day ? new Date(day + 'T00:00:00') : new Date(); const h1 = day ? 9 : Math.min(22, n.getHours() + 1);
    const s = ev ? ev.s : new Date(n.getFullYear(), n.getMonth(), n.getDate(), h1, 0), e = ev ? ev.e : new Date(n.getFullYear(), n.getMonth(), n.getDate(), h1 + 1, 0);
    const sheet = document.createElement('div'); sheet.className = 'sheet'; sheet.innerHTML = `<form class="fm"><div class="ft">${ev ? 'Edytuj wydarzenie' : 'Nowe wydarzenie'}</div>
      <label>Tytuł<input id="f_t" type="text" maxlength="120" value="${esc(ev ? ev.t : '')}" placeholder="np. Wizyta u lekarza"></label>
      <label>Kalendarz<select id="f_c" ${ev ? 'disabled' : ''}>${cals.map((c) => `<option value="${c}">${esc(this._calMeta(c).name)}</option>`).join('')}</select></label>
      <label class="chk"><input id="f_ad" type="checkbox" ${ev && ev.ad ? 'checked' : ''}> Cały dzień</label>
      <div class="two"><label>Od<input id="f_d1" type="date" value="${key(s)}"></label><label class="tm">Godz.<input id="f_t1" type="time" value="${p2(s.getHours())}:${p2(s.getMinutes())}"></label></div>
      <div class="two"><label>Do<input id="f_d2" type="date" value="${key(e)}"></label><label class="tm">Godz.<input id="f_t2" type="time" value="${p2(e.getHours())}:${p2(e.getMinutes())}"></label></div>
      <label>Miejsce<input id="f_l" type="text" maxlength="120" value="${esc(ev ? ev.loc : '')}"></label><label>Opis<input id="f_o" type="text" maxlength="300" value="${esc(ev ? ev.desc : '')}"></label>
      <div class="msg" id="msg"></div><div class="two"><button type="button" class="ghost" id="cn">Anuluj</button><button type="submit" class="pri">Zapisz</button></div></form>`;
    $('app').appendChild(sheet); const q = (id) => sheet.querySelector('#' + id); const close = () => { sheet.remove(); this._formOpen = false; this._renderSub(); };
    const ad = () => { q('f_t1').parentNode.style.display = q('f_t2').parentNode.style.display = q('f_ad').checked ? 'none' : ''; }; q('f_ad').onchange = ad; ad();
    q('cn').onclick = close; sheet.onclick = (x) => { if (x.target === sheet) close(); };
    sheet.querySelector('form').onsubmit = async (x) => { x.preventDefault(); const m = (t) => { q('msg').textContent = t; };
      const title = q('f_t').value.trim(); const d1 = q('f_d1').value, d2 = q('f_d2').value || d1, t1 = q('f_t1').value, t2 = q('f_t2').value, all = q('f_ad').checked;
      if (!title) return m('Podaj tytuł'); if (!d1) return m('Podaj datę');
      const data = {summary: title, location: q('f_l').value.trim(), description: q('f_o').value.trim()};
      if (all) { if (d2 < d1) return m('Koniec przed początkiem'); const z = new Date(d2 + 'T00:00:00'); z.setDate(z.getDate() + 1); data.start_date = d1; data.end_date = key(z); }
      else { if (d2 + t2 <= d1 + t1) return m('Koniec musi być po początku'); data.start_date_time = d1 + ' ' + t1 + ':00'; data.end_date_time = d2 + ' ' + t2 + ':00'; }
      m('Zapisuję…');
      try {
        if (ev) { const msg = {type: 'calendar/event/update', entity_id: ev.cal, uid: ev.uid, event: {summary: title, description: data.description, location: data.location, dtstart: all ? data.start_date : data.start_date_time, dtend: all ? data.end_date : data.end_date_time}};
          if (ev.rid) { msg.recurrence_id = ev.rid; msg.recurrence_range = 'THISANDFUTURE'; } await this._hass.callWS(msg); }
        else { const d = {...data}; if (!d.location) delete d.location; if (!d.description) delete d.description; await this._hass.callService('calendar', 'create_event', d, {entity_id: q('f_c').value}); }
        sheet.remove(); this._formOpen = false; this._mev = {}; await this._loadEvents(); await this._loadMonth(); this._renderSub();
      } catch (err) { m('Błąd: ' + ((err && err.message) || err)); }
    };
  }
}
if (!customElements.get('pastel-home-card')) customElements.define('pastel-home-card', PastelHomeCard);
window.customCards = window.customCards || [];
window.customCards.push({type: 'pastel-home-card', name: 'Jarvis Pastel', description: 'Pastelowy dashboard mobilny'});

// ---- wygaszacz ekranu (Kiosk Satellite): pelnoekranowa animacja pogody, zegar, temperatura na zewnatrz i alarmy ----
const SV_CSS = `
:host { display: block; } :host([hidden]) { display: none; }
.sv { position: fixed; inset: 0; z-index: 99999; overflow: hidden; color: #3a3552; font-family: 'Nunito','Quicksand','Segoe UI',system-ui,-apple-system,Roboto,sans-serif; background: linear-gradient(160deg, #ffe9d6, #ffd9ec 45%, #cfe6ff); }
.sv.c-partlycloudy, .sv.c-windy { background: linear-gradient(160deg, #ffeede, #ece0ff 50%, #cfe3ff); }
.sv.c-cloudy { background: linear-gradient(160deg, #ece9f6, #dde1f2 50%, #cfd8ea); }
.sv.c-rain { background: linear-gradient(160deg, #d3dcf2, #c0cdec 50%, #afbce0); }
.sv.c-snow { background: linear-gradient(160deg, #f5f1ff, #e6eeff 50%, #d8e5f7); }
.sv.c-fog { background: linear-gradient(160deg, #eeedf4, #e3e4ee 50%, #d9dbe8); }
.sv.c-storm { background: linear-gradient(160deg, #c3bde0, #a9aedb 50%, #939ccf); }
.sv.n { color: #f1eefc; background: linear-gradient(160deg, #1d1a3a, #262450 50%, #2f3566); }
.sv.n.c-cloudy, .sv.n.c-partlycloudy, .sv.n.c-fog, .sv.n.c-windy { background: linear-gradient(160deg, #1f2038, #2a2d4c 50%, #343a5c); }
.sv.n.c-rain, .sv.n.c-snow { background: linear-gradient(160deg, #1a2038, #232c52 50%, #2b3866); }
.sv.n.c-storm { background: linear-gradient(160deg, #1b1833, #262248 50%, #2e2c5a); }
.sv i { position: absolute; display: block; will-change: transform; }
.sun { right: 7vw; top: 6vh; width: 36vh; height: 36vh; border-radius: 50%; background: radial-gradient(circle, #fff8cf 0 26%, rgba(255,216,110,.8) 27% 42%, rgba(255,216,110,0) 70%); animation: svpulse 8s ease-in-out infinite; }
.moon { right: 9vw; top: 8vh; width: 15vh; height: 15vh; color: #fff4cf; filter: drop-shadow(0 0 2vh rgba(255,244,207,.6)); }
.st { width: .7vh; height: .7vh; border-radius: 50%; background: #fff; box-shadow: 0 0 1vh #fff; animation: svtw 4s ease-in-out infinite; }
.cl { width: 42vw; height: 17vh; border-radius: 50%; left: 0; background: radial-gradient(ellipse at 50% 55%, rgba(255,255,255,.85) 0 42%, rgba(255,255,255,0) 72%); animation: svdrift linear infinite; }
.n .cl { background: radial-gradient(ellipse at 50% 55%, rgba(190,200,250,.26) 0 42%, rgba(190,200,250,0) 72%); }
.dk .cl { background: radial-gradient(ellipse at 50% 55%, rgba(120,125,160,.55) 0 42%, rgba(120,125,160,0) 72%); }
.n.dk .cl { background: radial-gradient(ellipse at 50% 55%, rgba(12,14,36,.55) 0 42%, rgba(12,14,36,0) 72%); }
.dr { top: -9vh; width: .25vh; height: 5vh; border-radius: 2px; background: linear-gradient(transparent, rgba(80,130,225,.75)); transform: rotate(12deg); animation: svrain linear infinite; }
.n .dr { background: linear-gradient(transparent, rgba(160,190,255,.7)); }
.sn { top: -3vh; width: 1.2vh; height: 1.2vh; border-radius: 50%; background: #fff; box-shadow: 0 0 .8vh rgba(130,150,215,.6); animation: svsnow linear infinite; }
.fg { left: -30%; width: 160%; height: 14vh; border-radius: 50%; background: linear-gradient(90deg, transparent, rgba(255,255,255,.65), transparent); animation: svfog ease-in-out infinite alternate; }
.n .fg { background: linear-gradient(90deg, transparent, rgba(190,200,250,.22), transparent); }
.fl { inset: 0; background: rgba(255,255,255,.8); opacity: 0; animation: svflash 9s infinite; } .n .fl { background: rgba(215,225,255,.4); }
@keyframes svpulse { 50% { transform: scale(1.07); opacity: .88; } } @keyframes svtw { 50% { opacity: .2; } }
@keyframes svdrift { from { transform: translateX(-48vw); } to { transform: translateX(110vw); } }
@keyframes svrain { to { transform: translate3d(-9vh, 118vh, 0) rotate(12deg); } }
@keyframes svsnow { 0% { transform: translate3d(0,0,0); } 50% { transform: translate3d(4vh, 55vh, 0); } 100% { transform: translate3d(-2vh, 108vh, 0); } }
@keyframes svfog { from { transform: translateX(-8%); } to { transform: translateX(8%); } }
@keyframes svflash { 0%, 92%, 96%, 100% { opacity: 0; } 93% { opacity: 1; } 94% { opacity: .15; } 95% { opacity: .85; } }
.dimo { position: absolute; inset: 0; pointer-events: none; } .sv.nofx .fxl i, .sv.nofx .fxl i::before, .sv.nofx .fxl i::after { animation: none !important; }
.mv { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; animation: svmove 900s ease-in-out infinite alternate; }
@keyframes svmove { from { transform: translate(-1.2vw, -1.5vh); } to { transform: translate(1.2vw, 1.5vh); } }
.tm { font-size: 34vh; line-height: 1; font-weight: 800; letter-spacing: -.02em; font-variant-numeric: tabular-nums; text-shadow: 0 .6vh 3vh rgba(124,106,190,.18); }
.dt { font-size: 5vh; font-weight: 700; margin-top: 1vh; opacity: .8; }
.tp { display: flex; align-items: center; gap: 2.2vh; margin-top: 5vh; padding: 1.8vh 4vh; border-radius: 99px; background: rgba(255,255,255,.42); border: 1px solid rgba(255,255,255,.55); font-weight: 800; }
.n .tp { background: rgba(255,255,255,.09); border-color: rgba(255,255,255,.12); }
.tp ha-icon { --mdc-icon-size: 7vh; } .tp b { font-size: 8vh; line-height: 1; } .tp span { font-size: 3.4vh; font-weight: 700; opacity: .75; } .tp em { display: flex; align-items: center; font-style: normal; font-size: 6vh; font-weight: 800; padding-left: 2.2vh; border-left: 2px solid rgba(120,105,170,.25); } .tp em ha-icon { --mdc-icon-size: 6vh; margin-right: .4vh; }
.al { position: absolute; left: 0; right: 0; bottom: 4vh; overflow: hidden; padding: 1vh 0; } .alt { display: flex; justify-content: center; gap: 1.6vh; padding: 0 4vw; width: max-content; min-width: 100%; box-sizing: border-box; } .ai { flex: none; white-space: nowrap; }
.al.mq .alt { justify-content: flex-start; animation: svmq var(--d, 30s) linear infinite; } @keyframes svmq { to { transform: translateX(-50%); } }
.ai { display: flex; align-items: center; gap: 1.4vh; padding: 1.4vh 2.6vh; border-radius: 99px; font-size: 3vh; font-weight: 800; background: rgba(255,226,150,.8); border: 1px solid rgba(255,255,255,.6); color: #4a3b12; }
.ai ha-icon { --mdc-icon-size: 4vh; } .ai small { font-size: 2.3vh; font-weight: 700; opacity: .75; }
.ai.s2 { background: rgba(255,160,180,.88); color: #4d1424; animation: svalert 2.4s ease-in-out infinite; }
@keyframes svalert { 50% { box-shadow: 0 0 0 1.2vh rgba(229,87,111,.22); } }
@media (prefers-reduced-motion: reduce) { .sv i, .mv, .ai, .alt { animation: none !important; } }
`;

class PastelSaverCard extends PastelHomeCard {
  _popU() { return false; }
  _svStyles() { return `<style id="cst">${CSS}</style><style>${SV_CSS}</style>${hudOn(this._config) ? `<style>${hudSvCss()}</style>` : ''}`; }
  setConfig(cfg) {
    this._config = cfg || {};
    this._wasAur = hudOn(cfg);
    this.shadowRoot.innerHTML = `<div id="sty">${this._svStyles()}</div><div class="sv" id="sv"></div>`;
    this._built = true; this._sg = '';
    // telefon (aplikacja Companion): wygaszacz niepotrzebny - od razu wracamy na dashboard i nic nie renderujemy
    if (Math.min(window.innerWidth, window.innerHeight) < 500) { this._phone = true; this.shadowRoot.getElementById('sv').style.display = 'none'; setTimeout(() => { history.replaceState(null, '', '/jarvis-pastel/home'); window.dispatchEvent(new CustomEvent('location-changed', {detail: {replace: true}})); }, 0); return; }
    this.shadowRoot.getElementById('sv').addEventListener('pointerdown', () => this._go('/jarvis-pastel/home'));   // dotyk = wyjscie (Kiosk Satellite zwykle robi to sam)
    if (!this._tk) this._tk = setInterval(() => this._svClock(), 5000);
    this._svVis = () => { const on = /\/wygaszacz\/?$/.test(location.pathname); const sv = this.shadowRoot.getElementById('sv'); if (sv) sv.style.display = on ? '' : 'none'; return on; };   // overlay jest fixed: poza swoim widokiem nie moze zaslaniac dashboardu (HA trzyma zbuforowane widoki)
    window.addEventListener('location-changed', this._svVis); window.addEventListener('popstate', this._svVis); this._svVis();
  }
  disconnectedCallback() { if (this._tk) { clearInterval(this._tk); this._tk = null; } }
  connectedCallback() { if (this._built && !this._phone && !this._tk) this._tk = setInterval(() => this._svClock(), 5000); if (this._svVis) this._svVis(); }
  _svo(k, d) { const o = (this._L && this._L.saver) || {}; return o[k] !== undefined ? o[k] : d; }   // opcje wygaszacza z edytora (plik ukladu, sekcja saver)
  _svClock() {
    const d = new Date(); const p = (n) => String(n).padStart(2, '0'); const t = p(d.getHours()) + ':' + p(d.getMinutes());
    const el = this.shadowRoot.getElementById('tm'); if (el && el.textContent !== t) el.textContent = t;
    const dt = this.shadowRoot.getElementById('dt'); const s = DAYS[d.getDay()] + ', ' + d.getDate() + ' ' + MONTHS[d.getMonth()]; if (dt && dt.textContent !== s) dt.textContent = s;
  }
  _svFx(st, night) {
    const rn = (i, k) => Math.abs(Math.sin(i * 12.9898 + k * 78.233) * 43758.5453) % 1;
    const P = (n, f) => Array.from({length: n}, (_, i) => f(i)).join('');
    const clouds = (n, sp) => P(n, (i) => `<i class="cl" style="top:${(rn(i, 1) * 48 - 4).toFixed(0)}vh;transform:scale(${(0.8 + rn(i, 3) * 0.8).toFixed(2)});animation-duration:${(sp + rn(i, 4) * sp).toFixed(0)}s;animation-delay:-${(rn(i, 5) * sp * 2).toFixed(0)}s"></i>`);
    const rain = (n, sp) => P(n, (i) => `<i class="dr" style="left:${(rn(i, 6) * 108 - 4).toFixed(1)}%;animation-duration:${(sp + rn(i, 7) * 0.4).toFixed(2)}s;animation-delay:-${(rn(i, 8) * 2).toFixed(2)}s"></i>`);
    const snow = (n) => P(n, (i) => `<i class="sn" style="left:${(rn(i, 9) * 100).toFixed(1)}%;animation-duration:${(9 + rn(i, 10) * 7).toFixed(1)}s;animation-delay:-${(rn(i, 11) * 14).toFixed(1)}s;opacity:${(0.6 + rn(i, 12) * 0.4).toFixed(2)}"></i>`);
    const stars = P(30, (i) => `<i class="st" style="left:${(rn(i, 16) * 100).toFixed(1)}%;top:${(rn(i, 17) * 85).toFixed(0)}%;animation-delay:-${(rn(i, 18) * 4).toFixed(1)}s"></i>`);
    const fog = P(4, (i) => `<i class="fg" style="top:${6 + i * 24}vh;animation-duration:${9 + i * 3}s"></i>`);
    const body = night ? '<i class="moon">' + moonSvg() + '</i>' + stars : '<i class="sun"></i>';
    switch (st) {
      case 'sunny': return {c: 'sunny', h: body}; case 'clear-night': return {c: 'sunny', h: '<i class="moon">' + moonSvg() + '</i>' + stars};
      case 'partlycloudy': return {c: 'partlycloudy', h: body + clouds(3, 70)};
      case 'cloudy': return {c: 'cloudy', h: clouds(6, 80), dk: true};
      case 'windy': case 'windy-variant': return {c: 'windy', h: clouds(5, 40)};
      case 'fog': return {c: 'fog', h: fog};
      case 'rainy': return {c: 'rain', h: clouds(4, 80) + rain(36, 1.1), dk: true};
      case 'pouring': return {c: 'rain', h: clouds(5, 70) + rain(70, 0.8), dk: true};
      case 'lightning': return {c: 'storm', h: clouds(5, 80) + '<i class="fl"></i>', dk: true};
      case 'lightning-rainy': return {c: 'storm', h: clouds(5, 70) + rain(50, 0.9) + '<i class="fl"></i>', dk: true};
      case 'hail': return {c: 'rain', h: clouds(4, 80) + rain(40, 0.8), dk: true};
      case 'snowy': return {c: 'snow', h: clouds(3, 90) + snow(40)};
      case 'snowy-rainy': return {c: 'snow', h: clouds(4, 80) + snow(24) + rain(20, 1), dk: true};
      default: return {c: 'cloudy', h: clouds(3, 80)};
    }
  }
  set hass(h) {
    this._hass = h; if (!this._built || this._phone) return; if (!this._svVis()) return;
    if (hudOn(this._config) !== this._wasAur) { this._wasAur = hudOn(this._config); const sty = this.shadowRoot.getElementById('sty'); if (sty) sty.innerHTML = this._svStyles(); this._sg = ''; }   // zmiana stylu w Ustawieniach
    if (PCOWN && PCOWN !== this) { this._applyCfg(); this._sg = ''; }
    let st = this._s(PC.out.weather) || ''; const night = st === 'clear-night' || this._s('sun.sun') === 'below_horizon'; if (night && st === 'sunny') st = 'clear-night';   // w nocy 'sunny' = pogodna noc
    const ot = this._n(PC.out.t), oh = this._n(PC.out.h); const wx = WX[st] || ['mdi:weather-cloudy', st];
    const am = this._svo('alarms', 'Zawsze'), fxm = this._svo('fx', 'Animowane'), dim = Math.min(70, Math.max(0, +this._svo('dim', 0) || 0));
    const al = am === 'Nigdy' ? [] : this._issues().filter((i) => i.sev >= (am === 'Tylko krytyczne' ? 2 : 1)); const shown = al.slice(0, 4), more = al.length - shown.length;
    if (Date.now() - (this._lyAt || 0) > 60000) { this._lyAt = Date.now(); this._loadLayout(); }
    const sig = [am, fxm, dim, st, night, ot === null ? '' : ot.toFixed(1), oh === null ? '' : Math.round(oh), shown.map((i) => i.sev + i.text + i.sub).join('|'), more].join('~');
    if (sig === this._sg) return; this._sg = sig;
    const fx = this._svFx(st, night); const ds = this._config && this._config.mode;
    const sv = this.shadowRoot.getElementById('sv'); sv.className = 'sv c-' + fx.c + (night ? ' n' : '') + (fx.dk ? ' dk' : '') + (fxm === 'Statyczne' ? ' nofx' : '');
    sv.innerHTML = `<div class="fxl" data-pe="sv.fx">${fxm === 'Bez' ? '' : fx.h}</div>${dim ? `<div class="dimo" style="background:rgba(0,0,0,${dim / 100})"></div>` : ''}<div class="mv"><div class="tm" id="tm" data-pe="sv.tm">--:--</div><div class="dt" id="dt" data-pe="sv.dt"></div>
      <div class="tp" data-pe="sv.tp"><ha-icon icon="${wx[0]}"></ha-icon><b>${ot === null ? '—' : ot.toFixed(1).replace('.', ',') + '°'}</b><span>${esc(wx[1])}</span>${oh === null ? '' : `<em data-pe="sv.hum"><ha-icon icon="mdi:water-percent"></ha-icon>${Math.round(oh)}%</em>`}</div></div>
      ${shown.length ? `<div class="al" data-pe="sv.al"><div class="alt">${shown.map((i) => `<div class="ai s${i.sev}"><ha-icon icon="${i.icon}"></ha-icon>${esc(i.text)}${i.sub ? `<small>${esc(i.sub)}</small>` : ''}</div>`).join('')}${more > 0 ? `<div class="ai"><b>+${more}</b></div>` : ''}</div></div>` : ''}`;
    const alb = sv.querySelector('.al'); if (alb) requestAnimationFrame(() => { const t = alb.firstElementChild; if (!t || !alb.isConnected) return; t.style.width = ''; if (t.scrollWidth > alb.clientWidth + 2) { t.innerHTML += t.innerHTML; alb.classList.add('mq'); alb.style.setProperty('--d', Math.max(20, Math.round(t.scrollWidth / 2 / 42)) + 's'); } });
    this._svClock();
  }
  getCardSize() { return 1; }
}
if (!customElements.get('pastel-saver-card')) customElements.define('pastel-saver-card', PastelSaverCard);
window.customCards.push({type: 'pastel-saver-card', name: 'Jarvis Pastel – wygaszacz', description: 'Wygaszacz ekranu: pogoda, zegar, temperatura, alarmy'});

// ---- widok jednego pokoju (telefon domownika): ten sam widok pokoju co w Pastelu, ale na stale i bez nawigacji do reszty domu ----
class PastelRoomCard extends PastelHomeCard {
  _popU() { return false; }   // karta pokoju ma widok stale otwarty - popup tu nie ma sensu
  setConfig(cfg) {
    super.setConfig(cfg);
    const st = document.createElement('style'); st.textContent = '#back { display: none !important; }'; this.shadowRoot.appendChild(st);
  }
  _room1() { return 'pokoj-' + ((this._config && this._config.room) || ''); }
  _route() {
    const v = this._room1();
    if (v !== this._view) { this._view = v; this._sig = ''; this._formOpen = false; if (this._built) { this._applyView(); if (this._hass) this.hass = this._hass; } }
    else this._applyView();
  }
  _open() { /* bez przechodzenia do innych widokow */ }
  _back() { /* widok stale otwarty */ }
  connectedCallback() { if (this._built) this._route(); }
  disconnectedCallback() { this._scrollLock(false); this._fxStop(); this._restoreHaTheme(); if (this._unsubChat) { try { this._unsubChat(); } catch (e) { /* ignore */ } this._unsubChat = null; } this._chatSub = false; if (this._onRs) { window.removeEventListener('resize', this._onRs); this._onRs = null; } }
}
if (!customElements.get('pastel-room-card')) customElements.define('pastel-room-card', PastelRoomCard);
window.customCards.push({type: 'pastel-room-card', name: 'Jarvis Pastel – pokój', description: 'Widok jednego pokoju (room: id pokoju, np. salon)'});
/* eksport dla osobnej karty Aurora Pulse (aurora-pulse-card.js) */
window.__pastel = {PC_EMPTY, PastelHomeCard, PastelSaverCard, getPC: () => PC, setPC: (v) => { PC = v; }, PC0, WX, DAYS, MONTHS, esc, F1_TEAM, HUD_SCH, hudSch};
