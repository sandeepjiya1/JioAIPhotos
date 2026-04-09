import { NavLink } from 'react-router-dom'
import { cn } from '@/lib'
import { NavBarGlyph, type BottomNavGlyph } from './NavBarGlyph'

export type { BottomNavGlyph }

export interface NavItem {
  id: string
  label: string
  to: string
  /** Figma bottom-nav artwork — see `public/assets/nav/*.svg` */
  glyph: BottomNavGlyph
  /** Center “fab” style — protruding orb (e.g. AI Camera). */
  featured?: boolean
}

export interface BottomNavBarProps {
  items: NavItem[]
  className?: string
}

const linkFocus =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent'

function StandardNavItem({ item }: { item: NavItem }) {
  return (
    <li className="flex min-w-0 flex-1">
      <NavLink
        to={item.to}
        end={item.to === '/home'}
        className={cn(
          'flex w-full min-h-12 flex-col items-center justify-end gap-1 rounded-lg px-0.5 pb-1.5 pt-1',
          'transition-colors',
          linkFocus,
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
              <NavBarGlyph glyph={item.glyph} />
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
  )
}

function FeaturedNavItem({ item }: { item: NavItem }) {
  return (
    <li className="relative z-[2] flex min-w-0 flex-1 flex-col items-center">
      <NavLink
        to={item.to}
        end={item.to === '/home'}
        className={cn(
          'flex w-full flex-col items-center gap-1 rounded-2xl pb-1.5 pt-0',
          linkFocus,
        )}
        aria-label={item.label}
      >
        {({ isActive }) => (
          <>
            <span className="relative -mt-11 mb-px flex size-11 shrink-0 items-center justify-center">
              {/* Soft outer halo — breathes behind the orb */}
              <span
                className="nav-orb-halo pointer-events-none absolute size-[2.875rem] rounded-full bg-primary-400/35 blur-[10px]"
                aria-hidden
              />
              {/* Slow conic sweep — sci-fi edge energy */}
              <span
                className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
                aria-hidden
              >
                <span
                  className="nav-orb-sweep absolute -inset-[40%] opacity-[0.22] bg-[conic-gradient(from_0deg,transparent_0deg,rgba(186,230,255,0.5)_90deg,transparent_180deg,transparent_360deg)]"
                />
              </span>
              <span
                className={cn(
                  'relative z-[1] flex size-11 items-center justify-center rounded-full border-2',
                  isActive ? 'border-primary-400/55' : 'border-surface-0',
                  'bg-gradient-to-b from-primary-300/95 via-primary-500 to-primary-700 text-white',
                  'transition-transform duration-200 will-change-transform active:scale-[0.94]',
                  isActive ? 'nav-orb-glow-active' : 'nav-orb-glow',
                )}
              >
                <span
                  className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-white/40 via-transparent to-primary-900/25 opacity-95"
                  aria-hidden
                />
                <NavBarGlyph
                  glyph={item.glyph}
                  className="relative z-[1] size-5 text-white drop-shadow-[0_0_6px_rgba(186,230,255,0.7)]"
                />
              </span>
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
  )
}

/**
 * Bottom navigation — glass bar with optional featured orb (AI Camera).
 */
export function BottomNavBar({ items, className }: BottomNavBarProps) {
  return (
    <nav
      aria-label="Main navigation"
      className={cn(
        'fixed bottom-0 left-0 right-0 z-nav overflow-visible',
        'glass-nav border-t border-white/[0.12]',
        'shadow-[0_-6px_24px_rgba(0,0,0,0.3)]',
        'safe-bottom font-jio',
        className,
      )}
    >
      <ul className="relative mx-auto flex max-w-lg items-end justify-between gap-0.5 px-2 py-1.5">
        {items.map((item) =>
          item.featured ? (
            <FeaturedNavItem key={item.id} item={item} />
          ) : (
            <StandardNavItem key={item.id} item={item} />
          ),
        )}
      </ul>
    </nav>
  )
}
