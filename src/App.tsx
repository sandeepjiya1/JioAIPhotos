import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppRouter } from './router'
import { OfflineBanner } from '@/components/shared/OfflineBanner'
import { UpdatePrompt } from '@/components/shared/UpdatePrompt'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Fills #root so auth screens get a stable height chain on first paint (mobile / PWA) */}
      <div className="flex min-h-0 min-h-svh min-h-dvh w-full flex-1 flex-col">
        <OfflineBanner />
        <div className="flex min-h-0 flex-1 flex-col">
          <AppRouter />
        </div>
        <UpdatePrompt />
      </div>
    </QueryClientProvider>
  )
}
