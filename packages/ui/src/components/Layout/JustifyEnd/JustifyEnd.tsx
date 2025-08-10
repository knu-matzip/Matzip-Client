import { cn } from '../../../utils/cn'
import type { FlexType } from '../Flex/Flex'

export const JustifyEnd: FlexType = ({
  as,
  className,
  children,
  ...restProps
}) => {
  const Component = as || 'div'

  return (
    <Component
      as={as}
      className={cn('ui:flex ui:justify-end', className)}
      {...restProps}
    >
      {children}
    </Component>
  )
}
