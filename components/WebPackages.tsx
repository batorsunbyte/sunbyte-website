'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { type ReactNode } from 'react'
import Reveal from '@/components/Reveal'
import { CaseVisual } from '@/components/Cases'
import { PRICING } from '@/lib/seo'

const Globe = dynamic(() => import('@/components/Globe'), { ssr: false })

/**
 * Webseiten-Pakete: Standard + Premium.
 *
 * Tier-Mapping (Zakir 2026-06-26):
 *   - Standard = eigenständiges visuelles System (mstyle.beauty-Niveau).
 *   - Premium  = das volle interaktive Erlebnis, voll animierter Globe (wie diese Seite).
 *
 * Visuals: Standard zeigt die echte Kundenseite live (mstyle.beauty) — Premium
 * den voll interaktiven Globe. Perf: 1 Canvas + IO-lazy Live-Frames.
 */
export default function WebPackages() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {/* ─── Standard (= altes Premium) ─── */}
            <Reveal>
                <PackageCard
                    tier="standard"
                    price={PRICING.website.label}
                    promise="Ein eigenständiges, hochwertiges visuelles System — wirkt sofort professionell. Wie mstyle.beauty."
                    bullets={[
                        'Eigenständige Designsprache, kein Template',
                        'Mehrseitige Architektur',
                        'Hochwertige Visuals & Bewegtbild',
                        'Konversions-getriebenes Layout',
                        'Lokale SEO & mehrsprachig optional',
                        'Auch: bestehende Seite modernisieren',
                    ]}
                >
                    <div className="relative mx-auto w-full">
                        <CaseVisual
                            slug="mstyle"
                            domain="mstyle.beauty"
                            name="MStyle Beauty Lounge"
                            href="https://mstyle.beauty"
                            live
                        />
                        <a
                            href="https://mstyle.beauty"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mono-label text-muted hover:text-spark transition-colors mt-3 inline-block"
                            style={{ fontSize: '0.58rem' }}
                        >
                            ↳ mstyle.beauty ↗
                        </a>
                    </div>
                </PackageCard>
            </Reveal>

            {/* ─── Premium (= altes Premium-Premium) ─── */}
            <Reveal delay={100}>
                <PackageCard
                    tier="premium"
                    price={PRICING.websitePremium.label}
                    promise="Das volle Erlebnis — voll interaktiv, mit narrativem Scrollen und Custom-Animationen. Wie diese Seite."
                    accent
                    bullets={[
                        'Alles aus Standard — inklusive',
                        'Voll interaktive Hero-Sektion',
                        'Custom-Animationen & narratives Scrollen',
                        'Signature-Interaktion (wie unser Welt-Globus)',
                        'Performance-Audit ohne Kompromisse',
                    ]}
                >
                    <div
                        className="relative mx-auto w-full"
                        style={{ maxWidth: 220 }}
                    >
                        <Globe
                            autoRotate
                            interactive
                            showInsights
                            showMarker
                            ariaLabel="Premium-Paket: voll interaktiver Welt-Globus"
                        />
                    </div>
                </PackageCard>
            </Reveal>
        </div>
    )
}

// ── Sub-Components ────────────────────────────────────────────

function PackageCard({
    tier,
    price,
    promise,
    bullets,
    children,
    accent = false,
}: {
    tier: string
    price: string
    promise: string
    bullets: string[]
    children: ReactNode
    accent?: boolean
}) {
    return (
        <article
            className="relative flex flex-col h-full"
            style={{
                padding: 'clamp(1.75rem, 3vw, 2.5rem)',
                border: '1px solid rgba(201, 184, 163, 0.16)',
                borderRadius: '6px',
                background: accent
                    ? 'radial-gradient(circle at 80% 10%, rgba(232,90,31,0.10) 0%, transparent 55%)'
                    : 'transparent',
            }}
        >
            <div className="flex items-center justify-between mb-6">
                <span className="mono-label text-spark">{tier}</span>
                <span
                    className="mono-label text-lit"
                    style={{ fontSize: '0.72rem' }}
                >
                    {price}
                </span>
            </div>

            <p
                className="text-soft leading-snug mb-8"
                style={{
                    fontSize: 'clamp(1rem, 1.3vw, 1.15rem)',
                    color: 'var(--lit)',
                    maxWidth: '32ch',
                }}
            >
                {promise}
            </p>

            <div
                className="mb-8 flex items-center justify-center"
                style={{ minHeight: 220 }}
            >
                {children}
            </div>

            <ul className="space-y-2.5 text-soft text-sm leading-relaxed mt-auto">
                {bullets.map((b, i) => (
                    <li key={i} className="flex gap-2.5">
                        <span aria-hidden className="text-spark">
                            ↳
                        </span>
                        <span>{b}</span>
                    </li>
                ))}
            </ul>

            <Link
                href="/kontakt"
                className="mt-7 inline-flex items-center gap-2 font-mono transition-all hover:gap-3"
                style={{
                    alignSelf: 'flex-start',
                    color: accent ? 'var(--bg)' : 'var(--spark)',
                    background: accent ? 'var(--spark)' : 'transparent',
                    border: accent
                        ? '1px solid var(--spark)'
                        : '1px solid rgba(201, 184, 163, 0.3)',
                    padding: '0.75rem 1.3rem',
                    borderRadius: '3px',
                    fontSize: '0.66rem',
                    letterSpacing: '0.16em',
                }}
            >
                {tier} anfragen <span aria-hidden>→</span>
            </Link>
        </article>
    )
}
