import { TopBar } from './TopBar'

export interface AppTabPlaceholderLayoutProps {
  title: string
}

/**
 * Bottom-nav tabs that use the same interaction and page chrome as Create:
 * `TopBar` + centered body, no scrollable rail.
 */
export function AppTabPlaceholderLayout({ title }: AppTabPlaceholderLayoutProps) {
  return (
    <div className="flex flex-col min-h-dvh bg-surface-0">
      <TopBar title={title} />
      <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 pb-36 pt-4 text-center">
        <p className="text-content-secondary text-sm font-medium">{title}</p>
      </div>
    </div>
  )
}
