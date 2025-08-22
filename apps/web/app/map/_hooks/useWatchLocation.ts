import { useEffect, useState } from 'react'
import geolocationErrorMessage from '../_utils/geolocationErrorMessage'

/**
 * 브라우저의 Geolocation API를 활용해 사용자의 위치를 실시간으로 추적하는 커스텀 훅.
 *
 * @returns {{ userLocation: GeolocationCoordinates | undefined }}
 * 현재 사용자의 위치 좌표(`latitude`, `longitude` 등)를 반환.
 * 위치가 아직 확인되지 않은 경우 `undefined` 반환.
 *
 * @example
 * ```tsx
 * const { userLocation } = useWatchLocation({ highAccuracy: true, updateInterval: 10000 });
 * ```
 */
export const useWatchLocation = (): {
  userLocation: GeolocationCoordinates | undefined
} => {
  const [location, setLocation] = useState<GeolocationCoordinates>()

  useEffect(() => {
    if (!navigator.geolocation) {
      console.log('Geolocation is not supported by your browser')
      // Todo: 예외 처리 하기
      return
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => setLocation(position.coords),
      (error) => {
        const errorMessage = geolocationErrorMessage(error.code, error.message)
        console.error(errorMessage)
      },
      {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 10000,
      },
    )

    return () => navigator.geolocation.clearWatch(watchId)
  }, [])

  return { userLocation: location }
}
