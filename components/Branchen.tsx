'use client'

import { useState } from 'react'
import { BRANCHEN } from '@/lib/kios'
import { CtaButton } from '@/components/ui'

/**
 * Branchen-Umschalter: eine Branche wählen, drei Fälle lesen.
 * Jeder Fall stellt gegenüber, wo heute Geld oder Zeit verloren geht, und was
 * das System dort übernimmt — samt dem Modul aus dem Schaubild, das es tut.
 * Inhalte in lib/kios.ts. Bedienbar mit Maus, Finger und Tastatur
 * (Pfeiltasten wechseln den Reiter).
 *
 * Alle Felder stehen im HTML, die nicht gewählten mit `hidden`: So lesen
 * Suchmaschinen und KI-Dienste alle Branchen, nicht nur die erste.
 */
export default function Branchen() {
    const [aktiv, setAktiv] = useState(0)

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
                            aria-controls={`branche-feld-${b.slug}`}
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

            {BRANCHEN.map((branche, nr) => (
            <div
                key={branche.slug}
                id={`branche-feld-${branche.slug}`}
                role="tabpanel"
                aria-labelledby={`branche-reiter-${branche.slug}`}
                hidden={nr !== aktiv}
                className="mt-10 md:mt-12"
            >
                <h3 className="sr-only">
                    KI-Betriebssystem für {branche.name}
                </h3>
                <ol className="branche-faelle">
                    {branche.faelle.map((f, i) => (
                        <li
                            key={`${branche.slug}-${i}`}
                            className="branche-fall branche-punkt"
                            style={{ animationDelay: `${i * 80}ms` }}
                        >
                            <div className="branche-fall__kopf">
                                <span className="mono-label text-spark">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <h4 className="font-display-card">{f.thema}</h4>
                            </div>

                            <div className="branche-fall__heute">
                                <p className="mono-label">heute</p>
                                <p>{f.problem}</p>
                            </div>

                            <span className="branche-fall__pfeil" aria-hidden>
                                →
                            </span>

                            <div className="branche-fall__system">
                                <p className="mono-label">mit ihrem ki-os</p>
                                <p>{f.loesung}</p>
                                <span className="branche-fall__modul">
                                    <span aria-hidden />
                                    Modul {f.modul}
                                </span>
                            </div>
                        </li>
                    ))}
                </ol>
                {branche.hinweis && (
                    <p className="branche-hinweis">
                        <span aria-hidden>↳ </span>
                        {branche.hinweis}
                    </p>
                )}
            </div>
            ))}

            <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-6">
                <p
                    className="text-muted"
                    style={{ fontSize: '0.9rem', maxWidth: '56ch' }}
                >
                    Das sind typische Beispiele. Was Ihr System übernimmt, legen
                    wir gemeinsam fest. Ihre Branche ist nicht dabei? Dann
                    sprechen wir darüber.
                </p>
                <CtaButton href="/kontakt">erstgespräch anfragen</CtaButton>
            </div>
        </div>
    )
}
