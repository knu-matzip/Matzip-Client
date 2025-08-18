import { HydrationBoundaryPage } from '@/HydrationBoundaryPage'
import { useCategoryQueries } from '@/_apis/queries/category'
import { CategoryDetailPage } from '@/categories/[id]/CategoryDetailPage'
import { usePlaceQueries } from '@/_apis/queries/place'

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params

  return (
    <HydrationBoundaryPage
      prefetch={async (queryClient) => {
        await queryClient.prefetchQuery(useCategoryQueries.list())
        await queryClient.prefetchQuery(usePlaceQueries.byCategory(id))
      }}
    >
      <CategoryDetailPage initId={id} />
    </HydrationBoundaryPage>
  )
}
export default Page
