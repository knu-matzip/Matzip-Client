import { RankingPlaceSort } from '@/_apis/schemas/place'
import { CampusType } from '@/_constants/campus'

export const API_PATH = {
  CATEGORY: '/categories',
  PLACES: {
    BY_CATEGORY: (id: string, campus: CampusType) =>
      `/places?categoryId=${id}&campus=${campus}`,
    BY_RANKING: (sort: RankingPlaceSort, campus: CampusType) =>
      `/places/ranking?sort=${sort}&campus=${campus}`,
    DETAIL: (id: string) => `/places/${id}`,
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
