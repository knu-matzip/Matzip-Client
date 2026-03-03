'use client'

import Link from 'next/link'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useEventQueries } from '@/_apis/queries/event'
import { EmptyEventState } from '../EmptyEventState'
import { EventTitle } from '@/events/lucky-draw/_components/EventTitle'
import { PrizeInfo } from '@/events/lucky-draw/_components/PrizeInfo'
import { EventStats } from '@/events/lucky-draw/_components/EventStats'
import { Column } from '@repo/ui/components/Layout'
import { Button } from '@repo/ui/components/Button'
import { CLIENT_PATH } from '@/_constants/path'

export const GuestView = () => {
  const { data } = useSuspenseQuery(useEventQueries.byPublic())

  if (!data) {
    return <EmptyEventState />
  }

  const { prize, totalWinnersCount, participantsCount } = data

  return (
    <Column className={'h-full min-h-0 justify-between gap-10 p-5'}>
      <EventTitle />
      <Column className={'gap-3'}>
        <PrizeInfo {...prize} />
        <EventStats
          totalWinnersCount={totalWinnersCount}
          participantsCount={participantsCount}
        />
      </Column>
      <Button
        as={Link}
        href={CLIENT_PATH.LOGIN}
        size={'medium'}
        className={'w-full'}
      >
        참여하기
      </Button>
    </Column>
  )
}
