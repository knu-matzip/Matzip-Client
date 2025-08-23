import axiosInstance from '@/_lib/axiosInstance'
import { API_PATH } from '@/_constants/path'
import type { CampusType } from '@/_constants/campus'
import {
  type RankingPlaceSort,
  type BasePlace,
  type PlaceDetail,
  type MapBounds,
  type PlaceByMap,
  BasePlaceSchema,
  PlaceByMapSchema,
  PlaceDetailSchema,
} from '../schemas/place'

export const getPlacesByRanking = async (
  sort: RankingPlaceSort,
  campus: CampusType,
): Promise<BasePlace[]> => {
  const { data } = await axiosInstance.get(
    API_PATH.PLACES.BY_RANKING(sort, campus),
  )
  return BasePlaceSchema.array().parse(data)
}

export const getPlacesByCategory = async (
  id: string,
  campus: CampusType,
): Promise<BasePlace[]> => {
  const { data } = await axiosInstance.get(
    API_PATH.PLACES.BY_CATEGORY(id, campus),
  )
  return BasePlaceSchema.array().parse(data)
}

export const getPlacesByMap = async ({
  minLatitude,
  minLongitude,
  maxLatitude,
  maxLongitude,
}: MapBounds): Promise<PlaceByMap[]> => {
  const { data } = await axiosInstance.get(
    API_PATH.PLACES.BY_MAP({
      minLatitude,
      minLongitude,
      maxLatitude,
      maxLongitude,
    }),
  )

  return PlaceByMapSchema.array().parse(data)
}

export const getPlaceDetail = async (id: string): Promise<PlaceDetail> => {
  const { data } = await axiosInstance.get(API_PATH.PLACES.DETAIL(id))
  return PlaceDetailSchema.parse(data)
}
