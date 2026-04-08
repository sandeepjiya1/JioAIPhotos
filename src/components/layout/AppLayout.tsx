import { Outlet } from 'react-router-dom'
import { BottomNavBar } from '@/components/organisms'
import type { NavItem } from '@/components/organisms'

const NAV_ITEMS: NavItem[] = [
  { id: 'home',     label: 'Home',     to: '/home',          icon: 'home' },
  { id: 'albums',   label: 'Albums',   to: '/home/albums',   icon: 'albums' },
  { id: 'add',      label: 'Create',   to: '/home/search',   icon: 'camera', isFab: true },
  { id: 'search',   label: 'Search',   to: '/home/search',   icon: 'search' },
  { id: 'profile',  label: 'Profile',  to: '/home/profile',  icon: 'profile' },
]

/**
 * AppLayout — wraps all authenticated app routes.
 *
 * Renders a single shared BottomNavBar and exposes an <Outlet />
 * for nested page content. Pages should NOT include their own nav.
 */
export function AppLayout() {
  return (
    <div className="flex flex-col min-h-dvh bg-surface-0">
      <Outlet />
      <BottomNavBar items={NAV_ITEMS} />
    </div>
  )
}
