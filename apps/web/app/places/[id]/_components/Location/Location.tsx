import { useState } from 'react'
import { Container, NaverMap } from 'react-naver-maps'
import { type Coord, toLatLng } from '@/map/_utils/toLatLng'
import { PlaceMarker } from '@/map/_components/Marker'
import { Column } from '@repo/ui/components/Layout'
import { openNaverMap } from '@/_utils/openNaverMap'
import Image from 'next/image'

interface LocationProps {
  location: Coord
  placeName: string
}

export const Location = ({ location, placeName }: LocationProps) => {
  const [, setMap] = useState<naver.maps.Map | null>(null)

  const handleOpenNaverMap = () => {
    openNaverMap({
      latitude: location.latitude,
      longitude: location.longitude,
      placeName,
    })
  }

  return (
    <Column className={'gap-3'}>
      <Container className={'h-[150px] overflow-hidden rounded-xl'}>
        <OpenNaverMapButton onClick={handleOpenNaverMap} />
        <NaverMap
          draggable={false}
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

const OpenNaverMapButton = ({ onClick }: { onClick: VoidFunction }) => (
  <button
    className={
      'absolute right-2 top-2 rounded-lg border-gray-300 bg-white p-1 shadow'
    }
    onClick={onClick}
  >
    <Image
      src={'/images/naver-map-logo.webp'}
      alt={'naver-map-logo'}
      width={25}
      height={25}
    />
  </button>
)
