import { Icon } from '@repo/ui/components/Icon'
import { Text } from '@repo/ui/components/Text'
import { Flex } from '@repo/ui/components/Layout'
import { cn } from '@repo/ui/utils/cn'

type Props = {
  onClick: VoidFunction
}

export const RefreshButton = ({ onClick }: Props) => (
  <Flex
    as={'button'}
    className={cn(
      'absolute left-1/2 top-[100px] -translate-x-1/2',
      'z-10',
      'w-fit px-3.5 py-2',
      'gap-1.5',
      'rounded-full',
      'bg-white',
    )}
    onClick={onClick}
  >
    <Icon type={'refresh'} size={15} />
    <Text variant={'body2'}>현재 지도에서 찾기</Text>
  </Flex>
)
