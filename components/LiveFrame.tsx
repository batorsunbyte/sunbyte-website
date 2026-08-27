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
    const [hint, setHint] = useState(false)
    const [inView, setInView] = useState(false)
    const hintShown = useRef(false)
    const hintTimer = useRef<ReturnType<typeof setTimeout>>()

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

        // Echte Sichtbarkeit (fürs Hint-Timing) — ohne Vorlade-Margin
        const ioView = new IntersectionObserver(
            entries => {
                for (const e of entries) setInView(e.isIntersecting)
            },
            { threshold: 0.45 },
        )
        ioView.observe(el)

        return () => {
            clearTimeout(unmountTimer)
            clearTimeout(hintTimer.current)
            ro.disconnect()
            io.disconnect()
            ioView.disconnect()
        }
    }, [])

    // Erklär-Hinweis: einmalig, erst wenn geladen UND wirklich im Blickfeld —
    // kaum jemand kennt live eingebettete, scrollbare Websites.
    useEffect(() => {
        if (loaded && inView && !hintShown.current) {
            hintShown.current = true
            setHint(true)
            hintTimer.current = setTimeout(() => setHint(false), 5000)
        }
    }, [loaded, inView])

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

            {/* Erklär-Hinweis: erscheint nach dem Laden, verschwindet von selbst */}
            <div
                className="absolute inset-0 flex items-center justify-center transition-opacity duration-700"
                style={{
                    opacity: hint ? 1 : 0,
                    pointerEvents: 'none',
                    zIndex: 5,
                }}
                aria-hidden
            >
                <div
                    className="flex items-center gap-3.5"
                    style={{
                        background: 'rgba(14, 10, 5, 0.82)',
                        border: '1px solid rgba(232, 90, 31, 0.45)',
                        borderRadius: '6px',
                        padding: '0.9rem 1.3rem',
                        backdropFilter: 'blur(6px)',
                        boxShadow: '0 18px 50px -12px rgba(0,0,0,0.7)',
                        maxWidth: '86%',
                    }}
                >
                    <span
                        className="hint-scroll-icon"
                        style={{
                            fontSize: '1.35rem',
                            color: 'var(--spark)',
                            lineHeight: 1,
                        }}
                    >
                        ↕
                    </span>
                    <span>
                        <span
                            className="block"
                            style={{
                                color: 'var(--lit)',
                                fontSize: '0.85rem',
                                fontWeight: 600,
                                lineHeight: 1.35,
                            }}
                        >
                            Das ist die echte Website — live.
                        </span>
                        <span
                            className="block text-soft"
                            style={{ fontSize: '0.78rem', lineHeight: 1.35 }}
                        >
                            Scroll sie direkt hier im Fenster.
                        </span>
                    </span>
                </div>
            </div>

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
