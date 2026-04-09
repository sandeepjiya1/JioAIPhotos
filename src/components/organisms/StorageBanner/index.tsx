import { cn } from '@/lib'
import { StorageBar } from '@/components/molecules'

const imgStoragePromo = '/assets/figma/storage-promotion-banner.png'

export interface StorageBannerProps {
  used: number
  total: number
  unit?: string
  /** Optional: makes the promotion banner tappable (e.g. invite flow). */
  onInvite?: () => void
  className?: string
}

export function StorageBanner({ used, total, unit = 'GB', onInvite, className }: StorageBannerProps) {
  const banner = (
    <div className="w-full overflow-hidden rounded-image aspect-[328/203]">
      <img
        src={imgStoragePromo}
        alt="Invite family and get 50GB free storage"
        className="size-full object-cover"
      />
    </div>
  )

  return (
    <section
      className={cn('flex flex-col gap-[27px]', className)}
      aria-label="Storage information"
    >
      {onInvite ? (
        <button
          type="button"
          onClick={onInvite}
          className="w-full cursor-pointer border-0 bg-transparent p-0 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
        >
          {banner}
        </button>
      ) : (
        banner
      )}

      <StorageBar used={used} total={total} unit={unit} variant="indicator" />
    </section>
  )
}
