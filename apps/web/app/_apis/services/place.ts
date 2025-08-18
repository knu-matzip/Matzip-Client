import axiosInstance from '@/_lib/axiosInstance'
import { API_PATH } from '@/_constants/path'
import {
  type BasePlace,
  type RankingPlaceSort,
  BasePlaceSchema,
} from '../schemas/place'

export const getPlacesByRanking = async (
  sort: RankingPlaceSort,
): Promise<BasePlace[]> => {
  const { data } = await axiosInstance.get(API_PATH.PLACES.BY_RANKING(sort))
  return BasePlaceSchema.array().parse(data)
}

export const getPlacesByCategory = async (id: string): Promise<BasePlace[]> => {
  const { data } = await axiosInstance.get(API_PATH.PLACES.BY_CATEGORY(id))
  return BasePlaceSchema.array().parse(data)
}
