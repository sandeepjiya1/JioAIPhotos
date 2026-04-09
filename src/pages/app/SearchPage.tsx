import { useState } from 'react'
import { TopBar } from '@/components/layout'
import { Input, Icon } from '@/components/atoms'

const RECENT_SEARCHES = ['Birthday', 'Varanasi', 'Ruhi', 'Greetings']

export interface SearchPageProps {
  /** Top bar title (e.g. AI Camera tab reuses this screen) */
  topBarTitle?: string
}

export function SearchPage({ topBarTitle = 'Search' }: SearchPageProps) {
  const [query, setQuery] = useState('')

  return (
    <div className="flex flex-col min-h-dvh bg-surface-0">
      <TopBar title={topBarTitle} />

      <div className="flex-1 overflow-y-auto pb-36 px-4 pt-4 scrollbar-hide">
        {/* Search input */}
        <Input
          placeholder="Search photos, people, places…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          leftIcon={<Icon name="search" size="sm" />}
          autoFocus
        />

        {query.trim() === '' && (
          /* Recent searches */
          <div className="mt-6 flex flex-col gap-3">
            <p className="text-content-secondary text-sm font-medium">Recent</p>
            <ul className="flex flex-wrap gap-2">
              {RECENT_SEARCHES.map((term) => (
                <li key={term}>
                  <button
                    type="button"
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 rounded-pill bg-surface-3 text-content-primary text-sm font-medium active:opacity-70 transition-opacity"
                  >
                    {term}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {query.trim() !== '' && (
          /* No results state (placeholder) */
          <div className="flex flex-col items-center justify-center gap-4 py-20">
            <div className="size-16 rounded-full bg-surface-3 flex items-center justify-center">
              <Icon name="search" size="lg" className="text-content-tertiary" />
            </div>
            <p className="text-content-secondary text-sm text-center">
              No results for &ldquo;{query}&rdquo;
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
