'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { usePlaceQueries } from '@/_apis/queries/place'
import { PlaceListItem } from '@/_components/PlaceListItem'
import { Text } from '@repo/ui/components/Text'
import { Column } from '@repo/ui/components/Layout'

export const LikePlacesList = () => {
  const { data: places = [] } = useSuspenseQuery(usePlaceQueries.byLike())

  if (places.length === 0) {
    return (
      <Column className={'my-auto h-full items-center justify-center'}>
        <Text variant={'title3'} className={'text-gray-300'}>
          {/*아직 찜한 맛집이 없어요*/}
          나만의 맛집 리스트를 만들어보세요!
        </Text>
        <Text variant={'body1'} className={'text-gray-300'}>
          {/*하트를 눌러 나만의 맛집을 저장해보세요!*/}
          자주 가는 식당을 찜해두면 편하게 볼 수 있어요.
        </Text>
      </Column>
    )
  }

  return (
    <ul className={'px-3'}>
      {places.map((place, index) => (
        <PlaceListItem
          key={place.placeId}
          {...place}
          showBorder={index !== places.length - 1}
        />
      ))}
    </ul>
  )
}
