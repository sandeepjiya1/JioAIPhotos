/**
 * Home screen content — single source of truth for lists and copy.
 * Swap this module for API/CMS data (e.g. React Query) without changing layout components.
 */

export interface HomeMemoryOverlayGradient {
  colors: readonly string[]
  locations: readonly number[]
  start: { x: number; y: number }
  end: { x: number; y: number }
}

export interface HomeMemoryCard {
  id: string
  image: string
  title: string
  date: string
  /** Figma Memories_Section (1131:118028) — bottom tint on thumbnail */
  overlayGradient: HomeMemoryOverlayGradient
}

export interface HomeGreetingCard {
  id: string
  image: string
  /** Wish category label (bottom overlay on grid tiles). */
  label: string
}

export interface HomePhotoTile {
  id: string
  src: string
  /** When set, shows “+N” overlay (last grid cell). */
  morePhotosOverlay?: { count: number; unitLabel: string }
  /** Figma Photos_Section — duration + play on thumbnail (e.g. middle-right tile). */
  videoBadge?: { durationLabel: string }
}

export interface HomeRichSection<T> {
  title: string
  subtitle?: string
  items: readonly T[]
}

export const HOME_SHOW_SECTION_SUBTITLES = false

/** IPL hero rail — section heading on home */
export const HOME_IPL_AVATARS_SECTION_TITLE = 'Your AI Avatars' as const

export const HOME_HEADER = {
  avatarSrc: '/assets/figma/6cd0e6362a73050667423418aae84ecb14f0f736.png',
  avatarFallback: 'U',
} as const

/** Figma Memories_Section (1131:118028) */
export const HOME_MEMORIES_SECTION: HomeRichSection<HomeMemoryCard> = {
  title: 'Memories',
  subtitle: 'Your photos and videos come together to watch and share anytime.',
  items: [
    {
      id: 'mem-1',
      image: '/assets/mem-varanasi-1597bc99.png?v=20260429b',
      title: 'Varanasi trip',
      date: '20 June 2026',
      overlayGradient: {
        colors: ['rgba(235,101,104,0)', 'rgba(156,18,21,0.82)', 'rgb(139,0,2)'],
        locations: [0.245, 0.865, 1],
        start: { x: 0.5, y: 0 },
        end: { x: 0.5, y: 1 },
      },
    },
    {
      id: 'mem-2',
      image: '/assets/figma/9c3be8ec82a701547f20afe3432e1123d6e09a4a.png',
      title: "Rahan's Bday",
      date: '26 June 2026',
      overlayGradient: {
        colors: ['rgba(6,35,115,0)', 'rgb(6,35,115)'],
        locations: [0.37, 0.96],
        start: { x: 0.5, y: 0 },
        end: { x: 0.5, y: 1 },
      },
    },
    {
      id: 'mem-3',
      image: '/assets/figma/e5ed6df5cb304c15b0443f6e03cd8446e5b2b912.png',
      title: 'Happy Anniversary',
      date: '20 June 2026',
      overlayGradient: {
        colors: ['rgba(235,211,101,0)', 'rgb(139,93,0)'],
        locations: [0.55, 0.98],
        start: { x: 0.5, y: 0 },
        end: { x: 0.5, y: 1 },
      },
    },
    {
      id: 'mem-4',
      image: '/assets/figma/be35d34a24d15524a9c0126750ae432b82dab795.png',
      title: "Ruhi's Wedding",
      date: '20 June 2026',
      overlayGradient: {
        colors: ['rgba(0,0,0,0)', 'rgba(106,0,35,0.663)', 'rgba(139,0,46,0.87)'],
        locations: [0.33, 0.66, 0.97],
        start: { x: 0.5, y: 0 },
        end: { x: 0.5, y: 1 },
      },
    },
  ],
}

/** Send Wishes — one row of three tiles */
export const HOME_GREETINGS_SECTION: HomeRichSection<HomeGreetingCard> = {
  title: 'Send Wishes',
  subtitle: 'Get ready-to-share greetings for every day and every moment.',
  items: [
    {
      id: 'greet-holi',
      label: 'Happy Holi',
      image: '/assets/figma/2e6ff07eac6f4148a03df5e6ae992fbdd23c2f3e.png',
    },
    {
      id: 'greet-morning',
      label: 'Good Morning',
      image: '/assets/figma/5c958752d2ada746764d0c855c950c6be3b8ad7a.png',
    },
    {
      id: 'greet-birthday',
      label: 'Birthday',
      image: '/assets/greeting-birthday-floral.png',
    },
  ],
}

/** Figma Photos_Section (node 1131:118056) — bento grid + video tile + “+N Photos” */
export const HOME_PHOTOS_SECTION: HomeRichSection<HomePhotoTile> = {
  title: 'Photos',
  subtitle: 'Your photos safe with us',
  items: [
    { id: 'ph-hero', src: '/assets/figma/b69e1f2044286b5156fd1d8b21a96c5656bdbd30.png' },
    { id: 'ph-top-right', src: '/assets/figma/ba5499929917b59556aca9b4ac04748a9d601413.png' },
    {
      id: 'ph-mid-right',
      src: '/assets/figma/2f1009afcdf759e231a041ad0daafab2cff622d0.png',
      videoBadge: { durationLabel: '03:35' },
    },
    { id: 'ph-bot-left', src: '/assets/figma/263f23cec5aa0022aa6b0a0858fd7a55f0cc68b9.png' },
    { id: 'ph-bot-mid', src: '/assets/figma/a4cf20229701efce127d8f1db9b04fa938ab5fa9.png' },
    {
      id: 'ph-bot-more',
      src: '/assets/figma/7e9e56a0b64002229e435b4ad7cbca2ea41af288.png',
      morePhotosOverlay: { count: 216, unitLabel: 'Photos' },
    },
  ],
}

export const HOME_STORAGE_BANNER = { used: 14.2, total: 50 } as const

/** Figma storage promo art (bundled via `assets/home/registry.ts`). */
export const HOME_STORAGE_BANNER_IMAGE = '/assets/figma/storage-promotion-banner.png?v=20260428a' as const
