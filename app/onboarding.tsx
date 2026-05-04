import { useCallback, useEffect, useMemo, useState } from 'react'
import { Dimensions, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  FadeIn,
  FadeInLeft,
  FadeInRight,
  FadeInUp,
  FadeOut,
  FadeOutLeft,
  FadeOutRight,
  runOnJS,
} from 'react-native-reanimated'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Button } from '@/components/atoms/Button'
import { ChevronRight } from '@/components/molecules/ChevronRight'
import { ProgressDots } from '@/components/molecules/ProgressDots'
import { OnboardingArtBounceWrap } from '@/components/onboarding/OnboardingArtBounceWrap'
import { OnboardingSlideArt } from '@/components/onboarding/OnboardingSlideArt'
import { PressableScale } from '@/components/motion/PressableScale'
import { replaceToPermissionIntro } from '@/lib/authNavigation'
import { useAuthStore } from '@/store/authStore'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { useTranslation } from '@/hooks/useTranslation'
import { colors } from '@/theme/colors'
import { moderateSize } from '@/theme/layoutScale'
import { motionDuration, motionEasing } from '@/theme/motion'

type OnboardingArtDir = 'init' | 'forward' | 'backward'

function makeOnboardingStyles(ww: number) {
  const ms = (n: number) => moderateSize(n, ww)
  return StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: colors.surface0,
      minHeight: 0,
    },
    skipWrap: {
      position: 'absolute',
      left: 0,
      right: 0,
      zIndex: 10,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      paddingRight: ms(20),
    },
    skip: {
      minHeight: ms(44),
      paddingVertical: ms(8),
      paddingLeft: ms(12),
    },
    skipInner: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: ms(4),
    },
    skipText: {
      fontSize: ms(14),
      fontWeight: '700',
      color: colors.contentPrimary,
    },
    artArea: {
      flex: 1,
      minHeight: 0,
      marginTop: ms(56),
      overflow: 'visible',
    },
    footer: {
      paddingHorizontal: ms(24),
      paddingTop: ms(16),
      gap: ms(16),
    },
    copyBlock: {
      alignItems: 'center',
      gap: ms(8),
    },
    dotsWrap: {
      alignItems: 'center',
    },
    title: {
      textAlign: 'center',
      fontSize: ms(22),
      lineHeight: ms(28),
      fontWeight: '900',
      color: colors.contentPrimary,
    },
    subtitle: {
      textAlign: 'center',
      fontSize: ms(14),
      lineHeight: ms(20),
      color: colors.contentSecondary,
      maxWidth: Math.min(ms(360), ww - ms(24)),
    },
    buttonWrap: {
      paddingTop: ms(8),
    },
  })
}

export default function OnboardingScreen() {
  const { width: winW } = useWindowDimensions()
  const ww = winW > 0 ? winW : Dimensions.get('window').width
  const styles = useMemo(() => makeOnboardingStyles(ww), [ww])
  const swipeX = useMemo(() => moderateSize(52, ww), [ww])
  const panActive = useMemo(() => moderateSize(32, ww), [ww])
  const skipHitSlop = useMemo(() => moderateSize(12, ww), [ww])
  const chevronSz = useMemo(() => moderateSize(16, ww), [ww])
  const footerPadBottom = useMemo(() => moderateSize(20, ww), [ww])

  const insets = useSafeAreaInsets()
  const reducedMotion = usePrefersReducedMotion()
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const setHasSeenOnboarding = useAuthStore((s) => s.setHasSeenOnboarding)
  const t = useTranslation()
  const [current, setCurrent] = useState(0)
  const [artDir, setArtDir] = useState<OnboardingArtDir>('init')

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/login')
    }
  }, [isAuthenticated])
  const slides = t.onboarding_slides
  const slide = slides[current]!

  const artEntering = useMemo(() => {
    if (reducedMotion) return FadeIn.duration(motionDuration.fast)
    if (artDir === 'init') {
      return FadeInUp.duration(440).easing(motionEasing.outCubic)
    }
    if (artDir === 'forward') {
      return FadeInRight.duration(400).easing(motionEasing.outCubic)
    }
    return FadeInLeft.duration(400).easing(motionEasing.outCubic)
  }, [reducedMotion, artDir])

  const artExiting = useMemo(() => {
    if (reducedMotion) return undefined
    if (artDir === 'forward') return FadeOutLeft.duration(280).easing(motionEasing.outCubic)
    if (artDir === 'backward') return FadeOutRight.duration(280).easing(motionEasing.outCubic)
    return FadeOut.duration(220).easing(motionEasing.outCubic)
  }, [reducedMotion, artDir])
  const copyEntering = useMemo(
    () =>
      reducedMotion
        ? FadeIn.duration(motionDuration.normal)
        : FadeIn.duration(360).delay(50).springify(),
    [reducedMotion],
  )

  const finish = useCallback(() => {
    setHasSeenOnboarding(true)
    replaceToPermissionIntro()
  }, [setHasSeenOnboarding])

  const goNext = useCallback(() => {
    if (current < slides.length - 1) {
      setArtDir('forward')
      setCurrent((c) => c + 1)
    } else {
      void finish()
    }
  }, [current, finish, slides.length])

  const goPrev = useCallback(() => {
    if (current > 0) {
      setArtDir('backward')
      setCurrent((c) => c - 1)
    }
  }, [current])

  const onDotPress = useCallback(
    (index: number) => {
      if (index === current) return
      setArtDir(index > current ? 'forward' : 'backward')
      setCurrent(index)
    },
    [current],
  )

  const pan = useMemo(
    () =>
      Gesture.Pan()
        .activeOffsetX([-panActive, panActive])
        .onEnd((e) => {
          if (e.translationX < -swipeX) runOnJS(goNext)()
          else if (e.translationX > swipeX) runOnJS(goPrev)()
        }),
    [goNext, goPrev, panActive, swipeX],
  )

  return (
    <View style={styles.root}>
      <StatusBar style="light" />

      <View style={[styles.skipWrap, { top: Math.max(insets.top, moderateSize(8, ww)) }]}>
        <PressableScale
          onPress={() => void finish()}
          hitSlop={skipHitSlop}
          style={styles.skip}
          accessibilityRole="button"
          accessibilityLabel="Skip onboarding"
          layout="auto"
        >
          <View style={styles.skipInner}>
            <Text style={styles.skipText}>{t.onboarding_skip}</Text>
            <ChevronRight size={chevronSz} color={colors.contentPrimary} />
          </View>
        </PressableScale>
      </View>

      <GestureDetector gesture={pan}>
        <Animated.View
          key={`art-${current}`}
          entering={artEntering}
          exiting={artExiting}
          style={styles.artArea}
        >
          <OnboardingArtBounceWrap>
            <OnboardingSlideArt index={current} />
          </OnboardingArtBounceWrap>
        </Animated.View>
      </GestureDetector>

      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, footerPadBottom) }]}>
        <Animated.View
          key={`copy-${current}`}
          entering={copyEntering}
          exiting={reducedMotion ? undefined : FadeOut.duration(180)}
          style={styles.copyBlock}
        >
          <Text style={styles.title}>{slide.title}</Text>
          <Text style={styles.subtitle}>{slide.subtitle}</Text>
        </Animated.View>

        <Animated.View
          key={`dots-${current}`}
          entering={
            reducedMotion ? FadeIn.duration(motionDuration.fast) : FadeIn.duration(240).delay(80)
          }
          style={styles.dotsWrap}
        >
          <ProgressDots total={slides.length} current={current} onDotPress={onDotPress} />
        </Animated.View>

        <View style={styles.buttonWrap} accessibilityRole="none">
          <Button
            variant="primary"
            size="pill"
            fullWidth
            onPress={goNext}
            accessibilityLabel={
              current < slides.length - 1 ? t.onboarding_next_slide_aria : t.onboarding_finish_aria
            }
          >
            {t.onboarding_next}
          </Button>
        </View>
      </View>
    </View>
  )
}

