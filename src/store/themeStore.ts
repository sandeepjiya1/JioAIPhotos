import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export type ThemeAppearance = 'dark' | 'light'

interface ThemeState {
  /** Default: dark (Figma Journeys shell). */
  appearance: ThemeAppearance
  setAppearance: (appearance: ThemeAppearance) => void
  setLightModeEnabled: (enabled: boolean) => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      appearance: 'dark',
      setAppearance: (appearance) => set({ appearance }),
      setLightModeEnabled: (enabled) => set({ appearance: enabled ? 'light' : 'dark' }),
    }),
    {
      name: 'jioai-photos-theme',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ appearance: state.appearance }),
    },
  ),
)
