import { Button } from '@/components/atoms/Button'

export interface LanguageCardProps {
  label: string
  selected: boolean
  onSelect: () => void
}

export function LanguageCard({ label, selected, onSelect }: LanguageCardProps) {
  return (
    <Button
      variant={selected ? 'secondary' : 'outline'}
      size="pill"
      fullWidth
      onPress={onSelect}
      accessibilityLabel={label}
    >
      {label}
    </Button>
  )
}
