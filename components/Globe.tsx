'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
    geoOrthographic,
    geoPath,
    geoGraticule10,
    geoContains,
    geoDistance,
    geoCentroid,
} from 'd3-geo'
import { feature, mesh } from 'topojson-client'
import type { Topology, GeometryCollection } from 'topojson-specification'
import type { Feature, MultiLineString } from 'geojson'
import {
    continentOf,
    VIENNA,
    type ContinentKey,
} from '@/lib/globe-data'

export interface GlobeProps {
    /** Globe dreht von selbst (1 rAF-Loop, deaktiv bei prefers-reduced-motion) */
    autoRotate?: boolean
    /** Drag-to-rotate + Hover/Tap-Picking */
    interactive?: boolean
    /** Kontinent-Highlight + onContinentChange-Callback aktiv */
    showInsights?: boolean
    /** Pulsierender Wien-Marker (overlay-DOM) */
    showMarker?: boolean
    /** Callback bei Kontinent-Wechsel (für externes Info-Panel im Hero) */
    onContinentChange?: (key: ContinentKey | null) => void
    /** ARIA-Label für Screen-Reader */
    ariaLabel?: string
    className?: string
}

type FeatureWithContinent = Feature & { __c?: ContinentKey }

let cachedWorld: {
    countries: FeatureWithContinent[]
    borders: MultiLineString
    austria: FeatureWithContinent | null
} | null = null

async function loadWorld() {
    if (cachedWorld) return cachedWorld
    const mod = await import('world-atlas/countries-110m.json')
    const topology = (mod.default ?? mod) as unknown as Topology
    const fc = feature(
        topology,
        topology.objects.countries as GeometryCollection,
    )
    const countries = (fc as { features: FeatureWithContinent[] }).features
    let austria: FeatureWithContinent | null = null
    countries.forEach(f => {
        const c = geoCentroid(f)
        f.__c = continentOf(c[0], c[1])
        if ((f.properties as { name?: string } | null)?.name === 'Austria') {
            f.__c = 'at'
            austria = f
        }
    })
    const borders = mesh(
        topology,
        topology.objects.countries as GeometryCollection,
        (a, b) => a !== b,
    ) as MultiLineString
    cachedWorld = { countries, borders, austria }
    return cachedWorld
}

export default function Globe({
    autoRotate = false,
    interactive = false,
    showInsights = false,
    showMarker = false,
    onContinentChange,
    ariaLabel = 'Interaktiver Globus',
    className = '',
}: GlobeProps) {
    const wrapRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const markerRef = useRef<HTMLDivElement>(null)

    const stateRef = useRef({
        rot: [-10, -12, 0] as [number, number, number],
        hovered: null as ContinentKey | null,
        selected: null as ContinentKey | null,
        autoRot: autoRotate,
        dirty: true,
        running: false,
        rafId: 0,
        width: 0,
        dpr: 1,
        loaded: false,
        dragging: false,
    })

    const [ready, setReady] = useState(false)

    const reducedMotion = useMemo(() => {
        if (typeof window === 'undefined') return false
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches
    }, [])

    const isTouch = useMemo(() => {
        if (typeof window === 'undefined') return false
        return !window.matchMedia('(hover: hover) and (pointer: fine)').matches
    }, [])

    // Projection bleibt stabil über Renders hinweg
    const projection = useMemo(
        () => geoOrthographic().precision(0.5),
        [],
    )

    // Notify parent über aktuelle Auswahl (Hover bevorzugt, sonst selected)
    const notify = useCallback(
        (key: ContinentKey | null) => {
            if (!showInsights) return
            onContinentChange?.(key)
        },
        [showInsights, onContinentChange],
    )

    const sphereFill = useCallback(
        (ctx: CanvasRenderingContext2D) => {
            const t = projection.translate()
            const s = projection.scale()
            const g = ctx.createRadialGradient(
                t[0] - s * 0.32,
                t[1] - s * 0.36,
                s * 0.08,
                t[0],
                t[1],
                s * 1.08,
            )
            g.addColorStop(0, '#ffe2c2')
            g.addColorStop(0.18, '#f9923f')
            g.addColorStop(0.5, '#E85A1F')
            g.addColorStop(0.85, '#c8430f')
            g.addColorStop(1, '#9c330d')
            return g
        },
        [projection],
    )

    const render = useCallback(() => {
        const canvas = canvasRef.current
        const w = stateRef.current.width
        if (!canvas || !w) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        projection.rotate(stateRef.current.rot)
        const path = geoPath(projection, ctx)

        ctx.clearRect(0, 0, w, w)

        // Sphere fill (glühende Kugel)
        ctx.beginPath()
        path({ type: 'Sphere' })
        ctx.fillStyle = sphereFill(ctx)
        ctx.fill()

        // Graticule
        ctx.beginPath()
        path(geoGraticule10())
        ctx.strokeStyle = 'rgba(255,206,166,0.16)'
        ctx.lineWidth = 0.6
        ctx.stroke()

        const world = cachedWorld
        if (!world) return

        const isHi = (f: FeatureWithContinent) => {
            if (!showInsights) return false
            const c = f.__c
            if (!c) return false
            return (
                c === stateRef.current.hovered ||
                c === stateRef.current.selected
            )
        }

        // 1) Default-Land
        ctx.beginPath()
        world.countries.forEach(f => {
            if (!isHi(f) && f.__c !== 'at') path(f)
        })
        ctx.fillStyle = '#6e2409'
        ctx.fill()

        // 2) Austria immer in Spark (außer aktiv hervorgehoben)
        if (world.austria && !isHi(world.austria)) {
            ctx.beginPath()
            path(world.austria)
            ctx.fillStyle = '#E85A1F'
            ctx.fill()
        }

        // 3) Highlighted Country
        if (showInsights) {
            ctx.beginPath()
            world.countries.forEach(f => {
                if (isHi(f)) path(f)
            })
            ctx.fillStyle = '#FFF3E4'
            ctx.fill()
        }

        // 4) Borders
        ctx.beginPath()
        path(world.borders)
        ctx.strokeStyle = 'rgba(35,12,4,0.5)'
        ctx.lineWidth = 0.4
        ctx.stroke()
    }, [projection, sphereFill, showInsights])

    const atVisible = useCallback(() => {
        const r = stateRef.current.rot
        return geoDistance(VIENNA, [-r[0], -r[1]]) < Math.PI / 2
    }, [])

    const updateMarker = useCallback(() => {
        const marker = markerRef.current
        if (!marker || !showMarker) return
        if (atVisible()) {
            const p = projection(VIENNA)
            if (!p) return
            marker.style.transform = `translate(${p[0]}px, ${p[1]}px)`
            marker.style.display = ''
        } else {
            marker.style.display = 'none'
        }
    }, [projection, showMarker, atVisible])

    const sizeCanvas = useCallback(() => {
        const wrap = wrapRef.current
        const canvas = canvasRef.current
        if (!wrap || !canvas) return
        const r = wrap.getBoundingClientRect()
        const w = r.width
        if (w === 0) return
        const dpr = Math.min(window.devicePixelRatio || 1, 2)
        stateRef.current.width = w
        stateRef.current.dpr = dpr
        canvas.width = w * dpr
        canvas.height = w * dpr
        canvas.style.height = `${w}px`
        const ctx = canvas.getContext('2d')
        if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        projection.fitExtent(
            [
                [10, 10],
                [w - 10, w - 10],
            ],
            { type: 'Sphere' },
        )
        stateRef.current.dirty = true
    }, [projection])

    // rAF-Loop — startet/stoppt extern via running-flag
    const frame = useCallback(() => {
        const s = stateRef.current
        if (!s.running) return
        if (s.autoRot && autoRotate && !reducedMotion) {
            s.rot[0] += 0.12
            s.dirty = true
        }
        if (s.dirty) {
            render()
            s.dirty = false
        }
        updateMarker()

        // Static-Mode: Wenn weder autoRotate noch interactive aktiv ist,
        // brauchen wir keinen Loop — der erste Render reicht (Premium-Stufe).
        // Marker und Highlight können sich eh nicht ändern.
        const isStatic = !autoRotate && !interactive
        if (isStatic) {
            s.running = false
            return
        }

        // Schlafen legen, wenn nichts zu animieren ist (prefers-reduced-motion
        // oder Auto-Rotation pausiert) — kein Dauer-Loop ohne Bildänderung.
        // Pointer-Handler wecken den Loop bei Interaktion via startLoop() wieder.
        if (!s.autoRot && !s.dragging) {
            s.running = false
            return
        }

        s.rafId = requestAnimationFrame(frame)
    }, [autoRotate, interactive, reducedMotion, render, updateMarker])

    const startLoop = useCallback(() => {
        if (stateRef.current.running) return
        stateRef.current.running = true
        stateRef.current.rafId = requestAnimationFrame(frame)
    }, [frame])

    const stopLoop = useCallback(() => {
        const s = stateRef.current
        s.running = false
        if (s.rafId) cancelAnimationFrame(s.rafId)
        s.rafId = 0
    }, [])

    // Pick: Continent unter Cursor (oder Wien-Marker)
    const pick = useCallback(
        (clientX: number, clientY: number): ContinentKey | null | undefined => {
            const canvas = canvasRef.current
            if (!canvas) return undefined
            const r = canvas.getBoundingClientRect()
            const x = clientX - r.left
            const y = clientY - r.top
            const t = projection.translate()
            const s = projection.scale()
            if (Math.hypot(x - t[0], y - t[1]) > s) return undefined
            if (atVisible()) {
                const ap = projection(VIENNA)
                if (ap && Math.hypot(x - ap[0], y - ap[1]) < 15) return 'at'
            }
            const p = projection.invert?.([x, y])
            if (!p) return undefined
            const world = cachedWorld
            if (!world) return undefined
            for (const f of world.countries) {
                if (geoContains(f, p as [number, number])) {
                    return f.__c ?? null
                }
            }
            return null
        },
        [projection, atVisible],
    )

    // === LIFECYCLE ===

    // 1) Welt-Daten + initiale Größe + Resize-Listener
    useEffect(() => {
        let mounted = true
        loadWorld()
            .then(() => {
                if (!mounted) return
                stateRef.current.loaded = true
                sizeCanvas()
                stateRef.current.dirty = true
                setReady(true)
            })
            .catch(err => {
                console.error('[Globe] world load failed', err)
            })

        const onResize = () => {
            sizeCanvas()
            // Static-Mode: einen einzelnen Re-Render erzwingen (kein dauerhafter Loop).
            if (!autoRotate && !interactive && stateRef.current.loaded) {
                startLoop()
            }
        }
        window.addEventListener('resize', onResize)
        return () => {
            mounted = false
            window.removeEventListener('resize', onResize)
        }
    }, [sizeCanvas, autoRotate, interactive, startLoop])

    // 2) IntersectionObserver: Loop nur wenn im Viewport
    useEffect(() => {
        const wrap = wrapRef.current
        if (!wrap || !ready) return
        const io = new IntersectionObserver(
            entries => {
                for (const e of entries) {
                    if (e.isIntersecting) startLoop()
                    else stopLoop()
                }
            },
            { rootMargin: '0px', threshold: 0.05 },
        )
        io.observe(wrap)

        const onVis = () => {
            if (document.hidden) stopLoop()
            else if (
                wrap.getBoundingClientRect().bottom > 0 &&
                wrap.getBoundingClientRect().top < window.innerHeight
            ) {
                startLoop()
            }
        }
        document.addEventListener('visibilitychange', onVis)

        return () => {
            io.disconnect()
            document.removeEventListener('visibilitychange', onVis)
            stopLoop()
        }
    }, [ready, startLoop, stopLoop])

    // 3) Sync autoRotate-Prop -> stateRef
    useEffect(() => {
        stateRef.current.autoRot = autoRotate && !reducedMotion
        stateRef.current.dirty = true
    }, [autoRotate, reducedMotion])

    // 4) Interactive: Pointer-Handler
    useEffect(() => {
        if (!interactive) return
        const canvas = canvasRef.current
        if (!canvas) return

        let down = false
        let lx = 0
        let ly = 0
        let moved = 0
        let resumeT: number | null = null

        const onDown = (e: PointerEvent) => {
            down = true
            moved = 0
            lx = e.clientX
            ly = e.clientY
            stateRef.current.autoRot = false
            stateRef.current.dragging = true
            if (resumeT) {
                clearTimeout(resumeT)
                resumeT = null
            }
            canvas.classList.add('cursor-grabbing')
            canvas.setPointerCapture(e.pointerId)
            startLoop()
        }

        const onMove = (e: PointerEvent) => {
            if (down) {
                const dx = e.clientX - lx
                const dy = e.clientY - ly
                lx = e.clientX
                ly = e.clientY
                moved += Math.abs(dx) + Math.abs(dy)
                stateRef.current.rot[0] += dx * 0.32
                stateRef.current.rot[1] = Math.max(
                    -90,
                    Math.min(90, stateRef.current.rot[1] - dy * 0.32),
                )
                stateRef.current.dirty = true
            } else if (!isTouch && showInsights && cachedWorld) {
                const c = pick(e.clientX, e.clientY)
                if (c !== stateRef.current.hovered) {
                    stateRef.current.hovered = c ?? null
                    stateRef.current.dirty = true
                    notify(
                        stateRef.current.hovered ??
                            stateRef.current.selected ??
                            null,
                    )
                    startLoop()
                }
            }
        }

        const onRelease = (e: PointerEvent) => {
            if (!down) return
            down = false
            stateRef.current.dragging = false
            canvas.classList.remove('cursor-grabbing')
            if (moved < 6 && showInsights && cachedWorld) {
                const c = pick(e.clientX, e.clientY)
                if (c) {
                    stateRef.current.selected = c
                    stateRef.current.hovered = c
                    stateRef.current.dirty = true
                    notify(c)
                }
            }
            if (!reducedMotion && autoRotate) {
                resumeT = window.setTimeout(() => {
                    stateRef.current.autoRot = true
                    startLoop()
                }, 2600)
            }
            // Endzustand (Auswahl / Drag-Ende) rendern
            startLoop()
        }

        const onLeave = () => {
            if (!down && showInsights) {
                stateRef.current.hovered = null
                stateRef.current.dirty = true
                notify(stateRef.current.selected ?? null)
                startLoop()
            }
        }

        canvas.addEventListener('pointerdown', onDown)
        canvas.addEventListener('pointermove', onMove)
        canvas.addEventListener('pointerup', onRelease)
        canvas.addEventListener('pointercancel', onRelease)
        if (!isTouch) canvas.addEventListener('pointerleave', onLeave)

        return () => {
            canvas.removeEventListener('pointerdown', onDown)
            canvas.removeEventListener('pointermove', onMove)
            canvas.removeEventListener('pointerup', onRelease)
            canvas.removeEventListener('pointercancel', onRelease)
            if (!isTouch) canvas.removeEventListener('pointerleave', onLeave)
            if (resumeT) clearTimeout(resumeT)
        }
    }, [
        interactive,
        isTouch,
        showInsights,
        reducedMotion,
        autoRotate,
        pick,
        notify,
        startLoop,
    ])

    // Cursor + touch-action
    const cursorClass = interactive ? 'cursor-grab' : ''

    return (
        <div
            ref={wrapRef}
            className={`relative ${className}`}
            style={{ touchAction: interactive ? 'none' : 'auto' }}
        >
            {/* Halo */}
            <div
                aria-hidden
                className="absolute pointer-events-none rounded-full"
                style={{
                    inset: '-16%',
                    background:
                        'radial-gradient(circle, rgba(232,90,31,0.4) 0%, rgba(232,90,31,0.1) 55%, transparent 74%)',
                    zIndex: 0,
                }}
            />

            <canvas
                ref={canvasRef}
                aria-label={ariaLabel}
                role="img"
                className={`relative block w-full ${cursorClass}`}
                style={{ zIndex: 1 }}
            />

            {/* Wien-Marker */}
            {showMarker && (
                <div
                    ref={markerRef}
                    aria-hidden
                    className="absolute left-0 top-0 pointer-events-none"
                    style={{
                        zIndex: 2,
                        display: 'none',
                        willChange: 'transform',
                    }}
                >
                    <span
                        className="absolute at-pulse"
                        style={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            border: '1.5px solid var(--spark)',
                            transform: 'translate(-50%, -50%)',
                        }}
                    />
                    <span
                        className="absolute"
                        style={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            background: 'var(--lit)',
                            boxShadow: '0 0 9px 2px rgba(232,90,31,0.95)',
                            transform: 'translate(-50%, -50%)',
                        }}
                    />
                    <span
                        className="absolute mono-label"
                        style={{
                            left: 10,
                            top: -7,
                            color: 'var(--lit)',
                            whiteSpace: 'nowrap',
                            textShadow: '0 0 6px #000',
                            fontSize: '0.56rem',
                        }}
                    >
                        wien
                    </span>
                </div>
            )}
        </div>
    )
}
