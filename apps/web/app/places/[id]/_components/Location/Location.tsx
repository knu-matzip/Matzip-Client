import { useState } from 'react'
import { Container, NaverMap } from 'react-naver-maps'
import { type Coord, toLatLng } from '@/map/_utils/toLatLng'
import { PlaceMarker } from '@/map/_components/Marker'
import { SubTitle } from '../SubTitle'
import { Column } from '@repo/ui/components/Layout'

export const Location = ({ location }: { location: Coord }) => {
  const [, setMap] = useState<naver.maps.Map | null>(null)

  return (
    <Column className={'gap-1.5'}>
      <SubTitle icon={'pin'} title={'위치'} />
      <Container className={'h-[150px] overflow-hidden rounded-xl'}>
        <NaverMap ref={setMap} defaultCenter={toLatLng(location)}>
          <PlaceMarker position={location} icon={'logo'} />
        </NaverMap>
      </Container>
    </Column>
  )
}
