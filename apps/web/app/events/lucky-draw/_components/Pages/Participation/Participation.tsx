'use client'

import { useDisclosure } from '@heroui/react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useEventQueries } from '@/_apis/queries/event'
import { Column } from '@repo/ui/components/Layout'
import { Button } from '@repo/ui/components/Button'
import { ParticipationModal } from './ParticipationModal'
import { ParticipationCountdown } from './ParticipationCountdown'
import { ParticipationPrize } from './ParticipationPrize'
import { RemainingTickets } from './RemainingTickets'

export const Participation = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { data } = useSuspenseQuery(useEventQueries.privateInfo())
  const {
    eventId,
    prize,
    totalWinnersCount,
    participantsCount,
    remainingTicketsCount,
    usedTicketsCount,
    eventEndDate,
  } = data

  return (
    <>
      <Column className={'mt-10 flex-1 items-center gap-10'}>
        <ParticipationCountdown eventEndDate={eventEndDate} />
        <ParticipationPrize
          description={prize.description}
          totalWinnersCount={totalWinnersCount}
          imageUrl={prize.imageUrl}
          participantsCount={participantsCount}
          usedTicketsCount={usedTicketsCount}
        />
        <Column className={'mt-auto w-full gap-2.5'}>
          <RemainingTickets remainingTicketsCount={remainingTicketsCount} />
          <Button size={'medium'} className={'w-full'} onClick={onOpen}>
            응모하기
          </Button>
        </Column>
      </Column>
      <ParticipationModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        eventId={eventId}
        remainingTicketsCount={remainingTicketsCount}
      />
    </>
  )
}
