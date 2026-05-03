import { useCallback, useEffect, useMemo } from 'react'
import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { SvgXml } from 'react-native-svg'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Button } from '@/components/atoms/Button'
import { useTranslation } from '@/hooks/useTranslation'
import { replaceToHome } from '@/lib/authNavigation'
import { requestMediaLibraryAndNotifications } from '@/lib/nativePermissions'
import { useAuthStore } from '@/store/authStore'
import { useThemeStore } from '@/store/themeStore'
import { getPermissionHeroIconXml } from '@/features/permissions/permissionHeroIconSvg'
import {
  getPermissionRowBellIconXml,
  getPermissionRowGalleryIconXml,
} from '@/features/permissions/permissionRowIconsSvg'
import type { AppThemeColors } from '@/theme/palettes'
import { useThemeColors } from '@/theme/useThemeColors'

/** Figma `683:15463` */
function PermissionRowGalleryIcon({ fill }: { fill: string }) {
  const xml = useMemo(() => getPermissionRowGalleryIconXml(fill), [fill])
  return (
    <SvgXml
      xml={xml}
      width={24}
      height={24}
      accessibilityElementsHidden
      pointerEvents="none"
    />
  )
}

/** Figma `683:15470` */
function PermissionRowBellIcon({ fill }: { fill: string }) {
  const xml = useMemo(() => getPermissionRowBellIconXml(fill), [fill])
  return (
    <SvgXml
      xml={xml}
      width={24}
      height={24}
      accessibilityElementsHidden
      pointerEvents="none"
    />
  )
}

function PermissionHeroArt({ colors }: { colors: AppThemeColors }) {
  const xml = useMemo(() => getPermissionHeroIconXml(colors.contentPrimary), [colors])
  return (
    <View style={heroArtStyles.wrap} accessibilityElementsHidden pointerEvents="none">
      <SvgXml xml={xml} width={67} height={75} />
    </View>
  )
}

const heroArtStyles = StyleSheet.create({
  wrap: {
    alignSelf: 'center',
    width: 67,
    height: 75,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

function createPermissionStyles(
  colors: AppThemeColors,
  opts: { compact: boolean; sheetGap: number; sheetPaddingTop: number; headlineSize: number },
) {
  return StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: colors.surface0,
    },
    scroll: { flex: 1 },
    scrollContent: {
      flexGrow: 1,
      paddingHorizontal: 24,
    },
    sheet: {
      flex: 1,
      borderTopLeftRadius: 32,
      borderTopRightRadius: 32,
      paddingTop: opts.sheetPaddingTop,
      gap: opts.sheetGap,
    },
    headline: {
      fontSize: opts.headlineSize,
      lineHeight: opts.headlineSize + 4,
      fontWeight: '900',
      color: colors.contentPrimary,
      textAlign: 'left',
      paddingVertical: opts.compact ? 6 : 10,
    },
    rows: {
      gap: opts.compact ? 16 : 23,
      flex: 1,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 10,
      paddingVertical: opts.compact ? 6 : 10,
    },
    rowIcon: {
      width: 32,
      height: 24,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 2,
    },
    rowText: {
      flex: 1,
      minWidth: 0,
      gap: 10,
    },
    rowTitle: {
      fontSize: 20,
      lineHeight: 24,
      fontWeight: '900',
      color: colors.contentPrimary,
    },
    rowBody: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: '400',
      color: colors.contentSecondary,
    },
    actions: {
      gap: 12,
      marginTop: opts.compact ? 4 : 8,
      width: '100%',
      flexShrink: 0,
    },
    actionPrimary: {
      alignSelf: 'stretch',
    },
    actionSecondary: {
      alignSelf: 'stretch',
    },
  })
}

export function PreAppPermissionScreen() {
  const colors = useThemeColors()
  const { height: windowHeight } = useWindowDimensions()
  const appearance = useThemeStore((s) => s.appearance)
  const insets = useSafeAreaInsets()
  const t = useTranslation()
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const hasSeenOnboarding = useAuthStore((s) => s.hasSeenOnboarding)
  const setHasCompletedPermissionIntro = useAuthStore((s) => s.setHasCompletedPermissionIntro)

  const usableHeight = Math.max(0, windowHeight - insets.top - insets.bottom)

  const layout = useMemo(() => {
    const compact = usableHeight < 620
    const sheetGap = usableHeight < 540 ? 20 : usableHeight < 680 ? 28 : usableHeight < 800 ? 36 : 43
    const sheetPaddingTop = usableHeight < 540 ? 28 : usableHeight < 680 ? 44 : 56
    const headlineSize = usableHeight < 540 ? 22 : usableHeight < 620 ? 24 : 28
    return { compact, sheetGap, sheetPaddingTop, headlineSize }
  }, [usableHeight])

  const styles = useMemo(() => createPermissionStyles(colors, layout), [colors, layout])

  /** For now: do not auto-skip this screen when `hasCompletedPermissionIntro` is already true. */
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login')
      return
    }
    if (!hasSeenOnboarding) {
      router.replace('/onboarding')
      return
    }
  }, [isAuthenticated, hasSeenOnboarding])

  const goHome = useCallback(() => {
    setHasCompletedPermissionIntro(true)
    replaceToHome()
  }, [setHasCompletedPermissionIntro])

  const onAllow = useCallback(async () => {
    setHasCompletedPermissionIntro(true)
    await requestMediaLibraryAndNotifications()
    replaceToHome()
  }, [setHasCompletedPermissionIntro])

  if (!isAuthenticated || !hasSeenOnboarding) {
    return (
      <View style={styles.root}>
        <StatusBar style={appearance === 'light' ? 'dark' : 'light'} />
      </View>
    )
  }

  return (
    <View style={styles.root}>
      <StatusBar style={appearance === 'light' ? 'dark' : 'light'} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          {
            minHeight: windowHeight,
            paddingTop: Math.max(insets.top, 12) + 8,
            paddingBottom: Math.max(insets.bottom, 24),
          },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sheet}>
          <PermissionHeroArt colors={colors} />

          <Text style={styles.headline}>{t.perm_intro_headline}</Text>

          <View style={styles.rows}>
            <View style={styles.row}>
              <View style={styles.rowIcon}>
                <PermissionRowGalleryIcon fill={colors.contentPrimary} />
              </View>
              <View style={styles.rowText}>
                <Text style={styles.rowTitle}>{t.perm_intro_gallery_title}</Text>
                <Text style={styles.rowBody}>{t.perm_intro_gallery_body}</Text>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.rowIcon}>
                <PermissionRowBellIcon fill={colors.contentPrimary} />
              </View>
              <View style={styles.rowText}>
                <Text style={styles.rowTitle}>{t.perm_intro_notif_title}</Text>
                <Text style={styles.rowBody}>{t.perm_intro_notif_body}</Text>
              </View>
            </View>
          </View>

          <View style={styles.actions}>
            <View style={styles.actionPrimary}>
              <Button
                variant="primary"
                size="pill"
                fullWidth
                onPress={() => void onAllow()}
                accessibilityLabel={t.perm_intro_allow}
              >
                {t.perm_intro_allow}
              </Button>
            </View>

            <View style={styles.actionSecondary}>
              <Button
                variant="secondary"
                size="pill"
                fullWidth
                onPress={goHome}
                accessibilityLabel={t.perm_intro_later}
              >
                {t.perm_intro_later}
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
