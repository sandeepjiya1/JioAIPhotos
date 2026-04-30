import { useEffect, useState, type ReactNode } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { useAuthStore } from '@/store/authStore'
import { useThemeColors } from '@/theme/useThemeColors'

/** Renders children only after auth persist has rehydrated from AsyncStorage. */
export function AuthHydrationGate({ children }: { children: ReactNode }) {
  const colors = useThemeColors()
  const [ready, setReady] = useState(() => useAuthStore.persist.hasHydrated())

  useEffect(() => {
    if (useAuthStore.persist.hasHydrated()) {
      queueMicrotask(() => setReady(true))
      return undefined
    }
    return useAuthStore.persist.onFinishHydration(() => setReady(true))
  }, [])

  if (!ready) {
    return (
      <View style={[styles.root, { backgroundColor: colors.surface0 }]}>
        <ActivityIndicator size="large" color={colors.primary200} />
      </View>
    )
  }

  return <>{children}</>
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
