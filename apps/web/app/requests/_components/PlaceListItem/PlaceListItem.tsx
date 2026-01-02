import Link from 'next/link'
import { CLIENT_PATH } from '@/_constants/path'
import { Column, Flex, JustifyBetween } from '@repo/ui/components/Layout'
import { cn } from '@repo/ui/utils/cn'
import { Text } from '@repo/ui/components/Text'
import { Icon } from '@repo/ui/components/Icon'
import { StatusChip } from '../StatusChip'
import type { Request } from '@/_apis/schemas/request'

export const PlaceListItem = ({
  placeId,
  placeName,
  categories,
  requestDate,
  registerStatus,
}: Request) => {
  const mainCategoryIcon = categories[0]?.iconKey || 'logo'

  return (
    <li>
      <JustifyBetween
        as={Link}
        prefetch={false}
        href={CLIENT_PATH.REQUEST_DETAIL(placeId)}
        className={cn('gap-1', 'py-3.5', 'border-b-1 border-gray-50')}
      >
        <Column as={'div'} className={'max-w-2/3'}>
          <Flex className={'gap-1'}>
            <Text as={'span'} variant={'title2'} className={'truncate'}>
              {placeName}
            </Text>
            <Icon type={mainCategoryIcon} size={18} className={'min-w-4.5'} />
          </Flex>
          <Text variant={'caption2'} className={'text-gray-300'}>
            등록 신청 일자: {requestDate}
          </Text>
        </Column>
        <StatusChip registerStatus={registerStatus} />
      </JustifyBetween>
    </li>
  )
}
