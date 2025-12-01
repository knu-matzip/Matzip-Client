import { CLIENT_PATH } from '@/_constants/path'
import { useCategoryQueries } from '@/_apis/queries/category'
import { Header } from '@repo/ui/components/Header'
import { SearchBar } from '@repo/ui/components/SearchBar'
import { Flex, VerticalScrollArea } from '@repo/ui/components/Layout'
import { Icon } from '@repo/ui/components/Icon'
import { Text } from '@repo/ui/components/Text'
import { Divider } from '@repo/ui/components/Divider'
import { RankingPlaceList } from '@/_components/RankingPlaceList'
import { HydrationBoundaryPage } from '@/HydrationBoundaryPage'
import { Banner } from '@repo/ui/components/Banner'
import { Categories } from '@/_components/Categories'
import { CampusSelector } from '@/_components/CampusSelector'
import { BottomNavigation } from '@/_components/BottomNavigation'
import {
  FoodSlotMachineBanner,
  LuckyDrawBanner,
} from '@/_components/eventBanners'

export const dynamic = 'force-dynamic'

export default function Page() {
  return (
    <>
      <Header
        left={
          <Flex className='gap-1'>
            <Icon type={'logo'} size={26} />
            <Text as={'h1'} variant={'heading1'}>
              맛집
            </Text>
          </Flex>
        }
        right={<CampusSelector />}
      />
      <SearchBar href={CLIENT_PATH.PLACE_SEARCH} className={'mx-5 mb-5'} />
      <VerticalScrollArea className={'gap-4'}>
        <HydrationBoundaryPage
          prefetch={async (queryClient) => {
            await queryClient.prefetchQuery(useCategoryQueries.list())
          }}
        >
          <Categories />
        </HydrationBoundaryPage>
        <Banner
          contents={[
            <FoodSlotMachineBanner key='banner-1' />,
            <LuckyDrawBanner key='banner-2' />,
          ]}
        />
        <RankingPlaceList
          title={'찜많은 맛집'}
          icon={'fireHeart'}
          rankingPlaceSort={'likes'}
        />
        <Divider />
        <RankingPlaceList
          title={'오늘의 맛집'}
          icon={'fire'}
          rankingPlaceSort={'views'}
        />
      </VerticalScrollArea>
      <BottomNavigation />
    </>
  )
}
