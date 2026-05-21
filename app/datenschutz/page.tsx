import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Datenschutz',
    description: 'Datenschutzerklärung gemäß DSGVO.',
}

/**
 * Datenschutzerklärung — DSGVO-Pflicht. Aktuelle Sunbyte-Seite ist statisch,
 * sammelt keine personenbezogenen Daten. Nur über E-Mail-Kontakt entstehen
 * Daten. Cookies werden nicht gesetzt, kein Tracking, kein Analytics.
 *
 * Slot für Zakir: sobald Analytics oder Forms hinzukommen, muss diese Seite
 * ergänzt werden.
 */
export default function DatenschutzPage() {
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
                Datenschutz
            </h1>

            <div className="space-y-10 max-w-2xl text-soft leading-relaxed">
                <Block title="Verantwortlicher">
                    <p>
                        Sunbyte — Inhaber: Zakir Daryabi
                        <br />
                        Wien, Österreich
                        <br />
                        Kontakt:{' '}
                        <a
                            href="mailto:hello@sunbyte.at"
                            className="text-lit hover:text-spark transition-colors"
                        >
                            hello@sunbyte.at
                        </a>
                    </p>
                </Block>

                <Block title="Welche Daten wir verarbeiten">
                    <p>
                        Diese Website ist statisch und nutzt weder Cookies
                        noch Tracking-Skripte. Es werden keine
                        personenbezogenen Daten beim bloßen Besuch erhoben.
                    </p>
                    <p className="mt-3">
                        Beim Aufruf der Seite werden serverseitig technisch
                        notwendige Daten (IP-Adresse, Zeitstempel, Browser-Typ)
                        durch GitHub Pages temporär verarbeitet. Details siehe
                        GitHub Privacy Statement.
                    </p>
                </Block>

                <Block title="Kontaktaufnahme per E-Mail">
                    <p>
                        Wenn du uns über die angegebene E-Mail-Adresse
                        kontaktierst, werden die übermittelten Daten (Name,
                        E-Mail, Inhalt der Nachricht) gespeichert, soweit
                        nötig, um deine Anfrage zu bearbeiten. Diese Daten
                        werden nicht an Dritte weitergegeben.
                    </p>
                </Block>

                <Block title="Rechtsgrundlage">
                    <p>
                        Die Verarbeitung erfolgt auf Basis von Art. 6 Abs. 1
                        lit. b DSGVO (Anbahnung / Erfüllung eines Vertrages)
                        bzw. Art. 6 Abs. 1 lit. f (berechtigtes Interesse).
                    </p>
                </Block>

                <Block title="Deine Rechte">
                    <p>
                        Du hast jederzeit das Recht auf Auskunft, Berichtigung,
                        Löschung, Einschränkung der Verarbeitung,
                        Datenübertragbarkeit und Widerspruch. Beschwerden bei
                        der österreichischen Datenschutzbehörde (dsb.gv.at)
                        sind möglich.
                    </p>
                </Block>

                <Block title="Eingebundene Drittdienste">
                    <p data-slot="datenschutz-drittdienste">
                        Aktuell keine. Schriften (@fontsource) und Globe-Daten
                        (world-atlas) sind in den statischen Build gebundelt
                        und werden nicht zur Laufzeit von Dritten geladen.
                    </p>
                </Block>

                <Block title="Hosting">
                    <p>
                        Diese Website wird über GitHub Pages ausgeliefert
                        (GitHub Inc., 88 Colin P Kelly Jr St, San Francisco,
                        CA 94107, USA). Auftragsverarbeitungsvertrag liegt
                        vor.
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
