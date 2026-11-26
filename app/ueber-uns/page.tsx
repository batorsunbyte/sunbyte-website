import type { Metadata } from 'next'
import Reveal from '@/components/Reveal'
import JsonLd from '@/components/JsonLd'
import { Spark, CtaBand } from '@/components/ui'
import { PERSON_ZAKIR, PERSON_MEDET, breadcrumbLd } from '@/lib/seo'

/**
 * /ueber-uns — zwei Köpfe (26.11.2026).
 *
 * Zakir: „Bei Über uns kannst du das von PrintMyWall kopieren, anpassen für
 * diese Webseite. Die Bilder kannst du kopieren." Aufbau und Fotos stammen von
 * printmywall.at/mission/ (Zusammenfoto, zwei Karten mit Rolle, Text, Leitsatz
 * und Unternehmensliste).
 *
 * Zakirs Karte: seine Angaben vom 26.11.2026 zu Lehre, Sprachen und dem
 * Projekt nach der Lehre; „führte fachlich bis zu 15 Personen" und der
 * Leitsatz stehen so auf printmywall.at; „über sechs Jahre IT und KI" und
 * „Was er verspricht, baut er selbst" stammen von der früheren Sunbyte-Seite.
 * Regel von PrintMyWall übernommen: Medets Text ist nie länger als Zakirs. Medets Karte: sein Text von dort,
 * ohne den Satz zu seiner Rolle bei PrintMyWall.
 * Bewusst weggelassen: das Gründungsdatum (Zakir: „muss man nicht schreiben").
 *
 * Die frühere Fassung („zwei Brüder", AboutHero, TeamBlock, Studio) ist nicht
 * mehr eingebunden; die Dateien liegen unverändert in components/.
 */

export const metadata: Metadata = {
    title: 'Über uns — Zakir Daryabi und Ing. Medet Atas',
    description:
        'Hinter Sunbyte stehen Zakir Daryabi, Softwareentwickler und Geschäftsführer, und Ing. Medet Atas. Wer das KI-Betriebssystem baut und was wir vorhaben.',
    alternates: { canonical: '/ueber-uns/' },
}

interface Kopf {
    bild: string
    alt: string
    name: string
    rolle: string
    text: React.ReactNode[]
    wort: string
    firmenTitel: string
    firmen: { name: string; href?: string; rolle: string }[]
}

const KOEPFE: Kopf[] = [
    {
        bild: '/images/team/zakir-portraet.webp',
        alt: 'Zakir Daryabi, Gründer und Geschäftsführer von Sunbyte.',
        name: 'Zakir Daryabi',
        rolle: 'Gründer, Gesellschafter und Geschäftsführer',
        text: [
            'Zakir ist Softwareentwickler und arbeitet seit über sechs Jahren mit IT und KI. In seiner Lehre hat er das Handwerk von Grund auf gelernt und selbst programmiert, in Java, C# und Python. Nebenbei baute er eigene Programme. 2023 schloss er die Lehre ab.',
            'Danach arbeitete er an einem wichtigen Migrationsprojekt mit Altsystemen. Dort hat er an allem gearbeitet, was dazwischenliegt: verschiedene Datenbanksysteme, Schnittstellen, Benutzeroberflächen und Tests. Fachlich führte er bis zu 15 Personen.',
            'Aus dieser Arbeit kommt sein Denken in Architektur: wie ein System aufgebaut sein muss, damit es hält und wachsen kann. Mit Sunbyte baut er KI-Betriebssysteme für Betriebe. Als Geschäftsführer verantwortet er die Technik. Was er verspricht, baut er selbst.',
        ],
        wort: 'Träume als Antrieb. Technik als Werkzeug. Qualität als Versprechen.',
        firmenTitel: 'Unternehmen und Projekte',
        firmen: [
            { name: 'Sunbyte', rolle: 'Gesellschafter und Geschäftsführer' },
            {
                name: 'PrintMyWall',
                href: 'https://printmywall.at',
                rolle: 'Gesellschafter und Geschäftsführer',
            },
            {
                name: 'Next Move',
                href: 'https://www.youtube.com/@zakirdaryabi',
                rolle: 'Host · Event · Podcast',
            },
        ],
    },
    {
        bild: '/images/team/medet-portraet.webp',
        alt: 'Ing. Medet Atas, Gesellschafter von Sunbyte.',
        name: 'Ing. Medet Atas',
        rolle: 'Gesellschafter',
        text: [
            <>
                Medet ist österreichischer Unternehmer mit technischem
                Hintergrund: Ausbildung an einer HTL in Wien, Schwerpunkt
                Nachrichtentechnik und Elektronik. Seit 2008 ist er
                unternehmerisch tätig und hat mit{' '}
                <a
                    href="https://autospa.at"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="kopf-link"
                >
                    AutoSPA
                </a>{' '}
                eine Marke für professionelle Fahrzeugpflege mit mehreren
                Standorten in Wien aufgebaut.
            </>,
            'Seine Erfahrung liegt im Großhandel, im Vertrieb und in der internationalen Geschäftsentwicklung: neue Märkte erschließen, Vertrieb aufbauen, langfristige Partnerschaften mit Unternehmen.',
            'Als Mitgesellschafter von PrintMyWall und SunByte investiert er in Drucktechnologie, Digitalisierung und künstliche Intelligenz. Seine Stärke: Potenziale früh erkennen, Menschen verbinden und aus Ideen Geschäftsmodelle entwickeln.',
        ],
        wort: 'Der Mensch im Mittelpunkt. Vertrauen als Fundament. Erfolg als Ergebnis.',
        firmenTitel: 'Unternehmen',
        firmen: [
            { name: 'Sunbyte', rolle: 'Gesellschafter' },
            {
                name: 'PrintMyWall',
                href: 'https://printmywall.at',
                rolle: 'Gesellschafter',
            },
            {
                name: 'AutoSPA',
                href: 'https://autospa.at',
                rolle: 'Gründer und Inhaber',
            },
        ],
    },
]

export default function UeberUnsPage() {
    return (
        <>
            <JsonLd data={PERSON_ZAKIR} />
            <JsonLd data={PERSON_MEDET} />
            <JsonLd
                data={breadcrumbLd([
                    { name: 'Start', path: '/' },
                    { name: 'Über uns', path: '/ueber-uns/' },
                ])}
            />

            {/* ── Kopf ────────────────────────────────────── */}
            <section className="container-edge section-pad-top pb-10 md:pb-14">
                <p className="mono-label text-spark mb-5">hinter sunbyte</p>
                <h1
                    className="font-display"
                    style={{
                        fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
                        color: 'var(--lit)',
                    }}
                >
                    Zwei Köpfe. <Spark>Ein System.</Spark>
                </h1>
            </section>

            {/* ── Wir ─────────────────────────────────────── */}
            <section className="container-edge pb-16 md:pb-24">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-center">
                    <Reveal className="md:col-span-7">
                        <figure style={{ margin: 0 }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/images/team/team.webp"
                                alt="Zakir Daryabi und Ing. Medet Atas, die Gesellschafter von Sunbyte, vor den Logos von SunByte und PrintMyWall."
                                width={1600}
                                height={1067}
                                decoding="async"
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    borderRadius: '6px',
                                    border: '1px solid rgba(201, 184, 163, 0.16)',
                                }}
                            />
                        </figure>
                    </Reveal>

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
                                Sunbyte ist ein Softwareunternehmen aus Wien.
                                Wir entwickeln ein KI-Betriebssystem für
                                Betriebe.
                            </p>
                        </Reveal>
                        <Reveal delay={80}>
                            <p
                                className="text-soft leading-relaxed mt-6"
                                style={{
                                    fontSize: 'clamp(1rem, 1.3vw, 1.1rem)',
                                    maxWidth: '40ch',
                                }}
                            >
                                Aus dem Einzelunternehmen ist eine GmbH mit zwei
                                Gesellschaftern geworden. Der eine baut das
                                System, der andere kennt Vertrieb und Aufbau von
                                Unternehmen aus eigener Erfahrung.
                            </p>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ── Zwei Köpfe ──────────────────────────────── */}
            <section className="container-edge pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-16 items-start">
                    {KOEPFE.map((k, i) => (
                        <Reveal key={k.name} delay={i * 90}>
                            <article className="kopf">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={k.bild}
                                    alt={k.alt}
                                    width={800}
                                    height={1000}
                                    loading="lazy"
                                    decoding="async"
                                    className="kopf__bild"
                                />
                                <h2 className="font-display kopf__name">
                                    {k.name}
                                </h2>
                                <p className="kopf__rolle">{k.rolle}</p>
                                <div className="kopf__text">
                                    {k.text.map((absatz, n) => (
                                        <p key={n}>{absatz}</p>
                                    ))}
                                </div>
                                <p className="font-display-card kopf__wort">
                                    „{k.wort}“
                                </p>
                                <div className="kopf__firmen">
                                    <p className="mono-label text-muted">
                                        {k.firmenTitel}
                                    </p>
                                    <ul>
                                        {k.firmen.map(f => (
                                            <li key={f.name}>
                                                {f.href ? (
                                                    <a
                                                        href={f.href}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="kopf-link"
                                                    >
                                                        {f.name}
                                                    </a>
                                                ) : (
                                                    <span className="text-lit">
                                                        {f.name}
                                                    </span>
                                                )}
                                                <span>{f.rolle}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </article>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* ── Was wir vorhaben ────────────────────────── */}
            <section
                className="container-edge section-pad relative overflow-hidden"
                style={{
                    background:
                        'radial-gradient(circle at 18% 50%, rgba(232,90,31,0.10) 0%, transparent 55%)',
                }}
            >
                <Reveal as="p" className="mono-label text-spark mb-6">
                    ↳ was wir vorhaben
                </Reveal>
                <Reveal
                    as="h2"
                    delay={60}
                    className="font-display"
                    style={{
                        fontSize: 'clamp(2.25rem, 6.5vw, 5rem)',
                        color: 'var(--lit)',
                        maxWidth: '16ch',
                    }}
                >
                    Wir bauen Sunbyte zu einer{' '}
                    <span style={{ whiteSpace: 'nowrap' }}>
                        <Spark>IT-Weltmacht.</Spark>
                    </span>
                </Reveal>
                <div
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 mt-10"
                    style={{ maxWidth: '70rem' }}
                >
                    <Reveal as="p" delay={120} className="text-soft leading-relaxed" style={absatz}>
                        Wir wollen das KI-Betriebssystem standardisieren, damit
                        es in Österreich, im DACH-Raum, in der EU und weltweit
                        eingesetzt werden kann. Dafür bauen wir ein Netzwerk von
                        Agenturen auf, die es vertreiben und selbst nutzen.
                    </Reveal>
                    <Reveal as="p" delay={160} className="text-soft leading-relaxed" style={absatz}>
                        Österreich liegt zentral in Europa. Wir bauen ein
                        Netzwerk aus jungen Unternehmen auf und denken
                        langfristig darüber nach, wie sich die österreichische
                        Wirtschaft stärken und nach vorne bringen lässt.
                    </Reveal>
                </div>
            </section>

            {/* ── CTA ─────────────────────────────────────── */}
            <CtaBand
                headline={
                    <>
                        Sprechen Sie <Spark>mit uns.</Spark>
                    </>
                }
                sub="Erzählen Sie von Ihrem Betrieb oder Ihrer Agentur. Sie bekommen eine ehrliche Einschätzung, ob und wie das KI-Betriebssystem bei Ihnen passt."
                primaryLabel="erstgespräch anfragen"
                note={
                    <>
                        ↳ erstgespräch gratis &amp; unverbindlich · antwort in
                        unter 24 h
                    </>
                }
            />
        </>
    )
}

const absatz: React.CSSProperties = {
    fontSize: 'clamp(1rem, 1.3vw, 1.15rem)',
    maxWidth: '46ch',
}
