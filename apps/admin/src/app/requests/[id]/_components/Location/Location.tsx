import { useState } from 'react'
import { Container, Marker, NaverMap } from 'react-naver-maps'
import { toLatLng } from '../../_utils/toLatLng'
import type { RequestDetail } from '../../_api/types'

type Props = {
  location: RequestDetail['location']
}

export const Location = ({ location }: Props) => {
  const [, setMap] = useState<naver.maps.Map | null>(null)
  const setLocation = toLatLng(location)

  return (
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
  )
}
