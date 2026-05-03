import { getGreetingDetailImageWebPaths } from '@/features/greetings/greetingDetailContent'
import {
  HOME_CRICKET_THEME_FOOTER,
  HOME_FAMILY_HUB_SECTION,
  HOME_GREETINGS_SECTION,
  HOME_HEADER,
  HOME_IPL_THEME_BANNER,
  HOME_IPL_THEME_BANNER_LIGHT,
  HOME_MEMORIES_SECTION,
  HOME_PHOTOS_SECTION,
  HOME_TRENDING_SECTION,
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
  for (const layer of HOME_IPL_THEME_BANNER.layers) add(layer.webPath)
  for (const layer of HOME_IPL_THEME_BANNER_LIGHT.layers) add(layer.webPath)
  for (const m of HOME_MEMORIES_SECTION.items) {
    if (m.kind === 'memory-video') add(m.image)
    else {
      add(m.frameImage)
      add(m.thumbImage)
    }
  }
  for (const g of HOME_GREETINGS_SECTION.items) add(g.image)
  for (const m of HOME_FAMILY_HUB_SECTION.members) add(m.image)
  add(HOME_CRICKET_THEME_FOOTER.backgroundArt)
  add(HOME_CRICKET_THEME_FOOTER.playersArtDark)
  add(HOME_CRICKET_THEME_FOOTER.playersArtLight)
  for (const t of HOME_TRENDING_SECTION.items) add(t.image)
  for (const ph of HOME_PHOTOS_SECTION.items) add(ph.src)
  for (const p of getHomeIplImageWebPaths()) add(p)
  for (const p of getGreetingDetailImageWebPaths()) add(p)

  return out
}
