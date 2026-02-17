import { Modal, ModalContent } from '@heroui/react'
import { Icon, type IconType } from '@repo/ui/components/Icon'
import { Column } from '@repo/ui/components/Layout'
import { Text } from '@repo/ui/components/Text'

type Props = {
  isWinner: boolean
  isOpen: boolean
  onOpenChange: VoidFunction
  stopRunning: VoidFunction
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
  subTitle: '이번주 행운의 주인공으로 선정되셨습니다!',
  description: '마이페이지에서 상품을 확인하실 수 있습니다',
}

const FailModalContent: ModalContent = {
  icon: 'cry',
  title: '다음 기회에 다시 도전해 주세요!!',
  subTitle: '아쉽지만 행운의 주인공이 되지 못하셨습니다.',
  description: '더 많은 응모권을 모아 다음 기회를 노려봐요!',
}

export const ResultModal = ({
  isWinner,
  isOpen,
  onOpenChange,
  stopRunning,
}: Props) => {
  const modalContent = isWinner ? SuccessModalContent : FailModalContent

  return (
    <Modal
      onClose={stopRunning}
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
        <Column className={'items-center gap-2.5 px-5 py-8'}>
          <Icon type={modalContent.icon} size={60} />
          <Text variant={'heading2'}>{modalContent.title}</Text>
          <Column className={'items-center'}>
            <Text fontWeight={'medium'}>{modalContent.subTitle}</Text>
            <Text variant={'body1'} className={'text-gray-300'}>
              {modalContent.description}
            </Text>
          </Column>
        </Column>
      </ModalContent>
    </Modal>
  )
}
