import { useMemo } from 'react'
import { Outlet } from 'react-router-dom'
import { BottomNavBar } from '@/components/organisms'
import type { NavItem } from '@/components/organisms'
import type { IconName } from '@/components/atoms'
import { useTranslation } from '@/hooks/useTranslation'
import type { Translations } from '@/lib/i18n'

type NavLabelKey = keyof Pick<
  Translations,
  'nav_home' | 'nav_photos' | 'nav_ai_camera' | 'nav_files' | 'nav_create'
>

const NAV_CONFIG: readonly {
  id: string
  to: string
  icon: IconName
  labelKey: NavLabelKey
}[] = [
  { id: 'home', to: '/home', icon: 'home', labelKey: 'nav_home' },
  { id: 'photos', to: '/home/photos', icon: 'albums', labelKey: 'nav_photos' },
  { id: 'ai-camera', to: '/home/ai-camera', icon: 'sparkles', labelKey: 'nav_ai_camera' },
  { id: 'files', to: '/home/files', icon: 'folder', labelKey: 'nav_files' },
  { id: 'create', to: '/home/create', icon: 'plus-circle', labelKey: 'nav_create' },
]

/**
 * AppLayout — wraps all authenticated app routes.
 *
 * Renders a single shared BottomNavBar and exposes an <Outlet />
 * for nested page content. Pages should NOT include their own nav.
 */
export function AppLayout() {
  const t = useTranslation()
  const navItems = useMemo<NavItem[]>(
    () =>
      NAV_CONFIG.map((row) => ({
        id: row.id,
        to: row.to,
        icon: row.icon,
        label: t[row.labelKey],
      })),
    [t],
  )

  return (
    <div className="flex flex-col min-h-dvh bg-surface-0">
      <Outlet />
      <BottomNavBar items={navItems} />
    </div>
  )
}
