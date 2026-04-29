#!/usr/bin/env node
/**
 * Onboarding slide 4 — art + copy from Figma.
 *
 *   FIGMA_ACCESS_TOKEN=xxxx node scripts/fetch-figma-onboarding-slide-4.mjs
 *
 * Figma: file Q6e4kgKYBFpulMyKnPVHb8, node 698-16798 (Onboarding, slide 4)
 *   https://www.figma.com/design/Q6e4kgKYBFpulMyKnPVHb8/...?node-id=698-16798
 *
 * 1) GET /v1/images — exports PNG to assets/onboarding/onboarding-slide-4.png
 *    (illustration only: node 698-16819; full screen with CTAs is 698-16798)
 * 2) GET /v1/files/.../nodes — prints TEXT from the full screen node (698-16798) for i18n
 */
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const outPng = join(root, 'assets', 'onboarding', 'onboarding-slide-4.png')

const token = process.env.FIGMA_ACCESS_TOKEN || process.env.FIGMA_TOKEN
const FILE_KEY = 'Q6e4kgKYBFpulMyKnPVHb8'
/** Hero illustration (matches `onboarding-slide-4-figma-art.html` / Chome capture). */
const IMAGE_NODE_HYPHEN = '698-16819'
const IMAGE_NODE_COLON = '698:16819'
/** Full screen for text extraction. */
const COPY_NODE_HYPHEN = '698-16798'
const COPY_NODE_COLON = '698:16798'

if (!token) {
  console.error('Missing FIGMA_ACCESS_TOKEN (or FIGMA_TOKEN). Get one: Figma → Settings → Security.')
  process.exit(1)
}

const headers = { 'X-Figma-Token': token }

/** @param {import('node:fs').PathLike} node */
function collectTextNodes(node, out = [], depth = 0) {
  if (node == null) return out
  if (node.type === 'TEXT' && typeof node.characters === 'string' && node.characters.trim()) {
    out.push({
      name: node.name,
      y: node.absoluteBoundingBox?.y ?? 0,
      characters: node.characters,
    })
  }
  for (const ch of node.children || []) {
    collectTextNodes(ch, out, depth + 1)
  }
  return out
}

// --- 1) Copy (nodes API) --------------------------------------------------
const nodesUrl = new URL(`https://api.figma.com/v1/files/${FILE_KEY}/nodes`)
nodesUrl.searchParams.set('ids', COPY_NODE_COLON)

const nodesRes = await fetch(nodesUrl, { headers })
if (!nodesRes.ok) {
  console.error('Figma nodes error', nodesRes.status, await nodesRes.text())
  process.exit(1)
}
const nodesData = await nodesRes.json()
const fileNode = nodesData.nodes?.[COPY_NODE_COLON]?.document
if (fileNode) {
  const texts = collectTextNodes(fileNode)
  texts.sort((a, b) => a.y - b.y)
  console.log('\n--- Text on frame (name → content), top to bottom ---')
  for (const t of texts) {
    console.log(`[${t.name}]`, JSON.stringify(t.characters))
  }
  const ctaInFrame = new Set(['Try now', 'Try Now', 'NEXT', 'Next', 'अगला', 'अभी आज़माएं', 'छोड़ें', 'Get started', 'Get Started'])
  const main = texts.filter((t) => !ctaInFrame.has(t.characters.trim()))
  if (main.length >= 2) {
    const title = main[0].characters.replace(/\s+/g, ' ').trim()
    const subtitle = main[1].characters.replace(/\s+/g, ' ').trim()
    console.log('\n--- Suggested en block for i18n (verify against Figma) ---')
    console.log(`    { title: ${JSON.stringify(title)}, subtitle: ${JSON.stringify(subtitle)}, cta: 'Try Now' },`)
  } else {
    console.log('\n(Could not infer title/subtitle; pick from TEXT nodes above.)')
  }
} else {
  console.warn('No document for node', COPY_NODE_COLON, '— check node id in Figma URL')
}

// --- 2) Image (render) -----------------------------------------------------
const imagesUrl = new URL(`https://api.figma.com/v1/images/${FILE_KEY}`)
imagesUrl.searchParams.set('ids', IMAGE_NODE_HYPHEN)
imagesUrl.searchParams.set('format', 'png')
imagesUrl.searchParams.set('scale', '2')

const imgRes = await fetch(imagesUrl, { headers })
if (!imgRes.ok) {
  console.error('Figma images error', imgRes.status, await imgRes.text())
  process.exit(1)
}
const imgData = await imgRes.json()
if (imgData.err) {
  console.error('Figma API:', imgData.err)
  process.exit(1)
}
const keyColon = IMAGE_NODE_HYPHEN.replace(/-/g, ':')
const imageUrl =
  imgData.images?.[keyColon] ||
  imgData.images?.[IMAGE_NODE_HYPHEN] ||
  Object.values(imgData.images || {})[0]
if (!imageUrl) {
  console.error('No image URL', JSON.stringify(imgData, null, 2))
  process.exit(1)
}

const dl = await fetch(imageUrl)
if (!dl.ok) {
  console.error('Failed to download render', dl.status)
  process.exit(1)
}
const buf = Buffer.from(await dl.arrayBuffer())
mkdirSync(dirname(outPng), { recursive: true })
writeFileSync(outPng, buf)
console.log('\nWrote', outPng, `(${(buf.length / 1024).toFixed(0)} KB)\n`)
