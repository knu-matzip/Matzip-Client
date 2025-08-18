'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { usePlaceQueries } from '@/_apis/queries/place'
import { RankingPlaceList } from '@/_components/RankingPlaceList'

export const MostViewsPlaces = () => {
  const { data } = useSuspenseQuery(usePlaceQueries.byRanking('views'))

  return <RankingPlaceList title={'오늘의 맛집'} icon={'fire'} places={data} />
}
