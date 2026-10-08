# Aufgabe: PrintMyWall als Referenz-Fall auf sunbyte.at ausbauen

**Für:** Claude Code in der SunByte-Session (Repo `batorsunbyte/sunbyte-website`).
**Von:** Claude Code in der PrintMyWall-Session, 08.10.2026, im Auftrag von Zakir.
**Warum jetzt:** Seit 08.10.2026 steht im Fuß von printmywall.at auf jeder Seite
„Website gebaut und betreut von **SunByte**, Wien." mit Link auf sunbyte.at. Wer klickt,
muss auf sunbyte.at den Fall PrintMyWall wiederfinden — sonst führt die Zeile ins Leere.
Dieselbe Zeile steht seit heute auch auf impulsiv-fitness.at, kfz22.com und mstyle.beauty.

## Was zu tun ist

1. **Den Fall `printmywall` in `components/Cases.tsx` mit der echten Geschichte füllen.**
   Heute steht dort nur „Website für unsere eigene Marke … hier testen wir zuerst, was wir
   Kunden verkaufen." Das ist zu dünn für das, was die Seite inzwischen ist (siehe Fakten).
   `outcome` und `desc` neu schreiben; `status: 'live'` stimmt.
2. **Prüfen, ob /arbeiten einen eigenen Fall-Abschnitt oder eine Fall-Seite je Referenz
   trägt.** Wenn ja: PrintMyWall als ausführlichsten Fall anlegen (Vorbild für die anderen).
   Wenn nein: entscheiden, ob eine Fall-Seite `/arbeiten/printmywall` sinnvoll ist — Plan
   vor Code, Zakir kurz die Struktur zeigen.
3. **Keine Zahlen erfinden.** Plausible läuft auf printmywall.at seit dem Start am
   07.10.2026 (Ereignisse „Anfrage" mit Schritt 1/2/3/gesendet, bald „Termin"). Besucher-
   oder Anfragezahlen erst nach etwa vier Wochen Daten — Zugang hat Zakir. Bis dahin
   ohne Zahlen formulieren („live seit 07.10.2026", „jede Anfrage messbar vom ersten Klick
   bis zum Senden").
4. **Bilder:** Die SunByte-Seite rendert Referenzen als Live-Fenster (`LiveFrame`, iframe der
   Kundenseite) — das funktioniert mit printmywall.at. Für Standbilder Screenshots der
   Website verwenden. **Die Kundenfotos auf printmywall.at (Bond Pilates, Neo, District 21,
   Anna's Schnitzelstube …) sind für PrintMyWall freigegeben, nicht für SunByte-Werbung —
   nicht herauslösen.**

## Fakten zu printmywall.at (Stand 08.10.2026, alles belegt, nichts davon erfunden)

- **Neue Seite live seit 07.10.2026** (Astro 5, statisch, Cloudflare Pages). Zakir hat
  Claudes Entwurf 1:1 als ganze Website übernommen. Seiten: Start, Ideen, Mission, Fragen,
  Projekt starten (/start/), Termin (/termin/, noch im Test), Impressum, Datenschutz.
- **Eigenes Design-System „Wand"**: eine Schrift (Plus Jakarta Sans), Creme/Edelblau,
  Orange nur für die eine Handlung, 6-px-Radius nur an Drückbarem, kein Framework-CSS.
  Gilt verbindlich für Website, Formular, E-Mails, Dokumente.
- **Formular „Projekt starten" auf der Website** (drei Schritte, Dateien, Sprachnachricht);
  dahinter ein Flask-Server auf Railway: OneDrive-Ablage, Whisper-Transkription,
  Claude-Analyse der Wandfotos, Notion-Sync, UID-Prüfung über VIES, vier E-Mails im
  Website-Stil in heller und dunkler Erscheinung.
- **Terminbuchung im eigenen Kleid** (/termin/): Microsoft Bookings bleibt Motor (Kalender,
  Bestätigung mit Kalendereintrag, Umbuchen, Absagen), die Seite zeigt Zakirs echte freie
  Zeiten und bucht per Graph-API. Stand 08.10.: fertig gebaut, wartet auf eine Freigabe im
  Entra-Portal, dann Go-live. Erst als Referenz nennen, wenn sie live ist.
- **Messbar**: Plausible (ohne Cookies) zählt den Weg bis zur Anfrage.
- **Bewacht**: GitHub-Actions-Wächter prüft alle 30 Minuten Website und Server und
  eröffnet bei Ausfall ein Issue. DMARC auf quarantine, Cloudflare Access vor jeder
  Vorschau, Beweis-Schnappschüsse bei archive.org.
- **Echtes Material**: Hero-Film aus sechs echten Drucken (29 s), zwölf echte Fotos auf
  /ideen/, alle Freigaben liegen vor; Visualisierungen sind als solche gekennzeichnet.
- **Google-Profil**: 5,0 Sterne bei 19 Bewertungen (Stand 09/2026) — auf der Seite als
  Vertrauensanker.

## Regeln, die auch hier gelten

- Keine Superlative ohne Beleg (UWG), kein „Pionier", nichts von printmywall.de übernehmen
  (fremde, namensgleiche Firma).
- SunByte-Design-Tokens und Standing Rules aus `sunbyte-claude-code-briefing.md`.
- Deploy: Push auf `main` baut GitHub Pages — vorher lokal bauen, Zakir das Ergebnis zeigen.
- Nichts löschen ohne dreimal zu fragen.

## Später (nicht jetzt)

- Haarmeisterei21 (WordPress bei one.com, Ablösung beauftragt): die SunByte-Fußzeile
  kommt mit der neuen Seite, nicht in die alte WordPress-Installation.
- Nach vier Wochen: Plausible-Zahlen in den Fall nachtragen (mit Datum).
