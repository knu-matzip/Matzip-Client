import { getSearchPlaceByKakao } from '@/_apis/services/kakaoSearch'

export const searchCafeAndRestaurant = async (params: {
  query: string
  location: { x: number; y: number }
}) => {
  const [cafesResult, restaurantsResult] = await Promise.allSettled([
    getSearchPlaceByKakao({ ...params, categoryCode: 'cafe' }),
    getSearchPlaceByKakao({ ...params, categoryCode: 'restaurant' }),
  ])

  const cafes = cafesResult.status === 'fulfilled' ? cafesResult.value : []
  const restaurants =
    restaurantsResult.status === 'fulfilled' ? restaurantsResult.value : []

  // 두 결과를 합쳐서 반환
  return [...cafes, ...restaurants]
}
