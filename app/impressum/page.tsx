import type { Metadata } from 'next'
import { CONTACT } from '@/lib/seo'

export const metadata: Metadata = {
    title: 'Impressum',
    description:
        'Impressum und Offenlegung gemäß § 5 ECG und § 25 MedienG. Sunbyte GmbH, Wien.',
    alternates: { canonical: '/impressum/' },
}

/**
 * Impressum — Pflichtangaben gem. §5 ECG, §25 MedienG, §14 UGB (AT).
 *
 * Seit 27.11.2026 auf die Sunbyte GmbH umgestellt. Firma, Anschrift,
 * Firmenbuchnummer (von Zakir genannt: FN 692174d), Geschäftsführer und
 * Geschäftszweig stammen aus dem Firmenbuch (evi.gv.at/f/692174d, eingetragen
 * 17.11.2026). Der Name steht wie überall auf der Website als „Zakir Daryabi".
 *
 * Bewusst NICHT mehr drin, weil sie zur früheren Einzelfirma gehören:
 * UID ATU82574019 und GISA-Zahl 39725530. Die GmbH hat noch keine UID
 * (Zakir, 27.11.2026) — sobald sie da ist, hier als eigener Block eintragen.
 * GISA-Zahl der GmbH: eintragen, sobald das Gewerbe auf die GmbH läuft.
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
                        Sunbyte GmbH
                        <br />
                        {CONTACT.streetFull}
                        <br />
                        {CONTACT.zip} {CONTACT.city}, {CONTACT.country}
                        <br />
                        Geschäftsführer: Zakir Daryabi
                    </p>
                </Block>

                <Block title="Firmenbuch">
                    <p>
                        Firmenbuchnummer: FN 692174d
                        <br />
                        Firmenbuchgericht: Handelsgericht Wien
                        <br />
                        Rechtsform: Gesellschaft mit beschränkter Haftung, Sitz
                        Wien
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
                        Dienstleistungen in der automatischen Datenverarbeitung
                        und Informationstechnik. Entwicklung und Einsatz von
                        Systemen der künstlichen Intelligenz. Hosting,
                        technische Betreuung und Wartung von IT-Systemen.
                        Vertrieb von Software und Softwarelizenzen.
                    </p>
                </Block>

                <Block title="Kammer und Aufsicht">
                    <p data-slot="impressum-gewerbe">
                        Wirtschaftskammer Wien — Fachgruppe UBIT
                        <br />
                        Aufsichtsbehörde: Magistratisches Bezirksamt für den
                        21. Bezirk, Wien
                        <br />
                        Berufsrecht: Gewerbeordnung (GewO), einsehbar auf{' '}
                        <a
                            href="https://www.ris.bka.gv.at"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lit hover:text-spark transition-colors"
                        >
                            ris.bka.gv.at
                        </a>
                    </p>
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
                    ↳ stand: 27. november 2026 · sunbyte gmbh
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
            >
                {title}
            </h2>
            <div style={{ fontSize: 'clamp(0.95rem, 1.1vw, 1rem)' }}>
                {children}
            </div>
        </section>
    )
}
