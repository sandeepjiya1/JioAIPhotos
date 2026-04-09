import { TopBar } from '@/components/layout'
import { useTranslation } from '@/hooks/useTranslation'

export function CreatePage() {
  const t = useTranslation()
  return (
    <div className="flex flex-col min-h-dvh bg-surface-0">
      <TopBar title={t.nav_create} />
      <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 pb-24 pt-4 text-center">
        <p className="text-content-secondary text-sm font-medium">{t.nav_create}</p>
      </div>
    </div>
  )
}
