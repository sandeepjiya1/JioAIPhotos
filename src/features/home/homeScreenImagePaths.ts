import {
  HOME_GREETINGS_SECTION,
  HOME_HEADER,
  HOME_MEMORIES_SECTION,
  HOME_PHOTOS_SECTION,
  HOME_STORAGE_BANNER_IMAGE,
} from '@/features/home/homeContent'
import { getHomeIplImageWebPaths } from '@/features/home/HomeIplRail'

function basenameKey(webPath: string): string {
  const noQuery = webPath.split('?')[0] ?? webPath
  return noQuery.split('/').pop()?.trim() ?? webPath
}

/** Distinct bundled home images (registry filename), for decode prefetch. */
export function getHomeScreenImageWebPaths(): string[] {
  const seen = new Set<string>()
  const out: string[] = []

  const add = (p: string | undefined) => {
    if (!p) return
    const k = basenameKey(p)
    if (seen.has(k)) return
    seen.add(k)
    out.push(p)
  }

  add(HOME_HEADER.avatarSrc)
  add(HOME_STORAGE_BANNER_IMAGE)
  for (const m of HOME_MEMORIES_SECTION.items) add(m.image)
  for (const g of HOME_GREETINGS_SECTION.items) add(g.image)
  for (const ph of HOME_PHOTOS_SECTION.items) add(ph.src)
  for (const p of getHomeIplImageWebPaths()) add(p)

  return out
}
