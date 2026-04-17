import { useEffect, useMemo, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { FadeInDown } from 'react-native-reanimated'
import { router, useLocalSearchParams } from 'expo-router'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { AnimatedScreen } from '@/components/motion/AnimatedScreen'
import { PressableScale } from '@/components/motion/PressableScale'
import { JioLogo } from '@/components/molecules/JioLogo'
import { LegalText } from '@/components/molecules/LegalText'
import { OTPInput } from '@/components/molecules/OTPInput'
import { useAuthStore } from '@/store/authStore'
import { useTranslation } from '@/hooks/useTranslation'
import { colors } from '@/theme/colors'
import { motionDuration } from '@/theme/motion'

const OTP_LENGTH = 4
const RESEND_SECS = 29

function usePhoneParam(): string {
  const { phone } = useLocalSearchParams<{ phone?: string | string[] }>()
  return useMemo(() => {
    if (typeof phone === 'string') return phone.replace(/\D/g, '').slice(0, 10)
    if (Array.isArray(phone)) return (phone[0] ?? '').replace(/\D/g, '').slice(0, 10)
    return ''
  }, [phone])
}

export default function OTPScreen() {
  const phone = usePhoneParam()
  const setAuthenticated = useAuthStore((s) => s.setAuthenticated)
  const t = useTranslation()

  useEffect(() => {
    if (!phone) router.replace('/login')
  }, [phone])

  const [otp, setOtp] = useState<string[]>(() => Array(OTP_LENGTH).fill(''))
  const [countdown, setCountdown] = useState(RESEND_SECS)
  const [loading, setLoading] = useState(false)

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
      router.replace('/onboarding')
    }
    void verify()
  }, [otp, loading, setAuthenticated])

  const handleResend = () => {
    setOtp(Array(OTP_LENGTH).fill(''))
    setCountdown(RESEND_SECS)
  }

  const masked =
    phone.length >= 6
      ? `+91 ${phone.slice(0, 3)}XXXXX${phone.slice(-3)}`
      : phone
        ? `+91 ${phone}`
        : '+91 —'

  return (
    <AuthLayout
      footerSlot={
        <View style={styles.footerCol}>
          <LegalText />
          {loading ? (
            <View style={styles.spinnerRow}>
              <ActivityIndicator color={colors.primary600} size="small" accessibilityLabel={t.otp_verifying} />
            </View>
          ) : (
            <Text style={styles.hint}>{t.otp_hint}</Text>
          )}
        </View>
      }
    >
      <AnimatedScreen entering={FadeInDown.duration(motionDuration.normal)} style={styles.block}>
        <View style={styles.topBlock}>
          <JioLogo size="md" />
          <Text style={styles.heading}>{t.otp_heading}</Text>
          <Text style={styles.sent}>
            {t.otp_sent_to}{' '}
            <Text style={styles.sentStrong}>{masked}.</Text>
          </Text>
          <PressableScale
            onPress={() => router.replace('/login')}
            hitSlop={8}
            style={styles.changeBtn}
            layout="auto"
          >
            <Text style={styles.changeLabel}>{t.otp_change}</Text>
          </PressableScale>
        </View>

        <OTPInput length={OTP_LENGTH} value={otp} onChange={setOtp} disabled={loading} countdown={countdown} onResend={handleResend} />
      </AnimatedScreen>
    </AuthLayout>
  )
}

const styles = StyleSheet.create({
  footerCol: {
    gap: 24,
  },
  spinnerRow: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hint: {
    fontSize: 12,
    textAlign: 'center',
    color: colors.contentTertiary,
  },
  block: {
    gap: 28,
    paddingTop: 10,
  },
  topBlock: {
    gap: 20,
  },
  heading: {
    fontSize: 26,
    lineHeight: 30,
    fontWeight: '900',
    color: colors.contentPrimary,
  },
  sent: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.contentPrimary,
  },
  sentStrong: {
    fontWeight: '700',
  },
  changeBtn: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
  },
  changeLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.contentPrimary,
  },
})
