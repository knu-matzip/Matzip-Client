import { cn } from '../../../utils/cn'
import type { FlexType } from '../Flex/Flex'

export const JustifyAround: FlexType = ({
  as,
  className,
  children,
  ...restProps
}) => {
  const Component = as || 'div'

  return (
    <Component
      className={cn('ui:flex ui:items-center ui:justify-around', className)}
      {...restProps}
    >
      {children}
    </Component>
  )
}
