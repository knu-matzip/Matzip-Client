'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { usePlaceQueries } from '@/_apis/queries/place'
import { RankingPlaceList } from '@/_components/RankingPlaceList'

export const MostLikesPlaces = () => {
  const { data } = useSuspenseQuery(usePlaceQueries.byRanking('likes'))

  return (
    <RankingPlaceList title={'찜많은 맛집'} icon={'fireHeart'} places={data} />
  )
}
