'use client'

import dynamic from 'next/dynamic'
import { useState, type ReactNode } from 'react'
import {
    CONTINENT_DATA,
    DEFAULT_INFO,
    type ContinentKey,
} from '@/lib/globe-data'

const Globe = dynamic(() => import('@/components/Globe'), { ssr: false })

/**
 * Leistungen (§6 im Briefing) — die drei Stufen selbst-demonstrierend.
 * Standard / Premium / Premium-Premium. Performance-Regel:
 *   - Standard: keine Globe-Instanz.
 *   - Premium: Globe statisch (autoRotate=false, interactive=false). Globe.tsx
 *     stoppt den rAF-Loop nach dem ersten Render.
 *   - PP: volle Globe. Wenn Hero im Viewport, ist PP off-screen — eine Loop
 *     gleichzeitig. Beim Scrollen pausiert Hero (IntersectionObserver),
 *     dann läuft nur PP.
 */
export default function Services() {
    const [ppActive, setPpActive] = useState<ContinentKey | null>(null)
    const ppInfo = ppActive ? CONTINENT_DATA[ppActive] : DEFAULT_INFO

    return (
        <section
            id="leistungen"
            className="relative w-full container-edge"
            style={{ paddingTop: '8rem', paddingBottom: '8rem' }}
        >
            {/* Sektion-Header */}
            <header className="mb-16 md:mb-24 max-w-3xl">
                <p className="mono-label text-spark mb-4">
                    01 — leistungen
                </p>
                <h2
                    className="font-display"
                    style={{
                        fontSize: 'clamp(2.25rem, 5.5vw, 4.5rem)',
                        color: 'var(--lit)',
                    }}
                >
                    Drei Stufen.
                    <br />
                    <span style={{ color: 'var(--spark)' }}>
                        Du siehst den Unterschied.
                    </span>
                </h2>
                <p
                    className="text-soft mt-6 max-w-xl leading-relaxed"
                    style={{ fontSize: 'clamp(0.95rem, 1.3vw, 1.1rem)' }}
                >
                    Statt es zu erklären, zeigen wir es. Dieselbe Welt-Idee —
                    dreimal, schrittweise abgespeckt. So fühlt sich jede Stufe
                    in echt an.
                </p>
            </header>

            {/* Karten-Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
                {/* ─── Standard ─── */}
                <ServiceCard
                    tier="01"
                    name="Standard"
                    promise="Schnell, sauber, mobile-first."
                    caseLabel="Beispiel folgt"
                    caseDescription="Bald: neues PrintMyWall-Setup als Referenz."
                    bullets={[
                        'Eine Seite, gut gemacht',
                        'Klare Hierarchie, lesbares Layout',
                        'Mobile-first, schnell, SEO-Basics',
                    ]}
                >
                    <EmptyGlobeSlot label="kein bewegtbild" />
                </ServiceCard>

                {/* ─── Premium ─── */}
                <ServiceCard
                    tier="02"
                    name="Premium"
                    promise="Visuelle Präsenz, die wirkt."
                    caseLabel="Live: kfz22.com"
                    caseDescription="KFZ Technik 22, Wien 1220 — unsere Premium-Referenz."
                    caseHref="https://kfz22.com"
                    bullets={[
                        'Eigenständiges visuelles System',
                        'Hochwertige Bewegtbild-Elemente',
                        'Konversions-getriebenes Layout',
                    ]}
                    accent
                >
                    <div
                        className="relative mx-auto w-full"
                        style={{ maxWidth: 240 }}
                    >
                        <div
                            className="globe-halo"
                            aria-hidden
                            style={{ opacity: 0.5 }}
                        />
                        <Globe
                            ariaLabel="Premium-Stufe: statischer Globus, keine Animation"
                            className="opacity-90"
                        />
                    </div>
                </ServiceCard>

                {/* ─── Premium-Premium ─── */}
                <ServiceCard
                    tier="03"
                    name="Premium-Premium"
                    promise="Erlebnis, das man weitererzählt."
                    caseLabel="Live: diese Seite"
                    caseDescription="Volle Welt-Interaktion, Editorial-Layout, Sub-Sekunden-LCP."
                    bullets={[
                        'Voll interaktive Hero-Sektion',
                        'Custom-Animationen, narratives Scrollen',
                        'Performance-Audit ohne Kompromisse',
                    ]}
                >
                    <div
                        className="relative mx-auto w-full mb-4"
                        style={{ maxWidth: 240 }}
                    >
                        <div className="globe-halo" aria-hidden />
                        <Globe
                            autoRotate
                            interactive
                            showInsights
                            showMarker
                            onContinentChange={setPpActive}
                            ariaLabel="Premium-Premium-Stufe: voller interaktiver Welt-Globus"
                        />
                    </div>
                    {/* Mini-Insight unter Globe */}
                    <div
                        className="border-l-2 px-3 py-1.5 text-left mx-auto"
                        style={{
                            borderColor: 'var(--spark)',
                            maxWidth: 260,
                        }}
                    >
                        <div
                            className="mono-label text-spark"
                            style={{ fontSize: '0.6rem' }}
                        >
                            {ppInfo.n}
                        </div>
                    </div>
                </ServiceCard>
            </div>

            {/* Footer-Hinweis */}
            <p
                className="mt-16 md:mt-24 mono-label text-muted text-center max-w-2xl mx-auto"
                style={{ fontSize: '0.66rem' }}
            >
                ↳ welche stufe passt? sprich mit zakir —{' '}
                <a
                    href="#kontakt"
                    className="text-spark hover:text-lit transition-colors"
                >
                    direktdraht
                </a>
            </p>
        </section>
    )
}

// ─── Sub-Components ───────────────────────────────────────────

interface ServiceCardProps {
    tier: string
    name: string
    promise: string
    caseLabel: string
    caseDescription: string
    caseHref?: string
    bullets: string[]
    children: ReactNode
    accent?: boolean
}

function ServiceCard({
    tier,
    name,
    promise,
    caseLabel,
    caseDescription,
    caseHref,
    bullets,
    children,
    accent = false,
}: ServiceCardProps) {
    return (
        <article
            className="relative flex flex-col"
            style={{
                padding: '2rem 1.5rem',
                border: '1px solid rgba(201, 184, 163, 0.16)',
                borderRadius: '4px',
                background: accent
                    ? 'rgba(232, 90, 31, 0.03)'
                    : 'transparent',
                transition: 'border-color 0.3s ease, transform 0.3s ease',
            }}
        >
            {/* Tier-Marker */}
            <div className="flex items-center justify-between mb-6">
                <span className="mono-label text-spark">{tier}</span>
                <span
                    className="mono-label"
                    style={{
                        color: 'var(--muted)',
                        fontSize: '0.6rem',
                    }}
                >
                    {caseLabel}
                </span>
            </div>

            {/* Name */}
            <h3
                className="font-display mb-3"
                style={{
                    fontSize: 'clamp(1.75rem, 2.5vw, 2.25rem)',
                    color: 'var(--lit)',
                }}
            >
                {name}
            </h3>

            {/* Promise */}
            <p
                className="text-soft leading-snug mb-8"
                style={{ fontSize: 'clamp(0.95rem, 1.2vw, 1.05rem)' }}
            >
                {promise}
            </p>

            {/* Globe-Slot (oder leerer Placeholder) */}
            <div
                className="mb-8 flex items-center justify-center min-h-[200px]"
                style={{ minHeight: 220 }}
            >
                {children}
            </div>

            {/* Bullets */}
            <ul className="space-y-2 mb-8 text-soft text-sm leading-relaxed">
                {bullets.map((b, i) => (
                    <li key={i} className="flex gap-2.5">
                        <span
                            aria-hidden
                            className="text-spark"
                            style={{ marginTop: '0.05em' }}
                        >
                            ↳
                        </span>
                        <span>{b}</span>
                    </li>
                ))}
            </ul>

            {/* Case-Footer */}
            <div
                className="mt-auto pt-4 border-t"
                style={{ borderColor: 'rgba(201, 184, 163, 0.1)' }}
            >
                {caseHref ? (
                    <a
                        href={caseHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 mono-label text-spark hover:text-lit transition-colors"
                    >
                        {caseDescription}
                        <span aria-hidden>↗</span>
                    </a>
                ) : (
                    <span
                        className="mono-label text-muted"
                        style={{ fontSize: '0.6rem' }}
                    >
                        {caseDescription}
                    </span>
                )}
            </div>
        </article>
    )
}

function EmptyGlobeSlot({ label }: { label: string }) {
    return (
        <div
            className="relative w-full mx-auto flex items-center justify-center"
            style={{
                maxWidth: 240,
                aspectRatio: '1 / 1',
                border: '1px dashed rgba(201, 184, 163, 0.18)',
                borderRadius: '50%',
            }}
            aria-hidden
        >
            <span
                className="mono-label"
                style={{
                    color: 'var(--muted)',
                    fontSize: '0.6rem',
                }}
            >
                {label}
            </span>
        </div>
    )
}
