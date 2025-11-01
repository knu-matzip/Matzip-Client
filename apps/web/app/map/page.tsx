import { OnlyLeftHeader } from '@repo/ui/components/Header'
import { BottomNavigation } from '@/_components/BottomNavigation'
import { MapContainer } from './MapContainer'
import type { Metadata } from 'next'

const pageTitle = '주변 맛집'
const pageDescription = '지도로 내 근처 공주대 주변 맛집의 위치를 확인하세요.'

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    title: `${pageTitle} | 공주대 맛집`,
    description: pageDescription,
    locale: 'ko-KR',
    type: 'website',
  },
}

const Page = () => {
  return (
    <>
      <OnlyLeftHeader icon={'markerWithMap'} name={'주변 맛집'} />
      <MapContainer />
      <BottomNavigation />
    </>
  )
}
export default Page
