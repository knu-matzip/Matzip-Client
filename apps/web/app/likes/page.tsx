import { usePlaceQueries } from '@/_apis/queries/place'
import { OnlyLeftHeader } from '@repo/ui/components/Header'
import { VerticalScrollArea } from '@repo/ui/components/Layout'
import { HydrationBoundaryPage } from '@/HydrationBoundaryPage'
import { LikePlacesList } from './_components/LikePlacesList'

const Page = () => {
  return (
    <HydrationBoundaryPage
      prefetch={async (queryClient) => {
        await queryClient.prefetchQuery(usePlaceQueries.byLike())
      }}
    >
      <OnlyLeftHeader icon={'headerHeart'} name={'찜'} />
      <VerticalScrollArea className={'gap-1.5 px-5'}>
        <LikePlacesList />
      </VerticalScrollArea>
    </HydrationBoundaryPage>
  )
}

export default Page
