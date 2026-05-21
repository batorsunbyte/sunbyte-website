# Sunbyte Website — Änderungsrunde 1 (für Claude Code)

Seite ist **live** (sunbyte.at). Folgende Änderungen, priorisiert.

**Standing Rules wie immer:** plan vor code, phase-by-phase, nichts löschen ohne 3× fragen,
nur `transform`/`opacity` animieren, `prefers-reduced-motion` respektieren, auf echtem Handy
testen, Pushback erwünscht. Premium-Premium-Bar halten — das ist das Schaufenster der Agentur.

---

## A. Global zuerst: Theme & Navigation

### A1 — Persistente Navigation auf ALLEN Seiten *(Quick Win, zuerst)*
Aktuell verschwindet die Nav-Leiste auf Unterseiten (Impressum, Datenschutz) — nur ein kleiner
Zurück-Button bleibt. **Falsch.** Der Header/Nav (`Sunbyte · leistungen · cases · studio · kontakt`)
muss auf **jeder** Seite stehen, identisch.
- Über ein gemeinsames Layout (`app/layout.tsx` bzw. shared Header-Component) lösen.
- Nav-Links von Unterseiten zurück auf die Startseiten-Sektionen (`/#leistungen`, `/#cases`, …).
- Gilt auch für die neue FAQ-Seite (F1).

### A2 — Zwei vollwertige Modi: Tag & Nacht (beide Premium)
Hell- UND Dunkelmodus, **beide erstklassig** — kein „Light = ausgewaschenes Dark". Philosophie wie
Tag und Nacht: Die Nacht ist schön, weil sie dunkel ist (glühender Globe). Der Tag ist schön, weil
die Sonne scheint. Jeder Modus spielt seine **eigene** Stärke aus und wird eigenständig gestaltet —
was im Dunkeln wirkt, muss im Hellen anders gelöst sein und umgekehrt.
- **Light Mode = eigene Komposition, NICHT invertiert.** Hero/Globe für Tageslicht neu denken:
  heller, warmer Hintergrund; der Globe als sonnendurchflutete Welt (Kontrast/Tiefe/sanfter Schatten
  statt Glow); Korn dezent, Vignette aus. Genauso edel wie Dark — nur „Tag".
- Toggle im Header. Theme persistieren (echte Next.js-Site → `localStorage` + `prefers-color-scheme`
  als Initialwert).
- **Default = Light** (Zakirs Wunsch). Beide Modi müssen den Premium-Premium-Test bestehen.

---

## B. Hero (Startseite, oben)

### B1 — Globe kleiner
Der Globe nimmt zu viel Fläche, der Hero wirkt überladen. Globe ~20–30 % verkleinern, mehr Luft.

### B2 — Kontinent-Info neu positionieren
Beim Klick auf einen Kontinent erscheint die Info aktuell **links** — kollidiert mit der großen
Headline, Seite wirkt voll. **Info aus der linken Spalte rausnehmen.**
- Vorschlag: kompaktes Panel direkt **unter/neben dem Globe** (rechte Spalte) oder als dezente
  Karte beim Wien-Marker. Linke Spalte bleibt ruhig (nur Headline + Sub).
- Du darfst die sauberste Variante vorschlagen. Hauptziel: **weniger Dichte, kein Überladen.**

---

## C. Leistungen-Sektion ("Drei Stufen") — Premium-Bar halten
Der Einleitungstext („Drei Stufen. Du siehst den Unterschied." + Untertext) und der Rest der
Sektion wirken **nicht** Premium-Premium — eher generisch. Auf das Niveau des Hero heben:
Typo-Hierarchie, Abstände, Karten-Design, Mikro-Details. **frontend-design Skill lesen.**
Kein Template-Look. Das ist die Sektion, die den Tier-Unterschied verkauft — sie muss selbst
Premium-Premium *sein*.

---

## D. Cases-Sektion — Off-Brand-Look fixen
Die Cases/unteren Blöcke fühlen sich an „wie eine andere Seite / wie PrintMyWall", nicht wie ein
Premium-Web-Studio. Auf denselben editorialen Premium-Stil bringen wie Hero/Studio.

---

## E. Kontakt & Impressum

- **E1** — „Wien · Donaustadt" → **„Wien, Österreich"** (Kontakt-Sektion).
- **E2** — **Telefon + Anschrift = wie bei PrintMyWall** (gleiche Werte). Konsistent in Kontakt-Sektion
  *und* Impressum. Werte liefert Zakir bzw. aus dem PrintMyWall-Impressum übernehmen.
- **E3** — **Feinschliff** Kontakt/Impressum (dezenter/edler). Zakir schickt Screenshots mit
  konkreten Anmerkungen → **darauf warten**, bevor du E3 umsetzt.

---

## F. FAQ — eigene Seite

### F1 — `/faq` als eigene Seite (im Nav verlinkt)
**Empfehlung: NICHT auf die Startseite packen.** Die Startseite ist schon lang (viel Scrollen).
Eigene FAQ-Seite, gleicher Premium-Stil, persistente Nav (A1). Inhalte (Fragen + Antworten)
liefert Zakir.

---

## G. Ambition & Signature-Motion (Anspruch: Branchenbeste)
Ziel: die **beste** Seite ihrer Branche — eine Stufe über dem, was es schon gibt. Awwwards-Kaliber.
- **Benchmark, dann übertreffen:** orientier dich am Besten da draußen (Locomotive, Active Theory,
  Obys & Co.) — **ohne zu kopieren** — und leg eine Schippe drauf. Eigenständig, nicht abgeleitet.
- **Genau EIN starkes Signature-Moment, kein Effekt-Salat.** Der Globe ist das Herz. Dazu **ein**
  scroll-getriebener Erzähl-Moment, der die Story trägt — z.B. die **Gründer-Story (Studio), die
  beim Scrollen Zeile für Zeile / Element für Element auftaucht** und sich emotional aufbaut
  (Zakirs Beispiel). Premium heißt fokussiert, nicht überladen.
- **Perf bleibt heilig (kfz22-Punkt):** scroll-getriebene Effekte ausschließlich `transform`/`opacity`,
  IntersectionObserver, `prefers-reduced-motion`-Fallback, auf echtem Handy testen. Lieber ein
  makelloser Moment als fünf ruckelnde.
- **Plan vor code:** schlag Zakir 1–2 konkrete Signature-Ideen vor, **bevor** du baust.

## Zakir-Actions
- **Telefon + Anschrift** (wie PrintMyWall) liefern — oder Claude Code zeigen, wo in PrintMyWall.
- **Screenshots** mit Anmerkungen zu Kontakt/Impressum-Feinschliff (E3).
- **FAQ-Inhalte** (Fragen + Antworten) liefern (F1).
- Nach dem Bauen: **beide Modi prüfen (Tag & Nacht)** — beide auf Premium-Niveau? Feedback geben.
- Offen aus Runde 0: kfz22-Screenshot, Porträt-Foto, Gründer-Text verfeinern, Impressum-Daten
  (Gewerbeschein, UID) nach Gewerbeanmeldung.

---

## Hinweis: beide Modi gleichrangig
Light und Dark sind **gleich wichtig** und werden beide auf Premium-Premium-Niveau gebaut — nicht
ein Modus als Abklatsch des anderen (Tag/Nacht-Philosophie, siehe A2). Default = Light. Wenn ein
Element in einem Modus nicht funktioniert, wird es für diesen Modus **neu gestaltet**, nicht nur
umgefärbt.
