'use client'

import Link from 'next/link'
import { CLIENT_PATH } from '@/_constants/path'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useEventQueries } from '@/_apis/queries/event'
import { Flex, Column } from '@repo/ui/components/Layout'
import { Icon } from '@repo/ui/components/Icon'
import { Text } from '@repo/ui/components/Text'
import { EventCountdown } from './EventCountdown'
import { EventPrizeCard } from '@/events/lucky-draw/_components/EventPrizeCard'
import { EmptyEventState } from '../../EmptyEventState'
import { Button } from '@repo/ui/components/Button'

export const InProgressEvent = () => {
  const { data } = useSuspenseQuery(useEventQueries.byPrivate())

  // 진행 중인 이벤트가 없는 경우
  if (!data) {
    return <EmptyEventState />
  }

  const {
    prize,
    totalWinnersCount,
    participantsCount,
    usedTicketsCount,
    eventEndDate,
  } = data

  return (
    <>
      <Column className={'mt-10 flex-1 items-center gap-10'}>
        <Column className={'items-center gap-1'}>
          <Text fontSize={'sm'} fontWeight={'semibold'}>
            응모 종료까지 남은 시간
          </Text>
          <EventCountdown eventEndDate={eventEndDate} />
        </Column>
        <EventPrizeCard
          participantsCount={participantsCount}
          totalWinnersCount={totalWinnersCount}
          imageUrl={prize.imageUrl}
          description={prize.description}
        />
        <Column className={'mt-auto w-full items-center gap-4'}>
          <Flex className={'gap-1'}>
            <Icon type={'ticket'} />
            <Text variant='body1'>
              내가 넣은 응모권은{' '}
              <Text as='span' className='text-yellow'>
                {usedTicketsCount.toLocaleString()}
              </Text>
              개
            </Text>
          </Flex>
          <Button
            as={Link}
            href={CLIENT_PATH.PLACE_NEW}
            size={'medium'}
            fullWidth={true}
          >
            참여하기
          </Button>
        </Column>
      </Column>
    </>
  )
}
