'use client'

import { useEffect, useRef, useState } from 'react'
import KiosIcon from '@/components/KiosIcon'
import { FUNKTIONEN } from '@/lib/kios'

/**
 * KernSystem — das Kernsystem in der Mitte, sechs Module rundherum, und von
 * jedem Modul verzweigen sich nach außen seine spezialisierten Agenten
 * (Zakir, 26.11.2026, samt seiner Skizze mit Ästen und Plus).
 *
 * Dritte Fassung (Zakir: „schaut gut aus, aber nicht dieser echte Wow-Effekt"):
 * Das Schaubild zeigt das System jetzt BEI DER ARBEIT.
 *  1. Es fährt hoch, wenn es ins Bild kommt: Kern, Ring, Module, Äste.
 *  2. Lichtpunkte laufen auf den Linien — vom Kern zu jedem Modul, beim
 *     gewählten Modul weiter bis zu den Agenten und wieder zurück.
 *  3. Der Lauf erzählt eine Nacht: Zu jedem Modul steht ein Beispiel mit
 *     Uhrzeit (22:40 bis 09:20). Die Beispiele sind erfunden und so
 *     gekennzeichnet (lib/kios.ts → beispiel).
 *
 * Alle vier Sekunden wandert die Auswahl weiter; ein Klick hält den Lauf an.
 * Bei „weniger Bewegung" läuft nichts von selbst und es gibt keine Lichtpunkte.
 * Ohne JavaScript ist alles sichtbar. Die Knoten sind echte Knöpfe.
 */

const DAUER = 4000
const R_MODUL = 30 // Prozent der Bühne
const R_AGENT = 46

const rad = (grad: number) => (grad * Math.PI) / 180
const punkt = (grad: number, r: number) => ({
    x: +(50 + r * Math.cos(rad(grad))).toFixed(2),
    y: +(50 + r * Math.sin(rad(grad))).toFixed(2),
})

/** Fächer der Agenten um die Richtung des Moduls, in Grad */
const FAECHER: Record<number, number[]> = {
    1: [0],
    2: [-15, 15],
    3: [-20, 0, 20],
}

/** Auf welcher Seite des Punkts der Name steht */
function seite(grad: number): 'r' | 'l' | 'o' | 'u' {
    const c = Math.cos(rad(grad))
    if (c > 0.25) return 'r'
    if (c < -0.25) return 'l'
    return Math.sin(rad(grad)) < 0 ? 'o' : 'u'
}

/** Module: oben beginnen, im Uhrzeigersinn. Jedes mit seinen Ästen. */
const MODULE = FUNKTIONEN.map((f, i) => {
    const grad = -90 + i * 60
    const faecher = FAECHER[f.agenten.length] ?? FAECHER[3]
    return {
        ...f,
        ort: punkt(grad, R_MODUL),
        aeste: f.agenten.map((name, k) => {
            const g = grad + faecher[k % faecher.length]
            return { name, ort: punkt(g, R_AGENT), seite: seite(g) }
        }),
    }
})

/** Das Plus sitzt links zwischen „Ausbau" und „Aufgaben" */
const PLUS = punkt(180, R_MODUL)

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

export default function KernSystem() {
    const [aktiv, setAktiv] = useState(0)
    const [sichtbar, setSichtbar] = useState(false)
    const [angehalten, setAngehalten] = useState(false)
    const [bewegung, setBewegung] = useState(false)
    const [phase, setPhase] = useState<Phase>('ruhe')
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

    // Der Film: alle vier Sekunden ein Modul weiter
    useEffect(() => {
        if (!sichtbar || angehalten || !bewegung) return
        const t = window.setInterval(
            () => setAktiv(a => (a + 1) % MODULE.length),
            DAUER,
        )
        return () => window.clearInterval(t)
    }, [sichtbar, angehalten, bewegung])

    const waehle = (i: number) => {
        setAngehalten(true)
        setAktiv(i)
    }

    const modul = MODULE[aktiv]
    const filmt = sichtbar && !angehalten && bewegung
    const lichter = sichtbar && bewegung

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* ── Bühne ─────────────────────────────────── */}
            <div className="lg:col-span-7">
                <div ref={buehne} className="kern-buehne" data-phase={phase}>
                    <svg
                        className="kern-linien"
                        viewBox="0 0 100 100"
                        aria-hidden
                    >
                        <circle
                            className="kern-ring"
                            cx="50"
                            cy="50"
                            r={R_MODUL}
                        />
                        {/* Zwei Ringe um den Kern, gegenläufig */}
                        <circle className="kern-kranz kern-kranz--a" cx="50" cy="50" r="17.6" />
                        <circle className="kern-kranz kern-kranz--b" cx="50" cy="50" r="20.4" />

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
                                        <circle
                                            className="kern-blatt"
                                            cx={a.ort.x}
                                            cy={a.ort.y}
                                            r="1.05"
                                        />
                                    </g>
                                ))}
                            </g>
                        ))}

                        {/* Lichtpunkte: ruhig zu allen Modulen … */}
                        {lichter &&
                            MODULE.map((m, i) => (
                                <Licht
                                    key={`ruhe-${m.modul}`}
                                    pfad={`M50 50 L${m.ort.x} ${m.ort.y}`}
                                    dauer={3.2}
                                    start={i * 0.53}
                                />
                            ))}

                        {/* … und hell beim gewählten Modul: hinaus zu den Agenten, zurück zum Kern */}
                        {lichter && (
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
                    </svg>

                    {/* Kern */}
                    <div className="kern-mitte" aria-hidden>
                        <span className="kern-mitte__halo" />
                        <span className="kern-mitte__glanz" />
                        <span className="mono-label kern-mitte__label">
                            kernsystem
                        </span>
                        <span className="kern-mitte__titel">Ihr Denksystem</span>
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
                                    left: `${m.ort.x}%`,
                                    top: `${m.ort.y}%`,
                                    animationDelay: `${450 + i * 110}ms`,
                                }}
                            >
                                <KiosIcon
                                    name={m.icon}
                                    size={26}
                                    farbe={an ? 'var(--bg)' : 'var(--spark)'}
                                />
                                <span className="kern-knoten__name">
                                    {m.modul}
                                </span>
                            </button>
                        )
                    })}

                    {/* Namen der Agenten am gewählten Modul (ab 1280 px, sonst im Feld) */}
                    <div key={aktiv} aria-hidden>
                        {modul.aeste.map((a, k) => (
                            <span
                                key={a.name}
                                className="kern-agent"
                                data-seite={a.seite}
                                style={{
                                    left: `${a.ort.x}%`,
                                    top: `${a.ort.y}%`,
                                    animationDelay: `${120 + k * 90}ms`,
                                }}
                            >
                                {a.name}
                            </span>
                        ))}
                    </div>

                    {/* Plus: Es können weitere Module dazukommen */}
                    <span
                        className="kern-plus"
                        aria-hidden
                        style={{ left: `${PLUS.x}%`, top: `${PLUS.y}%` }}
                    >
                        +
                        <span className="kern-plus__name">weitere module</span>
                    </span>
                </div>
            </div>

            {/* ── Feld zum gewählten Modul ──────────────── */}
            <div className="lg:col-span-5">
                <div id="kern-feld" className="kern-feld" aria-live="polite">
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

                    {/* Lauf-Anzeige: füllt sich, bis das nächste Modul kommt */}
                    <div className="kern-lauf" aria-hidden>
                        {filmt && <span key={aktiv} className="kern-lauf__balken" />}
                    </div>
                </div>

                <p
                    className="text-muted mt-5"
                    style={{ fontSize: '0.88rem', maxWidth: '46ch' }}
                >
                    So kann eine Nacht in Ihrem Betrieb aussehen. Wählen Sie ein
                    Modul. Alle greifen auf dasselbe Kernsystem zu, und es
                    können weitere dazukommen.
                </p>
            </div>
        </div>
    )
}
