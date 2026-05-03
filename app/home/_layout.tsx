import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { Platform, View } from 'react-native'
import { HomeBottomNav } from '@/components/layout/HomeBottomNav'
import { CreateBottomSheet } from '@/components/layout/CreateBottomSheet'
import { useThemeStore } from '@/store/themeStore'
import { homeJourneyStackAnimationMs, homeTabFadeDurationMs } from '@/theme/motion'
import { useThemeColors } from '@/theme/useThemeColors'

const tabFadeDuration =
  Platform.OS === 'ios' ? homeTabFadeDurationMs.ios : homeTabFadeDurationMs.default

const tabStackOptions = {
  animation: 'fade' as const,
  animationDuration: tabFadeDuration,
  gestureEnabled: true,
}

/** Pushes from Home (and Photos tab): native card on iOS, timed slide on Android. */
const journeyStackOptions =
  Platform.OS === 'ios'
    ? { animation: 'default' as const, gestureEnabled: true }
    : {
        animation: 'slide_from_right' as const,
        animationDuration: homeJourneyStackAnimationMs,
        gestureEnabled: true,
      }

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
            ...tabStackOptions,
          }}
        >
          <Stack.Screen name="index" options={tabStackOptions} />
          <Stack.Screen name="photos" options={tabStackOptions} />
          <Stack.Screen name="create" options={tabStackOptions} />
          <Stack.Screen name="ai-avatar" options={journeyStackOptions} />
          <Stack.Screen name="ai-avatar-jerseys" options={journeyStackOptions} />
          <Stack.Screen name="memories" options={journeyStackOptions} />
          <Stack.Screen name="search" options={journeyStackOptions} />
          <Stack.Screen name="profile" options={journeyStackOptions} />
          <Stack.Screen name="files" options={journeyStackOptions} />
          <Stack.Screen name="ai-camera" options={journeyStackOptions} />
          <Stack.Screen name="greeting/[id]" options={journeyStackOptions} />
        </Stack>
      </View>
      <HomeBottomNav />
      <CreateBottomSheet />
    </View>
  )
}
