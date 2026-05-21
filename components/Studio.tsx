/**
 * Studio / Gründer (§5 im Briefing) — die menschliche Sektion.
 *
 * Layout: Foto-Slot links groß, Story rechts. Fakten als Mini-Block.
 *
 * Inhalte: Selbstbewusste Platzhalter, klar als „muss durch Zakir bestätigt
 * werden" markiert. Keine Floskeln, keine privaten Details — der echte
 * Text kommt von Zakir.
 */
export default function Studio() {
    return (
        <section
            id="studio"
            className="relative w-full container-edge"
            style={{ paddingTop: '8rem', paddingBottom: '8rem' }}
        >
            {/* Sektion-Header */}
            <header className="mb-16 md:mb-24 max-w-3xl">
                <p className="mono-label text-spark mb-4">03 — studio</p>
                <h2
                    className="font-display"
                    style={{
                        fontSize: 'clamp(2.25rem, 5.5vw, 4.5rem)',
                        color: 'var(--lit)',
                    }}
                >
                    Hinter Sunbyte
                    <br />
                    <span style={{ color: 'var(--spark)' }}>steht ein Mensch.</span>
                </h2>
            </header>

            {/* Inhalt: Foto + Story + Fakten */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-start">
                {/* Foto-Slot */}
                <div className="md:col-span-5">
                    <PortraitSlot />

                    {/* Fakten direkt unter Foto */}
                    <dl
                        className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 text-sm"
                        style={{ maxWidth: '32rem' }}
                    >
                        <FactRow term="Gründer" def="Zakir Daryabi" />
                        <FactRow term="Standort" def="Wien, Österreich" />
                        <FactRow term="Gegründet" def="2026" />
                        <FactRow term="Modell" def="Inhabergeführt" />
                        <FactRow term="Sprachen" def="Deutsch · Englisch" />
                        <FactRow term="Stack" def="Next.js · FastAPI · Edge" />
                    </dl>
                </div>

                {/* Story */}
                <div className="md:col-span-7 md:col-start-7 md:pl-6">
                    {/* Quote / Manifest */}
                    <blockquote
                        className="font-display mb-10"
                        style={{
                            fontSize: 'clamp(1.5rem, 2.6vw, 2.25rem)',
                            color: 'var(--lit)',
                            lineHeight: 1.15,
                            borderLeft: '2px solid var(--spark)',
                            paddingLeft: '1.5rem',
                        }}
                    >
                        „Ich baue Websites so, als wären sie meine eigenen —
                        weil ich weiß, wie sich das anfühlt, etwas von Grund auf
                        aufzubauen."
                        <footer
                            className="mt-4 mono-label text-spark"
                            style={{ fontSize: '0.66rem' }}
                        >
                            — zakir, gründer
                        </footer>
                    </blockquote>

                    {/* Story-Body — Platzhalter mit Slot-Markern */}
                    <div className="space-y-6 text-soft leading-relaxed">
                        <p
                            data-slot="story-paragraph-1"
                            style={{ fontSize: 'clamp(0.95rem, 1.3vw, 1.1rem)' }}
                        >
                            <span className="text-lit">Sunbyte ist neu — die
                            Person dahinter nicht.</span> Software-Lehre 2023
                            abgeschlossen, davor und danach kontinuierlich
                            an eigenen Produkten gebaut. PrintMyWall (Direktdruck
                            auf Wände) ist eines davon, kfz22 das erste echte
                            Kundenprojekt — und der Punkt, an dem aus
                            „nebenher" eine Agentur wurde.
                        </p>

                        <p
                            data-slot="story-paragraph-2"
                            style={{ fontSize: 'clamp(0.95rem, 1.3vw, 1.1rem)' }}
                        >
                            Was Sunbyte anders macht: keine Schicht zwischen
                            dir und der Person, die deine Seite baut. Du sprichst
                            nicht mit einem Account-Manager, der mit der
                            Entwicklung Rücksprache halten muss. Du sprichst
                            mit dem, der den Code schreibt.
                        </p>

                        <p
                            data-slot="story-paragraph-3"
                            style={{ fontSize: 'clamp(0.95rem, 1.3vw, 1.1rem)' }}
                        >
                            <span className="text-lit">Ziel 2026:</span>{' '}
                            zwei weitere Premium-Projekte, drei Lizenz-Partner,
                            ein vollständig dokumentierter Stack, mit dem
                            jede Branche schnell zu einer Seite kommt, die
                            sich nicht nach Template anfühlt.
                        </p>

                        <p
                            data-slot="story-todo"
                            className="mono-label text-muted pt-4"
                            style={{
                                fontSize: '0.62rem',
                                borderTop: '1px solid rgba(201, 184, 163, 0.1)',
                            }}
                        >
                            ↳ slot: gründer-text wird von zakir noch verfeinert
                            / persönlicher gemacht.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

// ─── Sub-Components ─────────────────────────────────────────────

function PortraitSlot() {
    return (
        <div
            className="relative w-full overflow-hidden"
            style={{
                aspectRatio: '4 / 5',
                border: '1px solid rgba(201, 184, 163, 0.16)',
                borderRadius: '4px',
                background: 'rgba(20, 17, 15, 0.5)',
            }}
            data-slot="portrait-photo"
        >
            {/* Halo-Echo */}
            <div
                aria-hidden
                className="absolute"
                style={{
                    inset: '-20%',
                    background:
                        'radial-gradient(circle at 50% 40%, rgba(232,90,31,0.12) 0%, transparent 60%)',
                    pointerEvents: 'none',
                }}
            />

            {/* Diagonal accent line */}
            <div
                aria-hidden
                className="absolute"
                style={{
                    bottom: '-1px',
                    left: '-1px',
                    right: '-1px',
                    height: '2px',
                    background:
                        'linear-gradient(90deg, transparent 0%, var(--spark) 30%, var(--spark) 70%, transparent 100%)',
                    opacity: 0.6,
                }}
            />

            {/* Bottom hint */}
            <p
                className="absolute mono-label text-spark"
                style={{
                    bottom: '1.25rem',
                    left: '1.25rem',
                    fontSize: '0.62rem',
                }}
            >
                ↳ porträt folgt
            </p>
            <p
                className="absolute mono-label text-muted"
                style={{
                    bottom: '1.25rem',
                    right: '1.25rem',
                    fontSize: '0.6rem',
                }}
            >
                zakir.daryabi
            </p>
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
