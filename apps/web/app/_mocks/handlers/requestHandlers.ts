import { http, HttpResponse } from 'msw'
import { API_PATH } from '@/_constants/path'
import { requests } from '../data/request'
import { addBaseUrl } from './addBaseUrl'

export const RequestHandlers = [
  http.get(addBaseUrl(API_PATH.REQUEST.LIST), () => {
    return HttpResponse.json(requests)
  }),
]
