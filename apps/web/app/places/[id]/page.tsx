import type { Metadata } from 'next'
import { usePlaceQueries } from '@/_apis/queries/place'
import { HydrationBoundaryPage } from '@/HydrationBoundaryPage'
import { PlaceDetailPage } from './PlaceDetailPage'
import { getPlaceDetail } from '@/_apis/services/place'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params

  const data = await getPlaceDetail(id)
  const { placeName } = data
  const pageDescription = `공주대학교 근처 ${placeName} 맛집 상세 정보`

  return {
    title: `${placeName}`,
    description: pageDescription,
    openGraph: {
      title: `공주대 맛집 | ${placeName}`,
      description: pageDescription,
      locale: 'ko-KR',
      type: 'website',
    },
  }
}

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params

  return (
    <HydrationBoundaryPage
      prefetch={async (queryClient) => {
        await queryClient.prefetchQuery(usePlaceQueries.detail(id))
      }}
    >
      <PlaceDetailPage id={id} />
    </HydrationBoundaryPage>
  )
}

export default Page
