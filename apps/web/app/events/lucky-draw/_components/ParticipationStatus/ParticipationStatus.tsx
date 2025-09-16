import { Column } from '@repo/ui/components/Layout'
import { Icon } from '@repo/ui/components/Icon'
import { Text } from '@repo/ui/components/Text'
import { ReactNode } from 'react'

type Mode = 'current' | 'past'

type Props = {
  participantsCount: number
  usedTicketsCount: number
  mode?: Mode
}

type Copy = {
  participants: (count: number) => ReactNode
  tickets: (count: number) => ReactNode
}

const participationCopyMap: Record<Mode, Copy> = {
  current: {
    participants: (c) => <>현재 {c.toLocaleString()}명이 참여 중이에요</>,
    tickets: (c) => (
      <>
        내가 넣은 응모권{' '}
        <Text as='span' className='text-yellow'>
          {c.toLocaleString()}
        </Text>
        개
      </>
    ),
  },
  past: {
    participants: (c) => <>총 {c.toLocaleString()}명이 참여했어요</>,
    tickets: (c) => (
      <>
        내가 넣은 응모권은{' '}
        <Text as='span' className='text-yellow'>
          {c.toLocaleString()}
        </Text>
        개 였어요
      </>
    ),
  },
}

export const ParticipationStatus = ({
  participantsCount,
  usedTicketsCount,
  mode = 'current',
}: Props) => {
  const copy = participationCopyMap[mode]

  return (
    <Column className='items-center'>
      <Text variant='title3' className='flex gap-1'>
        <Icon type='peoples' size={20} />
        {copy.participants(participantsCount)}
      </Text>
      <Text variant='body1'>{copy.tickets(usedTicketsCount)}</Text>
    </Column>
  )
}
