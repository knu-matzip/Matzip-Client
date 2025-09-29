import { Text } from '@repo/ui/components/Text'
import { cn } from '@repo/ui/utils/cn'
import { type RegisterStatus, STATUS_COLOR, STATUS_LABEL } from './consts'

export const StatusChip = ({
  registerStatus,
}: {
  registerStatus: RegisterStatus
}) => (
  <Text
    as='div'
    fontSize={'xs'}
    fontWeight={'semibold'}
    className={cn(
      STATUS_COLOR[registerStatus].text,
      STATUS_COLOR[registerStatus].background,
      'rounded-full',
      'px-2.5 py-2',
    )}
  >
    {STATUS_LABEL[registerStatus]}
  </Text>
)
