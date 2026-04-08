import { type ElementType, type HTMLAttributes } from 'react'
import { cn } from '@/lib'

export type TypographyVariant =
  | 'display'
  | 'heading-l'
  | 'heading-m'
  | 'label-l'
  | 'label-m'
  | 'label-s'
  | 'body'
  | 'caption'

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant
  as?: ElementType
  /** Use a design-system color token instead of inheriting */
  color?: 'primary' | 'secondary' | 'tertiary' | 'tinted' | 'disabled'
}

const variantClasses: Record<TypographyVariant, string> = {
  'display':   'text-[2rem]     leading-[2rem]     font-black',
  'heading-l': 'text-[1.75rem]  leading-[1.75rem]  font-black',
  'heading-m': 'text-[1.375rem] leading-[1.5rem]   font-black',
  'label-l':   'text-[1.125rem] leading-[1.5rem]   font-semibold',
  'label-m':   'text-[1rem]     leading-[1.375rem] font-semibold',
  'label-s':   'text-[0.875rem] leading-[1.25rem]  font-medium',
  'body':      'text-[0.875rem] leading-[1.375rem] font-normal',
  'caption':   'text-[0.75rem]  leading-[1.125rem] font-normal',
}

const defaultTag: Record<TypographyVariant, ElementType> = {
  'display':   'h1',
  'heading-l': 'h2',
  'heading-m': 'h3',
  'label-l':   'p',
  'label-m':   'p',
  'label-s':   'p',
  'body':      'p',
  'caption':   'span',
}

const colorClasses = {
  primary:  'text-content-primary',
  secondary:'text-content-secondary',
  tertiary: 'text-content-tertiary',
  tinted:   'text-on-tinted',
  disabled: 'text-content-disabled',
}

export function Typography({
  variant = 'body',
  as,
  color,
  className,
  children,
  ...props
}: TypographyProps) {
  const Tag = as ?? defaultTag[variant]
  return (
    <Tag
      className={cn(variantClasses[variant], color && colorClasses[color], className)}
      {...props}
    >
      {children}
    </Tag>
  )
}
