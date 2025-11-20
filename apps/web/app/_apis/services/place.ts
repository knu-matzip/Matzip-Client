import axios from 'axios'
import axiosInstance from '@/_lib/axiosInstance'
import { API_PATH } from '@/_constants/path'
import type { CampusType } from '@/_constants/campus'
import {
  type RankingPlaceSort,
  type BasePlace,
  type PlaceDetail,
  type MapBounds,
  type PlaceByMap,
  type PlaceByPreview,
  type NewPlaceRequest,
  type NewPlaceResponse,
  BasePlaceSchema,
  PlaceByMapSchema,
  PlaceDetailSchema,
  PlaceByPreviewSchema,
} from '../schemas/place'
import {
  type KakaoSearchFuncParams,
  KAKAO_CATEGORY_CODE,
} from '@/_hooks/useSearchPlaceByKakao'

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

export const getSearchPlaceByKakao = async ({
  query,
  categoryCode,
  location,
}: KakaoSearchFuncParams) => {
  const KAKAO_API_KEY = process.env.NEXT_PUBLIC_KAKAO_API || ''
  const { x, y } = location

  const { data } = await axios.get(
    API_PATH.KAKAO.SEARCH(query, KAKAO_CATEGORY_CODE[categoryCode], x, y),
    {
      headers: {
        Authorization: `KakaoAK ${KAKAO_API_KEY}`,
      },
    },
  )
  return data
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
