import type { ReactNode } from 'react'
import { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { colors } from '@/theme/colors'

export interface LanguageFlowLayoutProps {
  main: ReactNode
  footer: ReactNode
}

/** Pinned footer + scrollable main (parity with web `FlowViewportScreen`). */
export function LanguageFlowLayout({ main, footer }: LanguageFlowLayoutProps) {
  const insets = useSafeAreaInsets()
  const [footerH, setFooterH] = useState(260)

  return (
    <View style={[styles.root, { paddingTop: Math.max(insets.top, 8) }]}>
      <StatusBar style="light" />
      <ScrollView
        style={styles.flex}
        contentContainerStyle={[
          styles.scrollInner,
          { paddingBottom: footerH + 8 },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {main}
      </ScrollView>

      <View
        style={styles.footerDock}
        onLayout={(e) => setFooterH(Math.ceil(e.nativeEvent.layout.height))}
      >
        <View
          style={[
            styles.footerCard,
            {
              paddingBottom: Math.max(insets.bottom, 16),
            },
          ]}
        >
          {footer}
        </View>
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
  flex: {
    flex: 1,
    minHeight: 0,
  },
  scrollInner: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
  footerDock: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 20,
  },
  footerCard: {
    backgroundColor: 'transparent',
    paddingTop: 12,
    paddingHorizontal: 24,
  },
})
