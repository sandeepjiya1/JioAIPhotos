import type { ImageSourcePropType } from 'react-native'
import { Image, StyleSheet, View } from 'react-native'

const SLIDES: ImageSourcePropType[] = [
  require('../../../assets/onboarding/onboarding-slide-1.png'),
  require('../../../assets/onboarding/onboarding-slide-2.png'),
  require('../../../assets/onboarding/onboarding-slide-3.png'),
]

/** Same art as web `OnboardingPage`; PNGs ship with alpha (no black plate). */
export function OnboardingSlideArt({ index }: { index: number }) {
  const src = SLIDES[index % SLIDES.length]
  return (
    <View style={styles.root} accessibilityElementsHidden>
      <Image
        source={src}
        style={styles.img}
        resizeMode="contain"
        accessibilityIgnoresInvertColors
      />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: '100%',
    minHeight: 200,
    justifyContent: 'flex-end',
    alignItems: 'center',
    overflow: 'hidden',
  },
  img: {
    width: '100%',
    height: '100%',
    maxHeight: '100%',
  },
})
