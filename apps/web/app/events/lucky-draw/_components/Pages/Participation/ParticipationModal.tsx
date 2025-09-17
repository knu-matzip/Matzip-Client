import { useState } from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  NumberInput,
} from '@heroui/react'
import { useParticipationEvent } from '@/_apis/mutations/useParticipationEvent'

type Props = {
  isOpen: boolean
  onOpenChange: VoidFunction
  eventId: string
  remainingTicketsCount: number
}

export const ParticipationModal = ({
  isOpen,
  onOpenChange,
  eventId,
  remainingTicketsCount,
}: Props) => {
  const [ticketsCount, setTicketsCount] = useState(remainingTicketsCount)
  const { mutate: participationEvent } = useParticipationEvent()

  const onPress = () => {
    participationEvent({ eventId, ticketsCount })
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement='center'
      size='sm'
      classNames={{
        body: 'gap-0',
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>몇 장의 응모권을 사용하시겠습니까?</ModalHeader>
            <ModalBody>
              <NumberInput
                defaultValue={remainingTicketsCount}
                minValue={1}
                maxValue={remainingTicketsCount}
                label={'응모권 개수'}
                placeholder={'사용할 응모권 개수를 입력하세요'}
                radius={'lg'}
                value={ticketsCount}
                onValueChange={setTicketsCount}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                color={'primary'}
                onPress={() => {
                  onPress()
                  onClose()
                }}
              >
                응모하기
              </Button>
              <Button color={'danger'} variant={'light'} onPress={onClose}>
                취소
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
