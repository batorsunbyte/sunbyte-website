import Hero from '@/components/Hero'
import ServiceTeaserCards from '@/components/ServiceTeaserCards'
import Reveal from '@/components/Reveal'
import Faq from '@/components/Faq'
import JsonLd from '@/components/JsonLd'
import { SectionHeader, Spark, CtaBand, CtaButton } from '@/components/ui'
import { CASES, CaseVisual } from '@/components/Cases'
import { faqLd } from '@/lib/seo'

const FAQ_ITEMS = [
    {
        q: 'Was macht Sunbyte?',
        a: 'Sunbyte ist ein IT-Dienstleister aus Wien mit zwei Diensten: professionelle Webseiten (erstellen oder modernisieren, ab 2.000 €) und KI-Sichtbarkeit (1.000 €) — damit dich Google und KI wie ChatGPT finden und weiterempfehlen.',
    },
    {
        q: 'Was kostet eine Website?',
        a: 'Der Einstieg liegt bei ab 2.000 € (Paket Standard). Premium — das voll interaktive Erlebnis — startet ab 5.000 €. Du bekommst vorab einen klaren Fixpreis.',
    },
    {
        q: 'Was kostet KI-Sichtbarkeit?',
        a: 'KI-Sichtbarkeit kostet 1.000 € als fixes Paket — inklusive Analyse, Umsetzung und einem belegten Vorher/Nachher-Report.',
    },
    {
        q: 'Für wen und wo arbeitet ihr?',
        a: 'Wir arbeiten mit Unternehmen in Wien und ganz Österreich. Sitz ist Wien — gearbeitet wird remote und persönlich.',
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

            {/* ── Proof-Strip ─────────────────────────────── */}
            <section
                className="container-edge"
                style={{
                    borderBottom: '1px solid rgba(201, 184, 163, 0.10)',
                }}
            >
                <Reveal>
                    <div className="flex flex-wrap items-center gap-x-10 gap-y-3 py-7">
                        {[
                            '5 projekte live im netz',
                            'wien · melbourne',
                            'antwort < 24 h',
                            'noch 2 slots für 2026',
                        ].map(t => (
                            <span
                                key={t}
                                className="mono-label text-muted"
                                style={{ fontSize: '0.62rem' }}
                            >
                                ↳ {t}
                            </span>
                        ))}
                    </div>
                </Reveal>
            </section>

            {/* ── 01 Leistungen ───────────────────────────── */}
            <section className="container-edge section-pad">
                <SectionHeader
                    kicker="01 — leistungen"
                    title={
                        <>
                            Zwei Dienste.
                            <br />
                            <Spark>Ein Ziel: dass man dich sieht.</Spark>
                        </>
                    }
                    sub="Eine Seite, die in Sekunden überzeugt — und KI-Sichtbarkeit, damit dich auch ChatGPT empfiehlt."
                    className="mb-14 md:mb-20"
                />
                <ServiceTeaserCards />
            </section>

            {/* ── 02 Referenzen (Bild-Teaser) ─────────────── */}
            <section className="container-edge section-pad">
                <SectionHeader
                    kicker="02 — referenzen"
                    title={
                        <>
                            Sieh selbst.
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
                                <CaseVisual
                                    slug={c.slug}
                                    domain={c.domain}
                                    name={c.name}
                                />
                                <div className="flex items-baseline justify-between mt-4 gap-4">
                                    <h3
                                        className="font-display"
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
                        alle referenzen
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
                    kicker="04 — faq"
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
                        Lass uns über dein <Spark>Projekt reden.</Spark>
                    </>
                }
                sub="Noch 2 Projekt-Slots für 2026. Der erste Call ist gratis — danach weißt du, wie dein Auftritt aussehen würde."
            />
        </>
    )
}
