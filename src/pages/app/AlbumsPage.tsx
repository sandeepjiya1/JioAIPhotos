import { TopBar } from '@/components/layout'
import { SectionHeader } from '@/components/molecules'

const MOCK_ALBUMS = [
  { id: '1', name: 'Varanasi Trip', photoCount: 42, cover: '/assets/figma/9d6d5c6ff44924f668f3e336b96bd4380d7c1ec2.png' },
  { id: '2', name: "Ruhi's B'Day",  photoCount: 28, cover: '/assets/figma/705537c0d3b7be60ebf845f2184b6902e544f36e.png' },
  { id: '3', name: 'Greetings',     photoCount: 15, cover: '/assets/figma/2e155351b3c6de50454338cb8b24304fadf71ae7.png' },
  { id: '4', name: 'Trending',      photoCount: 9,  cover: '/assets/figma/341ab9dd02d861ee02055e75893b9a057df23021.png' },
]

export function AlbumsPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-surface-0">
      <TopBar title="Albums" />

      <div className="flex-1 overflow-y-auto pb-24 px-4 pt-4 scrollbar-hide">
        <SectionHeader title="My Albums" description={`${MOCK_ALBUMS.length} albums`} className="mb-4" />

        {MOCK_ALBUMS.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center gap-4 py-20">
            <div className="size-16 rounded-full bg-surface-3 flex items-center justify-center">
              <span className="text-content-tertiary text-2xl">📷</span>
            </div>
            <p className="text-content-secondary text-sm text-center">
              No albums yet. Start by creating your first album.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {MOCK_ALBUMS.map((album) => (
              <button
                key={album.id}
                type="button"
                className="flex flex-col gap-2 rounded-2xl overflow-hidden bg-surface-2 active:opacity-80 transition-opacity text-left"
              >
                <div className="relative aspect-square w-full">
                  <img src={album.cover} alt={album.name} className="absolute inset-0 size-full object-cover" />
                </div>
                <div className="px-3 pb-3">
                  <p className="text-content-primary text-sm font-semibold truncate">{album.name}</p>
                  <p className="text-content-tertiary text-xs">{album.photoCount} photos</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
