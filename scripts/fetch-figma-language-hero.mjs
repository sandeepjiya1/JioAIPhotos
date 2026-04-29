#!/usr/bin/env node
/**
 * Download the language-screen hero PNG from Figma using the REST Images API.
 * Get a token: Figma → Settings → Security → Personal access tokens
 *
 *   FIGMA_ACCESS_TOKEN=xxxx npx --yes node scripts/fetch-figma-language-hero.mjs
 *
 * Source: file Q6e4kgKYBFpulMyKnPVHb8, node 683:15305
 * (same frame as Figma Desktop MCP get_screenshot / get_design_context).
 */
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const outPath = join(root, 'assets', 'home', 'language-collage.png')

const token = process.env.FIGMA_ACCESS_TOKEN || process.env.FIGMA_TOKEN
const FILE_KEY = 'Q6e4kgKYBFpulMyKnPVHb8'
/** Use hyphen form (Figma URL node-id=683-15305); API response keys use colons. */
const NODE_ID = '683-15305'

if (!token) {
  console.error('Missing FIGMA_ACCESS_TOKEN (or FIGMA_TOKEN). See scripts/fetch-figma-language-hero.mjs')
  process.exit(1)
}

const imagesUrl = new URL(`https://api.figma.com/v1/images/${FILE_KEY}`)
imagesUrl.searchParams.set('ids', NODE_ID)
imagesUrl.searchParams.set('format', 'png')
imagesUrl.searchParams.set('scale', '2')

const res = await fetch(imagesUrl, { headers: { 'X-Figma-Token': token } })
if (!res.ok) {
  console.error('Figma API error', res.status, await res.text())
  process.exit(1)
}
const data = await res.json()
if (data.err) {
  console.error('Figma API:', data.err)
  process.exit(1)
}
const keyColon = NODE_ID.replace(/-/g, ':')
const imageUrl =
  data.images?.[keyColon] || data.images?.[NODE_ID] || Object.values(data.images || {})[0]
if (!imageUrl) {
  console.error('No image URL in response', JSON.stringify(data, null, 2))
  process.exit(1)
}

const imgRes = await fetch(imageUrl)
if (!imgRes.ok) {
  console.error('Failed to download render URL', imgRes.status)
  process.exit(1)
}
const buf = Buffer.from(await imgRes.arrayBuffer())
mkdirSync(dirname(outPath), { recursive: true })
writeFileSync(outPath, buf)
console.log('Wrote', outPath, `(${(buf.length / 1024).toFixed(0)} KB)`)
