/**
 * NetzwerkRinge — vier Ringe um Wien: Österreich, DACH, EU, Welt.
 *
 * Zeigt das ZIEL des Netzwerks, nicht den heutigen Stand; die Unterschrift im
 * Abschnitt sagt das ausdrücklich. Die Ringe pulsieren nacheinander von innen
 * nach außen (CSS .ring-*, bei „weniger Bewegung" aus).
 */

const RINGE = [
    { r: 46, name: 'Österreich' },
    { r: 92, name: 'DACH' },
    { r: 138, name: 'EU' },
    { r: 184, name: 'Welt' },
]

export default function NetzwerkRinge() {
    return (
        <svg
            viewBox="0 0 400 400"
            role="img"
            aria-label="Ausbau des Netzwerks in vier Stufen: Österreich, DACH-Raum, EU, weltweit — ausgehend von Wien."
            style={{ width: '100%', maxWidth: 460, height: 'auto', display: 'block' }}
        >
            {RINGE.map((ring, i) => (
                <g key={ring.name}>
                    <circle
                        className="ring-kreis"
                        cx="200"
                        cy="200"
                        r={ring.r}
                        fill="none"
                        stroke="var(--spark)"
                        strokeWidth="1"
                        style={{ animationDelay: `${i * 0.9}s` }}
                    />
                    <text
                        x="200"
                        y={200 - ring.r + 16}
                        textAnchor="middle"
                        fill="var(--soft)"
                        style={{
                            fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                            fontSize: 9.5,
                            letterSpacing: '0.14em',
                            textTransform: 'lowercase',
                        }}
                    >
                        {ring.name}
                    </text>
                </g>
            ))}
            <circle cx="200" cy="200" r="4.5" fill="var(--lit)" />
            <text
                x="200"
                y="222"
                textAnchor="middle"
                fill="var(--lit)"
                style={{
                    fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                    fontSize: 9.5,
                    letterSpacing: '0.14em',
                }}
            >
                wien
            </text>
        </svg>
    )
}
