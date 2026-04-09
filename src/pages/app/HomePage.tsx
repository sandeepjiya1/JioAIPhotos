import { useNavigate } from 'react-router-dom'
import { AppHeader, HeroMomentCard, MediaCard, StorageBanner } from '@/components/organisms'
import { SectionHeader, StoryRing } from '@/components/molecules'
import { IPL_TEAM_LOGO_PATHS } from '@/lib/iplTeamLogos'

/* ── Figma assets ─────────────────────────────────────────────────────────── */
const imgHero = '/assets/figma/ipl-hero-moment.png'
const imgAvatar0 = '/assets/figma/6cd0e6362a73050667423418aae84ecb14f0f736.png'
const imgAvatar1 = '/assets/figma/973c3b8c0dd37d2ff37f9479e563cabfa2a227de.png'
const imgAvatar2 = '/assets/figma/c17c9682e3a8f521d6c87db31a79d22ed5cfb0eb.png'
const imgAvatar3 = '/assets/figma/5c60231921be44e81e983732d227140b2bc4ab2c.png'
const imgAvatar4 = '/assets/figma/defd24b0ba2543a683d1c21866cf1b5c65c558aa.png'

/* Memories — Figma Memories_Section (488:9296) */
const imgMem1 = '/assets/figma/939127241329aed177882aa617dc4b47d1e350c2.png'
const imgMem2 = '/assets/figma/3f96c7e59b759adb3311f89c719da75feaca6a0c.png'
const imgMem3 = '/assets/figma/49c1ec69ffc199a3c1886a818113552c623a18fe.png'

/* Greetings — Figma Greetings_Section (488:9319), first three portrait slots */
const imgGreet1 = '/assets/figma/2e155351b3c6de50454338cb8b24304fadf71ae7.png'
const imgGreet2 = '/assets/figma/a0354aeef93930d0e1ee44cc1bbc74f70bebb187.png'
const imgGreet3 = '/assets/figma/a506e2f729dc458b242fd0aa15182a5797f22294.png'

/* Trending — Figma TrendingPhotoLooks_Section (488:9337) */
const imgTrend1 = '/assets/figma/657e248134a12fab651ac8e67bed14dc2f5e190a.png'
const imgTrend2 = '/assets/figma/d0dcd90132612641a0109cc9bb9b63ddd311016b.png'
const imgTrend3 = '/assets/figma/bb58655a57d80a328c43b89c58da982691332c16.png'

/* Photos grid — Figma Photos_Section (488:9353); last tile shows +216 over 7e9e56a0… */
const photoGrid = [
  '/assets/figma/b69e1f2044286b5156fd1d8b21a96c5656bdbd30.png',
  '/assets/figma/ba5499929917b59556aca9b4ac04748a9d601413.png',
  '/assets/figma/2f1009afcdf759e231a041ad0daafab2cff622d0.png',
  '/assets/figma/263f23cec5aa0022aa6b0a0858fd7a55f0cc68b9.png',
  '/assets/figma/a4cf20229701efce127d8f1db9b04fa938ab5fa9.png',
  '/assets/figma/5100247fb8aac48ecff86bb2e97b8dbbb989f11d.png',
  '/assets/figma/be35d34a24d15524a9c0126750ae432b82dab795.png',
  '/assets/figma/588e358e5eb2165638e4d156e06e5987b2b02be8.png',
  '/assets/figma/7e9e56a0b64002229e435b4ad7cbca2ea41af288.png',
]

export function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col w-full min-h-dvh bg-surface-0">
      <AppHeader
        avatarSrc={imgAvatar0}
        avatarFallback="U"
        trailingIcon="search"
        onNotification={() => navigate('/home/search')}
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
          <HeroMomentCard image={imgHero} iplTeamLogos={IPL_TEAM_LOGO_PATHS} />
        </div>

        {/* Memories */}
        <section className="mt-6 px-4 flex flex-col gap-6">
          <SectionHeader title="Memories" variant="display" titleAlign="center" />
          <div className="flex gap-4 overflow-x-auto scrollbar-hide -mx-4 px-4">
            <MediaCard variant="memory" image={imgMem1} title={'Varanasi\ntrip'} date="20 June 2026" />
            <MediaCard variant="memory" image={imgMem2} title={"Ruhi's\nB'Day"} date="22 June 2026" />
            <MediaCard variant="memory" image={imgMem3} title={'Happy\nAnniversary'} date="29/June/2026" />
          </div>
          <p className="text-content-tertiary text-sm text-center leading-snug">
            Your photos and videos come together to watch and share anytime.
          </p>
        </section>

        {/* Greetings */}
        <section className="mt-6 px-4 flex flex-col gap-6">
          <SectionHeader title="Greetings" variant="display" titleAlign="center" />
          <div className="flex gap-4 overflow-x-auto scrollbar-hide -mx-4 px-4">
            <MediaCard variant="greeting" image={imgGreet1} />
            <MediaCard variant="greeting" image={imgGreet2} />
            <MediaCard variant="greeting" image={imgGreet3} />
          </div>
          <p className="text-content-tertiary text-sm text-center leading-snug">
            See yourself in your favourite team jersey.
          </p>
        </section>

        {/* Trending photo looks */}
        <section className="mt-6 px-4 flex flex-col gap-4">
          <SectionHeader title="Trending photo looks" titleAlign="center" />
          <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-4 px-4">
            <MediaCard variant="trending" image={imgTrend1} />
            <MediaCard variant="trending" image={imgTrend2} />
            <MediaCard variant="trending" image={imgTrend3} />
          </div>
        </section>

        {/* Photos grid */}
        <section className="mt-6 px-4 flex flex-col gap-4">
          <SectionHeader title="Photos" titleAlign="center" />
          <div className="grid grid-cols-3 gap-1 rounded-xl overflow-hidden">
            {photoGrid.map((src, i) => (
              <div key={i} className="relative aspect-square">
                <img src={src} alt="" className="absolute inset-0 size-full object-cover" />
                {i === photoGrid.length - 1 && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5 bg-black/50 text-center text-white">
                    <span className="font-black text-xl leading-none">+216</span>
                    <span className="text-[8px] font-normal leading-none opacity-90">Photos</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="text-content-tertiary text-sm text-center">Your photos safe with us</p>
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
