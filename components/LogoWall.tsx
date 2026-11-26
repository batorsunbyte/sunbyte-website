/**
 * LogoWall — die Referenz-Leiste direkt unter dem Hero.
 *
 * Löst seit der KI-OS-Welle (27.11.2026) den ProofBar an dieser Stelle ab.
 * Zakir hat am 26.11.2026 bestätigt: Alle acht sind Kunden bzw. eigene Marken,
 * die Freigabe für die Logos liegt vor.
 *
 * Jede Referenz ist eine helle Kachel. Liegt eine Logo-Datei unter
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
    { name: 'WKO' },
    { name: 'Social Talents' },
    { name: 'AutoSPA' },
    { name: 'PrintMyWall', logo: '/images/logos/printmywall.png', w: 251, h: 200 },
    { name: 'Impulsiv Fitness', logo: '/images/logos/impulsiv-fitness.png', w: 384, h: 181 },
    { name: 'Wiener Wohnen' },
    { name: 'Integrationshaus' },
    { name: 'Next Move', logo: '/images/logos/next-move.webp', w: 400, h: 400, dunkel: true },
]

export default function LogoWall() {
    return (
        <section
            className="container-edge"
            style={{ borderBottom: '1px solid rgba(201, 184, 163, 0.10)' }}
            aria-label="Referenzen von Sunbyte"
        >
            <div className="py-8 md:py-10">
                <p className="mono-label text-muted mb-5">referenzen</p>

                <ul className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                    {REFERENZEN.map(r => (
                        <li
                            key={r.name}
                            className="flex items-center justify-center"
                            style={{
                                background: r.dunkel ? '#000' : 'var(--lit)',
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
