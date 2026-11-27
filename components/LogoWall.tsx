/**
 * LogoWall — die Referenz-Leiste direkt unter dem Hero.
 *
 * Löst seit der KI-OS-Welle (26.11.2026) den ProofBar an dieser Stelle ab.
 * Zakir hat am 26.11.2026 bestätigt: Alle acht sind Kunden bzw. eigene Marken,
 * die Freigabe für die Logos liegt vor. SocialTalents: Geschäftsführer hat die
 * Nutzung des Logos am 27.11.2026 per WhatsApp bestätigt („Jaaa sicher! logisch“).
 *
 * Jede Referenz ist eine weiße Kachel. Liegt eine Logo-Datei unter
 * /public/images/logos/, steht das Logo in der Kachel, sonst der Name als
 * Schrift. Ein Logo ergänzen: Datei ablegen, unten `logo`, `w` und `h` eintragen.
 * `dunkel: true` für Logos, die einen dunklen Grund brauchen.
 *
 * Bewusst eine Server-Komponente ohne <Reveal>: Sie steht im ersten CSS-Paint.
 */

interface Referenz {
    name: string
    logo?: string
    w?: number
    h?: number
    dunkel?: boolean
}

const REFERENZEN: Referenz[] = [
    { name: 'WKO', logo: '/images/logos/wko-klein.webp', w: 280, h: 147 },
    { name: 'SocialTalents', logo: '/images/logos/socialtalents-klein.webp', w: 420, h: 200 },
    { name: 'AutoSPA', logo: '/images/logos/autospa-klein.webp', w: 280, h: 181 },
    { name: 'PrintMyWall', logo: '/images/logos/printmywall-klein.webp', w: 251, h: 200 },
    { name: 'Impulsiv Fitness', logo: '/images/logos/impulsiv-fitness-klein.webp', w: 280, h: 132 },
    { name: 'Stadt Wien – Wiener Wohnen', logo: '/images/logos/wiener-wohnen-klein.webp', w: 280, h: 198 },
    { name: 'Integrationshaus', logo: '/images/logos/integrationshaus-klein.webp', w: 200, h: 200 },
    { name: 'Safety Pro Electrical', logo: '/images/logos/safety-pro-electrical-klein.webp', w: 200, h: 200 },
    { name: 'Next Move', logo: '/images/logos/next-move-klein.webp', w: 200, h: 200, dunkel: true },
]

export default function LogoWall() {
    return (
        <section
            className="container-edge"
            style={{ borderBottom: '1px solid rgba(201, 184, 163, 0.10)' }}
            aria-label="Referenzen von Sunbyte"
        >
            {/* Ohne Überschrift — Zakir, 26.11.2026: „das Wort Referenzen soll weg". */}
            <div className="py-8 md:py-10">
                {/* Neun Kacheln: 3 × 3 am Handy und Tablet, eine Reihe ab lg. */}
                <ul className="grid grid-cols-3 lg:grid-cols-9 gap-3">
                    {REFERENZEN.map(r => (
                        <li
                            key={r.name}
                            className="flex items-center justify-center"
                            style={{
                                // Weiß statt Creme: WKO, Wiener Wohnen und Integrationshaus
                                // haben einen weißen Grund in der Datei.
                                background: r.dunkel ? '#000' : '#fff',
                                borderRadius: '4px',
                                height: '5.25rem',
                                padding: r.dunkel ? 0 : '0.8rem 0.9rem',
                                overflow: 'hidden',
                            }}
                        >
                            {r.logo ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={r.logo}
                                    alt={r.name}
                                    width={r.w}
                                    height={r.h}
                                    loading="lazy"
                                    decoding="async"
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '100%',
                                        width: 'auto',
                                        height: 'auto',
                                        objectFit: 'contain',
                                    }}
                                />
                            ) : (
                                <span
                                    className="font-display-card text-center"
                                    style={{
                                        color: 'var(--bg)',
                                        fontSize: '0.9rem',
                                        lineHeight: 1.1,
                                    }}
                                >
                                    {r.name}
                                </span>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
