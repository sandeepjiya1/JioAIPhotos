import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

/** Home hero under “Your AI Avatars” — Profile → Homepage Options. */
export type HomeHeroVariant = 'legacy' | 'option1'

interface HomePreferencesState {
  homeHeroVariant: HomeHeroVariant
  setHomeHeroVariant: (v: HomeHeroVariant) => void
  /** Toggle helper for Profile switch (Option 1 on = Figma `1305:22351`). */
  setHomeHeroOption1Enabled: (enabled: boolean) => void
}

export const useHomePreferencesStore = create<HomePreferencesState>()(
  persist(
    (set) => ({
      /** Default: new Figma rail (`1305:22351`). Turn off in Profile to restore IPL backup. */
      homeHeroVariant: 'option1',
      setHomeHeroVariant: (homeHeroVariant) => set({ homeHeroVariant }),
      setHomeHeroOption1Enabled: (enabled) => set({ homeHeroVariant: enabled ? 'option1' : 'legacy' }),
    }),
    {
      name: 'jioai-photos-home-prefs',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ homeHeroVariant: state.homeHeroVariant }),
    },
  ),
)
