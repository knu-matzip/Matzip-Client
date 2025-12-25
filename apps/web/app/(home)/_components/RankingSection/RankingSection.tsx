'use client'

import { Suspense } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useCampusStore } from '@/_store/campus'
import { usePlaceQueries } from '@/_apis/queries/place'
import { Icon, IconType } from '@repo/ui/components/Icon'
import type { RankingPlaceSort } from '@/_apis/schemas/place'
import { Column, Flex } from '@repo/ui/components/Layout'
import { PlaceListItem } from '@/_components/PlaceListItem'
import { Text } from '@repo/ui/components/Text'

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
      <Suspense fallback={<PlaceListItem.Skeleton />}>
        <RankingListFetcher rankingPlaceSort={rankingPlaceSort} />
      </Suspense>
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
    <ul className={'px-3'}>
      {places.map((place, index) => (
        <PlaceListItem
          key={place.placeId}
          {...place}
          showBorder={index !== places.length - 1}
        />
      ))}
    </ul>
  )
}
