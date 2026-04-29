import { useMemo } from 'react'
import { Dimensions, useWindowDimensions } from 'react-native'
import { BASE_DESIGN_WIDTH, moderateSize, scaleSize } from '@/theme/layoutScale'

/**
 * Window-aware scale helpers. Safe-area values should stay in physical pixels;
 * pass them through without multiplying by layout scale.
 */
export function useLayoutScale() {
  const { width, height, fontScale } = useWindowDimensions()
  const w = width > 0 ? width : Dimensions.get('window').width || BASE_DESIGN_WIDTH

  return useMemo(
    () => ({
      width: w,
      height,
      /** OS text size multiplier (accessibility). */
      fontScale: fontScale && fontScale > 0 ? fontScale : 1,
      layoutScale: w / BASE_DESIGN_WIDTH,
      s: (n: number) => scaleSize(n, w),
      ms: (n: number) => moderateSize(n, w),
    }),
    [w, height, fontScale],
  )
}
