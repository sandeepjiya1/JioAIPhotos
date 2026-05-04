import { useEffect, useState } from 'react'
import { prefetchHomeScreenImages } from '@/features/home/prefetchHomeScreenImages'

const FAILSAFE_MS = 12_000

/** Prefetch finished (success or attempt) — skip skeleton on later `HomeScreen` mounts. */
let homeImagesPrefetchSettled = false
/** In-flight warm so concurrent mounts share one `Promise.all`. */
let warmInflight: Promise<void> | null = null

/** After the feed has been shown once, skip the large shell `entering` layout animation on remounts. */
let homeShellContentDisplayedOnce = false

function warmHomeScreenImagesShared(): Promise<void> {
  if (homeImagesPrefetchSettled) return Promise.resolve()
  if (!warmInflight) {
    warmInflight = prefetchHomeScreenImages()
      .catch(() => undefined)
      .finally(() => {
        homeImagesPrefetchSettled = true
        warmInflight = null
      })
  }
  return warmInflight
}

/**
 * Call when the home shell mounts (`app/home/_layout`) so images decode before the user
 * opens the Home tab — first paint feels faster.
 */
export function startHomeScreenImageWarmup(): void {
  void warmHomeScreenImagesShared()
}

/** Mark after first paint of the real home feed (not skeleton) — suppresses repeat entrance motion. */
export function markHomeShellContentDisplayed(): void {
  homeShellContentDisplayedOnce = true
}

export function shouldAnimateHomeShellEntrance(): boolean {
  return !homeShellContentDisplayedOnce
}

/**
 * `true` once bundled home images have been warmed, **for the lifetime of the JS runtime**
 * (tab switches and stack pops remount `HomeScreen` but do not re-show the skeleton).
 */
export function useHomeScreenImagesReady(): boolean {
  const [ready, setReady] = useState(homeImagesPrefetchSettled)

  useEffect(() => {
    if (homeImagesPrefetchSettled) {
      return
    }

    let cancelled = false
    const failSafe = setTimeout(() => {
      if (!cancelled) {
        homeImagesPrefetchSettled = true
        setReady(true)
      }
    }, FAILSAFE_MS)

    void warmHomeScreenImagesShared().finally(() => {
      clearTimeout(failSafe)
      if (!cancelled) setReady(true)
    })

    return () => {
      cancelled = true
      clearTimeout(failSafe)
    }
  }, [])

  return ready
}
