import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'

// Statisch generiert beim Export -> /robots.txt
export const dynamic = 'force-static'

/**
 * KI-Crawler — ausdrücklich erlaubt (Zakir, 27.11.2026: „KI-Training bei
 * Sunbyte auch einschalten, sodass wir überall auftauchen"). `*` erlaubt sie
 * ohnehin; die eigene Regel macht die Erlaubnis für jeden Dienst eindeutig.
 * Suche und Assistenten: OAI-SearchBot, ChatGPT-User, Claude-SearchBot,
 * Claude-User, PerplexityBot, Perplexity-User. Training: GPTBot, ClaudeBot,
 * Google-Extended, Applebot-Extended, CCBot, meta-externalagent, Amazonbot,
 * Bytespider.
 */
const KI_CRAWLER = [
    'GPTBot',
    'OAI-SearchBot',
    'ChatGPT-User',
    'ClaudeBot',
    'Claude-SearchBot',
    'Claude-User',
    'PerplexityBot',
    'Perplexity-User',
    'Google-Extended',
    'Applebot-Extended',
    'CCBot',
    'meta-externalagent',
    'Amazonbot',
    'Bytespider',
]

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            { userAgent: '*', allow: '/' },
            { userAgent: KI_CRAWLER, allow: '/' },
        ],
        sitemap: `${SITE_URL}/sitemap.xml`,
        host: SITE_URL,
    }
}
