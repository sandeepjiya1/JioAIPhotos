// ─── Common ──────────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  hasNextPage: boolean
}

export interface ApiError {
  message: string
  code?: string
  status?: number
}

// ─── Photo ───────────────────────────────────────────────────────────────────

export interface Photo {
  id: string
  url: string
  thumbnailUrl: string
  width: number
  height: number
  caption?: string
  takenAt?: string
  location?: {
    lat: number
    lng: number
    name?: string
  }
  tags?: string[]
  isFavorite: boolean
  album?: Album
  createdAt: string
  updatedAt: string
}

export interface Album {
  id: string
  name: string
  coverPhoto?: string
  photoCount: number
  createdAt: string
  updatedAt: string
}

// ─── User ────────────────────────────────────────────────────────────────────

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  storageUsed: number
  storageLimit: number
}

// ─── App State ───────────────────────────────────────────────────────────────

export type Theme = 'dark' | 'light' | 'system'
export type ViewMode = 'grid' | 'list' | 'masonry'
export type BottomTabId = 'home' | 'albums' | 'search' | 'memories' | 'profile'
export type Language = 'en' | 'hi'

// ─── Onboarding ──────────────────────────────────────────────────────────────

export interface OnboardingSlide {
  image: string
  title: string
  subtitle: string
  cta: string
}

// ─── Navigation ──────────────────────────────────────────────────────────────

export interface NavItemConfig {
  id: BottomTabId
  label: string
  to: string
}

// ─── Media ───────────────────────────────────────────────────────────────────

export type MediaCardVariant = 'memory' | 'greeting' | 'trending' | 'square'
