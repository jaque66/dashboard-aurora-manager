# Aurora Manager – dodatek do Home Assistant OS / Home Assistant add-on

**▶ Demo online / Live demo: https://jaque66.github.io/aurora-demo/**

🇵🇱 [Polski](#polski) · 🇬🇧 [English](#english) · [Changelog](aurora_manager/CHANGELOG.md)

---

## Polski

### Do czego służy
**Aurora Manager** to dodatek do Home Assistant OS, który pozwala **zbudować własny dashboard Aurora Pulse bez pisania YAML-a i bez ręcznej edycji układu**. Wybierasz pomieszczenia i encje, decydujesz, co ma być na ekranie głównym, w dolnym docku i w menu „Więcej”, wskazujesz motyw – a Manager tworzy gotowy dashboard w Home Assistant i dba o instalację potrzebnych kart.

**Aurora Pulse** to nowoczesny dashboard dla telefonu i tabletu: żywe niebo zależne od pogody i pory dnia, „Puls domu” (pierścień z alarmami i ostrzeżeniami), kafelki pokoi, światła, szkoła (Vulcan), kalendarz z dodawaniem i usuwaniem wydarzeń (także cyklicznych), pogoda, klimat, powietrze, multimedia, radio, program TV, zadania dzieci z blokadą urządzeń, Formuła 1, asystent głosowy oraz wygaszacz ekranu.

### Możliwości konfiguratora (7 kroków)
1. **Start** – nazwa dashboardu, wybór obszarów Home Assistanta (pomieszczeń), **motyw** i (dla motywu Standardowego) kolorystyka.
2. **Pokoje** – dla każdego pomieszczenia: nazwa, ikona, kolor kafelka, czujniki (temperatura, wilgotność, obecność/ruch, natężenie światła) oraz **urządzenia** (światła, gniazdka, odtwarzacze, wentylatory, rolety) z własnymi etykietami. Pokoje można przestawiać, usuwać i dodawać z kolejnych obszarów.
3. **Dom** – encje wspólne: pogoda i czujniki zewnętrzne, PM2.5 i oczyszczacz powietrza, drzwi wejściowe, gaz/dym, zalanie, alarm (opcjonalnie), kalendarze wydarzeń, **światła** na ekranie głównym i „Zgaś światła”, odtwarzacze Radia, baterie.
4. **Moduły opcjonalne** – dashboard podstawowy działa bez dodatkowych integracji. Moduły **Radio**, **Program TV**, **Zadania**, **Formuła 1** i **Aurora Guard** włączasz tylko wtedy, gdy masz to, czego wymagają (przy każdym w kreatorze jest notatka z wymaganiami i informacja, czy Manager to wykrył): Radio – integracja „Radio RMF ON i ZET” (github.com/jaque66/ha-radio-pl, karta wbudowana); Program TV – integracja „TV guide” (github.com/dariuszpaluch/ha-tv-guide, karta wbudowana) i plik `www/jarvis/tv-guide-config.json`; Zadania – listy `todo.zadania_<dziecko>` (Local To-do); Formuła 1 – integracja F1 Sensor; **Aurora Guard – aplikacja Android Aurora Guard na telefonie dziecka** (github.com/jaque66/aurora-guard) oraz helpery, szablony i listy todo z katalogu `homeassistant/` tamtego repozytorium.
5. **Ekran główny** – które bloki są widoczne (zegar, pogoda, puls domu, „Teraz”, szkoła, pokoje, światła) i w jakiej kolejności; podgląd kolejności na telefonie. Na tablecie siatka układa się automatycznie.
6. **Dock i menu** – do 3 skrótów w dolnym docku telefonu (obok stałych „Dom” i „Więcej”), osobna lista skrótów na pasku bocznym tabletu oraz **zawartość i kolejność menu „Więcej”**. Widoki wyłączonych modułów lub bez wymaganej integracji (np. Vulcan) są wyszarzone z podaniem powodu.
7. **Zapis** – utworzenie lub aktualizacja dashboardu (adres `/aurora-…`) z widokami **Dom** i **Wygaszacz**. Można go potem w każdej chwili otworzyć ponownie w konfiguratorze i poprawić.

### Motywy
Standardowy (18 zestawów kolorystycznych), Auto (świąteczny od 1 grudnia do 6 stycznia), Świąteczny, Matrix (deszcz znaków), Jarvis (HUD w stylu Iron Mana), Vice City (neonowy zachód słońca), Wiosna (płatki), Lato (słońce i świetliki), Jesień (liście), Zima (śnieg), Kosmos (gwiazdy), Zorza polarna i Głębia (bąbelki). Motyw wybrany w Managerze jest wartością domyślną – każdy użytkownik może zmienić swój w Ustawieniach dashboardu. Wygaszacz dopasowuje zegar i kafelki do motywu; efekty pogody są wspólne.

### Karty i kopie zapasowe
- Dodatek zawiera samodzielną kartę `aurora-pulse-card.js` (bez danych domu). Przy zapisie Manager instaluje ją jako zasób Lovelace (`/local/aurora_manager/…`) lub aktualizuje. Jeśli karta jest już zainstalowana inną drogą (np. `/local/jarvis/…`), zostaje bez zmian.
- **Kopie zapasowe** (przycisk w nagłówku): dashboardy Lovelace, zasoby kart i motywy zapisują się w `/config/aurora_backups` (automatycznie codziennie ok. 3:30; liczba kopii w opcji `manager_backup_keep`), z przywracaniem i wgrywaniem z pliku.
- Dashboardy utworzone starszym kreatorem (2.x) są widoczne na liście i można je otworzyć w konfiguratorze.

### Instalacja
1. Home Assistant → Ustawienia → Dodatki → Sklep → ⋮ → **Repozytoria** → `https://github.com/jaque66/dashboard-aurora-manager`
2. Zainstaluj **Aurora Manager**, uruchom i włącz „Pokaż w pasku bocznym”.
3. W panelu kliknij **+ Nowy dashboard** i przejdź przez 7 kroków.

### Wymagania i ograniczenia
- Home Assistant OS/Supervised (dodatek korzysta z API Supervisora).
- Niektóre widoki wymagają integracji: szkoła (Vulcan), Formuła 1 (F1 Sensor), Radio (ha-radio-pl), Program TV (ha-tv-guide), zadania (listy `todo`).
- Układ tabletu jest generowany automatycznie (ukryte bloki znikają); nie ma ręcznego przestawiania bloków na siatce.
- Dashboard jest responsywny: na urządzeniach ≥ 900 px szerokości działa układ tabletowy, na węższych – telefonowy.

---

## English

### What it is
**Aurora Manager** is a Home Assistant OS add-on that lets you **build your own Aurora Pulse dashboard without writing YAML or hand-editing a layout**. You pick the rooms and entities, decide what goes on the home screen, in the bottom dock and in the “More” menu, choose a theme – and the Manager creates a ready dashboard in Home Assistant and takes care of installing the required cards.

**Aurora Pulse** is a modern dashboard for phones and tablets: a living sky that follows weather and time of day, the “Home pulse” ring (alarms and warnings), room tiles, lights, school data (Vulcan), a calendar with adding and deleting events (including recurring ones), weather, climate, air quality, media, radio, TV guide, kids’ tasks with device locking, Formula 1, a voice-assistant orb and a screensaver.

### Configurator features (7 steps)
1. **Start** – dashboard name, Home Assistant areas (rooms), **theme** and (for the Standard theme) colour scheme.
2. **Rooms** – per room: name, icon, tile colour, sensors (temperature, humidity, presence/motion, illuminance) and **devices** (lights, sockets, media players, fans, covers) with custom labels. Rooms can be reordered, removed and added from more areas.
3. **Home** – shared entities: weather and outdoor sensors, PM2.5 and air purifier, front door, gas/smoke, flood, alarm (optional), event calendars, **lights** for the home screen and “Turn off lights”, Radio players, batteries, Formula 1.
4. **Optional modules** – the basic dashboard works without extra integrations. **Radio**, **TV guide**, **Tasks**, **Formula 1** and **Aurora Guard** are enabled only if you have what they need (each has a note in the wizard with its requirements and whether the Manager detected it): Radio – the “Radio RMF ON i ZET” integration (github.com/jaque66/ha-radio-pl, card built in); TV guide – the “TV guide” integration (github.com/dariuszpaluch/ha-tv-guide, card built in) and `www/jarvis/tv-guide-config.json`; Tasks – `todo.zadania_<child>` lists (Local To-do); Formula 1 – the F1 Sensor integration; **Aurora Guard – the Android app Aurora Guard on the child's phone** (github.com/jaque66/aurora-guard) plus the helpers, templates and todo lists from that repository's `homeassistant/` directory.
5. **Home screen** – which blocks are visible (clock, weather, home pulse, “Now”, school, rooms, lights) and in what order, with a phone preview. On tablets the grid is arranged automatically.
6. **Dock & menu** – up to 3 shortcuts in the phone dock (next to the fixed “Home” and “More”), a separate shortcut list for the tablet sidebar, and the **content and order of the “More” menu**. Views whose integration is missing (e.g. Vulcan, F1, Radio PL, TV Guide) are greyed out with the reason.
7. **Save** – creates or updates the dashboard (URL `/aurora-…`) with the **Home** and **Screensaver** views. You can reopen it in the configurator at any time and adjust it.

### Themes
Standard (18 colour schemes), Auto (Christmas from 1 Dec to 6 Jan), Christmas, Matrix (digital rain), Jarvis (Iron-Man-style HUD), Vice City (neon sunset), Spring (petals), Summer (sun and fireflies), Autumn (leaves), Winter (snow), Space (stars), Northern lights and Deep sea (bubbles). The theme chosen in the Manager is the default – every user can change theirs in the dashboard Settings. The screensaver adapts its clock and tiles to the theme; weather effects are shared.

### Cards & backups
- The add-on bundles the self-contained `aurora-pulse-card.js` card (no home data). On save the Manager installs it as a Lovelace resource (`/local/aurora_manager/…`) or updates them. If the card is already installed another way (e.g. `/local/jarvis/…`), it is left untouched.
- **Backups** (header link): Lovelace dashboards, card resources and themes are stored in `/config/aurora_backups` (automatically daily at about 03:30; number of copies set by the `manager_backup_keep` option), with restore and upload-from-file.
- Dashboards created by the older wizard (2.x) show up in the list and can be opened in the configurator.

### Installation
1. Home Assistant → Settings → Add-ons → Store → ⋮ → **Repositories** → `https://github.com/jaque66/dashboard-aurora-manager`
2. Install **Aurora Manager**, start it and enable “Show in sidebar”.
3. In the panel click **+ New dashboard** and go through the 7 steps.

### Requirements & limitations
- Home Assistant OS / Supervised (the add-on uses the Supervisor API).
- Some views need integrations: school (Vulcan), Formula 1 (F1 Sensor), Radio (ha-radio-pl), TV guide (ha-tv-guide), tasks (`todo` lists).
- The tablet layout is generated automatically (hidden blocks disappear); there is no manual block placement on the grid.
- The dashboard is responsive: devices ≥ 900 px wide use the tablet layout, narrower ones the phone layout.
