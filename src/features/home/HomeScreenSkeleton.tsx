import { useEffect, useMemo } from 'react'
import { Animated, Dimensions, ScrollView, StyleSheet, View, useWindowDimensions } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { homeBottomTabScrollPaddingBottom } from '@/components/layout/HomeBottomNav'
import { colors } from '@/theme/colors'
import { HOME_IPL_THEME_BANNER_PIXEL_SIZE } from '@/features/home/homeContent'
import { moderateSize, scaleSizeFromDesign } from '@/theme/layoutScale'

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

  const ww = winW > 0 ? winW : Dimensions.get('window').width
  const sectionPad = moderateSize(16, ww)
  const greetRailGap = moderateSize(10, ww)
  const sectionGap = moderateSize(10, ww)
  const sectionTop = moderateSize(22, ww)
  const aiSectionTop = moderateSize(10, ww)
  const greetCardW = moderateSize(102, ww)
  const greetCardH = moderateSize(136, ww)
  const mosaicW = Math.max(1, ww)
  const photoG = 1
  const photoCell = Math.floor((mosaicW - 2 * photoG) / 3)
  const photoHeroW = mosaicW - photoG - photoCell
  const photoHeroH = photoCell * 2 + photoG
  const memRailGap = moderateSize(10, ww)
  const memSectionTop = moderateSize(20, ww)
  const trendingSectionTop = moderateSize(22, ww)
  const memW = moderateSize(158, ww)
  const memH = moderateSize(281, ww)
  const familyAvatarShim = scaleSizeFromDesign(60, ww, 360)
  const familyAvatarRadius = Math.max(1, Math.round(familyAvatarShim / 2))

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
            <ShimmerBlock opacity={pulse} style={styles.headerAvatar} />
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: homeBottomTabScrollPaddingBottom(insets.bottom, winW > 0 ? winW : Dimensions.get('window').width) }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ marginTop: aiSectionTop, width: '100%' }}>
          <ShimmerBlock
            opacity={pulse}
            style={{
              width: '100%',
              height: Math.max(
                1,
                Math.round(
                  ww *
                    (HOME_IPL_THEME_BANNER_PIXEL_SIZE.height /
                      HOME_IPL_THEME_BANNER_PIXEL_SIZE.width),
                ),
              ),
              borderRadius: 0,
            }}
          />
        </View>
        <View
          style={[
            styles.section,
            { paddingHorizontal: sectionPad, marginTop: moderateSize(12, ww), gap: sectionGap },
          ]}
        >
          <ShimmerBlock opacity={pulse} style={styles.sectionTitleIpl} />
          <View style={styles.iplWrap}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.iplRail}>
            <View style={styles.iplCol}>
              <ShimmerBlock opacity={pulse} style={styles.iplTall} />
              <View style={{ height: 8 }} />
              <ShimmerBlock opacity={pulse} style={styles.iplShort} />
            </View>
            <View style={{ width: 8 }} />
            <View style={styles.iplCol}>
              <ShimmerBlock opacity={pulse} style={styles.iplShort} />
              <View style={{ height: 8 }} />
              <ShimmerBlock opacity={pulse} style={styles.iplTall} />
            </View>
            <View style={{ width: 8 }} />
            <View style={styles.heroCard}>
              <ShimmerBlock opacity={pulse} style={styles.heroAspect} />
              <View style={styles.logoRow}>
                {Array.from({ length: 9 }).map((_, i) => (
                  <ShimmerBlock key={i} opacity={pulse} style={styles.logoCell} />
                ))}
              </View>
            </View>
            <View style={{ width: 8 }} />
            <View style={styles.iplCol}>
              <ShimmerBlock opacity={pulse} style={styles.iplTall} />
              <View style={{ height: 8 }} />
              <ShimmerBlock opacity={pulse} style={styles.iplShort} />
            </View>
            <View style={{ width: 8 }} />
            <View style={styles.iplCol}>
              <ShimmerBlock opacity={pulse} style={styles.iplShort} />
              <View style={{ height: 8 }} />
              <ShimmerBlock opacity={pulse} style={styles.iplTall} />
            </View>
          </ScrollView>
          </View>
        </View>

        <View
          style={[styles.section, { paddingHorizontal: sectionPad, marginTop: sectionTop, gap: sectionGap }]}
        >
          <ShimmerBlock opacity={pulse} style={styles.sectionTitleWide} />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[styles.memHRail, { gap: greetRailGap }]}
          >
            {Array.from({ length: 4 }).map((_, i) => (
              <ShimmerBlock
                key={i}
                opacity={pulse}
                style={{
                  width: greetCardW,
                  height: greetCardH,
                  borderRadius: moderateSize(10, ww),
                }}
              />
            ))}
          </ScrollView>
        </View>

        <View
          style={[styles.section, { paddingHorizontal: sectionPad, marginTop: memSectionTop, gap: sectionGap }]}
        >
          <ShimmerBlock opacity={pulse} style={styles.sectionTitle} />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[styles.memHRail, { gap: memRailGap }]}
          >
            {Array.from({ length: 3 }).map((_, i) => (
              <ShimmerBlock
                key={i}
                opacity={pulse}
                style={[styles.memCard, { width: memW, height: memH, borderRadius: moderateSize(12, ww) }]}
              />
            ))}
          </ScrollView>
        </View>

        <View
          style={[styles.section, { paddingHorizontal: sectionPad, marginTop: trendingSectionTop, gap: sectionGap }]}
        >
          <ShimmerBlock opacity={pulse} style={styles.sectionTitleWide} />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[styles.memHRail, { gap: greetRailGap }]}
          >
            {Array.from({ length: 4 }).map((_, i) => (
              <ShimmerBlock
                key={i}
                opacity={pulse}
                style={{
                  width: greetCardW,
                  height: greetCardH,
                  borderRadius: moderateSize(10, ww),
                }}
              />
            ))}
          </ScrollView>
        </View>

        <View style={[styles.photoSection, { marginTop: sectionTop, gap: sectionGap }]}>
          <View style={[styles.photoSectionHeader, { paddingHorizontal: sectionPad }]}>
            <ShimmerBlock opacity={pulse} style={styles.sectionTitlePhotos} />
          </View>
          <View style={[styles.photoMosaicRoot, { width: mosaicW, gap: photoG }]}>
            <View style={[styles.photoMosaicRow, { gap: photoG, width: mosaicW }]}>
              <ShimmerBlock opacity={pulse} style={{ width: photoHeroW, height: photoHeroH, borderRadius: 0 }} />
              <View style={{ width: photoCell, height: photoHeroH, gap: photoG }}>
                <ShimmerBlock opacity={pulse} style={{ width: photoCell, height: photoCell, borderRadius: 0 }} />
                <ShimmerBlock opacity={pulse} style={{ width: photoCell, height: photoCell, borderRadius: 0 }} />
              </View>
            </View>
            <View style={[styles.photoMosaicRow, { gap: photoG, width: mosaicW }]}>
              {Array.from({ length: 3 }).map((_, i) => (
                <ShimmerBlock
                  key={i}
                  opacity={pulse}
                  style={{ width: photoCell, height: photoCell, borderRadius: 0 }}
                />
              ))}
            </View>
          </View>
        </View>

        <View
          style={[
            styles.section,
            {
              paddingHorizontal: sectionPad,
              marginTop: sectionTop,
              paddingTop: moderateSize(20, ww),
              gap: moderateSize(32, ww),
            },
          ]}
        >
          <View style={{ gap: moderateSize(16, ww) }}>
            <View style={{ gap: moderateSize(6, ww) }}>
              <View style={styles.familyHeadRow}>
                <ShimmerBlock opacity={pulse} style={{ height: 20, width: 120, borderRadius: 6 }} />
                <ShimmerBlock opacity={pulse} style={{ height: 16, width: 56, borderRadius: 6 }} />
              </View>
              <ShimmerBlock opacity={pulse} style={{ height: 12, width: '88%', borderRadius: 6 }} />
            </View>
            <View style={[styles.familyAvatarShimRow, { gap: moderateSize(8, ww) }]}>
              <View style={{ alignItems: 'center', gap: moderateSize(12, ww) }}>
                <ShimmerBlock
                  opacity={pulse}
                  style={{
                    width: familyAvatarShim,
                    height: familyAvatarShim,
                    borderRadius: familyAvatarRadius,
                  }}
                />
                <ShimmerBlock opacity={pulse} style={{ height: 14, width: 48, borderRadius: 6 }} />
              </View>
              <View style={{ alignItems: 'center', gap: moderateSize(12, ww) }}>
                <ShimmerBlock
                  opacity={pulse}
                  style={{
                    width: familyAvatarShim,
                    height: familyAvatarShim,
                    borderRadius: familyAvatarRadius,
                  }}
                />
                <ShimmerBlock opacity={pulse} style={{ height: 14, width: 32, borderRadius: 6 }} />
              </View>
            </View>
          </View>
          <View style={{ gap: 10 }}>
            <View style={styles.storageRow}>
              <ShimmerBlock opacity={pulse} style={{ height: 16, width: 72, borderRadius: 6 }} />
              <ShimmerBlock opacity={pulse} style={{ height: 16, width: 120, borderRadius: 6 }} />
            </View>
            <ShimmerBlock
              opacity={pulse}
              style={[styles.storageTrack, { height: moderateSize(8, ww) }]}
            />
            <ShimmerBlock opacity={pulse} style={{ height: 14, width: '92%', alignSelf: 'center', borderRadius: 6 }} />
          </View>
        </View>

        <View
          style={[
            styles.section,
            {
              marginTop: sectionTop,
              paddingHorizontal: moderateSize(17, ww),
              paddingTop: moderateSize(32, ww),
              paddingBottom: 0,
            },
          ]}
        >
          <View style={styles.cricketFooterShimRow}>
            <View style={{ gap: moderateSize(6, ww) }}>
              <ShimmerBlock
                opacity={pulse}
                style={{ height: moderateSize(29, ww), width: 140, borderRadius: 8 }}
              />
              <ShimmerBlock
                opacity={pulse}
                style={{ height: moderateSize(29, ww), width: 110, borderRadius: 8 }}
              />
            </View>
            <ShimmerBlock
              opacity={pulse}
              style={{
                width: moderateSize(167, ww),
                height: moderateSize(54, ww),
                borderRadius: 6,
              }}
            />
          </View>
        </View>
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
    paddingVertical: 8,
    minHeight: 48,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  headerMark: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  headerTitle: {
    width: 36,
    height: 18,
    borderRadius: 6,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  scroll: {
    flex: 1,
    minHeight: 0,
  },
  iplWrap: {
    marginTop: 0,
    gap: 8,
  },
  iplRail: {
    paddingHorizontal: 16,
    paddingVertical: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iplCol: {
    width: 165,
  },
  iplTall: {
    width: 165,
    height: 220,
    borderRadius: 12,
  },
  iplShort: {
    width: 165,
    height: 92,
    borderRadius: 12,
  },
  heroCard: {
    width: 203,
    borderRadius: 14,
    backgroundColor: colors.primary600,
    paddingTop: 4,
    paddingHorizontal: 4,
    paddingBottom: 8,
    gap: 8,
  },
  heroAspect: {
    width: '100%',
    height: 260,
    borderRadius: 12,
  },
  logoRow: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  logoCell: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  section: {},
  memHRail: {
    flexDirection: 'row',
  },
  photoSection: {
    paddingHorizontal: 0,
  },
  photoSectionHeader: {},
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
  sectionTitleIpl: {
    height: 20,
    width: 178,
    borderRadius: 6,
  },
  sectionTitleSm: {
    height: 22,
    width: 100,
    borderRadius: 6,
  },
  sectionTitlePhotos: {
    height: 22,
    width: 72,
    borderRadius: 6,
  },
  photoMosaicRoot: {
    alignSelf: 'stretch',
  },
  photoMosaicRow: {
    flexDirection: 'row',
  },
  memCard: {
    borderRadius: 12,
  },
  familyHeadRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  familyAvatarShimRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  cricketFooterShimRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
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
