import { getHomeIplLegacyImageWebPaths, HomeIplRailLegacy } from '@/features/home/HomeIplRailLegacy'
import { getHomeIplOption1ImageWebPaths, HomeIplRailOption1 } from '@/features/home/HomeIplRailOption1'
import { useHomePreferencesStore } from '@/store/homePreferencesStore'

export interface HomeIplRailProps {
  selectedIndex: number
  onSelectTeam: (i: number) => void
}

/** Merged prefetch paths for whichever hero variant is available. */
export function getHomeIplImageWebPaths(): readonly string[] {
  const seen = new Set<string>()
  const out: string[] = []
  const add = (paths: readonly string[]) => {
    for (const p of paths) {
      const key = (p.split('?')[0] ?? p).split('/').pop()?.trim() ?? p
      if (seen.has(key)) continue
      seen.add(key)
      out.push(p)
    }
  }
  add(getHomeIplLegacyImageWebPaths())
  add(getHomeIplOption1ImageWebPaths())
  return out
}

export function HomeIplRail(props: HomeIplRailProps) {
  const variant = useHomePreferencesStore((s) => s.homeHeroVariant)
  if (variant === 'option1') {
    return <HomeIplRailOption1 />
  }
  return <HomeIplRailLegacy {...props} />
}
