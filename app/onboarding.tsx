import { useCallback, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { FadeIn, FadeOut, runOnJS } from 'react-native-reanimated'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Button } from '@/components/atoms/Button'
import { ChevronRight } from '@/components/molecules/ChevronRight'
import { ProgressDots } from '@/components/molecules/ProgressDots'
import { OnboardingSlideArt } from '@/components/onboarding/OnboardingSlideArt'
import { useAuthStore } from '@/store/authStore'
import { useTranslation } from '@/hooks/useTranslation'
import { requestMediaLibraryAndNotifications } from '@/lib/nativePermissions'
import { colors } from '@/theme/colors'

const SWIPE_X = 52

export default function OnboardingScreen() {
  const insets = useSafeAreaInsets()
  const setHasSeenOnboarding = useAuthStore((s) => s.setHasSeenOnboarding)
  const t = useTranslation()
  const [current, setCurrent] = useState(0)
  const slides = t.onboarding_slides
  const slide = slides[current]!

  const finish = useCallback(async () => {
    setHasSeenOnboarding(true)
    await requestMediaLibraryAndNotifications()
    router.replace('/home')
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
        <Pressable
          onPress={() => void finish()}
          hitSlop={12}
          style={styles.skip}
          accessibilityRole="button"
          accessibilityLabel="Skip onboarding"
        >
          <Text style={styles.skipText}>{t.onboarding_skip}</Text>
          <ChevronRight size={16} color={colors.contentPrimary} />
        </Pressable>
      </View>

      <GestureDetector gesture={pan}>
        <Animated.View
          key={`art-${current}`}
          entering={FadeIn.duration(380).springify()}
          exiting={FadeOut.duration(200)}
          style={styles.artArea}
        >
          <OnboardingSlideArt index={current} />
        </Animated.View>
      </GestureDetector>

      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 20) }]}>
        <Animated.View
          key={`copy-${current}`}
          entering={FadeIn.duration(360).delay(50).springify()}
          exiting={FadeOut.duration(180)}
          style={styles.copyBlock}
        >
          <Text style={styles.title}>{slide.title}</Text>
          <Text style={styles.subtitle}>{slide.subtitle}</Text>
        </Animated.View>

        <Animated.View
          key={`dots-${current}`}
          entering={FadeIn.duration(240).delay(80)}
          style={styles.dotsWrap}
        >
          <ProgressDots total={slides.length} current={current} onDotPress={setCurrent} />
        </Animated.View>

        <View style={styles.ctaRow}>
          <View style={styles.ctaPrimary}>
            <Button variant="primary" size="pill" fullWidth onPress={goNext}>
              {slide.cta}
            </Button>
          </View>
          <Pressable
            onPress={goNext}
            style={({ pressed }) => [styles.iconCta, pressed && styles.iconCtaPressed]}
            accessibilityRole="button"
            accessibilityLabel="Next slide"
          >
            <ChevronRight size={22} color={colors.contentPrimary} />
          </Pressable>
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    minHeight: 44,
    paddingVertical: 8,
    paddingLeft: 12,
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
  ctaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingTop: 8,
  },
  ctaPrimary: {
    flex: 1,
    minWidth: 0,
  },
  iconCta: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface3,
    borderWidth: 1,
    borderColor: colors.surface4,
  },
  iconCtaPressed: {
    opacity: 0.9,
  },
})
