import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { router } from 'expo-router'
import { ResolvedImage } from '@/features/home/ResolvedImage'
import { HOME_STORY_RINGS } from '@/features/home/homeContent'
import { colors } from '@/theme/colors'

export function HomeStoryRow() {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scroll}
      accessibilityRole="scrollbar"
    >
      {HOME_STORY_RINGS.map((ring) => (
        <Pressable
          key={ring.id}
          accessibilityRole="button"
          accessibilityLabel={ring.label}
          onPress={() => {
            if (ring.isCreate) router.push('/home/create')
          }}
          style={({ pressed }) => [styles.cell, pressed && styles.pressed]}
        >
          <View style={styles.ringCol}>
            <View
              style={[
                styles.ringOuter,
                ring.hasNew ? styles.ringNew : styles.ringIdle,
              ]}
            >
              <View style={styles.ringInner}>
                {ring.isCreate ? (
                  <View style={styles.createFace}>
                    <Text style={styles.plus}>+</Text>
                  </View>
                ) : (
                  <ResolvedImage
                    webPath={ring.image ?? ''}
                    style={styles.avatar}
                    resizeMode="cover"
                  />
                )}
              </View>
            </View>
          </View>
          <Text style={styles.label} numberOfLines={1}>
            {ring.label}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  )
}

const RING = 54

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: 14,
    paddingTop: 8,
    paddingBottom: 4,
    gap: 14,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  cell: {
    width: 64,
    alignItems: 'stretch',
  },
  pressed: {
    opacity: 0.75,
  },
  ringCol: {
    alignItems: 'center',
    paddingBottom: 7,
  },
  ringOuter: {
    borderRadius: 999,
    padding: 2,
  },
  ringNew: {
    borderWidth: 2,
    borderColor: colors.jioTeal,
    backgroundColor: 'transparent',
  },
  ringIdle: {
    borderWidth: 1,
    borderColor: 'rgba(39,139,193,0.35)',
    backgroundColor: 'transparent',
  },
  ringInner: {
    width: RING,
    height: RING,
    borderRadius: RING / 2,
    overflow: 'hidden',
    backgroundColor: colors.surface0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createFace: {
    width: '100%',
    height: '100%',
    borderRadius: RING / 2,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'rgba(39,139,193,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plus: {
    fontSize: 22,
    fontWeight: '300',
    color: colors.contentSecondary,
    marginTop: -2,
  },
  /** Explicit size so `cover` always has a bounded box (matches ring inner 54×54). */
  avatar: {
    width: RING,
    height: RING,
    borderRadius: RING / 2,
  },
  label: {
    marginTop: 2,
    textAlign: 'center',
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '400',
    color: colors.contentPrimary,
  },
})
