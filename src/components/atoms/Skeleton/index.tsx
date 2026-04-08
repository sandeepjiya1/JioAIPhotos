import { type HTMLAttributes } from 'react'
import { cn } from '@/lib'

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  rounded?: boolean
}

export function Skeleton({ className, rounded = false, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse bg-surface-3',
        rounded ? 'rounded-full' : 'rounded-lg',
        className,
      )}
      {...props}
    />
  )
}
