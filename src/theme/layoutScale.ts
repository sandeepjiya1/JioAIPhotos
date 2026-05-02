/**
 * Responsive layout — design reference width (pt) for Figma → device scaling.
 * Use `scaleSize` for full proportional scaling, `moderateSize` for typography
 * and UI that should not swing as aggressively on tablets / narrow phones.
 */
export const BASE_DESIGN_WIDTH = 390

export function scaleSize(size: number, screenWidth: number): number {
  const sw = screenWidth > 0 ? screenWidth : BASE_DESIGN_WIDTH
  const v = (size * sw) / BASE_DESIGN_WIDTH
  return Math.max(1, Math.round(v))
}

export function moderateSize(size: number, screenWidth: number, factor = 0.5): number {
  const scaled = scaleSize(size, screenWidth)
  return Math.max(1, Math.round(size + (scaled - size) * factor))
}

/**
 * Scale a value from a Figma frame width (e.g. **360** for Journeys home) to the device.
 * Use when the node spec is in px @360 (not the default 390pt reference).
 */
export function scaleSizeFromDesign(size: number, screenWidth: number, designWidth: number): number {
  const dw = designWidth > 0 ? designWidth : 360
  const sw = screenWidth > 0 ? screenWidth : dw
  return Math.max(1, Math.round((size * sw) / dw))
}
