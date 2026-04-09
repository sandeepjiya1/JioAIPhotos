import { type ReactNode } from 'react'
import { cn } from '@/lib'

export interface SectionHeaderProps {
  title: string
  description?: string
  action?: ReactNode
  variant?: 'display' | 'heading'
  /** Semantic level for the title (default `h2`). Home rails use `h3` with `variant="heading"`. */
  titleAs?: 'h2' | 'h3'
  /** `start` (default) — use on HomePage section rails. `center` only for non-home layouts that explicitly need centered headings. */
  titleAlign?: 'start' | 'center'
  className?: string
}

export function SectionHeader({
  title,
  description,
  action,
  variant = 'heading',
  titleAs = 'h2',
  titleAlign = 'start',
  className,
}: SectionHeaderProps) {
  const centered = titleAlign === 'center'
  const TitleTag = titleAs

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
        <TitleTag
          className={cn(
            'font-black leading-tight text-content-primary',
            variant === 'display' ? 'text-[28px]' : 'text-[22px]',
            centered && 'text-center',
          )}
        >
          {title}
        </TitleTag>
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
