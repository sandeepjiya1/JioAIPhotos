import { type ReactNode } from 'react'
import { cn } from '@/lib'

export interface SectionHeaderProps {
  title: string
  description?: string
  action?: ReactNode
  variant?: 'display' | 'heading'
  className?: string
}

export function SectionHeader({ title, description, action, variant = 'heading', className }: SectionHeaderProps) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <div className="flex items-center justify-between gap-3">
        <h2
          className={cn(
            'font-black leading-tight text-content-primary',
            variant === 'display' ? 'text-[28px]' : 'text-[22px]',
          )}
        >
          {title}
        </h2>
        {action && <div className="shrink-0">{action}</div>}
      </div>
      {description && (
        <p className="text-content-tertiary text-sm leading-snug">{description}</p>
      )}
    </div>
  )
}
