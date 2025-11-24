export const KAKAO_CATEGORY_CODE = {
  restaurant: 'FD6',
  cafe: 'CE7',
}

export type KakaoSearchFuncParams = {
  query: string
  categoryCode: KakaoCategoryCode
  location: { x: number; y: number }
}

export type SearchPlaceByKakao = {
  id: string
  place_name: string
  x: string
  y: string
  road_address_name?: string
  address_name: string
}

export type KakaoCategoryCode = keyof typeof KAKAO_CATEGORY_CODE
