'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@heroui/react'
import { CLIENT_PATH } from '@/_constants/path'
import { useEventQueries } from '@/_apis/queries/event'
import { Text } from '@repo/ui/components/Text'
import { Icon } from '@repo/ui/components/Icon'
import { Button } from '@repo/ui/components/Button'
import { EventPrizeCard } from '@/events/lucky-draw/_components/EventPrizeCard'

const STORAGE_KEY = 'has_seen_event_modal_v1'

export const FirstViewEventModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { data } = useSuspenseQuery(useEventQueries.byPublic())

  useEffect(() => {
    if (!data) return

    const hasSeenModal = sessionStorage.getItem(STORAGE_KEY)
    if (hasSeenModal) return

    sessionStorage.setItem(STORAGE_KEY, 'true')
    const timer = setTimeout(onOpen, 500)

    return () => {
      clearTimeout(timer)
    }
  }, [onOpen, data])

  if (!data) {
    return null
  }

  const { prize, totalWinnersCount, participantsCount } = data

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className={'flex items-center justify-center gap-2'}>
              <Icon type={'clover'} />
              <Text
                fontSize={'xl'}
                fontWeight={'semibold'}
                className={'text-main'}
              >
                행운의 이벤트 진행 중 !
              </Text>
            </ModalHeader>
            <ModalBody className={'flex items-center justify-center gap-2'}>
              <Text variant={'caption2'} className={'text-main'}>
                근처 맛집 등록하고 행운의 이벤트에 참여해보세요!
              </Text>
              <EventPrizeCard
                {...prize}
                totalWinnersCount={totalWinnersCount}
                participantsCount={participantsCount}
              />
            </ModalBody>
            <ModalFooter className={'flex items-center justify-center gap-2'}>
              <Button
                as={Link}
                onClick={onClose}
                href={CLIENT_PATH.EVENTS_LUCKY_DRAW}
                size={'small'}
                fullWidth={true}
              >
                자세히 보기
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
