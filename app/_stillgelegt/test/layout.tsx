import type { Metadata } from 'next'
import type { ReactNode } from 'react'

/**
 * /test/* sind interne Spielwiesen (Globe-Prototypen etc.) —
 * niemals indexieren. noindex ist hier maßgeblich; robots.txt lässt das
 * Crawlen bewusst zu, damit Google das noindex auch lesen kann.
 */
export const metadata: Metadata = {
    robots: { index: false, follow: false },
}

export default function TestLayout({ children }: { children: ReactNode }) {
    return children
}
