import type { Metadata } from 'next'
import Cases from '@/components/Cases'
import { CtaBand, Spark } from '@/components/ui'

export const metadata: Metadata = {
    title: 'Referenzen — Projekte von Sunbyte',
    description:
        'Referenzen von Sunbyte: kfz22, MStyle Beauty Lounge, Impulsiv Fitness (Wien), Safety Pro Electrical (Melbourne), PrintMyWall. Premium-Webauftritte, live im Netz.',
    alternates: { canonical: '/arbeiten/' },
}

export default function ArbeitenPage() {
    return (
        <>
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
