import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib'
import { tapScale } from '@/lib/pageMotion'

export type MediaCardVariant = 'memory' | 'greeting' | 'greetingGrid' | 'trending' | 'square'

export interface MediaCardProps {
  variant?: MediaCardVariant
  image: string
  /** Override default `object-cover` + `inset-0` framing (e.g. Figma 488:9345 crop). */
  imageClassName?: string
  title?: string
  date?: string
  className?: string
  onClick?: () => void
}

const variantDimensions: Record<MediaCardVariant, string> = {
  /** ~160px tall × ~284px wide (~16:9) — matches previous compact IPL hero banner */
  memory: 'h-40 w-[min(17.75rem,calc(100vw-2.5rem))] shrink-0',
  greeting:      'shrink-0 w-[175px] aspect-[9/16]',
  /** Home “Send Wishes” 3×2 grid — full cell width, portrait tile */
  greetingGrid:  'w-full min-w-0 aspect-[3/4]',
  trending:      'shrink-0 w-[160px] aspect-[3/4]',
  square:        'aspect-square',
}

export function MediaCard({
  variant = 'square',
  image,
  imageClassName,
  title,
  date,
  className,
  onClick,
}: MediaCardProps) {
  const reduceMotion = useReducedMotion() === true
  return (
    <motion.div
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
      whileTap={reduceMotion ? undefined : tapScale}
      className={cn(
        'relative rounded-image overflow-hidden cursor-pointer',
        variantDimensions[variant],
        className,
      )}
    >
      <img
        src={image}
        alt={title ?? ''}
        className={cn(
          'absolute max-w-none pointer-events-none',
          imageClassName ?? 'inset-0 size-full object-cover',
        )}
      />

      {/* Overlay gradient for memory variant */}
      {(variant === 'memory' && (title || date)) && (
        <>
          <div className="absolute inset-0 gradient-up-black" />
          <div className="absolute bottom-2 left-2 right-2 flex min-w-0 flex-col gap-1">
            {title && (
              <p className="truncate text-lg font-black leading-snug text-content-primary">
                {title}
              </p>
            )}
            {date && (
              <p className="text-content-primary text-xs font-medium leading-snug">{date}</p>
            )}
          </div>
        </>
      )}

      {/* Send Wishes grid — bottom-centered label on dark fade (reference 3×2) */}
      {variant === 'greetingGrid' && title && (
        <>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
          <p className="text-home-wish-tile-label pointer-events-none absolute bottom-2.5 left-2 right-2 line-clamp-2">
            {title}
          </p>
        </>
      )}
    </motion.div>
  )
}
