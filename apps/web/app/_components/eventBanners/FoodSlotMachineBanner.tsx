import Link from 'next/link'
import { Column, Flex } from '@repo/ui/components/Layout'
import { CLIENT_PATH } from '@/_constants/path'
import { Icon } from '@repo/ui/components/Icon'
import { Text } from '@repo/ui/components/Text'

export const FoodSlotMachineBanner = () => (
  <Flex
    as={Link}
    href={CLIENT_PATH.EVENTS_FOOD_SLOT}
    className={
      'mx-auto h-full w-[95%] justify-center gap-6 rounded-xl bg-yellow-100'
    }
  >
    <Icon type={'burger'} size={75} />
    <Column>
      <Flex className={'gap-2'}>
        <Text fontSize={'2xl'} fontWeight={'bold'} className={'text-main'}>
          오늘 뭐 먹지?
        </Text>
        <Icon type={'slot'} />
      </Flex>
      <Text fontSize={'lg'} fontWeight={'semibold'} className={'text-main'}>
        고민은 그만, 바로 결정해드려요!
      </Text>
    </Column>
  </Flex>
)
