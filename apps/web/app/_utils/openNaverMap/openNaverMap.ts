import { openDeepLink } from '../openDeepLink'

interface OpenNaverMapParams {
  latitude: number
  longitude: number
  placeName?: string
}

/**
 * 네이버 지도 앱으로 특정 위치를 여는 딥링크 함수
 * - 모바일: 네이버 지도 앱이 설치되어 있으면 앱 실행, 없으면 웹으로 이동
 * - 데스크톱: 네이버 지도 웹 페이지로 이동
 */
export const openNaverMap = ({
  latitude,
  longitude,
  placeName,
}: OpenNaverMapParams): void => {
  // 네이버 지도 URL 스킴 (앱)
  const appScheme = `nmap://place?lat=${latitude}&lng=${longitude}&name=${encodeURIComponent(placeName || '위치')}`
  // 네이버 지도 웹 URL (폴백)
  const webUrl = `https://map.naver.com/p/search/${encodeURIComponent(placeName || '')}?c=${longitude},${latitude},18,0,0,0,dh`

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

  if (isMobile) {
    openDeepLink({ appScheme, fallbackUrl: webUrl })
  } else {
    // 데스크톱: 웹 페이지로 바로 이동
    window.open(webUrl, '_blank')
  }
}
