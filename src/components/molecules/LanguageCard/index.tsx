import { Button } from '@/components/atoms'

export interface LanguageCardProps {
  label: string
  selected: boolean
  onSelect: () => void
  className?: string
}

export function LanguageCard({ label, selected, onSelect, className }: LanguageCardProps) {
  return (
    <Button
      type="button"
      role="radio"
      aria-checked={selected}
      variant={selected ? 'secondary' : 'outline'}
      size="pill"
      fullWidth
      onClick={onSelect}
      className={className}
    >
      {label}
    </Button>
  )
}
