import type { ReactNode } from 'react'
import type { LayoutChangeEvent } from 'react-native'
import { type StyleProp, type ViewStyle } from 'react-native'
import Animated, {
  Extrapolate,
  interpolate,
  type SharedValue,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import {
  scrollRevealOpacityMin,
  scrollRevealRangePx,
  scrollRevealTranslateMax,
} from '@/theme/motion'

export type ScrollRevealSectionProps = {
  children: ReactNode
  style?: StyleProp<ViewStyle>
  scrollY: SharedValue<number>
  viewportHeight: SharedValue<number>
}

/**
 * Scroll-linked fade + slight lift as the block approaches the viewport.
 * UI-thread only; skips motion when reduce-motion is on.
 */
export function ScrollRevealSection({
  children,
  style,
  scrollY,
  viewportHeight,
}: ScrollRevealSectionProps) {
  const reduced = usePrefersReducedMotion()
  const layoutY = useSharedValue(0)
  const measured = useSharedValue(0)

  const onLayout = (e: LayoutChangeEvent) => {
    layoutY.value = e.nativeEvent.layout.y
    measured.value = 1
  }

  const animatedStyle = useAnimatedStyle(() => {
    if (reduced) {
      return { opacity: 1, transform: [{ translateY: 0 }] }
    }
    if (measured.value === 0) {
      return { opacity: 1, transform: [{ translateY: 0 }] }
    }

    const trigger = scrollY.value + viewportHeight.value
    const start = layoutY.value
    const lead = 32
    const inputMin = start - lead
    const inputMax = start + scrollRevealRangePx

    const opacity = interpolate(
      trigger,
      [inputMin, inputMax],
      [scrollRevealOpacityMin, 1],
      Extrapolate.CLAMP,
    )
    const translateY = interpolate(
      trigger,
      [inputMin, inputMax],
      [scrollRevealTranslateMax, 0],
      Extrapolate.CLAMP,
    )

    return { opacity, transform: [{ translateY }] }
  }, [reduced])

  return (
    <Animated.View style={[style, animatedStyle]} onLayout={onLayout}>
      {children}
    </Animated.View>
  )
}
