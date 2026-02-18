import { addToast } from '@heroui/react'

interface OpenKakaoTaxiParams {
  latitude: number
  longitude: number
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
  placeName,
}: OpenKakaoTaxiParams): void => {
  // 카카오택시 딥링크 URL 스킴
  const appScheme = `kakaot://taxi?dest_lat=${latitude}&dest_lng=${longitude}&end_name=${encodeURIComponent(placeName || '목적지')}`

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

  if (isMobile) {
    // 모바일: 딥링크 시도
    window.location.href = appScheme

    // 앱이 설치되지 않은 경우를 대비한 타임아웃 (2.5초 후 스토어로 이동)
    setTimeout(() => {
      const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent)
      const storeUrl = isIOS
        ? 'https://apps.apple.com/kr/app/kakaotaxi/id981110422'
        : 'https://play.google.com/store/apps/details?id=com.kakao.taxi'

      window.location.href = storeUrl
    }, 2500)
  } else {
    addToast({
      title: '카카오택시 앱은 모바일에서만 이용 가능합니다.',
    })
  }
}
