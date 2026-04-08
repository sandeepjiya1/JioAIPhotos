import { cn } from '@/lib'

export interface LegalTextProps {
  className?: string
}

export function LegalText({ className }: LegalTextProps) {
  return (
    <p className={cn('text-content-secondary text-sm font-medium leading-5', className)}>
      By continuing, you agree to our{' '}
      <span className="font-bold text-content-primary">Terms &amp; Conditions</span>
      {' '}and{' '}
      <span className="font-bold text-content-primary">Privacy Policy.</span>
    </p>
  )
}
