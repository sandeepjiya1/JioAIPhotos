import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/atoms'
import { LanguageCard } from '@/components/molecules'
import { useAuthStore } from '@/store/authStore'
import { translations } from '@/lib/i18n'
import { staggerContainer, fadeUp, imageReveal } from '@/components/layout/PageTransition'

const imgCollage = '/assets/figma/5231a1f39ecdafc99e093e11726249b642313aab.png'

type Lang = 'en' | 'hi'

export function LanguagePage() {
  const navigate = useNavigate()
  const setLanguage = useAuthStore((s) => s.setLanguage)

  /** Local preview updates synchronously on tap so copy always matches the card (store + FM quirks). */
  const [uiLang, setUiLang] = useState<Lang>(() => useAuthStore.getState().selectedLanguage)

  const pickLang = (lang: Lang) => {
    setUiLang(lang)
    setLanguage(lang)
  }

  const t = translations[uiLang] ?? translations.en

  const handleContinue = () => {
    setLanguage(uiLang)
    navigate('/login')
  }

  return (
    <div className="flex h-dvh min-h-0 min-h-svh w-full flex-col overflow-hidden bg-surface-0">
      {/* Hero: headline + flexible collage — all flow + flex, no absolute Figma px */}
      <motion.div
        className="relative z-10 flex min-h-0 flex-1 flex-col overflow-hidden"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        <motion.div
          variants={fadeUp}
          className="auth-hero-top-pad auth-screen-px shrink-0 pb-3 sm:pb-4"
        >
          <div className="mx-auto flex w-full max-w-lg flex-col gap-2 text-center">
            <h1 className="text-auth-display text-content-primary">{t.language_headline}</h1>
            <p className="text-sm leading-snug text-content-secondary sm:text-base">
              {t.language_subtitle}
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={imageReveal}
          className="relative min-h-0 w-full flex-1 overflow-hidden"
          aria-hidden="true"
        >
          <img
            src={imgCollage}
            alt=""
            className="h-full w-full object-cover object-center mix-blend-screen"
            draggable={false}
          />
        </motion.div>
      </motion.div>

      {/* No translateY(100%) — % resolves wrong on first mobile paint; sheet stays in flow at bottom */}
      <motion.div
        className="auth-screen-px auth-cta-bottom-pad z-20 flex shrink-0 flex-col rounded-t-[var(--radius-2xl)] bg-surface-0 pt-3"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.08, ease: [0.4, 0, 0.2, 1] as const }}
      >
        <motion.div
          key={uiLang}
          className="flex flex-col gap-4"
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          <p className="text-left text-sm font-medium text-content-primary">{t.language_choose}</p>

          <div
            className="grid grid-cols-2 gap-3"
            role="radiogroup"
            aria-label="Language selection"
          >
            <LanguageCard
              label="English"
              selected={uiLang === 'en'}
              onSelect={() => pickLang('en')}
            />
            <LanguageCard
              label="हिन्दी"
              selected={uiLang === 'hi'}
              onSelect={() => pickLang('hi')}
            />
          </div>

          <motion.div whileTap={{ scale: 0.98 }}>
            <Button variant="primary" size="pill" fullWidth onClick={handleContinue}>
              {t.language_continue}
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
