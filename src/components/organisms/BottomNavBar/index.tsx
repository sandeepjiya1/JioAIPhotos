import { NavLink } from 'react-router-dom'
import { cn } from '@/lib'
import { Icon } from '@/components/atoms'
import type { IconName } from '@/components/atoms'

export interface NavItem {
  id: string
  label: string
  to: string
  icon: IconName
}

export interface BottomNavBarProps {
  items: NavItem[]
  className?: string
}

/**
 * Bottom navigation — solid surface from DS (`surface-3`), on-colour text tokens for states.
 */
export function BottomNavBar({ items, className }: BottomNavBarProps) {
  return (
    <nav
      aria-label="Main navigation"
      className={cn(
        'fixed bottom-0 left-0 right-0 z-nav',
        'bg-surface-3',
        'border-t border-on-border',
        'safe-bottom',
        'font-jio',
        className,
      )}
    >
      <ul className="flex min-h-16 items-stretch px-4">
        {items.map((item) => (
          <li key={item.id} className="flex min-w-0 flex-1">
            <NavLink
              to={item.to}
              end={item.to === '/home'}
              className={cn(
                'flex w-full min-h-16 flex-col items-center justify-center gap-1.5 rounded-md px-0.5 py-1',
                'transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-3',
              )}
              aria-label={item.label}
            >
              {({ isActive }) => (
                <>
                  <span
                    className={cn(
                      'flex size-5 shrink-0 items-center justify-center',
                      isActive ? 'text-on-high' : 'text-on-medium',
                    )}
                  >
                    <Icon name={item.icon} size="sm" forceFilled />
                  </span>
                  <span
                    className={cn(
                      'max-w-full truncate text-center text-xs leading-3',
                      isActive ? 'text-on-high font-semibold' : 'text-on-medium font-medium',
                    )}
                  >
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
