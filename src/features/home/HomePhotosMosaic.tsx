import { StyleSheet, Text, View } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { ResolvedImage } from '@/features/home/ResolvedImage'
import type { HomePhotoTile } from '@/features/home/homeContent'
import { colors } from '@/theme/colors'
import { moderateSize } from '@/theme/layoutScale'

type MosaicMetrics = {
  badgePad: number
  badgeGap: number
  timeSize: number
  timeLine: number
  playFab: number
  playIcon: number
  playIconOffset: number
  moreGap: number
  moreCountSize: number
  moreCountLine: number
  moreUnitSize: number
  moreUnitLine: number
}

type Props = {
  innerWidth: number
  items: readonly HomePhotoTile[]
}

/** Figma Photos_Section (1131:118056): hero + stacked pair + three bottom tiles, 1px gutters. */
export function HomePhotosMosaic({ innerWidth, items }: Props) {
  const inner = Math.max(1, Math.floor(innerWidth))
  const g = Math.max(1, moderateSize(1, inner))
  const cell = Math.floor((inner - 2 * g) / 3)
  const heroW = inner - g - cell
  const heroH = cell * 2 + g
  const badgePad = moderateSize(6, inner)
  const badgeGap = moderateSize(4, inner)
  const timeSize = moderateSize(12, inner)
  const playFab = moderateSize(16, inner)
  const playIcon = moderateSize(10, inner)
  const moreGap = moderateSize(2, inner)
  const moreCountSize = moderateSize(20, inner)
  const moreUnitSize = moderateSize(8, inner)

  const m: MosaicMetrics = {
    badgePad,
    badgeGap,
    timeSize,
    timeLine: Math.round(timeSize * 1.15),
    playFab,
    playIcon,
    playIconOffset: Math.max(1, moderateSize(1, inner)),
    moreGap,
    moreCountSize,
    moreCountLine: Math.round(moreCountSize * 1.2),
    moreUnitSize,
    moreUnitLine: Math.round(moreUnitSize * 1.25),
  }

  const [t0, t1, t2, t3, t4, t5] = items
  if (!t0) return null

  return (
    <View style={[styles.root, { width: inner, gap: g }]}>
      <View style={[styles.row, { gap: g, width: inner }]}>
        <HeroTile width={heroW} height={heroH} tile={t0} />
        <View style={[styles.stackCol, { width: cell, height: heroH, gap: g }]}>
          {t1 ? <MosaicTile width={cell} height={cell} tile={t1} m={m} /> : null}
          {t2 ? <MosaicTile width={cell} height={cell} tile={t2} m={m} /> : null}
        </View>
      </View>
      <View style={[styles.row, { gap: g, width: inner }]}>
        {t3 ? <MosaicTile width={cell} height={cell} tile={t3} m={m} /> : null}
        {t4 ? <MosaicTile width={cell} height={cell} tile={t4} m={m} /> : null}
        {t5 ? <MosaicTile width={cell} height={cell} tile={t5} m={m} /> : null}
      </View>
    </View>
  )
}

function HeroTile({ width, height, tile }: { width: number; height: number; tile: HomePhotoTile }) {
  return (
    <View style={[styles.tile, { width, height }]}>
      <View style={StyleSheet.absoluteFill}>
        <ResolvedImage
          webPath={tile.src}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: height * -0.0336,
            height: height * 1.4061,
            width: '100%',
          }}
          resizeMode="cover"
        />
      </View>
    </View>
  )
}

function MosaicTile({
  width,
  height,
  tile,
  m,
}: {
  width: number
  height: number
  tile: HomePhotoTile
  m: MosaicMetrics
}) {
  return (
    <View style={[styles.tile, { width, height }]}>
      <ResolvedImage webPath={tile.src} style={StyleSheet.absoluteFillObject} resizeMode="cover" />
      {tile.videoBadge ? (
        <View
          style={[
            styles.videoBadgeRow,
            { right: m.badgePad, bottom: m.badgePad, gap: m.badgeGap },
          ]}
          pointerEvents="none"
        >
          <Text style={[styles.videoTime, { fontSize: m.timeSize, lineHeight: m.timeLine }]}>
            {tile.videoBadge.durationLabel}
          </Text>
          <View
            style={[
              styles.playFab,
              { width: m.playFab, height: m.playFab, borderRadius: m.playFab / 2 },
            ]}
            accessibilityLabel="Play video"
          >
            <Ionicons
              name="play"
              size={m.playIcon}
              color={colors.contentPrimary}
              style={{ marginLeft: m.playIconOffset }}
            />
          </View>
        </View>
      ) : null}
      {tile.morePhotosOverlay ? (
        <View style={[StyleSheet.absoluteFillObject, styles.moreDim, { gap: m.moreGap }]} pointerEvents="none">
          <Text style={[styles.moreCount, { fontSize: m.moreCountSize, lineHeight: m.moreCountLine }]}>
            +{tile.morePhotosOverlay.count}
          </Text>
          <Text style={[styles.moreUnit, { fontSize: m.moreUnitSize, lineHeight: m.moreUnitLine }]}>
            {tile.morePhotosOverlay.unitLabel}
          </Text>
        </View>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    alignSelf: 'stretch',
  },
  row: {
    flexDirection: 'row',
  },
  stackCol: {
    flexDirection: 'column',
  },
  tile: {
    overflow: 'hidden',
    backgroundColor: colors.surface3,
    position: 'relative',
  },
  videoBadgeRow: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
  },
  videoTime: {
    fontWeight: '400',
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.45)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  playFab: {
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreDim: {
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreCount: {
    fontWeight: '900',
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.65)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
  },
  moreUnit: {
    fontWeight: '400',
    color: 'rgba(255,255,255,0.98)',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.55)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
})
