'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * SitePreview — „Webseite in Webseite": echte Live-Site in einem Browser-Rahmen.
 *
 * Perf-first:
 *   - iframe lädt ERST, wenn der Rahmen nah am Viewport ist (IntersectionObserver,
 *     rootMargin 200px) — kein Ladegewicht beim Seitenaufruf.
 *   - `pointer-events: none` auf dem iframe → kein Scroll-Trap, voll mobil-tauglich.
 *   - Skalierung per ResizeObserver (eine logische Breite, sauber responsiv).
 *   - Klick öffnet die echte Seite in neuem Tab (Link-Overlay, immer vorhanden —
 *     funktioniert auch, falls eine Seite das Einbetten blockt).
 */

const BASE_W = 1280

function domainOf(u: string) {
    try {
        return new URL(u).hostname.replace(/^www\./, '')
    } catch {
        return u
    }
}

export default function SitePreview({
    url,
    ratio = 0.64,
    domain,
}: {
    url: string
    ratio?: number // Höhe / Breite
    domain?: string
}) {
    const wrapRef = useRef<HTMLDivElement>(null)
    const viewRef = useRef<HTMLDivElement>(null)
    const [inView, setInView] = useState(false)
    const [scale, setScale] = useState(0.25)
    const [loaded, setLoaded] = useState(false)
    const dom = domain ?? domainOf(url)

    // Lazy: iframe erst nahe Viewport laden
    useEffect(() => {
        const el = wrapRef.current
        if (!el) return
        const io = new IntersectionObserver(
            es => {
                for (const e of es) {
                    if (e.isIntersecting) {
                        setInView(true)
                        io.disconnect()
                    }
                }
            },
            { rootMargin: '200px' },
        )
        io.observe(el)
        return () => io.disconnect()
    }, [])

    // Skalierung an Containerbreite
    useEffect(() => {
        const el = viewRef.current
        if (!el) return
        const update = () => {
            const w = el.clientWidth
            if (w > 0) setScale(w / BASE_W)
        }
        update()
        const ro = new ResizeObserver(update)
        ro.observe(el)
        return () => ro.disconnect()
    }, [inView])

    return (
        <div ref={wrapRef} className="relative w-full">
            <div
                style={{
                    border: '1px solid rgba(201, 184, 163, 0.18)',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    background: 'rgba(20, 17, 15, 0.6)',
                    boxShadow: '0 24px 60px -30px rgba(0,0,0,0.8)',
                }}
            >
                {/* Browser-Bar */}
                <div
                    className="flex items-center gap-2"
                    style={{
                        padding: '0.6rem 0.85rem',
                        borderBottom: '1px solid rgba(201, 184, 163, 0.12)',
                    }}
                >
                    <span className="flex gap-1.5" aria-hidden>
                        <i
                            className="block rounded-full"
                            style={{ width: 9, height: 9, background: 'rgba(232,90,31,0.7)' }}
                        />
                        <i
                            className="block rounded-full"
                            style={{ width: 9, height: 9, background: 'rgba(201,184,163,0.4)' }}
                        />
                        <i
                            className="block rounded-full"
                            style={{ width: 9, height: 9, background: 'rgba(201,184,163,0.25)' }}
                        />
                    </span>
                    <span
                        className="mono-label text-muted ml-2 truncate"
                        style={{ fontSize: '0.62rem' }}
                    >
                        {dom}
                    </span>
                </div>

                {/* Viewport */}
                <div
                    ref={viewRef}
                    className="relative w-full"
                    style={{ height: 0, paddingBottom: `${ratio * 100}%` }}
                >
                    {inView && (
                        <iframe
                            src={url}
                            title={`Live-Vorschau ${dom}`}
                            loading="lazy"
                            onLoad={() => setLoaded(true)}
                            tabIndex={-1}
                            aria-hidden
                            sandbox="allow-scripts allow-same-origin"
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: BASE_W,
                                height: BASE_W * ratio,
                                border: 0,
                                transformOrigin: 'top left',
                                transform: `scale(${scale})`,
                                pointerEvents: 'none',
                                opacity: loaded ? 1 : 0,
                                transition: 'opacity 0.6s ease',
                            }}
                        />
                    )}

                    {/* Placeholder bis geladen */}
                    {!loaded && (
                        <div
                            className="absolute inset-0 flex items-center justify-center"
                            aria-hidden
                            style={{
                                background:
                                    'radial-gradient(circle at 70% 25%, rgba(232,90,31,0.10) 0%, transparent 60%)',
                            }}
                        >
                            <span
                                className="mono-label text-muted"
                                style={{ fontSize: '0.6rem' }}
                            >
                                ↳ live-vorschau lädt …
                            </span>
                        </div>
                    )}

                    {/* Klick-Overlay → echte Seite */}
                    <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${dom} live ansehen`}
                        className="group absolute inset-0 flex items-end justify-end p-3"
                    >
                        <span
                            className="mono-label opacity-0 group-hover:opacity-100 transition-opacity"
                            style={{
                                fontSize: '0.62rem',
                                color: 'var(--lit)',
                                background: 'rgba(14,10,5,0.8)',
                                border: '1px solid rgba(232,90,31,0.4)',
                                borderRadius: '3px',
                                padding: '0.3rem 0.6rem',
                            }}
                        >
                            live ansehen ↗
                        </span>
                    </a>
                </div>
            </div>
        </div>
    )
}
