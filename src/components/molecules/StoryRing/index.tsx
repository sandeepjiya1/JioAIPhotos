import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib'
import { Avatar } from '@/components/atoms'
import { Icon } from '@/components/atoms'
import { tapScale } from '@/components/layout/PageTransition'

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
  const reduceMotion = useReducedMotion() === true
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={reduceMotion ? undefined : tapScale}
      className={cn(
        // Figma 488:9245 — column width clears ~58px ring; stretch aligns label baselines
        // manipulation: allow horizontal scroll through buttons (nested scroll + iOS)
        'flex w-16 min-w-16 shrink-0 touch-manipulation flex-col items-stretch active:opacity-70 transition-opacity',
        className,
      )}
      aria-label={label}
    >
      <div className="flex min-h-0 flex-1 flex-col justify-end items-center pb-[7px]">
        <div
          className={cn(
            'rounded-full p-[2px]',
            hasNew
              ? 'bg-gradient-to-br from-primary-600 to-jio-teal'
              : 'border border-on-border',
          )}
        >
          {/* Inner ~53.67px — Figma Avatar frame */}
          <div className="flex size-[54px] items-center justify-center overflow-hidden rounded-full bg-surface-0">
            {isCreate ? (
              <div className="flex size-full items-center justify-center rounded-full border border-dashed border-on-border">
                <Icon name="plus" size="sm" className="text-content-secondary" />
              </div>
            ) : (
              <Avatar src={image} size="lg" className="size-full min-h-0 min-w-0" />
            )}
          </div>
        </div>
      </div>

      <span className="mt-0 inline-block max-w-[4.5rem] truncate text-center text-xs font-normal leading-label-2xs text-content-primary">
        {label}
      </span>
    </motion.button>
  )
}
