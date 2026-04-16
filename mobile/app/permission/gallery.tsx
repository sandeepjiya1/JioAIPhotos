import { Redirect } from 'expo-router'

/** Custom gallery permission UI removed — deep links here go home. */
export default function GalleryPermissionRedirect() {
  return <Redirect href="/home" />
}
