import type { ReactNode } from 'react'
import { ActivityIndicator, StyleSheet, Text, type ViewStyle } from 'react-native'
import { PressableScale } from '@/components/motion/PressableScale'
import { useLayoutScale } from '@/hooks/useLayoutScale'
import { colors } from '@/theme/colors'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger'
export type ButtonSize = 'pill' | 'md' | 'sm'

export interface ButtonProps {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  disabled?: boolean
  loading?: boolean
  onPress?: () => void
  accessibilityLabel?: string
}

const variantStyles: Record<ButtonVariant, { base: ViewStyle; pressed: ViewStyle; text: string }> = {
  primary: {
    base: { backgroundColor: colors.primary600 },
    pressed: { backgroundColor: colors.primary700 },
    text: colors.contentPrimary,
  },
  secondary: {
    base: { backgroundColor: colors.surface3 },
    pressed: { backgroundColor: colors.surface4 },
    text: colors.contentPrimary,
  },
  outline: {
    base: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.onBorder,
    },
    pressed: { backgroundColor: 'rgba(255,255,255,0.06)' },
    text: colors.contentPrimary,
  },
  danger: {
    base: { backgroundColor: colors.dangerBg },
    pressed: { backgroundColor: colors.dangerPressed },
    text: colors.contentPrimary,
  },
}

export function Button({
  children,
  variant = 'primary',
  size = 'pill',
  fullWidth,
  disabled,
  loading,
  onPress,
  accessibilityLabel,
}: ButtonProps) {
  const { ms } = useLayoutScale()
  const vs = variantStyles[variant]
  const height = size === 'pill' ? ms(48) : size === 'md' ? ms(48) : ms(36)
  const radius = size === 'pill' ? 999 : size === 'md' ? ms(12) : ms(10)
  const fontSize = size === 'sm' ? ms(14) : ms(16)
  const padH = size === 'sm' ? ms(16) : ms(24)

  return (
    <PressableScale
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      disabled={disabled || loading}
      onPress={onPress}
      layout="fill"
      style={({ pressed }) => [
        styles.core,
        { minHeight: height, borderRadius: radius, paddingHorizontal: padH },
        vs.base,
        fullWidth && styles.fullWidth,
        (disabled || loading) && styles.disabled,
        pressed && !(disabled || loading) && vs.pressed,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={vs.text} />
      ) : (
        <Text style={[styles.label, { color: vs.text, fontSize, lineHeight: Math.round(fontSize * 1.2) }]}>
          {children}
        </Text>
      )}
    </PressableScale>
  )
}

const styles = StyleSheet.create({
  core: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    fontWeight: '600',
  },
})
