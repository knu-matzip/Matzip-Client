import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { ReactNode } from 'react'

/**
 * 서버 컴포넌트에서 React Query 쿼리를 미리 요청(prefetch)하고,
 * 클라이언트로 전달하여 초기 데이터를 사용할 수 있도록 해주는 컴포넌트입니다.
 *
 * @param children - HydrationBoundary로 감쌀 React 노드
 * @param prefetch - 서버에서 실행할 prefetch 함수. QueryClient를 받아서 필요한 쿼리를 모두 prefetch하도록 구현합니다.
 *
 * @returns HydrationBoundary로 감싼 children
 *
 * @example
 * ```tsx
 * <HydrationBoundaryPage
 *   prefetch={async (queryClient) => {
 *     await queryClient.prefetchQuery(useCategoryQueries.list())
 *     await queryClient.prefetchQuery(usePlaceQueries.rankingList('likes'))
 *   }}
 * >
 *   <Categories />
 * </HydrationBoundaryPage>
 * ```
 */
export const HydrationBoundaryPage = async ({
  children,
  prefetch,
}: {
  children: ReactNode
  prefetch: (queryClient: QueryClient) => Promise<void>
}) => {
  const queryClient = new QueryClient()
  await prefetch(queryClient)

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  )
}
