'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { getSearchPlaceByKakao } from '@/_apis/services/place'

/**
 * 검색된 장소 정보를 나타내는 인터페이스
 */
export interface SearchPlace {
  id: string
  place_name: string
  x: string
  y: string
  road_address_name?: string
  address_name: string
}

export const KAKAO_CATEGORY_CODE = {
  restaurant: 'FD6',
  cafe: 'CE7',
}

export type KakaoCategoryCode = keyof typeof KAKAO_CATEGORY_CODE
export type KakaoSearchFuncParams = {
  query: string
  categoryCode: KakaoCategoryCode
  location: { x: number; y: number }
}

/**
 * Kakao Local API를 이용한 장소 검색을 수행하는 커스텀 훅
 *
 * - 입력된 query를 기준으로 장소 검색 API 호출
 * - 300ms 디바운싱 적용 (빠른 입력 시 불필요한 요청 방지)
 * - API 결과를 상태로 관리하여 컴포넌트에서 바로 사용 가능
 *
 * @returns 훅이 반환하는 값
 * @returns searchResult - 검색된 장소 리스트
 * @returns searchFunc - 검색을 수행하는 함수
 *
 * @example
 * const { searchResult, searchFunc } = useSearchData()
 *
 * // 인풋 변경 시 검색 실행
 * <input onChange={(e) => searchFunc(e.target.value)} />
 *
 * // 검색된 결과 출력
 * {searchResult.map(place => (
 *   <div key={place.id}>{place.place_name}</div>
 * ))}
 */
export const useSearchPlaceByKakao = () => {
  const [searchResult, setSearchResult] = useState<SearchPlace[]>([])
  const timeoutRef = useRef<NodeJS.Timeout>(null)

  /**
   * 검색 함수 (300ms 디바운스 적용)
   * @param query 검색 키워드
   */
  const searchFunc = useCallback(
    async ({ query, categoryCode, location }: KakaoSearchFuncParams) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)

      timeoutRef.current = setTimeout(async () => {
        try {
          const result = await getSearchPlaceByKakao({
            query,
            categoryCode,
            location,
          })
          setSearchResult([...result.documents])
        } catch (error) {
          console.error(error)
          setSearchResult([])
        }
      }, 300)
    },
    [],
  )

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  // 언마운트 시 타이머 클리어
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return { searchResult, searchFunc }
}
