'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import {
    PLANETS,
    SUN,
    bodyAngleRad,
    bodyByKey,
    daysSinceJ2000,
} from '@/lib/solar-data'

/**
 * SolarSystem — Signature des Home-Heros. Echtzeitnahes Sonnensystem:
 * Planeten starten an ihrer realen aktuellen Position (heutiges Datum) und
 * bewegen sich beschleunigt weiter. Vergrößerbar zum Vollbild-„Universum",
 * Planeten anklickbar → erzählen über Sunbyte / Zakirs IT.
 *
 * Perf (heilig): EINE rAF-Schleife, zeichnet nur die aktive Canvas.
 * IntersectionObserver pausiert offscreen, visibilitychange bei Tab-Wechsel,
 * prefers-reduced-motion → ein statischer Render (kein Loop). dPR auf 2 gedeckelt.
 */

const DAYS_PER_SEC = 6
const ORBIT_SQUASH = 0.92

interface Props {
    onSelect?: (key: string | null) => void
    ariaLabel?: string
    className?: string
}

interface Pos {
    key: string
    x: number
    y: number
    r: number
}

function lighten(hex: string): string {
    const c = hex.replace('#', '')
    const r = parseInt(c.slice(0, 2), 16)
    const g = parseInt(c.slice(2, 4), 16)
    const b = parseInt(c.slice(4, 6), 16)
    const f = (v: number) => Math.round(v + (255 - v) * 0.45)
    return `rgb(${f(r)},${f(g)},${f(b)})`
}

export default function SolarSystem({
    onSelect,
    ariaLabel = 'Interaktives Sonnensystem',
    className = '',
}: Props) {
    const wrapRef = useRef<HTMLDivElement | null>(null)
    const compactCanvas = useRef<HTMLCanvasElement | null>(null)
    const fullCanvas = useRef<HTMLCanvasElement | null>(null)

    const [expanded, setExpanded] = useState(false)
    const [selected, setSelected] = useState<string | null>(null)

    const expandedRef = useRef(false)
    const selectedRef = useRef<string | null>(null)
    const hoveredRef = useRef<string | null>(null)
    const runningRef = useRef(false)
    const rafRef = useRef(0)
    const simDaysRef = useRef(0)
    const lastTsRef = useRef(0)
    const baseDaysRef = useRef(0)
    const reducedRef = useRef(false)
    const touchRef = useRef(false)
    const starsRef = useRef<{ x: number; y: number; r: number; a: number }[]>([])
    const posRef = useRef<{ canvas: HTMLCanvasElement; list: Pos[] } | null>(
        null,
    )

    useEffect(() => {
        expandedRef.current = expanded
    }, [expanded])

    useEffect(() => {
        selectedRef.current = selected
        onSelect?.(selected)
    }, [selected, onSelect])

    // Init: reduced-motion, touch, reale Startpositionen, Sternenfeld
    useEffect(() => {
        reducedRef.current = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        ).matches
        touchRef.current = !window.matchMedia(
            '(hover: hover) and (pointer: fine)',
        ).matches
        baseDaysRef.current = daysSinceJ2000(Date.now())
        const stars = []
        for (let i = 0; i < 90; i++) {
            stars.push({
                x: Math.random(),
                y: Math.random(),
                r: Math.random() * 1.2 + 0.3,
                a: Math.random() * 0.5 + 0.2,
            })
        }
        starsRef.current = stars
    }, [])

    const draw = useCallback(() => {
        const isFull = expandedRef.current
        const canvas = isFull ? fullCanvas.current : compactCanvas.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return
        const cssW = canvas.clientWidth
        const cssH = canvas.clientHeight
        if (!cssW || !cssH) return
        const dpr = Math.min(window.devicePixelRatio || 1, 2)
        if (
            canvas.width !== Math.round(cssW * dpr) ||
            canvas.height !== Math.round(cssH * dpr)
        ) {
            canvas.width = Math.round(cssW * dpr)
            canvas.height = Math.round(cssH * dpr)
        }
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        ctx.clearRect(0, 0, cssW, cssH)

        const cx = cssW / 2
        const cy = cssH / 2
        const maxR = (Math.min(cssW, cssH) / 2) * (isFull ? 0.8 : 0.94)
        const unit = Math.min(cssW, cssH)
        const totalDays = baseDaysRef.current + simDaysRef.current
        const list: Pos[] = []

        // Sternenfeld (nur Vollbild)
        if (isFull) {
            for (const s of starsRef.current) {
                ctx.globalAlpha = s.a
                ctx.beginPath()
                ctx.arc(s.x * cssW, s.y * cssH, s.r, 0, Math.PI * 2)
                ctx.fillStyle = '#FFF3E4'
                ctx.fill()
            }
            ctx.globalAlpha = 1
        }

        // Bahnen
        ctx.strokeStyle = 'rgba(201,184,163,0.14)'
        ctx.lineWidth = 1
        for (const p of PLANETS) {
            const r = p.orbitRel * maxR
            ctx.beginPath()
            ctx.ellipse(cx, cy, r, r * ORBIT_SQUASH, 0, 0, Math.PI * 2)
            ctx.stroke()
        }

        // Sonne: Glow + Kern
        const sunR = SUN.sizeRel * unit * (isFull ? 0.85 : 1)
        const glow = ctx.createRadialGradient(
            cx,
            cy,
            sunR * 0.2,
            cx,
            cy,
            sunR * 3.2,
        )
        glow.addColorStop(0, 'rgba(255,226,194,0.85)')
        glow.addColorStop(0.3, 'rgba(232,90,31,0.45)')
        glow.addColorStop(1, 'transparent')
        ctx.beginPath()
        ctx.arc(cx, cy, sunR * 3.2, 0, Math.PI * 2)
        ctx.fillStyle = glow
        ctx.fill()
        const core = ctx.createRadialGradient(
            cx - sunR * 0.3,
            cy - sunR * 0.3,
            sunR * 0.1,
            cx,
            cy,
            sunR,
        )
        core.addColorStop(0, '#ffe9cf')
        core.addColorStop(0.5, '#E85A1F')
        core.addColorStop(1, '#c8430f')
        ctx.beginPath()
        ctx.arc(cx, cy, sunR, 0, Math.PI * 2)
        ctx.fillStyle = core
        ctx.fill()
        list.push({ key: 'sun', x: cx, y: cy, r: sunR })

        if (selectedRef.current === 'sun' || hoveredRef.current === 'sun') {
            ctx.beginPath()
            ctx.arc(cx, cy, sunR + 6, 0, Math.PI * 2)
            ctx.strokeStyle = '#FFF3E4'
            ctx.lineWidth = 1.5
            ctx.stroke()
        }

        // Planeten
        for (const p of PLANETS) {
            const r = p.orbitRel * maxR
            const a = bodyAngleRad(p, totalDays)
            const x = cx + Math.cos(a) * r
            const y = cy + Math.sin(a) * r * ORBIT_SQUASH
            const pr = Math.max(p.sizeRel * unit * (isFull ? 0.9 : 1), 2.2)
            const isSel = selectedRef.current === p.key
            const isHov = hoveredRef.current === p.key

            if (p.ring) {
                ctx.save()
                ctx.translate(x, y)
                ctx.rotate(-0.5)
                ctx.beginPath()
                ctx.ellipse(0, 0, pr * 2.1, pr * 0.7, 0, 0, Math.PI * 2)
                ctx.strokeStyle = 'rgba(216,192,138,0.6)'
                ctx.lineWidth = Math.max(pr * 0.22, 1)
                ctx.stroke()
                ctx.restore()
            }

            const grad = ctx.createRadialGradient(
                x - pr * 0.4,
                y - pr * 0.4,
                pr * 0.1,
                x,
                y,
                pr,
            )
            grad.addColorStop(0, lighten(p.color))
            grad.addColorStop(1, p.color)
            ctx.beginPath()
            ctx.arc(x, y, pr, 0, Math.PI * 2)
            ctx.fillStyle = grad
            ctx.fill()

            if (isSel || isHov) {
                ctx.beginPath()
                ctx.arc(x, y, pr + (isSel ? 5 : 3), 0, Math.PI * 2)
                ctx.strokeStyle = isSel
                    ? '#FFF3E4'
                    : 'rgba(255,243,228,0.5)'
                ctx.lineWidth = 1.5
                ctx.stroke()
            }

            if (isFull || isSel || isHov) {
                ctx.font = `${isFull ? 12 : 10}px 'JetBrains Mono', monospace`
                ctx.fillStyle =
                    isSel || isHov ? '#FFF3E4' : 'rgba(201,184,163,0.65)'
                ctx.textAlign = 'left'
                ctx.fillText(p.name.toLowerCase(), x + pr + 6, y + 3)
            }

            list.push({ key: p.key, x, y, r: pr })
        }

        posRef.current = { canvas, list }
    }, [])

    const frame = useCallback(
        (ts: number) => {
            if (!runningRef.current) return
            if (!lastTsRef.current) lastTsRef.current = ts
            const dt = Math.min((ts - lastTsRef.current) / 1000, 0.05)
            lastTsRef.current = ts
            if (!reducedRef.current) simDaysRef.current += dt * DAYS_PER_SEC
            draw()
            rafRef.current = requestAnimationFrame(frame)
        },
        [draw],
    )

    const start = useCallback(() => {
        if (runningRef.current) return
        if (reducedRef.current) {
            requestAnimationFrame(() => draw())
            return
        }
        runningRef.current = true
        lastTsRef.current = 0
        rafRef.current = requestAnimationFrame(frame)
    }, [draw, frame])

    const stop = useCallback(() => {
        runningRef.current = false
        if (rafRef.current) cancelAnimationFrame(rafRef.current)
        rafRef.current = 0
    }, [])

    // Sichtbarkeit: Loop nur wenn compact im Viewport (oder expanded)
    useEffect(() => {
        const el = wrapRef.current
        if (!el) return
        const io = new IntersectionObserver(
            entries => {
                for (const e of entries) {
                    if (expandedRef.current) continue
                    if (e.isIntersecting) start()
                    else stop()
                }
            },
            { threshold: 0.05 },
        )
        io.observe(el)

        const onVis = () => {
            if (document.hidden) stop()
            else start()
        }
        document.addEventListener('visibilitychange', onVis)

        const onResize = () => draw()
        window.addEventListener('resize', onResize)

        return () => {
            io.disconnect()
            document.removeEventListener('visibilitychange', onVis)
            window.removeEventListener('resize', onResize)
            stop()
        }
    }, [start, stop, draw])

    // Expand-Wechsel: Loop neu aufsetzen, Body-Scroll sperren, Esc schließt
    useEffect(() => {
        if (expanded) {
            document.body.style.overflow = 'hidden'
            stop()
            // nach Layout der Vollbild-Canvas neu starten/zeichnen
            requestAnimationFrame(() => {
                if (reducedRef.current) draw()
                else start()
            })
            const onKey = (e: KeyboardEvent) => {
                if (e.key === 'Escape') setExpanded(false)
            }
            window.addEventListener('keydown', onKey)
            return () => {
                document.body.style.overflow = ''
                window.removeEventListener('keydown', onKey)
            }
        } else {
            stop()
            requestAnimationFrame(() => {
                if (reducedRef.current) draw()
                else start()
            })
        }
    }, [expanded, start, stop, draw])

    // Pointer-Handling
    const hitTest = (canvas: HTMLCanvasElement, cx: number, cy: number) => {
        const rect = canvas.getBoundingClientRect()
        const x = cx - rect.left
        const y = cy - rect.top
        const p = posRef.current
        if (!p || p.canvas !== canvas) return null
        let best: string | null = null
        let bestD = Infinity
        for (const b of p.list) {
            const d = Math.hypot(x - b.x, y - b.y)
            const hitR = Math.max(b.r + 7, 13)
            if (d < hitR && d < bestD) {
                best = b.key
                bestD = d
            }
        }
        return best
    }

    const handleClick =
        (which: 'compact' | 'full') => (e: React.MouseEvent) => {
            const canvas =
                which === 'full' ? fullCanvas.current : compactCanvas.current
            if (!canvas) return
            setSelected(hitTest(canvas, e.clientX, e.clientY))
        }

    const handleMove =
        (which: 'compact' | 'full') => (e: React.PointerEvent) => {
            const canvas =
                which === 'full' ? fullCanvas.current : compactCanvas.current
            if (!canvas || touchRef.current) return
            const k = hitTest(canvas, e.clientX, e.clientY)
            if (k !== hoveredRef.current) {
                hoveredRef.current = k
                canvas.style.cursor = k ? 'pointer' : 'default'
                if (!runningRef.current) draw()
            }
        }

    const sel = bodyByKey(selected)

    return (
        <>
            <div ref={wrapRef} className={`relative ${className}`}>
                <canvas
                    ref={compactCanvas}
                    role="img"
                    aria-label={ariaLabel}
                    onClick={handleClick('compact')}
                    onPointerMove={handleMove('compact')}
                    className="block w-full"
                    style={{ aspectRatio: '1 / 1', touchAction: 'manipulation' }}
                />
                <button
                    type="button"
                    onClick={() => setExpanded(true)}
                    aria-label="Sonnensystem vergrößern"
                    className="absolute top-2 right-2 inline-flex items-center gap-1.5 mono-label transition-colors hover:text-lit"
                    style={{
                        fontSize: '0.56rem',
                        color: 'var(--soft)',
                        background: 'rgba(14,10,5,0.55)',
                        border: '1px solid rgba(201,184,163,0.2)',
                        borderRadius: '3px',
                        padding: '0.3rem 0.55rem',
                    }}
                >
                    <span aria-hidden>⤢</span> vergrößern
                </button>
            </div>

            {/* Vollbild-Universum — per Portal an <body>, damit kein
                transformierter Vorfahre (hero-reveal) den fixed-Layer einsperrt */}
            {expanded &&
                typeof document !== 'undefined' &&
                createPortal(
                <div
                    className="fixed inset-0 z-[100]"
                    style={{ background: '#08060333' }}
                >
                    <div
                        className="absolute inset-0"
                        style={{ background: '#0E0A05' }}
                    >
                        <canvas
                            ref={fullCanvas}
                            role="img"
                            aria-label="Sonnensystem im Vollbild — Planeten anklicken"
                            onClick={handleClick('full')}
                            onPointerMove={handleMove('full')}
                            className="absolute inset-0 w-full h-full"
                            style={{ touchAction: 'manipulation' }}
                        />

                        {/* Kopf */}
                        <div
                            className="absolute top-5 left-0 right-0 flex items-center justify-between"
                            style={{ padding: '0 6vw' }}
                        >
                            <span className="mono-label text-spark">
                                sunbyte · universum
                            </span>
                            <button
                                type="button"
                                onClick={() => setExpanded(false)}
                                aria-label="Schließen"
                                className="mono-label text-soft hover:text-lit transition-colors inline-flex items-center gap-2"
                            >
                                schließen <span aria-hidden>✕</span>
                            </button>
                        </div>

                        {/* Info-Panel */}
                        <div
                            className="absolute left-0 right-0 bottom-0"
                            style={{ padding: '0 6vw 2rem' }}
                        >
                            <div
                                style={{
                                    borderLeft: '2px solid var(--spark)',
                                    paddingLeft: '1.25rem',
                                    maxWidth: '44ch',
                                }}
                            >
                                {sel ? (
                                    <>
                                        <p className="mono-label text-spark mb-2">
                                            {sel.name.toLowerCase()} ·{' '}
                                            {sel.topic}
                                        </p>
                                        <p
                                            className="text-soft leading-relaxed"
                                            style={{
                                                fontSize:
                                                    'clamp(0.95rem, 1.4vw, 1.15rem)',
                                            }}
                                        >
                                            {sel.detail}
                                        </p>
                                    </>
                                ) : (
                                    <p
                                        className="text-soft leading-relaxed"
                                        style={{
                                            fontSize:
                                                'clamp(0.95rem, 1.4vw, 1.15rem)',
                                        }}
                                    >
                                        {touchRef.current ? 'Tippe' : 'Klick'}{' '}
                                        einen Planeten an — jeder erzählt etwas
                                        über Sunbyte.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>,
                    document.body,
                )}
        </>
    )
}
