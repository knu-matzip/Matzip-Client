import { http, HttpResponse } from 'msw'
import { API_PATH } from '@/_constants/path'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''

const RESPONSE_DATA = {
  placeId: '1',
  message: '찜 목록에 추가되었습니다.',
}

const addBaseUrl = (path: string) => {
  return `${BASE_URL}${path}`
}

export const LikeHandlers = [
  http.post(addBaseUrl(API_PATH.PLACES.LIKE.POST('1')), () => {
    return HttpResponse.json(RESPONSE_DATA)
  }),
  http.delete(addBaseUrl(API_PATH.PLACES.LIKE.DELETE('1')), () => {
    return HttpResponse.json(RESPONSE_DATA)
  }),
]
