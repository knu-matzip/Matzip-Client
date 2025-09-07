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
import { CampusButtonBax } from './_components/CampusButtom'
import { UserMarker, PlaceMarker } from './_components/Marker'
import { CurrentLocationButton } from './_components/CurrentLocationButton'
import { PreviewPlace } from './_components/PreviewPlace'

export const MapPage = () => {
  const [map, setMap] = useState<naver.maps.Map | null>(null)
  const [isCenteredOnUser, setIsCenteredOnUser] = useState(false)
  const [currentBounds, setCurrentBounds] = useState<MapBounds | null>(null)
  const [previewPlaceId, setPreviewPlaceId] = useState<string | null>(null)

  const { campus } = useCampusStore()
  const { userLocation } = useWatchLocation()
  const { data = [] } = useQuery(usePlaceQueries.byMap(currentBounds))

  const previewPlace = previewPlaceId
    ? data.find((place) => place.placeId === previewPlaceId)!
    : null

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
    setPreviewPlaceId(null)
  }

  const handlePreviewPlace = (placeId: string) => {
    setPreviewPlaceId(placeId)
  }

  useEffect(() => {
    updateBoundsFromMap()
  }, [updateBoundsFromMap])

  return (
    <>
      <CurrentLocationButton
        onClick={centerMapToUserLocation}
        isCenteredOnUser={isCenteredOnUser}
        previewPlaceId={previewPlaceId}
      />
      <CampusButtonBax map={map} onCenterChanged={onCenterChanged} />
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
          {data.map((place) => (
            <PlaceMarker
              key={place.placeId}
              position={place.location}
              icon={place.categories[0]?.iconKey || 'logo'}
              handlePreviewPlace={() => {
                handlePreviewPlace(place.placeId)
              }}
            />
          ))}
        </NaverMap>
      </Container>
      {previewPlace ? (
        <PreviewPlace place={previewPlace} />
      ) : (
        <PlaceList places={data} />
      )}
    </>
  )
}
