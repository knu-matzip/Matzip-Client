import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@heroui/react'
import {
  type WinnerPhoneNumber,
  WinnerPhoneNumberSchema,
} from '@/_apis/schemas/event'
import { useSubmitWinnerPhoneNumber } from '@/_apis/mutations/useSubmitWinnerPhoneNumber'
import { Column } from '@repo/ui/components/Layout'
import { Button } from '@repo/ui/components/Button'

interface WinnerInfoFormProps {
  eventId: string
}

export const WinnerInfoForm = ({ eventId }: WinnerInfoFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<WinnerPhoneNumber>({
    resolver: zodResolver(WinnerPhoneNumberSchema),
  })

  const { mutateAsync: submitPhoneNumber } = useSubmitWinnerPhoneNumber({
    eventId,
  })

  const onSubmit = async (data: WinnerPhoneNumber): Promise<void> => {
    await submitPhoneNumber(data.phoneNumber)
    // TODO: 성공 시 모달 닫기 처리
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Column className={'items-center gap-2'}>
        <Column className={'items-center gap-1'}>
          <Input
            type={'tel'}
            placeholder={'010-1234-5678'}
            className={'w-[270px]'}
            isInvalid={!!errors.phoneNumber}
            errorMessage={errors.phoneNumber?.message}
            disabled={isSubmitting}
            {...register('phoneNumber')}
          />
        </Column>
        <Button size={'small'} type={'submit'} disabled={isSubmitting}>
          {isSubmitting ? '전송 중...' : '전송하기'}
        </Button>
      </Column>
    </form>
  )
}
