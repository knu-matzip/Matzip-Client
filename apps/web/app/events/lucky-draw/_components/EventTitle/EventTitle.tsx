import { Column, Flex } from '@repo/ui/components/Layout'
import { Text } from '@repo/ui/components/Text'
import { Icon } from '@repo/ui/components/Icon'

export const EventTitle = () => {
  return (
    <Column className={'items-center gap-2'}>
      <Text fontSize={'2xl'} fontWeight={'bold'}>
        근처 맛집을 간단하게 알리고
      </Text>
      <Flex className={'gap-2'}>
        <Icon type={'headerGift'} size={28} />
        <Text fontSize={'2xl'} fontWeight={'bold'}>
          기프티콘 응모권 까지!!
        </Text>
        <Icon type={'headerGift'} size={28} />
      </Flex>
      <Text variant={'body3'} className={'mt-2 text-center text-gray-300'}>
        작은 정보가 행운의 기회가 될 수 있어요.
        <br />
        지금 바로 등록해보세요.
      </Text>
    </Column>
  )
}
