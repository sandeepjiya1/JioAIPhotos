import { motion, useReducedMotion } from 'framer-motion'
import { Button } from '@/components/atoms'
import { cn } from '@/lib'
import { IPL_HOME_MOSAIC_ALTS, IPL_HOME_MOSAIC_IMAGES } from '@/lib/iplHeroHome'
import { tapScale } from '@/components/layout/PageTransition'

const COL_GAP = 'gap-2.5' // 10px — Figma 922:1204

export interface IplHomeThemeRailProps {
  heroImages: readonly string[]
  heroAlts: readonly string[]
  logos: readonly string[]
  labels: readonly string[]
  selectedIndex: number
  onSelectTeam: (index: number) => void
  onTryWithPhotos?: () => void
  className?: string
}

/** Side mosaic — index pairs into `IPL_HOME_MOSAIC_IMAGES` (Figma 922:1203). */
const MOSAIC_PAIRS: readonly [readonly [number, number], readonly [number, number], readonly [number, number], readonly [number, number]] = [
  [0, 1],
  [2, 3],
  [4, 5],
  [6, 7],
] as const

/** First pair: tall then short; second: short then tall (matches Figma column stacks). */
const STACK_A = 'tall-short' as const
const STACK_B = 'short-tall' as const
const COLUMN_STACKS: readonly (typeof STACK_A | typeof STACK_B)[] = [STACK_A, STACK_B, STACK_A, STACK_B]

function MosaicTile({
  src,
  alt,
  className,
}: {
  src: string
  alt: string
  className?: string
}) {
  return (
    <div
      className={cn(
        'relative shrink-0 overflow-hidden rounded-[10px]',
        className,
      )}
    >
      <img
        key={src}
        src={src}
        alt={alt}
        className="absolute inset-0 size-full object-cover"
        loading="lazy"
        decoding="async"
      />
    </div>
  )
}

function MosaicColumn({
  pair,
  stack,
  mosaicImages,
  mosaicAlts,
}: {
  pair: readonly [number, number]
  stack: typeof STACK_A | typeof STACK_B
  mosaicImages: readonly string[]
  mosaicAlts: readonly string[]
}) {
  const [a, b] = pair
  const srcA = mosaicImages[a] ?? mosaicImages[0]
  const srcB = mosaicImages[b] ?? mosaicImages[0]
  const altA = mosaicAlts[a] ?? ''
  const altB = mosaicAlts[b] ?? ''
  const tall = 'h-[245px] w-[183px]'
  const short = 'h-[101px] w-[181px]'

  if (stack === 'tall-short') {
    return (
      <div className={cn('flex shrink-0 flex-col', COL_GAP)}>
        <MosaicTile src={srcA} alt={altA} className={tall} />
        <MosaicTile src={srcB} alt={altB} className={short} />
      </div>
    )
  }
  return (
    <div className={cn('flex shrink-0 flex-col', COL_GAP)}>
      <MosaicTile src={srcA} alt={altA} className={short} />
      <MosaicTile src={srcB} alt={altB} className={tall} />
    </div>
  )
}

export function IplHomeThemeRail({
  heroImages,
  heroAlts,
  logos,
  labels,
  selectedIndex,
  onSelectTeam,
  onTryWithPhotos,
  className,
}: IplHomeThemeRailProps) {
  const reduceMotion = useReducedMotion() === true
  const mainSrc = heroImages[selectedIndex] ?? heroImages[0]
  const mainAlt = heroAlts[selectedIndex] ?? 'IPL theme'

  return (
    <div className={cn('flex w-full min-w-0 max-w-full flex-col gap-2', className)}>
      <div
        dir="ltr"
        className={cn(
          'flex w-full min-w-0 max-w-full flex-nowrap justify-start',
          COL_GAP,
          'touch-pan-x overflow-x-auto overflow-y-hidden px-4 scrollbar-hide',
        )}
        role="region"
        aria-label="IPL themes carousel"
      >
        <MosaicColumn
          pair={MOSAIC_PAIRS[0]}
          stack={COLUMN_STACKS[0]}
          mosaicImages={IPL_HOME_MOSAIC_IMAGES}
          mosaicAlts={IPL_HOME_MOSAIC_ALTS}
        />
        <MosaicColumn
          pair={MOSAIC_PAIRS[1]}
          stack={COLUMN_STACKS[1]}
          mosaicImages={IPL_HOME_MOSAIC_IMAGES}
          mosaicAlts={IPL_HOME_MOSAIC_ALTS}
        />

        <div
          className={cn(
            'flex w-[218px] shrink-0 flex-col gap-2 rounded-[12px] bg-primary-200 p-2',
            'overflow-x-clip overflow-y-visible',
          )}
        >
          <div className="relative w-full shrink-0 overflow-hidden rounded-[10px] bg-surface-3 aspect-[21/28]">
            <motion.img
              key={mainSrc}
              src={mainSrc}
              alt={mainAlt}
              className="absolute inset-0 size-full object-cover"
              initial={reduceMotion ? false : { opacity: 0.88 }}
              animate={{ opacity: 1 }}
              transition={{ duration: reduceMotion ? 0 : 0.22, ease: [0.4, 0, 0.2, 1] }}
            />
          </div>

          <div
            dir="ltr"
            className={cn(
              'flex min-w-0 max-w-full flex-nowrap justify-start gap-1.5 overflow-x-auto overflow-y-hidden scrollbar-hide',
            )}
            role="list"
            aria-label="IPL team themes"
          >
            {logos.map((src, i) => {
              const selected = i === selectedIndex
              const label = labels[i] ?? `Team ${i + 1}`
              return (
                <div key={`${src}-${i}`} role="listitem" className="shrink-0">
                  <motion.button
                    type="button"
                    aria-label={`Show ${label}`}
                    aria-pressed={selected}
                    onClick={() => onSelectTeam(i)}
                    whileTap={reduceMotion ? undefined : tapScale}
                    className={cn(
                      'relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-[14px] bg-[#15294a] p-0',
                      selected
                        ? 'border-2 border-[rgba(77,168,223,0.4)]'
                        : 'border border-transparent',
                    )}
                  >
                    <img
                      src={src}
                      alt=""
                      className="pointer-events-none size-full object-contain p-2"
                      loading="lazy"
                    />
                  </motion.button>
                </div>
              )
            })}
          </div>
        </div>

        <MosaicColumn
          pair={MOSAIC_PAIRS[2]}
          stack={COLUMN_STACKS[2]}
          mosaicImages={IPL_HOME_MOSAIC_IMAGES}
          mosaicAlts={IPL_HOME_MOSAIC_ALTS}
        />
        <MosaicColumn
          pair={MOSAIC_PAIRS[3]}
          stack={COLUMN_STACKS[3]}
          mosaicImages={IPL_HOME_MOSAIC_IMAGES}
          mosaicAlts={IPL_HOME_MOSAIC_ALTS}
        />
      </div>

      <div className="flex w-full justify-center px-4 pb-1 pt-1">
        <div className="w-full max-w-[234px]">
          <Button
            type="button"
            variant="secondary"
            size="pill"
            fullWidth
            className="font-bold"
            onClick={onTryWithPhotos}
          >
            Try with your photos
          </Button>
        </div>
      </div>
    </div>
  )
}
