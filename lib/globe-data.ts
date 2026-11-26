/**
 * Globe-Daten: Kontinent-Texte, Wien-Koord, continentOf-Heuristik
 * 1:1 portiert aus reference/hero-spike-v7.html (continentOf, DATA, VIE).
 */

export type ContinentKey =
    | 'na' | 'sa' | 'eu' | 'af' | 'as' | 'oc' | 'an' | 'at'

export interface ContinentInfo {
    n: string
    t: string
}

export const CONTINENT_DATA: Record<ContinentKey, ContinentInfo> = {
    na: {
        n: 'nordamerika',
        t: 'Performance ist Umsatz. Schon eine Sekunde mehr Ladezeit kostet messbar Conversions — eine schnelle Seite verkauft härter.',
    },
    sa: {
        n: 'südamerika',
        t: 'Junger, digitaler Wachstumsmarkt. Wer früh mit starker Web-Präsenz da ist, besetzt die Nische, bevor es alle tun.',
    },
    eu: {
        n: 'europa',
        t: 'Vertrauen entscheidet in Sekunden. Ihre Website ist der erste Handschlag — wirkt sie billig, wirkt das Angebot billig.',
    },
    af: {
        n: 'afrika',
        t: 'Die nächste Milliarde geht online — mobil zuerst. Wer sauber und mobile-first baut, gewinnt einen ganzen Kontinent an Chancen.',
    },
    as: {
        n: 'asien',
        t: 'Mobile-first ist Pflicht, nicht Option. Web passiert hier fast nur am Handy — schnell und ruckelfrei oder gar nicht.',
    },
    oc: {
        n: 'ozeanien',
        t: 'Distanz zählt im Web nicht. Eine starke Seite holt Kunden, egal wie weit weg Ihr Betrieb sitzt.',
    },
    an: {
        n: 'antarktis',
        t: 'Selbst hier hört das Netz nicht auf. Wenn eine Seite noch die Forschungsstationen am Pol erreicht, erreicht sie wirklich jeden.',
    },
    at: {
        n: 'österreich · wien',
        t: 'Die nächste IT-Weltmacht beginnt hier. Von Wien aus, von Grund auf gebaut — präzise, verlässlich, weltklasse. Genau dafür steht Sunbyte.',
    },
}

/* KI-OS-Welle (26.11.2026): Sie-Form; der Satz stammt aus Zakirs Text
   („Darin arbeitet ein selbstlernendes Denksystem mit mehreren KI-Agenten Tag & Nacht."). */
const DEFAULT_TEXT =
    'Ein selbstlernendes Denksystem mit mehreren KI-Agenten arbeitet Tag & Nacht für Ihren Betrieb.'

export const DEFAULT_INFO: ContinentInfo = {
    n: '↳ drehen sie die welt, wählen sie einen kontinent',
    t: DEFAULT_TEXT,
}

export const DEFAULT_INFO_TOUCH: ContinentInfo = {
    n: '↳ drehen sie die welt, tippen sie auf einen kontinent',
    t: DEFAULT_TEXT,
}

/** Wien-Koordinaten [lon, lat] */
export const VIENNA: [number, number] = [16.3731, 48.2079]

/**
 * Grobe Kontinent-Zone basierend auf [lon, lat] eines Country-Centroid.
 * Aus v7 portiert. Grenzfälle (Russland, Naher Osten) bewusst grob —
 * Heuristik reicht für visuelles Highlighting.
 */
export function continentOf(lon: number, lat: number): ContinentKey {
    if (lat < -58) return 'an'
    if (lon > 110 && lat < -11) return 'oc'
    if (lon > 150 && lat < 2) return 'oc'
    if (lon < -34) return lat < 13 ? 'sa' : 'na'
    if (lon >= -34 && lon < -12 && lat > 59) return 'na'
    if (lat >= 35 && lon >= -12 && lon <= 58) return 'eu'
    if (lat < 36 && lon >= -19 && lon <= 52) return 'af'
    return 'as'
}
