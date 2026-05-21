# Sunbyte Website — Build-Briefing für Claude Code

**Repo:** `batorsunbyte/sunbyte-website` · Next.js static export → GitHub Pages
**Stand:** Hero-Konzept & Richtung stehen (siehe Referenz). Rest wird hier beauftragt.

---

## 0. Standing Rules (gelten für alles)

- **Plan vor Code.** Phase für Phase: eine Sache fertig, dann die nächste.
- **Test-driven**, wo sinnvoll. Nach jeder Phase: kurzer Self-Review (was lief, was nicht, was anders).
- **Nichts löschen ohne 3× zu fragen.** Heilige Regel.
- **Pushback ist erwünscht** — Optionen vorschlagen, nicht diktieren.
- **Für 6 Monate Skalierung bauen, nicht nur „läuft jetzt".**
- Sprache mit Zakir: **Deutsch**. Antworten an Zakir kurz halten; Briefings dürfen präzise sein.
- **Aktionen für Zakir stehen fett.**
- Nur **gratis/Open-Source Fonts**.

---

## 1. Kanonische Referenz: der Hero

Der gesamte Look, die Welt-Globe und die Interaktion sind im Spike **`hero-spike-v7.html`** definiert. Das ist die Quelle der Wahrheit für den Hero.

> **Zakir-Action:** Die Datei `sunbyte-light-spike-v7.html` ins Repo legen, z.B. unter `reference/hero-spike-v7.html`. Claude Code portiert daraus, erfindet den Look nicht neu.

Was der Spike enthält und 1:1 erhalten bleibt:
- Glühende, **schattenlose** Welt-Kugel (Orange als Lichtquelle), echte Kontinent-Geometrie (`world-atlas`), Auto-Rotation + Drag-to-rotate.
- **Hover/Tap auf Kontinent** → Hervorhebung + kurzer Web/IT/Chancen-Text links.
- **Österreich als Ausnahme**: Akzent-Fill + pulsierender Wien-Marker + Sonderbotschaft („nächste IT-Weltmacht").
- **Antarktis** mitgezeichnet & wählbar.
- Investitions-Zeile über der Kugel, Case-Marquee, Korn, „Licht-an"-Intro.

---

## 2. Tech-Stack & Constraints

- **Next.js** mit `output: 'export'` (statischer Export für GitHub Pages).
- Custom Domain **sunbyte.at** → GH Pages mit `CNAME`-Datei, **kein** `basePath` nötig. (Bei Projekt-URL stattdessen `basePath`/`assetPrefix` = `/sunbyte-website`.)
- **Fonts self-hosted** über `@fontsource` (Open-Source): `fraunces`, `inter-tight`, `jetbrains-mono`. **Kein** Google-Fonts-CDN zur Laufzeit (Privacy + Zuverlässigkeit auf GH Pages).
- **Globe-Abhängigkeiten schlank** via npm: `d3-geo`, `topojson-client`, `world-atlas`. Nur `d3-geo` (nicht das volle `d3`). Genutzt: `geoOrthographic`, `geoPath`, `geoGraticule10`, `geoContains`, `geoDistance`, `geoCentroid`.
- **Weltdaten bundeln**, nicht zur Laufzeit vom CDN fetchen: `countries-110m.json` aus `world-atlas` importieren → liegt im Bundle, lädt offline & zuverlässig.
- **Lazy-load**: Globe-Komponente + Weltdaten per dynamic import / IntersectionObserver erst laden, wenn im Viewport.

### Design-Tokens (fix)
- Fonts: Fraunces (Display 900), Inter Tight (400/500), JetBrains Mono (Labels, lowercase, getrackt).
- Farben: `--bg #0E0A05`, `--spark #E85A1F`, `--lit #FFF3E4`, `--soft #C9B8A3`, `--muted #9C8F7E`, `--earth #A98762`. Land auf Globe `#6e2409`, Hervorhebung `#FFF3E4`, Österreich-Akzent `#E85A1F`.
- Typo-Skala: alles `clamp()`, keine fixen px für Display. Headline `clamp(3rem, 9.5vw, 7rem)`.

---

## 3. Performance-Gates (hart — gegen Mobile-Ruckeln)

- Nur `transform` + `opacity` animieren. Nie Layout-Properties.
- Genau **ein** rAF-Loop pro Globe-Instanz. Canvas nur neu zeichnen, wenn nötig (dirty-flag).
- `prefers-reduced-motion` → keine Auto-Rotation, Globe bleibt aber drehbar; Marquee/Intro aus.
- Pixelrate auf `min(devicePixelRatio, 2)` deckeln.
- **Wichtiger Pushback / Regel:** **Niemals mehrere live-rotierende Canvas-Globes gleichzeitig im Viewport.** Mehrere Render-Loops = Mobile-Killer. → In der Leistungen-Sektion ist nur die Premium-Premium-Demo evtl. interaktiv, Standard/Premium sind statisch (oder Bild). Pro sichtbarem Bereich max. **eine** aktive Globe.
- Globe-Loop sauber in `useEffect`-Cleanup beenden (unmount, Tab-Wechsel via `visibilitychange` pausieren).

---

## 4. Architektur: wiederverwendbare Globe-Komponente

Genau **eine** Komponente, über Props konfigurierbar — einmal bauen, überall steuern:

```
<Globe
  autoRotate={boolean}     // dreht von selbst
  interactive={boolean}    // Drag + Hover/Tap aktiv
  showInsights={boolean}   // Kontinent-Texte / Info-Panel
  showMarker={boolean}     // pulsierender Wien-Marker
/>
```

Damit lassen sich Hero und alle drei Leistungs-Stufen aus derselben Logik ableiten (siehe §6).

---

## 5. Seitenstruktur

1. **Hero** — `<Globe autoRotate interactive showInsights showMarker />` + Headline + Investitions-Zeile + Case-Marquee. (= Spike v7.)
2. **Leistungen** — die drei selbst-demonstrierenden Stufen (§6). Kernstück.
3. **Cases** — echte Projekte: kfz22 (live, kfz22.com), PrintMyWall (wird gerade neu aufgesetzt), „mehr kommt".
4. **Studio / Gründer** — Zakirs Story (inhabergeführt, von Grund auf in Wien). **Platzhalter** bis Zakir Text + Foto liefert.
5. **Kontakt** — schlicht, klar, eine CTA.
6. **Footer**.

---

## 6. Leistungen-Sektion — die drei Stufen (Zakirs Idee, Kernstück)

Konzept: Der Besucher **sieht den Unterschied live**, statt ihn erklärt zu bekommen. Dieselbe Welt-Hero, dreimal, schrittweise abgespeckt. Drei Karten (Desktop nebeneinander, Mobile gestapelt):

| Stufe | Globe | Verhalten | Beispiel-Referenz |
|---|---|---|---|
| **Standard** | **keine Globe** | nur der Titel, schlichtes Layout | alte PrintMyWall (Standard) — aktuell offline, **Screenshot später** |
| **Premium** | Globe **vorhanden, statisch** | dreht **nicht**, **keine** Kontinent-Texte, keine Interaktion | **kfz22** (live, Screenshot/Link) |
| **Premium-Premium** | **volle** interaktive Globe | dreht, drag, Kontinent-Texte, Wien-Marker, Investitions-Zeile | **diese Seite selbst** (Sunbyte) |

Implementierung über die Props aus §4:

```
Standard:           (keine Globe-Komponente, nur Titel)
Premium:            <Globe autoRotate={false} interactive={false} showInsights={false} showMarker={false} />
Premium-Premium:    <Globe autoRotate interactive showInsights showMarker />
```

Jede Karte zusätzlich: Stufen-Name, 1 kurze Zeile „was enthalten ist", die Demo, die Case-Referenz, dezente CTA.

**Performance-Pflicht hier:** Standard hat keine Globe, Premium ist statisch (ein einziger Render, kein Loop). Nur die PP-Demo darf einen Loop haben — und auch die erst per IntersectionObserver starten, und nur, wenn der Hero gerade **nicht** sichtbar ist (sonst laufen zwei Loops). Im Zweifel PP-Demo in der Leistungen-Sektion als **statisches Standbild** zeigen mit Verweis „live oben im Hero" — Pushback an Zakir, wenn zwei Loops drohen.

---

## 7. Headline (eine offene Entscheidung)

Der Titel „Web, das auffällt" ist raus (zu Standard). Empfehlung als Default, bis Zakir bestätigt:

> **„Deine Identität, verstärkt wie nie."**
> Sub: *Premium-Web, das deine Marke spürbar macht — kraftvoll, klar, unverwechselbar.*

> **Zakir-Action:** Headline bestätigen oder eine der Alternativen wählen (01 „Deine Marke, unübersehbar." / 02 „Die Seite, die man nicht vergisst." / 04 „Der Auftritt, der alles verändert.") — oder Headline/Sub mischen.

---

## 8. Phasen-Plan

- **P0 — Setup:** Headline bestätigt; `hero-spike-v7.html` im Repo; Deps installiert; Design-Tokens als CSS-Variablen/Theme-Datei; Fonts via `@fontsource` self-hosted.
- **P1 — Globe-Komponente:** Port aus v7 als wiederverwendbares React-Component mit den 4 Props (§4). Isoliert testen (alle Prop-Kombinationen). Cleanup/Pause-Logik. **Auf echtem Handy testen.**
- **P2 — Hero-Sektion:** Globe (voll) + Headline + Investitions-Zeile + Marquee + Intro. **Real-Phone-Test (kein Ruckeln).**
- **P3 — Leistungen (§6):** drei Stufen über Props, Karten, Case-Referenzen, Performance-Regel beachten.
- **P4 — Cases:** kfz22 + PrintMyWall (Platzhalter) + „mehr kommt".
- **P5 — Studio/Gründer:** Layout mit Platzhalter-Text/Foto.
- **P6 — Kontakt + Footer.**
- **P7 — Perf/Mobile-QA:** Lighthouse, `prefers-reduced-motion`, Loop-Cleanup, Deploy auf GH Pages (Custom Domain).

Nach jeder Phase: Self-Review + git pull/push-Disziplin (PC ↔ Laptop).

---

## 9. Zakir-Actions (gesammelt)

- **Headline bestätigen** (§7).
- **`hero-spike-v7.html` ins Repo legen** (`reference/`).
- **GitHub Pages auf Custom Domain `sunbyte.at`** konfigurieren (CNAME + DNS bei IONOS/Registrar).
- **kfz22-Screenshot** für die Premium-Stufe liefern.
- **Gründer-Story + Foto** liefern (für Studio-Sektion; bis dahin Platzhalter).
- Später: **Standard-Beispiel** (Screenshot, sobald neue PrintMyWall live ist).

---

## 10. Offene Punkte / Pushback-Themen für Claude Code

- Zwei Live-Globes vermeiden (§3, §6) — Vorschlag machen, falls Konflikt.
- Bundle-Größe der Weltdaten checken; ggf. `110m` reicht, nicht `50m`.
- Kontinent-Zuordnung läuft über grobe Geo-Zonen (siehe Spike `continentOf`). Falls Grenzfälle (Russland/Naher Osten) falsch eingefärbt: Zonen verfeinern oder auf ISO-Code→Kontinent-Mapping umstellen — Zakir kurz fragen.
