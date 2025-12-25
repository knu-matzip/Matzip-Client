import { Column, Flex } from '@repo/ui/components/Layout'
import { Text } from '@repo/ui/components/Text'
import { Icon } from '@repo/ui/components/Icon'

export const RejectedReason = ({
  rejectedReason,
}: {
  rejectedReason: string
}) => (
  <Column className={'px-5 py-3'}>
    <Flex className={'gap-1'}>
      <Icon type={'x'} size={16} />
      <Text as={'h2'} variant={'title3'}>
        등록 거절 사유
      </Text>
    </Flex>
    <Text variant={'body2'} className={'whitespace-pre-wrap'}>
      {rejectedReason}
    </Text>
  </Column>
)
