import { useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { ResolvedImage } from '@/features/home/ResolvedImage'

/** Figma Pod1 `2385:11004` — Cricket Faceoff illustration (160×214.17 design px). */
const BASE_W = 160
const ART_H = 214.17

export function AiAvatarFaceoffArt({ width, height }: { width: number; height: number }) {
  const s = Math.min(width / BASE_W, height / ART_H)
  const canvasW = BASE_W * s
  const canvasH = ART_H * s

  const styles = useMemo(
    () =>
      StyleSheet.create({
        slot: {
          width,
          height,
          overflow: 'hidden',
          alignItems: 'center',
          justifyContent: 'flex-end',
        },
        root: { width: canvasW, height: canvasH, overflow: 'hidden', position: 'relative' },
        abs: { position: 'absolute' },
      }),
    [width, height, canvasW, canvasH],
  )

  const stadiumL = -32.55 * s
  const stadiumT = -6.13 * s
  const stadiumW = 234.926 * s
  const stadiumH = 252.852 * s

  return (
    <View style={styles.slot}>
      <View style={styles.root}>
      <View
        style={[
          styles.abs,
          {
            left: stadiumL,
            top: stadiumT,
            width: stadiumW,
            height: stadiumH,
            overflow: 'hidden',
          },
        ]}
      >
        <ResolvedImage
          webPath="/assets/home/d51f212548e4943c8230025b29fee5f3faa9585c.png?v=20260502"
          resizeMode="cover"
          style={StyleSheet.absoluteFillObject}
        />
      </View>

      <View
        style={[
          styles.abs,
          {
            left: 84.91 * s,
            top: 57.08 * s,
            width: 81.245 * s,
            height: 131.742 * s,
            overflow: 'hidden',
            transform: [{ rotate: '2.74deg' }],
          },
        ]}
      >
        <View style={{ width: 75.174 * s, height: 128.297 * s, overflow: 'hidden' }}>
          <ResolvedImage
            webPath="/assets/home/106998f8ab90a09f8b15a0e0d8ba1d727c66942f.png?v=20260502"
            resizeMode="cover"
            style={StyleSheet.absoluteFillObject}
          />
        </View>
      </View>

      <View
        style={[
          styles.abs,
          {
            left: 1.42 * s,
            top: 58.01 * s,
            width: 83.407 * s,
            height: 130.451 * s,
            overflow: 'hidden',
            transform: [{ rotate: '-4.55deg' }],
          },
        ]}
      >
        <View style={{ width: 73.713 * s, height: 124.992 * s, overflow: 'hidden' }}>
          <ResolvedImage
            webPath="/assets/home/057c0b45e49c718fd450be434d2edac3b10336f8.png?v=20260502"
            resizeMode="cover"
            style={StyleSheet.absoluteFillObject}
          />
        </View>
      </View>

      <LinearGradient
        colors={['rgba(2,20,37,0)', '#1b1c20']}
        locations={[0, 0.6826]}
        style={[styles.abs, { left: 0, top: 153.22 * s, width: canvasW, height: 49 * s }]}
        pointerEvents="none"
      />

      <View
        style={[
          styles.abs,
          {
            left: 14.94 * s,
            top: 12.01 * s,
            width: 140.381 * s,
            height: 182.352 * s,
            transform: [{ rotate: '-19.2deg' }],
          },
        ]}
        pointerEvents="none"
      >
        <ResolvedImage
          webPath="/assets/home/f3ddb6b2065c86ca470e7735753c1ca429a1962b.png?v=20260502"
          resizeMode="contain"
          style={StyleSheet.absoluteFillObject}
        />
      </View>

      <View
        style={[
          styles.abs,
          {
            left: 44.68 * s,
            top: 12.06 * s,
            width: 79.779 * s,
            height: 79.779 * s,
          },
        ]}
        pointerEvents="none"
      >
        <ResolvedImage
          webPath="/assets/home/4f18b25dd5787f814c76a135cb002775a81ff9d6.png?v=20260502"
          resizeMode="cover"
          style={StyleSheet.absoluteFillObject}
        />
      </View>

      <View style={[styles.abs, { left: 0, top: 0, width: 79.016 * s, height: 103.311 * s }]} pointerEvents="none">
        <ResolvedImage
          webPath="/assets/home/c20bab9f97f76c32694ccb2d8fb68bc7031acfc3.png?v=20260502"
          resizeMode="cover"
          style={StyleSheet.absoluteFillObject}
        />
      </View>

      <View
        style={[
          styles.abs,
          {
            left: 91.05 * s,
            top: 0,
            width: 79.016 * s,
            height: 103.311 * s,
            transform: [{ rotate: '180deg' }, { scaleY: -1 }],
          },
        ]}
        pointerEvents="none"
      >
        <ResolvedImage
          webPath="/assets/home/d2dff3ea6b5a15b7bb5a146aa8f0fdcfad15b790.png?v=20260502"
          resizeMode="cover"
          style={StyleSheet.absoluteFillObject}
        />
      </View>
    </View>
    </View>
  )
}
