import { API_PATH, BASE_URL } from '@/consts/path'
import { RequestDetail, RequestReview } from '../types'

export const getRequestDetail = async (id: string): Promise<RequestDetail> => {
  const response = await fetch(BASE_URL + API_PATH.REQUEST.GET.DETAIL(id))
  const { data: res } = await response.json()
  return res
  // const { data } = res
  // return data
}

export const requestReview = async (id: string, review: RequestReview) => {
  const response = await fetch(BASE_URL + API_PATH.REQUEST.POST(id), {
    method: 'POST',
    body: JSON.stringify(review),
  })
  if (!response.ok) {
    throw new Error()
  }

  return response.json()
}
