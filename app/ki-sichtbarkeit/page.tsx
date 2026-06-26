import type { Metadata } from 'next'
import Reveal from '@/components/Reveal'
import Steps from '@/components/Steps'
import Faq from '@/components/Faq'
import AiChatDemo from '@/components/AiChatDemo'
import JsonLd from '@/components/JsonLd'
import { SectionHeader, Spark, CtaBand, CtaButton } from '@/components/ui'
import { serviceLd, faqLd, PRICING } from '@/lib/seo'

export const metadata: Metadata = {
    title: 'KI-Sichtbarkeit Wien — von ChatGPT empfohlen werden (700 €)',
    description:
        'KI-Sichtbarkeit für 700 €: damit ChatGPT, Perplexity & Gemini dein Unternehmen kennen und weiterempfehlen. Analyse, strukturierte Daten und KI-lesbare Präsenz — aus Wien.',
    alternates: { canonical: '/ki-sichtbarkeit' },
}

const STEPS = [
    {
        title: 'Analyse',
        text: 'Wir fragen die gängigen KI-Modelle nach deiner Branche und Region — und prüfen schwarz auf weiß, ob und wie du genannt wirst.',
    },
    {
        title: 'Strukturierte Daten',
        text: 'Wir versehen deine Seite mit sauberem schema.org-Markup (JSON-LD), das LLMs eindeutig verstehen — wer du bist, was du tust, wo.',
    },
    {
        title: 'KI-lesbare Präsenz',
        text: 'Inhalte und Unternehmensdaten werden so aufbereitet und platziert, dass die Quellen, aus denen KI lernt, dich korrekt erfassen.',
    },
    {
        title: 'Monitoring',
        text: 'Wir prüfen erneut und liefern einen Vorher/Nachher-Report mit echten KI-Abfragen — damit der Fortschritt sichtbar ist.',
    },
]

const DELIVERABLES = [
    'KI-Sichtbarkeits-Analyse: Ist-Stand mit echten Abfragen',
    'Vollständiges schema.org / JSON-LD für deine Seite',
    'KI-lesbare, klar strukturierte Inhalte',
    'Konsistente Unternehmensdaten in den relevanten Quellen',
    'Vorher/Nachher-Report — belegt, nicht behauptet',
    'Konkrete Empfehlungen für die nächsten Schritte',
]

const FAQ_ITEMS = [
    {
        q: 'Was ist KI-Sichtbarkeit überhaupt?',
        a: 'Immer mehr Menschen stellen ihre Fragen ChatGPT, Perplexity oder Gemini statt Google. KI-Sichtbarkeit sorgt dafür, dass diese Modelle dein Unternehmen kennen und bei passenden Fragen empfehlen.',
    },
    {
        q: 'Ist das nicht einfach SEO?',
        a: 'Verwandt, aber nicht dasselbe. Klassisches SEO optimiert für Suchmaschinen-Rankings. KI-Sichtbarkeit optimiert dafür, dass Sprachmodelle dich verstehen, korrekt einordnen und in ihren Antworten nennen — eine eigene Disziplin.',
    },
    {
        q: 'Was kostet das?',
        a: 'KI-Sichtbarkeit kostet 700 € als klares Paket. Du weißt von Anfang an, was du bekommst — Analyse, Umsetzung und einen belegten Vorher/Nachher-Report.',
    },
    {
        q: 'Brauche ich dafür schon eine Website?',
        a: 'Eine eigene Seite ist die stärkste Basis, weil wir sie technisch sauber für KI aufbereiten können. Falls du noch keine hast, kombinieren wir das gern mit unserem Webseiten-Dienst.',
    },
    {
        q: 'Könnt ihr garantieren, dass ChatGPT mich nennt?',
        a: 'Seriös kann das niemand zu 100 % garantieren — die Modelle ändern sich laufend. Was wir garantieren: die Arbeit, die deine Chancen messbar erhöht, plus einen ehrlichen Report, der den Effekt zeigt.',
    },
]

const SERVICE_LD = serviceLd({
    name: 'KI-Sichtbarkeit',
    serviceType: 'Generative Engine Optimization / AI Search Optimization',
    description:
        'Optimierung dafür, dass generative KI (ChatGPT, Perplexity, Gemini) ein Unternehmen kennt und in Antworten empfiehlt. Analyse, strukturierte Daten (schema.org), KI-lesbare Präsenz und Vorher/Nachher-Report.',
    price: PRICING.aiVisibility.fixed,
    url: '/ki-sichtbarkeit',
})

export default function KiSichtbarkeitPage() {
    return (
        <>
            <JsonLd data={SERVICE_LD} />
            <JsonLd data={faqLd(FAQ_ITEMS)} />

            {/* Intro */}
            <section className="container-edge section-pad-top pb-4 md:pb-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-7">
                        <Reveal as="p" className="mono-label text-spark mb-5">
                            leistung · ki-sichtbarkeit
                        </Reveal>
                        <Reveal
                            as="h1"
                            delay={60}
                            className="font-display"
                            style={{
                                fontSize: 'clamp(2.75rem, 7vw, 5.5rem)',
                                color: 'var(--lit)',
                                maxWidth: '15ch',
                            }}
                        >
                            Werd zur Antwort, <Spark>die die KI gibt.</Spark>
                        </Reveal>
                        <Reveal
                            as="p"
                            delay={120}
                            className="text-soft mt-8 leading-relaxed"
                            style={{
                                fontSize: 'clamp(1rem, 1.4vw, 1.2rem)',
                                maxWidth: '50ch',
                            }}
                        >
                            Deine Kunden fragen heute ChatGPT statt Google. Wir
                            sorgen dafür, dass die KI dein Unternehmen kennt —
                            und weiterempfiehlt.{' '}
                            <span className="text-lit">Fixpreis 700 €.</span>
                        </Reveal>
                        <Reveal delay={180} className="mt-9 flex flex-wrap gap-4">
                            <CtaButton href="/kontakt">
                                Sichtbarkeit starten
                            </CtaButton>
                        </Reveal>
                    </div>

                    <div className="lg:col-span-5">
                        <Reveal delay={120}>
                            <AiChatDemo />
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Warum */}
            <section className="container-edge section-pad">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                    <div className="lg:col-span-6">
                        <SectionHeader
                            kicker="01 — warum"
                            title={
                                <>
                                    Google war gestern.
                                    <br />
                                    <Spark>Heute fragt man die KI.</Spark>
                                </>
                            }
                            sub="Wer bei ChatGPT, Perplexity und Gemini nicht auftaucht, existiert für diese Nutzer nicht. Und es werden täglich mehr. Wer jetzt sichtbar wird, besetzt die Antwort, bevor es alle tun."
                            maxWidth="100%"
                        />
                    </div>
                    <div className="lg:col-span-6">
                        <EnginesPanel />
                    </div>
                </div>
            </section>

            {/* Ablauf */}
            <section className="container-edge section-pad pt-0 md:pt-0">
                <SectionHeader
                    kicker="02 — ablauf"
                    title={
                        <>
                            So machen wir dich <Spark>auffindbar.</Spark>
                        </>
                    }
                    className="mb-12 md:mb-16"
                />
                <Steps steps={STEPS} />
            </section>

            {/* Leistungen + Preis */}
            <section className="container-edge section-pad pt-0 md:pt-0">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    <div className="lg:col-span-7">
                        <SectionHeader
                            kicker="03 — was du bekommst"
                            title={<>Klar verpackt.</>}
                            className="mb-10"
                            maxWidth="100%"
                        />
                        <ul className="space-y-4">
                            {DELIVERABLES.map((d, i) => (
                                <Reveal
                                    as="li"
                                    key={i}
                                    delay={i * 50}
                                    className="flex gap-3 text-soft leading-relaxed"
                                    style={{
                                        fontSize: 'clamp(0.98rem, 1.2vw, 1.1rem)',
                                        borderBottom:
                                            '1px solid rgba(201,184,163,0.1)',
                                        paddingBottom: '1rem',
                                    }}
                                >
                                    <span aria-hidden className="text-spark">
                                        ↳
                                    </span>
                                    <span>{d}</span>
                                </Reveal>
                            ))}
                        </ul>
                    </div>

                    {/* Preis-Box */}
                    <div className="lg:col-span-5">
                        <Reveal
                            className="lg:sticky lg:top-28"
                            style={{
                                border: '1px solid rgba(232,90,31,0.3)',
                                borderRadius: '6px',
                                padding: 'clamp(2rem, 4vw, 2.75rem)',
                                background:
                                    'radial-gradient(circle at 80% 12%, rgba(232,90,31,0.10) 0%, transparent 60%)',
                            }}
                        >
                            <p
                                className="mono-label text-spark mb-4"
                                style={{ fontSize: '0.66rem' }}
                            >
                                ki-sichtbarkeit
                            </p>
                            <p
                                className="font-display"
                                style={{
                                    fontSize: 'clamp(3rem, 6vw, 4.5rem)',
                                    color: 'var(--lit)',
                                    lineHeight: 1,
                                }}
                            >
                                700&nbsp;€
                            </p>
                            <p
                                className="text-soft mt-3 leading-snug"
                                style={{ fontSize: '0.95rem' }}
                            >
                                Klares Paket, fixer Preis. Analyse, Umsetzung
                                und belegter Vorher/Nachher-Report.
                            </p>
                            <div className="mt-8">
                                <CtaButton href="/kontakt">
                                    Jetzt anfragen
                                </CtaButton>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="container-edge section-pad pt-0 md:pt-0">
                <SectionHeader
                    kicker="04 — faq"
                    title={<>Häufige Fragen.</>}
                    className="mb-10 md:mb-14"
                />
                <Faq items={FAQ_ITEMS} />
            </section>

            {/* CTA */}
            <CtaBand
                headline={
                    <>
                        Lass die KI für dich <Spark>arbeiten.</Spark>
                    </>
                }
                sub="In einem kurzen Gespräch prüfen wir gemeinsam, wie sichtbar du heute bist — und was möglich ist."
                primaryLabel="Sichtbarkeit anfragen"
            />
        </>
    )
}

// ── Sub-Component: wo deine Kunden jetzt fragen ───────────────
const ENGINES = [
    { name: 'ChatGPT', q: '„bester Webdesigner in Wien?"' },
    { name: 'Perplexity', q: '„wen empfiehlst du für eine Website?"' },
    { name: 'Gemini', q: '„wer macht das in meiner Nähe?"' },
    { name: 'Copilot', q: '„gib mir 3 gute Anbieter"' },
]

function EnginesPanel() {
    return (
        <Reveal
            style={{
                border: '1px solid rgba(201, 184, 163, 0.16)',
                borderRadius: '8px',
                padding: 'clamp(1.75rem, 3vw, 2.5rem)',
                background:
                    'radial-gradient(circle at 80% 8%, rgba(232,90,31,0.10) 0%, transparent 58%)',
            }}
        >
            <p
                className="mono-label text-spark mb-6"
                style={{ fontSize: '0.66rem' }}
            >
                ↳ wo deine kunden jetzt fragen
            </p>

            <ul>
                {ENGINES.map((e, i) => (
                    <li
                        key={e.name}
                        className="flex items-baseline gap-4 py-4"
                        style={{
                            borderTop:
                                i === 0
                                    ? 'none'
                                    : '1px solid rgba(201, 184, 163, 0.1)',
                        }}
                    >
                        <span aria-hidden className="text-spark">
                            ↳
                        </span>
                        <div>
                            <div
                                className="font-display"
                                style={{
                                    fontSize: 'clamp(1.25rem, 2vw, 1.6rem)',
                                    color: 'var(--lit)',
                                    lineHeight: 1.1,
                                }}
                            >
                                {e.name}
                            </div>
                            <div
                                className="mono-label text-muted mt-1.5"
                                style={{ fontSize: '0.6rem' }}
                            >
                                {e.q}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            <p
                className="text-soft leading-snug mt-6 pt-5"
                style={{
                    fontSize: 'clamp(0.9rem, 1.1vw, 0.98rem)',
                    borderTop: '1px solid rgba(201, 184, 163, 0.1)',
                }}
            >
                Überall, wo du genannt werden willst —{' '}
                <span className="text-lit">wir bringen dich rein.</span>
            </p>
        </Reveal>
    )
}
