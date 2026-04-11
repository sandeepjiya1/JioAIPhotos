import { type ReactNode } from 'react'
import { cn } from '@/lib'
import { useVisualViewportBottomInset } from '@/hooks/useVisualViewportBottomInset'

function KeyboardLiftFooter({ children }: { children: ReactNode }) {
  const keyboardInset = useVisualViewportBottomInset()

  return (
    <div
      className={cn(
        'auth-screen-px auth-cta-bottom-pad shrink-0 bg-surface-0 pt-2',
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
    <div className="auth-screen-px auth-cta-bottom-pad shrink-0 bg-surface-0 pt-2">
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
 *   - Safe-area-aware top spacer (`auth-top-spacer`)
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
      <div className="auth-top-spacer" aria-hidden="true" />

      {headerSlot && (
        <div className="auth-screen-px shrink-0">{headerSlot}</div>
      )}

      {/* Main scrollable content — min-h-0 so flex child can shrink on mobile */}
      <div
        className={cn(
          'auth-screen-px flex min-h-0 flex-1 flex-col overflow-y-auto',
          footerSlot ? 'pb-4' : 'auth-cta-bottom-pad justify-between',
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
