import Image from 'next/image'
import { Text } from '@repo/ui/components/Text'
import { Column } from '@repo/ui/components/Layout'

type Props = {
  imageUrl: string
  description: string
  totalWinnersCount: number
}

export const ParticipationPrize = ({
  imageUrl,
  description,
  totalWinnersCount,
}: Props) => (
  <>
    <Column className={'items-center'}>
      <Text variant={'title3'}>{description}</Text>
      <Text variant={'title3'}>총 당첨자: {totalWinnersCount}명</Text>
    </Column>
    <Image src={imageUrl} alt={'상품 이미지'} width={200} height={200} />
  </>
)
