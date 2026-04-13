import { type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib'
import { Avatar } from '@/components/atoms'
import { Icon } from '@/components/atoms'
import { tapScale } from '@/components/layout/PageTransition'

const imgProductLogo = '/assets/figma/3a1e52ece350c3cd3815a476bdd9c3ac93f6cc2f.svg'

export type AppHeaderTrailingIcon = 'bell' | 'search'

export interface AppHeaderProps {
  avatarSrc?: string
  avatarFallback?: string
  /** Icon before profile; default bell (notifications). */
  trailingIcon?: AppHeaderTrailingIcon
  /** Called when the trailing icon (bell or search) is pressed */
  onNotification?: () => void
  onProfile?: () => void
  /** Slot for additional right-side actions */
  rightSlot?: ReactNode
  className?: string
}

export function AppHeader({
  avatarSrc,
  avatarFallback,
  trailingIcon = 'bell',
  onNotification,
  onProfile,
  rightSlot,
  className,
}: AppHeaderProps) {
  const reduceMotion = useReducedMotion() === true
  const trailingAria = trailingIcon === 'search' ? 'Search' : 'Notifications'
  return (
    <header
      className={cn(
        'sticky top-0 z-40 flex items-center justify-between h-14 px-4',
        'bg-surface-0/90 backdrop-blur-md border-b border-on-border/30',
        className,
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-1.5" aria-label="Jio AI Photos">
        <img src={imgProductLogo} alt="" className="size-8 shrink-0" />
        <span
          className={cn(
            'text-xl font-black leading-none tracking-tight text-content-primary',
            '[font-family:var(--font-jio)]',
          )}
        >
          AIPhotos
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {rightSlot}
        <motion.button
          type="button"
          onClick={onNotification}
          aria-label={trailingAria}
          whileTap={reduceMotion ? undefined : tapScale}
          className="size-8 flex items-center justify-center rounded-full active:bg-surface-2 transition-colors"
        >
          <Icon name={trailingIcon} size="sm" className="text-content-primary" />
        </motion.button>
        <motion.button
          type="button"
          onClick={onProfile}
          aria-label="Profile"
          whileTap={reduceMotion ? undefined : tapScale}
          className="rounded-full ring-2 ring-on-border overflow-hidden"
        >
          <Avatar src={avatarSrc} fallback={avatarFallback} size="sm" />
        </motion.button>
      </div>
    </header>
  )
}
