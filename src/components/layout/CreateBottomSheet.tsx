import { useCallback, useEffect } from 'react'
import {
  BackHandler,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { router } from 'expo-router'
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ResolvedImage } from '@/features/home/ResolvedImage'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { useTranslation } from '@/hooks/useTranslation'
import { useCreateSheetStore } from '@/store/createSheetStore'
import { useThemeStore } from '@/store/themeStore'
import { moderateSize } from '@/theme/layoutScale'
import { motionDuration, motionEasing } from '@/theme/motion'
import { useThemeColors } from '@/theme/useThemeColors'

const GREETINGS_IMAGE = '/assets/home/greeting-birthday-floral.png?v=20260502f'
const AVATAR_IMAGE = '/assets/home/create-sheet-ai-avatar.png?v=20260502f'

function CloseIcon({ color }: { color: string }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none" accessibilityElementsHidden>
      <Path
        d="M18 6L6 18M6 6l12 12"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

/**
 * Figma Pod1 `2385:11793` — “Upload panel”: choose Greetings vs AI Avatar (slides up from bottom).
 */
export function CreateBottomSheet() {
  const colors = useThemeColors()
  const appearance = useThemeStore((s) => s.appearance)
  const insets = useSafeAreaInsets()
  const { width: winW, height: winH } = useWindowDimensions()
  const t = useTranslation()
  const reducedMotion = usePrefersReducedMotion()

  const open = useCreateSheetStore((s) => s.open)
  const closeSheet = useCreateSheetStore((s) => s.closeSheet)

  const offscreen = Math.max(winH, 640)
  const translateY = useSharedValue(offscreen)

  const dismissAnimated = useCallback(() => {
    if (reducedMotion) {
      closeSheet()
      return
    }
    translateY.value = withTiming(
      offscreen,
      { duration: motionDuration.fast, easing: motionEasing.standard },
      (finished) => {
        if (finished) runOnJS(closeSheet)()
      },
    )
  // eslint-disable-next-line react-hooks/exhaustive-deps -- translateY SharedValue stable
  }, [closeSheet, offscreen, reducedMotion])

  /* eslint-disable react-hooks/immutability -- Reanimated SharedValue (not React state) */
  useEffect(() => {
    if (!open) return
    if (reducedMotion) {
      translateY.value = 0
      return
    }
    translateY.value = offscreen
    translateY.value = withTiming(0, {
      duration: motionDuration.normal,
      easing: motionEasing.outCubic,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps -- translateY SharedValue stable
  }, [open, offscreen, reducedMotion])
  /* eslint-enable react-hooks/immutability */

  useEffect(() => {
    if (!open) return
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      dismissAnimated()
      return true
    })
    return () => sub.remove()
  }, [open, dismissAnimated])

  const sheetAnim = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }))

  const onGreetings = useCallback(() => {
    closeSheet()
    router.push('/home')
  }, [closeSheet])

  const onAiAvatar = useCallback(() => {
    closeSheet()
    router.push('/home/ai-avatar')
  }, [closeSheet])

  const w = winW > 0 ? winW : 360
  const pad = moderateSize(16, w)
  const titleSize = moderateSize(18, w)
  const rowTitleSize = moderateSize(14, w)
  const rowSubSize = moderateSize(12, w)
  const cardRadius = moderateSize(8, w)
  const thumbW = moderateSize(100, w)
  const thumbH = moderateSize(70, w)

  const cardBg =
    appearance === 'light' ? colors.surface3 : 'rgba(105, 109, 118, 0.24)'
  const sheetBg = appearance === 'light' ? colors.surface2 : '#191b1e'

  return (
    <Modal
      visible={open}
      transparent
      animationType="none"
      onRequestClose={dismissAnimated}
      statusBarTranslucent={Platform.OS === 'android'}
    >
      <View style={styles.root} accessibilityViewIsModal>
        <Pressable
          style={[styles.backdrop, { backgroundColor: 'rgba(0,0,0,0.45)' }]}
          onPress={dismissAnimated}
          accessibilityRole="button"
          accessibilityLabel={t.create_sheet_dismiss_aria}
        />
        <Animated.View
          style={[
            styles.sheet,
            {
              backgroundColor: sheetBg,
              paddingBottom: Math.max(insets.bottom, 16),
              paddingHorizontal: pad,
              paddingTop: 8,
            },
            sheetAnim,
          ]}
        >
          <View style={styles.sheetInner}>
            <Pressable
              onPress={dismissAnimated}
              hitSlop={12}
              style={styles.closeBtn}
              accessibilityRole="button"
              accessibilityLabel={t.create_sheet_close_aria}
            >
              <CloseIcon color={colors.contentPrimary} />
            </Pressable>

            <View style={[styles.body, { gap: moderateSize(16, w) }]}>
              <Text
                style={[
                  styles.headline,
                  {
                    fontSize: titleSize,
                    lineHeight: titleSize + 2,
                    color: colors.contentPrimary,
                  },
                ]}
              >
                {t.create_sheet_title}
              </Text>

              <View style={{ gap: moderateSize(12, w), width: '100%' }}>
                <Pressable
                  onPress={onGreetings}
                  style={({ pressed }) => [
                    styles.card,
                    {
                      backgroundColor: cardBg,
                      borderRadius: cardRadius,
                      minHeight: moderateSize(66, w),
                      opacity: pressed ? 0.92 : 1,
                    },
                  ]}
                >
                  <View style={styles.cardTextCol}>
                    <Text
                      style={[
                        styles.rowTitle,
                        { fontSize: rowTitleSize, lineHeight: rowTitleSize + 2, color: colors.contentPrimary },
                      ]}
                    >
                      {t.create_sheet_greetings_title}
                    </Text>
                    <Text
                      style={[
                        styles.rowSub,
                        { fontSize: rowSubSize, lineHeight: rowSubSize + 2, color: colors.contentSecondary },
                      ]}
                      numberOfLines={2}
                    >
                      {t.create_sheet_greetings_subtitle}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.thumbWrap,
                      {
                        width: thumbW,
                        height: thumbH,
                        transform: [{ rotate: '-9deg' }],
                      },
                    ]}
                  >
                    <ResolvedImage
                      webPath={GREETINGS_IMAGE}
                      resizeMode="cover"
                      style={StyleSheet.absoluteFillObject}
                    />
                  </View>
                </Pressable>

                <Pressable
                  onPress={onAiAvatar}
                  style={({ pressed }) => [
                    styles.card,
                    {
                      backgroundColor: cardBg,
                      borderRadius: cardRadius,
                      minHeight: moderateSize(66, w),
                      opacity: pressed ? 0.92 : 1,
                    },
                  ]}
                >
                  <View style={styles.cardTextCol}>
                    <Text
                      style={[
                        styles.rowTitle,
                        { fontSize: rowTitleSize, lineHeight: rowTitleSize + 2, color: colors.contentPrimary },
                      ]}
                    >
                      {t.create_sheet_avatar_title}
                    </Text>
                    <Text
                      style={[
                        styles.rowSub,
                        { fontSize: rowSubSize, lineHeight: rowSubSize + 2, color: colors.contentSecondary },
                      ]}
                      numberOfLines={2}
                    >
                      {t.create_sheet_avatar_subtitle}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.thumbWrap,
                      {
                        width: thumbW,
                        height: thumbH,
                        transform: [{ rotate: '-9deg' }],
                      },
                    ]}
                  >
                    <ResolvedImage
                      webPath={AVATAR_IMAGE}
                      resizeMode="cover"
                      style={StyleSheet.absoluteFillObject}
                    />
                  </View>
                </Pressable>
              </View>
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  sheet: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    maxHeight: '92%',
  },
  sheetInner: {
    gap: 24,
    alignItems: 'flex-end',
  },
  closeBtn: {
    padding: 4,
  },
  body: {
    width: '100%',
    alignItems: 'center',
  },
  headline: {
    width: '100%',
    fontWeight: '700',
    textAlign: 'left',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    gap: 16,
    overflow: 'hidden',
    width: '100%',
  },
  cardTextCol: {
    flex: 1,
    minWidth: 0,
    justifyContent: 'center',
    gap: 4,
  },
  rowTitle: {
    fontWeight: '400',
  },
  rowSub: {
    fontWeight: '400',
  },
  thumbWrap: {
    borderRadius: 4,
    overflow: 'hidden',
  },
})
