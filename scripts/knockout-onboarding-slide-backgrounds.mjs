#!/usr/bin/env node
/**
 * Clears baked-in journey canvas pixels from onboarding slide PNGs (transparent alpha).
 * Uses distance to known Figma / app navy tones (not full border sampling — collage touches edges).
 *
 * Usage: node scripts/knockout-onboarding-slide-backgrounds.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const DIR = path.join(ROOT, 'assets', 'onboarding')
const FILES = [1, 2, 3, 4].map((n) => path.join(DIR, `onboarding-slide-${n}.png`))

/**
 * RGB anchors for the flat journey canvas (`#001D2E` and tight neighbours in exports).
 * Excludes `#0C0D10` and broad blues so jerseys / photos are not erased.
 */
const BG_TARGETS = [
  [0, 29, 46],
  [0, 28, 45],
  [1, 30, 47],
]

/** Tight Euclidean distance — only near-flat canvas pixels. */
const DIST_THRESHOLD = 11

function minDistToTargets(r, g, b) {
  let m = Infinity
  for (const [tr, tg, tb] of BG_TARGETS) {
    const d = Math.sqrt((r - tr) ** 2 + (g - tg) ** 2 + (b - tb) ** 2)
    if (d < m) m = d
  }
  return m
}

async function processFile(filePath) {
  const buf = fs.readFileSync(filePath)
  const { data, info } = await sharp(buf).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const { width, height, channels } = info
  if (channels !== 4) {
    console.warn(`Skip ${path.basename(filePath)}: expected RGBA`)
    return
  }

  let cleared = 0
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    if (minDistToTargets(r, g, b) <= DIST_THRESHOLD) {
      data[i + 3] = 0
      cleared++
    }
  }

  const outBuf = await sharp(Buffer.from(data), {
    raw: { width, height, channels: 4 },
  })
    .png({ compressionLevel: 9 })
    .toBuffer()

  fs.writeFileSync(filePath, outBuf)
  console.log(
    `${path.basename(filePath)}: cleared ${cleared} px (${((cleared / (width * height)) * 100).toFixed(1)}%)`,
  )
}

for (const f of FILES) {
  if (!fs.existsSync(f)) {
    console.error(`Missing: ${f}`)
    process.exitCode = 1
    continue
  }
  await processFile(f)
}

console.log('Done.')
