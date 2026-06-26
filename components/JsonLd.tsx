/**
 * JSON-LD-Injektor für strukturierte Daten (schema.org).
 *
 * Sunbytes eigene Seite demonstriert damit KI-Sichtbarkeit am eigenen Beispiel:
 * sauberes, maschinenlesbares Markup, das LLMs (ChatGPT & Co.) und Suchmaschinen
 * exakt verstehen — genau der Dienst, den wir verkaufen.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
    return (
        <script
            type="application/ld+json"
            // JSON.stringify-Ausgabe ist sicher (keine User-Eingaben, nur statische Objekte)
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    )
}
