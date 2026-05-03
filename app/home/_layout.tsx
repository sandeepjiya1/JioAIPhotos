import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Platform, View } from 'react-native'
import { HomeBottomNav } from '@/components/layout/HomeBottomNav'
import { CreateBottomSheet } from '@/components/layout/CreateBottomSheet'
import { useThemeStore } from '@/store/themeStore'
import { homeTabFadeDurationMs } from '@/theme/motion'
import { useThemeColors } from '@/theme/useThemeColors'

export default function HomeLayout() {
  const colors = useThemeColors()
  const appearance = useThemeStore((s) => s.appearance)
  return (
    <View style={{ flex: 1, backgroundColor: colors.surface0, overflow: 'visible' }}>
      <StatusBar style={appearance === 'light' ? 'dark' : 'light'} />
      <View style={{ flex: 1, minHeight: 0 }}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.surface0 },
            /** Tab switches use `router.replace` — fade duration is longer on iOS so the cross-fade is visible. */
            animation: 'fade',
            animationDuration:
              Platform.OS === 'ios' ? homeTabFadeDurationMs.ios : homeTabFadeDurationMs.default,
            gestureEnabled: true,
          }}
        />
      </View>
      <HomeBottomNav />
      <CreateBottomSheet />
    </View>
  )
}
