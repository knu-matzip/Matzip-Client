import axiosInstance from '@/_lib/axiosInstance'
import { API_PATH } from '@/_constants/path'

type Response = {
  placeId: string
  message: string
}

export const addLike = async (placeId: string): Promise<Response> => {
  const { data } = await axiosInstance.post(API_PATH.PLACES.LIKE.POST(placeId))
  return data
}

export const removeLike = async (placeId: string): Promise<Response> => {
  const { data } = await axiosInstance.delete(
    API_PATH.PLACES.LIKE.DELETE(placeId),
  )
  return data
}
