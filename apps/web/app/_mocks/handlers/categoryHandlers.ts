import { http, HttpResponse } from 'msw'
import { category } from '../data/category'
import { API_PATH } from '@/_constants/path'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''

const addBaseUrl = (path: string) => {
  return `${BASE_URL}${path}`
}

export const CategoryHandlers = [
  http.get(addBaseUrl(API_PATH.CATEGORY), () => {
    return HttpResponse.json(category)
  }),
]
