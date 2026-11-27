/**
 * Anflug — Comic-Strip Vergleich
 *
 * Zeigt beide Bezier-Varianten als 5-Frame-Sequenz nebeneinander.
 * Jeder Frame ist ein statischer Snapshot der Spark-Position via inline
 * `offset-distance` — kein scrubbing, kein Auto-Loop, präzise vergleichbar.
 */
const PATHS = [
    {
        id: 'A',
        title: 'Sanfter Bogen (Quadratic)',
        desc: 'Eine fließende Kurve. Direkter, „flugbahn"-haft.',
        d: 'M 56,95 Q 266,14 420,221',
    },
    {
        id: 'B',
        title: 'Suchender Anflug (Cubic, subtle drop)',
        desc: 'Control 1 bei y=160 statt y=221. Zögern fühlbar, nicht sichtbar als Schlenker.',
        d: 'M 56,95 C 154,160 322,14 420,221',
    },
]

const FRAMES = [
    { label: '0.30 s — Spark erscheint', dist: 0.0, pulseScale: 0, pulseOpacity: 0 },
    { label: '0.65 s — sucht', dist: 0.25, pulseScale: 0, pulseOpacity: 0 },
    { label: '1.00 s — auf Kurs', dist: 0.6, pulseScale: 0, pulseOpacity: 0 },
    { label: '1.70 s — Ankunft', dist: 1.0, pulseScale: 1, pulseOpacity: 1 },
    { label: '2.40 s — Pulse', dist: 1.0, pulseScale: 3.5, pulseOpacity: 0.35 },
]

export default function StripPage() {
    return (
        <main
            className="container-edge"
            style={{ paddingTop: '4rem', paddingBottom: '6rem' }}
        >
            <header className="mb-10 max-w-3xl">
                <p className="mono-label text-spark mb-3">test · /test/anflug/strip</p>
                <h1
                    className="font-display mb-3"
                    style={{
                        fontSize: 'clamp(1.75rem, 4vw, 3rem)',
                        color: 'var(--lit)',
                    }}
                >
                    Comic-Strip: A vs B
                </h1>
                <p
                    className="text-soft max-w-2xl"
                    style={{ fontSize: 'clamp(0.9rem, 1.1vw, 1rem)' }}
                >
                    Fünf Schlüssel-Frames pro Variante. Spark an festen
                    Pfad-Positionen, Pulse statisch dargestellt für Ankunfts-Frame.
                </p>
            </header>

            {PATHS.map(p => (
                <section key={p.id} className="mb-12">
                    <div className="mb-4">
                        <p className="mono-label text-spark mb-1">
                            Variante {p.id}
                        </p>
                        <h2
                            className="font-display mb-1"
                            style={{
                                fontSize: 'clamp(1.25rem, 1.6vw, 1.5rem)',
                                color: 'var(--lit)',
                            }}
                        >
                            {p.title}
                        </h2>
                        <p
                            className="text-soft text-sm"
                            style={{ fontSize: '0.85rem' }}
                        >
                            {p.desc} · <code className="text-spark">{p.d}</code>
                        </p>
                    </div>

                    <div className="grid grid-cols-5 gap-3">
                        {FRAMES.map((f, idx) => (
                            <FrameBox
                                key={idx}
                                pathD={p.d}
                                distance={f.dist}
                                pulseScale={f.pulseScale}
                                pulseOpacity={f.pulseOpacity}
                                label={f.label}
                                showLabel={f.dist === 1.0}
                            />
                        ))}
                    </div>
                </section>
            ))}
        </main>
    )
}

interface FrameBoxProps {
    pathD: string
    distance: number
    pulseScale: number
    pulseOpacity: number
    label: string
    showLabel: boolean
}

function FrameBox({
    pathD,
    distance,
    pulseScale,
    pulseOpacity,
    label,
    showLabel,
}: FrameBoxProps) {
    return (
        <div>
            <div
                className="relative w-full overflow-hidden"
                style={{
                    aspectRatio: '4 / 3',
                    border: '1px solid rgba(201, 184, 163, 0.16)',
                    borderRadius: '3px',
                    background:
                        'radial-gradient(circle at 50% 65%, rgba(232,90,31,0.06) 0%, transparent 60%)',
                }}
            >
                {/* Bogen + path debug + Wien-Anker */}
                <svg
                    aria-hidden
                    viewBox="0 0 700 525"
                    className="absolute inset-0 w-full h-full"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M -50,600 Q 350,250 750,600"
                        fill="none"
                        stroke="rgba(232, 90, 31, 0.22)"
                        strokeWidth="1.5"
                    />
                    <path
                        d="M -50,600 Q 350,250 750,600"
                        fill="none"
                        stroke="rgba(232, 90, 31, 0.08)"
                        strokeWidth="8"
                    />
                    <path
                        d={pathD}
                        fill="none"
                        stroke="rgba(232, 90, 31, 0.18)"
                        strokeWidth="0.6"
                        strokeDasharray="3,4"
                    />
                    <circle cx={420} cy={221} r="2" fill="rgba(232, 90, 31, 0.5)" />
                </svg>

                {/* Spark-Flyer (statisch, offset-distance fix) */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: 10,
                        height: 10,
                        offsetPath: `path('${pathD}')`,
                        offsetAnchor: 'center',
                        offsetDistance: `${distance * 100}%`,
                        opacity: 1,
                        pointerEvents: 'none',
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
                    {pulseOpacity > 0 && (
                        <span
                            style={{
                                position: 'absolute',
                                inset: 0,
                                borderRadius: '50%',
                                border: '1.5px solid var(--spark)',
                                transform: `scale(${pulseScale})`,
                                opacity: pulseOpacity,
                                transformOrigin: 'center',
                            }}
                        />
                    )}
                </div>

                {showLabel && (
                    <span
                        className="absolute"
                        style={{
                            left: 'calc(60% + 12px)',
                            top: 'calc(42.1% - 8px)',
                            color: 'var(--lit)',
                            fontFamily: 'JetBrains Mono, monospace',
                            fontSize: '0.5rem',
                            letterSpacing: '0.16em',
                            textTransform: 'lowercase',
                            textShadow: '0 0 6px #000',
                            pointerEvents: 'none',
                        }}
                    >
                        wien
                    </span>
                )}
            </div>
            <p
                className="mono-label text-muted mt-2"
                style={{ fontSize: '0.55rem' }}
            >
                {label}
            </p>
        </div>
    )
}
