import { StyleSheet, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { ResolvedImage } from '@/features/home/ResolvedImage'
import {
  CARD_TEXT_INSET_DP,
  CARD_TITLE_SUBTITLE_GAP_DP,
  aiAvatarCategoryScale,
} from '@/features/aiAvatar/aiAvatarFigmaLayout'
import { TEXT_SCRIM_BLACK, TEXT_SCRIM_LOCATIONS } from '@/features/aiAvatar/aiAvatarTextScrim'
import type { TextStyle } from 'react-native'

/** Figma `2385:11031` / `11037` / `11042` — bridge scrim (180° in file → dark top, transparent bottom). */
const BRIDGE_SCRIM_TOP = 44
const BRIDGE_SCRIM_H = 49
const BRIDGE_IMG_TOP = 60
const BRIDGE_IMG_H = 107
const BRIDGE_IMG_BLEED_L = 2
/** Pre-rotation stops at 68.261% → after flip, solid through top ~31.7%, then fade to transparent. */
const BRIDGE_SCRIM_LOCATIONS = [0, 1 - 0.6826, 1] as const
const BRIDGE_SCRIM_COLORS = ['#1b1c20', '#1b1c20', 'rgba(2, 20, 37, 0)'] as const

/** Bridge cards use dark scrim + light type (Pod1 screenshot). */
const BRIDGE_KICKER_ON_SCRIM = 'rgba(255, 255, 255, 1)'
const BRIDGE_SUBTITLE_ON_SCRIM = 'rgba(255, 255, 255, 0.8)'

/**
 * Figma `2385:11028` / `11034` / `11039`.
 * Default: full-bleed image + black scrim. Bridge pod (`11028` / `11034` / `11039`): inset image + tinted scrim.
 */
export function AiAvatarFigmaPhotoCard({
  width,
  height,
  imageWebPath,
  title,
  subtitle,
  kickerStyle,
  cardTitleStyle,
  variant = 'default',
}: {
  width: number
  height: number
  imageWebPath: string
  title: string
  subtitle: string
  kickerStyle: TextStyle
  cardTitleStyle: TextStyle
  variant?: 'default' | 'bridal' | 'corporate' | 'royal'
}) {
  const s = aiAvatarCategoryScale(width)
  const pad = CARD_TEXT_INSET_DP * s
  const gapTs = CARD_TITLE_SUBTITLE_GAP_DP * s
  const imgTop = BRIDGE_IMG_TOP * s
  /** Extend scrim past the nominal image top so the fade overlaps the photo (smooth merge). */
  const scrimH = Math.min(height * 0.62, imgTop + 44 * s)
  /** Bridge: keep copy stack above inset art. Default: keep within top scrim. */
  const copyMaxHBridge = Math.max(0, imgTop - pad - 4 * s)
  const copyMaxHDefault = Math.max(0, scrimH - pad - 4 * s)

  if (variant === 'bridal' || variant === 'corporate' || variant === 'royal') {
    const subtitleColor =
      variant === 'corporate' ? 'rgba(255, 255, 255, 1)' : BRIDGE_SUBTITLE_ON_SCRIM
    const kickerColor = BRIDGE_KICKER_ON_SCRIM
    const artTop = imgTop
    const bridgeTop = Math.max(0, artTop - (BRIDGE_IMG_TOP - BRIDGE_SCRIM_TOP) * s)
    const bridgeH = BRIDGE_SCRIM_H * s
    const artH = BRIDGE_IMG_H * s
    const bleed = BRIDGE_IMG_BLEED_L * s

    return (
      <View style={[styles.root, { width, height }]}>
        <View
          style={{
            position: 'absolute',
            left: -bleed,
            top: artTop,
            width: width + 2 * bleed,
            height: artH,
            overflow: 'hidden',
            zIndex: 0,
          }}
          pointerEvents="none"
        >
          <ResolvedImage
            webPath={imageWebPath}
            resizeMode="cover"
            style={StyleSheet.absoluteFillObject}
          />
        </View>

        <LinearGradient
          colors={[...BRIDGE_SCRIM_COLORS]}
          locations={[...BRIDGE_SCRIM_LOCATIONS]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: bridgeTop,
            height: bridgeH,
            zIndex: 1,
          }}
          pointerEvents="none"
        />

        <View
          style={[
            styles.copyBlock,
            { top: pad, left: pad, right: pad, gap: gapTs, maxHeight: copyMaxHBridge > 0 ? copyMaxHBridge : undefined },
          ]}
        >
          <Text
            style={[kickerStyle, { color: kickerColor, textAlign: 'left', flexShrink: 1 }]}
            numberOfLines={2}
          >
            {title}
          </Text>
          <Text
            style={[cardTitleStyle, { color: subtitleColor, textAlign: 'left', marginTop: 0, flexShrink: 1 }]}
            numberOfLines={3}
          >
            {subtitle}
          </Text>
        </View>
      </View>
    )
  }

  return (
    <View style={[styles.root, { width, height }]}>
      <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
        <ResolvedImage
          webPath={imageWebPath}
          resizeMode="cover"
          style={StyleSheet.absoluteFillObject}
        />
      </View>

      <LinearGradient
        colors={[...TEXT_SCRIM_BLACK]}
        locations={[...TEXT_SCRIM_LOCATIONS]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: scrimH,
          zIndex: 1,
        }}
        pointerEvents="none"
      />

      <View
        style={[
          styles.copyBlock,
          {
            top: pad,
            left: pad,
            right: pad,
            gap: gapTs,
            maxHeight: copyMaxHDefault > 0 ? copyMaxHDefault : undefined,
          },
        ]}
      >
        <Text style={[kickerStyle, { textAlign: 'left', flexShrink: 1 }]} numberOfLines={2}>
          {title}
        </Text>
        <Text style={[cardTitleStyle, { textAlign: 'left', marginTop: 0, flexShrink: 1 }]} numberOfLines={3}>
          {subtitle}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: { position: 'relative', overflow: 'hidden' },
  copyBlock: {
    position: 'absolute',
    zIndex: 2,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
})
