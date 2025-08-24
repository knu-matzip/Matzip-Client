import Image from 'next/image'
import { useSuspenseQuery } from '@tanstack/react-query'
import type { UseFormSetValue } from 'react-hook-form'
import type { NewPlaceRequest } from '@/_apis/schemas/place'
import { usePlaceQueries } from '@/_apis/queries/place'
import { Banner } from '@/_components/Banner'
import { Location, Menus } from '@/places/[id]/_components'
import { Text } from '@repo/ui/components/Text'
import { Button } from '@repo/ui/components/Button'
import { Column, Flex, VerticalScrollArea } from '@repo/ui/components/Layout'
import { Icon } from '@repo/ui/components/Icon'

type Props = {
  setValue: UseFormSetValue<NewPlaceRequest>
  nextStep: VoidFunction
}

export const PlaceCheck = ({ setValue, nextStep }: Props) => {
  // Todo: 테스트용 api 요청 삭제 예정 (id prop으로 전달받을 예정)
  const { data } = useSuspenseQuery(usePlaceQueries.detail('1'))
  const { placeName, photos, menus, location } = data
  setValue('menus', menus)
  return (
    <>
      <VerticalScrollArea className={'flex-1'}>
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
        <Banner
          contents={photos.map((photo) => (
            <Image
              key={photo.displayOrder}
              src={photo.photoUrl}
              alt='place-photo'
              width={450}
              height={180}
              className={'max-h-[180px] object-contain'}
            />
          ))}
          minHeight={180}
        />
        <Column className={'flex-1 justify-around gap-4'}>
          <Location location={location} />
          <Menus menus={menus} />
          <Button
            size={'medium'}
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
