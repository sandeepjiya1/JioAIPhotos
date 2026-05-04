import { useMemo, useState } from 'react'
import { Dimensions, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
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
import { moderateSize } from '@/theme/layoutScale'
import { motionDuration } from '@/theme/motion'

function makeLoginStyles(ww: number) {
  const ms = (n: number) => moderateSize(n, ww)
  return StyleSheet.create({
    footerCol: {
      gap: ms(24),
    },
    block: {
      gap: ms(28),
      paddingTop: ms(10),
    },
    topBlock: {
      gap: ms(20),
    },
    heading: {
      fontSize: ms(26),
      lineHeight: ms(30),
      fontWeight: '900',
      color: colors.contentPrimary,
    },
    sub: {
      fontSize: ms(14),
      lineHeight: ms(20),
      fontWeight: '400',
      color: colors.contentSecondary,
    },
  })
}

export default function LoginScreen() {
  const { width: winW } = useWindowDimensions()
  const ww = winW > 0 ? winW : Dimensions.get('window').width
  const styles = useMemo(() => makeLoginStyles(ww), [ww])

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
