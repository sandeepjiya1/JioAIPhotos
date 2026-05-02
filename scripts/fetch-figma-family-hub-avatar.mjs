#!/usr/bin/env node
/**
 * Family Hub member avatar — Figma Journeys `1305:22455` (Avatar in `1305:22445`).
 *
 *   FIGMA_ACCESS_TOKEN=xxxx node scripts/fetch-figma-family-hub-avatar.mjs
 *
 * Writes: assets/home/family-hub-avatar-seema.png
 */
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const outDir = join(root, 'assets', 'home')
const outFile = 'family-hub-avatar-seema.png'

const token = process.env.FIGMA_ACCESS_TOKEN || process.env.FIGMA_TOKEN
const FILE_KEY = 'Q6e4kgKYBFpulMyKnPVHb8'
/** Figma URL node-id=1305-22455 */
const NODE_ID = '1305-22455'

if (!token) {
  console.error('Missing FIGMA_ACCESS_TOKEN (or FIGMA_TOKEN).')
  process.exit(1)
}

const headers = { 'X-Figma-Token': token }

const imagesUrl = new URL(`https://api.figma.com/v1/images/${FILE_KEY}`)
imagesUrl.searchParams.set('ids', NODE_ID)
imagesUrl.searchParams.set('format', 'png')
imagesUrl.searchParams.set('scale', '2')

const res = await fetch(imagesUrl, { headers })
if (!res.ok) {
  console.error('Figma API error', NODE_ID, res.status, await res.text())
  process.exit(1)
}
const data = await res.json()
if (data.err) {
  console.error('Figma API:', data.err)
  process.exit(1)
}
const keyColon = NODE_ID.replace(/-/g, ':')
const imageUrl =
  data.images?.[keyColon] ||
  data.images?.[NODE_ID] ||
  Object.values(data.images || {})[0]
if (!imageUrl) {
  console.error('No image URL', NODE_ID, JSON.stringify(data, null, 2))
  process.exit(1)
}

const imgRes = await fetch(imageUrl)
if (!imgRes.ok) {
  console.error('Download failed', imgRes.status)
  process.exit(1)
}
const buf = Buffer.from(await imgRes.arrayBuffer())
const outPath = join(outDir, outFile)
mkdirSync(outDir, { recursive: true })
writeFileSync(outPath, buf)
console.log('Wrote', outPath, `(${(buf.length / 1024).toFixed(0)} KB)`)
