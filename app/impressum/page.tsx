import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Impressum',
    description: 'Impressum & Offenlegung gemäß §5 ECG und §25 MedienG.',
}

/**
 * Impressum — Pflichtangaben gem. §5 ECG, §25 MedienG, §14 UGB (AT).
 *
 * Inhalte sind Platzhalter mit Slot-Markern. Zakir füllt sie sobald
 * Gewerbeschein-Daten und genaue Anschrift bestätigt sind.
 */
export default function ImpressumPage() {
    return (
        <main className="container-edge" style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
            <Link
                href="/"
                className="mono-label text-spark hover:text-lit transition-colors inline-flex items-center gap-2 mb-12"
            >
                <span aria-hidden>↩</span> sunbyte.at
            </Link>

            <h1
                className="font-display mb-12"
                style={{
                    fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                    color: 'var(--lit)',
                }}
            >
                Impressum
            </h1>

            <div className="space-y-10 max-w-2xl text-soft leading-relaxed">
                <Block title="Medieninhaber & Diensteanbieter">
                    <p data-slot="impressum-anbieter">
                        Sunbyte — Inhaber: Zakir Daryabi
                        <br />
                        [Anschrift folgt — Slot offen]
                        <br />
                        1220 Wien, Österreich
                    </p>
                </Block>

                <Block title="Kontakt">
                    <p data-slot="impressum-kontakt">
                        E-Mail:{' '}
                        <a
                            href="mailto:hello@sunbyte.at"
                            className="text-lit hover:text-spark transition-colors"
                        >
                            hello@sunbyte.at
                        </a>
                        <br />
                        Telefon: auf Anfrage
                    </p>
                </Block>

                <Block title="Unternehmensgegenstand">
                    <p>
                        Konzeption, Gestaltung, Entwicklung und Betrieb von
                        Websites und digitalen Auftritten. Beratung in Web,
                        Performance und Markenführung.
                    </p>
                </Block>

                <Block title="Berufsrechtliche Angaben">
                    <p data-slot="impressum-gewerbe">
                        Gewerbeschein: [Slot offen — wird ergänzt, sobald
                        Gewerbeanmeldung erfolgt]
                        <br />
                        Berufsbezeichnung: Web-Studio / IT-Dienstleistung
                        <br />
                        Verleihungsstaat: Österreich
                    </p>
                </Block>

                <Block title="Aufsichtsbehörde / Kammer">
                    <p data-slot="impressum-kammer">
                        Wirtschaftskammer Wien — Fachgruppe UBIT
                        <br />
                        Magistratisches Bezirksamt Wien
                    </p>
                </Block>

                <Block title="UID-Nummer">
                    <p data-slot="impressum-uid">[wird ergänzt]</p>
                </Block>

                <Block title="Haftungsausschluss">
                    <p>
                        Trotz sorgfältiger Prüfung kann für Richtigkeit,
                        Vollständigkeit und Aktualität der Inhalte keine
                        Gewähr übernommen werden. Externe Links werden bei
                        Verlinkung geprüft — auf nachträgliche Änderungen
                        besteht jedoch kein Einfluss.
                    </p>
                </Block>

                <Block title="Bildnachweise & Schriften">
                    <p>
                        Schriften: Fraunces (SIL OFL), Inter Tight (SIL OFL),
                        JetBrains Mono (SIL OFL) — alle Open-Source,
                        self-hosted via @fontsource.
                        <br />
                        Globe-Geodaten: world-atlas (Mike Bostock), d3-geo.
                    </p>
                </Block>

                <p
                    className="mono-label text-muted pt-8"
                    style={{
                        fontSize: '0.62rem',
                        borderTop: '1px solid rgba(201, 184, 163, 0.1)',
                    }}
                >
                    ↳ stand: 21. mai 2026 · sunbyte
                </p>
            </div>
        </main>
    )
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section>
            <h2
                className="mono-label text-spark mb-3"
                style={{ fontSize: '0.66rem' }}
            >
                {title}
            </h2>
            <div style={{ fontSize: 'clamp(0.95rem, 1.1vw, 1rem)' }}>
                {children}
            </div>
        </section>
    )
}
