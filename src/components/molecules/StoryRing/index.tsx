import { cn } from '@/lib'
import { Avatar } from '@/components/atoms'
import { Icon } from '@/components/atoms'

export interface StoryRingProps {
  image?: string
  label: string
  /** If true, renders the "Create" variant with a + icon */
  isCreate?: boolean
  /** If true, renders with an active story ring */
  hasNew?: boolean
  onClick?: () => void
  className?: string
}

export function StoryRing({ image, label, isCreate = false, hasNew = false, onClick, className }: StoryRingProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn('flex flex-col items-center gap-[7px] shrink-0 active:opacity-70 transition-opacity', className)}
      aria-label={label}
    >
      {/* Ring wrapper */}
      <div
        className={cn(
          'p-[2px] rounded-full',
          hasNew
            ? 'bg-gradient-to-br from-primary-600 to-jio-teal'
            : 'border border-on-border',
        )}
      >
        <div className="size-[53px] rounded-full overflow-hidden bg-surface-0 flex items-center justify-center">
          {isCreate ? (
            <div className="size-full flex items-center justify-center border border-dashed border-on-border rounded-full">
              <Icon name="plus" size="sm" className="text-content-secondary" />
            </div>
          ) : (
            <Avatar src={image} size="lg" className="size-full" />
          )}
        </div>
      </div>

      <span className="inline-block max-w-[4.5rem] truncate text-center text-xs font-medium leading-tight text-content-primary">
        {label}
      </span>
    </button>
  )
}
