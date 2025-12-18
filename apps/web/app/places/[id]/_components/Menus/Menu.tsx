import type { PlaceDetail } from '@/_apis/schemas/place'
import { formatPrice } from '@/_utils/formatPrice'
import { Flex, JustifyBetween } from '@repo/ui/components/Layout'
import { Text } from '@repo/ui/components/Text'
import { Icon } from '@repo/ui/components/Icon'

type Props = {
  menu: PlaceDetail['menus'][0]
}

export const Menu = ({ menu }: Props) => {
  const { name, price, isRecommended } = menu

  return (
    <JustifyBetween className={'gap-2'}>
      <Flex className={'min-w-0 flex-1 gap-1'}>
        <Text fontSize={'sm'} fontWeight={'semibold'} className={'truncate'}>
          {name}
        </Text>
        {isRecommended && <Icon type={'doubleHeart'} className={'shrink-0'} />}
      </Flex>

      <Text fontSize={'sm'} fontWeight={'semibold'} className={'text-gray-300'}>
        {formatPrice(price)}
      </Text>
    </JustifyBetween>
  )
}
