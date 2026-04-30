import { useMemo } from 'react'
import { useThemeStore } from '@/store/themeStore'
import { getPalette, type AppThemeColors } from '@/theme/palettes'

/**
 * Resolved colour tokens for the active appearance (dark default, optional light from Profile).
 */
export function useThemeColors(): AppThemeColors {
  const appearance = useThemeStore((s) => s.appearance)
  return useMemo(() => getPalette(appearance), [appearance])
}
