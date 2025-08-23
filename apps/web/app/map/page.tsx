import { OnlyLeftHeader } from '@repo/ui/components/Header'
import { BottomNavigation } from '@/_components/BottomNavigation'
import { MapPage } from '@/map/MapPage'

const Page = () => {
  return (
    <>
      <OnlyLeftHeader icon={'markerWithMap'} name={'주변 맛집'} />
      <MapPage />
      <BottomNavigation />
    </>
  )
}
export default Page
