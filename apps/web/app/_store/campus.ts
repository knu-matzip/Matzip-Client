import { create } from 'zustand'
import { CampusType } from '@/_constants/campus'

type CampusStore = {
  campus: CampusType
  setCampus: (campus: CampusType) => void
}

export const useCampusStore = create<CampusStore>((set) => ({
  campus: 'singwan',
  setCampus: (campus: CampusType) => set({ campus: campus }),
}))
