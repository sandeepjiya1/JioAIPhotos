import { useEffect, useState, type ReactNode } from 'react'
import { useAuthStore } from '@/store/authStore'
import { Spinner } from '@/components/atoms'

/** Renders children only after auth persist has rehydrated (avoids localStorage merge clobbering UI). */
export function AuthHydrationGate({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(() => useAuthStore.persist.hasHydrated())

  useEffect(() => {
    if (useAuthStore.persist.hasHydrated()) return undefined
    return useAuthStore.persist.onFinishHydration(() => setReady(true))
  }, [])

  if (!ready) {
    return (
      <div className="flex items-center justify-center w-full min-h-dvh bg-surface-0">
        <Spinner size="lg" />
      </div>
    )
  }

  return <>{children}</>
}
