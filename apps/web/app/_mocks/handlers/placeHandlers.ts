import { http, HttpResponse } from 'msw'
import { API_PATH } from '@/_constants/path'
import { addBaseUrl } from './addBaseUrl'
import {
  PlaceDetail,
  Places,
  PlacesWithLocation,
  PlacePreview,
} from '../data/place'

export const PlaceHandlers = [
  http.get(
    addBaseUrl(
      API_PATH.PLACES.BY_MAP({
        maxLatitude: 36.4756348,
        maxLongitude: 127.1454263,
        minLatitude: 36.4633315,
        minLongitude: 127.1357703,
      }),
    ),
    () => {
      return HttpResponse.json(PlacesWithLocation)
    },
  ),
  http.get(addBaseUrl(API_PATH.PLACES.BY_RANKING('likes', 'singwan')), () => {
    return HttpResponse.json(Places)
  }),
  http.get(addBaseUrl(API_PATH.PLACES.BY_RANKING('views', 'singwan')), () => {
    return HttpResponse.json(Places)
  }),
  http.get(addBaseUrl(API_PATH.PLACES.BY_CATEGORY('1', 'singwan')), () => {
    return HttpResponse.json(Places)
  }),
  http.get(addBaseUrl(API_PATH.PLACES.DETAIL('1')), () => {
    return HttpResponse.json(PlaceDetail)
  }),
  http.get(addBaseUrl(API_PATH.PLACES.NEW.PREVIEW('1')), () => {
    return HttpResponse.json(PlacePreview)
  }),
  http.get(addBaseUrl(API_PATH.PLACES.LIKE.GET), () => {
    return HttpResponse.json(Places)
  }),
]
