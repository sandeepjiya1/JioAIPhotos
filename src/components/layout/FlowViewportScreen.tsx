import {
  useLayoutEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from 'react'
import { cn } from '@/lib'
import { useStableViewportHeight } from '@/hooks/useStableViewportHeight'

export interface FlowViewportScreenProps {
  /** Scrollable / flex main column (hero, art, etc.) */
  main: ReactNode
  /** Pinned to the physical bottom; height is measured for main `padding-bottom` */
  footer: ReactNode
  className?: string
  mainClassName?: string
  footerClassName?: string
  /** Merged onto the viewport shell (e.g. `useSwipe` handlers, `select-none`) */
  rootProps?: Omit<HTMLAttributes<HTMLDivElement>, 'children'>
}

/**
 * Full-screen flow step: locks height to the visible viewport (iOS-safe) and pins
 * `footer` with `position: fixed`. Main area gets bottom padding equal to the measured
 * footer height so layout is correct on first paint without gestures.
 */
export function FlowViewportScreen({
  main,
  footer,
  className,
  mainClassName,
  footerClassName,
  rootProps,
}: FlowViewportScreenProps) {
  const viewportPx = useStableViewportHeight()
  const footerWrapRef = useRef<HTMLDivElement>(null)
  const [dockH, setDockH] = useState(0)

  useLayoutEffect(() => {
    const el = footerWrapRef.current
    if (!el) return
    const measure = () => setDockH(Math.ceil(el.getBoundingClientRect().height))
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const shellStyle =
    viewportPx > 0
      ? { height: viewportPx, minHeight: viewportPx, maxHeight: viewportPx }
      : undefined

  const { className: rpClass, style: rpStyle, ...rpRest } = rootProps ?? {}

  return (
    <div
      {...rpRest}
      className={cn(
        'flex min-h-svh h-dvh min-h-0 w-full flex-col overflow-hidden bg-surface-0',
        rpClass,
        className,
      )}
      style={{ ...shellStyle, ...(rpStyle as object) }}
    >
      <div
        className={cn(
          'relative z-10 flex min-h-0 w-full flex-1 flex-col overflow-hidden',
          dockH === 0 && 'flow-main-fallback-pad',
          mainClassName,
        )}
        style={dockH > 0 ? { paddingBottom: dockH } : undefined}
      >
        {main}
      </div>

      <div
        ref={footerWrapRef}
        className={cn(
          'fixed bottom-0 left-0 right-0 z-20 flex flex-col bg-surface-0',
          footerClassName,
        )}
      >
        {footer}
      </div>
    </div>
  )
}
