import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib'

export interface PhoneInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  value: string
  onChange: (value: string) => void
  error?: string
  countryCode?: string
}

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ value, onChange, error, countryCode = '+91', className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-content-primary">
          Enter your phone number
        </label>
        <div className="flex gap-3">
          {/* Country code badge */}
          <div
            className={cn(
              'flex items-center justify-center px-1 border rounded-sm w-[49px] h-[52px] shrink-0 transition-colors',
              error ? 'border-error' : 'border-content-secondary',
            )}
          >
            <span className="text-content-primary text-sm font-medium">{countryCode}</span>
          </div>

          {/* Number input */}
          <input
            ref={ref}
            type="tel"
            inputMode="numeric"
            maxLength={10}
            value={value}
            onChange={(e) => onChange(e.target.value.replace(/\D/g, ''))}
            placeholder="Enter 10-digit number"
            className={cn(
              'flex-1 h-[52px] bg-transparent border rounded-sm px-4',
              'text-content-primary text-base placeholder:text-content-tertiary',
              'focus:outline-none transition-colors',
              error
                ? 'border-error focus:border-error'
                : 'border-content-secondary focus:border-primary-600',
              className,
            )}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? 'phone-error' : undefined}
            {...props}
          />
        </div>
        {error && (
          <p id="phone-error" className="text-xs text-error" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  },
)

PhoneInput.displayName = 'PhoneInput'
