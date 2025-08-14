import type { ElementType, JSX, PropsWithChildren } from 'react'
import type { PolymorphicComponentProps } from '../../polymorphics'
import { cn } from '../../utils/cn'
import { Text } from '../Text'
import { BUTTON_FONT_SIZE, BUTTON_SIZE } from './consts'

export interface ButtonProps {
  // color: 'primary' | 'secondary' | 'mono'
  // variant: 'filled' | 'outlined' | 'subtle' | 'text'
  size: 'small' | 'medium' | 'large'
}

export type Props<C extends ElementType> = PolymorphicComponentProps<
  C,
  ButtonProps
>
export type ButtonType = <C extends ElementType = 'button'>(
  props: PropsWithChildren<Props<C>>,
) => JSX.Element

export const Button: ButtonType = ({ as, className, size, children }) => {
  const Component = as || 'button'

  return (
    <Component
      className={cn(
        'ui:flex',
        'ui:justify-center',
        'ui:items-center',
        'ui:bg-main',
        'ui:text-white',
        'ui:rounded-lg',
        BUTTON_SIZE[size],
        className,
      )}
    >
      <Text as={'span'} variant={BUTTON_FONT_SIZE[size]}>
        {children}
      </Text>
    </Component>
  )
}
