import Hero from '@/components/Hero'
import ServiceTeaserCards from '@/components/ServiceTeaserCards'
import Reveal from '@/components/Reveal'
import Faq from '@/components/Faq'
import JsonLd from '@/components/JsonLd'
import { SectionHeader, Spark, CtaBand, CtaButton } from '@/components/ui'
import { CASES, CaseVisual } from '@/components/Cases'
import LogoWall from '@/components/LogoWall'
import { faqLd } from '@/lib/seo'

/**
 * Startseite — KI-OS-Welle (27.11.2026).
 *
 * Sunbyte verkauft jetzt ein KI-Betriebssystem für Betriebe. Der Text im Hero,
 * in „01 — ihr ki-os" und die sechs Punkte in „02 — im alltag" stammen von
 * Zakir (26.11.2026) und stehen wörtlich. Webseiten und KI-Sichtbarkeit bleiben
 * als Bausteine mit Preis. Die Startseite spricht in Sie-Form.
 * Der frühere Ablauf-Block („So läuft das.") beschrieb den Bau einer Webseite
 * und ist hier raus; für das KI-OS gibt es noch keinen bestätigten Ablauf.
 */

/** Zakirs sechs Punkte, wörtlich */
const ALLTAG = [
    'Findet neue Kunden, während Sie schlafen',
    'Beantwortet Anfragen sofort und vereinbart Termine für Sie',
    'Macht Ihre Werbung: Social Media, Videos, Website',
    'Hat Ihre Konkurrenz im Auge und reagiert sofort',
    'Verteilt Aufgaben, kontrolliert sie und vergisst nichts',
    'Baut sich selbst, was Ihr Betrieb braucht, ohne teure Zusatz-Software',
]

const FAQ_ITEMS = [
    {
        q: 'Was macht Sunbyte?',
        a: 'Sunbyte installiert ein KI-Betriebssystem, das auf Ihren Betrieb zugeschnitten ist. Darin arbeitet ein selbstlernendes Denksystem mit mehreren KI-Agenten Tag und Nacht. Sie bleiben der Chef und haben die volle Kontrolle, auch unterwegs von Ihrem Handy.',
    },
    {
        q: 'Was kostet das KI-OS?',
        a: 'Das hängt von Ihrem Betrieb ab. Das Erstgespräch ist kostenlos und unverbindlich, danach bekommen Sie ein Angebot.',
    },
    {
        q: 'Gibt es Webseite und KI-Sichtbarkeit auch einzeln?',
        a: 'Ja. Eine Webseite gibt es ab 3.000 € (Paket Standard) und ab 6.000 € (Premium). KI-Sichtbarkeit kostet 1.000 € als fixes Paket.',
    },
    {
        q: 'Was ist mit kleinen und speziellen Aufträgen?',
        a: 'Kleine und spezielle Aufträge übermitteln wir gerne an unsere geprüften Netzwerkpartner.',
    },
    {
        q: 'Für wen und wo arbeiten Sie?',
        a: 'Wir arbeiten mit Betrieben in Wien und ganz Österreich. Der Sitz ist Wien, gearbeitet wird remote und persönlich.',
    },
    {
        q: 'Wie schnell bekomme ich eine Antwort?',
        a: 'Das Erstgespräch ist gratis und unverbindlich, die Antwort kommt meist innerhalb von 24 Stunden.',
    },
]

/** Die 4 stärksten Live-Cases für den Home-Teaser */
const HOME_CASES = CASES.filter(c => c.status === 'live').slice(0, 4)

export default function Home() {
    return (
        <>
            <JsonLd data={faqLd(FAQ_ITEMS)} />
            <Hero />

            <LogoWall />

            {/* ── 01 Ihr KI-OS ────────────────────────────── */}
            <section className="container-edge section-pad">
                <SectionHeader
                    kicker="01 — ihr ki-os"
                    title={
                        <>
                            Einmal erklärt,
                            <br />
                            <Spark>nie vergessen.</Spark>
                        </>
                    }
                    className="mb-12 md:mb-16"
                />

                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
                    <Reveal className="md:col-span-7">
                        <p
                            className="leading-relaxed"
                            style={{
                                fontSize: 'clamp(1.15rem, 1.7vw, 1.45rem)',
                                color: 'var(--lit)',
                                maxWidth: '34ch',
                            }}
                        >
                            In Ihrem KI-Betriebssystem arbeitet ein
                            selbstlernendes Denksystem mit mehreren KI-Agenten
                            Tag &amp; Nacht.
                        </p>
                        <p
                            className="text-soft leading-relaxed mt-6"
                            style={{
                                fontSize: 'clamp(1rem, 1.3vw, 1.1rem)',
                                maxWidth: '44ch',
                            }}
                        >
                            Ihr Denksystem kennt Ihre Kunden, Mitarbeiter und
                            Abläufe jeden Tag ein Stück besser.
                        </p>
                    </Reveal>

                    <Reveal delay={90} className="md:col-span-5">
                        <div
                            style={{
                                borderLeft: '2px solid var(--spark)',
                                paddingLeft: 'clamp(1.2rem, 2.4vw, 2rem)',
                            }}
                        >
                            <p
                                className="font-display-card"
                                style={{
                                    fontSize: 'clamp(1.5rem, 2.6vw, 2.1rem)',
                                    color: 'var(--lit)',
                                    lineHeight: 1.15,
                                }}
                            >
                                Sie bleiben der Chef.
                            </p>
                            <p
                                className="text-soft leading-relaxed mt-4"
                                style={{
                                    fontSize: 'clamp(1rem, 1.3vw, 1.1rem)',
                                    maxWidth: '30ch',
                                }}
                            >
                                Sie haben die volle Kontrolle – sogar unterwegs
                                von Ihrem Handy.
                            </p>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ── 02 Im Alltag ────────────────────────────── */}
            <section id="alltag" className="container-edge section-pad" style={{ scrollMarginTop: '5rem' }}>
                <SectionHeader
                    kicker="02 — im alltag"
                    title={
                        <>
                            Ihr KI-Denksystem
                            <br />
                            <Spark>im Alltag.</Spark>
                        </>
                    }
                    className="mb-12 md:mb-16"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
                    {ALLTAG.map((punkt, i) => (
                        <Reveal key={punkt} delay={(i % 3) * 80}>
                            <div
                                style={{
                                    borderTop: '1px solid rgba(232, 90, 31, 0.35)',
                                    paddingTop: '1.4rem',
                                }}
                            >
                                <span className="mono-label text-spark">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <h3
                                    className="font-display-card mt-3"
                                    style={{
                                        fontSize: 'clamp(1.2rem, 1.9vw, 1.5rem)',
                                        color: 'var(--lit)',
                                        lineHeight: 1.2,
                                        maxWidth: '22ch',
                                    }}
                                >
                                    {punkt}
                                </h3>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* ── 03 Bausteine ────────────────────────────── */}
            <section className="container-edge section-pad">
                <SectionHeader
                    kicker="03 — bausteine"
                    title={
                        <>
                            Zwei Bausteine
                            <br />
                            <Spark>gibt es auch einzeln.</Spark>
                        </>
                    }
                    sub="Webseite und KI-Sichtbarkeit sind Teile des Systems. Beide bekommen Sie auch für sich, zum festen Preis."
                    className="mb-14 md:mb-20"
                />
                <ServiceTeaserCards />

                <Reveal
                    as="p"
                    className="text-soft leading-relaxed mt-10"
                    style={{
                        fontSize: 'clamp(1rem, 1.3vw, 1.1rem)',
                        maxWidth: '52ch',
                    }}
                >
                    <span aria-hidden className="text-spark">
                        ↳{' '}
                    </span>
                    Kleine und spezielle Aufträge übermitteln wir gerne an
                    unsere geprüften Netzwerkpartner.
                </Reveal>
            </section>

            {/* ── 04 Referenzen (Bild-Teaser) ─────────────── */}
            <section className="container-edge section-pad">
                <SectionHeader
                    kicker="04 — referenzen"
                    title={
                        <>
                            Sehen Sie selbst.
                            <br />
                            <Spark>Alles live im Netz.</Spark>
                        </>
                    }
                    className="mb-12 md:mb-16"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-9">
                    {HOME_CASES.map((c, i) => (
                        <Reveal key={c.slug} delay={(i % 2) * 80}>
                            <a
                                href={c.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group block"
                                aria-label={`${c.name} — Website öffnen`}
                            >
                                <div className="relative">
                                    <CaseVisual
                                        slug={c.slug}
                                        domain={c.domain}
                                        name={c.name}
                                    />
                                    {/* Hover: verspricht das Live-Erlebnis */}
                                    <span
                                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        style={{
                                            background: 'rgba(14,10,5,0.45)',
                                            borderRadius: '8px',
                                        }}
                                        aria-hidden
                                    >
                                        <span
                                            className="mono-label"
                                            style={{
                                                color: 'var(--lit)',
                                                border: '1px solid rgba(255,243,228,0.35)',
                                                background: 'rgba(14,10,5,0.6)',
                                                padding: '0.7rem 1.2rem',
                                                borderRadius: '3px',
                                                fontSize: '0.65rem',
                                                letterSpacing: '0.16em',
                                            }}
                                        >
                                            live ansehen ↗
                                        </span>
                                    </span>
                                </div>
                                <div className="flex items-baseline justify-between mt-4 gap-4">
                                    <h3
                                        className="font-display-card"
                                        style={{
                                            fontSize:
                                                'clamp(1.2rem, 2vw, 1.6rem)',
                                            color: 'var(--lit)',
                                        }}
                                    >
                                        {c.name}
                                    </h3>
                                    <span
                                        className="mono-label text-muted group-hover:text-spark transition-colors shrink-0"
                                        style={{ fontSize: '0.6rem' }}
                                    >
                                        {c.meta.split('·')[0].trim()} ↗
                                    </span>
                                </div>
                            </a>
                        </Reveal>
                    ))}
                </div>

                <Reveal className="mt-12">
                    <CtaButton href="/arbeiten" variant="ghost">
                        alle referenzen — live ansehen
                    </CtaButton>
                </Reveal>
            </section>

            {/* ── Vision-Zeile ────────────────────────────── */}
            <section
                className="container-edge section-pad relative overflow-hidden"
                style={{
                    background:
                        'radial-gradient(circle at 18% 50%, rgba(232,90,31,0.10) 0%, transparent 55%)',
                }}
            >
                <Reveal as="p" className="mono-label text-spark mb-6">
                    ↳ unsere mission
                </Reveal>
                <Reveal
                    as="h2"
                    delay={60}
                    className="font-display"
                    style={{
                        fontSize: 'clamp(2.5rem, 8vw, 6rem)',
                        color: 'var(--lit)',
                        maxWidth: '16ch',
                    }}
                >
                    Wir bauen Sunbyte zu einer{' '}
                    <Spark>IT-Weltmacht.</Spark>
                </Reveal>
                <Reveal
                    as="p"
                    delay={120}
                    className="text-soft mt-8 leading-relaxed"
                    style={{
                        fontSize: 'clamp(1rem, 1.4vw, 1.2rem)',
                        maxWidth: '44ch',
                    }}
                >
                    Zwei Brüder, über 20 Jahre kombinierte Erfahrung — mit dem
                    Anspruch, Weltklasse zu liefern. Nicht Durchschnitt.
                </Reveal>
                <Reveal delay={180} className="mt-9">
                    <CtaButton href="/ueber-uns" variant="ghost">
                        die menschen dahinter
                    </CtaButton>
                </Reveal>
            </section>

            {/* ── FAQ ─────────────────────────────────────── */}
            <section className="container-edge section-pad">
                <SectionHeader
                    kicker="05 — faq"
                    title={
                        <>
                            Kurz <Spark>geklärt.</Spark>
                        </>
                    }
                    className="mb-10 md:mb-14"
                />
                <Faq items={FAQ_ITEMS} />
            </section>

            {/* ── CTA ─────────────────────────────────────── */}
            <CtaBand
                headline={
                    <>
                        Sprechen wir über <Spark>Ihren Betrieb.</Spark>
                    </>
                }
                sub="Das Erstgespräch ist kostenlos und unverbindlich. Sie erzählen von Ihrem Betrieb, wir zeigen, was ein KI-Betriebssystem dort übernehmen kann."
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
