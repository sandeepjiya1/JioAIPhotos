import { AppHeader, HeroMomentCard, MediaCard, StorageBanner } from '@/components/organisms'
import { SectionHeader, StoryRing } from '@/components/molecules'

/* ── Figma assets ─────────────────────────────────────────────────────────── */
const imgHero        = '/assets/figma/973c3b8c0dd37d2ff37f9479e563cabfa2a227de.png'
const imgHeroOverlay = '/assets/figma/c17c9682e3a8f521d6c87db31a79d22ed5cfb0eb.png'
const imgHeroTag     = '/assets/figma/be12d4260d4d66bf2dec1b208ca3099fe511e0da.png'

const imgAvatar0 = '/assets/figma/6cd0e6362a73050667423418aae84ecb14f0f736.png'
const imgAvatar1 = '/assets/figma/973c3b8c0dd37d2ff37f9479e563cabfa2a227de.png'
const imgAvatar2 = '/assets/figma/c17c9682e3a8f521d6c87db31a79d22ed5cfb0eb.png'
const imgAvatar3 = '/assets/figma/5c60231921be44e81e983732d227140b2bc4ab2c.png'
const imgAvatar4 = '/assets/figma/defd24b0ba2543a683d1c21866cf1b5c65c558aa.png'

const imgMem1   = '/assets/figma/9d6d5c6ff44924f668f3e336b96bd4380d7c1ec2.png'
const imgMem2   = '/assets/figma/705537c0d3b7be60ebf845f2184b6902e544f36e.png'
const imgGreet1 = '/assets/figma/2e155351b3c6de50454338cb8b24304fadf71ae7.png'
const imgGreet2 = '/assets/figma/a0354aeef93930d0e1ee44cc1bbc74f70bebb187.png'
const imgGreet3 = '/assets/figma/a506e2f729dc458b242fd0aa15182a5797f22294.png'
const imgTrend1 = '/assets/figma/341ab9dd02d861ee02055e75893b9a057df23021.png'
const imgTrend2 = '/assets/figma/b69e1f2044286b5156fd1d8b21a96c5656bdbd30.png'
const imgTrend3 = '/assets/figma/657e248134a12fab651ac8e67bed14dc2f5e190a.png'

const photoGrid = [
  '/assets/figma/5e18319f2a491e8950e8e7903851e0c43db912ab.png',
  '/assets/figma/939127241329aed177882aa617dc4b47d1e350c2.png',
  '/assets/figma/3f96c7e59b759adb3311f89c719da75feaca6a0c.png',
  '/assets/figma/49c1ec69ffc199a3c1886a818113552c623a18fe.png',
  '/assets/figma/80a7afb26cde0512ec08a60d2a1b2765396fabb4.png',
  '/assets/figma/74416f5acde65a0356ae4afadffc010a242e4de2.png',
  '/assets/figma/c29d63c27e7df36494d7f3aff59b372f9c9f583a.png',
  '/assets/figma/588e358e5eb2165638e4d156e06e5987b2b02be8.png',
  '/assets/figma/7e9e56a0b64002229e435b4ad7cbca2ea41af288.png',
]

const heroThumbnails = [imgMem1, imgMem2, imgGreet1, imgGreet2, imgGreet3, imgTrend1]

export function HomePage() {
  return (
    <div className="flex flex-col w-full min-h-dvh bg-surface-0">
      {/* Shared app header from AppLayout via AppHeader organism */}
      <AppHeader
        avatarSrc={imgAvatar0}
        avatarFallback="U"
        onNotification={() => {}}
        onProfile={() => {}}
      />

      {/* Scrollable page content — bottom padding for BottomNavBar */}
      <div className="flex-1 overflow-y-auto pb-24 scrollbar-hide">

        {/* Stories row */}
        <div className="px-4 py-2 overflow-x-auto scrollbar-hide">
          <div className="flex gap-3.5 w-max">
            <StoryRing isCreate label="Create" />
            <StoryRing image={imgAvatar1} label="Birthday"   hasNew />
            <StoryRing image={imgAvatar2} label="Motivation" hasNew />
            <StoryRing image={imgAvatar3} label="Anniversary" />
            <StoryRing image={imgAvatar4} label="Love" />
          </div>
        </div>

        {/* Hero moment card */}
        <div className="px-4 mt-2">
          <HeroMomentCard
            image={imgHero}
            overlayImage={imgHeroOverlay}
            tagImage={imgHeroTag}
            thumbnails={heroThumbnails}
          />
        </div>

        {/* Memories */}
        <section className="mt-6 px-4 flex flex-col gap-6">
          <SectionHeader
            title="Memories"
            variant="display"
            className="text-center"
          />
          <div className="flex gap-4 overflow-x-auto scrollbar-hide -mx-4 px-4">
            <MediaCard variant="memory" image={imgMem1} title={'Varanasi\ntrip'} date="20 June 2026" />
            <MediaCard variant="memory" image={imgMem2} title={"Ruhi's\nB'Day"} date="22 June 2026" />
          </div>
          <p className="text-content-tertiary text-sm text-center leading-snug">
            Your photos and videos come together to watch and share anytime.
          </p>
        </section>

        {/* Greetings */}
        <section className="mt-6 px-4 flex flex-col gap-6">
          <SectionHeader
            title="Greetings"
            variant="display"
            action={
              <button
                type="button"
                className="flex items-center gap-1.5 h-10 px-4 rounded-full glass text-content-primary text-sm font-bold"
              >
                Share
              </button>
            }
          />
          <div className="flex gap-4 overflow-x-auto scrollbar-hide -mx-4 px-4">
            <MediaCard variant="greeting" image={imgGreet1} />
            <MediaCard variant="greeting" image={imgGreet2} />
            <MediaCard variant="greeting" image={imgGreet3} />
          </div>
          <p className="text-content-tertiary text-sm text-center leading-snug">
            See yourself in your favourite movie style.
          </p>
        </section>

        {/* Trending photo looks */}
        <section className="mt-6 px-4 flex flex-col gap-4">
          <SectionHeader
            title="Trending photo looks"
            description="See and try the looks people are loving right now."
            action={
              <button type="button" className="text-on-tinted text-sm font-medium">
                See all
              </button>
            }
          />
          <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-4 px-4">
            <MediaCard variant="trending" image={imgTrend1} />
            <MediaCard variant="trending" image={imgTrend2} />
            <MediaCard variant="trending" image={imgTrend3} />
          </div>
        </section>

        {/* Photos grid */}
        <section className="mt-6 px-4 flex flex-col gap-4">
          <SectionHeader title="Photos" />
          <div className="grid grid-cols-3 gap-1 rounded-xl overflow-hidden">
            {photoGrid.map((src, i) => (
              <div key={i} className="relative aspect-square">
                <img src={src} alt="" className="absolute inset-0 size-full object-cover" />
                {i === photoGrid.length - 1 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-content-primary font-black text-lg">+216</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="text-content-tertiary text-sm text-center">Your photos are with us</p>
        </section>

        {/* Storage invite banner */}
        <div className="mt-6 mx-4">
          <StorageBanner used={14.2} total={50} />
        </div>

        <div className="h-4" />
      </div>
    </div>
  )
}
