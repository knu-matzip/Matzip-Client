import { MapBounds, RankingPlaceSort } from '@/_apis/schemas/place'
import { CampusType } from '@/_constants/campus'

export const API_PATH = {
  CATEGORY: '/categories',
  PLACES: {
    BY_CATEGORY: (id: string, campus: CampusType) =>
      `/places?categoryId=${id}&campus=${campus}`,
    BY_RANKING: (sort: RankingPlaceSort, campus: CampusType) =>
      `/places/ranking?sort=${sort}&campus=${campus}`,
    BY_MAP: ({
      minLatitude,
      minLongitude,
      maxLatitude,
      maxLongitude,
    }: MapBounds) =>
      `/places?northEastLatitude=${maxLatitude}&northEastLongitudede=${maxLongitude}&southWestLatitude=${minLatitude}&southWestLongitude=${minLongitude}`,
    DETAIL: (id: string) => `/places/${id}`,
    NEW: {
      PREVIEW: (kakaoPlaceId: string) =>
        `/places/preview?kakaoPlaceId=${kakaoPlaceId}`,
    },
  },
  KAKAO: {
    SEARCH: (query: string, categoryCode: string, x: number, y: number) =>
      `https://dapi.kakao.com/v2/local/search/keyword.json?query=${query}&category_group_code=${categoryCode}&x=${x}&y=${y}`,
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
