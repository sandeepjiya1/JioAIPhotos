import type { ReactNode } from 'react'
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { colors } from '@/theme/colors'

export interface AuthLayoutProps {
  children: ReactNode
  footerSlot?: ReactNode
  /** Lifts footer with keyboard on login / OTP style screens */
  keyboardAwareFooter?: boolean
}

export function AuthLayout({ children, footerSlot, keyboardAwareFooter }: AuthLayoutProps) {
  const insets = useSafeAreaInsets()

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={insets.top}
      >
        <ScrollView
          style={styles.flex}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingHorizontal: 24, paddingBottom: footerSlot ? 16 : Math.max(insets.bottom, 24) },
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>

        {footerSlot ? (
          <View
            style={[
              styles.footer,
              {
                paddingBottom: keyboardAwareFooter ? 12 : Math.max(insets.bottom, 16),
                paddingTop: 8,
              },
            ]}
          >
            {footerSlot}
          </View>
        ) : null}
      </KeyboardAvoidingView>
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
  scrollContent: {
    flexGrow: 1,
    paddingTop: 8,
  },
  footer: {
    paddingHorizontal: 24,
    backgroundColor: colors.surface0,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(255,255,255,0.08)',
    gap: 16,
  },
})
