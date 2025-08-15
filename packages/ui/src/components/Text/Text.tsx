import type { PropsWithChildren, ElementType, JSX } from 'react'
import type { PolymorphicComponentProps } from '../../polymorphics'
import { cn } from '../../utils/cn'

type FontSize =
  | 'xs' // 12px
  | 'sm' // 14px
  | 'base' // 16px
  | 'lg' // 18px
  | 'xl' // 20px
  | '2xl' // 24px
  | '3xl' // 30px
  | '4xl' // 36px
  | '5xl' // 48px

type FontWeight =
  | 'thin' // Figma: Thin, 100
  | 'extralight' // Figma: Extra Light, 200
  | 'light' // Figma: Light, 300
  | 'normal' // Figma: Regular / Normal, 400
  | 'medium' // Figma: Medium, 500
  | 'semibold' // Figma: Semi Bold, 600
  | 'bold' // Figma: Bold, 700
  | 'extrabold' // Figma: Extra Bold, 800
  | 'black' // Figma: Black, 900

export type TypographyVariant =
  | 'heading1'
  | 'heading2'
  | 'title1'
  | 'title2'
  | 'title3'
  | 'body1'
  | 'body2'
  | 'body3'
  | 'caption1'
  | 'caption2'

const fontSizeClasses: Record<FontSize, string> = {
  xs: 'ui:text-xs',
  sm: 'ui:text-sm',
  base: 'ui:text-base',
  lg: 'ui:text-lg',
  xl: 'ui:text-xl',
  '2xl': 'ui:text-2xl',
  '3xl': 'ui:text-3xl',
  '4xl': 'ui:text-4xl',
  '5xl': 'ui:text-5xl',
}

const fontWeightClasses: Record<FontWeight, string> = {
  thin: 'ui:font-thin',
  extralight: 'ui:font-extralight',
  light: 'ui:font-light',
  normal: 'ui:font-normal',
  medium: 'ui:font-medium',
  semibold: 'ui:font-semibold',
  bold: 'ui:font-bold',
  extrabold: 'ui:font-extrabold',
  black: 'ui:font-black',
}

export const typographyVariants: Record<TypographyVariant, string> = {
  heading1: 'ui:text-[22px] ui:font-bold ui:leading-[1.4]', // 22px, Bold
  heading2: 'ui:text-xl ui:font-semibold ui:leading-[1.4]', // 20px, SemiBold
  title1: 'ui:text-lg ui:font-semibold ui:leading-[1.4]', // 18px, SemiBold
  title2: 'ui:text-base ui:font-bold ui:leading-[1.4]', // 16px, Bold
  title3: 'ui:text-base ui:font-semibold ui:leading-[1.4]', // 16px, SemiBold
  body1: 'ui:text-sm ui:font-medium ui:leading-[1.5]', // 14px, Medium
  body2: 'ui:text-sm ui:font-normal ui:leading-[1.5]', // 14px, Normal
  body3: 'ui:text-sm ui:font-light ui:leading-[1.5]', // 14px, Light
  caption1: 'ui:text-xs ui:font-medium ui:leading-[1.5]', // 12px, Medium
  caption2: 'ui:text-xs ui:font-light ui:leading-[1.5]', // 12px, Light
}

export type TextProps<C extends ElementType> = PolymorphicComponentProps<
  C,
  {
    className?: string
    fontSize?: FontSize
    fontWeight?: FontWeight
    variant?: TypographyVariant
  }
>

export type TextType = <C extends ElementType = 'p'>(
  props: PropsWithChildren<TextProps<C>>,
) => JSX.Element

/**
 * Text 컴포넌트
 *
 * - 다양한 HTML 태그(`as` prop)로 렌더링 가능한 폴리모픽 컴포넌트입니다.
 * - `variant`가 지정되면 사전에 정의된 타이포그래피 스타일을 적용합니다.
 * - `variant`가 없으면 `fontSize`와 `fontWeight` 조합으로 스타일을 구성합니다.
 *
 * @template C HTML 태그 타입 (기본값: 'p')
 *
 * @param as 렌더링할 HTML 태그 또는 컴포넌트
 * @param className 추가로 적용할 CSS 클래스
 * @param fontSize 폰트 크기 프리셋 (variant 미지정 시만 적용)
 * @param fontWeight 폰트 굵기 프리셋 (variant 미지정 시만 적용)
 * @param variant 사전 정의된 타이포그래피 스타일 키
 * @param children 텍스트 또는 하위 요소
 * @param restProps 나머지 Props
 * @returns 렌더링된 텍스트 요소
 *
 * @example
 * <Text variant="heading1">Heading 1 텍스트</Text>
 * @example
 * <Text fontSize="lg" fontWeight="bold">굵은 18px 텍스트</Text>
 * @example
 * <Text as="span" variant="caption1">캡션 텍스트</Text>
 */
export const Text: TextType = ({
  as,
  className,
  fontSize,
  fontWeight,
  variant,
  children,
  ...restProps
}) => {
  const Component = as || 'p'

  const variantClass = variant ? typographyVariants[variant] : ''
  const sizeClass = fontSize ? fontSizeClasses[fontSize] : ''
  const weightClass = fontWeight ? fontWeightClasses[fontWeight] : ''

  return (
    <Component
      className={cn(variantClass || `${sizeClass} ${weightClass}`, className)}
      {...restProps}
    >
      {children}
    </Component>
  )
}
