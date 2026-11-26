import type { Metadata } from 'next'
import Link from 'next/link'
import Reveal from '@/components/Reveal'
import Faq from '@/components/Faq'
import JsonLd from '@/components/JsonLd'
import { SectionHeader, Spark, CtaBand } from '@/components/ui'
import { faqLd, breadcrumbLd, PRICING } from '@/lib/seo'

/**
 * Ratgeber-Seite: „Was kostet eine Website in Österreich?"
 *
 * Die eine Content-Seite mit dem besten Verhältnis aus Suchvolumen, Kaufnähe
 * und schwacher Konkurrenz: Fast keine Wiener Agentur nennt öffentlich
 * Zahlen — Sunbyte hat Fixpreise und nutzt genau das als Ranking-Hebel.
 * Bewusst KEINE /webdesign-wien/-Doorway: Die würde /webseiten kannibalisieren.
 */

export const metadata: Metadata = {
    title: 'Was kostet eine Website in Österreich? Echte Zahlen',
    description:
        'Website erstellen lassen: Was kostet das wirklich? Ehrliche Antwort mit echten Preisen statt „kommt drauf an" — von einem Wiener Anbieter, der seine Fixpreise öffentlich macht.',
    alternates: { canonical: '/was-kostet-eine-website/' },
}

const FAQ_ITEMS = [
    {
        q: 'Warum sagen die meisten Agenturen nur: kommt drauf an?',
        a: 'Weil der Preis wirklich vom Umfang abhängt — aber auch, weil eine offene Zahl vergleichbar macht. Wir drehen es um: Du bekommst vor dem Start einen Fixpreis, und der gilt. Kein Nachverhandeln, keine Überraschung auf der Rechnung.',
    },
    {
        q: 'Ist eine billige Website nicht besser als keine?',
        a: 'Kurzfristig ja. Aber eine Website ist dein digitales Schaufenster — wenn sie nach Vorlage aussieht, langsam lädt oder auf dem Handy bricht, kostet sie dich Vertrauen, statt Kunden zu bringen. Dann war auch der kleine Preis zu teuer.',
    },
    {
        q: 'Was kostet der Betrieb nach dem Launch?',
        a: 'Unsere Seiten laufen als statische Seiten — laufend bleiben nur Domain und Hosting. Auf Wunsch übernehmen wir die Betreuung um 500 € pro Quartal: Updates, kleine Anpassungen, Technik-Checks und ein direkter Draht. Optional, kein Muss.',
        more: { label: 'pakete und betreuung im detail', href: '/webseiten' },
    },
    {
        q: 'Wie lange dauert es, bis meine Website fertig ist?',
        a: 'Meist 2–4 Wochen ab Konzept-Freigabe. Du siehst während des Baus laufend Fortschritt — kein wochenlanges Warten im Dunkeln.',
    },
]

const WEGE = [
    {
        label: 'baukasten',
        title: 'Der Baukasten',
        text: 'Monatsgebühr statt Investition. Klingt billig — kostet dich aber deine Zeit, sieht aus wie tausend andere, und die Seite gehört dir nie ganz: Kündigst du das Abo, ist sie weg.',
    },
    {
        label: 'freelancer',
        title: 'Der Freelancer',
        text: 'Oft günstiger als eine Agentur — aber alles hängt an einer einzelnen Person. Qualität, Tempo und Erreichbarkeit schwanken stark. Gut prüfen, wen du beauftragst.',
    },
    {
        label: 'dienstleister',
        title: 'Agentur / Dienstleister',
        text: 'Du zahlst für Konzept, Design, Texte, Technik — und einen Ansprechpartner, der bleibt. Das ist der teuerste Weg, und der einzige, bei dem das Ergebnis planbar ist.',
    },
]

const FAKTOREN = [
    {
        t: 'Umfang',
        d: 'One-Pager oder zehn Unterseiten — jede Seite braucht Struktur, Text und Design.',
    },
    {
        t: 'Inhalte',
        d: 'Lieferst du Texte und Fotos — oder sollen sie erst entstehen?',
    },
    {
        t: 'Designanspruch',
        d: 'Angepasste Vorlage oder eigenständiges Design, das es nur einmal gibt.',
    },
    {
        t: 'Interaktivität',
        d: 'Formulare, Animationen, Buchung, Mehrsprachigkeit — alles, was die Seite können soll.',
    },
    {
        t: 'Sichtbarkeit',
        d: 'Reicht „online sein" — oder sollen dich Google und KI-Suche aktiv finden?',
    },
]

const PREISE = [
    {
        label: 'website standard',
        price: PRICING.website.label,
        note: 'eigenständiges Design, mobile-first, SEO-sauber',
        href: '/webseiten',
        link: 'webseite erstellen lassen',
    },
    {
        label: 'website premium',
        price: PRICING.websitePremium.label,
        note: 'das volle interaktive Erlebnis — wie diese Seite hier',
        href: '/webseiten',
        link: 'pakete im detail',
    },
    {
        label: 'ki-sichtbarkeit',
        price: `${PRICING.aiVisibility.label} fix`,
        note: 'damit dich ChatGPT & Co. finden und empfehlen',
        href: '/ki-sichtbarkeit',
        link: "ki-sichtbarkeit — so funktioniert's",
    },
]

export default function WasKostetPage() {
    return (
        <>
            <JsonLd data={faqLd(FAQ_ITEMS)} />
            <JsonLd
                data={breadcrumbLd([
                    { name: 'Start', path: '/' },
                    {
                        name: 'Was kostet eine Website?',
                        path: '/was-kostet-eine-website/',
                    },
                ])}
            />

            {/* Intro */}
            <section className="container-edge section-pad-top pb-4 md:pb-8">
                <Reveal as="p" className="mono-label text-spark mb-5">
                    ratgeber · kosten
                </Reveal>
                <Reveal
                    as="h1"
                    delay={60}
                    className="font-display"
                    style={{
                        fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                        color: 'var(--lit)',
                        maxWidth: '16ch',
                    }}
                >
                    Was kostet eine Website in <Spark>Österreich?</Spark>
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
                    Ehrliche Zahlen statt „kommt drauf an" — von einem
                    Anbieter, der seine Preise öffentlich macht.
                </Reveal>
                <Reveal
                    as="p"
                    delay={160}
                    className="text-soft mt-5 leading-relaxed"
                    style={{
                        fontSize: 'clamp(0.95rem, 1.3vw, 1.1rem)',
                        maxWidth: '52ch',
                    }}
                >
                    Du willst eine Website erstellen lassen und suchst einen
                    Preis. Die meisten Agenturen sagen: kommt drauf an. Stimmt
                    sogar — hilft dir aber nicht weiter. Deshalb hier die
                    Antwort, so konkret, wie sie seriös sein kann.
                </Reveal>
            </section>

            {/* 01 Drei Wege */}
            <section className="container-edge section-pad">
                <SectionHeader
                    kicker="01 — die optionen"
                    title={
                        <>
                            Drei Wege — und was sie dich{' '}
                            <Spark>wirklich kosten.</Spark>
                        </>
                    }
                    className="mb-12 md:mb-16"
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7">
                    {WEGE.map((w, i) => (
                        <Reveal
                            key={w.label}
                            delay={i * 80}
                            className="flex flex-col h-full"
                            style={{
                                padding: 'clamp(1.75rem, 3vw, 2.5rem)',
                                border: '1px solid rgba(201, 184, 163, 0.16)',
                                borderRadius: '6px',
                                background:
                                    i === 2
                                        ? 'radial-gradient(circle at 80% 12%, rgba(232,90,31,0.10) 0%, transparent 55%)'
                                        : 'transparent',
                            }}
                        >
                            <p className="mono-label text-spark mb-5">
                                {w.label}
                            </p>
                            <h3
                                className="font-display-card mb-4"
                                style={{
                                    fontSize: 'clamp(1.4rem, 2.2vw, 1.8rem)',
                                    color: 'var(--lit)',
                                }}
                            >
                                {w.title}
                            </h3>
                            <p
                                className="text-soft leading-relaxed"
                                style={{ fontSize: '0.98rem' }}
                            >
                                {w.text}
                            </p>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* 02 Preistreiber */}
            <section className="container-edge section-pad pt-0 md:pt-0">
                <SectionHeader
                    kicker="02 — die stellschrauben"
                    title={
                        <>
                            Was den Preis wirklich <Spark>treibt.</Spark>
                        </>
                    }
                    sub="Fünf Faktoren entscheiden, wo dein Projekt landet. Alles davon klären wir im Erstgespräch — bevor du dich festlegst."
                    className="mb-10 md:mb-14"
                />
                <ul className="max-w-2xl">
                    {FAKTOREN.map((f, i) => (
                        <Reveal
                            as="li"
                            key={f.t}
                            delay={i * 60}
                            className="py-5 flex gap-6"
                            style={{
                                borderTop: '1px solid rgba(201, 184, 163, 0.1)',
                            }}
                        >
                            <span
                                className="mono-label text-spark shrink-0"
                                style={{ paddingTop: '0.25rem' }}
                            >
                                0{i + 1}
                            </span>
                            <div>
                                <p
                                    className="font-display-card"
                                    style={{
                                        fontSize: 'clamp(1.15rem, 1.6vw, 1.35rem)',
                                        color: 'var(--lit)',
                                    }}
                                >
                                    {f.t}
                                </p>
                                <p
                                    className="text-soft mt-1.5 leading-relaxed"
                                    style={{ fontSize: '0.98rem', maxWidth: '52ch' }}
                                >
                                    {f.d}
                                </p>
                            </div>
                        </Reveal>
                    ))}
                </ul>
            </section>

            {/* 03 Eigene Preise */}
            <section className="container-edge section-pad pt-0 md:pt-0">
                <SectionHeader
                    kicker="03 — unsere zahlen"
                    title={
                        <>
                            Unsere Preise — <Spark>schwarz auf weiß.</Spark>
                        </>
                    }
                    sub="Vor dem Start bekommst du einen Fixpreis — und der gilt. Keine Von-bis-Nebelkerzen: Das sind die Zahlen, mit denen wir arbeiten."
                    className="mb-10 md:mb-14"
                />
                <div className="max-w-2xl">
                    {PREISE.map((p, i) => (
                        <Reveal
                            key={p.label}
                            delay={i * 60}
                            className="py-6 grid grid-cols-1 sm:grid-cols-[10rem_1fr] gap-2 sm:gap-8 items-baseline"
                            style={{
                                borderTop: '1px solid rgba(201, 184, 163, 0.1)',
                            }}
                        >
                            <p className="mono-label text-muted">{p.label}</p>
                            <div>
                                <p
                                    className="font-display"
                                    style={{
                                        fontSize: 'clamp(1.6rem, 2.6vw, 2.1rem)',
                                        color: 'var(--lit)',
                                        lineHeight: 1.1,
                                    }}
                                >
                                    {p.price}
                                </p>
                                <p
                                    className="text-soft mt-1.5"
                                    style={{ fontSize: '0.98rem' }}
                                >
                                    {p.note}
                                </p>
                                <Link
                                    href={p.href}
                                    className="mono-label text-spark inline-flex items-center gap-2 hover:gap-3 transition-all mt-3"
                                    style={{ fontSize: '0.66rem' }}
                                >
                                    <span aria-hidden>↳</span> {p.link}
                                </Link>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* 04 FAQ */}
            <section className="container-edge section-pad pt-0 md:pt-0">
                <SectionHeader
                    kicker="04 — nachgefragt"
                    title={
                        <>
                            Die Fragen, die sonst{' '}
                            <Spark>keiner beantwortet.</Spark>
                        </>
                    }
                    className="mb-10 md:mb-14"
                />
                <Faq items={FAQ_ITEMS} />
            </section>

            {/* CTA */}
            <CtaBand
                primaryHref="/kontakt/?thema=webseite"
                headline={
                    <>
                        Du willst deinen <Spark>Fixpreis</Spark> wissen?
                    </>
                }
                sub="Erzähl uns in 20 Minuten, was du vorhast — du bekommst eine ehrliche Einschätzung und eine Zahl, die hält."
            />
        </>
    )
}
