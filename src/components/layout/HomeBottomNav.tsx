import { useMemo } from 'react'
import { Dimensions, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import { BlurView } from 'expo-blur'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { router, usePathname } from 'expo-router'
import { PressableScale } from '@/components/motion/PressableScale'
import { NavBarGlyph, type BottomNavGlyph } from '@/components/navigation/NavBarGlyph'
import { useTranslation } from '@/hooks/useTranslation'
import { useCreateSheetStore } from '@/store/createSheetStore'
import { useThemeStore } from '@/store/themeStore'
import { BASE_DESIGN_WIDTH, moderateSize } from '@/theme/layoutScale'
import { useThemeColors } from '@/theme/useThemeColors'

type NavId = 'home' | 'create' | 'photos'

const NAV_IDS: readonly NavId[] = ['home', 'create', 'photos']

const HREF: Record<NavId, string> = {
  home: '/home',
  create: '/home/create',
  photos: '/home/photos',
}

const GLYPH: Record<NavId, BottomNavGlyph> = {
  home: 'home',
  create: 'create',
  photos: 'photos',
}

/**
 * Whether the home shell bottom tab bar should render for this pathname.
 * **Only** the main Home tab (`/home`) and Photos (`/home/photos`, including nested segments)
 * show the bar; stack routes (AI Avatar, Jerseys, Search, Profile, …) do not.
 */
export function isHomeBottomNavVisibleForPathname(pathname: string): boolean {
  const p = pathname.replace(/\/$/, '') || '/'
  if (p === '/home') return true
  if (p === '/home/photos' || p.startsWith('/home/photos/')) return true
  return false
}

/**
 * Bottom nav metrics derived from window width — keep in sync with `HomeBottomNav` visuals.
 */
export function getHomeBottomNavLayout(screenWidth: number) {
  const w = screenWidth > 0 ? screenWidth : BASE_DESIGN_WIDTH
  return {
    trackMaxW: moderateSize(512, w),
    rowHeight: moderateSize(60, w),
    trackPadH: moderateSize(20, w),
    trackPadTop: moderateSize(4, w),
    itemPadV: moderateSize(6, w),
    iconLabelGap: moderateSize(8, w),
    iconSize: moderateSize(20, w),
    itemRadius: moderateSize(8, w),
    labelFont: moderateSize(12, w),
    labelLine: moderateSize(12, w),
    bottomChromeExtra: moderateSize(12, w),
  }
}

/**
 * Scroll `paddingBottom` for screens inside the home `Stack` (`app/home/_layout`).
 * The bottom nav is a **sibling below** that stack, so the scroll area already ends above the bar.
 * Only add a short tail and device inset — do not add nav height again (avoids a large empty
 * overscroll band under the last section, e.g. Cricket theme footer on Home).
 */
export function homeBottomTabScrollPaddingBottom(safeBottom: number, screenWidth: number): number {
  const w = screenWidth > 0 ? screenWidth : BASE_DESIGN_WIDTH
  const tail = moderateSize(16, w)
  return tail + Math.max(safeBottom, 0)
}

function isActive(pathname: string, href: string): boolean {
  if (href === '/home') return pathname === '/home' || pathname === '/home/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function HomeBottomNav() {
  const colors = useThemeColors()
  const appearance = useThemeStore((s) => s.appearance)
  const insets = useSafeAreaInsets()
  const pathname = usePathname()
  const createSheetOpen = useCreateSheetStore((s) => s.open)
  const openCreateSheet = useCreateSheetStore((s) => s.openSheet)
  const { width: winW } = useWindowDimensions()
  const t = useTranslation()
  const ww = winW > 0 ? winW : Dimensions.get('window').width
  const L = useMemo(() => getHomeBottomNavLayout(ww), [ww])

  const shellStyle = useMemo(
    () => ({
      borderTopColor: colors.hairlineOnGlass,
      backgroundColor: colors.navShellBg,
      shadowColor: colors.shadowColor,
    }),
    [colors],
  )

  const label: Record<NavId, string> = {
    home: t.nav_home,
    create: t.nav_create,
    photos: t.nav_photos,
  }

  if (!isHomeBottomNavVisibleForPathname(pathname)) return null

  return (
    <View style={[styles.shell, shellStyle]} accessibilityRole="tablist" accessibilityLabel="Main navigation">
      <BlurView intensity={72} tint={appearance === 'light' ? 'light' : 'dark'} style={StyleSheet.absoluteFill} />
      <View style={[styles.tint, { backgroundColor: colors.glassTint }]} pointerEvents="none" />
      <View
        style={[
          styles.track,
          {
            paddingTop: L.trackPadTop,
            paddingBottom: Math.max(insets.bottom, 4),
            maxWidth: L.trackMaxW,
            paddingHorizontal: L.trackPadH,
          },
        ]}
      >
        {NAV_IDS.map((id) => {
          const href = HREF[id]
          const active =
            id === 'create'
              ? createSheetOpen || isActive(pathname, href)
              : isActive(pathname, href)
          const glyphColor = active ? colors.primary600 : colors.contentSecondary

          return (
            <PressableScale
              key={id}
              accessibilityRole="button"
              accessibilityLabel={label[id]}
              accessibilityState={{ selected: active }}
              onPress={() => {
                if (id === 'create') {
                  openCreateSheet()
                  return
                }
                router.replace(href)
              }}
              layout="fill"
              style={[
                styles.item,
                {
                  paddingVertical: L.itemPadV,
                  height: L.rowHeight,
                  minHeight: L.rowHeight,
                  maxHeight: L.rowHeight,
                  borderRadius: L.itemRadius,
                },
              ]}
            >
              <View style={[styles.itemInner, { gap: L.iconLabelGap }]}>
                <View style={[styles.iconSlot, { width: L.iconSize, height: L.iconSize }]}>
                  <NavBarGlyph glyph={GLYPH[id]} color={glyphColor} size={L.iconSize} />
                </View>
                <Text
                  style={[
                    styles.label,
                    { fontSize: L.labelFont, lineHeight: L.labelLine },
                    active
                      ? { fontWeight: '600' as const, color: colors.primary600 }
                      : { fontWeight: '500' as const, color: colors.contentSecondary },
                  ]}
                  numberOfLines={1}
                >
                  {label[id]}
                </Text>
              </View>
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
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 24,
  },
  tint: {
    ...StyleSheet.absoluteFillObject,
  },
  track: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: '100%',
    gap: 0,
  },
  item: {
    flex: 1,
    minWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemInner: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconSlot: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    maxWidth: '100%',
    textAlign: 'center',
  },
})
