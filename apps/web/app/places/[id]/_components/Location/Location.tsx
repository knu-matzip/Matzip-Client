import { useState } from 'react'
import { Container, NaverMap } from 'react-naver-maps'
import { type Coord, toLatLng } from '@/map/_utils/toLatLng'
import { PlaceMarker } from '@/map/_components/Marker'
import { Column } from '@repo/ui/components/Layout'
import { openNaverMap } from '@/_utils/openNaverMap'
import { openKakaoTaxi } from '@/_utils/openKakaoTaxi'
import Image from 'next/image'
import { cn } from '@repo/ui/utils/cn'

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

  const handleOpenKakaoTaxi = () => {
    openKakaoTaxi({
      latitude: location.latitude,
      longitude: location.longitude,
      placeName,
    })
  }

  return (
    <Column className={'gap-3'}>
      <Container className={'relative h-[150px] overflow-hidden rounded-xl'}>
        <Column className={'absolute right-2 top-2 z-10 gap-2'}>
          <MapButton
            onClick={handleOpenKakaoTaxi}
            imageSrc={'/images/kakao-taxi-logo.png'}
            alt={'kakao-taxi-logo'}
          />
          <MapButton
            onClick={handleOpenNaverMap}
            imageSrc={'/images/naver-map-logo.webp'}
            alt={'naver-map-logo'}
          />
        </Column>
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

interface MapButtonProps {
  onClick: VoidFunction
  imageSrc: string
  alt: string
}

const MapButton = ({ onClick, imageSrc, alt }: MapButtonProps) => (
  <button
    type={'button'}
    className={cn(
      'border-1 border-gray-100',
      'rounded-lg',
      'bg-white',
      'p-1',
      'shadow',
      'transition-transform',
      'hover:scale-105',
    )}
    onClick={onClick}
  >
    <Image
      src={imageSrc}
      alt={alt}
      width={20}
      height={20}
      className={'rounded-sm'}
    />
  </button>
)
