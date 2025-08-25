import { useCallback } from 'react'
import { SearchPage } from '@/_components/SearchPage'
import { useSearchPlaceByKakao } from '@/_hooks/useSearchPlaceByKakao'
import type { UseFormSetValue } from 'react-hook-form'
import type { NewPlaceRequest } from '@/_apis/schemas/place'
import { type CampusType, CAMPUS_LOCATION } from '@/_constants/campus'

type Props = {
  campus: CampusType
  setValue: UseFormSetValue<NewPlaceRequest>
  nextStep: VoidFunction
}

export const PlaceSearch = ({ campus, setValue, nextStep }: Props) => {
  const { searchResult: restaurantResult, searchFunc: restaurantSearchFunc } =
    useSearchPlaceByKakao()
  const { searchResult: cafeResult, searchFunc: cafeSearchFunc } =
    useSearchPlaceByKakao()

  const places = [...restaurantResult, ...cafeResult].map((item) => ({
    id: item.id,
    name: item.place_name,
    address: item.address_name,
  }))

  const searchFunc = useCallback(
    (query: string) => {
      const { longitude: x, latitude: y } = CAMPUS_LOCATION[campus]
      const location = {
        x,
        y,
      }

      cafeSearchFunc({ query, categoryCode: 'cafe', location })
      restaurantSearchFunc({
        query,
        categoryCode: 'restaurant',
        location,
      })
    },
    [cafeSearchFunc, campus, restaurantSearchFunc],
  )

  return (
    <SearchPage
      places={places}
      searchFunc={searchFunc}
      onSelectPlace={(id) => {
        setValue('kakaoPlaceId', id)
        nextStep()
      }}
    />
  )
}
