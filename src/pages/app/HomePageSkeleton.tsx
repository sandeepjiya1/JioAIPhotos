import { cn } from '@/lib'

function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-lg bg-surface-3/90 motion-reduce:animate-none',
        className,
      )}
    />
  )
}

/**
 * Shown while the lazy `HomePage` chunk loads — mirrors layout so the transition feels continuous.
 */
export function HomePageSkeleton() {
  return (
    <div
      className="flex min-h-dvh w-full min-w-0 max-w-full flex-col bg-surface-0"
      aria-busy="true"
      aria-label="Loading home"
    >
      {/* Header — matches AppHeader */}
      <header
        className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-on-border/30 bg-surface-0/90 px-4 backdrop-blur-md"
        aria-hidden="true"
      >
        <div className="flex items-center gap-2">
          <Shimmer className="size-8 shrink-0 rounded-lg" />
          <Shimmer className="h-6 w-24 rounded-md" />
        </div>
        <div className="flex items-center gap-3">
          <Shimmer className="size-8 shrink-0 rounded-full" />
          <Shimmer className="size-8 shrink-0 rounded-full" />
        </div>
      </header>

      <div className="min-w-0 w-full max-w-full flex-1 overflow-y-auto pb-36 scrollbar-hide">
        {/* Stories rail */}
        <div className="flex min-w-0 gap-3.5 overflow-x-auto px-3.5 pb-[7px] pt-2 scrollbar-hide">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex w-16 shrink-0 flex-col items-center gap-2">
              <Shimmer className="size-[58px] shrink-0 rounded-full" />
              <Shimmer className="h-2.5 w-12 rounded" />
            </div>
          ))}
        </div>

        {/* IPL hero block */}
        <div className="mt-2 min-w-0 overflow-x-visible px-4">
          <Shimmer className="aspect-square w-full max-w-full rounded-image" />
          <div className="relative left-1/2 mt-2 flex w-[100dvw] max-w-[100dvw] -translate-x-1/2 gap-[11px] overflow-x-auto overscroll-x-contain px-4 pb-px pt-1 scrollbar-hide">
            {Array.from({ length: 9 }).map((_, i) => (
              <Shimmer key={i} className="size-14 shrink-0 rounded-[14px]" />
            ))}
          </div>
        </div>

        {/* My Memories */}
        <section className="mt-6 flex flex-col gap-3 px-4">
          <Shimmer className="h-6 w-40 rounded-md" />
          <div className="flex gap-4 overflow-x-auto -mx-4 px-4 scrollbar-hide">
            {Array.from({ length: 3 }).map((_, i) => (
              <Shimmer
                key={i}
                className="h-40 w-[min(17.75rem,calc(100vw-2.5rem))] shrink-0 rounded-image"
              />
            ))}
          </div>
        </section>

        {/* Send Wishes grid */}
        <section className="mt-6 flex flex-col gap-3 px-4">
          <Shimmer className="h-6 w-36 rounded-md" />
          <div className="grid grid-cols-3 gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <Shimmer key={i} className="aspect-[3/4] w-full rounded-image" />
            ))}
          </div>
        </section>

        {/* Recent AI creations */}
        <section className="mt-6 flex flex-col gap-3 px-4">
          <Shimmer className="h-6 w-52 rounded-md" />
          <div className="flex gap-3 overflow-x-auto -mx-4 px-4 scrollbar-hide">
            {Array.from({ length: 3 }).map((_, i) => (
              <Shimmer key={i} className="h-[213px] w-[160px] shrink-0 rounded-image" />
            ))}
          </div>
        </section>

        {/* My Photos grid */}
        <section className="mt-6 flex flex-col gap-3 px-4">
          <Shimmer className="h-6 w-32 rounded-md" />
          <div className="grid grid-cols-3 gap-1 overflow-hidden rounded-image">
            {Array.from({ length: 9 }).map((_, i) => (
              <Shimmer key={i} className="aspect-square w-full" />
            ))}
          </div>
        </section>

        {/* Storage */}
        <div className="mx-4 mt-6">
          <Shimmer className="aspect-[328/203] w-full rounded-image" />
        </div>

        <div className="h-4" />
      </div>
    </div>
  )
}
