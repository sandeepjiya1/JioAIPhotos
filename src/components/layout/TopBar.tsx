import type { ReactNode } from 'react'
import { StyleSheet, Text, View, useWindowDimensions, Dimensions } from 'react-native'
import { BlurView } from 'expo-blur'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { colors } from '@/theme/colors'
import { moderateSize } from '@/theme/layoutScale'

export interface TopBarProps {
  title?: string
  left?: ReactNode
  right?: ReactNode
  transparent?: boolean
}

const GLASS_TINT = 'rgba(13,42,61,0.52)'
const BLUR_INTENSITY = 72

export function TopBar({ title, left, right, transparent }: TopBarProps) {
  const insets = useSafeAreaInsets()
  const { width: winW } = useWindowDimensions()
  const ww = winW > 0 ? winW : Dimensions.get('window').width
  const barH = moderateSize(56, ww)
  const padH = moderateSize(16, ww)
  const padCenterH = moderateSize(8, ww)
  const sideMinW = moderateSize(40, ww)
  const titleSize = moderateSize(16, ww)

  const rowStyle = [styles.row, { minHeight: barH, paddingHorizontal: padH }]

  if (transparent) {
    return (
      <View style={[styles.outer, { paddingTop: insets.top }, styles.transparent]}>
        <View style={rowStyle}>
          <View style={[styles.side, { minWidth: sideMinW }]}>{left}</View>
          <View style={[styles.center, { paddingHorizontal: padCenterH }]}>
            {title ? (
              <Text
                style={[styles.title, { fontSize: titleSize, lineHeight: Math.round(titleSize * 1.25) }]}
                numberOfLines={1}
              >
                {title}
              </Text>
            ) : null}
          </View>
          <View style={[styles.side, styles.sideEnd, { minWidth: sideMinW }]}>{right}</View>
        </View>
      </View>
    )
  }

  return (
    <View style={[styles.outer, { paddingTop: insets.top }, styles.glassOuter]}>
      <BlurView intensity={BLUR_INTENSITY} tint="dark" style={StyleSheet.absoluteFill} />
      <View style={styles.tint} pointerEvents="none" />
      <View style={rowStyle}>
        <View style={[styles.side, { minWidth: sideMinW }]}>{left}</View>
        <View style={[styles.center, { paddingHorizontal: padCenterH }]}>
          {title ? (
            <Text
              style={[styles.title, { fontSize: titleSize, lineHeight: Math.round(titleSize * 1.25) }]}
              numberOfLines={1}
            >
              {title}
            </Text>
          ) : null}
        </View>
        <View style={[styles.side, styles.sideEnd, { minWidth: sideMinW }]}>{right}</View>
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
  },
  side: {
    flex: 1,
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
  },
  title: {
    fontWeight: '600',
    color: colors.contentPrimary,
    textAlign: 'center',
    maxWidth: '100%',
  },
})
