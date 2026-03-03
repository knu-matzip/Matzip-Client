import Image from 'next/image'
import { Column } from '@repo/ui/components/Layout'
import { Text } from '@repo/ui/components/Text'

interface PrizeInfoProps {
  description: string
  imageUrl: string
}

export const PrizeInfo = ({ description, imageUrl }: PrizeInfoProps) => {
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
