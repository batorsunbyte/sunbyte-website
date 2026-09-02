import Link from 'next/link'
import { CONTACT } from '@/lib/seo'

/**
 * Footer — auf jeder Seite (gerendert in layout.tsx).
 * Extrahiert aus dem alten Contact.tsx, auf Multi-Page-Routen umgestellt.
 */
export default function Footer() {
    return (
        <footer
            className="relative w-full container-edge"
            style={{
                paddingTop: '3rem',
                paddingBottom: '3rem',
                borderTop: '1px solid rgba(201, 184, 163, 0.12)',
            }}
        >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 items-start">
                {/* Marke + Tagline */}
                <div className="md:col-span-5">
                    <p
                        className="font-display"
                        style={{
                            fontSize: 'clamp(1.5rem, 2vw, 1.75rem)',
                            color: 'var(--lit)',
                        }}
                    >
                        sunbyte
                    </p>
                    <p
                        className="text-soft mt-2 max-w-sm leading-snug"
                        style={{ fontSize: 'clamp(0.8rem, 0.95vw, 0.9rem)' }}
                    >
                        IT-Dienstleister aus Wien. Webseiten & KI-Sichtbarkeit —
                        ehrlich gerechnet.
                    </p>
                </div>

                {/* Sitemap */}
                <nav
                    aria-label="Sitemap"
                    className="md:col-span-3 md:col-start-7 flex flex-col gap-2"
                >
                    <p
                        className="mono-label text-muted mb-1"
                        style={{ fontSize: '0.6rem' }}
                    >
                        sitemap
                    </p>
                    <FooterLink href="/webseiten">Webseiten</FooterLink>
                    <FooterLink href="/ki-sichtbarkeit">
                        KI-Sichtbarkeit
                    </FooterLink>
                    <FooterLink href="/was-kostet-eine-website">
                        Was kostet eine Website?
                    </FooterLink>
                    <FooterLink href="/arbeiten">Referenzen</FooterLink>
                    <FooterLink href="/ueber-uns">Über uns</FooterLink>
                    <FooterLink href="/kontakt">Kontakt</FooterLink>
                </nav>

                {/* Legal */}
                <nav
                    aria-label="Rechtliches"
                    className="md:col-span-3 md:col-start-10 flex flex-col gap-2"
                >
                    <p
                        className="mono-label text-muted mb-1"
                        style={{ fontSize: '0.6rem' }}
                    >
                        rechtliches
                    </p>
                    <FooterLink href="/impressum">Impressum</FooterLink>
                    <FooterLink href="/datenschutz">Datenschutz</FooterLink>
                    <a
                        href="mailto:office@sunbyte.at"
                        className="text-soft hover:text-lit transition-colors text-sm"
                    >
                        office@sunbyte.at
                    </a>
                    <a
                        href={`https://wa.me/${CONTACT.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-soft hover:text-lit transition-colors text-sm"
                    >
                        WhatsApp
                    </a>
                </nav>
            </div>

            {/* Bottom-Strich */}
            <div
                className="mt-10 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                style={{ borderTop: '1px solid rgba(201, 184, 163, 0.08)' }}
            >
                <p
                    className="mono-label text-muted"
                    style={{ fontSize: '0.6rem' }}
                >
                    © 2026 sunbyte · zakir daryabi · wien
                </p>
                <p
                    className="mono-label text-muted"
                    style={{ fontSize: '0.6rem' }}
                >
                    handgebaut in wien · next.js · gh-pages
                </p>
            </div>
        </footer>
    )
}

function FooterLink({
    href,
    children,
}: {
    href: string
    children: React.ReactNode
}) {
    return (
        <Link
            href={href}
            className="text-soft hover:text-lit transition-colors text-sm"
        >
            {children}
        </Link>
    )
}
