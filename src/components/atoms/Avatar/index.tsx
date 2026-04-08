import { useState, type ImgHTMLAttributes } from 'react'
import { cn } from '@/lib'

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type AvatarRing = 'none' | 'primary' | 'dashed'

export interface AvatarProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src?: string
  fallback?: string
  size?: AvatarSize
  ring?: AvatarRing
}

const sizeClasses: Record<AvatarSize, string> = {
  xs: 'size-6',
  sm: 'size-8',
  md: 'size-10',
  lg: 'size-14',
  xl: 'size-20',
}

const ringClasses: Record<AvatarRing, string> = {
  none:    '',
  primary: 'ring-2 ring-primary-600 ring-offset-1 ring-offset-surface-0',
  dashed:  'ring-2 ring-on-border ring-offset-1 ring-offset-surface-0',
}

export function Avatar({ src, fallback, size = 'md', ring = 'none', className, alt = '', ...props }: AvatarProps) {
  const [error, setError] = useState(false)
  const showFallback = !src || error

  return (
    <div
      className={cn(
        'rounded-full overflow-hidden bg-surface-3 flex items-center justify-center shrink-0',
        sizeClasses[size],
        ring !== 'none' && ringClasses[ring],
        className,
      )}
    >
      {showFallback ? (
        <span className="text-content-secondary font-semibold text-xs select-none">
          {fallback ?? '?'}
        </span>
      ) : (
        <img
          src={src}
          alt={alt}
          className="size-full object-cover"
          onError={() => setError(true)}
          {...props}
        />
      )}
    </div>
  )
}
