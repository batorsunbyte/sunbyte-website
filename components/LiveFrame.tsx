'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * LiveFrame — echte Live-Website im Browser-Fenster.
 *
 * Rendert die Kundenseite als skaliertes Desktop-iframe (1280px-Layout,
 * per transform auf Containerbreite verkleinert) — man scrollt und klickt
 * die ECHTE Seite im Fenster.
 *
 * Perf-Schutz (iOS-Memory-Fix, volle Interaktivität bleibt):
 *   - iframe lebt NUR, solange das Fenster in Viewport-Nähe ist (±500px).
 *     Scrollt es weit raus, wird es nach kurzer Karenz entladen (Poster
 *     kehrt zurück) — so sind nie mehr als 1–2 fremde Websites gleichzeitig
 *     im Speicher. Behebt den Safari-iOS-Zwangs-Reload bei 5 iframes.
 *   - Bis zum Laden liegt der Screenshot als Poster darüber (kein Flackern).
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
    const [active, setActive] = useState(false)
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

        // Mount in Viewport-Nähe, Unmount mit Karenz wenn weit draußen —
        // hält den Speicher klein (max. 1–2 lebende iframes).
        let unmountTimer: ReturnType<typeof setTimeout> | undefined
        const io = new IntersectionObserver(
            entries => {
                for (const e of entries) {
                    if (e.isIntersecting) {
                        clearTimeout(unmountTimer)
                        setActive(true)
                    } else {
                        clearTimeout(unmountTimer)
                        unmountTimer = setTimeout(() => {
                            setActive(false)
                            setLoaded(false)
                        }, 1200)
                    }
                }
            },
            { rootMargin: '500px 0px' },
        )
        io.observe(el)

        return () => {
            clearTimeout(unmountTimer)
            ro.disconnect()
            io.disconnect()
        }
    }, [])

    return (
        <div ref={hostRef} className="relative w-full h-full overflow-hidden">
            {active && scale > 0 && (
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
