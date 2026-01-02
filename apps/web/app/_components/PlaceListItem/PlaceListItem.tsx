import Link from 'next/link'
import { CLIENT_PATH } from '@/_constants/path'
import type { BasePlace } from '@/_apis/schemas/place'
import { cn } from '@repo/ui/utils/cn'
import { Text } from '@repo/ui/components/Text'
import { Icon } from '@repo/ui/components/Icon'
import { Chip } from '@repo/ui/components/Chip'
import { Column, Flex } from '@repo/ui/components/Layout'
import { PlaceListItemSkeleton } from './PlaceListItemSkeleton'

type Props = {
  showCategory?: boolean
  showBorder?: boolean
} & BasePlace

export const PlaceListItem = ({
  placeId,
  placeName,
  address,
  categories,
  tags,
  showCategory = true,
  showBorder = true,
}: Props) => {
  const mainCategoryIcon = categories[0]?.iconKey || 'logo'

  return (
    <li>
      <Column
        as={Link}
        prefetch={false}
        className={cn('gap-1', 'pb-4 pt-2.5', {
          'border-b-1 border-gray-50': showBorder,
        })}
        href={CLIENT_PATH.PLACE_DETAIL(placeId)}
      >
        <Flex className={'gap-1'}>
          <Text as={'span'} variant={'title2'} className={'max-w-2/3 truncate'}>
            {placeName}
          </Text>
          {showCategory && (
            <Icon type={mainCategoryIcon} size={18} className={'shrink-0'} />
          )}
        </Flex>
        <Text variant={'caption2'} className={'truncate text-gray-300'}>
          {address}
        </Text>
        {tags.length > 0 && (
          <Flex className={'gap-1 overflow-x-auto'}>
            {tags.map((tag) => (
              <Chip key={tag.id} icon={tag.iconKey} label={tag.name} />
            ))}
          </Flex>
        )}
      </Column>
    </li>
  )
}

PlaceListItem.Skeleton = PlaceListItemSkeleton
