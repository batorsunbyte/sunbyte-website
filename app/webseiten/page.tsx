import type { Metadata } from 'next'
import Reveal from '@/components/Reveal'
import WebPackages from '@/components/WebPackages'
import SitePreview from '@/components/SitePreview'
import Steps from '@/components/Steps'
import Faq from '@/components/Faq'
import JsonLd from '@/components/JsonLd'
import { SectionHeader, Spark, CtaBand, CtaButton } from '@/components/ui'
import { serviceLd, faqLd, PRICING } from '@/lib/seo'

const FAQ_ITEMS = [
    {
        q: 'Was kostet eine Website bei Sunbyte?',
        a: 'Der Einstieg (Paket Standard) liegt bei ab 2.000 €. Premium mit vollem interaktivem Erlebnis ist ein individuelles Angebot. Du bekommst vorab einen klaren Fixpreis — keine versteckten Kosten.',
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
    },
    {
        q: 'Kann ich die Seite später selbst pflegen?',
        a: 'Klar. Wir richten dich so ein, dass du Inhalte selbst ändern kannst — oder wir übernehmen die laufende Pflege. Du entscheidest.',
    },
]

export const metadata: Metadata = {
    title: 'Webseite erstellen lassen in Wien — ab 2.000 €',
    description:
        'Webdesign aus Wien, ab 2.000 €: neue Website erstellen oder bestehende Seite modernisieren. Eigenständiges Design, mobile-first, SEO-sauber, blitzschnell. Erstgespräch gratis.',
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
        title: 'Konzept & Design',
        text: 'Struktur, Texte und ein eigenständiges Design — abgestimmt, bevor eine Zeile Code entsteht.',
    },
    {
        title: 'Build',
        text: 'Sauber gebaut: schnell, mobile-first, SEO- und technik-sauber. Du siehst Fortschritt, kein Blackbox.',
    },
    {
        title: 'Launch & Betreuung',
        text: 'Live-Schaltung, Übergabe und auf Wunsch laufende Pflege. Direkter Draht, kein Ticket-System.',
    },
]

export default function WebseitenPage() {
    return (
        <>
            <JsonLd data={SERVICE_LD} />
            <JsonLd data={faqLd(FAQ_ITEMS)} />

            {/* Intro */}
            <section className="container-edge section-pad-top pb-4 md:pb-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                    <div className="lg:col-span-6">
                        <Reveal as="p" className="mono-label text-spark mb-5">
                            leistung · webseiten
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
                            <span className="text-lit">Ab 2.000 €.</span>
                        </Reveal>
                        <Reveal
                            delay={180}
                            className="mt-9 flex flex-wrap gap-4"
                        >
                            <CtaButton href="/kontakt">
                                Projekt anfragen
                            </CtaButton>
                            <CtaButton
                                href="https://kfz22.com"
                                variant="ghost"
                                external
                            >
                                Referenz: kfz22
                            </CtaButton>
                        </Reveal>
                    </div>

                    {/* Live-Vorschau: echte Seite, die wir gebaut haben */}
                    <div className="lg:col-span-6">
                        <Reveal delay={140}>
                            <SitePreview url="https://kfz22.com" />
                            <p
                                className="mono-label text-muted mt-3"
                                style={{ fontSize: '0.58rem' }}
                            >
                                ↳ kfz22.com — von uns gebaut, live im Netz
                            </p>
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
                    sub="Beide hochwertig. Standard bringt dir ein eigenständiges visuelles System — Premium legt das volle interaktive Erlebnis obendrauf, wie auf dieser Seite."
                    className="mb-14 md:mb-20"
                />
                <WebPackages />
            </section>

            {/* Ablauf */}
            <section className="container-edge section-pad pt-0 md:pt-0">
                <SectionHeader
                    kicker="02 — ablauf"
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
                    kicker="03 — faq"
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
