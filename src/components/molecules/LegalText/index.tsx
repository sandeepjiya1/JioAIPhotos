import { cn } from '@/lib'
import { useTranslation } from '@/hooks/useTranslation'

export interface LegalTextProps {
  className?: string
}

export function LegalText({ className }: LegalTextProps) {
  const t = useTranslation()
  return (
    <p className={cn('text-content-secondary text-sm font-medium leading-5', className)}>
      {t.legal_text}
      <span className="font-bold text-content-primary">{t.legal_tos}</span>
      {t.legal_and}
      <span className="font-bold text-content-primary">{t.legal_privacy}</span>
    </p>
  )
}
