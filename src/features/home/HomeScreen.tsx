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
import { BlurView } from 'expo-blur'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import Svg, { Path } from 'react-native-svg'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Button } from '@/components/atoms/Button'
import { AnimatedSection, ScrollRevealSection } from '@/components/motion'
import { homeBottomTabScrollPaddingBottom } from '@/components/layout/HomeBottomNav'
import { HomeAppHeader } from '@/features/home/HomeAppHeader'
import { HomeCricketThemeFooter } from '@/features/home/HomeCricketThemeFooter'
import { HomeIplRail } from '@/features/home/HomeIplRail'
import { HomeIplThemeBanner } from '@/features/home/HomeIplThemeBanner'
import { HomePhotosMosaic } from '@/features/home/HomePhotosMosaic'
import { ResolvedImage } from '@/features/home/ResolvedImage'
import {
  HOME_FAMILY_HUB_SECTION,
  HOME_GREETINGS_SECTION,
  HOME_IPL_THEME_BANNER_PIXEL_SIZE,
  HOME_IPL_AVATARS_SECTION_TITLE,
  HOME_MEMORIES_SECTION,
  HOME_PHOTOS_SECTION,
  HOME_SHOW_SECTION_SUBTITLES,
  HOME_STORAGE_INDICATOR,
  HOME_STORAGE_PROGRESS_VISUAL,
  HOME_TRENDING_SECTION,
  type HomeMemoryBackupCtaCard,
  type HomeMemoryVideoCard,
} from '@/features/home/homeContent'
import { HomeScreenSkeleton } from '@/features/home/HomeScreenSkeleton'
import { useHomeScreenImagesReady } from '@/features/home/useHomeScreenImagesReady'
import { useThemeStore } from '@/store/themeStore'
import { useTranslation } from '@/hooks/useTranslation'
import type { AppThemeColors } from '@/theme/palettes'
import { moderateSize, scaleSizeFromDesign } from '@/theme/layoutScale'
import { useThemeColors } from '@/theme/useThemeColors'

/** Figma Journeys home (`1305:22445` rail, avatar `1305:22455` / `1305:22276`) — frame width for px specs. */
const JOURNEYS_HOME_FRAME_W = 360

/** Figma Journeys `1305:22378` — portrait memory tile @ 360 */
const MEM_JOURNEYS_CARD_W = 158
const MEM_JOURNEYS_CARD_H = 281

/** Figma Journeys PlayButton (`1573:17953`) — 20×20 glyph on 40×40 target; frosted blur disc behind glyph. */
const MEMORY_PLAY_GLYPH_VIEWBOX = '0 0 11.6711 15.0002'
const MEMORY_PLAY_GLYPH_PATH =
  'M10.9583 6.13341L2.625 0.300078C2.34399 0.103932 2.00936 -0.000823666 1.66667 7.81322e-05C1.39893 -0.00259557 1.13498 0.0633927 0.9 0.191745C0.62951 0.331875 0.4026 0.543459 0.243927 0.803506C0.0852548 1.06355 0.000889871 1.36211 0 1.66674V13.3334C0.000889871 13.638 0.0852548 13.9366 0.243927 14.1966C0.4026 14.4567 0.62951 14.6683 0.9 14.8084C1.13498 14.9368 1.39893 15.0028 1.66667 15.0001C2.00936 15.001 2.34399 14.8962 2.625 14.7001L10.9583 8.86674C11.1784 8.71315 11.3581 8.50869 11.4822 8.27075C11.6063 8.03281 11.6711 7.76843 11.6711 7.50008C11.6711 7.23173 11.6063 6.96734 11.4822 6.7294C11.3581 6.49146 11.1784 6.28701 10.9583 6.13341V6.13341Z'

/** Softer than chrome bars — frosted disc behind memory play control */
const MEMORY_PLAY_BLUR_INTENSITY = 48

/** Figma Journeys `1305:22363` — greeting tile stroke */
const GREET_CARD_BORDER = 'rgba(163,167,255,0.2)'
const GREET_CARD_GRADIENT_COLORS = ['rgba(0,0,0,0)', 'rgba(0,0,0,0.8)'] as const
const GREET_CARD_GRADIENT_LOCATIONS = [0.61274, 0.94228] as const

/** Figma `1437:25272` — tile bottom scrim (`from-[rgba(65,65,65,0)]` → `#2a2a2a`) */
const TREND_CARD_GRADIENT_COLORS = ['rgba(65,65,65,0)', '#2a2a2a'] as const
const TREND_CARD_GRADIENT_LOCATIONS = [0.61274, 0.94228] as const

/** Figma `1305:22279` — add icon (filled, 30×30 viewBox; export `38ecd08b…svg`). */
const FAMILY_HUB_ADD_PLUS_PATH =
  'M28.3333 13.3333H16.6667V1.66667C16.6667 1.22464 16.4911 0.800716 16.1785 0.488155C15.8659 0.175595 15.442 0 15 0V0C14.558 0 14.134 0.175595 13.8215 0.488155C13.5089 0.800716 13.3333 1.22464 13.3333 1.66667V13.3333H1.66667C1.22464 13.3333 0.800716 13.5089 0.488155 13.8215C0.175595 14.134 0 14.558 0 15C0 15.442 0.175595 15.8659 0.488155 16.1785C0.800716 16.4911 1.22464 16.6667 1.66667 16.6667H13.3333V28.3333C13.3333 28.7754 13.5089 29.1993 13.8215 29.5118C14.134 29.8244 14.558 30 15 30C15.442 30 15.8659 29.8244 16.1785 29.5118C16.4911 29.1993 16.6667 28.7754 16.6667 28.3333V16.6667H28.3333C28.7754 16.6667 29.1993 16.4911 29.5118 16.1785C29.8244 15.8659 30 15.442 30 15C30 14.558 29.8244 14.134 29.5118 13.8215C29.1993 13.5089 28.7754 13.3333 28.3333 13.3333Z'

function FamilyHubAddPlusIcon({ size, color }: { size: number; color: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 30 30" fill="none">
      <Path d={FAMILY_HUB_ADD_PLUS_PATH} fill={color} />
    </Svg>
  )
}

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
    sectionSub: {
      color: colors.sectionSubtleText,
    },
    memHRail: {
      flexDirection: 'row',
    },
    greetHRail: {
      flexDirection: 'row',
    },
    greetCard: {
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
    familyStorageRoot: {},
    familyHubTitle: {
      fontWeight: '900',
      color: colors.contentPrimary,
    },
    familyHubSubtitle: {
      fontWeight: '400',
      color: colors.contentSecondary,
    },
    familyAvatarRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    familyMemberCol: {
      alignItems: 'center',
    },
    /** Circular clip for member avatars (Figma `1305:22276`); mirrors `familyAddCircle` masking on web. */
    familyMemberAvatarClip: {
      position: 'relative',
      overflow: 'hidden',
    },
    familyMemberName: {
      fontWeight: '500',
      color: colors.contentPrimary,
      textAlign: 'center',
    },
    /** Add-member tile fill — `familyHubAddCtaBg` (dark: `1305:22279`; light: `1395:17588` surface `#e7e9ff`). */
    familyAddCircle: {
      backgroundColor: colors.familyHubAddCtaBg,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    /** Inset area for plus icon inside `familyAddCircle` (matches Figma StateLayer). */
    familyAddIconInner: {
      flex: 1,
      alignSelf: 'stretch',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    storageIndicatorBlock: {
      width: '100%',
    },
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
      position: 'relative',
      borderRadius: 999,
      backgroundColor: HOME_STORAGE_PROGRESS_VISUAL.track,
      overflow: 'hidden',
    },
    storageFill: {
      position: 'absolute',
      left: 0,
      top: 0.29,
      bottom: 0.29,
      borderRadius: 999,
      backgroundColor: HOME_STORAGE_PROGRESS_VISUAL.fill,
    },
    storageCaption: {
      fontWeight: '400',
      color: colors.contentSecondary,
      textAlign: 'center',
    },
  })
}

function MemoryJourneysVideoCard({
  item,
  width,
  height,
  borderRadius,
  playFab,
  playIcon,
  playTop,
}: {
  item: HomeMemoryVideoCard
  width: number
  height: number
  borderRadius: number
  playFab: number
  playIcon: number
  /** Figma `1305:22378` — IconButton `top-[120.85px]` @ 281px tile height */
  playTop: number
}) {
  const colors = useThemeColors()
  const appearance = useThemeStore((s) => s.appearance)
  const local = useMemo(
    () =>
      StyleSheet.create({
        wrap: {
          overflow: 'hidden',
          backgroundColor: colors.surface3,
        },
        playRail: {
          position: 'absolute',
          left: 0,
          right: 0,
          alignItems: 'center',
        },
        playDisc: {
          overflow: 'hidden',
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'center',
        },
        playGlyphWrap: {
          ...StyleSheet.absoluteFillObject,
          alignItems: 'center',
          justifyContent: 'center',
        },
      }),
    [colors],
  )
  const playDiscTint =
    appearance === 'light' ? 'rgba(255,255,255,0.32)' : 'rgba(12,13,16,0.32)'
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${item.title}, ${item.date}, play memory`}
      onPress={() => router.push('/home/memories')}
      style={{ width, height }}
    >
      <View style={[local.wrap, { width, height, borderRadius }]}>
        <ResolvedImage webPath={item.image} style={StyleSheet.absoluteFillObject} resizeMode="cover" />
        <View pointerEvents="none" style={[local.playRail, { top: playTop }]}>
          <View
            style={[
              local.playDisc,
              {
                width: playFab,
                height: playFab,
                borderRadius: playFab / 2,
              },
            ]}
          >
            <BlurView
              intensity={MEMORY_PLAY_BLUR_INTENSITY}
              tint={appearance === 'light' ? 'light' : 'dark'}
              style={StyleSheet.absoluteFillObject}
            />
            <View
              pointerEvents="none"
              style={[StyleSheet.absoluteFillObject, { backgroundColor: playDiscTint }]}
            />
            <View style={local.playGlyphWrap}>
              <Svg
                width={playIcon}
                height={playIcon}
                viewBox={MEMORY_PLAY_GLYPH_VIEWBOX}
                accessibilityElementsHidden
                importantForAccessibility="no-hide-descendants"
              >
                <Path d={MEMORY_PLAY_GLYPH_PATH} fill={colors.onPhotoHigh} />
              </Svg>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  )
}

/** Figma Journeys backup CTA card (`1573:17958`) — surface + frame crop */
const MEM_BACKUP_SURFACE = '#f3f4ff'
/** Figma `1305:22403` — pill uses `colour/surface` white; label `on-colour` #0c0d10 */
const MEM_BACKUP_CTA_BUTTON_BG = '#ffffff'
const MEM_BACKUP_CTA_BUTTON_LABEL = '#0c0d10'

function MemoryJourneysBackupCtaCard({
  item,
  width,
  height,
  borderRadius,
  padH,
  padV,
  stackGap,
  titleBlockGap,
  thumbW,
  thumbH,
  thumbRadius,
  titleSize,
  titleLine,
  ctaWidth,
  ctaPadH,
  ctaPadV,
  ctaMinH,
  ctaLabelSize,
  ctaLabelLine,
}: {
  item: HomeMemoryBackupCtaCard
  width: number
  height: number
  borderRadius: number
  padH: number
  padV: number
  stackGap: number
  titleBlockGap: number
  thumbW: number
  thumbH: number
  thumbRadius: number
  titleSize: number
  titleLine: number
  ctaWidth: number
  ctaPadH: number
  ctaPadV: number
  ctaMinH: number
  ctaLabelSize: number
  ctaLabelLine: number
}) {
  const local = useMemo(
    () =>
      StyleSheet.create({
        root: {
          overflow: 'hidden',
          backgroundColor: MEM_BACKUP_SURFACE,
        },
        backdrop: {
          ...StyleSheet.absoluteFillObject,
          overflow: 'hidden',
        },
        surfaceFill: {
          ...StyleSheet.absoluteFillObject,
          backgroundColor: MEM_BACKUP_SURFACE,
        },
        frameCrop: {
          ...StyleSheet.absoluteFillObject,
          overflow: 'hidden',
        },
        frameImage: {
          position: 'absolute',
          left: 0,
          width: '100%',
          height: '132%',
          top: '-16%',
        },
        body: {
          flex: 1,
          justifyContent: 'space-between',
          zIndex: 1,
        },
        topStack: {
          alignItems: 'center',
          width: '100%',
        },
        thumbBox: {
          overflow: 'hidden',
          backgroundColor: 'transparent',
        },
        titleBlock: {
          alignItems: 'center',
          width: '100%',
        },
        title: {
          fontWeight: '800',
          color: '#ffffff',
          textAlign: 'center',
          width: '100%',
        },
        cta: {
          alignSelf: 'center',
          overflow: 'hidden',
          borderRadius: 9999,
          backgroundColor: MEM_BACKUP_CTA_BUTTON_BG,
          alignItems: 'center',
          justifyContent: 'center',
        },
        ctaLabel: {
          fontWeight: '700',
          color: MEM_BACKUP_CTA_BUTTON_LABEL,
          textAlign: 'center',
        },
      }),
    [],
  )
  const thumbImgLeft = Math.round(thumbW * 0.0236)
  const thumbImgTop = Math.round(thumbH * -0.0034)
  const thumbImgW = Math.max(1, Math.round(thumbW * (1 - 0.0236)))
  const thumbImgH = Math.max(1, Math.round(thumbH * 1.0068))
  return (
    <View style={[local.root, { width, height, borderRadius }]}>
      <View style={[local.backdrop, { borderRadius }]} pointerEvents="none">
        <View style={[local.surfaceFill, { borderRadius }]} />
        <View style={[local.frameCrop, { borderRadius }]}>
          <ResolvedImage webPath={item.frameImage} style={local.frameImage} resizeMode="cover" />
        </View>
      </View>
      <View style={[local.body, { paddingHorizontal: padH, paddingVertical: padV }]}>
        <View style={[local.topStack, { gap: stackGap }]}>
          <View style={[local.thumbBox, { width: thumbW, height: thumbH, borderRadius: thumbRadius }]}>
            <ResolvedImage
              webPath={item.thumbImage}
              style={{
                position: 'absolute',
                left: thumbImgLeft,
                top: thumbImgTop,
                width: thumbImgW,
                height: thumbImgH,
              }}
              resizeMode="cover"
            />
          </View>
          <View style={[local.titleBlock, { gap: titleBlockGap }]}>
            <Text style={[local.title, { fontSize: titleSize, lineHeight: titleLine }]}>{item.title}</Text>
          </View>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={item.ctaLabel}
          onPress={() => router.push('/permission')}
          style={[
            local.cta,
            {
              width: ctaWidth,
              minHeight: ctaMinH,
              paddingHorizontal: ctaPadH,
              paddingVertical: ctaPadV,
            },
          ]}
        >
          <Text style={[local.ctaLabel, { fontSize: ctaLabelSize, lineHeight: ctaLabelLine }]}>{item.ctaLabel}</Text>
        </Pressable>
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
  const t = useTranslation()

  useEffect(() => {
    viewportH.value = Math.max(1, winH)
  }, [winH, viewportH])

  const onScroll = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollY.value = e.contentOffset.y
    },
  })

  const { memCardW, memCardH, greetCardW, greetCardH, photosMosaicInnerW, lx } = useMemo(() => {
    const ww = winW > 0 ? winW : Dimensions.get('window').width
    const ms = (n: number) => moderateSize(n, ww)
    const sectionPad = ms(16)
    const familyAvatarPx = scaleSizeFromDesign(60, ww, JOURNEYS_HOME_FRAME_W)
    return {
      memCardW: ms(MEM_JOURNEYS_CARD_W),
      memCardH: ms(MEM_JOURNEYS_CARD_H),
      greetCardW: ms(102),
      greetCardH: ms(136),
      photosMosaicInnerW: Math.max(1, ww),
      lx: {
        ww,
        sectionPad,
        sectionMarginTop: ms(22),
        sectionGap: ms(10),
        aiSectionMarginTop: ms(10),
        iplThemeBannerHeight: Math.max(
          1,
          Math.round(
            ww *
              (HOME_IPL_THEME_BANNER_PIXEL_SIZE.height / HOME_IPL_THEME_BANNER_PIXEL_SIZE.width),
          ),
        ),
        iplBannerToRailGap: ms(12),
        memoriesSectionMarginTop: ms(20),
        trendingSectionMarginTop: ms(22),
        photoSectionMarginTop: ms(22),
        photoHeaderGap: ms(4),
        photoHeaderPadH: sectionPad,
        memRailGap: ms(10),
        memRailPadV: 0,
        memRadius: ms(12),
        memPlayFab: ms(40),
        memPlayIcon: ms(20),
        memPlayTop: ms(120.85),
        memBackupPadH: ms(15),
        memBackupPadV: ms(13),
        memBackupStackGap: ms(10),
        memBackupTitleBlockGap: ms(7),
        memBackupThumbW: ms(87),
        memBackupThumbH: ms(87),
        memBackupThumbRadius: ms(8),
        memBackupTitleSize: ms(16),
        memBackupTitleLine: ms(18),
        memBackupCtaMinW: ms(128),
        memBackupCtaPadH: ms(12),
        memBackupCtaPadV: ms(4),
        memBackupCtaMinH: ms(32),
        memBackupCtaLabelSize: ms(16),
        memBackupCtaLabelLine: ms(16),
        greetRailGap: ms(10),
        greetCardRadius: ms(10),
        greetLabelPadH: ms(8),
        greetLabelBottom: ms(10),
        familyStorageSectionPadTop: ms(20),
        familyBlockGap: ms(16),
        familyTitleBlockGap: ms(6),
        familyToStorageGap: ms(32),
        familyRailGap: ms(8),
        familyAvatarSize: familyAvatarPx,
        familyAvatarStackGap: ms(12),
        /** Figma `1305:22458` — `p-[10px]` around `size-[40px]` icon inside 60px pill */
        familyAddIconInset: Math.max(1, Math.round((familyAvatarPx * 10) / 60)),
        familyAddIconBox: Math.max(1, Math.round((familyAvatarPx * 40) / 60)),
        familyHubTitleSize: ms(20),
        familyHubSubSize: ms(12),
        familyHubSubLine: ms(14),
        familyNameSize: ms(14),
        familyNameLine: ms(20),
        storageMetaGap: ms(10),
        cricketFooterMarginTop: ms(22),
        cricketFooterPadH: ms(17),
        cricketFooterPadTop: ms(32),
        /** Figma `1305:22633` uses large pb; stack already sits above tab bar — use 0 here; scroll tail comes from `homeBottomTabScrollPaddingBottom`. */
        cricketFooterPadBottom: 0,
        cricketFooterTitleSize: ms(28.79),
        cricketFooterTitleLine: ms(28.79),
        cricketFooterTitleStackGap: ms(6),
        cricketFooterPlayersW: ms(167),
        cricketFooterPlayersH: ms(53.679),
        headRowGap: ms(12),
        hitSlop: ms(8),
        aiTitleSize: ms(20),
        memoriesTitleSize: ms(20),
        photosTitleSize: ms(20),
        sectionTitleSize: ms(18),
        sectionTitleLine: ms(22),
        sectionSubSize: ms(14),
        sectionSubLine: ms(18),
        greetLabelSize: ms(12),
        greetLabelLine: ms(15),
        storageLabelSize: ms(16),
        storageCaptionSize: ms(14),
        storageTrackH: ms(8),
        /** Figma `1247:19060` — min fill width @360 when usage > 0 */
        storageFillMinW: scaleSizeFromDesign(12, ww, JOURNEYS_HOME_FRAME_W),
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
          <View style={{ marginTop: lx.aiSectionMarginTop, gap: lx.iplBannerToRailGap }}>
            <HomeIplThemeBanner height={lx.iplThemeBannerHeight} />
            <View
              style={[
                styles.section,
                {
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
              <Button
                variant="hierarchy"
                accessibilityLabel="View all"
                hitSlop={lx.hitSlop}
                onPress={() => router.push('/home/create')}
              >
                View all
              </Button>
            }
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[styles.greetHRail, { gap: lx.greetRailGap }]}
          >
            {HOME_GREETINGS_SECTION.items.map((item) => (
              <Pressable
                key={item.id}
                accessibilityRole="button"
                accessibilityLabel={`${item.label}, open greeting`}
                onPress={() => router.push(`/home/greeting/${item.id}`)}
                style={{ width: greetCardW }}
              >
                <View
                  style={[
                    styles.greetCard,
                    {
                      width: greetCardW,
                      height: greetCardH,
                      borderRadius: lx.greetCardRadius,
                      borderWidth: StyleSheet.hairlineWidth,
                      borderColor: GREET_CARD_BORDER,
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
                    colors={[...GREET_CARD_GRADIENT_COLORS]}
                    locations={[...GREET_CARD_GRADIENT_LOCATIONS]}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1 }}
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
                </View>
              </Pressable>
            ))}
          </ScrollView>
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
              marginTop: lx.memoriesSectionMarginTop,
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
              <Button
                variant="hierarchy"
                accessibilityLabel="View all"
                hitSlop={lx.hitSlop}
                onPress={() => router.push('/home/memories')}
              >
                View all
              </Button>
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
            {HOME_MEMORIES_SECTION.items.map((item) =>
              item.kind === 'memory-video' ? (
                <MemoryJourneysVideoCard
                  key={item.id}
                  item={item}
                  width={memCardW}
                  height={memCardH}
                  borderRadius={lx.memRadius}
                  playFab={lx.memPlayFab}
                  playIcon={lx.memPlayIcon}
                  playTop={lx.memPlayTop}
                />
              ) : (
                <MemoryJourneysBackupCtaCard
                  key={item.id}
                  item={item}
                  width={memCardW}
                  height={memCardH}
                  borderRadius={lx.memRadius}
                  padH={lx.memBackupPadH}
                  padV={lx.memBackupPadV}
                  stackGap={lx.memBackupStackGap}
                  titleBlockGap={lx.memBackupTitleBlockGap}
                  thumbW={lx.memBackupThumbW}
                  thumbH={lx.memBackupThumbH}
                  thumbRadius={lx.memBackupThumbRadius}
                  titleSize={lx.memBackupTitleSize}
                  titleLine={lx.memBackupTitleLine}
                  ctaWidth={lx.memBackupCtaMinW}
                  ctaPadH={lx.memBackupCtaPadH}
                  ctaPadV={lx.memBackupCtaPadV}
                  ctaMinH={lx.memBackupCtaMinH}
                  ctaLabelSize={lx.memBackupCtaLabelSize}
                  ctaLabelLine={lx.memBackupCtaLabelLine}
                />
              ),
            )}
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
            styles.section,
            {
              marginTop: lx.trendingSectionMarginTop,
              paddingHorizontal: lx.sectionPad,
              gap: lx.sectionGap,
            },
          ]}
        >
          <SectionHeader
            title={HOME_TRENDING_SECTION.title}
            titleStyle={[
              styles.memoriesSectionTitle,
              { fontSize: lx.memoriesTitleSize, lineHeight: lx.memoriesTitleSize },
            ]}
            rowStyle={{ gap: lx.headRowGap }}
            action={
              <Button
                variant="hierarchy"
                accessibilityLabel="View all"
                hitSlop={lx.hitSlop}
                onPress={() => router.push('/home/create')}
              >
                View all
              </Button>
            }
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[styles.greetHRail, { gap: lx.greetRailGap }]}
          >
            {HOME_TRENDING_SECTION.items.map((item) => (
              <Pressable
                key={item.id}
                accessibilityRole="button"
                accessibilityLabel={`${item.label}, trending`}
                onPress={() => router.push('/home/create')}
                style={{ width: greetCardW }}
              >
                <View
                  style={[
                    styles.greetCard,
                    {
                      width: greetCardW,
                      height: greetCardH,
                      borderRadius: lx.greetCardRadius,
                      borderWidth: StyleSheet.hairlineWidth,
                      borderColor: GREET_CARD_BORDER,
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
                    colors={[...TREND_CARD_GRADIENT_COLORS]}
                    locations={[...TREND_CARD_GRADIENT_LOCATIONS]}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1 }}
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
                </View>
              </Pressable>
            ))}
          </ScrollView>
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
            styles.familyStorageRoot,
            {
              marginTop: lx.sectionMarginTop,
              paddingHorizontal: lx.sectionPad,
              paddingTop: lx.familyStorageSectionPadTop,
              gap: lx.familyToStorageGap,
            },
          ]}
        >
          <View style={{ gap: lx.familyBlockGap }}>
            <View style={{ gap: lx.familyTitleBlockGap }}>
              <Text
                style={[
                  styles.familyHubTitle,
                  { fontSize: lx.familyHubTitleSize, lineHeight: lx.familyHubTitleSize },
                ]}
                numberOfLines={1}
              >
                {HOME_FAMILY_HUB_SECTION.title}
              </Text>
              <Text
                style={[
                  styles.familyHubSubtitle,
                  { fontSize: lx.familyHubSubSize, lineHeight: lx.familyHubSubLine },
                ]}
              >
                {HOME_FAMILY_HUB_SECTION.subtitle}
              </Text>
            </View>
            <View style={[styles.familyAvatarRow, { gap: lx.familyRailGap }]}>
              {HOME_FAMILY_HUB_SECTION.members.map((member) => (
                <Pressable
                  key={member.id}
                  onPress={() => router.push('/home/profile')}
                  style={[styles.familyMemberCol, { gap: lx.familyAvatarStackGap }]}
                  hitSlop={lx.hitSlop}
                >
                  <View
                    style={[
                      styles.familyMemberAvatarClip,
                      {
                        width: lx.familyAvatarSize,
                        height: lx.familyAvatarSize,
                        borderRadius: lx.familyAvatarSize / 2,
                      },
                    ]}
                  >
                    <ResolvedImage
                      webPath={member.image}
                      style={StyleSheet.absoluteFillObject}
                      resizeMode="cover"
                    />
                  </View>
                  <Text
                    style={[
                      styles.familyMemberName,
                      { fontSize: lx.familyNameSize, lineHeight: lx.familyNameLine },
                    ]}
                    numberOfLines={1}
                  >
                    {member.name}
                  </Text>
                </Pressable>
              ))}
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={t.family_hub_add_member_aria}
                onPress={() => router.push('/home/profile')}
                hitSlop={lx.hitSlop}
                style={({ pressed }) => [
                  styles.familyMemberCol,
                  { gap: lx.familyAvatarStackGap, opacity: pressed ? 0.88 : 1 },
                ]}
              >
                <View
                  style={[
                    styles.familyAddCircle,
                    {
                      width: lx.familyAvatarSize,
                      height: lx.familyAvatarSize,
                      borderRadius: lx.familyAvatarSize / 2,
                    },
                  ]}
                >
                  <View
                    style={[styles.familyAddIconInner, { padding: lx.familyAddIconInset }]}
                  >
                    <FamilyHubAddPlusIcon color={colors.primary600} size={lx.familyAddIconBox} />
                  </View>
                </View>
                <Text
                  style={[
                    styles.familyMemberName,
                    { fontSize: lx.familyNameSize, lineHeight: lx.familyNameLine },
                  ]}
                  numberOfLines={1}
                >
                  {t.family_hub_add_member}
                </Text>
              </Pressable>
            </View>
          </View>

          <View style={[styles.storageIndicatorBlock, { gap: lx.storageMetaGap }]}>
            <View style={{ gap: lx.storageMetaGap }}>
              <View style={styles.storageLabels}>
                <Text style={[styles.storageLabel, { fontSize: lx.storageLabelSize }]}>Storage</Text>
                <Text style={[styles.storageNums, { fontSize: lx.storageLabelSize }]}>
                  {HOME_STORAGE_INDICATOR.used} GB / {HOME_STORAGE_INDICATOR.total} GB
                </Text>
              </View>
              <View style={[styles.storageTrack, { height: lx.storageTrackH }]}>
                <View
                  style={[
                    styles.storageFill,
                    {
                      width: `${Math.min(100, (HOME_STORAGE_INDICATOR.used / HOME_STORAGE_INDICATOR.total) * 100)}%`,
                      minWidth:
                        HOME_STORAGE_INDICATOR.used > 0 ? lx.storageFillMinW : 0,
                    },
                  ]}
                />
              </View>
            </View>
            <Text
              style={[
                styles.storageCaption,
                { fontSize: lx.storageCaptionSize, lineHeight: lx.storageCaptionSize + 2 },
              ]}
            >
              {HOME_STORAGE_INDICATOR.caption}
            </Text>
          </View>
        </ScrollRevealSection>

        <ScrollRevealSection
          scrollY={scrollY}
          viewportHeight={viewportH}
          style={[
            styles.section,
            {
              marginTop: lx.cricketFooterMarginTop,
            },
          ]}
        >
          <HomeCricketThemeFooter
            lx={{
              padH: lx.cricketFooterPadH,
              padTop: lx.cricketFooterPadTop,
              padBottom: lx.cricketFooterPadBottom,
              titleSize: lx.cricketFooterTitleSize,
              titleLine: lx.cricketFooterTitleLine,
              titleStackGap: lx.cricketFooterTitleStackGap,
              playersW: lx.cricketFooterPlayersW,
              playersH: lx.cricketFooterPlayersH,
            }}
          />
        </ScrollRevealSection>
      </Animated.ScrollView>
    </View>
  )
}
