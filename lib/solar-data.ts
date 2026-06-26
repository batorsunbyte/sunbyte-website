/**
 * Sonnensystem-Daten + Positionsmathematik.
 *
 * Die Planeten stehen beim Laden an ihrer ECHTEN aktuellen Position (berechnet
 * aus J2000-Bahnelementen + heutigem Datum) und bewegen sich dann beschleunigt
 * weiter — „in Echtzeit, wie im echten Leben", nur sichtbar schnell.
 *
 * Jeder Himmelskörper erzählt etwas über Sunbyte / Zakirs IT.
 */

export interface Body {
    key: string
    name: string
    /** Thema, das dieser Körper repräsentiert */
    topic: string
    /** Kurztext (Hero-Panel) */
    blurb: string
    /** Längerer Text (Vollbild-Panel) */
    detail: string
    /** Bahn-Radius relativ (0..1 vom max. Radius); Sonne = 0 */
    orbitRel: number
    /** Zeichengröße relativ zur Canvas-Kantenlänge */
    sizeRel: number
    color: string
    /** Saturn-Ring */
    ring?: boolean
    /** J2000 mittlere Länge (Grad) */
    L0?: number
    /** Umlaufzeit in Jahren */
    periodYears?: number
}

export const SUN: Body = {
    key: 'sun',
    name: 'Sunbyte',
    topic: 'das zentrum',
    blurb: 'Alles dreht sich darum, dass dein Auftritt strahlt. Unsere Mission: Sunbyte zu einer IT-Weltmacht bauen.',
    detail: 'Wie die Sonne im Zentrum steht Sunbyte für die Energie, die alles antreibt: erstklassige Webseiten und KI-Sichtbarkeit aus Wien — mit dem Anspruch, Maßstäbe zu setzen.',
    orbitRel: 0,
    sizeRel: 0.075,
    color: '#E85A1F',
}

export const PLANETS: Body[] = [
    {
        key: 'mercury',
        name: 'Merkur',
        topic: 'tempo',
        blurb: 'Schnelle Seiten verkaufen härter. Performance ist bei uns kein Add-on, sondern Standard.',
        detail: 'Der schnellste Planet steht für Geschwindigkeit: blitzschnelle Ladezeiten, schlanker Code, messbar mehr Conversions.',
        orbitRel: 0.16,
        sizeRel: 0.011,
        color: '#a89888',
        L0: 252.25,
        periodYears: 0.2408,
    },
    {
        key: 'venus',
        name: 'Venus',
        topic: 'design',
        blurb: 'Eigenständiges Design, das im Gedächtnis bleibt — kein Template von der Stange.',
        detail: 'Venus, der hellste Planet, steht für Ästhetik: eine unverwechselbare Designsprache, die deine Marke spürbar macht.',
        orbitRel: 0.24,
        sizeRel: 0.017,
        color: '#e8c79a',
        L0: 181.98,
        periodYears: 0.6152,
    },
    {
        key: 'earth',
        name: 'Erde',
        topic: 'ki-sichtbarkeit',
        blurb: 'Hier wirst du gefunden — damit ChatGPT & Co. dein Unternehmen kennen und empfehlen.',
        detail: 'Unser Zuhause: Von Wien aus sorgen wir dafür, dass dich die Welt findet — und die KI dich weiterempfiehlt.',
        orbitRel: 0.33,
        sizeRel: 0.018,
        color: '#5b8fb0',
        L0: 100.46,
        periodYears: 1.0,
    },
    {
        key: 'mars',
        name: 'Mars',
        topic: 'entwicklung',
        blurb: 'Sauberer, moderner Code. Statisch, sicher, blitzschnell — gebaut, um zu halten.',
        detail: 'Der rote Planet steht für solides Handwerk: moderne Stacks (wie diese Seite), saubere Technik, keine Bastellösungen.',
        orbitRel: 0.42,
        sizeRel: 0.013,
        color: '#c8552f',
        L0: 355.43,
        periodYears: 1.8808,
    },
    {
        key: 'jupiter',
        name: 'Jupiter',
        topic: 'erfahrung',
        blurb: 'Über 20 Jahre kombinierte Erfahrung in IT, KI und Design — zwei Brüder, ein Anspruch.',
        detail: 'Der größte Planet steht für unser größtes Pfund: gebündelte Erfahrung aus über zwei Jahrzehnten in IT und KI.',
        orbitRel: 0.58,
        sizeRel: 0.036,
        color: '#c9a87f',
        L0: 34.4,
        periodYears: 11.862,
    },
    {
        key: 'saturn',
        name: 'Saturn',
        topic: 'verlässlichkeit',
        blurb: 'Klare Abläufe, direkter Draht. Du sprichst mit denen, die bauen — kein Ticket-Dschungel.',
        detail: 'Saturns Ringe stehen für Struktur: ein klarer Prozess von der ersten Skizze bis zum Launch — verlässlich und transparent.',
        orbitRel: 0.72,
        sizeRel: 0.031,
        color: '#d8c08a',
        ring: true,
        L0: 49.95,
        periodYears: 29.457,
    },
    {
        key: 'uranus',
        name: 'Uranus',
        topic: 'innovation',
        blurb: 'Wir denken voraus. KI ist für uns kein Buzzword, sondern ein echtes Werkzeug.',
        detail: 'Der Planet, der „quer" liegt, steht für Andersdenken: neue Technologien früh nutzen, statt ihnen hinterherzulaufen.',
        orbitRel: 0.86,
        sizeRel: 0.023,
        color: '#9fc3c9',
        L0: 313.23,
        periodYears: 84.02,
    },
    {
        key: 'neptune',
        name: 'Neptun',
        topic: 'reichweite',
        blurb: 'Von Wien aus in die Welt. Das Netz kennt keine Distanz — deine Reichweite auch nicht.',
        detail: 'Der äußerste Planet steht für Reichweite: ein starker Auftritt erreicht Kunden, egal wie weit weg sie sind.',
        orbitRel: 1.0,
        sizeRel: 0.021,
        color: '#6f86c9',
        L0: 304.88,
        periodYears: 164.79,
    },
]

export const ALL_BODIES: Body[] = [SUN, ...PLANETS]

export function bodyByKey(key: string | null): Body | null {
    if (!key) return null
    return ALL_BODIES.find(b => b.key === key) ?? null
}

const J2000_MS = Date.UTC(2000, 0, 1, 12, 0, 0)

/** Tage seit J2000 für einen Zeitpunkt (ms) */
export function daysSinceJ2000(nowMs: number): number {
    return (nowMs - J2000_MS) / 86400000
}

/** Bahnwinkel (rad) eines Planeten für eine gegebene Tageszahl seit J2000 */
export function bodyAngleRad(b: Body, totalDays: number): number {
    if (!b.periodYears || b.L0 == null) return 0
    const periodDays = b.periodYears * 365.25
    const deg = b.L0 + (360 / periodDays) * totalDays
    const norm = ((deg % 360) + 360) % 360
    return (norm * Math.PI) / 180
}
