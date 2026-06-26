import Reveal from '@/components/Reveal'

/**
 * Team — zwei Kompetenz-Karten. Zakir als Gesicht/Gründer, sein Bruder per
 * Rolle (kein Name, Zakirs Entscheidung). Bewusst ohne Avatare, damit die
 * Karten symmetrisch wirken und die Kompetenz im Vordergrund steht.
 */

interface Member {
    kicker: string
    title: string
    stat: string
    tags: string[]
    line: string
    accent?: boolean
}

const TEAM: Member[] = [
    {
        kicker: 'gründer',
        title: 'Zakir Daryabi',
        stat: '6+ Jahre · IT & KI',
        tags: ['Webdesign', 'Frontend', 'KI', 'UX'],
        line: 'Entwickler und Designer in einem. Verantwortlich für Gestaltung, Umsetzung — und den direkten Draht zu dir.',
        accent: true,
    },
    {
        kicker: 'im team',
        title: 'KI- & IT-Senior',
        stat: '15+ Jahre · IT',
        tags: ['KI', 'Architektur', 'Backend', 'Systeme'],
        line: 'Mein Bruder — über 15 Jahre IT-Erfahrung, spezialisiert auf Künstliche Intelligenz. Die technische Tiefe hinter Sunbyte.',
    },
]

export default function TeamBlock() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {TEAM.map((m, i) => (
                <Reveal
                    key={i}
                    delay={i * 100}
                    className="relative flex flex-col h-full"
                    style={{
                        padding: 'clamp(1.75rem, 3vw, 2.5rem)',
                        border: '1px solid rgba(201, 184, 163, 0.16)',
                        borderRadius: '6px',
                        background: m.accent
                            ? 'radial-gradient(circle at 82% 10%, rgba(232,90,31,0.10) 0%, transparent 55%)'
                            : 'transparent',
                    }}
                >
                    <div className="flex items-center justify-between mb-6">
                        <span className="mono-label text-spark">{m.kicker}</span>
                        <span
                            className="mono-label text-muted"
                            style={{ fontSize: '0.62rem' }}
                        >
                            {m.stat}
                        </span>
                    </div>

                    <h3
                        className="font-display mb-4"
                        style={{
                            fontSize: 'clamp(1.6rem, 2.8vw, 2.25rem)',
                            color: 'var(--lit)',
                            lineHeight: 1.05,
                        }}
                    >
                        {m.title}
                    </h3>

                    <p
                        className="text-soft leading-relaxed mb-7"
                        style={{ fontSize: 'clamp(0.95rem, 1.2vw, 1.05rem)' }}
                    >
                        {m.line}
                    </p>

                    <ul className="flex flex-wrap gap-2 mt-auto">
                        {m.tags.map(t => (
                            <li
                                key={t}
                                className="mono-label text-soft"
                                style={{
                                    fontSize: '0.58rem',
                                    border: '1px solid rgba(201, 184, 163, 0.2)',
                                    borderRadius: '3px',
                                    padding: '0.35rem 0.6rem',
                                }}
                            >
                                {t}
                            </li>
                        ))}
                    </ul>
                </Reveal>
            ))}
        </div>
    )
}
