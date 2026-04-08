import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, Theme, ViewMode } from '@/types'

interface AppState {
  user: User | null
  theme: Theme
  viewMode: ViewMode
  isOnline: boolean
  setUser: (user: User | null) => void
  setTheme: (theme: Theme) => void
  setViewMode: (mode: ViewMode) => void
  setOnline: (online: boolean) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      theme: 'dark',
      viewMode: 'grid',
      isOnline: navigator.onLine,
      setUser: (user) => set({ user }),
      setTheme: (theme) => set({ theme }),
      setViewMode: (viewMode) => set({ viewMode }),
      setOnline: (isOnline) => set({ isOnline }),
    }),
    {
      name: 'jioai-photos-app',
      partialize: (state) => ({
        theme: state.theme,
        viewMode: state.viewMode,
      }),
    },
  ),
)
