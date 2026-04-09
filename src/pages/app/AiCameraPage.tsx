import { AppTabPlaceholderLayout } from '@/components/layout'
import { useTranslation } from '@/hooks/useTranslation'

export function AiCameraPage() {
  const t = useTranslation()
  return <AppTabPlaceholderLayout title={t.nav_ai_camera} />
}
