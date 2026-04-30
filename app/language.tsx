import { useMemo, useState } from 'react'
import type { ImageSourcePropType } from 'react-native'
import { Image, StyleSheet, Text, View } from 'react-native'
import { FadeInDown } from 'react-native-reanimated'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import { Button } from '@/components/atoms/Button'
import { LanguageFlowLayout } from '@/components/layout/LanguageFlowLayout'
import { AnimatedScreen } from '@/components/motion/AnimatedScreen'
import { LanguageCard } from '@/components/molecules/LanguageCard'
import { useAuthStore } from '@/store/authStore'
import type { Locale } from '@/lib/i18n'
import { translations } from '@/lib/i18n'
import type { AppThemeColors } from '@/theme/palettes'
import { motionDuration } from '@/theme/motion'
import { useThemeColors } from '@/theme/useThemeColors'

/**
 * Language hero art (`assets/home/language-collage.png`).
 * Figma: JioAIPhotos — Journeys, node `683:15305` — frame + bottom vignette gradients match Dev export.
 * Regenerate PNG: `FIGMA_ACCESS_TOKEN=… npm run figma:language-hero`, or export from Figma.
 */
const LANGUAGE_HERO = require('../assets/home/language-collage.png') as ImageSourcePropType

function createLanguageStyles(colors: AppThemeColors) {
  return StyleSheet.create({
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
      backgroundColor: colors.surface0,
    },
    artImage: {
      ...StyleSheet.absoluteFillObject,
      width: '100%',
      height: '100%',
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
}

export default function LanguageScreen() {
  const colors = useThemeColors()
  const styles = useMemo(() => createLanguageStyles(colors), [colors])
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
            {/* Figma `683:15305`: linear-gradient(176.892deg, transparent 25.447%, rgb(0,29,46) 71.652%) */}
            <LinearGradient
              pointerEvents="none"
              colors={['rgba(0,0,0,0)', colors.languageHeroDepthGradientEnd]}
              locations={[0.25447, 0.71652]}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.52, y: 1 }}
              style={StyleSheet.absoluteFillObject}
            />
            <Image source={LANGUAGE_HERO} style={styles.artImage} resizeMode="cover" accessibilityIgnoresInvertColors             />
            {/* Figma `683:15305` overlay: linear-gradient(186.674deg, transparent 17.98%, rgba(0,0,0,0.616) 47.37%, rgb(12,13,16) 91.988%) */}
            <LinearGradient
              pointerEvents="none"
              colors={['rgba(0,0,0,0)', colors.languageHeroVignetteMid, colors.surface0]}
              locations={[0.1798, 0.4737, 0.91988]}
              start={{ x: 0.5, y: 0.2 }}
              end={{ x: 0.5, y: 1 }}
              style={StyleSheet.absoluteFillObject}
            />
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
