import type { CSSProperties, SyntheticEvent } from 'react'
import type { ImageSourcePropType } from 'react-native'
import { useCallback, useMemo, useState } from 'react'
import {
  Image as RNImage,
  type LayoutChangeEvent,
  type ImageLoadEventData,
  type NativeSyntheticEvent,
  Platform,
  StyleSheet,
  View,
} from 'react-native'
// `Image` from `react-native` resolves to RN Web on web — it has no `resolveAssetSource`. Use the
// core resolver so module-scope aspect math and web `<img>` URIs work on every platform.
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource'

const SLIDES: ImageSourcePropType[] = [
  require('../../../assets/onboarding/onboarding-slide-1.png'),
  require('../../../assets/onboarding/onboarding-slide-2.png'),
  require('../../../assets/onboarding/onboarding-slide-3.png'),
  require('../../../assets/onboarding/onboarding-slide-4.png'),
]

/** Slides 1–3: Figma JioAIPhotos Journeys nodes 683:15351, 683:15374, 683:15397 (see scripts/onboarding-slide-{1,2,3}-figma-art.html). Regenerate 910×1024 PNGs: npm run onboarding:slides-1-3:figma-art (Chrome), or npm run figma:onboarding-slides-1-3 with FIGMA_ACCESS_TOKEN. */
/** Fallback if Metro has not registered dimensions yet. */
const FALLBACK_ASPECT_WH = 910 / 1024

function aspectFromRegistry(source: ImageSourcePropType): number {
  const r = resolveAssetSource(source as number)
  if (r?.width && r?.height && r.height > 0) return r.width / r.height
  return FALLBACK_ASPECT_WH
}

const SLIDE_ASPECT_WH: number[] = SLIDES.map(aspectFromRegistry)

function fitContain(boxW: number, boxH: number, aspectWH: number) {
  if (boxW <= 0 || boxH <= 0) return { width: 0, height: 0 }
  const heightIfFullWidth = boxW / aspectWH
  if (heightIfFullWidth <= boxH) {
    return { width: boxW, height: heightIfFullWidth }
  }
  return { width: boxH * aspectWH, height: boxH }
}

function resolveWebImageUri(source: ImageSourcePropType): string | undefined {
  const r = resolveAssetSource(source as number)
  const u = r?.uri
  if (typeof u === 'string' && u.length > 0) return u
  return undefined
}

/**
 * Slide 4 art was historically exported at 360×405 while Figma layers bleed lower (negative inset
 * on avatars), so the PNG was clipped. Regenerate with `npm run onboarding:slide-4:figma-art`
 * (Figma Desktop open) or `npm run figma:onboarding-slide-4` (FIGMA_ACCESS_TOKEN).
 *
 * RN Web’s `Image` wraps content in `overflow: hidden` + background-image; on web we use a real
 * `<img>` + `object-fit: contain` when a URI is available.
 *
 * Baked-in journey canvas (`#001D2E`-ish) in the slide PNGs is cleared to alpha with
 * `npm run onboarding:knockout-bg` (re-run after re-exporting art from Figma).
 */
export function OnboardingSlideArt({ index }: { index: number }) {
  const src = SLIDES[index % SLIDES.length]!
  const registryAspect = SLIDE_ASPECT_WH[index % SLIDE_ASPECT_WH.length]!
  const [intrinsic, setIntrinsic] = useState<{ w: number; h: number } | null>(null)
  const [box, setBox] = useState({ w: 0, h: 0 })

  const aspectWH = intrinsic ? intrinsic.w / intrinsic.h : registryAspect

  const onRootLayout = useCallback((e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout
    setBox((prev) =>
      prev.w === width && prev.h === height ? prev : { w: width, h: height },
    )
  }, [])

  const onImageLoad = useCallback(
    (e: NativeSyntheticEvent<ImageLoadEventData>) => {
      const s = e.nativeEvent.source
      if (s.width > 0 && s.height > 0) {
        setIntrinsic((prev) =>
          prev?.w === s.width && prev?.h === s.height ? prev : { w: s.width, h: s.height },
        )
      }
    },
    [],
  )

  const onWebImgLoad = useCallback((e: SyntheticEvent<HTMLImageElement>) => {
    const el = e.currentTarget
    if (el.naturalWidth > 0 && el.naturalHeight > 0) {
      setIntrinsic((prev) =>
        prev?.w === el.naturalWidth && prev?.h === el.naturalHeight
          ? prev
          : { w: el.naturalWidth, h: el.naturalHeight },
      )
    }
  }, [])

  const imgSize = useMemo(
    () => fitContain(box.w, box.h, aspectWH),
    [box.w, box.h, aspectWH],
  )

  const webUri = Platform.OS === 'web' ? resolveWebImageUri(src) : undefined

  return (
    <View
      style={styles.root}
      onLayout={onRootLayout}
      accessibilityElementsHidden
    >
      {imgSize.width > 0 && imgSize.height > 0 ? (
        webUri ? (
          <img
            alt=""
            src={webUri}
            draggable={false}
            onLoad={onWebImgLoad}
            style={
              {
                width: imgSize.width,
                height: imgSize.height,
                objectFit: 'contain',
                display: 'block',
                pointerEvents: 'none',
              } satisfies CSSProperties
            }
          />
        ) : (
          <RNImage
            source={src}
            style={{ width: imgSize.width, height: imgSize.height, overflow: 'visible' }}
            resizeMode="contain"
            accessibilityIgnoresInvertColors
            onLoad={onImageLoad}
          />
        )
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    minHeight: 200,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
    backgroundColor: 'transparent',
  },
})
