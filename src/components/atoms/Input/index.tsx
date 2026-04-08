import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/lib'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, leftIcon, rightIcon, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-content-secondary">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <span className="absolute left-3 flex items-center justify-center text-content-tertiary pointer-events-none">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full h-11 bg-surface-2 rounded-xl text-base text-content-primary placeholder:text-content-tertiary',
              'border border-surface-3 transition-colors',
              'focus:outline-none focus:border-primary-600 focus:bg-surface-1',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              leftIcon  ? 'pl-10' : 'pl-4',
              rightIcon ? 'pr-10' : 'pr-4',
              error && 'border-error focus:border-error',
              className,
            )}
            {...props}
          />
          {rightIcon && (
            <span className="absolute right-3 flex items-center justify-center text-content-tertiary pointer-events-none">
              {rightIcon}
            </span>
          )}
        </div>
        {error   && <p className="text-xs text-error">{error}</p>}
        {hint && !error && <p className="text-xs text-content-tertiary">{hint}</p>}
      </div>
    )
  },
)

Input.displayName = 'Input'
