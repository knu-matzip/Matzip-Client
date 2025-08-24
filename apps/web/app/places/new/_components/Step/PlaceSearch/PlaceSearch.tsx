import { SearchPage } from '@/_components/SearchPage'
import { useSearchPlaceByKakao } from '@/_hooks/useSearchPlaceByKakao'
import type { UseFormSetValue } from 'react-hook-form'
import type { NewPlaceRequest } from '@/_apis/schemas/place'

type Props = {
  setValue: UseFormSetValue<NewPlaceRequest>
  nextStep: VoidFunction
}

export const PlaceSearch = ({ setValue, nextStep }: Props) => {
  const { searchListsData, searchFunc } = useSearchPlaceByKakao()

  const places = searchListsData.map((item) => ({
    id: item.id,
    name: item.place_name,
    address: item.address_name,
  }))

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
