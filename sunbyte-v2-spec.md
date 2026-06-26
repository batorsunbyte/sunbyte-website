# Sunbyte v2 — Spec: IT-Dienstleister-Relaunch

**Branch:** `redesign/v2-it-dienstleister` · Next.js static export → GitHub Pages
**Stand:** Konzept von Zakir freigegeben („go", 2026-06-25). Build phasenweise.

---

## 0. Positionierung (NEU)

Sunbyte = **IT-Dienstleister aus Wien.** Zwei Dienste:

1. **Webseiten** — erstellen *oder* aktualisieren. **ab 1.500 €.** Zwei Pakete: **Standard** + **Premium**.
2. **KI-Sichtbarkeit** — dein Unternehmen wird von KI (ChatGPT & Co.) gefunden und weiterempfohlen. **700 €.**

**Team:** Zakir Daryabi (Gesicht, Gründer, Designer, 6 J. KI/IT) + sein Bruder (Senior, 15+ J. IT, KI-Spezialist — **per Rolle genannt, kein Name, kein Foto**, Zakirs Entscheidung).

**Vision / Mission:** „Wir bauen Sunbyte zu einer IT-Weltmacht." — Nordstern der Seite. Der glühende Globe ist die Marken-Signature und trägt diese Story.

---

## 1. Entscheidungen (von Zakir bestätigt)

- **Team:** Zakir als Gesicht, Bruder per Rolle genannt (kein Name).
- **Preise:** transparent zeigen (700 € / ab 1.500 €).
- **Über-mich:** professionell + 1 persönliche Note (kein tiefes Privates; Memory: „Privates strikt getrennt").
- **Pakete:** nur **Standard + Premium** (Premium-Premium fällt raus).
- **Tel/Anschrift:** aus PrintMyWall übernehmen → Jeldersdorfer Straße, 1210 Wien · +43 660 3610642.
- **Theme:** Dark bleibt (Dual-Light-Mode bewusst out-of-scope, eigenes Projekt).
- **Globe:** bleibt Signature.

## 2. Architektur — Multi-Page (echte Routen)

Persistenter Header + Footer auf **allen** Seiten.

Nav (Reiter): `sunbyte` (→/) · **webseiten** · **ki-sichtbarkeit** · **arbeiten** · **über uns** · **kontakt**

| Route | Seite | Kern |
|---|---|---|
| `/` | Home | Hero (voller Globe) + 2-Dienste-Teaser + Cases-Teaser + Vision-Zeile + CTA |
| `/webseiten` | Webdienst | Intro · Pakete Standard + Premium (ab 1.500 €) · „sieh den Unterschied" (Standard ohne / Premium mit statischem Globe) · kfz22-Referenz · CTA |
| `/ki-sichtbarkeit` | KI-Dienst | Warum (Leute fragen KI statt Google) · Ablauf (Analyse → strukturierte Daten/Schema → Präsenz in LLM-Quellen → Monitoring) · Leistungen · 700 € · FAQ · CTA |
| `/arbeiten` | Cases | kfz22 (live) · PrintMyWall (in Entwicklung) · „mehr kommt" |
| `/ueber-uns` | About | Editorial (Foto + Story, professionell + 1 Note) · Team-Block (Bruder per Rolle) · Vision-Scroll-Moment („IT-Weltmacht") |
| `/kontakt` | Kontakt | „Lass uns reden." · E-Mail + „Wien, Österreich" · Tel/Anschrift (PrintMyWall) |
| `/impressum`, `/datenschutz` | Legal | bestehend, mit PrintMyWall-Werten + persistentem Header |

## 3. Komponenten-Plan

**Neu/Shared:**
- `components/Header.tsx` — persistente Nav, `usePathname()` für Active-State, Mobile-Menü. Ersetzt Hero-interne Nav.
- `components/Footer.tsx` — aus `Contact.tsx` extrahiert, überall genutzt.
- `components/JsonLd.tsx` — strukturierte Daten (Organization site-wide; Service/Person/FAQ pro Seite). **Eigener Dienst, am eigenen Beispiel demonstriert** (verkauft KI-Sichtbarkeit mit).
- `components/ServiceTeaser`, `components/CTA`, `components/SectionHeader` — kleine Bausteine für Konsistenz.

**Wiederverwendet/angepasst:**
- `Globe.tsx`, `lib/globe-data.ts` — unverändert (Globe-Texte passen, Österreich = „IT-Weltmacht").
- `Hero.tsx` → interne Nav raus; Kicker + Sub auf IT-Dienstleister + beide Dienste.
- `Services.tsx` → wird Basis der `/webseiten`-Pakete (2 statt 3 Karten).
- `Cases.tsx` → `/arbeiten`.
- `Studio.tsx` (Scroll-Reveal + Spark-Anflug) → Vision-Moment auf `/ueber-uns`.
- `Contact.tsx` → `/kontakt` (E1: „Wien, Österreich"; echte Tel/Anschrift).

**Nichts wird gelöscht.** Ersetzte Alt-Versionen wandern nach `components/_archive/` (bestehendes Muster).

## 4. Design-System (bleibt)

Fraunces (Display 900) · Inter Tight (Body) · JetBrains Mono (Labels, lowercase, getrackt). Farben: `--bg #0E0A05`, `--spark #E85A1F`, `--lit #FFF3E4`, `--soft`, `--muted`. Nummerierte Sektionen, große clamp-Headlines, asymmetrische Grids, glühender Globe.

## 5. Perf (heilig)

Nur `transform`/`opacity`. Max. **eine** aktive Globe-Loop pro Viewport. `prefers-reduced-motion` überall. `IntersectionObserver` für Scroll-Reveals. Static export, Bilder unoptimized (GH-Pages).

## 6. Phasen

P0 Shared (Header/Footer/Layout/JSON-LD) · P1 Home · P2 /webseiten · P3 /ki-sichtbarkeit · P4 /arbeiten · P5 /ueber-uns · P6 /kontakt + Legal · P7 Build + QA + Self-Review.

## 7. Offen / Slots

- KI-Sichtbarkeit-Fakten von Zakir gegenprüfen.
- `hallo@sunbyte.at` MX prüfen (sonst funktioniert die Mail nicht). Zweitadresse: zakir.daryabi@sunbyte.at.
- Gewerbeschein/UID nach Anmeldung.
- kfz22-Screenshot, später echte Bilder.
