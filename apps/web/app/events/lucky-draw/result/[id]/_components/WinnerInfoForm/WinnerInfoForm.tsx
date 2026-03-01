import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@heroui/react'
import {
  EventWinnerFormSchema,
  type EventWinnerForm,
} from '@/_apis/schemas/event'
import { AGREEMENT } from './constants'
import { useSubmitWinnerForm } from '@/_apis/mutations/useSubmitWinnerForm'
import { Column } from '@repo/ui/components/Layout'
import { Button } from '@repo/ui/components/Button'
import { Text } from '@repo/ui/components/Text'
import { TermAgreementCheckbox } from './TermAgreementCheckbox'

type Props = {
  eventId: string
  onSuccess: VoidFunction
}

export const WinnerInfoForm = ({ eventId, onSuccess }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<EventWinnerForm>({
    resolver: zodResolver(EventWinnerFormSchema),
    defaultValues: {
      phoneNumber: '',
      agreements: { termsAgreed: false, privacyAgreed: false },
    },
  })

  const { mutateAsync: submitPhoneNumber } = useSubmitWinnerForm({
    eventId,
  })

  const onSubmit = async (data: EventWinnerForm): Promise<void> => {
    await submitPhoneNumber(data)
    onSuccess()
  }

  return (
    <Column
      as={'form'}
      onSubmit={handleSubmit(onSubmit)}
      className={'mt-5 w-[270px] items-center gap-10'}
    >
      <Column className={'w-full gap-3'}>
        {/* 1. 전화번호 입력 */}
        <Input
          type={'tel'}
          placeholder={'010-1234-5678'}
          isInvalid={!!errors.phoneNumber}
          errorMessage={errors.phoneNumber?.message}
          isDisabled={isSubmitting}
          autoFocus={true}
          classNames={{
            input: 'text-base scale-[0.875]', // 16px * 0.875 = 14px
          }}
          style={{
            width: 'calc(100% / 0.875)',
          }}
          {...register('phoneNumber')}
        />

        {/* 2. 약관 동의 영역 */}
        <Controller
          control={control}
          name={'agreements'}
          render={({ field }) => (
            <Column className={'w-full gap-2'}>
              <TermAgreementCheckbox
                label={AGREEMENT.termsAgreed.label}
                disabled={isSubmitting}
                isSelected={field.value.termsAgreed}
                onChange={(isSelected) =>
                  field.onChange({
                    ...field.value,
                    termsAgreed: isSelected,
                  })
                }
                detailContent={AGREEMENT.termsAgreed.detailContent}
              />
              <TermAgreementCheckbox
                label={AGREEMENT.privacyAgreed.label}
                disabled={isSubmitting}
                isSelected={field.value.privacyAgreed}
                onChange={(isSelected) =>
                  field.onChange({
                    ...field.value,
                    privacyAgreed: isSelected,
                  })
                }
                detailContent={AGREEMENT.privacyAgreed.detailContent}
              />
              {/* 3. 약관 동의 에러 메시지 */}
              {errors.agreements && (
                <Text variant={'caption2'} className={'text-red-500'}>
                  필수 약관에 모두 동의해 주세요.
                </Text>
              )}
            </Column>
          )}
        />
      </Column>

      {/* 4. 전송 버튼 */}
      <Button size={'small'} type={'submit'} disabled={isSubmitting}>
        {isSubmitting ? '전송 중...' : '전송하기'}
      </Button>
    </Column>
  )
}
