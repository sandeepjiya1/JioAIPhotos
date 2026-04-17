import type { ReactNode } from 'react'
import { Pressable, type PressableProps } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { motionSpring, pressScaleDefault } from '@/theme/motion'

export type PressableScaleProps = Omit<PressableProps, 'children'> & {
  children: ReactNode
  /** Scale multiplier while pressed (e.g. 0.97). */
  scale?: number
  /**
   * `fill` — stretch to Pressable bounds + center children (buttons, nav cells).
   * `auto` — center only (compact chips / icon buttons).
   */
  layout?: 'fill' | 'auto'
}

/**
 * Press feedback on the UI thread — subtle scale spring, disabled when reduce-motion is on.
 */
export function PressableScale({
  children,
  style,
  scale = pressScaleDefault,
  layout = 'auto',
  disabled,
  onPressIn,
  onPressOut,
  ...rest
}: PressableScaleProps) {
  const reduced = usePrefersReducedMotion()
  const sv = useSharedValue(1)
  const springCfg = reduced ? motionSpring.pressReduced : motionSpring.press

  const innerAnim = useAnimatedStyle(() => ({
    transform: [{ scale: sv.value }],
  }))

  return (
    <Pressable
      {...rest}
      disabled={disabled}
      onPressIn={(e) => {
        if (!disabled && !reduced) {
          // Reanimated SharedValue — UI-thread spring assignment (not React state).
          // eslint-disable-next-line react-hooks/immutability -- shared value write
          sv.value = withSpring(scale, springCfg)
        }
        onPressIn?.(e)
      }}
      onPressOut={(e) => {
        // eslint-disable-next-line react-hooks/immutability -- shared value write
        sv.value = withSpring(1, springCfg)
        onPressOut?.(e)
      }}
      style={style}
    >
      <Animated.View
        style={[
          innerAnim,
          layout === 'fill'
            ? { alignSelf: 'stretch', flex: 1, alignItems: 'center', justifyContent: 'center' }
            : { alignItems: 'center', justifyContent: 'center' },
        ]}
      >
        {children}
      </Animated.View>
    </Pressable>
  )
}
