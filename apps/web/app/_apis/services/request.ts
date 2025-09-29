import axiosInstance from '@/_lib/axiosInstance'
import { API_PATH } from '@/_constants/path'
import { RequestSchema, type Request } from '@/_apis/schemas/request'

export const getRequests = async (): Promise<Request[]> => {
  const { data } = await axiosInstance.get(API_PATH.REQUEST.LIST)
  return RequestSchema.array().parse(data)
}
