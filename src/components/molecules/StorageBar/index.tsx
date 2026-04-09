import { cn } from '@/lib'
import { ProgressBar } from '@/components/atoms'

const backupCheckIcon = '/assets/figma/7a6c03f220dd2a00f6afea792253ca3616959da0.svg'

export interface StorageBarProps {
  /** Used storage in GB (or supplied unit) */
  used: number
  /** Total storage in GB (or supplied unit) */
  total: number
  unit?: string
  className?: string
  /**
   * `indicator` — home storage block (Figma Storage_Section).
   * `minimal` — compact bar + caption (e.g. profile card).
   */
  variant?: 'indicator' | 'minimal'
}

export function StorageBar({
  used,
  total,
  unit = 'GB',
  className,
  variant = 'minimal',
}: StorageBarProps) {
  if (variant === 'minimal') {
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

  return (
    <div className={cn('flex flex-col gap-2.5', className)}>
      <div className="flex flex-col gap-2.5">
        <div className="flex items-baseline justify-between gap-3">
          <span className="text-base font-medium text-content-secondary">Storage</span>
          <span className="text-base font-medium text-content-secondary tabular-nums shrink-0">
            {used} {unit} / {total} {unit}
          </span>
        </div>
        <ProgressBar
          value={used}
          max={total}
          height="thick"
          className="rounded-full bg-[#ebebec]"
          aria-label={`Storage: ${used} ${unit} of ${total} ${unit} used`}
        />
      </div>
      <div className="flex items-center justify-center gap-0.5">
        <img
          src={backupCheckIcon}
          alt=""
          className="size-[18px] shrink-0"
          aria-hidden
        />
        <p className="text-sm font-medium text-content-secondary">
          AI memories safely backed up
        </p>
      </div>
    </div>
  )
}
