import { useCallback, useMemo, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { FadeIn, FadeOut, runOnJS } from 'react-native-reanimated'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Button } from '@/components/atoms/Button'
import { ChevronRight } from '@/components/molecules/ChevronRight'
import { ProgressDots } from '@/components/molecules/ProgressDots'
import { OnboardingSlideArt } from '@/components/onboarding/OnboardingSlideArt'
import { PressableScale } from '@/components/motion/PressableScale'
import { useAuthStore } from '@/store/authStore'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { useTranslation } from '@/hooks/useTranslation'
import { colors } from '@/theme/colors'
import { motionDuration } from '@/theme/motion'

const SWIPE_X = 52

export default function OnboardingScreen() {
  const insets = useSafeAreaInsets()
  const reducedMotion = usePrefersReducedMotion()
  const setHasSeenOnboarding = useAuthStore((s) => s.setHasSeenOnboarding)
  const t = useTranslation()
  const [current, setCurrent] = useState(0)
  const slides = t.onboarding_slides
  const slide = slides[current]!

  const artEntering = useMemo(
    () => (reducedMotion ? FadeIn.duration(motionDuration.fast) : FadeIn.duration(380).springify()),
    [reducedMotion],
  )
  const copyEntering = useMemo(
    () =>
      reducedMotion
        ? FadeIn.duration(motionDuration.normal)
        : FadeIn.duration(360).delay(50).springify(),
    [reducedMotion],
  )

  const finish = useCallback(() => {
    setHasSeenOnboarding(true)
    router.replace('/permission')
  }, [setHasSeenOnboarding])

  const goNext = useCallback(() => {
    if (current < slides.length - 1) {
      setCurrent((c) => c + 1)
    } else {
      void finish()
    }
  }, [current, finish, slides.length])

  const goPrev = useCallback(() => {
    setCurrent((c) => (c > 0 ? c - 1 : c))
  }, [])

  const pan = Gesture.Pan().onEnd((e) => {
    if (e.translationX < -SWIPE_X) runOnJS(goNext)()
    else if (e.translationX > SWIPE_X) runOnJS(goPrev)()
  })

  return (
    <View style={styles.root}>
      <StatusBar style="light" />

      <View style={[styles.skipWrap, { top: Math.max(insets.top, 8) }]}>
        <PressableScale
          onPress={() => void finish()}
          hitSlop={12}
          style={styles.skip}
          accessibilityRole="button"
          accessibilityLabel="Skip onboarding"
          layout="auto"
        >
          <View style={styles.skipInner}>
            <Text style={styles.skipText}>{t.onboarding_skip}</Text>
            <ChevronRight size={16} color={colors.contentPrimary} />
          </View>
        </PressableScale>
      </View>

      <GestureDetector gesture={pan}>
        <Animated.View
          key={`art-${current}`}
          entering={artEntering}
          exiting={reducedMotion ? undefined : FadeOut.duration(200)}
          style={styles.artArea}
        >
          <OnboardingSlideArt index={current} />
        </Animated.View>
      </GestureDetector>

      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 20) }]}>
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
          <ProgressDots total={slides.length} current={current} onDotPress={setCurrent} />
        </Animated.View>

        <View style={styles.buttonGroup} accessibilityRole="none">
          <View style={styles.buttonGroupItem}>
            <Button
              variant="outline"
              size="pill"
              fullWidth
              onPress={() => void finish()}
              accessibilityLabel={t.onboarding_try_now}
            >
              {t.onboarding_try_now}
            </Button>
          </View>
          <View style={styles.buttonGroupItem}>
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
    </View>
  )
}

const styles = StyleSheet.create({
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
    paddingRight: 20,
  },
  skip: {
    minHeight: 44,
    paddingVertical: 8,
    paddingLeft: 12,
  },
  skipInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  skipText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.contentPrimary,
  },
  artArea: {
    flex: 1,
    minHeight: 0,
    marginTop: 56,
    overflow: 'visible',
  },
  footer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    gap: 16,
  },
  copyBlock: {
    alignItems: 'center',
    gap: 8,
  },
  dotsWrap: {
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '900',
    color: colors.contentPrimary,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20,
    color: colors.contentSecondary,
    maxWidth: 360,
  },
  buttonGroup: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 12,
    paddingTop: 8,
  },
  buttonGroupItem: {
    flex: 1,
    minWidth: 0,
  },
})
