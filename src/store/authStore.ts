import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export type Language = 'en' | 'hi'

interface AuthState {
  isAuthenticated: boolean
  hasSeenOnboarding: boolean
  /** After combined gallery + notifications explainer; native prompts run from that screen only when user allows. */
  hasCompletedPermissionIntro: boolean
  selectedLanguage: Language
  phoneNumber: string | null

  setAuthenticated: (v: boolean) => void
  setHasSeenOnboarding: (v: boolean) => void
  setHasCompletedPermissionIntro: (v: boolean) => void
  setLanguage: (lang: Language) => void
  setPhone: (phone: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      hasSeenOnboarding: false,
      hasCompletedPermissionIntro: false,
      selectedLanguage: 'en',
      phoneNumber: null,

      setAuthenticated: (v) => set({ isAuthenticated: v }),
      setHasSeenOnboarding: (v) => set({ hasSeenOnboarding: v }),
      setHasCompletedPermissionIntro: (v) => set({ hasCompletedPermissionIntro: v }),
      setLanguage: (lang) => set({ selectedLanguage: lang }),
      setPhone: (phone) => set({ phoneNumber: phone }),
      logout: () =>
        set({
          isAuthenticated: false,
          hasSeenOnboarding: false,
          hasCompletedPermissionIntro: false,
          phoneNumber: null,
        }),
    }),
    {
      name: 'jioai-photos-auth',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        hasSeenOnboarding: state.hasSeenOnboarding,
        hasCompletedPermissionIntro: state.hasCompletedPermissionIntro,
        selectedLanguage: state.selectedLanguage,
        phoneNumber: state.phoneNumber,
      }),
    },
  ),
)
