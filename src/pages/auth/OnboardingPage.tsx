import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ProgressDots } from '@/components/molecules'
import { useSwipe } from '@/hooks/useSwipe'
import { useAuthStore } from '@/store/authStore'
import { useTranslation } from '@/hooks/useTranslation'
import { useState } from 'react'
import { tapScale } from '@/components/layout/PageTransition'

function ChevronRight({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18l6-6-6-6" />
    </svg>
  )
}

const SLIDE_IMAGES = [
  '/assets/figma/onboarding-slide-1.png',
  '/assets/figma/onboarding-slide-2.png',
  '/assets/figma/onboarding-slide-3.png',
]

export function OnboardingPage() {
  const navigate = useNavigate()
  const { setHasSeenOnboarding } = useAuthStore()
  const t = useTranslation()
  const [current, setCurrent] = useState(0)

  // 3 slides (4th "Get more storage" is hidden per product decision)
  const slides = t.onboarding_slides

  const finish = () => {
    setHasSeenOnboarding(true)
    navigate('/permission/gallery', { replace: true })
  }

  const goNext = () => {
    if (current < slides.length - 1) setCurrent((c) => c + 1)
    else finish()
  }

  const goPrev = () => {
    if (current > 0) setCurrent((c) => c - 1)
  }

  const swipeHandlers = useSwipe({ onSwipeLeft: goNext, onSwipeRight: goPrev })
  const slide = slides[current]

  return (
    <div
      className="relative flex flex-col w-full h-dvh bg-surface-0 overflow-hidden select-none"
      {...swipeHandlers}
    >
      {/* Skip */}
      <motion.button
        type="button"
        onClick={finish}
        className="absolute z-20 flex items-center gap-1 text-white text-sm font-bold"
        style={{ top: 56, right: 24, height: 32 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Skip onboarding"
      >
        {t.onboarding_skip}
        <ChevronRight className="w-4 h-4" />
      </motion.button>

      {/* PNGs ship with solid black; screen-blend maps black → surface-0 underneath */}
      <div
        className="flex-shrink-0 w-full overflow-hidden bg-surface-0"
        style={{ flex: '1 1 0', minHeight: 0 }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={SLIDE_IMAGES[current]}
            alt={slide.title}
            className="w-full h-full object-contain object-top mix-blend-screen"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          />
        </AnimatePresence>
      </div>

      {/* Content panel */}
      <div
        className="flex-shrink-0 flex flex-col px-6"
        style={{ paddingTop: 16, paddingBottom: 40 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="flex flex-col gap-2 mb-4 text-center items-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28 }}
          >
            <h2 className="text-content-primary text-[26px] font-black leading-[1.2] text-center w-full">
              {slide.title}
            </h2>
            <p className="text-content-secondary text-sm leading-snug text-center w-full">
              {slide.subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        <ProgressDots total={slides.length} current={current} onDotPress={setCurrent} className="justify-center mb-6" />

        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <motion.button
            type="button"
            onClick={goNext}
            className="flex-1 h-12 rounded-full bg-primary-600 text-white font-bold text-base border-0"
            whileTap={tapScale}
          >
            {slide.cta}
          </motion.button>
          <motion.button
            type="button"
            onClick={goNext}
            aria-label="Next slide"
            className="w-12 h-12 rounded-full bg-surface-3 flex items-center justify-center shrink-0 border border-surface-4 text-white"
            whileTap={tapScale}
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}
