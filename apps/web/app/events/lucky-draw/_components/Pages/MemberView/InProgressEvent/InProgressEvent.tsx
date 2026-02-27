'use client'

import { useDisclosure } from '@heroui/react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useEventQueries } from '@/_apis/queries/event'
import { Column } from '@repo/ui/components/Layout'
import { Text } from '@repo/ui/components/Text'
import { EntryTicketModal } from './EntryTicketModal'
import { EventCountdown } from './EventCountdown'
import { EventEntryAction } from './EventEntryAction'
import { PrizeInfo } from './PrizeInfo'
import { ParticipationStatus } from '@/events/lucky-draw/_components/ParticipationStatus'
import { EmptyEventState } from '../../EmptyEventState'

export const InProgressEvent = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { data } = useSuspenseQuery(useEventQueries.byPrivate())

  // 진행 중인 이벤트가 없는 경우
  if (!data) {
    return <EmptyEventState />
  }

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
            <PrizeInfo
              imageUrl={prize.imageUrl}
              description={prize.description}
              totalWinnersCount={totalWinnersCount}
            />
            <ParticipationStatus
              participantsCount={participantsCount}
              usedTicketsCount={usedTicketsCount}
            />
          </Column>
        </Column>
        <EventEntryAction
          onParticipate={onOpen}
          remainingTicketsCount={remainingTicketsCount}
        />
      </Column>

      {/*응모하기 버튼 클릭 시 응모권 갯수 선택 모달*/}
      <EntryTicketModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        eventId={eventId}
        remainingTicketsCount={remainingTicketsCount}
      />
    </>
  )
}
