import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppHeader, HeroMomentCard, MediaCard, StorageBanner } from '@/components/organisms'
import { SectionHeader, StoryRing } from '@/components/molecules'
import {
  HOME_GREETINGS_SECTION,
  HOME_HEADER,
  HOME_MEMORIES_SECTION,
  HOME_PHOTOS_SECTION,
  HOME_SHOW_SECTION_SUBTITLES,
  HOME_STORAGE_BANNER,
  HOME_STORY_RINGS,
  HOME_TRENDING_SECTION,
} from '@/data/homePageContent'
import {
  IPL_HOME_HERO_ALTS,
  IPL_HOME_HERO_IMAGES,
  IPL_HOME_LOGO_STRIP,
  IPL_HOME_TEAM_LABELS,
} from '@/lib/iplHeroHome'

export function HomePage() {
  const navigate = useNavigate()
  const [iplHeroIndex, setIplHeroIndex] = useState(0)

  return (
    <div className="flex flex-col w-full min-h-dvh bg-surface-0">
      <AppHeader
        avatarSrc={HOME_HEADER.avatarSrc}
        avatarFallback={HOME_HEADER.avatarFallback}
        trailingIcon="search"
        onNotification={() => navigate('/home/search')}
        onProfile={() => {}}
      />

      {/* Scrollable page content — bottom padding clears slim glass nav + protruding AI Camera orb */}
      <div className="flex-1 overflow-y-auto pb-36 scrollbar-hide">

        {/* Stories row */}
        <div className="px-4 py-2 overflow-x-auto scrollbar-hide">
          <div className="flex gap-3.5 w-max">
            {HOME_STORY_RINGS.map((ring) => (
              <StoryRing
                key={ring.id}
                isCreate={ring.isCreate}
                label={ring.label}
                image={ring.image}
                hasNew={ring.hasNew}
              />
            ))}
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

        <section className="mt-6 px-4 flex flex-col gap-3">
          <SectionHeader title={HOME_MEMORIES_SECTION.title} variant="heading" titleAs="h3" />
          <div className="flex gap-4 overflow-x-auto scrollbar-hide -mx-4 px-4">
            {HOME_MEMORIES_SECTION.items.map((item) => (
              <MediaCard
                key={item.id}
                variant="memory"
                image={item.image}
                title={item.title}
                date={item.date}
              />
            ))}
          </div>
          {HOME_SHOW_SECTION_SUBTITLES && HOME_MEMORIES_SECTION.subtitle && (
            <p className="text-home-section-sub text-balance">{HOME_MEMORIES_SECTION.subtitle}</p>
          )}
        </section>

        <section className="mt-6 px-4 flex flex-col gap-3">
          <SectionHeader title={HOME_GREETINGS_SECTION.title} variant="heading" titleAs="h3" />
          <div className="flex gap-4 overflow-x-auto scrollbar-hide -mx-4 px-4">
            {HOME_GREETINGS_SECTION.items.map((item) => (
              <MediaCard key={item.id} variant="greeting" image={item.image} />
            ))}
          </div>
          {HOME_SHOW_SECTION_SUBTITLES && HOME_GREETINGS_SECTION.subtitle && (
            <p className="text-home-section-sub text-balance">{HOME_GREETINGS_SECTION.subtitle}</p>
          )}
        </section>

        <section className="mt-6 px-4 flex flex-col gap-3">
          <SectionHeader title={HOME_TRENDING_SECTION.title} variant="heading" titleAs="h3" />
          <div className="flex gap-3 overflow-x-auto scrollbar-hide -mx-4 px-4">
            {HOME_TRENDING_SECTION.items.map((item) => (
              <MediaCard
                key={item.id}
                variant="trending"
                image={item.image}
                imageClassName={item.imageClassName}
              />
            ))}
          </div>
        </section>

        <section className="mt-6 px-4 flex flex-col gap-3">
          <SectionHeader title={HOME_PHOTOS_SECTION.title} variant="heading" titleAs="h3" />
          <div className="grid grid-cols-3 gap-1 rounded-image overflow-hidden">
            {HOME_PHOTOS_SECTION.items.map((tile) => (
              <div key={tile.id} className="relative aspect-square">
                <img src={tile.src} alt="" className="absolute inset-0 size-full object-cover" />
                {tile.morePhotosOverlay && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5 bg-black/50 text-center text-white">
                    <span className="font-black text-xl leading-none">
                      +{tile.morePhotosOverlay.count}
                    </span>
                    <span className="text-[8px] font-normal leading-none opacity-90">
                      {tile.morePhotosOverlay.unitLabel}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
          {HOME_SHOW_SECTION_SUBTITLES && HOME_PHOTOS_SECTION.subtitle && (
            <p className="text-home-section-sub text-balance">{HOME_PHOTOS_SECTION.subtitle}</p>
          )}
        </section>

        <div className="mt-6 mx-4">
          <StorageBanner used={HOME_STORAGE_BANNER.used} total={HOME_STORAGE_BANNER.total} />
        </div>

        <div className="h-4" />
      </div>
    </div>
  )
}
