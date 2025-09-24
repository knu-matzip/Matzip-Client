import { Header } from '@repo/ui/components/Header'
import { HeaderBackButton } from '@/_components/HeaderBackButton'
import { Flex } from '@repo/ui/components/Layout'
import { Icon } from '@repo/ui/components/Icon'
import { Text } from '@repo/ui/components/Text'

const Page = () => {
  return (
    <>
      <Header
        left={<HeaderBackButton />}
        center={
          <Flex className={'gap-1.5'}>
            <Text variant={'heading2'}>등록현황</Text>
            <Icon type={'headerPencil'} />
          </Flex>
        }
      />
    </>
  )
}

export default Page
