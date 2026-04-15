import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib'

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger' | 'outline'
export type ButtonSize = 'sm' | 'md' | 'lg' | 'pill' | 'icon'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  fullWidth?: boolean
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:   'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 disabled:opacity-50',
  secondary: 'bg-surface-3  text-content-primary hover:bg-surface-4 active:bg-surface-4 disabled:opacity-50',
  tertiary:
    'bg-transparent text-primary-400 hover:bg-surface-2/60 hover:text-primary-300 active:bg-surface-3 disabled:opacity-50',
  ghost:     'bg-transparent text-content-primary hover:bg-surface-2 active:bg-surface-3 disabled:opacity-50',
  danger:    'bg-error text-white hover:bg-red-600 active:bg-red-700 disabled:opacity-50',
  outline:   'border border-on-border bg-transparent text-content-primary hover:bg-surface-2 disabled:opacity-50',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm:   'h-8 px-3 text-sm rounded-lg gap-1.5',
  md:   'h-11 px-5 text-sm rounded-xl gap-2',
  lg:   'h-14 px-6 text-base rounded-2xl gap-2',
  pill: 'h-12 px-6 text-base rounded-pill gap-2',
  icon: 'h-11 w-11 rounded-xl',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, fullWidth, disabled, children, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center font-semibold transition-colors select-none',
        'focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    >
      {loading ? (
        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        children
      )}
    </button>
  ),
)

Button.displayName = 'Button'
