import Reveal from '@/components/Reveal'
import ContactForm from '@/components/ContactForm'
import { CONTACT } from '@/lib/seo'

/**
 * Kontakt-Sektion (/kontakt). Footer ist global (layout.tsx).
 *
 * Conversion-First: Formular als niedrigschwelliger Hauptweg (Web3Forms,
 * static-tauglich) + direkte Kanäle (Mail / Tel / WhatsApp / Standort).
 * Tel + Anschrift aus dem PrintMyWall-Impressum (Zakirs Wunsch).
 */
export default function Contact() {
    return (
        <section
            id="kontakt"
            className="relative w-full container-edge section-pad-top"
            style={{ paddingBottom: '7rem' }}
        >
            <Reveal as="p" className="mono-label text-spark mb-6">
                kontakt
            </Reveal>

            <Reveal
                as="h1"
                delay={60}
                className="font-display max-w-[16ch]"
                style={{
                    fontSize: 'clamp(2.5rem, 9vw, 7rem)',
                    color: 'var(--lit)',
                }}
            >
                Lass uns
                <br />
                <span style={{ color: 'var(--spark)' }}>reden.</span>
            </Reveal>

            <Reveal
                as="p"
                delay={120}
                className="mt-8 text-soft max-w-2xl leading-relaxed"
                style={{ fontSize: 'clamp(1rem, 1.4vw, 1.2rem)' }}
            >
                Erzähl mir in einer Minute von deinem Vorhaben — neue Website,
                Auffrischung oder KI-Sichtbarkeit.{' '}
                <span className="text-lit">
                    Erstgespräch gratis &amp; unverbindlich
                </span>
                , Antwort meist innerhalb von 24 Stunden.
            </Reveal>

            {/* Formular + direkte Kanäle */}
            <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-10">
                {/* Formular */}
                <Reveal className="md:col-span-7">
                    <ContactForm />
                </Reveal>

                {/* Direkte Kanäle */}
                <div className="md:col-span-5 flex flex-col gap-8">
                    <Reveal>
                        <p
                            className="mono-label text-muted mb-2"
                            style={{ fontSize: '0.66rem' }}
                        >
                            ↳ lieber direkt?
                        </p>
                        <a
                            href={`mailto:${CONTACT.email}`}
                            className="font-display block hover:opacity-80 transition-opacity"
                            style={{
                                fontSize: 'clamp(1.25rem, 2.4vw, 1.9rem)',
                                color: 'var(--lit)',
                                lineHeight: 1.15,
                            }}
                        >
                            {CONTACT.email}
                            <span
                                aria-hidden
                                className="text-spark ml-2"
                                style={{ fontSize: '0.5em' }}
                            >
                                ↗
                            </span>
                        </a>
                    </Reveal>

                    <Reveal delay={60}>
                        <p
                            className="mono-label text-muted mb-2"
                            style={{ fontSize: '0.66rem' }}
                        >
                            ↳ anruf / whatsapp
                        </p>
                        <a
                            href={`tel:${CONTACT.phoneRaw}`}
                            className="font-display block hover:opacity-80 transition-opacity"
                            style={{
                                fontSize: 'clamp(1.25rem, 2.4vw, 1.9rem)',
                                color: 'var(--lit)',
                                lineHeight: 1.15,
                            }}
                        >
                            {CONTACT.phone}
                        </a>
                        <a
                            href={`https://wa.me/${CONTACT.whatsapp}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mono-label text-spark hover:text-lit transition-colors inline-flex items-center gap-1.5 mt-2"
                        >
                            auf whatsapp schreiben <span aria-hidden>↗</span>
                        </a>
                    </Reveal>

                    <Reveal delay={120}>
                        <p
                            className="mono-label text-muted mb-2"
                            style={{ fontSize: '0.66rem' }}
                        >
                            ↳ standort
                        </p>
                        <p
                            className="text-soft leading-snug"
                            style={{
                                fontSize: 'clamp(0.95rem, 1.2vw, 1.05rem)',
                            }}
                        >
                            {CONTACT.street}, {CONTACT.zip} {CONTACT.city},{' '}
                            {CONTACT.country}
                        </p>
                    </Reveal>
                </div>
            </div>

            {/* Bottom-Hinweis */}
            <p
                className="mt-16 mono-label text-muted"
                style={{ fontSize: '0.66rem' }}
            >
                ↳ aktuell offen für projekte ab h2 2026
            </p>
        </section>
    )
}
