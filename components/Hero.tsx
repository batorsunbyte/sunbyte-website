'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import {
    CONTINENT_DATA,
    DEFAULT_INFO,
    DEFAULT_INFO_TOUCH,
    type ContinentKey,
    type ContinentInfo,
} from '@/lib/globe-data'

/**
 * Globe lazy laden (Code-Split):
 *   - Spart First-Load JS auf Routen ohne Hero (nicht relevant für /, aber prinzipiell sauber).
 *   - SSR off, weil Globe Canvas + Browser-APIs braucht.
 */
const Globe = dynamic(() => import('@/components/Globe'), {
    ssr: false,
    loading: () => (
        <div
            className="relative mx-auto w-full"
            style={{ aspectRatio: '1 / 1', maxWidth: 560 }}
            aria-hidden
        >
            <div className="globe-halo" style={{ opacity: 0.4 }} />
        </div>
    ),
})

export default function Hero() {
    const [active, setActive] = useState<ContinentKey | null>(null)
    const [isTouch, setIsTouch] = useState(false)

    useEffect(() => {
        const m = window.matchMedia('(hover: hover) and (pointer: fine)')
        setIsTouch(!m.matches)
    }, [])

    const defaultInfo: ContinentInfo = isTouch ? DEFAULT_INFO_TOUCH : DEFAULT_INFO
    const info: ContinentInfo = active ? CONTINENT_DATA[active] : defaultInfo

    const hintText = isTouch
        ? '↻ ziehen zum drehen · tippen auf einen kontinent'
        : '↻ ziehen zum drehen · klick auf einen kontinent'

    return (
        <section
            id="hero"
            className="relative w-full overflow-hidden"
            style={{ minHeight: '100svh', isolation: 'isolate' }}
        >
            {/* Top Nav */}
            <nav
                className="absolute left-0 right-0 top-0 z-[5] flex items-center justify-between"
                style={{ padding: '1.6rem 6vw' }}
            >
                <a
                    href="#hero"
                    aria-label="Sunbyte — Startseite"
                    className="font-display hover:text-spark transition-colors"
                    style={{
                        fontSize: 'clamp(1.05rem, 1.4vw, 1.25rem)',
                        color: 'var(--lit)',
                        letterSpacing: '-0.01em',
                        lineHeight: 1,
                    }}
                >
                    Sunbyte
                </a>
                <span
                    className="font-mono text-soft hidden md:flex gap-6"
                    style={{ fontSize: '0.66rem' }}
                >
                    <a href="#leistungen" className="hover:text-lit transition-colors">
                        leistungen
                    </a>
                    <a href="#cases" className="hover:text-lit transition-colors">
                        cases
                    </a>
                    <a href="#studio" className="hover:text-lit transition-colors">
                        studio
                    </a>
                    <a href="#kontakt" className="hover:text-lit transition-colors">
                        kontakt
                    </a>
                </span>
            </nav>

            {/* Kicker */}
            <div
                className="absolute z-[5] mono-label text-spark"
                style={{ top: '5.4rem', left: '6vw' }}
            >
                wiener studio · inhabergeführt seit 2026
            </div>

            {/* Spine (desktop only) */}
            <div className="spine font-mono hidden md:block">
                light / spark — est. 2026
            </div>

            {/* === Hero Grid === */}
            <div
                className="
                    relative z-[3] grid items-center
                    md:grid-cols-2 grid-cols-1
                    gap-10 md:gap-0
                    pt-28 md:pt-0 pb-16 md:pb-0
                    md:min-h-screen
                "
            >
                {/* COL-LEFT: Info-Panel + Headline + Sub */}
                <div
                    className="
                        order-2 md:order-1
                        flex flex-col justify-center gap-9
                        px-[6vw]
                        z-[3]
                    "
                >
                    {/* Info-Panel (zeigt Kontinent-Texte) */}
                    <div
                        className="info-panel hero-reveal"
                        style={{ opacity: 1 }}
                        aria-live="polite"
                    >
                        <div
                            className="mono-label text-spark mb-2"
                            style={{ fontSize: '0.66rem' }}
                        >
                            {info.n}
                        </div>
                        <div
                            className="text-soft leading-relaxed max-w-[34ch]"
                            style={{
                                fontSize: 'clamp(0.95rem, 1.4vw, 1.12rem)',
                            }}
                        >
                            {info.t}
                        </div>
                    </div>

                    {/* Headline (FIX: nicht ändern) */}
                    <h1
                        className="font-display hero-reveal-2"
                        style={{
                            fontSize: 'clamp(3rem, 9.5vw, 7rem)',
                            color: 'var(--lit)',
                        }}
                    >
                        Zeig der Welt,
                        <br />
                        <span style={{ color: 'var(--spark)' }}>
                            wie stark du bist.
                        </span>
                    </h1>

                    {/* Sub (FIX: nicht ändern) */}
                    <p
                        className="text-soft max-w-[42ch] leading-relaxed hero-reveal-3"
                        style={{ fontSize: 'clamp(0.95rem, 1.3vw, 1.1rem)' }}
                    >
                        Eine Website, die deine Identität verstärkt — und in
                        Sekunden überzeugt.
                    </p>
                </div>

                {/* COL-RIGHT: Investitions-Zeile + Globe + Hint */}
                <div
                    className="
                        order-1 md:order-2
                        relative flex flex-col items-center justify-center
                        gap-6
                        px-[6vw] md:px-[2vw]
                        z-[1]
                    "
                >
                    {/* Investitions-Zeile (über Globe) */}
                    <p
                        className="text-center text-soft max-w-[30ch] leading-relaxed font-normal hero-reveal"
                        style={{ fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)' }}
                    >
                        <b
                            className="text-lit font-medium"
                            style={{ fontWeight: 500 }}
                        >
                            Deine Website ist die Investition mit dem höchsten Hebel.
                        </b>{' '}
                        Sie verkauft und baut Vertrauen — rund um die Uhr,
                        weltweit.
                    </p>

                    {/* Globe — voll interaktiv */}
                    <div
                        className="relative hero-reveal-2"
                        style={{
                            width: 'clamp(260px, 40vw, 560px)',
                        }}
                    >
                        <div className="globe-halo" aria-hidden />
                        <Globe
                            autoRotate
                            interactive
                            showInsights
                            showMarker
                            onContinentChange={setActive}
                            ariaLabel="Sunbyte Welt-Globus — drehen und Kontinent anklicken für Insights"
                        />
                    </div>

                    {/* Hint unter Globe */}
                    <p
                        className="mono-label text-muted text-center hero-reveal-3"
                        style={{ fontSize: '0.62rem' }}
                    >
                        {hintText}
                    </p>
                </div>
            </div>

            {/* Marquee unten */}
            <div className="marquee absolute left-0 right-0 bottom-0 z-[5]">
                <div className="marquee-track">
                    {Array.from({ length: 2 }).map((_, i) => (
                        <span key={i} style={{ display: 'inline-flex' }}>
                            <span>
                                kfz22 <i>↗</i>
                            </span>
                            <span>
                                printmywall <i>↗</i>
                            </span>
                            <span>
                                mehr kommt <i>↗</i>
                            </span>
                        </span>
                    ))}
                </div>
            </div>

            {/* Overlays */}
            <div className="grain" aria-hidden />
            <div className="vignette" aria-hidden />
            <div className="curtain" aria-hidden />
        </section>
    )
}
