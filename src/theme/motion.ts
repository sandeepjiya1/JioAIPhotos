import { Easing } from 'react-native-reanimated'

/** Durations (ms) — keep in sync with native-stack `animationDuration` where used. */
export const motionDuration = {
  fast: 200,
  normal: 280,
  slow: 420,
} as const

/** Native stack transitions (ms). */
export const stackTransitionMs = motionDuration.normal

/** Reanimated easing presets (UI-thread). */
export const motionEasing = {
  outCubic: Easing.out(Easing.cubic),
  inOutQuad: Easing.inOut(Easing.quad),
  /** Standard ease curve approximating iOS default feel */
  standard: Easing.bezier(0.4, 0, 0.2, 1),
} as const

/** Springs for press feedback and small UI motion. */
export const motionSpring = {
  press: { stiffness: 420, damping: 28, mass: 0.35 },
  /** Snappy settle when reduce-motion is on (minimal overshoot). */
  pressReduced: { stiffness: 800, damping: 45, mass: 0.25 },
} as const

export const pressScaleDefault = 0.97
