import type { Metadata } from 'next'
import Reveal from '@/components/Reveal'
import Faq from '@/components/Faq'
import JsonLd from '@/components/JsonLd'
import NetzwerkRinge from '@/components/NetzwerkRinge'
import { SectionHeader, Spark, CtaBand, CtaButton } from '@/components/ui'
import { LEISTUNGEN } from '@/lib/kios'
import { breadcrumbLd, faqLd } from '@/lib/seo'

/**
 * /partner — für Agenturen (KI-OS-Welle, 26.11.2026).
 *
 * Grundlage ist Zakirs Beschreibung: ein Netzwerk von Agenturen, die das
 * KI-Betriebssystem weiterverkaufen UND selbst nutzen; ein Standard für
 * Österreich, DACH, EU und weltweit; gemeinsam verbessern und erweitern.
 * Konditionen und Preise stehen noch nicht fest — deshalb nennt die Seite
 * keine und verweist auf das Gespräch. Keine Zusagen zu Gebieten, Provision
 * oder Schulung, solange Zakir sie nicht vorgibt.
 */

export const metadata: Metadata = {
    title: 'Für Agenturen — Partner im KI-OS-Netzwerk',
    description:
        'Sunbyte baut ein Netzwerk von Agenturen auf, die das KI-Betriebssystem vertreiben und selbst nutzen. Ein Standard für Österreich, DACH und die EU.',
    alternates: { canonical: '/partner/' },
}

const GRUENDE = [
    {
        titel: 'Ein Standard',
        text: 'Wir standardisieren das KI-Betriebssystem, damit es in Österreich, im DACH-Raum, in der EU und weltweit eingesetzt werden kann.',
    },
    {
        titel: 'Gemeinsam besser',
        text: 'Das Netzwerk verbessert und erweitert das System zusammen. Was eine Agentur lernt, hilft allen.',
    },
    {
        titel: 'Verkaufen und selbst nutzen',
        text: 'Sie vertreiben das Betriebssystem an Ihre Kunden und setzen es in der eigenen Agentur ein.',
    },
]

const FAQ_ITEMS = [
    {
        q: 'Für welche Agenturen ist das Netzwerk gedacht?',
        a: 'Für Agenturen, die Betriebe betreuen und ihnen ein KI-Betriebssystem anbieten wollen, zum Beispiel Marketing-, Web- und IT-Agenturen.',
    },
    {
        q: 'Darf ich das System auch in der eigenen Agentur einsetzen?',
        a: 'Ja. Partner vertreiben das KI-Betriebssystem und nutzen es selbst.',
    },
    {
        q: 'Was kostet die Partnerschaft?',
        a: 'Preise und Konditionen besprechen wir im Partnergespräch.',
    },
    {
        q: 'Wie werde ich Partner?',
        a: 'Schreiben Sie uns über das Kontaktformular, per E-Mail oder WhatsApp. Im ersten Gespräch klären wir, ob es für beide Seiten passt.',
    },
]

export default function PartnerPage() {
    return (
        <>
            <JsonLd data={faqLd(FAQ_ITEMS)} />
            <JsonLd
                data={breadcrumbLd([
                    { name: 'Start', path: '/' },
                    { name: 'Für Agenturen', path: '/partner/' },
                ])}
            />

            {/* ── Kopf ────────────────────────────────────── */}
            <section className="container-edge section-pad section-pad-top">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                    <div className="md:col-span-7">
                        <p className="mono-label text-spark mb-5">
                            für agenturen
                        </p>
                        <h1
                            className="font-display"
                            style={{
                                fontSize: 'clamp(2.5rem, 6.4vw, 5rem)',
                                color: 'var(--lit)',
                                maxWidth: '14ch',
                            }}
                        >
                            Ein KI-Betriebssystem{' '}
                            <Spark>für Ihre Kunden.</Spark>
                        </h1>
                        <p
                            className="text-soft leading-relaxed mt-8"
                            style={{
                                fontSize: 'clamp(1.05rem, 1.4vw, 1.2rem)',
                                maxWidth: '46ch',
                            }}
                        >
                            Sunbyte baut ein Netzwerk von Agenturen auf, die das
                            KI-Betriebssystem vertreiben und selbst nutzen.
                            Werden Sie Partner.
                        </p>
                        <div className="mt-10 flex flex-wrap gap-4">
                            <CtaButton href="/kontakt">
                                partnergespräch anfragen
                            </CtaButton>
                            <CtaButton href="/#alltag" variant="ghost">
                                was das system tut
                            </CtaButton>
                        </div>
                    </div>
                    <div className="md:col-span-5 flex justify-center">
                        <NetzwerkRinge />
                    </div>
                </div>
            </section>

            {/* ── 01 Warum ein Netzwerk ───────────────────── */}
            <section className="container-edge section-pad">
                <SectionHeader
                    kicker="01 — warum ein netzwerk"
                    title={
                        <>
                            Ein Standard.
                            <br />
                            <Spark>Viele Agenturen.</Spark>
                        </>
                    }
                    className="mb-12 md:mb-16"
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
                    {GRUENDE.map((g, i) => (
                        <Reveal key={g.titel} delay={i * 80}>
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
                                        fontSize: 'clamp(1.3rem, 2.2vw, 1.75rem)',
                                        color: 'var(--lit)',
                                        lineHeight: 1.15,
                                    }}
                                >
                                    {g.titel}
                                </h3>
                                <p
                                    className="text-soft leading-relaxed"
                                    style={{ fontSize: '1rem', maxWidth: '32ch' }}
                                >
                                    {g.text}
                                </p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* ── 02 Was dazugehört ───────────────────────── */}
            <section className="container-edge section-pad">
                <SectionHeader
                    kicker="02 — was dazugehört"
                    title={
                        <>
                            Software
                            <br />
                            <Spark>und alles drumherum.</Spark>
                        </>
                    }
                    sub="Das bekommen Betriebe mit dem KI-Betriebssystem. Als Partner bringen Sie es zu Ihren Kunden."
                    className="mb-12 md:mb-16"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
                    {LEISTUNGEN.map((l, i) => (
                        <Reveal key={l.titel} delay={(i % 3) * 80}>
                            <div
                                style={{
                                    borderTop: '1px solid rgba(201, 184, 163, 0.2)',
                                    paddingTop: '1.4rem',
                                }}
                            >
                                <h3
                                    className="font-display-card mb-3"
                                    style={{
                                        fontSize: 'clamp(1.2rem, 1.8vw, 1.45rem)',
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
                                    {l.partner}
                                </p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* ── FAQ ─────────────────────────────────────── */}
            <section className="container-edge section-pad">
                <SectionHeader
                    kicker="03 — faq"
                    title={
                        <>
                            Kurz <Spark>geklärt.</Spark>
                        </>
                    }
                    className="mb-10 md:mb-14"
                />
                <Faq items={FAQ_ITEMS} />
            </section>

            <CtaBand
                headline={
                    <>
                        Bauen wir das Netzwerk <Spark>gemeinsam.</Spark>
                    </>
                }
                sub="Im Partnergespräch klären wir, wie Ihre Agentur das KI-Betriebssystem vertreibt und selbst nutzt, und zu welchen Konditionen."
                primaryLabel="partnergespräch anfragen"
                note={<>↳ unverbindlich · antwort in unter 24 h</>}
            />
        </>
    )
}
