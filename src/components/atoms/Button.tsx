import type { ReactNode } from 'react'
import { useMemo } from 'react'
import { ActivityIndicator, StyleSheet, Text, type PressableProps, type ViewStyle } from 'react-native'
import { PressableScale } from '@/components/motion/PressableScale'
import { useLayoutScale } from '@/hooks/useLayoutScale'
import type { AppThemeColors } from '@/theme/palettes'
import { useThemeColors } from '@/theme/useThemeColors'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'hierarchy'
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
  hitSlop?: PressableProps['hitSlop']
}

/** Figma Journeys `1305:22362` / `1411:22909` — Label S High on ghost pill (section actions e.g. “View all”). */
const HIERARCHY_BUTTON_LABEL = 'rgba(40, 139, 193, 1)' as const

function variantStyles(colors: AppThemeColors): Record<ButtonVariant, { base: ViewStyle; pressed: ViewStyle; text: string }> {
  return {
    primary: {
      base: { backgroundColor: colors.primary600 },
      pressed: { backgroundColor: colors.primary700 },
      text: colors.contentPrimary,
    },
    secondary: {
      base: { backgroundColor: colors.buttonSecondaryBg },
      pressed: { backgroundColor: colors.buttonSecondaryBgPressed },
      text: colors.contentPrimary,
    },
    outline: {
      base: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: colors.onBorder,
      },
      pressed: { backgroundColor: colors.outlinePressed },
      text: colors.contentPrimary,
    },
    danger: {
      base: { backgroundColor: colors.dangerBg },
      pressed: { backgroundColor: colors.dangerPressed },
      text: colors.contentPrimary,
    },
    hierarchy: {
      base: { backgroundColor: 'transparent' },
      pressed: { backgroundColor: colors.outlinePressed },
      text: HIERARCHY_BUTTON_LABEL,
    },
  }
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
  hitSlop,
}: ButtonProps) {
  const colors = useThemeColors()
  const { ms } = useLayoutScale()
  const vs = useMemo(() => variantStyles(colors)[variant], [colors, variant])
  const isHierarchy = variant === 'hierarchy'
  const minHeight = isHierarchy ? ms(24) : size === 'pill' ? ms(48) : size === 'md' ? ms(48) : ms(36)
  const radius = isHierarchy ? 9999 : size === 'pill' ? 999 : size === 'md' ? ms(12) : ms(10)
  const fontSize = isHierarchy ? ms(14) : size === 'sm' ? ms(14) : ms(16)
  const lineHeight = isHierarchy ? ms(14) : Math.round(fontSize * 1.2)
  const padH = isHierarchy ? 0 : size === 'sm' ? ms(16) : ms(24)

  return (
    <PressableScale
      hitSlop={hitSlop}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      disabled={disabled || loading}
      onPress={onPress}
      layout={isHierarchy ? 'auto' : 'fill'}
      style={({ pressed }) => [
        styles.core,
        {
          minHeight,
          borderRadius: radius,
          paddingHorizontal: padH,
          ...(isHierarchy ? { paddingVertical: Math.max(1, ms(2)) } : {}),
        },
        vs.base,
        fullWidth && styles.fullWidth,
        (disabled || loading) && styles.disabled,
        pressed && !(disabled || loading) && vs.pressed,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={vs.text} />
      ) : (
        <Text style={[styles.label, isHierarchy && styles.labelHierarchy, { color: vs.text, fontSize, lineHeight }]}>
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
  labelHierarchy: {
    fontWeight: '700',
    textAlign: 'center',
  },
})
