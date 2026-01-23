import type { Metadata } from 'next'
import { usePlaceQueries } from '@/_apis/queries/place'
import { OnlyLeftHeader } from '@repo/ui/components/Header'
import { VerticalScrollArea } from '@repo/ui/components/Layout'
import { HydrationBoundaryPage } from '@/_components/HydrationBoundaryPage'
import { LikePlacesList } from './_components/LikePlacesList'
import { BottomNavigation } from '@/_components/BottomNavigation'

export const dynamic = 'force-dynamic'

const pageTitle = '찜 맛집'
const pageDescription = '내가 직접 고른 공주대 주변 찜 맛집 리스트!'

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
    <HydrationBoundaryPage
      prefetch={async (queryClient) => {
        await queryClient.prefetchQuery(usePlaceQueries.byLike())
      }}
    >
      <OnlyLeftHeader icon={'headerHeart'} name={'찜'} />
      <VerticalScrollArea className={'h-full gap-1.5 px-5'}>
        <LikePlacesList />
      </VerticalScrollArea>
      <BottomNavigation />
    </HydrationBoundaryPage>
  )
}

export default Page
