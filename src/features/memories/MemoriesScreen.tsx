import { useMemo } from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { TopBar } from '@/components/layout/TopBar'
import { homeBottomTabScrollPaddingBottom } from '@/components/layout/HomeBottomNav'
import { ResolvedImage } from '@/features/home/ResolvedImage'
import { HOME_MEMORIES_SECTION } from '@/features/home/homeContent'
import { colors } from '@/theme/colors'
import { moderateSize } from '@/theme/layoutScale'

const MEM_DESIGN_CARD_W = 253
const MEM_DESIGN_CONTENT_W = 328
const MEM_DESIGN_IMG_H = 141.961

export default function MemoriesScreen() {
  const { width: winW } = useWindowDimensions()
  const insets = useSafeAreaInsets()
  const ww = winW > 0 ? winW : Dimensions.get('window').width
  const sectionPad = moderateSize(16, ww)
  const memRadius = moderateSize(10, ww)
  const scrollPadTop = moderateSize(16, ww)

  const cardW = useMemo(() => {
    const w = winW > 0 ? winW : Dimensions.get('window').width
    const pad = moderateSize(16, w)
    const inner = Math.max(1, w - pad * 2)
    return Math.max(200, Math.round((inner * MEM_DESIGN_CARD_W) / MEM_DESIGN_CONTENT_W))
  }, [winW])

  const cardImgH = Math.round((cardW * MEM_DESIGN_IMG_H) / MEM_DESIGN_CARD_W)

  return (
    <View style={styles.root}>
      <TopBar title="Memories" />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingHorizontal: sectionPad,
            paddingTop: scrollPadTop,
            paddingBottom: homeBottomTabScrollPaddingBottom(insets.bottom, ww),
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {HOME_MEMORIES_SECTION.items.length === 0 ? (
          <View style={styles.empty}>
            <View style={styles.emptyIcon}>
              <Text style={styles.emptyEmoji}>🕐</Text>
            </View>
            <Text style={styles.emptyText}>No memories yet. They'll appear here automatically.</Text>
          </View>
        ) : (
          <View style={styles.content}>
            <View style={styles.headerBlock}>
              <Text style={styles.sectionTitle}>Your Memories</Text>
              <Text style={styles.sectionDesc}>Relive your best moments</Text>
            </View>
            <View style={styles.stack}>
              {HOME_MEMORIES_SECTION.items.map((m) => (
                <View key={m.id} style={[styles.card, { width: cardW, borderRadius: memRadius }]}>
                  <View style={[styles.cardImage, { height: cardImgH, borderRadius: memRadius }]}>
                    <ResolvedImage
                      webPath={m.image}
                      style={StyleSheet.absoluteFillObject}
                      resizeMode="cover"
                    />
                    <LinearGradient
                      pointerEvents="none"
                      colors={[...m.overlayGradient.colors] as [string, string, ...string[]]}
                      locations={[...m.overlayGradient.locations] as [number, number, ...number[]]}
                      start={m.overlayGradient.start}
                      end={m.overlayGradient.end}
                      style={[StyleSheet.absoluteFillObject, { borderRadius: memRadius }]}
                    />
                    <View style={styles.cardText}>
                      <Text style={styles.cardTitle} numberOfLines={2}>
                        {m.title}
                      </Text>
                      <Text style={styles.cardDate}>{m.date}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.surface0,
    minHeight: 0,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {},
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    paddingVertical: 40,
  },
  emptyIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.surface3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyEmoji: {
    fontSize: 26,
  },
  emptyText: {
    fontSize: 14,
    color: colors.contentSecondary,
    textAlign: 'center',
    maxWidth: 280,
  },
  content: {
    gap: 20,
  },
  headerBlock: {
    gap: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.contentPrimary,
  },
  sectionDesc: {
    fontSize: 14,
    color: colors.contentTertiary,
  },
  stack: {
    gap: 14,
    alignItems: 'center',
  },
  card: {
    overflow: 'hidden',
    backgroundColor: colors.surface3,
  },
  cardImage: {
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  cardText: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 8,
    gap: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '900',
    lineHeight: 20,
    color: '#ffffff',
  },
  cardDate: {
    fontSize: 10,
    lineHeight: 10,
    fontWeight: '400',
    color: 'rgba(255,255,255,0.92)',
  },
})
