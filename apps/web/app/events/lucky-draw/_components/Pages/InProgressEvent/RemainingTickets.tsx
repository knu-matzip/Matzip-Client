import { Flex } from '@repo/ui/components/Layout'
import { Icon } from '@repo/ui/components/Icon'
import { Text } from '@repo/ui/components/Text'

export const RemainingTickets = ({
  remainingTicketsCount,
}: {
  remainingTicketsCount: number
}) => (
  <Flex className={'justify-center gap-1.5'}>
    <Icon type={'ticket'} />
    <Text variant={'body1'}>보유 응모권</Text>
    <Text fontSize={'sm'} fontWeight={'semibold'} className={'text-yellow'}>
      {remainingTicketsCount}장
    </Text>
  </Flex>
)
