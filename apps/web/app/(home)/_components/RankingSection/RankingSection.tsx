'use client'

import { Suspense } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useCampusStore } from '@/_store/campus'
import { usePlaceQueries } from '@/_apis/queries/place'
import type { IconType } from '@repo/ui/components/Icon'
import type { RankingPlaceSort } from '@/_apis/schemas/place'
import { Column } from '@repo/ui/components/Layout'
import { SubTitle } from '@/_components/SubTitle'
import { PlaceListItem } from '@/_components/PlaceListItem'

type Props = {
  title: string
  icon: IconType
  rankingPlaceSort: RankingPlaceSort
}

export const RankingSection = ({ title, icon, rankingPlaceSort }: Props) => {
  return (
    <Column className={'gap-1.5 px-5'}>
      <SubTitle title={title} icon={icon} />
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
