'use client'

import { useDisclosure } from '@heroui/react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useEventQueries } from '@/_apis/queries/event'
import { Column, Flex } from '@repo/ui/components/Layout'
import { Icon } from '@repo/ui/components/Icon'
import { Text } from '@repo/ui/components/Text'
import { EntryTicketModal } from './EntryTicketModal'
import { EventCountdown } from './EventCountdown'
import { EventEntryAction } from './EventEntryAction'
import { PrizeInfo } from './PrizeInfo'
import { ParticipationStatus } from '@/events/lucky-draw/_components/ParticipationStatus'

export const InProgressEvent = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { data } = useSuspenseQuery(useEventQueries.privateInfo())

  // 진행 중인 이벤트가 없는 경우
  // Todo: API에서 진행 중인 이벤트가 없는 경우에 대한 명확한 응답이 필요 (예: data: null 등)
  if (!data.eventId || !data.prize || !data.eventEndDate) {
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

const EmptyEventState = () => {
  return (
    <Column className={'flex-1 items-center justify-center gap-2 px-5'}>
      <Flex className={'gap-1'}>
        <Text variant='title1' className='text-gray-300'>
          현재 진행 중인 럭키드로우가 없습니다
        </Text>
        <Icon type={'cry'} />
      </Flex>

      <Column className={'items-center'}>
        <Text
          variant='body1'
          className='whitespace-pre-wrap break-words text-center text-gray-300'
        >
          맛집 리뷰를 작성하고 응모권을 모아보세요
        </Text>
        <Text
          variant='body1'
          className='whitespace-pre-wrap break-words text-center text-gray-300'
        >
          다음 럭키드로우 이벤트에서 행운의 주인공이 되실 수 있습니다!
        </Text>
      </Column>
    </Column>
  )
}
