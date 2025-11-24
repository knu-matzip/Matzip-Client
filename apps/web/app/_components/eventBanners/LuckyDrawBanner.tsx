import Link from 'next/link'
import { Column, Flex } from '@repo/ui/components/Layout'
import { Icon } from '@repo/ui/components/Icon'
import { Text } from '@repo/ui/components/Text'
import { CLIENT_PATH } from '@/_constants/path'

export const LuckyDrawBanner = () => (
  <Flex
    as={Link}
    href={CLIENT_PATH.EVENTS_LUCKY_DRAW}
    className={
      'mx-auto h-full w-[95%] justify-center gap-6 rounded-xl bg-green-100'
    }
  >
    <Icon type={'luckMoney'} size={75} />
    <Column>
      <Flex className={'gap-2'}>
        <Text fontSize={'2xl'} fontWeight={'bold'} className={'text-main'}>
          행운 복권 이벤트
        </Text>
        <Icon type={'clover'} />
      </Flex>
      <Text
        fontSize={'lg'}
        fontWeight={'semibold'}
        className={'text-main sm:text-xl'}
      >
        지금, 행운의 주인공이 되어보세요!
      </Text>
    </Column>
  </Flex>
)
