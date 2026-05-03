import { Easing } from 'react-native-reanimated'

/** Durations (ms) — keep in sync with native-stack `animationDuration` where used. */
export const motionDuration = {
  fast: 200,
  normal: 280,
  slow: 420,
} as const

/** Native stack transitions (ms). */
export const stackTransitionMs = motionDuration.normal

/**
 * Home nested stack uses `fade` on `router.replace` tab changes.
 * iOS needs a longer fade than Android for the transition to read clearly.
 */
export const homeTabFadeDurationMs = {
  /** Tab cross-fade (Home ↔ Photos) — slightly longer reads smoother on device. */
  ios: 380,
  default: 240,
} as const

/** Native-stack duration for journey pushes from the home shell (Android). iOS uses `default` push. */
export const homeJourneyStackAnimationMs = motionDuration.slow

/** Skeleton → feed first paint (Reanimated layout, ms). */
export const homeShellEnterDurationMs = 420

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

export const pressScaleDefault = 0.96

/** Home scroll-linked reveal: viewport edge → section top (px). */
export const scrollRevealRangePx = 160

/** Max upward shift (px) before a section is considered “revealed”. */
export const scrollRevealTranslateMax = 14

/** Slight fade-in so blocks never go fully transparent (readability). */
export const scrollRevealOpacityMin = 0.94
