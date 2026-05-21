/**
 * Kontakt-Sektion + Footer (§5 im Briefing).
 *
 * Schlicht, klar, eine primäre CTA. Inhabergeführt = direkter Draht,
 * kein Formular-Overhead.
 *
 * Slots, die Zakir später ersetzt:
 *   - email: hello@sunbyte.at (Platzhalter bis MX-Record steht)
 *   - tel:   auf Anfrage (Slot offen)
 *   - kalender-link (optional, später)
 */
export default function Contact() {
    return (
        <>
            <section
                id="kontakt"
                className="relative w-full container-edge"
                style={{ paddingTop: '8rem', paddingBottom: '10rem' }}
            >
                {/* Kicker */}
                <p className="mono-label text-spark mb-6">04 — kontakt</p>

                {/* Riesige Display-Headline */}
                <h2
                    className="font-display max-w-[16ch]"
                    style={{
                        fontSize: 'clamp(3rem, 11vw, 9rem)',
                        color: 'var(--lit)',
                    }}
                >
                    Lass uns
                    <br />
                    <span style={{ color: 'var(--spark)' }}>reden.</span>
                </h2>

                {/* Sub */}
                <p
                    className="mt-8 text-soft max-w-2xl leading-relaxed"
                    style={{ fontSize: 'clamp(1rem, 1.4vw, 1.2rem)' }}
                >
                    Wenn du eine Seite brauchst, die wirkt — nicht nur eine, die
                    existiert — dann schreib mir. Der erste Call ist gratis,
                    der zweite zeigt dir, wie's konkret aussehen würde.
                </p>

                {/* Kontakt-Kanäle */}
                <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
                    {/* E-Mail */}
                    <div className="md:col-span-5">
                        <p
                            className="mono-label text-muted mb-3"
                            style={{ fontSize: '0.66rem' }}
                        >
                            ↳ schreib direkt
                        </p>
                        <a
                            href="mailto:hello@sunbyte.at"
                            className="font-display block hover:opacity-80 transition-opacity"
                            style={{
                                fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                                color: 'var(--lit)',
                                lineHeight: 1.1,
                            }}
                            data-slot="contact-email"
                        >
                            hello@sunbyte.at
                            <span
                                aria-hidden
                                className="text-spark ml-2"
                                style={{ fontSize: '0.5em' }}
                            >
                                ↗
                            </span>
                        </a>
                        <p
                            className="mt-3 text-soft text-sm leading-snug"
                            style={{ fontSize: 'clamp(0.85rem, 1vw, 0.95rem)' }}
                        >
                            Direkt zum Gründer. Antwort meist innerhalb von 24 h.
                        </p>
                    </div>

                    {/* Persönlich / Anruf */}
                    <div className="md:col-span-5 md:col-start-8">
                        <p
                            className="mono-label text-muted mb-3"
                            style={{ fontSize: '0.66rem' }}
                        >
                            ↳ persönlich
                        </p>
                        <p
                            className="font-display"
                            style={{
                                fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                                color: 'var(--lit)',
                                lineHeight: 1.1,
                            }}
                            data-slot="contact-meeting"
                        >
                            Wien · Donaustadt
                        </p>
                        <p
                            className="mt-3 text-soft text-sm leading-snug"
                            style={{ fontSize: 'clamp(0.85rem, 1vw, 0.95rem)' }}
                        >
                            Café, Atelier oder dein Geschäft — wir treffen uns
                            dort, wo es Sinn ergibt. Tel auf Anfrage.
                        </p>
                    </div>
                </div>

                {/* Bottom-Hinweis */}
                <p
                    className="mt-20 mono-label text-muted"
                    style={{ fontSize: '0.66rem' }}
                >
                    ↳ aktuell offen für premium-projekte ab h2 2026
                </p>
            </section>

            <Footer />
        </>
    )
}

// ─── Footer ─────────────────────────────────────────────────────

function Footer() {
    return (
        <footer
            className="relative w-full container-edge"
            style={{
                paddingTop: '3rem',
                paddingBottom: '3rem',
                borderTop: '1px solid rgba(201, 184, 163, 0.12)',
            }}
        >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 items-start">
                {/* Marke + Tagline */}
                <div className="md:col-span-5">
                    <p
                        className="font-display"
                        style={{
                            fontSize: 'clamp(1.5rem, 2vw, 1.75rem)',
                            color: 'var(--lit)',
                        }}
                    >
                        sunbyte
                    </p>
                    <p
                        className="text-soft mt-2 max-w-sm leading-snug"
                        style={{ fontSize: 'clamp(0.8rem, 0.95vw, 0.9rem)' }}
                    >
                        Inhabergeführtes Web-Studio aus Wien. Premium-Web,
                        ehrlich gerechnet.
                    </p>
                </div>

                {/* Sitemap */}
                <nav
                    aria-label="Sitemap"
                    className="md:col-span-3 md:col-start-7 flex flex-col gap-2"
                >
                    <p
                        className="mono-label text-muted mb-1"
                        style={{ fontSize: '0.6rem' }}
                    >
                        sitemap
                    </p>
                    <a href="#leistungen" className="text-soft hover:text-lit transition-colors text-sm">
                        Leistungen
                    </a>
                    <a href="#cases" className="text-soft hover:text-lit transition-colors text-sm">
                        Arbeiten
                    </a>
                    <a href="#studio" className="text-soft hover:text-lit transition-colors text-sm">
                        Studio
                    </a>
                    <a href="#kontakt" className="text-soft hover:text-lit transition-colors text-sm">
                        Kontakt
                    </a>
                </nav>

                {/* Legal */}
                <nav
                    aria-label="Rechtliches"
                    className="md:col-span-3 md:col-start-10 flex flex-col gap-2"
                >
                    <p
                        className="mono-label text-muted mb-1"
                        style={{ fontSize: '0.6rem' }}
                    >
                        rechtliches
                    </p>
                    <a
                        href="/impressum"
                        className="text-soft hover:text-lit transition-colors text-sm"
                        data-slot="legal-impressum"
                    >
                        Impressum
                    </a>
                    <a
                        href="/datenschutz"
                        className="text-soft hover:text-lit transition-colors text-sm"
                        data-slot="legal-datenschutz"
                    >
                        Datenschutz
                    </a>
                    <a
                        href="mailto:hello@sunbyte.at"
                        className="text-soft hover:text-lit transition-colors text-sm"
                    >
                        hello@sunbyte.at
                    </a>
                </nav>
            </div>

            {/* Bottom-Strich */}
            <div
                className="mt-10 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                style={{ borderTop: '1px solid rgba(201, 184, 163, 0.08)' }}
            >
                <p
                    className="mono-label text-muted"
                    style={{ fontSize: '0.6rem' }}
                >
                    © 2026 sunbyte · zakir daryabi · wien
                </p>
                <p
                    className="mono-label text-muted"
                    style={{ fontSize: '0.6rem' }}
                >
                    handgebaut in wien · next.js · gh-pages
                </p>
            </div>
        </footer>
    )
}
