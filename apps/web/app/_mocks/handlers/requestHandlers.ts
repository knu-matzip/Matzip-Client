import { http, HttpResponse } from 'msw'
import { API_PATH } from '@/_constants/path'
import { requests } from '../data/request'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''

export const addBaseUrl = (path: string) => {
  return `${BASE_URL}${path}`
}

export const RequestHandlers = [
  http.get(addBaseUrl(API_PATH.REQUEST.LIST), () => {
    return HttpResponse.json(requests)
  }),
]
