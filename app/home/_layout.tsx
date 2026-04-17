import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'
import { HomeBottomNav } from '@/components/layout/HomeBottomNav'

export default function HomeLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: '#001d2e', overflow: 'visible' }}>
      <StatusBar style="light" />
      <View style={{ flex: 1, minHeight: 0 }}>
        <Stack screenOptions={{ headerShown: false }} />
      </View>
      <HomeBottomNav />
    </View>
  )
}
