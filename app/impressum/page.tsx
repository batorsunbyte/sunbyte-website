import type { Metadata } from 'next'
import { CONTACT } from '@/lib/seo'

export const metadata: Metadata = {
    title: 'Impressum',
    description: 'Impressum & Offenlegung gemäß §5 ECG und §25 MedienG.',
}

/**
 * Impressum — Pflichtangaben gem. §5 ECG, §25 MedienG, §14 UGB (AT).
 * Kontaktdaten aus dem PrintMyWall-Impressum übernommen.
 * Gewerbeschein / UID: Slots, bis Gewerbeanmeldung erfolgt.
 */
export default function ImpressumPage() {
    return (
        <div
            className="container-edge"
            style={{ paddingTop: '9rem', paddingBottom: '6rem' }}
        >
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
                    <p>
                        Sunbyte — Inhaber: Zakir Daryabi
                        <br />
                        {CONTACT.street}
                        <br />
                        {CONTACT.zip} {CONTACT.city}, {CONTACT.country}
                    </p>
                </Block>

                <Block title="Kontakt">
                    <p>
                        E-Mail:{' '}
                        <a
                            href={`mailto:${CONTACT.email}`}
                            className="text-lit hover:text-spark transition-colors"
                        >
                            {CONTACT.email}
                        </a>
                        <br />
                        Telefon:{' '}
                        <a
                            href={`tel:${CONTACT.phoneRaw}`}
                            className="text-lit hover:text-spark transition-colors"
                        >
                            {CONTACT.phone}
                        </a>
                    </p>
                </Block>

                <Block title="Unternehmensgegenstand">
                    <p>
                        IT-Dienstleistungen: Konzeption, Gestaltung,
                        Entwicklung und Betrieb von Websites und digitalen
                        Auftritten. Beratung zu KI-Sichtbarkeit, Performance
                        und Online-Präsenz.
                    </p>
                </Block>

                <Block title="Berufsrechtliche Angaben">
                    <p data-slot="impressum-gewerbe">
                        GISA-Zahl: 39725530
                        <br />
                        Berufsbezeichnung: IT-Dienstleistung
                        <br />
                        Verleihungsstaat: Österreich
                    </p>
                </Block>

                <Block title="Aufsichtsbehörde / Kammer">
                    <p>
                        Wirtschaftskammer Wien — Fachgruppe UBIT
                        <br />
                        Magistratisches Bezirksamt Wien
                    </p>
                </Block>

                <Block title="UID-Nummer">
                    <p data-slot="impressum-uid">ATU82574019</p>
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
                    ↳ stand: 25. juni 2026 · sunbyte
                </p>
            </div>
        </div>
    )
}

function Block({
    title,
    children,
}: {
    title: string
    children: React.ReactNode
}) {
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
