'use client'

import { useEffect, useRef, useState, type ReactNode, type ElementType } from 'react'

/**
 * Reveal — wiederverwendbarer Scroll-Reveal (fade + slide-up).
 * Perf: nur opacity/transform, ein IntersectionObserver pro Element, läuft
 * einmal (kein Re-Play). prefers-reduced-motion → sofort sichtbar (CSS).
 *
 * `delay` in ms staffelt mehrere Elemente. `as` wählt das HTML-Tag.
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
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        if (
            window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ) {
            setVisible(true)
            return
        }
        const io = new IntersectionObserver(
            entries => {
                for (const e of entries) {
                    if (e.isIntersecting) {
                        setVisible(true)
                        io.disconnect()
                    }
                }
            },
            { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
        )
        io.observe(el)
        return () => io.disconnect()
    }, [])

    return (
        <Tag
            ref={ref as React.Ref<HTMLElement>}
            className={`reveal-item ${visible ? 'is-visible' : ''} ${className}`}
            style={{ ...style, transitionDelay: `${delay}ms` }}
        >
            {children}
        </Tag>
    )
}
