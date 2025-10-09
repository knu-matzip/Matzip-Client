import { Column, Flex } from '@repo/ui/components/Layout'
import { cn } from '@repo/ui/utils/cn'
import { Text } from '@repo/ui/components/Text'
import { Icon, type IconType } from '@repo/ui/components/Icon'
import { CLIENT_PATH } from '@/consts/path'

export type Request = {
  placeId: string
  placeName: string
  icon: IconType
  requestDate: string
}

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
