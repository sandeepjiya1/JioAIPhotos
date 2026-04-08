import { NavLink } from 'react-router-dom'
import { cn } from '@/lib'
import { Icon } from '@/components/atoms'
import type { IconName } from '@/components/atoms'

export interface NavItem {
  id: string
  label: string
  to: string
  icon: IconName
  /** Render as a prominent "add" FAB in the centre */
  isFab?: boolean
}

export interface BottomNavBarProps {
  items: NavItem[]
  className?: string
}

export function BottomNavBar({ items, className }: BottomNavBarProps) {
  return (
    <nav
      aria-label="Main navigation"
      className={cn(
        'fixed bottom-0 left-0 right-0 z-nav',
        'bg-surface-0/90 backdrop-blur-md border-t border-on-border/30',
        'safe-bottom',
        className,
      )}
    >
      <ul className="flex items-center justify-around h-16 px-2">
        {items.map((item) => (
          <li key={item.id} className="flex-1">
            {item.isFab ? (
              /* Centre FAB — not a NavLink, just a button */
              <NavLink
                to={item.to}
                className="flex flex-col items-center justify-center gap-0.5 py-2 rounded-xl mx-1 min-h-[56px]"
                aria-label={item.label}
              >
                <span className="size-12 rounded-full bg-primary-600 flex items-center justify-center shadow-lg">
                  <Icon name={item.icon} size="md" className="text-white" />
                </span>
              </NavLink>
            ) : (
              <NavLink
                to={item.to}
                end={item.to === '/home'}
                className={({ isActive }) =>
                  cn(
                    'flex flex-col items-center justify-center gap-0.5 py-2 rounded-xl mx-1 transition-colors min-h-[56px]',
                    isActive ? 'text-primary-600' : 'text-content-tertiary',
                  )
                }
                aria-label={item.label}
              >
                {({ isActive }) => (
                  <>
                    <span className="size-6 flex items-center justify-center">
                      <Icon name={item.icon} size="md" active={isActive} />
                    </span>
                    <span className="text-[10px] font-medium leading-none">{item.label}</span>
                  </>
                )}
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
