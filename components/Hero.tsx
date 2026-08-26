'use client'

import Link from 'next/link'
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
                        order-1
                        flex flex-col justify-center gap-7 md:gap-9
                        px-[6vw]
                        z-[3]
                    "
                >
                    {/* Kicker */}
                    <p className="mono-label text-spark hero-reveal -mb-2">
                        it-dienstleister · wien · seit 2026
                    </p>

                    {/* Info-Panel (zeigt Kontinent-Texte) */}
                    <div
                        className="info-panel hero-reveal hidden md:block"
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

                    {/* Headline */}
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

                    {/* Sub */}
                    <p
                        className="text-soft max-w-[40ch] leading-relaxed hero-reveal-3"
                        style={{ fontSize: 'clamp(0.95rem, 1.3vw, 1.1rem)' }}
                    >
                        Premium-Webauftritte und KI-Sichtbarkeit aus Wien.
                        Damit dich Kunden finden — und die KI dich empfiehlt.
                    </p>

                    {/* CTA-Zeile — Conversion im ersten Viewport */}
                    <div className="flex flex-wrap items-center gap-4 hero-reveal-3">
                        <Link
                            href="/kontakt"
                            className="inline-flex items-center gap-2 font-mono transition-all duration-300 hover:opacity-90"
                            style={{
                                background: 'var(--spark)',
                                color: 'var(--bg)',
                                padding: '0.9rem 1.7rem',
                                borderRadius: '3px',
                                fontSize: '0.7rem',
                                letterSpacing: '0.16em',
                            }}
                        >
                            projekt anfragen <span aria-hidden>→</span>
                        </Link>
                        <Link
                            href="/arbeiten"
                            className="inline-flex items-center gap-2 font-mono transition-all duration-300 hover:border-spark hover:text-spark"
                            style={{
                                border: '1px solid rgba(201, 184, 163, 0.3)',
                                color: 'var(--lit)',
                                padding: '0.9rem 1.7rem',
                                borderRadius: '3px',
                                fontSize: '0.7rem',
                                letterSpacing: '0.16em',
                            }}
                        >
                            referenzen ansehen <span aria-hidden>→</span>
                        </Link>
                    </div>
                </div>

                {/* COL-RIGHT: Investitions-Zeile + Globe + Hint */}
                <div
                    className="
                        order-2
                        relative flex flex-col items-center justify-center
                        gap-6
                        px-[6vw] md:px-[2vw]
                        z-[1]
                    "
                >
                    {/* Investitions-Zeile (über Globe) */}
                    <p
                        className="text-center text-soft max-w-[30ch] leading-relaxed font-normal hero-reveal hidden md:block"
                        style={{ fontSize: 'clamp(0.9rem, 1.3vw, 1.05rem)' }}
                    >
                        <b
                            className="text-lit font-medium"
                            style={{ fontWeight: 500 }}
                        >
                            Dein Auftritt ist die Investition mit dem höchsten
                            Hebel.
                        </b>{' '}
                        Er verkauft und baut Vertrauen — rund um die Uhr,
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
                                mstyle beauty <i>↗</i>
                            </span>
                            <span>
                                impulsiv fitness <i>↗</i>
                            </span>
                            <span>
                                safety pro <i>↗</i>
                            </span>
                            <span>
                                printmywall <i>↗</i>
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
