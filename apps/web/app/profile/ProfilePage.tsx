import { Column, Flex, JustifyBetween } from '@repo/ui/components/Layout'
import { Icon, IconType } from '@repo/ui/components/Icon'
import { Text } from '@repo/ui/components/Text'
import Image from 'next/image'
import { CLIENT_PATH } from '@/_constants/path'

export const ProfilePage = () => {
  return (
    <Column className={'gap-10 p-5'}>
      <Profile />
      <Column className={'gap-4'}>
        <Menu href={'PROFILE'} title={'등록현황'} icon={'pencil'} />
        <Menu
          href={CLIENT_PATH.EVENT_GIFTICON}
          title={'기프티콘'}
          icon={'gift'}
        />
        <Menu
          href={
            'https://www.notion.so/woopaca/722d2e1180f94eeead36ec09436d4576?pvs=4'
          }
          title={'이용약관'}
          icon={'paper'}
        />
      </Column>
    </Column>
  )
}

const Profile = () => (
  <Flex className={'gap-3'}>
    <Flex className={'h-10 w-10 justify-center rounded-full bg-[#BEE1E6]'}>
      <Image
        src={'/images/dog.png'}
        alt={'profileImage'}
        width={30}
        height={30}
      />
    </Flex>
    <Text fontSize={'sm'} fontWeight={'bold'}>
      배고픈 강아지
    </Text>
  </Flex>
)

const Menu = ({
  href,
  title,
  icon,
}: {
  href: string
  title: string
  icon: IconType
}) => (
  <JustifyBetween as={'a'} href={href}>
    <Flex className={'gap-2.5'}>
      <Icon type={icon} size={18} />
      <Text variant={'body1'}>{title}</Text>
    </Flex>
    <Icon type={'arrowRight'} size={18} color={'--color-gray-200'} />
  </JustifyBetween>
)
