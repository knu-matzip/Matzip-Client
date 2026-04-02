'use client'

import { useCallback, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Container, NaverMap } from 'react-naver-maps'

import { CAMPUS_LOCATION, type CampusType } from '@/_constants/campus'
import { useCampusStore } from '@/_store/campus'
import { useLastMapCenterStore } from '@/_store/lastMapCenter'
import { BOTTOM_OFFSET } from './constants/CurrentLocationButton'
import { usePlaceQueries } from '@/_apis/queries/place'
import type { MapBounds } from '@/_apis/schemas/place'

import { cn } from '@repo/ui/utils/cn'
import { type Coord, toLatLng } from './_utils/toLatLng'
import { useWatchLocation } from './_hooks/useWatchLocation'
import { PlaceList } from './_components/PlaceList'
import { CampusSelector } from '@/map/_components/CampusSelector'
import { UserMarker, PlaceMarker } from './_components/Marker'
import { CurrentLocationButton } from './_components/CurrentLocationButton'
import { PlaceSummaryCard } from './_components/PlaceSummaryCard'
import { RefreshButton } from './_components/RefreshButton'
import { useDebounced } from '@/_hooks/useDebounced'

const MapComponent = () => {
  const [map, setMap] = useState<naver.maps.Map | null>(null)
  const [isCenteredOnUser, setIsCenteredOnUser] = useState(false)
  const [currentBounds, setCurrentBounds] = useState<MapBounds | null>(null)
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null)
  const [showUpdateButton, setShowUpdateButton] = useState(false)

  const { setLastMapCenter } = useLastMapCenterStore()
  const { userLocation } = useWatchLocation()
  const { data = [] } = useQuery(usePlaceQueries.byMap(currentBounds))

  const selectedPlace = selectedPlaceId
    ? data.find((place) => place.placeId === selectedPlaceId)!
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

  const moveMapTo = (coord: Coord) => {
    if (!map) return
    map.setCenter(toLatLng(coord))
  }

  const centerMapToUserLocation = () => {
    if (!userLocation) return
    moveMapTo(userLocation)
    setIsCenteredOnUser(true)
    handleRefreshClick()
  }

  const centerMapToCampus = (campus: CampusType) => {
    moveMapTo(CAMPUS_LOCATION[campus])
    handleRefreshClick()
    setIsCenteredOnUser(false)
  }

  const onCenterChanged = useDebounced(() => {
    setIsCenteredOnUser(false)
    setShowUpdateButton(true)
    setSelectedPlaceId(null)
  }, 200)

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
      {showUpdateButton && <RefreshButton onClick={handleRefreshClick} />}
      <CurrentLocationButton
        onClick={centerMapToUserLocation}
        isCenteredOnUser={isCenteredOnUser}
        bottomOffset={
          selectedPlaceId ? BOTTOM_OFFSET.WITH_SUMMARY_CARD : undefined
        }
      />
      <CampusSelector onChangeAction={centerMapToCampus} />
      <Container className={cn('map-wrapper', 'w-full', 'h-full')}>
        <NaverMap
          defaultZoom={15}
          minZoom={12}
          ref={setMap}
          defaultCenter={useDefaultMapCenter()}
          onCenterChanged={onCenterChanged}
        >
          {userLocation && <UserMarker position={userLocation} />}
          {data.map((place) => (
            <PlaceMarker
              key={place.placeId}
              position={place.location}
              icon={place.categories[0]?.iconKey || 'logo'}
              onClick={() => {
                setSelectedPlaceId(place.placeId)
              }}
            />
          ))}
        </NaverMap>
      </Container>
      {selectedPlace ? (
        <PlaceSummaryCard place={selectedPlace} />
      ) : (
        <PlaceList places={data} />
      )}
    </>
  )
}

export default MapComponent

const useDefaultMapCenter = () => {
  const { campus } = useCampusStore()
  const { lastMapCenter } = useLastMapCenterStore()

  return toLatLng(lastMapCenter || CAMPUS_LOCATION[campus])
}
