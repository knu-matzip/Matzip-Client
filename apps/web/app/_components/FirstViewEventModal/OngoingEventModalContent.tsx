import Link from 'next/link'
import { ModalBody, ModalFooter, ModalHeader } from '@heroui/react'
import { CLIENT_PATH } from '@/_constants/path'
import type { EventByPublic } from '@/_apis/schemas/event'
import { Icon } from '@repo/ui/components/Icon'
import { Text } from '@repo/ui/components/Text'
import { Button } from '@repo/ui/components/Button'
import { EventPrizeCard } from '@/events/lucky-draw/_components/EventPrizeCard'

type Props = {
  data: NonNullable<EventByPublic>
  onClose: VoidFunction
}

export const OngoingEventModalContent = ({ data, onClose }: Props) => {
  return (
    <>
      <ModalHeader className={'flex items-center justify-center gap-2'}>
        <Icon type={'clover'} />
        <Text fontSize={'xl'} fontWeight={'semibold'} className={'text-main'}>
          행운의 이벤트 진행 중 !
        </Text>
      </ModalHeader>
      <ModalBody className={'flex items-center justify-center gap-2'}>
        <Text variant={'caption2'} className={'text-main'}>
          근처 맛집 등록하고 행운의 이벤트에 참여해보세요!
        </Text>
        <EventPrizeCard
          {...data.prize}
          totalWinnersCount={data.totalWinnersCount}
          participantsCount={data.participantsCount}
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
  )
}
