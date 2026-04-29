import { useCallback, useEffect } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import Svg, { Path, Rect } from 'react-native-svg'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Button } from '@/components/atoms/Button'
import { useTranslation } from '@/hooks/useTranslation'
import { requestMediaLibraryAndNotifications } from '@/lib/nativePermissions'
import { useAuthStore } from '@/store/authStore'
import { colors } from '@/theme/colors'

function GalleryGlyph() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" accessibilityElementsHidden>
      <Rect
        x={3.5}
        y={5.5}
        width={17}
        height={13}
        rx={2}
        stroke={colors.contentPrimary}
        strokeWidth={1.5}
        fill="none"
      />
      <Path
        d="M7 16l2.5-3.5 2 2.5L14.5 11 18 16H7z"
        fill={colors.primary600}
        opacity={0.95}
      />
    </Svg>
  )
}

function BellGlyph() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" accessibilityElementsHidden>
      <Path
        fill={colors.contentPrimary}
        d="M12 22a2.2 2.2 0 002-2h-4a2.2 2.2 0 002 2zm5.5-6.2V11a5.5 5.5 0 00-4.5-5.4V4.25a1.25 1.25 0 00-2.5 0V5.6A5.5 5.5 0 006.5 11v4.8L4.75 18h14.5L17.5 15.8z"
      />
    </Svg>
  )
}

function PermissionHeroArt() {
  return (
    <View style={styles.heroWrap} accessibilityElementsHidden pointerEvents="none">
      <View style={styles.heroFrame}>
        <View style={styles.heroScreen} />
        <View style={styles.heroAvatar} />
      </View>
    </View>
  )
}

export function PreAppPermissionScreen() {
  const insets = useSafeAreaInsets()
  const t = useTranslation()
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const hasSeenOnboarding = useAuthStore((s) => s.hasSeenOnboarding)
  const hasCompletedPermissionIntro = useAuthStore((s) => s.hasCompletedPermissionIntro)
  const setHasCompletedPermissionIntro = useAuthStore((s) => s.setHasCompletedPermissionIntro)

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login')
      return
    }
    if (!hasSeenOnboarding) {
      router.replace('/onboarding')
      return
    }
    if (hasCompletedPermissionIntro) {
      router.replace('/home')
    }
  }, [isAuthenticated, hasSeenOnboarding, hasCompletedPermissionIntro])

  const goHome = useCallback(() => {
    setHasCompletedPermissionIntro(true)
    router.replace('/home')
  }, [setHasCompletedPermissionIntro])

  const onAllow = useCallback(async () => {
    setHasCompletedPermissionIntro(true)
    await requestMediaLibraryAndNotifications()
    router.replace('/home')
  }, [setHasCompletedPermissionIntro])

  if (!isAuthenticated || !hasSeenOnboarding || hasCompletedPermissionIntro) {
    return (
      <View style={styles.root}>
        <StatusBar style="light" />
      </View>
    )
  }

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: Math.max(insets.top, 12) + 8,
            paddingBottom: Math.max(insets.bottom, 24),
          },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sheet}>
          <PermissionHeroArt />

          <Text style={styles.headline}>{t.perm_intro_headline}</Text>

          <View style={styles.rows}>
            <View style={styles.row}>
              <View style={styles.rowIcon}>
                <GalleryGlyph />
              </View>
              <View style={styles.rowText}>
                <Text style={styles.rowTitle}>{t.perm_intro_gallery_title}</Text>
                <Text style={styles.rowBody}>{t.perm_intro_gallery_body}</Text>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.rowIcon}>
                <BellGlyph />
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

const styles = StyleSheet.create({
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
    paddingTop: 56,
    gap: 43,
    minHeight: 400,
  },
  heroWrap: {
    alignSelf: 'center',
    width: 67,
    height: 75,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroFrame: {
    width: 51,
    height: 56,
    marginTop: 6,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: colors.primary600,
    backgroundColor: 'transparent',
    alignItems: 'center',
    paddingTop: 10,
    overflow: 'hidden',
  },
  heroScreen: {
    width: 31,
    height: 20,
    borderRadius: 6,
    backgroundColor: colors.primary600,
    opacity: 0.22,
  },
  heroAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary600,
    opacity: 0.45,
    marginTop: 10,
  },
  headline: {
    fontSize: 28,
    lineHeight: 32,
    fontWeight: '900',
    color: colors.contentPrimary,
    textAlign: 'left',
    paddingVertical: 10,
  },
  rows: {
    gap: 23,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    paddingVertical: 10,
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
    marginTop: 8,
    width: '100%',
  },
  actionPrimary: {
    alignSelf: 'stretch',
  },
  actionSecondary: {
    alignSelf: 'stretch',
  },
})
