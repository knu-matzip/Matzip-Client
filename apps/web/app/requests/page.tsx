import { Header } from '@repo/ui/components/Header'
import { HeaderBackButton } from '@/_components/HeaderBackButton'
import { Flex } from '@repo/ui/components/Layout'
import { Icon } from '@repo/ui/components/Icon'
import { Text } from '@repo/ui/components/Text'

import { useRequestQueries } from '@/_apis/queries/request'
import { HydrationBoundaryPage } from '@/HydrationBoundaryPage'
import { RequestPlacesList } from './_components/RequestPlacesList'

export const dynamic = 'force-dynamic'

const Page = async () => {
  return (
    <HydrationBoundaryPage
      prefetch={async (queryClient) => {
        await queryClient.prefetchQuery(useRequestQueries.list())
      }}
    >
      <Header
        left={<HeaderBackButton />}
        center={
          <Flex className={'gap-1.5'}>
            <Text variant={'heading2'}>등록현황</Text>
            <Icon type={'headerPencil'} />
          </Flex>
        }
      />
      <RequestPlacesList />
    </HydrationBoundaryPage>
  )
}

export default Page
