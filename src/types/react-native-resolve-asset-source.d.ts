/** Metro resolves this path; RN typings omit the internal module. */
declare module 'react-native/Libraries/Image/resolveAssetSource' {
  import type { ImageSourcePropType } from 'react-native'

  export default function resolveAssetSource(
    source: ImageSourcePropType | number,
  ): { width: number; height: number; scale?: number; uri?: string } | undefined
}
