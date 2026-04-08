import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Language = 'en' | 'hi'

interface AuthState {
  isAuthenticated: boolean
  hasSeenOnboarding: boolean
  selectedLanguage: Language
  phoneNumber: string | null

  setAuthenticated:     (v: boolean) => void
  setHasSeenOnboarding: (v: boolean) => void
  setLanguage:          (lang: Language) => void
  setPhone:             (phone: string) => void
  logout:               () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated:   false,
      hasSeenOnboarding: false,
      selectedLanguage:  'en',
      phoneNumber:       null,

      setAuthenticated:     (v)    => set({ isAuthenticated: v }),
      setHasSeenOnboarding: (v)    => set({ hasSeenOnboarding: v }),
      setLanguage:          (lang) => set({ selectedLanguage: lang }),
      setPhone:             (phone) => set({ phoneNumber: phone }),
      logout: () => set({
        isAuthenticated:   false,
        hasSeenOnboarding: false,
        phoneNumber:       null,
      }),
    }),
    {
      name: 'jioai-photos-auth',
      partialize: (state) => ({
        isAuthenticated:   state.isAuthenticated,
        hasSeenOnboarding: state.hasSeenOnboarding,
        selectedLanguage:  state.selectedLanguage,
        phoneNumber:       state.phoneNumber,
      }),
    },
  ),
)
