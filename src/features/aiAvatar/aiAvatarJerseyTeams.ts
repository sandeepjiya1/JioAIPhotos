/**
 * Pod1 Cricket Jerseys flow — team tiles use the same bundled hero art as home IPL (`ipl-home-hero-*.png`).
 * Figma context: `2385:10384` (screen) builds on assets already used in `2385:11020` jersey stack.
 */
export type AiAvatarJerseyTeamId =
  | 'mi'
  | 'gt'
  | 'kkr'
  | 'rcb'
  | 'csk'
  | 'srh'
  | 'dc'
  | 'rr'
  | 'lsg'

export type AiAvatarJerseyTeamRow = {
  id: AiAvatarJerseyTeamId
  label: string
  /** Bundled `assets/home` registry path */
  imageWebPath: string
}

const Q = '?v=20260502'

export const AI_AVATAR_JERSEY_TEAMS: readonly AiAvatarJerseyTeamRow[] = [
  { id: 'mi', label: 'Mumbai Indians', imageWebPath: `/assets/home/ipl-home-hero-mi.png${Q}` },
  { id: 'gt', label: 'Gujarat Titans', imageWebPath: `/assets/home/ipl-home-hero-gt.png${Q}` },
  { id: 'kkr', label: 'Kolkata Knight Riders', imageWebPath: `/assets/home/ipl-home-hero-kkr.png${Q}` },
  { id: 'rcb', label: 'Royal Challengers Bangalore', imageWebPath: `/assets/home/ipl-home-hero-rcb.png${Q}` },
  { id: 'csk', label: 'Chennai Super Kings', imageWebPath: `/assets/home/ipl-home-hero-csk.png${Q}` },
  { id: 'srh', label: 'Sunrisers Hyderabad', imageWebPath: `/assets/home/ipl-home-hero-srh.png${Q}` },
  { id: 'dc', label: 'Delhi Capitals', imageWebPath: `/assets/home/ipl-home-hero-dc.png${Q}` },
  { id: 'rr', label: 'Rajasthan Royals', imageWebPath: `/assets/home/ipl-home-hero-rr.png${Q}` },
  { id: 'lsg', label: 'Lucknow Super Giants', imageWebPath: `/assets/home/ipl-home-hero-lsg.png${Q}` },
] as const
