import type { ReactNode } from 'react'
import { Pressable } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { motionSpring } from '@/theme/motion'

const bounceSpring = { stiffness: 260, damping: 11, mass: 0.45 } as const

/**
 * Decorative press on slide art — subtle squash on press-in, gentle bounce on release.
 */
export function OnboardingArtBounceWrap({ children }: { children: ReactNode }) {
  const scale = useSharedValue(1)
  const reduced = usePrefersReducedMotion()
  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  return (
    <Pressable
      style={{ flex: 1, width: '100%', minHeight: 0 }}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      onPressIn={() => {
        if (!reduced) scale.value = withSpring(0.96, motionSpring.press)
      }}
      onPressOut={() => {
        if (reduced) {
          scale.value = 1
          return
        }
        scale.value = withSpring(1, bounceSpring)
      }}
    >
      <Animated.View
        style={[{ flex: 1, width: '100%', minHeight: 0, alignItems: 'center', justifyContent: 'center' }, animStyle]}
      >
        {children}
      </Animated.View>
    </Pressable>
  )
}
