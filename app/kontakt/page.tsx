import type { Metadata } from 'next'
import Contact from '@/components/Contact'

export const metadata: Metadata = {
    title: 'Kontakt — Erstgespräch zum KI-Betriebssystem',
    description:
        'Erstgespräch zum KI-Betriebssystem, gratis und unverbindlich: Formular, E-Mail, Telefon oder WhatsApp. Sunbyte Wien, für Betriebe und Agenturen.',
    alternates: { canonical: '/kontakt/' },
}

export default function KontaktPage() {
    return <Contact />
}
