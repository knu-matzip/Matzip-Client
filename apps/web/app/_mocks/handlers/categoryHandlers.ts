import { http, HttpResponse } from 'msw'
import { category } from '../data/category'
import { API_PATH } from '@/_constants/path'
import { addBaseUrl } from './addBaseUrl'

export const CategoryHandlers = [
  http.get(addBaseUrl(API_PATH.CATEGORY), () => {
    return HttpResponse.json(category)
  }),
]
