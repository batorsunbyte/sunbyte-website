import type { Metadata } from 'next'
import { CONTACT } from '@/lib/seo'

export const metadata: Metadata = {
    title: 'Datenschutz',
    description: 'Datenschutzerklärung gemäß DSGVO.',
}

/**
 * Datenschutzerklärung — DSGVO. Die Seite ist statisch, setzt keine Cookies,
 * kein Tracking. Daten entstehen nur über E-Mail-/Telefonkontakt.
 */
export default function DatenschutzPage() {
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
                Datenschutz
            </h1>

            <div className="space-y-10 max-w-2xl text-soft leading-relaxed">
                <Block title="Verantwortlicher">
                    <p>
                        Sunbyte — Inhaber: Zakir Daryabi
                        <br />
                        {CONTACT.street}, {CONTACT.zip} {CONTACT.city},{' '}
                        {CONTACT.country}
                        <br />
                        Kontakt:{' '}
                        <a
                            href={`mailto:${CONTACT.email}`}
                            className="text-lit hover:text-spark transition-colors"
                        >
                            {CONTACT.email}
                        </a>{' '}
                        ·{' '}
                        <a
                            href={`tel:${CONTACT.phoneRaw}`}
                            className="text-lit hover:text-spark transition-colors"
                        >
                            {CONTACT.phone}
                        </a>
                    </p>
                </Block>

                <Block title="Welche Daten wir verarbeiten">
                    <p>
                        Diese Website setzt selbst keine eigenen Cookies und
                        kein Tracking/Analytics. Beim bloßen Besuch erheben wir
                        selbst keine personenbezogenen Daten.
                    </p>
                    <p className="mt-3">
                        Auf den Seiten „Referenzen" und „Webseiten" betten wir
                        zur Vorschau fremde Websites (u.a. kfz22.com,
                        mstyle.beauty, safetypro-electrical.au, printmywall.at)
                        per iframe ein. Beim Laden dieser Vorschau kann die
                        eingebettete Seite deine IP-Adresse erhalten und ggf.
                        eigene Inhalte laden (siehe „Eingebundene Drittdienste").
                    </p>
                    <p className="mt-3">
                        Beim Aufruf der Seite werden durch GitHub Pages technisch
                        notwendige Daten (IP-Adresse, Zeitstempel, Browser-Typ)
                        temporär verarbeitet. Details siehe GitHub Privacy
                        Statement.
                    </p>
                </Block>

                <Block title="Kontaktaufnahme">
                    <p>
                        Wenn du uns per E-Mail, Telefon oder WhatsApp
                        kontaktierst, verarbeiten wir die übermittelten Daten
                        (Name, Kontaktdaten, Inhalt der Nachricht) nur, soweit
                        nötig, um deine Anfrage zu bearbeiten.
                    </p>
                    <p className="mt-3">
                        Das Kontaktformular auf dieser Seite wird über den Dienst
                        Web3Forms (web3forms.com, Anbieter mit Sitz in den USA)
                        verarbeitet: Deine Formulardaten werden an Web3Forms
                        übermittelt, die uns die Anfrage per E-Mail zustellen.
                        Dabei findet eine Übermittlung in ein Drittland (USA)
                        statt. Wenn du das nicht möchtest, kontaktiere uns bitte
                        direkt per E-Mail oder Telefon.
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
                    <p>
                        <strong style={{ color: 'var(--lit)' }}>Web3Forms</strong>{' '}
                        (web3forms.com, USA) — verarbeitet Anfragen aus dem
                        Kontaktformular, nur bei aktiver Nutzung des Formulars.
                    </p>
                    <p className="mt-3">
                        <strong style={{ color: 'var(--lit)' }}>
                            iframe-Vorschauen
                        </strong>{' '}
                        — auf „Referenzen" und „Webseiten" werden u.a.
                        kfz22.com, mstyle.beauty, safetypro-electrical.au und
                        printmywall.at zur Live-Vorschau eingebettet; dabei
                        können Daten (u.a. IP-Adresse) an diese Seiten übertragen
                        werden.
                    </p>
                    <p className="mt-3">
                        Schriften (@fontsource) und Globe-Daten (world-atlas)
                        sind in den statischen Build gebundelt und werden nicht
                        zur Laufzeit von Dritten geladen.
                    </p>
                </Block>

                <Block title="Hosting">
                    <p>
                        Diese Website wird über GitHub Pages ausgeliefert
                        (GitHub Inc., 88 Colin P Kelly Jr St, San Francisco,
                        CA 94107, USA).
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
            >
                {title}
            </h2>
            <div style={{ fontSize: 'clamp(0.95rem, 1.1vw, 1rem)' }}>
                {children}
            </div>
        </section>
    )
}
