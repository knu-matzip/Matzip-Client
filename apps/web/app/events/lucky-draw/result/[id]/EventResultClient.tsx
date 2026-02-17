'use client'

import { useState } from 'react'
import { useDisclosure } from '@heroui/react'
// import { useSuspenseQuery } from '@tanstack/react-query'
// import { useEventQueries } from '@/_apis/queries/event'
import { Text } from '@repo/ui/components/Text'
import { Button } from '@repo/ui/components/Button'
import { Column, Flex } from '@repo/ui/components/Layout'
import { LottoBalls } from './_components/LottoBalls'
import { ResultModal } from './ResultModal'
import { ParticipationStatus } from '../../_components/ParticipationStatus'
import Image from 'next/image'

interface Props {
  eventId: string
}

export const EventResultClient = ({ eventId }: Props) => {
  console.log(eventId)
  const [isRunning, setIsRunning] = useState(false)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  // Todo: 백엔드 API 작업 완료 시 연동 필요
  // const { data } = useSuspenseQuery(useEventQueries.result(eventId))
  const data = {
    isWinner: true,
    participantsCount: 100,
    usedTicketsCount: 150,
  }

  const { isWinner, participantsCount, usedTicketsCount } = data

  const stopRunning = () => {
    setIsRunning(false)
  }

  const onClick = () => {
    setIsRunning(true)
    setTimeout(() => {
      onOpen()
    }, 500)
  }

  return (
    <>
      <Column className='h-full items-center gap-4 p-5'>
        <EventSummary />
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
        isWinner={isWinner}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        stopRunning={stopRunning}
      />
    </>
  )
}

const EventSummary = () => {
  return (
    <Flex className={'border-b-1 w-full gap-4 border-gray-100 py-2'}>
      <Image
        src={'/images/chicken.png'}
        alt={'종료된 이벤트 상품'}
        width={80}
        height={80}
      />
      <Column>
        <Text variant={'title3'}>BBQ 황금 올리브 치킨</Text>
        <Text variant={'caption2'} className={'text-gray-300'}>
          당첨자 3명 | 참여자 27명
        </Text>
        <Text variant={'caption2'} className={'text-gray-300'}>
          종료 일자: 2025.12.23
        </Text>
      </Column>
    </Flex>
  )
}
