import {
  Checkbox,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from '@heroui/react'
import { Text } from '@repo/ui/components/Text'
import { JustifyBetween } from '@repo/ui/components/Layout'

type Props = {
  isSelected: boolean
  onChange: (isSelected: boolean) => void
  label: string
  disabled?: boolean
  detailContent: string
}

export const TermAgreementCheckbox = ({
  label,
  disabled,
  onChange,
  isSelected,
  detailContent,
}: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <JustifyBetween className='w-full items-center'>
        <Checkbox
          isSelected={isSelected}
          onValueChange={onChange}
          disabled={disabled}
        >
          <Text variant={'body2'}>{label}</Text>
        </Checkbox>
        <button
          type='button'
          onClick={onOpen}
          className='text-xs text-gray-500 underline'
        >
          보기
        </button>
      </JustifyBetween>

      {/* 약관 내용 모달 */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          <ModalHeader>{label}</ModalHeader>
          <ModalBody>
            <Text
              variant={'body2'}
              className={'whitespace-pre-wrap text-gray-400'}
            >
              {detailContent}
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
