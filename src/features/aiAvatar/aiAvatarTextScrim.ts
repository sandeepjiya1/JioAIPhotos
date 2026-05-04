/**
 * Text scrim: ~80% opaque at top → ~20% mid → fully transparent at bottom
 * so artwork shows through (expo-linear-gradient; explicit alpha 0 at end for RN Web).
 */
export const TEXT_SCRIM_BLACK = [
  'rgba(0, 0, 0, 0.8)',
  'rgba(0, 0, 0, 0.2)',
  'rgba(0, 0, 0, 0)',
] as const

export const TEXT_SCRIM_LOCATIONS = [0, 0.48, 1] as const

/**
 * Figma `2385:11025` — Cricket Jerseys card overlay
 * `linear-gradient(269.802deg, rgba(0,29,46,0) 0.12%, rgba(27,28,32,0.7) 99.8%)`.
 * Mapped to RN diagonal: transparent toward bottom-trailing (jerseys), tint toward top-leading (type).
 */
export const TEXT_SCRIM_JERSEYS_COLORS = [
  'rgba(0, 29, 46, 0)',
  'rgba(27, 28, 32, 0.7)',
] as const

export const TEXT_SCRIM_JERSEYS_LOCATIONS = [0.0012178, 0.99802] as const

export const TEXT_SCRIM_JERSEYS_START = { x: 1, y: 1 } as const
export const TEXT_SCRIM_JERSEYS_END = { x: 0, y: 0 } as const

/**
 * Figma `2385:11017` — Cricket Faceoff header→art bridge (49pt tall at y=85 in 160-wide spec).
 * `bg-gradient-to-b from rgba(0,43,67,0) to #1b1c20 @ 68.261%` with `rotate(180deg)` in file.
 */
export const FACEOFF_HEADER_BRIDGE_COLORS = [
  'rgba(0, 43, 67, 0)',
  '#1b1c20',
  '#1b1c20',
] as const

export const FACEOFF_HEADER_BRIDGE_LOCATIONS = [0, 0.68261, 1] as const
