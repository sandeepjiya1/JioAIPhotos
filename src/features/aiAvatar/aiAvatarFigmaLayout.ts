/** Figma Pod1 category cards use a 160px-wide module (`2385:11001`, `2385:11020`, …). */
export const FIGMA_CATEGORY_CARD_W = 160

/** In-card text inset from card edges (design px, multiply by `aiAvatarCategoryScale`). */
export const CARD_TEXT_INSET_DP = 16

/** Gap between kicker block and subtitle (design px). */
export const CARD_TITLE_SUBTITLE_GAP_DP = 4

/** Space from subtitle block to art / hero content below (design px). */
export const CARD_SUBTITLE_TO_ART_GAP_DP = 14

export function aiAvatarCategoryScale(cardWidth: number): number {
  return cardWidth / FIGMA_CATEGORY_CARD_W
}
