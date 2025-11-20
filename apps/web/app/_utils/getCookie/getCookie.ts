import { getCookie as ClientGetCookie } from 'cookies-next'

/**
 * 서버(Next.js App Router)와 클라이언트(Browser) 환경 모두에서 작동하는 하이브리드 쿠키 조회 함수입니다.
 *
 * @remarks
 * 이 함수는 실행 환경을 자동으로 감지하여 적절한 방식으로 쿠키를 가져옵니다.
 * - **Server Environment**: `next/headers`의 `cookies()`를 동적으로 임포트하여 조회합니다. (클라이언트 번들링 제외)
 * - **Client Environment**: `cookies-next` 라이브러리를 사용하여 브라우저 쿠키를 조회합니다.
 * - `next/headers`의 비동기 특성에 맞춰 인터페이스 통일을 위해 항상 `Promise`를 반환합니다.
 *
 * @param name - 조회할 쿠키의 키(Key) 이름 (예: 'accessToken')
 * @returns 쿠키의 값(`string`)을 반환하며, 쿠키가 존재하지 않을 경우 `undefined`를 반환합니다.
 *
 * @example
 * ```typescript
 * // async 함수 내부에서 사용
 * const token = await getCookie('accessToken');
 *
 * if (token) {
 * console.log('Token exists:', token);
 * }
 * ```
 */
export const getCookie = async (name: string): Promise<string | undefined> => {
  // 서버 환경 (Next.js Server Component / Server Action / Route Handler)
  if (typeof window === 'undefined') {
    const { cookies } = await import('next/headers')
    const cookieStore = await cookies()
    return cookieStore.get(name)?.value
  }

  // 클라이언트 환경 (Browser)
  return ClientGetCookie(name) as string | undefined
}
