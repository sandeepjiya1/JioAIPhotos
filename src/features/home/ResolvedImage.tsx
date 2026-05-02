import type { ImageResizeMode, ImageStyle, StyleProp } from 'react-native'
import { Image, StyleSheet, View } from 'react-native'
import { resolveHomeImage } from '../../../assets/home/registry'
import { useThemeColors } from '@/theme/useThemeColors'

const CLIP_CORNER_KEYS = [
  'borderRadius',
  'borderTopLeftRadius',
  'borderTopRightRadius',
  'borderBottomLeftRadius',
  'borderBottomRightRadius',
] as const satisfies readonly (keyof ImageStyle)[]

/** RN Web often needs the same radii on the `Image` as on the wrapper for circular masks. */
function cornerRadiiFromFlat(flat: ImageStyle | undefined): ImageStyle | undefined {
  if (!flat) return undefined
  const out: ImageStyle = {}
  for (const k of CLIP_CORNER_KEYS) {
    const v = flat[k]
    if (v != null) Object.assign(out, { [k]: v })
  }
  return Object.keys(out).length > 0 ? out : undefined
}

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
  const flat = StyleSheet.flatten(style) as ImageStyle | undefined
  const imageCorners = cornerRadiiFromFlat(flat)
  if (!src) {
    return <View style={[styles.fallback, { backgroundColor: colors.surface3 }, style]} />
  }
  return (
    <View style={[styles.box, style]} collapsable={false}>
      <Image source={src} style={[styles.fill, imageCorners]} resizeMode={resizeMode} />
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
