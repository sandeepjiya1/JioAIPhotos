import { useCallback, useMemo } from 'react'
import {
  Dimensions,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native'
import { router } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { CreditsCoinStackIcon } from '@/components/atoms/CreditsCoinStackIcon'
import { ChevronRight } from '@/components/molecules/ChevronRight'
import { AiAvatarJerseysPortalCard } from '@/features/aiAvatar/AiAvatarJerseysPortalCard'
import { ResolvedImage } from '@/features/home/ResolvedImage'
import { useTranslation } from '@/hooks/useTranslation'
import { moderateSize, scaleSizeFromDesign } from '@/theme/layoutScale'

/**
 * Figma Pod1 `2385:10384` — Cricket Jerseys / AI Avatar portals (360×800).
 * Hero + rail assets match Figma MCP export (`5f141b0c…`, rail PNGs).
 */
const FIGMA_FRAME = 360
const PORTAL_DESIGN_W = 307
const PORTAL_DESIGN_H = 461
const CARD_GAP_DESIGN = 16
const RAIL_Q = '?v=20260502jerseyrail'

const RAIL_CHIPS: readonly { key: string; webPath: string; selected?: boolean; resizeMode?: 'cover' | 'contain' }[] =
  [
    { key: 'chip0', webPath: `/assets/home/991efd4c87c29e343f1794e395603be62799c694.png${RAIL_Q}`, resizeMode: 'cover' },
    {
      key: 'chip1',
      webPath: `/assets/home/ipl-home-hero-mi.png${RAIL_Q}`,
      selected: true,
      resizeMode: 'cover',
    },
    { key: 'chip2', webPath: `/assets/home/ipl-home-hero-gt.png${RAIL_Q}`, resizeMode: 'cover' },
    { key: 'chip3', webPath: `/assets/home/ipl-home-hero-csk.png${RAIL_Q}`, resizeMode: 'cover' },
    { key: 'chip4', webPath: `/assets/home/ipl-home-hero-kkr.png${RAIL_Q}`, resizeMode: 'contain' },
    { key: 'chip5', webPath: `/assets/home/ipl-home-hero-rcb.png${RAIL_Q}`, resizeMode: 'cover' },
  ] as const

const SURFACE = '#0c0d10' as const
const BAR_SURFACE = '#001d2e' as const
const WHATSAPP = '#25d366' as const

export default function AiAvatarJerseysScreen() {
  const insets = useSafeAreaInsets()
  const { width: winW } = useWindowDimensions()
  const t = useTranslation()
  const ww = winW > 0 ? winW : Dimensions.get('window').width

  const pad = moderateSize(16, ww)
  const barH = moderateSize(56, ww)
  const cardGap = scaleSizeFromDesign(CARD_GAP_DESIGN, ww, FIGMA_FRAME)
  const portalW = scaleSizeFromDesign(PORTAL_DESIGN_W, ww, FIGMA_FRAME)
  const portalH = scaleSizeFromDesign(PORTAL_DESIGN_H, ww, FIGMA_FRAME)
  const chip = moderateSize(56, ww)
  const bottomBarRadius = moderateSize(32, ww)
  const iconBtn = moderateSize(40, ww)

  const goBack = useCallback(() => {
    if (router.canGoBack()) router.back()
    else router.replace('/home/ai-avatar')
  }, [])

  const onUpload = useCallback(() => {
    // Placeholder until gallery picker is wired (Figma `2385:10422` / `10431`).
  }, [])

  const onWhatsapp = useCallback(() => {
    void Linking.openURL('https://wa.me/?text=')
  }, [])

  const styles = useMemo(
    () =>
      StyleSheet.create({
        root: { flex: 1, backgroundColor: SURFACE },
        header: {
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: 'rgba(255, 255, 255, 0.12)',
          backgroundColor: SURFACE,
        },
        headerRow: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          minHeight: barH,
          paddingHorizontal: pad,
          paddingVertical: moderateSize(8, ww),
        },
        headerStart: { flexDirection: 'row', alignItems: 'center', gap: moderateSize(8, ww), flex: 1 },
        headerTitle: {
          fontSize: moderateSize(16, ww),
          lineHeight: moderateSize(18, ww),
          fontWeight: '800',
          color: '#FFFFFF',
          maxWidth: moderateSize(120, ww),
        },
        credits: { flexDirection: 'row', alignItems: 'center', gap: moderateSize(4, ww) },
        creditsText: {
          fontSize: moderateSize(12, ww),
          lineHeight: moderateSize(12, ww),
          fontWeight: '400',
          color: '#FFFFFF',
          minWidth: moderateSize(24, ww),
          textAlign: 'center',
        },
        carouselContent: {
          paddingTop: scaleSizeFromDesign(10, ww, FIGMA_FRAME),
          paddingBottom: moderateSize(12, ww),
          paddingHorizontal: pad,
          gap: cardGap,
          flexDirection: 'row',
        },
        railRow: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: moderateSize(8, ww),
          paddingVertical: moderateSize(8, ww),
          paddingHorizontal: moderateSize(12, ww),
        },
        chipOuter: {
          width: chip,
          height: chip,
          borderRadius: chip / 2,
          overflow: 'hidden',
          backgroundColor: 'rgba(214, 214, 214, 0.35)',
        },
        chipSelected: {
          borderWidth: 3,
          borderColor: '#FFFFFF',
        },
        bottomBar: {
          backgroundColor: BAR_SURFACE,
          borderTopLeftRadius: bottomBarRadius,
          borderTopRightRadius: bottomBarRadius,
          paddingHorizontal: pad,
          paddingVertical: moderateSize(18, ww),
        },
        bottomRow: { flexDirection: 'row', alignItems: 'center', gap: moderateSize(12, ww) },
        iconBtn: {
          width: iconBtn,
          height: iconBtn,
          borderRadius: iconBtn / 2,
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.54)',
          alignItems: 'center',
          justifyContent: 'center',
        },
        waBtn: {
          flex: 1,
          backgroundColor: WHATSAPP,
          borderRadius: 9999,
          minHeight: iconBtn,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: moderateSize(6, ww),
          paddingHorizontal: moderateSize(16, ww),
          paddingVertical: moderateSize(4, ww),
        },
        waLabel: {
          fontSize: moderateSize(16, ww),
          lineHeight: moderateSize(16, ww),
          fontWeight: '700',
          color: '#FFFFFF',
        },
      }),
    [barH, bottomBarRadius, cardGap, chip, iconBtn, pad, ww],
  )

  return (
    <View style={styles.root}>
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <View style={styles.headerRow}>
          <View style={styles.headerStart}>
            <Pressable
              onPress={goBack}
              hitSlop={12}
              accessibilityRole="button"
              accessibilityLabel={t.ai_avatar_home_back_aria}
              style={{
                width: moderateSize(32, ww),
                height: moderateSize(32, ww),
                alignItems: 'center',
                justifyContent: 'center',
                transform: [{ scaleX: -1 }],
              }}
            >
              <ChevronRight size={moderateSize(20, ww)} color="#FFFFFF" />
            </Pressable>
            <Text style={styles.headerTitle} numberOfLines={1}>
              {t.create_sheet_avatar_title}
            </Text>
          </View>
          <View style={styles.credits} accessibilityRole="text" accessibilityLabel={t.ai_avatar_home_credits_aria}>
            <CreditsCoinStackIcon
              width={moderateSize(12, ww)}
              height={moderateSize(15, ww)}
              color="#FFFFFF"
            />
            <Text style={styles.creditsText}>100</Text>
          </View>
        </View>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingBottom: moderateSize(16, ww) + Math.max(insets.bottom, 0),
        }}
        showsVerticalScrollIndicator={false}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          snapToInterval={portalW + cardGap}
          snapToAlignment="start"
          contentContainerStyle={styles.carouselContent}
        >
          <AiAvatarJerseysPortalCard
            width={portalW}
            height={portalH}
            hint={t.ai_avatar_jerseys_portal_hint_jersey}
            uploadLabel={t.ai_avatar_jerseys_upload_cta}
            onUploadPress={onUpload}
          />
          <AiAvatarJerseysPortalCard
            width={portalW}
            height={portalH}
            hint={t.ai_avatar_jerseys_portal_hint_cricket}
            uploadLabel={t.ai_avatar_jerseys_upload_cta}
            showIplBadge
            onUploadPress={onUpload}
          />
        </ScrollView>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.railRow}>
          {RAIL_CHIPS.map((c) => (
            <Pressable
              key={c.key}
              accessibilityRole="button"
              style={[styles.chipOuter, c.selected ? styles.chipSelected : null]}
            >
              <ResolvedImage
                webPath={c.webPath}
                resizeMode={c.resizeMode ?? 'cover'}
                style={StyleSheet.absoluteFillObject}
              />
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.bottomBar}>
          <View style={styles.bottomRow}>
            <Pressable accessibilityRole="button" style={styles.iconBtn} />
            <Pressable accessibilityRole="button" style={styles.iconBtn} />
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={t.ai_avatar_jerseys_whatsapp}
              onPress={onWhatsapp}
              style={({ pressed }) => [styles.waBtn, pressed && { opacity: 0.92 }]}
            >
              <Text style={styles.waLabel}>{t.ai_avatar_jerseys_whatsapp}</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
