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
 *
 * Solange der Schlüssel fehlt (26.11.2026): Das Formular geht nicht ins Leere,
 * sondern öffnet das E-Mail-Programm des Besuchers mit der fertigen Nachricht
 * und bietet dieselbe Nachricht für WhatsApp an. Es wird nichts an Dritte
 * gesendet. Sobald ein echter Schlüssel eingetragen ist, läuft es wie gedacht.
 */
const WEB3FORMS_ACCESS_KEY = 'DEIN-WEB3FORMS-ACCESS-KEY'
const OHNE_DIENST = WEB3FORMS_ACCESS_KEY === 'DEIN-WEB3FORMS-ACCESS-KEY'
const EMAIL = 'office@sunbyte.at'
const WHATSAPP = '436603610642'

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

/* Vorauswahl je nach Absprungseite: /kontakt/?thema=betrieb|agentur */
const THEMA_MAP: Record<string, string> = {
    betrieb: 'KI-Betriebssystem für meinen Betrieb',
    agentur: 'Partnerschaft als Agentur',
}

export default function ContactForm() {
    const [status, setStatus] = useState<
        'idle' | 'sending' | 'ok' | 'err' | 'entwurf'
    >('idle')
    /* fertige Nachricht für E-Mail und WhatsApp, solange kein Formulardienst läuft */
    const [entwurf, setEntwurf] = useState('')
    const [interesse, setInteresse] = useState('KI-Betriebssystem für meinen Betrieb')

    // Vorauswahl aus ?thema= lesen (rein clientseitig, static-export-sicher)
    useEffect(() => {
        try {
            const thema = new URLSearchParams(window.location.search).get(
                'thema',
            )
            if (thema && THEMA_MAP[thema]) setInteresse(THEMA_MAP[thema])
        } catch {
            /* egal — Default bleibt */
        }
    }, [])
    const okRef = useRef<HTMLDivElement>(null)

    // Fokus auf die Erfolgsmeldung setzen (A11y: Statuswechsel ansagen)
    useEffect(() => {
        if (status === 'ok') okRef.current?.focus()
    }, [status])

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        // Ohne echten Key NICHT an den US-Dienst senden (kein Datenabfluss):
        // die Nachricht geht über das E-Mail-Programm des Besuchers.
        if (OHNE_DIENST) {
            const d = new FormData(e.currentTarget)
            const text = [
                `Name: ${d.get('name')}`,
                `E-Mail: ${d.get('email')}`,
                `Thema: ${d.get('interesse')}`,
                '',
                String(d.get('message') ?? ''),
            ].join('\n')
            setEntwurf(text)
            setStatus('entwurf')
            window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
                'Anfrage über sunbyte.at',
            )}&body=${encodeURIComponent(text)}`
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
                    Danke — wir melden uns.
                </p>
                <p className="text-soft mt-3" style={{ fontSize: '0.95rem' }}>
                    Antwort meist innerhalb von 24 Stunden. Eilig? Rufen Sie
                    an oder schreiben Sie auf WhatsApp.
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
                        worum geht es
                    </label>
                    <select
                        id="cf-service"
                        name="interesse"
                        value={interesse}
                        onChange={e => setInteresse(e.target.value)}
                        className="mt-2 focus:border-spark"
                        style={inputBase}
                    >
                        <option>KI-Betriebssystem für meinen Betrieb</option>
                        <option>Partnerschaft als Agentur</option>
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
                    placeholder="Erzählen Sie kurz von Ihrem Betrieb …"
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

            {status === 'entwurf' && (
                <p
                    role="status"
                    className="text-soft"
                    style={{ fontSize: '0.9rem', lineHeight: 1.6 }}
                >
                    Ihr E-Mail-Programm öffnet sich mit Ihrer Nachricht. Bitte
                    dort auf Senden drücken. Kein E-Mail-Programm zur Hand?{' '}
                    <a
                        href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(entwurf)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-spark hover:text-lit transition-colors"
                    >
                        Nachricht per WhatsApp senden
                    </a>
                    .
                </p>
            )}

            {status === 'err' && (
                <p
                    role="alert"
                    className="text-soft"
                    style={{ fontSize: '0.85rem' }}
                >
                    Hat nicht geklappt — bitte direkt per{' '}
                    <a
                        href="mailto:office@sunbyte.at"
                        className="text-spark hover:text-lit transition-colors"
                    >
                        E-Mail
                    </a>{' '}
                    melden.
                </p>
            )}

            <p
                className="mono-label text-muted"
                style={{ fontSize: '0.62rem' }}
            >
                ↳ erstgespräch gratis &amp; unverbindlich · ihre daten nur
                für ihre anfrage
            </p>
        </form>
    )
}
