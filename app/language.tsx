import { useState } from 'react'
import type { ImageSourcePropType } from 'react-native'
import { Image, StyleSheet, Text, View } from 'react-native'
import { FadeInDown } from 'react-native-reanimated'
import { router } from 'expo-router'
import { Button } from '@/components/atoms/Button'
import { LanguageFlowLayout } from '@/components/layout/LanguageFlowLayout'
import { AnimatedScreen } from '@/components/motion/AnimatedScreen'
import { LanguageCard } from '@/components/molecules/LanguageCard'
import { useAuthStore } from '@/store/authStore'
import type { Locale } from '@/lib/i18n'
import { translations } from '@/lib/i18n'
import { colors } from '@/theme/colors'
import { motionDuration } from '@/theme/motion'

/**
 * Language hero art (`assets/home/language-collage.png`).
 * Figma: JioAIPhotos — Journeys, node `683-15305` — same frame as Figma Desktop MCP `get_screenshot` / `get_design_context`.
 * Regenerate: `FIGMA_ACCESS_TOKEN=… npm run figma:language-hero` (see `scripts/fetch-figma-language-hero.mjs`), or export PNG from Figma.
 */
const LANGUAGE_HERO = require('../assets/home/language-collage.png') as ImageSourcePropType

export default function LanguageScreen() {
  const setLanguage = useAuthStore((s) => s.setLanguage)
  const [uiLang, setUiLang] = useState<Locale>(() => useAuthStore.getState().selectedLanguage)

  const pickLang = (lang: Locale) => {
    setUiLang(lang)
    setLanguage(lang)
  }

  const t = translations[uiLang] ?? translations.en

  const handleContinue = () => {
    setLanguage(uiLang)
    router.push('/login')
  }

  return (
    <LanguageFlowLayout
      main={
        <AnimatedScreen entering={FadeInDown.duration(motionDuration.normal)} style={styles.mainCol}>
          <View style={styles.heroText}>
            <Text style={styles.headline}>{t.language_headline}</Text>
            <Text style={styles.subtitle}>{t.language_subtitle}</Text>
          </View>

          <View style={styles.art} accessibilityElementsHidden>
            <Image source={LANGUAGE_HERO} style={styles.artImage} resizeMode="cover" accessibilityIgnoresInvertColors />
            <View style={styles.artScrim} pointerEvents="none" />
          </View>
        </AnimatedScreen>
      }
      footer={
        <View style={styles.footerInner}>
          <Text style={styles.choose}>{t.language_choose}</Text>

          <View style={styles.grid} accessibilityRole="radiogroup" accessibilityLabel={t.language_choose}>
            <View style={styles.gridCell}>
              <LanguageCard label="English" selected={uiLang === 'en'} onSelect={() => pickLang('en')} />
            </View>
            <View style={styles.gridCell}>
              <LanguageCard label="हिन्दी" selected={uiLang === 'hi'} onSelect={() => pickLang('hi')} />
            </View>
          </View>

          <Button variant="primary" size="pill" fullWidth onPress={handleContinue}>
            {t.language_continue}
          </Button>
        </View>
      }
    />
  )
}

const styles = StyleSheet.create({
  mainCol: {
    flex: 1,
    minHeight: 280,
    paddingTop: 8,
  },
  heroText: {
    alignItems: 'center',
    gap: 8,
    paddingBottom: 12,
  },
  headline: {
    textAlign: 'center',
    fontSize: 26,
    lineHeight: 30,
    fontWeight: '900',
    color: colors.contentPrimary,
    maxWidth: 520,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 20,
    color: colors.contentSecondary,
    maxWidth: 520,
  },
  art: {
    flex: 1,
    minHeight: 160,
    marginHorizontal: -8,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: colors.surface2,
  },
  artImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  artScrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,29,46,0.18)',
  },
  footerInner: {
    gap: 16,
  },
  choose: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.contentPrimary,
  },
  grid: {
    flexDirection: 'row',
    gap: 12,
  },
  gridCell: {
    flex: 1,
    minWidth: 0,
  },
})
