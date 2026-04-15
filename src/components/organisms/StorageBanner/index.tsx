import { cn } from '@/lib'
import { StorageBar } from '@/components/molecules'

const imgStoragePromo = '/assets/figma/storage-promotion-banner.png?v=20260415a'

/** Intrinsic size of `storage-promotion-banner.png` — keeps layout ratio and avoids crop. */
const STORAGE_PROMO_WIDTH = 656
const STORAGE_PROMO_HEIGHT = 368

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
    <div className="w-full overflow-hidden rounded-image">
      <img
        src={imgStoragePromo}
        width={STORAGE_PROMO_WIDTH}
        height={STORAGE_PROMO_HEIGHT}
        alt="Invite family and get 50GB free storage"
        className="block h-auto w-full max-w-full"
        decoding="async"
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
