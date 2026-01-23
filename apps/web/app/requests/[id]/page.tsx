import { RequestDetailPage } from './RequestDetailPage'
import { HydrationBoundaryPage } from '@/_components/HydrationBoundaryPage'
import { useRequestQueries } from '@/_apis/queries/request'

export const dynamic = 'force-dynamic'

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params

  return (
    <HydrationBoundaryPage
      prefetch={async (queryClient) => {
        await queryClient.prefetchQuery(useRequestQueries.detail(id))
      }}
    >
      <RequestDetailPage id={id} />
    </HydrationBoundaryPage>
  )
}

export default Page
