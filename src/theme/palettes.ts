/**
 * Colour tokens aligned with **JioAIPhotos — Journeys** (dark / light roles).
 *
 * **Dark default canvas**: `#0C0D10` (`surface0`) — replaces the prior blue canvas (`#001D2E` / `#002a40`).
 * Keep in sync with `expo.web.backgroundColor` in `app.json`.
 */
/** Root / full-screen background in dark mode (design-system default). */
export const DARK_MODE_ROOT_BACKGROUND = '#0C0D10' as const

export const darkPalette = {
  surface0: DARK_MODE_ROOT_BACKGROUND,
  surface2: '#13161C',
  surface3: '#1A1E26',
  surface4: '#21262F',

  primary200: '#9dcae4',
  primary600: '#278bc1',
  primary700: '#1f7aaa',

  jioTeal: '#1cbaba',
  jioTealLight: '#bff8f7',
  jioSplash: '#0078ad',

  contentPrimary: '#ffffff',
  contentSecondary: 'rgba(255,255,255,0.77)',
  contentTertiary: 'rgba(255,255,255,0.45)',

  onBorder: 'rgba(39,139,193,0.4)',

  /** Figma `Light/Red/50` — destructive actions */
  error: '#E30513',
  dangerBg: '#E30513',
  dangerPressed: '#b90410',

  /** Glass / chrome (headers, bottom nav) — keyed to `surface0` RGB (12,13,16). */
  glassTint: 'rgba(12,13,16,0.72)',
  shellUnderlay: 'rgba(12,13,16,0.35)',
  hairlineOnGlass: 'rgba(255,255,255,0.12)',
  navShellBg: 'rgba(12,13,16,0.55)',
  shadowColor: '#000000',

  outlinePressed: 'rgba(255,255,255,0.06)',
  storageTrackBg: 'rgba(255,255,255,0.12)',
  avatarRingBorder: 'rgba(39,139,193,0.45)',

  greetingGradientMid: 'rgba(0,0,0,0.4)',
  greetingGradientEnd: 'rgba(0,0,0,0.88)',

  searchInputBg: 'rgba(255,255,255,0.04)',
  searchInputBorder: 'rgba(39,139,193,0.35)',

  splashCardTint: 'rgba(57,147,199,0.55)',
  languageCardBg: 'rgba(12,13,16,0.18)',

  /** Language hero collage frame (`683:15305`) — depth + bottom vignette to `surface0`. */
  languageHeroDepthGradientEnd: '#001D2E',
  languageHeroVignetteMid: 'rgba(0,0,0,0.616)',

  /**
   * Secondary CTA surface (e.g. language chip selected — Figma `683:15318`).
   * Primary-tinted fill on dark canvas; replaces generic `surface3` for `Button` `secondary`.
   */
  buttonSecondaryBg: 'rgba(39,139,193,0.16)',
  buttonSecondaryBgPressed: 'rgba(39,139,193,0.26)',

  authFooterRule: 'rgba(255,255,255,0.08)',

  /** Neutral track behind primary fill (e.g. home storage bar) */
  neutralTrack: '#ebebec',

  /** Family Hub add-member pill fill (Figma `1305:22279`) — dark blue on canvas */
  familyHubAddCtaBg: '#1A1E26',

  sectionSubtleText: 'rgba(255,255,255,0.45)',

  /** Text on top of photos / video tiles (always light for contrast on imagery). */
  onPhotoHigh: '#ffffff',
  onPhotoMedium: 'rgba(255,255,255,0.92)',
} as const

export const lightPalette = {
  surface0: '#f0f4f8',
  surface2: '#ffffff',
  surface3: '#e8eef4',
  surface4: '#dde6ee',

  primary200: '#7eb3d6',
  primary600: '#1f7aaa',
  primary700: '#196394',

  jioTeal: '#159393',
  jioTealLight: '#0d4d4d',
  jioSplash: '#0078ad',

  contentPrimary: '#0a1f2e',
  contentSecondary: 'rgba(10,31,46,0.72)',
  contentTertiary: 'rgba(10,31,46,0.48)',

  onBorder: 'rgba(31,122,170,0.35)',

  error: '#E30513',
  dangerBg: '#E30513',
  dangerPressed: '#b90410',

  glassTint: 'rgba(255,255,255,0.82)',
  shellUnderlay: 'rgba(255,255,255,0.94)',
  hairlineOnGlass: 'rgba(10,31,46,0.1)',
  navShellBg: 'rgba(248,250,252,0.92)',
  shadowColor: 'rgba(10,31,46,0.12)',

  outlinePressed: 'rgba(10,31,46,0.06)',
  storageTrackBg: 'rgba(10,31,46,0.1)',
  avatarRingBorder: 'rgba(31,122,170,0.4)',

  greetingGradientMid: 'rgba(0,0,0,0.22)',
  greetingGradientEnd: 'rgba(0,0,0,0.62)',

  searchInputBg: 'rgba(10,31,46,0.04)',
  searchInputBorder: 'rgba(31,122,170,0.32)',

  splashCardTint: 'rgba(57,147,199,0.35)',
  languageCardBg: 'rgba(31,122,170,0.1)',

  languageHeroDepthGradientEnd: '#D4E3EF',
  languageHeroVignetteMid: 'rgba(10,31,46,0.14)',

  /** Secondary CTA surface — Figma `683:15318` (light). */
  buttonSecondaryBg: '#E8EEF4',
  buttonSecondaryBgPressed: '#DDE6EE',

  authFooterRule: 'rgba(10,31,46,0.08)',

  neutralTrack: 'rgba(10,31,46,0.12)',

  /** Family Hub add-member pill — Figma `1395:17588` / `1395:17589` (`colour/surface` → `#e7e9ff` on light canvas) */
  familyHubAddCtaBg: '#e7e9ff',

  sectionSubtleText: 'rgba(10,31,46,0.48)',

  onPhotoHigh: '#ffffff',
  onPhotoMedium: 'rgba(255,255,255,0.92)',
} as const

/** Active palette shape (dark default; light mode uses the same token roles). */
export type AppThemeColors = typeof darkPalette | typeof lightPalette

export function getPalette(appearance: 'dark' | 'light'): AppThemeColors {
  return appearance === 'light' ? lightPalette : darkPalette
}
