import Image from 'next/image'
import { CLIENT_PATH } from '@/_constants/path'
import { HeaderBackButton } from '@/_components/HeaderBackButton'
import { Header } from '@repo/ui/components/Header'
import { Column, Flex } from '@repo/ui/components/Layout'
import { Icon } from '@repo/ui/components/Icon'
import { Text } from '@repo/ui/components/Text'
import { cn } from '@repo/ui/utils/cn'

const Page = () => {
  return (
    <>
      <Header
        left={<HeaderBackButton />}
        center={
          <Flex className={'gap-1.5'}>
            <Icon type={'headerGift'} />
            <Text variant={'heading2'}>기프티콘</Text>
          </Flex>
        }
      />
      <div className={'grid grid-cols-2 gap-2.5 p-5'}>
        <Gifticon />
        <Gifticon />
        <Gifticon />
        <Gifticon />
      </div>
    </>
  )
}

export default Page

const Gifticon = () => (
  <Column
    as={'a'}
    href={CLIENT_PATH.EVENT_GIFTICON_DETAIL('1')}
    className={cn(
      'w-fit',
      'p-2.5',
      'gap-2.5',
      'rounded-xl',
      'border-1 border-gray-200',
      'shadow-md',
    )}
  >
    <Image
      src={'/images/chicken.png'}
      alt={'기프티콘'}
      width={180}
      height={180}
    />
    <Column>
      <Text variant={'caption1'}>BBQ</Text>
      <Text fontSize={'sm'} fontWeight={'semibold'}>
        황금올리브 치킨
      </Text>
      <Text variant={'caption1'} className={'text-gray-200'}>
        2026.08.26 까지
      </Text>
    </Column>
  </Column>
)
