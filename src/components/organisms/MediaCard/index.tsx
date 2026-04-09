import { cn } from '@/lib'

export type MediaCardVariant = 'memory' | 'greeting' | 'trending' | 'square'

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
  memory:   'size-[220px] shrink-0',
  greeting: 'shrink-0 w-[175px] aspect-[9/16]',
  trending: 'shrink-0 w-[160px] aspect-[3/4]',
  square:   'aspect-square',
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
  return (
    <div
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
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
          <div className="absolute bottom-3 left-3 flex flex-col gap-2">
            {title && (
              <p className="text-content-primary text-2xl font-black leading-7 whitespace-pre-line">{title}</p>
            )}
            {date && (
              <p className="text-content-primary text-xs font-medium leading-snug">{date}</p>
            )}
          </div>
        </>
      )}
    </div>
  )
}
