import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppHeader, HeroMomentCard, MediaCard, StorageBanner } from '@/components/organisms'
import { SectionHeader, StoryRing } from '@/components/molecules'
import {
  IPL_HOME_HERO_ALTS,
  IPL_HOME_HERO_IMAGES,
  IPL_HOME_LOGO_STRIP,
  IPL_HOME_TEAM_LABELS,
} from '@/lib/iplHeroHome'

/* ── Figma assets ─────────────────────────────────────────────────────────── */
const imgAvatar0 = '/assets/figma/6cd0e6362a73050667423418aae84ecb14f0f736.png'
const imgAvatar1 = '/assets/figma/973c3b8c0dd37d2ff37f9479e563cabfa2a227de.png'
const imgAvatar2 = '/assets/figma/c17c9682e3a8f521d6c87db31a79d22ed5cfb0eb.png'
const imgAvatar3 = '/assets/figma/5c60231921be44e81e983732d227140b2bc4ab2c.png'
const imgAvatar4 = '/assets/figma/defd24b0ba2543a683d1c21866cf1b5c65c558aa.png'

/* Memories — Figma Memories rail (488:9299) left → right */
const imgMem1 = '/assets/figma/939127241329aed177882aa617dc4b47d1e350c2.png'
const imgMem2 = '/assets/figma/9c3be8ec82a701547f20afe3432e1123d6e09a4a.png'
const imgMem3 = '/assets/figma/e5ed6df5cb304c15b0443f6e03cd8446e5b2b912.png'

/* Greetings — order: Holi → Good morning → Hanuman ji */
const imgGreetHoli = '/assets/figma/2e6ff07eac6f4148a03df5e6ae992fbdd23c2f3e.png'
const imgGreetGoodMorning = '/assets/figma/5c958752d2ada746764d0c855c950c6be3b8ad7a.png'
const imgGreetHanuman = '/assets/figma/hanumanji-greetings.png'

/* Trending — Figma TrendingPhotoLooks_Section (488:9337); middle tile crop → 488:9345 */
const imgTrend1 = '/assets/figma/657e248134a12fab651ac8e67bed14dc2f5e190a.png'
const imgTrend2 = '/assets/figma/d0dcd90132612641a0109cc9bb9b63ddd311016b.png'
const imgTrend3 = '/assets/figma/bb58655a57d80a328c43b89c58da982691332c16.png'

const imgTrend2FigmaCrop =
  'h-[115.79%] w-[158.61%] max-w-none object-cover -left-[37.04%] -top-[2.9%]'

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
  const [iplHeroIndex, setIplHeroIndex] = useState(0)

  return (
    <div className="flex flex-col w-full min-h-dvh bg-surface-0">
      <AppHeader
        avatarSrc={imgAvatar0}
        avatarFallback="U"
        trailingIcon="search"
        onNotification={() => navigate('/home/search')}
        onProfile={() => {}}
      />

      {/* Scrollable page content — bottom padding clears slim glass nav + protruding AI Camera orb */}
      <div className="flex-1 overflow-y-auto pb-36 scrollbar-hide">

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
            image={IPL_HOME_HERO_IMAGES[iplHeroIndex]}
            imageAlt={IPL_HOME_HERO_ALTS[iplHeroIndex]}
            iplTeamLogos={IPL_HOME_LOGO_STRIP}
            iplSelectedLogoIndex={iplHeroIndex}
            onIplLogoSelect={setIplHeroIndex}
            iplTeamLogoLabels={IPL_HOME_TEAM_LABELS}
          />
        </div>

        {/* Memories */}
        <section className="mt-6 px-4 flex flex-col gap-6">
          <SectionHeader title="Memories" variant="display" />
          <div className="flex gap-4 overflow-x-auto scrollbar-hide -mx-4 px-4">
            <MediaCard variant="memory" image={imgMem1} title={'Varanasi\ntrip'} date="20 June 2026" />
            <MediaCard variant="memory" image={imgMem2} title={"Ruhi's\nB'Day"} date="22 June 2026" />
            <MediaCard variant="memory" image={imgMem3} title={'Happy\nAnniversary'} date="29/June/2026" />
          </div>
          <p className="text-home-section-sub text-balance">
            Your photos and videos come together to watch and share anytime.
          </p>
        </section>

        {/* Greetings */}
        <section className="mt-6 px-4 flex flex-col gap-6">
          <SectionHeader title="Greetings" variant="display" />
          <div className="flex gap-4 overflow-x-auto scrollbar-hide -mx-4 px-4">
            <MediaCard variant="greeting" image={imgGreetHoli} />
            <MediaCard variant="greeting" image={imgGreetGoodMorning} />
            <MediaCard variant="greeting" image={imgGreetHanuman} />
          </div>
          <p className="text-home-section-sub text-balance">
            Get ready-to-share greetings for every day and every moment.
          </p>
        </section>

        {/* Trending photo looks */}
        <section className="mt-6 px-4 flex flex-col gap-4">
          <SectionHeader title="Trending photo looks" />
          <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-4 px-4">
            <MediaCard variant="trending" image={imgTrend1} />
            <MediaCard variant="trending" image={imgTrend2} imageClassName={imgTrend2FigmaCrop} />
            <MediaCard variant="trending" image={imgTrend3} />
          </div>
        </section>

        {/* Photos grid */}
        <section className="mt-6 px-4 flex flex-col gap-4">
          <SectionHeader title="Photos" />
          <div className="grid grid-cols-3 gap-1 rounded-image overflow-hidden">
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
          <p className="text-home-section-sub text-balance">Your photos safe with us</p>
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
