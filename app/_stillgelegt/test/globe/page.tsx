'use client'

import { useState } from 'react'
import Globe from '@/components/Globe'
import {
    CONTINENT_DATA,
    DEFAULT_INFO,
    type ContinentKey,
} from '@/lib/globe-data'

/**
 * Isolated test harness for the Globe component.
 * Renders all four prop combinations to verify behavior on real devices.
 * Nicht in der Hauptnavigation verlinkt — Toggle via URL /test/globe.
 */
export default function GlobeTestPage() {
    const [active, setActive] = useState<ContinentKey | null>(null)
    const info = active ? CONTINENT_DATA[active] : DEFAULT_INFO

    return (
        <main className="min-h-screen container-edge py-16 md:py-24">
            <header className="mb-16">
                <p className="mono-label text-spark mb-3">test · /test/globe</p>
                <h1 className="font-display text-4xl md:text-6xl mb-4">
                    Globe — Prop Matrix
                </h1>
                <p className="text-soft max-w-2xl">
                    Vier Konfigurationen der wiederverwendbaren Globe-Komponente.
                    Test auf echtem Handy + mit prefers-reduced-motion aktiv.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
                {/* 1. Voll interaktiv (Hero-Stufe / Premium-Premium) */}
                <section>
                    <p className="mono-label text-spark mb-2">01 — full</p>
                    <h2 className="font-display text-2xl mb-2">
                        autoRotate · interactive · insights · marker
                    </h2>
                    <p className="text-soft text-sm mb-6">
                        Hero + Premium-Premium-Stufe.
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                        <div
                            className="border-l-2 border-spark pl-4 min-h-[7rem]"
                            style={{ transition: 'opacity .28s ease' }}
                        >
                            <div className="mono-label text-spark mb-2">
                                {info.n}
                            </div>
                            <div className="text-soft text-sm leading-relaxed max-w-md">
                                {info.t}
                            </div>
                        </div>

                        <Globe
                            autoRotate
                            interactive
                            showInsights
                            showMarker
                            onContinentChange={setActive}
                            className="w-full max-w-[360px] mx-auto"
                        />
                    </div>
                </section>

                {/* 2. Statisch (Premium-Stufe) */}
                <section>
                    <p className="mono-label text-spark mb-2">02 — static</p>
                    <h2 className="font-display text-2xl mb-2">
                        alle Props false
                    </h2>
                    <p className="text-soft text-sm mb-6">
                        Premium-Stufe (kfz22-Karte) — kein Loop, kein Marker.
                    </p>

                    <Globe className="w-full max-w-[280px]" />
                </section>

                {/* 3. Nur auto-rotate */}
                <section>
                    <p className="mono-label text-spark mb-2">03 — auto only</p>
                    <h2 className="font-display text-2xl mb-2">
                        autoRotate ohne Interaktion
                    </h2>
                    <p className="text-soft text-sm mb-6">
                        Deko-Variante (rein optisch).
                    </p>

                    <Globe
                        autoRotate
                        showMarker
                        className="w-full max-w-[280px]"
                    />
                </section>

                {/* 4. Interaktiv ohne Insights */}
                <section>
                    <p className="mono-label text-spark mb-2">04 — drag only</p>
                    <h2 className="font-display text-2xl mb-2">
                        interactive, ohne Insights
                    </h2>
                    <p className="text-soft text-sm mb-6">
                        Ziehen erlaubt, kein Highlight-Picking.
                    </p>

                    <Globe
                        autoRotate
                        interactive
                        showMarker
                        className="w-full max-w-[280px]"
                    />
                </section>
            </div>

            <footer className="mt-24 mono-label text-muted">
                ↳ check: cleanup beim tab-wechsel, prefers-reduced-motion, mobile
            </footer>
        </main>
    )
}
