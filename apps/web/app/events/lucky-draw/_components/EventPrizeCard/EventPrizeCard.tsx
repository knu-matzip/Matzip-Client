import Image from 'next/image'
import { Column } from '@repo/ui/components/Layout'
import { Text } from '@repo/ui/components/Text'
import { Icon } from '@repo/ui/components/Icon'

type Props = {
  imageUrl: string
  description: string
  totalWinnersCount: number
  participantsCount: number
}

export const EventPrizeCard = ({
  imageUrl,
  description,
  totalWinnersCount,
  participantsCount,
}: Props) => {
  return (
    <Column
      className={'mx-auto w-fit items-center gap-8 rounded-xl bg-gray-50 p-5'}
    >
      <Column className={'items-center'}>
        <Text variant={'body1'} className='text-gray-400'>
          이번 주 행운의 상품
        </Text>
        <Text variant={'heading2'} className='text-gray-800'>
          {description}
        </Text>
      </Column>
      <Image
        className='rounded-xl'
        src={imageUrl}
        alt={description}
        width={220}
        height={220}
        priority
      />
      <Column className={'items-center'}>
        <Text variant='title3' className='text-gray-800'>
          총 당첨자: {totalWinnersCount}명
        </Text>
        <Text variant='body1' className='flex gap-1'>
          <Icon type='peoples' size={20} />
          현재 {participantsCount}명이 참여 중이에요
        </Text>
      </Column>
    </Column>
  )
}
