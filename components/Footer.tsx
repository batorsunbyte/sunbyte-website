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
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/images/brand/sunbyte-wortmarke-hell.webp"
                        alt="Sunbyte"
                        width={1200}
                        height={341}
                        loading="lazy"
                        style={{ height: 'clamp(2.4rem, 3.4vw, 3rem)', width: 'auto' }}
                    />
                    <p
                        className="text-soft mt-2 max-w-sm leading-snug"
                        style={{ fontSize: 'clamp(0.8rem, 0.95vw, 0.9rem)' }}
                    >
                        KI-Betriebssysteme für Betriebe und Agenturen, aus
                        Wien.
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
                    <FooterLink href="/">KI-OS</FooterLink>
                    <FooterLink href="/partner">Für Agenturen</FooterLink>
                    <FooterLink href="/arbeiten">Arbeiten</FooterLink>
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
                    © 2026 sunbyte gmbh · wien
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
