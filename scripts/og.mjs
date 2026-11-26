// Generiert public/og-sunbyte.png (1200x630): neue Wortmarke + Text + Erde.
// Lauf: node scripts/og.mjs   (vorher: public/images/brand/ muss die freigestellten Logos enthalten)
// Neuer Dateiname seit dem Logo-Wechsel (27.11.2026): WhatsApp und LinkedIn halten ein
// Vorschaubild unter gleichem Namen lange im Speicher.
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const out = join(root, 'public', 'og-sunbyte.png')

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="sun" cx="50%" cy="42%" r="60%">
      <stop offset="0" stop-color="#ffe2c2"/>
      <stop offset="42%" stop-color="#E85A1F"/>
      <stop offset="100%" stop-color="#9c330d"/>
    </radialGradient>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="rgba(232,90,31,0.45)"/>
      <stop offset="100%" stop-color="rgba(232,90,31,0)"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="#0E0A05"/>
  <circle cx="990" cy="300" r="300" fill="url(#glow)"/>
  <circle cx="990" cy="300" r="120" fill="url(#sun)"/>
  <text x="94" y="330" font-family="Arial, Helvetica, sans-serif" font-size="40" fill="#C9B8A3">KI-Betriebssystem für Ihren Betrieb</text>
  <text x="94" y="395" font-family="Arial, Helvetica, sans-serif" font-size="38" font-weight="600" fill="#E85A1F">Für Betriebe &#183; Für Agenturen</text>
  <text x="94" y="560" font-family="'Courier New', monospace" font-size="26" letter-spacing="3" fill="#9C8F7E">sunbyte.at</text>
</svg>`

const logo = await sharp(join(root, 'public', 'images', 'brand', 'sunbyte-wortmarke-hell.png'))
    .resize({ width: 520 })
    .toBuffer()

const png = await sharp(Buffer.from(svg))
    .composite([{ input: logo, left: 90, top: 140 }])
    .png()
    .toFile(out)
console.log('og-image written:', out, png)
