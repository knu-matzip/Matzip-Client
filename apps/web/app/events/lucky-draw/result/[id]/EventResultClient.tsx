'use client'

import { useState } from 'react'
import { useDisclosure } from '@heroui/react'
// import { useSuspenseQuery } from '@tanstack/react-query'
// import { useEventQueries } from '@/_apis/queries/event'
import { Text } from '@repo/ui/components/Text'
import { Button } from '@repo/ui/components/Button'
import { Column } from '@repo/ui/components/Layout'
import { LottoBalls } from './_components/LottoBalls'
import { ResultModal } from './ResultModal'
import { ParticipationStatus } from '../../_components/ParticipationStatus'

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
