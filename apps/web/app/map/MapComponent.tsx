'use client'

import { useCallback, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Container, NaverMap } from 'react-naver-maps'

import { CAMPUS_LOCATION } from '@/_constants/campus'
import { useCampusStore } from '@/_store/campus'
import { useLastMapCenterStore } from '@/_store/prevMapCenter'
import { usePlaceQueries } from '@/_apis/queries/place'
import type { MapBounds } from '@/_apis/schemas/place'

import { cn } from '@repo/ui/utils/cn'
import { toLatLng } from './_utils/toLatLng'
import { useWatchLocation } from './_hooks/useWatchLocation'
import { PlaceList } from './_components/PlaceList'
import { CampusButtonBox } from './_components/CampusButtom'
import { UserMarker, PlaceMarker } from './_components/Marker'
import { CurrentLocationButton } from './_components/CurrentLocationButton'
import { PreviewPlace } from './_components/PreviewPlace'
import { RefreshButton } from './_components/RefreshButton'

const MapComponent = () => {
  const [map, setMap] = useState<naver.maps.Map | null>(null)
  const [isCenteredOnUser, setIsCenteredOnUser] = useState(false)
  const [currentBounds, setCurrentBounds] = useState<MapBounds | null>(null)
  const [previewPlaceId, setPreviewPlaceId] = useState<string | null>(null)
  const [showUpdateButton, setShowUpdateButton] = useState(false)

  const { campus } = useCampusStore()
  const { lastMapCenter, setLastMapCenter } = useLastMapCenterStore()
  const { userLocation } = useWatchLocation()
  const { data = [] } = useQuery(usePlaceQueries.byMap(currentBounds))

  const defaultCenter = toLatLng(lastMapCenter || CAMPUS_LOCATION[campus])
  const previewPlace = previewPlaceId
    ? data.find((place) => place.placeId === previewPlaceId)!
    : null

  const refreshMapBounds = useCallback(() => {
    // bounds 업데이트 시 query update
    if (!map) return
    const bounds = map.getBounds()
    setCurrentBounds({
      minLatitude: bounds.minY(),
      minLongitude: bounds.minX(),
      maxLatitude: bounds.maxY(),
      maxLongitude: bounds.maxX(),
    })
  }, [map])

  const handleRefreshClick = () => {
    setShowUpdateButton(false)
    refreshMapBounds()
  }

  const centerMapToUserLocation = () => {
    if (!map || !userLocation) return
    map.setCenter(toLatLng(userLocation))
    setIsCenteredOnUser(true)
    handleRefreshClick()
  }

  const centerMapToCampus = () => {
    handleRefreshClick()
    setIsCenteredOnUser(false)
  }

  const onCenterChanged = () => {
    setIsCenteredOnUser(false)
    setShowUpdateButton(true)
  }

  const handlePreviewPlace = (placeId: string) => {
    setPreviewPlaceId(placeId)
  }

  const resetPreviewPlace = () => {
    setPreviewPlaceId(null)
  }

  useEffect(refreshMapBounds, [refreshMapBounds])
  useEffect(() => {
    return () => {
      if (!map) return
      const { x: longitude, y: latitude } = map.getCenter()

      setLastMapCenter({ longitude, latitude })
    }
  }, [map, setLastMapCenter])

  return (
    <>
      {showUpdateButton && (
        <RefreshButton handleRefreshClick={handleRefreshClick} />
      )}
      <CurrentLocationButton
        onClick={centerMapToUserLocation}
        isCenteredOnUser={isCenteredOnUser}
        previewPlaceId={previewPlaceId}
      />
      <CampusButtonBox map={map} centerMapToCampus={centerMapToCampus} />
      <Container
        className={cn('map-wrapper', 'w-full', 'h-full')}
        onClick={resetPreviewPlace}
        onTouchEnd={onCenterChanged}
        onMouseUp={onCenterChanged}
      >
        <NaverMap
          defaultZoom={15}
          minZoom={12}
          ref={setMap}
          defaultCenter={defaultCenter}
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

export default MapComponent
