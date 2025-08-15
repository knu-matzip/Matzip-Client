import { Flex, JustifyBetween } from '../Layout'
import type { ReactNode } from 'react'
import { Icon } from '../Icon'
import { Text } from '../Text'
import type { IconType } from '../Icon/IconMap'

type Props = {
  left?: ReactNode
  center?: ReactNode
  right?: ReactNode
}

export const Header = ({ left, center, right }: Props) => {
  return (
    <JustifyBetween as='header' className='ui:px-5 ui:py-3.5 ui:items-center'>
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
    <Text variant={'heading1'}>{name}</Text>
  </Flex>
)
