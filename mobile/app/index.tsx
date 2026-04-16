import { useEffect, useMemo } from 'react'
import { Animated, Easing, Pressable, StyleSheet, Text, View } from 'react-native'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import AnimatedRN, { FadeIn } from 'react-native-reanimated'
import { JioLogo } from '@/components/molecules/JioLogo'
import { colors } from '@/theme/colors'

export default function SplashScreen() {
  useEffect(() => {
    const t = setTimeout(() => router.replace('/language'), 2200)
    return () => clearTimeout(t)
  }, [])

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <AnimatedRN.View entering={FadeIn.duration(600)} style={styles.logoWrap}>
        <JioLogo size="splash" />
      </AnimatedRN.View>

      <View style={styles.dots} accessibilityElementsHidden>
        <PulsingDot delay={0} />
        <PulsingDot delay={200} />
        <PulsingDot delay={400} />
      </View>

      {__DEV__ ? (
        <View style={styles.devRow}>
          <Pressable style={styles.devBtn} onPress={() => router.replace('/home')}>
            <Text style={styles.devBtnLabel}>Dev: home</Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  )
}

function PulsingDot({ delay }: { delay: number }) {
  const opacity = useMemo(() => new Animated.Value(0.35), [])

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 600,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.35,
          duration: 600,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    )
    anim.start()
    return () => anim.stop()
  }, [delay, opacity])

  return <Animated.View style={[styles.dot, { opacity }]} />
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface0,
    overflow: 'hidden',
  },
  logoWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dots: {
    position: 'absolute',
    bottom: 56,
    flexDirection: 'row',
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(57,147,199,0.55)',
  },
  devRow: {
    position: 'absolute',
    bottom: 24,
    right: 16,
  },
  devBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  devBtnLabel: {
    color: colors.contentSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
})
