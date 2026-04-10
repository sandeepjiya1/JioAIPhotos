import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AuthLayout } from '@/components/layout'
import { Button } from '@/components/atoms'
import { JioLogo, PhoneInput, LegalText } from '@/components/molecules'
import { useAuthStore } from '@/store/authStore'
import { useTranslation } from '@/hooks/useTranslation'
import { staggerContainer, fadeUp, tapScale } from '@/components/layout/PageTransition'

export function LoginPage() {
  const navigate = useNavigate()
  const { setPhone } = useAuthStore()
  const t = useTranslation()
  const [phone, setLocalPhone] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = () => {
    if (phone.length !== 10) { setError(t.login_error); return }
    setPhone(phone)
    navigate('/otp', { state: { phone } })
  }

  return (
    <AuthLayout
      keyboardAwareFooter
      footerSlot={
        <motion.div
          className="flex flex-col gap-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.3 }}
        >
          <LegalText />
          <motion.div whileTap={tapScale}>
            <Button
              variant="primary"
              size="pill"
              fullWidth
              disabled={phone.length !== 10}
              onClick={handleSubmit}
            >
              {t.login_cta}
            </Button>
          </motion.div>
        </motion.div>
      }
    >
      <motion.div
        className="flex flex-col gap-7"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        <div className="flex flex-col gap-5 py-2.5">
          <motion.div variants={fadeUp}>
            <JioLogo size="md" />
          </motion.div>

          <div className="flex flex-col gap-2.5">
            <motion.h1
              className="text-white text-[28px] font-black leading-8"
              variants={fadeUp}
            >
              {t.login_heading}
            </motion.h1>
            <motion.p
              className="text-content-primary text-sm font-normal leading-snug"
              variants={fadeUp}
            >
              {t.login_subtitle}
            </motion.p>
          </div>
        </div>

        <motion.div variants={fadeUp}>
          <PhoneInput
            value={phone}
            onChange={(v) => { setLocalPhone(v); setError('') }}
            error={error}
            autoFocus
          />
        </motion.div>
      </motion.div>
    </AuthLayout>
  )
}
