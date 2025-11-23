import axios from 'axios'
import { API_PATH } from '@/_constants/path'
import {
  KAKAO_CATEGORY_CODE,
  KakaoSearchFuncParams,
} from '@/_apis/schemas/kakaoSearch'

export const getSearchPlaceByKakao = async ({
  query,
  categoryCode,
  location,
}: KakaoSearchFuncParams) => {
  const KAKAO_API_KEY = process.env.NEXT_PUBLIC_KAKAO_API || ''
  const { x, y } = location

  const { data } = await axios.get(
    API_PATH.KAKAO.SEARCH(query, KAKAO_CATEGORY_CODE[categoryCode], x, y),
    {
      headers: {
        Authorization: `KakaoAK ${KAKAO_API_KEY}`,
      },
    },
  )
  return data.documents
}
