'use client'

import { useCallback, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Container, NaverMap } from 'react-naver-maps'

import { CAMPUS_LOCATION } from '@/_constants/campus'
import { useCampusStore } from '@/_store/campus'
import { usePlaceQueries } from '@/_apis/queries/place'
import type { MapBounds } from '@/_apis/schemas/place'

import { cn } from '@repo/ui/utils/cn'
import { toLatLng } from '@/map/_utils/toLatLng'
import { useCenterMapToCurrentLocation } from '@/map/_hooks/useCenterMapToCurrentLocation'
import { PlaceList } from '@/map/_components/PlaceList'
import { CurrentLocationButton } from '@/map/_components/CurrentLocationButton'

export const MapPage = () => {
  const [map, setMap] = useState<naver.maps.Map | null>(null)
  const [isCenteredOnUser, setIsCenteredOnUser] = useState(false)
  const [currentBounds, setCurrentBounds] = useState<MapBounds | null>(null)

  const { campus } = useCampusStore()
  const { data } = useQuery(usePlaceQueries.byMap(currentBounds))
  const CenterMapToCurrentLocation = useCenterMapToCurrentLocation(map)

  const updateBoundsFromMap = useCallback(() => {
    if (!map) return

    const bounds = map.getBounds()
    const coords = {
      minLatitude: bounds.minY(),
      minLongitude: bounds.minX(),
      maxLatitude: bounds.maxY(),
      maxLongitude: bounds.maxX(),
    }
    setCurrentBounds(coords)
  }, [map])

  const centerMapToUserLocation = async () => {
    await CenterMapToCurrentLocation()
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
        />
      </Container>
      <PlaceList places={data || []} />
    </>
  )
}
