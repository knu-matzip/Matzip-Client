'use client'
import type { ElementType, JSX, PropsWithChildren } from 'react'
import type { PolymorphicComponentProps } from '../../polymorphics'
import { useState } from 'react'
import { cn } from '../../utils/cn'
import { Icon } from '../Icon'
import { Text } from '../Text'

const CHIP_TAGS = {
  SOLO_FRIENDLY: {
    label: '혼밥하기 좋은',
    icon: 'fingerUp',
  },
  VALUE_FOR_MONEY: {
    label: '가성비 좋은',
    icon: 'calculator',
  },
  GOOD_AMBIENCE: {
    label: '분위기 좋은',
    icon: 'blingBling',
  },
  KIND_SERVICE: {
    label: '친절해요',
    icon: 'waiter',
  },
} as const

type ChipTagKey = keyof typeof CHIP_TAGS

export type ChipProps<C extends ElementType> = PolymorphicComponentProps<
  C,
  {
    type: ChipTagKey
    onToggle?: () => void
  }
>

export type ChipType = <C extends ElementType = 'button'>(
  props: PropsWithChildren<ChipProps<C>>,
) => JSX.Element

/**
 * Chip 컴포넌트
 *
 * - 아이콘과 라벨을 가진 토글 가능한 UI 요소입니다.
 * - 클릭 시 내부 상태 `isActive`를 토글하며, `onToggle` 콜백을 실행합니다.
 * - 다양한 HTML 요소(`as` prop)를 지정하여 렌더링할 수 있습니다.
 *
 * @template C 렌더링할 HTML 태그 타입 (기본값: 'button')
 *
 * @param as 렌더링할 HTML 태그 또는 컴포넌트
 * @param className 추가 CSS 클래스
 * @param type 표시할 Chip 타입
 * @param onToggle 클릭 시 실행할 콜백 함수
 * @param restProps 나머지 Props
 *
 * @returns 렌더링된 Chip 요소
 *
 * @example
 * <Chip type="SOLO_FRIENDLY" onToggle={() => console.log('클릭됨')} />
 */
export const Chip: ChipType = ({
  as,
  className,
  type,
  onToggle,
  ...restProps
}) => {
  const Component = as || 'button'
  const { icon, label } = CHIP_TAGS[type]
  const [isActive, setIsActive] = useState(false)

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
      onClick={onClick}
      {...restProps}
    >
      <Icon type={icon} size={14} />
      <Text as={'span'} variant={'caption1'} className={'ui:text-gray-300'}>
        {label}
      </Text>
    </Component>
  )
}
