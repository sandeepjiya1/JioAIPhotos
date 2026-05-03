import { useEffect } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import Animated, {
  cancelAnimation,
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated'
import { JioLogo } from '@/components/molecules/JioLogo'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { replaceToHome } from '@/lib/authNavigation'
import { colors } from '@/theme/colors'
import { motionDuration, motionEasing } from '@/theme/motion'

export default function SplashScreen() {
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const t = setTimeout(() => router.replace('/language'), 2200)
    return () => clearTimeout(t)
  }, [])

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <Animated.View
        entering={FadeIn.duration(reducedMotion ? motionDuration.fast : 600)}
        style={styles.logoWrap}
        accessible
        accessibilityLabel="Jio Pix"
      >
        <JioLogo size="splash" accessible={false} />
        <Text style={styles.pixMark} accessible={false}>
          Pix
        </Text>
      </Animated.View>

      <View style={styles.dots} accessibilityElementsHidden>
        <PulsingDot delay={0} />
        <PulsingDot delay={200} />
        <PulsingDot delay={400} />
      </View>

      {__DEV__ ? (
        <View style={styles.devRow}>
          <Pressable style={styles.devBtn} onPress={() => replaceToHome()}>
            <Text style={styles.devBtnLabel}>Dev: home</Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  )
}

function PulsingDot({ delay }: { delay: number }) {
  const reducedMotion = usePrefersReducedMotion()
  const opacity = useSharedValue(0.35)

  useEffect(() => {
    if (reducedMotion) {
      cancelAnimation(opacity)
      opacity.value = 0.65
      return
    }
    opacity.value = 0.35
    opacity.value = withRepeat(
      withSequence(
        withDelay(delay, withTiming(1, { duration: 600, easing: motionEasing.inOutQuad })),
        withTiming(0.35, { duration: 600, easing: motionEasing.inOutQuad }),
      ),
      -1,
      false,
    )
    return () => cancelAnimation(opacity)
  }, [delay, opacity, reducedMotion])

  const dotStyle = useAnimatedStyle(() => ({ opacity: opacity.value }))

  return <Animated.View style={[styles.dot, dotStyle]} />
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  pixMark: {
    fontSize: 38,
    lineHeight: 42,
    fontWeight: '700',
    color: colors.contentPrimary,
    letterSpacing: -0.5,
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
