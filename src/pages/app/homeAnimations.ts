import type { Variants } from 'framer-motion'

/** Shared easing — matches PageTransition / auth screens */
export const HOME_EASE = [0.4, 0, 0.2, 1] as const

export const homeStoryStagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.055, delayChildren: 0.05 },
  },
}

export const homeStoryItem: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.94 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.36, ease: HOME_EASE },
  },
}

export const homeCardStagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
}

export const homeCardItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease: HOME_EASE },
  },
}

export const homePhotoTile: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.32, ease: HOME_EASE },
  },
}
