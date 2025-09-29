import { http, HttpResponse } from 'msw'
import { API_PATH } from '@/_constants/path'
import { addBaseUrl } from './addBaseUrl'

const RESPONSE_DATA = {
  placeId: '1',
  message: '찜 목록에 추가되었습니다.',
}

export const LikeHandlers = [
  http.post(addBaseUrl(API_PATH.PLACES.LIKE.POST('1')), () => {
    return HttpResponse.json(RESPONSE_DATA)
  }),
  http.delete(addBaseUrl(API_PATH.PLACES.LIKE.DELETE('1')), () => {
    return HttpResponse.json(RESPONSE_DATA)
  }),
]
