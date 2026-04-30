import { router } from 'expo-router'

/**
 * Post–sign-in journey (for now): **onboarding** → **permission** → home (via permission CTAs).
 * OTP always opens onboarding; finishing onboarding always opens permission.
 */
export function replaceToOnboarding() {
  router.replace('/onboarding')
}

export function replaceToPermissionIntro() {
  router.replace('/permission')
}
