import { useEffect } from 'react'
import { View } from 'react-native'
import { useRouter } from 'expo-router'
import { useCreateSheetStore } from '@/store/createSheetStore'

/**
 * Deep link `/home/create` — open the create bottom sheet and return to Home tab shell.
 */
export default function CreateTabScreen() {
  const router = useRouter()
  const openSheet = useCreateSheetStore((s) => s.openSheet)

  useEffect(() => {
    openSheet()
    router.replace('/home')
  }, [openSheet, router])

  return <View style={{ width: 0, height: 0 }} />
}
