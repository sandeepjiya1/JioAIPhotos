import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ProgressDots } from '@/components/molecules'
import { FlowViewportScreen } from '@/components/layout'
import { useSwipe } from '@/hooks/useSwipe'
import { useAuthStore } from '@/store/authStore'
import { useTranslation } from '@/hooks/useTranslation'
import { useState } from 'react'
import { tapScale } from '@/lib/pageMotion'

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
    <FlowViewportScreen
      className="select-none"
      rootProps={swipeHandlers}
      mainClassName="relative"
      footerClassName="auth-screen-px auth-cta-bottom-pad pt-4"
      main={
        <div className="flex min-h-0 flex-1 flex-col">
          <motion.button
            type="button"
            onClick={finish}
            className="auth-skip-corner flex min-h-11 items-center gap-1 py-2 text-sm font-bold text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Skip onboarding"
          >
            {t.onboarding_skip}
            <ChevronRight className="w-4 h-4" />
          </motion.button>

          <div className="flex min-h-0 w-full flex-1 flex-col justify-end overflow-hidden bg-surface-0">
            <AnimatePresence mode="wait">
              <motion.img
                key={current}
                src={SLIDE_IMAGES[current]}
                alt={slide.title}
                className="max-h-full w-full object-contain object-bottom"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
              />
            </AnimatePresence>
          </div>
        </div>
      }
      footer={
        <div className="flex flex-col justify-between gap-4">
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                className="mb-4 flex flex-col items-center gap-2 text-center"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28 }}
              >
                <h2 className="text-auth-onboarding-title w-full text-center text-content-primary">
                  {slide.title}
                </h2>
                <p className="w-full text-center text-sm leading-snug text-content-secondary">
                  {slide.subtitle}
                </p>
              </motion.div>
            </AnimatePresence>

            <ProgressDots
              total={slides.length}
              current={current}
              onDotPress={setCurrent}
              className="justify-center"
            />
          </div>

          <motion.div
            className="flex items-center gap-3 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <motion.button
              type="button"
              onClick={goNext}
              className="h-12 flex-1 rounded-full border-0 bg-primary-600 text-base font-bold text-white"
              whileTap={tapScale}
            >
              {slide.cta}
            </motion.button>
            <motion.button
              type="button"
              onClick={goNext}
              aria-label="Next slide"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-surface-4 bg-surface-3 text-white"
              whileTap={tapScale}
            >
              <ChevronRight className="h-5 w-5" />
            </motion.button>
          </motion.div>
        </div>
      }
    />
  )
}
