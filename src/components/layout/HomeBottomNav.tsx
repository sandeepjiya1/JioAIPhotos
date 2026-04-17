import { StyleSheet, Text, View } from 'react-native'
import { BlurView } from 'expo-blur'
import { LinearGradient } from 'expo-linear-gradient'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { router, usePathname } from 'expo-router'
import { PressableScale } from '@/components/motion/PressableScale'
import { NavBarGlyph, type BottomNavGlyph } from '@/components/navigation/NavBarGlyph'
import { useTranslation } from '@/hooks/useTranslation'
import { colors } from '@/theme/colors'

type NavId = 'home' | 'photos' | 'ai-camera' | 'files' | 'create'

const NAV_IDS: readonly NavId[] = ['home', 'photos', 'ai-camera', 'files', 'create']

const HREF: Record<NavId, string> = {
  home: '/home',
  photos: '/home/photos',
  'ai-camera': '/home/ai-camera',
  files: '/home/files',
  create: '/home/create',
}

const GLYPH: Record<NavId, BottomNavGlyph> = {
  home: 'home',
  photos: 'photos',
  'ai-camera': 'ai-camera',
  files: 'files',
  create: 'create',
}

const ON_MEDIUM = 'rgba(255,255,255,0.77)'
const ON_HIGH = '#ffffff'
const ORB = 44
const TRACK_MAX_W = 512

function isActive(pathname: string, href: string): boolean {
  if (href === '/home') return pathname === '/home' || pathname === '/home/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function HomeBottomNav() {
  const insets = useSafeAreaInsets()
  const pathname = usePathname()
  const t = useTranslation()

  const label: Record<NavId, string> = {
    home: t.nav_home,
    photos: t.nav_photos,
    'ai-camera': t.nav_ai_camera,
    files: t.nav_files,
    create: t.nav_create,
  }

  return (
    <View style={styles.shell} accessibilityRole="tablist" accessibilityLabel="Main navigation">
      <BlurView intensity={72} tint="dark" style={StyleSheet.absoluteFill} />
      <View style={styles.tint} pointerEvents="none" />
      <View
        style={[
          styles.track,
          {
            paddingBottom: Math.max(insets.bottom, 10),
            maxWidth: TRACK_MAX_W,
          },
        ]}
      >
        {NAV_IDS.map((id) => {
          const href = HREF[id]
          const active = isActive(pathname, href)
          const featured = id === 'ai-camera'
          const glyphColor = active ? ON_HIGH : ON_MEDIUM

          if (featured) {
            return (
              <View key={id} style={styles.featuredCol}>
                <PressableScale
                  accessibilityRole="button"
                  accessibilityLabel={label[id]}
                  accessibilityState={{ selected: active }}
                  onPress={() => router.replace(href)}
                  layout="fill"
                  style={styles.featuredPress}
                >
                  <View style={styles.orbStack}>
                    <View style={styles.halo} accessibilityElementsHidden />
                    <LinearGradient
                      colors={['rgba(157,202,228,0.98)', colors.primary600, colors.primary700]}
                      start={{ x: 0.5, y: 0 }}
                      end={{ x: 0.5, y: 1 }}
                      style={[
                        styles.orb,
                        active ? styles.orbBorderActive : styles.orbBorderIdle,
                        active ? styles.orbGlowActive : styles.orbGlowIdle,
                      ]}
                    >
                      <LinearGradient
                        colors={['rgba(255,255,255,0.38)', 'transparent', 'rgba(0,40,60,0.22)']}
                        start={{ x: 0.2, y: 0.1 }}
                        end={{ x: 0.9, y: 1 }}
                        style={StyleSheet.absoluteFill}
                        pointerEvents="none"
                      />
                      <View style={styles.orbGlyph}>
                        <NavBarGlyph glyph="ai-camera" color={ON_HIGH} size={20} />
                      </View>
                    </LinearGradient>
                  </View>
                  <Text
                    style={[styles.label, active ? styles.labelActive : styles.labelIdle]}
                    numberOfLines={1}
                  >
                    {label[id]}
                  </Text>
                </PressableScale>
              </View>
            )
          }

          return (
            <PressableScale
              key={id}
              accessibilityRole="button"
              accessibilityLabel={label[id]}
              accessibilityState={{ selected: active }}
              onPress={() => router.replace(href)}
              layout="fill"
              style={styles.item}
            >
              <View style={styles.iconSlot}>
                <NavBarGlyph glyph={GLYPH[id]} color={glyphColor} size={20} />
              </View>
              <Text style={[styles.label, active ? styles.labelActive : styles.labelIdle]} numberOfLines={1}>
                {label[id]}
              </Text>
            </PressableScale>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  shell: {
    overflow: 'visible',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(255,255,255,0.12)',
    backgroundColor: 'rgba(13,42,61,0.45)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 24,
  },
  /** Matches web `.glass-nav` tint over blur. */
  tint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(13,42,61,0.52)',
  },
  track: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: '100%',
    paddingHorizontal: 8,
    paddingTop: 6,
    gap: 2,
  },
  item: {
    flex: 1,
    minWidth: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 6,
    paddingTop: 4,
    minHeight: 52,
    gap: 4,
    borderRadius: 8,
  },
  iconSlot: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featuredCol: {
    flex: 1,
    minWidth: 0,
    zIndex: 4,
    alignItems: 'center',
  },
  featuredPress: {
    alignItems: 'center',
    width: '100%',
    paddingBottom: 6,
    paddingTop: 0,
  },
  orbStack: {
    width: ORB,
    height: ORB,
    marginTop: -36,
    marginBottom: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  halo: {
    position: 'absolute',
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: 'rgba(120,190,230,0.32)',
    opacity: 0.55,
  },
  orb: {
    width: ORB,
    height: ORB,
    borderRadius: ORB / 2,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  orbBorderIdle: {
    borderColor: colors.surface0,
  },
  orbBorderActive: {
    borderColor: 'rgba(120,200,255,0.55)',
  },
  orbGlowIdle: {
    shadowColor: '#57a3d0',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.55,
    shadowRadius: 10,
    elevation: 10,
  },
  orbGlowActive: {
    shadowColor: '#a0dcff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.65,
    shadowRadius: 14,
    elevation: 12,
  },
  orbGlyph: {
    zIndex: 1,
  },
  label: {
    maxWidth: '100%',
    fontSize: 12,
    lineHeight: 14,
    textAlign: 'center',
  },
  labelIdle: {
    fontWeight: '500',
    color: ON_MEDIUM,
  },
  labelActive: {
    fontWeight: '600',
    color: ON_HIGH,
  },
})
