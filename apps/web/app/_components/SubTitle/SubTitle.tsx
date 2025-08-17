import { Flex } from '@repo/ui/components/Layout'
import { Icon, IconType } from '@repo/ui/components/Icon'
import { Text } from '@repo/ui/components/Text'

type Props = {
  icon: IconType
  title: string
}

export const SubTitle = ({ icon, title }: Props) => (
  <Flex className={'gap-1'}>
    <Icon type={icon} size={30} />
    <Text as={'h2'} variant={'title1'}>
      {title}
    </Text>
  </Flex>
)
