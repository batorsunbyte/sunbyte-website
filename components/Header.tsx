'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { CONTACT } from '@/lib/seo'

/**
 * Persistenter Header — auf JEDER Seite identisch (gerendert in layout.tsx).
 * Ersetzt die alte Hero-interne Nav (Änderungsrunde A1: Nav muss überall stehen).
 *
 * - Multi-Page-Routen mit Active-State via usePathname().
 * - Transparent über dem Hero, bekommt beim Scrollen Backdrop + Border.
 * - Mobile: Vollbild-Overlay-Menü.
 * - Perf: ein passiver Scroll-Listener, nur ein boolescher State-Toggle.
 */

const NAV = [
    { href: '/webseiten', label: 'webseiten' },
    { href: '/ki-sichtbarkeit', label: 'ki-sichtbarkeit' },
    { href: '/arbeiten', label: 'referenzen' },
    { href: '/ueber-uns', label: 'über uns' },
    { href: '/kontakt', label: 'kontakt' },
]

export default function Header() {
    const pathname = usePathname()
    const [scrolled, setScrolled] = useState(false)
    const [open, setOpen] = useState(false)
    const toggleRef = useRef<HTMLButtonElement>(null)
    const menuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24)
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    // Menü bei Routenwechsel schließen
    useEffect(() => {
        setOpen(false)
    }, [pathname])

    // Body-Scroll sperren, solange das Mobile-Menü offen ist
    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : ''
        return () => {
            document.body.style.overflow = ''
        }
    }, [open])

    // Mobile-Menü A11y: Fokus ins Menü, Escape schließt, Hintergrund inert,
    // Fokus zurück auf den Toggle beim Schließen.
    useEffect(() => {
        if (!open) return
        menuRef.current?.querySelector('a')?.focus()
        const main = document.getElementById('main')
        const footer = document.querySelector('footer')
        const setInert = (el: Element | null, v: boolean) => {
            if (el) (el as HTMLElement & { inert: boolean }).inert = v
        }
        setInert(main, true)
        setInert(footer, true)
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpen(false)
        }
        window.addEventListener('keydown', onKey)
        return () => {
            window.removeEventListener('keydown', onKey)
            setInert(main, false)
            setInert(footer, false)
            toggleRef.current?.focus()
        }
    }, [open])

    const isActive = (href: string) =>
        href === '/' ? pathname === '/' : pathname.startsWith(href)

    return (
        <>
            <header
                className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
                style={{
                    padding: '1.1rem 6vw',
                    background:
                        scrolled || open
                            ? 'rgba(14, 10, 5, 0.82)'
                            : 'transparent',
                    backdropFilter:
                        scrolled || open ? 'blur(12px)' : 'none',
                    WebkitBackdropFilter:
                        scrolled || open ? 'blur(12px)' : 'none',
                    borderBottom: scrolled
                        ? '1px solid rgba(201, 184, 163, 0.12)'
                        : '1px solid transparent',
                }}
            >
                <div className="flex items-center justify-between">
                    <Link
                        href="/"
                        aria-label="Sunbyte — Startseite"
                        className="font-display hover:text-spark transition-colors"
                        style={{
                            fontSize: 'clamp(1.05rem, 1.4vw, 1.25rem)',
                            color: 'var(--lit)',
                            letterSpacing: '-0.01em',
                            lineHeight: 1,
                        }}
                    >
                        sunbyte
                    </Link>

                    {/* Desktop-Nav */}
                    <nav
                        aria-label="Hauptnavigation"
                        className="hidden md:flex items-center gap-7 font-mono"
                        style={{ fontSize: '0.66rem' }}
                    >
                        {NAV.map(item => (
                            <Link
                                key={item.href}
                                href={item.href}
                                aria-current={
                                    isActive(item.href) ? 'page' : undefined
                                }
                                className={`transition-colors hover:text-lit ${
                                    isActive(item.href)
                                        ? 'text-spark'
                                        : 'text-soft'
                                }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop-CTA */}
                    <Link
                        href="/kontakt"
                        className="hidden md:inline-flex items-center gap-2 font-mono transition-opacity hover:opacity-90"
                        style={{
                            background: 'var(--spark)',
                            color: 'var(--bg)',
                            padding: '0.6rem 1.1rem',
                            borderRadius: '3px',
                            fontSize: '0.66rem',
                            letterSpacing: '0.16em',
                        }}
                    >
                        projekt anfragen <span aria-hidden>→</span>
                    </Link>

                    {/* Mobile-Toggle */}
                    <button
                        ref={toggleRef}
                        type="button"
                        onClick={() => setOpen(o => !o)}
                        aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
                        aria-expanded={open}
                        aria-controls="mobile-menu"
                        className="md:hidden flex flex-col items-end justify-center gap-[5px] p-2 -mr-2"
                    >
                        <span
                            className="block h-[1.5px] transition-all duration-300"
                            style={{
                                width: open ? 22 : 22,
                                background: 'var(--lit)',
                                transform: open
                                    ? 'translateY(6.5px) rotate(45deg)'
                                    : 'none',
                            }}
                        />
                        <span
                            className="block h-[1.5px] transition-all duration-300"
                            style={{
                                width: open ? 22 : 16,
                                background: 'var(--lit)',
                                opacity: open ? 0 : 1,
                            }}
                        />
                        <span
                            className="block h-[1.5px] transition-all duration-300"
                            style={{
                                width: 22,
                                background: 'var(--lit)',
                                transform: open
                                    ? 'translateY(-6.5px) rotate(-45deg)'
                                    : 'none',
                            }}
                        />
                    </button>
                </div>
            </header>

            {/* Mobile-Overlay-Menü */}
            {open && (
                <div
                    ref={menuRef}
                    id="mobile-menu"
                    className="mobile-menu fixed inset-0 z-40 flex flex-col justify-center md:hidden"
                    style={{
                        background: 'var(--bg)',
                        padding: '6rem 8vw 3rem',
                    }}
                >
                    <nav
                        aria-label="Mobile Navigation"
                        className="flex flex-col gap-6"
                    >
                        {NAV.map(item => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="font-display hover:text-spark transition-colors"
                                style={{
                                    fontSize: 'clamp(2rem, 9vw, 3rem)',
                                    color: isActive(item.href)
                                        ? 'var(--spark)'
                                        : 'var(--lit)',
                                    lineHeight: 1,
                                }}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <a
                        href="mailto:office@sunbyte.at"
                        className="mono-label text-spark mt-12 inline-block"
                    >
                        ↳ office@sunbyte.at
                    </a>
                </div>
            )}

            {/* Sticky-Mobile-CTA — erscheint beim Scrollen (Conversion).
                Nicht auf /kontakt (dort ist das Formular das Ziel). */}
            {scrolled && !open && pathname !== '/kontakt' && (
                <div
                    className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex gap-2"
                    style={{
                        padding: '0.7rem 0.8rem',
                        background: 'rgba(14, 10, 5, 0.92)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        borderTop: '1px solid rgba(201, 184, 163, 0.14)',
                    }}
                >
                    <Link
                        href="/kontakt"
                        className="flex-1 inline-flex items-center justify-center gap-2 font-mono"
                        style={{
                            background: 'var(--spark)',
                            color: 'var(--bg)',
                            padding: '0.85rem',
                            borderRadius: '4px',
                            fontSize: '0.72rem',
                            letterSpacing: '0.12em',
                        }}
                    >
                        projekt anfragen <span aria-hidden>→</span>
                    </Link>
                    <a
                        href={`https://wa.me/${CONTACT.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Per WhatsApp schreiben"
                        className="inline-flex items-center justify-center font-mono"
                        style={{
                            border: '1px solid rgba(201, 184, 163, 0.3)',
                            color: 'var(--lit)',
                            padding: '0.85rem 1.1rem',
                            borderRadius: '4px',
                            fontSize: '0.72rem',
                            letterSpacing: '0.12em',
                        }}
                    >
                        whatsapp
                    </a>
                </div>
            )}
        </>
    )
}
