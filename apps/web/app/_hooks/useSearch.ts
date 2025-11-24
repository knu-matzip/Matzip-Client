import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * - 입력된 query를 기준으로 장소 검색 API 호출
 * - 300ms 디바운싱 적용 (빠른 입력 시 불필요한 요청 방지)
 * - API 결과를 상태로 관리하여 컴포넌트에서 바로 사용 가능
 *
 * @example
 *  const { searchResult: cafeResult, searchFunc: cafeSearchFunc } = useSearch<
 *     SearchPlace,
 *     KakaoSearchFuncParams
 *   >(getSearchPlaceByKakao)
 *
 *
 * @template T 검색 결과 아이템의 타입 (예: SearchPlace)
 * @template P 검색 함수에 들어갈 파라미터 타입 (예: KakaoSearchFuncParams)
 * @param fetcher Promise<T[]>를 반환하는 비동기 검색 함수
 *
 * @returns searchResult - 검색된 장소 리스트
 * @returns searchFunc - 검색을 수행하는 함수
 */

export const useSearch = <T, P>(fetcher: (params: P) => Promise<T[]>) => {
  const [searchResult, setSearchResult] = useState<T[]>([])
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const searchFunc = useCallback(
    (params: P) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)

      timeoutRef.current = setTimeout(async () => {
        try {
          // 주입받은 fetcher 실행
          const result = await fetcher(params)
          setSearchResult(result)
        } catch (error) {
          console.error('Search failed:', error)
          setSearchResult([])
        }
      }, 300)
    },
    [fetcher], // fetcher가 변경되면 함수 재생성
  )

  // 언마운트 시 타이머 클리어
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return { searchResult, searchFunc }
}
