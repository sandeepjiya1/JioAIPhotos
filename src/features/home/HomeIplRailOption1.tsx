/**
 * Home AI Avatars hero — **Figma JioAIPhotos — Journeys** `1305:22351`.
 * Five portrait cards in a horizontal rail; center column slightly wider/taller.
 * Section title comes from `HomeScreen` (`SectionHeader` + `HOME_IPL_AVATARS_SECTION_TITLE`).
 *
 * Carousel: centered when it fits; when wider than the viewport, starts scrolled to the middle
 * so users can pan left/right symmetrically (web + native).
 */
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Dimensions, ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native'
import { ResolvedImage } from '@/features/home/ResolvedImage'
import { moderateSize } from '@/theme/layoutScale'

const OPT_Q = '?v=20260429opt1'

const P = {
  a: `/assets/figma/a7ed993311a1cc52914fc631de4208c34972e240.png${OPT_Q}`,
  b: `/assets/figma/42c9f9d075cf45dbaeaad26c425f7db65887e190.png${OPT_Q}`,
  c: `/assets/figma/1f81154f8770fe7f7cf35e68dbc38369f786a84c.png${OPT_Q}`,
  d0: `/assets/figma/7abfb774275d76a8821f02411f303c5919b5502b.png${OPT_Q}`,
  d1: `/assets/figma/eeadd38ed6616d94f2f75420a7891dfd394a871d.png${OPT_Q}`,
  e: `/assets/figma/5b407a0b37a02bac0f7e6055215e424edba9efdf.png${OPT_Q}`,
} as const

export function getHomeIplOption1ImageWebPaths(): readonly string[] {
  return [P.a, P.b, P.c, P.d0, P.d1, P.e]
}

/** Design frame 360pt wide — slot widths / heights from Figma. */
const DESIGN_W = 360
const SIDE_W = 169
const CENTER_W = 182
const SIDE_H = 300.444
const CENTER_H = 323.556
const RAIL_GAP = 8
const CARD_RADIUS = 12

function scaleMetrics(ww: number) {
  const s = ww / DESIGN_W
  return {
    sideW: Math.round(SIDE_W * s),
    centerW: Math.round(CENTER_W * s),
    sideH: Math.round(SIDE_H * s),
    centerH: Math.round(CENTER_H * s),
    railGap: Math.round(RAIL_GAP * s),
    cardRadius: moderateSize(CARD_RADIUS, ww),
    padH: moderateSize(16, ww),
  }
}

/** Sum of card widths + gaps (no horizontal padding). */
function railContentWidth(m: ReturnType<typeof scaleMetrics>): number {
  return m.sideW * 4 + m.centerW + m.railGap * 4
}

function SideCard({ path, w, h, radius }: { path: string; w: number; h: number; radius: number }) {
  return (
    <View style={[styles.card, { width: w, height: h, borderRadius: radius }]}>
      <ResolvedImage webPath={path} style={StyleSheet.absoluteFillObject} resizeMode="cover" />
    </View>
  )
}

function CenterCard({ path, w, h, radius }: { path: string; w: number; h: number; radius: number }) {
  return (
    <View style={[styles.card, { width: w, height: h, borderRadius: radius }]}>
      <ResolvedImage webPath={path} style={StyleSheet.absoluteFillObject} resizeMode="cover" />
    </View>
  )
}

function DoubleCard({ base, overlay, w, h, radius }: { base: string; overlay: string; w: number; h: number; radius: number }) {
  return (
    <View style={[styles.card, { width: w, height: h, borderRadius: radius }]}>
      <ResolvedImage webPath={base} style={StyleSheet.absoluteFillObject} resizeMode="cover" />
      <View style={[StyleSheet.absoluteFillObject, { borderRadius: radius, overflow: 'hidden' }]} pointerEvents="none">
        <ResolvedImage webPath={overlay} style={StyleSheet.absoluteFillObject} resizeMode="cover" />
      </View>
    </View>
  )
}

function DarkPortCard({ path, w, h, radius }: { path: string; w: number; h: number; radius: number }) {
  return (
    <View style={[styles.card, { width: w, height: h, borderRadius: radius, backgroundColor: '#000' }]}>
      <ResolvedImage webPath={path} style={StyleSheet.absoluteFillObject} resizeMode="cover" />
    </View>
  )
}

export function HomeIplRailOption1() {
  const scrollRef = useRef<ScrollView>(null)
  const { width: winW } = useWindowDimensions()
  const ww = winW > 0 ? winW : Dimensions.get('window').width
  const m = useMemo(() => scaleMetrics(ww), [ww])

  const [viewportW, setViewportW] = useState(0)
  const [contentW, setContentW] = useState(0)

  const intrinsicW = useMemo(() => railContentWidth(m) + m.padH * 2, [m])

  const scrollToCenter = useCallback(() => {
    const vw = viewportW
    if (vw <= 0 || !scrollRef.current) return
    const cw = Math.max(contentW, intrinsicW)
    if (cw > vw) {
      const x = Math.max(0, (cw - vw) / 2)
      scrollRef.current.scrollTo({ x, animated: false })
    }
  }, [viewportW, contentW, intrinsicW])

  useLayoutEffect(() => {
    scrollToCenter()
  }, [scrollToCenter, m.sideW, m.centerW, m.railGap, m.padH])

  const onScrollLayout = useCallback((e: { nativeEvent: { layout: { width: number } } }) => {
    setViewportW(e.nativeEvent.layout.width)
  }, [])

  const onContentSizeChange = useCallback((w: number) => {
    setContentW(w)
  }, [])

  const minInnerW = viewportW > 0 ? viewportW : ww

  return (
    <View style={styles.wrap}>
      <ScrollView
        ref={scrollRef}
        horizontal
        style={styles.carouselScroll}
        showsHorizontalScrollIndicator={false}
        onLayout={onScrollLayout}
        onContentSizeChange={(w) => onContentSizeChange(w)}
        contentContainerStyle={[
          styles.rail,
          {
            gap: m.railGap,
            alignItems: 'center',
            paddingHorizontal: m.padH,
            minWidth: minInnerW,
            justifyContent: 'center',
          },
        ]}
        accessibilityRole="scrollbar"
        accessibilityLabel="AI Avatars carousel"
      >
        <SideCard path={P.a} w={m.sideW} h={m.sideH} radius={m.cardRadius} />
        <SideCard path={P.b} w={m.sideW} h={m.sideH} radius={m.cardRadius} />
        <CenterCard path={P.c} w={m.centerW} h={m.centerH} radius={m.cardRadius} />
        <DoubleCard base={P.d0} overlay={P.d1} w={m.sideW} h={m.sideH} radius={m.cardRadius} />
        <DarkPortCard path={P.e} w={m.sideW} h={m.sideH} radius={m.cardRadius} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    alignSelf: 'stretch',
  },
  carouselScroll: {
    alignSelf: 'stretch',
  },
  rail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  card: {
    overflow: 'hidden',
    position: 'relative',
  },
})
