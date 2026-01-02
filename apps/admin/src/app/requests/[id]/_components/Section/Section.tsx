import { Column, Flex } from '@repo/ui/components/Layout'
import { Icon, type IconType } from '@repo/ui/components/Icon'
import { Text } from '@repo/ui/components/Text'

type Props = {
  icon: IconType
  title: string
  children: React.ReactNode
}

export const Section = ({ icon, title, children }: Props) => (
  <Column as={'section'} className={'gap-1.5'}>
    <Flex className={'gap-1'}>
      <Icon type={icon} size={16} />
      <Text as={'h2'} variant={'title3'}>
        {title}
      </Text>
    </Flex>
    {children}
  </Column>
)
