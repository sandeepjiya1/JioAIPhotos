import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { BlurView } from 'expo-blur'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { JioProductMark } from '@/components/molecules/JioProductMark'
import { useLayoutScale } from '@/hooks/useLayoutScale'
import { resolveHomeImage } from '../../../assets/home/registry'
import { HOME_HEADER } from '@/features/home/homeContent'
import { colors } from '@/theme/colors'

const GLASS_TINT = 'rgba(13,42,61,0.52)'
const BLUR_INTENSITY = 72

export function HomeAppHeader() {
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
    <View style={[styles.wrap, { paddingTop: insets.top }]}>
      <BlurView intensity={BLUR_INTENSITY} tint="dark" style={StyleSheet.absoluteFill} />
      <View style={styles.tint} pointerEvents="none" />
      <View style={[styles.row, { minHeight: rowMinH, paddingHorizontal: padH, paddingVertical: padV }]}>
        <View
          style={[styles.brand, { gap: brandGap }]}
          accessibilityRole="header"
          accessibilityLabel="Jio Pix"
        >
          <JioProductMark size={avatarSize} />
          <Text style={[styles.brandText, { fontSize: brandFont, lineHeight: brandFont }]}>Pix</Text>
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
              },
            ]}
          >
            {avatarSrc ? (
              <Image source={avatarSrc} style={styles.avatarImg} resizeMode="cover" />
            ) : (
              <Text style={[styles.avatarLetter, { fontSize: letterFont }]}>{HOME_HEADER.avatarFallback}</Text>
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
    borderBottomColor: 'rgba(255,255,255,0.12)',
    backgroundColor: 'rgba(0,29,46,0.35)',
  },
  tint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: GLASS_TINT,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  /** Figma: 2px between product mark and wordmark — gap applied inline. */
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  /** Figma Label L / Bold — dark shell uses on-colour high. */
  brandText: {
    fontWeight: '700',
    color: colors.contentPrimary,
  },
  avatarPress: {
    borderRadius: 999,
    overflow: 'hidden',
  },
  /** Figma Avatar slot — size applied inline. */
  avatarInner: {
    overflow: 'hidden',
    backgroundColor: colors.surface3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  avatarLetter: {
    fontWeight: '800',
    color: colors.contentPrimary,
  },
  pressed: {
    opacity: 0.75,
  },
})
