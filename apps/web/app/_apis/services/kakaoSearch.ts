import axios from 'axios'
import { API_PATH } from '@/_constants/path'
import {
  KAKAO_CATEGORY_CODE,
  type KakaoSearchFuncParams,
  type SearchPlaceByKakao,
} from '@/_apis/schemas/kakaoSearch'

export const getSearchPlaceByKakao = async ({
  query,
  categoryCode,
  location,
}: KakaoSearchFuncParams): Promise<SearchPlaceByKakao[]> => {
  const KAKAO_API_KEY = process.env.NEXT_PUBLIC_KAKAO_API || ''
  const { x, y } = location
  try {
    const { data } = await axios.get(
      API_PATH.KAKAO.SEARCH(query, KAKAO_CATEGORY_CODE[categoryCode], x, y),
      {
        headers: {
          Authorization: `KakaoAK ${KAKAO_API_KEY}`,
        },
      },
    )

    if (!data?.documents || !Array.isArray(data.documents)) {
      return []
    }

    return data.documents
  } catch (error) {
    console.error('카카오 장소 검색 실패:', error)
    throw error
  }
}
