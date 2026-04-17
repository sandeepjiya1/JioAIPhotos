import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FadeInDown } from 'react-native-reanimated'
import { router } from 'expo-router'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Button } from '@/components/atoms/Button'
import { AnimatedScreen } from '@/components/motion/AnimatedScreen'
import { JioLogo } from '@/components/molecules/JioLogo'
import { LegalText } from '@/components/molecules/LegalText'
import { PhoneInput } from '@/components/molecules/PhoneInput'
import { useAuthStore } from '@/store/authStore'
import { useTranslation } from '@/hooks/useTranslation'
import { colors } from '@/theme/colors'
import { motionDuration } from '@/theme/motion'

export default function LoginScreen() {
  const setPhone = useAuthStore((s) => s.setPhone)
  const t = useTranslation()
  const [phone, setLocalPhone] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = () => {
    if (phone.length !== 10) {
      setError(t.login_error)
      return
    }
    setPhone(phone)
    router.push({ pathname: '/otp', params: { phone } })
  }

  return (
    <AuthLayout
      keyboardAwareFooter
      footerSlot={
        <View style={styles.footerCol}>
          <LegalText />
          <Button variant="primary" size="pill" fullWidth disabled={phone.length !== 10} onPress={handleSubmit}>
            {t.login_cta}
          </Button>
        </View>
      }
    >
      <AnimatedScreen entering={FadeInDown.duration(motionDuration.normal)} style={styles.block}>
        <View style={styles.topBlock}>
          <JioLogo size="md" />
          <Text style={styles.heading}>{t.login_heading}</Text>
          <Text style={styles.sub}>{t.login_subtitle}</Text>
        </View>

        <PhoneInput value={phone} onChange={(v) => { setLocalPhone(v); setError('') }} error={error} autoFocus />
      </AnimatedScreen>
    </AuthLayout>
  )
}

const styles = StyleSheet.create({
  footerCol: {
    gap: 24,
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
  sub: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    color: colors.contentSecondary,
  },
})
