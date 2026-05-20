# Sunbyte

Web-Agentur aus Wien. Inhabergeführt von Zakir Daryabi.

**Live:** [sunbyte.at](https://sunbyte.at) (folgt)

## Stack

- Next.js 14 (App Router, static export)
- TypeScript
- Tailwind CSS
- i18n DE/EN
- Deploy: GitHub Pages via Actions

## Lokal entwickeln

```bash
npm install
npm run dev
```

→ [http://localhost:3000](http://localhost:3000)

## Build

```bash
npm run build
```

Statischer Export landet in `out/`.

## Domain & Deploy

- Repo: `batorsunbyte/sunbyte-website`
- GitHub Pages baut auf `main`-Push automatisch
- Domain `sunbyte.at` wird per `CNAME` + GitHub-Pages-Custom-Domain verknüpft
