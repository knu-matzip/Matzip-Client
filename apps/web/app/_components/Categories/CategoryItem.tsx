import { CLIENT_PATH } from '@/_constants/path'
import { Category } from '@/_apis/schemas/category'
import { Icon } from '@repo/ui/components/Icon'
import { Text } from '@repo/ui/components/Text'
import { Column } from '@repo/ui/components/Layout'

export const CategoryItem = ({ id, name, iconKey }: Category) => (
  <Column
    as={'a'}
    href={CLIENT_PATH.CATEGORY_DETAIL(id)}
    className={'items-center gap-1'}
  >
    <Icon type={iconKey} size={40} />
    <Text
      as={'span'}
      fontSize={'sm'}
      fontWeight={'semibold'}
      className={'text-main text-nowrap'}
    >
      {name}
    </Text>
  </Column>
)
