import { useEffect, useState } from 'react'
import { AccessibilityInfo } from 'react-native'

/**
 * True when the user has enabled “Reduce Motion” (iOS) / “Remove animations” (Android).
 * Use to skip springs, layout transitions, and heavy entering animations.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    let cancelled = false
    const sync = (value: boolean) => {
      if (!cancelled) setReduced(value)
    }

    void AccessibilityInfo.isReduceMotionEnabled().then(sync)

    const sub = AccessibilityInfo.addEventListener('reduceMotionChanged', sync)
    return () => {
      cancelled = true
      sub.remove()
    }
  }, [])

  return reduced
}
