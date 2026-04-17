import type { ReactNode } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { BlurView } from 'expo-blur'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { colors } from '@/theme/colors'

export interface TopBarProps {
  title?: string
  left?: ReactNode
  right?: ReactNode
  transparent?: boolean
}

const BAR_H = 56
const GLASS_TINT = 'rgba(13,42,61,0.52)'
const BLUR_INTENSITY = 72

export function TopBar({ title, left, right, transparent }: TopBarProps) {
  const insets = useSafeAreaInsets()

  if (transparent) {
    return (
      <View style={[styles.outer, { paddingTop: insets.top }, styles.transparent]}>
        <View style={[styles.row, { minHeight: BAR_H }]}>
          <View style={styles.side}>{left}</View>
          <View style={styles.center}>
            {title ? (
              <Text style={styles.title} numberOfLines={1}>
                {title}
              </Text>
            ) : null}
          </View>
          <View style={[styles.side, styles.sideEnd]}>{right}</View>
        </View>
      </View>
    )
  }

  return (
    <View style={[styles.outer, { paddingTop: insets.top }, styles.glassOuter]}>
      <BlurView intensity={BLUR_INTENSITY} tint="dark" style={StyleSheet.absoluteFill} />
      <View style={styles.tint} pointerEvents="none" />
      <View style={[styles.row, { minHeight: BAR_H }]}>
        <View style={styles.side}>{left}</View>
        <View style={styles.center}>
          {title ? (
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
          ) : null}
        </View>
        <View style={[styles.side, styles.sideEnd]}>{right}</View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  outer: {
    position: 'relative',
    overflow: 'hidden',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255,255,255,0.12)',
  },
  glassOuter: {
    backgroundColor: 'rgba(0,29,46,0.35)',
  },
  tint: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: GLASS_TINT,
  },
  transparent: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  side: {
    flex: 1,
    minWidth: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sideEnd: {
    justifyContent: 'flex-end',
  },
  center: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.contentPrimary,
    textAlign: 'center',
    maxWidth: '100%',
  },
})
