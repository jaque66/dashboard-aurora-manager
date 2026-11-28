/* Aurora Pulse - jedna, samodzielna karta (generowane: build.py). Zawiera tylko to, czego uzywa Pulse. */
let PC = {"rooms": [], "out": {"t": "", "h": "", "weather": ""}, "pm": "", "purifier": "", "fuel": [], "cal": [], "calDays": 2, "lightsOff": [], "mute": "", "wash": {"status": "", "end": "", "idle": [], "phase": {}}, "gas": "", "floodK": "", "floodL": "", "alarm": "", "alarmSw": "", "door": "", "bats": [], "temps": [], "hums": [], "humMin": 35, "humMax": 60, "offline": [], "events": [], "f1": {"on": false}, "tab": {"bat": "", "chg": ""}, "reminders": [], "remSlots": [], "remWarn": 3, "order": [], "hide": [], "pipeline": "", "warn": "", "media": {"active": "", "radio": "", "tvs": []}, "server": {"nodes": [], "guests": [], "storages": []}};
const PC_EMPTY = {"rooms": [], "out": {"t": "", "h": "", "weather": ""}, "pm": "", "purifier": "", "fuel": [], "cal": [], "calDays": 2, "lightsOff": [], "mute": "", "wash": {"status": "", "end": "", "idle": [], "phase": {}}, "gas": "", "floodK": "", "floodL": "", "alarm": "", "alarmSw": "", "door": "", "bats": [], "temps": [], "hums": [], "humMin": 35, "humMax": 60, "offline": [], "events": [], "f1": {"on": false}, "tab": {"bat": "", "chg": ""}, "reminders": [], "remSlots": [], "remWarn": 3, "order": [], "hide": [], "pipeline": "", "warn": "", "media": {"active": "", "radio": "", "tvs": []}, "server": {"nodes": [], "guests": [], "storages": []}};
const PC0 = PC;
const PAL = {   // jasny motyw: [tlo kafla, akcent]; ciemny wylicza sie w CSS
  lav: ['#e6dcff', '#8f78e0'], peach: ['#ffe0cf', '#f08a5d'], butter: ['#fff3c4', '#d9a521'], rose: ['#ffd9e6', '#e5719a'],
  sky: ['#d3e8ff', '#5a9be0'], aqua: ['#cdf2ee', '#35aaa0'], mint: ['#d4f5e2', '#3fb27f'], sand: ['#f3e7da', '#b58a5e'],
};
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
const PVER = (() => { try { return new URL(import.meta.url).searchParams.get('v') || '—'; } catch (e) { return '—'; } })();
const WX = {'clear-night': ['mdi:weather-night', 'Pogodna noc'], cloudy: ['mdi:weather-cloudy', 'Pochmurno'], exceptional: ['mdi:alert-circle-outline', 'Wyjątkowo'],
  fog: ['mdi:weather-fog', 'Mgła'], hail: ['mdi:weather-hail', 'Grad'], lightning: ['mdi:weather-lightning', 'Burza'], 'lightning-rainy': ['mdi:weather-lightning-rainy', 'Burza z deszczem'],
  partlycloudy: ['mdi:weather-partly-cloudy', 'Częściowe zachmurzenie'], pouring: ['mdi:weather-pouring', 'Ulewa'], rainy: ['mdi:weather-rainy', 'Deszcz'],
  snowy: ['mdi:weather-snowy', 'Śnieg'], 'snowy-rainy': ['mdi:weather-snowy-rainy', 'Śnieg z deszczem'], sunny: ['mdi:weather-sunny', 'Słonecznie'],
  windy: ['mdi:weather-windy', 'Wietrznie'], 'windy-variant': ['mdi:weather-windy-variant', 'Wietrznie']};
const DAYS = ['niedziela', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota'];
function moonSvg(d) {
  const p = ((((d || new Date()).getTime() - 947182440000) / 86400000) % 29.530588853 + 29.530588853) % 29.530588853 / 29.530588853, q = p < .5 ? p : 1 - p, c = Math.cos(2 * Math.PI * q), rx = Math.abs(c) * 50;
  return `<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="50" fill="currentColor" opacity=".13"/><path fill="currentColor"${p > .5 ? ' transform="translate(100 0) scale(-1 1)"' : ''} d="M50 0A50 50 0 0 1 50 100A${rx.toFixed(2)} 50 0 0 ${c > 0 ? 0 : 1} 50 0Z"/></svg>`;
}
const TH = {tMin: 'input_number.pastel_temperatura_min', tMax: 'input_number.pastel_temperatura_max', hMin: 'input_number.pastel_wilgotnosc_min', hMax: 'input_number.pastel_wilgotnosc_max'};
const F1_TEAM = {mercedes: '#27f4d2', ferrari: '#e8002d', mclaren: '#ff8000', red_bull: '#3671c6', rb: '#6692ff', alpine: '#0093cc', haas: '#9a9ea3', audi: '#f50537', williams: '#64c4ff', aston_martin: '#229971', cadillac: '#8e8e8e', sauber: '#52e252'};
const MONTHS = ['stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca', 'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia'];
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
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
const hudOn = (cfg) => { if (cfg && cfg.aurora) return true; try { const s = localStorage.getItem('pastel_style'); if (s === 'aurora') return true; if (s === 'pastel') return false; } catch (e) { /* ignore */ } return !!(cfg && cfg.hud); };
const hudSch = () => { let k = ''; try { k = localStorage.getItem('hud_scheme') || ''; } catch (e) { /* ignore */ } return HUD_SCH.find((x) => x.id === k) || HUD_SCH[0]; };
const hudPal = (d) => { const S = hudSch(); return d ? {ink: '#eef2ff', ink2: '#94a3c4', t: 'rgba(255,255,255,.075)', b: 'rgba(255,255,255,.028)', bd: 'rgba(255,255,255,.10)', sh: '0 10px 30px rgba(0,0,0,.38), inset 0 1px 0 rgba(255,255,255,.07)', ch: 'rgba(255,255,255,.06)', ch2: 'rgba(255,255,255,.11)', a: S.a, a2: S.b, on: '#07131f', bg: S.bg || '#090c18', g1: S.a + '2b', g2: S.b + '33', g3: S.c + '1a', gd: '#34d399', wn: '#fbbf24', bad: '#fb7185'}
  : {ink: '#14203a', ink2: '#5b6a8a', t: 'rgba(255,255,255,.88)', b: 'rgba(255,255,255,.62)', bd: 'rgba(20,32,58,.08)', sh: '0 8px 26px rgba(40,60,120,.12), inset 0 1px 0 #fff', ch: 'rgba(20,32,58,.05)', ch2: 'rgba(20,32,58,.09)', a: S.la, a2: S.lb, on: '#ffffff', bg: S.lbg || '#eef1fa', g1: S.a + '60', g2: S.b + '4d', g3: S.c + '2e', gd: '#059669', wn: '#d97706', bad: '#e11d48'}; };
const HUD_SKY = {sunny: ['#2f80d1', '#7cc0f0', '#0b1330', '#1b2a5c'], 'clear-night': ['#0b1330', '#1b2a5c', '#0b1330', '#1b2a5c'], partlycloudy: ['#4a8fd0', '#9cc4e4', '#141c3d', '#2a3560'], windy: ['#4a8fd0', '#9cc4e4', '#141c3d', '#2a3560'], 'windy-variant': ['#5b8fbf', '#a9c6dd', '#141c3d', '#2a3560'],
  cloudy: ['#6b7b8c', '#9aa7b4', '#1a202c', '#2d3544'], rainy: ['#4a5a6c', '#7487a0', '#121826', '#232c3d'], pouring: ['#36424f', '#566679', '#0d121b', '#1b2230'], lightning: ['#2c3340', '#4a5366', '#0a0d16', '#171c2a'], 'lightning-rainy': ['#2c3340', '#4a5366', '#0a0d16', '#171c2a'],
  snowy: ['#8fa6bd', '#c8d6e4', '#1f2a3b', '#3a4a60'], 'snowy-rainy': ['#6f8296', '#a3b3c3', '#1b2433', '#313f52'], hail: ['#4a5868', '#7b8b9c', '#121826', '#252f40'], fog: ['#9aa5ad', '#c3cacf', '#262b33', '#3d434b']};
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
class AuroraBase extends HTMLElement {
  constructor() { super(); this.attachShadow({mode: 'open'}); this._sig = ''; this._events = []; this._evAt = 0; this._showAll = false; }
  _liteU() { try { return localStorage.getItem('pastel_lite') === '1'; } catch (e) { return false; } }
  _pal(c) { return PAL[c] || PAL.lav; }
  _th() {
    const g = (e, d) => { const v = parseFloat((this._hass.states[e] || {}).state); return isNaN(v) ? d : v; };
    let a = g(TH.tMin, 18), b = g(TH.tMax, 26), c = g(TH.hMin, PC.humMin), d = g(TH.hMax, PC.humMax); if (a > b) [a, b] = [b, a]; if (c > d) [c, d] = [d, c];
    return {tMin: a, tMax: b, hMin: c, hMax: d};   // poziom krytyczny: temp. -3 / +4 °C, wilg. -10 / +10 p.p. od widelek
  }
  _kRoot() {
    if (this._kR && this._kR.isConnected) return this._kR;
    const f = (r) => { for (const e of r.querySelectorAll('*')) { if (e.tagName === 'HUI-ROOT') return e; if (e.shadowRoot) { const x = f(e.shadowRoot); if (x) return x; } } return null; };
    this._kR = f(document); return this._kR;
  }
  _rmo() { try { const o = JSON.parse(localStorage.getItem('pastel_rooms') || 'null'); return o && Array.isArray(o.order) ? o : null; } catch (e) { return null; } }
  _roomsL() {   // kolejnosc / ukrycie kafelkow pokoi z trybu edycji (localStorage pastel_rooms); tylko lista na ekranie glownym
    const o = this._rmo(); if (!o) return PC.rooms;
    const ix = (r) => { const i = o.order.indexOf(r.id); return i < 0 ? 999 : i; };
    let l = PC.rooms.slice().sort((a, b) => ix(a) - ix(b)); if (!this._edit) l = l.filter((r) => !(o.hide || []).includes(r.id)); return l;
  }
  async _loadForecast() {
    const w = PC.out.weather; if (!this._hass || !w) return;
    const get = async (type) => { try { const r = await this._hass.callWS({type: 'call_service', domain: 'weather', service: 'get_forecasts', service_data: {type}, target: {entity_id: w}, return_response: true});
      const x = r && r.response && r.response[w]; return (x && x.forecast) || []; } catch (e) { return []; } };
    const [h, d] = await Promise.all([get('hourly'), get('daily')]);
    this._fc = {h, d}; this._sig = ''; if (this._hass && !this._formOpen) this.hass = this._hass;
  }
  _wIcon(e) { e = (e || '').toLowerCase(); return /wiatr/.test(e) ? 'mdi:weather-windy' : /burz|grad/.test(e) ? 'mdi:weather-lightning' : /deszcz|opad|ulew/.test(e) ? 'mdi:weather-pouring' : /śnie|zawiej|zamiec|oblod|gołoled/.test(e) ? 'mdi:weather-snowy-heavy' : /mróz|mroz|przymroz/.test(e) ? 'mdi:snowflake-alert' : /upa/.test(e) ? 'mdi:thermometer-high' : /mgł|mgl/.test(e) ? 'mdi:weather-fog' : 'mdi:alert-outline'; }
  _warns() {   // niewygasle ostrzezenia meteo IMGW (obowiazujace i zapowiedziane)
    const o = PC.warn && this._hass.states[PC.warn], w = o && Array.isArray(o.attributes.warnings) ? o.attributes.warnings : [], now = Date.now();
    return w.filter((x) => { const t = new Date(String(x.valid_to || '').replace(' ', 'T')); return isNaN(t) || t.getTime() > now; });
  }
  _s(e) { const o = this._hass.states[e]; return o ? o.state : undefined; }
  _n(e) { const v = parseFloat(this._s(e)); return isNaN(v) ? null : v; }
  _name(e) { const o = this._hass.states[e]; return ((o && o.attributes.friendly_name) || e).replace(/\s*(Bateria|battery)\s*$/i, ''); }
  _call(d, s, data) { this._hass.callService(d, s, data); }
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
  _radioAvail() { return !!(this._hass && this._hass.services && this._hass.services.radio_pl && customElements.get('radio-pl-card')); }
  _track(sid) {
    this._trk = this._trk || {}; const c = this._trk[sid];
    if ((!c || Date.now() - c.at > 20000) && !(c && c.busy) && this._hass) { this._trk[sid] = Object.assign({}, c || {}, {busy: true, at: c ? c.at : 0});
      this._hass.callWS({type: 'radio_pl/now_playing', station: sid}).then((r) => { const t = [r.artist, r.title].filter(Boolean).join(' – '); const ch = !this._trk[sid] || this._trk[sid].t !== t; this._trk[sid] = {t, at: Date.now(), busy: false}; if (ch) { this._sig = ''; this._mplHtml = ''; if (this._hass) this.hass = this._hass; } }).catch(() => { this._trk[sid] = {t: (c && c.t) || '', at: Date.now(), busy: false}; }); }
    return (c && c.t) || '';
  }
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
  _lpDown(ev, sel, fn) { const t = ev.target.closest(sel); if (!t) return; clearTimeout(this._lpT); this._lpT = setTimeout(() => { this._lpFired = true; fn(); }, 500); }
  _lpUp() { clearTimeout(this._lpT); }
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
  _alarmSrc() {
    const L = []; if (PC.gas && this._s(PC.gas) === 'on') L.push('Wyciek gazu'); if (PC.floodK && this._s(PC.floodK) === 'on') L.push('Zalanie w kuchni'); if (PC.floodL && this._s(PC.floodL) === 'on') L.push('Zalanie w łazience');
    if (L.length) return L.join(' · ');
    const m = {alarm_sound: 'Syrena dźwiękowa włączona', alarm_light: 'Sygnał świetlny włączony', alarm_sound_light: 'Syrena i sygnał świetlny włączone'}, sel = this._s(PC.alarm);
    if (m[sel]) return m[sel];
    return PC.alarmSw && this._s(PC.alarmSw) === 'on' ? 'Syrena bramy włączona' : 'Alarm jest aktywny';
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
  _washLeft() { const t = new Date(this._s(PC.wash.end)).getTime(); if (isNaN(t)) return ''; const m = Math.max(0, Math.round((t - Date.now()) / 60000)); return ' · zostało ' + Math.floor(m / 60) + ':' + String(m % 60).padStart(2, '0'); }
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
  _portable() { const u = this._hass && this._hass.user; return !!(u && String(u.name || '').toLowerCase() === 'active5'); }
  _own(dom, suf, dflt) { const e = `${dom}.${this._sat().replace('assist_satellite.', '')}_${suf}`; return this._hass && this._hass.states[e] ? e : dflt; }
  _mute() { return this._own('switch', 'mute', PC.mute); }
  _pipe() { return this._own('select', 'pipeline_1', PC.pipeline); }
  _sat() {
    if (this._portable()) return 'assist_satellite.tablet_mobilny';
    const u = ((this._hass && this._hass.user && this._hass.user.name) || '').toLowerCase();
    if (window.innerWidth >= 900) return 'assist_satellite.tab10';
    return 'assist_satellite.telefon';
  }
  _chatLoad() { try { const a = JSON.parse(localStorage.getItem('pastel_chat') || '[]'); return Array.isArray(a) ? a : []; } catch (e) { return []; } }
  _listen() { this._call('voice_satellite', 'wake', {entity_id: this._sat()}); }
  _voiceStop() {
    // zatrzymanie rozmowy: bezposrednio przez silnik integracji voice_satellite (ukryty element voice-satellite-card). Zwykle anulowanie z integracji (podwojne dotkniecie) zostawialo potok na „odpowiada”, bo restart potoku czekal na zakonczenie odpowiedzi
    const v = document.querySelector('voice-satellite-card'), ok = (f) => { try { f(); } catch (e) { /* ignore */ } };
    if (!v || !v.pipeline || !v.tts) { const fire = () => document.dispatchEvent(new Event('touchstart', {cancelable: true})); fire(); setTimeout(fire, 80); return; }
    const reset = () => { ok(() => v.tts.stop()); ok(() => v.askQuestion && v.askQuestion.cancel()); ok(() => v.pipeline.clearContinueState()); ok(() => v.chat && v.chat.clear()); ok(() => v.pipeline.resetForResume()); ok(() => v.setState('IDLE')); ok(() => v.pipeline.restart(0)); const sat = this._sat(); if (sat && this._hass) ok(() => this._hass.callWS({type: 'voice_satellite/update_state', entity_id: sat, state: 'IDLE'}).catch(() => {})); };   /* ostatnie zabezpieczenie: wymuszenie stanu IDLE encji satelity (potok bywal „zawieszony” na odpowiada) */
    reset();
    // zabezpieczenie: gdy po 2,5 s encja satelity nadal jest „zajeta”, powtarzamy reset (restart potoku moze czekac na zakonczenie poprzedniego przebiegu)
    clearTimeout(this._vsWd); const wd = (n) => { this._vsWd = setTimeout(() => { const st = this._s(this._sat()); if (['listening', 'processing', 'responding'].includes(st)) { reset(); if (n < 3) wd(n + 1); } }, n === 0 ? 2500 : 4000); }; wd(0);
  }
  _vsHide(on) {
    let st = document.getElementById('pastel-vs-hide');
    if (on) { if (!st) { st = document.createElement('style'); st.id = 'pastel-vs-hide'; st.textContent = '#voice-satellite-ui > *:not(.vs-start-btn):not([class*="toast"]), #voice-satellite-ui canvas { display: none !important; pointer-events: none !important; }'; document.head.appendChild(st); } }
    else if (st) st.remove();
  }
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
  _skS() {
    const t = Date.now(); if (this._skC && t - this._skC.t < 30000) return this._skC.v;
    const st = this._hass ? this._hass.states : {}, v = [];
    for (const e of Object.keys(st)) { const m = /^sensor\.szkola_(.+)_oceny$/.exec(e); if (m) v.push({k: m[1], nm: String(st[e].attributes.friendly_name || m[1]).replace(/\s*Oceny\s*$/i, '')}); }
    this._skC = {t, v}; return v;
  }
  _skE(k, x) { return 'sensor.szkola_' + k + '_' + x; }
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
  _skSeen() { try { localStorage.setItem('pastel_sk_seen', JSON.stringify(this._skSnap())); } catch (e) { /* ignore */ } this._skNv = 0; }
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
  _skRe() { this._formOpen = false; this._renderSub(); this._formOpen = !!this._skF; }
  async _skRcpt(s) {
    this._skR = this._skR || {}; if (this._skR[s.k] && (this._skR[s.k].list || this._skR[s.k].busy || this._skR[s.k].err)) return; this._skR[s.k] = {busy: true}; this._skRe();
    try { const r = await this._hass.callWS({type: 'call_service', domain: 'vulcan_dom', service: 'recipients', service_data: {pupil: s.nm}, return_response: true}); this._skR[s.k] = {list: (r && r.response && r.response.recipients) || []}; }
    catch (e) { this._skR[s.k] = {err: (e && (e.message || e.code)) || 'błąd'}; }
    this._skRe();
  }
  _flt() {
    const pf = PC.filter || {}, base = String(PC.purifier || '').replace(/^fan\./, '').replace(/_air_purifier$/, '');
    const life = pf.life || (base ? 'sensor.' + base + '_filter_life_level' : ''), used = pf.used || (base ? 'sensor.' + base + '_filter_used_time' : '');
    const l = this._n(life); if (l === null) return null;
    const u = this._n(used), warn = pf.warn || 20, crit = pf.crit || 10;
    const left = u !== null && l > 0 && l < 100 ? Math.round(u * l / (100 - l)) : null;   // szacunek godzin pracy do wymiany (liniowo)
    return {life: l, used: u, warn, crit, left, ids: [life, used], sev: l <= crit ? 2 : l <= warn ? 1 : 0};
  }
  _replayOn() { const r = this._s('sensor.f1_replay_status'); return r === 'playing' || r === 'paused'; }
  _f1Active() { return ['live', 'suspended', 'break'].includes(this._s('sensor.f1_session_status')) || this._replayOn(); }
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
  _calMeta(cal) { const s = this._hass.states[cal]; const f = (s && s.attributes.supported_features) || 0; return {create: !!(f & 1), del: !!(f & 2), upd: !!(f & 4), name: (s && s.attributes.friendly_name) || cal}; }
}
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
class AuroraSaverBase extends AuroraBase {
  _svStyles() { return `<style id="cst">${CSS}</style><style>${SV_CSS}</style>${hudOn(this._config) ? `<style>${hudSvCss()}</style>` : ''}`; }
  disconnectedCallback() { if (this._tk) { clearInterval(this._tk); this._tk = null; } }
  connectedCallback() { if (this._built && !this._phone && !this._tk) this._tk = setInterval(() => this._svClock(), 5000); if (this._svVis) this._svVis(); }
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
  getCardSize() { return 1; }
}

/* ====================================================================================================================
   AURORA PULSE - osobny, kreatywny dashboard mobilny (karta: custom:aurora-pulse-card).
   Zyjace niebo zalezne od pogody i pory dnia, "Puls domu" (pierscien z 4 lukami), karuzela pokoi, pigulki "Teraz",
   szybkie akcje, plywajacy dok z orbem asystenta, menu-babelki, rozwijane menu pomieszczen oraz WLASNE widoki
   (pogoda, kalendarz, szkola, klimat, powietrze, baterie, multimedia, radio, historia, serwer, F1, asystent, ustawienia, pokoje).
   Korzysta z tych samych danych co Aurora (PC), nic nie zmienia w istniejacych dashboardach.
   Uwaga dla edycji: w tym pliku tylko komentarze blokowe, bo kod jest doklejany do wygenerowanej karty.
   ==================================================================================================================== */
const PULSE_CSS = `
:host { display: block; position: fixed; inset: 0; z-index: 3; color: #eaf2ff; font-family: Roboto, 'Segoe UI', sans-serif; -webkit-tap-highlight-color: transparent; }
* { box-sizing: border-box; }
button { font: inherit; color: inherit; border: 0; background: none; padding: 0; cursor: pointer; -webkit-tap-highlight-color: transparent; text-align: inherit; }
ha-icon { --mdc-icon-size: 22px; }
#root { position: absolute; inset: 0; overflow: hidden; background: #050912; --a: #67e8f9; --b: #a78bfa; --c: #f472b6; }
#sky { position: absolute; inset: 0; transition: background 3s ease; }
.rb { position: absolute; left: -30%; width: 160%; height: 52%; border-radius: 50%; filter: blur(52px); mix-blend-mode: screen; will-change: transform; pointer-events: none; }
.rb.r1 { top: -14%; background: radial-gradient(closest-side, var(--a), transparent); opacity: .5; animation: rb1 24s ease-in-out infinite alternate; }
.rb.r2 { top: 10%; background: radial-gradient(closest-side, var(--b), transparent); opacity: .42; animation: rb2 31s ease-in-out infinite alternate; }
.rb.r3 { top: 34%; background: radial-gradient(closest-side, var(--c), transparent); opacity: .26; animation: rb3 27s ease-in-out infinite alternate; }
@keyframes rb1 { to { transform: translate3d(14%, 8%, 0) rotate(9deg) scale(1.14); } }
@keyframes rb2 { to { transform: translate3d(-16%, 5%, 0) rotate(-7deg) scale(1.1); } }
@keyframes rb3 { to { transform: translate3d(10%, -7%, 0) rotate(5deg) scale(1.2); } }
#fx { display: none; }
.wfx { position: absolute; inset: 0; pointer-events: none; z-index: 0; }
.wfx i { position: absolute; display: block; }
.wfx .st { width: 2px; height: 2px; border-radius: 50%; background: #fff; animation: tw 3.4s ease-in-out infinite; }
@keyframes tw { 0%, 100% { opacity: .15; transform: scale(.7); } 50% { opacity: 1; transform: scale(1.5); } }
.wfx .dr { top: -26px; width: 1.5px; height: 20px; background: linear-gradient(transparent, rgba(190,215,255,.95)); animation: dropt linear infinite; }
@keyframes dropt { to { transform: translate3d(-14px, 190px, 0); } }
.wfx .sn { top: -6px; width: 4px; height: 4px; border-radius: 50%; background: #fff; opacity: .9; animation: snowt linear infinite; }
@keyframes snowt { to { transform: translate3d(14px, 170px, 0); } }
.wfx .cl { width: 80%; height: 34%; border-radius: 50%; background: radial-gradient(closest-side, rgba(225,235,255,.6), transparent); filter: blur(7px); animation: cldt linear infinite; }
@keyframes cldt { from { transform: translateX(-100%); } to { transform: translateX(140%); } }
.wfx .sun { right: -24%; top: -24%; width: 100%; aspect-ratio: 1; border-radius: 50%; background: radial-gradient(closest-side, rgba(255,226,140,.9), rgba(255,200,90,.25) 55%, transparent); animation: sunp 7s ease-in-out infinite; }
@keyframes sunp { 50% { transform: scale(1.1); opacity: .8; } }
.wfx .fg { left: -20%; width: 140%; height: 30%; background: linear-gradient(90deg, transparent, rgba(220,230,245,.38), transparent); filter: blur(6px); animation: fogd 10s ease-in-out infinite alternate; }
@keyframes fogd { to { transform: translateX(16%); } }
.wfx .fl { inset: 0; background: rgba(255,255,255,.55); opacity: 0; animation: flash 9s linear infinite; }
@keyframes flash { 0%, 92%, 96%, 100% { opacity: 0; } 93% { opacity: .55; } 94.5% { opacity: .1; } 95% { opacity: .4; } }
#scroll { position: absolute; inset: 0; overflow-y: auto; overflow-x: hidden; padding: calc(env(safe-area-inset-top, 0px) + 12px) 0 150px; scrollbar-width: none; scroll-behavior: smooth; overscroll-behavior: contain; }
#scroll::-webkit-scrollbar, .vb::-webkit-scrollbar { display: none; }
.gl { background: linear-gradient(145deg, rgba(255,255,255,.14), rgba(255,255,255,.04)); border: 1px solid rgba(255,255,255,.17); -webkit-backdrop-filter: blur(18px) saturate(1.35); backdrop-filter: blur(18px) saturate(1.35); border-radius: 24px; box-shadow: 0 10px 36px rgba(0,0,0,.28), inset 0 1px 0 rgba(255,255,255,.18); }
.in { opacity: 0; transform: translateY(18px) scale(.97); animation: inn .7s cubic-bezier(.2,.9,.3,1.1) forwards; animation-delay: calc(var(--i, 0) * 70ms + 80ms); }
@keyframes inn { to { opacity: 1; transform: none; } }
#hero { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; padding: 4px 22px 0; }
.hello { font-size: 13px; letter-spacing: .14em; text-transform: uppercase; opacity: .7; }
.time { font-size: 68px; font-weight: 200; line-height: 1; letter-spacing: -.03em; margin-top: 2px; background: linear-gradient(100deg, #fff 20%, var(--a) 45%, var(--b) 55%, #fff 80%); background-size: 220% 100%; -webkit-background-clip: text; background-clip: text; color: transparent; animation: shine 9s linear infinite; }
@keyframes shine { to { background-position: -220% 0; } }
.date { font-size: 14px; opacity: .78; margin-top: 4px; }
.wxo { flex: none; position: relative; overflow: hidden; display: flex; flex-direction: column; align-items: center; gap: 2px; padding: 14px 14px 12px; margin-top: 6px; min-width: 112px; min-height: 128px; justify-content: center; }
.wxo > :not(.wfx) { position: relative; z-index: 1; }
.wxo ha-icon { --mdc-icon-size: 34px; color: var(--a); filter: drop-shadow(0 0 10px var(--a)); animation: bob 5s ease-in-out infinite; }
@keyframes bob { 50% { transform: translateY(-3px) rotate(3deg); } }
.wxo b { font-size: 26px; font-weight: 300; }
.wxo small { font-size: 11px; opacity: .75; text-align: center; max-width: 90px; }
.wxo .hm { font-size: 11px; opacity: .85; color: #8fd6ff; }
#pulse { position: relative; width: 258px; height: 258px; margin: 6px auto 0; }
#pulse svg { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }
#pulse .arc { fill: none; stroke-width: 11; stroke-linecap: round; stroke-dasharray: 200; stroke-dashoffset: 200; animation: draw 1.4s cubic-bezier(.3,.8,.3,1) forwards; animation-delay: calc(var(--k) * 180ms + 250ms); filter: drop-shadow(0 0 7px currentColor); }
#pulse .trk { fill: none; stroke: rgba(255,255,255,.09); stroke-width: 11; stroke-linecap: round; }
@keyframes draw { to { stroke-dashoffset: 0; } }
#pulse .dots { fill: none; stroke: rgba(255,255,255,.35); stroke-width: 2; stroke-dasharray: 1 9; stroke-linecap: round; transform-origin: 120px 120px; animation: rot 46s linear infinite; }
#pulse .core { fill: url(#cg); transform-origin: 120px 120px; animation: breathe 4.6s ease-in-out infinite; }
@keyframes rot { to { transform: rotate(360deg); } }
@keyframes breathe { 50% { transform: scale(1.07); opacity: .8; } }
#pulse .ctr { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 0 56px; }
#pulse .ctr ha-icon { --mdc-icon-size: 34px; color: var(--pc, #3fe0a5); filter: drop-shadow(0 0 12px var(--pc, #3fe0a5)); }
#pulse .ctr b { font-size: 21px; font-weight: 600; margin-top: 4px; line-height: 1.1; }
#pulse .ctr small { font-size: 12px; opacity: .72; margin-top: 3px; }
#pulse .mk { position: absolute; width: 26px; height: 26px; margin: -13px 0 0 -13px; display: grid; place-items: center; border-radius: 50%; background: rgba(5,9,18,.55); }
#pulse .mk ha-icon { --mdc-icon-size: 15px; }
#pulse.bad .core { animation-duration: 1.3s; }
.sec { padding: 0 22px; margin: 22px 0 8px; display: flex; align-items: center; gap: 8px; font-size: 12px; letter-spacing: .16em; text-transform: uppercase; opacity: .78; }
.sec::after { content: ''; flex: 1; height: 1px; background: linear-gradient(90deg, rgba(255,255,255,.28), transparent); }
.chips { display: flex; gap: 10px; overflow-x: auto; padding: 4px 22px 8px; scroll-snap-type: x proximity; scrollbar-width: none; }
.chips::-webkit-scrollbar, .rooms::-webkit-scrollbar, .hrs::-webkit-scrollbar { display: none; }
.chip { flex: none; display: flex; align-items: center; gap: 10px; padding: 10px 16px 10px 10px; scroll-snap-align: start; text-align: left; border-radius: 20px; max-width: 78vw; position: relative; overflow: hidden; }
.chip .ci { flex: none; width: 38px; height: 38px; border-radius: 13px; display: grid; place-items: center; background: color-mix(in srgb, var(--cc, var(--a)) 24%, transparent); color: var(--cc, var(--a)); box-shadow: 0 0 16px color-mix(in srgb, var(--cc, var(--a)) 45%, transparent); }
.chip b { display: block; font-size: 14px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 56vw; }
.chip small { display: block; font-size: 11.5px; opacity: .72; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 56vw; margin-top: 1px; }
.chip.hot { border-color: color-mix(in srgb, var(--cc) 70%, transparent); animation: hotg 2.2s ease-in-out infinite; }
@keyframes hotg { 50% { box-shadow: 0 0 0 4px color-mix(in srgb, var(--cc) 22%, transparent), 0 10px 36px rgba(0,0,0,.28); } }
.chip::after { content: ''; position: absolute; inset: 0; background: linear-gradient(100deg, transparent 30%, rgba(255,255,255,.12) 50%, transparent 70%); transform: translateX(-120%); animation: swp 6s ease-in-out infinite; animation-delay: calc(var(--i, 0) * 900ms); pointer-events: none; }
@keyframes swp { 0%, 60% { transform: translateX(-120%); } 100% { transform: translateX(120%); } }
.eqv { display: inline-flex; gap: 2px; align-items: flex-end; height: 14px; margin-left: 4px; }
.eqv i { width: 3px; background: currentColor; border-radius: 2px; animation: eq 0.9s ease-in-out infinite; }
.eqv i:nth-child(2) { animation-delay: .2s; } .eqv i:nth-child(3) { animation-delay: .4s; }
@keyframes eq { 0%, 100% { height: 25%; } 50% { height: 100%; } }
.rooms { display: flex; gap: 12px; overflow-x: auto; padding: 4px 22px 12px; scroll-snap-type: x mandatory; scrollbar-width: none; }
.rm { flex: none; width: 68vw; max-width: 300px; scroll-snap-align: center; padding: 13px; position: relative; overflow: hidden; transition: transform .25s; }
.rm:active { transform: scale(.975); }
.rm::before { content: ''; position: absolute; width: 190px; height: 190px; right: -60px; top: -70px; border-radius: 50%; background: radial-gradient(closest-side, var(--rc), transparent); opacity: .5; animation: rmg 9s ease-in-out infinite alternate; }
@keyframes rmg { to { transform: translate(-22px, 20px) scale(1.25); } }
.rm .rh { display: flex; align-items: center; gap: 10px; position: relative; }
.rm .ri { width: 38px; height: 38px; border-radius: 15px; display: grid; place-items: center; background: color-mix(in srgb, var(--rc) 28%, transparent); color: var(--rc); box-shadow: 0 0 18px color-mix(in srgb, var(--rc) 50%, transparent); }
.rm .rn { font-size: 16.5px; font-weight: 600; flex: 1; }
.occ { display: inline-flex; align-items: center; gap: 5px; font-size: 11.5px; opacity: .85; }
.occ i { width: 8px; height: 8px; border-radius: 50%; background: #5f6b80; }
.occ.on i { background: #3fe0a5; box-shadow: 0 0 10px #3fe0a5; animation: occp 1.8s ease-in-out infinite; }
@keyframes occp { 50% { transform: scale(1.5); opacity: .6; } }
.rm .rv { display: flex; gap: 18px; align-items: baseline; margin: 10px 0 9px; position: relative; }
.rm .rv b { font-size: 34px; font-weight: 200; letter-spacing: -.02em; }
.rm .rv b em { font-style: normal; font-size: 17px; opacity: .6; margin-left: 2px; }
.rm .rv b ha-icon { --mdc-icon-size: 26px; color: #ffd36b; vertical-align: -3px; margin-right: 6px; filter: drop-shadow(0 0 8px #ffd36b); }
.rm .rv span { font-size: 17px; opacity: .85; color: #8fd6ff; }
.rm .rv span em { font-style: normal; font-size: 12px; opacity: .6; }
.rm .dv { display: flex; flex-wrap: wrap; gap: 7px; position: relative; }
.dp { display: inline-flex; align-items: center; gap: 6px; padding: 7px 11px; border-radius: 999px; background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.14); font-size: 12.5px; transition: all .25s; }
.dp ha-icon { --mdc-icon-size: 16px; opacity: .8; }
.dp.on { background: color-mix(in srgb, var(--rc) 34%, rgba(255,255,255,.06)); border-color: color-mix(in srgb, var(--rc) 70%, transparent); box-shadow: 0 0 16px color-mix(in srgb, var(--rc) 45%, transparent); }
.dp.on ha-icon { opacity: 1; color: #fff; }
.qa { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; padding: 4px 22px 4px; }
.qb { position: relative; display: flex; align-items: center; gap: 12px; padding: 16px 14px; text-align: left; overflow: hidden; transition: transform .2s; }
.qb:active { transform: scale(.96); }
.qb ha-icon { --mdc-icon-size: 28px; color: var(--qc, var(--a)); flex: none; }
.qb b { display: block; font-size: 14.5px; font-weight: 600; }
.qb small { display: block; font-size: 11.5px; opacity: .72; margin-top: 1px; }
.qb.on { border-color: color-mix(in srgb, var(--qc) 70%, transparent); box-shadow: 0 0 22px color-mix(in srgb, var(--qc) 35%, transparent), 0 10px 36px rgba(0,0,0,.28); }
.qb.on ha-icon { filter: drop-shadow(0 0 8px var(--qc)); }
#dock { position: absolute; left: 14px; right: 14px; bottom: calc(env(safe-area-inset-bottom, 0px) + 12px); height: 66px; display: flex; align-items: center; justify-content: space-around; padding: 0 6px; border-radius: 34px; z-index: 20; background: linear-gradient(145deg, rgba(20,28,48,.78), rgba(10,14,28,.7)); }
#dock .di { position: relative; flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px; height: 100%; font-size: 10.5px; opacity: .72; transition: opacity .2s, transform .2s; text-align: center; }
#dock .di:active { transform: scale(.9); }
#dock .di.on { opacity: 1; color: var(--a); }
#orbw { flex: 1; display: flex; justify-content: center; align-items: center; height: 100%; }
#orb { position: relative; width: 50px; height: 50px; margin-top: 0; align-self: center; border-radius: 50%; display: grid; place-items: center; background: radial-gradient(circle at 35% 30%, #1b2a4a, #070c18 72%); box-shadow: 0 0 26px color-mix(in srgb, var(--a) 55%, transparent), 0 8px 24px rgba(0,0,0,.5); animation: orbg 4.5s ease-in-out infinite; }
@keyframes orbg { 50% { box-shadow: 0 0 40px 4px color-mix(in srgb, var(--b) 60%, transparent), 0 8px 24px rgba(0,0,0,.5); } }
#orb::before { content: ''; position: absolute; inset: -4px; border-radius: 50%; background: conic-gradient(from 0deg, var(--a), var(--b), var(--c), var(--a)); -webkit-mask: radial-gradient(circle, transparent 0 calc(50% - 4px), #000 calc(50% - 3px)); mask: radial-gradient(circle, transparent 0 calc(50% - 4px), #000 calc(50% - 3px)); animation: rot 7s linear infinite; }
#orb ha-icon { --mdc-icon-size: 24px; position: relative; color: #fff; filter: drop-shadow(0 0 8px var(--a)); }
#orb .rp { position: absolute; inset: 0; border-radius: 50%; border: 2px solid var(--a); opacity: 0; pointer-events: none; }
#orb .bars { display: none; position: absolute; inset: 0; align-items: center; justify-content: center; gap: 4px; }
#orb .bars i { width: 5px; height: 22%; border-radius: 3px; background: #fff; box-shadow: 0 0 8px var(--b); }
@keyframes orp { 0% { transform: scale(1); opacity: .8; } 100% { transform: scale(1.9); opacity: 0; } }
@keyframes obar { 0%, 100% { height: 18%; } 50% { height: 58%; } }
#orb.st-l .rp { animation: orp 1.6s ease-out infinite; } #orb.st-l .rp.r2 { animation-delay: .8s; }
#orb.st-p::before { animation-duration: 1s; } #orb.st-p ha-icon { animation: bob 1s ease-in-out infinite; }
#orb.st-r .rp { border-color: var(--b); animation: orp 2.2s ease-out infinite; } #orb.st-r .rp.r2 { animation-delay: 1.1s; }
#orb.st-r ha-icon { display: none; } #orb.st-r .bars { display: flex; } #orb.st-r .bars i { animation: obar .8s ease-in-out infinite; }
#orb.st-r .bars i:nth-child(2) { animation-delay: .12s; } #orb.st-r .bars i:nth-child(3) { animation-delay: .24s; } #orb.st-r .bars i:nth-child(4) { animation-delay: .36s; } #orb.st-r .bars i:nth-child(5) { animation-delay: .48s; }
#ov { position: absolute; inset: 0; z-index: 12; display: none; }
#ov.on { display: block; }
#ov .bd { position: absolute; inset: 0; background: rgba(4,7,16,.62); -webkit-backdrop-filter: blur(22px); backdrop-filter: blur(22px); animation: fadein .3s ease forwards; }
@keyframes fadein { from { opacity: 0; } }
#menu { position: absolute; left: 0; right: 0; bottom: 0; top: 0; padding: calc(env(safe-area-inset-top, 0px) + 24px) 20px 120px; overflow-y: auto; scrollbar-width: none; }
#menu h3 { margin: 0 4px 14px; font-size: 13px; letter-spacing: .18em; text-transform: uppercase; opacity: .75; font-weight: 600; }
.fl3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 8px; }
.fu { padding: 10px 6px; text-align: center; border-radius: 18px; }
.fu small { display: block; font-size: 10px; letter-spacing: .1em; opacity: .7; font-weight: 700; }
.fu b { display: block; font-size: 18px; font-weight: 600; margin-top: 1px; }
.fu span { display: block; font-size: 10px; opacity: .8; margin-top: 2px; }
.fu span.up { color: #ff7a8a; } .fu span.dn { color: #5ff0b0; }
.bub { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px 8px; margin-top: 16px; }
.bu { display: flex; flex-direction: column; align-items: center; gap: 8px; font-size: 12.5px; text-align: center; opacity: 0; transform: scale(.4) translateY(30px); animation: pop .6s cubic-bezier(.2,1.4,.4,1) forwards; animation-delay: calc(var(--i) * 45ms + 60ms); }
@keyframes pop { to { opacity: 1; transform: none; } }
.bu .bi { position: relative; width: 76px; height: 76px; border-radius: 50%; display: grid; place-items: center; background: radial-gradient(circle at 32% 28%, color-mix(in srgb, var(--bc) 55%, #fff 8%), color-mix(in srgb, var(--bc) 22%, transparent) 70%); border: 1px solid color-mix(in srgb, var(--bc) 60%, transparent); box-shadow: 0 0 22px color-mix(in srgb, var(--bc) 40%, transparent), inset 0 1px 0 rgba(255,255,255,.35); animation: flt 5s ease-in-out infinite; animation-delay: calc(var(--i) * -700ms); }
@keyframes flt { 50% { transform: translateY(-6px); } }
.bu .bi ha-icon { --mdc-icon-size: 30px; color: #fff; }
.bu .bi i { position: absolute; top: 4px; right: 4px; min-width: 12px; height: 12px; border-radius: 99px; background: #ffb340; box-shadow: 0 0 10px #ffb340; }
#rmn { position: absolute; left: 14px; right: 14px; bottom: calc(env(safe-area-inset-bottom, 0px) + 92px); padding: 16px 14px 14px; border-radius: 30px; max-height: 70%; overflow-y: auto; scrollbar-width: none; background: linear-gradient(160deg, rgba(30,42,72,.82), rgba(12,16,32,.8)); transform-origin: 50% 100%; animation: rmo .45s cubic-bezier(.2,1.1,.3,1) forwards; }
@keyframes rmo { from { opacity: 0; transform: translateY(40px) scale(.86); } }
#rmn h3 { margin: 0 4px 12px; font-size: 12px; letter-spacing: .18em; text-transform: uppercase; opacity: .75; font-weight: 600; }
.rg { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.rt { position: relative; display: flex; align-items: center; gap: 10px; padding: 12px 10px; border-radius: 20px; text-align: left; background: color-mix(in srgb, var(--rc) 14%, rgba(255,255,255,.05)); border: 1px solid color-mix(in srgb, var(--rc) 45%, transparent); opacity: 0; transform: translateY(16px) scale(.9); animation: pop .5s cubic-bezier(.2,1.3,.4,1) forwards; animation-delay: calc(var(--i) * 55ms + 120ms); overflow: hidden; }
.rt::after { content: ''; position: absolute; width: 80px; height: 80px; right: -26px; top: -30px; border-radius: 50%; background: radial-gradient(closest-side, var(--rc), transparent); opacity: .4; }
.rt .ri { flex: none; width: 38px; height: 38px; border-radius: 13px; display: grid; place-items: center; background: color-mix(in srgb, var(--rc) 30%, transparent); color: var(--rc); box-shadow: 0 0 14px color-mix(in srgb, var(--rc) 50%, transparent); position: relative; z-index: 1; }
.rt b { display: block; font-size: 14px; font-weight: 600; position: relative; z-index: 1; }
.rt small { display: block; font-size: 11.5px; opacity: .75; margin-top: 1px; position: relative; z-index: 1; }
.rt .od { position: absolute; top: 9px; right: 10px; width: 8px; height: 8px; border-radius: 50%; background: #3fe0a5; box-shadow: 0 0 9px #3fe0a5; z-index: 1; animation: occp 1.8s ease-in-out infinite; }
.rt.all { grid-column: 1 / -1; }
#sh { position: absolute; left: 0; right: 0; bottom: 0; max-height: 78%; border-radius: 30px 30px 0 0; padding: 10px 20px calc(env(safe-area-inset-bottom, 0px) + 112px); overflow-y: auto; scrollbar-width: none; animation: shu .42s cubic-bezier(.2,.9,.3,1) forwards; background: linear-gradient(160deg, rgba(28,38,66,.9), rgba(10,14,28,.9)); }
@keyframes shu { from { transform: translateY(100%); } }
#sh .gp { width: 44px; height: 5px; border-radius: 3px; background: rgba(255,255,255,.3); margin: 2px auto 14px; }
#sh h2 { margin: 0 0 12px; font-size: 18px; font-weight: 600; }
.row { display: flex; align-items: center; gap: 12px; padding: 11px 12px; margin-bottom: 8px; border-radius: 16px; background: rgba(255,255,255,.07); border: 1px solid rgba(255,255,255,.1); width: 100%; text-align: left; }
.row ha-icon { flex: none; color: var(--a); }
.row b { display: block; font-size: 14px; font-weight: 600; }
.row small { display: block; font-size: 12px; opacity: .72; margin-top: 1px; }
.row.on { background: color-mix(in srgb, var(--a) 22%, rgba(255,255,255,.05)); border-color: color-mix(in srgb, var(--a) 60%, transparent); }
.row .sw { margin-left: auto; width: 42px; height: 24px; border-radius: 14px; background: rgba(255,255,255,.2); position: relative; flex: none; transition: background .25s; }
.row .sw::after { content: ''; position: absolute; left: 3px; top: 3px; width: 18px; height: 18px; border-radius: 50%; background: #fff; transition: transform .25s; }
.row.on .sw { background: var(--a); } .row.on .sw::after { transform: translateX(18px); }
.ev { display: flex; align-items: center; gap: 12px; padding: 10px 6px; border-bottom: 1px solid rgba(255,255,255,.08); }
.ev .dt { flex: none; width: 46px; height: 46px; border-radius: 15px; display: grid; place-items: center; text-align: center; line-height: 1.05; background: color-mix(in srgb, var(--a) 22%, transparent); color: var(--a); }
.ev .dt b { font-size: 18px; display: block; } .ev .dt small { font-size: 9.5px; letter-spacing: .1em; text-transform: uppercase; }
.ev .tt { font-size: 14.5px; font-weight: 600; } .ev .wn { font-size: 12px; opacity: .7; margin-top: 1px; }
.gd { display: inline-grid; place-items: center; min-width: 34px; height: 30px; padding: 0 7px; border-radius: 10px; font-weight: 700; font-size: 14px; margin: 2px 4px 2px 0; color: #08121f; } .g0 { background: #9aa6bd; } .g1 { background: #ff6b81; } .g2 { background: #ff9a5c; } .g3 { background: #ffc24b; } .g4 { background: #b4e36b; } .g5 { background: #3fe0a5; } .g6 { background: #67e8f9; }
.sj { margin-bottom: 8px; border-radius: 16px; background: rgba(255,255,255,.07); border: 1px solid rgba(255,255,255,.1); overflow: hidden; } .sj > button { display: flex; align-items: center; gap: 10px; width: 100%; padding: 12px 14px; } .sj .sn { flex: 1; min-width: 0; font-size: 14px; font-weight: 600; } .sj .sa { font-size: 15px; font-weight: 700; } .sj .sdt { display: none; padding: 0 14px 12px; } .sj.open .sdt { display: block; animation: fadein .3s ease; } .sj .gl3 { display: flex; flex-wrap: wrap; padding: 0 14px 12px; } .sj.open .gl3 { display: none; }
.sj .gr { display: flex; align-items: center; gap: 10px; padding: 6px 0; border-top: 1px solid rgba(255,255,255,.07); font-size: 13px; } .sj .gr small { display: block; opacity: .6; font-size: 11px; }
.tabs { display: flex; gap: 6px; overflow-x: auto; scrollbar-width: none; margin: 0 -18px 12px; padding: 0 18px; } .tabs::-webkit-scrollbar { display: none; } .tabs button { flex: none; padding: 9px 15px; border-radius: 99px; font-size: 13px; background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.14); position: relative; } .tabs button.on { background: color-mix(in srgb, var(--a) 28%, transparent); border-color: var(--a); box-shadow: 0 0 16px color-mix(in srgb, var(--a) 40%, transparent); }
.nwb { display: inline-block; font-size: 9px; font-weight: 800; letter-spacing: .08em; padding: 2px 6px; margin-left: 6px; border-radius: 99px; background: #ffb340; color: #281a00; vertical-align: 1px; }
.tg { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; } .tg > div { padding: 12px; border-radius: 18px; background: rgba(255,255,255,.07); text-align: center; position: relative; } .tg b { display: block; font-size: 26px; font-weight: 300; } .tg small { display: block; font-size: 11px; opacity: .65; margin-top: 2px; letter-spacing: .05em; text-transform: uppercase; }
.ls { display: flex; align-items: center; gap: 12px; padding: 10px 12px; margin-bottom: 6px; border-radius: 15px; background: rgba(255,255,255,.07); } .ls .tm { flex: none; width: 54px; text-align: center; font-size: 12.5px; line-height: 1.25; opacity: .85; } .ls b { display: block; font-size: 14px; } .ls small { display: block; font-size: 11.5px; opacity: .65; margin-top: 1px; } .ls.cur { background: color-mix(in srgb, var(--a) 24%, transparent); border: 1px solid var(--a); box-shadow: 0 0 18px color-mix(in srgb, var(--a) 40%, transparent); } .ls.past { opacity: .45; }
.iw { margin-bottom: 8px; border-radius: 16px; background: rgba(255,255,255,.07); border: 1px solid rgba(255,255,255,.1); overflow: hidden; }
.iw .row { margin: 0; border: 0; background: none; border-radius: 0; }
.iw .chev { margin-left: auto; opacity: .6; transition: transform .3s; color: inherit !important; }
.iw.open .chev { transform: rotate(180deg); }
.iw .det { display: none; padding: 2px 14px 12px 50px; font-size: 13px; line-height: 1.45; opacity: .9; }
.iw.open .det { display: block; animation: fadein .3s ease; }
.mpx.on { border-color: color-mix(in srgb, var(--a) 50%, transparent); } .mpx .mp { background: none !important; } .iw .det.mpd { padding: 4px 14px 14px; } .mpc { display: flex; gap: 8px; align-items: center; justify-content: space-between; margin-bottom: 10px; } .mpc button { flex: 1; height: 42px; border-radius: 14px; background: rgba(255,255,255,.12); display: grid; place-items: center; } .mpsr { display: flex; flex-wrap: wrap; gap: 6px; } .mpsr button { padding: 7px 12px; border-radius: 99px; font-size: 12.5px; background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.14); } .mpsr button.on { background: color-mix(in srgb, var(--a) 30%, transparent); border-color: var(--a); }
.iw .det p { margin: 0 0 8px; }
.kvl { display: flex; justify-content: space-between; gap: 12px; padding: 5px 0; border-top: 1px solid rgba(255,255,255,.08); font-size: 12.5px; } .kvl span { opacity: .65; } .kvl b { font-weight: 600; text-align: right; }
.empty { opacity: .6; padding: 18px 4px; text-align: center; font-size: 13px; }
#alm { position: absolute; inset: 0; z-index: 30; display: none; flex-direction: column; align-items: center; justify-content: center; gap: 18px; text-align: center; padding: 30px; background: radial-gradient(circle at 50% 40%, rgba(255,60,90,.55), rgba(40,0,10,.92) 70%); animation: alb 1.1s ease-in-out infinite; }
#alm.on { display: flex; }
@keyframes alb { 50% { background: radial-gradient(circle at 50% 40%, rgba(255,90,110,.75), rgba(60,0,16,.94) 70%); } }
#alm ha-icon { --mdc-icon-size: 84px; color: #fff; animation: alsh .5s linear infinite; filter: drop-shadow(0 0 22px #ff3b5c); }
@keyframes alsh { 25% { transform: rotate(-8deg); } 75% { transform: rotate(8deg); } }
#alm b { font-size: 34px; letter-spacing: .12em; } #alm small { font-size: 15px; opacity: .85; }
#alm button { margin-top: 12px; padding: 18px 34px; border-radius: 40px; font-size: 18px; font-weight: 800; letter-spacing: .08em; background: #fff; color: #b0102c; box-shadow: 0 0 40px rgba(255,255,255,.5); text-align: center; }
#toast { position: absolute; left: 50%; bottom: 120px; transform: translateX(-50%) translateY(20px); padding: 10px 18px; border-radius: 99px; font-size: 13px; opacity: 0; z-index: 40; pointer-events: none; transition: all .35s; background: rgba(20,28,48,.9); border: 1px solid rgba(255,255,255,.2); white-space: nowrap; }
#toast.on { opacity: 1; transform: translateX(-50%); }
#vw { position: absolute; inset: 0; z-index: 9; display: none; flex-direction: column; background: linear-gradient(180deg, rgba(5,9,18,.55), rgba(5,9,18,.82)); -webkit-backdrop-filter: blur(14px); backdrop-filter: blur(14px); }
#vw.on { display: flex; animation: vwin .42s cubic-bezier(.2,.9,.3,1) both; }
@keyframes vwin { from { opacity: 0; transform: translateX(34px) scale(.98); } }
.vh { flex: none; display: flex; align-items: center; gap: 12px; padding: calc(env(safe-area-inset-top, 0px) + 14px) 18px 10px; }
.vh .bk { flex: none; width: 42px; height: 42px; border-radius: 50%; display: grid; place-items: center; }
.vh .ti { flex: 1; min-width: 0; font-size: 22px; font-weight: 600; letter-spacing: .01em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.vh .ic { flex: none; width: 42px; height: 42px; border-radius: 14px; display: grid; place-items: center; color: var(--a); background: color-mix(in srgb, var(--a) 18%, transparent); box-shadow: 0 0 18px color-mix(in srgb, var(--a) 40%, transparent); }
.vb { flex: 1; overflow-y: auto; padding: 4px 18px 130px; scrollbar-width: none; overscroll-behavior: contain; }
.vc { padding: 16px; margin-bottom: 12px; position: relative; overflow: hidden; }
.vc h4 { margin: 0 0 10px; font-size: 11.5px; letter-spacing: .16em; text-transform: uppercase; opacity: .7; font-weight: 600; }
.big { display: flex; align-items: center; gap: 16px; }
.big ha-icon { --mdc-icon-size: 64px; color: var(--a); filter: drop-shadow(0 0 16px var(--a)); animation: bob 5s ease-in-out infinite; }
.big b { font-size: 56px; font-weight: 200; letter-spacing: -.02em; line-height: 1; }
.big span { display: block; font-size: 15px; opacity: .8; margin-top: 4px; }
.kv { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-top: 14px; }
.kv div { text-align: center; padding: 10px 4px; border-radius: 16px; background: rgba(255,255,255,.07); }
.kv b { display: block; font-size: 17px; font-weight: 600; } .kv small { display: block; font-size: 10.5px; opacity: .65; margin-top: 2px; letter-spacing: .05em; text-transform: uppercase; }
.hrs { display: flex; gap: 8px; overflow-x: auto; scrollbar-width: none; padding-bottom: 4px; }
.hr { flex: none; width: 64px; text-align: center; padding: 10px 4px; border-radius: 18px; background: rgba(255,255,255,.07); }
.hr small { display: block; font-size: 11px; opacity: .7; } .hr ha-icon { --mdc-icon-size: 24px; color: var(--a); margin: 4px 0; } .hr b { display: block; font-size: 16px; font-weight: 500; } .hr em { display: block; font-style: normal; font-size: 10.5px; color: #8fd6ff; margin-top: 2px; min-height: 12px; }
.dl { display: flex; align-items: center; gap: 10px; padding: 9px 0; border-bottom: 1px solid rgba(255,255,255,.07); }
.dl:last-child { border: 0; } .dl .dn { width: 48px; font-size: 14px; font-weight: 600; } .dl ha-icon { --mdc-icon-size: 22px; color: var(--a); flex: none; }
.dl .rg2 { flex: 1; position: relative; height: 6px; border-radius: 4px; background: rgba(255,255,255,.1); } .dl .rg2 i { position: absolute; top: 0; bottom: 0; border-radius: 4px; background: linear-gradient(90deg, #67b8ff, #ffc24b); }
.dl .lo, .dl .hi { width: 34px; font-size: 13px; } .dl .lo { opacity: .6; text-align: right; } .dl .rn2 { width: 38px; font-size: 11px; color: #8fd6ff; text-align: right; }
.barw { height: 8px; border-radius: 5px; background: rgba(255,255,255,.1); overflow: hidden; } .barw i { display: block; height: 100%; border-radius: 5px; transition: width .6s; }
.bt { display: flex; align-items: center; gap: 12px; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,.07); } .bt:last-child { border: 0; } .bt .nm { flex: 1.3; font-size: 14px; min-width: 0; } .bt .bw { flex: 1; } .bt b { width: 44px; text-align: right; font-size: 14px; }
.spk { width: 100%; height: auto; display: block; } .spk text { font-size: 8.5px; fill: rgba(234,242,255,.65); font-weight: 600; } .spk .gl2 { stroke: rgba(255,255,255,.18); stroke-width: .6; stroke-dasharray: 2 3; }
.mm { display: flex; justify-content: space-between; font-size: 12px; opacity: .8; margin-top: 4px; } .mm b { font-weight: 700; }
.sg { display: flex; gap: 8px; flex-wrap: wrap; } .sg button { padding: 9px 15px; border-radius: 99px; background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.14); font-size: 13px; } .sg button.on { background: color-mix(in srgb, var(--a) 30%, transparent); border-color: var(--a); box-shadow: 0 0 16px color-mix(in srgb, var(--a) 40%, transparent); }
.schm { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; } .schm button { text-align: center; font-size: 11px; opacity: .8; } .schm i { display: block; height: 46px; border-radius: 16px; margin-bottom: 6px; border: 2px solid transparent; } .schm button.on { opacity: 1; } .schm button.on i { border-color: #fff; box-shadow: 0 0 18px rgba(255,255,255,.35); }
.tl { position: relative; padding-left: 18px; margin-left: 4px; border-left: 2px solid rgba(255,255,255,.14); } .tl .tk { position: relative; margin-bottom: 14px; } .tl .tk::before { content: ''; position: absolute; left: -25px; top: 5px; width: 10px; height: 10px; border-radius: 50%; background: var(--a); box-shadow: 0 0 10px var(--a); } .tl .tk.td::before { background: #ffc24b; box-shadow: 0 0 12px #ffc24b; }
.tl .dh { font-size: 12px; letter-spacing: .12em; text-transform: uppercase; opacity: .7; margin-bottom: 6px; } .tl .ie { padding: 8px 12px; margin-bottom: 6px; border-radius: 14px; background: rgba(255,255,255,.07); font-size: 14px; } .tl .ie small { display: block; font-size: 11.5px; opacity: .65; margin-top: 1px; }
.stu { display: flex; align-items: center; gap: 12px; margin: 14px 2px 8px; font-weight: 600; font-size: 16px; } .stu .av { width: 38px; height: 38px; border-radius: 50%; display: grid; place-items: center; font-weight: 700; color: #08121f; }
.sk { display: flex; align-items: center; gap: 10px; padding: 11px 12px; margin-bottom: 8px; border-radius: 16px; background: rgba(255,255,255,.07); } .sk b { display: block; font-size: 14px; } .sk small { display: block; opacity: .65; font-size: 12px; margin-top: 1px; } .sk .wh { margin-left: auto; font-size: 11.5px; padding: 4px 10px; border-radius: 99px; background: rgba(255,255,255,.12); flex: none; } .sk .wh.soon { background: rgba(255,179,64,.28); color: #ffd592; }
.mp { display: flex; align-items: center; gap: 12px; padding: 12px; margin-bottom: 8px; border-radius: 18px; background: rgba(255,255,255,.07); } .mp.on { background: color-mix(in srgb, var(--a) 18%, rgba(255,255,255,.05)); border: 1px solid color-mix(in srgb, var(--a) 50%, transparent); } .mp .mi { flex: none; width: 42px; height: 42px; border-radius: 14px; display: grid; place-items: center; background: rgba(255,255,255,.1); } .mp b { display: block; font-size: 14px; } .mp small { display: block; opacity: .68; font-size: 12px; margin-top: 1px; max-width: 46vw; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; } .mp .ct { margin-left: auto; display: flex; gap: 6px; } .mp .ct button { width: 38px; height: 38px; border-radius: 50%; background: rgba(255,255,255,.12); display: grid; place-items: center; }
.f1r { display: flex; align-items: center; gap: 10px; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,.07); font-size: 14px; } .f1r:last-child { border: 0; } .f1r .ps { width: 26px; font-weight: 700; opacity: .8; } .f1r .tc { width: 4px; height: 22px; border-radius: 2px; } .f1r .pt { margin-left: auto; font-weight: 600; }
.chlog { display: flex; flex-direction: column; gap: 8px; min-height: 40vh; max-height: calc(100vh - 340px); overflow-y: auto; scrollbar-width: none; padding: 4px 2px 8px; }
.chlog .cv { display: flex; flex-direction: column; gap: 4px; } .chlog .cm { font-size: 10.5px; opacity: .5; text-align: center; margin-top: 6px; } .chlog .ds { text-align: center; font-size: 11px; letter-spacing: .14em; text-transform: uppercase; opacity: .55; margin: 8px 0 2px; }
.chlog .m { max-width: 86%; padding: 10px 14px; border-radius: 20px; font-size: 14.5px; line-height: 1.4; white-space: pre-line; } .chlog .m.u { align-self: flex-end; background: linear-gradient(135deg, var(--a), var(--b)); color: #06101e; border-bottom-right-radius: 6px; font-weight: 500; } .chlog .m.a { align-self: flex-start; background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.14); border-bottom-left-radius: 6px; }
.chlog .typing { display: flex; gap: 5px; padding: 14px 16px; } .chlog .typing i { width: 7px; height: 7px; border-radius: 50%; background: var(--a); animation: dotb 1.2s ease-in-out infinite; } .chlog .typing i:nth-child(2) { animation-delay: .15s; } .chlog .typing i:nth-child(3) { animation-delay: .3s; }
@keyframes dotb { 0%, 60%, 100% { transform: none; opacity: .5; } 30% { transform: translateY(-6px); opacity: 1; } }
.chlog .tc span { display: inline-block; font-size: 10.5px; padding: 3px 9px; margin: 2px 4px 0 0; border-radius: 99px; background: rgba(255,255,255,.1); opacity: .75; } .chlog .live { align-self: flex-start; display: flex; align-items: center; gap: 10px; padding: 10px 14px; border-radius: 18px; background: color-mix(in srgb, var(--a) 18%, transparent); font-size: 13px; } .chlog .live .lic { display: grid; place-items: center; } .chlog .live .eq { display: inline-flex; gap: 3px; align-items: center; height: 16px; } .chlog .live .eq i { width: 3px; border-radius: 2px; background: var(--a); animation: eq .8s ease-in-out infinite; } .chlog .live .eq i:nth-child(2) { animation-delay: .1s; } .chlog .live .eq i:nth-child(3) { animation-delay: .2s; } .chlog .live .eq i:nth-child(4) { animation-delay: .3s; } .chlog .live .eq i:nth-child(5) { animation-delay: .4s; }
.askf { display: flex; gap: 8px; align-items: center; margin-top: 8px; } .askf input { flex: 1; min-width: 0; height: 48px; border-radius: 24px; border: 1px solid rgba(255,255,255,.2); background: rgba(255,255,255,.08); color: #fff; padding: 0 18px; font: inherit; font-size: 15px; outline: none; } .askf input:focus { border-color: var(--a); box-shadow: 0 0 18px color-mix(in srgb, var(--a) 40%, transparent); } .askf button { flex: none; width: 48px; height: 48px; border-radius: 50%; display: grid; place-items: center; background: linear-gradient(135deg, var(--a), var(--b)); color: #06101e; } .askf button.mic { background: rgba(255,255,255,.12); color: #fff; }
.chst { display: inline-flex; align-items: center; gap: 7px; font-size: 12px; opacity: .8; margin-bottom: 8px; } .chst i { width: 8px; height: 8px; border-radius: 50%; background: #3fe0a5; box-shadow: 0 0 8px #3fe0a5; } .chst.on i { animation: occp 1s ease-in-out infinite; background: var(--a); box-shadow: 0 0 10px var(--a); }
#radiohost { --primary-text-color: #eaf2ff; --secondary-text-color: rgba(234,242,255,.72); --primary-color: var(--a); --divider-color: rgba(255,255,255,.18); --card-background-color: transparent; --secondary-background-color: rgba(255,255,255,.09); --ha-card-background: transparent; --ha-card-box-shadow: none; --ha-card-border-radius: 22px; --error-color: #ff5d73; --text-primary-color: #06101e; --on-primary-color: #06101e; }
#root.done .in { animation: none; opacity: 1; transform: none; } #root.done #pulse .arc { animation: none; stroke-dashoffset: 0; }
.lite .rb, .lite #orb, .lite .bu .bi, .lite .rm::before, .lite .chip::after, .lite #pulse .dots { animation: none !important; }   /* w trybie oszczednym zegar (polysk) i pogoda (.wfx) nadal sie animuja */
.lite .gl, .lite .lp, .lite #ov .bd, .lite #vw { -webkit-backdrop-filter: none !important; backdrop-filter: none !important; }
@media (prefers-reduced-motion: reduce) { .rb, .wfx i, .time, .chip::after, #pulse .dots, .bu .bi, .rm::before { animation: none !important; } }

.lp .bp { font-style: normal; font-weight: 700; color: #ffd98a; } .lp small { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%; display: block; }
.row .bp { margin-left: auto; margin-right: 8px; padding: 2px 8px; border-radius: 99px; font-size: 12px; font-weight: 700; font-style: normal; background: rgba(255,200,90,.22); color: #ffe7b0; flex: none; }
#gdmfs { position: absolute; inset: 0; z-index: 30; display: flex; flex-direction: column; background: #0b1020; }
#gdmfs .gmh { display: flex; align-items: center; gap: 10px; padding: calc(env(safe-area-inset-top, 0px) + 12px) 14px 10px; flex: none; flex-wrap: wrap; }
#gdmfs .gmh > b { font-size: 18px; font-weight: 600; margin-right: auto; }
#gdmfs .gmt { width: 40px; height: 40px; border-radius: 50%; border: 0; display: grid; place-items: center; flex: none; color: inherit; background: rgba(255,255,255,.1); } #gdmfs .gmt[hidden] { display: none; }
#gdmfs .gmc { display: flex; gap: 6px; flex-wrap: wrap; } #gdmfs .gmc button { width: auto !important; height: auto !important; min-width: 0 !important; aspect-ratio: auto !important; flex: none; white-space: nowrap; display: inline-flex; align-items: center; justify-content: center; padding: 8px 15px; border-radius: 99px; border: 1px solid rgba(255,255,255,.2); background: rgba(255,255,255,.08); color: inherit; font: inherit; font-size: 13px; } #gdmfs .gmc button.on { background: rgba(120,200,255,.25); border-color: rgba(120,200,255,.6); }
@media (max-width: 760px) { #gdmfs .gmh > b { margin-right: 0; } #gdmfs .gmc { order: 3; flex: 1 1 100%; flex-wrap: nowrap; overflow-x: auto; padding-bottom: 2px; -webkit-overflow-scrolling: touch; } #gdmfs .gmh { padding-right: 14px; } }
#gdmfs .gmb { flex: 1; min-height: 0; position: relative; } #gdmfs .gmb > * { position: absolute; inset: 0; width: 100%; height: 100%; display: block; border: 0; }
.lts { display: flex; flex-wrap: wrap; gap: 8px; padding: 4px 22px 6px; } .lp { display: flex; align-items: center; gap: 8px; padding: 8px 13px 8px 9px; border-radius: 16px; text-align: left; background: rgba(255,255,255,.07); border: 1px solid rgba(255,255,255,.12); transition: background .25s, border-color .25s; } .lp ha-icon { --mdc-icon-size: 20px; opacity: .8; } .lp b { display: block; font-size: 13px; font-weight: 600; line-height: 1.15; } .lp small { display: block; font-size: 10.5px; opacity: .6; } .lp.on { background: color-mix(in srgb, #ffc24b 24%, rgba(255,255,255,.05)); border-color: color-mix(in srgb, #ffc24b 75%, transparent); } .lp.on ha-icon { color: #ffd36b; opacity: 1; filter: drop-shadow(0 0 6px #ffc24b); }
#pulse.al .alb { position: absolute; inset: 0; border-radius: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; text-align: center; padding: 34px; background: radial-gradient(circle at 50% 38%, #ff5a76, #9a0f28 72%); box-shadow: 0 0 70px rgba(255,60,90,.75), inset 0 0 40px rgba(255,255,255,.18); animation: alpl 1.1s ease-in-out infinite; }
#pulse.al .alb ha-icon { --mdc-icon-size: 84px; color: #fff; filter: drop-shadow(0 0 16px #ff3b5c); animation: alsh .5s linear infinite; } #pulse.al .alb b { font-size: 44px; letter-spacing: .14em; } #pulse.al .alb small { font-size: 18px; opacity: .92; max-width: 300px; }
#pulse.al .alb button { margin-top: 10px; padding: 16px 34px; border-radius: 40px; font-size: 18px; font-weight: 800; letter-spacing: .08em; background: #fff; color: #b0102c; box-shadow: 0 0 34px rgba(255,255,255,.5); }
@keyframes alpl { 50% { transform: scale(1.025); box-shadow: 0 0 100px rgba(255,60,90,.95), inset 0 0 40px rgba(255,255,255,.18); } }
.rm .lbi { --mdc-icon-size: 20px; color: #ffd36b; filter: drop-shadow(0 0 8px #ffc24b); position: relative; } .rm .atb { position: relative; flex: none; width: 30px; height: 30px; border-radius: 10px; display: grid; place-items: center; background: rgba(255,255,255,.1); opacity: .7; } .rm .atb ha-icon { --mdc-icon-size: 18px; } .rm .atb.on { background: color-mix(in srgb, var(--rc) 35%, transparent); color: var(--rc); opacity: 1; }
#root:not(.tb) .lts { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
#root:not(.tb) .lts .lp:last-child:nth-child(odd) { grid-column: 1 / -1; }
#root .lp { position: relative; overflow: hidden; gap: 11px; padding: 11px 12px; border-radius: 20px; min-height: 62px; min-width: 0; background: linear-gradient(145deg, rgba(40,52,84,.72), rgba(22,30,52,.8)); border: 1px solid rgba(255,255,255,.12); box-shadow: 0 4px 14px rgba(0,0,0,.2), inset 0 1px 0 rgba(255,255,255,.08); }
#root .lp ha-icon { flex: none; width: 38px; height: 38px; --mdc-icon-size: 21px; display: grid; place-items: center; border-radius: 13px; background: rgba(255,255,255,.08); opacity: 1; color: rgba(234,242,255,.7); transition: background .3s, color .3s, box-shadow .3s; }
#root .lp b { font-size: 14px; } #root .lp small { font-size: 11px; margin-top: 2px; }
#root .lp::after { content: ''; position: absolute; left: 14px; right: 14px; bottom: 0; height: 2px; border-radius: 2px; background: linear-gradient(90deg, transparent, #ffc24b, transparent); opacity: 0; transition: opacity .3s; }
#root .lp.on { background: linear-gradient(145deg, color-mix(in srgb, #ffc24b 30%, rgba(40,52,84,.8)), color-mix(in srgb, #ff9a5c 14%, rgba(22,30,52,.85))); border-color: color-mix(in srgb, #ffc24b 65%, transparent); box-shadow: 0 0 22px color-mix(in srgb, #ffc24b 28%, transparent), 0 4px 14px rgba(0,0,0,.2); }
#root .lp.on ha-icon { background: color-mix(in srgb, #ffc24b 32%, transparent); color: #ffe19a; box-shadow: 0 0 16px color-mix(in srgb, #ffc24b 60%, transparent); filter: none; }
#root .lp.on::after { opacity: .9; }
#dock .di { --dc: var(--a); font-size: 9.5px; gap: 3px; }
#dock .di ha-icon { width: 34px; height: 34px; --mdc-icon-size: 20px; display: grid; place-items: center; border-radius: 50%; background: radial-gradient(circle at 35% 30%, color-mix(in srgb, var(--dc) 22%, #0d1428), #080d1c 78%); border: 1.5px solid color-mix(in srgb, var(--dc) 38%, transparent); color: color-mix(in srgb, var(--dc) 85%, #fff); transition: box-shadow .25s, border-color .25s; }
#dock .di.on { color: color-mix(in srgb, var(--dc) 80%, #fff); opacity: 1; } #dock .di.on ha-icon { border-color: var(--dc); box-shadow: 0 0 12px color-mix(in srgb, var(--dc) 65%, transparent), inset 0 0 8px color-mix(in srgb, var(--dc) 30%, transparent); filter: drop-shadow(0 0 4px var(--dc)); }
#dock [data-a="rmenu"] { --dc: #a78bfa; } #dock [data-a="events"] { --dc: #f472b6; } #dock #dmenu { --dc: #67e8f9; }
#root:not(.tb) .rooms { gap: 10px; }
#root:not(.tb) .rm { width: calc(50vw - 21px); max-width: none; padding: 11px 11px 10px; border-radius: 22px; }
#root:not(.tb) .rm .rh { gap: 7px; flex-wrap: wrap; } #root:not(.tb) .rm .rn { font-size: 15px; flex: 1 1 60px; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
#root:not(.tb) .rm .ri { width: 34px; height: 34px; border-radius: 50%; } #root:not(.tb) .rm .ri ha-icon { --mdc-icon-size: 19px; }
#root:not(.tb) .rm .occ { font-size: 0; gap: 0; } #root:not(.tb) .rm .occ i { width: 9px; height: 9px; }
#root:not(.tb) .rm .rv { gap: 12px; margin: 8px 0 0; } #root:not(.tb) .rm .rv b { font-size: 26px; } #root:not(.tb) .rm .rv span { font-size: 15px; }
#root:not(.tb) .rm .atb { width: 28px; height: 28px; } #root:not(.tb) .rm .lbi { --mdc-icon-size: 18px; }
/* telefon: chipy "Teraz" bez animowanego polysku i pulsujacego cienia (ich warstwy potrafia znikac w przegladarkach mobilnych po przewinieciu strony) */
.chip::after { display: none !important; } #root:not(.tb) .chip.hot { animation: none !important; box-shadow: 0 0 16px color-mix(in srgb, var(--cc) 40%, transparent), 0 6px 18px rgba(0,0,0,.28) !important; }
#root:not(.tb) .chips { contain: layout; }
/* delikatne ozywienie sekcji "Teraz" i oznaczen NOWE: tylko transform + opacity na malych elementach (bez cieni i polysku) */
.chip .ci { position: relative; }
.chip.hot::before { content: ''; position: absolute; inset: 0; border-radius: inherit; border: 1.5px solid var(--cc, var(--a)); background: color-mix(in srgb, var(--cc, var(--a)) 9%, transparent); opacity: 0; pointer-events: none; animation: chb 3.6s ease-in-out infinite; }
.nwb { animation: nwp 2.6s ease-in-out infinite; }
@keyframes chb { 0%, 100% { opacity: .08; } 50% { opacity: 1; } }
@keyframes nwp { 0%, 100% { opacity: .78; transform: scale(1); } 50% { opacity: 1; transform: scale(1.06); } }
.chip.hot { animation: none !important; box-shadow: 0 0 14px color-mix(in srgb, var(--cc, var(--a)) 32%, transparent), 0 6px 18px rgba(0,0,0,.26) !important; }   /* ten sam efekt wszedzie (takze Tab10 w trybie oszczednym): animuje sie tylko ramka ::before */
#root.busy .chip.hot::before, #root.busy .nwb { animation-play-state: paused !important; }
.pls { display: flex; flex-wrap: wrap; gap: 6px; margin: 4px 0 12px; } .pls span { font-size: 12px; padding: 4px 10px; border-radius: 99px; background: rgba(255,255,255,.09); border: 1px solid rgba(255,255,255,.12); } .tg.wtg { grid-template-columns: repeat(2, 1fr); } .tg b em { font-style: normal; font-size: .5em; opacity: .65; margin-left: 2px; } #root.tb .tg.wtg { grid-template-columns: repeat(4, 1fr); } .tg.wtg > div { padding: 10px 6px; } .tg.wtg b { font-size: 22px; } #root.tb .tg.wtg b { font-size: 20px; }
.ef label { display: block; font-size: 12px; opacity: .85; margin: 10px 0 0; } .ef input, .ef select { width: 100%; box-sizing: border-box; margin-top: 4px; background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.18); border-radius: 12px; padding: 11px 12px; color: inherit; font: inherit; color-scheme: dark; } .ef .ck { display: flex; align-items: center; gap: 8px; } .ef .ck input { width: auto; margin: 0; } .ef .tw { display: grid; grid-template-columns: 1.4fr 1fr; gap: 8px; } .ef .tw:last-child { grid-template-columns: 1fr 1fr; margin-top: 12px; } .efm { min-height: 18px; margin-top: 8px; color: #ffc24b; font-size: 13px; } .btn2 { padding: 12px; border-radius: 14px; background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.16); font-weight: 600; } .btn2.pri2 { background: color-mix(in srgb, var(--a) 32%, transparent); border-color: var(--a); }
.td { display: flex; align-items: center; gap: 10px; padding: 8px 4px; border-bottom: 1px solid rgba(255,255,255,.08); } .td:last-of-type { border-bottom: 0; } .td .tc { flex: none; width: 40px; height: 40px; border-radius: 50%; display: grid; place-items: center; background: rgba(255,255,255,.07); } .td .tc ha-icon { --mdc-icon-size: 28px; color: rgba(234,242,255,.6); } .td.dn .tc { background: color-mix(in srgb, #3fe0a5 22%, transparent); } .td.dn .tc ha-icon { color: #3fe0a5; filter: drop-shadow(0 0 6px #3fe0a5); } .td .tt { flex: 1; font-size: 16px; } .td.dn .tt { opacity: .5; text-decoration: line-through; }
.td .tin { flex: 1; min-width: 0; background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.16); border-radius: 10px; padding: 9px 10px; color: inherit; font: inherit; } .td .tx { width: 38px; height: 38px; border-radius: 50%; background: rgba(255,93,115,.14); color: #ff8a9a; display: grid; place-items: center; } .tda { display: flex; gap: 8px; margin-top: 10px; } .tda input { flex: 1; min-width: 0; background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.16); border-radius: 12px; padding: 11px 12px; color: inherit; font: inherit; }
/* ===== motyw swiateczny ===== */
#xm { position: absolute; inset: 0 0 auto 0; height: 100%; z-index: 7; pointer-events: none; overflow: hidden; }
#xm .xw { position: absolute; left: 0; top: 0; width: 100%; height: 46px; } #xm .xb { position: absolute; width: 9px; height: 14px; margin-left: -4px; border-radius: 50% 50% 45% 45%; background: var(--bc); box-shadow: 0 0 10px var(--bc), 0 0 2px var(--bc); animation: xtw 2.4s ease-in-out infinite; }
#xm .xs { position: absolute; inset: 0; } #xm .xf { position: absolute; top: -12px; border-radius: 50%; background: #fff; animation: xmf linear infinite; box-shadow: 0 0 6px rgba(255,255,255,.7); }
@keyframes xtw { 0%, 100% { opacity: .45; } 50% { opacity: 1; } } @keyframes xmf { from { transform: translate3d(0, 0, 0); } to { transform: translate3d(34px, 108vh, 0); } }
.xmc { margin-top: 6px; font-size: 14px; color: #ffd166; letter-spacing: .06em; text-shadow: 0 0 12px rgba(255,209,102,.5); }
#root.xm #pulse .core { opacity: .9; }
#root.tb.lt #xm .xf, #root.tb.lt #xm .xb { animation: none !important; } #root.busy #xm .xf { animation-play-state: paused !important; }
.thm { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 10px; } .thm button { min-height: 62px; padding: 12px 8px; border-radius: 18px; font-size: 16px; font-weight: 600; line-height: 1.2; background: rgba(255,255,255,.08); border: 1.5px solid rgba(255,255,255,.14); text-align: center; } .thm button.on { background: color-mix(in srgb, var(--a) 26%, transparent); border-color: var(--a); box-shadow: 0 0 18px color-mix(in srgb, var(--a) 40%, transparent); }
.lks { display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 10px; } .lk { display: flex; align-items: center; gap: 12px; padding: 14px; border-radius: 18px; text-align: left; background: rgba(255,255,255,.07); border: 1.5px solid rgba(255,255,255,.12); } .lk ha-icon { --mdc-icon-size: 28px; flex: none; width: 48px; height: 48px; display: grid; place-items: center; border-radius: 50%; background: rgba(255,255,255,.08); } .lk b { display: block; font-size: 16px; } .lk small { display: block; font-size: 11.5px; opacity: .7; margin-top: 2px; } .lk.on { background: color-mix(in srgb, #ff6b7a 18%, rgba(255,255,255,.05)); border-color: #ff6b7a; } .lk.on ha-icon { background: color-mix(in srgb, #ff6b7a 32%, transparent); color: #ffb0b8; }
/* telefon: pokoje jako kompaktowa siatka 2 kolumn (bez przewijania): ikona + nazwa, temperatura i wilgotnosc, zarowka i automat w rogu */
#root:not(.tb) .rooms { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; overflow: visible; scroll-snap-type: none; padding: 4px 22px 8px; }
#root:not(.tb) .rm { width: auto; max-width: none; padding: 10px 11px 9px; scroll-snap-align: none; border-radius: 20px; }
#root:not(.tb) .rm .rh { display: grid; grid-template-columns: 34px minmax(0, 1fr) auto; gap: 8px; align-items: center; flex-wrap: nowrap; }
#root:not(.tb) .rm .rn { font-size: 14.5px; flex: none; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
#root:not(.tb) .rm .rv { display: flex; align-items: baseline; gap: 10px; margin: 8px 0 0; padding-right: 64px; } #root:not(.tb) .rm .rv b { font-size: 25px; } #root:not(.tb) .rm .rv b em { font-size: 12px; } #root:not(.tb) .rm .rv span { font-size: 14px; }
#root:not(.tb) .rm .lbi { position: absolute; right: 44px; bottom: 11px; --mdc-icon-size: 20px; } #root:not(.tb) .rm .atb { position: absolute; right: 9px; bottom: 7px; width: 30px; height: 30px; }
#root:not(.tb) .rm::before { display: none; }
#root:not(.tb) .rm .rh { position: static; } #root:not(.tb) .rm .rv { gap: 6px; padding-right: 52px; } #root:not(.tb) .rm .rv span { white-space: nowrap; font-size: 13.5px; } #root:not(.tb) .rm .rv b { font-size: 24px; white-space: nowrap; }
#root:not(.tb) .rm .atb { width: 26px; height: 26px; right: 9px; bottom: 9px; } #root:not(.tb) .rm .atb ha-icon { --mdc-icon-size: 16px; } #root:not(.tb) .rm .lbi { right: 40px; bottom: 11px; --mdc-icon-size: 18px; }
/* telefon: swiatla w doku (arkusz) zamiast sekcji na ekranie glownym; przycisk Pokoje w doku tylko na tablecie */
#dlt { --dc: #ffd24b; } 
#dock #dlt.lit ha-icon { border-color: color-mix(in srgb, #ffd24b 80%, transparent); box-shadow: 0 0 12px color-mix(in srgb, #ffd24b 55%, transparent); color: #ffe19a; }
#root:not(.tb) #secl, #root:not(.tb) #lts { display: none !important; }
.ef .wdr { display: flex; gap: 6px; margin-top: 10px; } .ef .wdr button { flex: 1; padding: 10px 0; border-radius: 12px; background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.16); font-weight: 600; } .ef .wdr button.on { background: color-mix(in srgb, var(--a) 30%, transparent); border-color: var(--a); }
/* wysuniete okna: kafelki wchodza kolejno (jak w menu pokoi) - tylko przy otwarciu, nie przy odswiezaniu tresci */
#sh.an .lp, #sh.an .row, #sh.an .iw, #sh.an .ev, #sh.an .vc, #sh.an h2 { opacity: 0; transform: translateY(16px) scale(.94); animation: pop .5s cubic-bezier(.2,1.3,.4,1) forwards; animation-delay: calc(var(--i, 0) * 45ms + 140ms); }
.f1r .nm2 { flex: 1; min-width: 0; } .f1r .nm2 small { display: block; font-size: 11.5px; opacity: .65; margin-top: 1px; } .f1r .pt small { font-size: 11px; }
/* kalendarz: widok miesiaca i usuwanie wydarzen */
.ie { position: relative; } .ie .evx { position: absolute; right: 8px; top: 8px; width: 34px; height: 34px; border-radius: 50%; display: grid; place-items: center; background: rgba(255,93,115,.12); color: #ff9aa8; } .ie .evx ha-icon { --mdc-icon-size: 19px; } .ie > b { padding-right: 40px; }
.mh { display: flex; align-items: center; gap: 6px; margin-bottom: 10px; } .mh b { flex: 1; text-align: center; font-size: 17px; font-weight: 600; } .mh button { width: 40px; height: 40px; border-radius: 50%; background: rgba(255,255,255,.09); display: grid; place-items: center; } .mh .tdb { width: auto; padding: 0 14px; border-radius: 99px; font-size: 13px; font-weight: 600; }
.mg { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: 4px; } .mg .wh { text-align: center; font-size: 11px; opacity: .6; padding: 4px 0; letter-spacing: .06em; } .mc { position: relative; aspect-ratio: 1 / 1.05; border-radius: 14px; background: rgba(255,255,255,.05); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 3px; } .mc b { font-size: 15px; font-weight: 500; } .mc span { display: flex; gap: 3px; min-height: 6px; } .mc i { width: 6px; height: 6px; border-radius: 50%; box-shadow: 0 0 6px currentColor; } .mc em { position: absolute; right: 4px; top: 2px; font-size: 9px; font-style: normal; opacity: .7; } .mc.om { opacity: .35; } .mc.td { border: 1.5px solid var(--a); } .mc.sl { background: color-mix(in srgb, var(--a) 28%, transparent); box-shadow: 0 0 14px color-mix(in srgb, var(--a) 40%, transparent); }
.vb.tvm { display: flex; flex-direction: column; padding-bottom: calc(env(safe-area-inset-bottom, 0px) + 96px); } #root.tb .vb.tvm { padding-bottom: 14px; } .vb.tvm #tvg { flex: none; } .vb.tvm #tvhost { flex: 1; min-height: 0; position: relative; margin-bottom: 0 !important; } .vb.tvm tv-guide { position: absolute; inset: 0; display: block; }
#root.tb .mc { aspect-ratio: auto; height: 48px; gap: 2px; border-radius: 12px; } #root.tb .mc b { font-size: 14px; } #root.tb .mg { gap: 3px; }
/* suwaki swiatel: tory w kolorach (tecza / ciepla-zimna biel / jasnosc) */
.rng { -webkit-appearance: none; appearance: none; width: 100%; height: 16px; border-radius: 99px; outline: none; margin: 6px 0 2px; border: 1px solid rgba(255,255,255,.2); }
.rng.hue { background: linear-gradient(90deg, hsl(0,100%,55%), hsl(40,100%,55%), hsl(80,100%,50%), hsl(130,100%,45%), hsl(180,100%,45%), hsl(220,100%,60%), hsl(270,100%,62%), hsl(320,100%,58%), hsl(360,100%,55%)); }
.rng.ct { background: linear-gradient(90deg, #ff9633, #ffc47a, #fff2dc, #cfe3ff, #9cc4ff); } .rng.br { background: linear-gradient(90deg, rgba(255,255,255,.1), #fff); }
.rng::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 30px; height: 30px; border-radius: 50%; background: #fff; border: 4px solid rgba(8,12,26,.55); box-shadow: 0 0 10px rgba(0,0,0,.5); cursor: pointer; } .rng::-moz-range-thumb { width: 24px; height: 24px; border-radius: 50%; background: #fff; border: 4px solid rgba(8,12,26,.55); }
/* telefon: lista Teraz/Szkola skrocona do 2 kafelkow, reszta po rozwinieciu */
.mre { flex: none; align-self: stretch; display: flex; align-items: center; justify-content: center; gap: 6px; margin: 2px 22px 0; padding: 10px 14px; border-radius: 16px; background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.12); font-size: 13px; font-weight: 600; color: var(--a); } .mre ha-icon { --mdc-icon-size: 20px; }
#root:not(.tb) .chips:not(.scl) .mre, #root:not(.tb) .scl .mre { margin: 0; width: 100%; }
#root.tb .mre { display: none; }
#root:not(.tb) #chips { flex-direction: column; overflow: visible; scroll-snap-type: none; } #root:not(.tb) #chips .chip { width: 100%; max-width: none; }
/* ustawienia: progi klimatu */
.thr { display: flex; align-items: center; gap: 10px; padding: 8px 0; border-top: 1px solid rgba(255,255,255,.08); } .thr span { flex: 1; font-size: 14px; } .thr b { min-width: 64px; text-align: center; font-size: 17px; font-weight: 600; } .thr button { width: 40px; height: 40px; flex: none; border-radius: 50%; background: rgba(255,255,255,.1); display: grid; place-items: center; padding: 0 0 3px; font-size: 24px; line-height: 1; font-family: Roboto, sans-serif; }
/* telefon: kafelki Teraz / Szkola / Pokoje "zespolone z tlem" - przezroczyste, delikatnie podbarwione, bez ciezkiego cienia i ramki */
#root .chip.gl, #root .rm.gl { background: linear-gradient(145deg, color-mix(in srgb, var(--cc, var(--rc, #7aa2ff)) 9%, rgba(255,255,255,.14)), rgba(255,255,255,.04)) !important; border: 1px solid rgba(255,255,255,.17) !important; box-shadow: 0 10px 36px rgba(0,0,0,.28), inset 0 1px 0 rgba(255,255,255,.18) !important; }   /* standard: kafelki jak kafelek pogody (.gl) */
#root .chip.gl.hot { border-color: color-mix(in srgb, var(--cc, #ffb340) 55%, transparent) !important; }
#root .rm.gl::before { opacity: .32; }
/* telefon: przewijanie - animacje w tle wstrzymane, warstwy kafelkow izolowane (bez glicza pulsu i kafelkow pod spodem) */
#root.scr *, #root.scr *::before, #root.scr *::after { animation-play-state: paused !important; }
#root .rm::before { animation: none !important; }
#root .rm, #root .chip { contain: paint; transform: translateZ(0); }
#root #pulse { transform: translateZ(0); }   /* bez contain: paint - ucinalo pierscienie wokol pulsu (Jarvis) */
/* kafelek pogody: tekst (temperatura) na wlasnej warstwie, efekty pogody bez filtra blur - na telefonach temperatura potrafila znikac */
.wxo { isolation: isolate; contain: paint; } .wxo > b, .wxo > small, .wxo > .hm, .wxo > ha-icon { transform: translateZ(0); will-change: transform; z-index: 2 !important; }
#root .wfx .cl, #root .wfx .fg { filter: none; }
/* przyciski swiatel: polprzezroczyste jak pozostale kafelki */
#root .lp { background: linear-gradient(145deg, rgba(255,255,255,.14), rgba(255,255,255,.04)) !important; border: 1px solid rgba(255,255,255,.17) !important; box-shadow: 0 10px 36px rgba(0,0,0,.28), inset 0 1px 0 rgba(255,255,255,.18) !important; -webkit-backdrop-filter: blur(18px) saturate(1.35); backdrop-filter: blur(18px) saturate(1.35); }
#root .lp.on { background: linear-gradient(145deg, color-mix(in srgb, #ffc24b 30%, rgba(255,255,255,.14)), rgba(255,255,255,.05)) !important; border-color: color-mix(in srgb, #ffc24b 55%, transparent) !important; }
/* potok asystenta w ustawieniach */
.ppl { display: flex; flex-wrap: wrap; gap: 8px; } .ppl button { padding: 10px 14px; border-radius: 14px; background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.1); font-size: 13.5px; font-weight: 600; } .ppl button.on { background: color-mix(in srgb, var(--a) 28%, transparent); border-color: var(--a); }
/* ===== motyw Matrix: czern + zielen, font monospace, deszcz znakow (canvas #mxr), skanlinie ===== */
#mxr { position: absolute; inset: 0; width: 100%; height: 100%; display: none; opacity: .42; pointer-events: none; }
#root.mx { background: #000; color: #c8ffd9; font-family: 'Courier New', Consolas, 'Liberation Mono', monospace; }
#root.mx button, #root.mx input, #root.mx select, #root.mx .time, #root.mx b, #root.mx small { font-family: 'Courier New', Consolas, 'Liberation Mono', monospace !important; }
#root.mx #sky { background: #000 !important; } #root.mx #sky > *, #root.mx #sky .rb { display: none !important; } #root.mx #fx { display: none; }
#root.mx::after { content: ''; position: absolute; inset: 0; z-index: 9; pointer-events: none; background: repeating-linear-gradient(0deg, rgba(0,255,106,.045) 0 1px, transparent 1px 3px); }
#root.mx .gl, #root.mx .lp, #root.mx .vc, #root.mx .row, #root.mx .iw .row, #root.mx .rm.gl, #root.mx .chip.gl { background: linear-gradient(135deg, rgba(0,255,106,.12), rgba(0,14,6,.82) 70%) !important; border: 1px solid rgba(0,255,106,.30) !important; box-shadow: 0 0 10px rgba(0,255,106,.12) !important; border-radius: 12px !important; }
#root.mx .chip.gl:not(.hot), #root.mx .rm.gl { --cc: #00ff6a !important; --rc: #00ff6a !important; }
#root.mx #sh, #root.mx #rmn, #root.mx #menu, #root.mx #vw, #root.mx .vb { background: #000 !important; }
#root.mx #sh.gl, #root.mx #rmn.gl { background: linear-gradient(160deg, #001a0a, #000) !important; border-radius: 22px 22px 0 0 !important; }
#root.mx .time { background: none !important; -webkit-text-fill-color: #00ff6a; color: #00ff6a; text-shadow: 0 0 16px #00ff6a, 0 0 2px #b6ffcf; animation: none !important; font-weight: 300; }
#root.mx .hello::after { content: '_'; animation: mxb 1s steps(1) infinite; } @keyframes mxb { 50% { opacity: 0; } }
#root.mx .sec, #root.mx h2, #root.mx h4 { color: #00ff6a; text-shadow: 0 0 8px rgba(0,255,106,.6); } #root.mx .sec::before { content: '> '; }
#root.mx ha-icon { filter: drop-shadow(0 0 5px currentColor); } #root.mx small { opacity: .75; }
#root.mx .rm .ri, #root.mx .chip .ci, #root.mx .lp ha-icon { background: rgba(0,255,106,.14) !important; color: #00ff6a !important; box-shadow: 0 0 10px rgba(0,255,106,.35) !important; }
#root.mx .lp.on { background: linear-gradient(135deg, rgba(0,255,106,.35), rgba(0,40,16,.7)) !important; border-color: #00ff6a !important; }
#root.mx .thm button.on, #root.mx .ppl button.on, #root.mx .sg button.on { background: rgba(0,255,106,.25) !important; border-color: #00ff6a !important; color: #eafff1; }
#root.mx #pulse .trk { stroke: rgba(0,255,106,.14); } #root.mx #pulse .core { opacity: .5; }
/* ===== motyw Jarvis: HUD w stylu Iron Mana - cyjan + bursztyn, siatka, obracajace sie pierscienie, wiazka skanera ===== */
#root.jv { background: #02070f; color: #d4f6ff; }
#root.jv #sky { background: radial-gradient(ellipse at 50% 42%, #06324a 0%, #031321 48%, #02070f 100%) !important; } #root.jv #sky > *, #root.jv #fx { display: none !important; }
#root.jv #sky::after { content: ''; position: absolute; inset: 0; background-image: linear-gradient(rgba(0,229,255,.055) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,.055) 1px, transparent 1px); background-size: 44px 44px; }
#root.jv::after { content: ''; position: absolute; left: 0; right: 0; top: 0; height: 90px; z-index: 9; pointer-events: none; background: linear-gradient(180deg, transparent, rgba(0,229,255,.10) 70%, rgba(0,229,255,.55) 99%, transparent); transform: translateY(-100px); animation: jvs 7s linear infinite; }
@keyframes jvs { to { transform: translateY(105vh); } }
#root.jv .gl, #root.jv .lp, #root.jv .vc, #root.jv .row, #root.jv .rm.gl, #root.jv .chip.gl { border-radius: 6px !important; border: 1px solid rgba(0,229,255,.28) !important; box-shadow: inset 0 0 16px rgba(0,229,255,.06) !important;
  background: linear-gradient(135deg, rgba(0,229,255,.13), rgba(2,14,26,.82) 62%) !important; }
#root.jv .chip.gl, #root.jv .rm.gl, #root.jv .lp { background-image: linear-gradient(135deg, rgba(0,229,255,.13), rgba(2,14,26,.82) 62%), linear-gradient(#00e5ff, #00e5ff), linear-gradient(#00e5ff, #00e5ff), linear-gradient(#00e5ff, #00e5ff), linear-gradient(#00e5ff, #00e5ff), linear-gradient(#00e5ff, #00e5ff), linear-gradient(#00e5ff, #00e5ff), linear-gradient(#00e5ff, #00e5ff), linear-gradient(#00e5ff, #00e5ff) !important;
  background-size: 100% 100%, 12px 2px, 2px 12px, 12px 2px, 2px 12px, 12px 2px, 2px 12px, 12px 2px, 2px 12px !important; background-position: 0 0, 0 0, 0 0, 100% 0, 100% 0, 0 100%, 0 100%, 100% 100%, 100% 100% !important; background-repeat: no-repeat !important; }
#root.jv .chip.gl:not(.hot), #root.jv .rm.gl { --cc: #00e5ff !important; --rc: #00e5ff !important; }
#root.jv #sh, #root.jv #rmn, #root.jv #menu, #root.jv #vw, #root.jv .vb { background: #02070f !important; } #root.jv #sh.gl, #root.jv #rmn.gl { background: linear-gradient(160deg, #04243a, #02070f) !important; border-radius: 12px 12px 0 0 !important; }
#root.jv .time { background: none !important; -webkit-text-fill-color: #00e5ff; color: #00e5ff; font-family: 'DSEG7 Classic', 'Courier New', monospace; font-weight: 400; letter-spacing: .04em; text-shadow: 0 0 18px #00e5ff, 0 0 3px #bff7ff; animation: none !important; }
#root.jv .hello, #root.jv .sec, #root.jv h2, #root.jv h4 { letter-spacing: .22em; text-transform: uppercase; color: #00e5ff; } #root.jv .sec::before { content: '// '; opacity: .7; }
#root.jv ha-icon { filter: drop-shadow(0 0 5px rgba(0,229,255,.6)); }
#root.jv .rm .ri, #root.jv .chip .ci, #root.jv .lp ha-icon { background: rgba(0,229,255,.12) !important; color: #00e5ff !important; box-shadow: 0 0 10px rgba(0,229,255,.35) !important; border-radius: 6px !important; }
#root.jv .lp.on { background-color: rgba(255,183,3,.18) !important; border-color: #ffb703 !important; } #root.jv .lp.on ha-icon { color: #ffb703 !important; background: rgba(255,183,3,.16) !important; box-shadow: 0 0 12px rgba(255,183,3,.5) !important; }
#root.jv .thm button.on, #root.jv .ppl button.on, #root.jv .sg button.on { background: rgba(0,229,255,.22) !important; border-color: #00e5ff !important; }
#root.jv #pulse::before, #root.jv #pulse::after { content: ''; position: absolute; border-radius: 50%; pointer-events: none; }
#root.jv #pulse::before { inset: -16px; border: 2px dashed rgba(0,229,255,.38); animation: rot 38s linear infinite; }
#root.jv #pulse::after { inset: -32px; border: 2px solid transparent; border-top-color: #00e5ff; border-bottom-color: rgba(255,183,3,.7); animation: rot 17s linear infinite reverse; filter: drop-shadow(0 0 6px rgba(0,229,255,.6)); }
#root.jv #pulse .trk { stroke: rgba(0,229,255,.14); } #root.jv #pulse .core { opacity: .55; }
#root.jv.lt::after, #root.jv.lt #pulse::before, #root.jv.lt #pulse::after { animation: none !important; }
#root.jv.lt::after { display: none; }
/* ===== motyw Vice City (GTA 6): neonowy zachod slonca, rozowo-pomaranczowe niebo, palmy, kursywa ===== */
#root.gt { background: #12041f; color: #fff3fb; }
#root.gt #sky { background: linear-gradient(180deg, #14052e 0%, #3a0a5e 28%, #b0207a 58%, #ff4f6d 76%, #ff9a3c 92%, #ffd166 100%) !important; overflow: hidden; } #root.gt #sky > *, #root.gt #fx { display: none !important; }
#root.gt #sky::before { content: ''; position: absolute; left: 50%; bottom: -4%; width: 50vmin; height: 50vmin; margin-left: -25vmin; border-radius: 50%; background: linear-gradient(180deg, #ffe27a 0%, #ff9a3c 45%, #ff2e93 100%); box-shadow: 0 0 80px rgba(255,79,109,.55); -webkit-mask-image: linear-gradient(#000 0 52%, transparent 52% 56%, #000 56% 63%, transparent 63% 68%, #000 68% 74%, transparent 74% 80%, #000 80% 85%, transparent 85% 91%, #000 91%); mask-image: linear-gradient(#000 0 52%, transparent 52% 56%, #000 56% 63%, transparent 63% 68%, #000 68% 74%, transparent 74% 80%, #000 80% 85%, transparent 85% 91%, #000 91%); animation: gts 6s ease-in-out infinite alternate; }
@keyframes gts { from { transform: scale(1); opacity: .92; } to { transform: scale(1.045); opacity: 1; } }
#root.gt #sky::after { content: ''; position: absolute; inset: 0; background-image: url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 200 320%27%3E%3Cg fill=%27%2312041f%27 stroke=%27%2312041f%27%3E%3Cpath d=%27M108 320 C104 240 98 160 122 62%27 fill=%27none%27 stroke-width=%278%27/%3E%3Cpath d=%27M122 62 C86 26 42 34 14 76 C54 52 92 52 122 62Z%27/%3E%3Cpath d=%27M122 62 C150 22 194 24 200 68 C170 46 144 50 122 62Z%27/%3E%3Cpath d=%27M122 62 C100 10 60 4 30 20 C68 22 100 36 122 62Z%27/%3E%3Cpath d=%27M122 62 C146 8 186 -2 200 14 C168 14 140 34 122 62Z%27/%3E%3Cpath d=%27M122 62 C70 70 36 96 22 140 C54 108 90 86 122 62Z%27/%3E%3Cpath d=%27M122 62 C170 74 190 108 192 150 C170 112 148 86 122 62Z%27/%3E%3C/g%3E%3C/svg%3E"), url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 200 320%27%3E%3Cg fill=%27%2312041f%27 stroke=%27%2312041f%27%3E%3Cpath d=%27M108 320 C104 240 98 160 122 62%27 fill=%27none%27 stroke-width=%278%27/%3E%3Cpath d=%27M122 62 C86 26 42 34 14 76 C54 52 92 52 122 62Z%27/%3E%3Cpath d=%27M122 62 C150 22 194 24 200 68 C170 46 144 50 122 62Z%27/%3E%3Cpath d=%27M122 62 C100 10 60 4 30 20 C68 22 100 36 122 62Z%27/%3E%3Cpath d=%27M122 62 C146 8 186 -2 200 14 C168 14 140 34 122 62Z%27/%3E%3Cpath d=%27M122 62 C70 70 36 96 22 140 C54 108 90 86 122 62Z%27/%3E%3Cpath d=%27M122 62 C170 74 190 108 192 150 C170 112 148 86 122 62Z%27/%3E%3C/g%3E%3C/svg%3E"); background-repeat: no-repeat, no-repeat; background-size: auto 46%, auto 36%; background-position: -2% 108%, 104% 108%; opacity: .92; animation: gtp 7s ease-in-out infinite alternate; transform-origin: 50% 100%; }
@keyframes gtp { from { transform: skewX(-.6deg); } to { transform: skewX(.6deg); } }
#root.gt .gl, #root.gt .lp, #root.gt .vc, #root.gt .row, #root.gt .rm.gl, #root.gt .chip.gl { background: linear-gradient(135deg, rgba(255,61,154,.30), rgba(24,6,48,.78) 70%) !important; border: 1px solid rgba(255,140,200,.55) !important; box-shadow: 0 0 14px rgba(255,61,154,.28), inset 0 1px 0 rgba(255,255,255,.18) !important; }
#root.gt .chip.gl:not(.hot), #root.gt .rm.gl { --cc: #ff3d9a !important; --rc: #ff3d9a !important; }
#root.gt #sh, #root.gt #rmn, #root.gt #menu, #root.gt #vw, #root.gt .vb { background: #14052e !important; } #root.gt #sh.gl, #root.gt #rmn.gl { background: linear-gradient(160deg, #3a0a5e, #14052e) !important; }
#root.gt .time { background: linear-gradient(180deg, #ffe27a 10%, #ff4f6d 55%, #ff2e93 95%) !important; -webkit-background-clip: text !important; background-clip: text !important; -webkit-text-fill-color: transparent; color: transparent; font-family: 'Arial Black', 'Helvetica Neue', Impact, sans-serif; font-style: italic; font-weight: 900; letter-spacing: .02em; filter: drop-shadow(0 0 14px rgba(255,61,154,.7)); animation: none !important; }
#root.gt .hello, #root.gt .sec, #root.gt h2, #root.gt h4 { font-style: italic; font-weight: 800; letter-spacing: .16em; text-transform: uppercase; color: #ffe27a; text-shadow: 0 0 10px rgba(255,154,60,.7); }
#root.gt .rm .ri, #root.gt .chip .ci, #root.gt .lp ha-icon { background: rgba(255,61,154,.25) !important; color: #ffe27a !important; box-shadow: 0 0 12px rgba(255,61,154,.55) !important; }
#root.gt .lp.on { background: linear-gradient(135deg, rgba(0,229,208,.45), rgba(24,6,48,.78) 70%) !important; border-color: #00e5d0 !important; } #root.gt .lp.on ha-icon { color: #00e5d0 !important; background: rgba(0,229,208,.22) !important; box-shadow: 0 0 12px rgba(0,229,208,.6) !important; }
#root.gt .thm button.on, #root.gt .ppl button.on, #root.gt .sg button.on { background: rgba(255,61,154,.4) !important; border-color: #ff8cc8 !important; }
#root.gt #pulse { background: radial-gradient(closest-side, rgba(20,5,46,.78) 62%, transparent 100%); } #root.gt #pulse .trk { stroke: rgba(255,255,255,.18); } #root.gt #pulse .core { opacity: .6; }
#root.gt.lt #sky::before, #root.gt.lt #sky::after { animation: none !important; }
/* ===== motywy tematyczne (pory roku, kosmos, zorza, glebia) ===== */
#root.thx #sky > *, #root.thx #fx { display: none !important; } #root.thx #sky { overflow: hidden; }
#root.thx .gl, #root.thx .lp, #root.thx .vc, #root.thx .row, #root.thx .rm.gl, #root.thx .chip.gl { background: linear-gradient(135deg, color-mix(in srgb, var(--tha) 26%, rgba(8,12,24,.62)), rgba(8,12,24,.74) 72%) !important; border: 1px solid color-mix(in srgb, var(--tha) 48%, transparent) !important; box-shadow: 0 0 12px color-mix(in srgb, var(--tha) 18%, transparent), inset 0 1px 0 rgba(255,255,255,.12) !important; }
#root.thx .chip.gl:not(.hot), #root.thx .rm.gl { --cc: var(--tha) !important; --rc: var(--tha) !important; }
#root.thx #sh, #root.thx #rmn, #root.thx #menu, #root.thx #vw, #root.thx .vb { background: color-mix(in srgb, var(--thbg) 94%, #000) !important; } #root.thx #sh.gl, #root.thx #rmn.gl { background: linear-gradient(160deg, color-mix(in srgb, var(--tha) 18%, var(--thbg)), var(--thbg)) !important; }
#root.thx .time { background: linear-gradient(180deg, #ffffff 15%, var(--tha) 100%) !important; -webkit-background-clip: text !important; background-clip: text !important; -webkit-text-fill-color: transparent; color: transparent; animation: none !important; filter: drop-shadow(0 0 12px color-mix(in srgb, var(--tha) 55%, transparent)); font-weight: 300; }
#root.thx .hello, #root.thx .sec, #root.thx h2, #root.thx h4 { color: var(--tha); letter-spacing: .18em; text-shadow: 0 0 10px color-mix(in srgb, var(--tha) 50%, transparent); }
#root.thx .rm .ri, #root.thx .chip .ci, #root.thx .lp ha-icon { background: color-mix(in srgb, var(--tha) 22%, transparent) !important; color: var(--tha) !important; box-shadow: 0 0 12px color-mix(in srgb, var(--tha) 40%, transparent) !important; }
#root.thx .lp.on { background: linear-gradient(135deg, rgba(255,194,75,.40), rgba(8,12,24,.74) 72%) !important; border-color: #ffc24b !important; } #root.thx .lp.on ha-icon { color: #ffd36b !important; background: rgba(255,194,75,.22) !important; box-shadow: 0 0 12px rgba(255,194,75,.55) !important; }
#root.thx .thm button.on, #root.thx .ppl button.on, #root.thx .sg button.on { background: color-mix(in srgb, var(--tha) 40%, transparent) !important; border-color: var(--tha) !important; }
#root.thx #pulse .trk { stroke: rgba(255,255,255,.15); } #root.thx #pulse { background: radial-gradient(closest-side, rgba(6,10,20,.6) 60%, transparent 100%); }
#root.thx.lt #sky::before, #root.thx.lt #sky::after { animation: none !important; }
/* Wiosna */
#root.th-spring { --tha: #f9a8d4; --thbg: #0b1f1a; background: #0b1f1a; }
#root.th-spring #sky { background: linear-gradient(180deg, #0c2a36 0%, #14473f 50%, #3c7a45 100%) !important; }
#root.th-spring #sky::before { content: ''; position: absolute; left: -10%; top: -20%; width: 70%; height: 70%; background: radial-gradient(closest-side, rgba(255,190,220,.35), transparent); animation: thb 9s ease-in-out infinite alternate; }
#root.th-spring #sky::after { content: ''; position: absolute; left: 0; right: 0; bottom: 0; height: 22%; background: radial-gradient(ellipse at 20% 100%, #1d5a2e 0 38%, transparent 40%), radial-gradient(ellipse at 62% 100%, #266b35 0 34%, transparent 36%), radial-gradient(ellipse at 95% 100%, #1d5a2e 0 30%, transparent 32%); }
/* Lato */
#root.th-summer { --tha: #fde047; --thbg: #0a3552; background: #0a3552; }
#root.th-summer #sky { background: linear-gradient(180deg, #0a4a82 0%, #1a86bd 48%, #f5b04a 100%) !important; }
#root.th-summer #sky::before { content: ''; position: absolute; right: -14%; top: -22%; width: 60vmin; height: 60vmin; border-radius: 50%; background: radial-gradient(closest-side, #fff7c2 0 24%, rgba(255,214,90,.55) 45%, transparent 70%); animation: thb 7s ease-in-out infinite alternate; }
#root.th-summer #sky::after { content: ''; position: absolute; right: -30%; top: -40%; width: 100vmin; height: 100vmin; background: repeating-conic-gradient(rgba(255,235,150,.14) 0 6deg, transparent 6deg 18deg); -webkit-mask-image: radial-gradient(closest-side, #000, transparent); mask-image: radial-gradient(closest-side, #000, transparent); animation: rot 90s linear infinite; }
/* Jesien */
#root.th-autumn { --tha: #fb923c; --thbg: #1a0e07; background: #1a0e07; }
#root.th-autumn #sky { background: linear-gradient(180deg, #1c0f08 0%, #4a2410 48%, #a8481a 100%) !important; }
#root.th-autumn #sky::before { content: ''; position: absolute; left: 20%; top: -30%; width: 70%; height: 70%; background: radial-gradient(closest-side, rgba(255,160,70,.28), transparent); animation: thb 10s ease-in-out infinite alternate; }
/* Zima */
#root.th-winter { --tha: #bfe3ff; --thbg: #07122a; background: #07122a; }
#root.th-winter #sky { background: linear-gradient(180deg, #050d22 0%, #12305c 55%, #3c6ea8 100%) !important; }
#root.th-winter #sky::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 120%, rgba(210,235,255,.45), transparent 60%); animation: thb 8s ease-in-out infinite alternate; }
#root.th-winter #sky::after { content: ''; position: absolute; inset: 0; box-shadow: inset 0 0 90px 10px rgba(190,225,255,.22); }
/* Kosmos */
#root.th-space { --tha: #c4b5fd; --thbg: #05031a; background: #02010c; }
#root.th-space #sky { background: radial-gradient(ellipse at 20% 25%, rgba(167,100,255,.35), transparent 45%), radial-gradient(ellipse at 80% 70%, rgba(40,150,255,.30), transparent 45%), radial-gradient(ellipse at 60% 15%, rgba(240,100,200,.22), transparent 40%), #02010c !important; }
#root.th-space #sky::before { content: ''; position: absolute; left: 12%; top: 58%; width: 18vmin; height: 18vmin; border-radius: 50%; background: radial-gradient(circle at 32% 30%, #ffd9a8, #c2674a 55%, #3a1424); box-shadow: 0 0 30px rgba(255,150,100,.35); animation: thb 12s ease-in-out infinite alternate; opacity: .9; }
/* Zorza polarna */
#root.th-aurora { --tha: #4ade80; --thbg: #03121a; background: #020a12; }
#root.th-aurora #sky { background: radial-gradient(ellipse at 50% 120%, #0b3a3a, transparent 60%), linear-gradient(180deg, #020611 0%, #04162a 70%, #062a30 100%) !important; }
#root.th-aurora #sky::before { content: ''; position: absolute; left: -30%; top: 6%; width: 160%; height: 55%; background: linear-gradient(100deg, transparent 5%, rgba(74,222,128,.55) 30%, rgba(34,211,238,.45) 52%, rgba(192,132,252,.45) 72%, transparent 95%); -webkit-mask-image: linear-gradient(180deg, transparent, #000 35%, transparent); mask-image: linear-gradient(180deg, transparent, #000 35%, transparent); transform-origin: 50% 100%; animation: tha 13s ease-in-out infinite alternate; opacity: .8; }
#root.th-aurora #sky::after { content: ''; position: absolute; left: -20%; top: 14%; width: 140%; height: 45%; background: linear-gradient(80deg, transparent 10%, rgba(34,211,238,.4) 40%, rgba(74,222,128,.45) 65%, transparent 90%); -webkit-mask-image: linear-gradient(180deg, transparent, #000 40%, transparent); mask-image: linear-gradient(180deg, transparent, #000 40%, transparent); animation: tha 17s ease-in-out infinite alternate-reverse; opacity: .7; }
/* Glebia */
#root.th-deep { --tha: #5eead4; --thbg: #021a28; background: #021a28; }
#root.th-deep #sky { background: linear-gradient(180deg, #04466a 0%, #03304d 38%, #011a2b 75%, #00080f 100%) !important; }
#root.th-deep #sky::before { content: ''; position: absolute; left: 0; right: 0; top: 0; height: 75%; background: repeating-linear-gradient(105deg, rgba(160,240,255,.10) 0 40px, transparent 40px 130px); -webkit-mask-image: linear-gradient(180deg, #000, transparent); mask-image: linear-gradient(180deg, #000, transparent); animation: thr 11s ease-in-out infinite alternate; }
/* Hologram: ciemny grafit, szklane kafelki, miętowo-fioletowa poswiata, neonowe pierscienie pod pulsem (wg wizualizacji) */
#root.th-holo { --tha: #5ef2c9; --thbg: #0d0d14; background: #0b0c11; }
#root.th-holo #sky { background: radial-gradient(900px 640px at 108% 14%, rgba(168,70,214,.40), transparent 62%), radial-gradient(700px 520px at -12% 96%, rgba(70,48,160,.30), transparent 62%), radial-gradient(500px 360px at 92% 86%, rgba(60,160,200,.14), transparent 65%), linear-gradient(160deg, #0b0c11 0%, #14131c 55%, #0d0c14 100%) !important; }
#root.th-holo #sky::before { content: ''; position: absolute; inset: 0; background: linear-gradient(118deg, rgba(255,255,255,.055) 0 28%, transparent 28.2%); }
#root.th-holo .gl, #root.th-holo .lp, #root.th-holo .vc, #root.th-holo .row, #root.th-holo .rm.gl, #root.th-holo .chip.gl { background: linear-gradient(145deg, rgba(46,48,60,.70), rgba(22,23,31,.80)) !important; border: 1px solid rgba(255,255,255,.09) !important; border-radius: 22px !important; box-shadow: 0 10px 30px rgba(0,0,0,.38), inset 0 1px 0 rgba(255,255,255,.07) !important; }
#root.th-holo .chip.gl:not(.hot), #root.th-holo .rm.gl { --cc: #5ef2c9 !important; --rc: #5ef2c9 !important; }
#root.th-holo .rm .ri, #root.th-holo .chip .ci, #root.th-holo .lp ha-icon { background: rgba(94,242,201,.12) !important; color: #5ef2c9 !important; box-shadow: none !important; border-radius: 14px !important; }
#root.th-holo .lp.on { border-color: rgba(94,242,201,.65) !important; background: linear-gradient(145deg, rgba(94,242,201,.20), rgba(22,23,31,.80)) !important; }
#root.th-holo .hello { font-size: 20px; font-weight: 300; letter-spacing: .02em; text-transform: uppercase; color: #dfe3ee; text-shadow: none; }
#root.th-holo .time { background: linear-gradient(180deg, #ffffff, #c8ccd9) !important; -webkit-background-clip: text !important; background-clip: text !important; font-weight: 300; filter: none; }
#root.th-holo .sec, #root.th-holo h2, #root.th-holo h4 { color: #9aa3b5; letter-spacing: .16em; text-shadow: none; }
#root.th-holo #dock { background: linear-gradient(160deg, rgba(36,38,48,.85), rgba(16,17,24,.9)) !important; border: 1px solid rgba(255,255,255,.08); }
#root.th-holo #dock .di ha-icon { background: transparent !important; border-color: transparent !important; box-shadow: none !important; color: #aeb5c6; }
#root.th-holo #dock .di.on { color: #5ef2c9; } #root.th-holo #dock .di.on ha-icon { color: #5ef2c9; filter: drop-shadow(0 0 6px rgba(94,242,201,.7)); }
#root.th-holo.tb #dock .di.on::before { content: ''; position: absolute; left: -9px; top: 22%; bottom: 22%; width: 3px; border-radius: 3px; background: #5ef2c9; box-shadow: 0 0 10px #5ef2c9; }
#root.th-holo #pulse { background: radial-gradient(closest-side, rgba(10,11,16,.55) 62%, transparent 100%); overflow: visible; }
#root.th-holo #pulse::before, #root.th-holo #pulse::after { display: none; }
#hlc { position: absolute; left: -32%; width: 164%; top: -2%; height: 122%; z-index: -1; pointer-events: auto; cursor: pointer; }
#root.th-holo #pulse svg { opacity: .0; } #root.th-holo #pulse .dots, #root.th-holo #pulse .core { display: none; }
#root.th-holo #pulse .ctr { transform: translateY(-30%); }
@keyframes hlp { from { transform: scale(.97); opacity: .75; } to { transform: scale(1.03); opacity: 1; } }
#root.th-holo #pulse .trk { stroke: rgba(255,255,255,.10); } #root.th-holo #pulse .core { opacity: .35; }
#root.th-holo.lt #pulse::before, #root.th-holo.lt #pulse::after { animation: none !important; }
@keyframes thb { from { transform: scale(1); opacity: .75; } to { transform: scale(1.12); opacity: 1; } }
@keyframes tha { from { transform: translateX(-6%) skewX(-6deg) scaleY(.9); } to { transform: translateX(6%) skewX(6deg) scaleY(1.15); } }
@keyframes thr { from { transform: translateX(-24px); opacity: .6; } to { transform: translateX(24px); opacity: 1; } }
/* ===== Tech 3D (tylko telefon): szklane plyty z grubosci, siatka podlogi w perspektywie, szkieletowe bryly, gleboki zegar, paralaksa zyroskopu ===== */
#root.th-tech3d { --tha: #00e5ff; --thbg: #060c12; --lm: #b6ff3b; --tx: 0; --ty: 0; --sx: -.1; --sy: .9; background: #05090e; }
#root.th-tech3d #sky { background: radial-gradient(620px 380px at 50% -6%, rgba(0,229,255,.22), transparent 70%), radial-gradient(420px 360px at 100% 55%, rgba(182,255,59,.07), transparent 65%), linear-gradient(180deg, #07121b 0%, #050a10 60%, #03060a 100%) !important; }
#root.th-tech3d #sky::before, #root.th-tech3d #sky::after, #root.th-tech3d .rb { display: none !important; }
#s3d { position: absolute; inset: 0; overflow: hidden; pointer-events: none; z-index: 0; perspective: 800px; display: none; } #root.th-tech3d #s3d { display: block; }
#s3d .fl { position: absolute; left: -45%; right: -45%; bottom: -4%; height: 64%; overflow: hidden; transform-origin: 50% 100%; transform: translateX(calc(var(--tx) * -5px)) rotateX(66deg); -webkit-mask-image: linear-gradient(to top, #000 8%, transparent 92%); mask-image: linear-gradient(to top, #000 8%, transparent 92%); opacity: .85; }
#s3d .fl i { position: absolute; left: 0; right: 0; top: -56px; bottom: 0; background-image: linear-gradient(rgba(0,229,255,.55) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(0,229,255,.42) 1.5px, transparent 1.5px); background-size: 56px 56px; animation: flw 2.6s linear infinite; } @keyframes flw { to { transform: translateY(56px); } }
#s3d .o { position: absolute; transform-style: preserve-3d; transform: translate3d(calc(var(--tx) * var(--k) * -1.8px), calc(var(--ty) * var(--k) * 1.8px), 0); will-change: transform; }
#s3d .cb { width: var(--s); height: var(--s); transform-style: preserve-3d; animation: cbs var(--d) linear infinite; } #s3d .cb i { position: absolute; inset: 0; background: color-mix(in srgb, var(--c1) 7%, transparent); border: 1.5px solid color-mix(in srgb, var(--c1) 85%, #fff 0%); box-shadow: 0 0 14px color-mix(in srgb, var(--c1) 45%, transparent), inset 0 0 14px color-mix(in srgb, var(--c1) 28%, transparent); }
#s3d .cb i:nth-child(1) { transform: translateZ(calc(var(--s) / 2)); } #s3d .cb i:nth-child(2) { transform: rotateY(90deg) translateZ(calc(var(--s) / 2)); } #s3d .cb i:nth-child(3) { transform: rotateY(180deg) translateZ(calc(var(--s) / 2)); } #s3d .cb i:nth-child(4) { transform: rotateY(-90deg) translateZ(calc(var(--s) / 2)); } #s3d .cb i:nth-child(5) { transform: rotateX(90deg) translateZ(calc(var(--s) / 2)); } #s3d .cb i:nth-child(6) { transform: rotateX(-90deg) translateZ(calc(var(--s) / 2)); }
@keyframes cbs { from { transform: rotateX(24deg) rotateY(0deg) rotateZ(8deg); } to { transform: rotateX(384deg) rotateY(360deg) rotateZ(8deg); } }
#s3d .tr { border-radius: 50%; border: 2px solid var(--c1); box-sizing: border-box; box-shadow: 0 0 16px color-mix(in srgb, var(--c1) 55%, transparent), inset 0 0 14px color-mix(in srgb, var(--c1) 30%, transparent); transform: rotateX(var(--ax)) rotateZ(0deg); animation: trs var(--d) linear infinite; position: relative; } #s3d .tr::after { content: ''; position: absolute; top: -5px; left: calc(50% - 4px); width: 8px; height: 8px; background: var(--c1); box-shadow: 0 0 12px var(--c1); } @keyframes trs { to { transform: rotateX(var(--ax)) rotateZ(360deg); } }
#s3d .pt { width: 4px; height: 4px; background: var(--c1); box-shadow: 0 0 9px var(--c1); animation: ptf var(--d) ease-in-out infinite alternate; } @keyframes ptf { from { transform: translateY(-10px); opacity: .35; } to { transform: translateY(12px); opacity: 1; } }
#root.th-tech3d .gl, #root.th-tech3d .lp, #root.th-tech3d .vc, #root.th-tech3d .row, #root.th-tech3d .rm.gl, #root.th-tech3d .chip.gl, #root.th-tech3d .wxo { background: linear-gradient(165deg, rgba(22,40,52,.80), rgba(7,14,20,.88)) !important; border: 1px solid rgba(0,229,255,.26) !important; border-radius: 18px !important; box-shadow: inset 0 1px 0 rgba(255,255,255,.28), inset 0 0 22px rgba(0,229,255,.06), 0 1px 0 rgba(0,229,255,.38), 0 2px 0 #06232d, 0 3px 0 #051b24, 0 4px 0 #04141b, 0 18px 26px rgba(0,0,0,.66) !important; -webkit-backdrop-filter: none !important; backdrop-filter: none !important; transform: perspective(800px) rotateX(calc(var(--ty) * .7deg)) rotateY(calc(var(--tx) * .7deg)) !important; contain: none !important; transition: transform .12s ease-out, box-shadow .12s; }
#root.th-tech3d .chip.gl, #root.th-tech3d .rm.gl { border-left: 3px solid var(--cc, var(--rc, #00e5ff)) !important; }
#root.th-tech3d .chip.gl { translate: calc(var(--tx) * .5px) 0; } #root.th-tech3d .rm.gl { translate: calc(var(--tx) * -.4px) 0; } #root.th-tech3d .lp { translate: calc(var(--tx) * .3px) 0; } #root.th-tech3d #hero { translate: calc(var(--tx) * 1px) calc(var(--ty) * -.6px); } #root.th-tech3d #pulse { translate: calc(var(--tx) * -.9px) calc(var(--ty) * .7px); }
#root.th-tech3d .row:active, #root.th-tech3d .lp:active, #root.th-tech3d .chip:active, #root.th-tech3d .rm:active, #root.th-tech3d .wxo:active { transform: perspective(800px) translateY(4px) !important; box-shadow: inset 0 1px 0 rgba(255,255,255,.22), 0 1px 0 rgba(0,229,255,.3), 0 6px 10px rgba(0,0,0,.6) !important; }
#root.th-tech3d .chip.gl::after, #root.th-tech3d .rm.gl::after { display: block !important; content: ''; position: absolute; inset: 0; border-radius: inherit; pointer-events: none; animation: none; transform: none; background: linear-gradient(115deg, transparent calc(32% + var(--tx) * 3%), rgba(0,229,255,.20) calc(46% + var(--tx) * 3%), transparent calc(60% + var(--tx) * 3%)); }
#root.th-tech3d .rm .ri, #root.th-tech3d .chip .ci, #root.th-tech3d .lp ha-icon { background: linear-gradient(160deg, color-mix(in srgb, var(--cc, var(--rc, #00e5ff)) 38%, #06121a), #06121a) !important; color: var(--cc, var(--rc, #00e5ff)) !important; border-radius: 0 !important; clip-path: polygon(50% 0, 94% 25%, 94% 75%, 50% 100%, 6% 75%, 6% 25%); box-shadow: none !important; }
#root.th-tech3d .rm .ri ha-icon, #root.th-tech3d .chip .ci ha-icon { color: var(--cc, var(--rc, #00e5ff)) !important; filter: none !important; position: relative; z-index: 2; } #root.th-tech3d .rm .ri, #root.th-tech3d .chip .ci { position: relative; z-index: 2; }
#root.th-tech3d .lp.on { background: linear-gradient(160deg, #c8ff5a, #7fd61a) !important; border-color: #d6ff7a !important; box-shadow: 0 0 22px rgba(182,255,59,.5), 0 1px 0 #d6ff7a, 0 3px 0 #3d6a0a, 0 4px 0 #2b4d06, 0 16px 22px rgba(0,0,0,.6) !important; } #root.th-tech3d .lp.on b, #root.th-tech3d .lp.on small { color: #0a1a00 !important; } #root.th-tech3d .lp.on ha-icon { background: #0a1a00 !important; color: #c8ff5a !important; }
#root.th-tech3d .time { background: none !important; -webkit-background-clip: border-box !important; background-clip: border-box !important; -webkit-text-fill-color: #eaffff; color: #eaffff; animation: none !important; font-weight: 200; letter-spacing: .02em; filter: none;
  text-shadow: calc(var(--sx) * 1.5px) calc(var(--sy) * 1.5px) 0 rgba(0,229,255,.58), calc(var(--sx) * 3px) calc(var(--sy) * 3px) 0 rgba(0,229,255,.44), calc(var(--sx) * 4.5px) calc(var(--sy) * 4.5px) 0 rgba(0,229,255,.32), calc(var(--sx) * 6px) calc(var(--sy) * 6px) 0 rgba(0,229,255,.22), calc(var(--sx) * 7.5px) calc(var(--sy) * 7.5px) 0 rgba(0,229,255,.14), calc(var(--sx) * 9px) calc(var(--sy) * 9px) 0 rgba(0,229,255,.08), 0 0 24px rgba(0,229,255,.45); }
#root.th-tech3d .hello { font-family: ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace; color: var(--lm); letter-spacing: .22em; text-shadow: 0 0 10px rgba(182,255,59,.5); }
#root.th-tech3d .sec, #root.th-tech3d h2, #root.th-tech3d h4 { font-family: ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace; color: #7fefff; letter-spacing: .18em; font-weight: 600; text-shadow: 0 0 10px rgba(0,229,255,.45); } #root.th-tech3d .sec::before { content: '// '; color: var(--lm); }
#root.th-tech3d #dock { background: linear-gradient(165deg, rgba(20,36,48,.92), rgba(6,12,18,.96)) !important; border: 1px solid rgba(0,229,255,.32) !important; box-shadow: inset 0 1px 0 rgba(255,255,255,.25), 0 1px 0 rgba(0,229,255,.4), 0 3px 0 #051a22, 0 4px 0 #04131a, 0 18px 24px rgba(0,0,0,.68) !important; -webkit-backdrop-filter: none !important; backdrop-filter: none !important; }
#root.th-tech3d #dock .di { opacity: .85; } #root.th-tech3d #dock .di.on { color: var(--tha); opacity: 1; }
#root.th-tech3d #dock .di.on ha-icon { color: #06121a; background: linear-gradient(160deg, #00e5ff, #00a8c8) !important; clip-path: polygon(50% 0, 94% 25%, 94% 75%, 50% 100%, 6% 75%, 6% 25%); padding: 7px; transform: translateY(-4px); box-shadow: none !important; }
#root.th-tech3d #pulse { background: radial-gradient(closest-side, rgba(0,18,26,.6) 62%, transparent 100%); overflow: visible; } #root.th-tech3d #pulse::before, #root.th-tech3d #pulse::after { display: none; }
#root.th-tech3d #pulse svg { opacity: 0; } #root.th-tech3d #pulse .dots, #root.th-tech3d #pulse .core { display: none; } #root.th-tech3d #pulse .ctr { transform: translateY(-30%); }
#root.th-tech3d .tabs button.on, #root.th-tech3d .thm button.on { background: rgba(0,229,255,.22) !important; border-color: #00e5ff !important; color: #eaffff; box-shadow: 0 0 12px rgba(0,229,255,.35); }
/* Tech 3D: ikony i napisy wynurzaja sie z plyty (glebia + paralaksa), radar pod pierscieniem, fala energii od dotyku */
#root.th-tech3d .chip.gl, #root.th-tech3d .rm.gl, #root.th-tech3d .lp { overflow: visible !important; transform-style: preserve-3d; }
#root.th-tech3d .chip.gl > *, #root.th-tech3d .rm.gl > *, #root.th-tech3d .rm .rh { transform-style: preserve-3d; }
#root.th-tech3d .rm .ri, #root.th-tech3d .chip .ci, #root.th-tech3d .lp ha-icon { transform: translateZ(32px); translate: calc(var(--tx) * .9px) calc(var(--ty) * -.9px); }
#root.th-tech3d .rm .rn, #root.th-tech3d .chip b { transform: translateZ(16px); translate: calc(var(--tx) * .5px) calc(var(--ty) * -.4px); }
#root.th-tech3d .rm .rv { transform: translateZ(24px); translate: calc(var(--tx) * 1.1px) calc(var(--ty) * -.9px); text-shadow: 0 0 14px rgba(0,229,255,.4), 0 6px 6px rgba(0,0,0,.45); }
#root.th-tech3d .lp b { transform: translateZ(14px); }
#root.th-tech3d #pulse::after { display: block; content: ''; position: absolute; left: 50%; top: 49%; width: 92%; aspect-ratio: 1; margin: -46% 0 0 -46%; border-radius: 50%; pointer-events: none; z-index: -1; background: conic-gradient(from 0deg, rgba(0,229,255,0) 0deg, rgba(0,229,255,0) 250deg, rgba(0,229,255,.22) 330deg, rgba(182,255,59,.55) 360deg), repeating-radial-gradient(circle, transparent 0 22px, rgba(0,229,255,.14) 22px 23px); -webkit-mask-image: radial-gradient(circle, #000 0 70%, transparent 72%); mask-image: radial-gradient(circle, #000 0 70%, transparent 72%); transform: rotateX(64deg) rotateZ(0deg); animation: rdr 5s linear infinite; } @keyframes rdr { to { transform: rotateX(64deg) rotateZ(360deg); } }
.rpw { position: absolute; inset: 0; border-radius: inherit; overflow: hidden; pointer-events: none; z-index: 5; } .rpw b { position: absolute; width: 20px; height: 20px; margin: -10px 0 0 -10px; border-radius: 50%; border: 2px solid #00e5ff; box-shadow: 0 0 14px #00e5ff, inset 0 0 10px #00e5ff; animation: rpl .65s ease-out forwards; } @keyframes rpl { to { transform: scale(16); opacity: 0; border-width: .4px; } }
/* ===== Strumienie (Pulse): ciemny, cieply motyw ze wstega cienkich nitek wokol Pulsu domu ===== */
#root.th-ribbon { --tha: #f0b35a; --thbg: #0b0907; background: #080706; }
#root.th-ribbon #sky { background: radial-gradient(540px 440px at 106% 80%, rgba(214,135,30,.40), transparent 66%), radial-gradient(480px 400px at -12% 16%, rgba(30,160,150,.20), transparent 62%), linear-gradient(180deg, #0b0a08 0%, #070605 100%) !important; }
#root.th-ribbon #sky::before, #root.th-ribbon #sky::after, #root.th-ribbon .rb { display: none !important; }
#root.th-ribbon .gl, #root.th-ribbon .lp, #root.th-ribbon .vc, #root.th-ribbon .row, #root.th-ribbon .rm.gl, #root.th-ribbon .chip.gl { background: linear-gradient(160deg, rgba(40,31,20,.66), rgba(14,12,10,.80)) !important; border: 1px solid rgba(240,179,90,.20) !important; border-radius: 22px !important; box-shadow: inset 0 1px 0 rgba(255,235,200,.10), 0 10px 26px rgba(0,0,0,.45) !important; }
#root.th-ribbon .chip.gl:not(.hot), #root.th-ribbon .rm.gl { --cc: #f0b35a !important; --rc: #f0b35a !important; }
#root.th-ribbon .lp.on { background: linear-gradient(160deg, rgba(240,179,90,.40), rgba(40,26,10,.80)) !important; border-color: rgba(240,179,90,.65) !important; }
#root.th-ribbon .hello { font-family: Georgia, 'Times New Roman', serif; font-size: 30px; font-weight: 700; letter-spacing: 0; text-transform: none; opacity: 1; background: linear-gradient(90deg, #f8dca0, #e29a2e); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
#root.th-ribbon .sec, #root.th-ribbon h2, #root.th-ribbon h4 { color: #c9b79a; letter-spacing: .16em; text-shadow: none; }
#root.th-ribbon #dock { background: linear-gradient(160deg, rgba(36,28,18,.9), rgba(12,10,8,.94)) !important; border: 1px solid rgba(240,179,90,.22); }
#root.th-ribbon #dock .di.on { color: #f0b35a; } #root.th-ribbon #dock .di.on ha-icon { filter: drop-shadow(0 0 7px rgba(240,179,90,.7)); }
#root.th-ribbon #pulse { background: radial-gradient(closest-side, rgba(0,0,0,.72) 58%, transparent 100%); overflow: visible; } #root.th-ribbon #pulse::before, #root.th-ribbon #pulse::after { display: none; }
#root.th-ribbon #pulse svg { opacity: 0; } #root.th-ribbon #pulse .dots, #root.th-ribbon #pulse .core { display: none; } #root.th-ribbon #pulse .ctr { z-index: 2; } #root.th-ribbon #pulse .mk { z-index: 3; }
#root.th-ribbon .chip .ci, #root.th-ribbon .rm .ri { position: relative; z-index: 2; } #root.th-ribbon .chip .ci ha-icon, #root.th-ribbon .rm .ri ha-icon { position: relative; z-index: 2; color: #f0b35a; }
#rbc { position: absolute; left: -10%; top: -10%; width: 120%; height: 120%; pointer-events: none; z-index: 0; }
/* wstega w motywie standardowym (klasa rbs) */
#root.rbs #pulse { background: radial-gradient(closest-side, rgba(4,9,22,.5) 56%, transparent 100%); overflow: visible; } #root.rbs #pulse::before, #root.rbs #pulse::after { display: none !important; }
#root.rbs #pulse svg { opacity: 0 !important; } #root.rbs #pulse .dots, #root.rbs #pulse .core { display: none !important; } #root.rbs #pulse .ctr { z-index: 2; transform: none !important; } #root.rbs #pulse .mk { z-index: 3; }
/* srodek Pulsu: kategorie z licznikami */
#pulse .ctr .cc { display: flex; flex-wrap: wrap; justify-content: center; gap: 6px; margin-top: 8px; max-width: 210px; } #pulse .ctr .cc button { padding: 4px 11px; border-radius: 99px; background: rgba(255,255,255,.09); border: 1px solid rgba(255,255,255,.16); font-size: 12.5px; color: inherit; font-family: inherit; line-height: 1.2; } #pulse .ctr .cc b { font-size: inherit; font-weight: 700; margin: 0; } #pulse .ctr .cc span { font-size: 12px; opacity: .7; align-self: center; }
#pulse .ctr .cc .s1 { border-color: rgba(255,194,75,.65); color: #ffd890; } #pulse .ctr .cc .s2 { border-color: rgba(255,93,115,.75); color: #ffa3b0; }
#root #pulse .ctr .cc button b { font-size: inherit; font-weight: 700; margin: 0; }
#root.tb #pulse .ctr .cc { max-width: 280px; gap: 8px; } #root.tb #pulse .ctr .cc button { font-size: 15px; padding: 5px 14px; }
/* zwijane kafelki widoku Aurora Guard */
.gacc { padding: 0 !important; } .gah { display: flex; align-items: center; justify-content: space-between; gap: 10px; width: 100%; text-align: left; padding: 14px 16px; background: none; color: inherit; font: inherit; } .gah small { display: block; opacity: .72; font-size: 12px; margin-top: 3px; } .gah ha-icon { flex: none; opacity: .8; } .gab { padding: 0 16px 14px; } .gab .tc { flex: none; width: 40px; height: 40px; border-radius: 50%; display: grid; place-items: center; background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.14); color: inherit; padding: 0; }
/* kod do widoku Aurora Guard */
.pind { text-align: center; font-size: 30px; letter-spacing: .4em; margin: 14px 0; } .pind.bad { animation: pshk .35s; color: #ff8a9a; } @keyframes pshk { 25% { transform: translateX(-8px); } 75% { transform: translateX(8px); } }
.pk { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; max-width: 300px; margin: 0 auto; } .pk button { display: grid; place-items: center; padding: 0; height: 58px; border-radius: 16px; background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.16); font-size: 22px; color: inherit; } .pk button:active { background: rgba(255,255,255,.22); }
/* Program TV (karta tv-guide korzysta ze zmiennych motywu HA): kolory tla i akcentow z aktualnego motywu Pulse */
#root.thx tv-guide { --card-background-color: color-mix(in srgb, var(--thbg) 94%, #000); --secondary-background-color: color-mix(in srgb, var(--tha) 14%, var(--thbg)); --primary-color: var(--tha); --divider-color: color-mix(in srgb, var(--tha) 28%, transparent); --primary-text-color: #eaf1ff; --secondary-text-color: color-mix(in srgb, var(--tha) 40%, #cbd5e1); --tvg-tile-dark: color-mix(in srgb, var(--tha) 16%, var(--thbg)); --tvg-tile-light: color-mix(in srgb, var(--tha) 16%, var(--thbg)); }
#root.mx tv-guide { --card-background-color: #000d05; --secondary-background-color: #03210f; --primary-color: #00ff6a; --divider-color: rgba(0,255,106,.30); --primary-text-color: #b6ffcf; --secondary-text-color: rgba(182,255,207,.72); --tvg-tile-dark: #052a14; --tvg-tile-light: #052a14; }
#root.jv tv-guide { --card-background-color: #020e18; --secondary-background-color: #06202f; --primary-color: #00e5ff; --divider-color: rgba(0,229,255,.30); --primary-text-color: #d8f7ff; --secondary-text-color: rgba(160,225,240,.75); --tvg-tile-dark: #07263a; --tvg-tile-light: #07263a; }
#root.gt tv-guide { --card-background-color: #14062a; --secondary-background-color: #2a0a46; --primary-color: #ff3d9a; --divider-color: rgba(255,140,200,.35); --primary-text-color: #ffe9f5; --secondary-text-color: rgba(255,200,230,.75); --tvg-tile-dark: #34104f; --tvg-tile-light: #34104f; }
#root.xm tv-guide { --card-background-color: #1a0b10; --secondary-background-color: #2e121b; --primary-color: #ff6b7a; --divider-color: rgba(255,107,122,.30); --primary-text-color: #fff0f2; --secondary-text-color: rgba(255,210,216,.75); --tvg-tile-dark: #3a1620; --tvg-tile-light: #3a1620; }
/* wiadomosc na panel */
.chq button.on { background: rgba(103,232,249,.25); border-color: rgba(103,232,249,.7); }
.ef textarea { width: 100%; box-sizing: border-box; margin-top: 4px; background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.18); border-radius: 12px; padding: 10px 12px; color: inherit; font: inherit; resize: none; } .mcnt { text-align: right; font-size: 11px; opacity: .55; margin-top: 2px; }
.chq { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px; } .chq button { padding: 7px 12px; border-radius: 99px; background: rgba(255,255,255,.09); border: 1px solid rgba(255,255,255,.14); font-size: 13px; }
/* ===== uklad tabletowy (>= 900 px szerokosci): dok z lewej, trzy kolumny, panele boczne ===== */
#root.tb #dock { left: 14px; right: auto; top: 14px; bottom: 14px; width: 76px; height: auto; flex-direction: column; padding: 14px 0; border-radius: 38px; justify-content: space-between; }
#root.tb #dock .di { flex: none; height: 74px; width: 100%; font-size: 10.5px; }
#root.tb #orbw { flex: none; height: auto; margin: 4px 0; }
#root.tb #scroll { left: 104px; padding: 20px 24px 20px 8px; display: grid; grid-template-columns: 310px minmax(0, 1fr) 340px; grid-template-rows: auto minmax(0, 1fr) auto auto auto auto auto; column-gap: 20px; overflow: hidden; scroll-behavior: auto; }

#root.tb #wxt .wxo { min-width: 0; width: 100%; margin: 0; }
#root.tb #scroll > .sec { padding: 0; margin: 14px 0 8px; }


#root.tb .chip { max-width: none; width: 100%; flex: none; }
#root.tb .chip b, #root.tb .chip small { max-width: 200px; }
#root.tb #pulse { grid-column: 2; grid-row: 2; width: min(450px, 100%); height: auto; aspect-ratio: 1; align-self: center; justify-self: center; margin: 0; }
#root.tb #pulse .ctr b { font-size: 30px; } #root.tb #pulse .ctr small { font-size: 14px; } #root.tb #pulse .ctr ha-icon { --mdc-icon-size: 48px; } #root.tb #pulse .mk { width: 36px; height: 36px; margin: -18px 0 0 -18px; } #root.tb #pulse .mk ha-icon { --mdc-icon-size: 20px; }
#plg { display: none; } #root.tb #plg { display: none; grid-column: 2; grid-row: 5; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-top: 8px; }
#plg button { padding: 10px 12px; border-radius: 18px; text-align: left; background: rgba(255,255,255,.07); border: 1px solid rgba(255,255,255,.1); min-width: 0; } #plg button.warn { border-color: color-mix(in srgb, #ffc24b 70%, transparent); background: color-mix(in srgb, #ffc24b 12%, transparent); }
#plg b { display: flex; align-items: center; gap: 6px; font-size: 12px; opacity: .85; font-weight: 600; } #plg ha-icon { --mdc-icon-size: 16px; } #plg small { display: block; font-size: 13px; margin-top: 3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
#root.tb #secq { grid-column: 2; grid-row: 6; padding: 0; margin: 10px 0 6px; } #root.tb #secl { grid-column: 2; grid-row: 3; padding: 0; margin: 6px 0 6px; } #root.tb .lts { grid-column: 2; grid-row: 4; padding: 0; max-height: 170px; overflow-y: auto; scrollbar-width: none; }
#root.tb .qa { grid-column: 2; grid-row: 7; grid-template-columns: repeat(4, 1fr); padding: 0; gap: 10px; } #root.tb .qa button { padding: 12px 6px; gap: 6px; flex-direction: column; text-align: center; justify-content: center; } #root.tb .qb b { font-size: 13.5px; white-space: nowrap; } #root.tb .qa small { font-size: 11px; }
#root.tb #secr { grid-column: 3; grid-row: 1; align-self: start; margin-top: 4px; }
#root.tb .rooms { grid-column: 3; grid-row: 1 / span 7; flex-direction: column; overflow-x: hidden; overflow-y: auto; padding: 34px 2px 4px 0; scroll-snap-type: none; min-height: 0; gap: 10px; }
#root.tb .rm { width: 100%; max-width: none; padding: 11px 13px; scroll-snap-align: none; }
#root.tb .rm .rv { margin: 6px 0 7px; } #root.tb .rm .rv b { font-size: 28px; }
#root.tb #vw { left: auto; width: min(640px, 58vw); right: 0; top: 0; bottom: 0; border-radius: 34px 0 0 34px; border-left: 1px solid rgba(255,255,255,.14); box-shadow: -30px 0 80px rgba(0,0,0,.45); background: linear-gradient(160deg, rgba(14,20,38,.9), rgba(5,9,18,.94)); }
#root.tb .vh { padding: 20px 22px 10px; } #root.tb .vb { padding: 4px 22px 28px; }
#root.tb #sh { left: auto; right: 0; top: 0; bottom: 0; width: min(560px, 54vw); max-height: none; border-radius: 34px 0 0 34px; padding: 14px 24px 28px; }
#root.tb #rmn { left: 104px; right: auto; width: 380px; bottom: 20px; max-height: 80%; }
#root.tb #menu { left: auto; top: 0; bottom: 0; right: 0; width: min(640px, 58vw); padding: 26px 24px 28px; border-radius: 34px 0 0 34px; background: linear-gradient(160deg, rgba(18,26,48,.97), rgba(7,11,22,.98)); border: 1px solid rgba(255,255,255,.12); box-shadow: 0 12px 50px rgba(0,0,0,.5); }
#root.tb #toast { bottom: 28px; }
#root.tb #ov .bd { background: rgba(4,7,16,.34); -webkit-backdrop-filter: blur(5px); backdrop-filter: blur(5px); }


#root.tb .lts { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 8px; } #root.tb .lp { flex: 1 1 128px; min-height: 52px; padding: 8px 10px; gap: 9px; border-radius: 17px; } #root.tb .lp ha-icon { width: 32px; height: 32px; --mdc-icon-size: 18px; border-radius: 11px; } #root.tb .lp b { font-size: 13px; } #root.tb .lp small { font-size: 10.5px; }
#pulse .wv { transform-origin: 120px 120px; } #pulse .wv path { fill: none; stroke-width: 1.8; stroke-linejoin: round; opacity: .7; } #pulse .w1 { animation: rot 52s linear infinite; } #pulse .w2 { animation: rot 52s linear infinite; } #pulse .w3 { animation: rot 52s linear infinite; } #pulse .w3 path { opacity: .4; }
.sec .lof { order: 2; flex: none; display: inline-flex; align-items: center; gap: 6px; padding: 7px 12px; border-radius: 99px; font-size: 11.5px; letter-spacing: .02em; text-transform: none; background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.14); } .sec .lof ha-icon { --mdc-icon-size: 16px; } .sec .lof.on { background: color-mix(in srgb, #ffc24b 22%, transparent); border-color: color-mix(in srgb, #ffc24b 70%, transparent); color: #ffe19a; } .sec::after { order: 1; }
#dock .tbo { display: none; } #root.tb #dock .tbo { display: flex; }
#root.tb #dock { padding: 10px 0; } 
#root.tb #dock .di:nth-child(1) { order: 1; } #root.tb #dock #drm { order: 2; } #root.tb #dock #orbw { order: 12; margin: 4px 0; } #root.tb #dock .di[data-a="events"] { order: 7; } #root.tb #dock #dmenu { order: 11; } #root.tb #dock .tbs { order: 13; }
#root.tb #orbw { height: 66px; margin: 10px 0 8px; } #root.tb #orb { width: 58px; height: 58px; margin-top: 0; }
#root.tb #scroll { grid-template-columns: 330px minmax(0, 1fr) 330px; grid-template-rows: auto minmax(0, 1fr) auto auto; }
#root.tb #secl { grid-column: 2; grid-row: 3; padding: 0; margin: 6px 0 6px; } #root.tb .lts { grid-column: 2; grid-row: 4; max-height: 180px; padding: 0; }
#root.tb #pulse { align-self: center; justify-self: center; }
 #root.tb .rooms { grid-row: 1 / span 4; }
#pulse .mk { width: 34px; height: 34px; margin: -17px 0 0 -17px; background: radial-gradient(circle at 35% 30%, color-mix(in srgb, currentColor 34%, #0b1226), #070c18 76%); border: 1.5px solid color-mix(in srgb, currentColor 80%, transparent); box-shadow: 0 0 14px color-mix(in srgb, currentColor 55%, transparent), inset 0 0 8px color-mix(in srgb, currentColor 30%, transparent); } #pulse .mk ha-icon { --mdc-icon-size: 19px; filter: drop-shadow(0 0 5px currentColor); }
#root.tb #pulse .mk { width: 54px; height: 54px; margin: -27px 0 0 -27px; border-width: 2px; } #root.tb #pulse .mk ha-icon { --mdc-icon-size: 29px; }
.wxh { display: none; } #root.tb .wxh { display: flex; justify-content: space-between; width: 100%; margin-top: 12px; padding-top: 12px; border-top: 1px solid rgba(255,255,255,.12); } .wxh span { display: flex; flex-direction: column; align-items: center; gap: 2px; } .wxh small { font-size: 10.5px; opacity: .7; max-width: none; } .wxh ha-icon { --mdc-icon-size: 24px !important; animation: none !important; filter: none !important; opacity: .95; } .wxh b { font-size: 15px !important; font-weight: 500 !important; }
#root.tb #wxt .wxo { flex-direction: column; justify-content: center; min-height: 220px; padding: 16px 16px 12px; gap: 5px; } #root.tb #wxt .wxo > ha-icon { --mdc-icon-size: 68px; } #root.tb #wxt .wxo > b { font-size: 54px; } #root.tb #wxt .wxo > small { font-size: 14px; max-width: none; } #root.tb #wxt .wxo .hm { font-size: 14px; }
#root.tb #dock .di { height: 54px; font-size: 9.5px; gap: 3px; letter-spacing: .01em; --dc: var(--a); }
#root.tb #dock .di ha-icon { width: 36px; height: 36px; --mdc-icon-size: 22px; display: grid; place-items: center; border-radius: 50%; background: radial-gradient(circle at 35% 30%, color-mix(in srgb, var(--dc) 22%, #0d1428), #080d1c 78%); border: 1.5px solid color-mix(in srgb, var(--dc) 38%, transparent); color: color-mix(in srgb, var(--dc) 85%, #fff); transition: box-shadow .25s, border-color .25s; }
#root.tb #dock .di.on { color: color-mix(in srgb, var(--dc) 80%, #fff); } #root.tb #dock .di.on ha-icon { border-color: var(--dc); box-shadow: 0 0 14px color-mix(in srgb, var(--dc) 65%, transparent), inset 0 0 8px color-mix(in srgb, var(--dc) 30%, transparent); filter: drop-shadow(0 0 4px var(--dc)); }
#root.tb #dock [data-a="rmenu"] { --dc: #a78bfa; } #root.tb #dock [data-go="szkola"] { --dc: #ffb340; } #root.tb #dock [data-go="klimat"] { --dc: #ff8a4c; } #root.tb #dock [data-go="multimedia"] { --dc: #c084fc; } #root.tb #dock [data-go="radio"] { --dc: #67e8f9; } #root.tb #dock [data-a="events"] { --dc: #f472b6; } #root.tb #dock [data-go="pogoda"] { --dc: #60a5fa; } #root.tb #dock [data-go="powietrze"] { --dc: #3fe0a5; } #root.tb #dock [data-go="historia"] { --dc: #818cf8; } #root.tb #dock #dmenu { --dc: #67e8f9; } #root.tb #dock [data-go="ustawienia"] { --dc: #94a3b8; }
#wxt { display: none; } #lc { display: contents; } #schl .sec { margin-top: 18px; } .scl { flex-direction: column; overflow: visible; } #schl .chip { max-width: none; width: 100%; } #schl .spe { padding: 4px 22px; }
#root.tb #hero { grid-column: 2; grid-row: 1; padding: 0; flex-direction: column; align-items: center; text-align: center; gap: 0; } #root.tb #hero .wxo { display: none; } #root.tb #hero .time { font-size: 60px; margin-top: 0; } #root.tb #hero .hello { font-size: 12px; }
#root.tb #lc { display: flex; flex-direction: column; grid-column: 1; grid-row: 1 / span 4; min-height: 0; gap: 10px; } #root.tb #wxt { display: block; flex: none; order: 0; } #root.tb #schl { order: 1; } #root.tb #sect { order: 2; } #root.tb #lc .chips { order: 3; } #root.tb #wxt .wxo { width: 100%; margin: 0; } #root.tb #schl { display: block; flex: none; }
#root.tb #sect { padding: 0; margin: 4px 0 0; flex: none; } #root.tb #lc .chips { flex: 1; min-height: 0; padding: 0 4px 4px 0; overflow-y: auto; overflow-x: hidden; flex-direction: column; }
.scp { display: block; width: 100%; text-align: left; padding: 12px 14px 10px; border-radius: 22px; } .sph { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; } .sph b { font-size: 14px; letter-spacing: .05em; text-transform: uppercase; opacity: .9; } .sph ha-icon { --mdc-icon-size: 20px; color: var(--a); } .sph .chv { margin-left: auto; opacity: .6; color: inherit; }
.spr { display: flex; align-items: center; gap: 10px; padding: 7px 0; border-top: 1px solid rgba(255,255,255,.08); } .spr .av { flex: none; width: 28px; height: 28px; border-radius: 50%; display: grid; place-items: center; font-size: 12px; font-weight: 700; color: #08121f; } .spt { flex: 1; min-width: 0; } .spt b { display: block; font-size: 13.5px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; } .spt small { display: block; font-size: 11px; opacity: .65; } .spd { flex: none; font-size: 11.5px; font-weight: 700; padding: 4px 10px; border-radius: 99px; background: rgba(255,255,255,.09); } .spr.soon .spd { background: color-mix(in srgb, #ffb340 28%, transparent); color: #ffd9a0; } .spe { font-size: 12px; opacity: .65; padding: 6px 0 0; }
#root.tb #pulse { margin-top: 18px; width: min(400px, 100%); }
#root.tb #hero .time { font-size: 92px; } #root.tb #hero .hello { font-size: 13px; letter-spacing: .2em; } #root.tb #hero .date { font-size: 17px; }
#root.tb #wxt .wxo { flex-direction: row; justify-content: flex-start; min-height: 0; padding: 10px 16px; gap: 14px; align-items: center; } #root.tb #wxt .wxo > ha-icon { --mdc-icon-size: 46px; } #root.tb #wxt .wxo > b { font-size: 40px; } #root.tb #wxt .wxo > small { font-size: 13px; text-align: left; max-width: none; flex: 1; } #root.tb #wxt .wxo .hm { font-size: 13px; }
#root.tb #schl { display: flex; flex-direction: column; } #root.tb #schl .sec { margin: 4px 0 6px; padding: 0; } #root.tb #schl .spe { padding: 4px 0; } #root.tb .scl { padding: 0 4px 0 0; flex-direction: column; overflow: visible; } .spd { flex: none; margin-left: auto; font-size: 11.5px; font-weight: 700; padding: 4px 10px; border-radius: 99px; background: rgba(255,255,255,.09); } .chip.hot .spd { background: color-mix(in srgb, #ffb340 28%, transparent); color: #ffd9a0; } .sec .nwb { margin-left: 4px; }
#root.tb #dock #orbw { order: 13; margin: 6px 0 0; } #root.tb #dock .tbs { order: 12; }
/* ===== uklad z konfiguracji (config.layout; kreator Aurora Manager) ===== */
#root.cl #lc { display: contents !important; }
#root.cl .lyb { display: flex; flex-direction: column; min-width: 0; min-height: 0; }
#root.cl.tb #scroll { display: grid !important; grid-template-columns: repeat(var(--cols, 12), minmax(0, 1fr)) !important; grid-template-rows: repeat(var(--rows, 8), minmax(0, 1fr)) !important; gap: 12px !important; padding: 16px 18px 16px 8px; overflow: hidden; }
#root.cl.tb #hero, #root.cl.tb #wxt, #root.cl.tb #schl, #root.cl.tb #pulse, #root.cl.tb .lyb { margin: 0 !important; min-width: 0; min-height: 0; overflow: hidden; }
#root.cl.tb #hero { display: flex; justify-content: center; align-items: center; } #root.cl.tb #hero .wxo { display: none; }
#root.cl.tb #wxt { display: flex !important; } #root.cl.tb #wxt .wxo { height: 100%; min-height: 0; margin: 0; }
#root.cl.tb #pulse { width: auto !important; height: 100% !important; max-width: 100%; aspect-ratio: 1; justify-self: center; align-self: center; }
#root.cl .lyb > .sec { padding: 0; margin: 0 0 8px; flex: none; }
#root.cl.tb .lyb .chips, #root.cl.tb .lyb .rooms, #root.cl.tb .lyb .lts { flex: 1; min-height: 0; max-height: none; padding: 0 !important; overflow-y: auto; }
#root.cl.tb .lyb .rooms { display: grid; grid-template-columns: repeat(auto-fill, minmax(230px, 1fr)); align-content: start; gap: 10px; flex-direction: row; } #root.cl.tb .lyb .rooms .rm { width: auto; max-width: none; }
#root.cl.tb .lyb .lts { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); align-content: start; } #root.cl.tb .lyb .lts .lp { grid-column: auto !important; grid-row: auto !important; }
#root.cl .lyb > * { order: 0 !important; }
.chip.hot.in { opacity: 1 !important; transform: none !important; }   /* ostrzegawcze kafelki bez animacji wejscia - wczesniej czekaly na jej koniec */
#root.cl.tb .lyb .chips { flex-direction: column; overflow-x: hidden; scroll-snap-type: none; gap: 8px; } #root.cl.tb .lyb .chips .chip { width: 100%; max-width: none; flex: none; }
#root.cl:not(.tb) #scroll { display: flex; flex-direction: column; }
#root.cl:not(.tb) #scroll > * { flex: none; }   /* bez tego bloki w kolumnie flex kurcza sie do 0 i nachodza na siebie */
#root.cl:not(.tb) .lyb .rooms { padding-left: 22px; padding-right: 22px; }
/* ===== WYDAJNOSC (slabe tablety): bez backdrop-filter i blur, bez nieskonczonych animacji tla, wygaszanie animacji pod otwartym panelem ===== */
.gl { -webkit-backdrop-filter: none !important; backdrop-filter: none !important; background: linear-gradient(145deg, rgba(40,52,84,.78), rgba(22,30,52,.82)) !important; box-shadow: 0 4px 14px rgba(0,0,0,.22), inset 0 1px 0 rgba(255,255,255,.1) !important; }
#ov .bd { -webkit-backdrop-filter: none !important; backdrop-filter: none !important; background: rgba(4,7,16,.74) !important; animation: none !important; }
#root.tb #ov .bd { background: rgba(4,7,16,.5) !important; }
#vw { -webkit-backdrop-filter: none !important; backdrop-filter: none !important; background: linear-gradient(180deg, rgba(8,12,24,.97), rgba(5,9,18,.99)) !important; }
#root.tb #vw { background: linear-gradient(160deg, rgba(14,20,38,.98), rgba(5,9,18,.99)) !important; }
#sh, #rmn { -webkit-backdrop-filter: none !important; backdrop-filter: none !important; }
#sh.gl, #rmn.gl { background: linear-gradient(160deg, #1a2440, #0d1224) !important; }
.rb { filter: none !important; mix-blend-mode: normal !important; }
#root.tb.lt .rb { animation: none !important; will-change: auto !important; }
.rb.r1 { opacity: .34 !important; } .rb.r2 { opacity: .28 !important; } .rb.r3 { opacity: .16 !important; }
#root.tb.lt .chip, #root.tb.lt .chip.hot { animation: none !important; } #root.tb.lt .chip::after { display: none !important; } #root.tb.lt .rm::before { animation: none !important; }
#root.tb.lt #pulse .dots, #root.tb.lt #pulse .core { animation: none !important; }
#root.busy #s3d *, #root.busy #s3d, #root.busy #scroll *, #root.busy #scroll *::before, #root.busy #scroll *::after, #root.busy #sky * { animation-play-state: paused !important; }
#sh { animation-duration: .22s !important; } #vw.on { animation-duration: .22s !important; } #rmn { animation-duration: .2s !important; }
#scroll { scroll-behavior: auto; } #sh, #rmn, #menu, #vw, .vb { will-change: transform; transform: translateZ(0); }

`;

/* motywy tematyczne: n = nazwa, hs = kolory akcentow, fx = rodzaj animowanych czastek (canvas #mxr), reszta w CSS (#root.th-<id>) */
const PTHEMES = {
  spring: {n: 'Wiosna', hs: {a: '#f9a8d4', b: '#bef264', c: '#fde68a'}, fx: 'petal'}, summer: {n: 'Lato', hs: {a: '#fde047', b: '#38bdf8', c: '#fb923c'}, fx: 'mote'},
  autumn: {n: 'Jesień', hs: {a: '#fb923c', b: '#f59e0b', c: '#ef4444'}, fx: 'leaf'}, winter: {n: 'Zima', hs: {a: '#bfe3ff', b: '#93c5fd', c: '#e0e7ff'}, fx: 'snow'},
  space: {n: 'Kosmos', hs: {a: '#a78bfa', b: '#38bdf8', c: '#f0abfc'}, fx: 'stars'}, aurora: {n: 'Zorza polarna', hs: {a: '#4ade80', b: '#22d3ee', c: '#c084fc'}, fx: ''},
  deep: {n: 'Głębia', hs: {a: '#5eead4', b: '#38bdf8', c: '#a5f3fc'}, fx: 'bubble'}, holo: {n: 'Hologram', hs: {a: '#5ef2c9', b: '#a78bfa', c: '#7dd3fc'}, fx: 'bokeh'},
  ribbon: {n: 'Strumienie (Pulse)', hs: {a: '#37d6c5', b: '#f0b35a', c: '#f6d89a'}, fx: ''},
  tech3d: {n: 'Tech 3D (telefon)', hs: {a: '#00e5ff', b: '#b6ff3b', c: '#ffb020'}, fx: '', mob: true}};
const PTH_HS = {xmas: {a: '#ff6b7a', b: '#3fe0a5', c: '#ffd166'}, matrix: {a: '#00ff6a', b: '#00c853', c: '#b6ffcf'}, jarvis: {a: '#00e5ff', b: '#4dd0ff', c: '#ffb703'}, vice: {a: '#ff3d9a', b: '#00e5d0', c: '#ffb347'}};
/* id aktualnego motywu Pulse (ta sama logika co w karcie glownej) - wygaszacz dopasowuje do niego zegar i kafelki */
const pulseThemeId = (cfg) => { let t = ''; try { t = localStorage.getItem('pulse_theme') || ''; } catch (e) { t = ''; } t = t || (cfg && cfg.theme) || 'auto'; if (t === 'auto') { const d = new Date(); return (d.getMonth() === 11 || (d.getMonth() === 0 && d.getDate() <= 6)) ? 'xmas' : ''; } return (t === 'xmas' || PTH_HS[t] || PTHEMES[t]) ? t : ''; };
const PULSE_VIEWS = {
  pogoda: ['Pogoda', 'mdi:weather-partly-cloudy'], kalendarz: ['Kalendarz', 'mdi:calendar-month-outline'], szkola: ['Szkoła', 'mdi:school-outline'], klimat: ['Klimat', 'mdi:thermometer'],
  powietrze: ['Powietrze', 'mdi:leaf'], baterie: ['Baterie', 'mdi:battery-heart-variant'], multimedia: ['Multimedia', 'mdi:play-box-outline'], radio: ['Radio', 'mdi:radio'], tv: ['Program TV', 'mdi:television-guide'],
  historia: ['Historia dnia', 'mdi:text-box-search-outline'], serwer: ['Serwer', 'mdi:server'], f1: ['Formuła 1', 'mdi:flag-checkered'], asystent: ['Asystent', 'mdi:creation'],
  ustawienia: ['Ustawienia', 'mdi:cog-outline'], zadania: ['Zadania', 'mdi:format-list-checks'], guard: ['Aurora Guard', 'mdi:shield-lock-outline'], skform: ['Szkoła · formularz', 'mdi:email-edit-outline'], pokoj: ['Pokój', 'mdi:sofa-outline']
};

class AuroraPulseCard extends AuroraBase {
  constructor() { super(); this._vw = null; this._vst = []; this._view = 'home'; this._pExp = new Set(); this._pEvR = 7; this._pSk = {k: '', t: 'przeglad'}; this._pSkx = new Set(); }
  /* parent wywoluje te metody po zaladowaniu danych - w tej karcie nie ma ich elementow */
  _renderSub() { } _applyView() { } _route() { } _school() { } _now() { }
  setConfig(cfg) {
    this._config = Object.assign({aurora: true}, cfg || {});
    this._pcOwn = null; PC = PC0; if (this._config.cfg && typeof this._config.cfg === 'object') { PC = Object.assign({}, this._config.empty ? PC_EMPTY : PC0, this._config.cfg); this._pcOwn = PC;  }
    this.shadowRoot.innerHTML = `<style>${PULSE_CSS}</style><div id="root"><div id="xm"></div><div id="sky"><i class="rb r1"></i><i class="rb r2"></i><i class="rb r3"></i></div><div id="fx"></div><canvas id="mxr"></canvas>
      <div id="scroll"><div id="hero"></div><div id="pulse"></div><div id="lc"><div id="wxt"></div><div class="sec in" id="sect" style="--i:5">Teraz</div><div class="chips" id="chips"></div><div id="schl"></div></div>
      <div class="sec in" style="--i:7" id="secr">Pokoje</div><div class="rooms" id="rooms"></div><div class="sec in" id="secl" style="--i:8">Światła</div><div class="lts" id="lts"></div><div id="plg"></div></div>
      <div id="vw"><div class="vh"><button class="bk gl" data-a="back" aria-label="Wstecz"><ha-icon icon="mdi:arrow-left"></ha-icon></button><div class="ti" id="vt"></div><span class="ic" id="vi"></span></div><div class="vb" id="vb"></div></div>
      <nav id="dock" class="gl"><div id="orbw"><button id="orb" data-a="orb" aria-label="Asystent"><i class="rp"></i><i class="rp r2"></i><ha-icon icon="mdi:creation"></ha-icon><span class="bars"><i></i><i></i><i></i><i></i><i></i></span></button></div>
      </nav>
      <div id="ov"><div class="bd" data-a="closeov"></div><div id="menu" style="display:none"></div><div id="rmn" class="gl" style="display:none"></div><div id="sh" class="gl" style="display:none"></div></div><div id="alm"></div><div id="toast"></div></div>`;
    this._built = true; this._pg = {}; this._fxK = ''; this._pDk = null;
    this._pTb(); if (!this._pRz) { this._pRz = () => this._pTb(); window.addEventListener('resize', this._pRz); }
    const r = this.shadowRoot; this._root = r.getElementById('root'); this._scr = r.getElementById('scroll'); if (this._scr && !this._pScL) { this._pScL = () => { if (!this._pScOn) { this._pScOn = true; this._root.classList.add('scr'); } clearTimeout(this._pScT); this._pScT = setTimeout(() => { this._pScOn = false; this._root.classList.remove('scr'); }, 160); }; this._root.addEventListener('scroll', this._pScL, {passive: true, capture: true});   /* capture: przewijanie dowolnej listy (tablet: kolumny) */ }   /* telefon: na czas przewijania wstrzymaj animacje (glicze kafelkow i pulsu) */
    r.addEventListener('click', (e) => this._pclick(e));
    r.addEventListener('pointerdown', (e) => { const t = e.target.closest && e.target.closest('[data-a="tg"]'); if (!t || !/^light\./.test(t.dataset.e || '')) return; const o = this._hass && this._hass.states[t.dataset.e], M = (o && o.attributes.supported_color_modes) || []; if (!M.some((m) => m !== 'onoff')) return; this._lx = e.clientX; this._ly = e.clientY; clearTimeout(this._lpT); this._lpT = setTimeout(() => { this._lpFired = true; if (navigator.vibrate) { try { navigator.vibrate(15); } catch (x) { /* ignore */ } } this._lE = t.dataset.e; this._pSheet('light'); }, 480); });
    r.addEventListener('pointerdown', (e) => { if (e.target.type === 'range') this._lDrag = 1; });
    r.addEventListener('pointerup', () => { setTimeout(() => { this._lDrag = 0; }, 300); });
    r.addEventListener('pointermove', (e) => { if (this._lpT && Math.hypot(e.clientX - this._lx, e.clientY - this._ly) > 10) this._lpUp(); });
    ['pointerup', 'pointercancel'].forEach((ev) => r.addEventListener(ev, () => this._lpUp()));
    r.addEventListener('contextmenu', (e) => { if (e.target.closest && e.target.closest('[data-a="tg"]')) e.preventDefault(); });
    r.addEventListener('input', (e) => { const t = e.target, a = t && t.dataset && t.dataset.a; if (a === 'lbr') { const v = this.shadowRoot.getElementById('lbv'); if (v) v.textContent = t.value + '%'; } if (a === 'lct') { const v = this.shadowRoot.getElementById('lkv'); if (v) v.textContent = t.value + ' K'; } });
    r.addEventListener('change', (e) => { const t = e.target, a = t && t.dataset && t.dataset.a, E = this._lE;
      if (a === 'lbr') { this._call('light', 'turn_on', {entity_id: E, brightness_pct: +t.value}); return; }
      if (a === 'lct') { this._call('light', 'turn_on', {entity_id: E, color_temp_kelvin: +t.value}); return; }
      if (a === 'lhue') { this._call('light', 'turn_on', {entity_id: E, hs_color: [+t.value, 100]}); return; } });
    r.addEventListener('change', (e) => { const t = e.target; if (t && t.dataset && t.dataset.a === 'mps') this._call('media_player', 'volume_set', {entity_id: t.dataset.e, volume_level: Math.max(0, Math.min(1, (+t.value) / 100))}); });
    r.addEventListener('submit', (e) => { const tf = e.target.closest && e.target.closest('#tdf'); if (tf) { e.preventDefault(); const inp = r.getElementById('tdn'), tx = inp.value.trim(); if (!tx || !this._pTdEdit()) return; inp.value = ''; this._call('todo', 'add_item', {entity_id: this._tdSel, item: tx}); const c = this._tdC && this._tdC[this._tdSel]; if (c) c.sig = ''; setTimeout(() => this._pTdLoad(this._tdSel), 400); setTimeout(() => this._pTdLoad(this._tdSel), 1500); return; } });
    r.addEventListener('change', (e) => { const t = e.target; if (t && t.dataset && t.dataset.a === 'tdren' && this._pTdEdit()) { const v = t.value.trim(); if (v) this._call('todo', 'update_item', {entity_id: t.dataset.e, item: t.dataset.u, rename: v}); } });
    r.addEventListener('submit', (e) => { const f = e.target.closest('#askf'); if (!f) return; e.preventDefault(); const inp = r.getElementById('asktx'), tx = inp.value.trim(); if (!tx) return; inp.value = ''; this._askSend(tx); });
    const orb = r.getElementById('orb');
    orb.addEventListener('pointerdown', (e) => this._lpDown(e, '#orb', () => { this._lpFired = true; if (navigator.vibrate) { try { navigator.vibrate(15); } catch (x) { /* ignore */ } } this._pOpen('asystent'); }));
    ['pointerup', 'pointerleave', 'pointercancel'].forEach((ev) => orb.addEventListener(ev, () => this._lpUp()));
    orb.addEventListener('contextmenu', (e) => e.preventDefault());
    this._scr.addEventListener('scroll', () => { const y = this._scr.scrollTop, cl = this._root.classList, sk = this._root.querySelector('#sky'); sk.style.transform = (cl.contains('thx') || cl.contains('gt') || cl.contains('jv') || cl.contains('mx') || cl.contains('xm')) ? '' : 'translate3d(0,' + (-y * 0.18).toFixed(1) + 'px,0)'; }, {passive: true});   /* motywy: tlo nieruchome (paralaksa odslaniala dol i ucinala grafiki) */
    if (!this._pPop) { this._pPop = () => { if (this._vw) { this._pushed = false; this._pCloseV(); } }; window.addEventListener('popstate', this._pPop); }
    if (this._config.hide_header !== false) this._pHideHdr();
    this._pStart();
  }
  _pHideHdr() {
    const root = this._kRoot(); if (!root || !root.shadowRoot) { setTimeout(() => { if (this.isConnected) this._pHideHdr(); }, 600); return; }
    let st = root.shadowRoot.getElementById('pastel-kiosk'); if (!st) { st = document.createElement('style'); st.id = 'pastel-kiosk'; root.shadowRoot.appendChild(st); }
    st.textContent = (this._pKiosk() ? '.header { display: none !important; } :host { --header-height: 0px !important; } #view { min-height: 100vh !important; padding-top: 0 !important; margin-top: 0 !important; }' : '');
  }
  _pKiosk() { try { return localStorage.getItem('pulse_hdr') !== '1'; } catch (e) { return true; } }   /* domyslnie belka HA ukryta; ustawienie 'pulse_hdr=1' ja przywraca */
  _pStart() {
    if (!this._tk) this._tk = setInterval(() => { this._pClock(); if (this._vw && ['klimat', 'pokoj', 'powietrze'].indexOf(this._vw.k) >= 0) this._pVRender(); }, 15000);
    this._vsHide(true);
    if (!document.getElementById('pulse-vs-btn')) { const st = document.createElement('style'); st.id = 'pulse-vs-btn'; st.textContent = '#voice-satellite-ui .vs-start-btn { bottom: 112px !important; right: 16px !important; width: 44px !important; height: 44px !important; opacity: .9; }'; document.head.appendChild(st); }   /* przycisk startu sesji glosowej nie moze zaslaniac doku */
  }
  _pRoomsAuto() {   /* telefon: karuzela pokoi sama sie przewija z lewej do prawej (i z powrotem); dotyk wstrzymuje na 8 s */
    if (this._tb || this._vw || this._ovK || this._svOn) return; const el = this.shadowRoot && this.shadowRoot.getElementById('rooms'); if (!el || el.scrollWidth <= el.clientWidth + 4) return;
    if (!this._rsInit) { this._rsInit = 1; ['pointerdown', 'touchstart', 'wheel'].forEach((ev) => el.addEventListener(ev, () => { this._rsPause = Date.now() + 8000; el.style.scrollSnapType = ''; }, {passive: true})); }
    if (Date.now() < (this._rsPause || 0)) return; const r = this._scr && this._scr.getBoundingClientRect(), v = r && r.bottom > 0 && r.top < window.innerHeight; if (!v) return;
    const b = el.getBoundingClientRect(); if (b.bottom < 0 || b.top > window.innerHeight) return;   /* karuzela poza ekranem: nie przewijaj */
    el.style.scrollSnapType = 'none'; const max = el.scrollWidth - el.clientWidth;
    if (!this._rsDir) this._rsDir = 1; if (this._rsHold && Date.now() < this._rsHold) return;
    el.scrollLeft += this._rsDir * 1; if (el.scrollLeft >= max - 1) { this._rsDir = -1; this._rsHold = Date.now() + 2500; } else if (el.scrollLeft <= 0 && this._rsDir < 0) { this._rsDir = 1; this._rsHold = Date.now() + 2500; }
  }
  _pApplyLayout() {
    /* uklad z konfiguracji (kreator Aurora Manager): config.layout = {tablet: {cols, rows, blocks: {id: {x, y, w, h}}, hide: []}, phone: {order: [], hide: []}} */
    const L = this._config && this._config.layout, sr = this.shadowRoot, root = sr && sr.getElementById('root'); if (!root) return;
    root.classList.toggle('cl', !!L); if (!L) return; const R = (id) => sr.getElementById(id), scr = R('scroll'); if (!scr) return;
    if (!this._lyDom) {
      const mk = (id, els) => { const w = document.createElement('div'); w.id = id; w.className = 'lyb'; scr.appendChild(w); els.forEach((e) => e && w.appendChild(e)); return w; };
      const lc = R('lc'); ['wxt', 'schl'].forEach((i) => { const e = R(i); if (e) scr.appendChild(e); }); if (lc) lc.style.display = 'contents';
      mk('b-now', [R('sect'), R('chips')]); mk('b-rooms', [R('secr'), R('rooms')]); mk('b-lights', [R('secl'), R('lts')]); this._lyDom = 1;
    }
    const map = {clock: 'hero', weather: 'wxt', school: 'schl', now: 'b-now', pulse: 'pulse', rooms: 'b-rooms', lights: 'b-lights'}, all = Object.keys(map);
    if (this._tb) {
      const T = L.tablet || {}, cols = T.cols || 12, rows = T.rows || 8, hide = T.hide || [], B = T.blocks || {};
      scr.style.setProperty('--cols', cols); scr.style.setProperty('--rows', rows);
      all.forEach((k) => { const el = R(map[k]); if (!el) return; const b = B[k], off = hide.indexOf(k) >= 0 || !b; el.style.order = ''; if (off) { el.style.setProperty('display', 'none', 'important'); return; } el.style.removeProperty('display'); el.style.gridColumn = (b.x + 1) + ' / span ' + b.w; el.style.gridRow = (b.y + 1) + ' / span ' + b.h; });
    } else {
      const P = L.phone || {}, ord = P.order && P.order.length ? P.order : all, hide = P.hide || [];
      all.forEach((k) => { const el = R(map[k]); if (!el) return; el.style.gridColumn = ''; el.style.gridRow = ''; const i = ord.indexOf(k); el.style.order = i < 0 ? 99 : i + 1; if (k === 'weather' || hide.indexOf(k) >= 0) el.style.setProperty('display', 'none', 'important'); else el.style.removeProperty('display'); });
      const wx = scr.querySelector('#hero .wxo'); if (wx) wx.style.display = hide.indexOf('weather') >= 0 ? 'none' : '';
    }
  }
  _pNav() { return (this._config && this._config.nav) || {}; }
  _pDockIds() { const nv = this._pNav(), tb = this._tb; const L = tb ? (nv.tdock || ['rooms', 'szkola', 'klimat', 'multimedia', 'radio', 'events', 'pogoda', 'powietrze', 'historia']) : (nv.dock || ['lights', 'events']).slice(0, 3); return L.map((x) => x === 'events' ? 'kalendarz' : x); }
  _pDockBuild() {
    const dk = this.shadowRoot && this.shadowRoot.getElementById('dock'); if (!dk) return; const nv = this._pNav(), tb = !!this._tb, key = (tb ? 't' : 'p') + JSON.stringify([nv.dock, nv.tdock]); if (this._pDk === key) return; this._pDk = key;
    const CAT = {home: ['Dom', 'mdi:home-variant-outline', 'data-a="top"'], rooms: ['Pokoje', 'mdi:sofa-outline', 'data-a="rmenu" id="drm"'], lights: ['Światła', 'mdi:lightbulb-group-outline', 'data-a="lights" id="dlt"'], events: ['Wydarzenia', 'mdi:calendar-clock-outline', 'data-a="events"'], more: ['Więcej', 'mdi:dots-grid', 'data-a="menu" id="dmenu"']};
    const mk = (id, ord) => { let c = CAT[id]; if (!c && PULSE_VIEWS[id]) c = [PULSE_VIEWS[id][0].replace('Historia dnia', 'Historia'), PULSE_VIEWS[id][1], 'data-a="go" data-go="' + id + '" data-v="' + id + '"' + (id === 'ustawienia' ? ' class="tbs"' : '')]; if (!c) return ''; return `<button class="di${id === 'home' ? ' on' : ''}${id === 'ustawienia' ? ' tbs' : ''}" ${c[2].replace(' class="tbs"', '')} style="order:${ord}"><ha-icon icon="${c[1]}"></ha-icon><span>${c[0]}</span></button>`; };
    const seq = tb ? ['home'].concat(this._pDockIds().map((x) => x === 'kalendarz' ? 'events' : x), ['more', 'ustawienia']) : ['home'].concat((nv.dock || ['lights', 'events']).slice(0, 3));
    const ob = dk.querySelector('#orbw'); dk.querySelectorAll('.di').forEach((b) => b.remove());
    let h = ''; seq.forEach((id, i) => { h += mk(id, tb ? i + 1 : i * 2 + 2); });
    if (tb) { if (ob) ob.style.order = String(seq.length + 2); } else { const pp = Math.ceil(seq.length / 2); if (ob) ob.style.order = String(pp * 2 + 1); h += mk('more', 998); }
    dk.insertAdjacentHTML('afterbegin', h);
  }
  _pTb() { const L = this._config && this._config.layout, F = L && typeof L === 'object' ? L.force : L, tb = F === 'tablet' || (F !== 'phone' && window.innerWidth >= 900); const r = this.shadowRoot && this.shadowRoot.getElementById('root'); if (r) { r.classList.toggle('tb', !!tb); let lt = false; try { lt = localStorage.getItem('pulse_lite') === '1' || localStorage.getItem('pastel_lite') === '1'; } catch (x) { /* ignore */ } r.classList.toggle('lt', !!(tb && (lt || (this._config && this._config.lite)))); } this._tb = !!tb; this._pDockBuild(); this._pApplyLayout(); }
  connectedCallback() { if (this._built) this._pStart(); }
  disconnectedCallback() { this._pClay(false); this._pRib(false); if (this._tdSub) { Object.keys(this._tdSub).forEach((k) => { const u = this._tdSub[k]; if (typeof u === 'function') { try { u(); } catch (e) { /* ignore */ } } }); this._tdSub = null; } if (this._tk) { clearInterval(this._tk); this._tk = null; } if (this._rsT) { clearInterval(this._rsT); this._rsT = null; } this._vsHide(false); const pb = document.getElementById('pulse-vs-btn'); if (pb) pb.remove(); }
  set hass(h) {
    this._hass = h; if (!this._built) return;
    if (this._gdMapEl) { try { this._gdMapEl.hass = h; } catch (e) { /* ignore */ } }
    if (this._rq) return; this._rq = setTimeout(() => { this._rq = null; try { this._pRender(); } catch (e) { console.error('aurora-pulse', e); } }, 120);
  }
  _pSet(id, html) { if (this._pg[id] === html) return false; this._pg[id] = html; const el = this.shadowRoot.getElementById(id); if (el) el.innerHTML = html; return true; }
  _pClock() { const el = this.shadowRoot.getElementById('tm'), dt = this.shadowRoot.getElementById('dt'); if (!el) return; const d = new Date(); el.textContent = String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0'); dt.textContent = DAYS[d.getDay()] + ', ' + d.getDate() + ' ' + MONTHS[d.getMonth()]; }
  _pSchool() {
    let S = []; try { S = this._skS(); } catch (e) { S = []; } const el = this.shadowRoot.getElementById('schl'); if (!el) return; if (!S.length) { this._pSet('schl', ''); return; }
    S.forEach((q) => { try { this._skLoad(q.k); } catch (e) { /* ignore */ } }); const d0 = new Date(), it = []; d0.setHours(0, 0, 0, 0);
    S.forEach((q) => { const c = (this._skCal || {})[q.k]; ((c && c.duty) || []).forEach((ev) => { const dd = Math.round((new Date(ev.s.getFullYear(), ev.s.getMonth(), ev.s.getDate()) - d0) / 86400000); if (dd < 0 || dd > 14) return; const m = /^([^:]+):\s*(.*)$/.exec(ev.t) || []; it.push({nm: String(q.nm).split(' ')[0], kind: (m[1] || 'Sprawdzian').trim(), subj: (m[2] || ev.t).trim(), dd, si: S.indexOf(q)}); }); });
    it.sort((a, b) => a.dd - b.dd); const when = (d) => d <= 0 ? 'dziś' : d === 1 ? 'jutro' : 'za ' + d + ' dni', AVC = ['#7aa2ff', '#f472b6', '#34d399', '#fbbf24'], loaded = S.every((q) => (this._skCal || {})[q.k] && this._skCal[q.k].t); let nv = 0; try { nv = this._skNew() || 0; } catch (e) { nv = 0; }
    this._pSet('schl', `<div class="sec" data-a="go" data-go="szkola" style="cursor:pointer">Szkoła${nv > 0 ? `<span class="nwb">${nv > 99 ? '99+' : nv} NOWE</span>` : ''}</div>` + (it.length ? '<div class="chips scl">' + (this._pMore && this._pMore.schl ? it : it.slice(0, this._tb ? 3 : (window.__pMX || 2))).map((x) => `<button class="chip gl${x.dd <= 1 ? ' hot' : ''}" style="--cc:${x.dd <= 1 ? '#ffb340' : AVC[x.si % 4]}" data-a="go" data-go="szkola"><span class="ci"><b style="font-size:16px">${esc(x.nm.charAt(0))}</b></span><span><b>${esc(x.subj)}</b><small>${esc(x.kind)} · ${esc(x.nm)}</small></span><span class="spd">${when(x.dd)}</span></button>`).join('') + (it.length > (this._tb ? 3 : (window.__pMX || 2)) ? (this._tb ? `<div class="spe">+ ${it.length - 3} kolejne</div>` : `<button class="mre" data-a="more" data-w="schl"><span>${this._pMore && this._pMore.schl ? 'Zwiń' : 'Pokaż jeszcze ' + (it.length - (window.__pMX || 2))}</span><ha-icon icon="${this._pMore && this._pMore.schl ? 'mdi:chevron-up' : 'mdi:chevron-down'}"></ha-icon></button>`) : '') + '</div>' : `<div class="spe">${loaded ? 'Brak sprawdzianów i zadań na 2 tygodnie ✨' : 'Wczytuję…'}</div>`));
  }
  _pBp(e) {   /* % jasnosci wlaczonej lampy z regulacja jasnosci (puste: brak regulacji albo lampa wylaczona) */
    const o = e && this._hass && this._hass.states[e]; if (!o || o.state !== 'on' || !/^light\./.test(e)) return '';
    const b = o.attributes && o.attributes.brightness; return b == null ? '' : Math.max(1, Math.round(b / 2.55)) + '%';
  }
  _pAlOn() { return ['normal', 'unavailable', 'unknown', undefined].indexOf(this._s(PC.alarm)) < 0 || !!(PC.alarmSw && this._s(PC.alarmSw) === 'on'); }
  _pPm() { const pm = this._n(PC.pm), PL = PC.pmLv || [10, 25, 35, 50]; return pm === null ? ['Brak danych', '#b9b5cf', pm] : pm <= PL[0] ? ['Świetne', '#3fe0a5', pm] : pm <= PL[1] ? ['Dobre', '#7be495', pm] : pm <= PL[2] ? ['Umiarkowane', '#ffc24b', pm] : pm <= PL[3] ? ['Słabe', '#ff9a5c', pm] : ['Złe', '#ff5d73', pm]; }
  _pRaw() { let t = ''; try { t = localStorage.getItem('pulse_theme') || ''; } catch (e) { t = ''; } if (t === 'clay') t = 'tech3d'; return t || (this._config && this._config.theme) || 'auto'; }   /* wybor na urzadzeniu, a gdy brak - domyslny motyw z konfiguracji dashboardu */
  _pHs() { let k = ''; try { k = localStorage.getItem('hud_scheme') || ''; } catch (e) { k = ''; } k = k || (this._config && this._config.scheme) || ''; return HUD_SCH.find((x) => x.id === k) || hudSch(); }
  _pThm() { return this._pRaw(); }
  _pXm() { const t = this._pRaw(); if (t === 'xmas') return true; if (t !== 'auto') return false; const d = new Date(), m = d.getMonth(), dd = d.getDate(); return m === 11 || (m === 0 && dd <= 6); }   /* auto: 1 grudnia - 6 stycznia */
  _pMx() { return this._pRaw() === 'matrix'; }
  _pGt() { return this._pRaw() === 'vice'; }
  _pTbNow() { const L = this._config && this._config.layout, F = L && typeof L === 'object' ? L.force : L; return F === 'tablet' || (F !== 'phone' && window.innerWidth >= 900); }
  _pTh() { const t = this._pRaw(); if (PTHEMES[t] && PTHEMES[t].mob && this._pTbNow()) return ''; return PTHEMES[t] ? t : ''; }   /* motywy "mob" (Glina 3D) tylko na telefonie */
  _pFx(kind) {
    if (kind === this._fxKind) return; this._fxKind = kind; clearTimeout(this._mxT); this._mxOn = false;
    const cv = this.shadowRoot.getElementById('mxr'); if (!cv) return;
    if (!kind) { cv.style.display = 'none'; return; }
    if (kind === 'matrix') { cv.style.opacity = ''; this._pMxRain(true); return; }
    cv.style.display = 'block'; cv.style.opacity = '1'; this._mxOn = true;
    const ctx = cv.getContext('2d'), R = Math.random, TP = Math.PI * 2; let W = 0, H = 0, P = [];
    const N0 = {petal: 34, leaf: 26, snow: 80, bubble: 34, mote: 44, stars: 120, bokeh: 22}[kind] || 40;
    const mk = (init) => { const p = {x: R() * W, y: init ? R() * H : -20, s: 1 + R(), ph: R() * TP, vr: (R() - .5) * .05, r: R() * TP, c: (R() * 5) | 0, a: R() * TP, d: R() };
      if (kind === 'petal') { p.s = 5 + R() * 6; p.vy = .5 + R() * .9; }
      else if (kind === 'leaf') { p.s = 9 + R() * 9; p.vy = .6 + R() * 1; }
      else if (kind === 'snow') { p.s = 1.2 + R() * 3.2; p.vy = .35 + p.s * .22; }
      else if (kind === 'bubble') { p.s = 2 + R() * 8; p.vy = .4 + R() * 1.1; p.y = init ? R() * H : H + 20; }
      else if (kind === 'mote') { p.s = 1.5 + R() * 3.5; p.vy = .15 + R() * .35; p.y = init ? R() * H : H + 10; }
      else if (kind === 'stars') { p.d = init ? R() : .02 + R() * .05; p.s = .5 + R(); }
      else if (kind === 'bokeh') { p.s = 3 + R() * 13; p.vy = .05 + R() * .2; p.y = R() * H; p.x = R() * W; }
      return p; };
    const init = () => { W = this._root.clientWidth; H = this._root.clientHeight; cv.width = W; cv.height = H; P = Array.from({length: this._root.classList.contains('lt') ? Math.ceil(N0 / 2.2) : N0}, () => mk(true)); };
    const LC = ['#d9480f', '#e8590c', '#f59f00', '#c92a2a', '#a0522d'], PC2 = ['#ffc2dc', '#ffd6e7', '#ffb3d1', '#fff0f6', '#fcc2d7'];
    let t = 0;
    const step = () => {
      if (!this._mxOn) return; const rt = this._root, lite = rt.classList.contains('lt'); this._mxT = setTimeout(step, lite ? 90 : 36);
      if (document.hidden || rt.classList.contains('busy') || rt.classList.contains('scr') || this._ovK === 'sheet') return;
      if (rt.clientWidth !== W || rt.clientHeight !== H) init(); t += 1; ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < P.length; i++) { const p = P[i];
        if (kind === 'petal') { p.y += p.vy; p.x += Math.sin(t / 30 + p.ph) * .9 + .25; p.r += p.vr; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = PC2[p.c % 5]; ctx.globalAlpha = .85; ctx.beginPath(); ctx.ellipse(0, 0, p.s, p.s * .55, 0, 0, TP); ctx.fill(); ctx.restore(); if (p.y > H + 20) P[i] = mk(false); }
        else if (kind === 'leaf') { p.y += p.vy; p.x += Math.sin(t / 26 + p.ph) * 1.3; p.r += p.vr * 1.6; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = LC[p.c % 5]; ctx.globalAlpha = .9; ctx.beginPath(); ctx.moveTo(0, -p.s); ctx.quadraticCurveTo(p.s * .75, -p.s * .2, 0, p.s); ctx.quadraticCurveTo(-p.s * .75, -p.s * .2, 0, -p.s); ctx.fill(); ctx.strokeStyle = 'rgba(60,20,0,.45)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(0, -p.s); ctx.lineTo(0, p.s); ctx.stroke(); ctx.restore(); if (p.y > H + 24) P[i] = mk(false); }
        else if (kind === 'snow') { p.y += p.vy; p.x += Math.sin(t / 40 + p.ph) * .5; ctx.fillStyle = 'rgba(255,255,255,' + (.45 + p.s / 8).toFixed(2) + ')'; ctx.beginPath(); ctx.arc(p.x, p.y, p.s, 0, TP); ctx.fill(); if (p.y > H + 6) P[i] = mk(false); }
        else if (kind === 'bubble') { p.y -= p.vy; p.x += Math.sin(t / 28 + p.ph) * .6; ctx.strokeStyle = 'rgba(165,243,252,.55)'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(p.x, p.y, p.s, 0, TP); ctx.stroke(); ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.beginPath(); ctx.arc(p.x - p.s * .3, p.y - p.s * .3, p.s * .22, 0, TP); ctx.fill(); if (p.y < -12) P[i] = mk(false); }
        else if (kind === 'mote') { p.y -= p.vy; p.x += Math.sin(t / 50 + p.ph) * .5; const al = .35 + .5 * Math.abs(Math.sin(t / 40 + p.ph)); ctx.fillStyle = 'rgba(255,230,120,' + al.toFixed(2) + ')'; ctx.shadowColor = '#ffd84a'; ctx.shadowBlur = 8; ctx.beginPath(); ctx.arc(p.x, p.y, p.s, 0, TP); ctx.fill(); ctx.shadowBlur = 0; if (p.y < -8) P[i] = mk(false); }
        else if (kind === 'bokeh') { p.y -= p.vy; p.x += Math.sin(t / 120 + p.ph) * .25; const al = .06 + .14 * Math.abs(Math.sin(t / 150 + p.ph)); ctx.fillStyle = (p.c % 3 === 0 ? 'rgba(94,242,201,' : p.c % 3 === 1 ? 'rgba(167,139,250,' : 'rgba(255,255,255,') + al.toFixed(3) + ')'; ctx.beginPath(); ctx.arc(p.x, p.y, p.s, 0, TP); ctx.fill(); if (p.y < -20) { p.y = H + 20; p.x = R() * W; } }
        else if (kind === 'stars') { p.d += .0008 + p.d * .014; const cx = W / 2, cy = H / 2, m = Math.max(W, H) * .62, x = cx + Math.cos(p.a) * p.d * m, y = cy + Math.sin(p.a) * p.d * m; ctx.fillStyle = 'rgba(255,255,255,' + Math.min(1, .25 + p.d * 1.3).toFixed(2) + ')'; ctx.beginPath(); ctx.arc(x, y, p.s * (.4 + p.d * 1.6), 0, TP); ctx.fill(); if (p.d > 1.05) P[i] = mk(false); }
      }
    };
    init(); step();
  }
  _pJv() { return this._pRaw() === 'jarvis'; }
  _pCount() {   /* liczby w kafelkach "dolatuja" od zera przy wejsciu w motyw */
    const R = this.shadowRoot; if (!R) return;
    R.querySelectorAll('.rm .rv b, #hero .wxo b').forEach((el) => {
      if (el.children.length) return; const t = el.textContent, m = /^-?\d+([.,]\d+)?/.exec(t); if (!m) return; const v = parseFloat(m[0].replace(',', '.')), dec = m[1] ? m[1].length - 1 : 0, rest = t.slice(m[0].length), t0 = performance.now();
      const f = (n) => { const k = Math.min(1, (n - t0) / 900), e = 1 - Math.pow(1 - k, 3); el.textContent = (v * e).toFixed(dec).replace('.', ',') + rest; if (k < 1) requestAnimationFrame(f); else el.textContent = t; }; requestAnimationFrame(f);
    });
  }
  _pClay(on) {   /* Glina 3D: plywajace bryly 3D w tle (paralaksa zyroskopu), nachylanie kafelkow i wytloczony zegar ruchem telefonu */
    const S = this.shadowRoot, root = this._root; if (!S || !root) return; let L = S.getElementById('s3d');
    if (!on) { if (L) L.remove(); if (this._clayH) { window.removeEventListener('deviceorientation', this._clayH.o); root.removeEventListener('pointermove', this._clayH.m); root.removeEventListener('pointerdown', this._clayH.d); cancelAnimationFrame(this._clayH.raf); if (this._clayH.sc) this._clayH.sc.removeEventListener('scroll', this._clayH.sh); root.removeEventListener('pointerdown', this._clayH.rp); this._clayH = null; ['--tx', '--ty', '--sx', '--sy'].forEach((k) => root.style.removeProperty(k)); } return; }
    const cube = (x, y, sz, d, c1, k, bl) => `<div class="o" style="left:${x}%;top:${y}%;--k:${k}"><div class="cb" style="--s:${sz}px;--d:${d}s;--c1:${c1}${bl ? ';filter:blur(' + bl + 'px)' : ''}"><i></i><i></i><i></i><i></i><i></i><i></i></div></div>`;
    const ring = (x, y, sz, c1, k, d, ax) => `<div class="o" style="left:${x}%;top:${y}%;--k:${k}"><div class="tr" style="width:${sz}px;height:${sz}px;--c1:${c1};--d:${d}s;--ax:${ax}deg"></div></div>`;
    let pts = ''; for (let n = 0; n < 16; n++) { const r1 = (Math.sin(n * 12.9898) * 43758.5453) % 1, r2 = (Math.sin(n * 78.233) * 12345.678) % 1; pts += `<div class="o" style="left:${Math.abs(r1) * 100}%;top:${Math.abs(r2) * 100}%;--k:${(1 + (n % 4) * .7).toFixed(1)}"><div class="pt" style="--c1:${n % 3 ? '#00e5ff' : '#b6ff3b'};--d:${3 + n % 5}s;animation-delay:-${n % 7}s"></div></div>`; }
    if (!L) { L = document.createElement('div'); L.id = 's3d'; L.innerHTML = '<div class="fl"><i></i></div>' + cube(76, 5, 62, 26, '#00e5ff', 2.2) + cube(2, 38, 40, 32, '#b6ff3b', 1.5, 1) + cube(84, 58, 78, 38, '#00e5ff', 3, 1.5) + cube(28, 86, 50, 30, '#ffb020', 2)
      + ring(58, 66, 130, '#00e5ff', 2.6, 18, 66) + ring(-8, 70, 160, '#b6ff3b', 3.2, 26, 72) + ring(60, 8, 90, '#ffb020', 1.8, 22, 58) + pts; root.insertBefore(L, S.getElementById('scroll')); }
    if (this._clayH) return;
    const st = {tx: 0, ty: 0, x: 0, y: 0, imp: 0, raf: 0, req: false}, cl = (v, m) => Math.max(-m, Math.min(m, v));
    const tick = () => { st.raf = 0; st.imp *= .88; const ty = st.ty + st.imp; st.x += (st.tx - st.x) * .14; st.y += (ty - st.y) * .14; root.style.setProperty('--tx', st.x.toFixed(1)); root.style.setProperty('--ty', st.y.toFixed(1)); root.style.setProperty('--sx', (-st.x * .08).toFixed(2)); root.style.setProperty('--sy', (0.9 - st.y * .06).toFixed(2)); if (Math.abs(st.tx - st.x) > .12 || Math.abs(ty - st.y) > .12 || Math.abs(st.imp) > .1) st.raf = requestAnimationFrame(tick); };
    const kick = () => { if (!st.raf && !document.hidden) st.raf = requestAnimationFrame(tick); };
    const o = (e) => { if (e.gamma == null) return; st.tx = cl(e.gamma * .45, 14); st.ty = cl(-((e.beta || 0) - 50) * .35, 14); kick(); };
    const m = (e) => { if (e.pointerType !== 'mouse') return; const r = root.getBoundingClientRect(); st.tx = cl(((e.clientX - r.left) / r.width - .5) * 28, 14); st.ty = cl(-((e.clientY - r.top) / r.height - .5) * 28, 14); kick(); };
    const d = () => { try { if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') DeviceOrientationEvent.requestPermission().catch(() => {}); } catch (x) { /* ignore */ } root.removeEventListener('pointerdown', d); };
    const sc = S.getElementById('scroll'); let lt = sc ? sc.scrollTop : 0;
    const sh = () => { const t = sc.scrollTop; st.imp = cl(st.imp + (t - lt) * .2, 12); lt = t; kick(); };   /* przewijanie nachyla plyty (impuls zanika) */
    const rp = (e) => { const el = (e.composedPath ? e.composedPath() : []).find((n) => n && n.classList && (n.classList.contains('chip') || n.classList.contains('rm') || n.classList.contains('lp') || n.classList.contains('row') || n.classList.contains('wxo'))); if (!el) return; const r = el.getBoundingClientRect(), w = document.createElement('i'); w.className = 'rpw'; w.innerHTML = '<b style="left:' + (e.clientX - r.left) + 'px;top:' + (e.clientY - r.top) + 'px"></b>'; el.appendChild(w); setTimeout(() => w.remove(), 700); };   /* fala energii od dotyku */
    if (sc) sc.addEventListener('scroll', sh, {passive: true}); root.addEventListener('pointerdown', rp);
    window.addEventListener('deviceorientation', o); root.addEventListener('pointermove', m); root.addEventListener('pointerdown', d); this._clayH = {o, m, d, sh, rp, sc, get raf() { return st.raf; }, set raf(v) { st.raf = v; }}; kick(); setTimeout(() => this._pCount(), 1200);
  }
  _pRibMorph() { let v = ''; try { v = localStorage.getItem('pulse_ribbon_morph') || ''; } catch (e) { v = ''; } return v === '0' ? '' : 'status'; }   /* wstega zamienia sie w znak statusu domu (domyslnie wlaczone; wylaczenie w ustawieniach) */
  _pStat() { const M = this._pM || [], c = M[0] ? M[0].col : ''; return c === '#3fe0a5' ? 0 : c === '#ff5d73' ? 2 : 1; }   /* 0 = dom w porzadku, 1 = ostrzezenia, 2 = alarm / powazne */   /* test: wstega zamienia sie w dom */
  _pRibMap() { try { return JSON.parse(localStorage.getItem('pulse_ribbon_map') || '{}') || {}; } catch (e) { return {}; } }
  _pRibGet(tid) { if (tid === 'ribbon') return true; const m = this._pRibMap(); if (tid in m) return !!m[tid]; if (tid === 'std') { let v = '1'; try { v = localStorage.getItem('pulse_ribbon') || '1'; } catch (e) { v = '1'; } return v !== '0'; } return false; }   /* wstega wlaczona w danym motywie (std = standardowy; domyslnie tylko tam i w "Strumieniach") */
  _pRibSet(tid, v) { const m = this._pRibMap(); m[tid] = v ? 1 : 0; try { localStorage.setItem('pulse_ribbon_map', JSON.stringify(m)); } catch (e) { /* ignore */ } }
  _pRibPal() {   /* kolory wstegi: z palety aktualnego motywu / schematu kolorow; w motywie Strumienie teal/zloto */
    const hex = (c) => { const n = parseInt(String(c).replace('#', ''), 16); return isNaN(n) ? [55, 214, 197] : [n >> 16 & 255, n >> 8 & 255, n & 255]; };
    if (this._pRibOn === 'std') { const t = this._pRibTid, h = t === 'std' ? this._pHs() : (PTH_HS[t] || (PTHEMES[t] && PTHEMES[t].hs) || this._pHs()); return [hex(h.a), hex(h.b), hex(h.c), hex(h.b)]; }
    const T = hex('#37d6c5'), G = hex('#f0b35a'); return [T, G, T, G];
  }
  _pRib(on) {   /* Strumienie: pierscien Pulsu domu jako wstega cienkich, splatanych nitek (kolory z kategorii pulsu), z czasteczkami - animowany canvas */
    const S = this.shadowRoot, el = S && S.getElementById('pulse'); if (!el) return; let cv = el.querySelector('#rbc');
    if (!on) { if (cv) cv.remove(); if (this._rbRaf) { cancelAnimationFrame(this._rbRaf); this._rbRaf = 0; } if (this._rbWas) { this._rbWas = false; el.querySelectorAll('.mk').forEach((m) => { m.style.left = ''; m.style.top = ''; }); this._pg.pulse = ''; } return; }
    this._rbWas = true; if (!cv) { cv = document.createElement('canvas'); cv.id = 'rbc'; el.insertBefore(cv, el.firstChild); }
    const cw = cv.clientWidth, ch = cv.clientHeight, R = Math.min(cw, ch) * .33;
    el.querySelectorAll('.mk').forEach((m, k) => { const a = (-45 + 90 * k) * Math.PI / 180; m.style.left = (cv.offsetLeft + cw / 2 + Math.cos(a) * R) + 'px'; m.style.top = (cv.offsetTop + ch / 2 + Math.sin(a) * R) + 'px'; });
    if (this._rbRaf) return;
    const TP = Math.PI * 2, parts = []; for (let n = 0; n < 70; n++) parts.push({a: Math.random() * TP, v: (.04 + Math.random() * .12) * (n % 2 ? 1 : -1), o: (Math.random() * 2 - 1), s: .6 + Math.random() * 1.3, p: Math.random() * TP});
    const hex = (c) => { const n = parseInt(String(c).replace('#', ''), 16); return isNaN(n) ? [55, 214, 197] : [n >> 16 & 255, n >> 8 & 255, n & 255]; }, mix = (a, b, f) => 'rgb(' + [0, 1, 2].map((i) => Math.round(a[i] * (1 - f) + b[i] * f)).join(',') + ')';
    let last = 0, gk = '', gr = null; const rgb = (a) => 'rgb(' + a.join(',') + ')';
    const frame = (ts) => {
      this._rbRaf = requestAnimationFrame(frame); const c = (this.shadowRoot.getElementById('pulse') || document.createElement('div')).querySelector('#rbc'); if (!c) { cancelAnimationFrame(this._rbRaf); this._rbRaf = 0; return; }
      const lite = this._liteU(), iv = lite ? 55 : 33, rt = this._root; if (document.hidden || (rt && (rt.classList.contains('busy') || rt.classList.contains('scr'))) || ts - last < iv) return; last = ts; this._rbN = (this._rbN || 0) + 1;   /* pod widokami/panelami i przy przewijaniu wstega stoi (oszczednosc CPU) */
      const dpr = Math.min(2, window.devicePixelRatio || 1), w = c.clientWidth, h = c.clientHeight; if (w < 40) return; if (c.width !== (w * dpr | 0)) { c.width = w * dpr | 0; c.height = h * dpr | 0; gk = ''; }
      const ctx = c.getContext('2d'), M = this._pM || [], N = lite ? 14 : 36, P = lite ? 70 : 120, cx = w / 2, cy = h / 2, R0 = Math.min(w, h) * .37, Wd = R0 * .34, tm = ts / 1000 * (this._pAlarm ? 1.5 : 1);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, w, h); ctx.globalCompositeOperation = 'lighter'; ctx.lineWidth = 1;
      const mode = this._pRibMorph(); let m = 0; if (mode) { const t0 = ts / 1000 % 24, ss = (x) => x * x * (3 - 2 * x); m = t0 < 13 ? 0 : t0 < 14.8 ? ss((t0 - 13) / 1.8) : t0 < 19.3 ? 1 : t0 < 21.1 ? 1 - ss((t0 - 19.3) / 1.8) : 0; if (this._rbHold !== undefined) m = this._rbHold; }   /* cykl 24 s: wstega, przejscie, znak statusu (ok. 4,5 s), powrot */
      const stLv = this._pStat(), SCc = [[63, 224, 165], [255, 194, 75], [255, 93, 115]][stLv], sm = m, gmq = Math.round(sm * 8) / 8, mixa = (a, b, f) => [0, 1, 2].map((q) => Math.round(a[q] * (1 - f) + b[q] * f));
      const pal = this._pRibPal(), key = M.map((m) => m.col).join(',') + w + pal.join(';') + gmq + stLv; if (key !== gk) { gk = key; const col = [0, 1, 2, 3].map((k) => (M[k] ? hex(M[k].col) : pal[k])), cc = col.map((x, k) => 'rgb(' + mixa(mixa(pal[k], x, this._pRibOn === 'std' ? .3 : .25), SCc, gmq * .85).join(',') + ')');
        if (ctx.createConicGradient) { gr = ctx.createConicGradient(0, cx, cy); const st = [[0, mix(hex('#000000'), [0, 0, 0], 0)], [.125, cc[1]], [.375, cc[2]], [.625, cc[3]], [.875, cc[0]], [1, cc[1]]]; st[0][1] = cc[0]; st.forEach((x) => gr.addColorStop(x[0], x[1])); } else { gr = ctx.createLinearGradient(cx - R0, cy, cx + R0, cy); gr.addColorStop(0, cc[3]); gr.addColorStop(1, cc[1]); } }
      ctx.strokeStyle = gr;
      { const co = 1 - .94 * m; if (Math.abs((this._rbCo === undefined ? 1 : this._rbCo) - co) > .02) { this._rbCo = co; const ct = c.parentNode && c.parentNode.querySelector('.ctr'); if (ct) ct.style.opacity = co.toFixed(2); } }   /* w fazie znaku statusu srodek (napis) przygasa */
      const bx = [], by = [], nx = [], ny = [];
      for (let j = 0; j <= P; j++) { const u = j / P, a2 = -Math.PI / 2 + u * TP, wob = 1 + .028 * Math.sin(2 * a2 + .7 * tm) + .02 * Math.sin(3 * a2 - .5 * tm);
        bx.push(cx + Math.cos(a2) * R0 * wob); by.push(cy + Math.sin(a2) * R0 * wob); }
      for (let j = 0; j <= P; j++) { const j0 = j === 0 ? P - 1 : j - 1, j1 = j === P ? 1 : j + 1, dx = bx[j1] - bx[j0], dy = by[j1] - by[j0], l = Math.hypot(dx, dy) || 1; nx.push(dy / l); ny.push(-dx / l); }
      const amp = 1;
      let SG = null, Nout = Math.round(N * .5), rem = N - Nout, nbar = stLv === 0 ? rem : Math.ceil(rem * .7);
      if (sm > 0) {   /* znak statusu: tarcza + (ptaszek | wykrzyknik) zbudowane z nitek; kolor wg stanu domu */
        const smp = (pts, closed) => { const n = pts.length, sg = [], cnt = closed ? n : n - 1; let tt = 0; for (let k = 0; k < cnt; k++) { const l = Math.hypot(pts[(k + 1) % n][0] - pts[k][0], pts[(k + 1) % n][1] - pts[k][1]); sg.push(l); tt += l; } return (u) => { let d = (closed ? ((u % 1) + 1) % 1 : Math.max(0, Math.min(1, u))) * tt; for (let k = 0; k < cnt; k++) { if (d <= sg[k] || k === cnt - 1) { const A = pts[k], B = pts[(k + 1) % n], f = Math.min(1, d / sg[k]); return [A[0] + (B[0] - A[0]) * f, A[1] + (B[1] - A[1]) * f]; } d -= sg[k]; } return pts[0]; }; };
        const circ = (cx2, cy2, r) => (u) => [cx2 + Math.cos(u * TP) * r, cy2 + Math.sin(u * TP) * r];
        const arr = (f) => { const X = [], Y = [], NX = [], NY = []; for (let j = 0; j <= P; j++) { const u = j / P, a = f(u), b2 = f(u + .004), c2 = f(u - .004), dx = b2[0] - c2[0], dy = b2[1] - c2[1], l = Math.hypot(dx, dy) || 1; X.push(cx + a[0] * R0 * .98); Y.push(cy + (a[1] - .02) * R0 * .98); NX.push(dy / l); NY.push(-dx / l); } return {x: X, y: Y, nx: NX, ny: NY}; };
        const rh = [[.35, -.94], [.7, -.83], [.88, -.68], [.9, -.4], [.88, -.05], [.8, .25], [.64, .52], [.4, .77]], shield = smp([[0, -1]].concat(rh, [[0, 1]], rh.slice().reverse().map((q) => [-q[0], q[1]])), true);
        SG = [Object.assign(arr(shield), {w: .36})];
        if (stLv === 0) SG.push(Object.assign(arr(smp([[-.4, .02], [-.1, .34], [.44, -.32]], false)), {w: .26}));
        else { SG.push(Object.assign(arr(smp([[0, -.5], [0, .12]], false)), {w: .28})); SG.push(Object.assign(arr(circ(0, .38, .09)), {w: .16})); }
      }
      for (let i = 0; i < N; i++) { const t = i / (N - 1) * 2 - 1, gi = !SG ? 0 : i < Nout ? 0 : (stLv === 0 || i - Nout < nbar) ? 1 : 2, gc = gi === 0 ? Nout : gi === 1 ? nbar : rem - nbar, gk2 = gi === 0 ? i : gi === 1 ? i - Nout : i - Nout - nbar, tg = gc > 1 ? gk2 / (gc - 1) * 2 - 1 : 0; ctx.beginPath(); ctx.globalAlpha = (.17 + .28 * (1 - Math.abs(t) * .75)) * (1 + 1.4 * sm);
        for (let j = 0; j <= P; j++) { const a2 = -Math.PI / 2 + j / P * TP, env = Math.sin(3 * a2 + 1.1 * tm + t * .55) * (.55 + .45 * Math.sin(2 * a2 - .6 * tm)), o = Wd * t * env * amp; let x = bx[j] + nx[j] * o, y = by[j] + ny[j] * o;
          if (SG) { const Gq = SG[gi], o2 = Wd * Gq.w * tg * (.7 + .3 * env); x = x * (1 - sm) + (Gq.x[j] + Gq.nx[j] * o2) * sm; y = y * (1 - sm) + (Gq.y[j] + Gq.ny[j] * o2) * sm; }
          j ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
        ctx.stroke(); }
      ctx.globalAlpha = 1; ctx.fillStyle = gr;
      for (let n = 0; n < (lite ? 24 : 70); n++) { const q = parts[n]; q.a += q.v * (iv / 1000); const u = ((q.a / TP) % 1 + 1) % 1, j = Math.round(u * P), o = Wd * q.o * 1.2 * amp, tw = .35 + .65 * Math.abs(Math.sin(tm * q.s + q.p)); ctx.globalAlpha = tw * .8 * (1 - sm); ctx.beginPath(); ctx.arc(bx[j] + nx[j] * o, by[j] + ny[j] * o, 1 + q.s * .5, 0, TP); ctx.fill(); }
      ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
    };
    this._rbRaf = requestAnimationFrame(frame);
  }
  _pHolo(on) {
    /* Hologram: standardowy Puls domu (4 luki: uwagi, powietrze, swiatla, komfort) jako pierscien 3D - elipsa z perspektywa, luki maja grubosc (ekstruzja), kolor i dlugosc jak w wersji plaskiej. Statyczny, rysowany przy zmianie danych. */
    const el = this.shadowRoot.getElementById('pulse'); if (!el) return;
    let cv = el.querySelector('#hlc');
    if (!on) { if (cv) { cv.remove(); this._pg.pulse = ''; } this._hlSig = ''; return; }
    if (!cv) { cv = document.createElement('canvas'); cv.id = 'hlc'; el.appendChild(cv); this._hlSig = ''; }
    const W = cv.clientWidth | 0, H = cv.clientHeight | 0, M = this._pM || []; if (W < 20 || !M.length) return;
    const TP = Math.PI * 2, rad = (d) => d * Math.PI / 180, Rx = Math.min(W * .34, H * .40), ky = .42, sc = Math.max(.7, Rx / 120), cx = W / 2, cy = H * .61, dp = 15 * sc, lw = 17 * sc, sx = W ? cv.clientWidth / W : 1;
    const A = (k) => -81 + k * 90, P = (deg, r) => [cx + Math.cos(rad(deg)) * (r || Rx), cy + Math.sin(rad(deg)) * (r || Rx) * ky];
    /* znaczniki kategorii na lukach (zawsze po przebudowie zawartosci pulsu) */
    el.querySelectorAll('.mk').forEach((m, k) => { const q = P(A(k) + 36); m.style.left = (cv.offsetLeft + q[0] * sx) + 'px'; m.style.top = (cv.offsetTop + (q[1] - dp / 2) * sx) + 'px'; });
    const sig = W + 'x' + H + JSON.stringify(M.map((m) => [m.col, m.f])); if (sig === this._hlSig && cv.width === W) return; this._hlSig = sig;
    if (cv.width !== W || cv.height !== H) { cv.width = W; cv.height = H; }
    const ctx = cv.getContext('2d'); ctx.clearRect(0, 0, W, H); ctx.lineCap = 'round';
    const ell = (rx, col, lw2, glow, y0) => { ctx.beginPath(); ctx.ellipse(cx, cy + (y0 || 0), rx, rx * ky, 0, 0, TP); ctx.strokeStyle = col; ctx.lineWidth = lw2; ctx.shadowColor = col; ctx.shadowBlur = glow; ctx.stroke(); ctx.shadowBlur = 0; };
    /* podloga: siatka i neonowe obwodki pod pierscieniem */
    ctx.lineWidth = 1; for (let k = 1; k <= 3; k++) { ctx.beginPath(); ctx.ellipse(cx, cy + dp + 6, Rx * (.4 + k * .3), Rx * (.4 + k * .3) * ky, 0, 0, TP); ctx.strokeStyle = 'rgba(94,242,201,' + (.13 - k * .025).toFixed(3) + ')'; ctx.stroke(); }
    for (let k = 0; k < 16; k++) { const a = k / 16 * TP; ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * Rx * .3, cy + dp + 6 + Math.sin(a) * Rx * .3 * ky); ctx.lineTo(cx + Math.cos(a) * Rx * 1.3, cy + dp + 6 + Math.sin(a) * Rx * 1.3 * ky); ctx.strokeStyle = 'rgba(167,139,250,.10)'; ctx.stroke(); }
    ell(Rx * 1.28, 'rgba(167,139,250,.8)', 2.2, 16, dp + 6); ell(Rx * 1.18, 'rgba(228,220,255,.7)', 1.4, 10, dp + 6);
    const shade = (c, f) => { const n = parseInt(String(c).replace('#', ''), 16); if (isNaN(n)) return c; const r = Math.round((n >> 16 & 255) * f), g = Math.round((n >> 8 & 255) * f), b = Math.round((n & 255) * f); return 'rgb(' + r + ',' + g + ',' + b + ')'; };
    const arc = (a0, a1, col, glow) => { ctx.beginPath(); for (let d = a0; d <= a1 + .01; d += 2) { const q = P(d); d === a0 ? ctx.moveTo(q[0], q[1]) : ctx.lineTo(q[0], q[1]); } ctx.strokeStyle = col; ctx.shadowColor = col; ctx.shadowBlur = glow || 0; ctx.stroke(); ctx.shadowBlur = 0; };
    const draw = (k) => { const m = M[k], a0 = A(k), a1 = a0 + 72, e1 = a0 + 72 * Math.max(.04, Math.min(1, m.f));
      ctx.save(); ctx.lineWidth = lw;
      for (let y = dp; y > 0; y -= 2) { ctx.save(); ctx.translate(0, y); arc(a0, a1, 'rgba(70,74,92,.85)'); arc(a0, e1, shade(m.col, .42)); ctx.restore(); }   /* boczna sciana (grubosc) */
      arc(a0, a1, 'rgba(255,255,255,.13)'); arc(a0, e1, m.col, 18); ctx.lineWidth = lw * .28; arc(a0, e1, 'rgba(255,255,255,.55)');   /* wierzchnia powierzchnia + polysk */
      ctx.restore(); };
    [0, 3, 1, 2].forEach(draw);   /* najpierw luki tylne (gorne), potem przednie */
    this._hlGeo = {cx, cy, Rx, ky, sx, A};
    cv.onclick = (e) => { const g = this._hlGeo, r = cv.getBoundingClientRect(), x = (e.clientX - r.left) * (cv.width / r.width) - g.cx, y = (e.clientY - r.top) * (cv.height / r.height) - g.cy, rr = Math.hypot(x, y / g.ky) / g.Rx; if (rr < .55 || rr > 1.45) return; let d = Math.atan2(y / g.ky, x) * 180 / Math.PI; if (d < -90) d += 360; const k = [0, 1, 2, 3].find((i) => d >= g.A(i) - 9 && d <= g.A(i) + 81); if (k === undefined) return; e.stopPropagation(); this._pExp.add('M|' + k); this._pSheet('status'); };
  }
  _pJvFont() { try { if (document.getElementById('pulse-dseg')) return; const st = document.createElement('style'); st.id = 'pulse-dseg'; st.textContent = "@font-face{font-family:'DSEG7 Classic';src:url('/local/fonts/DSEG7Classic-Regular.woff2') format('woff2');font-display:swap}"; document.head.appendChild(st); } catch (e) { /* ignore */ } }
  _pMxRain(on) {
    const cv = this.shadowRoot.getElementById('mxr'); if (!cv) return;
    if (!on) { cv.style.display = 'none'; this._mxOn = false; clearTimeout(this._mxT); return; }
    cv.style.display = 'block'; if (this._mxOn) return; this._mxOn = true;
    const ctx = cv.getContext('2d'), CH = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789ABCDEF:.=*+-<>'.split('');
    let W = 0, H = 0, fs = 16, dr = [];
    const init = () => { W = this._root.clientWidth; H = this._root.clientHeight; fs = this._tb ? 22 : 16; cv.width = W; cv.height = H; ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H); dr = Array.from({length: Math.ceil(W / fs)}, () => -Math.floor(Math.random() * 40)); };
    const step = () => {
      if (!this._mxOn) return; const rt = this._root, lite = rt.classList.contains('lt');
      this._mxT = setTimeout(step, lite ? 110 : 55);
      if (document.hidden || rt.classList.contains('busy') || rt.classList.contains('scr') || this._ovK === 'sheet') return;   /* pod panelami i przy przewijaniu deszcz stoi (oszczednosc CPU) */
      if (rt.clientWidth !== W || rt.clientHeight !== H) init();
      ctx.fillStyle = 'rgba(0,0,0,.10)'; ctx.fillRect(0, 0, W, H); ctx.font = fs + 'px monospace';
      for (let i = 0; i < dr.length; i++) { const y = dr[i] * fs; if (y >= 0) { ctx.fillStyle = '#d6ffe4'; ctx.fillText(CH[(Math.random() * CH.length) | 0], i * fs, y); ctx.fillStyle = '#00d45a'; ctx.fillText(CH[(Math.random() * CH.length) | 0], i * fs, y - fs); } if (y > H && Math.random() > .975) dr[i] = 0; else dr[i]++; }
    };
    init(); step();
  }
  _pXmDeco(on) {
    const el = this.shadowRoot.getElementById('xm'); if (!el) return; if (!on) { if (el.innerHTML) el.innerHTML = ''; return; } if (el.innerHTML) return;
    const N = 17, COL = ['#ff4d5e', '#3fe0a5', '#ffd166', '#67b8ff'], bulbs = Array.from({length: N}, (_, i) => { const x = (i + .5) / N * 100, y = 5 + 26 * Math.abs(Math.sin(x / 100 * Math.PI * 4)), c = COL[i % 4]; return `<i class="xb" style="left:${x.toFixed(2)}%;top:${y.toFixed(1)}px;--bc:${c};animation-delay:-${((i * 7) % 11) / 5}s"></i>`; }).join('');
    const rn = (i, k) => Math.abs(Math.sin(i * 12.9898 + k * 78.233) * 43758.5453) % 1, flakes = Array.from({length: 16}, (_, i) => `<i class="xf" style="left:${(rn(i, 1) * 100).toFixed(1)}%;width:${(3 + rn(i, 2) * 4).toFixed(1)}px;height:${(3 + rn(i, 2) * 4).toFixed(1)}px;animation-duration:${(9 + rn(i, 3) * 9).toFixed(1)}s;animation-delay:-${(rn(i, 4) * 14).toFixed(1)}s;opacity:${(.45 + rn(i, 5) * .45).toFixed(2)}"></i>`).join('');
    el.innerHTML = `<svg class="xw" viewBox="0 0 1000 46" preserveAspectRatio="none"><path d="M0,5 Q62,40 125,5 T250,5 T375,5 T500,5 T625,5 T750,5 T875,5 T1000,5" fill="none" stroke="#0c1410" stroke-width="2.2"/></svg>${bulbs}<div class="xs">${flakes}</div>`;
  }
  _pRender() {
    if (this._pcOwn) { PC = this._pcOwn;  } else { PC = PC0;  }   /* karta bez wlasnego cfg zawsze uzywa ustawien z generatora (nie cudzych z innego dashboardu) */
    if (!this._hass || !this._hass.states) return;
    const xm = this._pXm(), mx = !xm && this._pMx(), jv = !xm && !mx && this._pJv(), gt = !xm && !mx && !jv && this._pGt(), thx = !xm && !mx && !jv && !gt ? this._pTh() : '', hs = xm ? {id: 'xmas', a: '#ff6b7a', b: '#3fe0a5', c: '#ffd166'} : thx ? Object.assign({id: thx}, PTHEMES[thx].hs) : gt ? {id: 'vice', a: '#ff3d9a', b: '#00e5d0', c: '#ffb347'} : jv ? {id: 'jarvis', a: '#00e5ff', b: '#4dd0ff', c: '#ffb703'} : mx ? {id: 'matrix', a: '#00ff6a', b: '#00c853', c: '#b6ffcf'} : this._pHs(), A = hs.a, B = hs.b, C = hs.c, rt = this._root; rt.classList.toggle('xm', xm); rt.classList.toggle('mx', mx); rt.classList.toggle('jv', jv); rt.classList.toggle('gt', gt); Object.keys(PTHEMES).forEach((k) => rt.classList.toggle('th-' + k, k === thx)); rt.classList.toggle('thx', !!thx); if (thx) this._pJvFont(); if (jv) this._pJvFont(); this._pXmDeco(xm); this._pFx(mx ? 'matrix' : thx ? PTHEMES[thx].fx : ''); this._pRibTid = xm ? 'xmas' : mx ? 'matrix' : jv ? 'jarvis' : gt ? 'vice' : thx || 'std'; this._pRibOn = thx === 'ribbon' ? 'th' : (this._pRibGet(this._pRibTid) ? 'std' : ''); this._pHoloOn = (thx === 'holo' || thx === 'tech3d') && !this._pRibOn; rt.classList.toggle('rbs', !!this._pRibOn); this._pClay(thx === 'tech3d'); rt.style.setProperty('--a', A); rt.style.setProperty('--b', B); rt.style.setProperty('--c', C);
    rt.classList.toggle('lite', this._liteU());
    if (Date.now() - (this._evAt || 0) > 300000) { this._evAt = Date.now(); this._loadEvents(); }
    if (Date.now() - (this._fcAt || 0) > 1800000) { this._fcAt = Date.now(); this._loadForecast(); }
    if (Date.now() - (this._skAt || 0) > 120000) { this._skAt = Date.now(); try { this._skS().forEach((q) => this._skLoad(q.k)); } catch (e) { /* ignore */ } }
    const d = new Date(), hr = d.getHours(), st0 = this._s(PC.out.weather) || '', night = st0 === 'clear-night' || this._s('sun.sun') === 'below_horizon', st = night && st0 === 'sunny' ? 'clear-night' : st0;
    const wx = WX[st] || ['mdi:weather-cloudy', st], ot = this._n(PC.out.t), oh = this._n(PC.out.h);
    const hello = hr < 5 ? 'Dobranoc' : hr < 12 ? 'Dzień dobry' : hr < 18 ? 'Miłego dnia' : 'Dobry wieczór';
    this._pSky(st, night);
    const fcH = ((this._fc || {}).h || []).filter((x) => new Date(x.datetime).getTime() >= Date.now() - 1800000).slice(0, 5), whr = fcH.length ? '<div class="wxh">' + fcH.map((x) => { const t = new Date(x.datetime), c = WX[x.condition] || ['mdi:weather-cloudy', '']; return `<span><small>${String(t.getHours()).padStart(2, '0')}:00</small><ha-icon icon="${c[0]}"></ha-icon><b>${Math.round(+x.temperature)}°</b></span>`; }).join('') + '</div>' : '';
    const xmc = this._pXm() ? (() => { const n = new Date(), y = n.getMonth() === 11 && n.getDate() > 26 || n.getMonth() === 0 ? n.getFullYear() + (n.getMonth() === 0 ? 0 : 1) : n.getFullYear(), w = new Date(y, 11, 24), dd = Math.ceil((w - new Date(n.getFullYear(), n.getMonth(), n.getDate())) / 86400000); return `<div class="xmc">🎄 ${n.getMonth() === 11 && n.getDate() >= 24 && n.getDate() <= 26 ? 'Wesołych Świąt!' : dd > 0 && dd < 330 ? 'do Wigilii: ' + dd + (dd === 1 ? ' dzień' : ' dni') : 'Wesołych Świąt!'}</div>`; })() : '';
    const wxTile = `<button class="wxo gl in" style="--i:1" data-a="go" data-go="pogoda"><div class="wfx">${this._pWfx || ''}</div><ha-icon icon="${wx[0]}"></ha-icon><b>${ot === null ? '—' : ot.toFixed(1).replace('.', ',') + '°'}</b><small>${esc(wx[1])}</small>${oh === null ? '' : `<span class="hm">💧 ${Math.round(oh)}%</span>`}</button>`;
    this._pSet('hero', `<div class="in" style="--i:0"><div class="hello">${hello}</div><div class="time" id="tm">--:--</div><div class="date" id="dt"></div>${xmc}</div>${wxTile}`);
    if (this._tb) this._pSet('wxt', wxTile);
    this._pSchool();
    this._pClock();
    /* puls domu */
    const iss = this._issues(), alOn = this._pAlOn(), maxSev = iss.reduce((m, i) => Math.max(m, i.sev), 0), air = this._pPm();
    const lAll = (PC.lightsOff || []), lOn = lAll.filter((e) => this._s(e) === 'on').length;
    const rooms = this._roomsL(), th = this._th(), hMin = th.hMin, hMax = th.hMax, f1 = (v) => v.toFixed(1).replace('.', ',');
    const badL = rooms.map((r) => { const t = r.t ? this._n(r.t) : null, h = r.h ? this._n(r.h) : null, w = []; if (t !== null && t < th.tMin) w.push('za zimno: ' + f1(t) + '°C'); else if (t !== null && t > th.tMax) w.push('za ciepło: ' + f1(t) + '°C'); if (h !== null && h < hMin) w.push('za sucho: ' + Math.round(h) + '%'); else if (h !== null && h > hMax) w.push('za wilgotno: ' + Math.round(h) + '%'); return w.length ? {r, w} : null; }).filter(Boolean), bad = badL.length;
    const emL = [], emE = {}; rooms.forEach((r) => { if (r.occ && this._s(r.occ) === 'off') (r.dev || []).forEach((x) => { if (!(x[3] && x[3].room) && !/hdmi/i.test(x[1] + ' ' + x[0]) && /^(light|switch)\./.test(x[0]) && this._s(x[0]) === 'on' && !emE[x[0]]) { emE[x[0]] = x[1] + ' (' + r.name + ')'; emL.push(emE[x[0]]); } }); });   /* swiatlo w pustym pokoju = jedyny "nietypowy" stan lamp */
    const lbl = {}; rooms.forEach((r) => (r.dev || []).forEach((x) => { lbl[x[0]] = x[1] + ' (' + r.name + ')'; }));   /* nazwy jak na kafelkach swiatel (Piec (Kuchnia)), bez dublowania z nazwa gniazdka */
    const onL = lAll.filter((e) => this._s(e) === 'on' && !emE[e]).map((e) => lbl[e] || String((this._hass.states[e] || {attributes: {}}).attributes.friendly_name || e));
    const issNames = iss.map((i) => i.text);
    const M = [
      {ic: 'mdi:shield-home-outline', col: alOn ? '#ff5d73' : maxSev >= 2 ? '#ff5d73' : maxSev === 1 ? '#ffc24b' : '#3fe0a5', f: alOn || maxSev >= 2 ? 1 : maxSev === 1 ? .66 : 1, t: 'Alarmy i ostrzeżenia', v: alOn ? 'ALARM: ' + this._alarmSrc() : iss.length ? iss.length + (iss.length === 1 ? ' uwaga: ' : ' uwagi: ') + issNames.join(', ') : 'wszystko w porządku', warn: alOn || iss.length > 0, det: iss.map((i) => [i.text, (i.cat || '') + (i.sub ? ' · ' + i.sub : '')])},
      {ic: 'mdi:leaf', col: air[1], f: air[2] === null ? .2 : Math.max(.18, Math.min(1, 1 - (air[2] / ((PC.pmLv || [10, 25, 35, 50])[3] * 1.4)))), t: 'Jakość powietrza', v: air[0] + (air[2] === null ? '' : ' · PM2.5 ' + Math.round(air[2]) + ' µg/m³'), warn: air[2] !== null && air[2] > (PC.pmLv || [10, 25, 35, 50])[1], det: [['PM2.5', air[2] === null ? 'brak danych' : Math.round(air[2]) + ' µg/m³'], ['Ocena', air[0]], ['Progi (µg/m³)', (PC.pmLv || [10, 25, 35, 50]).join(' / ')], ['Oczyszczacz', PC.purifier ? (this._s(PC.purifier) === 'on' ? 'pracuje' : 'wyłączony') : 'brak']]},
      {ic: 'mdi:lightbulb-outline', col: emL.length ? '#ff5d73' : !lOn ? '#3fe0a5' : lOn / Math.max(1, lAll.length) <= .25 ? '#ffd24b' : lOn / Math.max(1, lAll.length) <= .5 ? '#ffa24b' : '#ff7a5c', f: lAll.length && lOn ? Math.max(.1, 1 - lOn / lAll.length) : 1, t: 'Światła', v: emL.length ? 'świeci w pustym pokoju: ' + emL.join(', ') : lOn ? lOn + ' włączone: ' + onL.join(', ') : 'wszystkie zgaszone', warn: emL.length > 0, det: (emL.length ? emL.map((n) => [n, 'świeci, nikogo nie ma']) : []).concat(lOn ? onL.map((n) => [n, 'włączone']) : [['Wszystko', 'zgaszone']])},
      {ic: 'mdi:thermometer', col: bad ? '#ffa24b' : '#3fe0a5', f: bad ? .6 : 1, t: 'Komfort w pokojach', v: bad ? bad + ' poza normą: ' + badL.map((x) => x.r.name).join(', ') : 'w normie', warn: bad > 0, det: bad ? badL.map((x) => [x.r.name, x.w.join(', ')]).concat([['Norma', '18–26 °C, wilgotność ' + hMin + '–' + hMax + ' %']]) : [['Norma', '18–26 °C, wilgotność ' + hMin + '–' + hMax + ' %']]}];
    this._pM = M;
    const R = 92, cx = 120, cy = 120, rad = (a) => a * Math.PI / 180, pt = (a) => [cx + R * Math.cos(rad(a)), cy + R * Math.sin(rad(a))];
    const arcs = M.map((m, k) => { const a0 = -81 + k * 90, a1 = a0 + 72, e1 = a0 + 72 * m.f, p0 = pt(a0), p1 = pt(a1), pe = pt(e1), mid = pt((a0 + a1) / 2);
      return {track: `<path class="trk" d="M${p0[0].toFixed(1)} ${p0[1].toFixed(1)} A${R} ${R} 0 0 1 ${p1[0].toFixed(1)} ${p1[1].toFixed(1)}"/>`, arc: `<path class="arc" style="--k:${k};color:${m.col};stroke:${m.col}" pathLength="200" d="M${p0[0].toFixed(1)} ${p0[1].toFixed(1)} A${R} ${R} 0 0 1 ${pe[0].toFixed(1)} ${pe[1].toFixed(1)}"/>`, mk: `<div class="mk" style="left:${(mid[0] / 240 * 100).toFixed(1)}%;top:${(mid[1] / 240 * 100).toFixed(1)}%;color:${m.col}"><ha-icon icon="${m.ic}"></ha-icon></div>`}; });
    const worst = alOn ? '#ff5d73' : maxSev >= 2 ? '#ff5d73' : (maxSev === 1 || bad || emL.length) ? '#ffc24b' : '#3fe0a5';
    const PLn = (n, a, b, c) => n === 1 ? a : (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) ? b : c, gm = {};
    iss.forEach((i) => { const g = gm[i.cat] = gm[i.cat] || {n: 0, sev: 0, first: i}; g.n++; g.sev = Math.max(g.sev, i.sev); });
    const cc = Object.keys(gm).map((k) => ({lbl: k.toLowerCase(), n: gm[k].n, sev: gm[k].sev, k: k + '|' + gm[k].first.text}));   /* srodek pulsu: liczba pozycji w kategoriach (np. 3 swiatla, 2 klimat) zamiast listy nazw */
    if (lOn) cc.push({lbl: PLn(lOn, 'światło', 'światła', 'świateł'), n: lOn, sev: emL.length ? 1 : 0, k: 'M|2'});
    cc.sort((a, b) => b.sev - a.sev || b.n - a.n);
    const ccH = cc.length ? '<div class="cc">' + cc.slice(0, 4).map((c) => `<button type="button" class="s${c.sev}" data-a="status" data-k="${esc(c.k)}"><b>${c.n}</b> ${esc(c.lbl)}</button>`).join('') + (cc.length > 4 ? `<span>+${cc.length - 4}</span>` : '') + '</div>' : '';
    const ctr = alOn ? ['mdi:alarm-light', 'ALARM', esc(this._alarmSrc())] : iss.length ? ['mdi:shield-alert-outline', iss.length + (iss.length === 1 ? ' uwaga' : iss.length < 5 ? ' uwagi' : ' uwag'), esc(iss.map((i) => i.text).join(', ').slice(0, 60))] : ['mdi:shield-check-outline', 'Dom w porządku', 'wszystko pod kontrolą'];
    if (alOn && this._tb) { this._pSet('pulse', `<div class="alb"><ha-icon icon="mdi:alarm-light"></ha-icon><b>ALARM</b><small>${esc(this._alarmSrc())}</small><button data-a="alarmoff">WYŁĄCZ ALARM</button></div>`); this.shadowRoot.getElementById('pulse').classList.add('al'); if (!this._alPrev) { this._alPrev = 1; this._pCloseV(); this._pOv(null); } }
    else { this._alPrev = 0; this.shadowRoot.getElementById('pulse').classList.remove('al'); this._pSet('pulse', `<svg viewBox="0 0 240 240"><defs><radialGradient id="cg"><stop offset="0" stop-color="${worst}" stop-opacity=".34"/><stop offset="1" stop-color="${worst}" stop-opacity="0"/></radialGradient></defs><g class="wv w1"><path d="M233.0 120.0 L234.3 128.0 L234.8 136.1 L234.3 144.3 L232.4 152.2 L229.4 159.8 L225.4 166.9 L220.5 173.4 L215.1 179.4 L209.5 185.0 L203.9 190.4 L198.4 195.7 L193.1 201.1 L187.7 206.7 L182.3 212.3 L176.5 217.9 L170.2 223.0 L163.4 227.5 L156.1 231.1 L148.3 233.5 L140.2 234.7 L132.1 234.7 L124.0 233.8 L116.1 232.1 L108.4 230.0 L101.0 227.9 L93.6 225.8 L86.3 223.9 L78.8 222.0 L71.2 220.1 L63.5 217.9 L55.9 215.0 L48.6 211.4 L41.8 206.8 L35.9 201.3 L30.8 194.9 L26.7 187.8 L23.5 180.3 L21.0 172.7 L18.9 165.0 L17.1 157.5 L15.2 150.1 L13.2 142.7 L11.0 135.3 L8.9 127.8 L7.0 120.0 L5.7 112.0 L5.2 103.9 L5.7 95.7 L7.6 87.8 L10.6 80.2 L14.6 73.1 L19.5 66.6 L24.9 60.6 L30.5 55.0 L36.1 49.6 L41.6 44.3 L46.9 38.9 L52.3 33.3 L57.7 27.7 L63.5 22.1 L69.8 17.0 L76.6 12.5 L83.9 8.9 L91.7 6.5 L99.8 5.3 L107.9 5.3 L116.0 6.2 L123.9 7.9 L131.6 10.0 L139.0 12.1 L146.4 14.2 L153.7 16.1 L161.2 18.0 L168.8 19.9 L176.5 22.1 L184.1 25.0 L191.4 28.6 L198.2 33.2 L204.1 38.7 L209.2 45.1 L213.3 52.2 L216.5 59.7 L219.0 67.3 L221.1 75.0 L222.9 82.5 L224.8 89.9 L226.8 97.3 L229.0 104.7 L231.1 112.2 L233.0 120.0Z" style="stroke:var(--a)"/></g><g class="wv w2"><path d="M236.5 120.0 L235.1 128.0 L232.7 135.8 L229.7 143.3 L226.3 150.5 L222.9 157.5 L219.6 164.3 L216.4 171.3 L213.3 178.3 L210.1 185.5 L206.6 192.6 L202.5 199.6 L197.6 206.2 L191.9 212.0 L185.4 217.0 L178.2 220.9 L170.6 223.7 L162.6 225.5 L154.7 226.7 L146.8 227.3 L139.0 227.9 L131.4 228.4 L123.8 229.1 L116.2 230.0 L108.4 230.8 L100.4 231.3 L92.3 231.2 L84.2 230.3 L76.2 228.3 L68.7 225.1 L61.8 220.9 L55.5 215.6 L49.9 209.7 L45.0 203.3 L40.4 196.9 L36.1 190.4 L31.8 184.1 L27.4 177.9 L22.8 171.7 L18.2 165.3 L13.8 158.7 L9.8 151.6 L6.5 144.1 L4.3 136.3 L3.3 128.2 L3.5 120.0 L4.9 112.0 L7.3 104.2 L10.3 96.7 L13.7 89.5 L17.1 82.5 L20.4 75.7 L23.6 68.7 L26.7 61.7 L29.9 54.5 L33.4 47.4 L37.5 40.4 L42.4 33.8 L48.1 28.0 L54.6 23.0 L61.8 19.1 L69.4 16.3 L77.4 14.5 L85.3 13.3 L93.2 12.7 L101.0 12.1 L108.6 11.6 L116.2 10.9 L123.8 10.0 L131.6 9.2 L139.6 8.7 L147.7 8.8 L155.8 9.7 L163.8 11.7 L171.3 14.9 L178.2 19.1 L184.5 24.4 L190.1 30.3 L195.0 36.7 L199.6 43.1 L203.9 49.6 L208.2 55.9 L212.6 62.1 L217.2 68.3 L221.8 74.7 L226.2 81.3 L230.2 88.4 L233.5 95.9 L235.7 103.7 L236.7 111.8 L236.5 120.0Z" style="stroke:var(--b)"/></g><g class="wv w3"><path d="M229.5 120.0 L228.8 127.6 L228.1 135.2 L227.7 142.9 L227.1 150.7 L226.2 158.7 L224.8 166.6 L222.4 174.5 L219.1 181.9 L214.6 188.8 L209.2 194.8 L203.0 200.1 L196.1 204.6 L189.0 208.4 L181.9 211.7 L174.8 214.8 L167.8 218.0 L160.9 221.3 L154.0 224.7 L147.0 228.1 L139.6 231.3 L132.0 234.0 L124.0 235.9 L115.9 236.7 L107.8 236.3 L99.8 234.7 L92.1 231.9 L84.8 228.2 L78.0 224.0 L71.5 219.4 L65.2 214.8 L59.0 210.4 L52.8 206.1 L46.4 201.8 L39.9 197.4 L33.4 192.7 L27.2 187.4 L21.6 181.5 L16.9 174.8 L13.1 167.6 L10.6 159.8 L9.2 151.8 L8.7 143.7 L9.0 135.6 L9.7 127.7 L10.5 120.0 L11.2 112.4 L11.9 104.8 L12.3 97.1 L12.9 89.3 L13.8 81.3 L15.2 73.4 L17.6 65.5 L20.9 58.1 L25.4 51.2 L30.8 45.2 L37.0 39.9 L43.9 35.4 L51.0 31.6 L58.1 28.3 L65.2 25.2 L72.2 22.0 L79.1 18.7 L86.0 15.3 L93.0 11.9 L100.4 8.7 L108.0 6.0 L116.0 4.1 L124.1 3.3 L132.2 3.7 L140.2 5.3 L147.9 8.1 L155.2 11.8 L162.0 16.0 L168.5 20.6 L174.8 25.2 L181.0 29.6 L187.2 33.9 L193.6 38.2 L200.1 42.6 L206.6 47.3 L212.8 52.6 L218.4 58.5 L223.1 65.2 L226.9 72.4 L229.4 80.2 L230.8 88.2 L231.3 96.3 L231.0 104.4 L230.3 112.3 L229.5 120.0Z" style="stroke:var(--c)"/></g><circle class="core" cx="120" cy="120" r="76"/>${arcs.map((a) => a.track + a.arc).join('')}</svg>${arcs.map((a) => a.mk).join('')}
      <div class="ctr" data-a="status" data-k="${iss[0] ? esc(iss[0].cat + '|' + iss[0].text) : ''}" style="--pc:${worst}"><ha-icon icon="${ctr[0]}"></ha-icon><b>${ctr[1]}</b>${alOn ? `<small>${ctr[2]}</small>` : (ccH || '<small>wszystko pod kontrolą</small>')}</div>`); }
    this.shadowRoot.getElementById('pulse').classList.toggle('bad', alOn || maxSev >= 2);
    /* teraz */
    const ch = [], nw = this._nowItems();
    nw.forEach((x) => ch.push({ic: x.ic, t: x.t, sub: x.sub, col: x.eq ? '#3fe0a5' : x.ic.indexOf('door') >= 0 ? '#ffb340' : A, eq: x.eq, go: x.go, act: x.act}));
    const d0 = new Date(d.getFullYear(), d.getMonth(), d.getDate()), nx = (this._events || []).filter((e) => PC.cal.includes(e.cal) && e.s >= d0)[0];
    if (nx) { const dd = Math.round((new Date(nx.s.getFullYear(), nx.s.getMonth(), nx.s.getDate()) - d0) / 86400000), hm = nx.ad ? 'cały dzień' : String(nx.s.getHours()).padStart(2, '0') + ':' + String(nx.s.getMinutes()).padStart(2, '0'); ch.push({ic: 'mdi:calendar-star', t: nx.t, sub: (dd === 0 ? 'Dziś' : dd === 1 ? 'Jutro' : DAYS[nx.s.getDay()]) + ' · ' + hm, col: B, go: 'kalendarz'}); }
    this._pTdLists().filter((l) => !l.gen).forEach((l) => { const o = parseInt(this._s(l.e), 10) || 0; if (o > 0) ch.push({ic: 'mdi:format-list-checks', t: 'Zadania ' + l.n + ': ' + o + ' do zrobienia', sub: 'dotknij, aby odhaczyć', col: '#67e8f9', go: 'zadania'}); });
    let skn = 0; try { skn = this._skNew() || 0; } catch (e) { skn = 0; }
    if (skn > 0) ch.push({ic: 'mdi:school-outline', t: 'Szkoła: ' + skn + ' nowe', sub: 'dotknij, aby zobaczyć', col: '#ffb340', go: 'szkola', hot: 1});
    iss.filter((i) => i.sev >= 1).slice(0, 3).forEach((i) => ch.unshift({ic: i.icon, t: i.text, sub: i.sub || i.cat, col: i.sev >= 2 ? '#ff5d73' : '#ffc24b', hot: 1, go: 'status', k: i.cat + '|' + i.text}));
    const MX = this._tb ? 99 : (window.__pMX || 2), mo = this._pMore && this._pMore.chips, chv = mo ? ch : ch.slice(0, MX);
    this._pSet('chips', ch.length ? chv.map((c, i) => `<button class="chip gl in${c.hot ? ' hot' : ''}" style="--i:${i + 6};--cc:${c.col}" data-a="go" data-go="${esc(c.act === 'air' ? 'powietrze' : (c.go || 'status'))}"${c.k ? ` data-k="${esc(c.k)}"` : ''}><span class="ci"><ha-icon icon="${c.ic}"></ha-icon></span><span><b>${esc(c.t)}${c.eq ? '<span class="eqv"><i></i><i></i><i></i></span>' : ''}</b><small>${esc(c.sub || '')}</small></span></button>`).join('') + (ch.length > MX ? `<button class="mre" data-a="more" data-w="chips"><span>${mo ? 'Zwiń' : 'Pokaż jeszcze ' + (ch.length - MX)}</span><ha-icon icon="${mo ? 'mdi:chevron-up' : 'mdi:chevron-down'}"></ha-icon></button>` : '') : `<div class="chip gl in" style="--i:6;--cc:${A}"><span class="ci"><ha-icon icon="mdi:weather-night"></ha-icon></span><span><b>Spokojnie</b><small>Nic się teraz nie dzieje</small></span></div>`);
    /* pokoje */
    this._pSet('rooms', rooms.map((r, i) => { const p = this._pal(r.c), col = p[1], t = r.t ? this._n(r.t) : null, h = r.h ? this._n(r.h) : null, lx = r.lux ? this._n(r.lux) : null, on = r.occ && this._s(r.occ) === 'on';
      const dv = (r.dev || []).filter((x) => !(x[3] && x[3].room) && /^(light|switch)\./.test(x[0]) && !/hdmi/i.test(x[1] + ' ' + x[0])).slice(0, 4);
      const lamp = (r.dev || []).filter((x) => !(x[3] && x[3].room) && !/hdmi/i.test(x[1] + ' ' + x[0]) && /^(light|switch)\./.test(x[0]) && this._s(x[0]) === 'on'), lb = lamp.length ? `<ha-icon class="lbi" icon="mdi:lightbulb-on" title="Świeci: ${esc(lamp.map((x) => x[1]).join(', '))}"></ha-icon>` : '';
      const au = r.auto ? this._s(r.auto) : '', at = r.auto && au !== 'unavailable' ? `<button class="atb${au === 'on' ? ' on' : ''}" data-a="aut" data-e="${esc(r.auto)}" aria-label="Automatyczne gaszenie"><ha-icon icon="${au === 'on' ? 'mdi:timer-outline' : 'mdi:timer-off-outline'}"></ha-icon></button>` : '';
      const big = t !== null ? `<b>${t.toFixed(1).replace('.', ',')}<em>°C</em></b>` : lx !== null ? `<b><ha-icon icon="mdi:white-balance-sunny"></ha-icon>${Math.round(lx)}<em> lx</em></b>` : '<b>—</b>';   /* pokoj bez termometru (np. przedpokoj) pokazuje czujnik swiatla */
      return `<div class="rm gl in" style="--i:${i + 8};--rc:${col}" data-a="room" data-r="${esc(r.id)}"><div class="rh"><span class="ri"><ha-icon icon="${r.icon || 'mdi:home'}"></ha-icon></span><span class="rn">${esc(r.name)}</span>${lb}${at}${r.occ ? `<span class="occ${on ? ' on' : ''}"><i></i>${on ? 'ktoś jest' : 'pusto'}</span>` : ''}</div>
        <div class="rv">${big}${h === null ? '' : `<span>${Math.round(h)}<em> %</em></span>`}${t !== null && lx !== null && h === null ? `<span style="color:#ffd36b">${Math.round(lx)}<em> lx</em></span>` : ''}</div>
        </div>`; }).join(''));
    /* swiatla: wszystkie wlaczniki w jednym miejscu (dlugie przytrzymanie = jasnosc / kolor) */
    const seen = new Set(), LP = []; (PC.rooms || []).forEach((r) => (r.dev || []).forEach((x) => { if (/^(light|switch)\./.test(x[0]) && !(x[3] && x[3].room) && !/hdmi/i.test(x[1] + ' ' + x[0]) && !seen.has(x[0]) && this._hass.states[x[0]]) { seen.add(x[0]); LP.push([x[0], x[1], /(piec|blat)/.test(x[0]) ? 'mdi:led-strip-variant' : x[2], r.name]); } }));
    (PC.lightsOff || []).forEach((e) => { if (!seen.has(e) && this._hass.states[e]) { seen.add(e); LP.push([e, String(this._hass.states[e].attributes.friendly_name || e), 'mdi:lightbulb-outline', '']); } });
    const nOn = LP.filter((x) => this._s(x[0]) === 'on').length; this._pLP = LP; const dl = this.shadowRoot.getElementById('dlt'); if (dl) dl.classList.toggle('lit', nOn > 0);
    this._pSet('secl', 'Światła · ' + (nOn ? nOn + ' włączone' : 'zgaszone') + `<button class="lof${nOn ? ' on' : ''}" data-a="lightsoff"><ha-icon icon="mdi:lightbulb-off-outline"></ha-icon>Zgaś światła</button>`);
    const lpPos = {};   /* tablet: pomieszczenia z wieloma swiatlami w kolumnach (2 pierwsze rzedy), pojedyncze swiatla w ostatnim rzedzie */
    if (this._tb) { const G = {}; LP.forEach((x) => { (G[x[3] || x[0]] = G[x[3] || x[0]] || []).push(x); }); const gs = Object.keys(G), mu = gs.filter((k) => G[k].length > 1), sg = gs.filter((k) => G[k].length === 1), cs = mu.length ? Math.max(1, Math.floor(6 / mu.length)) : 6;
      mu.forEach((k, gi) => G[k].forEach((x, i) => { lpPos[x[0]] = `grid-column:${gi * cs + 1} / span ${cs};grid-row:${i + 1}`; }));
      const rw = mu.length ? 3 : 1, ss = sg.length ? Math.max(1, Math.floor(6 / sg.length)) : 6; sg.forEach((k, gi) => { lpPos[G[k][0][0]] = `grid-column:${gi * ss + 1} / span ${ss};grid-row:${rw}`; }); }
    this._pSet('lts', LP.map((x) => `<button class="lp${this._s(x[0]) === 'on' ? ' on' : ''}" ${lpPos[x[0]] ? `style="${lpPos[x[0]]}" ` : ''}data-a="tg" data-e="${esc(x[0])}"><ha-icon icon="${x[2] || 'mdi:lightbulb-outline'}"></ha-icon><span><b>${esc(x[1])}</b>${(x[3] || this._pBp(x[0])) ? `<small>${this._pBp(x[0]) ? `<em class="bp">${this._pBp(x[0])}</em>` : ''}${x[3] && this._pBp(x[0]) ? ' · ' : ''}${esc(x[3] || '')}</small>` : ''}</span></button>`).join(''));
    /* szybkie akcje */
    const pur = PC.purifier, purOn = pur && this._s(pur) === 'on', mu = this._mute(), muOn = mu && this._s(mu) === 'on', T = this._mplTargets();
    this._pSet('qa', `<button class="qb gl in${lOn ? ' on' : ''}" style="--i:10;--qc:#ffc24b" data-a="lightsoff"><ha-icon icon="mdi:lightbulb-off-outline"></ha-icon><span><b>Zgaś światła</b><small>${lOn ? lOn + ' włączone' : 'wszystko zgaszone'}</small></span></button>
      ${pur ? `<button class="qb gl in${purOn ? ' on' : ''}" style="--i:11;--qc:#3fe0a5" data-a="purifier"><ha-icon icon="mdi:air-purifier"></ha-icon><span><b>Oczyszczacz</b><small>${purOn ? 'pracuje' : 'wyłączony'}</small></span></button>` : ''}
      ${mu ? `<button class="qb gl in${muOn ? ' on' : ''}" style="--i:12;--qc:#ff7a8a" data-a="mute"><ha-icon icon="${muOn ? 'mdi:microphone-off' : 'mdi:microphone-outline'}"></ha-icon><span><b>Cisza</b><small>asystent ${muOn ? 'wyciszony' : 'słucha'}</small></span></button>` : ''}
      <button class="qb gl in${T.eids.length ? ' on' : ''}" style="--i:13;--qc:${B}" data-a="radio"><ha-icon icon="mdi:radio"></ha-icon><span><b>${T.eids.length ? 'Zatrzymaj radio' : 'Radio'}</b><small>${T.eids.length ? esc(T.title || 'gra') : 'otwórz odtwarzacz'}</small></span></button>`);
    /* orb asystenta + alarm */
    const ast = this._s(this._sat()), orb = this.shadowRoot.getElementById('orb'); ['listening', 'processing', 'responding'].forEach((k) => orb.classList.toggle('st-' + k[0], ast === k));
    const alm = this.shadowRoot.getElementById('alm'); alm.classList.toggle('on', alOn && !this._tb);
    if (alOn) this._pSet('alm', `<ha-icon icon="mdi:alarm-light"></ha-icon><b>ALARM</b><small>${esc(this._alarmSrc())}</small><button data-a="alarmoff">WYŁĄCZ ALARM</button>`);
    this._pRib(!!this._pRibOn); this._pHolo(!!this._pHoloOn);   /* pierscien widma 3D tylko w motywie Hologram (po przebudowie zawartosci pulsu canvas jest dokladany od nowa) */
    if (!this._doneT) this._doneT = setTimeout(() => rt.classList.add('done'), 2600);
    if (this._ovK === 'sheet' && this._shF && !(this._shF === 'evform' || this._shF === 'msg' || this._shF === 'gmsg') && !(this._shF === 'light' && (this._lDrag || (this.shadowRoot.activeElement && this.shadowRoot.activeElement.type === 'range')))) this._pSheet(this._shF);
    if (this._vw) this._pVRender();
  }
  _pSky(st, night) {
    const xm = this._pXm(), key = st + (night ? 'n' : 'd') + (xm ? 'x' : ''); if (key === this._fxK) return; this._fxK = key;
    const sky = this.shadowRoot.getElementById('sky'), fx = this.shadowRoot.getElementById('fx'), rn = (i, k) => Math.abs(Math.sin(i * 12.9898 + k * 78.233) * 43758.5453) % 1;
    const cloudy = /cloud|fog|rain|pour|lightning|hail|snow/.test(st);
    const top = night ? (cloudy ? '#0a0f1c' : '#050a18') : (cloudy ? '#2a3a52' : '#14507a'), bot = night ? (cloudy ? '#101828' : '#0a1330') : (cloudy ? '#18222f' : '#0b2a45');
    sky.style.background = xm ? 'linear-gradient(180deg,#0a1c14 0%,#12301f 52%,#2a1016 100%)' : 'linear-gradient(180deg,' + top + ' 0%,' + bot + ' 70%,#050912 100%)';
    const P = (n, f) => Array.from({length: n}, (_, i) => f(i)).join(''); let h = '';
    if (night && !cloudy) h += P(16, (i) => `<i class="st" style="left:${(rn(i, 1) * 100).toFixed(1)}%;top:${(rn(i, 2) * 85).toFixed(1)}%;animation-delay:-${(rn(i, 3) * 3).toFixed(1)}s;width:${rn(i, 4) > .8 ? 3 : 2}px;height:${rn(i, 4) > .8 ? 3 : 2}px"></i>`);
    if (!night && !cloudy) h += '<i class="sun"></i>';
    if (cloudy) h += P(3, (i) => `<i class="cl" style="top:${(rn(i, 5) * 60).toFixed(0)}%;animation-duration:${(14 + rn(i, 6) * 12).toFixed(0)}s;animation-delay:-${(rn(i, 7) * 20).toFixed(0)}s"></i>`);
    if (/rain|pour|lightning|hail/.test(st)) h += P(/pour/.test(st) ? 22 : 13, (i) => `<i class="dr" style="left:${(rn(i, 8) * 105).toFixed(1)}%;animation-duration:${(0.6 + rn(i, 9) * 0.5).toFixed(2)}s;animation-delay:-${(rn(i, 10) * 2).toFixed(2)}s"></i>`);
    if (/snow/.test(st)) h += P(16, (i) => `<i class="sn" style="left:${(rn(i, 11) * 100).toFixed(1)}%;animation-duration:${(3 + rn(i, 12) * 3).toFixed(1)}s;animation-delay:-${(rn(i, 13) * 9).toFixed(1)}s;transform:scale(${(0.6 + rn(i, 14) * 0.9).toFixed(2)})"></i>`);
    if (/fog/.test(st)) h += P(3, (i) => `<i class="fg" style="top:${22 + i * 22}%;animation-duration:${12 + i * 5}s"></i>`);
    if (/lightning/.test(st)) h += '<i class="fl"></i>';
    this._pWfx = h; fx.innerHTML = '';
  }
  _pToast(t) { const el = this.shadowRoot.getElementById('toast'); el.textContent = t; el.classList.add('on'); clearTimeout(this._ttT); this._ttT = setTimeout(() => el.classList.remove('on'), 2200); }
  _pTvApply() {   /* Program TV: filtr grup kanalow (chipy nad lista); wybor zapamietany */
    const c = this._tvCfg, el = this._tvEl; if (!c || !el || !el.isConnected) return; let g = 'all'; try { g = localStorage.getItem('pulse_tvg') || 'all'; } catch (e) { g = 'all'; }
    if (g !== 'all' && !c.sections.some((x) => x.title === g)) g = 'all'; const secs = g === 'all' ? c.sections : c.sections.filter((x) => x.title === g);
    const bar = this.shadowRoot.getElementById('tvg'); if (bar) bar.innerHTML = [['all', 'Wszystkie']].concat(c.sections.map((x) => [x.title, x.title])).map((x) => `<button class="${g === x[0] ? 'on' : ''}" data-a="tvg" data-g="${esc(x[0])}">${esc(x[1])}</button>`).join('');
    try { el.setConfig(Object.assign({}, c, {sections: secs, height: '100%'})); el.hass = this._hass; } catch (e) { /* ignore */ }   /* karta wypelnia kontener (flex), ktory konczy sie nad dokiem */
  }
  async _pEvDo(m) {
    const e = this._pEvSel; if (!e) return; const msg = {type: 'calendar/event/delete', entity_id: e.cal, uid: e.uid};
    if (e.rid && m === 'one') msg.recurrence_id = e.rid; else if (e.rid && m === 'future') { msg.recurrence_id = e.rid; msg.recurrence_range = 'THISANDFUTURE'; }
    try { await this._hass.callWS(msg); this._pOv(null); this._pToast('Usunięto wydarzenie'); this._pMev = {}; await this._loadEvents(); if (this._vw && this._vw.k === 'kalendarz') this._pVRender(true); } catch (err) { this._pToast('Błąd: ' + ((err && err.message) || err)); }
  }
  _pMsgBind(f) {
    const r = (PC.rooms || []).find((x) => x.id === this._msgRoom), q = (id) => f.querySelector('#' + id), ta = q('mt'), mm = q('mm'); if (!r || !ta) return;
    const upd = () => { q('mc').textContent = ta.value.length + ' / 200'; }; ta.oninput = upd; setTimeout(() => ta.focus(), 60);
    f.querySelectorAll('[data-q]').forEach((b) => { b.onclick = () => { ta.value = b.dataset.q; upd(); ta.focus(); }; });
    f.onsubmit = async (x) => {
      x.preventDefault(); let t = ta.value.trim(); mm.style.color = ''; if (!t) { mm.textContent = 'Wpisz treść wiadomości'; return; }
      const orig = t; if (q('ma').checked) t = t.replace(/[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g, (c) => ({'ą': 'a', 'ć': 'c', 'ę': 'e', 'ł': 'l', 'ń': 'n', 'ó': 'o', 'ś': 's', 'ź': 'z', 'ż': 'z', 'Ą': 'A', 'Ć': 'C', 'Ę': 'E', 'Ł': 'L', 'Ń': 'N', 'Ó': 'O', 'Ś': 'S', 'Ź': 'Z', 'Ż': 'Z'}[c]));
      try { localStorage.setItem('pastel_msg_ascii', q('ma').checked ? '1' : '0'); } catch (e) { /* ignore */ }
      mm.textContent = 'Wysyłam…';
      try {
        await this._hass.callService('mqtt', 'publish', {topic: r.msg, payload: t, qos: 0, retain: false});
        try { const H = JSON.parse(localStorage.getItem('pastel_msg_hist') || '{}'); H[r.id] = [orig].concat((H[r.id] || []).filter((y) => y !== orig)).slice(0, 8); localStorage.setItem('pastel_msg_hist', JSON.stringify(H)); } catch (e) { /* ignore */ }
        this._pOv(null); this._pToast('Wysłano na panel ✓');
      } catch (e) { mm.textContent = 'Nie udało się wysłać: ' + ((e && e.message) || e); }
    };
  }
  _pEvBind(f) {
    const q = (id) => f.querySelector('#' + id), m = (t) => { q('ef_m').textContent = t; };
    const ad = () => { const h = q('ef_ad').checked; q('ef_t1').parentNode.style.display = q('ef_t2').parentNode.style.display = h ? 'none' : ''; }; q('ef_ad').onchange = ad; ad();
    const WD = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'], sel = new Set(), UN = {DAILY: 'dni', WEEKLY: 'tyg.', MONTHLY: 'mies.', YEARLY: 'lat'};
    const defWd = () => { const d = q('ef_d1').value; if (!d) return; const w = WD[new Date(d + 'T00:00:00').getDay()]; if (!sel.size) sel.add(w); paint(); };
    const paint = () => f.querySelectorAll('[data-wd]').forEach((b) => b.classList.toggle('on', sel.has(b.dataset.wd)));
    const rep = () => { const r = q('ef_rep').value; q('ef_rb').style.display = r ? '' : 'none'; q('ef_wd').style.display = r === 'WEEKLY' ? '' : 'none'; q('ef_ivl').textContent = UN[r] || ''; if (r === 'WEEKLY') defWd(); };
    q('ef_rep').onchange = rep; q('ef_end').onchange = () => { q('ef_ul').style.display = q('ef_end').value ? '' : 'none'; };
    f.querySelectorAll('[data-wd]').forEach((b) => b.onclick = () => { sel.has(b.dataset.wd) ? sel.delete(b.dataset.wd) : sel.add(b.dataset.wd); paint(); });
    f.onsubmit = async (x) => { x.preventDefault(); const title = q('ef_t').value.trim(), d1 = q('ef_d1').value, d2 = q('ef_d2').value || d1, t1 = q('ef_t1').value, t2 = q('ef_t2').value, all = q('ef_ad').checked;
      if (!title) return m('Podaj tytuł'); if (!d1) return m('Podaj datę');
      const data = {summary: title}; const loc = q('ef_l').value.trim(), desc = q('ef_o').value.trim(); if (loc) data.location = loc; if (desc) data.description = desc;
      if (all) { if (d2 < d1) return m('Koniec przed początkiem'); const z = new Date(d2 + 'T00:00:00'); z.setDate(z.getDate() + 1); data.start_date = d1; data.end_date = z.getFullYear() + '-' + String(z.getMonth() + 1).padStart(2, '0') + '-' + String(z.getDate()).padStart(2, '0'); }
      else { if (d2 + t2 <= d1 + t1) return m('Koniec musi być po początku'); data.start_date_time = d1 + ' ' + t1 + ':00'; data.end_date_time = d2 + ' ' + t2 + ':00'; }
      const fr = q('ef_rep').value; let rr = '';
      if (fr) { const iv = Math.max(1, parseInt(q('ef_iv').value, 10) || 1); rr = 'FREQ=' + fr + (iv > 1 ? ';INTERVAL=' + iv : ''); if (fr === 'WEEKLY') { if (!sel.size) return m('Wybierz dni tygodnia'); rr += ';BYDAY=' + WD.slice(1).concat('SU').filter((w) => sel.has(w)).filter((w, i, a) => a.indexOf(w) === i).join(','); }
        if (q('ef_end').value) { const u = q('ef_until').value; if (!u || u < d1) return m('Ostatni dzień przed początkiem'); rr += ';UNTIL=' + u.replace(/-/g, '') + (all ? '' : 'T235959'); } }
      m('Zapisuję…');
      try { if (rr) { const ev = {summary: title, dtstart: all ? data.start_date : data.start_date_time, dtend: all ? data.end_date : data.end_date_time, rrule: rr}; if (data.location) ev.location = data.location; if (data.description) ev.description = data.description; await this._hass.callWS({type: 'calendar/event/create', entity_id: q('ef_c').value, event: ev}); } else await this._hass.callService('calendar', 'create_event', data, {entity_id: q('ef_c').value}); this._pOv(null); this._pToast('Dodano wydarzenie'); await this._loadEvents(); if (this._vw && this._vw.k === 'kalendarz') this._pVRender(true); }
      catch (err) { m('Błąd: ' + ((err && err.message) || err)); }
    };
  }
  _pBusy() { const r = this.shadowRoot.getElementById('root'); if (r) { r.classList.toggle('busy', !!(this._ovK || this._vw)); r.querySelectorAll('#dock [data-v]').forEach((b) => b.classList.toggle('on', !!this._vw && b.dataset.v === this._vw.k)); } }
  _pOv(kind) {
    const ov = this.shadowRoot.getElementById('ov'), menu = this.shadowRoot.getElementById('menu'), sh = this.shadowRoot.getElementById('sh'), rmn = this.shadowRoot.getElementById('rmn');
    this._ovK = kind; ov.classList.toggle('on', !!kind); menu.style.display = kind === 'menu' ? '' : 'none'; sh.style.display = kind === 'sheet' ? '' : 'none'; rmn.style.display = (kind === 'rmenu' || kind === 'more') ? '' : 'none';
    const T = (i, on) => { const e = this.shadowRoot.getElementById(i); if (e) e.classList.toggle('on', on); }; T('dmenu', kind === 'menu' || kind === 'more'); T('drm', kind === 'rmenu'); T('dlt', kind === 'sheet' && this._shF === 'lights');
    if (!kind) this._shF = null;
    this._pBusy();
  }
  _pMenu(small) {
    const f2 = (x) => x.toFixed(2).replace('.', ','), NW = (() => { try { return this._scNews('home') || {}; } catch (e) { return {}; } })(), skn = (() => { try { return this._skNew() || 0; } catch (e) { return 0; } })();
    const fu = (PC.fuel || []).map(([nm, dd, jj]) => { const pd = this._n(dd), pj = this._n(jj); if (pd === null) return ''; const df = pj === null ? 0 : pj - pd; return `<div class="fu gl"><small>${esc(nm)}</small><b>${f2(pd)}<em style="font-size:10px;opacity:.6"> zł</em></b><span class="${df > .004 ? 'up' : df < -.004 ? 'dn' : ''}">${Math.abs(df) > .004 ? (df > 0 ? '▲ ' : '▼ ') + f2(pj) : 'bez zmian'}</span></div>`; }).join('');
    const hs = this._pHs(), cols = [hs.a, hs.b, hs.c, '#ffb340', '#3fe0a5', '#67b8ff'];
    const L = [['mdi:school-outline', 'Szkoła', 'szkola', skn > 0], ['mdi:weather-partly-cloudy', 'Pogoda', 'pogoda'], ['mdi:calendar-month-outline', 'Kalendarz', 'kalendarz'], ['mdi:thermometer', 'Klimat', 'klimat'], ['mdi:leaf', 'Powietrze', 'powietrze'],
      ['mdi:battery-heart-variant', 'Baterie', 'baterie', !!NW.baterie], ['mdi:play-box-outline', 'Multimedia', 'multimedia']];
    if (this._radioAvail()) L.push(['mdi:radio', 'Radio', 'radio', !!NW.radioPlay]);
    L.push(['mdi:television-guide', 'Program TV', 'tv']);
    if (this._pTdLists().length) L.push(['mdi:format-list-checks', 'Zadania', 'zadania']);
    if (PC.guard && PC.guard.length) L.push(['mdi:shield-lock-outline', 'Aurora Guard', 'guard']);
    L.push(['mdi:text-box-search-outline', 'Historia', 'historia', !!NW.dziennik], ['mdi:server', 'Serwer', 'serwer']);
    if (PC.f1 && PC.f1.on) L.push(['mdi:flag-checkered', 'Formuła 1', 'f1', !!NW.f1]);
    L.push(['mdi:creation', 'Asystent', 'asystent'], ['mdi:cog-outline', 'Ustawienia', 'ustawienia'], ['mdi:home-assistant', 'Menu HA', 'hamenu']);
    { const nv = this._pNav(), dk = this._pDockIds(), IN = this._tb ? (nv.tdock ? dk.concat(['asystent', 'kalendarz', 'ustawienia']) : ['szkola', 'pogoda', 'kalendarz', 'klimat', 'powietrze', 'multimedia', 'radio', 'asystent', 'ustawienia', 'historia']) : dk;
      for (let i = L.length - 1; i >= 0; i--) if (IN.indexOf(L[i][2]) >= 0) L.splice(i, 1);   /* widoki z docka nie powtarzaja sie w menu */
      if (Array.isArray(nv.menu)) { const keep = (id) => nv.menu.indexOf(id) >= 0 || id === 'ustawienia' || id === 'hamenu'; for (let i = L.length - 1; i >= 0; i--) if (!keep(L[i][2])) L.splice(i, 1); const ix = (id) => { const k = nv.menu.indexOf(id); return k < 0 ? 900 : k; }; L.sort((a, b) => ix(a[2]) - ix(b[2])); } }
    if (small) {
      this.shadowRoot.getElementById('rmn').innerHTML = '<h3>Więcej</h3>' + (fu ? `<div class="fl3" style="margin-bottom:14px">${fu}</div>` : '') + `<div class="rg">${L.map((x, i) => `<button class="rt" style="--i:${i};--rc:${cols[i % cols.length]}" data-a="go" data-go="${esc(x[2])}"><span class="ri"><ha-icon icon="${x[0]}"></ha-icon>${x[3] ? '<i class="od"></i>' : ''}</span><span><b>${esc(x[1])}</b></span></button>`).join('')}</div>`;
      this._pOv('more'); return;
    }
    this.shadowRoot.getElementById('menu').innerHTML = (fu ? `<h3>Paliwa (maks.)</h3><div class="fl3">${fu}</div>` : '') + `<h3 style="margin-top:18px">Wszystko inne</h3><div class="bub">${L.map((x, i) => `<button class="bu" style="--i:${i};--bc:${cols[i % cols.length]}" data-a="go" data-go="${esc(x[2])}"><span class="bi"><ha-icon icon="${x[0]}"></ha-icon>${x[3] ? '<i></i>' : ''}</span><span>${esc(x[1])}</span></button>`).join('')}</div>`;
    this._pOv('menu');
  }
  _pRoomsMenu() {
    const rooms = this._roomsL(), hs = this._pHs();
    this.shadowRoot.getElementById('rmn').innerHTML = `<h3>Pomieszczenia</h3><div class="rg">${rooms.map((r, i) => { const p = this._pal(r.c), t = r.t ? this._n(r.t) : null, lx = r.lux ? this._n(r.lux) : null, on = r.occ && this._s(r.occ) === 'on';
      const lon = (r.dev || []).filter((x) => /^(light|switch)\./.test(x[0]) && this._s(x[0]) === 'on').length;
      return `<button class="rt" style="--i:${i};--rc:${p[1]}" data-a="room" data-r="${esc(r.id)}"><span class="ri"><ha-icon icon="${r.icon || 'mdi:home'}"></ha-icon></span><span><b>${esc(r.name)}</b><small>${t !== null ? t.toFixed(1).replace('.', ',') + '°C' : lx !== null ? Math.round(lx) + ' lx' : '—'}${lon ? ' · ' + lon + ' 💡' : ''}</small></span>${on ? '<i class="od"></i>' : ''}</button>`; }).join('')}
      <button class="rt all" style="--i:${rooms.length};--rc:${hs.a}" data-a="go" data-go="klimat"><span class="ri"><ha-icon icon="mdi:thermometer-lines"></ha-icon></span><span><b>Klimat w całym domu</b><small>temperatury, wilgotność, wykresy</small></span></button></div>`;
    this._pOv('rmenu');
  }
  _pSheet(kind) {
    const sh = this.shadowRoot.getElementById('sh'); let h = '<div class="gp"></div>';
    if (kind === 'events') {
      const now = new Date(), d0 = new Date(now.getFullYear(), now.getMonth(), now.getDate()), list = (this._events || []).filter((e) => PC.cal.includes(e.cal) && e.s >= d0).slice(0, 10);
      h += '<h2>Najbliższe wydarzenia</h2>' + (list.length ? list.map((e) => { const hm = e.ad ? 'Cały dzień' : String(e.s.getHours()).padStart(2, '0') + ':' + String(e.s.getMinutes()).padStart(2, '0'), dd = Math.round((new Date(e.s.getFullYear(), e.s.getMonth(), e.s.getDate()) - d0) / 86400000);
        return `<div class="ev"><div class="dt"><span><b>${e.s.getDate()}</b><small>${MONTHS[e.s.getMonth()].slice(0, 3)}</small></span></div><div><div class="tt">${esc(e.t)}</div><div class="wn">${dd === 0 ? 'Dziś' : dd === 1 ? 'Jutro' : DAYS[e.s.getDay()]} · ${hm}</div></div></div>`; }).join('') : '<div class="empty">Brak nadchodzących wydarzeń</div>')
        + '<button class="row" data-a="go" data-go="kalendarz" style="margin-top:12px"><ha-icon icon="mdi:calendar-month-outline"></ha-icon><div><b>Cały kalendarz</b><small>najbliższe tygodnie</small></div></button>';
    } else if (kind === 'light') {
      const e = this._lE, o = this._hass.states[e]; if (!o) return; const a = o.attributes || {}, M = a.supported_color_modes || [], on = o.state === 'on', br = a.brightness != null ? Math.round(a.brightness / 2.55) : (on ? 100 : 0);
      const hasBr = M.some((m) => m !== 'onoff'), hasCol = M.some((m) => ['hs', 'rgb', 'rgbw', 'rgbww', 'xy'].includes(m)), hasCt = M.includes('color_temp') || (hasCol && a.min_color_temp_kelvin), kmin = a.min_color_temp_kelvin || 2000, kmax = a.max_color_temp_kelvin || 6500;
      const SW = [['Czerwony', 0, 100], ['Pomarańczowy', 25, 100], ['Żółty', 50, 100], ['Zielony', 120, 100], ['Turkus', 175, 100], ['Niebieski', 220, 100], ['Fiolet', 270, 100], ['Róż', 320, 90], ['Biały', 0, 0]], hs = a.hs_color || [0, 0];
      h += `<h2>${esc(a.friendly_name || e)}</h2><div class="mpc"><button data-a="ltg" style="flex:none;width:100%;gap:8px;grid-auto-flow:column;color:${on ? 'var(--a)' : 'inherit'}"><ha-icon icon="mdi:lightbulb${on ? '-on' : '-outline'}"></ha-icon><b>${on ? 'Włączone · wyłącz' : 'Wyłączone · włącz'}</b></button></div>`
        + (hasBr ? `<div class="vc gl" style="margin-bottom:10px"><h4>Jasność <b id="lbv" style="float:right;opacity:.85">${br}%</b></h4><input type="range" min="1" max="100" value="${br || 1}" data-a="lbr" class="rng br"></div>` : '')
        + (hasCt ? `<div class="vc gl" style="margin-bottom:10px"><h4>Temperatura bieli <b id="lkv" style="float:right;opacity:.85">${a.color_temp_kelvin || ''}${a.color_temp_kelvin ? ' K' : ''}</b></h4><input type="range" min="${kmin}" max="${kmax}" step="50" value="${a.color_temp_kelvin || Math.round((kmin + kmax) / 2)}" data-a="lct" class="rng ct"><div style="display:flex;justify-content:space-between;font-size:11px;opacity:.6;margin-top:2px"><span>ciepła</span><span>zimna</span></div></div>` : '')
        + (hasCol ? `<div class="vc gl"><h4>Kolor</h4><div style="display:flex;flex-wrap:wrap;gap:12px;margin-top:6px">${SW.map((c) => `<button data-a="lcl" data-h="${c[1]}" data-s="${c[2]}" aria-label="${c[0]}" style="width:42px;height:42px;border-radius:50%;background:${c[2] ? `hsl(${c[1]},${c[2]}%,55%)` : '#fff'};border:3px solid ${on && (c[2] === 0 ? a.color_mode === 'color_temp' || a.color_mode === 'white' : a.color_mode !== 'color_temp' && Math.abs(hs[0] - c[1]) < 12 && Math.abs(hs[1] - c[2]) < 15) ? '#fff' : 'rgba(255,255,255,.18)'};box-shadow:0 0 14px ${c[2] ? `hsl(${c[1]},${c[2]}%,55%)` : 'rgba(255,255,255,.6)'}"></button>`).join('')}</div><input type="range" min="0" max="360" value="${Math.round(hs[0])}" data-a="lhue" class="rng hue" style="margin-top:14px"></div>` : '')
        + (!hasBr && !hasCol ? '<div class="empty">To światło ma tylko włącznik</div>' : '');
    } else if (kind === 'evform') {
      const p2 = (n) => String(n).padStart(2, '0'), key = (d) => d.getFullYear() + '-' + p2(d.getMonth() + 1) + '-' + p2(d.getDate()), n = new Date(), h1 = Math.min(22, n.getHours() + 1), s0 = new Date(n.getFullYear(), n.getMonth(), n.getDate(), h1, 0), e0 = new Date(n.getFullYear(), n.getMonth(), n.getDate(), h1 + 1, 0);
      const cals = Object.keys(this._hass.states).filter((e) => e.startsWith('calendar.') && this._calMeta(e).create), pre = (PC.cal || []).find((c) => cals.indexOf(c) >= 0) || cals[0];
      h += `<h2>Nowe wydarzenie</h2><form id="evf" class="ef" autocomplete="off"><label>Tytuł<input id="ef_t" type="text" maxlength="120" placeholder="np. Wizyta u lekarza"></label>
        <label>Kalendarz<select id="ef_c">${cals.map((c) => `<option value="${esc(c)}"${c === pre ? ' selected' : ''}>${esc(this._calMeta(c).name)}</option>`).join('')}</select></label>
        <label class="ck"><input id="ef_ad" type="checkbox"> Cały dzień</label>
        <div class="tw"><label>Od<input id="ef_d1" type="date" value="${key(s0)}"></label><label class="tm">Godz.<input id="ef_t1" type="time" value="${p2(s0.getHours())}:00"></label></div>
        <div class="tw"><label>Do<input id="ef_d2" type="date" value="${key(e0)}"></label><label class="tm">Godz.<input id="ef_t2" type="time" value="${p2(e0.getHours())}:00"></label></div>
        <label>Powtarzanie<select id="ef_rep"><option value="">Nie powtarza się</option><option value="DAILY">Codziennie</option><option value="WEEKLY">Co tydzień</option><option value="MONTHLY">Co miesiąc</option><option value="YEARLY">Co rok</option></select></label>
        <div id="ef_rb" style="display:none"><div class="tw" style="grid-template-columns:auto 1fr;align-items:end"><label>Co<input id="ef_iv" type="number" min="1" max="52" value="1" style="width:76px"></label><span id="ef_ivl" style="padding-bottom:12px;opacity:.8">tydz.</span></div>
          <div id="ef_wd" class="wdr" style="display:none">${[['MO', 'Pn'], ['TU', 'Wt'], ['WE', 'Śr'], ['TH', 'Cz'], ['FR', 'Pt'], ['SA', 'So'], ['SU', 'Nd']].map((x) => `<button type="button" data-wd="${x[0]}">${x[1]}</button>`).join('')}</div>
          <label>Koniec powtarzania<select id="ef_end"><option value="">Bez końca</option><option value="d">Do daty…</option></select></label><label id="ef_ul" style="display:none">Ostatni dzień<input id="ef_until" type="date" value="${key(new Date(s0.getFullYear(), s0.getMonth() + 3, s0.getDate()))}"></label></div>
        <label>Miejsce<input id="ef_l" type="text" maxlength="120"></label><label>Opis<input id="ef_o" type="text" maxlength="300"></label>
        <div id="ef_m" class="efm"></div><div class="tw"><button type="button" class="btn2" data-a="closeov">Anuluj</button><button type="submit" class="btn2 pri2">Zapisz</button></div></form>`;
    } else if (kind === 'msg') {
      const r = (PC.rooms || []).find((x) => x.id === this._msgRoom); if (!r || !r.msg) return;
      let H = {}; try { H = JSON.parse(localStorage.getItem('pastel_msg_hist') || '{}'); } catch (e) { H = {}; } const hist = (H[r.id] || []).slice(0, 5); let ascii = false; try { ascii = localStorage.getItem('pastel_msg_ascii') === '1'; } catch (e) { /* ignore */ }
      const QK = ['Obiad gotowy', 'Czas do szkoły', 'Pora spać', 'Zejdź na dół', 'Posprzątaj pokój', 'Zadzwoń do domu'];
      h += `<h2>Wiadomość na panel · ${esc(r.name)}</h2><form id="msf" class="ef" autocomplete="off"><label>Treść<textarea id="mt" maxlength="200" rows="3" placeholder="Wpisz wiadomość…"></textarea></label><div class="mcnt" id="mc">0 / 200</div>
        <div class="chq">${QK.map((x) => `<button type="button" data-q="${esc(x)}">${esc(x)}</button>`).join('')}</div>
        ${hist.length ? `<div class="sub" style="font-size:12px;opacity:.65;margin-top:10px">Ostatnio wysłane</div><div class="chq">${hist.map((x) => `<button type="button" data-q="${esc(x)}">${esc(x)}</button>`).join('')}</div>` : ''}
        <label class="ck"><input id="ma" type="checkbox" ${ascii ? 'checked' : ''}> Zamień polskie znaki na bezogonkowe</label>
        <div id="mm" class="efm"></div><div class="tw"><button type="button" class="btn2" data-a="closeov">Anuluj</button><button type="submit" class="btn2 pri2">Wyślij</button></div></form>`;
    } else if (kind === 'lights') {
      const LP = this._pLP || [], nOn = LP.filter((x) => this._s(x[0]) === 'on').length;
      h += `<h2>Światła · ${nOn ? nOn + ' włączone' : 'zgaszone'}</h2><button class="row${nOn ? ' on' : ''}" data-a="lightsoff" style="margin-bottom:10px"><ha-icon icon="mdi:lightbulb-off-outline"></ha-icon><div><b>Zgaś wszystkie światła</b><small>${nOn ? nOn + ' włączone' : 'wszystko zgaszone'}</small></div></button><div class="lts" style="padding:0">${LP.map((x) => `<button class="lp${this._s(x[0]) === 'on' ? ' on' : ''}" data-a="tg" data-e="${esc(x[0])}"><ha-icon icon="${x[2] || 'mdi:lightbulb-outline'}"></ha-icon><span><b>${esc(x[1])}</b>${(x[3] || this._pBp(x[0])) ? `<small>${this._pBp(x[0]) ? `<em class="bp">${this._pBp(x[0])}</em>` : ''}${x[3] && this._pBp(x[0]) ? ' · ' : ''}${esc(x[3] || '')}</small>` : ''}</span></button>`).join('')}</div>`;
    } else if (kind === 'evdel') {
      const e = this._pEvSel; if (!e) return; const rec = !!e.rid, hm = e.ad ? 'cały dzień' : String(e.s.getHours()).padStart(2, '0') + ':' + String(e.s.getMinutes()).padStart(2, '0');
      h += `<h2>Usunąć wydarzenie?</h2><div class="vc gl"><b>${esc(e.t)}</b><div style="opacity:.75;font-size:13px;margin-top:4px">${e.s.getDate()} ${MONTHS[e.s.getMonth()]} · ${hm}${rec ? ' · wydarzenie cykliczne' : ''}</div></div>`
        + (rec ? `<button class="row" data-a="evdo" data-m="one"><ha-icon icon="mdi:calendar-remove-outline"></ha-icon><div><b>Tylko to wystąpienie</b><small>pozostałe zostają</small></div></button><button class="row" data-a="evdo" data-m="future"><ha-icon icon="mdi:calendar-arrow-right"></ha-icon><div><b>To i kolejne</b><small>wcześniejsze zostają</small></div></button><button class="row" data-a="evdo" data-m="all" style="border-color:#ff8a9a66"><ha-icon icon="mdi:calendar-remove" style="color:#ff8a9a"></ha-icon><div><b>Całą serię</b><small>wszystkie wystąpienia</small></div></button>`
          : `<button class="row" data-a="evdo" data-m="all" style="border-color:#ff8a9a66"><ha-icon icon="mdi:trash-can-outline" style="color:#ff8a9a"></ha-icon><div><b>Usuń wydarzenie</b><small>nieodwracalne</small></div></button>`)
        + '<button class="row" data-a="closeov"><ha-icon icon="mdi:close"></ha-icon><div><b>Anuluj</b></div></button>';
    } else if (kind === 'guardapps') {
      const id = this._gdId, g = (PC.guard || []).find((x) => x.id === id) || {name: id}, ap = ((this._hass.states['sensor.aurora_guard_' + id + '_apps'] || {attributes: {}}).attributes.apps) || [], md = this._gdMode === 'allow' ? 'allow' : 'block', items = ((this._pGd || {})[id + (md === 'allow' ? '_ok' : '')] || {}).items || [];
      const bl = new Set(items.filter((i) => i.status === 'needs_action' && String(i.summary).split('|').length < 3).map((i) => String(i.summary).split('|')[0].trim())), L = ap.slice().sort((x, y) => (bl.has(y.p) - bl.has(x.p)) || String(x.n).localeCompare(String(y.n), 'pl'));
      h += `<h2>${esc(g.name)} · ${md === 'allow' ? 'dozwolone przy blokadzie telefonu' : 'aplikacje do blokowania'}</h2><div class="note" style="font-size:12px;opacity:.7;margin:-4px 0 8px">${md === 'allow' ? 'Telefon, SMS i kontakty są zawsze dozwolone. Tu dodaj inne aplikacje, które mają działać, gdy włączony jest „Cały telefon”.' : 'Zaznaczone aplikacje są blokowane, gdy włączona jest „Blokada aplikacji” (ręcznie albo trybem auto).'}</div>`
        + (L.length ? `<input id="gdq" type="text" placeholder="Szukaj aplikacji…" style="width:100%;box-sizing:border-box;margin-bottom:10px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.18);border-radius:12px;padding:10px 12px;color:inherit;font:inherit">`
          + L.map((x) => `<button class="row${bl.has(x.p) ? ' on' : ''}" data-q="${esc((x.n + ' ' + x.p).toLowerCase())}" data-a="gdapp" data-g="${esc(id)}" data-m="${md}" data-p="${esc(x.p)}" data-n="${esc(x.n)}"><ha-icon icon="${bl.has(x.p) ? (md === 'allow' ? 'mdi:check-circle' : 'mdi:lock') : (md === 'allow' ? 'mdi:circle-outline' : 'mdi:lock-open-variant-outline')}"></ha-icon><div><b>${esc(x.n)}</b><small>${esc(x.p)}</small></div><span class="sw"></span></button>`).join('')
          : '<div class="vc gl"><div class="empty">Brak listy aplikacji – zainstaluj i uruchom Aurora Guard na telefonie.</div></div>');
    } else if (kind === 'gpin') {
      const n = this._pPin().length, b = this._pinBuf || '';
      h += `<h2>Aurora Guard · kod rodzica</h2><div id="pind" class="pind">${'●'.repeat(b.length)}${'○'.repeat(Math.max(0, n - b.length))}</div><div class="pk">${['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del'].map((d) => d === '' ? '<span></span>' : `<button type="button" data-a="pinkey" data-v="${d}">${d === 'del' ? '⌫' : d}</button>`).join('')}</div><div class="note" style="text-align:center;font-size:12px;opacity:.65;margin-top:12px">Kod odblokowuje pełne sterowanie telefonami dzieci do wyjścia z widoku (maks. 10 min).</div>`;
    } else if (kind === 'glim') {
      const id = this._gdId, g = (PC.guard || []).find((x) => x.id === id) || {name: id}, ap = ((this._hass.states['sensor.aurora_guard_' + id + '_apps'] || {attributes: {}}).attributes.apps) || [], items = (((this._pGd || {})[id] || {}).items || []).filter((i) => i.status === 'needs_action' && String(i.summary).split('|').length >= 3);
      const nm = (p) => { const a = ap.find((x) => x.p === p); return a ? a.n : p; }, used = new Set(items.map((i) => String(i.summary).split('|')[0].trim()));
      h += `<h2>${esc(g.name)} · limity czasu</h2><div class="note" style="font-size:12px;opacity:.7;margin:-4px 0 8px">Dzienny limit czasu w aplikacji. Po wyczerpaniu (z bonusem od rodzica) aplikacja się blokuje. Telefon musi mieć włączony „Dostęp do danych o użyciu”.</div>`
        + (items.length ? items.map((i) => { const q = String(i.summary).split('|'), mn = parseInt(q[2], 10) || 0; return `<div class="td"><span class="tt">${esc(q[1] || nm(q[0]))}<small style="display:block;opacity:.65">${mn >= 60 ? Math.floor(mn / 60) + ' godz. ' + (mn % 60 ? mn % 60 + ' min' : '') : mn + ' min'} dziennie</small></span><button class="tc" data-a="glimm" data-g="${esc(id)}" data-u="${esc(i.uid || i.summary)}" data-s="${esc(i.summary)}" data-d="-15" aria-label="Mniej"><ha-icon icon="mdi:minus"></ha-icon></button><button class="tc" data-a="glimm" data-g="${esc(id)}" data-u="${esc(i.uid || i.summary)}" data-s="${esc(i.summary)}" data-d="15" aria-label="Więcej"><ha-icon icon="mdi:plus"></ha-icon></button><button class="tx" data-a="glimx" data-g="${esc(id)}" data-u="${esc(i.uid || i.summary)}" aria-label="Usuń"><ha-icon icon="mdi:trash-can-outline"></ha-icon></button></div>`; }).join('') : '<div class="empty">Brak limitów</div>')
        + (ap.length ? `<h4 style="margin:14px 0 6px">Dodaj limit</h4><div class="ef"><select id="gl_app">${ap.filter((x) => !used.has(x.p)).slice().sort((x, y) => String(x.n).localeCompare(String(y.n), 'pl')).map((x) => `<option value="${esc(x.p)}" data-n="${esc(x.n)}">${esc(x.n)}</option>`).join('')}</select><select id="gl_min" style="margin-top:8px">${[15, 30, 45, 60, 90, 120, 180].map((m) => `<option value="${m}"${m === 60 ? ' selected' : ''}>${m >= 60 ? m / 60 + ' godz.' : m + ' min'} dziennie</option>`).join('')}</select><div class="tw" style="margin-top:10px"><button class="btn2 pri2" data-a="glimadd" data-g="${esc(id)}">Dodaj limit</button></div></div>` : '<div class="vc gl"><div class="empty">Brak listy aplikacji – uruchom Aurora Guard na telefonie.</div></div>');
    } else if (kind === 'gcfg') {
      const id = this._gdId, g = (PC.guard || []).find((x) => x.id === id) || {name: id}, c = this._gcfg || {}, row = (l, v) => `<div class="vc gl" style="margin:8px 0"><small style="opacity:.7">${l}</small><div style="display:flex;align-items:center;gap:8px;margin-top:4px"><b style="flex:1;word-break:break-all;font-size:15px;user-select:all">${esc(v)}</b><button class="tc" data-a="gcopy" data-v="${esc(v)}" aria-label="Kopiuj"><ha-icon icon="mdi:content-copy"></ha-icon></button></div></div>`;
      h += `<h2>${esc(g.name)} · dane do konfiguracji telefonu</h2><div class="note" style="font-size:12px;opacity:.7;margin:-4px 0 8px">Wpisz w aplikacji Aurora Guard (Ustawienia). Identyfikator webhooka traktuj jak hasło.</div>`
        + row('Identyfikator telefonu', id) + (c.loading ? '<div class="empty">Pobieram…</div>' : c.hook ? row('Identyfikator webhooka', c.hook) : `<div class="empty">${esc(c.err || 'Brak danych')}</div>`)
        + '<div class="note" style="font-size:12px;opacity:.65;margin-top:8px">Adres Home Assistanta wpisz własny (zewnętrzny i wewnętrzny). Token: Profil konta AuroraGuard → Zabezpieczenia → Długoterminowe tokeny dostępu.</div>';
    } else if (kind === 'gmsg') {
      const id = this._gdId, g = (PC.guard || []).find((x) => x.id === id) || {name: id}, QK = ['Obiad gotowy', 'Wracaj do domu', 'Zadzwoń do mnie', 'Pora spać', 'Odłóż telefon i odrób lekcje'];
      h += `<h2>Wiadomość na telefon · ${esc(g.name)}</h2><form id="gmf" class="ef" autocomplete="off"><label>Treść<textarea id="gmt" maxlength="200" rows="3" placeholder="Wpisz wiadomość…"></textarea></label><div class="chq">${QK.map((x) => `<button type="button" data-q="${esc(x)}">${esc(x)}</button>`).join('')}</div><div id="gmm" class="efm"></div><div class="tw"><button type="button" class="btn2" data-a="closeov">Anuluj</button><button type="submit" class="btn2 pri2">Wyślij</button></div></form>`;
    } else if (kind === 'status') {
      const iss = this._issues(), key = (i) => i.cat + '|' + i.text;
      h += '<h2>Puls domu</h2>' + (this._pM || []).map((m, mi) => { const k = 'M|' + mi, det = (m.det || []).map((x) => `<div class="kvl"><span>${esc(x[0])}</span><b>${esc(x[1])}</b></div>`).join('');
          return `<div class="iw${this._pExp.has(k) ? ' open' : ''}"><button class="row" data-a="exp" data-k="${k}"><ha-icon icon="${m.ic}" style="color:${m.col}"></ha-icon><div><b>${m.t}</b><small>${esc(m.v)}</small></div><ha-icon class="chev" icon="mdi:chevron-down"></ha-icon></button><div class="det">${det || '<p>Brak szczegółów.</p>'}</div></div>`; }).join('')
        + (iss.length ? '<h2 style="margin-top:16px;font-size:15px;opacity:.85">Uwagi — dotknij, aby rozwinąć</h2>' + iss.map((i) => { const k = key(i), det = (i.sub ? `<p>${esc(i.sub)}</p>` : '') + (i.more || []).filter((x) => x && x[1]).map((x) => `<div class="kvl"><span>${esc(x[0])}</span><b>${esc(x[1])}</b></div>`).join('');
          return `<div class="iw${this._pExp.has(k) ? ' open' : ''}"><button class="row" data-a="exp" data-k="${esc(k)}"><ha-icon icon="${i.icon}" style="color:${i.sev >= 2 ? '#ff5d73' : '#ffc24b'}"></ha-icon><div><b>${esc(i.text)}</b><small>${esc(i.cat)}${i.sub ? ' · ' + esc(String(i.sub).slice(0, 38)) : ''}</small></div><ha-icon class="chev" icon="mdi:chevron-down"></ha-icon></button><div class="det">${det || '<p>Brak dodatkowych informacji.</p>'}</div></div>`; }).join('') : '');
    }
    const live = this._ovK === 'sheet' && this._shF === kind;
    if (live && this._shH === h) return;   /* bez zmian: nie przebudowuj panelu (to powodowalo mruganie) */
    this._shH = h; const y = live ? sh.scrollTop : 0; sh.innerHTML = h; this._shF = kind; sh.classList.toggle('an', !live); if (live) { sh.scrollTop = y; return; } sh.querySelectorAll('.lp, .row, .iw, .ev, .vc, .tk, h2').forEach((el, i) => el.style.setProperty('--i', Math.min(i, 14))); this._pOv('sheet');
  }
  /* ---------- widoki ---------- */
  _pTitle(k, a) { const T = PULSE_VIEWS[k] || [k, 'mdi:information-outline']; let tt = T[0], ic = T[1]; if (k === 'pokoj') { const r = (PC.rooms || []).find((x) => x.id === a); if (r) { tt = r.name; ic = r.icon || ic; } } this.shadowRoot.getElementById('vt').innerHTML = esc(tt); this.shadowRoot.getElementById('vi').innerHTML = `<ha-icon icon="${ic}"></ha-icon>`; }
  _pPin() { const e = this._hass.states['input_text.guard_pin'], v = e && e.state && !['unknown', 'unavailable'].includes(e.state) ? String(e.state) : ''; return v; }
  _pGdEdit() { return this._pTdEdit() || !!this._gdUnl; }   /* pelny dostep do Aurora Guard: konta rodzicow albo odblokowanie kodem (do wyjscia z widoku) */
  _pPinNeeded() { return !!this._pPin() && !this._pTdEdit(); }   /* kod do widoku Aurora Guard na urzadzeniach bez prawa edycji (Tab10 = konto Panel); pytany za kazdym razem */
  _pPinAsk() { this._pinBuf = ''; this._pSheet('gpin'); }
  _pOpen(k, a) {
    if (k === 'guard') { if (this._pPinNeeded() && !this._pPinOk) { this._pPinAsk(); return; } this._pPinOk = false; }
    if (this._vw && (this._vw.k !== k || this._vw.a !== a)) { this._pLeaveSk(); if (this._vw.k === 'szkola') this._pSkN = null; this._vst.push(this._vw); }
    if (!this._vw) { try { history.pushState({pulse: 1}, ''); this._pushed = true; } catch (e) { this._pushed = false; } }
    this._vw = {k, a}; this._pOv(null); this._pg.vb = null; this._radioEl = null; this._tvEl = null;
    const vw = this.shadowRoot.getElementById('vw'); vw.classList.remove('on'); void vw.offsetWidth; vw.classList.add('on');
    this._pTitle(k, a);
    if (k === 'pogoda') this._loadForecast();
    if (k === 'szkola') { try { this._skS().forEach((q) => this._skLoad(q.k)); } catch (e) { /* ignore */ } }
    this.shadowRoot.getElementById('vb').scrollTop = 0; this._pVRender(true);
  }
  _pBack() {
    if (this._vst.length) { this._pLeaveSk(); this._pSkN = null; const p = this._vst.pop(); this._vw = p; this._pg.vb = null; this._radioEl = null; this._tvEl = null; this._pTitle(p.k, p.a); this._pVRender(true); return; }
    if (this._pushed) { try { history.back(); return; } catch (e) { /* ignore */ } }
    this._pCloseV();
  }
  _pCloseV() { this._gdUnl = false; clearTimeout(this._gdUnlT); this._pLeaveSk(); this._pSkN = null; this._vw = null; this._pBusy(); this._vst = []; this._pushed = false; this.shadowRoot.getElementById('vw').classList.remove('on'); this._pg.vb = null; this._radioEl = null; this._tvEl = null; }
  _pVRender(force) {
    if (!this._vw || !this._hass) return; const k = this._vw.k, vb = this.shadowRoot.getElementById('vb');
    if (k === 'asystent') { if (!vb.querySelector('#chlog')) { vb.innerHTML = `<div class="chst" id="chst"><i></i>Gotowy</div><div class="chlog" id="chlog"></div><form class="askf" id="askf" autocomplete="off"><button type="button" class="mic" data-a="listen" aria-label="Mów"><ha-icon icon="mdi:microphone-message"></ha-icon></button><input id="asktx" type="text" placeholder="Napisz do asystenta…" autocomplete="off"><button type="submit" aria-label="Wyślij"><ha-icon icon="mdi:send"></ha-icon></button></form>`; this._askRefresh(true); } this._askLiveUpdate(); return; }
    vb.classList.toggle('tvm', k === 'tv');
    if (k === 'tv') {
      if (!this._tvEl || !vb.contains(this._tvEl)) {
        if (!customElements.get('tv-guide')) { vb.innerHTML = '<div class="empty">Karta „Program TV” nie jest dostępna (integracja tv_guide)</div>'; return; }
        vb.innerHTML = '<div class="tabs" id="tvg" style="margin:0 -18px 8px;padding:0 18px"></div><div id="tvhost" style="margin:0 -18px -18px"></div>'; const host = vb.querySelector('#tvhost');
        const el = document.createElement('tv-guide'); this._tvEl = el; host.appendChild(el);
        (this._tvCfg ? Promise.resolve(this._tvCfg) : (this._config && this._config.tv ? Promise.resolve(this._config.tv) : fetch('/local/jarvis/tv-guide-config.json?_=' + Date.now()).then((r) => r.json()))).then((c) => { this._tvCfg = c; this._pTvApply(); }).catch(() => { host.innerHTML = '<div class="empty">Brak konfiguracji Programu TV</div>'; });
      } else { this._tvEl.hass = this._hass; }
      return;
    }
    if (k === 'radio') { if (!this._radioEl || !vb.contains(this._radioEl)) { vb.innerHTML = '<div id="radiohost"></div>'; const el = document.createElement('radio-pl-card'); try { el.setConfig(Object.assign({title: ''}, (PC.radioPlayers || []).length ? {players: PC.radioPlayers} : {})); } catch (e) { vb.innerHTML = '<div class="empty">Integracja radio_pl nie jest dostępna</div>'; return; } this._radioEl = el; vb.firstChild.appendChild(el); } this._radioEl.hass = this._hass; return; }
    if (k === 'skform') { if (!vb.querySelector('#skf')) { vb.innerHTML = '<div id="skf"></div>'; this._pSkFR(); } return; }
    let h = '';
    try { h = this['_vw_' + k](this._vw.a); } catch (e) { h = '<div class="empty">Nie udało się wczytać widoku: ' + esc(e.message || e) + '</div>'; }
    if (force || this._pg.vb !== h) { const y = vb.scrollTop; this._pg.vb = h; vb.innerHTML = h; if (!force) vb.scrollTop = y; }
    if (h.indexOf('Wczytuję') >= 0 && !this._ldT) { this._ldT = setTimeout(() => { this._ldT = null; if (this._vw) this._pVRender(); }, 1500); }   /* wykresy / prognoza doladowuja sie asynchronicznie */
  }
  _pSpark(pts, color, dec, unit) {
    if (!pts || pts.length < 2) return '<div class="empty">Wczytuję wykres…</div>';
    const hours = 24, t0 = Date.now() - hours * 3600000, t1 = Date.now(); if (pts.length > 110) { const n = 96, w = (t1 - t0) / n, b = Array.from({length: n}, () => []); pts.forEach((p) => { const i = Math.min(n - 1, Math.max(0, Math.floor((p[0] - t0) / w))); b[i].push(p[1]); }); pts = b.map((v, i) => v.length ? [t0 + (i + .5) * w, v.reduce((x, y) => x + y, 0) / v.length] : null).filter(Boolean); }
    if (pts.length < 2) return '<div class="empty">Za mało danych do wykresu</div>';
    const W = 320, H = 112, pl = 38, pr = 6, pt = 10, pb = 18; let mn = Math.min(...pts.map((p) => p[1])), mx = Math.max(...pts.map((p) => p[1])); if (mx - mn < 1) { mn -= .5; mx += .5; }
    const X = (t) => pl + (Math.max(t, t0) - t0) / (t1 - t0) * (W - pl - pr), Y = (v) => pt + (1 - (v - mn) / (mx - mn)) * (H - pt - pb), id = 'sg' + Math.random().toString(36).slice(2, 7);
    let d = ''; pts.forEach((p, i) => { d += (i ? ' L' : 'M') + X(p[0]).toFixed(1) + ' ' + Y(p[1]).toFixed(1); }); d += ' L' + X(t1).toFixed(1) + ' ' + Y(pts[pts.length - 1][1]).toFixed(1);
    const fd = Math.max(dec, mx - mn < 3 ? 1 : 0), ft = (v) => v.toFixed(fd).replace('.', ','), lbl = (hh) => String(new Date(t1 - hh * 3600000).getHours()).padStart(2, '0') + ':00';
    const tk = [mn, (mn + mx) / 2, mx].map((v) => `<line class="gl2" x1="${pl}" x2="${W - pr}" y1="${Y(v).toFixed(1)}" y2="${Y(v).toFixed(1)}"/><text x="${pl - 4}" y="${(Y(v) + 3).toFixed(1)}" text-anchor="end">${ft(v)}</text>`).join('');
    return `<svg class="spk" viewBox="0 0 ${W} ${H}"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${color}" stop-opacity=".4"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></linearGradient></defs>${tk}
      <path d="${d} L${X(t1).toFixed(1)} ${H - pb} L${X(pts[0][0]).toFixed(1)} ${H - pb} Z" fill="url(#${id})"/><path d="${d}" fill="none" stroke="${color}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="${pl}" y="${H - 4}">${lbl(24)}</text><text x="${W / 2}" y="${H - 4}" text-anchor="middle">${lbl(12)}</text><text x="${W - pr}" y="${H - 4}" text-anchor="end">teraz</text></svg>
      <div class="mm"><span>min <b>${ft(mn)}${unit}</b></span><span>max <b>${ft(mx)}${unit}</b></span><span>teraz <b>${ft(pts[pts.length - 1][1])}${unit}</b></span></div>`;
  }
  _pHistPts(eid) { const H = this._hist([eid], 24); if (!H) return null; const a = H.find((x) => x && x[0] && x[0].entity_id === eid) || H[0]; return a ? this._series(a) : null; }
  _vw_pogoda() {
    const w = this._hass.states[PC.out.weather], A = (w && w.attributes) || {}, st0 = w ? w.state : '', night = this._s('sun.sun') === 'below_horizon', st = night && st0 === 'sunny' ? 'clear-night' : st0, wx = WX[st] || ['mdi:weather-cloudy', st], fc = this._fc || {h: [], d: []};
    const ot = this._n(PC.out.t), oh = this._n(PC.out.h), now = Date.now(), r0 = (v) => v == null || isNaN(+v) ? '—' : Math.round(+v);
    const warns = this._warns().map((x) => `<div class="row" style="border-color:#ffc24b66"><ha-icon icon="${this._wIcon(x.event)}" style="color:#ffc24b"></ha-icon><div><b>${esc(x.event || 'Ostrzeżenie')}</b><small>stopień ${esc(x.level || '')}</small></div></div>`).join('');
    const hrs = fc.h.filter((x) => new Date(x.datetime).getTime() >= now - 1800000).slice(0, 18).map((x) => { const t = new Date(x.datetime), c = WX[x.condition] || ['mdi:weather-cloudy', '']; return `<div class="hr"><small>${String(t.getHours()).padStart(2, '0')}:00</small><ha-icon icon="${c[0]}"></ha-icon><b>${r0(x.temperature)}°</b><em>${x.precipitation_probability != null ? Math.round(x.precipitation_probability) + '%' : (+x.precipitation > 0 ? (+x.precipitation).toFixed(1) + ' mm' : '')}</em></div>`; }).join('');
    const days = fc.d.slice(0, 8), lo = Math.min(...days.map((x) => +x.templow).filter((v) => !isNaN(v)), 99), hi = Math.max(...days.map((x) => +x.temperature).filter((v) => !isNaN(v)), -99);
    const dl = days.map((x) => { const t = new Date(x.datetime), c = WX[x.condition] || ['mdi:weather-cloudy', ''], a = (+x.templow - lo) / ((hi - lo) || 1) * 100, b = (+x.temperature - lo) / ((hi - lo) || 1) * 100;
      return `<div class="dl"><span class="dn">${['Nd', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So'][t.getDay()]} ${t.getDate()}</span><ha-icon icon="${c[0]}"></ha-icon><span class="lo">${r0(x.templow)}°</span><span class="rg2"><i style="left:${isNaN(a) ? 0 : a}%;width:${isNaN(a) || isNaN(b) ? 0 : Math.max(8, b - a)}%"></i></span><span class="hi">${r0(x.temperature)}°</span><span class="rn2">${+x.precipitation > 0 ? (+x.precipitation).toFixed(1) + 'mm' : ''}</span></div>`; }).join('');
    const num = (v) => { const x = parseFloat(v); return isNaN(x) ? null : x; }, f1 = (v) => v === null ? '—' : v.toFixed(1).replace('.', ','), p0 = (v) => v === null ? '—' : String(Math.round(v)), pm = this._n(PC.pm);
    const tmp = ot !== null ? ot : num(A.temperature), hum = oh !== null ? oh : num(A.humidity), app = num(A.apparent_temperature), pr = num(A.pressure), wsp = num(A.wind_speed), wg = num(A.wind_gust_speed), cl = num(A.cloud_coverage), vis = num(A.visibility), uv = num(A.uv_index), dp = num(A.dew_point), br = num(A.wind_bearing);
    const DIR = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'], dir = br === null ? '' : ' ' + DIR[Math.round(br / 22.5) % 16];
    const sunE = this._hass.states['sun.sun'], sa = (sunE && sunE.attributes) || {}, srI = A.sunrise || sa.next_rising, ssI = A.sunset || sa.next_setting, hm = (iso) => { const d = new Date(iso); return isNaN(d) ? '—' : String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0'); };
    let dlen = ''; if (A.sunrise && A.sunset) { const m = Math.round((new Date(A.sunset) - new Date(A.sunrise)) / 60000); if (!isNaN(m)) dlen = Math.floor(m / 60) + ' h ' + (m % 60) + ' min'; }
    const tl = (k, v, u, ic) => `<div><b>${v}<em>${u}</em></b><small>${k}</small></div>`;
    const tiles = tl(ot !== null ? 'Temp. (czujnik)' : 'Temperatura', f1(tmp), ' °C') + tl('Odczuwalna (IMGW)', f1(app), ' °C') + tl('Wilgotność', p0(hum), ' %') + tl('Ciśnienie', p0(pr), ' hPa') + tl('Wiatr', p0(wsp), ' km/h' + dir) + tl('Porywy', p0(wg), ' km/h') + tl('Zachmurzenie', p0(cl), ' %') + (uv !== null ? tl('Indeks UV', f1(uv), '') : vis !== null ? tl('Widoczność', f1(vis), ' km') : tl('Opady', f1(num(A.precipitation)), ' mm'));
    const pills = `<div class="pls"><span>${esc(wx[1])}</span>${A.location ? `<span>${esc(A.location)}</span>` : ''}${pm !== null ? `<span>PM2.5 ${Math.round(pm)} µg/m³</span>` : ''}${dp !== null ? `<span>Punkt rosy ${f1(dp)}°</span>` : ''}</div>`;
    const sunb = `<div class="vc gl"><h4>Słońce</h4><div class="kv"><div><b>${srI ? hm(srI) : '—'}</b><small>wschód</small></div><div><b>${ssI ? hm(ssI) : '—'}</b><small>zachód</small></div><div><b>${dlen || '—'}</b><small>długość dnia</small></div></div></div>`;
    return `${warns}<div class="vc gl"><div class="big"><ha-icon icon="${wx[0]}"></ha-icon><div><b>${tmp === null ? '—' : f1(tmp) + '°'}</b><span>${esc(wx[1])}</span></div></div>${pills}<div class="tg wtg">${tiles}</div></div>
      <div class="vc gl"><h4>Najbliższe godziny</h4>${hrs ? `<div class="hrs">${hrs}</div>` : '<div class="empty">Wczytuję prognozę…</div>'}</div>
      <div class="vc gl"><h4>Prognoza dzienna</h4>${dl || '<div class="empty">Wczytuję prognozę…</div>'}</div>${sunb}`;
  }
  _pTdLists() {   /* listy zadan dzieci: z konfiguracji (PC.todo.lists) albo automatycznie wszystkie todo.zadania_* */
    const st = this._hass.states, cf = PC.todo && PC.todo.lists;
    const out = cf && cf.length ? cf.filter((l) => st[l.e]).map((l) => ({e: l.e, n: l.n || (st[l.e].attributes.friendly_name || l.e)})) : Object.keys(st).filter((e) => /^todo\.zadania_/.test(e)).map((e) => ({e, n: String(st[e].attributes.friendly_name || e).replace(/^Zadania\s+/i, '')}));
    if (st['todo.aurora_do_zrobienia'] && this._pTdIn(PC.todo && PC.todo.viewers, this._pTdEdit())) out.push({e: 'todo.aurora_do_zrobienia', n: 'Do zrobienia', gen: true});   /* trzecia zakladka (lista ogolna) - tylko dla kont z prawem edycji */
    return out;
  }
  _pTdIn(list, dflt) { const u = this._hass.user || {}, nm = String(u.name || '').toLowerCase(); return list && list.length ? list.some((x) => String(x).toLowerCase() === nm || x === u.id) : dflt; }
  _pTdEdit() { return this._pTdIn(PC.todo && PC.todo.editors, !!(this._hass.user || {}).is_admin); }
  _pTdLoad(e) {
    const c = (this._tdC = this._tdC || {}), o = this._hass.states[e], sig = o ? o.state + '|' + o.last_updated : '', SB = (this._tdSub = this._tdSub || {});
    if (!SB[e] && this._hass.connection) { SB[e] = true; this._hass.connection.subscribeMessage((ev) => { c[e] = Object.assign({}, c[e], {items: (ev && ev.items) || [], busy: false}); if (this._vw && this._vw.k === 'zadania' && !this._tdEm) this._pVRender(true); }, {type: 'todo/item/subscribe', entity_id: e}).then((u) => { if (this._tdSub === SB) SB[e] = u; else u(); }).catch(() => { SB[e] = null; }); }
    if (c[e] && (c[e].sig === sig || c[e].busy)) return; c[e] = Object.assign({}, c[e], {busy: true, sig});
    this._hass.callWS({type: 'todo/item/list', entity_id: e}).then((r) => { c[e] = {items: (r && r.items) || [], sig, busy: false}; if (this._vw && this._vw.k === 'zadania') this._pVRender(); }).catch(() => { c[e] = Object.assign({}, c[e], {busy: false}); });
  }
  _vw_zadania() {
    const L = this._pTdLists(); if (!L.length) return '<div class="vc gl"><div class="empty">Brak list zadań</div></div>';
    const cur = L.find((l) => l.e === this._tdSel) || L[0], ed = this._pTdEdit(), em = ed && this._tdEm; this._tdSel = cur.e; L.forEach((l) => this._pTdLoad(l.e));
    const c = (this._tdC || {})[cur.e], items = ((c && c.items) || []).slice().sort((a, b) => (a.status === 'completed') - (b.status === 'completed')), total = items.length, done = items.filter((x) => x.status === 'completed').length, pc = total ? Math.round(done / total * 100) : 100;
    const tabs = '<div class="tabs">' + L.map((l) => { const o = parseInt(this._s(l.e), 10) || 0, pn = (((this._tdC || {})[l.e] || {}).items || []).filter((x) => x.status !== 'completed' && String(x.description || '').indexOf('⏳') === 0).length; return `<button class="${l.e === cur.e ? 'on' : ''}" data-a="tdtab" data-e="${esc(l.e)}">${esc(l.n)}${o ? `<span class="nwb">${o}</span>` : ''}${pn ? `<span class="nwb" style="background:#ffb340;color:#222">⏳${pn}</span>` : ''}</button>`; }).join('') + '</div>';
    const head = `<div class="vc gl"><div class="big" style="gap:14px"><svg viewBox="0 0 80 80" width="76" height="76" style="flex:none"><circle cx="40" cy="40" r="32" fill="none" stroke="rgba(255,255,255,.12)" stroke-width="7"/><circle cx="40" cy="40" r="32" fill="none" stroke="${pc === 100 ? '#3fe0a5' : '#67e8f9'}" stroke-width="7" stroke-linecap="round" stroke-dasharray="${(2 * Math.PI * 32 * pc / 100).toFixed(1)} 300" transform="rotate(-90 40 40)"/><text x="40" y="46" text-anchor="middle" fill="#fff" font-size="19" font-weight="300">${pc}%</text></svg>
      <div><b style="font-size:22px">${total ? (pc === 100 ? 'Wszystko zrobione!' : done + ' z ' + total + ' zrobione') : 'Brak zadań na dziś'}</b><span style="display:block;opacity:.7;font-size:13px;margin-top:2px">${pc === 100 && total ? 'Dobra robota 🎉' : total ? 'zostało ' + (total - done) : ''}</span></div></div></div>`;
    const rows = items.map((x) => { const dn = x.status === 'completed', pend = !dn && String(x.description || '').indexOf('⏳') === 0, da = `data-e="${esc(cur.e)}" data-u="${esc(x.uid)}"`;
      const ctl = !ed ? `<span class="tc" style="pointer-events:none"><ha-icon icon="${dn ? 'mdi:check-circle' : pend ? 'mdi:timer-sand' : 'mdi:circle-outline'}"></ha-icon></span>`
        : pend ? `<button class="tc" data-a="tdok" ${da} aria-label="Akceptuj" style="color:#3fe0a5"><ha-icon icon="mdi:check-circle-outline"></ha-icon></button><button class="tc" data-a="tdno" ${da} aria-label="Odrzuć" style="color:#ff7a8a"><ha-icon icon="mdi:close-circle-outline"></ha-icon></button>`
        : `<button class="tc" data-a="tdt" ${da} data-s="${dn ? 'needs_action' : 'completed'}" aria-label="Zaznacz"><ha-icon icon="${dn ? 'mdi:check-circle' : 'mdi:circle-outline'}"></ha-icon></button>`;
      return `<div class="td${dn ? ' dn' : ''}">${ctl}${em ? `<input class="tin" type="text" maxlength="120" value="${esc(x.summary)}" data-a="tdren" data-e="${esc(cur.e)}" data-u="${esc(x.uid)}"><button class="tx" data-a="tddel" data-e="${esc(cur.e)}" data-u="${esc(x.uid)}" aria-label="Usuń"><ha-icon icon="mdi:trash-can-outline"></ha-icon></button>` : `<span class="tt">${esc(x.summary)}${pend ? '<small style="display:block;opacity:.7;color:#ffb340">⏳ czeka na akceptację' + (ed ? '' : ' rodzica') + '</small>' : ''}</span>`}</div>`; }).join('');
    const add = em ? `<form id="tdf" class="tda"><input id="tdn" type="text" maxlength="120" placeholder="Nowe zadanie dla: ${esc(cur.n)}"><button type="submit" class="btn2 pri2">Dodaj</button></form>` : '';
    return tabs + head + `<div class="vc gl">${rows || '<div class="empty">Lista jest pusta' + (ed ? ' – włącz edycję i dodaj zadania' : '') + '</div>'}${add}</div>` + (ed ? `<button class="row${em ? ' on' : ''}" data-a="tded"><ha-icon icon="mdi:pencil-outline"></ha-icon><div><b>${em ? 'Zakończ edycję' : 'Edytuj listę'}</b><small>${em ? 'zmiany zapisują się od razu' : 'dodawanie, zmiana nazw i usuwanie zadań'}</small></div></button>` : '');
  }
  _pEvItem(e, col, past, cur) {
    const R = (this._pEvReg = this._pEvReg || []), i = R.push(e) - 1, del = this._calMeta(e.cal).del, hm = e.ad ? 'cały dzień' : String(e.s.getHours()).padStart(2, '0') + ':' + String(e.s.getMinutes()).padStart(2, '0') + '–' + String(e.e.getHours()).padStart(2, '0') + ':' + String(e.e.getMinutes()).padStart(2, '0');
    return `<div class="ie" style="border-left:3px solid ${col};${past ? 'opacity:.5;' : ''}${cur ? `box-shadow:0 0 18px ${col}66;` : ''}"><b style="font-weight:600">${esc(e.t)}</b><small>${hm}${cur ? ' · trwa teraz' : ''}${e.loc ? ' · ' + esc(e.loc) : ''}</small>${e.desc ? `<small style="opacity:.55;margin-top:3px">${esc(String(e.desc).slice(0, 120))}</small>` : ''}${del ? `<button class="evx" data-a="evdel" data-i="${i}" aria-label="Usuń wydarzenie"><ha-icon icon="mdi:trash-can-outline"></ha-icon></button>` : ''}</div>`;
  }
  async _pLoadMonth(y, m) {
    const k = y + '-' + m, c = (this._pMev = this._pMev || {}); if (c[k] && (c[k].busy || Date.now() - c[k].t < 120000)) return; c[k] = Object.assign({list: []}, c[k], {busy: true, t: Date.now()});
    try { const l = await this._fetchEv(new Date(y, m, 1 - 7), new Date(y, m + 1, 8)); c[k] = {list: l, t: Date.now()}; } catch (e) { c[k] = {list: (c[k] && c[k].list) || [], t: Date.now()}; }
    if (this._vw && this._vw.k === 'kalendarz') this._pVRender(true);
  }
  _pMonthHtml() {
    const now = new Date(), cm = this._pCm || (this._pCm = {y: now.getFullYear(), m: now.getMonth()}), k = cm.y + '-' + cm.m; this._pLoadMonth(cm.y, cm.m);
    const hs = this._pHs(), cols = [hs.a, hs.b, hs.c, '#ffb340', '#3fe0a5', '#67b8ff'], L = ((this._pMev && this._pMev[k] && this._pMev[k].list) || []).filter((e) => PC.cal.includes(e.cal));
    const p2 = (n) => String(n).padStart(2, '0'), key = (d) => d.getFullYear() + '-' + p2(d.getMonth() + 1) + '-' + p2(d.getDate()), today = key(now);
    const first = new Date(cm.y, cm.m, 1), off = (first.getDay() + 6) % 7, days = new Date(cm.y, cm.m + 1, 0).getDate(), weeks = Math.ceil((off + days) / 7);
    const on = (d) => { const a = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime(), b = a + 86400000; return L.filter((e) => e.s.getTime() < b && e.e.getTime() > a || (e.s.getTime() >= a && e.s.getTime() < b)); };
    if (!this._pCd || this._pCd.slice(0, 7) !== cm.y + '-' + p2(cm.m + 1)) this._pCd = (now.getFullYear() === cm.y && now.getMonth() === cm.m) ? today : key(first);
    let cells = ''; for (let i = 0; i < weeks * 7; i++) { const d = new Date(cm.y, cm.m, 1 - off + i), inM = d.getMonth() === cm.m, E = on(d), kk = key(d), dots = E.slice(0, 3).map((e) => `<i style="background:${cols[Math.max(0, PC.cal.indexOf(e.cal)) % cols.length]}"></i>`).join('');
      cells += `<button class="mc${inM ? '' : ' om'}${kk === today ? ' td' : ''}${kk === this._pCd ? ' sl' : ''}" data-a="cmd" data-d="${kk}"><b>${d.getDate()}</b><span>${dots}</span>${E.length > 3 ? `<em>+${E.length - 3}</em>` : ''}</button>`; }
    const sd = new Date(this._pCd + 'T00:00:00'), SE = on(sd).sort((a, b) => a.s - b.s);
    const dl = SE.length ? SE.map((e) => this._pEvItem(e, cols[Math.max(0, PC.cal.indexOf(e.cal)) % cols.length], e.e.getTime() < now.getTime(), e.s.getTime() <= now.getTime() && e.e.getTime() >= now.getTime())).join('') : '<div class="empty">Brak wydarzeń tego dnia</div>';
    return `<div class="vc gl"><div class="mh"><button data-a="cmn" data-d="-1" aria-label="Poprzedni miesiąc"><ha-icon icon="mdi:chevron-left"></ha-icon></button><b>${MONTHS[cm.m].replace(/^./, (c) => c.toUpperCase())} ${cm.y}</b><button data-a="cmn" data-d="1" aria-label="Następny miesiąc"><ha-icon icon="mdi:chevron-right"></ha-icon></button><button class="tdb" data-a="cmn" data-d="0">Dziś</button></div>
      <div class="mg">${['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So', 'Nd'].map((x) => `<span class="wh">${x}</span>`).join('')}${cells}</div></div>
      <div class="vc gl"><h4>${DAYS[sd.getDay()].replace(/^./, (c) => c.toUpperCase())}, ${sd.getDate()} ${MONTHS[sd.getMonth()]}</h4>${dl}</div>`;
  }
  _vw_kalendarz() {
    this._pEvReg = [];
    const now = new Date(), d0 = new Date(now.getFullYear(), now.getMonth(), now.getDate()), R = this._pEvR || 7, lim = d0.getTime() + R * 86400000, hs = this._pHs(), cols = [hs.a, hs.b, hs.c, '#ffb340', '#3fe0a5', '#67b8ff'];
    const all = (this._events || []).filter((e) => PC.cal.includes(e.cal) && e.e.getTime() >= now.getTime() - 3600000), list = all.filter((e) => e.s.getTime() < lim), nx = all.find((e) => e.s.getTime() > now.getTime() - 1800000);
    const rng = `<div class="sg" style="margin:0 0 12px">${[[1, 'Dziś'], [7, '7 dni'], [30, 'Miesiąc'], [90, 'Kwartał']].map((x) => `<button class="${R === x[0] ? 'on' : ''}" data-a="evr" data-r="${x[0]}">${x[1]}</button>`).join('')}</div>`;
    const md = this._pCmode === 'month', sw = `<div class="sg" style="margin:0 0 12px"><button class="${md ? '' : 'on'}" data-a="cmode" data-v="list">Lista</button><button class="${md ? 'on' : ''}" data-a="cmode" data-v="month">Miesiąc</button></div>`;
    if (md) return sw + '<button class="row" data-a="evnew" style="margin:0 0 12px"><ha-icon icon="mdi:calendar-plus"></ha-icon><div><b>Dodaj wydarzenie</b><small>do wybranego kalendarza</small></div></button>' + this._pMonthHtml();
    let hero = '';
    if (nx) { const ms = nx.s.getTime() - now.getTime(), C = 2 * Math.PI * 34, fr = ms <= 0 ? 1 : Math.max(.04, Math.min(1, 1 - ms / 86400000)), dd = Math.floor(ms / 864e5), hh = Math.floor(ms % 864e5 / 36e5), mm = Math.floor(ms % 36e5 / 6e4), col = cols[Math.max(0, PC.cal.indexOf(nx.cal)) % cols.length];
      const cd = ms <= 0 ? 'trwa teraz' : ms < 6e4 ? 'za chwilę' : 'za ' + (dd ? dd + ' d ' : '') + (hh ? hh + ' godz ' : '') + (dd ? '' : mm + ' min'), tm = nx.ad ? 'cały dzień' : String(nx.s.getHours()).padStart(2, '0') + ':' + String(nx.s.getMinutes()).padStart(2, '0') + (nx.e ? '–' + String(nx.e.getHours()).padStart(2, '0') + ':' + String(nx.e.getMinutes()).padStart(2, '0') : '');
      hero = `<div class="vc gl" style="--cc:${col}"><div class="big" style="gap:14px"><svg viewBox="0 0 80 80" width="84" height="84" style="flex:none"><circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,.12)" stroke-width="7"/><circle cx="40" cy="40" r="34" fill="none" stroke="${col}" stroke-width="7" stroke-linecap="round" stroke-dasharray="${(C * fr).toFixed(1)} ${C.toFixed(1)}" transform="rotate(-90 40 40)" style="filter:drop-shadow(0 0 7px ${col})"/><text x="40" y="38" text-anchor="middle" fill="#fff" font-size="19" font-weight="300">${nx.s.getDate()}</text><text x="40" y="52" text-anchor="middle" fill="rgba(255,255,255,.65)" font-size="8.5" letter-spacing="1">${MONTHS[nx.s.getMonth()].slice(0, 3).toUpperCase()}</text></svg>
        <div style="min-width:0"><div style="font-size:11px;letter-spacing:.14em;text-transform:uppercase;opacity:.65">Najbliższe</div><div style="font-size:20px;font-weight:600;line-height:1.2;margin:2px 0">${esc(nx.t)}</div><div style="font-size:13px;opacity:.8">${cd} · ${tm}</div>${nx.loc ? `<div style="font-size:12px;opacity:.6;margin-top:2px">📍 ${esc(nx.loc)}</div>` : ''}</div></div></div>`; }
    const addb = '<button class="row" data-a="evnew" style="margin:0 0 12px"><ha-icon icon="mdi:calendar-plus"></ha-icon><div><b>Dodaj wydarzenie</b><small>do wybranego kalendarza</small></div></button>';
    if (!list.length) return sw + rng + addb + hero + '<div class="vc gl"><div class="empty">Brak wydarzeń w tym okresie ✨</div></div>';
    const g = {}; list.forEach((e) => { const k = e.s.getFullYear() + '-' + e.s.getMonth() + '-' + e.s.getDate(); (g[k] = g[k] || {d: e.s, L: []}).L.push(e); });
    return sw + rng + addb + hero + '<div class="tl">' + Object.keys(g).map((k, gi) => { const x = g[k], dd = Math.round((new Date(x.d.getFullYear(), x.d.getMonth(), x.d.getDate()) - d0) / 86400000);
      return `<div class="tk${dd === 0 ? ' td' : ''}"><div class="dh">${dd === 0 ? 'Dziś' : dd === 1 ? 'Jutro' : DAYS[x.d.getDay()]} · ${x.d.getDate()} ${MONTHS[x.d.getMonth()]}</div>${x.L.map((e) => { const col = cols[Math.max(0, PC.cal.indexOf(e.cal)) % cols.length], past = e.e.getTime() < now.getTime(), cur = e.s.getTime() <= now.getTime() && e.e.getTime() >= now.getTime();
        return this._pEvItem(e, col, past, cur); }).join('')}</div>`; }).join('') + '</div>';
  }
  _pSkFR() {
    const host = this.shadowRoot.getElementById('skf'); if (!host) return; const f = this._pSkF || {}, S = this._skS(), q = S.find((x) => x.k === f.k) || S[0]; if (!q) { host.innerHTML = '<div class="empty">Brak uczniów</div>'; return; }
    const IN = 'width:100%;box-sizing:border-box;border-radius:14px;border:1px solid rgba(255,255,255,.2);background:rgba(255,255,255,.08);color:inherit;font:inherit;padding:12px 14px;margin:6px 0', st = this._hass.states;
    let h = `<div class="stu" style="margin:0 0 10px">${esc(q.nm)}</div>`;
    if (f.mode === 'msg') {
      const R = (this._skR || {})[q.k] || {};
      if (R.err) h += `<div class="vc gl"><div class="empty" style="color:#ffc24b">${/PREMIUM/i.test(R.err) ? 'Lista odbiorców wymaga konta eduVULCAN Premium, więc wysyłanie wiadomości z HA nie jest możliwe dla tego konta.' : 'Nie udało się pobrać listy odbiorców.'}<br><small>${esc(R.err)}</small></div></div>`;
      else if (!R.list) h += '<div class="vc gl"><div class="empty">Wczytuję listę odbiorców…</div></div>';
      else if (!f.rcpt) { const fl = (f.flt || '').toLowerCase(), L = R.list.filter((n) => !fl || n.toLowerCase().includes(fl)).slice(0, 200); h += `<div class="vc gl"><h4>Wybierz odbiorcę (${R.list.length})</h4><input id="sff" placeholder="Szukaj…" value="${esc(f.flt || '')}" style="${IN}"><div id="sfl">${L.map((n) => `<button class="row" data-a="sfr" data-v="${esc(n)}" style="margin-bottom:5px"><ha-icon icon="mdi:account-outline"></ha-icon><div><b style="font-weight:500">${esc(n)}</b></div></button>`).join('')}</div></div>`; }
      else h += `<div class="vc gl"><div class="row" style="margin:0 0 6px;border:0;background:none;padding:0"><ha-icon icon="mdi:account-arrow-right-outline"></ha-icon><div><small>Do:</small><b>${esc(f.rcpt)}</b></div><button data-a="sfc" style="margin-left:auto;padding:7px 13px;border-radius:99px;background:rgba(255,255,255,.14)">Zmień</button></div><input id="sfs" maxlength="200" placeholder="Temat" value="${esc(f.subj || '')}" style="${IN}"><textarea id="sfb" rows="6" maxlength="10000" placeholder="Treść wiadomości" style="${IN}">${esc(f.body || '')}</textarea>${f.cf ? `<div class="foot" style="color:#ffc24b;margin:6px 0">Wiadomość zostanie wysłana do: ${esc(f.rcpt)}. Wysyłka jest nieodwracalna i wlicza się w dzienny limit zapisów. Potwierdzić?</div>` : ''}${f.err ? `<div class="foot" style="color:#ff8a9a;margin:6px 0">${esc(f.err)}</div>` : ''}<button class="row" data-a="sfsend" style="margin:8px 0 0;justify-content:center;background:color-mix(in srgb,var(--a) 28%,transparent)"><ha-icon icon="mdi:send"></ha-icon><div><b>${f.busy ? 'Wysyłam…' : f.cf ? 'Tak, wyślij' : 'Wyślij'}</b></div></button></div>`;
    } else {
      const at = (st[this._skE(q.k, 'do_usprawiedliwienia')] || {attributes: {}}).attributes || {}, items = at.do_usprawiedliwienia || [], dates = [...new Set(items.map((x) => x.data))].sort(), d = dates.includes(f.date) ? f.date : dates[0];
      if (!dates.length) h += '<div class="vc gl"><div class="empty">Brak nieobecności do usprawiedliwienia ✨</div></div>';
      else { const ls = items.filter((x) => x.data === d && x.lekcja != null), sel = f.les || ls.map((x) => x.lekcja), RS = ['Choroba', 'Wizyta lekarska', 'Sprawy rodzinne', 'Ważne sprawy domowe'];
        h += `<div class="vc gl"><h4>Dzień nieobecności</h4><div class="mpsr">${dates.map((x) => `<button class="${x === d ? 'on' : ''}" data-a="sfd" data-v="${esc(x)}">${esc(x)}</button>`).join('')}</div>${ls.length ? `<h4 style="margin-top:14px">Lekcje</h4><div class="mpsr">${ls.map((x) => `<button class="${sel.includes(x.lekcja) ? 'on' : ''}" data-a="sfl" data-v="${x.lekcja}">${x.lekcja}${x.przedmiot ? ' · ' + esc(x.przedmiot) : ''}</button>`).join('')}</div>` : ''}<h4 style="margin-top:14px">Powód</h4><div class="mpsr">${RS.map((x) => `<button data-a="sfp" data-v="${esc(x)}">${esc(x)}</button>`).join('')}</div><textarea id="sfj" rows="3" placeholder="Powód (min. 3 znaki)" style="${IN}">${esc(f.reason || '')}</textarea>${f.cf ? `<div class="foot" style="color:#ffc24b;margin:6px 0">Usprawiedliwienie z dnia ${esc(d)} zostanie wysłane do dziennika i jest nieodwracalne. Potwierdzić?</div>` : ''}${f.err ? `<div class="foot" style="color:#ff8a9a;margin:6px 0">${esc(f.err)}</div>` : ''}<button class="row" data-a="sfjs" style="margin:8px 0 0;justify-content:center;background:color-mix(in srgb,var(--a) 28%,transparent)"><ha-icon icon="mdi:check-decagram-outline"></ha-icon><div><b>${f.busy ? 'Wysyłam…' : f.cf ? 'Tak, usprawiedliw' : 'Usprawiedliw'}</b></div></button></div>`; f.date = d; f.les = sel; }
    }
    host.innerHTML = h;
    const tx = (id, key) => { const e = host.querySelector('#' + id); if (e) e.oninput = () => { f[key] = e.value; if (f.cf) { f.cf = false; this._pSkFR(); const n = host.querySelector('#' + id); if (n) { n.focus(); n.setSelectionRange(n.value.length, n.value.length); } } }; };
    tx('sfs', 'subj'); tx('sfb', 'body'); tx('sfj', 'reason');
    const fl = host.querySelector('#sff'); if (fl) fl.oninput = () => { f.flt = fl.value; const R = (this._skR || {})[q.k] || {}, ql = fl.value.toLowerCase(); host.querySelector('#sfl').innerHTML = (R.list || []).filter((n) => !ql || n.toLowerCase().includes(ql)).slice(0, 200).map((n) => `<button class="row" data-a="sfr" data-v="${esc(n)}" style="margin-bottom:5px"><ha-icon icon="mdi:account-outline"></ha-icon><div><b style="font-weight:500">${esc(n)}</b></div></button>`).join(''); };
  }
  async _pSkSend() {
    const f = this._pSkF, q = this._skS().find((x) => x.k === f.k); if (!q || f.busy) return; const j = f.mode === 'jus';
    if (j) { if ((f.reason || '').trim().length < 3) { f.err = 'Wpisz powód (min. 3 znaki).'; f.cf = false; return this._pSkFR(); } if (!(f.les || []).length && this._hass.states[this._skE(q.k, 'do_usprawiedliwienia')] && ((this._hass.states[this._skE(q.k, 'do_usprawiedliwienia')].attributes.do_usprawiedliwienia || []).some((x) => x.data === f.date && x.lekcja != null))) { f.err = 'Zaznacz co najmniej jedną lekcję.'; f.cf = false; return this._pSkFR(); } }
    else if (!f.rcpt || !(f.subj || '').trim() || !(f.body || '').trim()) { f.err = 'Wybierz odbiorcę oraz wpisz temat i treść.'; f.cf = false; return this._pSkFR(); }
    if (!f.cf) { f.cf = true; f.err = ''; return this._pSkFR(); }
    f.busy = true; f.err = ''; this._pSkFR();
    try { const data = j ? {date: f.date, reason: f.reason.trim()} : {recipient: f.rcpt, subject: f.subj.trim(), message: f.body.trim()}; if (j && (f.les || []).length) data.lessons = f.les;
      await this._hass.callWS({type: 'call_service', domain: 'vulcan_dom', service: j ? 'justify_absence' : 'send_message', service_data: Object.assign({pupil: q.nm}, data), return_response: true});
      this._pToast(j ? 'Usprawiedliwiono nieobecność' : 'Wysłano wiadomość'); if (this._skM && this._skM[q.k]) this._skM[q.k].t = 0; this._pSkF = null; this._pBack(); }
    catch (e) { f.busy = false; f.cf = false; f.err = (e && (e.message || e.code)) || 'Nie udało się'; this._pSkFR(); }
  }
  _pSkSeen() { let sn = {}; try { sn = JSON.parse(localStorage.getItem('pastel_sk_seen') || '{}') || {}; } catch (e) { sn = {}; } const cur = this._skSnap(), o = {}; Object.keys(cur).forEach((k) => { const c = cur[k], b = sn[k] || c; o[k] = {u: c.u > b.u, j: c.j > b.j, n: c.n > b.n, z: c.z > b.z, e: c.e > b.e, g: !!c.g && c.g !== b.g}; }); return o; }
  _pLeaveSk() { if (this._vw && this._vw.k === 'szkola') { try { this._skSeen(); } catch (e) { /* ignore */ } } }
  _vw_szkola() {
    let S = []; try { S = this._skS(); } catch (e) { S = []; } if (!S.length) return '<div class="vc gl"><div class="empty">Nie znaleziono encji szkoły (integracja eduVULCAN)</div></div>';
    const q = S.find((x) => x.k === this._pSk.k) || S[0]; this._pSk.k = q.k; const t = this._pSk.t || 'przeglad', st = this._hass.states, k = q.k;
    if (!this._pSkN) this._pSkN = this._pSkSeen();   /* nowosci liczone wzgledem ostatniej wizyty; oznaczamy po wyjsciu z widoku */
    const NW = this._pSkN[k] || {}, V = (x) => { const o = st[this._skE(k, x)]; return o ? o.state : undefined; }, A = (x) => (st[this._skE(k, x)] || {attributes: {}}).attributes || {}, ok = (v) => v !== undefined && v !== 'unknown' && v !== 'unavailable' && v !== '';
    const nb = (f) => f ? '<span class="nwb">NOWE</span>' : '', AVC = ['#7aa2ff', '#f472b6', '#34d399', '#fbbf24'], si = S.indexOf(q), d0 = new Date(); d0.setHours(0, 0, 0, 0);
    const gc = (g) => { const d = parseInt((String(g).match(/[0-9]/) || [''])[0], 10); return !d ? 'g0' : d >= 6 ? 'g6' : 'g' + d; }, fm = (n) => String(n).replace('.', ',');
    this._skLoad(k); const cal = (this._skCal || {})[k] || {plan: [], duty: [], t: 0};
    const nwAny = (x) => x && (x.u || x.j || x.n || x.z || x.e || x.g);
    const sel = `<div class="tabs">${S.map((x, i) => `<button class="${x.k === k ? 'on' : ''}" data-a="skp" data-k="${esc(x.k)}"><span style="display:inline-grid;place-items:center;width:20px;height:20px;border-radius:50%;background:${AVC[i % 4]};color:#08121f;font-weight:700;font-size:11px;margin-right:7px">${esc(String(x.nm).charAt(0))}</span>${esc(String(x.nm).split(' ')[0])}${nwAny(this._pSkN[x.k]) ? '<span class="nwb">•</span>' : ''}</button>`).join('')}</div>`;
    const TB = [['przeglad', 'Przegląd'], ['oceny', 'Oceny'], ['plan', 'Plan'], ['zadania', 'Zadania'], ['frekwencja', 'Frekwencja'], ['wiadomosci', 'Wiadomości']];
    const tabs = `<div class="tabs">${TB.map((x) => `<button class="${t === x[0] ? 'on' : ''}" data-a="skt" data-t="${x[0]}">${x[1]}${x[0] === 'oceny' && NW.g ? '<span class="nwb">•</span>' : x[0] === 'wiadomosci' && NW.u ? '<span class="nwb">•</span>' : x[0] === 'frekwencja' && NW.j ? '<span class="nwb">•</span>' : x[0] === 'zadania' && NW.e ? '<span class="nwb">•</span>' : x[0] === 'plan' && NW.z ? '<span class="nwb">•</span>' : ''}</button>`).join('')}</div>`;
    const lt = (iso) => { const d = new Date(iso); return isNaN(d) ? '—' : String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0'); };
    let body = '';
    if (t === 'przeglad') {
      const avg = ok(V('oceny')) ? parseFloat(V('oceny')) : null, la = A('ostatnia_ocena'), lg = V('ostatnia_ocena'), at = A('do_usprawiedliwienia'), nt = A('uwagi'), l0 = A('pierwsza_lekcja_dzis'), l1 = A('pierwsza_lekcja_jutro'), chg = A('zmiany_w_planie_7_dni').zmiany || [];
      body = `<div class="vc gl"><div class="tg"><div><b style="color:${avg >= 5 ? '#3fe0a5' : avg >= 4 ? '#b4e36b' : avg >= 3 ? '#ffc24b' : avg ? '#ff6b81' : 'inherit'}">${avg === null || isNaN(avg) ? '—' : fm(avg.toFixed(2))}</b><small>średnia</small></div><div><b>${ok(lg) ? esc(lg) : '—'}</b><small>ostatnia ocena${nb(NW.g)}</small>${la && la.przedmiot ? `<small style="text-transform:none;letter-spacing:0;margin-top:3px">${esc(la.przedmiot)}</small>` : ''}</div>
        <div><b>${at.frekwencja_procent != null ? fm(Math.round(at.frekwencja_procent * 10) / 10) + '%' : '—'}</b><small>frekwencja${nb(NW.j)}</small></div><div><b>${ok(V('szczesliwy_numerek')) ? esc(V('szczesliwy_numerek')) : '—'}</b><small>szczęśliwy numerek</small></div>
        <div><b>${nt.pozytywne != null ? '+' + nt.pozytywne + ' / −' + nt.negatywne : '—'}</b><small>uwagi${nb(NW.n)}</small></div><div><b>${ok(V('nieprzeczytane_wiadomosci')) ? esc(V('nieprzeczytane_wiadomosci')) : '0'}</b><small>nieprzeczytane${nb(NW.u)}</small></div></div></div>
        <div class="vc gl"><h4>Najbliższe lekcje</h4>${[['Dziś', l0], ['Jutro', l1]].map(([lb, a]) => a && a.przedmiot ? `<div class="ls"><div class="tm"><b style="font-size:15px">${lt(V(lb === 'Dziś' ? 'pierwsza_lekcja_dzis' : 'pierwsza_lekcja_jutro'))}</b>${lb}</div><div><b>${esc(a.przedmiot)}</b><small>${a.lekcja ? 'lekcja ' + a.lekcja + ' · ' : ''}${a.sala ? 'sala ' + esc(a.sala) : ''}${a.nauczyciel ? ' · ' + esc(a.nauczyciel) : ''}${a.zmiana ? ' · zmiana w planie' : ''}</small></div></div>` : `<div class="ls"><div class="tm">${lb}</div><div><b style="opacity:.6">brak zajęć</b></div></div>`).join('')}</div>
        ${chg.length ? `<div class="vc gl" style="border-color:#ffb34088"><h4>Zmiany w planie${nb(NW.z)}</h4>${chg.slice(0, 6).map((x) => `<div class="row" style="margin-bottom:6px"><ha-icon icon="mdi:swap-horizontal"></ha-icon><div><b>${esc(typeof x === 'string' ? x : (x.przedmiot || x.opis || x.zmiana || JSON.stringify(x)))}</b><small>${esc(typeof x === 'object' ? (x.data || x.dzien || '') : '')}</small></div></div>`).join('')}</div>` : ''}
        ${ok(V('najblizszy_sprawdzian')) ? `<div class="vc gl"><h4>Najbliższy sprawdzian</h4><div style="font-size:16px;font-weight:600">${esc(V('najblizszy_sprawdzian'))}</div></div>` : ''}`;
    } else if (t === 'oceny') {
      const P = (A('oceny').przedmioty || []).slice().sort((a, b) => String(a.przedmiot).localeCompare(String(b.przedmiot), 'pl'));
      body = P.length ? P.map((p, i) => { const gs = (p.oceny || []).slice().sort((a, b) => String(b.data).localeCompare(String(a.data))), vals = gs.map((g) => { const d = parseInt((String(g.ocena).match(/[0-9]/) || [''])[0], 10); if (!d) return null; return [d + (/\+/.test(g.ocena) ? .5 : /[-−]/.test(g.ocena) ? -.25 : 0), g.waga || 1]; }).filter(Boolean), wsum = vals.reduce((x, y) => x + y[1], 0), av = wsum ? vals.reduce((x, y) => x + y[0] * y[1], 0) / wsum : null, key = 'sj:' + k + ':' + i, open = this._pSkx.has(key);
        return `<div class="sj${open ? ' open' : ''}"><button data-a="exp" data-k="${esc(key)}"><span class="sn">${esc(p.przedmiot)}</span><span class="sa" style="color:${av === null ? 'inherit' : av >= 5 ? '#3fe0a5' : av >= 4 ? '#b4e36b' : av >= 3 ? '#ffc24b' : '#ff6b81'}">${av === null ? '' : fm(av.toFixed(2))}</span><ha-icon class="chev" icon="mdi:chevron-down" style="opacity:.6"></ha-icon></button>
          <div class="gl3">${gs.slice(0, 8).map((g) => `<span class="gd ${gc(g.ocena)}">${esc(g.ocena)}</span>`).join('')}</div><div class="sdt">${gs.map((g) => `<div class="gr"><span class="gd ${gc(g.ocena)}">${esc(g.ocena)}</span><div style="flex:1;min-width:0"><b style="font-weight:500">${esc(g.kolumna || '')}</b><small>${esc(String(g.data || '').slice(0, 10))} · waga ${esc(g.waga != null ? g.waga : 1)}</small></div></div>`).join('')}</div></div>`; }).join('') : '<div class="vc gl"><div class="empty">Brak ocen</div></div>';
    } else if (t === 'plan') {
      const ev = (cal.plan || []).slice().sort((a, b) => a.s - b.s), now = Date.now(), days = {};
      ev.forEach((e) => { const dk = e.s.getFullYear() + '-' + e.s.getMonth() + '-' + e.s.getDate(); (days[dk] = days[dk] || {d: e.s, L: []}).L.push(e); });
      const ks = Object.keys(days).slice(0, 6);
      body = ks.length ? ks.map((dk) => { const x = days[dk], dd = Math.round((new Date(x.d.getFullYear(), x.d.getMonth(), x.d.getDate()) - d0) / 86400000);
        return `<div class="sec" style="padding:0;margin:14px 0 8px">${dd === 0 ? 'Dziś' : dd === 1 ? 'Jutro' : DAYS[x.d.getDay()]} · ${x.d.getDate()} ${MONTHS[x.d.getMonth()]}</div>` + x.L.map((e, i) => { const cur = e.s.getTime() <= now && e.e.getTime() >= now, past = e.e.getTime() < now; return `<div class="ls${cur ? ' cur' : ''}${past ? ' past' : ''}"><div class="tm"><b style="font-size:14px">${lt(e.s)}</b>${lt(e.e)}</div><div><b>${esc(e.t)}</b><small>${e.loc ? 'sala ' + esc(e.loc) : ''}${cur ? ' · trwa teraz' : ''}${e.desc ? ' · ' + esc(String(e.desc).slice(0, 60)) : ''}</small></div></div>`; }).join(''); }).join('') : `<div class="vc gl"><div class="empty">${cal.t ? 'Brak zajęć w najbliższych dniach' : 'Wczytuję plan…'}</div></div>`;
    } else if (t === 'zadania') {
      const duty = (cal.duty || []).map((ev) => { const dd = Math.round((new Date(ev.s.getFullYear(), ev.s.getMonth(), ev.s.getDate()) - d0) / 86400000), m = /^([^:]+):\s*(.*)$/.exec(ev.t) || []; return {dd, kind: (m[1] || 'Sprawdzian').trim(), subj: (m[2] || ev.t).trim(), s: ev.s, desc: ev.desc}; }).filter((x) => x.dd >= 0).sort((a, b) => a.dd - b.dd);
      body = duty.length ? duty.map((x) => `<div class="sk"><ha-icon icon="${/^zadanie/i.test(x.kind) ? 'mdi:notebook-edit-outline' : 'mdi:clipboard-text-clock-outline'}" style="color:var(--a)"></ha-icon><div><b>${esc(x.subj)}</b><small>${esc(x.kind)} · ${x.s.getDate()} ${MONTHS[x.s.getMonth()]}${x.desc ? ' · ' + esc(String(x.desc).slice(0, 70)) : ''}</small></div><span class="wh${x.dd <= 1 ? ' soon' : ''}">${x.dd === 0 ? 'dziś' : x.dd === 1 ? 'jutro' : 'za ' + x.dd + ' dni'}</span></div>`).join('') : `<div class="vc gl"><div class="empty">${cal.t ? 'Brak sprawdzianów i zadań na najbliższe tygodnie ✨' : 'Wczytuję…'}</div></div>`;
    } else if (t === 'frekwencja') {
      const at = A('do_usprawiedliwienia'), nt = A('uwagi'), pc = at.frekwencja_procent, C = 2 * Math.PI * 52, lst = at.do_usprawiedliwienia || [];
      body = `<div class="vc gl" style="text-align:center"><svg viewBox="0 0 120 120" width="170" height="170"><circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,.1)" stroke-width="9"/><circle cx="60" cy="60" r="52" fill="none" stroke="${pc >= 90 ? '#3fe0a5' : pc >= 75 ? '#ffc24b' : '#ff5d73'}" stroke-width="9" stroke-linecap="round" stroke-dasharray="${(C * Math.max(.03, (pc || 0) / 100)).toFixed(1)} ${C.toFixed(1)}" transform="rotate(-90 60 60)" style="filter:drop-shadow(0 0 8px ${pc >= 90 ? '#3fe0a5' : '#ffc24b'})"/><text x="60" y="66" text-anchor="middle" fill="#fff" font-size="24" font-weight="300">${pc != null ? fm(Math.round(pc * 10) / 10) + '%' : '—'}</text></svg>
        <div class="kv" style="grid-template-columns:repeat(3,1fr)"><div><b>${at.nieobecnosci != null ? at.nieobecnosci : '—'}</b><small>nieobecności</small></div><div><b>${at.spoznienia != null ? at.spoznienia : '—'}</b><small>spóźnienia</small></div><div><b>${at.lekcji_w_oknie != null ? at.lekcji_w_oknie : '—'}</b><small>lekcji w oknie</small></div></div></div>
        <div class="vc gl"><h4>Do usprawiedliwienia${nb(NW.j)}</h4>${lst.length ? lst.map((x) => `<div class="row" style="margin-bottom:6px"><ha-icon icon="mdi:calendar-alert"></ha-icon><div><b>${esc(typeof x === 'string' ? x : (x.data || x.date || x.przedmiot || JSON.stringify(x)))}</b><small>${esc(typeof x === 'object' ? [x.przedmiot, x.lekcja != null ? 'lekcja ' + x.lekcja : '', x.rodzaj].filter(Boolean).join(' · ') : '')}</small></div></div>`).join('') : '<div class="empty">Wszystko usprawiedliwione ✨</div>'}${lst.length ? '<button class="row" data-a="skform" data-m="jus" style="margin:10px 0 0"><ha-icon icon="mdi:check-decagram-outline"></ha-icon><div><b>Usprawiedliw nieobecność</b><small>wyślij do dziennika</small></div></button>' : ''}</div>
        <div class="vc gl"><h4>Uwagi${nb(NW.n)}</h4><div class="kv" style="grid-template-columns:1fr 1fr;margin-top:0"><div><b style="color:#3fe0a5">${nt.pozytywne != null ? nt.pozytywne : '—'}</b><small>pozytywne</small></div><div><b style="color:#ff6b81">${nt.negatywne != null ? nt.negatywne : '—'}</b><small>negatywne</small></div></div></div>`;
    } else {
      const un = A('nieprzeczytane_wiadomosci'), unl = un.ostatnie || [], mm = (this._skM || {})[k], nU = ok(V('nieprzeczytane_wiadomosci')) ? parseInt(V('nieprzeczytane_wiadomosci'), 10) || 0 : 0;
      if (!mm || (!mm.busy && Date.now() - (mm.t || 0) > 120000)) setTimeout(() => this._skMsgs(q), 0);   /* skrzynka laduje sie sama, co najwyzej raz na 2 min; tresc nie siedzi w encjach */
      const prem = ((this._skR || {})[k] || {}).err && /PREMIUM/i.test(this._skR[k].err), fd = (iso) => { const d = new Date(iso); return isNaN(d) ? '' : d.toLocaleString('pl-PL', {day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'}); };
      body = `<div class="vc gl"><div class="big" style="gap:12px"><ha-icon icon="mdi:email-outline"></ha-icon><div><b style="font-size:40px">${nU}</b><span>nieprzeczytane${nb(NW.u)}</span></div></div></div>`
        + (unl.length ? `<div class="vc gl"><h4>Nieprzeczytane</h4>${unl.map((x) => `<div class="row" style="margin-bottom:6px"><ha-icon icon="mdi:email-alert-outline" style="color:#ffb340"></ha-icon><div><b>${esc(typeof x === 'string' ? x : (x.temat || x.subject || x.title || 'Wiadomość'))}</b></div></div>`).join('')}</div>` : '')
        + (!mm || (mm.busy && !mm.list && !mm.err) ? '<div class="vc gl"><div class="empty">Wczytuję wiadomości…</div></div>'
          : mm.err ? `<div class="vc gl"><div class="empty" style="color:#ff8a9a">Nie udało się pobrać wiadomości: ${esc(mm.err)}</div></div>`
          : mm.list && mm.list.length ? mm.list.map((x, i) => { const key = 'msg:' + k + ':' + (x.key || i), open = this._pExp.has(key), txt = this._skTxt(x.content).slice(0, 3500);
            return `<div class="iw${open ? ' open' : ''}"><button class="row" data-a="exp" data-k="${esc(key)}"><ha-icon icon="${x.read ? 'mdi:email-open-outline' : 'mdi:email-alert-outline'}" style="color:${x.read ? 'var(--a)' : '#ffb340'}"></ha-icon><div style="min-width:0"><b style="${x.read ? 'font-weight:500' : ''}">${esc(x.subject || '(bez tematu)')}${x.read ? '' : '<span class="nwb">NOWA</span>'}</b><small>${esc(x.sender || '')}${x.sent ? ' · ' + fd(x.sent) : ''}</small></div><ha-icon class="chev" icon="mdi:chevron-down"></ha-icon></button><div class="det" style="padding-left:14px;white-space:pre-wrap">${esc(txt) || '<span style="opacity:.6">(brak treści)</span>'}</div></div>`; }).join('')
          : `<div class="vc gl"><div class="empty">${prem ? 'Skrzynka jest niedostępna: dziennik wymaga konta eduVULCAN Premium (błąd 111), więc nie można odczytać wiadomości.' : 'Brak wiadomości'}</div></div>`)
        + `<button class="row" data-a="skform" data-m="msg"><ha-icon icon="mdi:email-edit-outline"></ha-icon><div><b>Napisz wiadomość</b><small>do nauczyciela lub wychowawcy</small></div></button>`
        + `<button class="row" data-a="skmsgs"><ha-icon icon="mdi:email-sync-outline"></ha-icon><div><b>${mm && mm.busy ? 'Odświeżam…' : 'Odśwież wiadomości'}</b><small>pobierz skrzynkę z dziennika</small></div></button>`;
    }
    return `<div class="stu" style="margin:0 0 10px"><span class="av" style="background:${AVC[si % 4]}">${esc(String(q.nm).charAt(0))}</span>${esc(q.nm)}</div>` + (S.length > 1 ? sel : '') + tabs + body;
  }
  _vw_baterie() {
    const nm = (e) => String((this._hass.states[e] || {attributes: {}}).attributes.friendly_name || e).replace(/\s*(bateria|battery|poziom baterii)\s*$/i, ''), low = PC.batLow || 30, crit = PC.batCrit || 10;
    const L = (PC.bats || []).map((e) => ({e, n: nm(e), v: this._n(e)})).sort((a, b) => (a.v === null ? 999 : a.v) - (b.v === null ? 999 : b.v)); if (!L.length) return '<div class="vc gl"><div class="empty">Brak skonfigurowanych baterii</div></div>';
    const col = (v) => v === null ? '#8b94a8' : v <= crit ? '#ff5d73' : v <= low ? '#ffc24b' : '#3fe0a5', bad = L.filter((x) => x.v !== null && x.v <= low).length;
    return `<div class="vc gl"><div class="big"><ha-icon icon="mdi:battery-heart-variant"></ha-icon><div><b style="font-size:40px">${L.length}</b><span>${bad ? bad + ' do wymiany lub ładowania' : 'wszystkie baterie w porządku'}</span></div></div></div><div class="vc gl">${L.map((x) => `<div class="bt"><div class="nm">${esc(x.n)}</div><div class="bw"><div class="barw"><i style="width:${x.v === null ? 0 : Math.max(3, x.v)}%;background:${col(x.v)};box-shadow:0 0 10px ${col(x.v)}"></i></div></div><b style="color:${col(x.v)}">${x.v === null ? '—' : Math.round(x.v) + '%'}</b></div>`).join('')}</div>`;
  }
  _vw_klimat() {
    const rooms = this._roomsL().filter((r) => r.t || r.h);
    return rooms.map((r) => { const p = this._pal(r.c), t = r.t ? this._n(r.t) : null, h = r.h ? this._n(r.h) : null, pts = r.t ? this._pHistPts(r.t) : null;
      return `<button class="vc gl" style="width:100%;text-align:left" data-a="room" data-r="${esc(r.id)}"><div style="display:flex;align-items:center;gap:10px;margin-bottom:8px"><span style="width:38px;height:38px;border-radius:13px;display:grid;place-items:center;background:color-mix(in srgb,${p[1]} 28%,transparent);color:${p[1]}"><ha-icon icon="${r.icon || 'mdi:home'}"></ha-icon></span><b style="font-size:17px;flex:1">${esc(r.name)}</b><b style="font-size:26px;font-weight:300">${t === null ? '—' : t.toFixed(1).replace('.', ',') + '°'}</b>${h === null ? '' : `<span style="color:#8fd6ff;font-size:15px">${Math.round(h)}%</span>`}</div>${this._pSpark(pts, p[1], 1, '°')}</button>`; }).join('') || '<div class="vc gl"><div class="empty">Brak czujników</div></div>';
  }
  _vw_powietrze() {
    const air = this._pPm(), pur = PC.purifier, o = pur ? this._hass.states[pur] : null, on = o && o.state === 'on', modes = (o && o.attributes.preset_modes) || [], pm = o && o.attributes.preset_mode, C = 2 * Math.PI * 52;
    const frac = air[2] === null ? 0 : Math.min(1, air[2] / ((PC.pmLv || [10, 25, 35, 50])[3] * 1.4)), pts = PC.pm ? this._pHistPts(PC.pm) : null; let fl = null; try { fl = this._flt(); } catch (e) { fl = null; }
    return `<div class="vc gl" style="text-align:center"><svg viewBox="0 0 120 120" width="190" height="190"><circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,.1)" stroke-width="9"/><circle cx="60" cy="60" r="52" fill="none" stroke="${air[1]}" stroke-width="9" stroke-linecap="round" stroke-dasharray="${(C * Math.max(.04, frac)).toFixed(1)} ${C.toFixed(1)}" transform="rotate(-90 60 60)" style="filter:drop-shadow(0 0 8px ${air[1]})"/><text x="60" y="64" text-anchor="middle" fill="#fff" font-size="26" font-weight="300">${air[2] === null ? '—' : Math.round(air[2])}</text><text x="60" y="80" text-anchor="middle" fill="rgba(255,255,255,.6)" font-size="9">µg/m³ PM2.5</text></svg>
      <div style="font-size:22px;font-weight:600;color:${air[1]}">${air[0]}</div><div style="opacity:.65;font-size:12px;margin-top:2px">norma WHO: 15 µg/m³ (doba)</div></div>
      ${pur ? `<div class="vc gl"><h4>Oczyszczacz</h4><button class="row${on ? ' on' : ''}" data-a="purifier"><ha-icon icon="mdi:air-purifier"></ha-icon><div><b>${on ? 'Pracuje' : 'Wyłączony'}</b><small>${pm ? 'tryb: ' + esc(pm) : 'dotknij, aby ' + (on ? 'wyłączyć' : 'włączyć')}</small></div><span class="sw"></span></button>${modes.length ? `<div class="sg">${modes.map((m) => `<button class="${m === pm ? 'on' : ''}" data-a="pmode" data-m="${esc(m)}">${esc(m.charAt(0).toUpperCase() + m.slice(1))}</button>`).join('')}</div>` : ''}</div>` : ''}
      <div class="vc gl"><h4>PM2.5 · 24 h</h4>${this._pSpark(pts, air[1], 0, '')}</div>${fl ? `<div class="vc gl"><h4>Filtr</h4><div class="barw"><i style="width:${fl.life}%;background:${fl.sev ? (fl.sev > 1 ? '#ff5d73' : '#ffc24b') : '#3fe0a5'}"></i></div><div class="mm"><span>pozostało <b>${Math.round(fl.life)}%</b></span><span>${fl.left != null ? '≈ ' + fl.left + ' godz. do wymiany' : ''}</span></div></div>` : ''}`;
  }
  _vw_pokoj(id) {
    const r = (PC.rooms || []).find((x) => x.id === id); if (!r) return '<div class="empty">Nie znaleziono pokoju</div>';
    const t = r.t ? this._n(r.t) : null, h = r.h ? this._n(r.h) : null, lx = r.lux ? this._n(r.lux) : null, on = r.occ && this._s(r.occ) === 'on', st = this._hass.states;
    const dev = (r.dev || []), mp = (r.mp || []).filter((e) => st[e]);
    const cT = r.t ? this._pSpark(this._pHistPts(r.t), '#ff6b81', 1, '°') : '', cH = r.h ? this._pSpark(this._pHistPts(r.h), '#5ec8ff', 0, '%') : '';
    const kv = [t === null ? '' : `<div><b>${t.toFixed(1).replace('.', ',')}°</b><small>temperatura</small></div>`, h === null ? '' : `<div><b>${Math.round(h)}%</b><small>wilgotność</small></div>`, lx === null ? '' : `<div><b>${Math.round(lx)} lx</b><small>światło</small></div>`].filter(Boolean);   /* pokazuje tylko czujniki, ktore pokoj ma (np. przedpokoj: samo swiatlo) */
    return `<div class="vc gl"><div class="kv" style="margin-top:0;grid-template-columns:repeat(${Math.max(1, kv.length)},1fr)">${kv.join('')}</div>${r.occ ? `<div style="margin-top:12px;text-align:center"><span class="occ${on ? ' on' : ''}"><i></i>${on ? 'ktoś jest w pokoju' : 'pusto'}</span></div>` : ''}</div>
      ${(() => { const au = r.auto ? this._s(r.auto) : ''; if (!r.auto || au === 'unavailable' || !au) return ''; const o = au === 'on', fn = (st[r.auto].attributes || {}).friendly_name || 'Automatyka świateł'; return `<div class="vc gl"><h4>Automatyka</h4><button class="row${o ? ' on' : ''}" data-a="aut" data-e="${esc(r.auto)}"><ha-icon icon="${o ? 'mdi:timer-outline' : 'mdi:timer-off-outline'}"></ha-icon><div><b>Automatyczne gaszenie świateł</b><small>${esc(fn)} · ${o ? 'włączona' : 'wyłączona'}</small></div><span class="sw"></span></button></div>`; })()}
      ${r.msg ? `<div class="vc gl"><h4>Panel w pokoju</h4><button class="row" data-a="msgdlg" data-r="${esc(r.id)}"><ha-icon icon="mdi:message-text-outline"></ha-icon><div><b>Wyślij wiadomość na panel</b><small>tekst wyświetli się na ekranie w pokoju</small></div></button></div>` : ''}
      ${dev.length ? '<div class="vc gl"><h4>Urządzenia</h4>' + dev.map((x) => { const s = this._s(x[0]), o = s === 'on'; return `<button class="row${o ? ' on' : ''}" data-a="tg" data-e="${esc(x[0])}"><ha-icon icon="${x[2] || 'mdi:power'}"></ha-icon><div><b>${esc(x[1])}</b><small>${o ? 'włączone' : s === 'unavailable' ? 'niedostępne' : 'wyłączone'}</small></div>${this._pBp(x[0]) ? `<i class="bp">${this._pBp(x[0])}</i>` : ''}<span class="sw"></span></button>`; }).join('') + '</div>' : ''}
      ${mp.length ? '<div class="vc gl"><h4>Multimedia</h4>' + mp.map((e) => this._pMp(e)).join('') + '</div>' : ''}
      ${cT ? `<div class="vc gl"><h4>Temperatura · 24 h</h4>${cT}</div>` : ''}${cH ? `<div class="vc gl"><h4>Wilgotność · 24 h</h4>${cH}</div>` : ''}`;
  }
  _pMp(e) {
    const o = this._hass.states[e]; if (!o) return ''; const a = o.attributes || {}, on = !['off', 'unavailable', 'unknown', 'standby'].includes(o.state), pl = o.state === 'playing', nm = a.friendly_name || e, key = 'mp:' + e, open = this._pExp.has(key), sf = a.supported_features || 0;
    const bt = (act, ic, lb, x) => `<button data-a="${act}" data-e="${esc(e)}"${x || ''} aria-label="${lb}"><ha-icon icon="${ic}"></ha-icon></button>`, vol = a.volume_level != null ? Math.round(a.volume_level * 100) : null, srcs = (a.source_list || []).slice(0, 10);
    return `<div class="iw mpx${open ? ' open' : ''}${on ? ' on' : ''}"><div class="mp${on ? ' on' : ''}" data-a="exp" data-k="${esc(key)}" style="margin:0;border:0;cursor:pointer"><span class="mi"><ha-icon icon="${/radio/i.test(nm) ? 'mdi:radio' : /dekoder|decoder|box/i.test(nm) ? 'mdi:set-top-box' : 'mdi:television'}"></ha-icon></span><div><b>${esc(nm)}</b><small>${esc(a.media_title || (o.state === 'unavailable' ? 'niedostępny' : o.state === 'off' ? 'wyłączony' : o.state))}</small></div><div class="ct">${on ? bt('mpp', pl ? 'mdi:pause' : 'mdi:play', 'Odtwarzanie') : ''}<ha-icon class="chev" icon="mdi:chevron-down" style="align-self:center"></ha-icon></div></div>
      <div class="det mpd"><div class="mpc">${bt('mpa', 'mdi:skip-previous', 'Poprzedni', ' data-s="media_previous_track"')}${bt('mpp', pl ? 'mdi:pause' : 'mdi:play', 'Odtwarzanie')}${bt('mpa', 'mdi:skip-next', 'Następny', ' data-s="media_next_track"')}${bt('mpa', 'mdi:stop', 'Stop', ' data-s="media_stop"')}${bt('mpa', o.state === 'off' ? 'mdi:power' : 'mdi:power-standby', 'Zasilanie', ' data-s="' + (o.state === 'off' ? 'turn_on' : 'turn_off') + '"')}</div>
      ${vol !== null ? `<div class="mpc" style="gap:10px"><button data-a="mpm" data-e="${esc(e)}" aria-label="Wycisz"><ha-icon icon="${a.is_volume_muted ? 'mdi:volume-off' : 'mdi:volume-high'}"></ha-icon></button><input type="range" min="0" max="100" value="${vol}" data-a="mps" data-e="${esc(e)}" style="flex:1;accent-color:var(--a)"><b style="width:38px;text-align:right;font-size:13px">${vol}%</b></div>` : ''}
      ${srcs.length ? `<div class="mpsr">${srcs.map((x) => `<button class="${a.source === x ? 'on' : ''}" data-a="mpsrc" data-e="${esc(e)}" data-v="${esc(x)}">${esc(x)}</button>`).join('')}</div>` : ''}</div></div>`;
  }
  _pGdLoad(id, force, mode) {
    const key = id + (mode === 'allow' ? '_ok' : ''), ent = 'todo.guard_' + id + (mode === 'allow' ? '_dozwolone' : '');
    this._pGd = this._pGd || {}; const c = this._pGd[key]; if (c && (c.busy || (!force && Date.now() - c.t < 60000))) return; this._pGd[key] = Object.assign({items: []}, c, {busy: true, t: Date.now()});
    this._hass.callWS({type: 'todo/item/list', entity_id: ent}).then((r) => { this._pGd[key] = {items: (r && r.items) || [], t: Date.now()}; }).catch(() => { this._pGd[key] = {items: (c && c.items) || [], t: Date.now()}; })
      .then(() => { if (this._ovK === 'sheet' && (this._shF === 'guardapps' || this._shF === 'glim')) this._pSheet(this._shF); else if (this._vw && this._vw.k === 'guard') this._pVRender(true); });
  }
  _pGdTime(g) {   /* czas w aplikacjach, bonus, prosby, znajdz telefon, harmonogram, nagroda */
    const S = this._hass.states, id = g.id, u = S['sensor.aurora_guard_' + id + '_usage'], at = (u && u.attributes) || {}, apps = (at.apps || []).slice(0, 5), wk = at.week || [], tot = u ? parseInt(u.state, 10) || 0 : 0, num = (e) => { const x = S[e]; return x ? Math.round(parseFloat(x.state)) || 0 : null; };
    const fm = (m) => m >= 60 ? Math.floor(m / 60) + ' godz. ' + (m % 60 ? m % 60 + ' min' : '') : m + ' min', bonus = num('input_number.guard_bonus_' + id), rew = num('input_number.guard_nagroda_' + id), mx = Math.max.apply(null, apps.map((x) => x.m).concat([1])), wmx = Math.max.apply(null, wk.concat([1]));
    const DN = ['Nd', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So'], p2 = (n) => String(n).padStart(2, '0'), days = at.days || [], dayOff = (this._gdDay = this._gdDay || {})[id] || 0, maxOff = Math.max(days.length ? days.length - 1 : 0, wk.length ? wk.length - 1 : 0, 0);
    const dk = (o) => { const d = new Date(Date.now() - o * 86400000); return d.getFullYear() + '-' + p2(d.getMonth() + 1) + '-' + p2(d.getDate()); }, ent = (o) => days.find((x) => x.d === dk(o)), tt = (o) => { if (o === 0) return tot; const e = ent(o); return e ? e.t : (wk.length > o ? wk[wk.length - 1 - o] : null); };
    const off = Math.min(dayOff, maxOff), dd = new Date(Date.now() - off * 86400000), lbl = off === 0 ? 'Dziś' : off === 1 ? 'Wczoraj' : DN[dd.getDay()] + ' ' + dd.getDate() + ' ' + MONTHS[dd.getMonth()] + ' · ' + off + ' dni temu';
    const dApps = off === 0 ? apps.length ? (at.apps || []).slice(0, 8) : [] : ((ent(off) || {}).a || []).slice(0, 8), dT = tt(off), mx2 = Math.max.apply(null, dApps.map((x) => x.m).concat([1]));
    const nav = `<div style="display:flex;align-items:center;gap:8px;margin-top:8px"><button type="button" class="tc" data-a="gdday" data-g="${esc(id)}" data-o="${off + 1}" aria-label="Wcześniej"${off >= maxOff ? ' disabled style="opacity:.3"' : ''}><ha-icon icon="mdi:chevron-left"></ha-icon></button><div style="flex:1;text-align:center"><b>${esc(lbl)}</b><small style="display:block;opacity:.7">${dT === null ? 'brak danych' : fm(dT)}</small></div><button type="button" class="tc" data-a="gdday" data-g="${esc(id)}" data-o="${off - 1}" aria-label="Później"${off <= 0 ? ' disabled style="opacity:.3"' : ''}><ha-icon icon="mdi:chevron-right"></ha-icon></button></div>`;
    const ser = []; for (let o = Math.min(maxOff, 13); o >= 0; o--) ser.push(o); const smx = Math.max.apply(null, ser.map((o) => tt(o) || 0).concat([1]));
    const bars = ser.length > 1 ? `<div style="display:flex;gap:4px;align-items:flex-end;height:70px;margin-top:8px">${ser.map((o) => { const v = tt(o) || 0, d = new Date(Date.now() - o * 86400000); return `<button type="button" data-a="gdday" data-g="${esc(id)}" data-o="${o}" style="flex:1;text-align:center;font-size:10px;padding:0;background:none;color:inherit;opacity:${o === off ? 1 : .6}"><div style="height:${Math.max(3, Math.round(v / smx * 46))}px;background:${o === off ? 'var(--a)' : 'rgba(255,255,255,.35)'};border-radius:5px"></div>${DN[d.getDay()]}<br><span style="opacity:.6">${d.getDate()}</span></button>`; }).join('')}</div>` : '';
    const lst = dApps.length ? dApps.map((x) => `<div style="display:flex;align-items:center;gap:8px;margin-top:6px;font-size:13px"><span style="width:38%;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc(x.n)}</span><div style="flex:1;height:8px;border-radius:5px;background:rgba(255,255,255,.1)"><div style="width:${Math.round(x.m / mx2 * 100)}%;height:100%;border-radius:5px;background:var(--a)"></div></div><b style="min-width:54px;text-align:right;font-weight:500">${fm(x.m)}</b></div>`).join('') : `<div style="opacity:.6;font-size:13px;margin-top:6px">${off === 0 ? 'Brak danych (włącz „Dostęp do danych o użyciu” w aplikacji na telefonie)' : dT !== null ? 'Brak szczegółów aplikacji z tego dnia (zapisują się od aktualizacji aplikacji do 2.3)' : 'Brak danych z tego dnia'}</div>`;
    const pr = S['input_text.guard_prosba_' + id], pv = pr && pr.state && pr.state !== 'unknown' ? String(pr.state).split('|') : null;
    const req = pv && pv[0] ? `<div class="vc" style="margin-top:10px;border:1px solid #ffb340;box-shadow:0 0 14px rgba(255,179,64,.25)"><b>⏳ ${esc(g.name)} prosi o czas</b><small style="display:block;opacity:.8;margin:2px 0 8px">${esc(pv[1] || 'Telefon')} · ${pv[3] === 'limit' ? 'limit wyczerpany' : pv[3] === 'full' ? 'telefon zablokowany' : 'aplikacja zablokowana'}</small><div class="chq"><button type="button" data-a="gdreq" data-g="${esc(id)}" data-v="15">+15 min</button><button type="button" data-a="gdreq" data-g="${esc(id)}" data-v="30">+30 min</button><button type="button" data-a="gdreq" data-g="${esc(id)}" data-v="no">Odmów</button></div></div>` : '';
    const tg = (e, txt) => S[e] ? `<button type="button" class="${S[e].state === 'on' ? 'on' : ''}" data-a="gdset" data-e="${e}" data-v="tg">${txt}: ${S[e].state === 'on' ? 'wł.' : 'wył.'}</button>` : '';
    return `<div style="padding:8px 0;border-top:1px solid rgba(255,255,255,.08)"><div style="display:flex;align-items:center;gap:8px"><b style="font-size:16px">${esc(g.name)}</b><small style="opacity:.8">dziś ${fm(tot)}${bonus ? ' · bonus +' + bonus + ' min' : ''}</small></div>${req}${nav}${lst}${bars}
      <div class="lks" style="margin-top:10px"><button class="lk" data-a="gdlim" data-g="${esc(id)}"><ha-icon icon="mdi:timer-sand"></ha-icon><span><b>Limity czasu</b><small>dzienne limity aplikacji</small></span></button><button class="lk" data-a="gdring" data-g="${esc(id)}"><ha-icon icon="mdi:bell-ring-outline"></ha-icon><span><b>Znajdź telefon</b><small>głośny alarm (90 s)</small></span></button><button class="lk" data-a="gdmsg" data-g="${esc(id)}"><ha-icon icon="mdi:message-text-outline"></ha-icon><span><b>Wiadomość na ekran</b><small>pojawi się na telefonie</small></span></button>${(this._hass.user || {}).is_admin && this._pTdEdit() ? `<button class="lk" data-a="gdcfg" data-g="${esc(id)}"><ha-icon icon="mdi:key-variant"></ha-icon><span><b>Dane konfiguracji</b><small>identyfikator webhooka</small></span></button>` : ''}</div>
      ${bonus !== null ? `<small style="opacity:.6;display:block;margin-top:10px">Bonusowe minuty na dziś (do wszystkich limitów)</small><div class="chq"><button type="button" data-a="gdbonus" data-g="${esc(id)}" data-v="15">+15 min</button><button type="button" data-a="gdbonus" data-g="${esc(id)}" data-v="30">+30 min</button><button type="button" data-a="gdbonus" data-g="${esc(id)}" data-v="reset">Zeruj</button></div>` : ''}
      ${rew !== null ? `<small style="opacity:.6;display:block;margin-top:10px">Nagroda za zaakceptowane zadanie</small><div class="chq">${[0, 5, 10, 15, 30].map((v) => `<button type="button" class="${rew === v ? 'on' : ''}" data-a="gdset" data-e="input_number.guard_nagroda_${esc(id)}" data-v="${v}">${v ? '+' + v + ' min' : 'brak'}</button>`).join('')}</div>` : ''}
      <small style="opacity:.6;display:block;margin-top:10px">Automatyzacje</small><div class="chq">${tg('input_boolean.guard_harmonogram_' + id, 'Harmonogram (cisza nocna / lekcje)')}${tg('input_boolean.guard_strefa_' + id, 'Blokada w strefie Szkoła')}</div></div>`;
  }
  /* pelnoekranowa mapa telefonow dzieci: mapa HA (ha-map, kafelki wg ustawien HA); bez niej - mapa OpenStreetMap w ramce */
  _pGdMapFs(id) {
    const root = this.shadowRoot.getElementById('root'); if (!root) return; const old = this.shadowRoot.getElementById('gdmfs'); if (old) old.remove(); this._gdMapEl = null;
    const st = this._hass.states, pos = (PC.guard || []).map((g) => ({g, t: st['device_tracker.guard_' + g.id]})).filter((x) => x.t && x.t.attributes.latitude != null);
    if (!pos.length) { this._pToast('Brak danych o lokalizacji telefonów'); return; }
    this._gdMapSel = id || ''; const sel = id ? pos.filter((x) => x.g.id === id) : pos; if (!sel.length) return;
    const box = document.createElement('div'); box.id = 'gdmfs';
    box.innerHTML = `<div class="gmh"><button class="bk gl" data-a="gdmapx" aria-label="Zamknij mapę"><ha-icon icon="mdi:arrow-left"></ha-icon></button><b>Mapa telefonów</b><button class="gl gmt" data-a="gdmapth" aria-label="Jasna / ciemna mapa" hidden><ha-icon icon="mdi:theme-light-dark"></ha-icon></button><div class="gmc">${pos.length > 1 ? `<button class="${id ? '' : 'on'}" data-a="gdmapf" data-g="">Wszyscy</button>` : ''}${pos.map((x) => `<button class="${id === x.g.id ? 'on' : ''}" data-a="gdmapf" data-g="${esc(x.g.id)}">${esc(x.g.name)}</button>`).join('')}</div></div><div class="gmb"></div>`;
    root.appendChild(box); const mb = box.querySelector('.gmb');
    const osm = () => { const la = sel.map((x) => x.t.attributes.latitude), lo = sel.map((x) => x.t.attributes.longitude), pad = 0.004, a = Math.min.apply(null, la), b = Math.max.apply(null, la), c = Math.min.apply(null, lo), d = Math.max.apply(null, lo);
      mb.innerHTML = `<iframe src="https://www.openstreetmap.org/export/embed.html?bbox=${c - pad * 1.6},${a - pad},${d + pad * 1.6},${b + pad}&layer=mapnik${sel.length === 1 ? `&marker=${la[0]},${lo[0]}` : ''}"></iframe>`; };
    const hm = () => { const el = document.createElement('ha-map'); el.hass = this._hass; el.entities = sel.map((x) => ({entity_id: 'device_tracker.guard_' + x.g.id, name: x.g.name})); el.zoom = 16; el.autoFit = true; el.themeMode = this._pGdMapTh(); this._gdMapEl = el; mb.appendChild(el); const tb = box.querySelector('.gmt'); if (tb) tb.hidden = false; };
    if (customElements.get('ha-map')) hm();
    else if (window.loadCardHelpers) window.loadCardHelpers().then((H) => H.createCardElement({type: 'map', entities: ['device_tracker.guard_' + sel[0].g.id]})).then(() => customElements.whenDefined('ha-map')).then(() => hm()).catch(osm);
    else osm();
    setTimeout(() => { if (!this._gdMapEl && !mb.firstChild) osm(); }, 4000);
  }
  _pGdMapTh() { let t = ''; try { t = localStorage.getItem('pulse_gdmap') || ''; } catch (e) { /* ignore */ } return t === 'dark' ? 'dark' : 'light'; }
  _pGdSet(g) {   /* ustawienia aplikacji na telefonie, sterowane z HA (helpery guard_*) */
    const S = this._hass.states, lo = S['input_boolean.guard_lokalizacja_' + g.id], ea = 'input_number.guard_lok_poza_' + g.id, eh = 'input_number.guard_lok_dom_' + g.id; if (!lo) return '';
    const ch = (e, vals, unit) => { const cur = S[e] ? Math.round(parseFloat(S[e].state)) : null; return vals.map((v) => `<button type="button" class="${cur === v ? 'on' : ''}" data-a="gdset" data-e="${e}" data-v="${v}">${v < 60 ? v + ' min' : v / 60 + ' godz.'}</button>`).join(''); };
    const sn = S['input_boolean.guard_sen_' + g.id], sf = S['input_datetime.guard_sen_od_' + g.id], st2 = S['input_datetime.guard_sen_do_' + g.id], hmv = (e) => e && e.state && e.state !== 'unknown' ? String(e.state).slice(0, 5) : '';
    const nightH = sn ? `<small style="opacity:.6;display:block;margin-top:8px">Tryb nocny (aplikacja śpi i oszczędza baterię)</small><div class="chq"><button type="button" class="${sn.state === 'on' ? 'on' : ''}" data-a="gdset" data-e="${sn.entity_id}" data-v="tg">Tryb nocny: ${sn.state === 'on' ? 'włączony' : 'wyłączony'}</button></div>${sf ? `<small style="opacity:.6;display:block;margin-top:6px">Usypia o</small><div class="chq">${['21:00', '21:30', '22:00', '22:30', '23:00'].map((v) => `<button type="button" class="${hmv(sf) === v ? 'on' : ''}" data-a="gdtime" data-e="${sf.entity_id}" data-v="${v}:00">${v}</button>`).join('')}</div>` : ''}${st2 ? `<small style="opacity:.6;display:block;margin-top:6px">Budzi się o</small><div class="chq">${['05:30', '06:00', '06:30', '07:00', '07:30'].map((v) => `<button type="button" class="${hmv(st2) === v ? 'on' : ''}" data-a="gdtime" data-e="${st2.entity_id}" data-v="${v}:00">${v}</button>`).join('')}</div>` : ''}` : '';
    return `<div style="margin-top:10px"><small style="opacity:.7">Ustawienia aplikacji na telefonie</small><div class="chq"><button type="button" class="${lo.state === 'on' ? 'on' : ''}" data-a="gdset" data-e="${lo.entity_id}" data-v="tg">Lokalizacja: ${lo.state === 'on' ? 'włączona' : 'wyłączona'}</button></div>${S[ea] ? `<small style="opacity:.6;display:block;margin-top:8px">Pozycja poza domem co</small><div class="chq">${ch(ea, [5, 10, 15, 30, 60])}</div>` : ''}${S[eh] ? `<small style="opacity:.6;display:block;margin-top:8px">Pozycja w domowym Wi-Fi co</small><div class="chq">${ch(eh, [30, 60, 120, 240])}</div>` : ''}${nightH}</div>`;
  }
  _pGdStat(g) {   /* stan telefonu na zwinietym kafelku: online/offline + wersja aplikacji */
    const st = this._hass.states['sensor.aurora_guard_' + g.id + '_status'], at = (st && st.attributes) || {}, ls = new Date(String(at.last_seen || '').replace(/(\d\d)(\d\d)$/, '$1:$2')), mn = isNaN(ls) ? null : Math.round((Date.now() - ls.getTime()) / 60000);
    const su = parseFloat(at.sleep_until) || 0, sl = !!st && su * 1000 > Date.now(), swk = sl ? new Date(su * 1000 - 1800000) : null, on = !!st && st.state === 'ok' && mn !== null && mn <= 25, off = mn === null ? '' : mn < 90 ? mn + ' min' : mn < 2880 ? Math.round(mn / 60) + ' godz.' : Math.round(mn / 1440) + ' dni';
    const txt = !st ? 'brak danych' : sl ? 'śpi do ' + String(swk.getHours()).padStart(2, '0') + ':' + String(swk.getMinutes()).padStart(2, '0') : st.state !== 'ok' ? 'usługa wyłączona' : on ? 'online' : 'offline' + (off ? ' od ' + off : '');
    return `<span style="color:${sl ? '#8fa3ff' : on ? '#3fe0a5' : '#ff8a9a'}">●</span> ${esc(g.name)} · ${txt}${at.version ? ' · v' + esc(at.version) : ''}${on && at.battery != null ? ' · ' + esc(at.battery) + '%' : ''}`;
  }
  _pGdAcc(k, t, sub, body, html) {   /* zwijany kafelek sekcji (domyslnie zwiniety) */
    const o = (this._gdOpen = this._gdOpen || new Set()).has(k);
    return `<div class="vc gl gacc"><button type="button" class="gah" data-a="gdacc" data-k="${k}"><span><h4 style="margin:0">${esc(t)}</h4><small>${html ? sub : esc(sub)}</small></span><ha-icon icon="${o ? 'mdi:chevron-up' : 'mdi:chevron-down'}"></ha-icon></button>${o ? `<div class="gab">${body}</div>` : ''}</div>`;
  }
  _vw_guard() {
    const GDS = PC.guard || [], gdh = GDS.length ? this._pGdAcc('tel', 'Telefony dzieci · Aurora Guard', GDS.map((g) => this._pGdStat(g)).join('<br>'), `${GDS.map((g) => { const S = this._hass.states, lk = S['input_boolean.blokada_telefon_' + g.id], au = S['input_boolean.auto_blokada_telefonu_' + g.id], st = S['sensor.aurora_guard_' + g.id + '_status'], on = !!lk && lk.state === 'on', auto = !!au && au.state === 'on', full = (S['input_boolean.blokada_telefon_' + g.id + '_caly'] || {}).state === 'on';
        let sub = 'brak danych z telefonu', col = '#ff8a9a'; const su2 = st ? parseFloat(st.attributes.sleep_until) || 0 : 0; if (st && su2 * 1000 > Date.now() && st.state === 'ok') { const w2 = new Date(su2 * 1000 - 1800000); sub = 'tryb nocny – wróci o ' + String(w2.getHours()).padStart(2, '0') + ':' + String(w2.getMinutes()).padStart(2, '0'); col = '#8fa3ff'; } else if (st && st.state === 'ok') { const ls = new Date(String(st.attributes.last_seen || '').replace(/(\d\d)(\d\d)$/, '$1:$2')), mn = isNaN(ls) ? 0 : Math.round((Date.now() - ls.getTime()) / 60000); sub = mn > 25 ? 'brak kontaktu od ' + (mn < 90 ? mn + ' min' : mn < 2880 ? Math.round(mn / 60) + ' godz.' : Math.round(mn / 1440) + ' dni') : 'połączony · bateria ' + (st.attributes.battery != null ? st.attributes.battery + '%' : '—'); col = mn > 25 ? '#ff8a9a' : '#3fe0a5';   /* telefon raportuje co ~10 min; brak raportu > 25 min = offline / odinstalowana aplikacja */ } else if (st) { sub = 'usługa dostępności wyłączona na telefonie!'; col = '#ff8a9a'; }
        this._pGdLoad(g.id); this._pGdLoad(g.id, false, 'allow'); const it = ((this._pGd || {})[g.id] || {}).items, nb = it ? it.filter((i) => i.status === 'needs_action').length : '…', ia = ((this._pGd || {})[g.id + '_ok'] || {}).items, na = ia ? ia.filter((i) => i.status === 'needs_action').length : 0;
        return `<div style="padding:8px 0;border-top:1px solid rgba(255,255,255,.08)"><div style="display:flex;align-items:center;gap:8px"><b style="font-size:16px">${esc(g.name)}</b><small style="color:${col}">${esc(sub)}</small></div><div class="lks" style="margin-top:8px"><button class="lk${on ? ' on' : ''}" data-a="gdlk" data-g="${esc(g.id)}"><ha-icon icon="${on ? 'mdi:cellphone-lock' : 'mdi:cellphone'}"></ha-icon><span><b>Blokada aplikacji</b><small>${on ? 'włączona' : 'wyłączona'}${auto ? ' · steruje tryb auto' : ''}</small></span></button><button class="lk${auto ? ' on' : ''}" data-a="gdauto" data-g="${esc(g.id)}"><ha-icon icon="mdi:robot-outline"></ha-icon><span><b>Tryb auto</b><small>${auto ? 'blokada do wykonania zadań' : 'ręczny'}</small></span></button><button class="lk${full ? ' on' : ''}" data-a="gdfull" data-g="${esc(g.id)}"><ha-icon icon="${full ? 'mdi:cellphone-off' : 'mdi:cellphone-check'}"></ha-icon><span><b>Cały telefon</b><small>${full ? 'zablokowany (dozwolone: telefon, SMS, kontakty)' : 'odblokowany'}</small></span></button><button class="lk" data-a="gdapps" data-g="${esc(g.id)}"><ha-icon icon="mdi:apps"></ha-icon><span><b>Aplikacje do blokowania</b><small>${nb} zaznaczonych</small></span></button><button class="lk" data-a="gdallow" data-g="${esc(g.id)}"><ha-icon icon="mdi:cellphone-check"></ha-icon><span><b>Dozwolone przy blokadzie telefonu</b><small>telefon, SMS i kontakty zawsze${na ? ' + ' + na + ' z listy' : ''}</small></span></button></div></div>`; }).join('')}`, true) : '';
    const gdl = GDS.length && this._pGdEdit() ? this._pGdAcc('loc', 'Lokalizacja telefonów', GDS.map((g) => { const t = this._hass.states['device_tracker.guard_' + g.id]; return g.name + ': ' + (t && t.attributes.latitude != null ? (t.state === 'home' ? 'w domu' : t.state === 'not_home' ? 'poza domem' : t.state) : 'brak danych'); }).join(' · '), `${GDS.map((g) => { const t = this._hass.states['device_tracker.guard_' + g.id], at = (t && t.attributes) || {}, ok = t && at.latitude != null;
      const mn = ok ? Math.max(0, Math.round((Date.now() - new Date(t.last_updated).getTime()) / 60000)) : 0, ago = mn < 2 ? 'przed chwilą' : mn < 90 ? mn + ' min temu' : mn < 2880 ? Math.round(mn / 60) + ' godz. temu' : Math.round(mn / 1440) + ' dni temu';
      const where = !ok ? 'brak danych (włącz lokalizację w aplikacji na telefonie)' : (t.state === 'home' ? 'w domu' : t.state === 'not_home' ? 'poza domem' : t.state) + ' · ' + ago + (at.gps_accuracy ? ' · ±' + at.gps_accuracy + ' m' : '');
      const map = ok && this._gdMap === g.id ? `<iframe loading="lazy" style="width:100%;height:230px;border:0;border-radius:14px;margin-top:8px" src="https://www.openstreetmap.org/export/embed.html?bbox=${at.longitude - 0.004},${at.latitude - 0.0025},${at.longitude + 0.004},${at.latitude + 0.0025}&layer=mapnik&marker=${at.latitude},${at.longitude}"></iframe>` : '';
      return `<div style="padding:8px 0;border-top:1px solid rgba(255,255,255,.08)"><div style="display:flex;align-items:center;gap:8px"><b style="font-size:16px">${esc(g.name)}</b><small style="opacity:.8">${esc(where)}</small></div><div class="lks" style="margin-top:8px"><button class="lk" data-a="gdloc" data-g="${esc(g.id)}"><ha-icon icon="mdi:crosshairs-gps"></ha-icon><span><b>Gdzie jest telefon?</b><small>poproś o aktualną pozycję</small></span></button>${ok ? `<button class="lk${this._gdMap === g.id ? ' on' : ''}" data-a="gdmap" data-g="${esc(g.id)}"><ha-icon icon="mdi:map-marker-radius-outline"></ha-icon><span><b>${this._gdMap === g.id ? 'Ukryj mapę' : 'Pokaż mapę'}</b><small>ostatnia znana pozycja</small></span></button><button class="lk" data-a="gdmapf" data-g="${esc(g.id)}"><ha-icon icon="mdi:fullscreen"></ha-icon><span><b>Mapa na pełnym ekranie</b><small>${GDS.length > 1 ? 'także wszystkie telefony' : 'duża mapa'}</small></span></button>` : ''}</div>${map}${this._pGdSet(g)}</div>`; }).join('')}`) : '';
    const gdt = GDS.length && this._pGdEdit() ? this._pGdAcc('time', 'Czas, limity i bezpieczeństwo', GDS.map((g) => { const u = this._hass.states['sensor.aurora_guard_' + g.id + '_usage'], m = u ? parseInt(u.state, 10) || 0 : 0, rq = this._hass.states['input_text.guard_prosba_' + g.id]; return g.name + ' ' + (m >= 60 ? Math.floor(m / 60) + ' godz. ' + (m % 60) + ' min' : m + ' min') + (rq && rq.state && rq.state !== 'unknown' ? ' · prośba o czas!' : ''); }).join(' · '), `${GDS.map((g) => this._pGdTime(g)).join('')}<div class="note" style="font-size:12px;opacity:.6;margin-top:8px">Godziny ciszy nocnej i lekcji ustawisz w HA: Ustawienia → Urządzenia i usługi → Pomocniki → „Guard noc …” / „Guard lekcje …”.</div>`) : '';
    return gdh ? gdh + gdl + gdt : '<div class="vc gl"><div class="empty">Brak telefonów dzieci w konfiguracji dashboardu.</div></div>';
  }
  _pLocks() { const st = this._hass.states; return Object.keys(st).filter((e) => /^input_boolean\.blokada_/.test(e) && !(PC.guard && PC.guard.length && /^input_boolean\.blokada_telefon_/.test(e))).map((e) => ({e, n: String(st[e].attributes.friendly_name || e).replace(/^Blokada\s+/i, ''), on: st[e].state === 'on'})); }
  _vw_multimedia() {
    const LK = this._pLocks(), ed = this._pTdEdit(), lkh = LK.length ? `<div class="vc gl"><h4>Blokada urządzeń</h4><div class="lks">${LK.map((l) => `<button class="lk${l.on ? ' on' : ''}" data-a="lktg" data-e="${esc(l.e)}"><ha-icon icon="${l.on ? 'mdi:lock' : 'mdi:lock-open-variant-outline'}"></ha-icon><span><b>${esc(l.n)}</b><small>${l.on ? 'zablokowany – po włączeniu wyłączy się sam' : 'odblokowany'}</small></span></button>`).join('')}</div>${ed ? '' : '<div class="note" style="font-size:12px;opacity:.65;margin-top:8px">Blokadę zmieniają tylko wybrane konta.</div>'}</div>` : '';
    const ids = []; ((PC.media && PC.media.tvs) || []).forEach((x) => ids.push(x[0])); (PC.rooms || []).forEach((r) => (r.mp || []).forEach((e) => ids.push(e))); if (PC.media && PC.media.radio) ids.push(PC.media.radio);
    const u = [...new Set(ids)].filter((e) => this._hass.states[e]); const act = u.filter((e) => ['playing', 'paused', 'on', 'buffering'].includes(this._hass.states[e].state)), rest = u.filter((e) => act.indexOf(e) < 0);
    return lkh + (act.length ? '<div class="vc gl"><h4>Włączone</h4>' + act.map((e) => this._pMp(e)).join('') + '</div>' : '<div class="vc gl"><div class="empty">Nic nie jest teraz włączone</div></div>') + (rest.length ? '<div class="vc gl"><h4>Pozostałe</h4>' + rest.map((e) => this._pMp(e)).join('') + '</div>' : '')
      + `<div class="vc gl"><h4>Dom na TV</h4><div class="lks">${[].map((x) => `<div class="lk" style="display:flex;align-items:center;gap:8px"><ha-icon icon="${x[2]}"></ha-icon><span style="flex:1"><b>${x[1]}</b><small>${(this._hass.states[x[0]] || {}).state === 'idle' && ((this._hass.states[x[0]] || {}).attributes || {}).app_name === 'DashCast' ? 'wyświetla stronę Dom' : 'ekran informacyjny, ◀ ▶ pilotem zmienia ekran'}</small></span><button class="tdb" data-a="tvhome" data-e="${x[0]}" style="padding:8px 14px;border-radius:99px;background:rgba(255,255,255,.1)">Pokaż</button><button class="tdb" data-a="tvhomex" data-e="${x[0]}" style="padding:8px 14px;border-radius:99px;background:rgba(255,93,115,.15)">Zamknij</button></div>`).join('')}</div></div>`
      + (this._radioAvail() ? '<button class="row" data-a="go" data-go="radio"><ha-icon icon="mdi:radio"></ha-icon><div><b>Radio</b><small>stacje RMF ON, Eurozet, Eska i inne</small></div></button>' : '');
  }
  _vw_historia() {
    const ev = window.__jarvisEvents; if (window.__jarvisEventsRefresh && (!this._logT || Date.now() - this._logT > 60000)) { this._logT = Date.now(); window.__jarvisEventsRefresh().then(() => { if (this._vw && this._vw.k === 'historia') this._pVRender(); }).catch(() => { /* ignore */ }); }
    if (!ev || !ev.items) return '<div class="vc gl"><div class="empty">Wczytuję historię…</div></div>';
    const f = this._hf || '', IC = {motion: 'mdi:motion-sensor', door: 'mdi:door-closed', leak: 'mdi:water-alert', gas: 'mdi:gas-cylinder', alarm: 'mdi:bell-ring', washer: 'mdi:washing-machine', air: 'mdi:air-filter', offline: 'mdi:lan-disconnect'};
    const L = ev.items.filter((i) => !f || i.sev >= 1).slice(0, 60);
    return `<div class="sg" style="margin-bottom:12px"><button class="${f ? '' : 'on'}" data-a="hf" data-f="">Wszystko</button><button class="${f ? 'on' : ''}" data-a="hf" data-f="!">Alerty</button></div>` + (L.length ? '<div class="tl">' + L.map((i) => { const t = new Date(i.t); return `<div class="tk${i.sev >= 2 ? ' td' : ''}"><div class="ie"><span style="display:flex;gap:8px;align-items:center"><ha-icon icon="${i.ty === 'door' && i.st === 'on' ? 'mdi:door-open' : (IC[i.ty] || 'mdi:information-outline')}" style="--mdc-icon-size:18px;color:${i.sev >= 2 ? '#ff5d73' : i.sev === 1 ? '#ffc24b' : 'var(--a)'}"></ha-icon>${esc(String(i.text).split(' · ').map((x) => /^PM/.test(x) ? x : x.charAt(0) + x.slice(1).toLowerCase()).join(' · '))}</span><small>${String(t.getHours()).padStart(2, '0')}:${String(t.getMinutes()).padStart(2, '0')}${i.room ? ' · ' + esc(String(i.room).charAt(0) + String(i.room).slice(1).toLowerCase()) : ''}</small></div></div>`; }).join('') + '</div>' : '<div class="vc gl"><div class="empty">Brak zdarzeń</div></div>');
  }
  _vw_serwer() {
    const S = PC.server || {nodes: [], guests: [], storages: []}, col = (v, a, b) => v === null ? '#8b94a8' : v < a ? '#3fe0a5' : v < b ? '#ffc24b' : '#ff5d73', pc = (v) => v === null ? '—' : (v >= 100 ? Math.round(v) : v.toFixed(1).replace('.', ',')) + '%';
    const bar = (v, a, b) => `<div class="barw" style="flex:1"><i style="width:${v === null ? 0 : Math.min(100, Math.max(3, v))}%;background:${col(v, a, b)}"></i></div>`;
    const row = (lab, v, a, b) => `<div style="display:flex;align-items:center;gap:10px;margin-top:8px"><span style="width:38px;font-size:12px;opacity:.7">${lab}</span>${bar(v, a, b)}<b style="width:48px;text-align:right;font-size:13px">${pc(v)}</b></div>`;
    const nodes = (S.nodes || []).map((n) => { const up = this._s(n.status) === 'on', c = this._n(n.cpu), m = this._n(n.mem); return `<div class="vc gl"><div style="display:flex;align-items:center;gap:8px;font-weight:600"><ha-icon icon="mdi:server" style="color:var(--a)"></ha-icon>${esc(n.name)}<span style="margin-left:auto;font-size:11px;color:${up ? '#3fe0a5' : '#ff5d73'}">${up ? 'online' : 'offline'}</span></div>${row('CPU', c, 60, 90)}${row('RAM', m, 75, 90)}</div>`; }).join('');
    const gs = (S.guests || []).map((g) => { const up = ['running', 'on'].includes(this._s(g.status)), c = this._n(g.cpu), m = this._n(g.mem); return `<div class="vc gl" style="padding:12px 16px"><div style="display:flex;align-items:center;gap:8px;font-weight:600;font-size:14px"><i style="width:9px;height:9px;border-radius:50%;background:${up ? '#3fe0a5' : '#ff5d73'};box-shadow:0 0 8px ${up ? '#3fe0a5' : '#ff5d73'}"></i>${esc(g.name)}<small style="margin-left:auto;opacity:.55;font-weight:400">${esc(g.kind || '')}</small></div>${row('CPU', c, 60, 90)}${row('RAM', m, 75, 90)}</div>`; }).join('');
    const sto = (S.storages || []).map((s) => `<div class="bt"><div class="nm">${esc(s.name)}</div><div class="bw">${bar(this._n(s.usage), 70, 90)}</div><b>${pc(this._n(s.usage))}</b></div>`).join('');
    return (nodes + (gs ? '<div class="sec" style="padding:0;margin:14px 0 8px">Maszyny i kontenery</div>' + gs : '') + (sto ? '<div class="vc gl"><h4>Dyski</h4>' + sto + '</div>' : '')) || '<div class="vc gl"><div class="empty">Brak danych serwera</div></div>';
  }
  _vw_f1() {
    const A = (e) => (this._hass.states[e] && this._hass.states[e].attributes) || {}, a = A('sensor.f1_next_race'), ds = A('sensor.f1_driver_standings'), cs = A('sensor.f1_constructor_standings'), lr = A('sensor.f1_last_race_results'); if (!a.race_name) return '<div class="vc gl"><div class="empty">Brak danych z integracji F1</div></div>';
    const tab = this._pF1t || 'ov', tcol = (id) => (typeof F1_TEAM !== 'undefined' && F1_TEAM[id]) || 'var(--a)', DR = ds.driver_standings || [], TM = cs.constructor_standings || [], RS = lr.results || [];
    const tabs = `<div class="sg" style="margin:0 0 12px">${[['ov', 'Przegląd'], ['dr', 'Kierowcy'], ['tm', 'Zespoły'], ['rc', 'Wyścig']].map((x) => `<button class="${tab === x[0] ? 'on' : ''}" data-a="f1t" data-t="${x[0]}">${x[1]}</button>`).join('')}</div>`;
    const dRow = (x, full) => { const d = x.Driver || {}, c = (x.Constructors || [])[0] || {}; return `<div class="f1r"><span class="ps">${esc(x.position)}</span><span class="tc" style="background:${tcol(c.constructorId)}"></span><span class="nm2">${esc(d.givenName || '')} <b>${esc(d.familyName || '')}</b>${full ? `<small>${esc(c.name || '')}${+x.wins ? ' · ' + x.wins + ' wygr.' : ''}</small>` : ''}</span><span class="pt">${esc(x.points)}</span></div>`; };
    const tRow = (x) => { const c = x.Constructor || {}; return `<div class="f1r"><span class="ps">${esc(x.position)}</span><span class="tc" style="background:${tcol(c.constructorId)}"></span><span class="nm2"><b>${esc(c.name || '')}</b>${+x.wins ? `<small>${x.wins} wygr.</small>` : ''}</span><span class="pt">${esc(x.points)}</span></div>`; };
    const rRow = (x) => { const d = x.driver || {}, c = x.constructor || {}, g = +x.grid, p = +x.position, df = g && p ? g - p : 0, ok = /^(finished|\+\d+ lap)/i.test(x.status || '') || x.time; return `<div class="f1r"><span class="ps">${esc(x.position)}</span><span class="tc" style="background:${tcol(c.constructorId)}"></span><span class="nm2"><b>${esc(d.familyName || d.code || '')}</b><small>${esc(c.name || '')}${g ? ' · start ' + g : ''}${df ? (df > 0 ? ' <i style="color:#3fe0a5;font-style:normal">▲' + df + '</i>' : ' <i style="color:#ff8a9a;font-style:normal">▼' + (-df) + '</i>') : ''}</small></span><span class="pt" style="text-align:right">${esc(x.time || x.status || '')}${+x.points ? `<small style="display:block;opacity:.7;font-weight:500">+${esc(x.points)} pkt</small>` : ''}</span></div>`; };
    if (tab === 'dr') return tabs + `<div class="vc gl"><h4>Klasyfikacja kierowców · ${DR.length}</h4>${DR.map((x) => dRow(x, true)).join('') || '<div class="empty">Brak danych</div>'}</div>`;
    if (tab === 'tm') return tabs + `<div class="vc gl"><h4>Klasyfikacja zespołów · ${TM.length}</h4>${TM.map(tRow).join('') || '<div class="empty">Brak danych</div>'}</div>`;
    if (tab === 'rc') return tabs + `<div class="vc gl"><h4>${esc(lr.race_name || 'Ostatni wyścig')}${lr.round ? ' · runda ' + esc(lr.round) : ''}</h4>${RS.map(rRow).join('') || '<div class="empty">Brak wyników</div>'}</div>`;
    const ms = new Date(a.race_start_utc || a.race_date) - Date.now(); let cd = 'wyścig trwa lub już po'; if (ms > 0) { const dd = Math.floor(ms / 864e5), h = Math.floor(ms % 864e5 / 36e5), m = Math.floor(ms % 36e5 / 6e4); cd = (dd ? dd + ' dni ' : '') + h + ' godz ' + m + ' min'; }
    const more = (t, n) => n > 0 ? `<button class="mre" data-a="f1t" data-t="${t}" style="margin:8px 0 0;width:100%"><span>Pokaż całość (${n})</span><ha-icon icon="mdi:chevron-right"></ha-icon></button>` : '';
    return tabs + `<div class="vc gl"><h4>Najbliższy wyścig · runda ${esc(a.round)}</h4><div style="font-size:22px;font-weight:600">${esc(a.race_name)}</div><div style="opacity:.7;font-size:13px;margin-top:2px">${esc(a.circuit_name || '')}</div><div class="kv"><div><b>${esc(String(a.race_date || '').slice(5).replace('-', '.'))}</b><small>wyścig</small></div><div><b style="font-size:13px">${cd}</b><small>do startu</small></div><div><b>${esc(a.scheduled_laps || '—')}</b><small>okrążeń</small></div></div></div>
      ${DR.length ? `<div class="vc gl"><h4>Klasyfikacja kierowców</h4>${DR.slice(0, 5).map((x) => dRow(x, false)).join('')}${more('dr', DR.length - 5)}</div>` : ''}${TM.length ? `<div class="vc gl"><h4>Klasyfikacja zespołów</h4>${TM.slice(0, 5).map(tRow).join('')}${more('tm', TM.length - 5)}</div>` : ''}${RS.length ? `<div class="vc gl"><h4>Ostatni wyścig · ${esc(lr.race_name || '')}</h4>${RS.slice(0, 5).map(rRow).join('')}${more('rc', RS.length - 5)}</div>` : ''}`;
  }
  _vw_ustawienia() {
    const hs = this._pHs(); let lite = false, hdr = false; try { lite = localStorage.getItem('pastel_lite') === '1'; hdr = localStorage.getItem('pulse_hdr') === '1'; } catch (e) { /* ignore */ }
    const u = this._hass.user && this._hass.user.name, std = !this._pXm() && !this._pMx() && !this._pJv() && !this._pGt() && !this._pTh();   /* kolorystyka dziala tylko w motywie standardowym */
    return `${std ? `<div class="vc gl"><h4>Kolorystyka</h4><div class="schm">${HUD_SCH.map((x) => `<button class="${hs.id === x.id ? 'on' : ''}" data-a="scheme" data-s="${x.id}"><i style="background:linear-gradient(135deg,${x.a},${x.b},${x.c})"></i>${esc(x.n)}</button>`).join('')}</div></div>` : ''}
      <div class="vc gl"><h4>Wygląd</h4><button class="row${lite ? ' on' : ''}" data-a="lite"><ha-icon icon="mdi:speedometer"></ha-icon><div><b>Tryb oszczędny</b><small>wyłącza animacje tła i kafelków; zegar i pogoda zostają animowane</small></div><span class="sw"></span></button>
      <div class="vc gl" style="margin-bottom:10px"><h4>Motyw</h4><div class="thm">${[['auto', 'Auto (grudzień)'], ['xmas', 'Świąteczny'], ['matrix', 'Matrix'], ['jarvis', 'Jarvis'], ['vice', 'Vice City']].concat(Object.keys(PTHEMES).filter((k) => !(PTHEMES[k].mob && this._pTbNow())).map((k) => [k, PTHEMES[k].n])).concat([['off', 'Standardowy']]).map((x) => `<button class="${(this._pThm() === x[0]) ? 'on' : ''}" data-a="pthm" data-v="${x[0]}">${x[1]}</button>`).join('')}</div>${this._pRibTid === 'ribbon' ? '<div class="note" style="font-size:12px;opacity:.7;margin-top:10px">Wstęga jest częścią motywu „Strumienie”.</div>' : `<button class="row${this._pRibGet(this._pRibTid) ? ' on' : ''}" data-a="pribt" style="margin-top:10px"><ha-icon icon="mdi:chart-bell-curve"></ha-icon><div><b>Wstęga Pulsu w tym motywie</b><small>${this._pRibGet(this._pRibTid) ? 'włączona – animowany pierścień w kolorach motywu' : 'wyłączona – pierścień motywu'}</small></div></button>`}<div class="chq" style="margin-top:8px"><button type="button" data-a="pribw" data-v="1">Wstęga we wszystkich motywach</button><button type="button" data-a="pribw" data-v="0">Wyłącz we wszystkich</button><button type="button" class="${this._pRibMorph() ? 'on' : ''}" data-a="pribm">Wstęga → znak statusu: ${this._pRibMorph() ? 'wł.' : 'wył.'}</button></div></div>
      <button class="row${hdr ? ' on' : ''}" data-a="hdr"><ha-icon icon="mdi:dock-top"></ha-icon><div><b>Górna belka Home Assistanta</b><small>pokaż pasek z nazwą dashboardu</small></div><span class="sw"></span></button></div>
      ${(() => { const pe = this._pipe(), po = pe && this._hass.states[pe]; if (!po) return ''; return `<div class="vc gl"><h4>Potok asystenta</h4><div class="note" style="font-size:12px;opacity:.65;margin:-4px 0 8px">Dotyczy tego urządzenia (${esc(po.attributes.friendly_name || pe)}).</div><div class="ppl">${(po.attributes.options || []).map((x) => `<button class="${x === po.state ? 'on' : ''}" data-a="pipe" data-v="${esc(x)}">${esc(x.charAt(0).toUpperCase() + x.slice(1))}</button>`).join('')}</div></div>`; })()}
      <div class="vc gl"><h4>Progi alarmów klimatu</h4><div class="note" style="font-size:12px;opacity:.65;margin:-4px 0 8px">Poza tymi widełkami pokój trafia do uwag (Puls domu, kafelki „Teraz”).</div>${[['tMin', 'Temperatura – minimum', '°C', .5, 5, 35], ['tMax', 'Temperatura – maksimum', '°C', .5, 10, 40], ['hMin', 'Wilgotność – minimum', '%', 1, 10, 70], ['hMax', 'Wilgotność – maksimum', '%', 1, 30, 90]].map((x) => { const th = this._th(), v = th[x[0]]; return `<div class="thr"><span>${x[1]}</span><button data-a="thr" data-k="${x[0]}" data-d="-${x[3]}" data-lo="${x[4]}" data-hi="${x[5]}" aria-label="Mniej">−</button><b>${String(v).replace('.', ',')}${x[2]}</b><button data-a="thr" data-k="${x[0]}" data-d="${x[3]}" data-lo="${x[4]}" data-hi="${x[5]}" aria-label="Więcej">+</button></div>`; }).join('')}</div>
      <div class="vc gl"><h4>Informacje</h4><div class="bt"><div class="nm">Użytkownik</div><b style="width:auto">${esc(u || '—')}</b></div><div class="bt"><div class="nm">Aurora Pulse</div><b style="width:auto">v${esc(PVER)}</b></div><div class="bt"><div class="nm">Home Assistant</div><b style="width:auto">${esc((this._hass.config && this._hass.config.version) || '—')}</b></div></div>
      <button class="row" data-a="reload"><ha-icon icon="mdi:refresh"></ha-icon><div><b>Odśwież dashboard</b><small>przeładuj stronę</small></div></button>`;
  }
  _pGo(go) {
    const m = String(go);
    if (m === 'status') { this._pSheet('status'); return; }
    if (m === 'hamenu') { this._pOv(null); this.dispatchEvent(new CustomEvent('hass-toggle-menu', {bubbles: true, composed: true})); return; }
    const r = /^pokoj-(.+)$/.exec(m); if (r) { this._pOpen('pokoj', r[1]); return; }
    const map = {szkola: 'szkola', 'szkola-wiadomosci': 'szkola', pogoda: 'pogoda', kalendarz: 'kalendarz', klimat: 'klimat', 'stan-domu': 'klimat', powietrze: 'powietrze', baterie: 'baterie', multimedia: 'multimedia', radio: 'radio', tv: 'tv', tv: 'tv', zadania: 'zadania', guard: 'guard', dziennik: 'historia', historia: 'historia', serwer: 'serwer', f1: 'f1', f1live: 'f1', asystent: 'asystent', ustawienia: 'ustawienia', zdrowie: 'baterie'};
    if (map[m]) { this._pOpen(map[m]); return; }
    this._pToast('Ten widok nie jest dostępny w Aurora Pulse');
  }
  _pclick(e) {
    if (this._lpFired) { this._lpFired = false; return; }
    const b = e.target.closest('[data-a]'); if (!b) return; const a = b.dataset.a;
    if (a === 'closeov') { this._pOv(null); return; }
    if (a === 'back') { this._pBack(); return; }
    if (a === 'ltg') { this._call('light', 'toggle', {entity_id: this._lE}); setTimeout(() => { if (this._shF === 'light') this._pSheet('light'); }, 500); return; }
    if (a === 'lcl') { const o = this._hass.states[this._lE], M = (o && o.attributes.supported_color_modes) || [], mn = (o && o.attributes.min_color_temp_kelvin) || 2000, mx = (o && o.attributes.max_color_temp_kelvin) || 6500; const wh = +b.dataset.s === 0;
      if (wh) this._call('light', 'turn_on', M.includes('color_temp') ? {entity_id: this._lE, color_temp_kelvin: Math.max(mn, Math.min(mx, 4000))} : {entity_id: this._lE, rgb_color: [255, 255, 255]});   /* biel = temperatura barwowa (hs 0,0 u wielu zarowek daje blady czerwony) */
      else this._call('light', 'turn_on', {entity_id: this._lE, hs_color: [+b.dataset.h, +b.dataset.s]}); setTimeout(() => { if (this._shF === 'light') this._pSheet('light'); }, 600); return; }
    if (a === 'tg') { e.stopPropagation(); this._call('homeassistant', 'toggle', {entity_id: b.dataset.e}); b.classList.toggle('on'); return; }
    if (a === 'top') { if (this._vw) this._pBack(); this._scr.scrollTo({top: 0}); this._pOv(null); this.shadowRoot.querySelectorAll('#dock .di').forEach((x) => x.classList.toggle('on', x.dataset.a === 'top')); return; }
    if (a === 'rmenu') { if (this._ovK === 'rmenu') this._pOv(null); else this._pRoomsMenu(); return; }
    if (a === 'orb') { const st = this._s(this._sat()), bz = ['listening', 'processing', 'responding'].includes(st); if (this._pAlOn()) return; if (!st || st === 'unavailable' || st === 'unknown') this._pOpen('asystent'); else if (bz) this._voiceStop(); else this._listen(); return; }
    if (a === 'listen') { this._listen(); return; }
    if (a === 'events') { this._pOv(null); this._pOpen('kalendarz'); return; }
    if (a === 'status') { if (b.dataset.k) this._pExp.add(b.dataset.k); (this._pM || []).forEach((m, i) => { if (m.warn) this._pExp.add('M|' + i); }); this._pSheet('status'); return; }
    if (a === 'menu') { if (this._ovK === 'more') this._pOv(null); else this._pMenu(true); return; }
    if (a === 'room') { this._pOv(null); this._pOpen('pokoj', b.dataset.r); return; }
    if (a === 'pipe') { this._call('select', 'select_option', {entity_id: this._pipe(), option: b.dataset.v}); return; }
    if (a === 'thr') { const E = {tMin: 'input_number.pastel_temperatura_min', tMax: 'input_number.pastel_temperatura_max', hMin: 'input_number.pastel_wilgotnosc_min', hMax: 'input_number.pastel_wilgotnosc_max'}[b.dataset.k], o = this._hass.states[E]; if (!o) { this._pToast('Brak pomocnika ' + b.dataset.k); return; }
      const v = Math.max(+b.dataset.lo, Math.min(+b.dataset.hi, (parseFloat(o.state) || 0) + parseFloat(b.dataset.d))); this._call('input_number', 'set_value', {entity_id: E, value: v}); return; }
    if (a === 'more') { const m = (this._pMore = this._pMore || {}); m[b.dataset.w] = !m[b.dataset.w]; this._sig = ''; if (this._hass) this.hass = this._hass; return; }
    if (a === 'exp') { const k = b.dataset.k, w = b.closest('.iw, .sj'); if (w) { w.classList.toggle('open'); const st = w.classList.contains('open'), set = w.classList.contains('sj') ? this._pSkx : this._pExp; if (st) set.add(k); else set.delete(k); } return; }
    if (a === 'go') { const kk = b.dataset.k; if (kk && b.dataset.go === 'status') this._pExp.add(kk); this._pOv(null); this._pGo(b.dataset.go); return; }
    if (a === 'aut') { e.stopPropagation(); const on = this._s(b.dataset.e) === 'on'; this._call('automation', on ? 'turn_off' : 'turn_on', {entity_id: b.dataset.e}); this._pToast(on ? 'Automatyczne gaszenie wyłączone' : 'Automatyczne gaszenie włączone'); return; }
    if (a === 'alarmoff') { this._call('script', 'jarvis_reset_alarmow', {}); return; }
    if (a === 'lightsoff') { const on = (PC.lightsOff || []).filter((x) => this._s(x) === 'on'); if (on.length) { this._call('homeassistant', 'turn_off', {entity_id: on}); this._pToast('Gaszę światła (' + on.length + ')'); } else this._pToast('Wszystko już zgaszone'); return; }
    if (a === 'purifier') { const on = this._s(PC.purifier) === 'on'; this._call('fan', on ? 'turn_off' : 'turn_on', {entity_id: PC.purifier}); this._pToast(on ? 'Oczyszczacz wyłączony' : 'Oczyszczacz włączony'); return; }
    if (a === 'pmode') { this._call('fan', 'set_preset_mode', {entity_id: PC.purifier, preset_mode: b.dataset.m}); return; }
    if (a === 'mute') { const mu = this._mute(), on = this._s(mu) === 'on'; this._call('switch', on ? 'turn_off' : 'turn_on', {entity_id: mu}); this._pToast(on ? 'Asystent słucha' : 'Asystent wyciszony'); return; }
    if (a === 'radio') { const T = this._mplTargets(); if (T.eids.length) { this._call('radio_pl', 'stop', {entity_id: T.eids}); this._pToast('Zatrzymuję radio'); } else this._pOpen('radio'); return; }
    if (a === 'mpa') { this._call('media_player', b.dataset.s, {entity_id: b.dataset.e}); return; }
    if (a === 'mpm') { const o = this._hass.states[b.dataset.e]; this._call('media_player', 'volume_mute', {entity_id: b.dataset.e, is_volume_muted: !(o && o.attributes.is_volume_muted)}); return; }
    if (a === 'mpsrc') { this._call('media_player', 'select_source', {entity_id: b.dataset.e, source: b.dataset.v}); return; }
    if (a === 'mpp') { this._call('media_player', 'media_play_pause', {entity_id: b.dataset.e}); return; }
    if (a === 'mpv') { this._call('media_player', b.dataset.d === '1' ? 'volume_up' : 'volume_down', {entity_id: b.dataset.e}); return; }
    if (a === 'skp') { this._pSk.k = b.dataset.k; this._pVRender(true); return; }
    if (a === 'skt') { this._pSk.t = b.dataset.t; this._pVRender(true); const v = this.shadowRoot.getElementById('vb'); v.scrollTop = 0; return; }
    if (a === 'skform') { const q = (this._skS() || []).find((x) => x.k === this._pSk.k) || (this._skS() || [])[0]; if (!q) return; this._pSkF = {mode: b.dataset.m, k: q.k}; if (b.dataset.m === 'msg') this._skRcpt(q).then(() => this._pSkFR()); this._pOpen('skform'); return; }
    if (a === 'sfr') { this._pSkF.rcpt = b.dataset.v; this._pSkF.cf = false; this._pSkFR(); return; }
    if (a === 'sfc') { this._pSkF.rcpt = ''; this._pSkF.cf = false; this._pSkFR(); return; }
    if (a === 'sfd') { this._pSkF.date = b.dataset.v; this._pSkF.les = null; this._pSkF.cf = false; this._pSkFR(); return; }
    if (a === 'sfl') { const f = this._pSkF, n = +b.dataset.v, l = (f.les || []).slice(); f.les = l.includes(n) ? l.filter((x) => x !== n) : l.concat(n); f.cf = false; this._pSkFR(); return; }
    if (a === 'sfp') { this._pSkF.reason = b.dataset.v; this._pSkF.cf = false; this._pSkFR(); return; }
    if (a === 'sfsend' || a === 'sfjs') { this._pSkSend(); return; }
    if (a === 'skmsgs') { const q = (this._skS() || []).find((x) => x.k === this._pSk.k); if (q) { if (this._skM && this._skM[q.k]) this._skM[q.k].t = 0; this._skMsgs(q); this._pToast('Pobieram wiadomości…'); this._pVRender(true); } return; }
    if (a === 'skrefresh') { this._call('vulcan_dom', 'refresh', {}); this._pToast('Odświeżam dane ze szkoły…'); return; }
    if (a === 'evr') { this._pEvR = +b.dataset.r; this._pVRender(true); return; }
    if (a === 'hf') { this._hf = b.dataset.f; this._pVRender(true); return; }
    if (a === 'scheme') { try { localStorage.setItem('hud_scheme', b.dataset.s); } catch (x) { /* ignore */ } this._pg.vb = null; this._pRender(); return; }
    if (a === 'pthm') { try { localStorage.setItem('pulse_theme', b.dataset.v); } catch (x) { /* ignore */ } this._fxK = ''; const x = this.shadowRoot.getElementById('xm'); if (x) x.innerHTML = ''; this._pRender(); this._pVRender(true); return; }
    if (a === 'tvhome') { this._call('radio_pl', 'show_home', {entity_id: b.dataset.e}); this._pToast('Wysyłam stronę Dom na TV…'); return; }
    if (a === 'tvhomex') { this._call('media_player', 'turn_off', {entity_id: b.dataset.e}); this._pToast('Zamykam stronę na TV'); return; }
    if (a === 'gdlk' || a === 'gdauto') { if (!this._pGdEdit()) { this._pToast('Blokadę zmieniają tylko wybrane konta'); return; } const id = a === 'gdlk' ? 'input_boolean.blokada_telefon_' + b.dataset.g : 'input_boolean.auto_blokada_telefonu_' + b.dataset.g; this._call('input_boolean', 'toggle', {entity_id: id}); return; }
    if (a === 'msgdlg') { this._msgRoom = b.dataset.r; this._pSheet('msg'); setTimeout(() => { const f = this.shadowRoot.getElementById('msf'); if (f) this._pMsgBind(f); }, 40); return; }
    if (a === 'pribt') { this._pRibSet(this._pRibTid, !this._pRibGet(this._pRibTid)); this._fxK = ''; this._pRender(); this._pVRender(true); return; }
    if (a === 'pribm') { const on = !this._pRibMorph(); try { localStorage.setItem('pulse_ribbon_morph', on ? '1' : '0'); } catch (x) { /* ignore */ } this._pVRender(true); this._pToast(on ? 'Wstęga co jakiś czas zamienia się w znak statusu domu' : 'Znak statusu wyłączony'); return; }
    if (a === 'pribw') { const on = b.dataset.v === '1', ks = ['std', 'xmas', 'matrix', 'jarvis', 'vice'].concat(Object.keys(PTHEMES)); ks.forEach((k) => { if (k !== 'ribbon') this._pRibSet(k, on); }); this._fxK = ''; this._pRender(); this._pVRender(true); return; }
    if (a === 'pinkey') { const pin = this._pPin(), now = Date.now(); if (this._pinLock && now < this._pinLock) { this._pToast('Za dużo prób – spróbuj za chwilę'); return; }
      this._pinBuf = b.dataset.v === 'del' ? (this._pinBuf || '').slice(0, -1) : ((this._pinBuf || '') + b.dataset.v).slice(0, pin.length);
      const d = this.shadowRoot.getElementById('pind'); if (d) { d.textContent = '●'.repeat(this._pinBuf.length) + '○'.repeat(Math.max(0, pin.length - this._pinBuf.length)); d.classList.remove('bad'); }
      if (this._pinBuf.length === pin.length) { if (this._pinBuf === pin) { this._pinFail = 0; this._pinBuf = ''; this._pPinOk = true; this._gdUnl = true; clearTimeout(this._gdUnlT); this._gdUnlT = setTimeout(() => { this._gdUnl = false; if (this._vw && this._vw.k === 'guard') { this._pCloseV(); this._pToast('Widok zablokowany'); } }, 600000); this._pOv(null); this._pOpen('guard'); } else { this._pinFail = (this._pinFail || 0) + 1; this._pinBuf = ''; if (this._pinFail >= 5) { this._pinLock = now + 30000; this._pinFail = 0; this._pToast('Błędny kod – blokada na 30 s'); } else this._pToast('Błędny kod'); if (d) { void d.offsetWidth; d.textContent = '○'.repeat(pin.length); d.classList.add('bad'); } } }
      return; }
    if (a === 'gdacc') { const O = (this._gdOpen = this._gdOpen || new Set()); if (O.has(b.dataset.k)) O.delete(b.dataset.k); else O.add(b.dataset.k); this._pVRender(true); return; }
    if (a === 'gdday') { (this._gdDay = this._gdDay || {})[b.dataset.g] = Math.max(0, parseInt(b.dataset.o, 10) || 0); this._pVRender(true); return; }
    if (a === 'gdbonus' || a === 'gdreq') { const id = b.dataset.g, v = b.dataset.v, e = 'input_number.guard_bonus_' + id, cur = parseFloat(this._s(e)) || 0; if (v === 'reset') this._call('input_number', 'set_value', {entity_id: e, value: 0}); else if (v !== 'no') this._call('input_number', 'set_value', {entity_id: e, value: Math.min(600, cur + parseInt(v, 10))}); if (a === 'gdreq') this._call('input_text', 'set_value', {entity_id: 'input_text.guard_prosba_' + id, value: ''}); this._pToast(a === 'gdreq' && v === 'no' ? 'Odmówiono' : 'Dodano czas'); return; }
    if (a === 'gdcfg') { const id = b.dataset.g; this._gdId = id; this._gcfg = {loading: true}; this._pSheet('gcfg');
      this._hass.callApi('GET', 'config/automation/config/aurora_guard_prosba_' + id).then((r) => { const t = ((r && r.triggers) || (r && r.trigger) || [])[0] || {}; this._gcfg = t.webhook_id ? {hook: t.webhook_id} : {err: 'Nie znaleziono identyfikatora w automatyzacji'}; }).catch(() => { this._gcfg = {err: 'Brak dostępu (tylko administrator)'}; }).then(() => { if (this._ovK === 'sheet' && this._shF === 'gcfg') this._pSheet('gcfg'); }); return; }
    if (a === 'gcopy') { const v = b.dataset.v; try { navigator.clipboard.writeText(v).then(() => this._pToast('Skopiowano'), () => this._pToast('Zaznacz i skopiuj ręcznie')); } catch (x) { this._pToast('Zaznacz i skopiuj ręcznie'); } return; }
    if (a === 'gdring') { this._call('input_button', 'press', {entity_id: 'input_button.guard_dzwon_' + b.dataset.g}); this._pToast('Alarm uruchomiony na telefonie (ponowne dotknięcie wycisza)'); return; }
    if (a === 'gdmsg') { this._gdId = b.dataset.g; this._pSheet('gmsg'); setTimeout(() => { const f = this.shadowRoot.getElementById('gmf'); if (!f) return; const ta = f.querySelector('#gmt'), mm = f.querySelector('#gmm'); f.querySelectorAll('[data-q]').forEach((x) => { x.onclick = () => { ta.value = x.dataset.q; ta.focus(); }; }); f.onsubmit = (ev) => { ev.preventDefault(); const t = ta.value.trim(); if (!t) { mm.textContent = 'Wpisz treść'; return; } this._call('input_text', 'set_value', {entity_id: 'input_text.guard_wiadomosc_' + this._gdId, value: Math.floor(Date.now() / 1000) + '|' + t}); this._pOv(null); this._pToast('Wysłano na telefon ✓'); }; }, 40); return; }
    if (a === 'gdlim') { this._gdId = b.dataset.g; this._pGdLoad(b.dataset.g, true); this._pSheet('glim'); return; }
    if (a === 'glimm' || a === 'glimx' || a === 'glimadd') { if (!this._pGdEdit()) { this._pToast('Limity zmieniają tylko wybrane konta'); return; } const id = b.dataset.g, ent = 'todo.guard_' + id;
      if (a === 'glimx') this._call('todo', 'remove_item', {entity_id: ent, item: [b.dataset.u]});
      else if (a === 'glimm') { const q = String(b.dataset.s).split('|'), mn = Math.max(5, Math.min(600, (parseInt(q[2], 10) || 0) + parseInt(b.dataset.d, 10))); this._call('todo', 'update_item', {entity_id: ent, item: b.dataset.u, rename: q[0] + '|' + (q[1] || '') + '|' + mn}); }
      else { const sel = this.shadowRoot.getElementById('gl_app'), mn = this.shadowRoot.getElementById('gl_min'); if (!sel || !sel.value) return; const o = sel.options[sel.selectedIndex]; this._call('todo', 'add_item', {entity_id: ent, item: sel.value + '|' + (o.dataset.n || sel.value) + '|' + mn.value}); }
      setTimeout(() => this._pGdLoad(id, true), 700); return; }
    if (a === 'gdtime') { this._call('input_datetime', 'set_datetime', {entity_id: b.dataset.e, time: b.dataset.v}); this._pToast('Zapisano – telefon zastosuje zmianę'); return; }
    if (a === 'gdset') { const e = b.dataset.e, v = b.dataset.v; if (v === 'tg') this._call('input_boolean', 'toggle', {entity_id: e}); else this._call('input_number', 'set_value', {entity_id: e, value: parseFloat(v)}); this._pToast('Zapisano – telefon zastosuje zmianę'); return; }
    if (a === 'gdloc') { this._call('input_button', 'press', {entity_id: 'input_button.lokalizacja_telefon_' + b.dataset.g}); this._pToast('Poproszono telefon o pozycję…'); return; }
    if (a === 'gdmapf') { this._pGdMapFs(b.dataset.g || ''); return; }
    if (a === 'gdmapth') { const t = this._pGdMapTh() === 'dark' ? 'light' : 'dark'; try { localStorage.setItem('pulse_gdmap', t); } catch (e) { /* ignore */ } if (this._gdMapEl) this._gdMapEl.themeMode = t; this._pToast(t === 'dark' ? 'Ciemna mapa' : 'Jasna mapa'); return; }
    if (a === 'gdmapx') { const m = this.shadowRoot.getElementById('gdmfs'); if (m) m.remove(); this._gdMapEl = null; return; }
    if (a === 'gdmap') { this._gdMap = this._gdMap === b.dataset.g ? null : b.dataset.g; this._pVRender(true); return; }
    if (a === 'gdfull') { if (!this._pGdEdit()) { this._pToast('Blokadę zmieniają tylko wybrane konta'); return; } this._call('input_boolean', 'toggle', {entity_id: 'input_boolean.blokada_telefon_' + b.dataset.g + '_caly'}); return; }
    if (a === 'gdapps' || a === 'gdallow') { this._gdId = b.dataset.g; this._gdMode = a === 'gdallow' ? 'allow' : 'block'; this._pGdLoad(b.dataset.g, true, this._gdMode); this._pSheet('guardapps'); setTimeout(() => { const q = this.shadowRoot.getElementById('gdq'); if (q) q.oninput = () => { const v = q.value.toLowerCase(); this.shadowRoot.querySelectorAll('#sh [data-q]').forEach((r) => { r.style.display = r.dataset.q.indexOf(v) >= 0 ? '' : 'none'; }); }; }, 40); return; }
    if (a === 'gdapp') { if (!this._pGdEdit()) { this._pToast('Listę zmieniają tylko wybrane konta'); return; } const id = b.dataset.g, md = this._gdMode === 'allow' ? 'allow' : 'block', ent = 'todo.guard_' + id + (md === 'allow' ? '_dozwolone' : ''), it = (((this._pGd || {})[id + (md === 'allow' ? '_ok' : '')] || {}).items || []).find((i) => String(i.summary).split('|')[0].trim() === b.dataset.p);
      if (it) this._call('todo', 'remove_item', {entity_id: ent, item: [it.uid || it.summary]}); else this._call('todo', 'add_item', {entity_id: ent, item: b.dataset.p + '|' + b.dataset.n});
      setTimeout(() => this._pGdLoad(id, true, md), 700); return; }
    if (a === 'lktg') { if (!this._pTdEdit()) { this._pToast('Blokadę zmieniają tylko wybrane konta'); return; } const on = this._s(b.dataset.e) === 'on'; this._call('input_boolean', on ? 'turn_off' : 'turn_on', {entity_id: b.dataset.e}); this._pToast(on ? 'Odblokowano' : 'Zablokowano'); return; }
    if (a === 'lights') { if (this._ovK === 'sheet' && this._shF === 'lights') this._pOv(null); else this._pSheet('lights'); return; }
    if (a === 'tdtab') { this._tdSel = b.dataset.e; this._pVRender(true); return; }
    if (a === 'tded') { this._tdEm = !this._tdEm; this._pVRender(true); return; }
    if (a === 'tdok') { const m = /^todo\.zadania_(.+)$/.exec(b.dataset.e || ''); if (m) { const id = m[1], rw = parseFloat(this._s('input_number.guard_nagroda_' + id)) || 0, be = 'input_number.guard_bonus_' + id; if (rw > 0 && this._hass.states[be]) this._call('input_number', 'set_value', {entity_id: be, value: Math.min(600, (parseFloat(this._s(be)) || 0) + rw)}); if (this._hass.states['counter.guard_zadania_' + id]) this._call('counter', 'increment', {entity_id: 'counter.guard_zadania_' + id}); } }
    if (a === 'tdok' || a === 'tdno') { const c = this._tdC && this._tdC[b.dataset.e]; if (c) { const it = c.items.find((x) => x.uid === b.dataset.u); if (it) { it.description = ''; if (a === 'tdok') it.status = 'completed'; } this._pVRender(true); } this._call('todo', 'update_item', Object.assign({entity_id: b.dataset.e, item: b.dataset.u, description: ''}, a === 'tdok' ? {status: 'completed'} : {})); return; }
    if (a === 'tdt') { const c = this._tdC && this._tdC[b.dataset.e]; if (c) { const it = c.items.find((x) => x.uid === b.dataset.u); if (it) it.status = b.dataset.s; this._pVRender(true); } this._call('todo', 'update_item', {entity_id: b.dataset.e, item: b.dataset.u, status: b.dataset.s}); return; }
    if (a === 'tddel') { if (!this._pTdEdit()) return; this._call('todo', 'remove_item', {entity_id: b.dataset.e, item: b.dataset.u}); const c = this._tdC && this._tdC[b.dataset.e]; if (c) { c.items = c.items.filter((x) => x.uid !== b.dataset.u); this._pVRender(true); } return; }
    if (a === 'f1t') { this._pF1t = b.dataset.t; this._pVRender(true); return; }
    if (a === 'cmode') { this._pCmode = b.dataset.v; this._pVRender(true); return; }
    if (a === 'cmn') { const d = +b.dataset.d, n = new Date(), cm = this._pCm || (this._pCm = {y: n.getFullYear(), m: n.getMonth()}); if (!d) { this._pCm = {y: n.getFullYear(), m: n.getMonth()}; this._pCd = null; } else { const t = new Date(cm.y, cm.m + d, 1); this._pCm = {y: t.getFullYear(), m: t.getMonth()}; this._pCd = null; } this._pVRender(true); return; }
    if (a === 'cmd') { this._pCd = b.dataset.d; this._pVRender(true); return; }
    if (a === 'evdel') { const e = (this._pEvReg || [])[+b.dataset.i]; if (!e) return; this._pEvSel = e; this._pSheet('evdel'); return; }
    if (a === 'evdo') { this._pEvDo(b.dataset.m); return; }
    if (a === 'evnew') { this._pSheet('evform'); setTimeout(() => { const f = this.shadowRoot.getElementById('evf'); if (f) this._pEvBind(f); }, 30); return; }
    if (a === 'tvg') { try { localStorage.setItem('pulse_tvg', b.dataset.g); } catch (x) { /* ignore */ } this._pTvApply(); return; }
    if (a === 'lite') { try { localStorage.setItem('pastel_lite', this._liteU() ? '0' : '1'); localStorage.removeItem('pulse_lite'); } catch (x) { /* ignore */ } this._pTb(); this._pRender(); this._pVRender(true); return; }
    if (a === 'hdr') { try { localStorage.setItem('pulse_hdr', localStorage.getItem('pulse_hdr') === '1' ? '0' : '1'); } catch (x) { /* ignore */ } this._pHideHdr(); this._pVRender(true); return; }
    if (a === 'reload') { location.reload(); }
  }
  getCardSize() { return 12; }
}
if (!customElements.get('aurora-pulse-card')) customElements.define('aurora-pulse-card', AuroraPulseCard);
const SAVER_CSS = `
.pvw { position: absolute; inset: 0; z-index: 3; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0; padding: 20px 4vw; transition: transform 60s linear; color: #eaf2ff; font-family: Roboto, 'Segoe UI', sans-serif; }
.pvw .hello { font-size: min(2.2vw, 16px); letter-spacing: .32em; text-transform: uppercase; opacity: .65; }
.pvw .tm { font-size: min(25vw, 238px); font-weight: 200; line-height: 1; letter-spacing: -.035em; margin-top: 4px; background: linear-gradient(100deg, #fff 20%, var(--a) 45%, var(--b) 55%, #fff 80%); background-size: 220% 100%; -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; animation: pvshine 11s linear infinite; text-shadow: none; }
@keyframes pvshine { to { background-position: -220% 0; } }
.pvw .dt { display: flex; align-items: center; gap: 16px; margin-top: 8px; font-size: min(3.4vw, 26px); letter-spacing: .14em; text-transform: uppercase; opacity: .85; font-weight: 300; }
.pvw .dt::before, .pvw .dt::after { content: ''; width: min(10vw, 90px); height: 1px; background: linear-gradient(90deg, transparent, rgba(255,255,255,.5)); } .pvw .dt::after { transform: scaleX(-1); }
.pvw .tl { display: flex; gap: 16px; margin-top: min(5vh, 44px); }
.pvw .t { display: flex; align-items: center; gap: 14px; padding: 14px 26px 14px 16px; border-radius: 30px; background: linear-gradient(145deg, rgba(40,52,84,.72), rgba(14,20,38,.82)); border: 1px solid rgba(255,255,255,.14); box-shadow: 0 6px 24px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.1); }
.pvw .t .ic { flex: none; width: 58px; height: 58px; border-radius: 50%; display: grid; place-items: center; background: radial-gradient(circle at 35% 30%, color-mix(in srgb, var(--tc) 36%, #0b1226), #070c18 76%); border: 1.5px solid color-mix(in srgb, var(--tc) 80%, transparent); box-shadow: 0 0 20px color-mix(in srgb, var(--tc) 50%, transparent); color: var(--tc); } .pvw .t .ic ha-icon { --mdc-icon-size: 32px; filter: drop-shadow(0 0 6px var(--tc)); }
.pvw .t b { display: block; font-size: min(5.6vw, 44px); font-weight: 300; line-height: 1.05; white-space: nowrap; } .pvw .t b em { font-style: normal; font-size: .5em; opacity: .65; margin-left: 2px; } .pvw .t small { display: block; font-size: min(2vw, 14px); letter-spacing: .14em; text-transform: uppercase; opacity: .6; margin-top: 3px; }
.pvw .t.d b { font-size: min(3.6vw, 28px); font-weight: 400; max-width: 20ch; white-space: normal; }
.pvw .al { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin-top: min(4vh, 34px); max-width: 92%; }
.pvw .a { display: flex; align-items: center; gap: 12px; padding: 9px 20px 9px 9px; border-radius: 99px; background: linear-gradient(145deg, rgba(40,52,84,.72), rgba(14,20,38,.82)); border: 1px solid color-mix(in srgb, var(--tc) 65%, transparent); box-shadow: 0 0 22px color-mix(in srgb, var(--tc) 28%, transparent); }
.pvw .a .ic { width: 42px; height: 42px; border-radius: 50%; display: grid; place-items: center; background: radial-gradient(circle at 35% 30%, color-mix(in srgb, var(--tc) 36%, #0b1226), #070c18 76%); border: 1.5px solid var(--tc); color: var(--tc); box-shadow: 0 0 14px color-mix(in srgb, var(--tc) 55%, transparent); } .pvw .a .ic ha-icon { --mdc-icon-size: 24px; }
.pvw .a b { display: block; font-size: min(2.8vw, 20px); font-weight: 600; } .pvw .a small { display: block; font-size: min(1.9vw, 13px); opacity: .7; margin-top: 1px; }
.pvw .a.s2 { animation: pvhot 2s ease-in-out infinite; } @keyframes pvhot { 50% { box-shadow: 0 0 34px color-mix(in srgb, var(--tc) 55%, transparent); } }
.pvw .a.big { padding: 14px 34px 14px 14px; } .pvw .a.big .ic { width: 62px; height: 62px; } .pvw .a.big b { font-size: min(4vw, 30px); letter-spacing: .1em; }
.sv.nofx .pvw .tm { animation: none; }
.pvw .t b, .pvw .a b, .pvw .dt, .pvw .t b em { color: #f4f8ff !important; opacity: 1; } .pvw .t b em { opacity: .65; } .pvw .t small, .pvw .a small { color: #c9d6ee !important; }

/* wygaszacz zgodny z motywem Pulse: zmienia sie zegar i kafelki (temperatura/pogoda/wilgotnosc, powiadomienia, alarm); efekty pogody wspolne */
.sv.tv .pvw .tm { animation: none; background: linear-gradient(180deg, #fff 12%, var(--a) 100%); -webkit-background-clip: text; background-clip: text; filter: drop-shadow(0 0 22px color-mix(in srgb, var(--a) 45%, transparent)); }
.sv.tv .pvw .t, .sv.tv .pvw .a { background: linear-gradient(135deg, color-mix(in srgb, var(--a) 24%, rgba(8,12,24,.7)), rgba(8,12,24,.8) 72%); border: 1px solid color-mix(in srgb, var(--a) 48%, transparent); box-shadow: 0 0 18px color-mix(in srgb, var(--a) 20%, transparent); }
.sv.tv .pvw .a { border-color: color-mix(in srgb, var(--tc) 70%, transparent); box-shadow: 0 0 22px color-mix(in srgb, var(--tc) 30%, transparent); }
.sv.tv .pvw .hello, .sv.tv .pvw .dt { color: var(--a) !important; }
.sv.th-xmas .pvw .tm { background: linear-gradient(180deg, #fff3c4 10%, #ffd166 100%); -webkit-background-clip: text; background-clip: text; filter: drop-shadow(0 0 22px rgba(255,107,122,.55)); }
.sv.th-xmas .pvw .t, .sv.th-xmas .pvw .a { border-color: rgba(255,107,122,.6); background: linear-gradient(135deg, rgba(255,77,94,.22), rgba(10,40,26,.8) 72%); }
.sv.th-matrix .pvw, .sv.th-matrix .pvw * { font-family: 'Courier New', Consolas, 'Liberation Mono', monospace !important; }
.sv.th-matrix .pvw .tm { background: none; -webkit-text-fill-color: #00ff6a; color: #00ff6a; font-weight: 300; text-shadow: 0 0 22px #00ff6a, 0 0 3px #b6ffcf; filter: none; }
.sv.th-matrix .pvw .t, .sv.th-matrix .pvw .a { border-radius: 12px; background: linear-gradient(135deg, rgba(0,255,106,.14), rgba(0,14,6,.86) 70%); border-color: rgba(0,255,106,.45); }
.sv.th-matrix .pvw .hello::after { content: '_'; animation: pvcur 1s steps(1) infinite; } @keyframes pvcur { 50% { opacity: 0; } }
.sv.th-jarvis .pvw .tm { background: none; -webkit-text-fill-color: #00e5ff; color: #00e5ff; font-family: 'DSEG7 Classic', 'Courier New', monospace; font-weight: 400; letter-spacing: .03em; text-shadow: 0 0 26px #00e5ff, 0 0 4px #bff7ff; filter: none; font-size: min(17vw, 164px); margin: 14px 0 6px; }
.sv.th-jarvis .pvw .t, .sv.th-jarvis .pvw .a { border-radius: 6px; background: linear-gradient(135deg, rgba(0,229,255,.16), rgba(2,14,26,.88) 62%); border-color: rgba(0,229,255,.5); }
.sv.th-jarvis .pvw .hello, .sv.th-jarvis .pvw .dt { letter-spacing: .3em; }
.sv.th-vice .pvw .tm { background: linear-gradient(180deg, #ffe27a 10%, #ff4f6d 55%, #ff2e93 95%); -webkit-background-clip: text; background-clip: text; font-family: 'Arial Black', 'Helvetica Neue', Impact, sans-serif; font-style: italic; font-weight: 900; filter: drop-shadow(0 0 22px rgba(255,61,154,.75)); }
.sv.th-vice .pvw .t, .sv.th-vice .pvw .a { background: linear-gradient(135deg, rgba(255,61,154,.32), rgba(24,6,48,.82) 70%); border-color: rgba(255,140,200,.6); }
.sv.th-vice .pvw .hello, .sv.th-vice .pvw .dt { font-style: italic; font-weight: 800; color: #ffe27a !important; }
.sv.th-aurora .pvw .tm, .sv.th-deep .pvw .tm, .sv.th-space .pvw .tm { font-weight: 100; }
.sv.th-winter .pvw .t, .sv.th-winter .pvw .a { border-color: rgba(220,240,255,.55); }
`;
class AuroraPulseSaver extends AuroraSaverBase {
  _pHs() { let k = ''; try { k = localStorage.getItem('hud_scheme') || ''; } catch (e) { k = ''; } k = k || (this._config && this._config.scheme) || ''; return HUD_SCH.find((x) => x.id === k) || hudSch(); }
  setConfig(cfg) {
    const HOME = '/' + location.pathname.split('/')[1] + '/home', go = () => { try { history.replaceState(null, '', HOME); window.dispatchEvent(new CustomEvent('location-changed', {detail: {replace: true}})); } catch (e) { /* ignore */ } };
    this._config = Object.assign({aurora: true}, cfg || {}); this._wasAur = true;
    this.shadowRoot.innerHTML = `<div id="sty">${this._svStyles()}<style>${SAVER_CSS}</style></div><div class="sv" id="sv"></div>`;
    this._built = true; this._sg = '';
    if (Math.min(window.innerWidth, window.innerHeight) < 500) { this._phone = true; this.shadowRoot.getElementById('sv').style.display = 'none'; setTimeout(go, 0); return; }
    this.shadowRoot.getElementById('sv').addEventListener('pointerdown', go);   /* dotkniecie = powrot do Pulse */
    if (!this._tk) this._tk = setInterval(() => { this._svClock(); this._svDrift(); }, 5000);
    this._svVis = () => { const on = /\/wygaszacz\/?$/.test(location.pathname); const sv = this.shadowRoot.getElementById('sv'); if (sv) sv.style.display = on ? '' : 'none'; return on; };
    window.addEventListener('location-changed', this._svVis); window.addEventListener('popstate', this._svVis); this._svVis();
  }
  _svDrift() { const w = this.shadowRoot.querySelector('.pvw'); if (!w) return; const a = Date.now() / 60000; w.style.transform = `translate(${(Math.sin(a / 3) * 2.2).toFixed(2)}vw, ${(Math.cos(a / 4) * 2.4).toFixed(2)}vh)`; }
  set hass(h) {
    this._hass = h; if (!this._built || this._phone) return; if (!this._svVis()) return; const c0 = this._config && this._config.cfg; if (c0 && typeof c0 === 'object') { if (!this._pcSv) this._pcSv = Object.assign({}, this._config.empty ? PC_EMPTY : PC0, c0); PC = this._pcSv; } else PC = PC0;    /* wlasne ustawienia wygaszacza, niezalezne od innych dashboardow */
    let st = this._s(PC.out.weather) || ''; const night = st === 'clear-night' || this._s('sun.sun') === 'below_horizon'; if (night && st === 'sunny') st = 'clear-night';
    const ot = this._n(PC.out.t), oh = this._n(PC.out.h), wx = WX[st] || ['mdi:weather-cloudy', st], hs = this._pHs(), th = pulseThemeId(this._config), thc = th ? (PTH_HS[th] || PTHEMES[th].hs) : null;
    const alOn = ['normal', 'unavailable', 'unknown', undefined].indexOf(this._s(PC.alarm)) < 0 || !!(PC.alarmSw && this._s(PC.alarmSw) === 'on'), al = this._issues().filter((i) => i.sev >= 1), shown = al.slice(0, 3), more = al.length - shown.length;
    const sig = [st, night, ot === null ? '' : ot.toFixed(1), oh === null ? '' : Math.round(oh), alOn, alOn ? this._alarmSrc() : '', shown.map((i) => i.sev + i.text + i.sub).join('|'), more, hs.id, th].join('~');
    if (sig === this._sg) return; this._sg = sig;
    const fx = this._svFx(st, night), hr = new Date().getHours(), hello = hr < 5 ? 'Dobranoc' : hr < 12 ? 'Dzień dobry' : hr < 18 ? 'Miłego dnia' : 'Dobry wieczór', hum = oh === null ? 0 : Math.max(0, Math.min(100, oh)), C = 2 * Math.PI * 22;
    const sv = this.shadowRoot.getElementById('sv'); sv.className = 'sv c-' + fx.c + (night ? ' n' : '') + (fx.dk ? ' dk' : '') + (th ? ' tv th-' + th : '');
    if (th === 'jarvis') { try { if (!document.getElementById('pulse-dseg')) { const st2 = document.createElement('style'); st2.id = 'pulse-dseg'; st2.textContent = "@font-face{font-family:'DSEG7 Classic';src:url('/local/fonts/DSEG7Classic-Regular.woff2') format('woff2');font-display:swap}"; document.head.appendChild(st2); } } catch (e) { /* ignore */ } }
    const ca = (thc || hs); sv.style.setProperty('--a', ca.a); sv.style.setProperty('--b', ca.b); sv.style.setProperty('--c', ca.c);
    const tile = (col, ic, big, small, cls) => `<div class="t ${cls || ''}" style="--tc:${col}"><span class="ic"><ha-icon icon="${ic}"></ha-icon></span><span>${big}<small>${small}</small></span></div>`;
    sv.innerHTML = `<div class="fxl">${fx.h}</div><div class="pvw"><div class="hello">${hello}</div><div class="tm" id="tm">--:--</div><div class="dt" id="dt"></div>
      <div class="tl">${tile('#ff9a5c', 'mdi:thermometer', `<b>${ot === null ? '—' : ot.toFixed(1).replace('.', ',')}<em>°C</em></b>`, 'na zewnątrz')}${tile(hs.a, wx[0], `<b>${esc(wx[1])}</b>`, 'pogoda teraz', 'd')}${oh === null ? '' : `<div class="t" style="--tc:#60a5fa"><span class="ic"><svg viewBox="0 0 56 56" width="58" height="58" style="position:absolute"><circle cx="28" cy="28" r="22" fill="none" stroke="rgba(255,255,255,.12)" stroke-width="3"/><circle cx="28" cy="28" r="22" fill="none" stroke="#60a5fa" stroke-width="3" stroke-linecap="round" stroke-dasharray="${(C * hum / 100).toFixed(1)} ${C.toFixed(1)}" transform="rotate(-90 28 28)"/></svg><ha-icon icon="mdi:water-percent"></ha-icon></span><span><b>${Math.round(oh)}<em>%</em></b><small>wilgotność</small></span></div>`}</div>
      ${alOn ? `<div class="al"><div class="a s2 big" style="--tc:#ff5d73"><span class="ic"><ha-icon icon="mdi:alarm-light"></ha-icon></span><span><b>ALARM</b><small>${esc(this._alarmSrc())}</small></span></div></div>` : shown.length ? `<div class="al">${shown.map((i) => `<div class="a s${i.sev}" style="--tc:${i.sev >= 2 ? '#ff5d73' : '#ffc24b'}"><span class="ic"><ha-icon icon="${i.icon}"></ha-icon></span><span><b>${esc(i.text)}</b>${i.sub ? `<small>${esc(i.sub)}</small>` : ''}</span></div>`).join('')}${more > 0 ? `<div class="a" style="--tc:${hs.a}"><span><b>+${more}</b></span></div>` : ''}</div>` : ''}</div>`;
    this._svClock(); this._svDrift();
  }
}
if (!customElements.get('aurora-pulse-saver-card')) customElements.define('aurora-pulse-saver-card', AuroraPulseSaver);
window.customCards = window.customCards || [];
window.customCards.push({type: 'aurora-pulse-saver-card', name: 'Aurora Pulse - wygaszacz', description: 'Wygaszacz: efekty aktualnej pogody, zegar, temperatura, alarmy'});
window.customCards.push({type: 'aurora-pulse-card', name: 'Aurora Pulse (mobilny)', description: 'Osobny, kreatywny dashboard mobilny w stylu Aurora: puls domu, żywe niebo, pokoje, orb asystenta, menu-bąble i własne widoki'});
