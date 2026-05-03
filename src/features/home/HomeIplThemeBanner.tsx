import { StyleSheet, View } from 'react-native'
import { ResolvedImage } from '@/features/home/ResolvedImage'
import { HOME_IPL_THEME_BANNER, HOME_IPL_THEME_BANNER_LIGHT } from '@/features/home/homeContent'
import { useThemeStore } from '@/store/themeStore'

/**
 * Full-width IPL theme strip above the AI Avatars rail (dark / light art from `homeContent`).
 */
export function HomeIplThemeBanner({ height }: { height: number }) {
  const appearance = useThemeStore((s) => s.appearance)
  const config = appearance === 'light' ? HOME_IPL_THEME_BANNER_LIGHT : HOME_IPL_THEME_BANNER

  return (
    <View
      style={[styles.root, { height }]}
      accessible={false}
      accessibilityElementsHidden
    >
      <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
        {config.layers.map((layer) => (
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
