import { Icon } from '@repo/ui/components/Icon'
import { Column, Flex } from '@repo/ui/components/Layout'
import { Button } from '@repo/ui/components/Button'
import { Text } from '@repo/ui/components/Text'

type Props = {
  remainingTicketsCount: number
  onParticipate: () => void
}

export const EventEntryAction = ({
  remainingTicketsCount,
  onParticipate,
}: Props) => {
  return (
    <Column className={'mt-auto w-full gap-2.5'}>
      <Flex className={'justify-center gap-1.5'}>
        <Icon type={'ticket'} />
        <Text variant={'body1'}>보유 응모권</Text>
        <Text fontSize={'sm'} fontWeight={'semibold'} className={'text-yellow'}>
          {remainingTicketsCount}장
        </Text>
      </Flex>
      <Button
        size={'medium'}
        className={'ui:w-full'}
        onClick={onParticipate}
        disabled={!remainingTicketsCount}
      >
        응모하기
      </Button>
    </Column>
  )
}
