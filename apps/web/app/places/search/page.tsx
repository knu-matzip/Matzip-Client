'use client'

import { useRouter } from 'next/navigation'
import { SearchPage } from '@/_components/SearchPage'
import { getPlacesByNameSearch } from '@/_apis/services/place'
import { CLIENT_PATH } from '@/_constants/path'

const Page = () => {
  const { replace } = useRouter()

  const handleSearch = async (query: string) => {
    const result = await getPlacesByNameSearch(query)
    return result.map((place) => ({
      id: place.placeId,
      name: place.placeName,
      address: place.address,
    }))
  }

  return (
    <SearchPage
      placeholder={'식당을 검색해주세요'}
      useBackHandler={true}
      searchFunc={handleSearch}
      onSelectPlace={(id) => {
        replace(CLIENT_PATH.PLACE_DETAIL(id))
      }}
    />
  )
}

export default Page
