'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'

/**
 * Studio / Gründer — Signature-Moment (Sektion G, Hybrid).
 *
 * Layout:
 *   - Linke Spalte: abstraktes Globe-Echo mit Spark→Wien-Anker-Geste
 *     („Licht sucht und kommt an"), darunter Fakten-Liste.
 *   - Rechte Spalte: Quote + Bio-Absätze mit Mask-Reveal (Vorhang nach oben).
 *
 * Trigger: IntersectionObserver setzt data-anflug="true" auf #studio, sobald
 * 25 % der Sektion sichtbar sind — ein einziger Lauf, kein Re-Play beim
 * Zurück-Scrollen (Premium = nicht penetrant).
 *
 * Timing:
 *   0.0–0.3 s  Spark fadet ein
 *   0.3–1.7 s  Flug entlang Bezier (subtler Drop, control1 y=160)
 *   1.7–2.05 s Stille
 *   2.05–2.85 s Pulse-Ring (0.85 s kurz)
 *   2.40–3.84 s Story-Zeilen reveal staggered
 *
 * Performance: nur offset-distance / transform / opacity. CSS-only,
 * keine rAF-Schleife. prefers-reduced-motion → alles sofort sichtbar.
 */

/**
 * Pfad-Definition in viewBox-Koordinaten (700×525, identisch zur SVG-Bogen-
 * Geometrie). Wird beim Mount auf Container-Pixel skaliert — sonst landet
 * der Spark außerhalb der Box.
 */
const PATH_VIEWBOX = { w: 700, h: 525 }
const PATH_POINTS = {
    start: { x: 56, y: 95 },
    c1: { x: 154, y: 160 },
    c2: { x: 322, y: 14 },
    end: { x: 420, y: 221 },
}
const WIEN_X_PCT = (PATH_POINTS.end.x / PATH_VIEWBOX.w) * 100
const WIEN_Y_PCT = (PATH_POINTS.end.y / PATH_VIEWBOX.h) * 100

function scaledPath(w: number, h: number): string {
    const sx = w / PATH_VIEWBOX.w
    const sy = h / PATH_VIEWBOX.h
    const r = (n: number) => n.toFixed(2)
    return (
        `M ${r(PATH_POINTS.start.x * sx)},${r(PATH_POINTS.start.y * sy)} ` +
        `C ${r(PATH_POINTS.c1.x * sx)},${r(PATH_POINTS.c1.y * sy)} ` +
        `${r(PATH_POINTS.c2.x * sx)},${r(PATH_POINTS.c2.y * sy)} ` +
        `${r(PATH_POINTS.end.x * sx)},${r(PATH_POINTS.end.y * sy)}`
    )
}

export default function Studio() {
    const sectionRef = useRef<HTMLElement>(null)
    const [active, setActive] = useState(false)

    useEffect(() => {
        const el = sectionRef.current
        if (!el) return
        // Wenn user prefers reduced motion: Animation skippen, alles sofort sichtbar.
        const prefersReduce = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        ).matches
        if (prefersReduce) {
            setActive(true)
            return
        }

        const io = new IntersectionObserver(
            entries => {
                for (const e of entries) {
                    if (e.isIntersecting) {
                        setActive(true)
                        io.disconnect()
                    }
                }
            },
            { threshold: 0.22, rootMargin: '0px 0px -10% 0px' },
        )
        io.observe(el)
        return () => io.disconnect()
    }, [])

    return (
        <section
            ref={sectionRef}
            id="studio"
            data-anflug={active ? 'true' : 'false'}
            className="relative w-full container-edge"
            style={{ paddingTop: '8rem', paddingBottom: '8rem' }}
        >
            {/* Sektion-Header */}
            <header className="mb-16 md:mb-24 max-w-3xl">
                <p className="mono-label text-spark mb-4">die mission</p>
                <h2
                    className="font-display"
                    style={{
                        fontSize: 'clamp(2.25rem, 5.5vw, 4.5rem)',
                        color: 'var(--lit)',
                    }}
                >
                    Von Wien aus
                    <br />
                    <span style={{ color: 'var(--spark)' }}>in die Welt.</span>
                </h2>
            </header>

            {/* Inhalt: Anker-Geste + Bio */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-start">
                {/* Linke Spalte: Anker-Geste + Fakten */}
                <div className="md:col-span-5">
                    <AnchorGesture />

                    {/* Fakten direkt unter dem Anker */}
                    <dl
                        className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4 text-sm"
                        style={{ maxWidth: '32rem' }}
                    >
                        <FactRow term="Standort" def="Wien, Österreich" />
                        <FactRow term="Gegründet" def="2026" />
                        <FactRow term="Team" def="Zwei Brüder" />
                        <FactRow term="Erfahrung" def="20+ Jahre IT & KI" />
                        <FactRow term="Fokus" def="Web · KI-Sichtbarkeit" />
                        <FactRow term="Sprachen" def="Deutsch · Englisch" />
                    </dl>
                </div>

                {/* Rechte Spalte: Quote + Story mit Mask-Reveal */}
                <div className="md:col-span-7 md:col-start-7 md:pl-6">
                    {/* Quote (Reveal 1) */}
                    <div
                        className="mb-10"
                        style={{
                            borderLeft: '2px solid var(--spark)',
                            paddingLeft: '1.5rem',
                        }}
                    >
                        <blockquote
                            className="font-display story-line story-line-1"
                            style={{
                                fontSize: 'clamp(1.5rem, 2.6vw, 2.25rem)',
                                color: 'var(--lit)',
                                lineHeight: 1.15,
                            }}
                        >
                            <span className="story-inner">
                                „Wir fangen klein an — mit dem klaren Anspruch,
                                ganz oben zu landen."
                            </span>
                        </blockquote>
                        <div className="story-line story-line-2 mt-4">
                            <span
                                className="story-inner mono-label text-spark"
                            >
                                — das sunbyte-team
                            </span>
                        </div>
                    </div>

                    {/* Bio-Absätze (Reveal 3-5) */}
                    <div className="space-y-6 text-soft leading-relaxed">
                        <div
                            className="story-line story-line-3"
                            data-slot="vision-paragraph-1"
                        >
                            <p
                                className="story-inner"
                                style={{
                                    fontSize: 'clamp(1rem, 1.3vw, 1.1rem)',
                                }}
                            >
                                <span className="text-lit">
                                    Der Funke startet in Wien.
                                </span>{' '}
                                Zwei Brüder, über 20 Jahre kombinierte Erfahrung
                                in IT, KI und Design — und die Überzeugung, dass
                                Weltklasse keine Frage der Größe ist, sondern des
                                Anspruchs.
                            </p>
                        </div>

                        <div
                            className="story-line story-line-4"
                            data-slot="vision-paragraph-2"
                        >
                            <p
                                className="story-inner"
                                style={{
                                    fontSize: 'clamp(1rem, 1.3vw, 1.1rem)',
                                }}
                            >
                                Wir bauen Sunbyte zu einer{' '}
                                <span className="text-lit">IT-Weltmacht</span> —
                                Schritt für Schritt, Projekt für Projekt. Was
                                hier in Wien entsteht, soll Maßstäbe setzen, nicht
                                hinterherlaufen.
                            </p>
                        </div>

                        <div
                            className="story-line story-line-5"
                            data-slot="vision-paragraph-3"
                        >
                            <p
                                className="story-inner"
                                style={{
                                    fontSize: 'clamp(1rem, 1.3vw, 1.1rem)',
                                }}
                            >
                                <span className="text-lit">Heute:</span>{' '}
                                erstklassige Webseiten und KI-Sichtbarkeit für
                                Unternehmen, die mehr wollen als Durchschnitt.
                                Morgen: ein Name, den man kennt — weit über Wien
                                hinaus.
                            </p>
                        </div>

                        <div
                            className="story-line story-line-6"
                            data-slot="vision-close"
                        >
                            <p
                                className="story-inner mono-label text-spark pt-4"
                                style={{
                                    borderTop:
                                        '1px solid rgba(201, 184, 163, 0.1)',
                                }}
                            >
                                ↳ von wien in die welt. das ist der plan.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

// ─── Sub-Components ─────────────────────────────────────────────

/**
 * Anker-Geste: Abstraktes Globe-Echo mit Spark→Wien-Animation.
 * Wird via Parent-Selector #studio[data-anflug="true"] animiert.
 *
 * Pfad wird beim Mount + Resize auf Container-Pixel skaliert (sonst
 * läuft der Spark außerhalb, weil offset-path absolute Pixel-Werte braucht).
 */
function AnchorGesture() {
    const boxRef = useRef<HTMLDivElement>(null)
    const [path, setPath] = useState<string | null>(null)

    useLayoutEffect(() => {
        const el = boxRef.current
        if (!el) return
        const update = () => {
            const r = el.getBoundingClientRect()
            if (r.width > 0 && r.height > 0) {
                setPath(scaledPath(r.width, r.height))
            }
        }
        update()
        const ro = new ResizeObserver(update)
        ro.observe(el)
        return () => ro.disconnect()
    }, [])

    return (
        <div
            ref={boxRef}
            className="relative w-full overflow-hidden"
            aria-hidden
            style={{
                aspectRatio: '4 / 3',
                border: '1px solid rgba(201, 184, 163, 0.16)',
                borderRadius: '4px',
                background:
                    'radial-gradient(circle at 50% 65%, rgba(232,90,31,0.08) 0%, transparent 60%)',
            }}
        >
            {/* Erdrand-Bogen (statisches SVG, „Welt-Echo" zum Hero) */}
            <svg
                viewBox="0 0 700 525"
                className="absolute inset-0 w-full h-full"
                preserveAspectRatio="none"
            >
                <path
                    d="M -50,600 Q 350,250 750,600"
                    fill="none"
                    stroke="rgba(232, 90, 31, 0.08)"
                    strokeWidth="10"
                />
                <path
                    d="M -50,600 Q 350,250 750,600"
                    fill="none"
                    stroke="rgba(232, 90, 31, 0.28)"
                    strokeWidth="1.5"
                />
                <circle
                    cx={PATH_POINTS.end.x}
                    cy={PATH_POINTS.end.y}
                    r="2"
                    fill="rgba(232, 90, 31, 0.5)"
                />
            </svg>

            {/* Spark-Flyer (offset-path animiert, dynamisch skaliert) */}
            <div
                className="anchor-spark-flyer"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: 10,
                    height: 10,
                    offsetPath: path ? `path('${path}')` : undefined,
                    offsetAnchor: 'center',
                    offsetDistance: '0%',
                    opacity: 0,
                    pointerEvents: 'none',
                    willChange: 'offset-distance, opacity',
                }}
            >
                <span
                    style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '50%',
                        background: 'var(--lit)',
                        boxShadow:
                            '0 0 14px 3px rgba(232, 90, 31, 0.95), 0 0 28px 6px rgba(232, 90, 31, 0.4)',
                    }}
                />
                <span
                    className="anchor-spark-pulse"
                    style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '50%',
                        border: '1.5px solid var(--spark)',
                        opacity: 0,
                        transform: 'scale(1)',
                        transformOrigin: 'center',
                        willChange: 'transform, opacity',
                    }}
                />
            </div>

            {/* Wien-Label (fadet nach Ankunft ein) */}
            <span
                className="anchor-spark-label mono-label"
                style={{
                    position: 'absolute',
                    left: `calc(${WIEN_X_PCT}% + 12px)`,
                    top: `calc(${WIEN_Y_PCT}% - 8px)`,
                    color: 'var(--lit)',
                    fontSize: '0.62rem',
                    textShadow: '0 0 6px #000',
                    opacity: 0,
                    pointerEvents: 'none',
                    willChange: 'opacity, transform',
                }}
            >
                wien
            </span>
        </div>
    )
}

function FactRow({ term, def }: { term: string; def: string }) {
    return (
        <>
            <dt
                className="mono-label text-muted"
                style={{ fontSize: '0.62rem' }}
            >
                {term}
            </dt>
            <dd
                className="text-lit"
                style={{ fontSize: 'clamp(0.85rem, 1vw, 0.95rem)' }}
            >
                {def}
            </dd>
        </>
    )
}
