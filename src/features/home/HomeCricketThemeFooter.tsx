import { StyleSheet, Text, View } from 'react-native'
import { ResolvedImage } from '@/features/home/ResolvedImage'
import { HOME_CRICKET_THEME_FOOTER } from '@/features/home/homeContent'
import { useThemeColors } from '@/theme/useThemeColors'

/** Figma `1305:22633` — decorative layer crop on stadium art */
const BG_IMAGE_HEIGHT_FRAC = 1.2371
const BG_IMAGE_TOP_FRAC = -0.1677

export type HomeCricketThemeFooterLayout = {
  padH: number
  padTop: number
  padBottom: number
  titleSize: number
  titleLine: number
  titleStackGap: number
  playersW: number
  playersH: number
}

/**
 * Figma Journeys `1305:22633` — CricketTheme_Footer: stadium art at 20% opacity, “With Love / From Jio”,
 * IPL line-art mark (SVG `1305:22637` rasterized).
 */
export function HomeCricketThemeFooter({ lx }: { lx: HomeCricketThemeFooterLayout }) {
  const colors = useThemeColors()
  /** Balance top/bottom so the title + art row sits vertically centered in the footer band (Figma pad was top-heavy with `padBottom: 0`). */
  const padV = (lx.padTop + lx.padBottom) / 2
  const titleStyle = [
    styles.title,
    {
      color: colors.contentPrimary,
      fontSize: lx.titleSize,
      lineHeight: lx.titleLine,
    },
  ]

  return (
    <View
      style={[
        styles.wrap,
        {
          paddingHorizontal: lx.padH,
          paddingTop: padV,
          paddingBottom: padV,
        },
      ]}
    >
      <View style={styles.bgScrim} pointerEvents="none">
        <ResolvedImage
          webPath={HOME_CRICKET_THEME_FOOTER.backgroundArt}
          resizeMode="cover"
          style={[
            styles.bgImage,
            {
              height: `${BG_IMAGE_HEIGHT_FRAC * 100}%`,
              top: `${BG_IMAGE_TOP_FRAC * 100}%`,
            },
          ]}
        />
      </View>

      <View style={styles.row}>
        <View style={{ gap: lx.titleStackGap }}>
          <Text style={titleStyle}>{HOME_CRICKET_THEME_FOOTER.line1}</Text>
          <Text style={titleStyle}>{HOME_CRICKET_THEME_FOOTER.line2}</Text>
        </View>

        <View style={[styles.playersMark, { width: lx.playersW, height: lx.playersH }]}>
          <ResolvedImage
            webPath={HOME_CRICKET_THEME_FOOTER.playersArt}
            resizeMode="contain"
            style={styles.playersImage}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrap: {
    position: 'relative',
    overflow: 'hidden',
  },
  bgScrim: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.2,
    overflow: 'hidden',
  },
  bgImage: {
    position: 'absolute',
    left: 0,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  /** Figma `1305:22634` — Headline ~29px, weight 950 (use 900 in RN). */
  title: {
    fontWeight: '900',
  },
  /** Figma `1305:22637` wrapper: `-scale-y-100` + `rotate-180` on exported SVG */
  playersMark: {
    transform: [{ rotate: '180deg' }, { scaleY: -1 }],
  },
  playersImage: {
    width: '100%',
    height: '100%',
  },
})