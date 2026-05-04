import { useEffect, useMemo } from 'react'
import { Dimensions, Pressable, StyleSheet, Text, useWindowDimensions, View, type ViewStyle } from 'react-native'
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
import { moderateSize } from '@/theme/layoutScale'
import { motionDuration, motionEasing } from '@/theme/motion'

function makeSplashStyles(ww: number) {
  const ms = (n: number) => moderateSize(n, ww)
  return StyleSheet.create({
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
      gap: ms(10),
    },
    pixMark: {
      fontSize: ms(38),
      lineHeight: ms(42),
      fontWeight: '700',
      color: colors.contentPrimary,
      letterSpacing: ms(-0.5),
    },
    dots: {
      position: 'absolute',
      bottom: ms(56),
      flexDirection: 'row',
      gap: ms(6),
    },
    dot: {
      backgroundColor: 'rgba(57,147,199,0.55)',
    },
    devRow: {
      position: 'absolute',
      bottom: ms(24),
      right: ms(16),
    },
    devBtn: {
      paddingVertical: ms(8),
      paddingHorizontal: ms(12),
      borderRadius: ms(8),
      backgroundColor: 'rgba(255,255,255,0.12)',
    },
    devBtnLabel: {
      color: colors.contentSecondary,
      fontSize: ms(12),
      fontWeight: '600',
    },
  })
}

export default function SplashScreen() {
  const reducedMotion = usePrefersReducedMotion()
  const { width: winW } = useWindowDimensions()
  const ww = winW > 0 ? winW : Dimensions.get('window').width
  const styles = useMemo(() => makeSplashStyles(ww), [ww])
  const dotSize = useMemo(() => moderateSize(6, ww), [ww])

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
        <PulsingDot delay={0} size={dotSize} baseStyle={styles.dot} />
        <PulsingDot delay={200} size={dotSize} baseStyle={styles.dot} />
        <PulsingDot delay={400} size={dotSize} baseStyle={styles.dot} />
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

function PulsingDot({
  delay,
  size,
  baseStyle,
}: {
  delay: number
  size: number
  baseStyle: ViewStyle
}) {
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
  const r = size / 2

  return <Animated.View style={[baseStyle, { width: size, height: size, borderRadius: r }, dotStyle]} />
}
