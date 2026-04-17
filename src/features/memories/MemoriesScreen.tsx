import { useMemo } from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { TopBar } from '@/components/layout/TopBar'
import { ResolvedImage } from '@/features/home/ResolvedImage'
import { HOME_MEMORIES_SECTION } from '@/features/home/homeContent'
import { colors } from '@/theme/colors'

const SECTION_PAD = 16
const MEM_H = 160

export default function MemoriesScreen() {
  const { width: winW } = useWindowDimensions()
  const cardW = useMemo(() => {
    const ww = winW > 0 ? winW : Dimensions.get('window').width
    return Math.min(284, Math.max(100, ww - SECTION_PAD * 2))
  }, [winW])

  return (
    <View style={styles.root}>
      <TopBar title="Memories" />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
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
                <View key={m.id} style={[styles.card, { width: cardW }]}>
                  <View style={[styles.cardImage, { height: MEM_H }]}>
                    <ResolvedImage
                      webPath={m.image}
                      style={StyleSheet.absoluteFillObject}
                      resizeMode="cover"
                    />
                    <LinearGradient
                      pointerEvents="none"
                      colors={['transparent', 'rgba(0,0,0,0.72)']}
                      locations={[0.38, 1]}
                      style={StyleSheet.absoluteFill}
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
  scrollContent: {
    paddingHorizontal: SECTION_PAD,
    paddingTop: 16,
    paddingBottom: 132,
  },
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
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: colors.surface3,
  },
  cardImage: {
    width: '100%',
    position: 'relative',
  },
  cardText: {
    position: 'absolute',
    left: 10,
    right: 10,
    bottom: 10,
    gap: 4,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '900',
    lineHeight: 22,
    color: colors.contentPrimary,
  },
  cardDate: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.contentPrimary,
  },
})
