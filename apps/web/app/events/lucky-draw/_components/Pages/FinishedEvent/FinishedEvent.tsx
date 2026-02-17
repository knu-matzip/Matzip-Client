import Link from 'next/link'
import Image from 'next/image'
import { CLIENT_PATH } from '@/_constants/path'
import { Column, Flex } from '@repo/ui/components/Layout'
import { Text } from '@repo/ui/components/Text'
import { EmptyFallback } from '@/_components/EmptyFallback'

export const FinishedEvent = () => {
  return (
    // Todo: EmptyFallback isEmpty 값 API 연동 후 동적으로 변경
    <EmptyFallback
      isEmpty={true}
      fallbackTitle={'아직 종료된 이벤트가 없어요.'}
      fallbackDescription={'진행 중인 이벤트에 참여하고 행운을 잡아보세요!'}
    >
      <Column as={'ul'}>
        <FinishedEventItem />
        <FinishedEventItem />
      </Column>
    </EmptyFallback>
  )
}

const FinishedEventItem = () => {
  return (
    <li className={'border-b-1 border-gray-100 py-3.5'}>
      <Flex
        as={Link}
        // Todo: href 동적 라우팅으로 변경
        href={CLIENT_PATH.EVENTS_LUCKY_DRAW + '/result/1'}
        className={'gap-2'}
      >
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
