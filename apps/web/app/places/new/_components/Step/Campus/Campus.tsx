import { RadioGroup, Radio } from '@heroui/react'
import { type Control, Controller } from 'react-hook-form'
import type { NewPlaceRequest } from '@/_apis/schemas/place'
import { CAMPUS, CAMPUS_LIST } from '@/_constants/campus'
import { Title } from '@/places/new/_components/Title'
import { Button } from '@repo/ui/components/Button'
import { Text } from '@repo/ui/components/Text'

type Props = {
  control: Control<NewPlaceRequest>
  nextStep: VoidFunction
}

export const Campus = ({ control, nextStep }: Props) => {
  return (
    <>
      <Title
        title={'맛집에 가까운 캠퍼스는?'}
        description={'선택한 캠퍼스의 맛집으로 소개돼요!'}
      />
      <Controller
        name={'campus'}
        control={control}
        render={({ field }) => (
          <RadioGroup
            className={'flex-1'}
            value={field.value}
            onValueChange={field.onChange}
          >
            {CAMPUS_LIST.map((campus) => (
              <Radio key={campus} value={campus} size={'sm'}>
                <Text
                  fontSize={'lg'}
                  fontWeight={'semibold'}
                  className={'ml-2'}
                >
                  {CAMPUS[campus]} 캠퍼스
                </Text>
              </Radio>
            ))}
          </RadioGroup>
        )}
      />
      <Button
        size={'medium'}
        type={'button'}
        className={'ui:min-w-full'}
        onClick={nextStep}
      >
        다음
      </Button>
    </>
  )
}
