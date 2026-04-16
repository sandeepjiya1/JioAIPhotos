import { useState } from 'react'
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { TopBar } from '@/components/layout/TopBar'
import { colors } from '@/theme/colors'

const RECENT_SEARCHES = ['Birthday', 'Varanasi', 'Ruhi', 'Greetings'] as const

export interface SearchScreenProps {
  topBarTitle?: string
}

export default function SearchScreen({ topBarTitle = 'Search' }: SearchScreenProps) {
  const [query, setQuery] = useState('')

  return (
    <View style={styles.root}>
      <TopBar title={topBarTitle} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.inputShell}>
          <Text style={styles.searchGlyph} accessibilityElementsHidden>
            ⌕
          </Text>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search photos, people, places…"
            placeholderTextColor={colors.contentTertiary}
            style={styles.input}
            autoFocus
            returnKeyType="search"
            accessibilityLabel="Search"
          />
        </View>

        {query.trim() === '' ? (
          <View style={styles.recentBlock}>
            <Text style={styles.recentLabel}>Recent</Text>
            <View style={styles.chips}>
              {RECENT_SEARCHES.map((term) => (
                <Pressable
                  key={term}
                  onPress={() => setQuery(term)}
                  style={({ pressed }) => [styles.chip, pressed && styles.chipPressed]}
                >
                  <Text style={styles.chipText}>{term}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        ) : (
          <View style={styles.empty}>
            <View style={styles.emptyIcon}>
              <Text style={styles.emptyGlyph}>⌕</Text>
            </View>
            <Text style={styles.emptyText}>No results for &quot;{query.trim()}&quot;</Text>
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
    minHeight: 0,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 132,
  },
  inputShell: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(39,139,193,0.35)',
    backgroundColor: 'rgba(255,255,255,0.04)',
    paddingHorizontal: 12,
    minHeight: 52,
  },
  searchGlyph: {
    fontSize: 18,
    color: colors.contentSecondary,
  },
  input: {
    flex: 1,
    minWidth: 0,
    fontSize: 16,
    color: colors.contentPrimary,
    paddingVertical: 10,
  },
  recentBlock: {
    marginTop: 22,
    gap: 12,
  },
  recentLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.contentSecondary,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: colors.surface3,
  },
  chipPressed: {
    opacity: 0.85,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.contentPrimary,
  },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 56,
    gap: 16,
  },
  emptyIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.surface3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyGlyph: {
    fontSize: 28,
    color: colors.contentTertiary,
  },
  emptyText: {
    fontSize: 14,
    color: colors.contentSecondary,
    textAlign: 'center',
    paddingHorizontal: 24,
  },
})
