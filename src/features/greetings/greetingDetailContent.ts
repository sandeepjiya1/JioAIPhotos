/**
 * Greeting detail (Figma **Jio AI Cloud — Temp** `839:10412` *Greetings/Detail_Page*).
 * Chip rows, carousel, and thumbnails are static CMS-shaped data; swap for API later.
 */

import { HOME_GREETINGS_SECTION, type HomeGreetingCard } from '@/features/home/homeContent'

/** Two chip rows, four chips each — matches Figma ChipGroup layout. */
export const GREETING_DETAIL_CHIP_ROWS: readonly (readonly string[])[] = [
  ['Birthday', 'Suvichar', 'Good morning', 'Anniversary'],
  ['Weather', 'Independence Day', 'IPL', 'More...'],
] as const

export interface GreetingDetailModel {
  id: string
  /** Tile title from home (e.g. Happy Holi). */
  label: string
  salutation: string
  fromLabel?: string
  /** Large cards in horizontal rail (bundled `assets/home` paths). */
  carouselImages: readonly string[]
  /** Bottom circular thumbnails. */
  thumbnailStrip: readonly string[]
}

const DEFAULT_THUMBS = [
  '/assets/figma/6cd0e6362a73050667423418aae84ecb14f0f736.png',
  '/assets/figma/b69e1f2044286b5156fd1d8b21a96c5656bdbd30.png',
  '/assets/figma/ba5499929917b59556aca9b4ac04748a9d601413.png',
  '/assets/figma/be35d34a24d15524a9c0126750ae432b82dab795.png',
  '/assets/figma/e5ed6df5cb304c15b0443f6e03cd8446e5b2b912.png',
] as const

/** Per-id overrides; missing keys use `defaultDetailFromHomeCard`. */
const DETAIL_OVERRIDES: Partial<
  Record<
    string,
    {
      salutation: string
      fromLabel?: string
      carouselImages: readonly string[]
      thumbnailStrip?: readonly string[]
    }
  >
> = {
  'greet-holi': {
    salutation: 'Dear Guest',
    fromLabel: 'From Sanjiv Tuli',
    carouselImages: [
      '/assets/figma/2e6ff07eac6f4148a03df5e6ae992fbdd23c2f3e.png',
      '/assets/figma/9c3be8ec82a701547f20afe3432e1123d6e09a4a.png',
    ],
    thumbnailStrip: DEFAULT_THUMBS,
  },
  'greet-morning': {
    salutation: 'Dear Guest',
    fromLabel: 'From Jio AI Photos',
    carouselImages: [
      '/assets/figma/5c958752d2ada746764d0c855c950c6be3b8ad7a.png',
      '/assets/figma/b69e1f2044286b5156fd1d8b21a96c5656bdbd30.png',
    ],
    thumbnailStrip: DEFAULT_THUMBS,
  },
  'greet-birthday': {
    salutation: 'Dear Guest',
    fromLabel: 'From Jio AI Photos',
    carouselImages: [
      '/assets/greeting-birthday-floral.png',
      '/assets/figma/dd9dafcd4f007ab414e14b0d50e0c85d91b212b1.png',
    ],
    thumbnailStrip: DEFAULT_THUMBS,
  },
}

function defaultDetailFromHomeCard(card: HomeGreetingCard): Omit<GreetingDetailModel, 'id'> {
  return {
    label: card.label,
    salutation: 'Dear Guest',
    fromLabel: 'From Jio AI Photos',
    carouselImages: [card.image, card.image],
    thumbnailStrip: DEFAULT_THUMBS,
  }
}

export function getGreetingDetailById(id: string): GreetingDetailModel | null {
  const card = HOME_GREETINGS_SECTION.items.find((g) => g.id === id)
  if (!card) return null
  const override = DETAIL_OVERRIDES[id]
  if (override) {
    return {
      id: card.id,
      label: card.label,
      salutation: override.salutation,
      fromLabel: override.fromLabel,
      carouselImages: override.carouselImages,
      thumbnailStrip: override.thumbnailStrip ?? DEFAULT_THUMBS,
    }
  }
  const d = defaultDetailFromHomeCard(card)
  return { id: card.id, ...d }
}

/** Paths for image prefetch (`homeScreenImagePaths`). */
export function getGreetingDetailImageWebPaths(): string[] {
  const seen = new Set<string>()
  const out: string[] = []
  const add = (p: string) => {
    const k = p.split('?')[0]?.split('/').pop()
    if (k && !seen.has(k)) {
      seen.add(k)
      out.push(p)
    }
  }
  for (const id of Object.keys(DETAIL_OVERRIDES)) {
    const o = DETAIL_OVERRIDES[id]
    if (!o) continue
    for (const p of o.carouselImages) add(p)
    for (const p of o.thumbnailStrip ?? DEFAULT_THUMBS) add(p)
  }
  for (const p of DEFAULT_THUMBS) add(p)
  return out
}
