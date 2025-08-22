'use client'

import { useCallback, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Container, NaverMap } from 'react-naver-maps'

import { CAMPUS_LOCATION } from '@/_constants/campus'
import { useCampusStore } from '@/_store/campus'
import { usePlaceQueries } from '@/_apis/queries/place'
import type { MapBounds } from '@/_apis/schemas/place'

import { cn } from '@repo/ui/utils/cn'
import { toLatLng } from './_utils/toLatLng'
import { useWatchLocation } from './_hooks/useWatchLocation'
import { PlaceList } from './_components/PlaceList'
import { UserMarker, PlaceMarker } from './_components/Marker'
import { CurrentLocationButton } from './_components/CurrentLocationButton'

export const MapPage = () => {
  const [map, setMap] = useState<naver.maps.Map | null>(null)
  const [isCenteredOnUser, setIsCenteredOnUser] = useState(false)
  const [currentBounds, setCurrentBounds] = useState<MapBounds | null>(null)

  const { campus } = useCampusStore()
  const { userLocation } = useWatchLocation()
  const { data } = useQuery(usePlaceQueries.byMap(currentBounds))

  const updateBoundsFromMap = useCallback(() => {
    if (!map) return
    const bounds = map.getBounds()
    setCurrentBounds({
      minLatitude: bounds.minY(),
      minLongitude: bounds.minX(),
      maxLatitude: bounds.maxY(),
      maxLongitude: bounds.maxX(),
    })
  }, [map])

  const centerMapToUserLocation = () => {
    if (!map || !userLocation) return
    map.setCenter(toLatLng(userLocation))
    updateBoundsFromMap()
    setIsCenteredOnUser(true)
  }

  const onCenterChanged = () => {
    setIsCenteredOnUser(false)
  }

  useEffect(() => {
    updateBoundsFromMap()
  }, [updateBoundsFromMap])

  return (
    <>
      <CurrentLocationButton
        onClick={centerMapToUserLocation}
        isCenteredOnUser={isCenteredOnUser}
      />
      <Container
        className={cn('map-wrapper', 'w-full', 'h-full')}
        onTouchEnd={onCenterChanged}
        onMouseUp={onCenterChanged}
      >
        <NaverMap
          ref={setMap}
          defaultCenter={toLatLng(CAMPUS_LOCATION[campus])}
          onZoomChanged={onCenterChanged}
        >
          {userLocation && <UserMarker position={userLocation} />}
          {data?.map((place) => (
            <PlaceMarker
              key={place.placeId}
              position={place.location}
              icon={place.categories[0]?.iconKey || 'logo'}
            />
          ))}
        </NaverMap>
      </Container>
      <PlaceList places={data || []} />
    </>
  )
}
