'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * LiveFrame — echte Live-Website als scrollbarer Ausschnitt.
 *
 * Konzept (Zakir, 2026-08-27): Das Fenster ist eine VITRINE, kein Browser.
 *   - Das iframe rendert die Live-Seite in voller Höhe (1280×6000-Layout,
 *     skaliert) mit pointer-events:none — kein Klick kommt durch, kein
 *     WhatsApp-Button, nichts. Gescrollt wird der PARENT-Container.
 *   - Besuchen geht ausschließlich über den „webseite besuchen"-Eck-Button
 *     (liegt in CaseVisual).
 *
 * Perf: IO-lazy (mountet erst in Viewport-Nähe), Poster bis onLoad.
 * Mobile bekommt diese Komponente gar nicht (CaseVisual rendert dort ein
 * statisches Bild) — behebt den iOS-Safari-Memory-Reload („Sicherheits-
 * warnung") bei mehreren schweren iframes.
 */

const DESIGN_W = 1280
const DESIGN_H = 6000

export default function LiveFrame({
    url,
    title,
    poster,
}: {
    url: string
    title: string
    poster: string
}) {
    const hostRef = useRef<HTMLDivElement | null>(null)
    const [scale, setScale] = useState(0)
    const [visible, setVisible] = useState(false)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        const el = hostRef.current
        if (!el) return

        const measure = () => {
            const r = el.getBoundingClientRect()
            if (r.width > 0) setScale(r.width / DESIGN_W)
        }
        measure()
        const ro = new ResizeObserver(measure)
        ro.observe(el)

        const io = new IntersectionObserver(
            entries => {
                for (const e of entries) {
                    if (e.isIntersecting) {
                        setVisible(true)
                        io.disconnect()
                    }
                }
            },
            { rootMargin: '300px 0px' },
        )
        io.observe(el)

        return () => {
            ro.disconnect()
            io.disconnect()
        }
    }, [])

    return (
        <div
            ref={hostRef}
            className="relative w-full"
            style={{
                // volle (skalierte) Inhaltshöhe -> der Parent-Container scrollt
                height: scale > 0 ? DESIGN_H * scale : '100%',
            }}
        >
            {visible && scale > 0 && (
                <iframe
                    src={url}
                    title={title}
                    loading="lazy"
                    tabIndex={-1}
                    aria-hidden
                    sandbox="allow-scripts allow-same-origin"
                    onLoad={() => setLoaded(true)}
                    style={{
                        width: DESIGN_W,
                        height: DESIGN_H,
                        transform: `scale(${scale})`,
                        transformOrigin: 'top left',
                        border: 0,
                        display: 'block',
                        background: '#fff',
                        pointerEvents: 'none', // Vitrine: nichts ist klickbar
                    }}
                />
            )}

            {/* Poster (Screenshot) bis das iframe steht */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={poster}
                alt=""
                aria-hidden
                className="absolute top-0 left-0 w-full object-cover object-top transition-opacity duration-700"
                style={{
                    height: '100%',
                    maxHeight: '32rem',
                    opacity: loaded ? 0 : 1,
                    pointerEvents: 'none',
                }}
            />
        </div>
    )
}
