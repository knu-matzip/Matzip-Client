import type { Props } from './SearchPage'
import { Column, Flex } from '@repo/ui/components/Layout'
import { Icon } from '@repo/ui/components/Icon'
import { Text } from '@repo/ui/components/Text'

/**
 * 검색 결과 리스트 아이템
 */
export const SearchPlaceListItem = ({
  inputValue,
  place,
  onClick,
}: {
  inputValue: string
  place: Props['places'][0]
  onClick: VoidFunction
}) => {
  return (
    <Column
      as={'li'}
      className={'border-b-1 cursor-pointer border-gray-50 px-2.5 py-5'}
      onClick={onClick}
    >
      <Flex className={'gap-2.5'}>
        <Icon type='marker' size={12} />
        <Text variant={'title3'}>{highlightWord(inputValue, place.name)}</Text>
      </Flex>
      <Text variant={'body3'} className={'ml-5.5 text-gray-300'}>
        {place.address}
      </Text>
    </Column>
  )
}

/**
 * 검색어 강조 처리
 * @param inputValue 검색어
 * @param placeName 장소 이름
 * @returns JSX.Element[]
 */
const highlightWord = (inputValue: string, placeName: string) => {
  const regex = new RegExp(`(${inputValue})`, 'gi')
  const parts = placeName.split(regex)

  return parts.map((part, index) =>
    regex.test(part) ? (
      <Text as={'span'} variant={'title3'} className={'text-blue'} key={index}>
        {part}
      </Text>
    ) : (
      part
    ),
  )
}
