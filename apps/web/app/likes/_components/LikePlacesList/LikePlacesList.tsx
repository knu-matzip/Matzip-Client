'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { usePlaceQueries } from '@/_apis/queries/place'
import { PlaceListItem } from '@/_components/PlaceListItem'

export const LikePlacesList = () => {
  const { data: places } = useSuspenseQuery(usePlaceQueries.byLike())

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
