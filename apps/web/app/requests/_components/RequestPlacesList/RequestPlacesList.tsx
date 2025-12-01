'use client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useRequestQueries } from '@/_apis/queries/request'
import { PlaceListItem } from '../PlaceListItem'
import { EmptyFallback } from '@/_components/EmptyFallback'

export const RequestPlacesList = () => {
  const { data } = useSuspenseQuery(useRequestQueries.list())

  return (
    <EmptyFallback
      isEmpty={data.length === 0}
      fallbackTitle={'아직 신청한 내역이 없어요!'}
      fallbackDescription={'나만 알기 아까운 맛집, 직접 제보해보는 건 어때요?'}
    >
      <ul className={'p-5'}>
        {data.map((place) => (
          <PlaceListItem key={place.placeId} {...place} />
        ))}
      </ul>
    </EmptyFallback>
  )
}
