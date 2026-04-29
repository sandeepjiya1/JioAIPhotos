import { useEffect, useState, type ReactNode } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { useAuthStore } from '@/store/authStore'
import { colors } from '@/theme/colors'

/** Renders children only after auth persist has rehydrated from AsyncStorage. */
export function AuthHydrationGate({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(() => useAuthStore.persist.hasHydrated())

  useEffect(() => {
    if (useAuthStore.persist.hasHydrated()) {
      // Defer so we don’t sync setState in the effect body (react-hooks/set-state-in-effect), and
      // so we still flip `ready` if hydration completed after the first render but before subscribe.
      queueMicrotask(() => setReady(true))
      return undefined
    }
    return useAuthStore.persist.onFinishHydration(() => setReady(true))
  }, [])

  if (!ready) {
    return (
      <View style={styles.root}>
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
    backgroundColor: colors.surface0,
  },
})
