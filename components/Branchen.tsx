'use client'

import { useState } from 'react'
import { BRANCHEN } from '@/lib/kios'

/**
 * Branchen-Umschalter: eine Branche wählen, vier Beispiele lesen.
 * Die Beispiele stehen in lib/kios.ts und sind als Beispiele gekennzeichnet.
 * Bedienbar mit Maus, Finger und Tastatur (Pfeiltasten wechseln den Reiter).
 */
export default function Branchen() {
    const [aktiv, setAktiv] = useState(0)
    const branche = BRANCHEN[aktiv]

    const mitTaste = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
        e.preventDefault()
        const schritt = e.key === 'ArrowRight' ? 1 : -1
        const neu = (aktiv + schritt + BRANCHEN.length) % BRANCHEN.length
        setAktiv(neu)
        document.getElementById(`branche-reiter-${BRANCHEN[neu].slug}`)?.focus()
    }

    return (
        <div>
            <div role="tablist" aria-label="Branche wählen" className="flex flex-wrap gap-2.5">
                {BRANCHEN.map((b, i) => {
                    const an = i === aktiv
                    return (
                        <button
                            key={b.slug}
                            id={`branche-reiter-${b.slug}`}
                            type="button"
                            role="tab"
                            aria-selected={an}
                            aria-controls="branche-feld"
                            tabIndex={an ? 0 : -1}
                            onClick={() => setAktiv(i)}
                            onKeyDown={mitTaste}
                            className="font-mono transition-colors"
                            style={{
                                padding: '0.75rem 1.15rem',
                                minHeight: '2.75rem',
                                borderRadius: '3px',
                                fontSize: '0.74rem',
                                letterSpacing: '0.12em',
                                textTransform: 'lowercase',
                                border: an
                                    ? '1px solid var(--spark)'
                                    : '1px solid rgba(201, 184, 163, 0.25)',
                                background: an ? 'var(--spark)' : 'transparent',
                                color: an ? 'var(--bg)' : 'var(--soft)',
                            }}
                        >
                            {b.name}
                        </button>
                    )
                })}
            </div>

            <div
                id="branche-feld"
                role="tabpanel"
                aria-labelledby={`branche-reiter-${branche.slug}`}
                className="mt-10 md:mt-12"
            >
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-7">
                    {branche.beispiele.map((b, i) => (
                        <li
                            key={`${branche.slug}-${i}`}
                            className="branche-punkt"
                            style={{
                                borderTop: '1px solid rgba(232, 90, 31, 0.35)',
                                paddingTop: '1.2rem',
                                animationDelay: `${i * 70}ms`,
                            }}
                        >
                            <span className="mono-label text-spark">
                                {String(i + 1).padStart(2, '0')}
                            </span>
                            <p
                                className="mt-2.5"
                                style={{
                                    color: 'var(--lit)',
                                    fontSize: 'clamp(1.05rem, 1.5vw, 1.25rem)',
                                    lineHeight: 1.4,
                                    maxWidth: '36ch',
                                }}
                            >
                                {b}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>

            <p
                className="text-muted mt-10"
                style={{ fontSize: '0.9rem', maxWidth: '52ch' }}
            >
                Das sind Beispiele. Was Ihr System übernimmt, legen wir gemeinsam
                fest. Ihre Branche ist nicht dabei? Dann sprechen wir darüber.
            </p>
        </div>
    )
}
