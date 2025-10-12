import { VerticalScrollArea } from '@repo/ui/components/Layout'
import { RequestsByCampus } from './_components/RequestsByCampus'
import { OnlyLeftHeader } from '@repo/ui/components/Header'
import type { Request } from './_api/types'

const MOCK_DATA: Request[] = [
  {
    placeId: '1',
    placeName: '짬뽕집',
    icon: 'chinese',
    requestDate: '2025-10-29',
  },
  {
    placeId: '2',
    placeName: '짬뽕집',
    icon: 'chinese',
    requestDate: '2025-10-29',
  },
  {
    placeId: '3',
    placeName: '짬뽕집',
    icon: 'chinese',
    requestDate: '2025-10-29',
  },
]

export default function Home() {
  return (
    <>
      <OnlyLeftHeader icon={'logo'} name={'대기중'} />
      <VerticalScrollArea className={'gap-10 p-5'}>
        <RequestsByCampus campus={'SINGWAN'} requestList={MOCK_DATA} />
        <RequestsByCampus campus={'CHEANAN'} requestList={MOCK_DATA} />
        <RequestsByCampus campus={'YESAN'} requestList={MOCK_DATA} />
      </VerticalScrollArea>
    </>
  )
}
