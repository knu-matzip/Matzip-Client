import { Column } from '@repo/ui/components/Layout'
import { Icon } from '@repo/ui/components/Icon'
import { Text } from '@repo/ui/components/Text'
import { cn } from '@repo/ui/utils/cn'
import type { Category } from '@/_apis/schemas/category'

type Props = {
  category: Category
  isActive: boolean
  onClick: VoidFunction
}

export const CategoryItem = ({ category, isActive, onClick }: Props) => {
  const { iconKey, name } = category

  return (
    <Column
      as={'button'}
      onClick={onClick}
      className={'w-10 items-center gap-1'}
    >
      <Icon type={iconKey} size={26} />
      <Text
        fontSize={'xs'}
        fontWeight={isActive ? 'semibold' : 'light'}
        className={'text-nowrap'}
      >
        {name}
      </Text>
      <hr
        className={cn('border-main w-full rounded-full border-2', {
          invisible: !isActive,
        })}
      />
    </Column>
  )
}
