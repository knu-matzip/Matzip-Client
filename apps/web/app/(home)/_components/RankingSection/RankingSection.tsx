'use client'

import { Suspense } from 'react'
import { ErrorBoundary } from '@suspensive/react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useCampusStore } from '@/_store/campus'
import { usePlaceQueries } from '@/_apis/queries/place'
import { Icon, IconType } from '@repo/ui/components/Icon'
import type { RankingPlaceSort } from '@/_apis/schemas/place'
import { Column, Flex } from '@repo/ui/components/Layout'
import { PlaceListItem } from '@/_components/PlaceListItem'
import { Text } from '@repo/ui/components/Text'
import { EmptyFallback } from '@/_components/EmptyFallback'

type Props = {
  title: string
  icon: IconType
  rankingPlaceSort: RankingPlaceSort
}

export const RankingSection = ({ title, icon, rankingPlaceSort }: Props) => {
  return (
    <Column className={'gap-1.5 px-5'}>
      <Flex className={'gap-1'}>
        <Icon type={icon} size={30} />
        <Text as={'h2'} variant={'title1'}>
          {title}
        </Text>
      </Flex>
      <ErrorBoundary fallback={<ErrorFallback />}>
        <Suspense fallback={<PlaceListItem.Skeleton />}>
          <RankingListFetcher rankingPlaceSort={rankingPlaceSort} />
        </Suspense>
      </ErrorBoundary>
    </Column>
  )
}

const RankingListFetcher = ({
  rankingPlaceSort,
}: {
  rankingPlaceSort: RankingPlaceSort
}) => {
  const { campus } = useCampusStore()
  const { data: places } = useSuspenseQuery(
    usePlaceQueries.byRanking(rankingPlaceSort, campus),
  )

  return (
    <EmptyFallback
      isEmpty={places.length === 0}
      fallbackDescription={'아직 집계된 추천 맛집이 없습니다'}
    >
      <ul className={'px-3'}>
        {places.map((place, index) => (
          <PlaceListItem
            key={place.placeId}
            {...place}
            showBorder={index !== places.length - 1}
          />
        ))}
      </ul>
    </EmptyFallback>
  )
}

const ErrorFallback = () => (
  <Text variant='title3' className='my-4 text-center text-gray-300'>
    맛집 정보를 불러오는 중에 오류가 발생했습니다.
  </Text>
)
