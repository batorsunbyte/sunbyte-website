import Link from 'next/link'
import type { ReactNode } from 'react'
import Reveal from '@/components/Reveal'

/**
 * Geteilte UI-Primitive — halten alle Seiten visuell konsistent
 * (gleiche Typo-Hierarchie, gleiche CTA-Sprache, gleiche Rhythmik).
 */

/** Akzent-Span für den zweiten Teil einer Headline */
export function Spark({ children }: { children: ReactNode }) {
    return <span style={{ color: 'var(--spark)' }}>{children}</span>
}

/** Sektion-Kopf: nummeriertes Mono-Label + große Display-Headline + Sub */
export function SectionHeader({
    kicker,
    title,
    sub,
    className = '',
    maxWidth = '48rem',
}: {
    kicker: string
    title: ReactNode
    sub?: ReactNode
    className?: string
    maxWidth?: string
}) {
    return (
        <header className={className} style={{ maxWidth }}>
            <Reveal as="p" className="mono-label text-spark mb-4">
                {kicker}
            </Reveal>
            <Reveal
                as="h2"
                delay={60}
                className="font-display"
                style={{
                    fontSize: 'clamp(2.25rem, 5.5vw, 4.5rem)',
                    color: 'var(--lit)',
                }}
            >
                {title}
            </Reveal>
            {sub && (
                <Reveal
                    as="p"
                    delay={120}
                    className="text-soft mt-6 leading-relaxed"
                    style={{
                        fontSize: 'clamp(1rem, 1.3vw, 1.1rem)',
                        maxWidth: '36rem',
                    }}
                >
                    {sub}
                </Reveal>
            )}
        </header>
    )
}

/** Primärer / sekundärer CTA-Button (intern oder mailto) */
export function CtaButton({
    href,
    children,
    variant = 'primary',
    external = false,
}: {
    href: string
    children: ReactNode
    variant?: 'primary' | 'ghost'
    external?: boolean
}) {
    const base =
        'inline-flex items-center gap-2 font-mono transition-all duration-300'
    const style: React.CSSProperties =
        variant === 'primary'
            ? {
                  background: 'var(--spark)',
                  color: 'var(--bg)',
                  padding: '0.85rem 1.6rem',
                  borderRadius: '3px',
                  fontSize: '0.7rem',
                  letterSpacing: '0.16em',
              }
            : {
                  border: '1px solid rgba(201, 184, 163, 0.3)',
                  color: 'var(--lit)',
                  padding: '0.85rem 1.6rem',
                  borderRadius: '3px',
                  fontSize: '0.7rem',
                  letterSpacing: '0.16em',
              }
    const cls =
        variant === 'primary'
            ? `${base} hover:opacity-90`
            : `${base} hover:border-spark hover:text-spark`

    if (external) {
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={cls}
                style={style}
            >
                {children}
                <span aria-hidden>↗</span>
            </a>
        )
    }
    return (
        <Link href={href} className={cls} style={style}>
            {children}
            <span aria-hidden>→</span>
        </Link>
    )
}

/** CTA-Band für Unterseiten — verweist auf /kontakt */
export function CtaBand({
    headline,
    sub,
    primaryLabel = 'projekt anfragen',
}: {
    headline: ReactNode
    sub?: ReactNode
    primaryLabel?: string
}) {
    return (
        <section className="container-edge section-pad">
            <div
                className="relative overflow-hidden"
                style={{
                    border: '1px solid rgba(201, 184, 163, 0.16)',
                    borderRadius: '6px',
                    padding: 'clamp(2.5rem, 6vw, 5rem)',
                    background:
                        'radial-gradient(circle at 78% 18%, rgba(232,90,31,0.10) 0%, transparent 58%)',
                }}
            >
                <Reveal
                    as="h2"
                    className="font-display"
                    style={{
                        fontSize: 'clamp(2rem, 5vw, 3.75rem)',
                        color: 'var(--lit)',
                        maxWidth: '18ch',
                    }}
                >
                    {headline}
                </Reveal>
                {sub && (
                    <Reveal
                        as="p"
                        delay={80}
                        className="text-soft mt-5 leading-relaxed"
                        style={{
                            fontSize: 'clamp(1rem, 1.3vw, 1.1rem)',
                            maxWidth: '46ch',
                        }}
                    >
                        {sub}
                    </Reveal>
                )}
                <Reveal delay={140} className="mt-9 flex flex-wrap gap-4">
                    <CtaButton href="/kontakt">{primaryLabel}</CtaButton>
                    <CtaButton
                        href="mailto:office@sunbyte.at"
                        variant="ghost"
                        external
                    >
                        office@sunbyte.at
                    </CtaButton>
                </Reveal>
                <Reveal
                    as="p"
                    delay={200}
                    className="mono-label text-soft mt-5"
                    style={{
                        fontSize: '0.72rem',
                        lineHeight: 1.9,
                        maxWidth: '52ch',
                    }}
                >
                    ↳ erstgespräch gratis &amp; unverbindlich · fixpreis vor
                    dem start · du redest mit dem, der baut
                </Reveal>
            </div>
        </section>
    )
}
