import * as MediaLibrary from 'expo-media-library'
import * as Notifications from 'expo-notifications'

/**
 * Triggers OS permission dialogs (no custom UI). Safe to call multiple times;
 * the system no-ops or returns current status if already decided.
 */
export async function requestMediaLibraryAndNotifications(): Promise<void> {
  try {
    await MediaLibrary.requestPermissionsAsync()
  } catch {
    /* unsupported / denied */
  }
  try {
    await Notifications.requestPermissionsAsync()
  } catch {
    /* unsupported / denied */
  }
}
