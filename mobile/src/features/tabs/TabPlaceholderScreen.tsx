import { StyleSheet, Text, View } from 'react-native'
import { TopBar } from '@/components/layout/TopBar'
import { colors } from '@/theme/colors'

export interface TabPlaceholderScreenProps {
  title: string
  /** Extra line under the title (default explains native parity). */
  caption?: string | null
}

/** Parity with web `AppTabPlaceholderLayout`: TopBar + centered label. */
export function TabPlaceholderScreen({ title, caption }: TabPlaceholderScreenProps) {
  const sub =
    caption === null
      ? null
      : (caption ?? 'This area will match the web app as we finish the native port.')

  return (
    <View style={styles.root}>
      <TopBar title={title} />
      <View style={styles.body}>
        <Text style={styles.title}>{title}</Text>
        {sub ? <Text style={styles.caption}>{sub}</Text> : null}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.surface0,
    minHeight: 0,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingBottom: 132,
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.contentSecondary,
    textAlign: 'center',
  },
  caption: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.contentTertiary,
    textAlign: 'center',
    maxWidth: 280,
  },
})
