import { useState } from 'react'
import { Container, NaverMap } from 'react-naver-maps'
import { type Coord, toLatLng } from '@/map/_utils/toLatLng'
import { PlaceMarker } from '@/map/_components/Marker'
import { Column } from '@repo/ui/components/Layout'

interface LocationProps {
  location: Coord
}

export const Location = ({ location }: LocationProps) => {
  const [, setMap] = useState<naver.maps.Map | null>(null)

  return (
    <Column className={'gap-3'}>
      <Container className={'h-[150px] overflow-hidden rounded-xl'}>
        <NaverMap
          defaultZoom={18}
          minZoom={15}
          ref={setMap}
          defaultCenter={toLatLng(location)}
        >
          <PlaceMarker position={location} icon={'logo'} />
        </NaverMap>
      </Container>
    </Column>
  )
}
