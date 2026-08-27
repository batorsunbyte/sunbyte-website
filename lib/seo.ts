/**
 * Zentrale SEO- & schema.org-Daten.
 *
 * Praxis-vor-Predigt: vollständiges, lokales und maschinenlesbares Markup macht
 * Sunbyte für Google (Local) UND generative KI (ChatGPT, Perplexity, Gemini)
 * eindeutig auffindbar und zitierbar — genau der Dienst, den wir verkaufen.
 */

export const SITE_URL = 'https://sunbyte.at'
export const OG_IMAGE = `${SITE_URL}/og-image.png`

/** Kontaktdaten (aus PrintMyWall-Impressum übernommen) */
export const CONTACT = {
    email: 'office@sunbyte.at',
    phone: '+43 660 3610642',
    phoneRaw: '+436603610642',
    whatsapp: '436603610642', // wa.me/<dieser Wert>
    street: 'Jeldersdorfer Straße',
    zip: '1210',
    city: 'Wien',
    country: 'Österreich',
    lat: 48.2667,
    lon: 16.4,
} as const

/** Preise zentral — eine Quelle der Wahrheit */
export const PRICING = {
    website: { from: 2000, label: 'ab 2.000 €' },
    websitePremium: { from: 5000, label: 'ab 5.000 €' },
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
    alternateName: 'Sunbyte IT-Dienstleister',
    url: SITE_URL,
    logo: OG_IMAGE,
    image: OG_IMAGE,
    description:
        'IT-Dienstleister aus Wien. Professionelle Webseiten und KI-Sichtbarkeit — damit dich auch ChatGPT & Co. finden und weiterempfehlen.',
    slogan: 'Wir bauen Sunbyte zu einer IT-Weltmacht.',
    founder: { '@type': 'Person', name: 'Zakir Daryabi' },
    foundingDate: '2026',
    email: CONTACT.email,
    telephone: CONTACT.phoneRaw,
    priceRange: 'ab 1.000 €',
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
        'Webentwicklung',
        'Webdesign Wien',
        'Website erstellen',
        'KI-Sichtbarkeit',
        'Generative Engine Optimization',
        'AI Search Optimization',
        'Suchmaschinenoptimierung',
        'Strukturierte Daten',
    ],
    hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Leistungen',
        itemListElement: [
            {
                '@type': 'Offer',
                itemOffered: {
                    '@type': 'Service',
                    name: 'Webseite erstellen / aktualisieren',
                },
                priceCurrency: 'EUR',
                price: PRICING.website.from,
            },
            {
                '@type': 'Offer',
                itemOffered: {
                    '@type': 'Service',
                    name: 'Webseite Premium — voll interaktives Erlebnis',
                },
                priceCurrency: 'EUR',
                price: PRICING.websitePremium.from,
            },
            {
                '@type': 'Offer',
                itemOffered: {
                    '@type': 'Service',
                    name: 'KI-Sichtbarkeit',
                },
                priceCurrency: 'EUR',
                price: PRICING.aiVisibility.fixed,
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
    jobTitle: 'Gründer & Designer',
    worksFor: { '@id': `${SITE_URL}/#organization` },
    address: {
        '@type': 'PostalAddress',
        addressLocality: 'Wien',
        addressCountry: 'AT',
    },
    knowsAbout: ['Webdesign', 'KI', 'IT', 'Frontend-Entwicklung'],
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
