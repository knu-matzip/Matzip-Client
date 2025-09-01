import { queryOptions } from '@tanstack/react-query'
import type { CampusType } from '@/_constants/campus'
import type { MapBounds, RankingPlaceSort } from '@/_apis/schemas/place'
import {
  getPlaceByPreview,
  getPlaceDetail,
  getPlacesByCategory,
  getPlacesByMap,
  getPlacesByRanking,
} from '@/_apis/services/place'

export const PlaceQueryKeys = {
  all: () => ['place'] as const,
  detail: (id: string) => [...PlaceQueryKeys.all(), 'detail', id] as const,
  byRanking: (sort: RankingPlaceSort, campus: CampusType) =>
    [...PlaceQueryKeys.all(), 'ranking', sort, campus] as const,
  byCategory: (id: string, campus: CampusType) =>
    [...PlaceQueryKeys.all(), 'category', id, campus] as const,
  byMap: () => [...PlaceQueryKeys.all(), 'map'] as const,
  byPreview: (kakaoPlaceId: string) =>
    [...PlaceQueryKeys.all(), 'preview', kakaoPlaceId] as const,
}

export const usePlaceQueries = {
  detail: (id: string) =>
    queryOptions({
      queryKey: PlaceQueryKeys.detail(id),
      queryFn: () => getPlaceDetail(id),
    }),

  byRanking: (sort: RankingPlaceSort, campus: CampusType) =>
    queryOptions({
      queryKey: PlaceQueryKeys.byRanking(sort, campus),
      queryFn: () => getPlacesByRanking(sort, campus),
    }),

  byCategory: (id: string, campus: CampusType) =>
    queryOptions({
      queryKey: PlaceQueryKeys.byCategory(id, campus),
      queryFn: () => getPlacesByCategory(id, campus),
    }),

  byMap: (bounds: MapBounds | null) => {
    return queryOptions({
      queryKey: PlaceQueryKeys.byMap(),
      queryFn: () => {
        if (!bounds) return Promise.resolve([])
        return getPlacesByMap(bounds)
      },
      staleTime: 0,
      enabled: !!bounds,
    })
  },

  byPreview: (kakaoPlaceId: string) =>
    queryOptions({
      queryKey: PlaceQueryKeys.byPreview(kakaoPlaceId),
      queryFn: () => getPlaceByPreview(kakaoPlaceId),
    }),
}
