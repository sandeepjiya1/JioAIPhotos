import { useOnlineStatus } from '@/hooks'
import { cn } from '@/lib'

export function OfflineBanner() {
  const isOnline = useOnlineStatus()

  return (
    <div
      role="alert"
      aria-live="polite"
      className={cn(
        'fixed top-0 left-0 right-0 z-[100] flex items-center justify-center gap-2',
        'py-2 px-4 text-sm font-medium text-white transition-transform duration-300',
        'bg-warning',
        isOnline ? '-translate-y-full' : 'translate-y-0',
      )}
    >
      <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
      You're offline — some features may be unavailable
    </div>
  )
}
