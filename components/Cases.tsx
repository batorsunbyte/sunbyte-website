/**
 * Cases — echte Projekte mit Detail-Block je Case (§5 im Briefing).
 *
 * Layout: vertikale Editorial-Cards, jede mit großer Display-Headline links,
 * Visual-Placeholder rechts. Asymmetrisch (Case 1 spiegelverkehrt zu Case 2).
 *
 * Inhalte:
 *   - kfz22 — live (Premium-Stufe).
 *   - PrintMyWall — in Entwicklung (Standard/Premium-Stufe folgt).
 *   - „Mehr kommt" — Platzhalter-Slot.
 */
export default function Cases() {
    return (
        <section
            id="cases"
            className="relative w-full container-edge"
            style={{ paddingTop: '8rem', paddingBottom: '8rem' }}
        >
            {/* Sektion-Header */}
            <header className="mb-20 md:mb-28 max-w-3xl">
                <p className="mono-label text-spark mb-4">02 — arbeiten</p>
                <h2
                    className="font-display"
                    style={{
                        fontSize: 'clamp(2.25rem, 5.5vw, 4.5rem)',
                        color: 'var(--lit)',
                    }}
                >
                    Echte Projekte.
                    <br />
                    <span style={{ color: 'var(--spark)' }}>Live im Netz.</span>
                </h2>
                <p
                    className="text-soft mt-6 max-w-xl leading-relaxed"
                    style={{ fontSize: 'clamp(0.95rem, 1.3vw, 1.1rem)' }}
                >
                    Drei Projekte, drei Geschichten. Eine Sache haben sie
                    gemeinsam — der Kunde kennt mich persönlich.
                </p>
            </header>

            {/* Cases Liste */}
            <div className="space-y-24 md:space-y-32">
                <CaseBlock
                    index="01"
                    status="live · kfz22.com"
                    statusLink="https://kfz22.com"
                    name="kfz22"
                    headline="KFZ Technik 22 — Wien 1220"
                    role="Premium-Webauftritt für Wiener Meisterbetrieb"
                    summary="Eine §57a-Prüfstelle, deren Online-Auftritt vorher inexistent war. Wir haben einen Premium-Webauftritt entwickelt — multipage, lokal SEO-optimiert, Pickerl-Termin-Funnel, Galerie der Werkstatt."
                    deliverables={[
                        'Eigenständiges visuelles System & Typo',
                        'Multipage-Architektur (Galerie, Über, Kontakt, Datenschutz)',
                        'Lokale SEO für 1220 Wien — Donaustadt',
                        'Statischer Export via Next.js, GH-Pages-Deploy',
                        'i18n DE / EN, responsive Mobile-First',
                    ]}
                    visualHint="screenshot folgt — von zakir"
                    align="left"
                />

                <CaseBlock
                    index="02"
                    status="in entwicklung"
                    name="printmywall"
                    headline="PrintMyWall — Direktdruck auf Wände"
                    role="Eigene Marke — Standard- & Premium-Web parallel"
                    summary="Direktdruck-Service für Wände in Wien. Eigene Marke, eigene Pipeline. Aktuell im Re-Launch — neuer Stack (FastAPI + HTMX + Supabase + Railway), Astro-Website überarbeitet, Welle-Workflow von 11 Wellen."
                    deliverables={[
                        'Eigene Brand-Voice + Begriffs-Lexikon',
                        'Astro-Marketing-Site (printmywall.at)',
                        'Onboarding-Formular mit Whisper-Transkription',
                        'OneDrive-Speicherung + Make.com-Integration',
                        'Drop-In-Galerie, /ideen/-Sektion live',
                    ]}
                    visualHint="screenshot des neuen launches folgt"
                    align="right"
                />

                <CaseBlock
                    index="03"
                    status="bald"
                    name="mehr kommt"
                    headline="Dein Projekt — wäre das hier."
                    role="Premium-Slot für H2 2026"
                    summary="Wir nehmen 2026 noch zwei Premium-Projekte an. Wenn dein Vorhaben den Anspruch hat, neben kfz22 zu stehen — sprich mit Zakir."
                    deliverables={[
                        'Konzept-Workshop + Brand-Voice-Arbeit',
                        'Eigenständige Designsprache, kein Template',
                        'Performance-Audit als Default, nicht Add-on',
                        'Direktdraht zum Gründer vom ersten Call an',
                    ]}
                    visualHint="dieser slot wartet auf dich"
                    align="left"
                    placeholder
                />
            </div>
        </section>
    )
}

// ─── Sub-Component ──────────────────────────────────────────────

interface CaseBlockProps {
    index: string
    status: string
    statusLink?: string
    name: string
    headline: string
    role: string
    summary: string
    deliverables: string[]
    visualHint: string
    align: 'left' | 'right'
    placeholder?: boolean
}

function CaseBlock({
    index,
    status,
    statusLink,
    name,
    headline,
    role,
    summary,
    deliverables,
    visualHint,
    align,
    placeholder = false,
}: CaseBlockProps) {
    const leftCols = align === 'left'
    const contentClass = leftCols
        ? 'md:col-start-1 md:col-span-7'
        : 'md:col-start-6 md:col-span-7 md:order-2'
    const visualClass = leftCols
        ? 'md:col-start-9 md:col-span-4'
        : 'md:col-start-1 md:col-span-4 md:order-1 md:row-start-1'

    return (
        <article className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-start">
            {/* Content */}
            <div className={contentClass}>
                <div className="flex items-center gap-6 mb-6">
                    <span className="mono-label text-spark">{index}</span>
                    {statusLink ? (
                        <a
                            href={statusLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mono-label text-soft hover:text-spark transition-colors inline-flex items-center gap-1.5"
                        >
                            {status} <span aria-hidden>↗</span>
                        </a>
                    ) : (
                        <span className="mono-label text-muted">{status}</span>
                    )}
                </div>

                <p
                    className="font-mono text-spark mb-3"
                    style={{ fontSize: '0.66rem' }}
                >
                    {name}
                </p>

                <h3
                    className="font-display mb-4"
                    style={{
                        fontSize: 'clamp(1.75rem, 4vw, 3.25rem)',
                        color: placeholder ? 'var(--spark)' : 'var(--lit)',
                    }}
                >
                    {headline}
                </h3>

                <p
                    className="text-soft mb-6 max-w-xl leading-relaxed"
                    style={{ fontSize: 'clamp(0.95rem, 1.2vw, 1.05rem)' }}
                >
                    <span className="text-lit">{role}.</span> {summary}
                </p>

                <ul className="space-y-2 text-soft text-sm leading-relaxed max-w-lg">
                    {deliverables.map((d, i) => (
                        <li key={i} className="flex gap-2.5">
                            <span aria-hidden className="text-spark">
                                ↳
                            </span>
                            <span>{d}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Visual Placeholder */}
            <div className={visualClass}>
                <VisualPlaceholder hint={visualHint} placeholder={placeholder} />
            </div>
        </article>
    )
}

function VisualPlaceholder({
    hint,
    placeholder,
}: {
    hint: string
    placeholder?: boolean
}) {
    return (
        <div
            className="relative w-full overflow-hidden"
            style={{
                aspectRatio: '4 / 5',
                border: '1px solid rgba(201, 184, 163, 0.16)',
                borderRadius: '4px',
                background: placeholder
                    ? 'linear-gradient(135deg, rgba(232,90,31,0.06), rgba(20,17,15,0.6))'
                    : 'rgba(20, 17, 15, 0.5)',
            }}
        >
            {/* Subtle Globe-halo as decorative element */}
            <div
                className="absolute"
                aria-hidden
                style={{
                    inset: '-20%',
                    background: placeholder
                        ? 'radial-gradient(circle at 65% 35%, rgba(232,90,31,0.18) 0%, transparent 60%)'
                        : 'radial-gradient(circle at 75% 25%, rgba(232,90,31,0.08) 0%, transparent 55%)',
                    pointerEvents: 'none',
                }}
            />

            {/* Bottom-right hint label */}
            <div
                className="absolute"
                style={{
                    bottom: '1.25rem',
                    left: '1.25rem',
                    right: '1.25rem',
                }}
            >
                <p
                    className="mono-label"
                    style={{
                        color: placeholder ? 'var(--spark)' : 'var(--muted)',
                        fontSize: '0.6rem',
                    }}
                >
                    ↳ {hint}
                </p>
            </div>
        </div>
    )
}
