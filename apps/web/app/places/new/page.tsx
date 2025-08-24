'use client'

import { type SubmitHandler, useForm } from 'react-hook-form'
import { type NewPlaceRequest } from '@/_apis/schemas/place'
import { useFunnel } from '@/_hooks/useFunnel'
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
import { HeaderHomeButton } from '@/places/new/_components/HeaderHomeButton'

export type StepType =
  | 'CAMPUS'
  | 'PLACE_SEARCH'
  | 'PLACE_CHECK'
  | 'RECOMMENDED_MENU'
  | 'DESCRIPTION'
  | 'CATEGORY'

const STEP_ORDER: Record<StepType, string> = {
  CAMPUS: '1',
  PLACE_SEARCH: '2',
  PLACE_CHECK: '3',
  RECOMMENDED_MENU: '4',
  DESCRIPTION: '5',
  CATEGORY: '6',
}

const PlaceNewPage = () => {
  const { Step, nextStep } = useFunnel<StepType>(STEP_ORDER)

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
      menus: [],
      description: '',
      tagIds: [],
      categoryIds: [],
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
        right={<HeaderHomeButton />}
      />
      <Column
        as={'form'}
        onSubmit={handleSubmit(onSubmit)}
        className={'min-h-0 flex-1 p-5'}
      >
        <Step name={'CAMPUS'}>
          <Campus
            control={control}
            nextStep={() => {
              nextStep('PLACE_SEARCH')
            }}
          />
        </Step>
        <Step name={'PLACE_SEARCH'}>
          <PlaceSearch
            setValue={setValue}
            nextStep={() => {
              nextStep('PLACE_CHECK')
            }}
          />
        </Step>
        <Step name={'PLACE_CHECK'}>
          <PlaceCheck
            setValue={setValue}
            nextStep={() => {
              nextStep('RECOMMENDED_MENU')
            }}
          />
        </Step>
        <Step name={'RECOMMENDED_MENU'}>
          <RecommendedMenu
            control={control}
            nextStep={() => {
              nextStep('DESCRIPTION')
            }}
          />
        </Step>
        <Step name={'DESCRIPTION'}>
          <Description
            control={control}
            nextStep={() => {
              nextStep('CATEGORY')
            }}
          />
        </Step>
        <Step name={'CATEGORY'}>
          <Category setValue={setValue} getValues={getValues} />
        </Step>
      </Column>
    </>
  )
}

export default PlaceNewPage
