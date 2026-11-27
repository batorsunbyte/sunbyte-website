import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'

// Statisch generiert beim Export -> /sitemap.xml
export const dynamic = 'force-static'

/* Datum der letzten inhaltlichen Änderung je Seite — beim Ändern einer Seite hier nachziehen */
const ROUTES: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]['changeFrequency']; geaendert: string }[] = [
    { path: '', priority: 1.0, freq: 'weekly', geaendert: '2026-11-27' },
    /* /webseiten, /ki-sichtbarkeit und /was-kostet-eine-website sind seit
       26.11.2026 stillgelegt (noindex) und stehen deshalb nicht mehr hier. */
    { path: '/partner', priority: 0.9, freq: 'monthly', geaendert: '2026-11-27' },
    { path: '/arbeiten', priority: 0.7, freq: 'monthly', geaendert: '2026-11-27' },
    { path: '/ueber-uns', priority: 0.6, freq: 'monthly', geaendert: '2026-11-27' },
    { path: '/kontakt', priority: 0.8, freq: 'monthly', geaendert: '2026-11-27' },
    { path: '/impressum', priority: 0.2, freq: 'yearly', geaendert: '2026-11-27' },
    { path: '/datenschutz', priority: 0.2, freq: 'yearly', geaendert: '2026-11-27' },
]

export default function sitemap(): MetadataRoute.Sitemap {
    return ROUTES.map(r => ({
        url: `${SITE_URL}${r.path}/`,
        lastModified: new Date(r.geaendert),
        changeFrequency: r.freq,
        priority: r.priority,
    }))
}
