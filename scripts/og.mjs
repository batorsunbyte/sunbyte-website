// Generiert public/og-image.png (1200x630) aus einem SVG via sharp.
// Lauf: node scripts/og.mjs
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const out = join(__dirname, '..', 'public', 'og-image.png')

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
  <circle cx="960" cy="300" r="300" fill="url(#glow)"/>
  <circle cx="960" cy="300" r="120" fill="url(#sun)"/>
  <text x="90" y="250" font-family="Georgia, 'Times New Roman', serif" font-size="118" font-weight="700" fill="#FFF3E4">Sunbyte</text>
  <text x="94" y="320" font-family="Arial, Helvetica, sans-serif" font-size="40" fill="#C9B8A3">IT-Dienstleister aus Wien</text>
  <text x="94" y="385" font-family="Arial, Helvetica, sans-serif" font-size="38" font-weight="600" fill="#E85A1F">Webseiten &#183; KI-Sichtbarkeit</text>
  <text x="94" y="560" font-family="'Courier New', monospace" font-size="26" letter-spacing="3" fill="#9C8F7E">sunbyte.at</text>
</svg>`

const png = await sharp(Buffer.from(svg)).png().toFile(out)
console.log('og-image written:', out, png)
