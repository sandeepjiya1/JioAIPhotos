import { useEffect, useRef } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { colors } from '@/theme/colors'
import { useTranslation } from '@/hooks/useTranslation'

export interface OTPInputProps {
  length?: number
  value: string[]
  onChange: (value: string[]) => void
  disabled?: boolean
  error?: string
  countdown?: number
  onResend?: () => void
}

function formatCountdown(template: string, count: number) {
  return template.replace(/\{count\}/g, String(count))
}

function formatDigitAria(template: string, n: number) {
  return template.replace(/\{n\}/g, String(n))
}

export function OTPInput({
  length = 4,
  value,
  onChange,
  disabled = false,
  error,
  countdown = 0,
  onResend,
}: OTPInputProps) {
  const t = useTranslation()
  const refs = useRef<Array<TextInput | null>>([])

  useEffect(() => {
    const firstEmpty = value.findIndex((d) => !d)
    const idx = firstEmpty === -1 ? 0 : firstEmpty
    refs.current[idx]?.focus()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- match web: focus first empty on mount only
  }, [])

  const handleChange = (index: number, raw: string) => {
    const next = [...value]
    if (raw === '') {
      next[index] = ''
      onChange(next)
      if (index > 0) refs.current[index - 1]?.focus()
      return
    }
    const digit = raw.replace(/\D/g, '').slice(-1)
    next[index] = digit
    onChange(next)
    if (digit && index < length - 1) {
      refs.current[index + 1]?.focus()
    }
  }

  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{t.otp_field_label}</Text>

      <View style={styles.row}>
        {Array.from({ length }).map((_, i) => (
          <TextInput
            key={i}
            ref={(el) => {
              refs.current[i] = el
            }}
            value={value[i] ?? ''}
            onChangeText={(txt) => handleChange(i, txt)}
            keyboardType="number-pad"
            maxLength={1}
            editable={!disabled}
            accessibilityLabel={formatDigitAria(t.otp_digit_aria, i + 1)}
            style={[styles.cell, error ? styles.cellError : styles.cellOk, disabled && styles.cellDisabled]}
          />
        ))}
      </View>

      {!error ? (
        <Text style={styles.meta}>
          {countdown > 0 ? (
            <Text style={styles.metaStrong}>{formatCountdown(t.otp_resend_countdown, countdown)}</Text>
          ) : (
            <Pressable onPress={onResend} hitSlop={8}>
              <Text style={styles.resend}>{t.otp_resend_cta}</Text>
            </Pressable>
          )}
        </Text>
      ) : (
        <Text style={styles.error} accessibilityRole="alert">
          {error}
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    gap: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.contentPrimary,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  cell: {
    flex: 1,
    minWidth: 0,
    height: 52,
    borderRadius: 4,
    borderWidth: 1,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: colors.contentPrimary,
    backgroundColor: 'transparent',
  },
  cellOk: {
    borderColor: colors.contentSecondary,
  },
  cellError: {
    borderColor: colors.error,
  },
  cellDisabled: {
    opacity: 0.5,
  },
  meta: {
    fontSize: 14,
    color: colors.contentSecondary,
  },
  metaStrong: {
    fontWeight: '700',
    color: colors.contentSecondary,
  },
  resend: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary600,
  },
  error: {
    fontSize: 12,
    color: colors.error,
  },
})
