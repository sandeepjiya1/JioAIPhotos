/**
 * **Backup** — previous home IPL / AI Avatars hero (Figma `1210:42452` rail).
 * Kept when switching **Homepage Options → Option 1** off in Profile (`homePreferencesStore`).
 */
import { useEffect, useMemo, useRef } from 'react'
import {
  Dimensions,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
  type ImageResizeMode,
  type ViewStyle,
} from 'react-native'
import { ResolvedImage } from '@/features/home/ResolvedImage'
import { colors } from '@/theme/colors'
import { moderateSize } from '@/theme/layoutScale'

const IPL_FIGMA_Q = '?v=20260428b'
const IPL_HOME_HERO_Q = '?v=20260428b'

const LOGO_WELL_BG: readonly string[] = [
  '#15294a',
  '#1f4481',
  '#1f4481',
  '#1f4481',
  '#1f4481',
  '#15294a',
  '#15294a',
  '#15294a',
  '#15294a',
]

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

const IPL_LOGO_Q = '?v=20260429a'

const LOGOS = [
  `/assets/figma/b5113e3f9422b300d03f13aabd8c0a6572c0b364.png${IPL_LOGO_Q}`,
  `/assets/figma/1e7cb9012d0708c1ccd07731574b21d00fb1ee19.png${IPL_LOGO_Q}`,
  `/assets/figma/acb3e71bd1be383fefd23410eb8f2ba237cb579c.png${IPL_LOGO_Q}`,
  `/assets/figma/27136e6426a8ef6f3c38e8c26d26a00d0bd12cec.png${IPL_LOGO_Q}`,
  `/assets/figma/503b283584ff8b02c79a4b22a2ecd18e74e7a141.png${IPL_LOGO_Q}`,
  `/assets/figma/80a7afb26cde0512ec08a60d2a1b2765396fabb4.png${IPL_LOGO_Q}`,
  `/assets/figma/74416f5acde65a0356ae4afadffc010a242e4de2.png${IPL_LOGO_Q}`,
  `/assets/figma/c29d63c27e7df36494d7f3aff59b372f9c9f583a.png${IPL_LOGO_Q}`,
  `/assets/figma/5e18319f2a491e8950e8e7903851e0c43db912ab.png${IPL_LOGO_Q}`,
] as const

const LOGO_RESIZE: readonly ImageResizeMode[] = [
  'cover',
  'cover',
  'contain',
  'contain',
  'contain',
  'cover',
  'cover',
  'cover',
  'cover',
]

/** IPL legacy rail images for prefetch. */
export function getHomeIplLegacyImageWebPaths(): readonly string[] {
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

function useIplRailLayout() {
  const { width: winW } = useWindowDimensions()
  return useMemo(() => {
    const w = winW > 0 ? winW : Dimensions.get('window').width
    const ms = (n: number) => moderateSize(n, w)
    return {
      colGap: ms(8),
      mosaicW: ms(165),
      tallH: ms(220),
      shortH: ms(92),
      heroCardW: ms(203),
      heroPadTop: ms(4),
      heroPadH: ms(4),
      heroPadBottom: ms(8),
      heroImgH: ms(260),
      railPadH: ms(16),
      wrapGap: ms(8),
      heroCardRadius: ms(14),
      heroInnerRadius: ms(12),
      tileRadius: ms(12),
      logoRowGap: ms(6),
      logoPadH: ms(4),
      logoCell: ms(40),
      logoRadius: ms(8),
      screenW: w,
    }
  }, [winW])
}

export interface HomeIplRailLegacyProps {
  selectedIndex: number
  onSelectTeam: (i: number) => void
}

type IplL = ReturnType<typeof useIplRailLayout>

function MosaicColumn({
  layout,
  topTall,
  pair,
}: {
  layout: IplL
  topTall: boolean
  pair: readonly [number, number]
}) {
  const { mosaicW, colGap, tallH, shortH, tileRadius } = layout
  const [a, b] = pair
  const srcA = MOSAIC[a] ?? MOSAIC[0]
  const srcB = MOSAIC[b] ?? MOSAIC[0]
  const tileStyle = [styles.tile, { width: mosaicW, borderRadius: tileRadius }]
  const first = topTall ? (
    <>
      <ResolvedImage webPath={srcA} style={[tileStyle, { height: tallH }]} resizeMode="cover" />
      <View style={{ height: colGap }} />
      <ResolvedImage webPath={srcB} style={[tileStyle, { height: shortH }]} resizeMode="cover" />
    </>
  ) : (
    <>
      <ResolvedImage webPath={srcA} style={[tileStyle, { height: shortH }]} resizeMode="cover" />
      <View style={{ height: colGap }} />
      <ResolvedImage webPath={srcB} style={[tileStyle, { height: tallH }]} resizeMode="cover" />
    </>
  )
  return <View style={[styles.mosaicCol, { width: mosaicW }]}>{first}</View>
}

export function HomeIplRailLegacy({ selectedIndex, onSelectTeam }: HomeIplRailLegacyProps) {
  const scrollRef = useRef<ScrollView>(null)
  const L = useIplRailLayout()

  const heroPath = HERO_IMAGES[selectedIndex] ?? HERO_IMAGES[0]

  const colBlock = L.mosaicW + L.colGap
  const paddingOuter = L.railPadH
  const leftToHero = paddingOuter + colBlock * 2
  const targetX = Math.max(0, leftToHero + L.heroCardW / 2 - L.screenW / 2)

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ x: targetX, animated: true })
    })
    return () => cancelAnimationFrame(id)
  }, [selectedIndex, targetX])

  return (
    <View style={[styles.wrap, { gap: L.wrapGap }]}>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.railInner, { paddingHorizontal: L.railPadH }]}
        accessibilityRole="scrollbar"
        accessibilityLabel="AI Avatars carousel"
      >
        <MosaicColumn layout={L} topTall pair={MOSAIC_PAIRS[0]} />
        <View style={{ width: L.colGap }} />
        <MosaicColumn layout={L} topTall={false} pair={MOSAIC_PAIRS[1]} />
        <View style={{ width: L.colGap }} />

        <View
          style={[
            styles.heroCard,
            {
              width: L.heroCardW,
              borderRadius: L.heroCardRadius,
              paddingTop: L.heroPadTop,
              paddingHorizontal: L.heroPadH,
              paddingBottom: L.heroPadBottom,
              gap: L.wrapGap,
            },
          ]}
        >
          <View
            style={[
              styles.heroImgShell,
              {
                height: L.heroImgH,
                borderRadius: L.heroInnerRadius,
              },
            ]}
          >
            <ResolvedImage webPath={heroPath} style={StyleSheet.absoluteFillObject} resizeMode="cover" />
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[styles.logoRow, { gap: L.logoRowGap, paddingHorizontal: L.logoPadH }]}
          >
            {LOGOS.map((src, i) => {
              const selected = i === selectedIndex
              const wellBg = LOGO_WELL_BG[i] ?? '#15294a'
              return (
                <Pressable
                  key={`${src}-${i}`}
                  accessibilityRole="button"
                  accessibilityLabel={`Show ${LABELS[i] ?? `Team ${i + 1}`}`}
                  accessibilityState={{ selected }}
                  onPress={() => onSelectTeam(i)}
                  style={({ pressed }) => [
                    styles.logoCell,
                    {
                      width: L.logoCell,
                      height: L.logoCell,
                      borderRadius: L.logoRadius,
                    },
                    pressed && styles.logoCellPressed,
                  ]}
                >
                  <View style={[styles.logoWell, { backgroundColor: wellBg, borderRadius: L.logoRadius }]}>
                    <ResolvedImage
                      webPath={src}
                      style={StyleSheet.absoluteFillObject}
                      resizeMode={LOGO_RESIZE[i] ?? 'cover'}
                    />
                  </View>
                </Pressable>
              )
            })}
          </ScrollView>
        </View>

        <View style={{ width: L.colGap }} />
        <MosaicColumn layout={L} topTall pair={MOSAIC_PAIRS[2]} />
        <View style={{ width: L.colGap }} />
        <MosaicColumn layout={L} topTall={false} pair={MOSAIC_PAIRS[3]} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: 0,
  },
  railInner: {
    paddingVertical: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  mosaicCol: {
    flexDirection: 'column',
  },
  tile: {
    overflow: 'hidden',
  },
  heroCard: {
    backgroundColor: colors.primary600,
    overflow: 'hidden',
  },
  heroImgShell: {
    width: '100%',
    overflow: 'hidden',
    backgroundColor: colors.surface3,
    position: 'relative',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoCell: {
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: 'transparent',
    borderWidth: 0,
    ...Platform.select({
      web: {
        outlineWidth: 0,
        boxShadow: 'none',
        WebkitTapHighlightColor: 'transparent',
      } as ViewStyle,
      default: {},
    }),
  },
  logoCellPressed: {
    opacity: 0.88,
  },
  logoWell: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    overflow: 'hidden',
    borderWidth: 0,
  },
})
