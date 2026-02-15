import { useState } from 'react'
import { Spinner } from '@heroui/react'
import { Icon } from '@repo/ui/components/Icon'
import { Flex, VerticalScrollArea } from '@repo/ui/components/Layout'
import { SearchPlaceListItem } from './SearchPlaceListItem'
import { HeaderBackButton } from '@/_components/HeaderBackButton'
import { useDebouncedFetch } from '@/_hooks/useDebouncedFetch'

export type BasePlace = {
  id: string
  name: string
  address: string
}

export type Props = {
  placeholder?: string
  searchFunc: (inputValue: string) => Promise<BasePlace[]>
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
 * @param searchFunc 검색 함수 (input 변경 시 호출)
 * @param onSelectPlace 리스트 아이템 선택 시 호출
 * @param useBackHandler 헤더에 뒤로가기 버튼 사용 여부
 *
 * @example
 * <SearchPage
 *   placeholder="장소를 검색하세요"
 *   searchFunc={handleSearch}
 *   onSelectPlace={(id) => console.log(id)}
 *   useBackHandler={true}
 * />
 */
export const SearchPage = ({
  placeholder = '장소 또는 주소를 검색하세요',
  searchFunc,
  onSelectPlace,
  useBackHandler = false,
}: Props) => {
  const [places, setPlaces] = useDebouncedFetch(searchFunc)
  const [inputValue, setInputValue] = useState('')
  const [isSelecting, setIsSelecting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    if (value.length > 0) {
      setPlaces(value)
    }
  }

  return (
    <>
      {isSelecting && (
        <Spinner className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2' />
      )}
      <Flex className={'border-b-1 gap-2.5 border-gray-100 p-3.5'}>
        {useBackHandler ? (
          <HeaderBackButton />
        ) : (
          <Icon type='search' size={18} />
        )}
        <input
          value={inputValue}
          onChange={handleInputChange}
          className={'w-full text-lg font-medium outline-none'}
          placeholder={placeholder}
        />
      </Flex>
      {inputValue && (
        <VerticalScrollArea as={'ul'} className={'px-3.5'}>
          {places.map((place, index) => (
            <SearchPlaceListItem
              key={place.id + '-' + index}
              inputValue={inputValue}
              place={place}
              onClick={() => {
                setIsSelecting(true)
                onSelectPlace(place.id)
              }}
            />
          ))}
        </VerticalScrollArea>
      )}
    </>
  )
}
