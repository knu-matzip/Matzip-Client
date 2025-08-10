import type { PropsWithChildren, ElementType, JSX } from 'react'
import type { PolymorphicComponentProps } from '../../../polymorphics'
import { cn } from '../../../utils/cn'

export type FlexProps<C extends ElementType> = PolymorphicComponentProps<
  C,
  { className?: string }
>

export type FlexType = <C extends ElementType = 'div'>(
  props: PropsWithChildren<FlexProps<C>>,
) => JSX.Element

export const Flex: FlexType = ({ as, className, children, ...restProps }) => {
  const Component = as || 'div'

  return (
    <Component className={cn('ui:flex', className)} {...restProps}>
      {children}
    </Component>
  )
}
