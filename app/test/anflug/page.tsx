'use client'

import { useEffect, useState } from 'react'

/**
 * Test-Page für die Spark→Wien-Anflug-Geste (Sektion G, Hybrid-Variante).
 *
 * Zeigt zwei Bezier-Kurven side-by-side, jeweils mit auto-loop alle 4.5 s.
 * Ziel: „Licht sucht und kommt an", straffer Flug ~1.4 s, Moment der Stille
 * vor dem Pulse.
 *
 * Technik: CSS `offset-path` (GPU-beschleunigt, transform-only).
 * Reduced-Motion: Spark direkt an Wien-Position.
 *
 * Pfade sind im Container-Pixel-Raum 700x525 px (entspricht aspect-ratio 4:3
 * bei 700px Breite) — sie skalieren visuell mit dem Container, weil
 * offset-path bei ResizeObserver re-evaluiert wird (Browser-internal).
 */
export default function AnflugTestPage() {
    const [tick, setTick] = useState(0)

    useEffect(() => {
        const id = window.setInterval(() => setTick(t => t + 1), 5200)
        return () => window.clearInterval(id)
    }, [])

    return (
        <main
            className="container-edge"
            style={{ paddingTop: '6rem', paddingBottom: '6rem' }}
        >
            <header className="mb-12 max-w-3xl">
                <p className="mono-label text-spark mb-3">test · /test/anflug</p>
                <h1
                    className="font-display mb-4"
                    style={{
                        fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                        color: 'var(--lit)',
                    }}
                >
                    Spark → Wien — Bezier-Vergleich
                </h1>
                <p className="text-soft max-w-xl">
                    Auto-Loop alle 5,2 s · Tick: {tick} · Drücke{' '}
                    <kbd className="text-lit font-mono">⌘R</kbd> für manuellen
                    Restart.
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <Variant
                    label="A — Sanfter Bogen (Quadratic)"
                    desc="Geschwungen, elegant, ein Kontrollpunkt mittig-oben. Direkter, flugbahn-haft."
                    pathD="M 56,95 Q 266,14 420,221"
                    runKey={tick}
                />

                <Variant
                    label="B — Suchender Anflug (Cubic, zwei Phasen)"
                    desc="Zwei Kontrollpunkte. Erst dezenter Drop (sucht), dann steigt hoch, fällt zu Wien. Spürbarer Lichtsucht-Moment."
                    pathD="M 56,95 C 154,221 322,14 420,221"
                    runKey={tick}
                />
            </div>

            <footer
                className="mt-16 max-w-3xl text-soft text-sm space-y-2 leading-relaxed"
                style={{
                    borderTop: '1px solid rgba(201, 184, 163, 0.1)',
                    paddingTop: '1.5rem',
                }}
            >
                <p>
                    <span className="text-spark font-mono">↳</span> Timing: 0.3 s
                    fade-in · 1.4 s Flug · 0.35 s Stille · 1.6 s Pulse.
                </p>
                <p>
                    <span className="text-spark font-mono">↳</span> Spark =
                    identisch zum Hero-Wien-Marker (lit dot + spark glow).
                </p>
                <p>
                    <span className="text-spark font-mono">↳</span> CSS{' '}
                    <code className="text-lit">offset-path</code> → GPU,
                    transform-only · prefers-reduced-motion → direkt am Ziel.
                </p>
            </footer>
        </main>
    )
}

interface VariantProps {
    label: string
    desc: string
    pathD: string
    runKey: number
}

function Variant({ label, desc, pathD, runKey }: VariantProps) {
    // Wien-Position aus dem Pfad-Ende (M ... C ... wienX,wienY)
    // Für unseren Pfad: M 56,95 … 420,221 → Wien bei (420, 221) in 525h x 700w
    const wienXPct = (420 / 700) * 100
    const wienYPct = (221 / 525) * 100

    return (
        <section>
            <p className="mono-label text-spark mb-2">{label.split(' — ')[0]}</p>
            <h2
                className="font-display mb-2"
                style={{
                    fontSize: 'clamp(1.25rem, 1.8vw, 1.5rem)',
                    color: 'var(--lit)',
                }}
            >
                {label.split(' — ')[1]}
            </h2>
            <p className="text-soft text-sm mb-6 max-w-md">{desc}</p>

            <div
                className="relative w-full overflow-hidden"
                style={{
                    aspectRatio: '4 / 3',
                    border: '1px solid rgba(201, 184, 163, 0.16)',
                    borderRadius: '4px',
                    background:
                        'radial-gradient(circle at 50% 65%, rgba(232,90,31,0.06) 0%, transparent 60%)',
                }}
            >
                {/* Halbglobus-Bogen (statisches SVG) — Echo des Hero-Globe */}
                <svg
                    aria-hidden
                    viewBox="0 0 700 525"
                    className="absolute inset-0 w-full h-full"
                    preserveAspectRatio="none"
                >
                    {/* Erdrand unten — angedeuteter Bogen */}
                    <path
                        d="M -50,600 Q 350,250 750,600"
                        fill="none"
                        stroke="rgba(232, 90, 31, 0.22)"
                        strokeWidth="1.5"
                    />
                    {/* Dezentes Halo am Erdrand */}
                    <path
                        d="M -50,600 Q 350,250 750,600"
                        fill="none"
                        stroke="rgba(232, 90, 31, 0.08)"
                        strokeWidth="8"
                    />

                    {/* Pfad sichtbar als sehr dezenter Debug-Hint */}
                    <path
                        d={pathD}
                        fill="none"
                        stroke="rgba(232, 90, 31, 0.18)"
                        strokeWidth="0.6"
                        strokeDasharray="3,4"
                    />

                    {/* Wien-Anker (kleiner statischer Punkt) */}
                    <circle
                        cx={420}
                        cy={221}
                        r="2"
                        fill="rgba(232, 90, 31, 0.5)"
                    />
                </svg>

                {/* Spark-Flyer (offset-path animiert, 10x10px Element wandert als ganzes) */}
                <div
                    key={`flyer-${runKey}`}
                    className="spark-flyer is-running"
                    style={
                        {
                            offsetPath: `path('${pathD}')`,
                            offsetAnchor: 'center',
                        } as React.CSSProperties
                    }
                >
                    <span className="spark-dot" />
                    <span className="spark-pulse" />
                </div>

                {/* Wien-Label */}
                <span
                    key={`label-${runKey}`}
                    className="spark-label"
                    style={{
                        left: `calc(${wienXPct}% + 12px)`,
                        top: `calc(${wienYPct}% - 8px)`,
                    }}
                >
                    wien
                </span>
            </div>

            {/* Pfad-Code als Reference */}
            <p
                className="mono-label text-muted mt-3"
                style={{ fontSize: '0.6rem' }}
            >
                <code>{pathD}</code>
            </p>
        </section>
    )
}
