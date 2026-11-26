/**
 * Zentrale SEO- & schema.org-Daten.
 *
 * Praxis-vor-Predigt: vollständiges, lokales und maschinenlesbares Markup macht
 * Sunbyte für Google (Local) UND generative KI (ChatGPT, Perplexity, Gemini)
 * eindeutig auffindbar und zitierbar — genau der Dienst, den wir verkaufen.
 */

export const SITE_URL = 'https://sunbyte.at'
/* Neuer Dateiname seit der KI-OS-Welle (26.11.2026): WhatsApp und LinkedIn
   behalten ein Vorschaubild unter gleichem Namen sonst lange im Speicher. */
export const OG_IMAGE = `${SITE_URL}/og-kios.png`

/** Kontaktdaten (aus PrintMyWall-Impressum übernommen) */
export const CONTACT = {
    email: 'office@sunbyte.at',
    phone: '+43 660 3610642',
    phoneRaw: '+436603610642',
    whatsapp: '436603610642', // wa.me/<dieser Wert>
    street: 'Jedlersdorfer Straße',
    /** volle Anschrift laut Firmenbuch — für Impressum und Datenschutz */
    streetFull: 'Jedlersdorfer Straße 99/9/43',
    zip: '1210',
    city: 'Wien',
    country: 'Österreich',
    lat: 48.2667,
    lon: 16.4,
} as const

/** Preise zentral — eine Quelle der Wahrheit */
export const PRICING = {
    website: { from: 3000, label: 'ab 3.000 €' },
    websitePremium: { from: 6000, label: 'ab 6.000 €' },
    aiVisibility: { fixed: 1000, label: '1.000 €' },
} as const

/**
 * Social-/Profil-Links für sameAs (stärkt Entitäts-Erkennung bei Google & KI).
 * SLOT: Zakir trägt echte Profile ein (Google Business, LinkedIn, Instagram …).
 */
export const SOCIAL: string[] = [
    // Google Business Profile (verifiziert, bator.sunbyte)
    'https://maps.google.com/?cid=10635698540192696563',
    // SLOT: 'https://www.linkedin.com/company/sunbyte',
    // SLOT: 'https://www.instagram.com/sunbyte.at',
]

/** Organization / LocalBusiness — site-weit (in layout.tsx) */
export const ORGANIZATION: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#organization`,
    name: 'Sunbyte',
    legalName: 'Sunbyte GmbH',
    alternateName: 'Sunbyte KI-OS',
    url: SITE_URL,
    logo: OG_IMAGE,
    image: OG_IMAGE,
    description:
        'Sunbyte aus Wien entwickelt ein KI-Betriebssystem für Betriebe: ein selbstlernendes Denksystem mit mehreren KI-Agenten und einer Bibliothek von Funktionen. Vertrieb direkt und über ein Netzwerk von Agenturen.',
    slogan: 'Wir bauen Sunbyte zu einer IT-Weltmacht.',
    founder: { '@type': 'Person', name: 'Zakir Daryabi' },
    email: CONTACT.email,
    telephone: CONTACT.phoneRaw,
    currenciesAccepted: 'EUR',
    address: {
        '@type': 'PostalAddress',
        streetAddress: CONTACT.street,
        postalCode: CONTACT.zip,
        addressLocality: CONTACT.city,
        addressCountry: 'AT',
    },
    geo: {
        '@type': 'GeoCoordinates',
        latitude: CONTACT.lat,
        longitude: CONTACT.lon,
    },
    areaServed: [
        { '@type': 'City', name: 'Wien' },
        { '@type': 'Country', name: 'Österreich' },
    ],
    openingHoursSpecification: [
        {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
            ],
            opens: '09:00',
            closes: '18:00',
        },
    ],
    knowsAbout: [
        'KI-Betriebssystem',
        'KI-Agenten',
        'KI für Betriebe',
        'KI für KMU',
        'KI-Automatisierung',
        'Automatisierung im Betrieb',
        'Partnernetzwerk für Agenturen',
    ],
    hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Leistungen',
        itemListElement: [
            {
                /* Hauptangebot seit 26.11.2026 — bewusst ohne Preis (Angebot nach dem Erstgespräch) */
                '@type': 'Offer',
                itemOffered: {
                    '@type': 'Service',
                    name: 'KI-Betriebssystem (KI-OS) für Betriebe',
                    description:
                        'Ein auf den Betrieb zugeschnittenes KI-Betriebssystem mit einem selbstlernenden Denksystem aus mehreren KI-Agenten.',
                },
            },
        ],
    },
    ...(SOCIAL.length ? { sameAs: SOCIAL } : {}),
}

/** WebSite-Knoten (Wurzel; verknüpft Org) */
export const WEBSITE: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: 'Sunbyte',
    inLanguage: 'de-AT',
    publisher: { '@id': `${SITE_URL}/#organization` },
}

/** Person — Zakir (für /ueber-uns) */
export const PERSON_ZAKIR: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Zakir Daryabi',
    jobTitle: 'Gründer und Geschäftsführer',
    url: `${SITE_URL}/ueber-uns/`,
    image: `${SITE_URL}/images/team/zakir-portraet.webp`,
    worksFor: { '@id': `${SITE_URL}/#organization` },
    address: {
        '@type': 'PostalAddress',
        addressLocality: 'Wien',
        addressCountry: 'AT',
    },
    knowsAbout: [
        'Softwareentwicklung',
        'Softwarearchitektur',
        'Java',
        'C#',
        'Python',
        'Datenbanken',
        'KI-Agenten',
    ],
}

/** Person — Ing. Medet Atas (für /ueber-uns) */
export const PERSON_MEDET: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Medet Atas',
    honorificPrefix: 'Ing.',
    jobTitle: 'Gesellschafter, Strategie und Geschäftsentwicklung',
    worksFor: { '@id': `${SITE_URL}/#organization` },
    url: `${SITE_URL}/ueber-uns/`,
    image: `${SITE_URL}/images/team/medet-portraet.webp`,
}

/** Service-Helper für Service-Seiten */
export function serviceLd(opts: {
    name: string
    description: string
    price: number
    url: string
    serviceType: string
}): Record<string, unknown> {
    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: opts.name,
        serviceType: opts.serviceType,
        description: opts.description,
        provider: { '@id': `${SITE_URL}/#organization` },
        areaServed: [
            { '@type': 'City', name: 'Wien' },
            { '@type': 'Country', name: 'Österreich' },
        ],
        url: `${SITE_URL}${opts.url}`,
        offers: {
            '@type': 'Offer',
            price: opts.price,
            priceCurrency: 'EUR',
        },
    }
}

/** FAQPage-Helper (für /ki-sichtbarkeit, /webseiten, Home) */
export function faqLd(
    items: { q: string; a: string }[],
): Record<string, unknown> {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map(it => ({
            '@type': 'Question',
            name: it.q,
            acceptedAnswer: { '@type': 'Answer', text: it.a },
        })),
    }
}

/** BreadcrumbList-Helper */
export function breadcrumbLd(
    items: { name: string; path: string }[],
): Record<string, unknown> {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((it, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: it.name,
            item: `${SITE_URL}${it.path}`,
        })),
    }
}
