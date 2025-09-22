import { Icon } from '@repo/ui/components/Icon'
import { Column } from '@repo/ui/components/Layout'
import { Text } from '@repo/ui/components/Text'
import { Button } from '@repo/ui/components/Button'
import { CLIENT_PATH } from '@/_constants/path'

export const Success = () => (
  <Column className={'flex-1 justify-center'}>
    <Column className={'my-auto items-center gap-8'}>
      <Icon type={'congratulation'} size={130} />
      <Column className={'items-center'}>
        <Text fontSize={'2xl'} fontWeight={'bold'}>
          맛집 등록 신청이 완료됐어요!
        </Text>
        <Text variant={'body3'} className={'text-gray-300'}>
          1~3일 이내 심사가 완료되며 이후 맛집에 등록됩니다!
        </Text>
        <Text variant={'body3'} className={'text-gray-300'}>
          심사 통과 후 응모권 지급이 이뤄집니다!
        </Text>
      </Column>
    </Column>
    <Button
      as={'a'}
      href={CLIENT_PATH.MAIN}
      size={'medium'}
      className={'ui:min-w-full'}
    >
      홈으로
    </Button>
  </Column>
)
