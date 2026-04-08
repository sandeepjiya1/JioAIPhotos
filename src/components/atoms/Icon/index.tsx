import { type SVGProps } from 'react'
import { cn } from '@/lib'

/* ── Icon registry ─────────────────────────────────────────────────────────── */

export type IconName =
  | 'home'
  | 'albums'
  | 'search'
  | 'memories'
  | 'profile'
  | 'bell'
  | 'plus'
  | 'share'
  | 'edit'
  | 'more-h'
  | 'chevron-right'
  | 'chevron-left'
  | 'check'
  | 'close'
  | 'arrow-right'
  | 'camera'
  | 'heart'
  | 'download'

export type IconSize = 'xs' | 'sm' | 'md' | 'lg'

export interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName
  size?: IconSize
  /** Toggle between filled (active) and outlined (default) states */
  active?: boolean
  className?: string
}

const sizeMap: Record<IconSize, string> = {
  xs: 'size-4',
  sm: 'size-5',
  md: 'size-6',
  lg: 'size-7',
}

/* Paths keyed by name. Each entry has an `outline` path and optional `filled` path. */
const paths: Record<IconName, { outline: string; filled?: string }> = {
  home: {
    outline: 'M2.25 12L11.204 3.045a1.125 1.125 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25',
    filled:  'M11.47 3.841a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.061l-1.329-1.33A2.25 2.25 0 0019.5 9.75V9a.75.75 0 00-.75-.75H12a.75.75 0 00-.75.75v.75h-.75a2.25 2.25 0 00-2.25 2.25v.568l-1.328-1.33a.75.75 0 00-1.061 1.061l.72.72V21a.75.75 0 00.75.75h3a.75.75 0 00.75-.75v-3h3v3a.75.75 0 00.75.75h3a.75.75 0 00.75-.75V12.808l.72-.72a.75.75 0 00-1.06-1.06L12 4.621 4.28 12.328a.75.75 0 10-1.06 1.06l.72.72V21a.75.75 0 00.75.75h3a.75.75 0 00.75-.75v-3h3v3z',
  },
  albums: {
    outline: 'M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z',
  },
  search: {
    outline: 'M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803a7.5 7.5 0 0010.607 0z',
  },
  memories: {
    outline: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z',
    filled:  'M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z',
  },
  profile: {
    outline: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z',
    filled:  'M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z',
  },
  bell: {
    outline: 'M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0',
  },
  plus: {
    outline: 'M12 4.5v15m7.5-7.5h-15',
  },
  share: {
    outline: 'M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z',
  },
  edit: {
    outline: 'M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10',
  },
  'more-h': {
    outline: 'M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z',
  },
  'chevron-right': {
    outline: 'M8.25 4.5l7.5 7.5-7.5 7.5',
  },
  'chevron-left': {
    outline: 'M15.75 19.5L8.25 12l7.5-7.5',
  },
  check: {
    outline: 'M4.5 12.75l6 6 9-13.5',
  },
  close: {
    outline: 'M6 18L18 6M6 6l12 12',
  },
  'arrow-right': {
    outline: 'M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3',
  },
  camera: {
    outline: 'M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.776 48.776 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z',
  },
  heart: {
    outline: 'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z',
    filled:  'M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z',
  },
  download: {
    outline: 'M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3',
  },
}

export function Icon({ name, size = 'md', active = false, className, ...svgProps }: IconProps) {
  const { outline, filled } = paths[name]
  const useFilled = active && Boolean(filled)
  const d = useFilled ? filled! : outline

  /* Filled icons use fill-current; outlined use stroke-current */
  const isFilledVariant = useFilled

  return (
    <svg
      viewBox="0 0 24 24"
      fill={isFilledVariant ? 'currentColor' : 'none'}
      stroke={isFilledVariant ? 'none' : 'currentColor'}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn(sizeMap[size], className)}
      {...svgProps}
    >
      <path d={d} />
    </svg>
  )
}
