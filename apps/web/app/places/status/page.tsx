import { Header } from '@repo/ui/components/Header'
import { HeaderBackButton } from '@/_components/HeaderBackButton'
import { Flex } from '@repo/ui/components/Layout'
import { Icon } from '@repo/ui/components/Icon'
import { Text } from '@repo/ui/components/Text'
import { PlaceListItem } from './_components/PlaceListItem'

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
      <ul className={'p-5'}>
        <PlaceListItem
          placeId={'1'}
          placeName={'김밥천국'}
          categories={[{ id: '1', name: '중국집', iconKey: 'chinese' }]}
          requestDate={'2020-05-09'}
          registerStatus={'REJECTED'}
        />{' '}
        <PlaceListItem
          placeId={'1'}
          placeName={'김밥천국'}
          categories={[{ id: '1', name: '중국집', iconKey: 'chinese' }]}
          requestDate={'2020-05-09'}
          registerStatus={'PENDING'}
        />{' '}
        <PlaceListItem
          placeId={'1'}
          placeName={'김밥천국'}
          categories={[{ id: '1', name: '중국집', iconKey: 'chinese' }]}
          requestDate={'2020-05-09'}
          registerStatus={'APPROVED'}
        />{' '}
      </ul>
    </>
  )
}

export default Page
