import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Platform, View } from 'react-native'
import { HomeBottomNav } from '@/components/layout/HomeBottomNav'
import { homeTabFadeDurationMs } from '@/theme/motion'

const HOME_BG = '#001d2e'

export default function HomeLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: HOME_BG, overflow: 'visible' }}>
      <StatusBar style="light" />
      <View style={{ flex: 1, minHeight: 0 }}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: HOME_BG },
            /** Tab switches use `router.replace` — fade duration is longer on iOS so the cross-fade is visible. */
            animation: 'fade',
            animationDuration:
              Platform.OS === 'ios' ? homeTabFadeDurationMs.ios : homeTabFadeDurationMs.default,
            gestureEnabled: true,
          }}
        />
      </View>
      <HomeBottomNav />
    </View>
  )
}
