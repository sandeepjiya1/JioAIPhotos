import { cn } from '@/lib'

export interface ProgressBarProps {
  /** 0–max */
  value: number
  max?: number
  className?: string
  trackClassName?: string
  fillClassName?: string
  height?: 'thin' | 'default' | 'thick'
  'aria-label'?: string
}

const heightClasses = {
  thin:    'h-1',
  default: 'h-1.5',
  thick:   'h-2',
}

export function ProgressBar({
  value,
  max = 100,
  className,
  trackClassName,
  fillClassName,
  height = 'default',
  'aria-label': label = 'Progress',
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))

  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={label}
      className={cn('w-full rounded-full bg-surface-3 overflow-hidden', heightClasses[height], className)}
    >
      <div
        className={cn('h-full rounded-full bg-primary-600 transition-all duration-300', trackClassName, fillClassName)}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
