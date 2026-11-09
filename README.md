# Aurora Manager – dodatek do Home Assistant OS

Jeden dodatek do dashboardów Aurora: **edytor** (układ, pokoje, progi, widoki, wygaszacz, projekty, podgląd na żywo)
oraz **instalacja, kopie zapasowe, przywracanie i tworzenie nowych dashboardów od zera**.

## Instalacja
1. Home Assistant → Ustawienia → Dodatki → Sklep → ⋮ → **Repozytoria** → `https://github.com/jaque66/dashboard-aurora-manager`
2. Zainstaluj **Aurora Manager**, uruchom i włącz „Pokaż w pasku bocznym”.
3. W panelu: **Kopie i instalacja** → wgraj kopię (`.tar.gz`) i **Przywróć**, albo utwórz nowy dashboard.

Kopie trafiają do `/config/aurora_backups`. Wbudowaną kopię można dołączyć do własnej wersji dodatku:
`python3 package_payload.py` (plik z `aurora_manager/payload/` jest w `.gitignore`, bo zawiera dane domu).
