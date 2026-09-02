import Link from 'next/link'
import Reveal from '@/components/Reveal'
import { PRICING } from '@/lib/seo'

/**
 * Die zwei Dienste als Teaser-Karten (Home).
 * KI-Sichtbarkeit bekommt den Akzent-Glow — der Differenzierer.
 */

interface Service {
    href: string
    tier: string
    name: string
    price: string
    promise: string
    bullets: string[]
    /** Sprechender Link-Text — Keyword-Signal statt 'mehr erfahren' */
    cta: string
    accent?: boolean
}

const SERVICES: Service[] = [
    {
        href: '/webseiten',
        tier: '01',
        name: 'Webseiten',
        price: PRICING.website.label,
        promise: 'Neu bauen oder bestehende Seite auf Premium heben.',
        bullets: [
            'Eigenständiges Design, kein Template',
            'Mobile-first, schnell, SEO-sauber',
            'Pakete: Standard & Premium',
        ],
        cta: 'webseite erstellen lassen',
    },
    {
        href: '/ki-sichtbarkeit',
        tier: '02',
        name: 'KI-Sichtbarkeit',
        price: PRICING.aiVisibility.label,
        promise:
            'Damit ChatGPT & Co. dein Unternehmen kennen — und weiterempfehlen.',
        bullets: [
            'Analyse: Wirst du von KI genannt?',
            'Strukturierte Daten, die LLMs lesen',
            'Präsenz in den Quellen, die KI nutzt',
        ],
        cta: "ki-sichtbarkeit — so funktioniert's",
        accent: true,
    },
]

export default function ServiceTeaserCards() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7">
            {SERVICES.map((s, i) => (
                <Reveal key={s.href} delay={i * 90}>
                    <Link
                        href={s.href}
                        className="group relative flex flex-col h-full transition-all duration-300"
                        style={{
                            padding: 'clamp(1.75rem, 3vw, 2.5rem)',
                            border: '1px solid rgba(201, 184, 163, 0.16)',
                            borderRadius: '6px',
                            background: s.accent
                                ? 'radial-gradient(circle at 80% 12%, rgba(232,90,31,0.10) 0%, transparent 55%)'
                                : 'transparent',
                        }}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <span className="mono-label text-spark">
                                {s.tier}
                            </span>
                            <span
                                className="mono-label text-lit"
                                style={{ fontSize: '0.72rem' }}
                            >
                                {s.price}
                            </span>
                        </div>

                        <h3
                            className="font-display-card mb-3"
                            style={{
                                fontSize: 'clamp(1.9rem, 3.2vw, 2.6rem)',
                                color: 'var(--lit)',
                            }}
                        >
                            {s.name}
                        </h3>

                        <p
                            className="text-soft leading-snug mb-7"
                            style={{
                                fontSize: 'clamp(0.98rem, 1.2vw, 1.12rem)',
                                maxWidth: '34ch',
                            }}
                        >
                            {s.promise}
                        </p>

                        <ul className="space-y-2.5 mb-9 text-soft text-[0.95rem] leading-relaxed">
                            {s.bullets.map((b, j) => (
                                <li key={j} className="flex gap-2.5">
                                    <span aria-hidden className="text-spark">
                                        ↳
                                    </span>
                                    <span>{b}</span>
                                </li>
                            ))}
                        </ul>

                        <span
                            className="mt-auto inline-flex items-center gap-2 mono-label text-spark group-hover:gap-3 transition-all"
                            style={{ fontSize: '0.7rem' }}
                        >
                            {s.cta} <span aria-hidden>→</span>
                        </span>
                    </Link>
                </Reveal>
            ))}
        </div>
    )
}
