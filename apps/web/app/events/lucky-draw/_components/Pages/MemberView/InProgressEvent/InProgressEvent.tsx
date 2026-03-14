'use client'

import Link from 'next/link'
import { CLIENT_PATH } from '@/_constants/path'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useEventQueries } from '@/_apis/queries/event'
import { Column } from '@repo/ui/components/Layout'
import { Text } from '@repo/ui/components/Text'
import { EventCountdown } from './EventCountdown'
import { PrizeInfo } from '@/events/lucky-draw/_components/PrizeInfo'
import { ParticipationStatus } from '@/events/lucky-draw/_components/ParticipationStatus'
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
        <Column className={'items-center gap-3'}>
          <Text fontSize={'2xl'} fontWeight={'bold'}>
            이번주 행운의 상품은?
          </Text>
          <Column className={'items-center gap-5'}>
            <Column className={'items-center gap-3'}>
              <PrizeInfo
                imageUrl={prize.imageUrl}
                description={prize.description}
              />
              <Text variant={'title3'} className='text-gray-800'>
                총 당첨자: {totalWinnersCount}명
              </Text>
            </Column>
            <ParticipationStatus
              participantsCount={participantsCount}
              usedTicketsCount={usedTicketsCount}
            />
          </Column>
        </Column>
        <Button
          as={Link}
          href={CLIENT_PATH.PLACE_NEW}
          size={'medium'}
          fullWidth={true}
        >
          참여하기
        </Button>
      </Column>
    </>
  )
}
