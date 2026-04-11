import { useLayoutEffect, useState } from 'react'

/**
 * Pixel height of the visible viewport (Visual Viewport API when available).
 * iOS Safari often applies correct values only after first layout / scroll; this
 * re-reads on resize and visualViewport scroll/resize so flex `flex-1` shells fill the screen.
 */
export function useStableViewportHeight(): number {
  const [px, setPx] = useState(() =>
    typeof window !== 'undefined'
      ? Math.round(window.visualViewport?.height ?? window.innerHeight)
      : 0,
  )

  useLayoutEffect(() => {
    const read = () => {
      setPx(Math.round(window.visualViewport?.height ?? window.innerHeight))
    }
    read()
    window.addEventListener('resize', read)
    const vv = window.visualViewport
    vv?.addEventListener('resize', read)
    vv?.addEventListener('scroll', read)
    return () => {
      window.removeEventListener('resize', read)
      vv?.removeEventListener('resize', read)
      vv?.removeEventListener('scroll', read)
    }
  }, [])

  return px
}
