import { IPL_TEAM_LOGO_PATHS } from '@/lib/iplTeamLogos'

/** First five logos in Figma order: MI, GT, KKR, RCB, CSK — matches interactive hero themes. */
export const IPL_HOME_LOGO_STRIP = IPL_TEAM_LOGO_PATHS.slice(0, 5) as readonly string[]

/** Hero art per logo index in `IPL_HOME_LOGO_STRIP`. */
export const IPL_HOME_HERO_IMAGES = [
  '/assets/figma/ipl-hero-moment.png',
  '/assets/figma/ipl-hero-gt.png',
  '/assets/figma/ipl-hero-kkr.png',
  '/assets/figma/ipl-hero-rcb.png',
  '/assets/figma/ipl-hero-csk.png',
] as const

export const IPL_HOME_TEAM_LABELS = [
  'Mumbai Indians',
  'Gujarat Titans',
  'Kolkata Knight Riders',
  'Royal Challengers Bangalore',
  'Chennai Super Kings',
] as const

export const IPL_HOME_HERO_ALTS: readonly string[] = [
  'IPL Mumbai Indians themed hero moment',
  'IPL Gujarat Titans themed hero moment',
  'IPL Kolkata Knight Riders themed hero moment',
  'IPL Royal Challengers Bangalore themed hero moment',
  'IPL Chennai Super Kings themed hero moment',
]
