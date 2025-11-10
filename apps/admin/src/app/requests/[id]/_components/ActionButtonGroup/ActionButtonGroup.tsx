import { Flex } from '@repo/ui/components/Layout'
import { cn } from '@repo/ui/utils/cn'
import { COLOR_VARIANTS } from '@repo/ui/consts/colorVariant'

type Props = {
  onOpen: VoidFunction
}

export const ActionButtonGroup = ({ onOpen }: Props) => (
  <Flex className={'gap-10'}>
    <button
      onClick={onOpen}
      className={cn(
        'w-full',
        'rounded-lg',
        'py-2',
        COLOR_VARIANTS.red.text,
        COLOR_VARIANTS.red.background,
      )}
    >
      거절
    </button>
    <button
      className={cn(
        'w-full',
        'rounded-lg',
        'py-2',
        COLOR_VARIANTS.blue.text,
        COLOR_VARIANTS.blue.background,
      )}
    >
      등록
    </button>
  </Flex>
)
