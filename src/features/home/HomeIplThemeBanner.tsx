import { StyleSheet, View } from 'react-native'
import { ResolvedImage } from '@/features/home/ResolvedImage'
import { HOME_IPL_THEME_BANNER } from '@/features/home/homeContent'

/**
 * Full-width IPL theme strip above the AI Avatars rail (`HOME_IPL_THEME_BANNER`).
 */
export function HomeIplThemeBanner({ height }: { height: number }) {
  return (
    <View
      style={[styles.root, { height }]}
      accessible={false}
      accessibilityElementsHidden
    >
      <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
        {HOME_IPL_THEME_BANNER.layers.map((layer) => (
          <View
            key={layer.id}
            style={{
              position: 'absolute',
              left: layer.left,
              width: layer.width,
              height: layer.height,
              top: layer.top,
              overflow: 'hidden',
              zIndex: layer.zIndex,
            }}
          >
            <ResolvedImage
              webPath={layer.webPath}
              style={StyleSheet.absoluteFillObject}
              resizeMode="contain"
            />
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
  },
})
