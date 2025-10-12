import { Column, Flex } from '@repo/ui/components/Layout'
import { cn } from '@repo/ui/utils/cn'
import { Text } from '@repo/ui/components/Text'
import { Icon } from '@repo/ui/components/Icon'
import { CLIENT_PATH } from '@/consts/path'
import { Request } from '@/app/_api/types'

export const RequestListItem = ({
  placeId,
  placeName,
  icon,
  requestDate,
}: Request) => (
  <li>
    <Column
      as={'a'}
      href={CLIENT_PATH.REQUEST_DETAIL(placeId)}
      className={cn('gap-1', 'py-3.5', 'border-b-1 border-gray-50')}
    >
      <Flex className={'gap-1'}>
        <Text as={'span'} variant={'title2'}>
          {placeName}
        </Text>
        <Icon type={icon} size={18} />
      </Flex>
      <Text variant={'caption2'} className={'text-gray-200'}>
        등록 신청 일자: {requestDate}
      </Text>
    </Column>
  </li>
)
