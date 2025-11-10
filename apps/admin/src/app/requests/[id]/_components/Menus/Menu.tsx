import { Flex, JustifyBetween } from '@repo/ui/components/Layout'
import { Text } from '@repo/ui/components/Text'
import { Icon } from '@repo/ui/components/Icon'
import type { RequestDetail } from '@/app/requests/[id]/_api/types'

type Props = {
  menu: RequestDetail['menus'][0]
}

export const Menu = ({ menu }: Props) => {
  const { name, price, isRecommended } = menu

  return (
    <JustifyBetween>
      <Flex className={'gap-1'}>
        <Text fontSize={'sm'} fontWeight={'semibold'}>
          {name}
        </Text>
        {isRecommended && <Icon type={'doubleHeart'} />}
      </Flex>

      <Text fontSize={'sm'} fontWeight={'semibold'} className={'text-gray-300'}>
        {price.toLocaleString()} 원
      </Text>
    </JustifyBetween>
  )
}
