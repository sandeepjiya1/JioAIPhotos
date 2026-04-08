import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/atoms'
import { LanguageCard } from '@/components/molecules'
import { useAuthStore } from '@/store/authStore'
import { useTranslation } from '@/hooks/useTranslation'
import { staggerContainer, fadeUp, fadeIn } from '@/components/layout/PageTransition'

type Lang = 'en' | 'hi'

const imgCollage = '/assets/figma/5231a1f39ecdafc99e093e11726249b642313aab.png'

export function LanguagePage() {
  const navigate = useNavigate()
  const { setLanguage } = useAuthStore()
  const [selected, setSelected] = useState<Lang>('en')
  const t = useTranslation()

  const handleContinue = () => {
    setLanguage(selected)
    navigate('/login')
  }

  return (
    <div className="relative flex flex-col w-full h-dvh bg-surface-0 overflow-hidden">

      {/* Collage image — Figma: container y=199 h=371, img y=-34 h=405 */}
      <motion.div
        className="absolute left-0 right-0 overflow-hidden pointer-events-none"
        style={{ top: 199, height: 371 }}
        variants={fadeIn}
        initial="hidden"
        animate="show"
        aria-hidden="true"
      >
        <img
          src={imgCollage}
          alt="Photo collage preview"
          className="absolute left-0 right-0 w-full object-cover object-center"
          style={{ top: -34, height: 405 }}
        />
      </motion.div>

      {/* Header — Figma: y=71, text at y=81 */}
      <motion.div
        className="absolute left-0 right-0 z-10 px-6"
        style={{ top: 71 }}
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        <div style={{ paddingTop: 10 }} className="flex flex-col gap-2 text-center items-center">
          <motion.h1
            className="text-content-primary text-[28px] font-black leading-[1.15] text-center w-full"
            variants={fadeUp}
          >
            {t.language_headline}
          </motion.h1>
          <motion.p
            className="text-content-secondary text-sm leading-snug text-center w-full"
            variants={fadeUp}
          >
            {t.language_subtitle}
          </motion.p>
        </div>
      </motion.div>

      {/* Bottom sheet — Figma: y=570 h=230 */}
      <motion.div
        className="absolute left-0 right-0 bottom-0 z-20 bg-surface-0 rounded-t-[32px] px-6"
        style={{ height: 230, paddingTop: 12 }}
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
      >
        <motion.p
          className="text-content-primary text-sm font-medium text-left"
          style={{ marginBottom: 16 }}
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          {t.language_choose}
        </motion.p>

        <div
          className="grid grid-cols-2 gap-3"
          role="radiogroup"
          aria-label="Language selection"
          style={{ marginBottom: 16 }}
        >
          <LanguageCard label="English" selected={selected === 'en'} onSelect={() => setSelected('en')} />
          <LanguageCard label="हिन्दी"   selected={selected === 'hi'} onSelect={() => setSelected('hi')} />
        </div>

        <motion.div whileTap={{ scale: 0.98 }}>
          <Button variant="primary" size="pill" fullWidth onClick={handleContinue}>
            {t.language_continue}
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}
