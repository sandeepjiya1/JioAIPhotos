import { Image, Pressable, ScrollView, StyleSheet, Text, View, Dimensions, useWindowDimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { TopBar } from '@/components/layout/TopBar'
import { homeBottomTabScrollPaddingBottom } from '@/components/layout/HomeBottomNav'
import { Button } from '@/components/atoms/Button'
import { resolveHomeImage } from '../../../assets/home/registry'
import { useAuthStore } from '@/store/authStore'
import { colors } from '@/theme/colors'

const AVATAR_WEB = '/assets/figma/6cd0e6362a73050667423418aae84ecb14f0f736.png'

const SETTINGS = ['Account', 'Notifications', 'Privacy', 'Help & Support', 'About'] as const

export default function ProfileScreen() {
  const phoneNumber = useAuthStore((s) => s.phoneNumber)
  const logout = useAuthStore((s) => s.logout)
  const insets = useSafeAreaInsets()
  const { width: winW } = useWindowDimensions()
  const ww = winW > 0 ? winW : Dimensions.get('window').width
  const avatarSrc = resolveHomeImage(AVATAR_WEB)

  const handleLogout = () => {
    logout()
    router.replace('/')
  }

  return (
    <View style={styles.root}>
      <TopBar title="Profile" />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: homeBottomTabScrollPaddingBottom(insets.bottom, ww) },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileCard}>
          <View style={styles.avatarRing}>
            {avatarSrc ? (
              <Image source={avatarSrc} style={styles.avatar} resizeMode="cover" />
            ) : (
              <Text style={styles.avatarLetter}>U</Text>
            )}
          </View>
          <Text style={styles.name}>Jio User</Text>
          {phoneNumber ? <Text style={styles.phone}>+91 {phoneNumber}</Text> : null}
        </View>

        <View style={styles.storageCard}>
          <View style={styles.storageLabels}>
            <Text style={styles.storageMuted}>Storage</Text>
            <Text style={styles.storageNums}>14.2 GB / 50 GB</Text>
          </View>
          <View style={styles.storageTrack}>
            <View style={[styles.storageFill, { width: `${(14.2 / 50) * 100}%` }]} />
          </View>
          <Button variant="outline" size="sm" onPress={() => {}} accessibilityLabel="Get more storage">
            Get more storage
          </Button>
        </View>

        <View style={styles.list}>
          {SETTINGS.map((item) => (
            <Pressable
              key={item}
              style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
              accessibilityRole="button"
              accessibilityLabel={item}
            >
              <Text style={styles.rowLabel}>{item}</Text>
              <Text style={styles.chev}>›</Text>
            </Pressable>
          ))}
        </View>

        <Button variant="danger" size="md" fullWidth onPress={handleLogout} accessibilityLabel="Sign out">
          Sign out
        </Button>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.surface0,
    minHeight: 0,
  },
  scroll: {
    flex: 1,
    minHeight: 0,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 24,
    gap: 16,
  },
  profileCard: {
    alignItems: 'center',
    gap: 12,
    paddingVertical: 24,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: colors.surface2,
  },
  avatarRing: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 3,
    borderColor: 'rgba(39,139,193,0.45)',
    overflow: 'hidden',
    backgroundColor: colors.surface3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  avatarLetter: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.contentPrimary,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.contentPrimary,
  },
  phone: {
    fontSize: 14,
    color: colors.contentSecondary,
  },
  storageCard: {
    borderRadius: 16,
    backgroundColor: colors.surface2,
    padding: 16,
    gap: 12,
  },
  storageLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  storageMuted: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.contentSecondary,
  },
  storageNums: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.contentSecondary,
    fontVariant: ['tabular-nums'],
  },
  storageTrack: {
    height: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.12)',
    overflow: 'hidden',
  },
  storageFill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: colors.primary600,
  },
  list: {
    gap: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: colors.surface2,
  },
  rowPressed: {
    backgroundColor: colors.surface3,
  },
  rowLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.contentPrimary,
  },
  chev: {
    fontSize: 18,
    color: colors.contentTertiary,
  },
})
