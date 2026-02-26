import Link from 'next/link'
import Image from 'next/image'
import { useSuspenseQuery } from '@tanstack/react-query'
import type { EventByEntry } from '@/_apis/schemas/event'
import { useEventQueries } from '@/_apis/queries/event'
import { CLIENT_PATH } from '@/_constants/path'
import { Text } from '@repo/ui/components/Text'
import { Column, Flex } from '@repo/ui/components/Layout'
import { EmptyFallback } from '@/_components/EmptyFallback'

export const FinishedEvent = () => {
  const { data } = useSuspenseQuery(useEventQueries.byEntry())

  return (
    <EmptyFallback
      isEmpty={data.length === 0}
      fallbackTitle={'아직 종료된 이벤트가 없어요.'}
      fallbackDescription={'진행 중인 이벤트에 참여하고 행운을 잡아보세요!'}
    >
      <Column as={'ul'} className={'h-full overflow-y-auto py-2'}>
        {data.map((item) => (
          <FinishedEventItem key={item.eventId} event={item} />
        ))}
      </Column>
    </EmptyFallback>
  )
}

// Todo: 따로 분리 후 EventSummary로 결과페이지에서 재사용
const FinishedEventItem = ({ event }: { event: EventByEntry }) => {
  const { eventId, prize, totalWinnersCount, participantsCount, eventEndDate } =
    event

  return (
    <li className={'border-b-1 border-gray-100 py-3.5'}>
      <Flex
        as={Link}
        href={CLIENT_PATH.EVENTS_RESULT(eventId)}
        className={'gap-4'}
      >
        <Image
          src={prize.imageUrl}
          alt={'종료된 이벤트 상품'}
          width={50}
          height={50}
          className={'rounded-lg'}
        />
        <Column>
          <Text variant={'title3'}>{prize.description}</Text>
          <Text variant={'caption2'} className={'text-gray-300'}>
            당첨자 {totalWinnersCount}명 | 참여자 {participantsCount}명
          </Text>
          <Text variant={'caption2'} className={'text-gray-300'}>
            종료 일자: {eventEndDate.slice(0, 10).replace(/-/g, '.')}
          </Text>
        </Column>
      </Flex>
    </li>
  )
}
