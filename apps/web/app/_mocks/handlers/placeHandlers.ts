import { http, HttpResponse } from 'msw'
import { API_PATH } from '@/_constants/path'
import { PlaceDetail, Places } from '../data/place'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''

const addBaseUrl = (path: string) => {
  return `${BASE_URL}${path}`
}

export const PlaceHandlers = [
  http.get(addBaseUrl(API_PATH.PLACES.BY_RANKING('likes')), () => {
    return HttpResponse.json(Places)
  }),
  http.get(addBaseUrl(API_PATH.PLACES.BY_RANKING('views')), () => {
    return HttpResponse.json(Places)
  }),
  http.get(addBaseUrl(API_PATH.PLACES.BY_CATEGORY('1')), () => {
    return HttpResponse.json(Places)
  }),
  http.get(addBaseUrl(API_PATH.PLACES.DETAIL('1')), () => {
    return HttpResponse.json(PlaceDetail)
  }),
]
