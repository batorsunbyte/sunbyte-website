'use client'

import { useEffect } from 'react'

/**
 * IdlePrefetch — lädt nach dem (vollständigen) Laden der ersten Seite im
 * Leerlauf unsichtbar die anderen Seiten vor, damit jede Navigation sofort
 * ist. Kostet den Erstaufbau NICHTS (wartet auf window.load + Idle).
 *
 *   1. Speculation Rules (Chrome/Edge): prefetch der Hauptrouten —
 *      Safari/Firefox ignorieren das Script einfach.
 *   2. <link rel="prefetch"> für die Referenz-Screenshots (Poster der
 *      Live-Fenster) — /arbeiten fühlt sich sofort "fertig" an.
 *   2b. Die Route-Payloads für Client-Navigation prefetcht Next über die
 *      <Link>s im Header bereits selbst.
 */

// Nur die zwei Routen, die von der Startseite aus real am haeufigsten
// angesteuert werden. Frueher standen hier alle 5 — das war Datenvolumen
// fuer Seiten, die die meisten Besucher nie oeffnen.
const ROUTES = ['/webseiten/', '/arbeiten/']

// Nur die Bilder, die auf /arbeiten zuerst sichtbar werden.
// safetypro lag frueher mit drin, kommt aber auf der Startseite gar nicht vor.
const CASE_IMAGES = [
    '/images/cases/printmywall.webp',
    '/images/cases/impulsiv.webp',
]

export default function IdlePrefetch() {
    useEffect(() => {
        let done = false
        const run = () => {
            if (done) return
            done = true

            // Auf langsamer Verbindung oder im Datensparmodus NICHT vorladen —
            // dort konkurriert der Vorlauf mit dem, was der Nutzer gerade sieht.
            const conn = (
                navigator as Navigator & {
                    connection?: { saveData?: boolean; effectiveType?: string }
                }
            ).connection
            if (
                conn &&
                (conn.saveData === true ||
                    conn.effectiveType === 'slow-2g' ||
                    conn.effectiveType === '2g' ||
                    conn.effectiveType === '3g')
            ) {
                return
            }

            // 1) Speculation Rules (progressive enhancement)
            try {
                if (
                    HTMLScriptElement.supports &&
                    HTMLScriptElement.supports('speculationrules')
                ) {
                    const s = document.createElement('script')
                    s.type = 'speculationrules'
                    s.textContent = JSON.stringify({
                        prefetch: [{ urls: ROUTES }],
                    })
                    document.head.appendChild(s)
                }
            } catch {
                /* still fine without */
            }

            // 2) Bilder der Referenz-Fenster vorwärmen
            for (const href of CASE_IMAGES) {
                const l = document.createElement('link')
                l.rel = 'prefetch'
                l.as = 'image'
                l.href = href
                document.head.appendChild(l)
            }

        }

        const idle = () => {
            if ('requestIdleCallback' in window) {
                ;(
                    window as Window & {
                        requestIdleCallback: (
                            cb: () => void,
                            opts?: { timeout: number },
                        ) => number
                    }
                ).requestIdleCallback(run, { timeout: 4000 })
            } else {
                setTimeout(run, 2500)
            }
        }

        if (document.readyState === 'complete') idle()
        else window.addEventListener('load', idle, { once: true })

        return () => window.removeEventListener('load', idle)
    }, [])

    return null
}
