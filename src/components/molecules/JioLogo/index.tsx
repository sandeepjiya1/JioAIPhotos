import { cn } from '@/lib'

export type JioLogoSize = 'xs' | 'sm' | 'md' | 'lg'

export interface JioLogoProps {
  size?: JioLogoSize
  className?: string
}

const sizeMap: Record<JioLogoSize, { outer: string; fontSize: number }> = {
  xs: { outer: 'size-5',  fontSize: 8  },
  sm: { outer: 'size-6',  fontSize: 10 },
  md: { outer: 'size-8',  fontSize: 12 },
  lg: { outer: 'size-12', fontSize: 18 },
}

export function JioLogo({ size = 'md', className }: JioLogoProps) {
  const { outer, fontSize } = sizeMap[size]
  return (
    <div
      className={cn(
        'shrink-0 rounded-full bg-primary-600 overflow-hidden',
        'flex items-center justify-center',
        outer,
        className,
      )}
    >
      <span
        style={{
          fontSize: `${fontSize}px`,
          lineHeight: 1,
          fontFamily: 'Arial, Helvetica, sans-serif',
          fontWeight: 900,
          color: '#ffffff',
          display: 'block',
          letterSpacing: '-0.02em',
        }}
      >
        Jio
      </span>
    </div>
  )
}
