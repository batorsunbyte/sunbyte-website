import type { Metadata } from 'next'
import Stillgelegt from '@/components/Stillgelegt'

export const metadata: Metadata = {
    title: 'Webseiten',
    description:
        'Einzelne Webseiten bietet Sunbyte nicht mehr an. Kleine und spezielle Aufträge übermitteln wir an geprüfte Netzwerkpartner.',
    robots: { index: false, follow: true },
}

export default function WebseitenPage() {
    return <Stillgelegt angebot="Webseiten" />
}
