import { type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib'
import { Icon } from '@/components/atoms'
import { tapScale } from '@/lib/pageMotion'

export interface HeroAction {
  label: string
  icon?: ReactNode
  onClick?: () => void
  variant?: 'share' | 'edit' | 'more'
}

export interface HeroMomentSelectorStrip {
  logos: readonly string[]
  /** Per-thumb framing (e.g. Trending crop on one tile). */
  thumbImageClassNames?: readonly (string | undefined)[]
  selectedIndex: number
  onSelect: (index: number) => void
  labels: readonly string[]
  listAriaLabel: string
}

export interface HeroMomentCardProps {
  image: string
  /** Alt for the hero image (e.g. theme or moment description). */
  imageAlt?: string
  overlayImage?: string
  /** Hero image area aspect — default tall card; home uses a shorter banner. */
  aspectClassName?: string
  /** Smaller actions + tighter padding for dense layouts. */
  compact?: boolean
  /** Logo / poster strip (IPL teams, movies, etc.). */
  selectorStrip?: HeroMomentSelectorStrip
  onShare?: () => void
  onEdit?: () => void
  onMore?: () => void
  className?: string
}

export function HeroMomentCard({
  image,
  imageAlt = 'Moment',
  overlayImage,
  aspectClassName = 'aspect-[3/4]',
  compact = false,
  selectorStrip,
  onShare,
  onEdit,
  onMore,
  className,
}: HeroMomentCardProps) {
  const reduceMotion = useReducedMotion() === true
  const btnH = compact ? 'h-9' : 'h-10'
  const btnText = compact ? 'text-xs' : 'text-sm'
  const pad = compact ? 'bottom-3 left-3 right-3' : 'bottom-4 left-4 right-4'
  const moreBtn = compact ? 'size-9' : 'size-10'

  return (
    <div
      className={cn(
        'flex min-w-0 w-full max-w-full flex-col gap-2',
        selectorStrip && 'overflow-x-visible',
        className,
      )}
    >
      <div className={cn('relative w-full overflow-hidden rounded-image', aspectClassName)}>
        <motion.img
          key={image}
          src={image}
          alt={imageAlt}
          className="absolute inset-0 size-full object-cover"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduceMotion ? 0 : 0.28, ease: [0.4, 0, 0.2, 1] }}
        />

        {overlayImage && (
          <img
            src={overlayImage}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 size-full object-cover mix-blend-overlay opacity-70"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(34,64,157,0.9)] via-[rgba(68,97,176,0.3)] to-transparent" />

        <div className={cn('absolute flex items-center', compact ? 'gap-1.5' : 'gap-2', pad)}>
          <motion.button
            type="button"
            onClick={onShare}
            aria-label="Share moment"
            whileTap={reduceMotion ? undefined : tapScale}
            className={cn(
              'flex flex-1 items-center justify-center rounded-full glass font-bold text-content-primary',
              compact ? 'gap-1' : 'gap-1.5',
              btnH,
              btnText,
            )}
          >
            <Icon name="share" size="sm" />
            Share
          </motion.button>
          <motion.button
            type="button"
            onClick={onEdit}
            aria-label="Edit moment"
            whileTap={reduceMotion ? undefined : tapScale}
            className={cn(
              'flex items-center justify-center rounded-full glass font-bold text-content-primary',
              compact ? 'gap-1 px-3' : 'gap-1.5 px-4',
              btnH,
              btnText,
            )}
          >
            <Icon name="edit" size="sm" />
            Edit
          </motion.button>
          <motion.button
            type="button"
            onClick={onMore}
            aria-label="More options"
            whileTap={reduceMotion ? undefined : tapScale}
            className={cn('flex items-center justify-center rounded-full glass', moreBtn)}
          >
            <Icon name="more-h" size="sm" />
          </motion.button>
        </div>
      </div>

      {selectorStrip && selectorStrip.logos.length > 0 && (
        <div
          className={cn(
            // Full viewport-width scrollport (same idea as home rails’ -mx-4 px-4) so peers peek at the edges.
            'relative left-1/2 flex w-[100dvw] max-w-[100dvw] -translate-x-1/2 flex-nowrap',
            'touch-pan-x gap-[11px] overflow-x-auto overscroll-x-contain px-4 scrollbar-hide',
            // Let tiles keep their full border radius at the scrollport edge (avoid subpixel vertical clip).
            'py-px',
          )}
          role="list"
          aria-label={selectorStrip.listAriaLabel}
        >
          {selectorStrip.logos.map((src, i) => {
            const selected = i === selectorStrip.selectedIndex
            const label = selectorStrip.labels[i] ?? `Option ${i + 1}`
            const thumbExtra = selectorStrip.thumbImageClassNames?.[i]
            const frameClass = cn(
              'relative h-14 w-14 shrink-0 overflow-hidden rounded-[14px] border bg-surface-3 transition-colors',
              selected ? 'border-primary-400/40' : 'border-on-border',
            )

            return (
              <div key={`${src}-${i}`} role="listitem" className="shrink-0">
                <motion.button
                  type="button"
                  aria-label={`Show ${label}`}
                  aria-pressed={selected}
                  onClick={() => selectorStrip.onSelect(i)}
                  whileTap={reduceMotion ? undefined : tapScale}
                  className={cn(frameClass, 'size-14 cursor-pointer p-0')}
                >
                  <img
                    src={src}
                    alt=""
                    className={cn(
                      'pointer-events-none size-full',
                      thumbExtra ?? 'object-contain p-2',
                    )}
                    loading="lazy"
                  />
                </motion.button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
