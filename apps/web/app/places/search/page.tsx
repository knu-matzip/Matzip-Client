'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SearchPage } from '@/_components/SearchPage'
import { FilterSelector } from './_components/FilterSelector'
import {
  getPlacesByMenuSearch,
  getPlacesByNameSearch,
} from '@/_apis/services/place'
import { CLIENT_PATH } from '@/_constants/path'
import type { CampusType } from '@/_constants/campus'
import { useCampusStore } from '@/_store/campus'

const SEARCH_TYPE = {
  NAME: 'NAME',
  MENU: 'MENU',
} as const

type SearchType = keyof typeof SEARCH_TYPE
type TypeConfig = Record<
  SearchType,
  {
    label: string
    placeholder: string
    searchFunc: (
      campus: CampusType,
    ) => (
      query: string,
    ) => Promise<Array<{ id: string; name: string; address: string }>>
  }
>

const TYPE_CONFIG: TypeConfig = {
  [SEARCH_TYPE.NAME]: {
    label: '가게',
    placeholder: '식당 이름을 검색해주세요',
    searchFunc: (campus: CampusType) => async (query: string) => {
      const result = await getPlacesByNameSearch(query, campus)
      return result.map((place) => ({
        id: place.placeId,
        name: place.placeName,
        address: place.address,
      }))
    },
  },
  [SEARCH_TYPE.MENU]: {
    label: '메뉴',
    placeholder: '메뉴 이름을 검색해주세요',
    searchFunc: (campus: CampusType) => async (query: string) => {
      const result = await getPlacesByMenuSearch(query, campus)
      return result.map((place) => ({
        id: place.placeId,
        name: place.menuName,
        address: place.placeName,
      }))
    },
  },
}

const Page = () => {
  const { replace } = useRouter()
  const [searchType, setSearchType] = useState<SearchType>('NAME')
  const currentConfig = TYPE_CONFIG[searchType]
  const { campus } = useCampusStore()

  return (
    <>
      <FilterSelector
        value={searchType}
        onChange={(newKey) => setSearchType(newKey)}
        options={Object.values(SEARCH_TYPE).map((type) => ({
          key: type,
          label: TYPE_CONFIG[type].label,
        }))}
      />
      <SearchPage
        key={`${searchType}-${campus}`}
        useBackHandler={true}
        placeholder={currentConfig.placeholder}
        searchFunc={currentConfig.searchFunc(campus)}
        onSelectPlace={(id) => {
          replace(CLIENT_PATH.PLACE_DETAIL(id))
        }}
      />
    </>
  )
}

export default Page
