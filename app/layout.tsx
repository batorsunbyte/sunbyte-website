import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import JsonLd from '@/components/JsonLd'
import { ORGANIZATION, WEBSITE, SITE_URL, OG_IMAGE } from '@/lib/seo'

const DESCRIPTION =
    'Sunbyte ist dein IT-Dienstleister aus Wien: professionelle Webseiten (ab 1.500 €) und KI-Sichtbarkeit (700 €) — damit dich Google UND ChatGPT finden und weiterempfehlen. Erstgespräch gratis.'

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    themeColor: '#0E0A05',
}

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: 'Sunbyte – Webdesign & KI-Sichtbarkeit aus Wien',
        template: '%s | Sunbyte Wien',
    },
    description: DESCRIPTION,
    keywords: [
        'Webdesign Wien',
        'Website erstellen Wien',
        'Webagentur Wien',
        'Homepage erstellen lassen',
        'KI-Sichtbarkeit',
        'von ChatGPT empfohlen werden',
        'Generative Engine Optimization',
        'IT-Dienstleister Wien',
    ],
    authors: [{ name: 'Sunbyte' }],
    creator: 'Sunbyte',
    publisher: 'Sunbyte',
    alternates: {
        canonical: '/',
    },
    openGraph: {
        type: 'website',
        locale: 'de_AT',
        siteName: 'Sunbyte',
        url: SITE_URL,
        title: 'Sunbyte – Webdesign & KI-Sichtbarkeit aus Wien',
        description: DESCRIPTION,
        images: [
            {
                url: OG_IMAGE,
                width: 1200,
                height: 630,
                alt: 'Sunbyte – IT-Dienstleister aus Wien · Webseiten & KI-Sichtbarkeit',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Sunbyte – Webdesign & KI-Sichtbarkeit aus Wien',
        description: DESCRIPTION,
        images: [OG_IMAGE],
    },
    robots: {
        index: true,
        follow: true,
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="de-AT">
            <body>
                <a href="#main" className="skip-link">
                    Zum Inhalt springen
                </a>
                <JsonLd data={ORGANIZATION} />
                <JsonLd data={WEBSITE} />
                <Header />
                <main id="main">{children}</main>
                <Footer />
            </body>
        </html>
    )
}
