import { cn } from '@/lib'
import { Button } from '@/components/atoms'
import { StorageBar } from '@/components/molecules'

const imgInvite = '/assets/figma/032bfe46a059793c4196f19fa0f01e723545dd87.png'

export interface StorageBannerProps {
  used: number
  total: number
  unit?: string
  onInvite?: () => void
  className?: string
}

export function StorageBanner({ used, total, unit = 'GB', onInvite, className }: StorageBannerProps) {
  return (
    <section
      className={cn(
        'rounded-2xl overflow-hidden bg-surface-0 border border-on-border/50',
        className,
      )}
      aria-label="Storage information"
    >
      <div className="flex items-center gap-4 p-4">
        <div className="flex-1 flex flex-col gap-3">
          <p className="text-content-primary text-sm font-bold leading-snug">
            Invite family member and get extra 50GB free
          </p>
          <Button
            variant="primary"
            size="sm"
            onClick={onInvite}
            className="self-start rounded-pill h-9 px-5"
          >
            Invite Now
          </Button>
        </div>
        <img src={imgInvite} alt="50GB free" className="h-24 w-auto object-contain shrink-0" />
      </div>

      <div className="px-4 pb-4">
        <StorageBar used={used} total={total} unit={unit} />
      </div>
    </section>
  )
}
