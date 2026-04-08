import { type HTMLAttributes } from 'react'
import { cn } from '@/lib'

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'error'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-surface-3 text-content-secondary',
  primary: 'bg-primary-600/20 text-primary-400',
  success: 'bg-success/20 text-green-400',
  warning: 'bg-warning/20 text-yellow-400',
  error:   'bg-error/20 text-red-400',
}

export function Badge({ className, variant = 'default', children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-pill px-2 py-0.5 text-xs font-medium',
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
