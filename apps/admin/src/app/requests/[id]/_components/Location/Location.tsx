import { useState } from 'react'
import { Column } from '@repo/ui/components/Layout'
import { Container, Marker, NaverMap } from 'react-naver-maps'
import { Text } from '@repo/ui/components/Text'
import { toLatLng } from '../../_utils/toLatLng'
import type { RequestDetail } from '../../_api/types'

type Props = {
  location: RequestDetail['location']
}

export const Location = ({ location }: Props) => {
  const [, setMap] = useState<naver.maps.Map | null>(null)
  const setLocation = toLatLng(location)

  return (
    <Column className={'gap-1.5'}>
      <Text>위치</Text>
      <Container className={'h-[150px] overflow-hidden rounded-xl'}>
        <NaverMap
          defaultZoom={18}
          minZoom={15}
          ref={setMap}
          defaultCenter={setLocation}
        >
          <Marker position={setLocation} icon={'logo'} />
        </NaverMap>
      </Container>
    </Column>
  )
}
