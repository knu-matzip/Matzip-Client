import type { BasePlace } from './SearchPage'
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
  place: BasePlace
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
        {highlightWord(inputValue, place.address)}
      </Text>
    </Column>
  )
}

/**
 * 정규식 특수 문자를 이스케이프 처리하는 함수
 * 예: "[" -> "\[", "?" -> "\?"
 */
const escapeRegExp = (string: string) =>
  string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/**
 * 검색어 강조 처리
 * @param keyword 검색어
 * @param text 검색 결과
 * @returns JSX.Element[]
 */
const highlightWord = (keyword: string, text: string) => {
  const regex = new RegExp(`(${escapeRegExp(keyword)})`, 'gi')
  const parts = text.split(regex)

  return parts.map((part, index) =>
    regex.test(part) ? (
      <Text as={'span'} className={'text-blue'} key={index}>
        {part}
      </Text>
    ) : (
      part
    ),
  )
}
