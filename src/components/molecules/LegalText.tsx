import { StyleSheet, Text } from 'react-native'
import { colors } from '@/theme/colors'
import { useTranslation } from '@/hooks/useTranslation'

export function LegalText() {
  const t = useTranslation()
  return (
    <Text style={styles.base}>
      {t.legal_text}
      <Text style={styles.bold}>{t.legal_tos}</Text>
      {t.legal_and}
      <Text style={styles.bold}>{t.legal_privacy}</Text>
    </Text>
  )
}

const styles = StyleSheet.create({
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
})
