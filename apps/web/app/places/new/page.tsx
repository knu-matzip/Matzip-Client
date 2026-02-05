'use client'

import {
  type FieldErrors,
  type SubmitHandler,
  useForm,
  FormProvider,
} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { addToast } from '@heroui/react'
import {
  type NewPlaceRequest,
  NewPlaceRequestSchema,
} from '@/_apis/schemas/place'
import { useFunnel } from '@/_hooks/useFunnel'
import { useCreateNewPlace } from '@/_apis/mutations/useCreateNewPlace'
import { useCampusStore } from '@/_store/campus'
import { Header } from '@repo/ui/components/Header'
import { Column, Flex } from '@repo/ui/components/Layout'
import { Text } from '@repo/ui/components/Text'
import { Icon } from '@repo/ui/components/Icon'
import { HeaderBackButton } from '@/_components/HeaderBackButton'
import { HeaderHomeButton } from './_components/HeaderHomeButton'
import {
  EventWelcome,
  Campus,
  PlaceSearch,
  PlacePreview,
  RecommendedMenu,
  Description,
  Category,
} from './_components/Step'

export type StepType =
  | 'EVENT_WELCOME'
  | 'CAMPUS'
  | 'PLACE_SEARCH'
  | 'PLACE_PREVIEW'
  | 'RECOMMENDED_MENU'
  | 'DESCRIPTION'
  | 'CATEGORY'

const STEP_ORDER: Record<StepType, string> = {
  EVENT_WELCOME: 'welcome',
  CAMPUS: '1',
  PLACE_SEARCH: '2',
  PLACE_PREVIEW: '3',
  RECOMMENDED_MENU: '4',
  DESCRIPTION: '5',
  CATEGORY: '6',
}

const PlaceNewPage = () => {
  const { Step, nextStep } = useFunnel<StepType>(STEP_ORDER)
  const { campus: initCampus } = useCampusStore()
  const { mutate, isPending } = useCreateNewPlace()
  const methods = useForm<NewPlaceRequest>({
    resolver: zodResolver(NewPlaceRequestSchema),
    defaultValues: {
      campus: initCampus,
      kakaoPlaceId: '',
      menus: [],
      description: '',
      tagIds: [],
      categoryIds: [],
    },
  })

  const {
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmit: SubmitHandler<NewPlaceRequest> = async (data) => {
    mutate(data)
  }

  const onError = (errors: FieldErrors<NewPlaceRequest>) => {
    if (errors.categoryIds) {
      addToast({
        title: errors.categoryIds.message,
      })
    }
  }

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
      <FormProvider {...methods}>
        <Column
          as={'form'}
          onSubmit={handleSubmit(onSubmit, onError)}
          className={'min-h-0 flex-1 p-5'}
        >
          <Step name={'EVENT_WELCOME'}>
            <EventWelcome
              nextStep={() => {
                nextStep('CAMPUS')
              }}
            />
          </Step>
          <Step name={'CAMPUS'}>
            <Campus
              nextStep={() => {
                nextStep('PLACE_SEARCH')
              }}
            />
          </Step>
          <Step name={'PLACE_SEARCH'}>
            <PlaceSearch
              nextStep={() => {
                nextStep('PLACE_PREVIEW')
              }}
            />
          </Step>
          <Step name={'PLACE_PREVIEW'}>
            <PlacePreview
              nextStep={() => {
                const step =
                  getValues().menus.length > 0
                    ? 'RECOMMENDED_MENU'
                    : 'DESCRIPTION'
                nextStep(step)
              }}
            />
          </Step>
          <Step name={'RECOMMENDED_MENU'}>
            <RecommendedMenu
              nextStep={() => {
                nextStep('DESCRIPTION')
              }}
            />
          </Step>
          <Step name={'DESCRIPTION'}>
            <Description
              nextStep={() => {
                nextStep('CATEGORY')
              }}
            />
          </Step>
          <Step name={'CATEGORY'}>
            <Category isLoading={isSubmitting || isPending} />
          </Step>
        </Column>
      </FormProvider>
    </>
  )
}

export default PlaceNewPage
