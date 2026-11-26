/**
 * Inhalte zum KI-Betriebssystem — eine Quelle für Startseite und /partner.
 *
 * Herkunft (26.11.2026):
 *  - FUNKTIONEN: Zakirs sechs Punkte, wörtlich.
 *  - LEISTUNGEN: aus Zakirs Beschreibung („Software mit einer Bibliothek von
 *    Funktionen, Aktualisierungen, Sicherheit, Beratung, Hilfe bei der
 *    Installation, Betreuung"). Keine Zusagen zu Fristen oder Umfang.
 *  - BRANCHEN: je Branche drei Fälle „Problem → Lösung" (siehe dort).
 *    Keine Kundenfälle, keine Zahlen.
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
    /** Erfundenes Beispiel für den Film im Schaubild; auf der Seite als Beispiel gekennzeichnet */
    beispiel: { zeit: string; text: string }
}[] = [
    {
        icon: 'kunden',
        modul: 'Neukunden',
        text: 'Findet neue Kunden, während Sie schlafen',
        agenten: ['Such-Agent', 'Nacht-Agent'],
        beispiel: { zeit: '22:40', text: 'Der Such-Agent findet neue Kontakte, die zu Ihrem Angebot passen.' },
    },
    {
        icon: 'anfragen',
        modul: 'Anfragen',
        text: 'Beantwortet Anfragen sofort und vereinbart Termine für Sie',
        agenten: ['Antwort-Agent', 'Termin-Agent'],
        beispiel: { zeit: '23:15', text: 'Eine Anfrage kommt über die Website. Sie ist beantwortet, der Termin ist eingetragen.' },
    },
    {
        icon: 'werbung',
        modul: 'Werbung',
        text: 'Macht Ihre Werbung: Social Media, Videos, Website',
        agenten: ['Social-Media-Agent', 'Video-Agent', 'Website-Agent'],
        beispiel: { zeit: '06:30', text: 'Der Beitrag für heute ist vorbereitet und wartet auf Ihre Freigabe.' },
    },
    {
        icon: 'konkurrenz',
        modul: 'Konkurrenz',
        text: 'Hat Ihre Konkurrenz im Auge und reagiert sofort',
        agenten: ['Beobachter-Agent', 'Reaktions-Agent'],
        beispiel: { zeit: '07:10', text: 'Ein Mitbewerber hat sein Angebot geändert. Sie bekommen einen Hinweis.' },
    },
    {
        icon: 'aufgaben',
        modul: 'Aufgaben',
        text: 'Verteilt Aufgaben, kontrolliert sie und vergisst nichts',
        agenten: ['Verteiler-Agent', 'Kontroll-Agent', 'Erinnerungs-Agent'],
        beispiel: { zeit: '08:00', text: 'Die Aufgaben für heute sind verteilt. Offenes von gestern ist markiert.' },
    },
    {
        icon: 'bauen',
        modul: 'Ausbau',
        text: 'Baut sich selbst, was Ihr Betrieb braucht, ohne teure Zusatz-Software',
        agenten: ['Bau-Agent'],
        beispiel: { zeit: '09:20', text: 'Eine Funktion fehlt im Betrieb. Das System schlägt sie vor und baut sie.' },
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

/**
 * Branchen (zweite Fassung, 26.11.2026). Zakir: „Hier sollen sehr gute
 * Beispiele bzw. Lösungen für Probleme stehen, die die verschiedenen Branchen
 * haben, wo sie auch viel Geld ausgeben — eines davon ist Kundengewinnung."
 *
 * Je Branche drei Fälle: `problem` = wo heute Geld oder Zeit verloren geht,
 * `loesung` = was das System dort übernimmt, `modul` = welches Modul aus dem
 * Schaubild das tut. Die Probleme sind bekannte, allgemeine Kostenstellen der
 * Branche, bewusst ohne Zahlen und ohne Kundennamen. Die Lösungen bleiben bei
 * dem, was Zakirs sechs Sätze zusagen. Von Claude geschrieben — Zakir liest gegen.
 */
const BRANCHEN_ALLE: {
    slug: string
    name: string
    faelle: { thema: string; problem: string; loesung: string; modul: string }[]
    /** Grenze, die bei dieser Branche ausdrücklich dastehen soll */
    hinweis?: string
}[] = [
    {
        slug: 'bau',
        name: 'Bau',
        faelle: [
            {
                thema: 'Kundengewinnung',
                problem:
                    'Aufträge kommen über Vermittlungsportale, Anzeigen und Empfehlungen. Portale und Anzeigen kosten Geld, auch wenn kein Auftrag daraus wird.',
                loesung:
                    'Das System sucht selbst nach passenden Ausschreibungen und Kontakten und legt sie Ihnen vor. Auch nachts.',
                modul: 'Neukunden',
            },
            {
                thema: 'Anfragen und Besichtigungen',
                problem:
                    'Anfragen kommen, während Sie auf der Baustelle stehen. Wer erst am Abend zurückruft, hat den Auftrag oft schon verloren.',
                loesung:
                    'Das System antwortet sofort, fragt die wichtigsten Angaben ab und vereinbart den Besichtigungstermin.',
                modul: 'Anfragen',
            },
            {
                thema: 'Koordination',
                problem:
                    'Wer macht was bis wann? Die Abstimmung läuft über Telefon und WhatsApp, kostet Stunden, und Offenes geht unter.',
                loesung:
                    'Das System verteilt die Aufgaben an die Mannschaft, kontrolliert sie und erinnert an offene Punkte auf der Baustelle.',
                modul: 'Aufgaben',
            },
        ],
    },
    {
        slug: 'handwerk',
        name: 'Handwerk',
        faelle: [
            {
                thema: 'Kundengewinnung',
                problem:
                    'Für neue Aufträge zahlen Betriebe an Portale oder für Anzeigen. Bezahlt wird die Anfrage, nicht der Auftrag.',
                loesung:
                    'Das System findet Kunden in Ihrer Umgebung und zeigt Ihre fertigen Arbeiten auf Social Media und der Website.',
                modul: 'Neukunden',
            },
            {
                thema: 'Erreichbarkeit',
                problem:
                    'Das Telefon läutet, während Sie beim Kunden arbeiten. Ein verpasster Anruf ist oft ein verlorener Auftrag.',
                loesung:
                    'Das System nimmt Anfragen an, auch nach Feierabend, beantwortet sie und trägt den Termin ein.',
                modul: 'Anfragen',
            },
            {
                thema: 'Offene Angebote',
                problem:
                    'Das Angebot ist geschrieben, aber niemand fasst nach. So bleibt Geld liegen, das schon fast verdient war.',
                loesung:
                    'Das System erinnert an offene Angebote und fällige Wartungen und vergisst keinen Kunden.',
                modul: 'Aufgaben',
            },
        ],
    },
    {
        slug: 'gastronomie',
        name: 'Gastronomie',
        faelle: [
            {
                thema: 'Gäste gewinnen',
                problem:
                    'Lieferdienste und Reservierungsportale bringen Gäste, verlangen dafür aber Provision. Der Gast gehört dann dem Portal.',
                loesung:
                    'Das System macht Ihre eigene Werbung für Mittagsmenü, Aktionen und Veranstaltungen und bringt Gäste direkt zu Ihnen.',
                modul: 'Werbung',
            },
            {
                thema: 'Reservierungen',
                problem:
                    'Das Telefon läutet mitten im Service. Niemand hebt ab, und der Tisch bleibt leer.',
                loesung:
                    'Das System beantwortet Fragen zu Reservierung, Öffnungszeiten und Gruppen sofort.',
                modul: 'Anfragen',
            },
            {
                thema: 'Bewertungen und Umgebung',
                problem:
                    'Eine schlechte Bewertung bleibt tagelang unbeantwortet. Was das Lokal nebenan gerade macht, erfahren Sie zufällig.',
                loesung:
                    'Das System hat Bewertungen und die Lokale in der Umgebung im Auge und gibt Ihnen sofort Bescheid.',
                modul: 'Konkurrenz',
            },
        ],
    },
    {
        slug: 'fitness-beauty',
        name: 'Fitness und Beauty',
        faelle: [
            {
                thema: 'Kundengewinnung',
                problem:
                    'Werbung auf Social Media kostet jeden Monat. Viele Interessenten melden sich einmal und dann nie wieder.',
                loesung:
                    'Das System meldet sich bei Interessenten, die noch nicht gebucht haben, und vereinbart den Termin.',
                modul: 'Neukunden',
            },
            {
                thema: 'Termine',
                problem:
                    'Leere Termine und vergessene Buchungen kosten Umsatz, der sich nicht nachholen lässt.',
                loesung:
                    'Das System beantwortet Anfragen zu Probetraining und Behandlungen sofort und erinnert vor dem Termin.',
                modul: 'Anfragen',
            },
            {
                thema: 'Inhalte',
                problem:
                    'Für Beiträge und Videos zahlen Sie eine Agentur, oder Sie machen es am Abend selbst.',
                loesung:
                    'Das System macht Ihre Werbung: Beiträge, Videos, Aktionen. Sie geben frei.',
                modul: 'Werbung',
            },
        ],
    },
    {
        slug: 'kfz',
        name: 'Kfz und Fahrzeugpflege',
        faelle: [
            {
                thema: 'Kundengewinnung',
                problem:
                    'Neue Kunden kosten Werbung. Dabei kommen Kunden, die schon einmal da waren, oft nicht wieder, weil niemand sie erinnert.',
                loesung:
                    'Das System erinnert Ihre Kunden an Pickerl, Service und Reifenwechsel und vereinbart den Termin.',
                modul: 'Neukunden',
            },
            {
                thema: 'Preisanfragen',
                problem:
                    'Anfragen kommen per Telefon, WhatsApp und E-Mail. Wer keine schnelle Antwort bekommt, fährt zur nächsten Werkstatt.',
                loesung:
                    'Das System beantwortet Anfragen zu Service und Pflege sofort und trägt den Termin ein.',
                modul: 'Anfragen',
            },
            {
                thema: 'Werkstatt-Ablauf',
                problem:
                    'Welches Auto ist fertig, was fehlt noch, wer macht was? Die Antwort kostet jeden Tag Zeit.',
                loesung:
                    'Das System verteilt die Aufträge in der Werkstatt, kontrolliert den Stand und vergisst nichts.',
                modul: 'Aufgaben',
            },
        ],
    },
    {
        slug: 'produktion',
        name: 'Produktion',
        faelle: [
            {
                thema: 'Kundengewinnung',
                problem:
                    'Der Vertrieb hängt an wenigen Personen und an Messen. Neue Abnehmer und neue Märkte zu finden kostet Reisen, Zeit und Personal.',
                loesung:
                    'Das System sucht passende Abnehmer und Ausschreibungen und legt sie Ihrem Vertrieb vor. Auch nachts.',
                modul: 'Neukunden',
            },
            {
                thema: 'Anfragen',
                problem:
                    'Anfragen landen in verschiedenen Postfächern. Bis jemand antwortet, hat der Interessent schon beim Mitbewerber angefragt.',
                loesung:
                    'Das System beantwortet Anfragen sofort, fragt fehlende Angaben nach und vereinbart den Termin mit Ihrem Vertrieb.',
                modul: 'Anfragen',
            },
            {
                thema: 'Programme und Lizenzen',
                problem:
                    'Jede Abteilung hat ihr eigenes Programm, dazu kommen Listen in Excel. Lizenzen und Anpassungen kosten jedes Jahr.',
                loesung:
                    'Das System baut sich selbst, was Ihr Betrieb braucht, ohne teure Zusatz-Software.',
                modul: 'Ausbau',
            },
        ],
    },
    {
        slug: 'arztpraxen',
        name: 'Arztpraxen',
        hinweis:
            'Medizinische Auskünfte gibt das System nicht. Gesundheitsdaten brauchen besonderen Schutz. Wie das in Ihrer Praxis gelöst wird, klären wir vor dem Start.',
        faelle: [
            {
                thema: 'Telefon und Termine',
                problem:
                    'Das Telefon läutet ununterbrochen. Die Assistenz kommt nicht zu ihrer eigentlichen Arbeit, und Patienten erreichen niemanden.',
                loesung:
                    'Das System beantwortet Fragen zu Terminen, Öffnungszeiten und Ablauf sofort und vereinbart den Termin.',
                modul: 'Anfragen',
            },
            {
                thema: 'Versäumte Termine',
                problem:
                    'Termine, zu denen niemand kommt, kosten Umsatz, der sich nicht nachholen lässt.',
                loesung:
                    'Das System erinnert vor dem Termin und an fällige Kontrollen. Es vergisst niemanden.',
                modul: 'Aufgaben',
            },
            {
                thema: 'Organisation',
                problem:
                    'Bestellungen, Dienstplan, wiederkehrende Aufgaben: Vieles hängt an einer Person. Fällt sie aus, bleibt es liegen.',
                loesung:
                    'Das System verteilt die Aufgaben im Team, kontrolliert sie und erinnert an Offenes.',
                modul: 'Aufgaben',
            },
        ],
    },
    {
        slug: 'immobilien',
        name: 'Immobilien',
        faelle: [
            {
                thema: 'Kundengewinnung',
                problem:
                    'Portale verlangen Geld für jedes Inserat. Eigentümer, die verkaufen oder vermieten wollen, finden Sie nur mit viel Aufwand.',
                loesung:
                    'Das System sucht nach passenden Kontakten und Objekten und legt sie Ihnen vor.',
                modul: 'Neukunden',
            },
            {
                thema: 'Anfragen und Besichtigungen',
                problem:
                    'Auf ein Inserat kommen viele Anfragen, die meisten mit denselben Fragen. Die Antworten kosten jeden Tag Stunden.',
                loesung:
                    'Das System beantwortet Anfragen sofort und vereinbart die Besichtigungstermine.',
                modul: 'Anfragen',
            },
            {
                thema: 'Markt beobachten',
                problem:
                    'Preise und neue Objekte der Mitbewerber ändern sich täglich. Wer es zu spät merkt, verliert den Auftrag.',
                loesung:
                    'Das System hat Ihre Mitbewerber und deren Angebote im Auge und gibt Ihnen sofort Bescheid.',
                modul: 'Konkurrenz',
            },
        ],
    },
    {
        slug: 'kanzleien',
        name: 'Kanzleien',
        hinweis:
            'Rechts- und Steuerauskünfte gibt das System nicht. Es übernimmt Organisation und Kommunikation.',
        faelle: [
            {
                thema: 'Mandanten gewinnen',
                problem:
                    'Neue Mandanten kommen fast nur über Empfehlung. Wer wachsen will, zahlt für Anzeigen und Verzeichnisse.',
                loesung:
                    'Das System macht Ihre Kanzlei sichtbar: Beiträge, Website, Social Media. Sie geben frei.',
                modul: 'Werbung',
            },
            {
                thema: 'Erstkontakt',
                problem:
                    'Anrufe und E-Mails unterbrechen die Arbeit an den Akten. Rückrufe bleiben liegen.',
                loesung:
                    'Das System beantwortet Fragen zu Terminen und Ablauf sofort und vereinbart das Erstgespräch.',
                modul: 'Anfragen',
            },
            {
                thema: 'Unterlagen und Termine',
                problem:
                    'Unterlagen von Mandanten fehlen, Termine rücken näher, und jemand muss nachtelefonieren.',
                loesung:
                    'Das System erinnert Mandanten an fehlende Unterlagen und Ihr Team an offene Punkte.',
                modul: 'Aufgaben',
            },
        ],
    },
]

/** Reihenfolge der Reiter auf der Seite */
const BRANCHEN_FOLGE = [
    'bau',
    'handwerk',
    'produktion',
    'arztpraxen',
    'immobilien',
    'kanzleien',
    'gastronomie',
    'fitness-beauty',
    'kfz',
]
export const BRANCHEN = BRANCHEN_FOLGE.map(
    slug => BRANCHEN_ALLE.find(b => b.slug === slug)!,
)

/**
 * Was ein Agent tut — die Liste, die beim Zeigen auf eine Agenten-Figur
 * aufgeht (Zakir, 26.11.2026: „wie eine File-Liste, was er macht, zum
 * Beispiel"). Von Claude als Beispiele geschrieben, aus den Tätigkeiten in
 * Zakirs Sätzen abgeleitet; auf der Seite steht „Beispiel" darüber.
 * Zakir ersetzt sie durch das, was die echten Agenten tun.
 */
export const AGENT_AUFGABEN: Record<string, string[]> = {
    'Such-Agent': [
        'sucht Betriebe und Kontakte, die zu Ihnen passen',
        'prüft, ob sie zu Ihrem Angebot passen',
        'legt die Liste im Kernsystem ab',
    ],
    'Nacht-Agent': [
        'arbeitet weiter, wenn Ihr Betrieb geschlossen ist',
        'sammelt, was über Nacht hereinkommt',
        'legt Ihnen morgens eine Übersicht vor',
    ],
    'Antwort-Agent': [
        'liest die Anfrage',
        'antwortet sofort',
        'fragt nach, wenn eine Angabe fehlt',
    ],
    'Termin-Agent': [
        'schlägt freie Termine vor',
        'trägt den Termin ein',
        'erinnert vor dem Termin',
    ],
    'Social-Media-Agent': [
        'schreibt Beiträge',
        'plant sie ein',
        'wartet auf Ihre Freigabe',
    ],
    'Video-Agent': [
        'schneidet kurze Videos',
        'setzt Untertitel',
        'legt sie Ihnen zur Freigabe vor',
    ],
    'Website-Agent': [
        'hält Texte und Bilder aktuell',
        'ergänzt neue Projekte',
        'meldet, was veraltet ist',
    ],
    'Beobachter-Agent': [
        'beobachtet Ihre Mitbewerber',
        'bemerkt neue Preise und Angebote',
        'fasst zusammen, was sich geändert hat',
    ],
    'Reaktions-Agent': [
        'schlägt eine Antwort vor',
        'bereitet sie vor',
        'wartet auf Ihre Freigabe',
    ],
    'Verteiler-Agent': [
        'verteilt Aufgaben an Ihr Team',
        'achtet auf Fristen',
        'sagt Bescheid, wenn etwas dazukommt',
    ],
    'Kontroll-Agent': [
        'prüft, was erledigt ist',
        'fragt nach, was offen ist',
        'meldet Verzug',
    ],
    'Erinnerungs-Agent': [
        'erinnert an Termine',
        'erinnert an offene Angebote',
        'vergisst nichts',
    ],
    'Bau-Agent': [
        'erkennt, was im Betrieb fehlt',
        'schlägt eine neue Funktion vor',
        'baut sie nach Ihrer Freigabe',
    ],
}

/**
 * Der Austausch zwischen Handy und Denksystem. Frage und Antwort sind Zakirs
 * Beispiel vom 26.11.2026 (leicht geglättet); die zwei Antwort-Knöpfe hat
 * Claude ergänzt, damit man sieht: Die Entscheidung bleibt beim Chef.
 */
export const ZUGRIFF_BEISPIEL = {
    sie: 'Finde alle Materialien für dieses Projekt.',
    system: 'Die Liste steht bereit. Soll ich bestellen und die Planung vorbereiten?',
    wahl: ['Ja, bestellen', 'Erst ansehen'],
}
