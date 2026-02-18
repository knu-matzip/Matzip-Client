import { addToast } from '@heroui/react'
import { openDeepLink } from '../openDeepLink'
import { isMobileDevice, isIOSDevice } from '../device'
import { Coord } from '@/map/_utils/toLatLng'

interface OpenKakaoTaxiParams extends Coord {
  placeName?: string
}

/**
 * 카카오택시 앱으로 특정 목적지를 설정하는 딥링크 함수
 * - 모바일: 카카오택시 앱이 설치되어 있으면 앱 실행, 없으면 앱스토어로 이동
 * - 데스크톱: 카카오택시 앱은 모바일 전용이므로 토스트 메시지로 안내
 */
export const openKakaoTaxi = ({
  latitude,
  longitude,
  placeName = '목적지',
}: OpenKakaoTaxiParams): void => {
  if (isMobileDevice()) {
    const urls = buildKakaoTaxiUrls({ latitude, longitude }, placeName)
    openDeepLink({ appScheme: urls.app, fallbackUrl: urls.store })
  } else {
    addToast({
      title: '카카오택시 앱은 모바일에서만 이용 가능합니다.',
    })
  }
}

const buildKakaoTaxiUrls = (coords: Coord, placeName: string) => ({
  app: `kakaot://taxi?dest_lat=${coords.latitude}&dest_lng=${coords.longitude}&end_name=${encodeURIComponent(placeName)}`,
  store: isIOSDevice()
    ? 'https://apps.apple.com/kr/app/kakaotaxi/id981110422'
    : 'https://play.google.com/store/apps/details?id=com.kakao.taxi',
})
