import { AppTabPlaceholderLayout } from '@/components/layout'
import { useTranslation } from '@/hooks/useTranslation'

export function AlbumsPage() {
  const t = useTranslation()
  return <AppTabPlaceholderLayout title={t.nav_photos} />
}
