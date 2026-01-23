import type { Metadata } from 'next'
import { HydrationBoundaryPage } from '@/_components/HydrationBoundaryPage'
import { useCategoryQueries } from '@/_apis/queries/category'
import FoodSlotMachine from './FoodSlotMachine'
import { Header } from '@repo/ui/components/Header'
import { HeaderBackButton } from '@/_components/HeaderBackButton'

export const dynamic = 'force-dynamic'

const pageTitle = '오늘 뭐 먹지?'
const pageDescription =
  "선택 장애가 고민인가요? '오늘 뭐 먹지?' 슬롯머신으로 공주대 근처 맛집 메뉴를 추천받아보세요!"

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    title: `공주대 맛집 | ${pageTitle}`,
    description: pageDescription,
    locale: 'ko-KR',
    type: 'website',
  },
}

const Page = async () => {
  return (
    <>
      <Header left={<HeaderBackButton />} />
      <HydrationBoundaryPage
        prefetch={async (queryClient) => {
          await queryClient.prefetchQuery(useCategoryQueries.list())
        }}
      >
        <FoodSlotMachine />
      </HydrationBoundaryPage>
    </>
  )
}
export default Page
