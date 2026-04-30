import { useMemo } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { useThemeColors } from '@/theme/useThemeColors'

export interface ProgressDotsProps {
  total: number
  current: number
  onDotPress?: (index: number) => void
}

export function ProgressDots({ total, current, onDotPress }: ProgressDotsProps) {
  const colors = useThemeColors()
  const styles = useMemo(
    () =>
      StyleSheet.create({
        row: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
        },
        dot: {
          borderRadius: 999,
          height: 8,
        },
        dotActive: {
          width: 24,
          backgroundColor: colors.jioTeal,
        },
        dotIdle: {
          width: 8,
          backgroundColor: colors.jioTealLight,
          opacity: 0.6,
        },
      }),
    [colors],
  )

  return (
    <View style={styles.row} accessibilityRole="tablist" accessibilityLabel="Slide progress">
      {Array.from({ length: total }).map((_, i) => {
        const active = i === current
        return (
          <Pressable
            key={i}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            accessibilityLabel={`Go to slide ${i + 1}`}
            onPress={() => onDotPress?.(i)}
            style={[styles.dot, active ? styles.dotActive : styles.dotIdle]}
          />
        )
      })}
    </View>
  )
}
