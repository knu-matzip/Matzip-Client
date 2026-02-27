import type { ElementType } from 'react'
import { Icon } from '../Icon'
import { Flex } from '../Layout'
import { cn } from '../../utils/cn'
import { Text } from '../Text'

type Props = {
  as?: ElementType
  href: string
  className?: string
}

export const SearchBar = ({
  as = 'a',
  href,
  className,
  ...restProps
}: Props) => {
  return (
    <Flex
      as={as}
      href={href}
      className={cn(
        'ui:border ui:border-gray-200',
        'ui:rounded-xl',
        'ui:p-3.5',
        'ui:items-center',
        'ui:gap-2',
        className,
      )}
      aria-label={'검색 페이지로 이동'}
      {...restProps}
    >
      <Icon type={'search'} size={16} />
      <Text
        fontSize={'sm'}
        fontWeight={'normal'}
        className={cn('ui:text-gray-200', 'ui:outline-none', 'ui:w-full')}
      >
        식당 또는 메뉴를 검색해주세요
      </Text>
    </Flex>
  )
}
