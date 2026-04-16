import { useMemo, useState, type ReactNode } from 'react'
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { HomeAppHeader } from '@/features/home/HomeAppHeader'
import { HomeIplRail } from '@/features/home/HomeIplRail'
import { HomeStoryRow } from '@/features/home/HomeStoryRow'
import { ResolvedImage } from '@/features/home/ResolvedImage'
import {
  HOME_GREETINGS_SECTION,
  HOME_MEMORIES_SECTION,
  HOME_PHOTOS_SECTION,
  HOME_SHOW_SECTION_SUBTITLES,
  HOME_STORAGE_BANNER,
  HOME_STORAGE_BANNER_IMAGE,
  HOME_TRENDING_SECTION,
} from '@/features/home/homeContent'
import { HomeScreenSkeleton } from '@/features/home/HomeScreenSkeleton'
import { useHomeScreenImagesReady } from '@/features/home/useHomeScreenImagesReady'
import { colors } from '@/theme/colors'

const SECTION_PAD = 16
const TREND_W = 160
const TREND_H = (TREND_W * 4) / 3
const MEM_H = 160

function SectionHeader({
  title,
  action,
}: {
  title: string
  action?: ReactNode
}) {
  return (
    <View style={styles.sectionHeadRow}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {action ? <View style={styles.sectionAction}>{action}</View> : null}
    </View>
  )
}

export default function HomeScreen() {
  const [iplHeroIndex, setIplHeroIndex] = useState(0)
  const { width: winW } = useWindowDimensions()
  const homeImagesReady = useHomeScreenImagesReady()

  const { memCardW, greetCellW, greetCellH, photoCellW } = useMemo(() => {
    const ww = winW > 0 ? winW : Dimensions.get('window').width
    const inner = Math.max(1, ww - SECTION_PAD * 2)
    const greetGap = 8
    const greetW = Math.max(1, (inner - greetGap * 2) / 3)
    const photoGap = 4
    const photoW = Math.max(1, (inner - photoGap * 2) / 3)
    return {
      memCardW: Math.min(284, Math.max(100, inner - 8)),
      greetCellW: greetW,
      greetCellH: (greetW * 4) / 3,
      photoCellW: photoW,
    }
  }, [winW])

  if (!homeImagesReady) {
    return (
      <View style={styles.root}>
        <StatusBar style="light" />
        <HomeScreenSkeleton />
      </View>
    )
  }

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <HomeAppHeader />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <HomeStoryRow />

        <HomeIplRail selectedIndex={iplHeroIndex} onSelectTeam={setIplHeroIndex} />

        <View style={styles.section}>
          <SectionHeader title={HOME_MEMORIES_SECTION.title} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hRail}>
            {HOME_MEMORIES_SECTION.items.map((item) => (
              <View key={item.id} style={[styles.memCard, { width: memCardW }]}>
                <View style={[styles.memImageWrap, { height: MEM_H }]}>
                  <ResolvedImage
                    webPath={item.image}
                    style={StyleSheet.absoluteFillObject}
                    resizeMode="cover"
                  />
                  <LinearGradient
                    pointerEvents="none"
                    colors={['transparent', 'rgba(0,0,0,0.72)']}
                    locations={[0.38, 1]}
                    style={StyleSheet.absoluteFill}
                  />
                  <View style={styles.memOverlayText}>
                    <Text style={styles.memTitleOverlay} numberOfLines={2}>
                      {item.title}
                    </Text>
                    <Text style={styles.memDateOverlay}>{item.date}</Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
          {HOME_SHOW_SECTION_SUBTITLES && HOME_MEMORIES_SECTION.subtitle ? (
            <Text style={styles.sectionSub}>{HOME_MEMORIES_SECTION.subtitle}</Text>
          ) : null}
        </View>

        <View style={styles.section}>
          <SectionHeader
            title={HOME_GREETINGS_SECTION.title}
            action={
              <Pressable onPress={() => router.push('/home/create')} hitSlop={8}>
                <Text style={styles.viewAll}>View all</Text>
              </Pressable>
            }
          />
          <View style={styles.greetGrid}>
            {HOME_GREETINGS_SECTION.items.map((item) => (
              <View
                key={item.id}
                style={[
                  styles.greetCell,
                  {
                    width: greetCellW,
                    height: greetCellH,
                  },
                ]}
              >
                <ResolvedImage
                  webPath={item.image}
                  style={StyleSheet.absoluteFillObject}
                  resizeMode="cover"
                />
                <LinearGradient
                  pointerEvents="none"
                  colors={['transparent', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.88)']}
                  locations={[0, 0.42, 1]}
                  style={StyleSheet.absoluteFill}
                />
                <Text style={styles.greetLabel} numberOfLines={2}>
                  {item.label}
                </Text>
              </View>
            ))}
          </View>
          {HOME_SHOW_SECTION_SUBTITLES && HOME_GREETINGS_SECTION.subtitle ? (
            <Text style={styles.sectionSub}>{HOME_GREETINGS_SECTION.subtitle}</Text>
          ) : null}
        </View>

        <View style={styles.section}>
          <SectionHeader title={HOME_TRENDING_SECTION.title} />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.hRail}>
            {HOME_TRENDING_SECTION.items.map((item) => (
              <View key={item.id} style={[styles.trendCard, { width: TREND_W, height: TREND_H }]}>
                {item.imageClassName ? (
                  <View style={styles.trendCrop}>
                    <ResolvedImage
                      webPath={item.image}
                      style={styles.trendCropImg}
                      resizeMode="cover"
                    />
                  </View>
                ) : (
                  <ResolvedImage
                    webPath={item.image}
                    style={StyleSheet.absoluteFillObject}
                    resizeMode="cover"
                  />
                )}
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <SectionHeader title={HOME_PHOTOS_SECTION.title} />
          <View style={styles.photoGrid}>
            {HOME_PHOTOS_SECTION.items.map((tile) => (
              <View key={tile.id} style={[styles.photoCell, { width: photoCellW, height: photoCellW }]}>
                <ResolvedImage
                  webPath={tile.src}
                  style={StyleSheet.absoluteFillObject}
                  resizeMode="cover"
                />
                {tile.morePhotosOverlay ? (
                  <View style={styles.photoOverlay}>
                    <Text style={styles.photoOverlayCount}>+{tile.morePhotosOverlay.count}</Text>
                    <Text style={styles.photoOverlayUnit}>{tile.morePhotosOverlay.unitLabel}</Text>
                  </View>
                ) : null}
              </View>
            ))}
          </View>
          {HOME_SHOW_SECTION_SUBTITLES && HOME_PHOTOS_SECTION.subtitle ? (
            <Text style={styles.sectionSub}>{HOME_PHOTOS_SECTION.subtitle}</Text>
          ) : null}
        </View>

        <View style={[styles.section, styles.storageBlock]}>
          <ResolvedImage
            webPath={HOME_STORAGE_BANNER_IMAGE}
            style={styles.storageBanner}
            resizeMode="contain"
          />
          <View style={styles.storageMeta}>
            <View style={styles.storageLabels}>
              <Text style={styles.storageLabel}>Storage</Text>
              <Text style={styles.storageNums}>
                {HOME_STORAGE_BANNER.used} GB / {HOME_STORAGE_BANNER.total} GB
              </Text>
            </View>
            <View style={styles.storageTrack}>
              <View
                style={[
                  styles.storageFill,
                  { width: `${Math.min(100, (HOME_STORAGE_BANNER.used / HOME_STORAGE_BANNER.total) * 100)}%` },
                ]}
              />
            </View>
            <Text style={styles.storageCaption}>AI memories safely backed up</Text>
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
  scroll: {
    flex: 1,
    minHeight: 0,
  },
  scrollContent: {
    /** Extra space for glass nav + raised AI Camera orb (web `pb-36` parity). */
    paddingBottom: 132,
  },
  section: {
    marginTop: 22,
    paddingHorizontal: SECTION_PAD,
    gap: 10,
  },
  sectionHeadRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  sectionTitle: {
    flex: 1,
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '900',
    color: colors.contentPrimary,
  },
  sectionAction: {
    flexShrink: 0,
  },
  viewAll: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary600,
  },
  sectionSub: {
    fontSize: 14,
    lineHeight: 18,
    color: 'rgba(255,255,255,0.45)',
  },
  hRail: {
    flexDirection: 'row',
    gap: 14,
    paddingVertical: 4,
  },
  memCard: {
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: colors.surface3,
  },
  memImageWrap: {
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  memOverlayText: {
    position: 'absolute',
    left: 10,
    right: 10,
    bottom: 10,
    gap: 4,
  },
  memTitleOverlay: {
    fontSize: 17,
    fontWeight: '900',
    lineHeight: 22,
    color: colors.contentPrimary,
  },
  memDateOverlay: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.contentPrimary,
  },
  greetGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  greetCell: {
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: colors.surface3,
    position: 'relative',
  },
  greetLabel: {
    position: 'absolute',
    left: 8,
    right: 8,
    bottom: 10,
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 16,
    color: '#fff',
    textAlign: 'center',
  },
  trendCard: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: colors.surface3,
    position: 'relative',
  },
  /** Parity with web `MediaCard` middle tile (Figma 488:9345 crop). */
  trendCrop: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  trendCropImg: {
    position: 'absolute',
    width: '158.61%',
    height: '115.79%',
    left: '-37.04%',
    top: '-2.9%',
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    borderRadius: 14,
    overflow: 'hidden',
  },
  photoCell: {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: colors.surface3,
  },
  photoOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  photoOverlayCount: {
    fontSize: 20,
    fontWeight: '900',
    color: '#fff',
  },
  photoOverlayUnit: {
    fontSize: 8,
    color: 'rgba(255,255,255,0.9)',
  },
  storageBlock: {
    gap: 18,
  },
  storageBanner: {
    width: '100%',
    height: undefined,
    aspectRatio: 656 / 368,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: colors.surface2,
  },
  storageMeta: {
    gap: 10,
  },
  storageLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  storageLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.contentSecondary,
  },
  storageNums: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.contentSecondary,
    fontVariant: ['tabular-nums'],
  },
  storageTrack: {
    height: 10,
    borderRadius: 999,
    backgroundColor: '#ebebec',
    overflow: 'hidden',
  },
  storageFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: colors.primary600,
  },
  storageCaption: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.contentSecondary,
    textAlign: 'center',
  },
})
