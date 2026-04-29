import { StyleSheet, Text, View, Dimensions, useWindowDimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { TopBar } from '@/components/layout/TopBar'
import { homeBottomTabScrollPaddingBottom } from '@/components/layout/HomeBottomNav'
import { colors } from '@/theme/colors'

export interface TabPlaceholderScreenProps {
  title: string
  /** Extra line under the title (default explains native parity). */
  caption?: string | null
}

/** Parity with web `AppTabPlaceholderLayout`: TopBar + centered label. */
export function TabPlaceholderScreen({ title, caption }: TabPlaceholderScreenProps) {
  const insets = useSafeAreaInsets()
  const { width: winW } = useWindowDimensions()
  const ww = winW > 0 ? winW : Dimensions.get('window').width
  const sub =
    caption === null
      ? null
      : (caption ?? 'This area will match the web app as we finish the native port.')

  return (
    <View style={styles.root}>
      <TopBar title={title} />
      <View style={[styles.body, { paddingBottom: homeBottomTabScrollPaddingBottom(insets.bottom, ww) }]}>
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
