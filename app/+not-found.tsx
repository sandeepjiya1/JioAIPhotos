import { Pressable, StyleSheet, Text, View } from 'react-native'
import { router } from 'expo-router'
import { colors } from '@/theme/colors'

export default function NotFoundScreen() {
  return (
    <View style={styles.root}>
      <Text style={styles.title}>This screen does not exist.</Text>
      <Pressable style={styles.button} onPress={() => router.replace('/')}>
        <Text style={styles.buttonLabel}>Go to splash</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: colors.surface0,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    color: colors.contentPrimary,
  },
  button: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary600,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  buttonLabel: {
    color: colors.contentPrimary,
    fontSize: 15,
    fontWeight: '600',
  },
})
