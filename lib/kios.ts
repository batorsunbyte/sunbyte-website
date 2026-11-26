/**
 * Inhalte zum KI-Betriebssystem — eine Quelle für Startseite und /partner.
 *
 * Herkunft (26.11.2026):
 *  - FUNKTIONEN: Zakirs sechs Punkte, wörtlich.
 *  - LEISTUNGEN: aus Zakirs Beschreibung („Software mit einer Bibliothek von
 *    Funktionen, Aktualisierungen, Sicherheit, Beratung, Hilfe bei der
 *    Installation, Betreuung"). Keine Zusagen zu Fristen oder Umfang.
 *  - BRANCHEN: Beispiele, die Zakir ausdrücklich bestellt hat („ein paar
 *    Vorteile und Nutzungen je Branche erstellen"). Jeder Punkt ist eine
 *    Anwendung der sechs Funktionen auf die Branche und als Beispiel
 *    gekennzeichnet — keine Kundenfälle, keine Zahlen.
 *  - Preise: noch nicht festgelegt, deshalb steht nirgends ein Betrag.
 */

export type IconKey =
    | 'kunden'
    | 'anfragen'
    | 'werbung'
    | 'konkurrenz'
    | 'aufgaben'
    | 'bauen'

/**
 * Die sechs Module rund um das Kernsystem (Schaubild KernSystem.tsx).
 * `text` ist Zakirs Satz, wörtlich. `modul` ist ein Kurzname für den Knoten.
 * `agenten`: Zakir will je Modul spezialisierte Agenten zeigen (26.11.2026).
 * Die Namen sind aus den Tätigkeiten in seinem Satz abgeleitet, nicht aus der
 * Software ausgelesen — Zakir ersetzt sie durch die echten Agenten-Namen.
 */
export const FUNKTIONEN: {
    icon: IconKey
    modul: string
    text: string
    agenten: string[]
}[] = [
    {
        icon: 'kunden',
        modul: 'Neukunden',
        text: 'Findet neue Kunden, während Sie schlafen',
        agenten: ['Such-Agent', 'Nacht-Agent'],
    },
    {
        icon: 'anfragen',
        modul: 'Anfragen',
        text: 'Beantwortet Anfragen sofort und vereinbart Termine für Sie',
        agenten: ['Antwort-Agent', 'Termin-Agent'],
    },
    {
        icon: 'werbung',
        modul: 'Werbung',
        text: 'Macht Ihre Werbung: Social Media, Videos, Website',
        agenten: ['Social-Media-Agent', 'Video-Agent', 'Website-Agent'],
    },
    {
        icon: 'konkurrenz',
        modul: 'Konkurrenz',
        text: 'Hat Ihre Konkurrenz im Auge und reagiert sofort',
        agenten: ['Beobachter-Agent', 'Reaktions-Agent'],
    },
    {
        icon: 'aufgaben',
        modul: 'Aufgaben',
        text: 'Verteilt Aufgaben, kontrolliert sie und vergisst nichts',
        agenten: ['Verteiler-Agent', 'Kontroll-Agent', 'Erinnerungs-Agent'],
    },
    {
        icon: 'bauen',
        modul: 'Ausbau',
        text: 'Baut sich selbst, was Ihr Betrieb braucht, ohne teure Zusatz-Software',
        agenten: ['Bau-Agent'],
    },
]

/** Kurzform für das Laufband im Hero */
export const FUNKTIONEN_KURZ = [
    'Findet neue Kunden',
    'Beantwortet Anfragen',
    'Vereinbart Termine',
    'Macht Ihre Werbung',
    'Hat die Konkurrenz im Auge',
    'Verteilt Aufgaben',
    'Vergisst nichts',
]

/** `text` spricht den Betrieb an (Startseite), `partner` die Agentur (/partner). */
export const LEISTUNGEN: { titel: string; text: string; partner: string }[] = [
    {
        titel: 'Das Betriebssystem',
        text: 'Die Software selbst: ein KI-Betriebssystem, zugeschnitten auf Ihren Betrieb.',
        partner: 'Die Software selbst: ein KI-Betriebssystem, das auf den Betrieb Ihres Kunden zugeschnitten wird.',
    },
    {
        titel: 'Bibliothek von Funktionen',
        text: 'Eine Bibliothek fertiger Funktionen. Sie nutzen, was Ihr Betrieb braucht, und die Bibliothek wächst weiter.',
        partner: 'Eine Bibliothek fertiger Funktionen, die mit dem Netzwerk wächst.',
    },
    {
        titel: 'Aktualisierungen und Sicherheit',
        text: 'Wir entwickeln das System laufend weiter. Updates und Sicherheit gehören dazu.',
        partner: 'Wir entwickeln das System laufend weiter. Updates und Sicherheit gehören dazu.',
    },
    {
        titel: 'Beratung',
        text: 'Wir klären mit Ihnen, was das System in Ihrem Betrieb übernehmen soll.',
        partner: 'Wir beraten, was das System im Betrieb übernehmen soll.',
    },
    {
        titel: 'Installation',
        text: 'Wir helfen bei der Installation, bis das System in Ihrem Betrieb läuft.',
        partner: 'Wir helfen bei der Installation, bis das System läuft.',
    },
    {
        titel: 'Betreuung',
        text: 'Nach dem Start bleiben wir Ihr Ansprechpartner.',
        partner: 'Nach dem Start betreuen wir weiter.',
    },
]

export const BRANCHEN: { slug: string; name: string; beispiele: string[] }[] = [
    {
        slug: 'bau',
        name: 'Bau',
        beispiele: [
            'Beantwortet Anfragen zu Angeboten sofort und vereinbart Besichtigungstermine.',
            'Verteilt Aufgaben an die Mannschaft und erinnert an offene Punkte auf der Baustelle.',
            'Hat Ausschreibungen und Mitbewerber im Auge.',
            'Macht aus Baustellenfotos Beiträge für Social Media und die Website.',
        ],
    },
    {
        slug: 'handwerk',
        name: 'Handwerk',
        beispiele: [
            'Nimmt Anfragen auch nach Feierabend an und vereinbart Termine.',
            'Erinnert an Wartungen und an Angebote, die noch offen sind.',
            'Verteilt Aufträge im Team und kontrolliert, was erledigt ist.',
            'Zeigt fertige Arbeiten auf Social Media.',
        ],
    },
    {
        slug: 'gastronomie',
        name: 'Gastronomie',
        beispiele: [
            'Beantwortet Fragen zu Reservierung, Öffnungszeiten und Gruppen sofort.',
            'Macht Werbung für Mittagsmenü, Aktionen und Veranstaltungen.',
            'Hat Bewertungen und die Lokale in der Umgebung im Auge.',
            'Erinnert das Team an Bestellungen und wiederkehrende Aufgaben.',
        ],
    },
    {
        slug: 'fitness-beauty',
        name: 'Fitness und Beauty',
        beispiele: [
            'Beantwortet Anfragen zu Probetraining und Behandlungen und vereinbart Termine.',
            'Meldet sich bei Interessenten, die noch nicht gebucht haben.',
            'Macht Ihre Werbung: Beiträge, Videos, Aktionen.',
            'Hat Mitbewerber und deren Angebote im Auge.',
        ],
    },
    {
        slug: 'kfz',
        name: 'Kfz und Fahrzeugpflege',
        beispiele: [
            'Beantwortet Anfragen zu Service und Pflege und vereinbart Termine.',
            'Erinnert Kunden an Pickerl, Service und Reifenwechsel.',
            'Verteilt Aufträge in der Werkstatt und kontrolliert den Stand.',
            'Macht Werbung mit Vorher-nachher-Bildern.',
        ],
    },
]
