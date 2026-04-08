import { TopBar } from '@/components/layout'
import { Skeleton } from '@/components/atoms'
import { SectionHeader } from '@/components/molecules'
import { MediaCard } from '@/components/organisms'

const MOCK_MEMORIES = [
  { id: '1', image: '/assets/figma/9d6d5c6ff44924f668f3e336b96bd4380d7c1ec2.png', title: 'Varanasi\ntrip', date: '20 June 2026' },
  { id: '2', image: '/assets/figma/705537c0d3b7be60ebf845f2184b6902e544f36e.png', title: "Ruhi's\nB'Day", date: '22 June 2026' },
]

const isLoading = false

export function MemoriesPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-surface-0">
      <TopBar title="Memories" />

      <div className="flex-1 overflow-y-auto pb-24 px-4 pt-4 scrollbar-hide">
        {isLoading ? (
          /* Skeleton loading state */
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-2xl" />
            ))}
          </div>
        ) : MOCK_MEMORIES.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center gap-4 py-20">
            <div className="size-16 rounded-full bg-surface-3 flex items-center justify-center">
              <span className="text-content-tertiary text-2xl">🕐</span>
            </div>
            <p className="text-content-secondary text-sm text-center">
              No memories yet. They'll appear here automatically.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <SectionHeader title="Your Memories" description="Relive your best moments" />
            <div className="flex flex-wrap gap-4">
              {MOCK_MEMORIES.map((m) => (
                <MediaCard
                  key={m.id}
                  variant="memory"
                  image={m.image}
                  title={m.title}
                  date={m.date}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
