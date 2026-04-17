import { useEffect, useMemo } from 'react'
import { Animated, ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { colors } from '@/theme/colors'

const SECTION_PAD = 16
const SHIMMER = colors.surface3

function ShimmerBlock({
  style,
  opacity,
}: {
  style?: object
  opacity: Animated.Value
}) {
  return <Animated.View style={[styles.shim, style, { opacity }]} />
}

/**
 * Layout mirror of `HomeScreen` / web `HomePageSkeleton` while images prefetch.
 */
export function HomeScreenSkeleton() {
  const insets = useSafeAreaInsets()
  const { width: winW } = useWindowDimensions()
  const pulse = useMemo(() => new Animated.Value(0.45), [])

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 0.82, duration: 700, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0.45, duration: 700, useNativeDriver: true }),
      ]),
    )
    loop.start()
    return () => loop.stop()
  }, [pulse])

  const inner = Math.max(1, winW - SECTION_PAD * 2)
  const greetGap = 8
  const greetW = Math.max(1, (inner - greetGap * 2) / 3)
  const greetH = (greetW * 4) / 3
  const photoGap = 4
  const photoW = Math.max(1, (inner - photoGap * 2) / 3)
  const memW = Math.min(284, Math.max(100, inner - 8))

  return (
    <View
      style={styles.root}
      accessibilityRole="progressbar"
      accessibilityLabel="Loading home"
      accessibilityState={{ busy: true }}
    >
      <StatusBar style="light" />
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <ShimmerBlock opacity={pulse} style={styles.headerMark} />
            <ShimmerBlock opacity={pulse} style={styles.headerTitle} />
          </View>
          <View style={styles.headerRight}>
            <ShimmerBlock opacity={pulse} style={styles.headerIcon} />
            <ShimmerBlock opacity={pulse} style={styles.headerAvatar} />
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.storyRail}>
          {Array.from({ length: 8 }).map((_, i) => (
            <View key={i} style={styles.storyCell}>
              <ShimmerBlock opacity={pulse} style={styles.storyRing} />
              <ShimmerBlock opacity={pulse} style={styles.storyLabel} />
            </View>
          ))}
        </ScrollView>

        <View style={styles.iplWrap}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.iplRail}>
            <View style={styles.iplCol}>
              <ShimmerBlock opacity={pulse} style={styles.iplTall} />
              <View style={{ height: 10 }} />
              <ShimmerBlock opacity={pulse} style={styles.iplShort} />
            </View>
            <View style={{ width: 10 }} />
            <View style={styles.iplCol}>
              <ShimmerBlock opacity={pulse} style={styles.iplShort} />
              <View style={{ height: 10 }} />
              <ShimmerBlock opacity={pulse} style={styles.iplTall} />
            </View>
            <View style={{ width: 10 }} />
            <View style={styles.heroCard}>
              <ShimmerBlock opacity={pulse} style={styles.heroAspect} />
              <View style={styles.logoRow}>
                {Array.from({ length: 9 }).map((_, i) => (
                  <ShimmerBlock key={i} opacity={pulse} style={styles.logoCell} />
                ))}
              </View>
            </View>
            <View style={{ width: 10 }} />
            <View style={styles.iplCol}>
              <ShimmerBlock opacity={pulse} style={styles.iplTall} />
              <View style={{ height: 10 }} />
              <ShimmerBlock opacity={pulse} style={styles.iplShort} />
            </View>
            <View style={{ width: 10 }} />
            <View style={styles.iplCol}>
              <ShimmerBlock opacity={pulse} style={styles.iplShort} />
              <View style={{ height: 10 }} />
              <ShimmerBlock opacity={pulse} style={styles.iplTall} />
            </View>
          </ScrollView>
          <View style={styles.ctaCenter}>
            <ShimmerBlock opacity={pulse} style={styles.ctaPill} />
          </View>
        </View>

        <View style={styles.section}>
          <ShimmerBlock opacity={pulse} style={styles.sectionTitle} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hRail}>
            {Array.from({ length: 3 }).map((_, i) => (
              <ShimmerBlock key={i} opacity={pulse} style={[styles.memCard, { width: memW }]} />
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <ShimmerBlock opacity={pulse} style={styles.sectionTitleWide} />
          <View style={styles.greetGrid}>
            {Array.from({ length: 6 }).map((_, i) => (
              <ShimmerBlock
                key={i}
                opacity={pulse}
                style={{
                  width: greetW,
                  height: greetH,
                  borderRadius: 10,
                }}
              />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <ShimmerBlock opacity={pulse} style={styles.sectionTitleMid} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hRail}>
            {Array.from({ length: 3 }).map((_, i) => (
              <ShimmerBlock key={i} opacity={pulse} style={styles.trendCard} />
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <ShimmerBlock opacity={pulse} style={styles.sectionTitleSm} />
          <View style={styles.photoGrid}>
            {Array.from({ length: 9 }).map((_, i) => (
              <ShimmerBlock key={i} opacity={pulse} style={{ width: photoW, height: photoW }} />
            ))}
          </View>
        </View>

        <View style={[styles.section, { gap: 18 }]}>
          <ShimmerBlock opacity={pulse} style={styles.storageBanner} />
          <View style={{ gap: 10 }}>
            <View style={styles.storageRow}>
              <ShimmerBlock opacity={pulse} style={{ height: 16, width: 72, borderRadius: 6 }} />
              <ShimmerBlock opacity={pulse} style={{ height: 16, width: 120, borderRadius: 6 }} />
            </View>
            <ShimmerBlock opacity={pulse} style={styles.storageTrack} />
            <ShimmerBlock opacity={pulse} style={{ height: 14, width: '70%', alignSelf: 'center', borderRadius: 6 }} />
          </View>
        </View>

        <View style={{ height: 12 }} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.surface0,
    minHeight: 0,
  },
  shim: {
    backgroundColor: SHIMMER,
  },
  header: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255,255,255,0.12)',
    backgroundColor: 'rgba(0,29,46,0.92)',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    minHeight: 56,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  headerMark: {
    width: 32,
    height: 32,
    borderRadius: 8,
  },
  headerTitle: {
    width: 112,
    height: 22,
    borderRadius: 6,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  scroll: {
    flex: 1,
    minHeight: 0,
  },
  scrollContent: {
    paddingBottom: 132,
  },
  storyRail: {
    paddingHorizontal: 14,
    paddingTop: 8,
    paddingBottom: 4,
    gap: 14,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  storyCell: {
    width: 64,
    alignItems: 'center',
    gap: 8,
    paddingBottom: 4,
  },
  storyRing: {
    width: 58,
    height: 58,
    borderRadius: 29,
  },
  storyLabel: {
    width: 44,
    height: 10,
    borderRadius: 4,
  },
  iplWrap: {
    marginTop: 8,
    gap: 8,
  },
  iplRail: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  iplCol: {
    width: 183,
  },
  iplTall: {
    width: 183,
    height: 245,
    borderRadius: 10,
  },
  iplShort: {
    width: 183,
    height: 101,
    borderRadius: 10,
  },
  heroCard: {
    width: 218,
    borderRadius: 12,
    backgroundColor: colors.primary200,
    padding: 8,
    gap: 8,
  },
  heroAspect: {
    width: '100%',
    aspectRatio: 21 / 28,
    borderRadius: 10,
  },
  logoRow: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  logoCell: {
    width: 56,
    height: 56,
    borderRadius: 14,
  },
  ctaCenter: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 4,
  },
  ctaPill: {
    width: '100%',
    maxWidth: 234,
    height: 48,
    borderRadius: 999,
  },
  section: {
    marginTop: 22,
    paddingHorizontal: SECTION_PAD,
    gap: 10,
  },
  sectionTitle: {
    height: 22,
    width: 140,
    borderRadius: 6,
  },
  sectionTitleWide: {
    height: 22,
    width: 120,
    borderRadius: 6,
  },
  sectionTitleMid: {
    height: 22,
    width: 200,
    borderRadius: 6,
  },
  sectionTitleSm: {
    height: 22,
    width: 100,
    borderRadius: 6,
  },
  hRail: {
    flexDirection: 'row',
    gap: 14,
    paddingVertical: 4,
  },
  memCard: {
    height: 160,
    borderRadius: 14,
  },
  greetGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  trendCard: {
    width: 160,
    height: (160 * 4) / 3,
    borderRadius: 12,
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    borderRadius: 14,
    overflow: 'hidden',
  },
  storageBanner: {
    width: '100%',
    aspectRatio: 656 / 368,
    borderRadius: 14,
  },
  storageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  storageTrack: {
    height: 10,
    borderRadius: 999,
  },
})
