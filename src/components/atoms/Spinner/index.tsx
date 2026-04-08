import { cn } from '@/lib'

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg'

export interface SpinnerProps {
  size?: SpinnerSize
  className?: string
  'aria-label'?: string
}

const sizeClasses: Record<SpinnerSize, string> = {
  xs: 'size-3  border-[1.5px]',
  sm: 'size-4  border-2',
  md: 'size-6  border-2',
  lg: 'size-10 border-[3px]',
}

export function Spinner({ size = 'md', className, 'aria-label': label = 'Loading…' }: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className={cn(
        'inline-block rounded-full border-primary-600 border-t-transparent animate-spin',
        sizeClasses[size],
        className,
      )}
    />
  )
}
