import Reveal from '@/components/Reveal'
import { SectionHeader, Spark } from '@/components/ui'

/**
 * Warum — der Grund für das KI-Betriebssystem, direkt nach der Logo-Leiste.
 *
 * Inhalt von Zakir (26.11.2026), sinngemäß: Als Unternehmer braucht man viele
 * Dienstleistungen von verschiedenen IT-Firmen, kauft Produkte, testet — und
 * ist trotzdem nicht zufrieden. Man verliert Geld, Zeit und Energie, und der
 * Umsatz steigt nicht. Sunbyte will mit dem System drei Dinge erreichen:
 * mehr Freizeit, weniger Kosten (viele Kosten für Produkte, Programme und
 * Agenturen fallen weg, weil das System selbst baut, was man braucht) und
 * mehr Umsatz (das Unternehmen wächst in alle Richtungen und wird stärker).
 *
 * Die drei Punkte stehen als ZIELE da („Das wollen wir erreichen"), nicht als
 * Garantie. Die Kacheln links sind allgemeine Kostenstellen, keine Marken.
 * Server-Komponente; Bewegung nur über CSS (.warum-*), bei „weniger Bewegung" aus.
 */

const POSTEN = [
    'Agentur',
    'IT-Firma',
    'Website',
    'Werbeanzeigen',
    'Social-Media-Tool',
    'Terminbuchung',
    'Newsletter',
    'Kundenverwaltung',
    'KI-Tool',
]

const VERLUSTE = ['Geld', 'Zeit', 'Energie']

const ZIELE = [
    {
        titel: 'Mehr Freizeit',
        text: 'Das System nimmt Ihnen Arbeit ab und arbeitet weiter, wenn Sie nicht da sind.',
    },
    {
        titel: 'Weniger Kosten',
        text: 'Viele Kosten für Produkte, Programme und Agenturen fallen weg. Was Ihr Betrieb braucht, baut das System selbst.',
    },
    {
        titel: 'Mehr Umsatz',
        text: 'Das System hilft Ihrem Unternehmen, in alle Richtungen zu wachsen und stärker zu werden.',
    },
]

export default function Warum() {
    return (
        <section className="container-edge section-pad">
            <SectionHeader
                kicker="01 — warum"
                title={
                    <>
                        Viel bezahlt.
                        <br />
                        <Spark>Trotzdem nicht zufrieden.</Spark>
                    </>
                }
                className="mb-12 md:mb-16"
            />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-10 items-center">
                {/* Text: das Problem in Zakirs Worten */}
                <div className="md:col-span-5">
                    <Reveal>
                        <p
                            className="leading-relaxed"
                            style={{
                                fontSize: 'clamp(1.15rem, 1.7vw, 1.45rem)',
                                color: 'var(--lit)',
                                maxWidth: '30ch',
                            }}
                        >
                            Als Unternehmer brauchen Sie viele Dienstleistungen.
                            Von verschiedenen IT-Firmen, mit verschiedenen
                            Produkten, immer wieder neu getestet.
                        </p>
                    </Reveal>
                    <Reveal delay={90}>
                        <p
                            className="text-soft mt-8 mb-3"
                            style={{ fontSize: 'clamp(1rem, 1.3vw, 1.1rem)' }}
                        >
                            Dabei verlieren Sie
                        </p>
                        <ul className="warum-verluste">
                            {VERLUSTE.map(v => (
                                <li key={v}>{v}</li>
                            ))}
                        </ul>
                        <p
                            className="text-soft mt-5 leading-relaxed"
                            style={{
                                fontSize: 'clamp(1rem, 1.3vw, 1.1rem)',
                                maxWidth: '34ch',
                            }}
                        >
                            Und der Umsatz steigt trotzdem nicht.
                        </p>
                    </Reveal>
                </div>

                {/* Bild: viele Rechnungen links, ein System rechts */}
                <Reveal delay={120} className="md:col-span-7">
                    <div className="warum-bild" aria-hidden>
                        <div>
                            <p className="mono-label text-muted mb-4">heute</p>
                            <ul className="warum-posten">
                                {POSTEN.map((name, i) => (
                                    <li
                                        key={name}
                                        style={{ animationDelay: `${i * 0.9}s` }}
                                    >
                                        <span>{name}</span>
                                        <span className="warum-posten__euro">€</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <span className="warum-bild__pfeil">→</span>

                        <div className="warum-eins">
                            <p className="mono-label text-spark mb-4">
                                mit sunbyte
                            </p>
                            <div className="warum-eins__kern">
                                <span className="warum-eins__halo" />
                                <span>
                                    Ein
                                    <br />
                                    System
                                </span>
                            </div>
                        </div>
                    </div>
                    <p className="sr-only">
                        Heute bezahlen Sie viele einzelne Posten: Agentur,
                        IT-Firma, Website, Werbeanzeigen und verschiedene
                        Programme. Mit Sunbyte haben Sie ein System.
                    </p>
                </Reveal>
            </div>

            {/* Die drei Ziele */}
            <Reveal as="p" className="mono-label text-spark mt-16 md:mt-24 mb-6">
                ↳ das wollen wir für sie erreichen
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
                {ZIELE.map((z, i) => (
                    <Reveal key={z.titel} delay={i * 90}>
                        <div className="warum-ziel">
                            <span className="mono-label text-muted">
                                {String(i + 1).padStart(2, '0')}
                            </span>
                            <h3 className="font-display">{z.titel}</h3>
                            <p>{z.text}</p>
                        </div>
                    </Reveal>
                ))}
            </div>
        </section>
    )
}
