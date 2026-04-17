import { StyleSheet, Text, TextInput, View } from 'react-native'
import { colors } from '@/theme/colors'
import { useTranslation } from '@/hooks/useTranslation'

export interface PhoneInputProps {
  value: string
  onChange: (value: string) => void
  error?: string
  countryCode?: string
  autoFocus?: boolean
}

export function PhoneInput({
  value,
  onChange,
  error,
  countryCode = '+91',
  autoFocus,
}: PhoneInputProps) {
  const t = useTranslation()

  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{t.phone_label}</Text>
      <View style={styles.row}>
        <View
          style={[styles.prefix, error ? styles.prefixError : styles.prefixOk]}
          accessibilityLabel={countryCode}
        >
          <Text style={styles.prefixText}>{countryCode}</Text>
        </View>
        <TextInput
          value={value}
          onChangeText={(raw) => onChange(raw.replace(/\D/g, '').slice(0, 10))}
          keyboardType="number-pad"
          maxLength={10}
          placeholder={t.phone_placeholder}
          placeholderTextColor={colors.contentTertiary}
          autoFocus={autoFocus}
          editable
          style={[styles.input, error ? styles.inputError : styles.inputOk]}
          accessibilityLabel={t.phone_placeholder}
        />
      </View>
      {error ? (
        <Text style={styles.error} accessibilityRole="alert">
          {error}
        </Text>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.contentPrimary,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  prefix: {
    width: 49,
    height: 52,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  prefixOk: {
    borderColor: colors.contentSecondary,
  },
  prefixError: {
    borderColor: colors.error,
  },
  prefixText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.contentPrimary,
    fontVariant: ['tabular-nums'],
  },
  input: {
    flex: 1,
    minWidth: 0,
    height: 52,
    borderRadius: 4,
    borderWidth: 1,
    paddingHorizontal: 16,
    fontSize: 16,
    color: colors.contentPrimary,
    backgroundColor: 'transparent',
  },
  inputOk: {
    borderColor: colors.contentSecondary,
  },
  inputError: {
    borderColor: colors.error,
  },
  error: {
    fontSize: 12,
    color: colors.error,
  },
})
