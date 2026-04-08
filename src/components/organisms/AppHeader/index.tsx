import { type ReactNode } from 'react'
import { cn } from '@/lib'
import { Avatar } from '@/components/atoms'
import { Icon } from '@/components/atoms'

const imgProductLogo = '/assets/figma/3a1e52ece350c3cd3815a476bdd9c3ac93f6cc2f.svg'
const imgTempLogo    = '/assets/figma/b5227f239659a5a7d59a309a71035853050ce485.png'

export interface AppHeaderProps {
  avatarSrc?: string
  avatarFallback?: string
  onNotification?: () => void
  onProfile?: () => void
  /** Slot for additional right-side actions */
  rightSlot?: ReactNode
  className?: string
}

export function AppHeader({
  avatarSrc,
  avatarFallback,
  onNotification,
  onProfile,
  rightSlot,
  className,
}: AppHeaderProps) {
  return (
    <header
      className={cn(
        'sticky top-0 z-40 flex items-center justify-between h-14 px-4',
        'bg-surface-0/90 backdrop-blur-md border-b border-on-border/30',
        className,
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-1.5" aria-label="JioAI Photos">
        <img src={imgProductLogo} alt="Jio" className="size-8" />
        <img src={imgTempLogo}    alt="AI Photos" className="h-5 w-auto" />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {rightSlot}
        <button
          type="button"
          onClick={onNotification}
          aria-label="Notifications"
          className="size-8 flex items-center justify-center rounded-full active:bg-surface-2 transition-colors"
        >
          <Icon name="bell" size="sm" className="text-content-primary" />
        </button>
        <button
          type="button"
          onClick={onProfile}
          aria-label="Profile"
          className="rounded-full ring-2 ring-on-border overflow-hidden"
        >
          <Avatar src={avatarSrc} fallback={avatarFallback} size="sm" />
        </button>
      </div>
    </header>
  )
}
