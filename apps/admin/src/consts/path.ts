export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''

export const API_PATH = {
  REQUEST: {
    GET: {
      LIST: `/request/places`,
      DETAIL: (id: string | number) => `/request/places/${id}`,
    },
    POST: (id: string | number) => `/request/places/${id}/review`,
  },
} as const

export const CLIENT_PATH = {
  MAIN: '/',
  REQUEST_DETAIL: (id: string | number) => `/request/${id}`,
} as const
