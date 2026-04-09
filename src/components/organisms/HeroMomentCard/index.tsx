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
  /** Alt for the hero image (e.g. theme or moment description). */
  imageAlt?: string
  overlayImage?: string
  /** IPL team logo strip — Figma `IPLTeam_Logos` (488:9286): 56×56, gap 11px, radius 14px */
  iplTeamLogos?: readonly string[]
  /** With `onIplLogoSelect`, each logo is a control and this index shows the active border. */
  iplSelectedLogoIndex?: number
  onIplLogoSelect?: (index: number) => void
  /** Same length as `iplTeamLogos` — used for `aria-label` when logos are interactive. */
  iplTeamLogoLabels?: readonly string[]
  onShare?: () => void
  onEdit?: () => void
  onMore?: () => void
  className?: string
}

export function HeroMomentCard({
  image,
  imageAlt = 'Moment',
  overlayImage,
  iplTeamLogos,
  iplSelectedLogoIndex = 0,
  onIplLogoSelect,
  iplTeamLogoLabels,
  onShare,
  onEdit,
  onMore,
  className,
}: HeroMomentCardProps) {
  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {/* Main card */}
      <div className="relative w-full aspect-[3/4] rounded-image overflow-hidden">
        <img src={image} alt={imageAlt} className="absolute inset-0 size-full object-cover" />

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

      {/* IPL team logos — Figma IPLTeam_Logos */}
      {iplTeamLogos && iplTeamLogos.length > 0 && (
        <div
          className="-mx-4 flex gap-[11px] overflow-x-auto px-4 scrollbar-hide"
          role="list"
          aria-label="IPL team logos"
        >
          {iplTeamLogos.map((src, i) => {
            const selected = i === iplSelectedLogoIndex
            const label =
              iplTeamLogoLabels?.[i] ?? `IPL team ${i + 1}`
            const frameClass = cn(
              'relative h-14 w-14 shrink-0 overflow-hidden rounded-[14px] bg-surface-3 border transition-colors',
              selected ? 'border-primary-400/40' : 'border-on-border',
            )

            if (onIplLogoSelect) {
              return (
                <div key={`${src}-${i}`} role="listitem" className="shrink-0">
                  <button
                    type="button"
                    aria-label={`Show ${label} hero theme`}
                    aria-pressed={selected}
                    onClick={() => onIplLogoSelect(i)}
                    className={cn(frameClass, 'cursor-pointer p-0 size-14')}
                  >
                    <img
                      src={src}
                      alt=""
                      className="size-full object-contain p-2 pointer-events-none"
                      loading="lazy"
                    />
                  </button>
                </div>
              )
            }

            return (
              <div
                key={`${src}-${i}`}
                role="listitem"
                className={frameClass}
              >
                <img
                  src={src}
                  alt=""
                  className="size-full object-contain p-2"
                  loading="lazy"
                />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
