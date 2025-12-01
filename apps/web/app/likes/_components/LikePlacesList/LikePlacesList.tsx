'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { usePlaceQueries } from '@/_apis/queries/place'
import { PlaceListItem } from '@/_components/PlaceListItem'
import { EmptyFallback } from '@/_components/EmptyFallback'

export const LikePlacesList = () => {
  const { data: places = [] } = useSuspenseQuery(usePlaceQueries.byLike())

  return (
    <EmptyFallback
      isEmpty={places.length === 0}
      fallbackTitle={'나만의 맛집 리스트를 만들어보세요!'}
      fallbackDescription={'자주 가는 식당을 찜해두면 편하게 볼 수 있어요.'}
    >
      <ul className={'px-3'}>
        {places.map((place, index) => (
          <PlaceListItem
            key={place.placeId}
            {...place}
            showBorder={index !== places.length - 1}
          />
        ))}
      </ul>
    </EmptyFallback>
  )
}
