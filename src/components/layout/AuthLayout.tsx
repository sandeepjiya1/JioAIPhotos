import { type ReactNode } from 'react'
import { cn } from '@/lib'

export interface AuthLayoutProps {
  children: ReactNode
  /** Content rendered below the status bar spacer */
  headerSlot?: ReactNode
  /** Content pinned at the bottom */
  footerSlot?: ReactNode
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
export function AuthLayout({ children, headerSlot, footerSlot, className }: AuthLayoutProps) {
  return (
    <div className={cn('flex flex-col w-full h-dvh bg-surface-0', className)}>
      {/* Status bar / safe area top spacer */}
      <div className="h-14 shrink-0" aria-hidden="true" />

      {headerSlot && (
        <div className="px-6 shrink-0">{headerSlot}</div>
      )}

      {/* Main scrollable content area */}
      <div className="flex flex-1 flex-col justify-between px-6 pb-10 overflow-y-auto">
        {children}
      </div>

      {/* Pinned footer (optional) */}
      {footerSlot && (
        <div className="px-6 pb-10 shrink-0">{footerSlot}</div>
      )}
    </div>
  )
}
