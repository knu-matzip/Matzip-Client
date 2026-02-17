import Link from 'next/link'
import Image from 'next/image'
import { Column, Flex } from '@repo/ui/components/Layout'
import { Text } from '@repo/ui/components/Text'

export const FinishedEvent = () => {
  return (
    <Column as={'ul'}>
      <FinishedEventItem />
      <FinishedEventItem />
    </Column>
  )
}

const FinishedEventItem = () => {
  return (
    <li className={'border-b-1 border-gray-100 py-3.5'}>
      <Flex as={Link} href={''} className={'gap-2'}>
        <Image
          src={'/images/chicken.png'}
          alt={'종료된 이벤트 상품'}
          width={50}
          height={50}
        />
        <Column>
          <Text variant={'title3'}>BBQ 황금 올리브 치킨</Text>
          <Text variant={'caption2'} className={'text-gray-300'}>
            당첨자 3명 | 참여자 27명
          </Text>
          <Text variant={'caption2'} className={'text-gray-300'}>
            종료 일자: 2025.12.23
          </Text>
        </Column>
      </Flex>
    </li>
  )
}
