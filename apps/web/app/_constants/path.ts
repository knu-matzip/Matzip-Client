import { RankingPlaceSort } from '@/_apis/schemas/place'

export const API_PATH = {
  CATEGORY: '/categories',
  PLACES: {
    BY_CATEGORY: (id: string) => `/places?categoryId=${id}`,
    BY_RANKING: (sort: RankingPlaceSort) => `/places/ranking?sort=${sort}`,
  },
}

export const CLIENT_PATH = {
  MAIN: '/',
  MAP: '/map',
  PLACE_NEW: '/places/new',
  PLACE_SEARCH: '/places/search',
  PLACE_DETAIL: (id: string | number) => `/places/${id}`,
  CATEGORY_DETAIL: (id: string | number) => `/categories/${id}`,
  LIKES: '/likes',
  PROFILE: '/profile',
}
