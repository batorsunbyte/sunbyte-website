import Link from 'next/link'
import Hero from '@/components/Hero'
import ServiceTeaserCards from '@/components/ServiceTeaserCards'
import Reveal from '@/components/Reveal'
import Faq from '@/components/Faq'
import JsonLd from '@/components/JsonLd'
import { SectionHeader, Spark, CtaBand, CtaButton } from '@/components/ui'
import { faqLd } from '@/lib/seo'

const FAQ_ITEMS = [
    {
        q: 'Was macht Sunbyte?',
        a: 'Sunbyte ist ein IT-Dienstleister aus Wien mit zwei Diensten: professionelle Webseiten (erstellen oder modernisieren, ab 1.500 €) und KI-Sichtbarkeit (700 €) — damit dich Google und KI wie ChatGPT finden und weiterempfehlen.',
    },
    {
        q: 'Was kostet eine Website?',
        a: 'Der Einstieg liegt bei ab 1.500 € (Paket Standard). Premium ist ein individuelles Angebot. Du bekommst vorab einen klaren Fixpreis.',
    },
    {
        q: 'Was kostet KI-Sichtbarkeit?',
        a: 'KI-Sichtbarkeit kostet 700 € als fixes Paket — inklusive Analyse, Umsetzung und einem belegten Vorher/Nachher-Report.',
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

export default function Home() {
    return (
        <>
            <JsonLd data={faqLd(FAQ_ITEMS)} />
            <Hero />

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
                    sub="Eine Seite, die in Sekunden überzeugt — und KI-Sichtbarkeit, damit dich auch ChatGPT weiterempfiehlt. Beides aus einer Hand, in Wien gebaut."
                    className="mb-14 md:mb-20"
                />
                <ServiceTeaserCards />
            </section>

            {/* ── 02 Arbeiten (Teaser) ────────────────────── */}
            <section className="container-edge section-pad">
                <SectionHeader
                    kicker="02 — arbeiten"
                    title={
                        <>
                            Echte Projekte.
                            <br />
                            <Spark>Live im Netz.</Spark>
                        </>
                    }
                    className="mb-12 md:mb-16"
                />

                <div className="flex flex-col">
                    <CaseRow
                        name="kfz22"
                        meta="live · kfz22.com"
                        desc="Premium-Webauftritt für einen Wiener KFZ-Meisterbetrieb."
                        href="https://kfz22.com"
                        external
                    />
                    <CaseRow
                        name="printmywall"
                        meta="in entwicklung"
                        desc="Eigene Marke — Direktdruck auf Wände, kompletter Re-Launch."
                    />
                    <CaseRow
                        name="dein projekt"
                        meta="freier slot · 2026"
                        desc="Wäre das hier — wir nehmen noch Projekte an."
                        href="/kontakt"
                        accent
                    />
                </div>

                <Reveal className="mt-10">
                    <CtaButton href="/arbeiten" variant="ghost">
                        alle arbeiten
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
                        maxWidth: '52ch',
                    }}
                >
                    Von Wien aus, von Grund auf. Zwei Brüder, über 20 Jahre
                    kombinierte Erfahrung in IT, KI und Design — mit dem
                    Anspruch, Weltklasse zu liefern, nicht Durchschnitt.
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
                sub="Der erste Call ist gratis — danach weißt du, wie dein Auftritt konkret aussehen würde. Antwort meist innerhalb von 24 Stunden."
            />
        </>
    )
}

// ── Sub-Component: kompakte Case-Zeile (Home-Teaser) ──────────
function CaseRow({
    name,
    meta,
    desc,
    href,
    external = false,
    accent = false,
}: {
    name: string
    meta: string
    desc: string
    href?: string
    external?: boolean
    accent?: boolean
}) {
    const inner = (
        <div
            className="group grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-baseline py-6 md:py-7"
            style={{ borderTop: '1px solid rgba(201, 184, 163, 0.12)' }}
        >
            <div className="md:col-span-4 flex items-baseline gap-4">
                <h3
                    className="font-display"
                    style={{
                        fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
                        color: accent ? 'var(--spark)' : 'var(--lit)',
                    }}
                >
                    {name}
                </h3>
            </div>
            <p
                className="md:col-span-6 text-soft leading-snug"
                style={{ fontSize: 'clamp(0.95rem, 1.2vw, 1.05rem)' }}
            >
                {desc}
            </p>
            <div className="md:col-span-2 md:text-right">
                <span
                    className="mono-label text-muted group-hover:text-spark transition-colors"
                    style={{ fontSize: '0.6rem' }}
                >
                    {meta}
                    {href && <span aria-hidden> {external ? '↗' : '→'}</span>}
                </span>
            </div>
        </div>
    )

    if (!href) return <Reveal>{inner}</Reveal>
    if (external)
        return (
            <Reveal>
                <a href={href} target="_blank" rel="noopener noreferrer">
                    {inner}
                </a>
            </Reveal>
        )
    return (
        <Reveal>
            <Link href={href}>{inner}</Link>
        </Reveal>
    )
}
