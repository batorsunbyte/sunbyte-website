import type { Metadata } from 'next'
import './globals.css'

const SITE_URL = 'https://sunbyte.at'

export const viewport = {
    width: 'device-width',
    initialScale: 1,
}

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: 'Sunbyte – Web-Agentur aus Wien',
        template: '%s | Sunbyte',
    },
    description: 'Sunbyte ist eine inhabergeführte Web-Agentur aus Wien. Wir bauen Websites, die Vertrauen schaffen und Kunden bringen.',
    authors: [{ name: 'Sunbyte' }],
    creator: 'Sunbyte',
    publisher: 'Sunbyte',
    openGraph: {
        type: 'website',
        locale: 'de_AT',
        siteName: 'Sunbyte',
        url: SITE_URL,
    },
    robots: {
        index: true,
        follow: true,
    },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="de">
            <body>{children}</body>
        </html>
    )
}
