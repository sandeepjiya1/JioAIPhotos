import { useServiceWorker } from '@/hooks'
import { Button } from '@/components/atoms'
import { cn } from '@/lib'

export function UpdatePrompt() {
  const { updateAvailable, updateServiceWorker } = useServiceWorker()

  return (
    <div
      role="alertdialog"
      aria-label="App update available"
      className={cn(
        'fixed bottom-20 left-4 right-4 z-[90] max-w-sm mx-auto',
        'bg-surface-2 border border-surface-3 rounded-2xl shadow-modal',
        'flex items-center gap-3 p-4',
        'transition-all duration-300',
        updateAvailable ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none',
      )}
    >
      <div className="flex-1">
        <p className="text-sm font-semibold text-content-primary">Update available</p>
        <p className="text-xs text-content-secondary mt-0.5">Reload to get the latest features</p>
      </div>
      <Button size="sm" onClick={() => updateServiceWorker(true)}>
        Reload
      </Button>
    </div>
  )
}
