import { create } from 'zustand'
import { Coord } from '@/map/_utils/toLatLng'

type LastMapCenter = {
  lastMapCenter: Coord | null
  setLastMapCenter: (mapCenter: Coord) => void
}

export const useLastMapCenterStore = create<LastMapCenter>((set) => ({
  lastMapCenter: null,
  setLastMapCenter: (mapCenter: Coord) => set({ lastMapCenter: mapCenter }),
}))
