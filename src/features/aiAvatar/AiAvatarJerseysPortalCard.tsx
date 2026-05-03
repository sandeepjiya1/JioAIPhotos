import { useMemo } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { ResolvedImage } from '@/features/home/ResolvedImage'

/** Figma Pod1 `2385:10416` / `2385:10425` — portal card (307×461 design px). */
const DESIGN_W = 307
const DESIGN_H = 461
const GRAD_H = 196
const BOTTOM_SCRIM_H = 117
const BOTTOM_SCRIM_TOP = 344

const HERO_Q = '?v=20260502jerseyportal'

export function AiAvatarJerseysPortalCard({
  width,
  height,
  hint,
  uploadLabel,
  showIplBadge,
  onUploadPress,
}: {
  width: number
  height: number
  hint: string
  uploadLabel: string
  showIplBadge?: boolean
  onUploadPress?: () => void
}) {
  const s = Math.min(width / DESIGN_W, height / DESIGN_H)
  const gradH = GRAD_H * s
  const stripH = BOTTOM_SCRIM_H * s
  const stripTop = (BOTTOM_SCRIM_TOP / DESIGN_H) * height

  const styles = useMemo(
    () =>
      StyleSheet.create({
        root: {
          width,
          height,
          borderRadius: 16 * s,
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.72)',
          overflow: 'hidden',
        },
        hint: {
          fontSize: 14 * s,
          lineHeight: 20 * s,
          fontWeight: '400',
          color: '#FFFFFF',
          textAlign: 'center',
          maxWidth: 211 * s,
          alignSelf: 'center',
        },
        uploadOuter: {
          backgroundColor: '#000f1a',
          borderRadius: 9999,
          overflow: 'hidden',
          alignSelf: 'center',
        },
        uploadLabel: {
          fontSize: 14 * s,
          lineHeight: 14 * s,
          fontWeight: '700',
          color: '#278bc1',
          paddingHorizontal: 16 * s,
          paddingVertical: 8 * s,
          textAlign: 'center',
        },
        footerCol: {
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 20 * s,
          alignItems: 'center',
          gap: 8 * s,
          paddingHorizontal: 8 * s,
        },
        badge: {
          position: 'absolute',
          left: 12.55 * s,
          top: 11.63 * s,
          width: 44 * s,
          height: 23 * s,
          overflow: 'hidden',
          zIndex: 4,
        },
      }),
    [height, s, width],
  )

  return (
    <View style={styles.root}>
      <ResolvedImage
        webPath={`/assets/home/5f141b0cc3fea8440a808fad8006f5b784ac2c4b.png${HERO_Q}`}
        resizeMode="cover"
        style={StyleSheet.absoluteFillObject}
      />

      <LinearGradient
        colors={['rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0)']}
        locations={[0, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: gradH,
          borderTopLeftRadius: 13.646 * s,
          borderTopRightRadius: 13.646 * s,
        }}
        pointerEvents="none"
      />

      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: gradH,
          overflow: 'hidden',
          borderBottomLeftRadius: 16 * s,
          borderBottomRightRadius: 16 * s,
        }}
        pointerEvents="none"
      >
        <View style={{ transform: [{ scaleY: -1 }], flex: 1 }}>
          <LinearGradient
            colors={['rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0)']}
            locations={[0, 1]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={StyleSheet.absoluteFillObject}
          />
        </View>
      </View>

      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: stripTop,
          height: stripH,
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          borderBottomLeftRadius: 16 * s,
          borderBottomRightRadius: 16 * s,
        }}
        pointerEvents="none"
      />

      {showIplBadge ? (
        <View style={styles.badge} pointerEvents="none">
          <ResolvedImage
            webPath={`/assets/home/eb138bc2d39c438900ab48df1130ea92e001422c.png${HERO_Q}`}
            resizeMode="cover"
            style={StyleSheet.absoluteFillObject}
          />
        </View>
      ) : null}

      <View style={styles.footerCol}>
        <Text style={styles.hint}>{hint}</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={uploadLabel}
          onPress={onUploadPress}
          style={({ pressed }) => [styles.uploadOuter, pressed && { opacity: 0.88 }]}
        >
          <Text style={styles.uploadLabel}>{uploadLabel}</Text>
        </Pressable>
      </View>
    </View>
  )
}
