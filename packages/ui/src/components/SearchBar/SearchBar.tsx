import { Icon } from '../Icon'
import { Flex } from '../Layout'
import { cn } from '../../utils/cn'
import { Text } from '../Text'

export const SearchBar = ({
  href,
  className,
}: {
  href: string
  className?: string
}) => {
  return (
    <Flex
      as='a'
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
    >
      <Icon type={'search'} size={16} />
      <Text
        fontSize={'sm'}
        fontWeight={'normal'}
        className={cn('ui:text-gray-200', 'ui:outline-none', 'ui:w-full')}
      >
        식당을 검색해주세요
      </Text>
    </Flex>
  )
}
