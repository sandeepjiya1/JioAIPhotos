import { useMemo } from 'react'
import { StyleSheet, Text } from 'react-native'
import { useTranslation } from '@/hooks/useTranslation'
import { useThemeColors } from '@/theme/useThemeColors'

export function LegalText() {
  const t = useTranslation()
  const colors = useThemeColors()
  const styles = useMemo(
    () =>
      StyleSheet.create({
        base: {
          fontSize: 14,
          fontWeight: '500',
          lineHeight: 20,
          color: colors.contentSecondary,
        },
        bold: {
          fontWeight: '700',
          color: colors.contentPrimary,
        },
      }),
    [colors],
  )

  return (
    <Text style={styles.base}>
      {t.legal_text}
      <Text style={styles.bold}>{t.legal_tos}</Text>
      {t.legal_and}
      <Text style={styles.bold}>{t.legal_privacy}</Text>
    </Text>
  )
}
