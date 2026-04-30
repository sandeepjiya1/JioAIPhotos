import type { ReactNode } from 'react'
import { useMemo } from 'react'
import { Dimensions, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import { BlurView } from 'expo-blur'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useThemeStore } from '@/store/themeStore'
import { moderateSize } from '@/theme/layoutScale'
import { useThemeColors } from '@/theme/useThemeColors'

export interface TopBarProps {
  title?: string
  left?: ReactNode
  right?: ReactNode
  transparent?: boolean
}

const BLUR_INTENSITY = 72

export function TopBar({ title, left, right, transparent }: TopBarProps) {
  const colors = useThemeColors()
  const appearance = useThemeStore((s) => s.appearance)
  const insets = useSafeAreaInsets()
  const { width: winW } = useWindowDimensions()
  const ww = winW > 0 ? winW : Dimensions.get('window').width
  const barH = moderateSize(56, ww)
  const padH = moderateSize(16, ww)
  const padCenterH = moderateSize(8, ww)
  const sideMinW = moderateSize(40, ww)
  const titleSize = moderateSize(16, ww)

  const rowStyle = [styles.row, { minHeight: barH, paddingHorizontal: padH }]

  const chromeOuter = useMemo(
    () => ({
      borderBottomColor: colors.hairlineOnGlass,
      backgroundColor: colors.shellUnderlay,
    }),
    [colors],
  )

  if (transparent) {
    return (
      <View style={[styles.outer, { paddingTop: insets.top }, styles.transparent]}>
        <View style={rowStyle}>
          <View style={[styles.side, { minWidth: sideMinW }]}>{left}</View>
          <View style={[styles.center, { paddingHorizontal: padCenterH }]}>
            {title ? (
              <Text
                style={[
                  styles.title,
                  { fontSize: titleSize, lineHeight: Math.round(titleSize * 1.25), color: colors.contentPrimary },
                ]}
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
    <View style={[styles.outer, { paddingTop: insets.top }, chromeOuter]}>
      <BlurView intensity={BLUR_INTENSITY} tint={appearance === 'light' ? 'light' : 'dark'} style={StyleSheet.absoluteFill} />
      <View style={[styles.tint, { backgroundColor: colors.glassTint }]} pointerEvents="none" />
      <View style={rowStyle}>
        <View style={[styles.side, { minWidth: sideMinW }]}>{left}</View>
        <View style={[styles.center, { paddingHorizontal: padCenterH }]}>
          {title ? (
            <Text
              style={[
                styles.title,
                { fontSize: titleSize, lineHeight: Math.round(titleSize * 1.25), color: colors.contentPrimary },
              ]}
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
  },
  tint: {
    ...StyleSheet.absoluteFillObject,
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
    textAlign: 'center',
    maxWidth: '100%',
  },
})
