import type { Category as CategoryType } from '@/_apis/schemas/category'
import { Column } from '@repo/ui/components/Layout'
import { Icon } from '@repo/ui/components/Icon'
import { Text } from '@repo/ui/components/Text'
import { cn } from '@repo/ui/utils/cn'

type Props = {
  category: CategoryType
  removeCategory: VoidFunction
}

export const ChoiceCategoryItem = ({ category, removeCategory }: Props) => {
  const { iconKey, name } = category

  return (
    <Column
      as={'button'}
      type={'button'}
      className={cn(
        'min-w-16.5 items-center rounded-md bg-gray-50 py-1',
        'border-3 border-blue',
      )}
      onClick={removeCategory}
    >
      <Icon type={iconKey} size={40} />
      <Text fontSize={'sm'} fontWeight={'semibold'}>
        {name}
      </Text>
    </Column>
  )
}
