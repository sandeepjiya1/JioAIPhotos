import { TabPlaceholderScreen } from '@/features/tabs/TabPlaceholderScreen'
import { useTranslation } from '@/hooks/useTranslation'

export default function CreateTabScreen() {
  const t = useTranslation()
  return <TabPlaceholderScreen title={t.nav_create} />
}
