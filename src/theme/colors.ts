/**
 * @deprecated Import `useThemeColors` from `@/theme/useThemeColors` (or `getPalette` from `@/theme/palettes`).
 * Kept for rare static reads; defaults to **dark** tokens (`surface0` = `#0C0D10`).
 */
import { darkPalette, type AppThemeColors } from '@/theme/palettes'

export type { AppThemeColors }

/** Static dark fallback — prefer `useThemeColors()` in UI. */
export const colors: AppThemeColors = darkPalette
