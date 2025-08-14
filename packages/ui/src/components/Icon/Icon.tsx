import { iconMap, type IconType } from './IconMap'
import { SVGProps } from 'react'
import '@repo/tailwind-config'

const IconColor = {
  '--color-main': '#313D4C',
  '--color-blue': '#3182F7',
  '--color-red': '#EF4452',
  '--color-white': '#FFFFFF',
  '--color-gray-50': '#F3F4F6',
  '--color-gray-100': '#E4E7EB',
  '--color-gray-200': '#B0B9C2',
  '--color-gray-300': '#6C7887',
  '--color-gray-400': '#3D3D3D',
  '--color-gray-500': '#403E3F',
} as const

type IconColorType = keyof typeof IconColor

export type Props = {
  type: IconType
  size?: number
  color?: IconColorType
} & Omit<SVGProps<SVGSVGElement>, 'color'>

/**
 * `iconMap`에 정의된 `type` 값을 기반으로 SVG 아이콘을 렌더링합니다.
 * `size`를 지정하면 아이콘의 `width`와 `height`가 동일하게 변경됩니다.
 *
 * @example
 * // 기본 아이콘
 * <Icon type="chicken" />
 *
 * @param props - Icon 컴포넌트 속성
 * @param props.type - 렌더링할 아이콘의 키값 (`iconMap`의 key)
 * @param [props.size=24] - 아이콘의 크기 (width, height에 동일 적용)
 * @param [props.color] - 아이콘의 색상
 * @returns 렌더링된 SVG 아이콘
 */
export function Icon({ type, size = 24, color, ...props }: Props) {
  const Icon = iconMap[type]

  return (
    <Icon
      width={size}
      height={size}
      color={color ? IconColor[color] : undefined}
      {...props}
    />
  )
}
