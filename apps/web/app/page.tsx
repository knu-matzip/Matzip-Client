import { CLIENT_PATH } from '@/_constants/path'
import { useCategoryQueries } from '@/_apis/queries/category'
import { usePlaceQueries } from '@/_apis/queries/place'
import { HydrationBoundaryPage } from '@/HydrationBoundaryPage'
import { Categories } from '@/_components/Categories'
import { BottomNavigation } from '@/_components/BottomNavigation'
import { OnlyLeftHeader } from '@repo/ui/components/Header'
import { SearchBar } from '@repo/ui/components/SearchBar'
import { Column } from '@repo/ui/components/Layout'
import { Banner } from '@/_components/Banner'
import {
  MostLikedPlaces,
  MostViewsPlaces,
} from '@/_components/RankingPlaceList'
import { Divider } from '@repo/ui/components/Divider'

export default function Page() {
  return (
    <HydrationBoundaryPage
      prefetch={async (queryClient) => {
        await queryClient.prefetchQuery(useCategoryQueries.list())
        await queryClient.prefetchQuery(usePlaceQueries.rankingList('likes'))
        await queryClient.prefetchQuery(usePlaceQueries.rankingList('views'))
      }}
    >
      <OnlyLeftHeader icon={'logo'} name={'맛집'} />
      <SearchBar href={CLIENT_PATH.PLACE_SEARCH} className={'mx-5 mb-5'} />
      <Column className={'scrollbar-hide gap-4 overflow-auto'}>
        <Categories />
        <Banner contents={[1, 2, 3, 4]} />
        <MostLikedPlaces />
        <Divider />
        <MostViewsPlaces />
      </Column>
      <BottomNavigation />
    </HydrationBoundaryPage>
  )
}
