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

/** Portrait video memory — home rail shows play only (Figma Journeys `1305:22378`). */
export interface HomeMemoryVideoCard {
  kind: 'memory-video'
  id: string
  image: string
  title: string
  date: string
  /** Bottom tint on full-screen / list layouts */
  overlayGradient: HomeMemoryOverlayGradient
}

/** Backup CTA tile in the memories rail — art from Figma `1573:17958`. */
export interface HomeMemoryBackupCtaCard {
  kind: 'memory-backup-cta'
  id: string
  title: string
  ctaLabel: string
  /** Decorative background (full-bleed under content). */
  frameImage: string
  /** Center hero thumb (`Slot/size14/Image` in Figma). */
  thumbImage: string
}

export type HomeMemoriesSectionItem = HomeMemoryVideoCard | HomeMemoryBackupCtaCard

/** @deprecated Alias — use `HomeMemoryVideoCard`. */
export type HomeMemoryCard = HomeMemoryVideoCard

export interface HomeGreetingCard {
  id: string
  image: string
  /** Wish category label (bottom overlay on grid tiles). */
  label: string
}

/** Figma Journeys `1437:25272` — Trending horizontal rail tile */
export interface HomeTrendingTile {
  id: string
  image: string
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

export interface HomeIplThemeBannerLayer {
  id: string
  webPath: string
  left: string
  width: string
  height: string
  top: string
  zIndex: number
}

/** Pixel size of `ipl-theme-banner-header.png` — banner height should be `windowWidth × (height/width)` so the art is full-bleed width without horizontal crop. */
export const HOME_IPL_THEME_BANNER_PIXEL_SIZE = { width: 1024, height: 193 } as const

/** IPL theme strip above AI Avatars rail — dark: `ipl-theme-banner-header.png` (1024×193). */
export const HOME_IPL_THEME_BANNER = {
  layers: [
    {
      id: 'ipl-banner-full',
      webPath: '/assets/home/ipl-theme-banner-header.png?v=20260502b',
      left: '0%',
      width: '100%',
      height: '100%',
      top: '0%',
      zIndex: 0,
    },
  ],
} as const satisfies { layers: readonly HomeIplThemeBannerLayer[] }

/** Light mode — `Theme_Header_IPL_Lightmode` / 1024×193 (same aspect as dark). */
export const HOME_IPL_THEME_BANNER_LIGHT = {
  layers: [
    {
      id: 'ipl-banner-full',
      webPath: '/assets/home/ipl-theme-banner-header-light.png?v=20260502d',
      left: '0%',
      width: '100%',
      height: '100%',
      top: '0%',
      zIndex: 0,
    },
  ],
} as const satisfies { layers: readonly HomeIplThemeBannerLayer[] }

export const HOME_HEADER = {
  avatarSrc: '/assets/figma/6cd0e6362a73050667423418aae84ecb14f0f736.png',
  avatarFallback: 'U',
} as const

/** Figma Journeys Memories_Section (`1305:22378`) — 158×281 @ 360, 10px gap, 12px radius; two video tiles + backup CTA. */
export const HOME_MEMORIES_SECTION: HomeRichSection<HomeMemoriesSectionItem> = {
  title: 'Memories',
  subtitle: 'Your photos and videos come together to watch and share anytime.',
  items: [
    {
      kind: 'memory-video',
      id: 'mem-1',
      image: '/assets/figma/e5b5044012be637aada2b15e130f343123f94800.png',
      title: 'Jaipur trip',
      date: '20 June 2026',
      overlayGradient: {
        colors: ['rgba(235,101,104,0)', 'rgba(156,18,21,0.82)', 'rgb(139,0,2)'],
        locations: [0.245, 0.865, 1],
        start: { x: 0.5, y: 0 },
        end: { x: 0.5, y: 1 },
      },
    },
    {
      kind: 'memory-video',
      id: 'mem-2',
      image: '/assets/figma/f88b2b8b93d22abe86755de6a30de5e084faaff5.png',
      title: 'Celebrations',
      date: '26 June 2026',
      overlayGradient: {
        colors: ['rgba(6,35,115,0)', 'rgb(6,35,115)'],
        locations: [0.37, 0.96],
        start: { x: 0.5, y: 0 },
        end: { x: 0.5, y: 1 },
      },
    },
    {
      kind: 'memory-backup-cta',
      id: 'mem-backup-cta',
      title: 'Enable backup to start generating your memories',
      ctaLabel: 'Backup now',
      frameImage: '/assets/figma/fd43e8ed4d436012bb3abc60c7f765778e0597e4.png',
      thumbImage: '/assets/figma/70f4b8885c3abe3d2790b8369c8df0e1c3547398.png',
    },
  ],
}

/** Figma Journeys Trending_Section (`1437:25272`) — 102×136 @ 360, 10px gap; art matches frame composites (single hero per tile). */
export const HOME_TRENDING_SECTION: HomeRichSection<HomeTrendingTile> = {
  title: 'Trending',
  items: [
    {
      id: 'trend-dhurandhar',
      label: 'Dhurandhar',
      image: '/assets/figma/657e248134a12fab651ac8e67bed14dc2f5e190a.png',
    },
    {
      id: 'trend-republic-1',
      label: 'Republic Day',
      image: '/assets/figma/bb58655a57d80a328c43b89c58da982691332c16.png',
    },
    {
      id: 'trend-republic-2',
      label: 'Republic Day',
      image: '/assets/figma/d0dcd90132612641a0109cc9bb9b63ddd311016b.png',
    },
    {
      id: 'trend-hanuman',
      label: 'Hanuman Ji',
      image: '/assets/figma/26c7f11d872efe58387ce948fe645eb8f5eb7783.png',
    },
  ],
}

/** Greetings — Figma Journeys `1305:22363` horizontal rail (102×136 @ 360). */
export const HOME_GREETINGS_SECTION: HomeRichSection<HomeGreetingCard> = {
  title: 'Greetings',
  subtitle: 'Get ready-to-share greetings for every day and every moment.',
  items: [
    {
      id: 'greet-good-morning',
      label: 'Good Morning',
      image: '/assets/figma/eb20eed3a2990d15241e4c20cd4c42bac53062d3.png',
    },
    {
      id: 'greet-holi',
      label: 'Happy Holi',
      image: '/assets/figma/2e6ff07eac6f4148a03df5e6ae992fbdd23c2f3e.png',
    },
    {
      id: 'greet-hanuman',
      label: 'Hanuman Ji',
      image: '/assets/figma/26c7f11d872efe58387ce948fe645eb8f5eb7783.png',
    },
    {
      id: 'greet-birthday',
      label: 'Happy Birthday',
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

/** Figma Journeys `1305:22464` — storage row + bar + caption (no hero art). */
export const HOME_STORAGE_INDICATOR = {
  used: 2,
  total: 50,
  caption: 'Save up to 10,000 photos and videos',
} as const

/** Figma Journeys `1247:19059` (track) / `1247:19060` (fill). */
export const HOME_STORAGE_PROGRESS_VISUAL = {
  track: '#ebebec',
  fill: 'rgba(40, 139, 193, 1)',
} as const

export interface HomeFamilyHubMember {
  id: string
  name: string
  image: string
}

/** Figma Journeys `1305:22445` — Family Hub rail + `Storage_Indicator` below. */
export const HOME_FAMILY_HUB_SECTION = {
  title: 'Family Hub',
  subtitle: 'Add up to 4 members & unlock 200GB',
  members: [
    {
      id: 'fh-seema',
      name: 'Seema',
      /** Bundled `assets/home/family-hub-avatar-seema.png` — run `npm run figma:family-hub-avatar` to re-fetch from Figma. */
      image: '/assets/home/family-hub-avatar-seema.png?v=20260502b',
    },
  ],
} as const satisfies {
  title: string
  subtitle: string
  members: readonly HomeFamilyHubMember[]
}

/** Figma Journeys `1305:22633` — CricketTheme_Footer (stadium art @ 20% + headline + line-art). */
export const HOME_CRICKET_THEME_FOOTER = {
  line1: 'With Love',
  line2: 'From Jio',
  /** Stadium / pitch decorative art (Figma export `5294009c…`). */
  backgroundArt: '/assets/figma/5294009c1233bb4e55e46c6da41f71a9264d0e70.png?v=20260501a',
  /** Figma `1305:22637` Layer_1 — dark canvas; rasterized from SVG for RN. */
  playersArtDark: '/assets/home/cricket-theme-footer-players.png?v=20260502c',
  /** Figma `1395:17608` Layer_1 — light canvas (SVG `3e4713e4…` → PNG). */
  playersArtLight: '/assets/home/cricket-theme-footer-players-light.png?v=20260502c',
} as const
