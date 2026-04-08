import { cn } from '@/lib'

export interface LanguageCardProps {
  label: string
  selected: boolean
  onSelect: () => void
  className?: string
}

export function LanguageCard({ label, selected, onSelect, className }: LanguageCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      role="radio"
      aria-checked={selected}
      className={cn(
        'min-h-12 rounded-pill px-6 py-3 text-center text-base font-semibold transition-colors border w-full',
        'inline-flex items-center justify-center',
        selected
          ? 'bg-primary-600 border-primary-600 text-white'
          : 'bg-transparent border-on-border text-content-secondary hover:bg-surface-2',
        className,
      )}
    >
      {label}
    </button>
  )
}
