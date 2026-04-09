import { TopBar } from '@/components/layout'
import { useTranslation } from '@/hooks/useTranslation'

export function FilesPage() {
  const t = useTranslation()
  return (
    <div className="flex flex-col min-h-dvh bg-surface-0">
      <TopBar title={t.nav_files} />
      <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 pb-36 pt-4 text-center">
        <p className="text-content-secondary text-sm font-medium">{t.nav_files}</p>
      </div>
    </div>
  )
}
