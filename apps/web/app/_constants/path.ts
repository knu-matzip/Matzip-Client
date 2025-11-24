import { MapBounds, RankingPlaceSort } from '@/_apis/schemas/place'
import { CampusType } from '@/_constants/campus'

export const API_PATH = {
  CATEGORY: '/categories',
  PLACES: {
    BY_CATEGORY: (id: string, campus: CampusType) =>
      `/categories/${id}/places?campus=${campus}`,
    BY_RANKING: (sort: RankingPlaceSort, campus: CampusType) =>
      `/places/ranking?sort=${sort}&campus=${campus}`,
    BY_MAP: ({
      minLatitude,
      minLongitude,
      maxLatitude,
      maxLongitude,
    }: MapBounds) =>
      `/places?maxLat=${maxLatitude}&maxLng=${maxLongitude}&minLat=${minLatitude}&minLng=${minLongitude}`,
    DETAIL: (id: string) => `/places/${id}`,
    NEW: {
      PREVIEW: (kakaoPlaceId: string) =>
        `/places/preview?kakaoPlaceId=${kakaoPlaceId}`,
      CREATE: '/places',
    },
    LIKE: {
      GET: '/places/like',
      POST: (id: string) => `/places/${id}/like`,
      DELETE: (id: string) => `/places/${id}/like`,
    },
    SEARCH: (keyword: string) => `/places/search?keyword=${keyword}`,
  },
  KAKAO: {
    SEARCH: (query: string, categoryCode: string, x: number, y: number) =>
      `https://dapi.kakao.com/v2/local/search/keyword.json?query=${query}&category_group_code=${categoryCode}&x=${x}&y=${y}`,
  },
  EVENT: {
    INFO: '/events',
    PARTICIPATIONS: '/events/participations',
    RESULT: '/events/results',
  },
  REQUEST: {
    LIST: '/requests/places',
    DETAIL: (id: string) => `/requests/places/${id}`,
  },
  AUTH: {
    AUTHORIZE: (code: string, redirectUri: string) =>
      `/auth/oauth2?code=${code}&redirectUri=${redirectUri}`,
    TOKEN: '/auth/token',
  },
  USER: '/users/me',
}

export const CLIENT_PATH = {
  MAIN: '/',
  MAP: '/map',
  PLACE_NEW: '/places/new',
  PLACE_NEW_SUCCESS: '/places/new/success',
  PLACE_NEW_FAIL: '/places/new/fail',
  PLACE_SEARCH: '/places/search',
  PLACE_DETAIL: (id: string | number) => `/places/${id}`,
  CATEGORY_DETAIL: (id: string | number) => `/categories/${id}`,
  LIKES: '/likes',
  PROFILE: '/profile',
  REQUESTS: '/requests',
  REQUEST_DETAIL: (id: string | number) => `/requests/${id}`,
  EVENTS_FOOD_SLOT: '/events/food-slot',
  EVENTS_LUCKY_DRAW: '/events/lucky-draw',
  EVENT_GIFTICON: '/events/gifticon',
  EVENT_GIFTICON_DETAIL: (id: string | number) => `/events/gifticon/${id}`,
  LOGIN: '/login',
  LOGIN_SUCCESS: '/login/loading/success', // Todo: path 변경 필요
}
