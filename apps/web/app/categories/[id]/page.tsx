import type { Metadata } from 'next'
import { HydrationBoundaryPage } from '@/_components/HydrationBoundaryPage'
import { useCategoryQueries } from '@/_apis/queries/category'
import { CategoryDetailPage } from '@/categories/[id]/CategoryDetailPage'
import { getCategories } from '@/_apis/services/category'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id: categoryId } = await params

  const data = await getCategories()
  const categoryName = data?.find(({ id }) => id === categoryId)?.name

  return {
    title: `${categoryName}`,
    description: `공주대학교 근처 ${categoryName} 맛집`,
    openGraph: {
      title: `공주대 맛집 | ${categoryName}`,
      description: `공주대학교 근처 ${categoryName} 맛집`,
      locale: 'ko-KR',
      type: 'website',
    },
  }
}

const Page = () => {
  return (
    <HydrationBoundaryPage
      prefetch={async (queryClient) => {
        await queryClient.prefetchQuery(useCategoryQueries.list())
      }}
    >
      <CategoryDetailPage />
    </HydrationBoundaryPage>
  )
}
export default Page
