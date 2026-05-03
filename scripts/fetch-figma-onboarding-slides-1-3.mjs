#!/usr/bin/env node
/**
 * Flattened @2x PNGs for onboarding slides 1–3 (Figma file Q6e4kgKYBFpulMyKnPVHb8).
 *
 *   FIGMA_ACCESS_TOKEN=xxxx node scripts/fetch-figma-onboarding-slides-1-3.mjs
 *
 * Nodes:
 *   683-15351 → assets/onboarding/onboarding-slide-1.png
 *   683-15374 → assets/onboarding/onboarding-slide-2.png
 *   1590-20584 → assets/onboarding/onboarding-slide-3.png (OnboardingCard3 — was 683-15397)
 */
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const outDir = join(root, 'assets', 'onboarding')

const token = process.env.FIGMA_ACCESS_TOKEN || process.env.FIGMA_TOKEN
const FILE_KEY = 'Q6e4kgKYBFpulMyKnPVHb8'

const JOBS = [
  { nodeHyphen: '683-15351', outFile: 'onboarding-slide-1.png' },
  { nodeHyphen: '683-15374', outFile: 'onboarding-slide-2.png' },
  { nodeHyphen: '1590-20584', outFile: 'onboarding-slide-3.png' },
]

if (!token) {
  console.error('Missing FIGMA_ACCESS_TOKEN (or FIGMA_TOKEN).')
  process.exit(1)
}

const headers = { 'X-Figma-Token': token }

for (const { nodeHyphen, outFile } of JOBS) {
  const imagesUrl = new URL(`https://api.figma.com/v1/images/${FILE_KEY}`)
  imagesUrl.searchParams.set('ids', nodeHyphen)
  imagesUrl.searchParams.set('format', 'png')
  imagesUrl.searchParams.set('scale', '2')

  const res = await fetch(imagesUrl, { headers })
  if (!res.ok) {
    console.error('Figma API error', nodeHyphen, res.status, await res.text())
    process.exit(1)
  }
  const data = await res.json()
  if (data.err) {
    console.error('Figma API:', data.err)
    process.exit(1)
  }
  const keyColon = nodeHyphen.replace(/-/g, ':')
  const imageUrl =
    data.images?.[keyColon] ||
    data.images?.[nodeHyphen] ||
    Object.values(data.images || {})[0]
  if (!imageUrl) {
    console.error('No image URL', nodeHyphen, JSON.stringify(data, null, 2))
    process.exit(1)
  }

  const imgRes = await fetch(imageUrl)
  if (!imgRes.ok) {
    console.error('Download failed', outFile, imgRes.status)
    process.exit(1)
  }
  const buf = Buffer.from(await imgRes.arrayBuffer())
  const outPath = join(outDir, outFile)
  mkdirSync(dirname(outPath), { recursive: true })
  writeFileSync(outPath, buf)
  console.log('Wrote', outPath, `(${(buf.length / 1024).toFixed(0)} KB)`)
}

console.log('Done.')
