import { toLatLng } from '@/map/_utils/toLatLng'
import getCurrentLocation from '@/map/_utils/getCurrentLocation'

/**
 * 지도 중심을 현재 위치로 이동시키는 훅
 * @param map 지도 객체
 */
export const useCenterMapToCurrentLocation = (map: naver.maps.Map | null) => {
  return async () => {
    if (!map) return
    try {
      const { latitude, longitude } = await getCurrentLocation()
      map.setCenter(toLatLng({ latitude, longitude }))
    } catch (e) {
      // TODO: 에러 처리
      console.error('Failed to set map center:', e)
    }
  }
}
