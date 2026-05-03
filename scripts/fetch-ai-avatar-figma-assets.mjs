#!/usr/bin/env node
/**
 * Pull AI Avatar home bitmaps from Figma Desktop (`localhost:3845`) and rasterize SVG overlays.
 *
 *   node scripts/fetch-ai-avatar-figma-assets.mjs
 *
 * Requires Figma open with the file, same as other `fetch-figma-*.mjs` flows.
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const home = join(root, 'assets', 'home')
const base = process.env.FIGMA_LOCAL ?? 'http://127.0.0.1:3845'

const pngHashes = [
  '83c0bf22e405b4ce159b1bac7e022b325662129d',
  'd51f212548e4943c8230025b29fee5f3faa9585c',
  '106998f8ab90a09f8b15a0e0d8ba1d727c66942f',
  '057c0b45e49c718fd450be434d2edac3b10336f8',
  '4f18b25dd5787f814c76a135cb002775a81ff9d6',
  '8f6e8f7af2ef7684aad73653bfea93d444341939',
  '5af61e6a02bac7411e3ce6c7bebcb63285ff3b7f',
  '414e7a453d8012b21546322b563f4c226313d1f9',
  '8bc93d888d0d87c406569c4230e6e812cd4b40a7',
  '9f5858a41501f3b61328062a26af323f8ebead18',
  'aa4e68f0e2149d0f4e4c997fd38d7a3f07bc72ac',
  '7111ceeb6e2fd7b0b913a4aa4a5a282ef4835a2a',
]

const svgHashes = [
  'b5b0c10a51c1828c314306b6789ae8b99bb75b00',
  'f3ddb6b2065c86ca470e7735753c1ca429a1962b',
  'c20bab9f97f76c32694ccb2d8fb68bc7031acfc3',
  'd2dff3ea6b5a15b7bb5a146aa8f0fdcfad15b790',
]

mkdirSync(home, { recursive: true })

async function pull(url, outPath) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${url} -> ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  writeFileSync(outPath, buf)
}

for (const h of pngHashes) {
  const url = `${base}/assets/${h}.png`
  const out = join(home, `${h}.png`)
  await pull(url, out)
  console.log('PNG', h)
}

for (const h of svgHashes) {
  const url = `${base}/assets/${h}.svg`
  const svgPath = join(home, `${h}.svg`)
  const pngPath = join(home, `${h}.png`)
  await pull(url, svgPath)
  await sharp(svgPath).png().toFile(pngPath)
  console.log('SVG→PNG', h)
}

console.log('Done. Update `assets/home/registry.ts` if you added new basenames.')
