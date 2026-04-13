import { useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib'
import { AppHeader, HeroMomentCard, MediaCard, StorageBanner } from '@/components/organisms'
import {
  IPL_HOME_HERO_ALTS,
  IPL_HOME_HERO_IMAGES,
  IPL_HOME_LOGO_STRIP,
  IPL_HOME_TEAM_LABELS,
} from '@/lib/iplHeroHome'
import { SectionHeader, StoryRing } from '@/components/molecules'
import {
  HOME_EASE,
  homeCardItem,
  homeCardStagger,
  homePhotoTile,
  homeStoryItem,
  homeStoryStagger,
} from '@/pages/app/homeAnimations'
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

function HomeScrollSection({
  children,
  className,
  reduceMotion,
}: {
  children: ReactNode
  className?: string
  reduceMotion: boolean
}) {
  return (
    <motion.section
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14, margin: '-40px 0px -32px 0px' }}
      transition={{ duration: 0.44, ease: HOME_EASE }}
    >
      {children}
    </motion.section>
  )
}

export function HomePage() {
  const navigate = useNavigate()
  const [iplHeroIndex, setIplHeroIndex] = useState(0)
  const reduceMotion = useReducedMotion() === true

  return (
    <div className="flex min-h-dvh w-full min-w-0 max-w-full flex-col bg-surface-0">
      <AppHeader
        avatarSrc={HOME_HEADER.avatarSrc}
        avatarFallback={HOME_HEADER.avatarFallback}
        trailingIcon="search"
        onNotification={() => navigate('/home/search')}
        onProfile={() => {}}
      />

      <div className="min-w-0 w-full max-w-full flex-1 overflow-y-auto pb-36 scrollbar-hide">
        <motion.div
          variants={homeStoryStagger}
          initial={reduceMotion ? false : 'hidden'}
          animate={reduceMotion ? undefined : 'show'}
          className={cn(
            'home-stories-scroll flex min-w-0 max-w-full flex-nowrap items-stretch gap-3.5',
            'overflow-x-auto overflow-y-hidden px-3.5 pb-[7px] pt-2 scrollbar-hide',
          )}
        >
          {HOME_STORY_RINGS.map((ring) => (
            <motion.div key={ring.id} variants={homeStoryItem} className="shrink-0">
              <StoryRing
                isCreate={ring.isCreate}
                label={ring.label}
                image={ring.image}
                hasNew={ring.hasNew}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-2 min-w-0 max-w-full overflow-x-visible px-4"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={reduceMotion ? false : { opacity: 1, y: 0 }}
          transition={{ duration: 0.42, ease: HOME_EASE, delay: reduceMotion ? 0 : 0.1 }}
        >
          <HeroMomentCard
            compact
            aspectClassName="aspect-square w-full min-h-0"
            image={IPL_HOME_HERO_IMAGES[iplHeroIndex]}
            imageAlt={IPL_HOME_HERO_ALTS[iplHeroIndex]}
            selectorStrip={{
              logos: IPL_HOME_LOGO_STRIP,
              selectedIndex: iplHeroIndex,
              onSelect: setIplHeroIndex,
              labels: [...IPL_HOME_TEAM_LABELS],
              listAriaLabel: 'IPL team themes',
            }}
          />
        </motion.div>

        <HomeScrollSection
          reduceMotion={reduceMotion}
          className="mt-6 flex flex-col gap-3 px-4"
        >
          <SectionHeader title={HOME_MEMORIES_SECTION.title} variant="heading" titleAs="h3" />
          <motion.div
            variants={homeCardStagger}
            initial={reduceMotion ? false : 'hidden'}
            whileInView={reduceMotion ? undefined : 'show'}
            viewport={{ once: true, amount: 0.2 }}
            className="flex gap-4 overflow-x-auto scrollbar-hide -mx-4 px-4"
          >
            {HOME_MEMORIES_SECTION.items.map((item) => (
              <motion.div key={item.id} variants={homeCardItem} className="shrink-0">
                <MediaCard
                  variant="memory"
                  image={item.image}
                  title={item.title}
                  date={item.date}
                />
              </motion.div>
            ))}
          </motion.div>
          {HOME_SHOW_SECTION_SUBTITLES && HOME_MEMORIES_SECTION.subtitle && (
            <p className="text-home-section-sub text-balance">{HOME_MEMORIES_SECTION.subtitle}</p>
          )}
        </HomeScrollSection>

        <HomeScrollSection
          reduceMotion={reduceMotion}
          className="mt-6 flex flex-col gap-3 px-4"
        >
          <SectionHeader title={HOME_GREETINGS_SECTION.title} variant="heading" titleAs="h3" />
          <motion.div
            variants={homeCardStagger}
            initial={reduceMotion ? false : 'hidden'}
            whileInView={reduceMotion ? undefined : 'show'}
            viewport={{ once: true, amount: 0.15 }}
            className="grid min-w-0 grid-cols-3 gap-2 overflow-x-hidden"
          >
            {HOME_GREETINGS_SECTION.items.map((item) => (
              <motion.div key={item.id} variants={homeCardItem} className="min-w-0">
                <MediaCard variant="greetingGrid" image={item.image} title={item.label} />
              </motion.div>
            ))}
          </motion.div>
          {HOME_SHOW_SECTION_SUBTITLES && HOME_GREETINGS_SECTION.subtitle && (
            <p className="text-home-section-sub text-balance">{HOME_GREETINGS_SECTION.subtitle}</p>
          )}
        </HomeScrollSection>

        <HomeScrollSection
          reduceMotion={reduceMotion}
          className="mt-6 flex flex-col gap-3 px-4"
        >
          <SectionHeader title={HOME_TRENDING_SECTION.title} variant="heading" titleAs="h3" />
          <motion.div
            variants={homeCardStagger}
            initial={reduceMotion ? false : 'hidden'}
            whileInView={reduceMotion ? undefined : 'show'}
            viewport={{ once: true, amount: 0.2 }}
            className="flex gap-3 overflow-x-auto scrollbar-hide -mx-4 px-4"
          >
            {HOME_TRENDING_SECTION.items.map((item) => (
              <motion.div key={item.id} variants={homeCardItem} className="shrink-0">
                <MediaCard
                  variant="trending"
                  image={item.image}
                  imageClassName={item.imageClassName}
                />
              </motion.div>
            ))}
          </motion.div>
        </HomeScrollSection>

        <HomeScrollSection
          reduceMotion={reduceMotion}
          className="mt-6 flex flex-col gap-3 px-4"
        >
          <SectionHeader title={HOME_PHOTOS_SECTION.title} variant="heading" titleAs="h3" />
          <motion.div
            variants={homeCardStagger}
            initial={reduceMotion ? false : 'hidden'}
            whileInView={reduceMotion ? undefined : 'show'}
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-3 gap-1 overflow-hidden rounded-image"
          >
            {HOME_PHOTOS_SECTION.items.map((tile) => (
              <motion.div key={tile.id} variants={homePhotoTile} className="relative aspect-square">
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
              </motion.div>
            ))}
          </motion.div>
          {HOME_SHOW_SECTION_SUBTITLES && HOME_PHOTOS_SECTION.subtitle && (
            <p className="text-home-section-sub text-balance">{HOME_PHOTOS_SECTION.subtitle}</p>
          )}
        </HomeScrollSection>

        <HomeScrollSection reduceMotion={reduceMotion} className="mt-6 mx-4">
          <StorageBanner used={HOME_STORAGE_BANNER.used} total={HOME_STORAGE_BANNER.total} />
        </HomeScrollSection>

        <div className="h-4" />
      </div>
    </div>
  )
}
