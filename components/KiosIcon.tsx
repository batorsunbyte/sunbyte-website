import type { IconKey } from '@/lib/kios'

/**
 * Sechs Strich-Zeichen für die Funktionen des KI-Denksystems.
 * Bewusst schlicht (ein Strich, eine Farbe), damit sie neben der
 * Display-Schrift nicht lauter sind als der Text.
 */
const PFADE: Record<IconKey, React.ReactNode> = {
    // Zielscheibe: neue Kunden finden
    kunden: (
        <>
            <circle cx="12" cy="12" r="8.5" />
            <circle cx="12" cy="12" r="4.5" />
            <circle cx="12" cy="12" r="0.9" fill="currentColor" />
        </>
    ),
    // Sprechblase mit Haken: Anfrage beantwortet, Termin vereinbart
    anfragen: (
        <>
            <path d="M4 5.5h16v10.5H10l-4.5 3.5V16H4z" />
            <path d="M8.5 10.8l2.4 2.4 4.6-4.9" />
        </>
    ),
    // Megafon: Werbung
    werbung: (
        <>
            <path d="M4 10v4h3l8 4.5v-13L7 10z" />
            <path d="M18 9.5c1.2 1.4 1.2 3.6 0 5" />
            <path d="M7.5 14l1.2 4.5" />
        </>
    ),
    // Auge: Konkurrenz beobachten
    konkurrenz: (
        <>
            <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
            <circle cx="12" cy="12" r="3" />
        </>
    ),
    // Liste mit Haken: Aufgaben verteilen und kontrollieren
    aufgaben: (
        <>
            <path d="M4 6.5l1.6 1.6L8.4 5" />
            <path d="M4 12.5l1.6 1.6L8.4 11" />
            <path d="M4 18.5l1.6 1.6L8.4 17" />
            <path d="M11.5 6.5H20M11.5 12.5H20M11.5 18.5H20" />
        </>
    ),
    // Bausteine mit Plus: baut sich selbst, was fehlt
    bauen: (
        <>
            <rect x="3.5" y="12.5" width="8" height="8" />
            <rect x="12.5" y="12.5" width="8" height="8" />
            <rect x="3.5" y="3.5" width="8" height="8" />
            <path d="M16.5 4.5v6M13.5 7.5h6" />
        </>
    ),
}

export default function KiosIcon({
    name,
    size = 30,
    farbe = 'var(--spark)',
}: {
    name: IconKey
    size?: number
    farbe?: string
}) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
            style={{ color: farbe }}
        >
            {PFADE[name]}
        </svg>
    )
}
