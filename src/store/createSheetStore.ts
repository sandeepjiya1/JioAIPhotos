import { create } from 'zustand'

type CreateSheetState = {
  open: boolean
  openSheet: () => void
  closeSheet: () => void
}

export const useCreateSheetStore = create<CreateSheetState>((set) => ({
  open: false,
  openSheet: () => set({ open: true }),
  closeSheet: () => set({ open: false }),
}))
