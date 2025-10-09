import { VerticalScrollArea } from '@repo/ui/components/Layout'
import { RequestsByCampus } from '@/components/RequestsByCampus'
import { OnlyLeftHeader } from '@repo/ui/components/Header'

export default function Home() {
  return (
    <>
      <OnlyLeftHeader icon={'logo'} name={'대기중'} />
      <VerticalScrollArea className={'gap-10 p-5'}>
        <RequestsByCampus
          campus={'SINGWAN'}
          requestList={[
            { placeName: '짬뽕집', icon: 'chinese', requestDate: '2025-10-29' },
            { placeName: '짬뽕집', icon: 'chinese', requestDate: '2025-10-29' },
            { placeName: '짬뽕집', icon: 'chinese', requestDate: '2025-10-29' },
          ]}
        />
        <RequestsByCampus
          campus={'CHEANAN'}
          requestList={[
            { placeName: '짬뽕집', icon: 'chinese', requestDate: '2025-10-29' },
            { placeName: '짬뽕집', icon: 'chinese', requestDate: '2025-10-29' },
            { placeName: '짬뽕집', icon: 'chinese', requestDate: '2025-10-29' },
          ]}
        />
        <RequestsByCampus
          campus={'YESAN'}
          requestList={[
            { placeName: '짬뽕집', icon: 'chinese', requestDate: '2025-10-29' },
            { placeName: '짬뽕집', icon: 'chinese', requestDate: '2025-10-29' },
            { placeName: '짬뽕집', icon: 'chinese', requestDate: '2025-10-29' },
          ]}
        />
      </VerticalScrollArea>
    </>
  )
}
