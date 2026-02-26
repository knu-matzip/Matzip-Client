import { http, HttpResponse } from 'msw'
import { EVENT_ENTRIES } from '../data/event'
import { API_PATH } from '@/_constants/path'
import { addBaseUrl } from './addBaseUrl'

export const EventHandlers = [
  // http.get(addBaseUrl(API_PATH.EVENT.INFO), () => {
  //   return HttpResponse.json(event)
  // }),
  // http.post(addBaseUrl(API_PATH.EVENT.ENTRIES), () => {
  //   return HttpResponse.json({ message: '성공' })
  // }),
  // http.get(addBaseUrl('/events/:eventId/entries'), () => {
  //   return HttpResponse.json(eventResult)
  // }),
  http.get(addBaseUrl(API_PATH.EVENT.ENTRIES), () => {
    return HttpResponse.json(EVENT_ENTRIES)
  }),
]
