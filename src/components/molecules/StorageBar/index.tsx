import { cn } from '@/lib'
import { ProgressBar } from '@/components/atoms'

export interface StorageBarProps {
  /** Used storage in GB (or supplied unit) */
  used: number
  /** Total storage in GB (or supplied unit) */
  total: number
  unit?: string
  className?: string
}

export function StorageBar({ used, total, unit = 'GB', className }: StorageBarProps) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <ProgressBar
        value={used}
        max={total}
        height="thin"
        trackClassName="bg-primary-600/20"
        aria-label={`Storage: ${used} ${unit} of ${total} ${unit} used`}
      />
      <p className="text-xs text-content-tertiary">
        {used} {unit} / {total} {unit}
      </p>
    </div>
  )
}
