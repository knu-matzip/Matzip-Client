'use client'

import { useRouter } from 'next/navigation'
import { SearchPage } from '@/_components/SearchPage'
import { getPlacesBySearch } from '@/_apis/services/place'
import { useSearch } from '@/_hooks/useSearch'
import { CLIENT_PATH } from '@/_constants/path'
import type { PlaceBySearch } from '@/_apis/schemas/place'

const Page = () => {
  const { replace } = useRouter()
  const { searchResult, searchFunc } = useSearch<PlaceBySearch, string>(
    getPlacesBySearch,
  )

  const newPlaces = searchResult.map((place) => ({
    id: place.placeId,
    name: place.placeName,
    address: place.address,
  }))

  return (
    <SearchPage
      searchFunc={searchFunc}
      onSelectPlace={(id) => {
        replace(CLIENT_PATH.PLACE_DETAIL(id))
      }}
      places={newPlaces}
    />
  )
}

export default Page
