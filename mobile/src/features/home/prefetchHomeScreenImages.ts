import { Image } from 'react-native'
import { resolveHomeImage } from '../../../assets/home/registry'
import { getHomeScreenImageWebPaths } from '@/features/home/homeScreenImagePaths'

function warmUri(uri: string): Promise<void> {
  return Image.prefetch(uri)
    .then(() => undefined)
    .catch(() => undefined)
    .then(() => {
      return new Promise<void>((resolve) => {
        Image.getSize(uri, () => resolve(), () => resolve())
      })
    })
}

/**
 * Warms decode/cache for every bundled home asset so the first real paint is not
 * a staggered pop-in. Uses `prefetch` where supported and `getSize` as a decode hint.
 */
export async function prefetchHomeScreenImages(): Promise<void> {
  const paths = getHomeScreenImageWebPaths()
  await Promise.all(
    paths.map((webPath) => {
      const src = resolveHomeImage(webPath)
      if (!src) return Promise.resolve()
      const { uri } = Image.resolveAssetSource(src)
      if (!uri) return Promise.resolve()
      return warmUri(uri)
    }),
  )
}
