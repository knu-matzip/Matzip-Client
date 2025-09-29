import { http, HttpResponse } from 'msw'
import { event, eventResult } from '../data/event'
import { API_PATH } from '@/_constants/path'
import { addBaseUrl } from './addBaseUrl'

export const EventHandlers = [
  http.get(addBaseUrl(API_PATH.EVENT.INFO), () => {
    return HttpResponse.json(event)
  }),
  http.post(addBaseUrl(API_PATH.EVENT.PARTICIPATIONS), () => {
    return HttpResponse.json({ message: '성공' })
  }),
  http.get(addBaseUrl(API_PATH.EVENT.RESULT), () => {
    return HttpResponse.json(eventResult)
  }),
]
