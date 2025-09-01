import { Column, Flex } from '@repo/ui/components/Layout'
import { Text } from '@repo/ui/components/Text'
import { Icon } from '@repo/ui/components/Icon'

export const EmptyPlaces = () => {
  return (
    <Column className={'my-auto items-center gap-2 pb-40'}>
      <Text
        as={'span'}
        className={'text-[100px] leading-[100px]'}
        fontWeight={'black'}
      >
        텅
      </Text>
      <Flex>
        <Text variant={'body3'} className={'text-gray-300'}>
          근처에 갈 수 있는 맛집이 없어요
        </Text>
        <Icon type={'cry'} size={14} />
      </Flex>
    </Column>
  )
}
