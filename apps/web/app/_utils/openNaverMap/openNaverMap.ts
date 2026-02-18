import { openDeepLink } from '../openDeepLink'
import { isMobileDevice } from '../device'
import { Coord } from '@/map/_utils/toLatLng'

interface OpenNaverMapParams extends Coord {
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
  placeName = '공주대학교',
}: OpenNaverMapParams): void => {
  const urls = buildNaverMapUrls({ latitude, longitude }, placeName)

  if (isMobileDevice()) {
    openDeepLink({ appScheme: urls.app, fallbackUrl: urls.web })
  } else {
    // 데스크톱: 웹 페이지로 바로 이동
    window.open(urls.web, '_blank')
  }
}

const buildNaverMapUrls = (coords: Coord, placeName: string) => ({
  app: `nmap://place?lat=${coords.latitude}&lng=${coords.longitude}&name=${encodeURIComponent(placeName)}&appname=com.matzip`,
  web: `https://map.naver.com/p/search/${encodeURIComponent(placeName)}?c=${coords.longitude},${coords.latitude},18,0,0,0,dh`,
})
