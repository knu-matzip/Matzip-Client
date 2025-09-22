import { Icon } from '@repo/ui/components/Icon'
import { Column } from '@repo/ui/components/Layout'
import { Text } from '@repo/ui/components/Text'
import { Button } from '@repo/ui/components/Button'
import { CLIENT_PATH } from '@/_constants/path'

export const Fail = () => (
  <Column className={'flex-1 justify-center'}>
    <Column className={'my-auto items-center gap-8'}>
      <Icon type={'cry'} size={130} />
      <Column className={'items-center'}>
        <Text fontSize={'2xl'} fontWeight={'bold'}>
          맛집 등록 신청에 실패했어요
        </Text>
        <Text variant={'body3'} className={'text-gray-300'}>
          일시적인 오류로 등록이 완료되지 않았습니다.
        </Text>
        <Text variant={'body3'} className={'text-gray-300'}>
          잠시 후 다시 시도해주세요.
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
