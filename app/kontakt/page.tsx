import type { Metadata } from 'next'
import Contact from '@/components/Contact'

export const metadata: Metadata = {
    title: 'Kontakt — Erstgespräch zum KI-Betriebssystem',
    description:
        'Sprechen Sie direkt mit Sunbyte aus Wien: Formular, E-Mail, Telefon oder WhatsApp. Erstgespräch zum KI-Betriebssystem gratis und unverbindlich, für Betriebe und Agenturen.',
    alternates: { canonical: '/kontakt/' },
}

export default function KontaktPage() {
    return <Contact />
}
