import type { ReactNode } from 'react'
import { Text } from '../Text'
import { Icon, type IconType } from '../Icon'
import { Flex, JustifyBetween } from '../Layout'
import { cn } from '../../utils/cn'

type Props = {
  left?: ReactNode
  center?: ReactNode
  right?: ReactNode
  className?: string
}

export const Header = ({ left, center, right, className }: Props) => {
  return (
    <JustifyBetween
      as='header'
      className={cn('ui:px-5 ui:py-3.5 ui:items-center', className)}
    >
      {left}
      {center}
      {right ?? <div className='ui:invisible'>{left}</div>}
    </JustifyBetween>
  )
}

export const OnlyLeftHeader = ({
  icon,
  name,
}: {
  icon: IconType
  name: string
}) => (
  <Flex as={'header'} className='ui:gap-1 ui:py-3.5 ui:px-5 ui:items-center'>
    <Icon type={icon} size={26} />
    <Text as={'h1'} variant={'heading1'}>
      {name}
    </Text>
  </Flex>
)
