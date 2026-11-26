import type { Metadata } from 'next'
import { Spark, CtaButton } from '@/components/ui'

/**
 * 404 — eigene Seite statt der englischen Standardseite von Next.js.
 * Führt zurück zu den drei wichtigsten Zielen.
 */
export const metadata: Metadata = {
    title: 'Seite nicht gefunden',
    description:
        'Diese Seite gibt es nicht oder nicht mehr. Zurück zum KI-Betriebssystem von Sunbyte.',
    robots: { index: false, follow: true },
}

export default function NotFound() {
    return (
        <section
            className="container-edge"
            style={{ paddingTop: '11rem', paddingBottom: '8rem' }}
        >
            <p className="mono-label text-spark mb-5">404</p>
            <h1
                className="font-display"
                style={{
                    fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
                    color: 'var(--lit)',
                    maxWidth: '14ch',
                }}
            >
                Diese Seite <Spark>gibt es nicht.</Spark>
            </h1>
            <p
                className="text-soft leading-relaxed mt-8"
                style={{
                    fontSize: 'clamp(1.05rem, 1.4vw, 1.2rem)',
                    maxWidth: '44ch',
                }}
            >
                Vielleicht wurde sie verschoben. Sunbyte entwickelt heute ein
                KI-Betriebssystem für Betriebe. Hier geht es weiter.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
                <CtaButton href="/">zum ki-os</CtaButton>
                <CtaButton href="/partner" variant="ghost">
                    für agenturen
                </CtaButton>
                <CtaButton href="/kontakt" variant="ghost">
                    kontakt
                </CtaButton>
            </div>
        </section>
    )
}
