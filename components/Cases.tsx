import Image from 'next/image'
import LiveFrame from '@/components/LiveFrame'
import Reveal from '@/components/Reveal'
import { CtaButton } from '@/components/ui'

/**
 * Cases — Referenzen als Premium-Showcase.
 *
 * Prinzip: Das Bild verkauft, nicht der Text. Jeder Case ist ein großer
 * Screenshot im Browser-Frame + genau EIN Outcome-Satz + Meta-Zeile.
 * Keine Feature-Listen — wer Details will, klickt auf die Live-Site.
 *
 * Screenshots: public/images/cases/*.webp (1200px, via Playwright + sharp).
 */

export interface CaseItem {
    slug: string
    name: string
    domain?: string
    href?: string
    /** Ein Satz. Ergebnis, nicht Feature. */
    outcome: string
    meta: string
    status: 'live' | 'entwicklung'
}

export const CASES: CaseItem[] = [
    {
        slug: 'printmywall',
        name: 'PrintMyWall',
        domain: 'printmywall.at',
        href: 'https://printmywall.at',
        outcome:
            'Unsere eigene Marke, unser Schaufenster — hier zeigen wir, was wir können, bevor wir es verkaufen.',
        meta: 'eigene marke · direktdruck auf wände',
        status: 'live',
    },
    {
        slug: 'impulsiv',
        name: 'Impulsiv Fitness',
        domain: 'impulsiv-fitness.at',
        href: 'https://impulsiv-fitness.at',
        outcome:
            'Ein 4,9-Sterne-Studio hatte keinen Auftritt auf diesem Niveau. Jetzt schon.',
        meta: 'ems-studio · wien 1210',
        status: 'live',
    },
    {
        slug: 'kfz22',
        name: 'KFZ Technik 22',
        domain: 'kfz22.com',
        href: 'https://kfz22.com',
        outcome:
            'Vorher ohne Website — heute der Meisterbetrieb, den man in der Donaustadt findet.',
        meta: 'kfz-werkstatt · wien 1220',
        status: 'live',
    },
    {
        slug: 'mstyle',
        name: 'MStyle Beauty Lounge',
        domain: 'mstyle.beauty',
        href: 'https://mstyle.beauty',
        outcome:
            'Drei Sprachen, ein Look: Eleganz, die aus Besucherinnen Termine macht.',
        meta: 'beautysalon · wien 1210',
        status: 'live',
    },
    {
        slug: 'safetypro',
        name: 'Safety Pro Electrical',
        domain: 'safetypro-electrical.au',
        href: 'https://safetypro-electrical.au',
        outcome:
            'Vertrauen auf den ersten Blick — Anfragen aus ganz Südost-Melbourne.',
        meta: 'elektriker · melbourne au',
        status: 'live',
    },
]

/**
 * Browser-Fenster-Visual.
 * variant "live": echte Live-Website (skaliertes Desktop-iframe, scrollbar
 * und klickbar) — Mobile zeigt den statischen Hero-Screenshot.
 * variant "static": Hero-Screenshot (Home-Teaser, Paket-Karten) — schnell.
 */
export function CaseVisual({
    slug,
    domain,
    name,
    href,
    priority = false,
    live = false,
}: {
    slug: string
    domain?: string
    name: string
    href?: string
    priority?: boolean
    live?: boolean
}) {
    return (
        <div
            className="overflow-hidden w-full"
            style={{
                borderRadius: '8px',
                border: '1px solid rgba(201, 184, 163, 0.18)',
                background: 'rgba(20, 17, 15, 0.6)',
                boxShadow: '0 24px 60px -24px rgba(0,0,0,0.55)',
            }}
        >
            {/* Browser-Topbar */}
            <div
                className="flex items-center gap-2 px-4"
                style={{
                    height: '2.1rem',
                    borderBottom: '1px solid rgba(201, 184, 163, 0.12)',
                }}
            >
                <span className="flex gap-1.5" aria-hidden>
                    {[0, 1, 2].map(i => (
                        <span
                            key={i}
                            style={{
                                width: 7,
                                height: 7,
                                borderRadius: '50%',
                                background: 'rgba(201,184,163,0.25)',
                            }}
                        />
                    ))}
                </span>
                {domain && (
                    <span
                        className="mono-label text-muted mx-auto"
                        style={{ fontSize: '0.62rem' }}
                    >
                        {domain}
                    </span>
                )}
                {live && (
                    <span
                        className="mono-label text-spark hidden md:inline-flex items-center gap-1.5"
                        style={{ fontSize: '0.62rem' }}
                        aria-hidden
                    >
                        <span
                            className="live-dot"
                            style={{
                                width: 6,
                                height: 6,
                                borderRadius: '50%',
                                background: 'var(--spark)',
                            }}
                        />
                        live
                        <span className="hidden md:inline">
                            · scrollen &amp; klicken
                        </span>
                    </span>
                )}
            </div>

            {live && href ? (
                <div className="relative w-full">
                    {/* Desktop: echte Live-Seite, scroll- & klickbar */}
                    <div
                        className="hidden md:block w-full"
                        style={{ aspectRatio: '8 / 5' }}
                    >
                        <LiveFrame
                            url={href}
                            title={`${name} — Live-Vorschau`}
                            poster={`/images/cases/${slug}.webp`}
                        />
                    </div>
                    {/* Handy: Mobile-Ansicht der Seite als scrollbares Bild —
                        butterweich, 0 iframes (Zakir: mobil scrollbar, ohne
                        das iPhone-Ruckeln echter iframes) */}
                    <div
                        className="md:hidden relative w-full"
                        style={{ aspectRatio: '4 / 5' }}
                    >
                        <div
                            className="case-scroll absolute inset-0 overflow-y-auto"
                            style={{ overscrollBehavior: 'contain' }}
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={`/images/cases/${slug}-mobile.webp`}
                                alt={`Website von ${name} — mobile Ansicht, scrollbar`}
                                width={750}
                                height={3600}
                                loading={priority ? 'eager' : 'lazy'}
                                decoding="async"
                                className="w-full h-auto block"
                            />
                        </div>
                        <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mono-label absolute inline-flex items-center gap-1.5"
                            aria-label={`${name} — Website öffnen`}
                            style={{
                                right: '0.7rem',
                                bottom: '0.7rem',
                                zIndex: 5,
                                background: 'rgba(14, 10, 5, 0.78)',
                                color: 'var(--lit)',
                                border: '1px solid rgba(232, 90, 31, 0.45)',
                                padding: '0.6rem 0.95rem',
                                minHeight: '44px',
                                borderRadius: '3px',
                                letterSpacing: '0.14em',
                            }}
                        >
                            webseite öffnen <span aria-hidden>↗</span>
                        </a>
                    </div>
                </div>
            ) : (
                <div
                    className="relative w-full"
                    style={{ aspectRatio: '8 / 5' }}
                >
                    <Image
                        src={`/images/cases/${slug}.webp`}
                        alt={`Website von ${name}`}
                        fill
                        priority={priority}
                        sizes="(max-width: 768px) 100vw, 60vw"
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.025]"
                    />
                </div>
            )}
        </div>
    )
}

export default function Cases() {
    return (
        <section
            id="cases"
            className="relative w-full container-edge"
            style={{ paddingTop: '11rem', paddingBottom: '7rem' }}
        >
            {/* Sektion-Header */}
            <header className="mb-16 md:mb-24 max-w-3xl">
                <p className="mono-label text-spark mb-4">referenzen</p>
                <h1
                    className="font-display"
                    style={{
                        fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                        color: 'var(--lit)',
                    }}
                >
                    Sieh selbst.
                    <br />
                    <span style={{ color: 'var(--spark)' }}>
                        Alles live im Netz.
                    </span>
                </h1>
                <p
                    className="text-soft mt-6 max-w-xl leading-relaxed"
                    style={{ fontSize: 'clamp(1rem, 1.3vw, 1.1rem)' }}
                >
                    Keine Mockups, keine Screenshots — jedes Fenster hier
                    ist die echte, live eingebettete Website. Scroll und
                    klick direkt hinein.
                </p>
            </header>

            {/* Cases */}
            <div className="space-y-24 md:space-y-36">
                {CASES.map((c, i) => (
                    <CaseBlock key={c.slug} item={c} index={i} />
                ))}

                {/* Slot-Karte — Verknappung */}
                <Reveal>
                    <div
                        className="relative overflow-hidden px-8 py-14 md:px-14 md:py-20"
                        style={{
                            border: '1px solid rgba(232, 90, 31, 0.35)',
                            borderRadius: '8px',
                            background:
                                'radial-gradient(circle at 80% 20%, rgba(232,90,31,0.14) 0%, transparent 55%)',
                        }}
                    >
                        <p className="mono-label text-spark mb-4">
                            freier slot · 2026
                        </p>
                        <h2
                            className="font-display-card mb-5"
                            style={{
                                fontSize: 'clamp(1.9rem, 4vw, 3.25rem)',
                                color: 'var(--lit)',
                                maxWidth: '20ch',
                            }}
                        >
                            Der nächste Screenshot hier ist{' '}
                            <span style={{ color: 'var(--spark)' }}>
                                dein Projekt.
                            </span>
                        </h2>
                        <p
                            className="text-soft mb-8 leading-relaxed"
                            style={{ maxWidth: '44ch' }}
                        >
                            Wir nehmen 2026 noch zwei Projekte an — mehr geht
                            nicht, ohne dass die Qualität leidet.
                        </p>
                        <CtaButton href="/kontakt">
                            projekt anfragen
                        </CtaButton>
                    </div>
                </Reveal>
            </div>
        </section>
    )
}

// ─── Sub-Component ──────────────────────────────────────────────

function CaseBlock({ item, index }: { item: CaseItem; index: number }) {
    const left = index % 2 === 0
    const visual = (
        <CaseVisual
            slug={item.slug}
            domain={item.domain}
            name={item.name}
            href={item.href}
            priority={index === 0}
            live
        />
    )

    const content = (
        <div className="flex flex-col justify-center h-full">
            <div className="flex items-center gap-5 mb-5">
                <span className="mono-label text-spark">
                    {String(index + 1).padStart(2, '0')}
                </span>
                <span
                    className="mono-label"
                    style={{
                        color:
                            item.status === 'live'
                                ? 'var(--soft)'
                                : 'var(--muted)',
                    }}
                >
                    {item.status === 'live' ? 'live' : 'in entwicklung'}
                    {item.href && <span aria-hidden> ↗</span>}
                </span>
            </div>

            <h2
                className="font-display-card mb-4"
                style={{
                    fontSize: 'clamp(1.75rem, 3.4vw, 2.9rem)',
                    color: 'var(--lit)',
                }}
            >
                {item.name}
            </h2>

            <p
                className="text-soft leading-relaxed mb-6"
                style={{
                    fontSize: 'clamp(1rem, 1.35vw, 1.18rem)',
                    maxWidth: '36ch',
                }}
            >
                {item.outcome}
            </p>

            <p className="mono-label text-muted" style={{ fontSize: '0.62rem' }}>
                {item.meta}
            </p>
        </div>
    )

    return (
        <Reveal>
            <article className="group grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
                <div
                    className={
                        left
                            ? 'md:col-span-7'
                            : 'md:col-span-7 md:order-2'
                    }
                >
                    {visual}
                </div>
                <div
                    className={
                        left
                            ? 'md:col-span-5'
                            : 'md:col-span-5 md:order-1'
                    }
                >
                    {item.href ? (
                        <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${item.name} — Website öffnen`}
                            className="block"
                        >
                            {content}
                        </a>
                    ) : (
                        content
                    )}
                </div>
            </article>
        </Reveal>
    )
}
