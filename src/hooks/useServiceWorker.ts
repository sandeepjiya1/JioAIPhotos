import { useRegisterSW } from 'virtual:pwa-register/react'
import { useState } from 'react'

export function useServiceWorker() {
  const [updateAvailable, setUpdateAvailable] = useState(false)

  const { updateServiceWorker } = useRegisterSW({
    onNeedRefresh() {
      setUpdateAvailable(true)
    },
    onOfflineReady() {
      console.info('[PWA] App ready for offline use')
    },
  })

  return { updateAvailable, updateServiceWorker }
}
