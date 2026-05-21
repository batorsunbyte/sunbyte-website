import type { Metadata } from 'next'
import './globals.css'

const SITE_URL = 'https://sunbyte.at'

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    themeColor: '#0E0A05',
}

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: 'Sunbyte – Web-Studio aus Wien',
        template: '%s | Sunbyte',
    },
    description: 'Inhabergeführtes Web-Studio aus Wien. Eine Website, die deine Identität verstärkt — und in Sekunden überzeugt.',
    authors: [{ name: 'Sunbyte' }],
    creator: 'Sunbyte',
    publisher: 'Sunbyte',
    openGraph: {
        type: 'website',
        locale: 'de_AT',
        siteName: 'Sunbyte',
        url: SITE_URL,
        title: 'Sunbyte – Web-Studio aus Wien',
        description: 'Eine Website, die deine Identität verstärkt — und in Sekunden überzeugt.',
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
