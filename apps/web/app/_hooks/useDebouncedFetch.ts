import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * 비동기 함수(fetcher)를 디바운싱하여 실행하고, 그 결과를 상태로 관리하는 훅
 *
 * - 입력이 멈춘 후 일정 시간(delay) 뒤에 API를 호출합니다.
 * - 검색어 자동완성, 필터링 등 잦은 요청을 방지해야 할 때 유용합니다.
 *
 * @template T 결과 데이터의 타입
 * @template P 파라미터의 타입
 *
 * @param fetcher 데이터를 가져오는 비동기 함수 (Promise 반환)
 * @param delay 디바운스 지연 시간 (ms, 기본값: 300ms)
 *
 * @returns data - 비동기 작업의 결과 데이터 (초기값: [])
 * @returns trigger - 디바운스가 적용된 실행 함수
 *
 * @example
 * const { data: places, trigger: searchPlaces } = useDebouncedFetch(getSearchPlaceByKakao, 500);
 * // searchPlaces('강남역') 호출 시 500ms 후 API 호출 -> places 업데이트
 */
export const useDebouncedFetch = <T, P>(
  fetcher: (params: P) => Promise<T[]>,
  delay: number = 300,
) => {
  const [data, setData] = useState<T[]>([])
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const trigger = useCallback(
    (params: P) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)

      timeoutRef.current = setTimeout(async () => {
        try {
          const result = await fetcher(params)
          setData(result)
        } catch (error) {
          console.error('Debounced fetch failed:', error)
          setData([])
        }
      }, delay)
    },
    [fetcher, delay],
  )

  // 언마운트 시 타이머 클리어
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return [data, trigger] as const
}
