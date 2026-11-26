import type { Metadata } from 'next'
import Stillgelegt from '@/components/Stillgelegt'

export const metadata: Metadata = {
    title: 'Was kostet eine Website?',
    description:
        'Einzelne Webseiten bietet Sunbyte nicht mehr an. Kleine und spezielle Aufträge übermitteln wir an geprüfte Netzwerkpartner.',
    robots: { index: false, follow: true },
}

export default function WasKostetEineWebsitePage() {
    return <Stillgelegt angebot="Webseiten" />
}
