import { type ReactNode } from 'react'
import { cn } from '@/lib'
import { Icon } from '@/components/atoms'

export interface HeroAction {
  label: string
  icon?: ReactNode
  onClick?: () => void
  variant?: 'share' | 'edit' | 'more'
}

export interface HeroMomentCardProps {
  image: string
  overlayImage?: string
  tagImage?: string
  thumbnails?: string[]
  onShare?: () => void
  onEdit?: () => void
  onMore?: () => void
  className?: string
}

export function HeroMomentCard({
  image,
  overlayImage,
  tagImage,
  thumbnails,
  onShare,
  onEdit,
  onMore,
  className,
}: HeroMomentCardProps) {
  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {/* Main card */}
      <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden">
        <img src={image} alt="Moment" className="absolute inset-0 size-full object-cover" />

        {overlayImage && (
          <img
            src={overlayImage}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 size-full object-cover mix-blend-overlay opacity-70"
          />
        )}

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(34,64,157,0.9)] via-[rgba(68,97,176,0.3)] to-transparent" />

        {/* Tag */}
        {tagImage && (
          <div className="absolute top-1/2 left-8 right-8">
            <img src={tagImage} alt="" aria-hidden="true" className="w-full object-contain max-h-24" />
          </div>
        )}

        {/* Action buttons */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2">
          <button
            type="button"
            onClick={onShare}
            aria-label="Share moment"
            className="flex-1 flex items-center justify-center gap-1.5 h-10 rounded-full glass text-content-primary text-sm font-bold"
          >
            <Icon name="share" size="sm" />
            Share
          </button>
          <button
            type="button"
            onClick={onEdit}
            aria-label="Edit moment"
            className="flex items-center justify-center gap-1.5 h-10 px-5 rounded-full glass text-content-primary text-sm font-bold"
          >
            <Icon name="edit" size="sm" />
            Edit
          </button>
          <button
            type="button"
            onClick={onMore}
            aria-label="More options"
            className="size-10 rounded-full glass flex items-center justify-center"
          >
            <Icon name="more-h" size="sm" />
          </button>
        </div>
      </div>

      {/* Thumbnail strip */}
      {thumbnails && thumbnails.length > 0 && (
        <div className="flex gap-2.5 overflow-x-auto scrollbar-hide">
          {thumbnails.map((src, i) => (
            <div
              key={i}
              className="shrink-0 size-14 rounded-[14px] overflow-hidden border border-on-border"
            >
              <img src={src} alt="" className="size-full object-cover" />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
