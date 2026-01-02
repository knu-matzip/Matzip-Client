'use client'
import type { ElementType, JSX, PropsWithChildren } from 'react'
import type { PolymorphicComponentProps } from '../../polymorphics'
import { useState } from 'react'
import { cn } from '../../utils/cn'
import { Icon, type IconType } from '../Icon'
import { Text } from '../Text'

export type ChipProps<C extends ElementType> = PolymorphicComponentProps<
  C,
  {
    icon: IconType
    label: string
    onToggle?: () => void
    initialActiveValue?: boolean
  }
>

export type ChipType = <C extends ElementType = 'div'>(
  props: PropsWithChildren<ChipProps<C>>,
) => JSX.Element

/**
 * Chip 컴포넌트
 *
 * - 아이콘과 라벨을 가진 토글 가능한 UI 요소입니다.
 * - 클릭 시 내부 상태 `isActive`를 토글하며, `onToggle` 콜백을 실행합니다.
 * - 다양한 HTML 요소(`as` prop)를 지정하여 렌더링할 수 있습니다.
 *
 * @template C 렌더링할 HTML 태그 타입 (기본값: 'div')
 *
 * @param as 렌더링할 HTML 태그 또는 컴포넌트
 * @param className 추가 CSS 클래스
 * @param icon 표시할 아이콘 타입
 * @param label Chip에 표시할 텍스트 라벨
 * @param onToggle 클릭 시 실행할 콜백 함수
 * @param initialActiveValue 토글 초기값
 * @param restProps 나머지 Props
 *
 * @returns 렌더링된 Chip 요소
 *
 * @example
 * ```tsx
 * <Chip icon="fingerUp" label="혼밥하기 좋은" onToggle={() => console.log('클릭됨')} />
 * ```
 */
export const Chip: ChipType = ({
  as,
  className,
  icon,
  label,
  onToggle,
  initialActiveValue = false,
  ...restProps
}) => {
  const Component = as || 'div'
  const [isActive, setIsActive] = useState(initialActiveValue)

  const onClick = () => {
    if (onToggle) {
      onToggle()
      setIsActive((prev) => !prev)
    }
  }

  return (
    <Component
      className={cn(
        'ui:w-fit',
        'ui:bg-gray-50',
        'ui:rounded-full',
        'ui:flex',
        'ui:gap-1',
        'ui:px-2.5 ui:py-1',
        'ui:items-center',
        'ui:border-2 ui:border-gray-50',
        { 'ui:border-blue': isActive },
        className,
      )}
      {...restProps}
      onClick={onClick}
    >
      <Icon type={icon} size={16} />
      <Text
        as={'span'}
        variant={'caption1'}
        className={'ui:text-gray-300 ui:text-nowrap'}
      >
        {label}
      </Text>
    </Component>
  )
}
