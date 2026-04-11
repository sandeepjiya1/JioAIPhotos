import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from '@/hooks/useTranslation'
import { staggerContainer, fadeUp, tapScale } from '@/components/layout/PageTransition'

function BellIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="20" fill="#0078ad" fillOpacity="0.15" />
      <path
        d="M32 14c-7.18 0-13 5.82-13 13v8l-3 4v2h32v-2l-3-4v-8c0-7.18-5.82-13-13-13z"
        stroke="#278bc1" strokeWidth="2.5" fill="none" strokeLinejoin="round"
      />
      <path d="M29 43a3 3 0 006 0" stroke="#278bc1" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="44" cy="20" r="5" fill="#278bc1" />
    </svg>
  )
}

export function NotificationPermissionPage() {
  const navigate = useNavigate()
  const t = useTranslation()
  const [requesting, setRequesting] = useState(false)

  const handleAllow = async () => {
    setRequesting(true)
    try {
      if ('Notification' in window) {
        await Notification.requestPermission()
      }
    } catch {
      // Unsupported or denied — continue
    } finally {
      setRequesting(false)
      navigate('/home', { replace: true })
    }
  }

  const handleSkip = () => navigate('/home', { replace: true })

  return (
    <div className="relative flex h-dvh min-h-0 w-full flex-col overflow-hidden bg-surface-0">
      {/* Background gradient */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 20%, rgba(39,139,193,0.12) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <motion.div
        className="auth-screen-px relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center overflow-y-auto text-center"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={fadeUp} className="mb-8">
          <BellIcon />
        </motion.div>

        <motion.h1
          className="mb-3 text-2xl font-black leading-tight text-content-primary"
          variants={fadeUp}
        >
          {t.notif_perm_title}
        </motion.h1>

        <motion.p
          className="max-w-xs text-sm leading-relaxed text-content-secondary"
          variants={fadeUp}
        >
          {t.notif_perm_subtitle}
        </motion.p>
      </motion.div>

      <motion.div
        className="auth-screen-px auth-cta-bottom-pad relative z-10 mt-auto flex w-full shrink-0 flex-col gap-3 pt-2"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.35 }}
      >
        <motion.button
          type="button"
          onClick={handleAllow}
          disabled={requesting}
          className="w-full h-12 rounded-full bg-primary-600 text-white font-bold text-base disabled:opacity-60 transition-opacity"
          whileTap={tapScale}
        >
          {requesting ? '…' : t.notif_perm_allow}
        </motion.button>
        <motion.button
          type="button"
          onClick={handleSkip}
          className="w-full h-12 rounded-full bg-transparent text-content-secondary font-medium text-sm"
          whileTap={{ scale: 0.97 }}
        >
          {t.notif_perm_skip}
        </motion.button>
      </motion.div>
    </div>
  )
}
