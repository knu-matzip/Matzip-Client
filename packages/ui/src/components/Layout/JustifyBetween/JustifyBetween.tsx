import { cn } from '../../../utils/cn'
import type { FlexType } from '../Flex/Flex'

export const JustifyBetween: FlexType = ({
  as,
  className,
  children,
  ...restProps
}) => {
  const Component = as || 'div'

  return (
    <Component
      as={as}
      className={cn('ui:flex ui:justify-between', className)}
      {...restProps}
    >
      {children}
    </Component>
  )
}
