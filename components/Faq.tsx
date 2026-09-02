import Reveal from '@/components/Reveal'

/**
 * FAQ — native <details>/<summary> (kein JS, voll zugänglich).
 * Dieselben Items werden auf der Seite zusätzlich als FAQPage-JSON-LD
 * ausgegeben (siehe lib/seo faqLd) — KI-Sichtbarkeit am eigenen Beispiel.
 */
export interface FaqItem {
    q: string
    a: string
}

export default function Faq({ items }: { items: FaqItem[] }) {
    return (
        <div className="flex flex-col">
            {items.map((it, i) => (
                <Reveal key={i} delay={i * 50}>
                    <details
                        className="group"
                        style={{
                            borderTop: '1px solid rgba(201, 184, 163, 0.12)',
                        }}
                    >
                        <summary
                            className="flex items-center justify-between gap-6 cursor-pointer list-none py-6 hover:text-lit transition-colors"
                            style={{ color: 'var(--lit)' }}
                        >
                            <span
                                className="font-display"
                                style={{
                                    fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)',
                                    lineHeight: 1.2,
                                }}
                            >
                                {it.q}
                            </span>
                            <span
                                aria-hidden
                                className="text-spark shrink-0 transition-transform duration-300 group-open:rotate-45"
                                style={{ fontSize: '1.5rem', lineHeight: 1 }}
                            >
                                +
                            </span>
                        </summary>
                        <p
                            className="text-soft leading-relaxed pb-6 pr-10"
                            style={{
                                fontSize: 'clamp(1rem, 1.2vw, 1.05rem)',
                                maxWidth: '60ch',
                            }}
                        >
                            {it.a}
                        </p>
                    </details>
                </Reveal>
            ))}
        </div>
    )
}
