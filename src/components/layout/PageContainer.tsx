import { type ReactNode } from 'react'
import { cn } from '@/lib'

interface PageContainerProps {
  children: ReactNode
  className?: string
  /** Add bottom padding for the tab bar */
  withTabBar?: boolean
  /** Stretch to fill viewport height */
  fullHeight?: boolean
}

export function PageContainer({ children, className, withTabBar = true, fullHeight = false }: PageContainerProps) {
  return (
    <main
      className={cn(
        'flex-1 w-full mx-auto max-w-2xl lg:max-w-7xl',
        withTabBar && 'pb-20',
        fullHeight && 'flex flex-col',
        className,
      )}
    >
      {children}
    </main>
  )
}
