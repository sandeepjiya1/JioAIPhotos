import { useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import { ResolvedImage } from '@/features/home/ResolvedImage'

/** Figma Pod1 `2385:11020` — Cricket Jerseys stack (160×150 design px). */
const BASE_W = 160
const CARD_H = 150

export function AiAvatarJerseysArt({ width, height }: { width: number; height: number }) {
  const s = Math.min(width / BASE_W, height / CARD_H)
  const canvasW = BASE_W * s
  const canvasH = CARD_H * s

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

  return (
    <View style={styles.slot}>
      <View style={styles.root}>
      <View style={[styles.abs, { left: -3 * s, top: 77 * s, width: 47.732 * s, height: 72 * s, overflow: 'hidden' }]}>
        <ResolvedImage
          webPath="/assets/home/8f6e8f7af2ef7684aad73653bfea93d444341939.png?v=20260502"
          resizeMode="cover"
          style={StyleSheet.absoluteFillObject}
        />
      </View>
      <View style={[styles.abs, { left: 23 * s, top: 74 * s, width: 64.935 * s, height: 80 * s, overflow: 'hidden' }]}>
        <ResolvedImage
          webPath="/assets/home/5af61e6a02bac7411e3ce6c7bebcb63285ff3b7f.png?v=20260502"
          resizeMode="cover"
          style={StyleSheet.absoluteFillObject}
        />
      </View>
      <View style={[styles.abs, { left: 50 * s, top: 71 * s, width: 85.274 * s, height: 90 * s, overflow: 'hidden' }]}>
        <ResolvedImage
          webPath="/assets/home/414e7a453d8012b21546322b563f4c226313d1f9.png?v=20260502"
          resizeMode="cover"
          style={StyleSheet.absoluteFillObject}
        />
      </View>
      <View style={[styles.abs, { left: 97 * s, top: 66 * s, width: 71.877 * s, height: 97 * s, overflow: 'hidden' }]}>
        <ResolvedImage
          webPath="/assets/home/8bc93d888d0d87c406569c4230e6e812cd4b40a7.png?v=20260502"
          resizeMode="cover"
          style={StyleSheet.absoluteFillObject}
        />
      </View>
      </View>
    </View>
  )
}
