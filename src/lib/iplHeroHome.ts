import { IPL_TEAM_LOGO_PATHS } from '@/lib/iplTeamLogos'

/** Bump when replacing PNGs under `public/assets/figma/` at the same filenames. */
const IPL_FIGMA_Q = '?v=20260415e'

/** Bump when replacing any `ipl-home-hero-*.png` (browser cache). */
const IPL_HOME_HERO_Q = '?v=20260416b'

/** Full `IPLTeam_Logos` strip (Figma 488:9286) — left → right, all franchises in design order. */
export const IPL_HOME_LOGO_STRIP = IPL_TEAM_LOGO_PATHS

/** Hero art per logo index — MI, GT, KKR, RCB, CSK, SRH, DC, RR, LSG (matches `IPL_HOME_TEAM_LABELS`). */
export const IPL_HOME_HERO_IMAGES = [
  `/assets/figma/ipl-home-hero-mi.png${IPL_HOME_HERO_Q}`,
  `/assets/figma/ipl-home-hero-gt.png${IPL_HOME_HERO_Q}`,
  `/assets/figma/ipl-home-hero-kkr.png${IPL_HOME_HERO_Q}`,
  `/assets/figma/ipl-home-hero-rcb.png${IPL_HOME_HERO_Q}`,
  `/assets/figma/ipl-home-hero-csk.png${IPL_HOME_HERO_Q}`,
  `/assets/figma/ipl-home-hero-srh.png${IPL_HOME_HERO_Q}`,
  `/assets/figma/ipl-home-hero-dc.png${IPL_HOME_HERO_Q}`,
  `/assets/figma/ipl-home-hero-rr.png${IPL_HOME_HERO_Q}`,
  `/assets/figma/ipl-home-hero-lsg.png${IPL_HOME_HERO_Q}`,
] as const

/**
 * Side mosaic tiles L→R — Figma node 922:1203. Order: col0 tall, col0 short, col1 short, col1 tall,
 * col3 tall, col3 short, col4 short, col4 tall.
 */
export const IPL_HOME_MOSAIC_IMAGES = [
  `/assets/figma/a5f72a49d75bde15d9e4a3f89d6bf19989eea054.png${IPL_FIGMA_Q}`,
  `/assets/figma/2012fbf78efa3303e2f3adb9142f8fa9201b76cb.png${IPL_FIGMA_Q}`,
  `/assets/figma/dd9dafcd4f007ab414e14b0d50e0c85d91b212b1.png${IPL_FIGMA_Q}`,
  `/assets/figma/643cb9bd550e2b173b4ac8cbf066d44a20666d2c.png${IPL_FIGMA_Q}`,
  `/assets/figma/939728a9ed079e36192530f18f21087ecbdf96f4.png${IPL_FIGMA_Q}`,
  `/assets/figma/ae2cc12cec05ea429c1904d4f9fd9eeea58ed399.png${IPL_FIGMA_Q}`,
  `/assets/figma/0a736c54b6e4462ec7e05213c6f868d3016dff1f.png${IPL_FIGMA_Q}`,
  `/assets/figma/6650638bb8a01c1d6d44c8c5fb71ffb1b3512b57.png${IPL_FIGMA_Q}`,
] as const

export const IPL_HOME_MOSAIC_ALTS: readonly string[] = [
  'IPL theme preview',
  'IPL theme preview',
  'IPL theme preview',
  'IPL theme preview',
  'IPL theme preview',
  'IPL theme preview',
  'IPL theme preview',
  'IPL theme preview',
]

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
