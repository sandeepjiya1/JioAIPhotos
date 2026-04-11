import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AuthLayout } from '@/components/layout'
import { Spinner } from '@/components/atoms'
import { JioLogo, OTPInput, LegalText } from '@/components/molecules'
import { useAuthStore } from '@/store/authStore'
import { useTranslation } from '@/hooks/useTranslation'
import { staggerContainer, fadeUp } from '@/components/layout/PageTransition'

const OTP_LENGTH  = 4
const RESEND_SECS = 29

export function OTPPage() {
  const navigate  = useNavigate()
  const location  = useLocation()
  const phone     = (location.state as { phone?: string })?.phone ?? ''
  const { setAuthenticated } = useAuthStore()
  const t = useTranslation()

  const [otp, setOtp]             = useState<string[]>(Array(OTP_LENGTH).fill(''))
  const [countdown, setCountdown] = useState(RESEND_SECS)
  const [loading, setLoading]     = useState(false)

  useEffect(() => {
    if (countdown <= 0) return
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000)
    return () => clearTimeout(timer)
  }, [countdown])

  useEffect(() => {
    const isComplete = otp.every(Boolean) && otp.length === OTP_LENGTH
    if (!isComplete || loading) return
    const verify = async () => {
      setLoading(true)
      await new Promise((r) => setTimeout(r, 800))
      setAuthenticated(true)
      navigate('/onboarding', { replace: true })
    }
    verify()
  }, [otp, loading, navigate, setAuthenticated])

  const handleResend = () => {
    setOtp(Array(OTP_LENGTH).fill(''))
    setCountdown(RESEND_SECS)
  }

  return (
    <AuthLayout>
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
              className="text-auth-display text-white"
              variants={fadeUp}
            >
              {t.otp_heading}
            </motion.h1>
            <motion.p
              className="text-content-primary text-sm leading-snug"
              variants={fadeUp}
            >
              {t.otp_sent_to}{' '}
              <span className="font-semibold">
                +91 {phone.slice(0, 3)}XXXXX{phone.slice(-3)}.
              </span>
            </motion.p>
            <motion.button
              type="button"
              onClick={() => navigate('/login')}
              className="self-start text-content-primary text-sm font-bold py-1 -ml-0.5 active:opacity-70 transition-opacity"
              variants={fadeUp}
              whileTap={{ scale: 0.95 }}
            >
              {t.otp_change}
            </motion.button>
          </div>
        </div>

        <motion.div variants={fadeUp}>
          <OTPInput
            length={OTP_LENGTH}
            value={otp}
            onChange={setOtp}
            disabled={loading}
            countdown={countdown}
            onResend={handleResend}
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="flex flex-col gap-6"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.3 }}
      >
        <LegalText />
        {loading ? (
          <div className="flex items-center justify-center h-12">
            <Spinner size="md" aria-label={t.otp_verifying} />
          </div>
        ) : (
          <p className="text-content-tertiary text-xs text-center">{t.otp_hint}</p>
        )}
      </motion.div>
    </AuthLayout>
  )
}
