import { CtaButton, Spark } from '@/components/ui'

/**
 * Hinweis-Seite für ein Angebot, das es nicht mehr gibt.
 *
 * Seit 26.11.2026 (Zakir: „Webseite und KI-Sichtbarkeit möchte ich nicht mehr
 * anbieten") bleiben die alten Adressen erreichbar, damit Links von außen nicht
 * ins Leere laufen. Die früheren Seiten liegen unverändert unter
 * app/_stillgelegt/ (Ordner mit Unterstrich liefert Next nicht aus).
 * Der Satz zu den Netzwerkpartnern stammt wörtlich von Zakir.
 */
export default function Stillgelegt({ angebot }: { angebot: string }) {
    return (
        <section className="container-edge section-pad section-pad-top">
            <p className="mono-label text-spark mb-4">↳ geändert</p>
            <h1
                className="font-display"
                style={{
                    fontSize: 'clamp(2.25rem, 5.5vw, 4.5rem)',
                    color: 'var(--lit)',
                    maxWidth: '18ch',
                }}
            >
                {angebot} bieten wir <Spark>nicht mehr einzeln an.</Spark>
            </h1>
            <p
                className="text-soft leading-relaxed mt-8"
                style={{ fontSize: 'clamp(1rem, 1.3vw, 1.1rem)', maxWidth: '46ch' }}
            >
                Sunbyte baut heute KI-Betriebssysteme für Betriebe. Kleine und
                spezielle Aufträge übermitteln wir gerne an unsere geprüften
                Netzwerkpartner.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
                <CtaButton href="/">zum ki-betriebssystem</CtaButton>
                <CtaButton href="/kontakt" variant="ghost">
                    anfrage senden
                </CtaButton>
            </div>
        </section>
    )
}
