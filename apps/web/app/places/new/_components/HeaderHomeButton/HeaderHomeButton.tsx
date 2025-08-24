import { useRouter } from 'next/navigation'
import { Icon } from '@repo/ui/components/Icon'
import { CLIENT_PATH } from '@/_constants/path'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@heroui/react'

export const HeaderHomeButton = () => {
  const { replace } = useRouter()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <button onClick={onOpen} className={'rounded-xl bg-gray-50 p-1'}>
        <Icon type={'logo'} size={30} />
      </button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement={'center'}
        size={'sm'}
        classNames={{
          body: 'gap-0',
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>홈으로 이동하시겠습니까?</ModalHeader>
              <ModalBody>
                <p>지금까지 입력한 내용이 저장되지 않습니다.</p>
                <p>정말 홈으로 이동하시겠습니까?</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color='primary'
                  onPress={() => {
                    replace(CLIENT_PATH.MAIN)
                  }}
                >
                  나가기
                </Button>
                <Button color='danger' variant='light' onPress={onClose}>
                  취소
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
