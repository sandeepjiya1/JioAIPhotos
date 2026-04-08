import { useRef } from 'react'

export interface SwipeHandlers {
  onSwipeLeft?:  () => void
  onSwipeRight?: () => void
  onSwipeUp?:    () => void
  onSwipeDown?:  () => void
  threshold?: number
}

/**
 * useSwipe — returns touch event handlers for detecting directional swipes.
 *
 * @example
 *   const handlers = useSwipe({ onSwipeLeft: goNext, onSwipeRight: goPrev })
 *   return <div {...handlers}>...</div>
 */
export function useSwipe({
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  threshold = 50,
}: SwipeHandlers) {
  const startX = useRef(0)
  const startY = useRef(0)

  return {
    onTouchStart: (e: React.TouchEvent) => {
      startX.current = e.touches[0].clientX
      startY.current = e.touches[0].clientY
    },
    onTouchEnd: (e: React.TouchEvent) => {
      const dx = e.changedTouches[0].clientX - startX.current
      const dy = e.changedTouches[0].clientY - startY.current

      const absX = Math.abs(dx)
      const absY = Math.abs(dy)

      if (absX < threshold && absY < threshold) return

      if (absX >= absY) {
        // Horizontal swipe
        if (dx < 0 && onSwipeLeft)  onSwipeLeft()
        if (dx > 0 && onSwipeRight) onSwipeRight()
      } else {
        // Vertical swipe
        if (dy < 0 && onSwipeUp)   onSwipeUp()
        if (dy > 0 && onSwipeDown) onSwipeDown()
      }
    },
  }
}
