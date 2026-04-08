import { type HTMLAttributes } from 'react'
import { cn } from '@/lib'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'bordered'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const variantClasses = {
  default: 'bg-surface-1',
  elevated: 'bg-surface-2 shadow-card',
  bordered: 'bg-surface-1 border border-surface-3',
}

const paddingClasses = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
}

export function Card({ className, variant = 'default', padding = 'md', children, ...props }: CardProps) {
  return (
    <div
      className={cn('rounded-card overflow-hidden', variantClasses[variant], paddingClasses[padding], className)}
      {...props}
    >
      {children}
    </div>
  )
}
