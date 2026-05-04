import { useMemo } from 'react'
import { Dimensions, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import { router } from 'expo-router'
import { colors } from '@/theme/colors'
import { moderateSize } from '@/theme/layoutScale'

function makeNotFoundStyles(ww: number) {
  const ms = (n: number) => moderateSize(n, ww)
  return StyleSheet.create({
    root: {
      flex: 1,
      padding: ms(24),
      justifyContent: 'center',
      backgroundColor: colors.surface0,
    },
    title: {
      fontSize: ms(18),
      fontWeight: '600',
      marginBottom: ms(20),
      color: colors.contentPrimary,
    },
    button: {
      alignSelf: 'flex-start',
      backgroundColor: colors.primary600,
      paddingVertical: ms(12),
      paddingHorizontal: ms(16),
      borderRadius: ms(10),
    },
    buttonLabel: {
      color: colors.contentPrimary,
      fontSize: ms(15),
      fontWeight: '600',
    },
  })
}

export default function NotFoundScreen() {
  const { width: winW } = useWindowDimensions()
  const ww = winW > 0 ? winW : Dimensions.get('window').width
  const styles = useMemo(() => makeNotFoundStyles(ww), [ww])

  return (
    <View style={styles.root}>
      <Text style={styles.title}>This screen does not exist.</Text>
      <Pressable style={styles.button} onPress={() => router.replace('/')}>
        <Text style={styles.buttonLabel}>Go to splash</Text>
      </Pressable>
    </View>
  )
}
