import { Header } from '@repo/ui/components/Header'
import { HeaderBackButton } from '@/_components/HeaderBackButton'
import { Flex } from '@repo/ui/components/Layout'
import { Icon } from '@repo/ui/components/Icon'
import { Text } from '@repo/ui/components/Text'
import { LuckyDraw } from './LuckyDraw'
import { HydrationBoundaryPage } from '@/HydrationBoundaryPage'
import { useEventQueries } from '@/_apis/queries/event'
import { InfoPopover } from './_components/InfoPopover'

export const dynamic = 'force-dynamic'

const Page = () => {
  return (
    <HydrationBoundaryPage
      prefetch={async (queryClient) => {
        await Promise.all([
          queryClient.prefetchQuery(useEventQueries.privateInfo()),
          queryClient.prefetchQuery(useEventQueries.result()),
        ])
      }}
    >
      <Header
        left={<HeaderBackButton />}
        center={
          <Flex className={'gap-1.5'}>
            <Icon type={'luckMoney'} />
            <Text variant={'heading2'}>행운 복권</Text>
          </Flex>
        }
        right={<InfoPopover />}
        className={'border-b-1 border-gray-50'}
      />
      <LuckyDraw />
    </HydrationBoundaryPage>
  )
}

export default Page
