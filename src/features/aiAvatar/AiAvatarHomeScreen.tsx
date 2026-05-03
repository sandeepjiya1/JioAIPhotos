import { useCallback, useMemo, useState } from 'react'
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native'
import { BlurView } from 'expo-blur'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { CreditsCoinStackIcon } from '@/components/atoms/CreditsCoinStackIcon'
import { ChevronRight } from '@/components/molecules/ChevronRight'
import { homeBottomTabScrollPaddingBottom } from '@/components/layout/HomeBottomNav'
import { AiAvatarFaceoffArt } from '@/features/aiAvatar/AiAvatarFaceoffArt'
import { AiAvatarFigmaPhotoCard } from '@/features/aiAvatar/AiAvatarFigmaPhotoCard'
import {
  CARD_SUBTITLE_TO_ART_GAP_DP,
  CARD_TEXT_INSET_DP,
  CARD_TITLE_SUBTITLE_GAP_DP,
  aiAvatarCategoryScale,
} from '@/features/aiAvatar/aiAvatarFigmaLayout'
import { AiAvatarJerseysArt } from '@/features/aiAvatar/AiAvatarJerseysArt'
import {
  FACEOFF_HEADER_BRIDGE_COLORS,
  FACEOFF_HEADER_BRIDGE_LOCATIONS,
  TEXT_SCRIM_JERSEYS_COLORS,
  TEXT_SCRIM_JERSEYS_END,
  TEXT_SCRIM_JERSEYS_LOCATIONS,
  TEXT_SCRIM_JERSEYS_START,
} from '@/features/aiAvatar/aiAvatarTextScrim'
import { ResolvedImage } from '@/features/home/ResolvedImage'
import { useTranslation } from '@/hooks/useTranslation'
import { useThemeStore } from '@/store/themeStore'
import { moderateSize, scaleSizeFromDesign } from '@/theme/layoutScale'
import { useThemeColors } from '@/theme/useThemeColors'

/** Figma Pod1 `2385:10969` — AI Avatar home: header, hero, category grid. */
export default function AiAvatarHomeScreen() {
  const colors = useThemeColors()
  const appearance = useThemeStore((s) => s.appearance)
  const insets = useSafeAreaInsets()
  const { width: winW } = useWindowDimensions()
  const t = useTranslation()
  const ww = winW > 0 ? winW : Dimensions.get('window').width

  /** Figma frame `2385:10969` is 360×800 — scale card px from 360, not default 390. */
  const FIGMA_FRAME = 360
  const pad = moderateSize(16, ww)
  const gridGap = scaleSizeFromDesign(8, ww, FIGMA_FRAME)
  const shortCardH = scaleSizeFromDesign(150, ww, FIGMA_FRAME)
  const tallFaceoffH = shortCardH + gridGap + shortCardH
  /** Image stack starts ~92px below card top in the 160pt-wide spec (`2385:11001`). */
  const faceoffHeaderH = scaleSizeFromDesign(92, ww, FIGMA_FRAME)
  const faceoffArtH = Math.max(1, tallFaceoffH - faceoffHeaderH)
  const radius = moderateSize(8, ww)
  const kickerSize = moderateSize(16, ww)
  const titleSize = moderateSize(12, ww)
  const heroSize = moderateSize(22, ww)
  const subSize = moderateSize(14, ww)
  const barH = moderateSize(56, ww)
  const gridColW = (ww - 2 * pad - gridGap) / 2
  const s = aiAvatarCategoryScale(gridColW)
  const cardPad = CARD_TEXT_INSET_DP * s
  const gapTitleSubtitle = CARD_TITLE_SUBTITLE_GAP_DP * s
  const gapSubtitleArt = CARD_SUBTITLE_TO_ART_GAP_DP * s
  const [faceoffCopyBlockH, setFaceoffCopyBlockH] = useState(0)
  const faceoffBridgeTop = Math.max(
    faceoffHeaderH - 49 * s,
    cardPad + faceoffCopyBlockH + gapSubtitleArt,
  )
  const faceoffTextKicker = appearance === 'light' ? '#0c0d10' : '#FFFFFF'
  const faceoffTextSub = appearance === 'light' ? 'rgba(12, 13, 16, 0.8)' : 'rgba(255, 255, 255, 0.8)'
  const faceoffCopyMaxH = Math.max(0, faceoffHeaderH - cardPad - gapSubtitleArt)

  const goBack = useCallback(() => {
    if (router.canGoBack()) router.back()
    else router.replace('/home')
  }, [])

  const goJerseys = useCallback(() => {
    router.push('/home/ai-avatar-jerseys')
  }, [])

  const styles = useMemo(
    () =>
      StyleSheet.create({
        root: { flex: 1, backgroundColor: colors.surface0 },
        headerOuter: {
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: colors.hairlineOnGlass,
          backgroundColor: colors.shellUnderlay,
        },
        headerRow: {
          flexDirection: 'row',
          alignItems: 'center',
          minHeight: barH,
          paddingHorizontal: pad,
        },
        headerStart: { flexDirection: 'row', alignItems: 'center', gap: moderateSize(8, ww), flex: 1 },
        headerTitle: {
          fontSize: moderateSize(18, ww),
          lineHeight: moderateSize(22, ww),
          fontWeight: '700',
          color: colors.contentPrimary,
        },
        credits: { flexDirection: 'row', alignItems: 'center', gap: moderateSize(4, ww) },
        /** Figma `2385:10979` — 19×19 container, coin stack glyph centered on primary. */
        creditsIcon: {
          width: moderateSize(19, ww),
          height: moderateSize(19, ww),
          borderRadius: moderateSize(19, ww) / 2,
          backgroundColor: colors.primary600,
          alignItems: 'center',
          justifyContent: 'center',
        },
        creditsText: {
          fontSize: moderateSize(12, ww),
          lineHeight: moderateSize(14, ww),
          fontWeight: '600',
          color: colors.contentPrimary,
        },
        hero: { paddingHorizontal: pad, paddingTop: moderateSize(24, ww), paddingBottom: moderateSize(8, ww) },
        heroRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: moderateSize(8, ww) },
        heroHeadline: {
          fontSize: heroSize,
          lineHeight: heroSize + 4,
          fontWeight: '900',
          color: colors.contentPrimary,
          textAlign: 'center',
          flexShrink: 1,
        },
        heroSpark: {
          width: moderateSize(30, ww),
          height: moderateSize(30, ww),
          borderRadius: moderateSize(6, ww),
          overflow: 'hidden',
        },
        heroSub: {
          marginTop: moderateSize(12, ww),
          fontSize: subSize,
          lineHeight: subSize + 4,
          color: colors.contentSecondary,
          textAlign: 'center',
        },
        grid: {
          paddingHorizontal: pad,
          paddingBottom: moderateSize(8, ww),
          width: '100%',
          maxWidth: '100%',
          alignSelf: 'stretch',
        },
        row: { flexDirection: 'row', alignItems: 'stretch' },
        /** Figma card shell: `2385:11001` — surface + border on `rgba(175,177,182,0.16)`. */
        card: {
          borderRadius: radius,
          backgroundColor: 'rgba(175, 177, 182, 0.16)',
          borderWidth: 1,
          borderColor: appearance === 'light' ? 'rgba(12, 13, 16, 0.12)' : colors.hairlineOnGlass,
          overflow: 'hidden',
        },
        /** Headline S — `2385:11002`, `11027`, … */
        categoryHeadline: {
          fontSize: kickerSize,
          lineHeight: kickerSize + 2,
          fontWeight: '900',
          color: colors.contentPrimary,
        },
        /** Label XS Medium — `2385:11018`, `11026`, … */
        categoryLabel: {
          fontSize: titleSize,
          lineHeight: titleSize + 4,
          fontWeight: '500',
          color: colors.contentSecondary,
        },
      }),
    [appearance, colors, pad, radius, ww, barH, heroSize, kickerSize, subSize, titleSize],
  )

  return (
    <View style={styles.root}>
      <View style={[styles.headerOuter, { paddingTop: insets.top }]}>
        <BlurView intensity={72} tint={appearance === 'light' ? 'light' : 'dark'} style={StyleSheet.absoluteFill} />
        <View style={[StyleSheet.absoluteFillObject, { backgroundColor: colors.glassTint }]} pointerEvents="none" />
        <View style={styles.headerRow}>
          <View style={styles.headerStart}>
            <Pressable
              onPress={goBack}
              hitSlop={12}
              accessibilityRole="button"
              accessibilityLabel={t.ai_avatar_home_back_aria}
              style={{ transform: [{ scaleX: -1 }] }}
            >
              <ChevronRight size={moderateSize(22, ww)} color={colors.contentPrimary} />
            </Pressable>
            <Text style={styles.headerTitle}>{t.create_sheet_avatar_title}</Text>
          </View>
          <View
            style={styles.credits}
            accessibilityRole="text"
            accessibilityLabel={t.ai_avatar_home_credits_aria}
          >
            <View style={styles.creditsIcon}>
              <CreditsCoinStackIcon
                width={moderateSize(12, ww)}
                height={moderateSize(15, ww)}
                color="#FFFFFF"
              />
            </View>
            <Text style={styles.creditsText}>100</Text>
          </View>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingBottom: homeBottomTabScrollPaddingBottom(insets.bottom, ww),
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <View style={styles.heroRow}>
            <Text style={styles.heroHeadline}>{t.ai_avatar_home_hero_headline}</Text>
            <View style={styles.heroSpark}>
              <ResolvedImage
                webPath="/assets/home/83c0bf22e405b4ce159b1bac7e022b325662129d.png?v=20260502"
                resizeMode="cover"
                style={StyleSheet.absoluteFillObject}
              />
            </View>
          </View>
          <Text style={styles.heroSub}>{t.ai_avatar_home_hero_subtitle}</Text>
        </View>

        <View style={[styles.grid, { gap: gridGap }]}>
          <View style={[styles.row, { gap: gridGap }]}>
            {/** `2385:11001` Cricket Faceoff — surface, border, `11002` kicker, `11018` label, `11017` bridge scrim */}
            <Pressable
              style={[
                styles.card,
                {
                  flex: 1,
                  height: tallFaceoffH,
                  overflow: 'hidden',
                  position: 'relative',
                  borderColor:
                    appearance === 'light' ? 'rgba(12, 13, 16, 0.6)' : colors.hairlineOnGlass,
                },
              ]}
              accessibilityRole="button"
            >
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: faceoffArtH,
                  zIndex: 0,
                }}
                pointerEvents="none"
              >
                <AiAvatarFaceoffArt width={gridColW} height={faceoffArtH} />
              </View>
              <View
                style={{
                  position: 'absolute',
                  left: -1 * s,
                  right: -1 * s,
                  top: faceoffBridgeTop,
                  height: 49 * s,
                  zIndex: 1,
                  transform: [{ rotate: '180deg' }],
                }}
                pointerEvents="none"
              >
                <LinearGradient
                  colors={[...FACEOFF_HEADER_BRIDGE_COLORS]}
                  locations={[...FACEOFF_HEADER_BRIDGE_LOCATIONS]}
                  start={{ x: 0.5, y: 0 }}
                  end={{ x: 0.5, y: 1 }}
                  style={StyleSheet.absoluteFillObject}
                />
              </View>
              <View
                style={{
                  position: 'absolute',
                  top: cardPad,
                  left: cardPad,
                  right: cardPad,
                  zIndex: 2,
                  flexDirection: 'column',
                  gap: gapTitleSubtitle,
                  maxHeight: faceoffCopyMaxH > 0 ? faceoffCopyMaxH : undefined,
                }}
                onLayout={(e) => {
                  const h = e.nativeEvent.layout.height
                  setFaceoffCopyBlockH((prev) => (Math.abs(h - prev) > 0.5 ? h : prev))
                }}
              >
                <Text
                  style={[
                    styles.categoryHeadline,
                    { textAlign: 'left', color: faceoffTextKicker, flexShrink: 1 },
                  ]}
                  numberOfLines={2}
                >
                  {t.ai_avatar_faceoff_kicker}
                </Text>
                <Text
                  style={[
                    styles.categoryLabel,
                    { textAlign: 'left', marginTop: 0, color: faceoffTextSub, flexShrink: 1 },
                  ]}
                  numberOfLines={3}
                >
                  {t.ai_avatar_faceoff_title}
                </Text>
              </View>
            </Pressable>

            <View style={{ flex: 1, gap: gridGap }}>
              {/** `2385:11020` + `11025` Cricket Jerseys */}
              <Pressable
                onPress={goJerseys}
                style={[styles.card, { height: shortCardH, position: 'relative', overflow: 'hidden' }]}
                accessibilityRole="button"
                accessibilityLabel={`${t.ai_avatar_jerseys_kicker}. ${t.ai_avatar_jerseys_title}`}
              >
                <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
                  <AiAvatarJerseysArt width={gridColW} height={shortCardH} />
                </View>
                <LinearGradient
                  colors={[...TEXT_SCRIM_JERSEYS_COLORS]}
                  locations={[...TEXT_SCRIM_JERSEYS_LOCATIONS]}
                  start={TEXT_SCRIM_JERSEYS_START}
                  end={TEXT_SCRIM_JERSEYS_END}
                  style={[StyleSheet.absoluteFillObject, { zIndex: 1 }]}
                  pointerEvents="none"
                />
                <View
                  style={{
                    position: 'absolute',
                    top: cardPad,
                    left: cardPad,
                    right: cardPad,
                    zIndex: 2,
                    flexDirection: 'column',
                    gap: gapTitleSubtitle,
                  }}
                >
                  <Text
                    style={[
                      styles.categoryHeadline,
                      { textAlign: 'left', color: 'rgba(255, 255, 255, 1)', flexShrink: 1 },
                    ]}
                    numberOfLines={2}
                  >
                    {t.ai_avatar_jerseys_kicker}
                  </Text>
                  <Text
                    style={[
                      styles.categoryLabel,
                      {
                        textAlign: 'left',
                        marginTop: 0,
                        color: 'rgba(255, 255, 255, 0.8)',
                        flexShrink: 1,
                      },
                    ]}
                    numberOfLines={3}
                  >
                    {t.ai_avatar_jerseys_title}
                  </Text>
                </View>
              </Pressable>

              {/** `2385:11028` Bridal makeup */}
              <Pressable
                style={[styles.card, { height: shortCardH, position: 'relative', overflow: 'hidden' }]}
                accessibilityRole="button"
              >
                <AiAvatarFigmaPhotoCard
                  variant="bridal"
                  width={gridColW}
                  height={shortCardH}
                  imageWebPath="/assets/home/9f5858a41501f3b61328062a26af323f8ebead18.png?v=20260502"
                  title={t.ai_avatar_bridal_kicker}
                  subtitle={t.ai_avatar_bridal_title}
                  kickerStyle={styles.categoryHeadline}
                  cardTitleStyle={styles.categoryLabel}
                />
              </Pressable>
            </View>
          </View>

          <View style={[styles.row, { gap: gridGap }]}>
            {/** `2385:11034` Corporate look */}
            <Pressable
              style={[styles.card, { flex: 1, height: shortCardH, position: 'relative', overflow: 'hidden' }]}
              accessibilityRole="button"
            >
              <AiAvatarFigmaPhotoCard
                variant="corporate"
                width={gridColW}
                height={shortCardH}
                imageWebPath="/assets/home/aa4e68f0e2149d0f4e4c997fd38d7a3f07bc72ac.png?v=20260502"
                title={t.ai_avatar_corporate_kicker}
                subtitle={t.ai_avatar_corporate_title}
                kickerStyle={styles.categoryHeadline}
                cardTitleStyle={styles.categoryLabel}
              />
            </Pressable>

            {/** `2385:11039` Royal look */}
            <Pressable
              style={[styles.card, { flex: 1, height: shortCardH, position: 'relative', overflow: 'hidden' }]}
              accessibilityRole="button"
            >
              <AiAvatarFigmaPhotoCard
                variant="royal"
                width={gridColW}
                height={shortCardH}
                imageWebPath="/assets/home/7111ceeb6e2fd7b0b913a4aa4a5a282ef4835a2a.png?v=20260502"
                title={t.ai_avatar_royal_kicker}
                subtitle={t.ai_avatar_royal_title}
                kickerStyle={styles.categoryHeadline}
                cardTitleStyle={styles.categoryLabel}
              />
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
