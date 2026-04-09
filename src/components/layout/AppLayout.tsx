import { useMemo } from 'react'
import { Outlet } from 'react-router-dom'
import { BottomNavBar } from '@/components/organisms'
import type { BottomNavGlyph, NavItem } from '@/components/organisms'
import { useTranslation } from '@/hooks/useTranslation'
import type { Translations } from '@/lib/i18n'

type NavLabelKey = keyof Pick<
  Translations,
  'nav_home' | 'nav_photos' | 'nav_ai_camera' | 'nav_files' | 'nav_create'
>

const NAV_CONFIG: readonly {
  id: string
  to: string
  glyph: BottomNavGlyph
  labelKey: NavLabelKey
}[] = [
  { id: 'home', to: '/home', glyph: 'home', labelKey: 'nav_home' },
  { id: 'photos', to: '/home/photos', glyph: 'photos', labelKey: 'nav_photos' },
  { id: 'ai-camera', to: '/home/ai-camera', glyph: 'ai-camera', labelKey: 'nav_ai_camera' },
  { id: 'files', to: '/home/files', glyph: 'files', labelKey: 'nav_files' },
  { id: 'create', to: '/home/create', glyph: 'create', labelKey: 'nav_create' },
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
        glyph: row.glyph,
        label: t[row.labelKey],
        featured: row.id === 'ai-camera',
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
