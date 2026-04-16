import type { ReactNode } from 'react'
import { ActivityIndicator, Pressable, StyleSheet, Text, type ViewStyle } from 'react-native'
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
  const vs = variantStyles[variant]
  const height = size === 'pill' ? 48 : size === 'md' ? 48 : 36
  const radius = size === 'pill' ? 999 : size === 'md' ? 12 : 10
  const fontSize = size === 'sm' ? 14 : 16
  const padH = size === 'sm' ? 16 : 24

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      disabled={disabled || loading}
      onPress={onPress}
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
        <Text style={[styles.label, { color: vs.text, fontSize }]}>{children}</Text>
      )}
    </Pressable>
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
    fontSize: 16,
    fontWeight: '600',
  },
})
