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
        'rounded-xl py-8 text-center text-xl font-black transition-colors border w-full',
        selected
          ? 'bg-surface-0 border-content-primary text-content-primary'
          : 'bg-transparent border-on-border text-content-secondary',
        className,
      )}
    >
      {label}
    </button>
  )
}
