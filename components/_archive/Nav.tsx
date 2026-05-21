export default function Nav() {
    return (
        <header className="absolute top-0 left-0 right-0 z-20 container-edge pt-6 md:pt-8">
            <div className="flex items-center justify-between">
                <a href="/" className="font-mono-label hover:text-sun transition-colors">
                    Sunbyte
                </a>

                <nav className="hidden md:flex items-center gap-10">
                    <a href="#arbeiten" className="font-mono-label hover:text-sun transition-colors">
                        Arbeiten
                    </a>
                    <a href="#story" className="font-mono-label hover:text-sun transition-colors">
                        Story
                    </a>
                    <a href="#kontakt" className="font-mono-label hover:text-sun transition-colors">
                        Kontakt
                    </a>
                </nav>

                <a
                    href="#kontakt"
                    className="font-mono-label hidden md:inline-flex items-center gap-2 text-sun hover:text-ember transition-colors"
                >
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-sun animate-pulse" />
                    Wir nehmen Projekte für H2 2026 an
                </a>
            </div>
        </header>
    )
}
