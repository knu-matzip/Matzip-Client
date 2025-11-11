import { cn } from '../../../utils/cn'
import type { FlexType } from '../Flex/Flex'

export const Column: FlexType = ({ as, className, children, ...restProps }) => {
  const Component = as || 'div'

  return (
    <Component className={cn('ui:flex ui:flex-col', className)} {...restProps}>
      {children}
    </Component>
  )
}
