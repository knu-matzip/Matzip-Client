'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useDisclosure } from '@heroui/react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useEventQueries } from '@/_apis/queries/event'
import { Button } from '@repo/ui/components/Button'
import { Column, Flex } from '@repo/ui/components/Layout'
import { Text } from '@repo/ui/components/Text'
import { ParticipationStatus } from '../../_components/ParticipationStatus'
import { LottoBalls } from './_components/LottoBalls'
import { ResultModal } from './ResultModal'
import { EventResult } from '@/_apis/schemas/event'

interface Props {
  eventId: string
}

const LOTTERY_ANIMATION_DURATION_MS = 800

export const EventResultClient = ({ eventId }: Props) => {
  const [isRunning, setIsRunning] = useState(false)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { data } = useSuspenseQuery(useEventQueries.result(eventId))

  const {
    isWinner,
    participantsCount,
    usedTicketsCount,
    prize,
    totalWinnersCount,
    eventEndDate,
    isPhoneSubmitted,
  } = data

  const stopLotteryAnimation = () => {
    setIsRunning(false)
  }

  const onClick = () => {
    setIsRunning(true)
    setTimeout(() => {
      onOpen()
    }, LOTTERY_ANIMATION_DURATION_MS)
  }

  return (
    <>
      <Column className='h-full items-center gap-4 p-5'>
        <EventSummary
          prize={prize}
          totalWinnersCount={totalWinnersCount}
          participantsCount={participantsCount}
          eventEndDate={eventEndDate}
        />
        <Column className='mt-10 items-center gap-4'>
          <Text className='text-center' variant='title1'>
            행운의 주인공이 되어보세요!
          </Text>
          <LottoBalls isRunning={isRunning} />
          <ParticipationStatus
            mode={'past'}
            participantsCount={participantsCount}
            usedTicketsCount={usedTicketsCount}
          />
        </Column>
        <Button className='ui:w-full mt-auto' size='medium' onClick={onClick}>
          확인하기
        </Button>
      </Column>
      <ResultModal
        eventId={eventId}
        isWinner={isWinner}
        isPhoneSubmitted={isPhoneSubmitted}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onAnimationStop={stopLotteryAnimation}
      />
    </>
  )
}

type EventSummaryProps = Pick<
  EventResult,
  'prize' | 'totalWinnersCount' | 'eventEndDate' | 'participantsCount'
>

const EventSummary = ({
  prize,
  totalWinnersCount,
  participantsCount,
  eventEndDate,
}: EventSummaryProps) => {
  return (
    <Flex className={'border-b-1 w-full gap-4 border-gray-100 py-2'}>
      <Image
        src={prize.imageUrl}
        alt={'종료된 이벤트 상품'}
        width={80}
        height={80}
        sizes={'auto'}
        priority={true}
        className={'rounded-lg'}
      />
      <Column>
        <Text variant={'title3'}>{prize.description}</Text>
        <Text variant={'caption2'} className={'text-gray-300'}>
          당첨자 {totalWinnersCount}명 | 참여자 {participantsCount}명
        </Text>
        <Text variant={'caption2'} className={'text-gray-300'}>
          종료 일자: {eventEndDate.slice(0, 10).replace(/-/g, '.')}
        </Text>
      </Column>
    </Flex>
  )
}
