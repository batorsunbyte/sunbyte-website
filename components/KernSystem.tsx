'use client'

import { useEffect, useRef, useState } from 'react'
import KiosIcon from '@/components/KiosIcon'
import { FUNKTIONEN, AGENT_AUFGABEN, ZUGRIFF_BEISPIEL } from '@/lib/kios'

/**
 * KernSystem — Schaubild des KI-Betriebssystems (Zakir, 26.11.2026).
 *
 * Aufbau von innen nach außen, nach Zakirs Skizzen:
 *  - Kern: das Denksystem als Gehirn.
 *  - Schutzschicht um den Kern: Sicherheit, Prüfung, Datenschutz.
 *  - Sechs Module, jedes mit seinen spezialisierten Agenten (kleine Figuren).
 *  - Links ein Plus mit Linie zum Kern: Es können weitere Module dazukommen.
 *  - Rechts Laptop und Handy: der Zugriff des Chefs, mit Linie zum Kern.
 * Der frühere Kreis durch die Module ist auf Zakirs Wunsch entfernt.
 *
 * Das Schaubild zeigt das System bei der Arbeit: Es fährt hoch, wenn es ins
 * Bild kommt; Lichtpunkte laufen auf den Linien; der Lauf erzählt eine Nacht
 * in gekennzeichneten Beispielen (lib/kios.ts → beispiel). Alle vier Sekunden
 * wandert die Auswahl weiter, ein Klick hält den Lauf an. Bei „weniger
 * Bewegung" läuft nichts von selbst. Ohne JavaScript ist alles sichtbar.
 *
 * Fünfte Stufe: Wer auf eine Agenten-Figur zeigt (oder sie antippt), sieht
 * eine kurze Liste, was dieser Agent tut. Und der Lauf hat einen siebten
 * Schritt „Ihr Zugriff": ein Beispiel-Austausch zwischen Handy und Denksystem.
 *
 * Die Module sitzen bei −90°, −30°, 30° … Damit bleiben die Waagrechten frei:
 * links für das Plus, rechts für die Linie zu Laptop und Handy. Die
 * Zeichenfläche ist deshalb 118 Einheiten breit und 100 hoch.
 */

const DAUER = 4000
/** Der Schritt „Ihr Zugriff" braucht länger: Man liest zwei Nachrichten */
const DAUER_ZUGRIFF = 7500
const R_MODUL = 30 // in Einheiten der Zeichenfläche (100 breit)
const R_AGENT = 46
/** Breite der Zeichenfläche: 100 für das System, 18 rechts für Laptop und Handy */
const BREITE = 118

const rad = (grad: number) => (grad * Math.PI) / 180
const punkt = (grad: number, r: number) => ({
    x: +(50 + r * Math.cos(rad(grad))).toFixed(2),
    y: +(50 + r * Math.sin(rad(grad))).toFixed(2),
})
/** x der Zeichenfläche → left in Prozent der Bühne (y ist schon Prozent) */
const links = (x: number) => `${((x / BREITE) * 100).toFixed(2)}%`
const top = (y: number) => `${y}%`

/** Fächer der Agenten um die Richtung des Moduls, in Grad */
const FAECHER: Record<number, number[]> = {
    1: [0],
    2: [-19, 19],
    3: [-20, 0, 20],
}

/** Auf welcher Seite der Figur der Name steht */
function seite(grad: number): 'r' | 'l' | 'o' | 'u' {
    const c = Math.cos(rad(grad))
    if (c > 0.25) return 'r'
    if (c < -0.25) return 'l'
    return Math.sin(rad(grad)) < 0 ? 'o' : 'u'
}

const MODULE = FUNKTIONEN.map((f, i) => {
    const grad = -90 + i * 60
    const faecher = FAECHER[f.agenten.length] ?? FAECHER[3]
    return {
        ...f,
        ort: punkt(grad, R_MODUL),
        /** Name über dem Knoten, wenn das Modul in der oberen Hälfte sitzt */
        nameOben: Math.sin(rad(grad)) < -0.1,
        aeste: f.agenten.map((name, k) => {
            const g = grad + faecher[k % faecher.length]
            return { name, ort: punkt(g, R_AGENT), seite: seite(g) }
        }),
    }
})

const PLUS = punkt(180, R_MODUL)
/** Wo die Linie vom Kern bei Laptop und Handy ankommt */
const ZUGRIFF = { x: 99.4, y: 50.6 }
const SCHUTZ = ['Sicherheit', 'Prüfung', 'Datenschutz']

/** Schritt nach den sechs Modulen: der Zugriff über Handy und Laptop */
const ZUGRIFF_NR = MODULE.length
const SCHRITTE = MODULE.length + 1

/** Alle Agenten in einer Liste, für die Zeige-Flächen und die Aufgabenliste */
const AGENTEN = MODULE.flatMap((m, modulNr) =>
    m.aeste.map(a => ({ ...a, modulNr })),
)

type Phase = 'ruhe' | 'vor' | 'wach'

/** Ein Lichtpunkt, der einen Pfad entlangläuft */
function Licht({
    pfad,
    dauer,
    start = 0,
    hell = false,
}: {
    pfad: string
    dauer: number
    start?: number
    hell?: boolean
}) {
    return (
        <g className={hell ? 'kern-licht kern-licht--hell' : 'kern-licht'}>
            <circle r={hell ? 2.4 : 1.7} className="kern-licht__schein" />
            <circle r={hell ? 0.95 : 0.7} className="kern-licht__kern" />
            <animateMotion
                path={pfad}
                dur={`${dauer}s`}
                begin={`${start}s`}
                repeatCount="indefinite"
            />
            <animate
                attributeName="opacity"
                values="0;1;1;0"
                keyTimes="0;0.12;0.85;1"
                dur={`${dauer}s`}
                begin={`${start}s`}
                repeatCount="indefinite"
            />
        </g>
    )
}

/** Ein Agent als kleine Figur: Kopf mit Antenne und zwei Augen */
function Agent({ x, y }: { x: number; y: number }) {
    return (
        <g className="kern-bot" transform={`translate(${x} ${y})`}>
            <line x1="0" y1="-2.9" x2="0" y2="-1.9" className="kern-bot__strich" />
            <circle cx="0" cy="-3.2" r="0.42" className="kern-bot__licht" />
            <rect x="-2.3" y="-1.9" width="4.6" height="3.9" rx="1.15" className="kern-bot__kopf" />
            <circle cx="-0.95" cy="-0.15" r="0.5" className="kern-bot__auge" />
            <circle cx="0.95" cy="-0.15" r="0.5" className="kern-bot__auge" />
            <line x1="-0.8" y1="1.05" x2="0.8" y2="1.05" className="kern-bot__strich" />
        </g>
    )
}

/** Gehirn als Strichzeichnung (Form nach dem Lucide-Icon „brain", ISC-Lizenz) */
const HIRN = [
    'M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z',
    'M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z',
    'M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4',
    'M17.599 6.5a3 3 0 0 0 .399-1.375',
    'M6.003 5.125A3 3 0 0 0 6.401 6.5',
    'M3.477 10.896a4 4 0 0 1 .585-.396',
    'M19.938 10.5a4 4 0 0 1 .585.396',
    'M6 18a4 4 0 0 1-1.967-.516',
    'M19.967 17.484A4 4 0 0 1 18 18',
]

export default function KernSystem() {
    const [aktiv, setAktiv] = useState(0)
    const [sichtbar, setSichtbar] = useState(false)
    const [angehalten, setAngehalten] = useState(false)
    const [bewegung, setBewegung] = useState(false)
    const [phase, setPhase] = useState<Phase>('ruhe')
    /** Name des Agenten, dessen Aufgabenliste gerade offen ist */
    const [tipp, setTipp] = useState<string | null>(null)
    /** Klick-Hinweis an Laptop und Handy: weg, sobald jemand sie anklickt */
    const [hinweis, setHinweis] = useState(true)
    const buehne = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const el = buehne.current
        if (!el || !('IntersectionObserver' in window)) return
        const darf = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
        setBewegung(darf)
        // Hochfahren nur, wenn das Schaubild noch unter dem Bildrand liegt
        if (darf && el.getBoundingClientRect().top > window.innerHeight * 0.85) {
            setPhase('vor')
        }
        const io = new IntersectionObserver(
            ([e]) => {
                setSichtbar(e.isIntersecting)
                if (e.isIntersecting) setPhase(p => (p === 'vor' ? 'wach' : p))
            },
            { threshold: 0.3 },
        )
        io.observe(el)
        return () => io.disconnect()
    }, [])

    // Der Film: Schritt für Schritt weiter; hält an, solange eine Liste offen ist
    useEffect(() => {
        if (!sichtbar || angehalten || !bewegung || tipp) return
        const t = window.setTimeout(
            () => setAktiv(a => (a + 1) % SCHRITTE),
            aktiv === ZUGRIFF_NR ? DAUER_ZUGRIFF : DAUER,
        )
        return () => window.clearTimeout(t)
    }, [sichtbar, angehalten, bewegung, aktiv, tipp])

    const waehle = (i: number) => {
        setAngehalten(true)
        setAktiv(i)
    }

    const zugriffAn = aktiv === ZUGRIFF_NR
    const modul = zugriffAn ? null : MODULE[aktiv]
    const filmt = sichtbar && !angehalten && bewegung && !tipp
    const gezeigt = tipp ? AGENTEN.find(a => a.name === tipp) : undefined
    const lichter = sichtbar && bewegung

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* ── Bühne ─────────────────────────────────── */}
            <div className="lg:col-span-7">
                <div ref={buehne} className="kern-buehne" data-phase={phase}>
                    <svg
                        className="kern-linien"
                        viewBox={`0 0 ${BREITE} 100`}
                        aria-hidden
                    >
                        {/* Zugriff: Linie vom Kern nach rechts zu Laptop und Handy */}
                        <g className={zugriffAn ? 'kern-zugriff ist-aktiv' : 'kern-zugriff'}>
                            <path
                                className="kern-zugriff__linie"
                                d={`M50 50 L${ZUGRIFF.x} ${ZUGRIFF.y}`}
                            />
                            {/* Laptop */}
                            <rect x="101.2" y="45.2" width="8.4" height="5.7" rx="0.6" className="kern-geraet" />
                            <path d="M99.8 52.1h11.2" className="kern-geraet" />
                            <path d="M102.9 47h3.2M102.9 48.3h5M102.9 49.6h2.2" className="kern-geraet__inhalt" />
                            {/* Handy */}
                            <rect x="112.7" y="44.4" width="4.2" height="8.4" rx="0.9" className="kern-geraet" />
                            <path d="M113.9 46.4h1.8M113.9 47.8h1.8M113.9 49.2h1.1" className="kern-geraet__inhalt" />
                        </g>

                        {/* Linie vom Plus zum Kern */}
                        <line
                            className="kern-linie kern-linie--plus"
                            x1="50"
                            y1="50"
                            x2={PLUS.x}
                            y2={PLUS.y}
                        />

                        {MODULE.map((m, i) => (
                            <g
                                key={m.modul}
                                className={i === aktiv ? 'ist-aktiv' : undefined}
                            >
                                <line
                                    className="kern-linie"
                                    x1="50"
                                    y1="50"
                                    x2={m.ort.x}
                                    y2={m.ort.y}
                                />
                                {m.aeste.map(a => (
                                    <g key={a.name}>
                                        <line
                                            className="kern-ast"
                                            x1={m.ort.x}
                                            y1={m.ort.y}
                                            x2={a.ort.x}
                                            y2={a.ort.y}
                                        />
                                        <Agent x={a.ort.x} y={a.ort.y} />
                                    </g>
                                ))}
                            </g>
                        ))}

                        {/* Schutzschicht um den Kern */}
                        <g className="kern-schutz">
                            <circle cx="50" cy="50" r="19" className="kern-schutz__band" />
                            <circle cx="50" cy="50" r="16.6" className="kern-schutz__rand" />
                            <circle cx="50" cy="50" r="21.4" className="kern-schutz__rand" />
                            <g className="kern-schutz__schrift">
                                <path
                                    id="kern-schutz-bahn"
                                    d="M50 31.9a18.1 18.1 0 1 1-0.01 0"
                                    fill="none"
                                />
                                {SCHUTZ.map((wort, i) => (
                                    <text key={wort} className="kern-schutz__wort">
                                        <textPath
                                            href="#kern-schutz-bahn"
                                            startOffset={`${16.67 + i * 33.33}%`}
                                            textAnchor="middle"
                                        >
                                            {wort.toLowerCase()}
                                        </textPath>
                                    </text>
                                ))}
                                {[0, 1, 2].map(i => (
                                    <text key={i} className="kern-schutz__punkt">
                                        <textPath
                                            href="#kern-schutz-bahn"
                                            startOffset={`${i * 33.33 + 0.4}%`}
                                            textAnchor="middle"
                                        >
                                            ◆
                                        </textPath>
                                    </text>
                                ))}
                            </g>
                        </g>

                        {/* Lichtpunkte: ruhig zu allen Modulen und vom Zugriff zum Kern … */}
                        {lichter && (
                            <>
                                {MODULE.map((m, i) => (
                                    <Licht
                                        key={`ruhe-${m.modul}`}
                                        pfad={`M50 50 L${m.ort.x} ${m.ort.y}`}
                                        dauer={3.2}
                                        start={i * 0.53}
                                    />
                                ))}
                                <Licht
                                    hell
                                    pfad={`M${ZUGRIFF.x} ${ZUGRIFF.y} L50 50`}
                                    dauer={2.6}
                                />
                                <Licht
                                    pfad={`M50 50 L${ZUGRIFF.x} ${ZUGRIFF.y}`}
                                    dauer={2.6}
                                    start={1.3}
                                />
                            </>
                        )}

                        {/* … und hell beim gewählten Modul: hinaus zu den Agenten, zurück zum Kern */}
                        {lichter && modul && (
                            <g key={`hell-${aktiv}`}>
                                {modul.aeste.map((a, k) => (
                                    <g key={a.name}>
                                        <Licht
                                            hell
                                            pfad={`M50 50 L${modul.ort.x} ${modul.ort.y} L${a.ort.x} ${a.ort.y}`}
                                            dauer={1.8}
                                            start={k * 0.3}
                                        />
                                        <Licht
                                            hell
                                            pfad={`M${a.ort.x} ${a.ort.y} L${modul.ort.x} ${modul.ort.y} L50 50`}
                                            dauer={1.8}
                                            start={0.9 + k * 0.3}
                                        />
                                    </g>
                                ))}
                            </g>
                        )}

                        {/* Schritt „Ihr Zugriff": dichter Verkehr zwischen Geräten und Kern */}
                        {lichter && zugriffAn && (
                            <g>
                                {[0, 0.5, 1].map(start => (
                                    <g key={start}>
                                        <Licht
                                            hell
                                            pfad={`M${ZUGRIFF.x} ${ZUGRIFF.y} L50 50`}
                                            dauer={1.5}
                                            start={start}
                                        />
                                        <Licht
                                            hell
                                            pfad={`M50 50 L${ZUGRIFF.x} ${ZUGRIFF.y}`}
                                            dauer={1.5}
                                            start={start + 0.25}
                                        />
                                    </g>
                                ))}
                            </g>
                        )}
                    </svg>


                    {/* Kern: das Denksystem als Gehirn */}
                    <div className="kern-mitte" aria-hidden style={{ left: links(50) }}>
                        <span className="kern-mitte__halo" />
                        <span className="kern-mitte__glanz" />
                        <svg className="kern-hirn" viewBox="0 0 24 24" fill="none">
                            {HIRN.map(d => (
                                <path key={d} d={d} className="kern-hirn__strich" />
                            ))}
                            {HIRN.slice(0, 3).map(d => (
                                <path key={`s-${d}`} d={d} className="kern-hirn__signal" />
                            ))}
                        </svg>
                        <span className="kern-mitte__titel">Denksystem</span>
                    </div>

                    {/* Module */}
                    {MODULE.map((m, i) => {
                        const an = i === aktiv
                        return (
                            <button
                                key={m.modul}
                                type="button"
                                aria-pressed={an}
                                aria-controls="kern-feld"
                                onClick={() => waehle(i)}
                                onFocus={() => setAngehalten(true)}
                                className={`kern-knoten${an ? ' ist-aktiv' : ''}`}
                                style={{
                                    left: links(m.ort.x),
                                    top: top(m.ort.y),
                                    animationDelay: `${450 + i * 110}ms`,
                                }}
                            >
                                <KiosIcon
                                    name={m.icon}
                                    size={26}
                                    farbe={an ? 'var(--bg)' : 'var(--spark)'}
                                />
                                <span
                                    className={`kern-knoten__name${m.nameOben ? ' kern-knoten__name--oben' : ''}`}
                                >
                                    {m.modul}
                                </span>
                            </button>
                        )
                    })}

                    {/* Namen der Agenten am gewählten Modul (ab 1280 px, sonst im Feld) */}
                    <div key={aktiv} aria-hidden>
                        {modul?.aeste.map((a, k) => (
                            <span
                                key={a.name}
                                className="kern-agent"
                                data-seite={a.seite}
                                style={{
                                    left: links(a.ort.x),
                                    top: top(a.ort.y),
                                    animationDelay: `${120 + k * 90}ms`,
                                }}
                            >
                                {a.name}
                            </span>
                        ))}
                    </div>

                    {/* Zeige-Flächen über den Agenten-Figuren: öffnen die Aufgabenliste */}
                    {AGENTEN.map(a => (
                        <button
                            key={a.name}
                            type="button"
                            className="kern-agentknopf"
                            aria-label={`${a.name}: zeigen, was er tut`}
                            aria-describedby={tipp === a.name ? 'kern-tipp' : undefined}
                            style={{ left: links(a.ort.x), top: top(a.ort.y) }}
                            onMouseEnter={() => setTipp(a.name)}
                            onMouseLeave={() => setTipp(null)}
                            onFocus={() => setTipp(a.name)}
                            onBlur={() => setTipp(null)}
                            onClick={() => {
                                waehle(a.modulNr)
                                setTipp(a.name)
                            }}
                        />
                    ))}

                    {/* Aufgabenliste des gezeigten Agenten. Lage: bei Agenten oben und unten
                        seitlich nach außen, sonst seitlich zur Mitte und senkrecht vom
                        Kern weg — so bleiben Gehirn und eigenes Modul frei. Die Grenzen
                        der Bühne hält globals.css ein (clamp über --x und --y). */}
                    {gezeigt && (
                        <div
                            id="kern-tipp"
                            role="tooltip"
                            className="kern-tipp"
                            data-h={
                                Math.abs(gezeigt.ort.x - 50) < 20
                                    ? gezeigt.ort.x < 50 ? 'l' : 'r'
                                    : gezeigt.ort.x > 50 ? 'l' : 'r'
                            }
                            data-v={
                                Math.abs(gezeigt.ort.x - 50) < 20
                                    ? gezeigt.ort.y < 50 ? 'u' : 'o'
                                    : gezeigt.ort.y < 50 ? 'o' : 'u'
                            }
                            style={
                                {
                                    '--x': links(gezeigt.ort.x),
                                    '--y': top(gezeigt.ort.y),
                                } as React.CSSProperties
                            }
                        >
                            <p className="kern-tipp__kopf">
                                <span>{gezeigt.name}</span>
                                <span>beispiel</span>
                            </p>
                            <ul>
                                {(AGENT_AUFGABEN[gezeigt.name] ?? []).map(t => (
                                    <li key={t}>{t}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Fläche über Laptop und Handy: wählt den Schritt „Ihr Zugriff" */}
                    <button
                        type="button"
                        className="kern-geraeteknopf"
                        aria-pressed={zugriffAn}
                        aria-controls="kern-feld"
                        aria-label="Ihr Zugriff über Handy und Laptop"
                        style={{ left: links(109.1), top: top(49.4) }}
                        onClick={() => {
                            setHinweis(false)
                            waehle(ZUGRIFF_NR)
                        }}
                        onFocus={() => setAngehalten(true)}
                    >
                        {/* Klick-Zeichen (Zakir, 26.11.2026: damit die Leute darauf klicken) */}
                        {hinweis && (
                            <span className="kern-hinweis" aria-hidden>
                                <span className="kern-hinweis__ring" />
                                <svg
                                    className="kern-hinweis__hand"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path d="M9 9l5 12 1.8-5.2L21 14z" />
                                    <path d="M7.2 2.2l.8 2.9M2.2 7.2l2.9.8M5.1 13.9l-2.1 2.1M13.9 5.1l2.1-2.1" />
                                </svg>
                                <span className="kern-hinweis__text">klicken</span>
                            </span>
                        )}
                    </button>

                    {/* Plus: Es können weitere Module dazukommen */}
                    <span
                        className="kern-plus"
                        aria-hidden
                        style={{ left: links(PLUS.x), top: top(PLUS.y) }}
                    >
                        +
                        <span className="kern-plus__name">weitere module</span>
                    </span>
                </div>
            </div>

            {/* ── Feld zum gewählten Modul ──────────────── */}
            <div className="lg:col-span-5">
                <div id="kern-feld" className="kern-feld" aria-live="polite">
                    {modul ? (
                        <div key={aktiv} className="kern-wechsel">
                            <p className="mono-label text-spark">
                                modul {String(aktiv + 1).padStart(2, '0')} ·{' '}
                                {modul.modul}
                            </p>
                            <p className="kern-feld__satz">{modul.text}</p>

                            <p className="mono-label text-muted mt-7 mb-3">
                                spezialisierte agenten
                            </p>
                            <ul className="kern-agenten">
                                {modul.agenten.map(a => (
                                    <li key={a}>
                                        <span className="kern-agenten__punkt" />
                                        {a}
                                    </li>
                                ))}
                            </ul>

                            {/* Die Nacht in Beispielen: Uhrzeit groß, ein Satz dazu */}
                            <div className="kern-beispiel">
                                <span className="kern-beispiel__zeit">
                                    {modul.beispiel.zeit}
                                </span>
                                <p>
                                    <span className="mono-label text-muted">
                                        beispiel
                                    </span>
                                    {modul.beispiel.text}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div key="zugriff" className="kern-wechsel">
                            <p className="mono-label text-spark">
                                ihr zugriff · handy und laptop
                            </p>
                            <p className="kern-feld__satz">
                                Sie bleiben der Chef und haben die volle
                                Kontrolle
                            </p>

                            <p className="mono-label text-muted mt-7 mb-3">
                                beispiel · sie schreiben vom handy
                            </p>
                            <div className="kern-chat">
                                <p className="kern-chat__zeile kern-chat__zeile--sie">
                                    <span className="kern-chat__wer">sie</span>
                                    {ZUGRIFF_BEISPIEL.sie}
                                </p>
                                <p className="kern-chat__zeile kern-chat__zeile--system">
                                    <span className="kern-chat__wer">
                                        ihr denksystem
                                    </span>
                                    {ZUGRIFF_BEISPIEL.system}
                                </p>
                                <p className="kern-chat__wahl" aria-hidden>
                                    {ZUGRIFF_BEISPIEL.wahl.map(w => (
                                        <span key={w}>{w}</span>
                                    ))}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Lauf-Anzeige: füllt sich, bis das nächste Modul kommt */}
                    <div className="kern-lauf" aria-hidden>
                        {filmt && (
                            <span
                                key={aktiv}
                                className="kern-lauf__balken"
                                style={{
                                    animationDuration: `${zugriffAn ? DAUER_ZUGRIFF : DAUER}ms`,
                                }}
                            />
                        )}
                    </div>
                </div>

                <ul className="kern-legende">
                    <li>
                        <strong>Kern:</strong> Ihr Denksystem. Alle Module
                        greifen darauf zu.
                    </li>
                    <li>
                        <strong>Schutzschicht:</strong> Sicherheit, Prüfung und
                        Datenschutz liegen um den Kern.
                    </li>
                    <li>
                        <strong>Ihr Zugriff:</strong> Sie steuern vom Handy und
                        vom Laptop.
                    </li>
                </ul>
            </div>
        </div>
    )
}
