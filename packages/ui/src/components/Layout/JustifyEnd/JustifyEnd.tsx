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
      className={cn('ui:flex ui:items-center ui:justify-end', className)}
      {...restProps}
    >
      {children}
    </Component>
  )
}
