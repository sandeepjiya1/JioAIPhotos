import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { BlurView } from 'expo-blur'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { JioProductMark } from '@/components/molecules/JioProductMark'
import { SearchGlyph } from '@/components/molecules/SearchGlyph'
import { resolveHomeImage } from '../../../assets/home/registry'
import { HOME_HEADER } from '@/features/home/homeContent'
import { colors } from '@/theme/colors'

const ROW_H = 56
const GLASS_TINT = 'rgba(13,42,61,0.52)'
const BLUR_INTENSITY = 72

export function HomeAppHeader() {
  const insets = useSafeAreaInsets()
  const avatarSrc = resolveHomeImage(HOME_HEADER.avatarSrc)

  return (
    <View style={[styles.wrap, { paddingTop: insets.top }]}>
      <BlurView intensity={BLUR_INTENSITY} tint="dark" style={StyleSheet.absoluteFill} />
      <View style={styles.tint} pointerEvents="none" />
      <View style={[styles.row, { minHeight: ROW_H }]}>
        <View
          style={[styles.brand, { gap: 6 }]}
          accessibilityRole="header"
          accessibilityLabel="Jio AI Photos"
        >
          <JioProductMark size={32} />
          <Text style={styles.brandText}>AIPhotos</Text>
        </View>

        <View style={[styles.row, styles.actions]}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Search"
            hitSlop={8}
            onPress={() => router.push('/home/search')}
            style={({ pressed }) => [styles.searchBtn, pressed && styles.pressed]}
          >
            <SearchGlyph size={24} color={colors.contentPrimary} />
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Profile"
            hitSlop={8}
            onPress={() => router.push('/home/profile')}
            style={({ pressed }) => [styles.avatarOuter, pressed && styles.pressed]}
          >
            <View style={styles.avatarInner}>
              {avatarSrc ? (
                <Image source={avatarSrc} style={styles.avatarImg} resizeMode="cover" />
              ) : (
                <Text style={styles.avatarLetter}>{HOME_HEADER.avatarFallback}</Text>
              )}
            </View>
          </Pressable>
        </View>
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
    paddingHorizontal: 16,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandText: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.contentPrimary,
    letterSpacing: -0.5,
  },
  actions: {
    gap: 12,
  },
  /** Web `AppHeader` uses `size-8` (~32px) tap target for search. */
  searchBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarOuter: {
    borderRadius: 999,
    borderWidth: 2,
    borderColor: 'rgba(39,139,193,0.35)',
    overflow: 'hidden',
  },
  avatarInner: {
    width: 36,
    height: 36,
    borderRadius: 18,
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
    fontSize: 14,
    fontWeight: '800',
    color: colors.contentPrimary,
  },
  pressed: {
    opacity: 0.75,
  },
})
