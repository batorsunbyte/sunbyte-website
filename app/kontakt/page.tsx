import type { Metadata } from 'next'
import Contact from '@/components/Contact'

export const metadata: Metadata = {
    title: 'Kontakt — Erstgespräch vereinbaren',
    description:
        'Erstgespräch zu Sunbyte, dem KI-Betriebssystem für Betriebe: gratis und unverbindlich. Formular, E-Mail, Telefon oder WhatsApp. Aus Wien.',
    alternates: { canonical: '/kontakt/' },
}

export default function KontaktPage() {
    return <Contact />
}
