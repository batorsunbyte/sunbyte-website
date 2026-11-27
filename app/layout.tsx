import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import JsonLd from '@/components/JsonLd'
import IdlePrefetch from '@/components/IdlePrefetch'
import { ORGANIZATION, WEBSITE, SITE_URL, OG_IMAGE } from '@/lib/seo'

const DESCRIPTION =
    'Sunbyte ist das KI-Betriebssystem für Betriebe und KMU: KI-Agenten finden Kunden, beantworten Anfragen und verteilen Aufgaben. Aus Wien.'

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    themeColor: '#0E0A05',
}

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: 'Sunbyte – KI-Betriebssystem für Betriebe und KMU',
        template: '%s | Sunbyte Wien',
    },
    description: DESCRIPTION,
    keywords: [
        'KI-Betriebssystem',
        'Sunbyte',
        'KI-Agenten für Betriebe',
        'KI für Unternehmen Wien',
        'KI-Automatisierung für KMU',
        'KI-Agenten Österreich',
        'KI-Betriebssystem für Agenturen',
        'KI Partnerprogramm Agentur',
        'KI für Bau und Handwerk',
    ],
    /* Bing Webmaster Tools: Bestätigung der Inhaberschaft (27.11.2026) — nicht entfernen */
    other: { 'msvalidate.01': '9476E1241FF1CB4F80683853817540F0' },
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
        title: 'Sunbyte – KI-Betriebssystem für Betriebe und KMU',
        description: DESCRIPTION,
        images: [
            {
                url: OG_IMAGE,
                width: 1200,
                height: 630,
                alt: 'Sunbyte. KI-Betriebssystem für Ihren Betrieb. Für Betriebe und für Agenturen.',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Sunbyte – KI-Betriebssystem für Betriebe und KMU',
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
            <head>
                {/* Schriften vorladen: startet den Download parallel zum CSS
                    statt erst danach. Spart eine komplette Wasserfall-Stufe —
                    auf Mobilfunk der groesste Einzelgewinn beim ersten Laden.
                    Nur die drei Schnitte, die im ersten Bildschirm vorkommen. */}
                <link
                    rel="preload"
                    href="/fonts/fraunces-900.woff2"
                    as="font"
                    type="font/woff2"
                    crossOrigin="anonymous"
                />
                <link
                    rel="preload"
                    href="/fonts/inter-tight-400.woff2"
                    as="font"
                    type="font/woff2"
                    crossOrigin="anonymous"
                />
                <link
                    rel="preload"
                    href="/fonts/jetbrains-mono-400.woff2"
                    as="font"
                    type="font/woff2"
                    crossOrigin="anonymous"
                />
            </head>
            <body>
                <a href="#main" className="skip-link">
                    Zum Inhalt springen
                </a>
                <JsonLd data={ORGANIZATION} />
                <JsonLd data={WEBSITE} />
                <Header />
                <main id="main">{children}</main>
                {/* Reichweitenmessung ohne Cookies (Plausible, EU). Die Variante
                    outbound-links zählt zusätzlich Klicks auf die Kundenseiten —
                    damit sehen wir, wie viele Besucher über die Fußzeile
                    „Website gebaut und betreut von SunByte" kommen (Referrer)
                    und wie viele von hier zu den Referenzen klicken.
                    Voraussetzung: sunbyte.at ist im Plausible-Konto angelegt. */}
                <Script
                    defer
                    data-domain="sunbyte.at"
                    src="https://plausible.io/js/script.outbound-links.js"
                    strategy="afterInteractive"
                />
                <Footer />
                <IdlePrefetch />
            </body>
        </html>
    )
}
