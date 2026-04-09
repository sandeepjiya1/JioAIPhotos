import { SearchPage } from '@/pages/app/SearchPage'
import { useTranslation } from '@/hooks/useTranslation'

export function AiCameraPage() {
  const t = useTranslation()
  return <SearchPage topBarTitle={t.nav_ai_camera} />
}
