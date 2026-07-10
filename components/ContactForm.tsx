'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Kontaktformular — funktioniert auf statischem Export (GitHub Pages) ohne
 * Backend via Web3Forms (POST an deren API, sie schicken dir die Anfrage per
 * Mail). Senkt die Anfrage-Hürde massiv gegenüber „nur E-Mail/Telefon".
 *
 * SLOT (Zakir): kostenlosen Access-Key auf https://web3forms.com holen (2 Min,
 * nur E-Mail nötig) und unten eintragen. Bis dahin landet nichts in deinem
 * Postfach — die direkten Kanäle (Mail/Tel/WhatsApp) funktionieren aber sofort.
 */
const WEB3FORMS_ACCESS_KEY = 'DEIN-WEB3FORMS-ACCESS-KEY'

const inputBase: React.CSSProperties = {
    width: '100%',
    background: 'rgba(20, 17, 15, 0.6)',
    border: '1px solid rgba(201, 184, 163, 0.22)',
    borderRadius: '4px',
    color: 'var(--lit)',
    padding: '0.85rem 1rem',
    fontSize: '0.95rem',
    outline: 'none',
}

const labelCls = 'mono-label text-muted'

export default function ContactForm() {
    const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'err'>(
        'idle',
    )
    const okRef = useRef<HTMLDivElement>(null)

    // Fokus auf die Erfolgsmeldung setzen (A11y: Statuswechsel ansagen)
    useEffect(() => {
        if (status === 'ok') okRef.current?.focus()
    }, [status])

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        // Ohne echten Key NICHT an den US-Dienst senden (kein Datenabfluss).
        if (WEB3FORMS_ACCESS_KEY === 'DEIN-WEB3FORMS-ACCESS-KEY') {
            setStatus('err')
            return
        }
        setStatus('sending')
        const form = e.currentTarget
        const data = new FormData(form)
        data.append('access_key', WEB3FORMS_ACCESS_KEY)
        data.append('subject', 'Neue Anfrage über sunbyte.at')
        data.append('from_name', 'Sunbyte Website')

        try {
            const res = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: data,
            })
            const json = await res.json()
            if (json.success) {
                setStatus('ok')
                form.reset()
            } else {
                setStatus('err')
            }
        } catch {
            setStatus('err')
        }
    }

    if (status === 'ok') {
        return (
            <div
                ref={okRef}
                role="status"
                aria-live="polite"
                tabIndex={-1}
                style={{
                    border: '1px solid rgba(232,90,31,0.35)',
                    borderRadius: '6px',
                    padding: 'clamp(1.75rem, 3vw, 2.5rem)',
                    background:
                        'radial-gradient(circle at 80% 12%, rgba(232,90,31,0.10) 0%, transparent 60%)',
                }}
            >
                <p className="mono-label text-spark mb-3">↳ angekommen</p>
                <p
                    className="font-display"
                    style={{
                        fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                        color: 'var(--lit)',
                        lineHeight: 1.1,
                    }}
                >
                    Danke — ich melde mich.
                </p>
                <p className="text-soft mt-3" style={{ fontSize: '0.95rem' }}>
                    Antwort meist innerhalb von 24 Stunden. Eilig? Ruf an oder
                    schreib auf WhatsApp.
                </p>
            </div>
        )
    }

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
            {/* Honeypot gegen Bots */}
            <input
                type="checkbox"
                name="botcheck"
                tabIndex={-1}
                aria-hidden
                style={{ display: 'none' }}
            />

            <div>
                <label htmlFor="cf-name" className={labelCls}>
                    name
                </label>
                <input
                    id="cf-name"
                    name="name"
                    required
                    autoComplete="name"
                    className="mt-2 focus:border-spark"
                    style={inputBase}
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="cf-email" className={labelCls}>
                        e-mail
                    </label>
                    <input
                        id="cf-email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        className="mt-2 focus:border-spark"
                        style={inputBase}
                    />
                </div>
                <div>
                    <label htmlFor="cf-service" className={labelCls}>
                        worum geht&apos;s
                    </label>
                    <select
                        id="cf-service"
                        name="interesse"
                        defaultValue="Webseite"
                        className="mt-2 focus:border-spark"
                        style={inputBase}
                    >
                        <option>Webseite</option>
                        <option>KI-Sichtbarkeit</option>
                        <option>Beides</option>
                        <option>Etwas anderes</option>
                    </select>
                </div>
            </div>

            <div>
                <label htmlFor="cf-msg" className={labelCls}>
                    nachricht
                </label>
                <textarea
                    id="cf-msg"
                    name="message"
                    required
                    rows={5}
                    placeholder="Erzähl kurz von deinem Vorhaben …"
                    className="mt-2 focus:border-spark"
                    style={{ ...inputBase, resize: 'vertical' }}
                />
            </div>

            <button
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex items-center justify-center gap-2 font-mono transition-opacity hover:opacity-90 disabled:opacity-60"
                style={{
                    background: 'var(--spark)',
                    color: 'var(--bg)',
                    padding: '0.95rem 1.6rem',
                    borderRadius: '4px',
                    fontSize: '0.72rem',
                    letterSpacing: '0.14em',
                    marginTop: '0.25rem',
                }}
            >
                {status === 'sending' ? 'sende …' : 'anfrage senden →'}
            </button>

            {status === 'err' && (
                <p
                    role="alert"
                    className="text-soft"
                    style={{ fontSize: '0.85rem' }}
                >
                    Hat nicht geklappt — bitte direkt per{' '}
                    <a
                        href="mailto:hallo@sunbyte.at"
                        className="text-spark hover:text-lit transition-colors"
                    >
                        E-Mail
                    </a>{' '}
                    melden.
                </p>
            )}

            <p
                className="mono-label text-muted"
                style={{ fontSize: '0.58rem' }}
            >
                ↳ erstgespräch gratis &amp; unverbindlich · deine daten nur
                für deine anfrage
            </p>
        </form>
    )
}
