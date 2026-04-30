/**
 * @deprecated Import `useThemeColors` from `@/theme/useThemeColors` (or `getPalette` / palettes for non-React).
 * Kept for rare static reads; defaults to **dark** tokens (`surface0` = `#0C0D10`).
 */
import {
  DARK_MODE_ROOT_BACKGROUND,
  darkPalette,
  getPalette,
  lightPalette,
  type AppThemeColors,
} from '@/theme/palettes'

export type { AppThemeColors }
export { DARK_MODE_ROOT_BACKGROUND, darkPalette, lightPalette, getPalette }

/** Static dark fallback — prefer `useThemeColors()` in UI. */
export const colors: AppThemeColors = darkPalette
