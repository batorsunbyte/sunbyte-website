/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                // v7 canonical tokens
                bg: 'var(--bg)',
                spark: 'var(--spark)',
                lit: 'var(--lit)',
                soft: 'var(--soft)',
                muted: 'var(--muted)',
                earth: 'var(--earth)',
            },
            fontFamily: {
                display: ['Fraunces', 'Georgia', 'serif'],
                sans: ['Inter Tight', 'system-ui', 'sans-serif'],
                mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
            },
            fontSize: {
                'micro': ['0.62rem', { lineHeight: '1.2' }],
                'micro-md': ['0.66rem', { lineHeight: '1.2' }],
            },
            letterSpacing: {
                'mono': '0.16em',
            },
        },
    },
    plugins: [],
}
