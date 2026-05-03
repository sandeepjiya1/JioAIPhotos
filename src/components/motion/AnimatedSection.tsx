import type { ReactNode } from 'react'
import { type StyleProp, type ViewStyle } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { motionDuration, motionEasing } from '@/theme/motion'

export type AnimatedSectionProps = {
  children: ReactNode
  style?: StyleProp<ViewStyle>
  /** Extra delay (ms) after mount — stagger above-the-fold sections. */
  delayMs?: number
}

/**
 * Staggered mount for above-the-fold blocks. Skips `entering` when reduce-motion is on.
 */
export function AnimatedSection({ children, style, delayMs = 0 }: AnimatedSectionProps) {
  const reduced = usePrefersReducedMotion()

  if (reduced) {
    return <Animated.View style={style}>{children}</Animated.View>
  }

  return (
    <Animated.View
      style={style}
      entering={FadeInDown.duration(motionDuration.slow)
        .delay(delayMs)
        .easing(motionEasing.outCubic)}
    >
      {children}
    </Animated.View>
  )
}
