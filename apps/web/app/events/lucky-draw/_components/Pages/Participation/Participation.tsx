'use client'

import { useDisclosure } from '@heroui/react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useEventQueries } from '@/_apis/queries/event'
import { Column } from '@repo/ui/components/Layout'
import { ParticipationModal } from './ParticipationModal'
import { ParticipationCountdown } from './ParticipationCountdown'
import { Text } from '@repo/ui/components/Text'
import { ParticipationPrize } from './ParticipationPrize'
import { ParticipationAction } from './ParticipationAction'
import { ParticipationStatus } from '@/events/lucky-draw/_components/ParticipationStatus'

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
        <Column className={'items-center gap-1'}>
          <Text fontSize={'sm'} fontWeight={'semibold'}>
            응모 종료까지 남은 시간
          </Text>
          <ParticipationCountdown eventEndDate={eventEndDate} />
        </Column>
        <Column className={'items-center gap-3'}>
          <Text fontSize={'2xl'} fontWeight={'bold'}>
            이번주 행운의 상품은?
          </Text>
          <Column className={'items-center gap-5'}>
            <ParticipationPrize
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
        <ParticipationAction
          onParticipate={onOpen}
          remainingTicketsCount={remainingTicketsCount}
        />
      </Column>

      {/*응모하기 버튼 클릭 시 응모권 갯수 선택 모달*/}
      <ParticipationModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        eventId={eventId}
        remainingTicketsCount={remainingTicketsCount}
      />
    </>
  )
}
