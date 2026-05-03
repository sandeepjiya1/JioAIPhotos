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

/**
 * Navigate to the home shell without leaving auth-flow screens under the root stack.
 * Otherwise iOS/Android back gestures can return to login after `replace('/home')` alone.
 */
export function replaceToHome() {
  router.dismissAll()
  router.replace('/home')
}
