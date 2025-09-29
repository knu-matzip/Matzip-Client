'use client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useRequestQueries } from '@/_apis/queries/request'
import { PlaceListItem } from '../PlaceListItem'

export const RequestPlacesList = () => {
  const { data } = useSuspenseQuery(useRequestQueries.list())

  return (
    <ul className={'p-5'}>
      {data.map((place) => (
        <PlaceListItem key={place.placeId} {...place} />
      ))}
    </ul>
  )
}
