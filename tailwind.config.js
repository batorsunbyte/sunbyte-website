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
                ink: 'var(--ink)',
                paper: 'var(--paper)',
                sun: 'var(--sun)',
                ember: 'var(--ember)',
                clay: 'var(--clay)',
                mute: 'var(--mute)',
            },
            fontFamily: {
                display: ['var(--font-display)', 'serif'],
                sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
                mono: ['var(--font-mono)', 'monospace'],
            },
        },
    },
    plugins: [],
}
