import { Modal, ModalContent } from '@heroui/react'
import { Icon, type IconType } from '@repo/ui/components/Icon'
import { Column } from '@repo/ui/components/Layout'
import { Text } from '@repo/ui/components/Text'
import { WinnerInfoForm } from './_components/WinnerInfoForm'

type Props = {
  eventId: string
  isWinner: boolean
  isPhoneSubmitted: boolean
  isOpen: boolean
  onOpenChange: VoidFunction
  onAnimationStop: VoidFunction
}

type ModalContent = {
  icon: IconType
  title: string
  subTitle: string
  description: string
}

const SuccessModalContent: ModalContent = {
  icon: 'congratulation',
  title: '축하합니다!',
  subTitle: '행운의 주인공으로 선정되셨습니다!',
  description: '전화번호를 입력하시면 3일 이내 기프티콘이 도착해요!',
}

const FailModalContent: ModalContent = {
  icon: 'cry',
  title: '다음 기회에 다시 도전해 주세요!!',
  subTitle: '아쉽지만 행운의 주인공이 되지 못하셨습니다.',
  description: '더 많은 응모권을 모아 다음 기회를 노려봐요!',
}

export const ResultModal = ({
  eventId,
  isWinner,
  isPhoneSubmitted,
  isOpen,
  onOpenChange,
  onAnimationStop,
}: Props) => {
  const modalContent = isWinner ? SuccessModalContent : FailModalContent

  return (
    <Modal
      onClose={onAnimationStop}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement={'center'}
      size={'sm'}
      classNames={{
        body: 'gap-0',
      }}
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: 'easeOut',
            },
          },
          exit: {
            y: 100,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: 'easeIn',
            },
          },
        },
      }}
    >
      <ModalContent>
        {(onClose) => (
          <Column className={'items-center gap-2.5 px-5 py-8'}>
            <Icon type={modalContent.icon} size={60} />
            <Text variant={'heading2'}>{modalContent.title}</Text>
            <Column className={'items-center'}>
              <Text fontWeight={'medium'}>{modalContent.subTitle}</Text>
              <Text variant={'body1'} className={'text-gray-300'}>
                {modalContent.description}
              </Text>
            </Column>
            {isWinner && !isPhoneSubmitted && (
              <WinnerInfoForm eventId={eventId} onSuccess={onClose} />
            )}
          </Column>
        )}
      </ModalContent>
    </Modal>
  )
}
