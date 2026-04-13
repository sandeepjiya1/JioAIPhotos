/**
 * Home screen content — single source of truth for lists and copy.
 * Swap this module for API/CMS data (e.g. React Query) without changing layout components.
 */

export interface HomeStoryRing {
  id: string
  label: string
  image?: string
  isCreate?: boolean
  hasNew?: boolean
}

export interface HomeMemoryCard {
  id: string
  image: string
  title: string
  date: string
}

export interface HomeGreetingCard {
  id: string
  image: string
  /** Wish category label (bottom overlay on grid tiles). */
  label: string
}

export interface HomeTrendingCard {
  id: string
  image: string
  /** Optional crop / framing (e.g. Figma node 488:9345). */
  imageClassName?: string
}

export interface HomePhotoTile {
  id: string
  src: string
  /** When set, shows “+N” overlay (last grid cell). */
  morePhotosOverlay?: { count: number; unitLabel: string }
}

export interface HomeRichSection<T> {
  title: string
  subtitle?: string
  items: readonly T[]
}

export const HOME_SHOW_SECTION_SUBTITLES = false

export const HOME_HEADER = {
  avatarSrc: '/assets/figma/6cd0e6362a73050667423418aae84ecb14f0f736.png',
  avatarFallback: 'U',
} as const

export const HOME_STORY_RINGS: readonly HomeStoryRing[] = [
  { id: 'create', label: 'Create', isCreate: true },
  {
    id: 'birthday',
    label: 'Birthday',
    image: '/assets/figma/973c3b8c0dd37d2ff37f9479e563cabfa2a227de.png',
    hasNew: true,
  },
  {
    id: 'motivation',
    label: 'Motivation',
    image: '/assets/figma/c17c9682e3a8f521d6c87db31a79d22ed5cfb0eb.png',
    hasNew: true,
  },
  {
    id: 'anniversary',
    label: 'Anniversary',
    image: '/assets/figma/5c60231921be44e81e983732d227140b2bc4ab2c.png',
  },
  {
    id: 'love',
    label: 'Love',
    image: '/assets/figma/defd24b0ba2543a683d1c21866cf1b5c65c558aa.png',
  },
  {
    id: 'travel',
    label: 'Travel',
    image: '/assets/figma/939127241329aed177882aa617dc4b47d1e350c2.png',
    hasNew: true,
  },
  {
    id: 'festival',
    label: 'Festival',
    image: '/assets/figma/2e6ff07eac6f4148a03df5e6ae992fbdd23c2f3e.png',
  },
  {
    id: 'family',
    label: 'Family',
    image: '/assets/figma/9c3be8ec82a701547f20afe3432e1123d6e09a4a.png',
  },
  {
    id: 'nature',
    label: 'Nature',
    image: '/assets/figma/657e248134a12fab651ac8e67bed14dc2f5e190a.png',
    hasNew: true,
  },
  {
    id: 'friends',
    label: 'Friends',
    image: '/assets/figma/d0dcd90132612641a0109cc9bb9b63ddd311016b.png',
  },
  {
    id: 'workout',
    label: 'Workout',
    image: '/assets/figma/bb58655a57d80a328c43b89c58da982691332c16.png',
  },
]

/** Figma Memories rail (488:9299), left → right */
export const HOME_MEMORIES_SECTION: HomeRichSection<HomeMemoryCard> = {
  title: 'My Memories',
  subtitle: 'Your photos and videos come together to watch and share anytime.',
  items: [
    {
      id: 'mem-1',
      image: '/assets/figma/939127241329aed177882aa617dc4b47d1e350c2.png',
      title: 'Varanasi\ntrip',
      date: '20 June 2026',
    },
    {
      id: 'mem-2',
      image: '/assets/figma/9c3be8ec82a701547f20afe3432e1123d6e09a4a.png',
      title: "Ruhi's\nB'Day",
      date: '22 June 2026',
    },
    {
      id: 'mem-3',
      image: '/assets/figma/e5ed6df5cb304c15b0443f6e03cd8446e5b2b912.png',
      title: 'Happy\nAnniversary',
      date: '26 June 2026',
    },
  ],
}

/** Send Wishes — 3×2 grid (reference layout), row-major: L→R, top then bottom */
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
      id: 'greet-new-baby',
      label: 'New Baby',
      image: '/assets/figma/9c3be8ec82a701547f20afe3432e1123d6e09a4a.png',
    },
    {
      id: 'greet-anniversary',
      label: 'Anniversary',
      image: '/assets/figma/e5ed6df5cb304c15b0443f6e03cd8446e5b2b912.png',
    },
    {
      id: 'greet-engagement',
      label: 'Engagement',
      image: '/assets/figma/d0dcd90132612641a0109cc9bb9b63ddd311016b.png',
    },
    {
      id: 'greet-sunday',
      label: 'Sunday Wishes',
      image: '/assets/figma/hanumanji-greetings.png',
    },
  ],
}

const TRENDING_MIDDLE_CROP =
  'h-[115.79%] w-[158.61%] max-w-none object-cover -left-[37.04%] -top-[2.9%]'

/**
 * Recent AI creations — placeholder tiles; replace with the user’s latest AI-generated media.
 * (Layout derived from Figma TrendingPhotoLooks_Section 488:9337; middle tile crop → 488:9345.)
 */
export const HOME_TRENDING_SECTION: HomeRichSection<HomeTrendingCard> = {
  title: 'Recent AI Creations',
  items: [
    { id: 'trend-1', image: '/assets/figma/657e248134a12fab651ac8e67bed14dc2f5e190a.png' },
    {
      id: 'trend-2',
      image: '/assets/figma/d0dcd90132612641a0109cc9bb9b63ddd311016b.png',
      imageClassName: TRENDING_MIDDLE_CROP,
    },
    { id: 'trend-3', image: '/assets/figma/bb58655a57d80a328c43b89c58da982691332c16.png' },
  ],
}

/** Figma Photos_Section (488:9353) */
export const HOME_PHOTOS_SECTION: HomeRichSection<HomePhotoTile> = {
  title: 'My Photos',
  subtitle: 'Your photos safe with us',
  items: [
    { id: 'ph-1', src: '/assets/figma/b69e1f2044286b5156fd1d8b21a96c5656bdbd30.png' },
    { id: 'ph-2', src: '/assets/figma/ba5499929917b59556aca9b4ac04748a9d601413.png' },
    { id: 'ph-3', src: '/assets/figma/2f1009afcdf759e231a041ad0daafab2cff622d0.png' },
    { id: 'ph-4', src: '/assets/figma/263f23cec5aa0022aa6b0a0858fd7a55f0cc68b9.png' },
    { id: 'ph-5', src: '/assets/figma/a4cf20229701efce127d8f1db9b04fa938ab5fa9.png' },
    { id: 'ph-6', src: '/assets/figma/5100247fb8aac48ecff86bb2e97b8dbbb989f11d.png' },
    { id: 'ph-7', src: '/assets/figma/be35d34a24d15524a9c0126750ae432b82dab795.png' },
    { id: 'ph-8', src: '/assets/figma/588e358e5eb2165638e4d156e06e5987b2b02be8.png' },
    {
      id: 'ph-9',
      src: '/assets/figma/7e9e56a0b64002229e435b4ad7cbca2ea41af288.png',
      morePhotosOverlay: { count: 216, unitLabel: 'Photos' },
    },
  ],
}

export const HOME_STORAGE_BANNER = { used: 14.2, total: 50 } as const
