import { Header } from '@repo/ui/components/Header'
import { HeaderBackButton } from '@/_components/HeaderBackButton'
import { Flex } from '@repo/ui/components/Layout'
import { Icon } from '@repo/ui/components/Icon'
import { Text } from '@repo/ui/components/Text'
import { InfoPopover } from '@/events/lucky-draw/_components/InfoPopover'

const LuckyDrawLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header
        left={<HeaderBackButton />}
        center={
          <Flex className={'gap-1.5'}>
            <Icon type={'luckMoney'} />
            <Text variant={'heading2'}>행운 복권</Text>
          </Flex>
        }
        right={<InfoPopover />}
        className={'border-b-1 border-gray-50'}
      />
      {children}
    </>
  )
}

export default LuckyDrawLayout
