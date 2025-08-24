'use client'

import { type ReactNode, useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { type NewPlaceRequest } from '@/_apis/schemas/place'
import { useCampusStore } from '@/_store/campus'
import { Header } from '@repo/ui/components/Header'
import { Column, Flex } from '@repo/ui/components/Layout'
import { Text } from '@repo/ui/components/Text'
import { Icon } from '@repo/ui/components/Icon'
import { HeaderBackButton } from '@/_components/HeaderBackButton'
import {
  Campus,
  PlaceSearch,
  PlaceCheck,
  RecommendedMenu,
  Description,
  Category,
} from './_components/Step'

type StepType =
  | 'CAMPUS'
  | 'PLACE_SEARCH'
  | 'PLACE_CHECK'
  | 'RECOMMENDED_MENU'
  | 'DESCRIPTION'
  | 'CATEGORY'

const PlaceNewPage = () => {
  const [step] = useState<StepType>('CATEGORY')
  const { campus: initCampus } = useCampusStore()
  const {
    // register,
    handleSubmit,
    control,
    setValue,
    getValues,
    // formState: { errors },
  } = useForm<NewPlaceRequest>({
    defaultValues: {
      campus: initCampus,
      kakaoPlaceId: '',
      menus: [
        { name: '짜장면', price: 3000, isRecommended: false },
        { name: '짬뽕', price: 4000, isRecommended: false },
        { name: '볶음밥', price: 5000, isRecommended: false },
        { name: '탕수육', price: 6000, isRecommended: false },
      ],
      description: '',
      tagIds: [],
      categoryIds: ['1', '2', '4'],
    },
  })

  const onSubmit: SubmitHandler<NewPlaceRequest> = (data) => console.log(data)

  return (
    <>
      <Header
        left={<HeaderBackButton />}
        center={
          <Flex className={'gap-1.5'}>
            <Icon type={'shakingHeart'} />
            <Text variant={'heading2'}>맛집 알리기</Text>
          </Flex>
        }
      />

      <Column
        as={'form'}
        onSubmit={handleSubmit(onSubmit)}
        className={'min-h-0 flex-1 p-5'}
      >
        <Step step={step} name={'CAMPUS'}>
          <Campus control={control} />
        </Step>
        <Step step={step} name={'PLACE_SEARCH'}>
          <PlaceSearch setValue={setValue} />
        </Step>
        <Step step={step} name={'PLACE_CHECK'}>
          <PlaceCheck setValue={setValue} />
        </Step>
        <Step step={step} name={'RECOMMENDED_MENU'}>
          <RecommendedMenu control={control} />
        </Step>
        <Step step={step} name={'DESCRIPTION'}>
          <Description control={control} />
        </Step>
        <Step step={step} name={'CATEGORY'}>
          <Category setValue={setValue} getValues={getValues} />
        </Step>
      </Column>
    </>
  )
}

export default PlaceNewPage

const Step = ({
  step,
  name,
  children,
}: {
  step: StepType
  name: StepType
  children: ReactNode
}) => {
  return name === step ? children : null
}
