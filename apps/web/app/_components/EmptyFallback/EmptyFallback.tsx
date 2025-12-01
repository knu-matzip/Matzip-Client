import { Column } from '@repo/ui/components/Layout'
import { Text } from '@repo/ui/components/Text'
import { ReactNode } from 'react'

type Props = {
  /** 데이터가 비어있는지 여부 (true면 Fallback, false면 children 렌더링) */
  isEmpty: boolean
  /** 데이터가 비어있을 때 보여줄 제목 (예: "검색 결과가 없습니다") */
  fallbackTitle?: string
  /** 데이터가 비어있을 때 보여줄 상세 설명 */
  fallbackDescription?: string
  /** 데이터가 존재할 때 렌더링할 실제 콘텐츠 */
  children: ReactNode
}

/**
 * 데이터 유무(`isEmpty`)에 따라 Fallback UI 또는 실제 콘텐츠를 조건부 렌더링하는 래퍼 컴포넌트입니다.
 *
 * @example
 * ```tsx
 * <EmptyFallback
 * isEmpty={feeds.length === 0}
 * fallbackTitle="작성된 일기가 없습니다."
 * fallbackDescription="첫 번째 일기를 작성해보세요!"
 * >
 * <FeedList data={feeds} />
 * </EmptyFallback>
 * ```
 */
export const EmptyFallback = ({
  isEmpty,
  fallbackTitle,
  fallbackDescription,
  children,
}: Props) => {
  if (!isEmpty) return <>{children}</>

  return (
    <Column className='h-full flex-1 items-center justify-center gap-1 p-10 text-center'>
      {fallbackTitle && (
        <Text variant='title3' className='text-gray-300'>
          {fallbackTitle}
        </Text>
      )}
      {fallbackDescription && (
        <Text
          variant='body1'
          className='whitespace-pre-wrap break-words text-gray-300'
        >
          {fallbackDescription}
        </Text>
      )}
    </Column>
  )
}
