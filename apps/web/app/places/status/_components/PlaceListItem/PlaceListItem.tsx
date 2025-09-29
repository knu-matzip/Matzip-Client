import { Column, Flex, JustifyBetween } from '@repo/ui/components/Layout'
import { cn } from '@repo/ui/utils/cn'
import { CLIENT_PATH } from '@/_constants/path'
import { Text } from '@repo/ui/components/Text'
import { Icon } from '@repo/ui/components/Icon'
import { StatusChip } from '@/places/_components/StatusChip'
import type { PlaceByStatus } from '@/_apis/schemas/place'

export const PlaceListItem = ({
  // placeId,
  placeName,
  categories,
  requestDate,
  registerStatus,
}: PlaceByStatus) => {
  const mainCategoryIcon = categories[0]?.iconKey || 'logo'

  return (
    <JustifyBetween
      as={'li'}
      className={cn('gap-1', 'py-3.5', 'border-b-1 border-gray-50')}
    >
      {/*Todo: href 주소 등록상세페이지로 변경 */}
      <Column as={'a'} href={CLIENT_PATH.PLACE_DETAIL('1')}>
        <Flex className={'gap-1'}>
          <Text as={'span'} variant={'title2'}>
            {placeName}
          </Text>
          <Icon type={mainCategoryIcon} size={18} />
        </Flex>
        <Text variant={'caption2'} className={'text-gray-300'}>
          등록 신청 일자: {requestDate}
        </Text>
      </Column>
      <StatusChip registerStatus={registerStatus} />
    </JustifyBetween>
  )
}
