import { HydrationBoundaryPage } from '@/HydrationBoundaryPage'
import { useCategoryQueries } from '@/_apis/queries/category'
import FoodSlotMachine from './FoodSlotMachine'
import { Header } from '@repo/ui/components/Header'
import { HeaderBackButton } from '@/_components/HeaderBackButton'

export const dynamic = 'force-dynamic'

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
