import { useEffect, useRef } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { colors } from '@/theme/colors'
import { useLayoutScale } from '@/hooks/useLayoutScale'
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
  length = 6,
  value,
  onChange,
  disabled = false,
  error,
  countdown = 0,
  onResend,
}: OTPInputProps) {
  const t = useTranslation()
  const { ms } = useLayoutScale()
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
    <View style={[styles.wrap, { gap: ms(12) }]}>
      <Text style={[styles.label, { fontSize: ms(14) }]}>{t.otp_field_label}</Text>

      <View style={[styles.row, { gap: ms(12) }]}>
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
            style={[
              styles.cell,
              {
                height: ms(52),
                borderRadius: ms(4),
                fontSize: ms(16),
              },
              error ? styles.cellError : styles.cellOk,
              disabled && styles.cellDisabled,
            ]}
          />
        ))}
      </View>

      {!error ? (
        <Text style={[styles.meta, { fontSize: ms(14) }]}>
          {countdown > 0 ? (
            <Text style={[styles.metaStrong, { fontSize: ms(14) }]}>
              {formatCountdown(t.otp_resend_countdown, countdown)}
            </Text>
          ) : (
            <Pressable onPress={onResend} hitSlop={ms(8)}>
              <Text style={[styles.resend, { fontSize: ms(14) }]}>{t.otp_resend_cta}</Text>
            </Pressable>
          )}
        </Text>
      ) : (
        <Text style={[styles.error, { fontSize: ms(12) }]} accessibilityRole="alert">
          {error}
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {},
  label: {
    fontWeight: '600',
    color: colors.contentPrimary,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
  },
  cell: {
    flex: 1,
    minWidth: 0,
    borderWidth: 1,
    textAlign: 'center',
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
    color: colors.contentSecondary,
  },
  metaStrong: {
    fontWeight: '700',
    color: colors.contentSecondary,
  },
  resend: {
    fontWeight: '700',
    color: colors.primary600,
  },
  error: {
    color: colors.error,
  },
})
