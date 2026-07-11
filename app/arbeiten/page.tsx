import type { Metadata } from 'next'
import Cases from '@/components/Cases'
import { CtaBand, Spark } from '@/components/ui'

export const metadata: Metadata = {
    title: 'Referenzen — Projekte von Sunbyte',
    description:
        'Ausgewählte Referenzen von Sunbyte: kfz22 (Wien), MStyle Beauty Lounge (Wien), Safety Pro Electrical (Melbourne), PrintMyWall und mehr. Premium-Webauftritte, live im Netz.',
    alternates: { canonical: '/arbeiten' },
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
                sub="Wir nehmen 2026 noch Projekte an. Wenn dein Vorhaben den Anspruch hat, neben kfz22 zu stehen — sprich mit uns."
            />
        </>
    )
}
