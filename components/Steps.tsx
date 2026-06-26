import Reveal from '@/components/Reveal'

/**
 * Ablauf-Schritte — nummerierte Prozess-Liste. Wiederverwendet auf den
 * Service-Seiten (Webseiten & KI-Sichtbarkeit).
 */
export interface Step {
    title: string
    text: string
}

export default function Steps({ steps }: { steps: Step[] }) {
    return (
        <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px"
            style={{ background: 'rgba(201, 184, 163, 0.12)' }}
        >
            {steps.map((s, i) => (
                <Reveal
                    key={i}
                    as="li"
                    delay={i * 80}
                    style={{ background: 'var(--bg)' }}
                    className="flex flex-col p-6 md:p-7"
                >
                    <span
                        className="mono-label text-spark mb-5"
                        style={{ fontSize: '0.7rem' }}
                    >
                        {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3
                        className="font-display mb-3"
                        style={{
                            fontSize: 'clamp(1.15rem, 1.6vw, 1.4rem)',
                            color: 'var(--lit)',
                            lineHeight: 1.05,
                        }}
                    >
                        {s.title}
                    </h3>
                    <p
                        className="text-soft leading-relaxed"
                        style={{ fontSize: 'clamp(0.9rem, 1.1vw, 0.98rem)' }}
                    >
                        {s.text}
                    </p>
                </Reveal>
            ))}
        </ol>
    )
}
