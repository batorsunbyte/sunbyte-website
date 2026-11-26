import type { Metadata } from 'next'
import Link from 'next/link'
import Reveal from '@/components/Reveal'
import WebPackages from '@/components/WebPackages'
import { CaseVisual } from '@/components/Cases'
import Steps from '@/components/Steps'
import Faq from '@/components/Faq'
import JsonLd from '@/components/JsonLd'
import { SectionHeader, Spark, CtaBand, CtaButton } from '@/components/ui'
import { serviceLd, faqLd, breadcrumbLd, PRICING } from '@/lib/seo'

const FAQ_ITEMS = [
    {
        q: 'Was kostet eine Website bei Sunbyte?',
        a: 'Der Einstieg (Paket Standard) liegt bei ab 3.000 €. Premium mit vollem interaktivem Erlebnis startet ab 6.000 €. Du bekommst vorab einen klaren Fixpreis — keine versteckten Kosten. Was deinen Preis bestimmt: der Umfang der Seite, ob Inhalte schon da sind oder entstehen, und Extras wie Mehrsprachigkeit.',
    },
    {
        q: 'Was genau ist im Preis enthalten?',
        a: 'Alles, was deine Seite zum Laufen braucht: Konzept, Struktur, alle Texte, Design, Umsetzung, Bild-Aufbereitung, SEO-Basics und der Launch auf deiner Domain. Du lieferst dein Wissen und dein Feedback — den Rest übernehmen wir. Der Fixpreis steht schriftlich fest, bevor wir starten.',
    },
    {
        q: 'Was, wenn mir das Design nicht gefällt?',
        a: 'Dann bauen wir nicht. Das Design wird vor dem Bau abgestimmt — du gibst Feedback, wir überarbeiten, bis es passt. Gebaut wird erst, wenn du sagst: genau so.',
    },
    {
        q: 'Wie lange dauert es, bis meine Seite live ist?',
        a: 'Je nach Umfang meist 2–4 Wochen ab Konzept-Freigabe. Du siehst während des Baus laufend Fortschritt — kein wochenlanges Warten im Dunkeln.',
    },
    {
        q: 'Könnt ihr meine bestehende Website aktualisieren?',
        a: 'Ja. Wir modernisieren bestehende Seiten (Design, Technik, Tempo, SEO) oder bauen komplett neu — je nachdem, was für dich mehr Sinn ergibt.',
    },
    {
        q: 'Ist SEO inklusive?',
        a: 'SEO-Basics (saubere Technik, Struktur, Meta-Daten, mobil & schnell) sind immer dabei. Auf Wunsch erweitern wir um lokale SEO für Wien und KI-Sichtbarkeit.',
        more: { label: 'mehr zu ki-sichtbarkeit — 1.000 € fix', href: '/ki-sichtbarkeit' },
    },
    {
        q: 'Kann ich die Seite später selbst pflegen?',
        a: 'Ja. Die Seite gehört dir — fertig bezahlt, keine Pflicht zu laufenden Kosten bei uns. Wir richten dich so ein, dass du Inhalte selbst ändern kannst. Oder wir übernehmen die Betreuung — siehe nächste Frage. Du entscheidest, die Seite läuft auch ohne uns.',
    },
    {
        q: 'Was kostet die Seite nach dem Launch?',
        a: 'Nach der Übergabe gehört die Seite dir — samt allen Zugängen. Laufend bleiben nur Domain und Hosting. Wenn du willst, übernehmen wir die Betreuung: 500 € pro Quartal für Updates, kleine Anpassungen, Technik-Checks und einen direkten Draht, wenn etwas ist. Optional, kein Muss.',
    },
]

export const metadata: Metadata = {
    title: 'Webseite erstellen lassen in Wien — ab 3.000 €',
    description:
        'Webdesign aus Wien, ab 3.000 €: neue Website erstellen oder bestehende Seite modernisieren. Eigenständiges Design, mobile-first, SEO-sauber, blitzschnell. Erstgespräch gratis.',
    alternates: { canonical: '/webseiten/' },
}

const SERVICE_LD = serviceLd({
    name: 'Webseiten erstellen & aktualisieren',
    serviceType: 'Webentwicklung & Webdesign',
    description:
        'Erstellung neuer Websites und Modernisierung bestehender Seiten. Pakete Standard und Premium. Eigenständiges Design, mobile-first, SEO-sauber, statischer Hochleistungs-Build.',
    price: PRICING.website.from,
    url: '/webseiten',
})

const STEPS = [
    {
        title: 'Gespräch',
        text: 'Wir verstehen dein Geschäft, deine Ziele und deine Zielgruppe. Gratis und unverbindlich.',
    },
    {
        title: 'Konzept & Fixpreis',
        text: 'Struktur, Texte, ein eigenständiges Design — und dein Fixpreis, schriftlich. Alles steht, bevor eine Zeile Code entsteht.',
    },
    {
        title: 'Build',
        text: 'Sauber gebaut: schnell, mobile-first, SEO- und technik-sauber. Du siehst Fortschritt, kein Blackbox.',
    },
    {
        title: 'Launch & Betreuung',
        text: 'Live-Schaltung und persönliche Übergabe. Danach auf Wunsch: Betreuung um 500 € pro Quartal — direkter Draht, kein Ticket-System.',
    },
]

export default function WebseitenPage() {
    return (
        <>
            <JsonLd data={SERVICE_LD} />
            <JsonLd data={faqLd(FAQ_ITEMS)} />
            <JsonLd data={breadcrumbLd([{ name: 'Start', path: '/' }, { name: 'Webseiten', path: '/webseiten/' }])} />

            {/* Intro */}
            <section className="container-edge section-pad-top pb-4 md:pb-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                    <div className="lg:col-span-6">
                        <Reveal as="p" className="mono-label text-spark mb-5">
                            webdesign wien · ab 3.000 €
                        </Reveal>
                        <Reveal
                            as="h1"
                            delay={60}
                            className="font-display"
                            style={{
                                fontSize: 'clamp(2.75rem, 6.5vw, 5.5rem)',
                                color: 'var(--lit)',
                                maxWidth: '14ch',
                            }}
                        >
                            Eine Seite, die <Spark>verkauft.</Spark>
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
                            Ob neu gebaut oder bestehende Seite modernisiert: Du
                            bekommst einen Auftritt, der in Sekunden Vertrauen
                            schafft — schnell, eigenständig und ohne
                            Template-Look.{' '}
                            <span className="text-lit">Ab 3.000 €.</span>
                        </Reveal>
                        <Reveal
                            delay={180}
                            className="mt-9 flex flex-wrap gap-4"
                        >
                            <CtaButton href="/kontakt/?thema=webseite">
                                Projekt anfragen
                            </CtaButton>
                            <CtaButton href="/arbeiten" variant="ghost">
                                alle referenzen
                            </CtaButton>
                        </Reveal>
                    </div>

                    {/* Live-Vorschau: echte Seite, die wir gebaut haben */}
                    <div className="lg:col-span-6">
                        <Reveal delay={140}>
                            <CaseVisual
                                slug="impulsiv"
                                domain="impulsiv-fitness.at"
                                name="Impulsiv Fitness"
                                href="https://impulsiv-fitness.at"
                                live
                            />
                            <a
                                href="https://impulsiv-fitness.at"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mono-label text-muted hover:text-spark transition-colors mt-3 inline-block"
                                style={{ fontSize: '0.62rem' }}
                            >
                                ↳ impulsiv-fitness.at — von uns gebaut, live im
                                Netz ↗
                            </a>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Pakete */}
            <section className="container-edge section-pad">
                <SectionHeader
                    kicker="01 — pakete"
                    title={
                        <>
                            Zwei Wege.
                            <br />
                            <Spark>Sieh den Unterschied.</Spark>
                        </>
                    }
                    sub="Beide hochwertig, beide ohne Baukasten. Der Unterschied: Standard überzeugt deine Kunden — Premium bleibt ihnen im Kopf."
                    className="mb-14 md:mb-20"
                />
                <WebPackages />

                {/* Folgekosten-Einwand direkt bei den Preisen beantworten */}
                <Reveal delay={120} className="mt-10 md:mt-12">
                    <p
                        className="mono-label text-spark mb-3"
                        style={{ fontSize: '0.62rem' }}
                    >
                        ↳ und danach?
                    </p>
                    <p
                        className="text-lit font-display-card"
                        style={{ fontSize: 'clamp(1.15rem, 1.8vw, 1.4rem)' }}
                    >
                        Betreuung — 500 € pro Quartal
                    </p>
                    <p
                        className="text-soft mt-2 leading-relaxed"
                        style={{ maxWidth: '58ch' }}
                    >
                        Deine Seite bleibt schnell, sicher und aktuell. Pflege,
                        Updates, kleine Änderungen — und ein direkter Draht zu
                        dem, der sie gebaut hat. Optional: die Seite gehört dir
                        auch ohne.
                    </p>
                </Reveal>

                {/* Cross-Sell: die Kombi aktiv verkaufen */}
                <Reveal className="mt-10 md:mt-12">
                    <p
                        className="mono-label text-spark mb-2"
                        style={{ fontSize: '0.62rem' }}
                    >
                        ↳ dazu passt
                    </p>
                    <p
                        className="text-soft leading-relaxed"
                        style={{
                            fontSize: 'clamp(1rem, 1.2vw, 1.05rem)',
                            maxWidth: '52ch',
                        }}
                    >
                        Deine neue Seite kann mehr, als gefunden werden — mit
                        KI-Sichtbarkeit (1.000 € fix) machen wir sie auch für
                        ChatGPT &amp; Co. lesbar.
                    </p>
                    <Link
                        href="/ki-sichtbarkeit"
                        className="mono-label text-muted hover:text-spark transition-colors mt-3 inline-block"
                        style={{ fontSize: '0.62rem' }}
                    >
                        ki-sichtbarkeit ansehen →
                    </Link>
                </Reveal>
            </section>

            {/* Preise — die Frage, die jeder googelt, offen beantwortet */}
            <section className="container-edge section-pad pt-0 md:pt-0">
                <SectionHeader
                    kicker="02 — preise"
                    title={
                        <>
                            Was kostet eine Website <Spark>in Wien?</Spark>
                        </>
                    }
                    className="mb-8 md:mb-10"
                />
                <Reveal
                    as="p"
                    className="text-soft leading-relaxed"
                    style={{
                        fontSize: 'clamp(1rem, 1.4vw, 1.2rem)',
                        maxWidth: '62ch',
                    }}
                >
                    Ehrliche Antwort: bei uns ab 3.000 €. Dafür bekommst du
                    keine Template-Seite, sondern ein eigenständiges Design,
                    sauberes SEO und einen Auftritt, der verkauft. Premium —
                    das volle interaktive Erlebnis, wie auf dieser Seite —
                    startet ab 6.000 €. Der Preis hängt am Umfang: wie viele
                    Seiten, wie viel Inhalt, wie viel Interaktion. Was er nie
                    tut: sich nachträglich ändern. Du bekommst vor dem Start
                    einen Fixpreis — und der gilt. Keine Stundensätze, die
                    davonlaufen.
                </Reveal>
                <Reveal delay={80} className="mt-5">
                    <Link
                        href="/was-kostet-eine-website"
                        className="mono-label text-muted hover:text-spark transition-colors"
                        style={{ fontSize: '0.62rem' }}
                    >
                        ↳ ausführlich: was kostet eine website in österreich? →
                    </Link>
                </Reveal>
            </section>

            {/* Was drin ist */}
            <section className="container-edge section-pad pt-0 md:pt-0">
                <SectionHeader
                    kicker="03 — was drin ist"
                    title={
                        <>
                            Ein Fixpreis. <Spark>Alles drin.</Spark>
                        </>
                    }
                    sub="Fixpreis heißt bei uns: Da kommt keine Position später dazu. So teilen wir uns die Arbeit."
                    className="mb-12 md:mb-16"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
                    <div>
                        <p className="mono-label text-spark mb-4">wir liefern</p>
                        <ul className="space-y-2.5 text-soft text-[0.95rem] leading-relaxed">
                            {[
                                'Konzept und Seitenstruktur — auf dein Geschäft gebaut',
                                'Alle Texte — aus deinem Wissen, in deiner Sprache',
                                'Design, Bau und Launch auf deiner Domain',
                                'Auswahl und Aufbereitung deiner Bilder',
                                'Saubere Technik, die schnell lädt und gefunden wird',
                                'Persönliche Übergabe — du verstehst, was du bekommst',
                            ].map(t => (
                                <li key={t} className="flex gap-2.5">
                                    <span aria-hidden className="text-spark">↳</span>
                                    <span>{t}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <p className="mono-label text-spark mb-4">du lieferst</p>
                        <ul className="space-y-2.5 text-soft text-[0.95rem] leading-relaxed">
                            {[
                                'Ein Gespräch über dein Geschäft — mehr Vorbereitung brauchst du nicht',
                                'Fotos, falls du welche hast — sonst finden wir eine Lösung',
                                'Feedback zu Konzept und Design — bevor gebaut wird',
                                'Dein Go zum Launch',
                            ].map(t => (
                                <li key={t} className="flex gap-2.5">
                                    <span aria-hidden className="text-spark">↳</span>
                                    <span>{t}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Ablauf */}
            <section className="container-edge section-pad pt-0 md:pt-0">
                <SectionHeader
                    kicker="04 — ablauf"
                    title={
                        <>
                            Klar von Anfang <Spark>bis Launch.</Spark>
                        </>
                    }
                    className="mb-12 md:mb-16"
                />
                <Steps steps={STEPS} />
            </section>

            {/* FAQ */}
            <section className="container-edge section-pad pt-0 md:pt-0">
                <SectionHeader
                    kicker="05 — faq"
                    title={<>Häufige Fragen.</>}
                    className="mb-10 md:mb-14"
                />
                <Faq items={FAQ_ITEMS} />
            </section>

            {/* CTA */}
            <CtaBand
                headline={
                    <>
                        Bereit für eine Seite, <Spark>die wirkt?</Spark>
                    </>
                }
                sub="Sag mir, was du vorhast — der erste Call ist gratis und du bekommst eine ehrliche Einschätzung."
            />
        </>
    )
}
