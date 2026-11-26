/**
 * SystemStack — Schaubild: So ist das KI-Betriebssystem aufgebaut.
 *
 * Vier Ebenen von oben nach unten: Sie (Kontrolle) → Denksystem → KI-Agenten →
 * Bibliothek von Funktionen. Alle Aussagen stammen aus Zakirs Text vom
 * 26.11.2026; das Bild ordnet sie nur. Bewegung kommt aus CSS (globals.css,
 * .stack-*) und ist bei „weniger Bewegung" aus. Rein dekorative Teile sind
 * aria-hidden, die Texte der vier Ebenen bleiben normal lesbar.
 */

const AGENTEN = ['Kunden', 'Anfragen', 'Werbung', 'Konkurrenz', 'Aufgaben']

export default function SystemStack() {
    return (
        <div className="stack">
            <span className="stack-linie" aria-hidden>
                <span className="stack-puls" />
            </span>

            <div className="stack-ebene">
                <span className="mono-label text-spark">01 · sie</span>
                <p className="stack-titel">Sie behalten die Kontrolle</p>
                <p className="stack-text">auch unterwegs, vom Handy</p>
            </div>

            <div className="stack-ebene stack-ebene--kern">
                <span className="mono-label text-spark">02 · denksystem</span>
                <p className="stack-titel">Kennt Ihren Betrieb</p>
                <p className="stack-text">Kunden, Mitarbeiter, Abläufe. Einmal erklärt, nie vergessen.</p>
            </div>

            <div className="stack-ebene">
                <span className="mono-label text-spark">03 · ki-agenten</span>
                <p className="stack-titel">Arbeiten Tag &amp; Nacht</p>
                <ul className="stack-chips" aria-hidden>
                    {AGENTEN.map(a => (
                        <li key={a}>
                            <span className="stack-punkt" />
                            {a}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="stack-ebene">
                <span className="mono-label text-spark">04 · bibliothek</span>
                <p className="stack-titel">Funktionen, die mitwachsen</p>
                <div className="stack-zellen" aria-hidden>
                    {Array.from({ length: 32 }).map((_, i) => (
                        <span key={i} style={{ animationDelay: `${(i * 0.37) % 6}s` }} />
                    ))}
                </div>
            </div>
        </div>
    )
}
