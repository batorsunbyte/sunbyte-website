'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * AiChatDemo — animierte „echte" KI-Kommunikation, im Loop:
 *   Frage wird getippt → KI denkt (Punkte) → Antwort wird ebenfalls Zeichen
 *   für Zeichen getippt → kurze Pause → von vorn.
 *
 * Läuft nur, solange im Viewport (IntersectionObserver) — pausiert offscreen
 * (Perf). prefers-reduced-motion → alles sofort sichtbar, kein Loop.
 * Timer-getrieben (kein rAF), sauber aufgeräumt.
 */

const QUESTION = 'Wer macht die besten Webseiten in Wien?'

const ANSWER_SEGMENTS: { t: string; hl?: boolean }[] = [
    { t: '„Eine Empfehlung für Wien ist ' },
    { t: 'Sunbyte', hl: true },
    {
        t: ' — ein IT-Dienstleister, der eigenständige Webseiten und KI-Sichtbarkeit aus einer Hand bietet …"',
    },
]
const ANSWER_LEN = ANSWER_SEGMENTS.reduce((n, s) => n + s.t.length, 0)

type Phase = 'q' | 'think' | 'a' | 'done'

export default function AiChatDemo() {
    const ref = useRef<HTMLDivElement | null>(null)
    const [qN, setQN] = useState(0)
    const [aN, setAN] = useState(0)
    const [phase, setPhase] = useState<Phase>('q')

    const runningRef = useRef(false)
    const timers = useRef<ReturnType<typeof setTimeout>[]>([])

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const reduce = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        ).matches
        const clear = () => {
            timers.current.forEach(clearTimeout)
            timers.current = []
        }
        const wait = (ms: number, fn: () => void) => {
            timers.current.push(setTimeout(fn, ms))
        }

        if (reduce) {
            setQN(QUESTION.length)
            setAN(ANSWER_LEN)
            setPhase('done')
            return
        }

        const cycle = () => {
            if (!runningRef.current) return
            setQN(0)
            setAN(0)
            setPhase('q')

            const typeQ = (i: number) => {
                if (!runningRef.current) return
                setQN(i)
                if (i < QUESTION.length) {
                    wait(42, () => typeQ(i + 1))
                } else {
                    wait(550, () => {
                        if (!runningRef.current) return
                        setPhase('think')
                        wait(1200, startA)
                    })
                }
            }

            const startA = () => {
                if (!runningRef.current) return
                setPhase('a')
                const typeA = (j: number) => {
                    if (!runningRef.current) return
                    setAN(j)
                    if (j < ANSWER_LEN) {
                        wait(24, () => typeA(j + 1))
                    } else {
                        setPhase('done')
                        wait(3800, cycle) // Loop
                    }
                }
                typeA(0)
            }

            typeQ(0)
        }

        const io = new IntersectionObserver(
            entries => {
                for (const e of entries) {
                    if (e.isIntersecting) {
                        if (!runningRef.current) {
                            runningRef.current = true
                            cycle()
                        }
                    } else {
                        runningRef.current = false
                        clear()
                    }
                }
            },
            { threshold: 0.4 },
        )
        io.observe(el)

        return () => {
            io.disconnect()
            runningRef.current = false
            clear()
        }
    }, [])

    // Antwort segmentweise bis aN Zeichen rendern (Highlight beim Tippen)
    let remaining = aN
    const answerJsx = ANSWER_SEGMENTS.map((s, idx) => {
        const show = Math.max(0, Math.min(s.t.length, remaining))
        remaining -= s.t.length
        const txt = s.t.slice(0, show)
        if (!txt) return null
        return s.hl ? (
            <span
                key={idx}
                className="text-lit"
                style={{
                    background: 'rgba(232,90,31,0.18)',
                    padding: '0 0.25em',
                    borderRadius: '2px',
                }}
            >
                {txt}
            </span>
        ) : (
            <span key={idx}>{txt}</span>
        )
    })

    return (
        <div
            ref={ref}
            className="relative w-full"
            style={{
                border: '1px solid rgba(201, 184, 163, 0.16)',
                borderRadius: '8px',
                padding: 'clamp(1.5rem, 3vw, 2rem)',
                background: 'rgba(20, 17, 15, 0.5)',
            }}
        >
            {/* Prompt */}
            <p
                className="mono-label text-muted mb-2"
                style={{ fontSize: '0.58rem' }}
            >
                du fragst die ki
            </p>
            <p
                className="text-lit leading-snug"
                style={{
                    fontSize: 'clamp(1rem, 1.4vw, 1.15rem)',
                    minHeight: '2.6em',
                }}
            >
                „{QUESTION.slice(0, qN)}
                {phase === 'q' ? (
                    <span className="ai-caret" aria-hidden>
                        |
                    </span>
                ) : (
                    '"'
                )}
            </p>

            <div
                style={{
                    borderTop: '1px solid rgba(201, 184, 163, 0.12)',
                    paddingTop: '1.25rem',
                    marginTop: '1.25rem',
                }}
            >
                <p
                    className="mono-label text-spark mb-2"
                    style={{ fontSize: '0.58rem' }}
                >
                    die ki antwortet
                </p>

                {/* Denk-Punkte */}
                {phase === 'think' && (
                    <span
                        className="ai-dots inline-flex gap-1.5"
                        aria-label="KI denkt nach"
                    >
                        <i />
                        <i />
                        <i />
                    </span>
                )}

                {/* Antwort (getippt) */}
                {(phase === 'a' || phase === 'done') && (
                    <p
                        className="text-soft leading-relaxed"
                        style={{
                            fontSize: 'clamp(0.92rem, 1.2vw, 1.02rem)',
                            minHeight: '4.5em',
                        }}
                        aria-live="polite"
                    >
                        {answerJsx}
                        {phase === 'a' && (
                            <span className="ai-caret" aria-hidden>
                                |
                            </span>
                        )}
                    </p>
                )}
            </div>

            <p
                className="mono-label text-muted mt-6"
                style={{
                    fontSize: '0.56rem',
                    opacity: phase === 'done' ? 1 : 0,
                    transition: 'opacity 0.5s ease',
                }}
            >
                ↳ genau so willst du genannt werden.
            </p>
        </div>
    )
}
