export default function Manifest() {
    return (
        <section className="container-edge py-32 md:py-48">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
                {/* Linke Spalte: Kapitelmarker */}
                <div className="md:col-span-3">
                    <p className="font-mono-label text-mute sticky top-8">
                        02 — Position
                    </p>
                </div>

                {/* Rechte Spalte: Manifest-Satz, groß, mit Italic-Akzenten */}
                <div className="md:col-span-9">
                    <p className="font-display text-[clamp(2.25rem,5.5vw,5rem)] leading-[1.02] max-w-[20ch]">
                        Inhabergeführt.{' '}
                        <span className="font-display-italic text-sun">Kein Account-Manager</span>{' '}
                        dazwischen — du sprichst mit dem, der die Seite baut.
                    </p>

                    {/* Drei Mikro-Beweise */}
                    <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 max-w-3xl">
                        <div>
                            <p className="font-mono-label text-sun mb-3">01</p>
                            <p className="text-ink-soft leading-snug">
                                Ein Ansprechpartner vom ersten Call bis zum Launch.
                            </p>
                        </div>
                        <div>
                            <p className="font-mono-label text-sun mb-3">02</p>
                            <p className="text-ink-soft leading-snug">
                                Code, der dir gehört. Kein Lock-in, keine Mietfalle.
                            </p>
                        </div>
                        <div>
                            <p className="font-mono-label text-sun mb-3">03</p>
                            <p className="text-ink-soft leading-snug">
                                Performance ist kein Add-on. 90+ Lighthouse ist die Untergrenze.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
