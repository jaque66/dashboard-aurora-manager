# Changelog

## 3.0.12 – 2026-11-27

**PL**
- Publiczna wersja kart nie zawiera już rzutu mieszkania ani żadnych danych z instalacji autora.

**EN**
- The public card build no longer contains a floor plan or any data from the author’s installation.

## 3.0.11 – 2026-11-27

**PL**
- Dalsze oczyszczenie wersji publicznej kart: usunięto z niej nazwy pokoi i telefonów z instalacji autora (rzut mieszkania, mapowanie asystenta głosowego).

**EN**
- Further cleanup of the public card build: room and phone names from the author’s installation (floor plan, voice-assistant mapping) were removed.

## 3.0.10 – 2026-11-27

**PL**
- Wersja publiczna kart jest teraz w pełni neutralna: usunięto z niej domyślne dane rzutu 3D mieszkania, nazwy encji i kalendarzy szkolnych z instalacji autora. Nie zmienia to działania dashboardów tworzonych w konfiguratorze.

**EN**
- The public card build is now fully neutral: default 3D floor-plan data, entity names and school-calendar names from the author’s installation were removed. Dashboards created in the configurator behave the same.

## 3.0.9 – 2026-11-25

**PL**
- Karta Pulse v131: **wysyłanie wiadomości na panele w pokojach** (MQTT) – w widoku pokoju sekcja „Panel w pokoju” oraz skrót w widoku Aurora Guard; szybkie teksty, historia, opcja zamiany polskich znaków.
- Konfigurator: w edycji pokoju opcjonalne pole „Panel w pokoju – temat MQTT”.

**EN**
- Pulse card v131: **sending messages to room panels** (MQTT) – a “Panel in the room” section in the room view and a shortcut in the Aurora Guard view; quick texts, history, an option to strip Polish diacritics.
- Configurator: optional “Room panel – MQTT topic” field in the room editor.

## 3.0.8 – 2026-11-25

**PL**
- Motyw **Hologram**: Puls domu to wersja 3D standardowego pulsu – pierścień z **4 łuków** (uwagi, powietrze, światła, komfort) w perspektywie, z grubością (ekstruzja), połyskiem, kolorem i długością jak w wersji płaskiej, na siatce podłogi; znaczniki kategorii na łukach, dotknięcie łuku otwiera szczegóły. Karta Pulse v130.

**EN**
- **Hologram** theme: the Home pulse is a 3D version of the standard pulse – a ring of **4 arcs** (alerts, air, lights, comfort) in perspective, with thickness (extrusion), gloss, colour and length as in the flat version, over a floor grid; category markers sit on the arcs and tapping an arc opens its details. Pulse card v130.

## 3.0.7 – 2026-11-25

**PL**
- Motyw **Hologram**: Puls domu pokazuje teraz **parametry zdrowia domu** zamiast pokoi (te są już po prawej): uwagi, światła (włączone/wszystkie), powietrze (PM2.5), klimat (średnia temperatura), baterie (najniższy poziom), łączność (urządzenia online). Każdy parametr to szklana tuba z kolumną wypełnioną do wartości na skali, kolorem stanu i podpisem; dotknięcie otwiera szczegóły. Karta Pulse v128.

**EN**
- **Hologram** theme: the Home pulse now shows **house health metrics** instead of rooms (already listed on the right): alerts, lights (on/total), air quality (PM2.5), climate (average temperature), batteries (lowest level), connectivity (devices online). Each metric is a glass tube filled to its value on a scale, with a status colour and label; tapping opens details. Pulse card v128.

## 3.0.6 – 2026-11-25

**PL**
- Motyw **Hologram**: Puls domu to teraz trójwymiarowa platforma z **kolumnami pokoi** – wysokość kolumny = temperatura, kolor = stan (miętowy OK, żółty/czerwony poza progami temperatury i wilgotności), podstawa świeci przy obecności lub włączonym świetle; dotknięcie kolumny otwiera pokój. Rysowane statycznie przy zmianie danych (bez animacji). Znaczniki kategorii obok liczby uwag. Karta Pulse v126.

**EN**
- **Hologram** theme: the Home pulse is now a 3D platform with **room columns** – column height = temperature, colour = status (mint OK, amber/red outside the temperature and humidity thresholds), the base glows when someone is present or a light is on; tapping a column opens the room. Drawn statically when data changes (no animation). Category markers next to the alert count. Pulse card v126.

## 3.0.5 – 2026-11-25

**PL**
- Motyw **Hologram**: Puls domu jako trójwymiarowy pierścień widma (animowane kolce wzdłuż elipsy, neonowe fioletowe i miętowe pierścienie, siatka podłogi) – jak na wizualizacji; w pozostałych motywach Puls bez zmian. Karta Pulse v123.

**EN**
- **Hologram** theme: the Home pulse is a 3D spectrum ring (animated spikes along an ellipse, neon violet and mint rings, floor grid) as in the mock-up; other themes keep the regular pulse. Pulse card v123.

## 3.0.4 – 2026-11-25

**PL**
- Nowy motyw **Hologram** (grafitowe szklane kafelki, miętowo-fioletowa poświata, neonowe pierścienie pod Pulsem domu, pływające bokeh) – dostępny w konfiguratorze. Karta Pulse v121: automatyka świateł także w widoku pokoju, widok Aurora Guard (blokady telefonów dzieci, w tym cały telefon).

**EN**
- New **Hologram** theme (graphite glass tiles, mint-violet glow, neon rings under the Home pulse, floating bokeh) – available in the configurator. Pulse card v121: light automation also inside the room view, Aurora Guard view (children's phone locks, including whole-phone lock).

## 3.0.3 – 2026-11-25

**PL**
- Wykrywanie integracji (TV Guide, Radio PL, F1) po wpisach konfiguracji w Home Assistant, a nie tylko po encjach – widok **Program TV** był błędnie wyszarzony, bo TV Guide nie tworzy encji. Dla Programu TV wymagany jest też plik listy kanałów `www/jarvis/tv-guide-config.json` (powód podawany w konfiguratorze).

**EN**
- Integration detection (TV Guide, Radio PL, F1) now uses Home Assistant config entries instead of entities only – the **TV guide** view was wrongly greyed out because TV Guide creates no entities. The TV view also needs the channel list file `www/jarvis/tv-guide-config.json` (the reason is shown in the configurator).

## 3.0.2 – 2026-11-25

**PL**
- Konfigurator: wybrane czujniki baterii, które są niedostępne (np. stare urządzenia Browser mod), są teraz **widoczne na liście** (wcześniej były ukryte, ale nadal sprawdzane); ostrzeżenie i przycisk „Usuń je z listy”.

**EN**
- Configurator: selected battery sensors that are unavailable (e.g. stale Browser mod devices) are now **shown in the list** (before they were hidden yet still checked); a warning and a “Remove them from the list” button.

## 3.0.1 – 2026-11-25

**PL**
- Konfigurator: nowa sekcja **„Co sprawdzać (alarmy i uwagi)”** – kategorie do włączenia/wyłączenia (baterie, brak łączności urządzeń kluczowych, klimat, drzwi, powietrze i filtr, pranie, przerwy w dostawie, ostrzeżenia pogodowe).
- Lista **czujników baterii z wyszukiwarką**; domyślnie pomijane są baterie niedostępne oraz tabletów, telefonów i przeglądarek (Browser mod), które dawały fałszywe alarmy.
- Karta Aurora Pulse (v114): obsługa filtrów `checks` i `ignore`; **poprawka**: dashboard bez własnej konfiguracji (np. Twój główny) nie przejmuje już ustawień innego dashboardu otwartego w tej samej sesji (to powodowało nagły wysyp alarmów po utworzeniu dashboardu testowego). Wygaszacz ma własne ustawienia.

**EN**
- Configurator: new **“What to check (alarms and notices)”** section – categories you can switch on/off (batteries, connectivity of key devices, climate, front door, air and filter, laundry, outages, weather warnings).
- **Battery sensor list with search**; unavailable batteries and those of tablets, phones and browsers (Browser mod) are skipped by default – they used to cause false alarms.
- Aurora Pulse card (v114): supports `checks` and `ignore` filters; **fix**: a dashboard without its own configuration (e.g. your main one) no longer inherits the settings of another dashboard opened in the same session (which caused a sudden flood of alarms after creating a test dashboard). The screensaver has its own settings.

## 3.0.0 – 2026-11-24

**PL**
- Dodatek przebudowany od nowa: **konfigurator dashboardów Aurora Pulse** (6 kroków: start, pokoje, dom, ekran główny, dock i menu, zapis) zamiast edytora układu.
- Wybór encji dla każdego pomieszczenia (czujniki i urządzenia) oraz encji wspólnych (pogoda, PM2.5, drzwi, gaz, zalanie, alarm, kalendarze, światła, Radio, baterie, F1).
- Ekran główny: widoczność i kolejność bloków; dock telefonu (do 3 skrótów), pasek boczny tabletu i zawartość menu „Więcej” – konfigurowalne.
- Domyślny motyw i kolorystyka dashboardu ustawiane w Managerze (użytkownik może zmienić na swoim urządzeniu).
- Dodatek zawiera neutralną kartę bazową Aurory (`pastel-home-card.js`) i `aurora-pulse-card.js`; instalacja i aktualizacja kart jako zasobów Lovelace (z pominięciem kart zainstalowanych inną drogą).
- Lista dashboardów z konfiguracją, usuwaniem (także z Home Assistanta); dashboardy z kreatora 2.x pozostają dostępne.
- Kopie zapasowe zostały (uproszczone grupy: dashboardy, karty, motywy). Usunięto stary edytor Aurory/Pastela, kreator 2.x i instalację z wbudowanej kopii.
- Karta Aurora Pulse (v113): konfigurowalny dock i menu „Więcej”, motywy tematyczne, poprawka układu telefonu w dashboardach z konfiguratora.

**EN**
- The add-on has been rebuilt from scratch: an **Aurora Pulse dashboard configurator** (6 steps: start, rooms, home, home screen, dock & menu, save) replaces the layout editor.
- Per-room entity selection (sensors and devices) and shared entities (weather, PM2.5, door, gas, flood, alarm, calendars, lights, Radio, batteries, F1).
- Home screen block visibility and order; phone dock (up to 3 shortcuts), tablet sidebar and “More” menu content are configurable.
- Default dashboard theme and colour scheme set in the Manager (users can still change them on their own device).
- Bundles a neutral Aurora base card (`pastel-home-card.js`) and `aurora-pulse-card.js`; cards are installed/updated as Lovelace resources (cards installed another way are left alone).
- Dashboard list with configure, open and delete (also from Home Assistant); dashboards from the 2.x wizard remain available.
- Backups kept (simplified groups: dashboards, cards, themes). Removed the old Aurora/Pastel editor, the 2.x wizard and install-from-bundled-copy.
- Aurora Pulse card (v113): configurable dock and “More” menu, themed backgrounds, fix for the phone layout in configurator-made dashboards.

## Aurora Pulse card changes shipped with 3.0.0 / Zmiany karty Aurora Pulse w 3.0.0

**PL**
- **Motywy:** Matrix, Jarvis, Vice City, Wiosna, Lato, Jesień, Zima, Kosmos, Zorza polarna, Głębia (animowane tła i cząsteczki) oraz Świąteczny; wybór w Ustawieniach, kolorystyka tylko dla motywu Standardowego (+ 18 zestawów kolorów); wygaszacz dopasowuje zegar i kafelki do motywu.
- **Telefon:** światła w docku (panel „Światła” z „Zgaś wszystkie”), sekcje „Teraz” i „Szkoła” ograniczone do 2 kafelków z rozwijaniem, pokoje w siatce 2 kolumn, kafelki półprzezroczyste, animacja wejścia okien, mniej glitchy przy przewijaniu (pauza animacji, izolacja warstw, tło bez paralaksy w motywach).
- **Kalendarz:** dodawanie wydarzeń (także cyklicznych: codziennie/co tydzień/co miesiąc/co rok, dni tygodnia, koniec), usuwanie (jednego wystąpienia, kolejnych lub całej serii), widok miesiąca.
- **F1:** pełne klasyfikacje kierowców i zespołów oraz wyniki wyścigu z pozycjami startowymi.
- **Ustawienia:** wybór potoku asystenta, progi alarmów temperatury i wilgotności, motyw.
- **Pozostałe:** widok Zadania (listy dzieci, „Do zrobienia”, blokada urządzeń), Program TV, strona „Dom” na TV (DashCast, sterowanie pilotem), poprawki lamp (kolorowe suwaki, biel), tytuły radia zsynchronizowane z dźwiękiem.

**EN**
- **Themes:** Matrix, Jarvis, Vice City, Spring, Summer, Autumn, Winter, Space, Northern lights, Deep sea (animated backgrounds and particles) plus Christmas; chosen in Settings, colour schemes only for the Standard theme (+ 18 schemes); the screensaver follows the theme.
- **Phone:** lights in the dock (“Lights” sheet with “Turn off all”), “Now” and “School” limited to 2 tiles with expand, 2-column room grid, translucent tiles, sheet entrance animation, fewer scroll glitches (paused animations, isolated layers, static background in themes).
- **Calendar:** add events (including recurring: daily/weekly/monthly/yearly, weekdays, end), delete (single occurrence, following or whole series), month view.
- **F1:** full driver and constructor standings and race results with grid positions.
- **Settings:** assistant pipeline picker, temperature/humidity alert thresholds, theme.
- **Other:** Tasks view (kids’ lists, “To do”, device locking), TV guide, “Home” page on TV (DashCast, remote-controlled), light fixes (colour sliders, white), radio titles synced with audio.

## 2.5.1 – 2026-11-20
- Zakładka „Do zrobienia” w widoku Zadania. / “To do” tab inside the Tasks view.

## 2.5.0 – 2026-11-20
- Karta Aurora Pulse: widok Zadania, blokada urządzeń, dodawanie wydarzeń, Program TV, motyw świąteczny. / Aurora Pulse card: Tasks view, device locking, adding events, TV guide, Christmas theme.

## 2.4.x – 2026-11-19
- Kreator nowego dashboardu (Pastel / Aurora / Aurora Pulse), instalacja karty Pulse jako zasobu, ostrzeżenia po utworzeniu. / New-dashboard wizard (Pastel / Aurora / Aurora Pulse), Pulse card installed as a resource, post-create warnings.

## 2.3.0 – 2026-11-14
- Edytor układu Aurory (kolejność, rozmiar i widoczność sekcji, tablet i telefon), przełącznik Aurora/Pastel. / Aurora layout editor (order, size and visibility of sections, tablet and phone), Aurora/Pastel switch.

## 2.0.0 – 2.2.1 – 2026-11-09
- Pierwsze wydania: edytor Aurory, widoki Szkoła i Transport, kopie zapasowe, instalacja. / First releases: Aurora editor, School and Transport views, backups, installation.
