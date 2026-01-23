import Link from 'next/link'
import { CLIENT_PATH } from '@/_constants/path'
import { useCategoryQueries } from '@/_apis/queries/category'
import { Header } from '@repo/ui/components/Header'
import { SearchBar } from '@repo/ui/components/SearchBar'
import { Flex, VerticalScrollArea } from '@repo/ui/components/Layout'
import { Icon } from '@repo/ui/components/Icon'
import { Text } from '@repo/ui/components/Text'
import { Divider } from '@repo/ui/components/Divider'
import { HydrationBoundaryPage } from '@/_components/HydrationBoundaryPage'
import { Carousel } from '@repo/ui/components/Carousel'
import { Categories } from '@/_components/Categories'
import { BottomNavigation } from '@/_components/BottomNavigation'
import { RankingSection } from './_components/RankingSection'
import { CampusSelector } from './_components/CampusSelector'
import {
  FoodSlotMachineBanner,
  LuckyDrawBanner,
} from './_components/eventBanners'

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
      <SearchBar
        as={Link}
        href={CLIENT_PATH.PLACE_SEARCH}
        className={'mx-5 mb-5'}
      />
      <VerticalScrollArea className={'gap-4'}>
        <HydrationBoundaryPage
          prefetch={async (queryClient) => {
            await queryClient.prefetchQuery(useCategoryQueries.list())
          }}
        >
          <Categories />
        </HydrationBoundaryPage>
        <Carousel>
          <FoodSlotMachineBanner />
          <LuckyDrawBanner />
        </Carousel>
        <RankingSection
          title={'찜많은 맛집'}
          icon={'fireHeart'}
          rankingPlaceSort={'likes'}
        />
        <Divider />
        <RankingSection
          title={'오늘의 맛집'}
          icon={'fire'}
          rankingPlaceSort={'views'}
        />
      </VerticalScrollArea>
      <BottomNavigation />
    </>
  )
}
