import { NavLink } from 'react-router-dom'
import { cn } from '@/lib'
import type { BottomTabId } from '@/types'

interface Tab {
  id: BottomTabId
  label: string
  to: string
  icon: (active: boolean) => React.ReactNode
}

interface BottomTabBarProps {
  tabs: Tab[]
}

export function BottomTabBar({ tabs }: BottomTabBarProps) {
  return (
    <nav
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50',
        'bg-surface-0/90 backdrop-blur-md border-t border-surface-2',
        'safe-bottom',
      )}
      aria-label="Main navigation"
    >
      <ul className="flex items-center justify-around h-16 px-2">
        {tabs.map((tab) => (
          <li key={tab.id} className="flex-1">
            <NavLink
              to={tab.to}
              className={({ isActive }) =>
                cn(
                  'flex flex-col items-center justify-center gap-0.5 py-2 rounded-xl mx-1 transition-colors',
                  'min-h-[56px]',
                  isActive ? 'text-primary-600' : 'text-content-tertiary',
                )
              }
              aria-label={tab.label}
            >
              {({ isActive }) => (
                <>
                  <span className="h-6 w-6 flex items-center justify-center">
                    {tab.icon(isActive)}
                  </span>
                  <span className="text-[10px] font-medium leading-none">{tab.label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
