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
import { LinearGradient } from 'expo-linear-gradient'
import { router, useLocalSearchParams } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { TopBar } from '@/components/layout/TopBar'
import { ResolvedImage } from '@/features/home/ResolvedImage'
import {
  GREETING_DETAIL_CHIP_ROWS,
  getGreetingDetailById,
} from '@/features/greetings/greetingDetailContent'
import { useThemeStore } from '@/store/themeStore'
import type { AppThemeColors } from '@/theme/palettes'
import { moderateSize } from '@/theme/layoutScale'
import { useThemeColors } from '@/theme/useThemeColors'

/**
 * Figma **Jio AI Cloud — Temp** `839:10412` (*Greetings/Detail_Page*).
 * Spacing and card aspect follow design tokens + `moderateSize` for scale.
 */
const CARD_W_RATIO = 307 / 360
const CARD_H_RATIO = 461 / 307

const WHATSAPP_GREEN = '#25D366' as const

function createStyles(colors: AppThemeColors, ww: number) {
  const padH = moderateSize(16, ww)
  const chipRowGap = moderateSize(4, ww)
  const chipH = moderateSize(20, ww)
  const chipPadX = moderateSize(10, ww)
  const chipFont = moderateSize(12, ww)
  const chipLine = moderateSize(12, ww)
  const chipGap = moderateSize(6, ww)
  const salutationSize = moderateSize(28, ww)
  const salutationLine = moderateSize(30, ww)
  const carouselGap = moderateSize(16, ww)
  const cardRadius = moderateSize(16, ww)
  const thumbGap = moderateSize(8, ww)
  const dockPadH = padH
  const dockPadV = moderateSize(18, ww)
  const dockRadius = moderateSize(32, ww)
  const iconBtn = moderateSize(40, ww)
  const footerGap = moderateSize(12, ww)

  return StyleSheet.create({
    root: { flex: 1, backgroundColor: colors.surface0 },
    scroll: { flex: 1 },
    scrollInner: { paddingHorizontal: padH, paddingTop: moderateSize(8, ww), paddingBottom: moderateSize(16, ww) },
    chipRows: { gap: chipRowGap, marginBottom: moderateSize(12, ww) },
    chipRow: { flexDirection: 'row', gap: chipGap, alignItems: 'center', width: '100%' },
    chip: {
      flex: 1,
      minWidth: 0,
      borderRadius: 9999,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: colors.contentTertiary,
      backgroundColor: colors.surface0,
      paddingHorizontal: chipPadX,
      minHeight: chipH,
      justifyContent: 'center',
      alignItems: 'center',
    },
    chipSelected: {
      borderColor: colors.primary600,
      backgroundColor: colors.buttonSecondaryBg,
    },
    chipLabel: {
      fontSize: chipFont,
      lineHeight: chipLine,
      fontWeight: '500',
      color: colors.contentPrimary,
      textAlign: 'center',
    },
    salutation: {
      textAlign: 'center',
      fontSize: salutationSize,
      lineHeight: salutationLine,
      fontWeight: '700',
      fontStyle: 'italic',
      color: colors.contentSecondary,
      marginBottom: moderateSize(16, ww),
    },
    carousel: { marginHorizontal: -padH, marginBottom: moderateSize(12, ww) },
    carouselContent: { paddingHorizontal: padH, gap: carouselGap },
    cardWrap: { position: 'relative' },
    cardBorder: {
      borderWidth: 1,
      borderColor: colors.onPhotoMedium,
      borderRadius: cardRadius,
      overflow: 'hidden',
    },
    cardGradTop: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      height: '42%',
      borderTopLeftRadius: cardRadius,
      borderTopRightRadius: cardRadius,
    },
    cardGradBot: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: '42%',
      borderBottomLeftRadius: cardRadius,
      borderBottomRightRadius: cardRadius,
    },
    fromLabel: {
      fontSize: moderateSize(14, ww),
      lineHeight: moderateSize(18, ww),
      fontWeight: '700',
      color: colors.onPhotoHigh,
    },
    thumbRail: { flexDirection: 'row', gap: thumbGap, paddingVertical: moderateSize(8, ww), alignItems: 'center' },
    thumb: { overflow: 'hidden', borderWidth: 2, borderColor: colors.onPhotoHigh },
    thumbSelected: { borderColor: colors.primary600 },
    dock: {
      borderTopLeftRadius: dockRadius,
      borderTopRightRadius: dockRadius,
      backgroundColor: colors.surface0,
      paddingHorizontal: dockPadH,
      paddingTop: dockPadV,
      flexDirection: 'row',
      alignItems: 'center',
      gap: footerGap,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderColor: colors.hairlineOnGlass,
    },
    iconOutlineBtn: {
      width: iconBtn,
      height: iconBtn,
      borderRadius: 9999,
      borderWidth: 1,
      borderColor: colors.contentTertiary,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
    },
    iconOutlineGlyph: { fontSize: moderateSize(18, ww), color: colors.contentPrimary },
    waBtn: {
      flex: 1,
      minHeight: iconBtn,
      borderRadius: 9999,
      backgroundColor: WHATSAPP_GREEN,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: moderateSize(8, ww),
      paddingHorizontal: moderateSize(16, ww),
    },
    waLabel: {
      fontSize: moderateSize(16, ww),
      lineHeight: moderateSize(18, ww),
      fontWeight: '700',
      color: colors.onPhotoHigh,
    },
    backBtn: {
      minWidth: moderateSize(40, ww),
      minHeight: moderateSize(44, ww),
      justifyContent: 'center',
    },
    backGlyph: {
      fontSize: moderateSize(28, ww),
      lineHeight: moderateSize(32, ww),
      color: colors.contentPrimary,
      fontWeight: '300',
    },
    railIconCol: {
      position: 'absolute',
      right: moderateSize(8, ww),
      top: moderateSize(10, ww),
      gap: moderateSize(8, ww),
    },
    railIconBtn: {
      width: moderateSize(28, ww),
      height: moderateSize(28, ww),
      borderRadius: 9999,
      backgroundColor: 'rgba(0,15,26,0.92)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    railIconTxt: { fontSize: moderateSize(12, ww), color: colors.onPhotoHigh },
  })
}

export default function GreetingDetailScreen() {
  const colors = useThemeColors()
  const appearance = useThemeStore((s) => s.appearance)
  const { width: winW } = useWindowDimensions()
  const ww = winW > 0 ? winW : Dimensions.get('window').width
  const insets = useSafeAreaInsets()
  const { id: rawId } = useLocalSearchParams<{ id?: string | string[] }>()
  const id = typeof rawId === 'string' ? rawId : Array.isArray(rawId) ? rawId[0] : ''
  const model = useMemo(() => (id ? getGreetingDetailById(id) : null), [id])
  const styles = useMemo(() => createStyles(colors, ww), [colors, ww])

  const [selectedChip, setSelectedChip] = useState<string | null>(null)
  const [selectedThumb, setSelectedThumb] = useState(0)

  const cardW = Math.max(200, Math.round(ww * CARD_W_RATIO))
  const cardH = Math.round(cardW * CARD_H_RATIO)
  const thumbPx = moderateSize(56, ww)
  const cardRadiusPx = moderateSize(16, ww)
  const dockBottomPad = moderateSize(12, ww) + insets.bottom

  const onBack = useCallback(() => {
    if (router.canGoBack()) router.back()
    else router.replace('/home')
  }, [])

  if (!model) {
    return (
      <View style={styles.root}>
        <StatusBar style={appearance === 'light' ? 'dark' : 'light'} />
        <TopBar
          transparent
          title="Greetings"
          left={
            <Pressable style={styles.backBtn} onPress={onBack} accessibilityRole="button" accessibilityLabel="Go back">
              <Text style={styles.backGlyph}>‹</Text>
            </Pressable>
          }
        />
        <View style={{ flex: 1, padding: moderateSize(24, ww), justifyContent: 'center' }}>
          <Text style={{ color: colors.contentSecondary, fontSize: moderateSize(16, ww) }}>Greeting not found.</Text>
          <Pressable onPress={onBack} style={{ marginTop: 16 }}>
            <Text style={{ color: colors.primary600, fontSize: moderateSize(16, ww) }}>Return home</Text>
          </Pressable>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.root}>
      <StatusBar style={appearance === 'light' ? 'dark' : 'light'} />
      <TopBar
        transparent
        title="Greetings"
        left={
          <Pressable style={styles.backBtn} onPress={onBack} accessibilityRole="button" accessibilityLabel="Go back">
            <Text style={styles.backGlyph}>‹</Text>
          </Pressable>
        }
      />
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollInner}>
        <View style={styles.chipRows}>
          {GREETING_DETAIL_CHIP_ROWS.map((row, ri) => (
            <View key={`chip-row-${ri}`} style={styles.chipRow}>
              {row.map((label) => {
                const selected = selectedChip === label
                return (
                  <Pressable
                    key={label}
                    onPress={() => setSelectedChip((c) => (c === label ? null : label))}
                    style={[styles.chip, selected && styles.chipSelected]}
                    accessibilityRole="button"
                    accessibilityState={{ selected }}
                  >
                    <Text style={styles.chipLabel} numberOfLines={1}>
                      {label}
                    </Text>
                  </Pressable>
                )
              })}
            </View>
          ))}
        </View>

        <Text style={styles.salutation} accessibilityRole="header">
          {model.salutation}
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.carousel}
          contentContainerStyle={[styles.carouselContent, { alignItems: 'stretch' }]}
          decelerationRate="fast"
        >
          {model.carouselImages.map((uri, idx) => (
            <View key={`${uri}-${idx}`} style={[styles.cardWrap, { width: cardW, height: cardH }]}>
              <View style={[styles.cardBorder, { width: cardW, height: cardH }]}>
                <ResolvedImage webPath={uri} style={StyleSheet.absoluteFillObject} resizeMode="cover" />
                <LinearGradient
                  pointerEvents="none"
                  colors={['rgba(0,0,0,0.55)', 'transparent']}
                  style={styles.cardGradTop}
                />
                <LinearGradient
                  pointerEvents="none"
                  colors={['transparent', 'rgba(0,0,0,0.55)']}
                  style={styles.cardGradBot}
                />
                {idx === 0 ? (
                  <View style={styles.railIconCol}>
                    <Pressable style={styles.railIconBtn} accessibilityLabel="Refresh">
                      <Text style={styles.railIconTxt}>↻</Text>
                    </Pressable>
                    <Pressable style={styles.railIconBtn} accessibilityLabel="Favourite">
                      <Text style={styles.railIconTxt}>♡</Text>
                    </Pressable>
                    <Pressable style={styles.railIconBtn} accessibilityLabel="Wishlist">
                      <Text style={styles.railIconTxt}>☆</Text>
                    </Pressable>
                  </View>
                ) : idx === 1 ? (
                  <View style={styles.railIconCol}>
                    <Pressable style={styles.railIconBtn} accessibilityLabel="Refresh">
                      <Text style={styles.railIconTxt}>↻</Text>
                    </Pressable>
                    <Pressable style={styles.railIconBtn} accessibilityLabel="Wishlist">
                      <Text style={styles.railIconTxt}>☆</Text>
                    </Pressable>
                  </View>
                ) : null}
                {idx === 0 && model.fromLabel ? (
                  <View
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      bottom: 0,
                      borderBottomLeftRadius: cardRadiusPx,
                      borderBottomRightRadius: cardRadiusPx,
                      overflow: 'hidden',
                    }}
                  >
                    <LinearGradient
                      colors={['rgba(119,9,64,0.95)', 'rgba(129,73,7,0.95)']}
                      start={{ x: 0, y: 0.5 }}
                      end={{ x: 1, y: 0.5 }}
                      style={{ paddingVertical: moderateSize(10, ww), paddingHorizontal: moderateSize(14, ww) }}
                    >
                      <Text style={styles.fromLabel}>{model.fromLabel}</Text>
                    </LinearGradient>
                  </View>
                ) : null}
              </View>
            </View>
          ))}
        </ScrollView>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.thumbRail}>
          {model.thumbnailStrip.map((uri, i) => (
            <Pressable
              key={`${uri}-t-${i}`}
              onPress={() => setSelectedThumb(i)}
              style={[
                styles.thumb,
                {
                  width: thumbPx,
                  height: thumbPx,
                  borderRadius: thumbPx / 2,
                },
                i === selectedThumb && styles.thumbSelected,
              ]}
            >
              <ResolvedImage webPath={uri} style={StyleSheet.absoluteFillObject} resizeMode="cover" />
            </Pressable>
          ))}
        </ScrollView>
      </ScrollView>

      <View style={[styles.dock, { paddingBottom: dockBottomPad }]}>
        <Pressable style={styles.iconOutlineBtn} accessibilityLabel="Share">
          <Text style={styles.iconOutlineGlyph}>⇪</Text>
        </Pressable>
        <Pressable style={styles.iconOutlineBtn} accessibilityLabel="More options">
          <Text style={styles.iconOutlineGlyph}>⋯</Text>
        </Pressable>
        <Pressable style={styles.waBtn} accessibilityLabel="Share on WhatsApp">
          <Text style={styles.waLabel}>Whatsapp</Text>
        </Pressable>
      </View>
    </View>
  )
}
