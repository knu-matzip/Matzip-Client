import { Text } from '@repo/ui/components/Text'
import { Column, Flex } from '@repo/ui/components/Layout'
import { Icon } from '@repo/ui/components/Icon'
import { BasePlace } from '@/_apis/schemas/place'
import { Chip } from '@repo/ui/components/Chip'
import { cn } from '@repo/ui/utils/cn'

type Props = {
  showBorder?: boolean
} & BasePlace

export const PlaceListItem = ({
  placeName,
  address,
  categories,
  tags,
  showBorder = true,
}: Props) => {
  const mainCategoryIcon = categories[0]?.iconKey || 'logo'

  return (
    <Column
      as={'li'}
      className={cn('gap-1', 'pb-4 pt-2.5', {
        'border-b-1 border-gray-50': showBorder,
      })}
    >
      {/*Todo: Link 태그로 감싸기 -> 상세페이지로 이동*/}
      <Flex className={'gap-1'}>
        <Text variant={'title2'}>{placeName}</Text>
        <Icon type={mainCategoryIcon} size={16} />
      </Flex>
      <Text variant={'caption2'} className={'text-gray-300'}>
        {address}
      </Text>
      {tags.length > 0 && (
        <Flex className={'gap-1'}>
          {tags.map((tag) => (
            <Chip key={tag.id} icon={tag.iconKey} label={tag.name} />
          ))}
        </Flex>
      )}
    </Column>
  )
}
