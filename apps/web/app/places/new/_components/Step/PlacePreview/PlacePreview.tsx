import Image from 'next/image'
import { useSuspenseQuery } from '@tanstack/react-query'
import type { UseFormGetValues, UseFormSetValue } from 'react-hook-form'
import type { NewPlaceRequest } from '@/_apis/schemas/place'
import { usePlaceQueries } from '@/_apis/queries/place'
import { Carousel } from '@repo/ui/components/Carousel'
import { Location, Menus } from '@/places/[id]/_components'
import { Text } from '@repo/ui/components/Text'
import { Button } from '@repo/ui/components/Button'
import { Column, Flex, VerticalScrollArea } from '@repo/ui/components/Layout'
import { Icon } from '@repo/ui/components/Icon'
import { AlreadyRegistered } from './AlreadyRegistered'
import { Title } from '@/places/new/_components/Title'
import { Section } from '@/_components/Section'

type Props = {
  getValues: UseFormGetValues<NewPlaceRequest>
  setValue: UseFormSetValue<NewPlaceRequest>
  nextStep: VoidFunction
}

export const PlacePreview = ({ getValues, setValue, nextStep }: Props) => {
  const { data } = useSuspenseQuery(
    usePlaceQueries.byPreview(getValues().kakaoPlaceId),
  )
  const { alreadyRegistered, placeName, photos, menus, location } = data
  setValue('menus', menus)

  if (alreadyRegistered) {
    return <AlreadyRegistered placeName={placeName} />
  }

  return (
    <>
      <VerticalScrollArea className={'flex-1'}>
        <Title
          title={'찾으시는 맛집이 이곳이 맞나요?'}
          description={
            '선택하신 맛집 정보를 확인하고 맞다면 다음 단계로 진행해주세요!'
          }
        />
        <Flex
          className={
            'mb-5 w-full justify-center gap-3 rounded-lg bg-gray-50 py-3'
          }
        >
          <Icon type={'blingBling'} />
          <Text fontSize={'xl'} fontWeight={'semibold'}>
            {placeName}
          </Text>
          <Icon type={'blingBling'} />
        </Flex>
        <Column className={'flex-1 justify-around gap-4'}>
          <Carousel showIndicator={true} minHeight={180}>
            {photos.map((photo) => (
              <Image
                key={photo.displayOrder}
                src={photo.photoUrl}
                alt={`place-photo-${photo.displayOrder}`}
                width={450}
                height={180}
                className={'max-h-[180px] object-contain'}
              />
            ))}
          </Carousel>
          <Section icon={'pin'} title={'위치'}>
            <Location location={location} />
          </Section>
          <Section icon={'note'} title={'메뉴'}>
            <Menus menus={menus} />
          </Section>
          <Button
            size={'medium'}
            type={'button'}
            className={'ui:min-w-full mt-10'}
            onClick={nextStep}
          >
            다음
          </Button>
        </Column>
      </VerticalScrollArea>
    </>
  )
}
