import axiosInstance from '@/_lib/axiosInstance'
import { API_PATH } from '@/_constants/path'
import type { CampusType } from '@/_constants/campus'
import {
  type RankingPlaceSort,
  type BasePlace,
  type PlaceDetail,
  type MapBounds,
  type PlaceByMap,
  type PlaceByNameSearch,
  type PlaceByMenuSearch,
  type PlaceByPreview,
  type NewPlaceRequest,
  type NewPlaceResponse,
  BasePlaceSchema,
  PlaceByMapSchema,
  PlaceByNameSearchSchema,
  PlaceByMenuSearchSchema,
  PlaceDetailSchema,
  PlaceByPreviewSchema,
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

export const getPlacesByNameSearch = async (
  keyword: string,
): Promise<PlaceByNameSearch[]> => {
  const { data } = await axiosInstance.get(API_PATH.PLACES.SEARCH.BY_NAME, {
    params: {
      keyword,
    },
  })
  return PlaceByNameSearchSchema.array().parse(data)
}

export const getPlacesByMenuSearch = async (
  keyword: string,
): Promise<PlaceByMenuSearch[]> => {
  const { data } = await axiosInstance.get(API_PATH.PLACES.SEARCH.BY_MENU, {
    params: {
      keyword,
    },
  })
  return PlaceByMenuSearchSchema.array().parse(data)
}

export const getPlaceDetail = async (id: string): Promise<PlaceDetail> => {
  const { data } = await axiosInstance.get(API_PATH.PLACES.DETAIL(id))
  return PlaceDetailSchema.parse(data)
}

export const getPlaceByPreview = async (
  kakaoPlaceId: string,
): Promise<PlaceByPreview> => {
  const { data } = await axiosInstance.get(
    API_PATH.PLACES.NEW.PREVIEW(kakaoPlaceId),
  )
  return PlaceByPreviewSchema.parse(data)
}

export const getPlacesByLike = async (): Promise<BasePlace[]> => {
  const { data } = await axiosInstance.get(API_PATH.PLACES.LIKE.GET)
  return BasePlaceSchema.array().parse(data)
}

export const createNewPlace = async (
  placeData: NewPlaceRequest,
): Promise<NewPlaceResponse> => {
  const dataSet = {
    ...placeData,
    tagIds: placeData.tagIds.map(Number),
    categoryIds: placeData.categoryIds.map(Number),
  }
  const { data } = await axiosInstance.post(API_PATH.PLACES.NEW.CREATE, dataSet)
  return data
}
