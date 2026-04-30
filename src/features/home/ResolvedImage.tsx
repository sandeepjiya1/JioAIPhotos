import type { ImageResizeMode, ImageStyle, StyleProp } from 'react-native'
import { Image, StyleSheet, View } from 'react-native'
import { resolveHomeImage } from '../../../assets/home/registry'
import { useThemeColors } from '@/theme/useThemeColors'

/**
 * Bundled static image from `assets/home/registry.ts`.
 * Outer `View` receives layout (size, radius, flex); inner `Image` fills it with
 * `resizeMode` so photos scale uniformly (`cover` / `contain` / `stretch`) without distortion.
 */
export function ResolvedImage({
  webPath,
  style,
  resizeMode = 'cover',
}: {
  webPath: string
  style?: StyleProp<ImageStyle>
  resizeMode?: ImageResizeMode
}) {
  const colors = useThemeColors()
  const src = resolveHomeImage(webPath)
  if (!src) {
    return <View style={[styles.fallback, { backgroundColor: colors.surface3 }, style]} />
  }
  return (
    <View style={[styles.box, style]} collapsable={false}>
      <Image source={src} style={styles.fill} resizeMode={resizeMode} />
    </View>
  )
}

const styles = StyleSheet.create({
  box: {
    overflow: 'hidden',
  },
  fill: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  fallback: {},
})
