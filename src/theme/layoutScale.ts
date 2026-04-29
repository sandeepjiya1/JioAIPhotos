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
