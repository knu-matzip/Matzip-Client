import { Column, Flex } from '@repo/ui/components/Layout'
import { Icon } from '@repo/ui/components/Icon'
import { Text } from '@repo/ui/components/Text'
import { useState } from 'react'

type Props = {
  placeholder?: string
}

export const SearchPage = ({ placeholder }: Props) => {
  const [inputValue, setInputValue] = useState('')

  return (
    <Column>
      <Flex className={'border-b-1 gap-2.5 border-gray-100 p-3.5'}>
        <Icon type='arrowLeft' />
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className={'w-full text-lg font-medium outline-none'}
          placeholder={placeholder || '장소 검색 구다사이'}
        />
      </Flex>
      <Column as={'ul'} className={'px-3.5'}>
        <ListItem inputValue={inputValue} />
        <ListItem inputValue={inputValue} />
        <ListItem inputValue={inputValue} />
        <ListItem inputValue={inputValue} />
        <ListItem inputValue={inputValue} />
      </Column>
    </Column>
  )
}

const ListItem = ({ inputValue }: { inputValue: string }) => {
  return (
    <Column as={'li'} className={'border-b-1 border-gray-50 px-2.5 py-5'}>
      <Flex className={'gap-2.5'}>
        <Icon type='marker' size={12} />
        <Text variant={'title3'}>
          {highlightWord(inputValue, '공주대학교 천안캠퍼스')}
        </Text>
      </Flex>
      <Text variant={'body3'} className={'ml-5.5 text-gray-300'}>
        충청남도 천안시 서북구 천안대로 1223-24{' '}
      </Text>
    </Column>
  )
}

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
