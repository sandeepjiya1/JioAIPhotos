import type { ReactNode } from 'react'
import type { ComponentProps } from 'react'
import { type StyleProp, type ViewStyle } from 'react-native'
import Animated from 'react-native-reanimated'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

type Entering = NonNullable<ComponentProps<typeof Animated.View>['entering']>
type Exiting = NonNullable<ComponentProps<typeof Animated.View>['exiting']>

export type AnimatedScreenProps = {
  children: ReactNode
  style?: StyleProp<ViewStyle>
  /** Applied when reduce-motion is off. */
  entering: Entering
  /** Optional exit preset for remounting keys. */
  exiting?: Exiting
}

/**
 * Subtle screen mount motion. Skips `entering`/`exiting` when reduce-motion is enabled.
 */
export function AnimatedScreen({ children, style, entering, exiting }: AnimatedScreenProps) {
  const reduced = usePrefersReducedMotion()

  if (reduced) {
    return <Animated.View style={style}>{children}</Animated.View>
  }

  return (
    <Animated.View style={style} entering={entering} exiting={exiting}>
      {children}
    </Animated.View>
  )
}
