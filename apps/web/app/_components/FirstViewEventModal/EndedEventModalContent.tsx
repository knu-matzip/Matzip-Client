import Link from 'next/link'
import { CLIENT_PATH } from '@/_constants/path'
import { ModalBody, ModalFooter, ModalHeader } from '@heroui/react'
import { Icon } from '@repo/ui/components/Icon'
import { Text } from '@repo/ui/components/Text'
import { Button } from '@repo/ui/components/Button'

type Props = {
  onClose: VoidFunction
}

export const EndedEventModalContent = ({ onClose }: Props) => {
  return (
    <>
      <ModalHeader className={'flex items-center justify-center gap-2'}>
        <Icon type={'clover'} />
        <Text fontSize={'xl'} fontWeight={'semibold'} className={'text-main'}>
          이벤트 결과 발표
        </Text>
      </ModalHeader>
      <ModalBody className={'flex items-center justify-center gap-2'}>
        <Text variant={'caption2'} className={'text-main text-center'}>
          행운의 이벤트가 종료되었습니다.
          <br />
          당첨자 결과를 확인해보세요!
        </Text>
      </ModalBody>
      <ModalFooter className={'flex items-center justify-center gap-2'}>
        <Button
          as={Link}
          onClick={onClose}
          href={CLIENT_PATH.EVENTS_LUCKY_DRAW}
          size={'small'}
          fullWidth={true}
        >
          결과 확인하기
        </Button>
      </ModalFooter>
    </>
  )
}
