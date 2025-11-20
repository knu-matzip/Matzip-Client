'use client'

import 'react-spring-bottom-sheet/dist/style.css'
import { useRef } from 'react'
import { BottomSheet, type BottomSheetRef } from 'react-spring-bottom-sheet'
import type { PlaceByMap } from '@/_apis/schemas/place'
import { PlaceListItem } from '@/_components/PlaceListItem'
import { Text } from '@repo/ui/components/Text'

export const PlaceList = ({ places }: { places: PlaceByMap[] }) => {
  const sheetRef = useRef<BottomSheetRef | null>(null)

  return (
    <BottomSheet
      className={'z-10'}
      open
      blocking={false}
      ref={sheetRef}
      defaultSnap={({ maxHeight }) => Math.floor(maxHeight * 0.2)}
      snapPoints={({ maxHeight }) => [
        Math.floor(maxHeight * 0.8),
        Math.floor(maxHeight * 0.2),
      ]}
      expandOnContentDrag
    >
      {places.length > 0 ? (
        <ul className={'pb-15 px-5'}>
          {places.map((place) => (
            <PlaceListItem key={place.placeId} {...place} />
          ))}
        </ul>
      ) : (
        <Text
          fontSize={'sm'}
          fontWeight={'semibold'}
          className={'pt-3 text-center text-gray-300'}
        >
          주위 검색된 맛집이 없습니다
        </Text>
      )}
    </BottomSheet>
  )
}
