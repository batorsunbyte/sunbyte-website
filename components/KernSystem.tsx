'use client'

import { useEffect, useRef, useState } from 'react'
import KiosIcon from '@/components/KiosIcon'
import { FUNKTIONEN } from '@/lib/kios'

/**
 * KernSystem — das Kernsystem in der Mitte, sechs Module rundherum, und von
 * jedem Modul verzweigen sich nach außen seine spezialisierten Agenten
 * (Zakir, 26.11.2026: „Kernsystem in der Mitte und Abteilungen oder Module
 * rund um das Kernsystem, jeder mit Agents"; dazu seine Skizze mit den Ästen
 * und einem Plus für weitere Module).
 *
 * Läuft wie ein kurzer Film: Solange das Schaubild im Bild ist, wandert die
 * Auswahl alle vier Sekunden zum nächsten Modul. Sobald jemand ein Modul
 * anklickt, antippt oder mit der Tastatur wählt, hält der Lauf an.
 * Bei „weniger Bewegung" läuft nichts von selbst.
 *
 * Die Knoten sind echte Knöpfe (aria-pressed). Linien, Äste, Ring und das Plus
 * sind Dekoration; die Namen der Agenten stehen zusätzlich im Feld daneben
 * (unter 1280 px Breite nur dort, im Schaubild ist dafür kein Platz).
 */

const DAUER = 4000
const R_MODUL = 30 // Prozent der Bühne
const R_AGENT = 46

const rad = (grad: number) => (grad * Math.PI) / 180
const punkt = (grad: number, r: number) => ({
    x: 50 + r * Math.cos(rad(grad)),
    y: 50 + r * Math.sin(rad(grad)),
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

export default function KernSystem() {
    const [aktiv, setAktiv] = useState(0)
    const [laeuft, setLaeuft] = useState(false)
    const [angehalten, setAngehalten] = useState(false)
    const buehne = useRef<HTMLDivElement>(null)

    // Nur laufen, wenn das Schaubild sichtbar ist und Bewegung erwünscht ist
    useEffect(() => {
        if (angehalten) return
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
        const el = buehne.current
        if (!el || !('IntersectionObserver' in window)) return
        const io = new IntersectionObserver(
            ([e]) => setLaeuft(e.isIntersecting),
            { threshold: 0.35 },
        )
        io.observe(el)
        return () => io.disconnect()
    }, [angehalten])

    useEffect(() => {
        if (!laeuft || angehalten) return
        const t = window.setInterval(
            () => setAktiv(a => (a + 1) % MODULE.length),
            DAUER,
        )
        return () => window.clearInterval(t)
    }, [laeuft, angehalten])

    const waehle = (i: number) => {
        setAngehalten(true)
        setAktiv(i)
    }

    const modul = MODULE[aktiv]
    const filmt = laeuft && !angehalten

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* ── Bühne ─────────────────────────────────── */}
            <div className="lg:col-span-7">
                <div ref={buehne} className="kern-buehne">
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
                    </svg>

                    {/* Kern */}
                    <div className="kern-mitte" aria-hidden>
                        <span className="kern-mitte__halo" />
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

                        <p className="mono-label text-muted mt-8 mb-3">
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
                    </div>

                    {/* Lauf-Anzeige: füllt sich, bis das nächste Modul kommt */}
                    <div className="kern-lauf" aria-hidden>
                        {filmt && <span key={aktiv} className="kern-lauf__balken" />}
                    </div>
                </div>

                <p
                    className="text-muted mt-5"
                    style={{ fontSize: '0.88rem', maxWidth: '44ch' }}
                >
                    Wählen Sie ein Modul. Alle Module greifen auf dasselbe
                    Kernsystem zu, und es können weitere dazukommen.
                </p>
            </div>
        </div>
    )
}
