import axiosInstance from '@/_lib/axiosInstance'
import { API_PATH } from '@/_constants/path'
import {
  type RankingPlace,
  type RankingPlaceSort,
  RankingPlaceSchema,
} from '../schemas/place'

export const getRankingPlaces = async (
  sort: RankingPlaceSort,
): Promise<RankingPlace[]> => {
  const { data } = await axiosInstance.get(API_PATH.RANKING(sort))
  return RankingPlaceSchema.array().parse(data)
}
