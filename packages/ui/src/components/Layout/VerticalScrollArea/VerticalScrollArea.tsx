import { cn } from '../../../utils/cn'
import type { FlexType } from '../Flex/Flex'

export const VerticalScrollArea: FlexType = ({
  as,
  className,
  children,
  ...restProps
}) => {
  const Component = as || 'div'

  return (
    <Component
      className={cn('ui:flex ui:flex-col', 'ui:overflow-auto', className)}
      {...restProps}
    >
      {children}
    </Component>
  )
}
