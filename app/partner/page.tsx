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
 *
 * Abschnitt 02 „Ihre Stärke" (Zakir, 26.11.2026, sinngemäß): Jede Agentur
 * bringt ihre eigene Stärke mit, weil jede auf einen Bereich spezialisiert
 * ist — das ergänzt das System. Agenturen nutzen das System und geben ihre
 * eigenen Funktionen im Netzwerk weiter, sodass andere Agenturen diesen Teil
 * auch weiterverkaufen. So stärkt man einander und wächst gemeinsam.
 * Die Kacheln im Schaubild (SCHWERPUNKTE) sind allgemeine Beispiele für
 * Spezialisierungen, keine Zusage und keine Partnerliste. WIE Funktionen
 * weitergegeben und abgerechnet werden, steht nicht fest → Verweis aufs Gespräch.
 */

export const metadata: Metadata = {
    title: 'KI-Betriebssystem für Agenturen — Partner werden',
    description:
        'Partner werden im KI-OS-Netzwerk von Sunbyte: Agenturen vertreiben das KI-Betriebssystem, nutzen es selbst und bringen ihre Stärke ein.',
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

/** Beispiele für Schwerpunkte von Agenturen — nur zur Veranschaulichung */
const SCHWERPUNKTE = [
    'Recruiting',
    'Werbeanzeigen',
    'Social Media',
    'Websites',
    'Video',
    'Suchmaschinen',
    'IT-Betreuung',
    'Branchenwissen',
]

const SCHRITTE = [
    {
        titel: 'Nutzen',
        text: 'Sie setzen das KI-Betriebssystem in Ihrer Agentur ein und bringen es zu Ihren Kunden.',
    },
    {
        titel: 'Einbringen',
        text: 'Aus dem, was Ihre Agentur besonders gut kann, entstehen eigene Funktionen für das System.',
    },
    {
        titel: 'Weitergeben',
        text: 'Ihre Funktionen geben Sie im Netzwerk weiter. Andere Agenturen verkaufen sie an ihre Kunden, und Sie nutzen die Funktionen der anderen.',
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
        q: 'Kann ich eigene Funktionen ins Netzwerk einbringen?',
        a: 'Ja, das ist die Idee des Netzwerks. Jede Agentur bringt ihre Stärke als Funktionen ein, und andere Agenturen können sie an ihre Kunden weitergeben. Die Konditionen besprechen wir im Partnergespräch.',
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

            {/* ── 02 Ihre Stärke ──────────────────────────── */}
            <section className="container-edge section-pad">
                <SectionHeader
                    kicker="02 — ihre stärke"
                    title={
                        <>
                            Jede Agentur bringt
                            <br />
                            <Spark>ihre Stärke mit.</Spark>
                        </>
                    }
                    className="mb-12 md:mb-16"
                />

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-10 items-center">
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
                                Jede Agentur ist auf einen Bereich
                                spezialisiert. Genau das macht das Netzwerk
                                stark.
                            </p>
                        </Reveal>
                        <Reveal delay={90}>
                            <p
                                className="text-soft leading-relaxed mt-6"
                                style={{
                                    fontSize: 'clamp(1rem, 1.3vw, 1.1rem)',
                                    maxWidth: '40ch',
                                }}
                            >
                                Ihre Stärke ergänzt das System, und die Stärken
                                der anderen ergänzen Ihr Angebot. So stärken wir
                                einander und wachsen gemeinsam.
                            </p>
                        </Reveal>
                    </div>

                    {/* Bild: viele Schwerpunkte links, eine Bibliothek rechts */}
                    <Reveal delay={120} className="md:col-span-7">
                        <div className="warum-bild" aria-hidden>
                            <div>
                                <p className="mono-label text-muted mb-4">
                                    jede agentur bringt, zum beispiel
                                </p>
                                <ul className="staerke-chips">
                                    {SCHWERPUNKTE.map((name, i) => (
                                        <li
                                            key={name}
                                            style={{ animationDelay: `${i * 0.8}s` }}
                                        >
                                            {name}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <span className="warum-bild__pfeil">→</span>

                            <div className="warum-eins">
                                <p className="mono-label text-spark mb-4">
                                    alle nutzen
                                </p>
                                <div className="warum-eins__kern">
                                    <span className="warum-eins__halo" />
                                    <span>
                                        Eine
                                        <br />
                                        Bibliothek
                                    </span>
                                </div>
                            </div>
                        </div>
                        <p className="sr-only">
                            Jede Agentur bringt ihren Schwerpunkt ein, zum
                            Beispiel Recruiting, Werbeanzeigen, Social Media
                            oder Websites. Daraus entsteht eine gemeinsame
                            Bibliothek von Funktionen, die alle Agenturen im
                            Netzwerk nutzen.
                        </p>
                    </Reveal>
                </div>

                <Reveal as="p" className="mono-label text-spark mt-16 md:mt-24 mb-6">
                    ↳ so wachsen wir gemeinsam
                </Reveal>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
                    {SCHRITTE.map((s, i) => (
                        <Reveal key={s.titel} delay={i * 90}>
                            <div className="warum-ziel">
                                <span className="mono-label text-muted">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <h3 className="font-display staerke-schritt">
                                    {s.titel}
                                </h3>
                                <p>{s.text}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
                <Reveal
                    as="p"
                    delay={120}
                    className="text-muted mt-8"
                    style={{ fontSize: '0.9rem', maxWidth: '60ch' }}
                >
                    Wie Funktionen im Netzwerk weitergegeben und verkauft
                    werden, besprechen wir im Partnergespräch.
                </Reveal>
            </section>

            {/* ── 03 Was dazugehört ───────────────────────── */}
            <section className="container-edge section-pad">
                <SectionHeader
                    kicker="03 — was dazugehört"
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
