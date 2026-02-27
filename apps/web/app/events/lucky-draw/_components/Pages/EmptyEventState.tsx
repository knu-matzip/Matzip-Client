import { Column, Flex } from '@repo/ui/components/Layout'
import { Text } from '@repo/ui/components/Text'
import { Icon } from '@repo/ui/components/Icon'

export const EmptyEventState = () => {
  return (
    <Column className={'flex-1 items-center justify-center gap-2 px-5'}>
      <Flex className={'gap-1'}>
        <Text variant='title1' className='text-gray-300'>
          현재 진행 중인 럭키드로우가 없습니다
        </Text>
        <Icon type={'cry'} />
      </Flex>

      <Column className={'items-center'}>
        <Text
          variant='body1'
          className='whitespace-pre-wrap break-words text-center text-gray-300'
        >
          맛집 리뷰를 작성하고 응모권을 모아보세요
        </Text>
        <Text
          variant='body1'
          className='whitespace-pre-wrap break-words text-center text-gray-300'
        >
          다음 럭키드로우 이벤트에서 행운의 주인공이 되실 수 있습니다!
        </Text>
      </Column>
    </Column>
  )
}
