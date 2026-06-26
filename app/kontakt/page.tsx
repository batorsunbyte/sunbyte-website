import type { Metadata } from 'next'
import Contact from '@/components/Contact'

export const metadata: Metadata = {
    title: 'Kontakt — Webdesign & KI-Sichtbarkeit in Wien',
    description:
        'Sprich direkt mit Sunbyte aus Wien — Formular, E-Mail, Telefon oder WhatsApp. Erstgespräch gratis & unverbindlich. Webseiten ab 1.500 €, KI-Sichtbarkeit 700 €.',
    alternates: { canonical: '/kontakt' },
}

export default function KontaktPage() {
    return <Contact />
}
