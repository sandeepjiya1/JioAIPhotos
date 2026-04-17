import { useEffect } from 'react'
import { Camera } from 'expo-camera'
import { TabPlaceholderScreen } from '@/features/tabs/TabPlaceholderScreen'
import { useTranslation } from '@/hooks/useTranslation'

export default function AiCameraTabScreen() {
  const t = useTranslation()

  useEffect(() => {
    void Camera.requestCameraPermissionsAsync()
  }, [])

  return <TabPlaceholderScreen title={t.nav_ai_camera} />
}
