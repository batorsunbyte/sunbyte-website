import Link from 'next/link'
import Hero from '@/components/Hero'
import Reveal from '@/components/Reveal'
import Faq from '@/components/Faq'
import JsonLd from '@/components/JsonLd'
import { SectionHeader, Spark, CtaBand } from '@/components/ui'
import LogoWall from '@/components/LogoWall'
import SystemStack from '@/components/SystemStack'
import Branchen from '@/components/Branchen'
import NetzwerkRinge from '@/components/NetzwerkRinge'
import KernSystem from '@/components/KernSystem'
import { LEISTUNGEN } from '@/lib/kios'
import { faqLd } from '@/lib/seo'

/**
 * Startseite — das KI-Betriebssystem (KI-OS-Welle, 26.11.2026).
 *
 * Zakir: Sunbyte verkauft ein KI-Betriebssystem, direkt an Betriebe und über
 * ein Netzwerk von Agenturen. Webseiten und KI-Sichtbarkeit gibt es nicht mehr
 * als eigene Angebote. Freie Hand bei Aufbau und Gestaltung, der Globus bleibt.
 *
 * Wörtlich von Zakir: der Hero-Text, die Sätze in „01" und die sechs Punkte in
 * „02" (lib/kios.ts). Alles andere ordnet seine Angaben; Beispiele je Branche
 * sind als Beispiele gekennzeichnet. Kein Preis: Er ist noch nicht festgelegt.
 * Die Seite spricht in Sie-Form.
 */

const FAQ_ITEMS = [
    {
        q: 'Was ist das KI-Betriebssystem von Sunbyte?',
        a: 'Eine Software, die auf Ihren Betrieb zugeschnitten wird. Darin arbeitet ein selbstlernendes Denksystem mit mehreren KI-Agenten Tag und Nacht. Es kennt Ihre Kunden, Mitarbeiter und Abläufe jeden Tag ein Stück besser. Sie bleiben der Chef und haben die volle Kontrolle, auch unterwegs von Ihrem Handy.',
    },
    {
        q: 'Was bekomme ich außer der Software?',
        a: 'Eine Bibliothek von Funktionen, laufende Aktualisierungen und Sicherheit. Dazu beraten wir Sie, helfen bei der Installation und betreuen Sie nach dem Start.',
    },
    {
        q: 'Was kostet das KI-Betriebssystem?',
        a: 'Den Preis besprechen wir im Erstgespräch. Es ist kostenlos und unverbindlich.',
    },
    {
        q: 'Für welche Branchen ist es gedacht?',
        a: 'Für Betriebe aus verschiedenen Branchen, zum Beispiel Bau, Handwerk, Gastronomie, Fitness und Beauty oder Kfz. Was das System bei Ihnen übernimmt, legen wir gemeinsam fest.',
    },
    {
        q: 'Ich führe eine Agentur. Kann ich das System weiterverkaufen?',
        a: 'Ja. Sunbyte baut ein Netzwerk von Agenturen auf, die das KI-Betriebssystem vertreiben und selbst nutzen. Die Konditionen besprechen wir im Partnergespräch.',
    },
    {
        q: 'Was ist mit kleinen und speziellen Aufträgen?',
        a: 'Kleine und spezielle Aufträge übermitteln wir gerne an unsere geprüften Netzwerkpartner.',
    },
]

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

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-14 items-start">
                    <div className="md:col-span-6">
                        <Reveal>
                            <p
                                className="leading-relaxed"
                                style={{
                                    fontSize: 'clamp(1.15rem, 1.7vw, 1.45rem)',
                                    color: 'var(--lit)',
                                    maxWidth: '32ch',
                                }}
                            >
                                In Ihrem KI-Betriebssystem arbeitet ein
                                selbstlernendes Denksystem mit mehreren
                                KI-Agenten Tag &amp; Nacht.
                            </p>
                            <p
                                className="text-soft leading-relaxed mt-6"
                                style={{
                                    fontSize: 'clamp(1rem, 1.3vw, 1.1rem)',
                                    maxWidth: '42ch',
                                }}
                            >
                                Ihr Denksystem kennt Ihre Kunden, Mitarbeiter
                                und Abläufe jeden Tag ein Stück besser.
                            </p>
                        </Reveal>

                        <Reveal delay={90} className="mt-12">
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
                                    Sie haben die volle Kontrolle – sogar
                                    unterwegs von Ihrem Handy.
                                </p>
                            </div>
                        </Reveal>
                    </div>

                    <Reveal delay={120} className="md:col-span-6">
                        <SystemStack />
                    </Reveal>
                </div>
            </section>

            {/* ── 02 Im Alltag ────────────────────────────── */}
            <section
                id="alltag"
                className="container-edge section-pad"
                style={{ scrollMarginTop: '5rem' }}
            >
                <SectionHeader
                    kicker="02 — im alltag"
                    title={
                        <>
                            Ihr KI-Denksystem
                            <br />
                            <Spark>im Alltag.</Spark>
                        </>
                    }
                    sub="In der Mitte arbeitet Ihr Denksystem. Rundherum liegen die Module, jedes mit eigenen, spezialisierten Agenten."
                    className="mb-12 md:mb-16"
                />

                {/* Kernsystem in der Mitte, Module rundherum (Zakir, 26.11.2026). */}
                <Reveal>
                    <KernSystem />
                </Reveal>
            </section>

            {/* ── 03 Was Sie bekommen ─────────────────────── */}
            <section className="container-edge section-pad">
                <SectionHeader
                    kicker="03 — was sie bekommen"
                    title={
                        <>
                            Software,
                            <br />
                            <Spark>die betreut wird.</Spark>
                        </>
                    }
                    sub="Sie bleiben mit dem System nicht allein. Zum KI-Betriebssystem gehören Beratung, Installation, Aktualisierungen und Betreuung."
                    className="mb-12 md:mb-16"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
                    {LEISTUNGEN.map((l, i) => (
                        <Reveal key={l.titel} delay={(i % 3) * 80}>
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
                                    className="font-display-card mt-3 mb-3"
                                    style={{
                                        fontSize: 'clamp(1.25rem, 1.9vw, 1.55rem)',
                                        color: 'var(--lit)',
                                        lineHeight: 1.2,
                                    }}
                                >
                                    {l.titel}
                                </h3>
                                <p
                                    className="text-soft leading-relaxed"
                                    style={{ fontSize: '1rem', maxWidth: '32ch' }}
                                >
                                    {l.text}
                                </p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* ── 04 Branchen ─────────────────────────────── */}
            <section
                id="branchen"
                className="container-edge section-pad"
                style={{ scrollMarginTop: '5rem' }}
            >
                <SectionHeader
                    kicker="04 — branchen"
                    title={
                        <>
                            Ein Standard.
                            <br />
                            <Spark>Für Ihre Branche.</Spark>
                        </>
                    }
                    sub="Das Betriebssystem ist ein Standard. Was es in Ihrem Betrieb tut, richtet sich nach Ihrer Branche."
                    className="mb-12 md:mb-14"
                />
                <Reveal>
                    <Branchen />
                </Reveal>
            </section>

            {/* ── 05 Zwei Wege ────────────────────────────── */}
            <section className="container-edge section-pad">
                <SectionHeader
                    kicker="05 — zwei wege"
                    title={
                        <>
                            Für Betriebe.
                            <br />
                            <Spark>Und für Agenturen.</Spark>
                        </>
                    }
                    className="mb-12 md:mb-16"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7">
                    {[
                        {
                            href: '/kontakt',
                            label: 'für betriebe',
                            titel: 'Sie kaufen direkt bei Sunbyte.',
                            text: 'Wir beraten Sie, helfen bei der Installation und betreuen Ihr System. Den Preis besprechen wir im Erstgespräch.',
                            cta: 'erstgespräch anfragen',
                            accent: false,
                        },
                        {
                            href: '/partner',
                            label: 'für agenturen',
                            titel: 'Sie vertreiben das KI-OS und nutzen es selbst.',
                            text: 'Werden Sie Teil des Netzwerks: ein gemeinsamer Standard, den wir zusammen verbessern und erweitern.',
                            cta: 'partner werden',
                            accent: true,
                        },
                    ].map((w, i) => (
                        <Reveal key={w.href} delay={i * 90}>
                            <Link
                                href={w.href}
                                className="group relative flex flex-col h-full transition-all duration-300"
                                style={{
                                    padding: 'clamp(1.75rem, 3vw, 2.5rem)',
                                    border: '1px solid rgba(201, 184, 163, 0.16)',
                                    borderRadius: '6px',
                                    background: w.accent
                                        ? 'radial-gradient(circle at 80% 12%, rgba(232,90,31,0.10) 0%, transparent 55%)'
                                        : 'transparent',
                                }}
                            >
                                <span className="mono-label text-spark mb-6">
                                    {w.label}
                                </span>
                                <h3
                                    className="font-display-card mb-4"
                                    style={{
                                        fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)',
                                        color: 'var(--lit)',
                                        lineHeight: 1.12,
                                        maxWidth: '18ch',
                                    }}
                                >
                                    {w.titel}
                                </h3>
                                <p
                                    className="text-soft leading-relaxed mb-9"
                                    style={{
                                        fontSize: 'clamp(0.98rem, 1.2vw, 1.1rem)',
                                        maxWidth: '38ch',
                                    }}
                                >
                                    {w.text}
                                </p>
                                <span
                                    className="mt-auto inline-flex items-center gap-2 mono-label text-spark group-hover:gap-3 transition-all"
                                    style={{ fontSize: '0.7rem' }}
                                >
                                    {w.cta} <span aria-hidden>→</span>
                                </span>
                            </Link>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* ── 06 Netzwerk ─────────────────────────────── */}
            <section
                className="container-edge section-pad relative overflow-hidden"
                style={{
                    background:
                        'radial-gradient(circle at 22% 50%, rgba(232,90,31,0.10) 0%, transparent 55%)',
                }}
            >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-10 items-center">
                    <Reveal className="md:col-span-5 flex justify-center">
                        <NetzwerkRinge />
                    </Reveal>

                    <div className="md:col-span-6 md:col-start-7">
                        <Reveal as="p" className="mono-label text-spark mb-6">
                            ↳ unser ziel
                        </Reveal>
                        <Reveal
                            as="h2"
                            delay={60}
                            className="font-display"
                            style={{
                                fontSize: 'clamp(2.25rem, 5.5vw, 4.5rem)',
                                color: 'var(--lit)',
                            }}
                        >
                            Ein Standard.
                            <br />
                            <Spark>Ein Netzwerk.</Spark>
                        </Reveal>
                        <Reveal
                            as="p"
                            delay={120}
                            className="text-soft mt-8 leading-relaxed"
                            style={{
                                fontSize: 'clamp(1rem, 1.4vw, 1.2rem)',
                                maxWidth: '46ch',
                            }}
                        >
                            Wir wollen das KI-Betriebssystem standardisieren,
                            damit es in Österreich, im DACH-Raum, in der EU und
                            weltweit eingesetzt werden kann. Dafür bauen wir ein
                            Netzwerk von Agenturen auf, die es vertreiben und
                            selbst nutzen. Gemeinsam verbessern und erweitern
                            wir es.
                        </Reveal>
                        <Reveal
                            as="p"
                            delay={180}
                            className="font-display-card mt-9"
                            style={{
                                fontSize: 'clamp(1.25rem, 2vw, 1.6rem)',
                                color: 'var(--lit)',
                                lineHeight: 1.2,
                                maxWidth: '26ch',
                            }}
                        >
                            Wir bauen Sunbyte zu einer{' '}
                            <span style={{ whiteSpace: 'nowrap' }}>
                                <Spark>IT-Weltmacht.</Spark>
                            </span>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ── FAQ ─────────────────────────────────────── */}
            <section className="container-edge section-pad">
                <SectionHeader
                    kicker="07 — faq"
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
