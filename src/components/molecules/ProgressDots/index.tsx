import { cn } from '@/lib'

export interface ProgressDotsProps {
  total: number
  current: number
  onDotPress?: (index: number) => void
  className?: string
}

export function ProgressDots({ total, current, onDotPress, className }: ProgressDotsProps) {
  return (
    <div className={cn('flex items-center gap-1.5', className)} role="tablist" aria-label="Slide progress">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          type="button"
          role="tab"
          aria-selected={i === current}
          aria-label={`Go to slide ${i + 1}`}
          onClick={() => onDotPress?.(i)}
          className={cn(
            'rounded-full transition-all duration-300',
            i === current
              ? 'w-6 h-2 bg-jio-teal'
              : 'w-2 h-2 bg-jio-teal-light opacity-60',
          )}
        />
      ))}
    </div>
  )
}
