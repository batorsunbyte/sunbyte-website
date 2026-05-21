export default function Hero() {
    return (
        <section className="relative min-h-screen flex flex-col justify-between container-edge pt-32 pb-10 md:pb-16 overflow-hidden">
            {/* Mikro-Label oben links */}
            <div className="reveal">
                <p className="font-mono-label text-mute">
                    01 — Sunbyte · Wien · MMXXVI
                </p>
            </div>

            {/* Headline — Display-Serif, riesig, linksbündig, Italic-Akzent */}
            <h1 className="reveal reveal-delay-1 font-display text-[clamp(3.5rem,13vw,12rem)] max-w-[18ch] mt-12 md:mt-0">
                <span className="block">Wir bauen</span>
                <span className="block">Websites, die</span>
                <span className="block">
                    <span className="font-display-italic text-sun">Kunden</span> bringen.
                </span>
            </h1>

            {/* Unten: zweispaltiges Editorial-Layout */}
            <div className="reveal reveal-delay-3 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 mt-16 md:mt-24 items-end">
                <p className="md:col-span-5 md:col-start-1 text-base md:text-lg text-ink-soft max-w-md leading-snug">
                    Inhabergeführte Web-Agentur aus Wien. Keine Sales-Layer, kein Templates-Verkauf —
                    wir bauen jede Seite so, als wäre sie unsere eigene.
                </p>

                <div className="md:col-span-4 md:col-start-9 flex md:justify-end">
                    <a
                        href="#kontakt"
                        className="group inline-flex items-center gap-3 text-ink hover:text-sun transition-colors"
                    >
                        <span className="font-mono-label">Jetzt sprechen</span>
                        <span
                            aria-hidden
                            className="inline-block transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-1"
                        >
                            ↘
                        </span>
                    </a>
                </div>
            </div>

            {/* Hairline am unteren Rand */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-ink/10" />
        </section>
    )
}
