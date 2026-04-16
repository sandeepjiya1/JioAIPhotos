import { useEffect, useRef } from 'react'
import { Dimensions, Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { router } from 'expo-router'
import { ResolvedImage } from '@/features/home/ResolvedImage'
import { Button } from '@/components/atoms/Button'
import { colors } from '@/theme/colors'

const IPL_FIGMA_Q = '?v=20260415e'
const IPL_HOME_HERO_Q = '?v=20260416b'

const HERO_IMAGES = [
  `/assets/figma/ipl-home-hero-mi.png${IPL_HOME_HERO_Q}`,
  `/assets/figma/ipl-home-hero-gt.png${IPL_HOME_HERO_Q}`,
  `/assets/figma/ipl-home-hero-kkr.png${IPL_HOME_HERO_Q}`,
  `/assets/figma/ipl-home-hero-rcb.png${IPL_HOME_HERO_Q}`,
  `/assets/figma/ipl-home-hero-csk.png${IPL_HOME_HERO_Q}`,
  `/assets/figma/ipl-home-hero-srh.png${IPL_HOME_HERO_Q}`,
  `/assets/figma/ipl-home-hero-dc.png${IPL_HOME_HERO_Q}`,
  `/assets/figma/ipl-home-hero-rr.png${IPL_HOME_HERO_Q}`,
  `/assets/figma/ipl-home-hero-lsg.png${IPL_HOME_HERO_Q}`,
] as const

const MOSAIC = [
  `/assets/figma/a5f72a49d75bde15d9e4a3f89d6bf19989eea054.png${IPL_FIGMA_Q}`,
  `/assets/figma/2012fbf78efa3303e2f3adb9142f8fa9201b76cb.png${IPL_FIGMA_Q}`,
  `/assets/figma/dd9dafcd4f007ab414e14b0d50e0c85d91b212b1.png${IPL_FIGMA_Q}`,
  `/assets/figma/643cb9bd550e2b173b4ac8cbf066d44a20666d2c.png${IPL_FIGMA_Q}`,
  `/assets/figma/939728a9ed079e36192530f18f21087ecbdf96f4.png${IPL_FIGMA_Q}`,
  `/assets/figma/ae2cc12cec05ea429c1904d4f9fd9eeea58ed399.png${IPL_FIGMA_Q}`,
  `/assets/figma/0a736c54b6e4462ec7e05213c6f868d3016dff1f.png${IPL_FIGMA_Q}`,
  `/assets/figma/6650638bb8a01c1d6d44c8c5fb71ffb1b3512b57.png${IPL_FIGMA_Q}`,
] as const

const LOGOS = [
  `/assets/figma/277f1a1038cf4600b17f6723a28c11133b9c42a5.png`,
  `/assets/figma/ce031bae6f109c931e6e8c54c91c1b80d7cddd30.jpg`,
  `/assets/figma/fd2f7ce9ab67910301d015e53f3cd620d0051927.jpg`,
  `/assets/figma/9d6d5c6ff44924f668f3e336b96bd4380d7c1ec2.jpg`,
  `/assets/figma/705537c0d3b7be60ebf845f2184b6902e544f36e.jpg`,
  `/assets/figma/80a7afb26cde0512ec08a60d2a1b2765396fabb4.jpg`,
  `/assets/figma/74416f5acde65a0356ae4afadffc010a242e4de2.jpg`,
  `/assets/figma/c29d63c27e7df36494d7f3aff59b372f9c9f583a.jpg`,
  `/assets/figma/5e18319f2a491e8950e8e7903851e0c43db912ab.jpg`,
] as const

/** All IPL rail images (heroes, mosaic, logos) for prefetch — keep in sync with arrays above. */
export function getHomeIplImageWebPaths(): readonly string[] {
  const merged = [...HERO_IMAGES, ...MOSAIC, ...LOGOS] as string[]
  const seen = new Set<string>()
  const out: string[] = []
  for (const p of merged) {
    const key = (p.split('?')[0] ?? p).split('/').pop()?.trim() ?? p
    if (seen.has(key)) continue
    seen.add(key)
    out.push(p)
  }
  return out
}

const LABELS = [
  'Mumbai Indians',
  'Gujarat Titans',
  'Kolkata Knight Riders',
  'Royal Challengers Bangalore',
  'Chennai Super Kings',
  'Sunrisers Hyderabad',
  'Delhi Capitals',
  'Rajasthan Royals',
  'Lucknow Super Giants',
] as const

const MOSAIC_PAIRS: readonly [readonly [number, number], readonly [number, number], readonly [number, number], readonly [number, number]] = [
  [0, 1],
  [2, 3],
  [4, 5],
  [6, 7],
]

/** Figma / web `IplHomeThemeRail` — `h-[245px] w-[183px]` tall, `h-[101px] w-[181px]` short, `gap-2.5`. */
const COL_GAP = 10
const MOSAIC_W = 183
const TALL_H = 245
const SHORT_H = 101
const HERO_W = 218
const HERO_PAD = 8
const HERO_INNER_W = HERO_W - HERO_PAD * 2
const HERO_IMG_H = Math.round((HERO_INNER_W * 28) / 21)
const LOGO_CELL = 56
const LOGO_INSET = 6

interface HomeIplRailProps {
  selectedIndex: number
  onSelectTeam: (i: number) => void
}

function MosaicColumn({
  topTall,
  pair,
}: {
  topTall: boolean
  pair: readonly [number, number]
}) {
  const [a, b] = pair
  const srcA = MOSAIC[a] ?? MOSAIC[0]
  const srcB = MOSAIC[b] ?? MOSAIC[0]
  const first = topTall ? (
    <>
      <ResolvedImage webPath={srcA} style={[styles.tile, { height: TALL_H }]} resizeMode="cover" />
      <View style={{ height: COL_GAP }} />
      <ResolvedImage webPath={srcB} style={[styles.tile, { height: SHORT_H }]} resizeMode="cover" />
    </>
  ) : (
    <>
      <ResolvedImage webPath={srcA} style={[styles.tile, { height: SHORT_H }]} resizeMode="cover" />
      <View style={{ height: COL_GAP }} />
      <ResolvedImage webPath={srcB} style={[styles.tile, { height: TALL_H }]} resizeMode="cover" />
    </>
  )
  return <View style={styles.mosaicCol}>{first}</View>
}

export function HomeIplRail({ selectedIndex, onSelectTeam }: HomeIplRailProps) {
  const scrollRef = useRef<ScrollView>(null)
  const screenW = Dimensions.get('window').width

  const heroPath = HERO_IMAGES[selectedIndex] ?? HERO_IMAGES[0]

  const paddingOuter = 16
  const colBlock = MOSAIC_W + COL_GAP
  const leftToHero = paddingOuter + colBlock * 2
  const targetX = Math.max(0, leftToHero + HERO_W / 2 - screenW / 2)

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ x: targetX, animated: true })
    })
    return () => cancelAnimationFrame(id)
  }, [selectedIndex, targetX])

  return (
    <View style={styles.wrap}>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.railInner}
        accessibilityRole="scrollbar"
        accessibilityLabel="IPL themes carousel"
      >
        <MosaicColumn topTall pair={MOSAIC_PAIRS[0]} />
        <View style={{ width: COL_GAP }} />
        <MosaicColumn topTall={false} pair={MOSAIC_PAIRS[1]} />
        <View style={{ width: COL_GAP }} />

        <View style={styles.heroCard}>
          <View style={styles.heroImgShell}>
            <ResolvedImage webPath={heroPath} style={StyleSheet.absoluteFillObject} resizeMode="cover" />
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.logoRow}>
            {LOGOS.map((src, i) => {
              const selected = i === selectedIndex
              return (
                <Pressable
                  key={`${src}-${i}`}
                  accessibilityRole="button"
                  accessibilityLabel={`Show ${LABELS[i] ?? `Team ${i + 1}`}`}
                  accessibilityState={{ selected }}
                  onPress={() => onSelectTeam(i)}
                  style={[styles.logoCell, selected && styles.logoCellSelected]}
                >
                  <View style={styles.logoInset}>
                    <ResolvedImage webPath={src} style={StyleSheet.absoluteFillObject} resizeMode="cover" />
                  </View>
                </Pressable>
              )
            })}
          </ScrollView>
        </View>

        <View style={{ width: COL_GAP }} />
        <MosaicColumn topTall pair={MOSAIC_PAIRS[2]} />
        <View style={{ width: COL_GAP }} />
        <MosaicColumn topTall={false} pair={MOSAIC_PAIRS[3]} />
      </ScrollView>

      <View style={styles.ctaWrap}>
        <View style={styles.ctaMax}>
          <Button variant="secondary" size="pill" fullWidth onPress={() => router.push('/home/create')}>
            Try with your photos
          </Button>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: 8,
    gap: 8,
  },
  railInner: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  mosaicCol: {
    width: MOSAIC_W,
    flexDirection: 'column',
  },
  tile: {
    width: MOSAIC_W,
    borderRadius: 10,
    overflow: 'hidden',
  },
  heroCard: {
    width: HERO_W,
    borderRadius: 12,
    backgroundColor: colors.primary200,
    padding: HERO_PAD,
    gap: 8,
  },
  heroImgShell: {
    width: '100%',
    height: HERO_IMG_H,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: colors.surface3,
    position: 'relative',
  },
  logoRow: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    paddingRight: 4,
  },
  logoCell: {
    width: LOGO_CELL,
    height: LOGO_CELL,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: colors.surface3,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  logoCellSelected: {
    borderWidth: 2,
    borderColor: 'rgba(77,168,223,0.45)',
  },
  logoInset: {
    position: 'absolute',
    top: LOGO_INSET,
    left: LOGO_INSET,
    right: LOGO_INSET,
    bottom: LOGO_INSET,
    borderRadius: 10,
    overflow: 'hidden',
  },
  ctaWrap: {
    paddingHorizontal: 16,
    alignItems: 'center',
    paddingBottom: 4,
    paddingTop: 4,
  },
  ctaMax: {
    width: '100%',
    maxWidth: 234,
  },
})
