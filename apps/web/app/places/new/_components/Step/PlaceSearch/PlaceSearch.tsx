import { useCallback } from 'react'
import { SearchPage } from '@/_components/SearchPage'
import { useSearch } from '@/_hooks/useSearch'
import type { UseFormSetValue } from 'react-hook-form'
import type { NewPlaceRequest } from '@/_apis/schemas/place'
import { type CampusType, CAMPUS_LOCATION } from '@/_constants/campus'
import { searchCafeAndRestaurant } from '@/places/new/_utils/searchCafeAndRestaurant'

type Props = {
  campus: CampusType
  setValue: UseFormSetValue<NewPlaceRequest>
  nextStep: VoidFunction
}

export const PlaceSearch = ({ campus, setValue, nextStep }: Props) => {
  const { searchResult, searchFunc } = useSearch(searchCafeAndRestaurant)

  const places = [...searchResult].map((item) => ({
    id: item.id,
    name: item.place_name,
    address: item.address_name,
  }))

  const handleSearch = useCallback(
    (query: string) => {
      const { longitude: x, latitude: y } = CAMPUS_LOCATION[campus]
      searchFunc({ query, location: { x, y } })
    },
    [campus, searchFunc],
  )

  return (
    <SearchPage
      places={places}
      searchFunc={handleSearch}
      onSelectPlace={(id) => {
        setValue('kakaoPlaceId', id)
        nextStep()
      }}
    />
  )
}
