import { useEffect, useState } from 'react'
import { Icon } from '@repo/ui/components/Icon'
import { Flex, VerticalScrollArea } from '@repo/ui/components/Layout'
import { SearchPlaceListItem } from './SearchPlaceListItem'
import { HeaderBackButton } from '@/_components/HeaderBackButton'

export type Props = {
  placeholder?: string
  places: {
    id: string
    name: string
    address: string
  }[]
  searchFunc: (inputValue: string) => void
  onSelectPlace: (id: string) => void
  useBackHandler?: boolean
}

/**
 * 장소 검색 페이지 컴포넌트
 *
 * - 입력값(inputValue)에 따라 searchFunc 호출
 * - 검색 결과를 리스트로 출력
 * - 리스트 아이템 클릭 시 onSelectPlace 호출
 * - useBackHandler가 true면 헤더에 뒤로가기 버튼, false면 검색 아이콘 표시
 *
 * @param placeholder 검색 input의 placeholder
 * @param places 검색 결과 장소 리스트
 * @param searchFunc 검색 함수 (input 변경 시 호출)
 * @param onSelectPlace 리스트 아이템 선택 시 호출
 * @param useBackHandler 헤더에 뒤로가기 버튼 사용 여부
 *
 * @example
 * <SearchPage
 *   placeholder="장소를 검색하세요"
 *   places={places}
 *   searchFunc={handleSearch}
 *   onSelectPlace={(id) => console.log(id)}
 *   useBackHandler={true}
 * />
 */
export const SearchPage = ({
  placeholder,
  places,
  searchFunc,
  onSelectPlace,
  useBackHandler = false,
}: Props) => {
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    if (inputValue.length > 0) {
      searchFunc(inputValue)
    }
  }, [inputValue, searchFunc])

  return (
    <>
      <Flex className={'border-b-1 gap-2.5 border-gray-100 p-3.5'}>
        {useBackHandler ? (
          <HeaderBackButton />
        ) : (
          <Icon type='search' size={18} />
        )}
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className={'w-full text-lg font-medium outline-none'}
          placeholder={placeholder || '장소 또는 주소를 검색하세요'}
        />
      </Flex>
      {inputValue && (
        <VerticalScrollArea as={'ul'} className={'px-3.5'}>
          {places.map((place) => (
            <SearchPlaceListItem
              key={place.id}
              inputValue={inputValue}
              place={place}
              onClick={() => onSelectPlace(place.id)}
            />
          ))}
        </VerticalScrollArea>
      )}
    </>
  )
}
