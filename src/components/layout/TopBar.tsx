import { type ReactNode } from 'react'
import { cn } from '@/lib'

export interface TopBarProps {
  title?: string
  left?: ReactNode
  right?: ReactNode
  transparent?: boolean
  className?: string
}

export function TopBar({ title, left, right, transparent = false, className }: TopBarProps) {
  return (
    <header
      className={cn(
        'relative flex items-center justify-between px-4 h-14 w-full safe-top',
        transparent
          ? 'bg-transparent'
          : 'bg-surface-0/80 backdrop-blur-md border-b border-on-border/30',
        className,
      )}
    >
      <div className="flex items-center gap-2 min-w-10">{left}</div>
      {title && (
        <h1 className="absolute left-1/2 -translate-x-1/2 text-base font-semibold text-content-primary truncate max-w-[60%]">
          {title}
        </h1>
      )}
      <div className="flex items-center gap-2 min-w-10 justify-end">{right}</div>
    </header>
  )
}
