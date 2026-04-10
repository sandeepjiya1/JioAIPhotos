import { type ReactNode } from 'react'
import { cn } from '@/lib'
import { useVisualViewportBottomInset } from '@/hooks/useVisualViewportBottomInset'

const footerPadClass =
  'pb-[max(2.5rem,env(safe-area-inset-bottom,0px))]' as const

function KeyboardLiftFooter({ children }: { children: ReactNode }) {
  const keyboardInset = useVisualViewportBottomInset()

  return (
    <div
      className={cn(
        'shrink-0 px-6 pt-2 bg-surface-0',
        footerPadClass,
        keyboardInset > 0 && 'transition-[transform] duration-150 ease-out',
      )}
      style={
        keyboardInset > 0
          ? { transform: `translateY(-${keyboardInset}px)` }
          : undefined
      }
    >
      {children}
    </div>
  )
}

function StaticAuthFooter({ children }: { children: ReactNode }) {
  return (
    <div className={cn('shrink-0 px-6 pt-2 bg-surface-0', footerPadClass)}>
      {children}
    </div>
  )
}

export interface AuthLayoutProps {
  children: ReactNode
  /** Content rendered below the status bar spacer */
  headerSlot?: ReactNode
  /** Content pinned at the bottom (outside the scroll area). */
  footerSlot?: ReactNode
  /**
   * When true with `footerSlot`, lifts the footer by the visual viewport bottom inset
   * (e.g. phone keyboard) so CTAs stay visible. Use on login / OTP-style screens.
   */
  keyboardAwareFooter?: boolean
  className?: string
}

/**
 * AuthLayout — shared wrapper for all auth screens.
 *
 * Provides:
 *   - Full-screen dark surface
 *   - Safe-area top spacer (h-14)
 *   - Flex column with content area + optional pinned footer
 */
export function AuthLayout({
  children,
  headerSlot,
  footerSlot,
  keyboardAwareFooter = false,
  className,
}: AuthLayoutProps) {
  return (
    <div className={cn('flex flex-col w-full h-dvh min-h-0 bg-surface-0', className)}>
      {/* Status bar / safe area top spacer */}
      <div className="h-14 shrink-0" aria-hidden="true" />

      {headerSlot && (
        <div className="px-6 shrink-0">{headerSlot}</div>
      )}

      {/* Main scrollable content — min-h-0 so flex child can shrink on mobile */}
      <div
        className={cn(
          'flex flex-1 flex-col min-h-0 overflow-y-auto px-6',
          footerSlot ? 'pb-4' : 'justify-between pb-10',
        )}
      >
        {children}
      </div>

      {footerSlot &&
        (keyboardAwareFooter ? (
          <KeyboardLiftFooter>{footerSlot}</KeyboardLiftFooter>
        ) : (
          <StaticAuthFooter>{footerSlot}</StaticAuthFooter>
        ))}
    </div>
  )
}
