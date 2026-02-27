'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useEventQueries } from '@/_apis/queries/event'
import { EmptyEventState } from '../EmptyEventState'
import { Column, Flex } from '@repo/ui/components/Layout'
import { Text } from '@repo/ui/components/Text'
import { Icon } from '@repo/ui/components/Icon'
import { Button } from '@repo/ui/components/Button'
import { CLIENT_PATH } from '@/_constants/path'

export const GuestView = () => {
  const { data } = useSuspenseQuery(useEventQueries.byPublic())

  if (!data) {
    return <EmptyEventState />
  }

  const { prize } = data

  return (
    <Column className={'h-full min-h-0 justify-between gap-10 p-5'}>
      <Title />
      <Prize {...prize} />
      <Button
        as={Link}
        href={CLIENT_PATH.LOGIN}
        size={'medium'}
        className={'w-full'}
      >
        참여하기
      </Button>
    </Column>
  )
}

// 하위 컴포넌트
const Title = () => (
  <Column className={'items-center gap-2'}>
    <Text fontSize={'2xl'} fontWeight={'bold'}>
      근처 맛집을 간단하게 알리고
    </Text>
    <Flex className={'gap-2'}>
      <Icon type={'headerGift'} size={28} />
      <Text fontSize={'2xl'} fontWeight={'bold'}>
        기프티콘 응모권 까지!!
      </Text>
      <Icon type={'headerGift'} size={28} />
    </Flex>
    <Text variant={'body3'} className={'mt-2 text-center text-gray-300'}>
      작은 정보가 행운의 기회가 될 수 있어요.
      <br />
      지금 바로 등록해보세요.
    </Text>
  </Column>
)

const Prize = ({
  description,
  imageUrl,
}: {
  description: string
  imageUrl: string
}) => {
  return (
    <Column className={'gap-15 items-center'}>
      <Image
        src={imageUrl}
        alt={description}
        width={220}
        height={220}
        priority
      />
      <Column className='items-center gap-1'>
        <Text variant={'body1'} className='text-gray-400'>
          이번 주 행운의 상품
        </Text>
        <Text variant={'heading2'} className='text-gray-800'>
          {description}
        </Text>
      </Column>
    </Column>
  )
}
