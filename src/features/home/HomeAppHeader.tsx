import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { BlurView } from 'expo-blur'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { JioProductMark } from '@/components/molecules/JioProductMark'
import { useLayoutScale } from '@/hooks/useLayoutScale'
import { useThemeStore } from '@/store/themeStore'
import { resolveHomeImage } from '../../../assets/home/registry'
import { HOME_HEADER } from '@/features/home/homeContent'
import { useThemeColors } from '@/theme/useThemeColors'

const BLUR_INTENSITY = 72

export function HomeAppHeader() {
  const colors = useThemeColors()
  const appearance = useThemeStore((s) => s.appearance)
  const insets = useSafeAreaInsets()
  const { ms } = useLayoutScale()
  const avatarSrc = resolveHomeImage(HOME_HEADER.avatarSrc)
  const rowMinH = ms(48)
  const padH = ms(16)
  const padV = ms(8)
  const brandGap = ms(2)
  const brandFont = ms(18)
  const avatarSize = ms(32)
  const avatarRadius = avatarSize / 2
  const letterFont = ms(14)
  const hitSlop = ms(10)

  return (
    <View
      style={[
        styles.wrap,
        { paddingTop: insets.top, borderBottomColor: colors.hairlineOnGlass, backgroundColor: colors.shellUnderlay },
      ]}
    >
      <BlurView intensity={BLUR_INTENSITY} tint={appearance === 'light' ? 'light' : 'dark'} style={StyleSheet.absoluteFill} />
      <View style={[styles.tint, { backgroundColor: colors.glassTint }]} pointerEvents="none" />
      <View style={[styles.row, { minHeight: rowMinH, paddingHorizontal: padH, paddingVertical: padV }]}>
        <View
          style={[styles.brand, { gap: brandGap }]}
          accessibilityRole="header"
          accessibilityLabel="Jio Pix"
        >
          <JioProductMark size={avatarSize} />
          <Text style={[styles.brandText, { fontSize: brandFont, lineHeight: brandFont, color: colors.contentPrimary }]}>
            Pix
          </Text>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Profile"
          hitSlop={hitSlop}
          onPress={() => router.push('/home/profile')}
          style={({ pressed }) => [styles.avatarPress, pressed && styles.pressed]}
        >
          <View
            style={[
              styles.avatarInner,
              {
                width: avatarSize,
                height: avatarSize,
                borderRadius: avatarRadius,
                backgroundColor: colors.surface3,
              },
            ]}
          >
            {avatarSrc ? (
              <Image source={avatarSrc} style={styles.avatarImg} resizeMode="cover" />
            ) : (
              <Text style={[styles.avatarLetter, { fontSize: letterFont, color: colors.contentPrimary }]}>
                {HOME_HEADER.avatarFallback}
              </Text>
            )}
          </View>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    position: 'relative',
    overflow: 'hidden',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  tint: {
    ...StyleSheet.absoluteFillObject,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandText: {
    fontWeight: '700',
  },
  avatarPress: {
    borderRadius: 999,
    overflow: 'hidden',
  },
  avatarInner: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  avatarLetter: {
    fontWeight: '800',
  },
  pressed: {
    opacity: 0.75,
  },
})
