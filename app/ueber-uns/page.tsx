import type { Metadata } from 'next'
import AboutHero from '@/components/AboutHero'
import TeamBlock from '@/components/TeamBlock'
import Studio from '@/components/Studio'
import JsonLd from '@/components/JsonLd'
import { SectionHeader, Spark, CtaBand } from '@/components/ui'
import { PERSON_ZAKIR, breadcrumbLd } from '@/lib/seo'

export const metadata: Metadata = {
    title: 'Über uns — zwei Brüder aus Wien',
    description:
        'Hinter Sunbyte stehen zwei Brüder aus Wien: Zakir Daryabi (Gründer, Designer, 6+ Jahre IT & KI) und ein KI/IT-Senior mit über 15 Jahren Erfahrung. Über 20 Jahre kombinierte Erfahrung.',
    alternates: { canonical: '/ueber-uns/' },
}

export default function UeberUnsPage() {
    return (
        <>
            <JsonLd data={PERSON_ZAKIR} />
            <JsonLd data={breadcrumbLd([{ name: 'Start', path: '/' }, { name: 'Über uns', path: '/ueber-uns/' }])} />

            <AboutHero />

            {/* Team */}
            <section className="container-edge section-pad">
                <SectionHeader
                    kicker="das team"
                    title={
                        <>
                            Zwei Brüder.
                            <br />
                            <Spark>Ein Anspruch.</Spark>
                        </>
                    }
                    sub="Design und technische Tiefe an einem Tisch — ohne Umwege, ohne Zwischenschicht."
                    className="mb-14 md:mb-20"
                />
                <TeamBlock />
            </section>

            {/* Vision-Moment (Studio mit Spark-Anflug) */}
            <Studio />

            {/* CTA */}
            <CtaBand
                headline={
                    <>
                        Überzeug dich <Spark>selbst.</Spark>
                    </>
                }
                sub="Erzähl uns, was du vorhast — du bekommst eine ehrliche Einschätzung, ob und wie wir es bauen würden. Entscheiden kannst du danach."
            />
        </>
    )
}
