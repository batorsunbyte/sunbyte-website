import Reveal from '@/components/Reveal'

/**
 * About-Hero (/ueber-uns) — editorial: Porträt links, Story rechts.
 * Stil adaptiert von der PrintMyWall-About-Sektion, übersetzt in Sunbytes
 * dunkle Bildsprache. Tonalität: professionell + 1 persönliche Note
 * (kein tiefes Privates — Zakirs Entscheidung).
 */
export default function AboutHero() {
    return (
        <section className="container-edge section-pad-top pb-4 md:pb-8">
            <Reveal as="p" className="mono-label text-spark mb-5">
                hinter sunbyte
            </Reveal>
            <Reveal
                as="h1"
                delay={60}
                className="font-display mb-14 md:mb-20"
                style={{
                    fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
                    color: 'var(--lit)',
                    maxWidth: '16ch',
                }}
            >
                Die Menschen{' '}
                <span style={{ color: 'var(--spark)' }}>hinter dem Code.</span>
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                {/* Porträt */}
                <Reveal className="lg:col-span-5">
                    <figure
                        className="relative"
                        style={{ aspectRatio: '2 / 3', margin: 0 }}
                    >
                        <div
                            aria-hidden
                            className="absolute pointer-events-none"
                            style={{
                                inset: '-8%',
                                background:
                                    'radial-gradient(circle at 60% 30%, rgba(232,90,31,0.18) 0%, transparent 60%)',
                                zIndex: 0,
                            }}
                        />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/images/zakir-portrait.jpg"
                            alt="Zakir Daryabi · Gründer Sunbyte · Wien"
                            width={1067}
                            height={1600}
                            loading="lazy"
                            decoding="async"
                            className="relative w-full h-full"
                            style={{
                                objectFit: 'cover',
                                objectPosition: 'center',
                                borderRadius: '6px',
                                border: '1px solid rgba(201, 184, 163, 0.16)',
                                zIndex: 1,
                            }}
                        />
                    </figure>
                </Reveal>

                {/* Story */}
                <div className="lg:col-span-7 lg:pl-4">
                    {/* Statement / Pullquote */}
                    <Reveal
                        className="mb-10"
                        style={{
                            borderLeft: '2px solid var(--spark)',
                            paddingLeft: '1.5rem',
                        }}
                    >
                        <p
                            className="font-display"
                            style={{
                                fontSize: 'clamp(1.5rem, 2.8vw, 2.25rem)',
                                color: 'var(--lit)',
                                lineHeight: 1.15,
                            }}
                        >
                            Sunbyte ist neu — die Erfahrung dahinter nicht.
                        </p>
                    </Reveal>

                    {/* Bio */}
                    <div className="space-y-6 text-soft leading-relaxed">
                        <Reveal as="p" delay={60} style={paraStyle}>
                            <span style={dropcapStyle} aria-hidden>
                                I
                            </span>
                            ch bin Zakir Daryabi, Gründer von Sunbyte. Seit über{' '}
                            <span className="text-lit">
                                sechs Jahren arbeite ich mit IT und KI
                            </span>
                            , 2023 habe ich meine Lehre als Software-Entwickler
                            abgeschlossen — und seitdem nie aufgehört, eigene
                            Produkte zu bauen. Ich bin Entwickler und Designer in
                            einem: Mir ist nicht nur wichtig, wie etwas aussieht,
                            sondern wie es funktioniert.
                        </Reveal>

                        <Reveal as="p" delay={90} style={paraStyle}>
                            Ich komme vom Machen, nicht vom Reden. Was ich
                            verspreche, baue ich selbst — und gebe es erst aus der
                            Hand, wenn es mich selbst überzeugt.
                        </Reveal>

                        <Reveal as="p" delay={120} style={paraStyle}>
                            An meiner Seite steht{' '}
                            <span className="text-lit">mein Bruder</span> —
                            Senior-Entwickler mit über{' '}
                            <span className="text-lit">
                                15 Jahren IT-Erfahrung
                            </span>
                            , spezialisiert auf Künstliche Intelligenz. Zusammen
                            bringen wir mehr als 20 Jahre Erfahrung in IT, KI und
                            Design an einen Tisch.
                        </Reveal>

                        <Reveal as="p" delay={150} style={paraStyle}>
                            Was uns anders macht: keine Schicht zwischen dir und
                            denen, die deine Lösung bauen. Du sprichst nicht mit
                            einem Account-Manager, der Rücksprache halten muss —
                            du sprichst mit den Entwicklern selbst.
                        </Reveal>

                        <Reveal
                            delay={180}
                            className="font-display"
                            style={{
                                fontStyle: 'italic',
                                fontWeight: 400,
                                fontSize: 'clamp(1.25rem, 2vw, 1.6rem)',
                                color: 'var(--spark)',
                                marginTop: '1.5rem',
                                paddingLeft: '1.5rem',
                                position: 'relative',
                            }}
                        >
                            — Zakir Daryabi · Wien
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    )
}

const paraStyle: React.CSSProperties = {
    fontSize: 'clamp(0.98rem, 1.25vw, 1.12rem)',
}

const dropcapStyle: React.CSSProperties = {
    fontFamily: 'Fraunces, Georgia, serif',
    fontStyle: 'italic',
    fontWeight: 900,
    fontSize: 'clamp(3.5rem, 6vw, 5rem)',
    lineHeight: 0.8,
    color: 'var(--spark)',
    float: 'left',
    margin: '0.08em 0.12em 0 0',
}
