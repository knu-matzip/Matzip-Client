import { Column } from '@repo/ui/components/Layout'
import { Text } from '@repo/ui/components/Text'
import { Button } from '@repo/ui/components/Button'
import { CLIENT_PATH } from '@/_constants/path'

export const NoResult = () => (
  <Column className={'h-full'}>
    <div className='my-auto'>
      <Text variant={'title1'} className={'text-center text-gray-300'}>
        아직 발표된 당첨 결과 없어요!
      </Text>
      <Text variant={'body1'} className={'text-center text-gray-200'}>
        맛집을 등록하고 행운의 주인공이 되어보세요!
      </Text>
    </div>
    <Button
      as={'a'}
      href={CLIENT_PATH.PLACE_NEW}
      size={'medium'}
      className={'w-full'}
    >
      맛집 등록하러 가기
    </Button>
  </Column>
)
