import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'

// Statisch generiert beim Export -> /sitemap.xml
export const dynamic = 'force-static'

const ROUTES: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
    { path: '', priority: 1.0, freq: 'weekly' },
    { path: '/webseiten', priority: 0.9, freq: 'monthly' },
    { path: '/ki-sichtbarkeit', priority: 0.9, freq: 'monthly' },
    { path: '/arbeiten', priority: 0.7, freq: 'monthly' },
    { path: '/ueber-uns', priority: 0.6, freq: 'monthly' },
    { path: '/kontakt', priority: 0.8, freq: 'monthly' },
    { path: '/impressum', priority: 0.2, freq: 'yearly' },
    { path: '/datenschutz', priority: 0.2, freq: 'yearly' },
]

export default function sitemap(): MetadataRoute.Sitemap {
    return ROUTES.map(r => ({
        url: `${SITE_URL}${r.path}`,
        changeFrequency: r.freq,
        priority: r.priority,
    }))
}
