/**
 * Regal — Schaubild auf /partner (Abschnitt „Ihre Stärke").
 *
 * Zakir, 27.11.2026: „Diesen Teil kann man anders bauen, wie ein
 * Sicherheitsregal oder etwas anderes. Agenturen bringen kleine Sachen hier
 * und bekommen das gesamte System, das sollte gezeigt werden."
 *
 * Aussage des Bildes: Ein Baustein hinein, das ganze System heraus.
 *   links  — Agenturen legen je EINEN kleinen Baustein ins Regal
 *   Mitte  — das Regal: Funktionen von Sunbyte und von Agenturen, ein Fach
 *            für „Ihren Baustein", ein freies Fach; umrahmt von der
 *            Schutzschicht aus dem Schaubild der Startseite
 *   rechts — jede Agentur bekommt das ganze Regal
 * Auf dem Weg hinein läuft ein kleines Quadrat, auf dem Weg heraus ein großes
 * Raster: klein hinein, groß heraus.
 *
 * Die Fächer sind Beispiele: die sechs Module von Sunbyte (lib/kios.ts) und
 * vier allgemeine Schwerpunkte von Agenturen. Keine Partnerliste, keine Zusage.
 * Server-Komponente; Bewegung nur über CSS (.regal-*), bei „weniger Bewegung" aus.
 */

const VON_SUNBYTE = [
    'Neukunden',
    'Anfragen',
    'Werbung',
    'Konkurrenz',
    'Aufgaben',
    'Ausbau',
]
const VON_AGENTUREN = ['Recruiting', 'Video', 'Anzeigen', 'Social Media']

const GEBER = [
    { wer: 'Agentur A', was: 'Recruiting' },
    { wer: 'Agentur B', was: 'Video' },
    { wer: 'Ihre Agentur', was: 'Ihre Stärke', sie: true },
]

export default function Regal() {
    return (
        <div>
            <div className="regal" aria-hidden>
                {/* links: jede Agentur bringt einen Baustein */}
                <div className="regal-seite">
                    <p className="mono-label text-muted">agenturen bringen</p>
                    <ul className="regal-geber">
                        {GEBER.map(g => (
                            <li key={g.wer} className={g.sie ? 'ist-sie' : ''}>
                                <span className="regal-stein" />
                                <span>
                                    <strong>{g.wer}</strong>
                                    <small>{g.was}</small>
                                </span>
                            </li>
                        ))}
                    </ul>
                    <p className="regal-notiz">je einen Baustein</p>
                </div>

                <div className="regal-weg">
                    <span className="regal-weg__stueck" />
                    <span className="regal-weg__stueck" />
                    <span className="regal-weg__stueck" />
                </div>

                {/* Mitte: das Regal */}
                <div className="regal-schrank">
                    <p className="mono-label text-spark">
                        das regal · alle funktionen
                    </p>
                    <ul className="regal-faecher">
                        {VON_SUNBYTE.map(n => (
                            <li key={n}>{n}</li>
                        ))}
                        {VON_AGENTUREN.map(n => (
                            <li key={n} className="von-agentur">
                                {n}
                            </li>
                        ))}
                        <li className="ist-neu">Ihr Baustein</li>
                        <li className="ist-frei">+</li>
                    </ul>
                    <div className="regal-legende">
                        <span>
                            <i /> von Sunbyte
                        </span>
                        <span>
                            <i className="von-agentur" /> von Agenturen
                        </span>
                    </div>
                    <p className="regal-schutz">
                        sicherheit · prüfung · datenschutz
                    </p>
                </div>

                <div className="regal-weg regal-weg--gross">
                    <span className="regal-weg__stueck">
                        {Array.from({ length: 9 }).map((_, i) => (
                            <i key={i} />
                        ))}
                    </span>
                </div>

                {/* rechts: jede Agentur bekommt alles */}
                <div className="regal-seite">
                    <p className="mono-label text-muted">
                        jede agentur bekommt
                    </p>
                    <div className="regal-alles">
                        <span className="regal-alles__raster">
                            {Array.from({ length: 12 }).map((_, i) => (
                                <i key={i} />
                            ))}
                        </span>
                        <strong>Das ganze System</strong>
                        <span>alle Funktionen im Regal</span>
                    </div>
                </div>
            </div>

            <p className="sr-only">
                Schaubild: Jede Agentur legt einen Baustein in ein gemeinsames
                Regal, zum Beispiel Recruiting oder Video. Im Regal stehen die
                Funktionen von Sunbyte (Neukunden, Anfragen, Werbung,
                Konkurrenz, Aufgaben, Ausbau) und die Bausteine der Agenturen.
                Das Regal ist von Sicherheit, Prüfung und Datenschutz umgeben.
                Jede Agentur bekommt dafür das ganze System mit allen
                Funktionen.
            </p>
        </div>
    )
}
