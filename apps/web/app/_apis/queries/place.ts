import { queryOptions } from '@tanstack/react-query'
import { RankingPlaceSort } from '@/_apis/schemas/place'
import { getPlacesByCategory, getPlacesByRanking } from '@/_apis/services/place'

export const PlaceQueryKeys = {
  all: () => ['place'] as const,
  byRanking: (sort: RankingPlaceSort) =>
    [...PlaceQueryKeys.all(), 'ranking', sort] as const,
  byCategory: (id: string) =>
    [...PlaceQueryKeys.all(), 'category', id] as const,
}

export const usePlaceQueries = {
  byRanking: (sort: RankingPlaceSort) =>
    queryOptions({
      queryKey: PlaceQueryKeys.byRanking(sort),
      queryFn: () => getPlacesByRanking(sort),
    }),

  byCategory: (id: string) =>
    queryOptions({
      queryKey: PlaceQueryKeys.byCategory(id),
      queryFn: () => getPlacesByCategory(id),
    }),
}
