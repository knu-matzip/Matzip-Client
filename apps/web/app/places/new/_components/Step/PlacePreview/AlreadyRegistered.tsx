import Link from 'next/link'
import Image from 'next/image'
import { CLIENT_PATH } from '@/_constants/path'
import { Column } from '@repo/ui/components/Layout'
import { Text } from '@repo/ui/components/Text'
import { Button } from '@repo/ui/components/Button'

export const AlreadyRegistered = ({ placeName }: { placeName: string }) => {
  return (
    <Column className={'gap-12.5 mt-12.5 flex-1 items-center'}>
      <Column className={'items-center'}>
        <Text fontSize={'xl'} fontWeight={'medium'}>
          <Text as={'span'} variant={'heading2'}>
            {placeName}
          </Text>
          은
        </Text>
        <Text fontSize={'2xl'} fontWeight={'semibold'}>
          이미 알려진 맛집이에요!
        </Text>
      </Column>
      <Text as={'span'} fontSize={'xl'} fontWeight={'medium'}>
        힝ㅠ
      </Text>
      <Image
        src={'/images/sad-character.png'}
        alt={''}
        width={200}
        height={200}
      />
      <Button
        as={Link}
        size={'medium'}
        className={'ui:min-w-full mt-auto'}
        href={CLIENT_PATH.MAIN}
      >
        홈으로
      </Button>
    </Column>
  )
}
