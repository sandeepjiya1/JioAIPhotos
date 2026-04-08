import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline'
type Size = 'sm' | 'md' | 'lg' | 'icon'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
  fullWidth?: boolean
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 disabled:opacity-50',
  secondary: 'bg-surface-3 text-content-primary hover:bg-surface-4 active:bg-surface-4 disabled:opacity-50',
  ghost: 'bg-transparent text-content-primary hover:bg-surface-2 active:bg-surface-3 disabled:opacity-50',
  danger: 'bg-error text-white hover:bg-red-600 active:bg-red-700 disabled:opacity-50',
  outline: 'border border-surface-3 bg-transparent text-content-primary hover:bg-surface-2 disabled:opacity-50',
}

const sizeClasses: Record<Size, string> = {
  sm: 'h-8 px-3 text-sm rounded-lg gap-1.5',
  md: 'h-11 px-5 text-sm rounded-xl gap-2',
  lg: 'h-14 px-6 text-base rounded-2xl gap-2',
  icon: 'h-11 w-11 rounded-xl',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, fullWidth, disabled, children, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center font-medium transition-colors select-none',
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
