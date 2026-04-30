import 'react-native-gesture-handler'
import 'react-native-reanimated'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Stack } from 'expo-router'
import { Platform, StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { AuthHydrationGate } from '@/components/system/AuthHydrationGate'
import { stackTransitionMs } from '@/theme/motion'
import { useThemeColors } from '@/theme/useThemeColors'

/**
 * Per-route overrides: add `<Stack.Screen name="routeName" options={{ ... }} />` children
 * here when a screen needs modal presentation, a different `animation`, or `gestureEnabled: false`.
 */

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

/**
 * With `userInterfaceStyle: "dark"`, paint `colors.surface0` on the root and stack so
 * the app canvas matches the design system (`#0C0D10` in dark mode), not an arbitrary OS default.
 */
function RootLayoutBody() {
  const colors = useThemeColors()
  return (
    <GestureHandlerRootView style={[styles.root, { backgroundColor: colors.surface0 }]}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <AuthHydrationGate>
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: colors.surface0 },
                /**
                 * iOS: `default` uses the native card push (reliable with `headerShown: false`).
                 * Android: `slide_from_right` + `animationDuration` (custom duration only applies on Android for this pair).
                 */
                animation: Platform.OS === 'ios' ? 'default' : 'slide_from_right',
                ...(Platform.OS === 'android' ? { animationDuration: stackTransitionMs } : {}),
                gestureEnabled: true,
                fullScreenGestureEnabled: Platform.OS === 'ios',
              }}
            />
          </AuthHydrationGate>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}

export default function RootLayout() {
  return <RootLayoutBody />
}

const styles = StyleSheet.create({
  root: { flex: 1 },
})
