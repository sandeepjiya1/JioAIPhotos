/** Framer Motion presets shared across auth + app (kept out of `PageTransition` for fast refresh). */

/** Stagger container — animates children one after another */
export const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

/** Fade + slide up — for individual content blocks */
export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] as const } },
}

/** Hero / collage PNG — same enter as onboarding slides (opacity + settle scale) */
export const imageReveal = {
  hidden: { opacity: 0, scale: 1.04 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] as const },
  },
}

/** Scale on tap — for interactive buttons */
export const tapScale = { scale: 0.96, transition: { duration: 0.1 } }
