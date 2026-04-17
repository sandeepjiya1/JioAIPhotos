import 'react-native-gesture-handler'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Stack } from 'expo-router'
import { StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { AuthHydrationGate } from '@/components/system/AuthHydrationGate'
import { colors } from '@/theme/colors'
import { stackTransitionMs } from '@/theme/motion'

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

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <AuthHydrationGate>
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: colors.surface0 },
                animation: 'slide_from_right',
                animationDuration: stackTransitionMs,
                gestureEnabled: true,
                fullScreenGestureEnabled: true,
              }}
            />
          </AuthHydrationGate>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  root: { flex: 1 },
})
