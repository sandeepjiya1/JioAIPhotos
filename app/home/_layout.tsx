import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'
import { HomeBottomNav } from '@/components/layout/HomeBottomNav'
import { motionDuration } from '@/theme/motion'

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
            /** Tab switches use `router.replace` — a short fade reads as intentional without stacking history. */
            animation: 'fade',
            animationDuration: motionDuration.fast,
            gestureEnabled: true,
          }}
        />
      </View>
      <HomeBottomNav />
    </View>
  )
}
