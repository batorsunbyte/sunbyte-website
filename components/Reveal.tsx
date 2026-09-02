'use client'

import { useEffect, useRef, useState, type ReactNode, type ElementType } from 'react'

/**
 * Reveal — Scroll-Einblendung (fade + slide-up).
 *
 * WICHTIG (Perf-Fix 02.09.2026): Der Inhalt ist per Default SICHTBAR.
 * Vorher stand `opacity: 0` als Grundzustand im CSS — dadurch war die komplette
 * Seite unterhalb des Hero unsichtbar, bis React geladen, hydriert und der
 * IntersectionObserver gefeuert hatte. Auf langsamen Handys sah der Besucher
 * sekundenlang eine praktisch leere Seite.
 *
 * Jetzt: Beim Mount prüfen wir, ob das Element bereits im Sichtfeld liegt.
 *   - im Sichtfeld  -> nichts tun, es ist schon sichtbar (kein Flackern)
 *   - ausserhalb    -> `is-armed` setzen (blendet aus) und per IO einblenden
 * Ohne JS bleibt schlicht alles sichtbar — das ist der sichere Zustand.
 */
export default function Reveal({
    children,
    delay = 0,
    as: Tag = 'div',
    className = '',
    style,
}: {
    children: ReactNode
    delay?: number
    as?: ElementType
    className?: string
    style?: React.CSSProperties
}) {
    const ref = useRef<HTMLElement | null>(null)
    const [armed, setArmed] = useState(false)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

        // Schon im Sichtfeld (plus kleine Reserve)? Dann gar nicht erst ausblenden.
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight * 1.05) return

        setArmed(true)

        const io = new IntersectionObserver(
            entries => {
                for (const e of entries) {
                    if (e.isIntersecting) {
                        setVisible(true)
                        io.disconnect()
                    }
                }
            },
            { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
        )
        io.observe(el)
        return () => io.disconnect()
    }, [])

    return (
        <Tag
            ref={ref as React.Ref<HTMLElement>}
            className={`reveal-item ${armed ? 'is-armed' : ''} ${
                visible ? 'is-visible' : ''
            } ${className}`}
            style={{ ...style, transitionDelay: armed ? `${delay}ms` : undefined }}
        >
            {children}
        </Tag>
    )
}
