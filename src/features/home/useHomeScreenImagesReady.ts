import { useEffect, useState } from 'react'
import { prefetchHomeScreenImages } from '@/features/home/prefetchHomeScreenImages'

const FAILSAFE_MS = 12_000

/**
 * Resolves when bundled home images are prefetched, or after {@link FAILSAFE_MS}
 * so a slow device never stays on skeleton forever.
 */
export function useHomeScreenImagesReady(): boolean {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    const failSafe = setTimeout(() => {
      if (!cancelled) setReady(true)
    }, FAILSAFE_MS)

    prefetchHomeScreenImages()
      .catch(() => undefined)
      .finally(() => {
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
