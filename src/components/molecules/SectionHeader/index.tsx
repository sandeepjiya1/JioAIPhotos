import { type ReactNode } from 'react'
import { cn } from '@/lib'

export interface SectionHeaderProps {
  title: string
  description?: string
  action?: ReactNode
  variant?: 'display' | 'heading'
  /** `start` (default) — use on HomePage section rails. `center` only for non-home layouts that explicitly need centered headings. */
  titleAlign?: 'start' | 'center'
  className?: string
}

export function SectionHeader({
  title,
  description,
  action,
  variant = 'heading',
  titleAlign = 'start',
  className,
}: SectionHeaderProps) {
  const centered = titleAlign === 'center'

  return (
    <div
      className={cn(
        'flex flex-col gap-1',
        centered && 'items-center text-center',
        className,
      )}
    >
      <div
        className={cn(
          'flex w-full items-center gap-3',
          centered ? 'justify-center' : 'justify-between',
        )}
      >
        <h2
          className={cn(
            'font-black leading-tight text-content-primary',
            variant === 'display' ? 'text-[28px]' : 'text-[22px]',
            centered && 'text-center',
          )}
        >
          {title}
        </h2>
        {action && <div className="shrink-0">{action}</div>}
      </div>
      {description && (
        <p
          className={cn(
            'text-content-tertiary text-sm leading-snug',
            centered && 'max-w-sm text-center',
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
