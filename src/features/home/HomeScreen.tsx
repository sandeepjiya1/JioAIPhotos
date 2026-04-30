import { useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  type StyleProp,
  type TextStyle,
} from 'react-native'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { AnimatedSection, ScrollRevealSection } from '@/components/motion'
import { homeBottomTabScrollPaddingBottom } from '@/components/layout/HomeBottomNav'
import { HomeAppHeader } from '@/features/home/HomeAppHeader'
import { HomeIplRail } from '@/features/home/HomeIplRail'
import { HomePhotosMosaic } from '@/features/home/HomePhotosMosaic'
import { ResolvedImage } from '@/features/home/ResolvedImage'
import {
  HOME_GREETINGS_SECTION,
  HOME_IPL_AVATARS_SECTION_TITLE,
  HOME_MEMORIES_SECTION,
  HOME_PHOTOS_SECTION,
  HOME_SHOW_SECTION_SUBTITLES,
  HOME_STORAGE_BANNER,
  HOME_STORAGE_BANNER_IMAGE,
  type HomeMemoryCard,
} from '@/features/home/homeContent'
import { HomeScreenSkeleton } from '@/features/home/HomeScreenSkeleton'
import { useHomeScreenImagesReady } from '@/features/home/useHomeScreenImagesReady'
import type { AppThemeColors } from '@/theme/palettes'
import { moderateSize } from '@/theme/layoutScale'
import { useThemeColors } from '@/theme/useThemeColors'

const MEM_DESIGN_CARD_W = 253
const MEM_DESIGN_CONTENT_W = 328
const MEM_DESIGN_IMG_H = 141.961

function createHomeStyles(colors: AppThemeColors) {
  return StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: colors.surface0,
      minHeight: 0,
    },
    scroll: {
      flex: 1,
      minHeight: 0,
    },
    section: {},
    aiAvatarSectionTitle: {
      fontWeight: '900',
      color: colors.contentPrimary,
    },
    photoSection: {
      paddingHorizontal: 0,
    },
    photoSectionHeader: {},
    memoriesSectionTitle: {
      fontWeight: '900',
      color: colors.contentPrimary,
    },
    sectionHeadRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    sectionTitle: {
      flex: 1,
      fontWeight: '900',
      color: colors.contentPrimary,
    },
    photosSectionTitle: {
      fontWeight: '900',
      color: colors.contentPrimary,
    },
    sectionAction: {
      flexShrink: 0,
    },
    viewAll: {
      fontWeight: '600',
      color: colors.primary600,
    },
    sectionSub: {
      color: colors.sectionSubtleText,
    },
    memHRail: {
      flexDirection: 'row',
    },
    greetGrid: {
      flexDirection: 'row',
      flexWrap: 'nowrap',
    },
    greetCell: {
      overflow: 'hidden',
      backgroundColor: colors.surface3,
      position: 'relative',
    },
    greetLabel: {
      position: 'absolute',
      fontWeight: '700',
      color: colors.onPhotoHigh,
      textAlign: 'center',
    },
    storageBlock: {},
    storageBanner: {
      width: '100%',
      height: undefined,
      aspectRatio: 656 / 368,
      overflow: 'hidden',
      backgroundColor: colors.surface2,
    },
    storageMeta: {},
    storageLabels: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
    },
    storageLabel: {
      fontWeight: '500',
      color: colors.contentSecondary,
    },
    storageNums: {
      fontWeight: '500',
      color: colors.contentSecondary,
      fontVariant: ['tabular-nums'],
    },
    storageTrack: {
      borderRadius: 999,
      backgroundColor: colors.neutralTrack,
      overflow: 'hidden',
    },
    storageFill: {
      height: '100%',
      borderRadius: 999,
      backgroundColor: colors.primary600,
    },
    storageCaption: {
      fontWeight: '500',
      color: colors.contentSecondary,
      textAlign: 'center',
    },
  })
}

function MemoryRailCard({
  item,
  width,
  borderRadius,
  screenWidth,
}: {
  item: HomeMemoryCard
  width: number
  borderRadius: number
  screenWidth: number
}) {
  const colors = useThemeColors()
  const imgH = Math.round((width * MEM_DESIGN_IMG_H) / MEM_DESIGN_CARD_W)
  const g = item.overlayGradient
  const sw = screenWidth > 0 ? screenWidth : Dimensions.get('window').width
  const ol = moderateSize(12, sw)
  const ob = moderateSize(8, sw)
  const og = moderateSize(4, sw)
  const titleSize = moderateSize(20, sw)
  const dateSize = moderateSize(10, sw)
  const local = useMemo(
    () =>
      StyleSheet.create({
        memCard: {
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
        },
        memTitleOverlay: {
          fontWeight: '900',
        },
        memDateOverlay: {
          fontWeight: '400',
        },
      }),
    [colors],
  )
  return (
    <View style={[local.memCard, { width, borderRadius }]}>
      <View style={[local.memImageWrap, { height: imgH, borderRadius }]}>
        <ResolvedImage webPath={item.image} style={StyleSheet.absoluteFillObject} resizeMode="cover" />
        <LinearGradient
          pointerEvents="none"
          colors={[...g.colors] as [string, string, ...string[]]}
          locations={[...g.locations] as [number, number, ...number[]]}
          start={g.start}
          end={g.end}
          style={[StyleSheet.absoluteFillObject, { borderRadius }]}
        />
        <View
          style={[
            local.memOverlayText,
            {
              left: ol,
              right: ol,
              bottom: ob,
              gap: og,
            },
          ]}
        >
          <Text
            style={[
              local.memTitleOverlay,
              { fontSize: titleSize, lineHeight: titleSize, color: colors.onPhotoHigh },
            ]}
            numberOfLines={2}
          >
            {item.title}
          </Text>
          <Text
            style={[
              local.memDateOverlay,
              { fontSize: dateSize, lineHeight: dateSize, color: colors.onPhotoMedium },
            ]}
          >
            {item.date}
          </Text>
        </View>
      </View>
    </View>
  )
}

function SectionHeader({
  title,
  action,
  titleStyle,
  rowStyle,
}: {
  title: string
  action?: ReactNode
  titleStyle?: StyleProp<TextStyle>
  rowStyle?: object
}) {
  const colors = useThemeColors()
  const row = useMemo(
    () =>
      StyleSheet.create({
        sectionHeadRow: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        sectionTitle: {
          flex: 1,
          fontWeight: '900',
          color: colors.contentPrimary,
        },
        sectionAction: { flexShrink: 0 },
      }),
    [colors],
  )

  return (
    <View style={[row.sectionHeadRow, rowStyle]}>
      <Text style={[row.sectionTitle, titleStyle]}>{title}</Text>
      {action ? <View style={row.sectionAction}>{action}</View> : null}
    </View>
  )
}

export default function HomeScreen() {
  const colors = useThemeColors()
  const styles = useMemo(() => createHomeStyles(colors), [colors])
  const [iplHeroIndex, setIplHeroIndex] = useState(0)
  const { width: winW, height: winH } = useWindowDimensions()
  const insets = useSafeAreaInsets()
  const homeImagesReady = useHomeScreenImagesReady()
  const scrollY = useSharedValue(0)
  const viewportH = useSharedValue(Math.max(1, Dimensions.get('window').height))

  useEffect(() => {
    viewportH.value = Math.max(1, winH)
  }, [winH, viewportH])

  const onScroll = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollY.value = e.contentOffset.y
    },
  })

  const { memCardW, greetCellW, greetCellH, photosMosaicInnerW, lx } = useMemo(() => {
    const ww = winW > 0 ? winW : Dimensions.get('window').width
    const ms = (n: number) => moderateSize(n, ww)
    const sectionPad = ms(16)
    const inner = Math.max(1, ww - sectionPad * 2)
    const greetGap = ms(8)
    const greetW = Math.max(1, (inner - greetGap * 2) / 3)
    return {
      memCardW: Math.max(200, Math.round((inner * MEM_DESIGN_CARD_W) / MEM_DESIGN_CONTENT_W)),
      greetCellW: greetW,
      greetCellH: (greetW * 4) / 3,
      photosMosaicInnerW: Math.max(1, ww),
      lx: {
        ww,
        sectionPad,
        sectionMarginTop: ms(22),
        sectionGap: ms(10),
        aiSectionMarginTop: ms(10),
        photoSectionMarginTop: ms(22),
        photoHeaderGap: ms(4),
        photoHeaderPadH: sectionPad,
        memRailGap: ms(16),
        memRailPadV: ms(4),
        memRadius: ms(10),
        greetGridGap: greetGap,
        greetCellRadius: ms(10),
        greetLabelPadH: ms(8),
        greetLabelBottom: ms(10),
        storageBlockGap: ms(18),
        storageMetaGap: ms(10),
        storageBannerRadius: ms(14),
        spacerBottom: ms(12),
        headRowGap: ms(12),
        hitSlop: ms(8),
        aiTitleSize: ms(20),
        memoriesTitleSize: ms(20),
        photosTitleSize: ms(20),
        sectionTitleSize: ms(18),
        sectionTitleLine: ms(22),
        viewAllSize: ms(14),
        sectionSubSize: ms(14),
        sectionSubLine: ms(18),
        greetLabelSize: ms(13),
        greetLabelLine: ms(16),
        storageLabelSize: ms(16),
        storageCaptionSize: ms(14),
        storageTrackH: ms(10),
      },
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
      <Animated.ScrollView
        style={styles.scroll}
        contentContainerStyle={{
          paddingBottom: homeBottomTabScrollPaddingBottom(
            insets.bottom,
            winW > 0 ? winW : Dimensions.get('window').width,
          ),
        }}
        showsVerticalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        <AnimatedSection delayMs={72}>
          <View
            style={[
              styles.section,
              {
                marginTop: lx.aiSectionMarginTop,
                paddingHorizontal: lx.sectionPad,
                gap: lx.sectionGap,
              },
            ]}
          >
            <SectionHeader
              title={HOME_IPL_AVATARS_SECTION_TITLE}
              titleStyle={[
                styles.aiAvatarSectionTitle,
                { fontSize: lx.aiTitleSize, lineHeight: lx.aiTitleSize },
              ]}
              rowStyle={{ gap: lx.headRowGap }}
            />
            <HomeIplRail selectedIndex={iplHeroIndex} onSelectTeam={setIplHeroIndex} />
          </View>
        </AnimatedSection>

        <ScrollRevealSection
          scrollY={scrollY}
          viewportHeight={viewportH}
          style={[
            styles.section,
            {
              marginTop: lx.sectionMarginTop,
              paddingHorizontal: lx.sectionPad,
              gap: lx.sectionGap,
            },
          ]}
        >
          <SectionHeader
            title={HOME_GREETINGS_SECTION.title}
            rowStyle={{ gap: lx.headRowGap }}
            titleStyle={[styles.sectionTitle, { fontSize: lx.sectionTitleSize, lineHeight: lx.sectionTitleLine }]}
            action={
              <Pressable onPress={() => router.push('/home/create')} hitSlop={lx.hitSlop}>
                <Text style={[styles.viewAll, { fontSize: lx.viewAllSize }]}>View all</Text>
              </Pressable>
            }
          />
          <View style={[styles.greetGrid, { gap: lx.greetGridGap }]}>
            {HOME_GREETINGS_SECTION.items.map((item) => (
              <Pressable
                key={item.id}
                accessibilityRole="button"
                accessibilityLabel={`${item.label}, open greeting`}
                onPress={() => router.push(`/home/greeting/${item.id}`)}
                style={[
                  styles.greetCell,
                  {
                    width: greetCellW,
                    height: greetCellH,
                    borderRadius: lx.greetCellRadius,
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
                  colors={['transparent', colors.greetingGradientMid, colors.greetingGradientEnd]}
                  locations={[0, 0.42, 1]}
                  style={StyleSheet.absoluteFillObject}
                />
                <Text
                  style={[
                    styles.greetLabel,
                    {
                      left: lx.greetLabelPadH,
                      right: lx.greetLabelPadH,
                      bottom: lx.greetLabelBottom,
                      fontSize: lx.greetLabelSize,
                      lineHeight: lx.greetLabelLine,
                    },
                  ]}
                  numberOfLines={2}
                >
                  {item.label}
                </Text>
              </Pressable>
            ))}
          </View>
          {HOME_SHOW_SECTION_SUBTITLES && HOME_GREETINGS_SECTION.subtitle ? (
            <Text
              style={[
                styles.sectionSub,
                { fontSize: lx.sectionSubSize, lineHeight: lx.sectionSubLine },
              ]}
            >
              {HOME_GREETINGS_SECTION.subtitle}
            </Text>
          ) : null}
        </ScrollRevealSection>

        <ScrollRevealSection
          scrollY={scrollY}
          viewportHeight={viewportH}
          style={[
            styles.section,
            {
              marginTop: lx.sectionMarginTop,
              paddingHorizontal: lx.sectionPad,
              gap: lx.sectionGap,
            },
          ]}
        >
          <SectionHeader
            title={HOME_MEMORIES_SECTION.title}
            titleStyle={[
              styles.memoriesSectionTitle,
              { fontSize: lx.memoriesTitleSize, lineHeight: lx.memoriesTitleSize },
            ]}
            rowStyle={{ gap: lx.headRowGap }}
            action={
              <Pressable onPress={() => router.push('/home/memories')} hitSlop={lx.hitSlop}>
                <Text style={[styles.viewAll, { fontSize: lx.viewAllSize }]}>View all</Text>
              </Pressable>
            }
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[
              styles.memHRail,
              { gap: lx.memRailGap, paddingVertical: lx.memRailPadV },
            ]}
          >
            {HOME_MEMORIES_SECTION.items.map((item) => (
              <MemoryRailCard
                key={item.id}
                item={item}
                width={memCardW}
                borderRadius={lx.memRadius}
                screenWidth={lx.ww}
              />
            ))}
          </ScrollView>
          {HOME_SHOW_SECTION_SUBTITLES && HOME_MEMORIES_SECTION.subtitle ? (
            <Text
              style={[
                styles.sectionSub,
                { fontSize: lx.sectionSubSize, lineHeight: lx.sectionSubLine },
              ]}
            >
              {HOME_MEMORIES_SECTION.subtitle}
            </Text>
          ) : null}
        </ScrollRevealSection>

        <ScrollRevealSection
          scrollY={scrollY}
          viewportHeight={viewportH}
          style={[
            styles.photoSection,
            {
              marginTop: lx.photoSectionMarginTop,
              gap: lx.sectionGap,
            },
          ]}
        >
          <View style={[styles.photoSectionHeader, { paddingHorizontal: lx.photoHeaderPadH, gap: lx.photoHeaderGap }]}>
            <SectionHeader
              title={HOME_PHOTOS_SECTION.title}
              titleStyle={[
                styles.photosSectionTitle,
                { fontSize: lx.photosTitleSize, lineHeight: lx.photosTitleSize },
              ]}
              rowStyle={{ gap: lx.headRowGap }}
            />
            {HOME_SHOW_SECTION_SUBTITLES && HOME_PHOTOS_SECTION.subtitle ? (
              <Text
                style={[
                  styles.sectionSub,
                  { fontSize: lx.sectionSubSize, lineHeight: lx.sectionSubLine },
                ]}
              >
                {HOME_PHOTOS_SECTION.subtitle}
              </Text>
            ) : null}
          </View>
          <HomePhotosMosaic innerWidth={photosMosaicInnerW} items={HOME_PHOTOS_SECTION.items} />
        </ScrollRevealSection>

        <ScrollRevealSection
          scrollY={scrollY}
          viewportHeight={viewportH}
          style={[
            styles.section,
            styles.storageBlock,
            {
              marginTop: lx.sectionMarginTop,
              paddingHorizontal: lx.sectionPad,
              gap: lx.storageBlockGap,
            },
          ]}
        >
          <ResolvedImage
            webPath={HOME_STORAGE_BANNER_IMAGE}
            style={[styles.storageBanner, { borderRadius: lx.storageBannerRadius }]}
            resizeMode="contain"
          />
          <View style={[styles.storageMeta, { gap: lx.storageMetaGap }]}>
            <View style={styles.storageLabels}>
              <Text style={[styles.storageLabel, { fontSize: lx.storageLabelSize }]}>Storage</Text>
              <Text style={[styles.storageNums, { fontSize: lx.storageLabelSize }]}>
                {HOME_STORAGE_BANNER.used} GB / {HOME_STORAGE_BANNER.total} GB
              </Text>
            </View>
            <View style={[styles.storageTrack, { height: lx.storageTrackH }]}>
              <View
                style={[
                  styles.storageFill,
                  { width: `${Math.min(100, (HOME_STORAGE_BANNER.used / HOME_STORAGE_BANNER.total) * 100)}%` },
                ]}
              />
            </View>
            <Text style={[styles.storageCaption, { fontSize: lx.storageCaptionSize }]}>
              AI memories safely backed up
            </Text>
          </View>
        </ScrollRevealSection>

        <View style={{ height: lx.spacerBottom }} />
      </Animated.ScrollView>
    </View>
  )
}
