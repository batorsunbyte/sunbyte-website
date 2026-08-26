'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * LiveFrame — echte Live-Website im Browser-Fenster.
 *
 * Rendert die Kundenseite als skaliertes Desktop-iframe (1280px-Layout,
 * per transform auf Containerbreite verkleinert) — man scrollt und klickt
 * die ECHTE Seite im Fenster.
 *
 * Perf-Schutz:
 *   - iframe wird erst gemountet, wenn der Container in Viewport-Nähe ist
 *     (IntersectionObserver, 300px rootMargin) — kein Initial-Load-Gewicht.
 *   - Bis zum Laden liegt der Screenshot als Poster darüber (kein Flackern).
 *   - display:none (Mobile) → Container hat keine Fläche → iframe lädt nie.
 *
 * Sicherheit: sandbox ohne allow-top-navigation — die eingebettete Seite
 * kann sunbyte.at nicht wegnavigieren; _blank-Links öffnen normal.
 */

const DESIGN_W = 1280

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
    const [boxH, setBoxH] = useState(0)
    const [visible, setVisible] = useState(false)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        const el = hostRef.current
        if (!el) return

        const measure = () => {
            const r = el.getBoundingClientRect()
            if (r.width > 0) {
                setScale(r.width / DESIGN_W)
                setBoxH(r.height)
            }
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
        <div ref={hostRef} className="relative w-full h-full overflow-hidden">
            {visible && scale > 0 && (
                <iframe
                    src={url}
                    title={title}
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                    onLoad={() => setLoaded(true)}
                    style={{
                        width: DESIGN_W,
                        height: boxH / (scale || 1),
                        transform: `scale(${scale})`,
                        transformOrigin: 'top left',
                        border: 0,
                        display: 'block',
                        background: '#fff',
                    }}
                />
            )}

            {/* Poster (Screenshot) bis das iframe steht */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={poster}
                alt=""
                aria-hidden
                className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700"
                style={{ opacity: loaded ? 0 : 1, pointerEvents: 'none' }}
            />
        </div>
    )
}
