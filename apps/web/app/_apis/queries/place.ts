import { queryOptions } from '@tanstack/react-query'
import { RankingPlaceSort } from '@/_apis/schemas/place'
import { getRankingPlaces } from '@/_apis/services/place'

export const PlaceQueryKeys = {
  all: () => ['place'] as const,
  rankingList: (sort: RankingPlaceSort) =>
    [...PlaceQueryKeys.all(), 'ranking', sort] as const,
}

export const usePlaceQueries = {
  rankingList: (sort: RankingPlaceSort) =>
    queryOptions({
      queryKey: PlaceQueryKeys.rankingList(sort),
      queryFn: () => getRankingPlaces(sort),
    }),
}
