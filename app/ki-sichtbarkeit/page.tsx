import type { Metadata } from 'next'
import Stillgelegt from '@/components/Stillgelegt'

export const metadata: Metadata = {
    title: 'KI-Sichtbarkeit',
    description:
        'KI-Sichtbarkeit bietet Sunbyte nicht mehr einzeln an. Kleine und spezielle Aufträge übermitteln wir an geprüfte Netzwerkpartner.',
    robots: { index: false, follow: true },
}

export default function KiSichtbarkeitPage() {
    return <Stillgelegt angebot="KI-Sichtbarkeit" />
}
