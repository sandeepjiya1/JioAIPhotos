import { Redirect } from 'expo-router'

/** Custom notification permission UI removed — deep links here go home. */
export default function NotificationPermissionRedirect() {
  return <Redirect href="/home" />
}
