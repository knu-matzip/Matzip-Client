import { Column } from '@repo/ui/components/Layout'
import { Text } from '@repo/ui/components/Text'
import { Icon } from '@repo/ui/components/Icon'

interface EventStatsProps {
  totalWinnersCount: number
  participantsCount: number
}

export const EventStats = ({
  totalWinnersCount,
  participantsCount,
}: EventStatsProps) => {
  return (
    <Column className='items-center gap-2'>
      <Text variant='title3' className='text-gray-800'>
        총 당첨자: {totalWinnersCount}명
      </Text>
      <Text variant='body1' className='flex gap-1'>
        <Icon type='peoples' size={20} />
        현재 {participantsCount}명이 참여 중이에요
      </Text>
    </Column>
  )
}
