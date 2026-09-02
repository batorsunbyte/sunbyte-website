import { CASES } from '@/components/Cases'

/**
 * ProofBar — der Beweis-Streifen direkt unter dem Hero.
 *
 * Übernommen von socialbrands.io (Kundenlogo-Leiste an genau dieser Stelle),
 * aber ehrlich gebaut: KEINE fremden Logos (dafür fehlt die schriftliche
 * Freigabe der Kunden), sondern die echten Domains als anklickbare Chips.
 * Jeder Chip ist überprüfbar — das ist stärker als ein Logo, das man auch
 * hinmalen könnte.
 *
 * Bewusst eine Server-Komponente OHNE 'use client' und OHNE <Reveal>:
 * Sie steht damit im ersten CSS-Paint, nicht erst nach dem JavaScript.
 * CASES ist die einzige Wahrheitsquelle — keine zweite Domain-Liste.
 */
export default function ProofBar() {
    const live = CASES.filter(c => c.status === 'live' && c.href)

    return (
        <section
            className="container-edge"
            style={{ borderBottom: '1px solid rgba(201, 184, 163, 0.10)' }}
            aria-label="Referenzen von Sunbyte"
        >
            <div className="py-7 md:py-8">
                <p className="mono-label text-muted mb-4">
                    gebaut und live — jede seite ist anklickbar
                </p>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-2.5">
                    {live.map(c => (
                        <a
                            key={c.slug}
                            href={c.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${c.name} — Website in neuem Tab öffnen`}
                            className="group inline-flex items-center gap-2 transition-colors"
                            style={{
                                border: '1px solid rgba(201, 184, 163, 0.18)',
                                borderRadius: '999px',
                                padding: '0.55rem 0.95rem',
                                minHeight: '2.75rem',
                            }}
                        >
                            <span
                                className="live-dot shrink-0"
                                aria-hidden
                                style={{
                                    width: 5,
                                    height: 5,
                                    borderRadius: '50%',
                                    background: 'var(--spark)',
                                }}
                            />
                            <span
                                className="mono-label text-soft group-hover:text-lit transition-colors"
                                style={{ fontSize: '0.7rem' }}
                            >
                                {c.domain}
                            </span>
                        </a>
                    ))}
                </div>

                <div className="flex flex-wrap items-center gap-x-8 gap-y-2 mt-5">
                    {[
                        'wien · melbourne',
                        'antwort in unter 24 h',
                        'fixpreis vor dem start',
                        'noch 2 slots für 2026',
                    ].map(t => (
                        <span
                            key={t}
                            className="mono-label text-soft"
                            style={{ fontSize: '0.68rem' }}
                        >
                            ↳ {t}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    )
}
