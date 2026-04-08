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
      <OfflineBanner />
      <AppRouter />
      <UpdatePrompt />
    </QueryClientProvider>
  )
}
