import type { Metadata } from 'next'
import Cases from '@/components/Cases'
import { CASES } from '@/components/Cases'
import JsonLd from '@/components/JsonLd'
import { CtaBand, Spark } from '@/components/ui'
import { SITE_URL, breadcrumbLd } from '@/lib/seo'

/** Referenz-Liste als maschinenlesbare ItemList (Google + KI) */
const PORTFOLIO_LD: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${SITE_URL}/arbeiten/`,
    name: 'Referenzen — Projekte von Sunbyte',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    mainEntity: {
        '@type': 'ItemList',
        itemListElement: CASES.filter(c => c.href).map((c, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
                '@type': 'WebSite',
                name: c.name,
                url: c.href,
                creator: { '@id': `${SITE_URL}/#organization` },
            },
        })),
    },
}

export const metadata: Metadata = {
    title: 'Referenzen — Projekte von Sunbyte',
    description:
        'Referenzen von Sunbyte: kfz22, MStyle Beauty Lounge, Impulsiv Fitness (Wien), Safety Pro Electrical (Melbourne), PrintMyWall. Premium-Webauftritte, live im Netz.',
    alternates: { canonical: '/arbeiten/' },
}

export default function ArbeitenPage() {
    return (
        <>
            <JsonLd data={PORTFOLIO_LD} />
            <JsonLd
                data={breadcrumbLd([
                    { name: 'Start', path: '/' },
                    { name: 'Referenzen', path: '/arbeiten/' },
                ])}
            />
            <Cases />
            <CtaBand
                headline={
                    <>
                        Dein Projekt <Spark>wäre das nächste.</Spark>
                    </>
                }
                sub="Noch 2 Slots für 2026. Wenn dein Vorhaben den Anspruch hat, neben diesen Projekten zu stehen — sprich mit uns."
            />
        </>
    )
}
