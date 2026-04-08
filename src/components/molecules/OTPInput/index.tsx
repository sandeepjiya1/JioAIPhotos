import { useRef, useEffect } from 'react'
import { cn } from '@/lib'

export interface OTPInputProps {
  length?: number
  value: string[]
  onChange: (value: string[]) => void
  disabled?: boolean
  error?: string
  /** Countdown in seconds; 0 = show resend button */
  countdown?: number
  onResend?: () => void
}

export function OTPInput({
  length = 6,
  value,
  onChange,
  disabled = false,
  error,
  countdown = 0,
  onResend,
}: OTPInputProps) {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([])

  // Auto-focus the first empty box on mount
  useEffect(() => {
    const firstEmpty = value.findIndex((d) => !d)
    const idx = firstEmpty === -1 ? 0 : firstEmpty
    inputRefs.current[idx]?.focus()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = (index: number, raw: string) => {
    const digit = raw.replace(/\D/g, '').slice(-1)
    const next = [...value]
    next[index] = digit
    onChange(next)
    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)
    const next = Array(length).fill('')
    pasted.split('').forEach((ch, i) => { next[i] = ch })
    onChange(next)
    const focusIdx = Math.min(pasted.length, length - 1)
    inputRefs.current[focusIdx]?.focus()
  }

  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm font-medium text-content-primary">OTP number</label>

      {/* Boxes */}
      <div className="flex gap-3 w-full" onPaste={handlePaste}>
        {Array.from({ length }).map((_, i) => (
          <input
            key={i}
            ref={(el) => { inputRefs.current[i] = el }}
            type="tel"
            inputMode="numeric"
            maxLength={1}
            value={value[i] ?? ''}
            disabled={disabled}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            aria-label={`OTP digit ${i + 1}`}
            className={cn(
              'flex-1 h-[52px] min-w-0 bg-transparent border rounded-sm',
              'text-center text-content-primary text-base font-semibold',
              'focus:outline-none transition-colors caret-primary-600',
              'disabled:opacity-50',
              error
                ? 'border-error focus:border-error'
                : 'border-content-secondary focus:border-primary-600',
            )}
          />
        ))}
      </div>

      {/* Countdown / Resend */}
      {!error && (
        <p className="text-sm text-content-secondary">
          {countdown > 0 ? (
            <>Request OTP in <span className="font-semibold">{countdown} secs</span></>
          ) : (
            <button
              type="button"
              onClick={onResend}
              className="text-primary-600 font-bold focus:outline-none focus-visible:underline"
            >
              Resend OTP
            </button>
          )}
        </p>
      )}

      {error && (
        <p className="text-xs text-error" role="alert">{error}</p>
      )}
    </div>
  )
}
