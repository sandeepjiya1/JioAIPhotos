import { useEffect, useState } from 'react'

/**
 * Pixels of the layout viewport covered from below (e.g. virtual keyboard), using the
 * Visual Viewport API. Falls back to 0 when unavailable (SSR / older browsers).
 */
export function useVisualViewportBottomInset(): number {
  const [inset, setInset] = useState(0)

  useEffect(() => {
    const vv = window.visualViewport
    if (!vv) return

    const update = () => {
      setInset(Math.max(0, window.innerHeight - vv.height - vv.offsetTop))
    }

    update()
    vv.addEventListener('resize', update)
    vv.addEventListener('scroll', update)
    window.addEventListener('resize', update)

    return () => {
      vv.removeEventListener('resize', update)
      vv.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return inset
}
