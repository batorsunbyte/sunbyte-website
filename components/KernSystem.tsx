'use client'

import { useEffect, useRef, useState } from 'react'
import KiosIcon from '@/components/KiosIcon'
import { FUNKTIONEN } from '@/lib/kios'

/**
 * KernSystem — das Kernsystem in der Mitte, sechs Module rundherum, jedes mit
 * seinen spezialisierten Agenten (Zakir, 26.11.2026: „Kernsystem in der Mitte
 * und Abteilungen oder Module rund um das Kernsystem, jeder mit Agents").
 *
 * Läuft wie ein kurzer Film: Solange das Schaubild im Bild ist, wandert die
 * Auswahl alle vier Sekunden zum nächsten Modul. Sobald jemand ein Modul
 * anklickt, antippt oder mit der Tastatur wählt, hält der Lauf an.
 * Bei „weniger Bewegung" läuft nichts von selbst.
 *
 * Die Knoten sind echte Knöpfe (aria-pressed). Linien und Ring sind Dekoration.
 */

const DAUER = 4000
const RADIUS = 36 // Prozent der Bühne

/** Lage der sechs Knoten: oben beginnen, im Uhrzeigersinn */
const LAGE = FUNKTIONEN.map((_, i) => {
    const winkel = ((-90 + i * 60) * Math.PI) / 180
    return {
        x: 50 + RADIUS * Math.cos(winkel),
        y: 50 + RADIUS * Math.sin(winkel),
    }
})

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
            () => setAktiv(a => (a + 1) % FUNKTIONEN.length),
            DAUER,
        )
        return () => window.clearInterval(t)
    }, [laeuft, angehalten])

    const waehle = (i: number) => {
        setAngehalten(true)
        setAktiv(i)
    }

    const modul = FUNKTIONEN[aktiv]
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
                            r={RADIUS}
                        />
                        {LAGE.map((p, i) => (
                            <line
                                key={i}
                                className={`kern-linie${i === aktiv ? ' ist-aktiv' : ''}`}
                                x1="50"
                                y1="50"
                                x2={p.x}
                                y2={p.y}
                            />
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
                    {FUNKTIONEN.map((f, i) => {
                        const an = i === aktiv
                        return (
                            <button
                                key={f.modul}
                                type="button"
                                aria-pressed={an}
                                aria-controls="kern-feld"
                                onClick={() => waehle(i)}
                                onFocus={() => setAngehalten(true)}
                                className={`kern-knoten${an ? ' ist-aktiv' : ''}`}
                                style={{
                                    left: `${LAGE[i].x}%`,
                                    top: `${LAGE[i].y}%`,
                                }}
                            >
                                <KiosIcon
                                    name={f.icon}
                                    size={26}
                                    farbe={an ? 'var(--bg)' : 'var(--spark)'}
                                />
                                <span className="kern-knoten__name">
                                    {f.modul}
                                </span>
                            </button>
                        )
                    })}
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
                    style={{ fontSize: '0.88rem' }}
                >
                    Wählen Sie ein Modul. Alle Module greifen auf dasselbe
                    Kernsystem zu.
                </p>
            </div>
        </div>
    )
}
