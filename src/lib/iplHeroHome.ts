import { IPL_TEAM_LOGO_PATHS } from '@/lib/iplTeamLogos'

/** Full `IPLTeam_Logos` strip (Figma 488:9286) — left → right, all franchises in design order. */
export const IPL_HOME_LOGO_STRIP = IPL_TEAM_LOGO_PATHS

/** Hero art per logo index; indices 5–8 use MI art until dedicated exports exist. */
export const IPL_HOME_HERO_IMAGES = [
  '/assets/figma/ipl-hero-moment.png',
  '/assets/figma/ipl-hero-gt.png',
  '/assets/figma/ipl-hero-kkr.png',
  '/assets/figma/ipl-hero-rcb.png',
  '/assets/figma/ipl-hero-csk.png',
  '/assets/figma/ipl-hero-moment.png',
  '/assets/figma/ipl-hero-moment.png',
  '/assets/figma/ipl-hero-moment.png',
  '/assets/figma/ipl-hero-moment.png',
] as const

/**
 * Labels aligned to `IPL_HOME_LOGO_STRIP` / Figma order:
 * MI, GT, KKR, RCB, CSK, SRH, DC, RR, LSG.
 */
export const IPL_HOME_TEAM_LABELS = [
  'Mumbai Indians',
  'Gujarat Titans',
  'Kolkata Knight Riders',
  'Royal Challengers Bangalore',
  'Chennai Super Kings',
  'Sunrisers Hyderabad',
  'Delhi Capitals',
  'Rajasthan Royals',
  'Lucknow Super Giants',
] as const

export const IPL_HOME_HERO_ALTS: readonly string[] = [
  'IPL Mumbai Indians themed hero moment',
  'IPL Gujarat Titans themed hero moment',
  'IPL Kolkata Knight Riders themed hero moment',
  'IPL Royal Challengers Bangalore themed hero moment',
  'IPL Chennai Super Kings themed hero moment',
  'IPL Sunrisers Hyderabad themed hero moment',
  'IPL Delhi Capitals themed hero moment',
  'IPL Rajasthan Royals themed hero moment',
  'IPL Lucknow Super Giants themed hero moment',
]
